import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateMatches1714453202829 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();

    await queryRunner.createTable(
      new Table({
        name: 'matches',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'team_id_one',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'team_id_two',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'venue',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'player_of_the_match_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'winning_team_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            default: null,
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKeys('matches', [
      new TableForeignKey({
        columnNames: ['team_id_one'],
        referencedColumnNames: ['id'],
        referencedTableName: 'teams',
      }),
      new TableForeignKey({
        columnNames: ['team_id_two'],
        referencedColumnNames: ['id'],
        referencedTableName: 'teams',
      }),
      new TableForeignKey({
        columnNames: ['player_of_the_match_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'players',
      }),
      new TableForeignKey({
        columnNames: ['winning_team_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'teams',
      }),
    ]);

    await queryRunner.commitTransaction();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();

    await queryRunner.dropTable('matches');

    await queryRunner.commitTransaction();
  }
}
