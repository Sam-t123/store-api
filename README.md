# Store-API

## Introduction

This is an API written in NodeJS to fetch data from MongoDB. This project was made to test and implement various query features like sorting the products, pagination, getting only selected fields, filter using specific numerical conditions etc.

The Database contains a list of Products having fields :

1. Name
2. Company
3. Price
4. Rating
5. CreatedAt
6. Featured

Using this API, I tested various features mentioned above by implementing them.

## Requirements

Firstly, you need to install NodeJS. After that, following packages are required :

- Express
- Mongoose
- Dotenv
- Express-Async-Errors
- Nodemon

You would need to connect your own MongoDB here. Create your own .env file and add your MongoDB connection string with the variable name `MONGO_URI`

## Installation

Clone the repository

```
git clone https://github.com/Sam-t123/store-api.git
```

Install NPM packages

```
npm install
```

Run the code using

```
npm start
```
