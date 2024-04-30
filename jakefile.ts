import { config } from 'dotenv';
import { task, desc } from 'jake';
import { DataSource, ILike } from 'typeorm';
import { google } from 'googleapis';

config();

const myDataSource = new DataSource({
  type: 'postgres',
  host: process.env.SQL_DATABASE_HOST,
  port: +(process.env.SQL_DATABASE_PORT || '5432'),
  username: process.env.SQL_DATABASE_USERNAME,
  password: process.env.SQL_DATABASE_PASSWORD,
  database: process.env.SQL_DATABASE_NAME,
  entities: ['src/modules/**/entities/*.entity{.ts,.js}'],
});

desc('sync questions');
task('sync_questions', async () => {
  try {
    const db = await myDataSource.initialize();

    await db.transaction(async (transactionalEntityManager) => {
      const questionsRepository =
        transactionalEntityManager.getRepository('questions');

      const sheetName = 'Questions';
      const range = `${sheetName}!A:b`;

      const sheets = google.sheets({
        version: 'v4',
        auth: process.env.GOOGLE_API_KEY,
      });

      // Retrieve information about the spreadsheet
      const response = await sheets.spreadsheets.get({
        spreadsheetId: process.env.QUESTIONS_DATA_SEEDING_SPREADSHEET_ID,
      });

      if (!response.data.sheets) {
        throw new Error('Sheets data not found in response.');
      }

      const sheet = response.data.sheets.find(
        (sheet) => sheet?.properties?.title === sheetName,
      );

      if (!sheet) {
        throw new Error(`Sheet '${sheetName}' not found.`);
      }

      const dataResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.QUESTIONS_DATA_SEEDING_SPREADSHEET_ID,
        range: range,
      });

      const values = dataResponse.data.values;

      if (!values || !Array.isArray(values)) {
        throw new Error('Values data not found or not an array.');
      }

      const [header, ...dataRows] = values;

      if (header.join(',') !== 'Questions,Type') {
        throw new Error('Invalid headers!');
      }

      for (const data of dataRows) {
        const [description, type] = data;
        if (description === '' || type === '') {
          throw new Error('mandatory fields are missing');
        }

        // check for duplicate question
        const questionAlreadyExists = await questionsRepository.findOne({
          where: {
            description: ILike(`${description}`),
            type,
          },
        });

        if (questionAlreadyExists) {
          continue;
        }

        await questionsRepository.save({
          description,
          type,
        });
      }
    });
  } catch (error) {
    console.log('Error sync_dynamic_questions: ', error);
    throw error;
  }
});
