# Project Questionnaire API

## Introduction

Welcome to the Project Questionnaire API developed! This API serves as a crucial component in revolutionizing the world of sustainable finance by facilitating the submission of new questionnaires based on selected project types. Our mission is to bridge the gap between investors and developers in the sustainability space by providing innovative financial solutions that accelerate the transition to a low-carbon economy.

## Setup

### Prerequisites

- Node.js (v16.20.0 or higher)
- PostgreSQL
- Docker (optional, for containerization)

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:dthakurani/questionnaire-recruitement-assignment.git
   cd questionnaire-recruitement-assignment

   ```

2. Setup .env file take a reference from .env.sample and also set docker-compose.yml

3. Containerize the application using Docker:

   ```bash
   docker-compose up --build

   ```

4. To seed questions to the database, run the jake script. For reference, you can use the [Google Sheet](https://docs.google.com/spreadsheets/d/1pHpO1rUGdDwfZR6lnK7-NeB7Li3YIYDZligtIplxqLU/edit#gid=0)

   ```bash
   docker exec -it <CONTAINER_ID> bash
   npx jake sync_questions
   ```

Now your app is up & running.

## Database Schema

![database schema](https://questionnaire-assignment.s3.amazonaws.com/Screenshot%202024-04-25%20at%2011.32.56.png)

## File Upload

To handle file uploads, such as images, the API utilizes Amazon S3 (Simple Storage Service) as a storage solution. Follow these steps to upload images to an S3 bucket and include the link in the response:

1. Upload Image to S3 Bucket: Utilize the /api/v1/s3/upload-image endpoint to upload the image to your designated S3 bucket. The endpoint accepts the image file as input and handles the upload process to S3.
2. Include S3 Link in Response: After successfully uploading the image to the S3 bucket, include the generated S3 link in the response body of the relevant API endpoint. Users can then access the uploaded image via this link.

By following this approach, binary data (such as images) is stored securely in the S3 bucket, and users can easily access the uploaded files via the provided links.

## Swagger Documentation

Swagger documentation has been implemented for this API. To access the Swagger documentation, append '/api' to the base URL of your application. For example:

```
HTTP://localhost:3000/api
```

This will provide users with detailed documentation outlining all endpoints, expected inputs, and responses.
