# URL Shortener Service with Microservices

## Introduction

Welcome to the URL Shortener Service! This service is designed to shorten URLs and provide basic statistics on their usage. The system is divided into two microservices: the URL Shortener and the Token Service.

### URL Shortener Microservice (Port: 3000)

This microservice handles the core functionality of shortening URLs and retrieving statistics.

#### Endpoints:

1. **Create Short URL**
   - Method: POST
   - Path: `/shortener/create/{url}`
   - Description: Shortens the provided URL and returns a unique short code.

2. **Retrieve Original URL**
   - Method: GET
   - Path: `/shortener/{short_code}`
   - Description: Retrieves the original URL associated with the given short code.

3. **Retrieve URL Statistics**
   - Method: GET
   - Path: `/shortener/{short_code}/stats`
   - Description: Provides statistics for the given short code, including the number of visits and other relevant data.

### Token Service Microservice (Port: 4000)

This microservice is responsible for handling tokens, which may be used for various authentication purposes.

#### Endpoints:

1. **Retrieve Token**
   - Method: GET
   - Path: `/token`
   - Description: Generates and returns a token for authentication purposes.

## Getting Started

To set up and run the URL Shortener Service, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/url-shortener-service.git
   ```

2. Navigate to the project directory:

   ```bash
   cd url-shortener-service
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the microservices:

   - URL Shortener Microservice (Port: 3000):

     ```bash
     npm run start:dev
     ```

   - Token Service Microservice (Port: 4000):

     ```bash
     npm run start:dev
     ```

## Usage

1. **Create a Short URL:**

   ```http
   POST http://localhost:3000/shortener/create/{url}
   ```

   Example:

   ```http
   POST http://localhost:3000/shortener/create/https://example.com
   ```

2. **Retrieve Original URL:**

   ```http
   GET http://localhost:3000/shortener/{short_code}
   ```

   Example:

   ```http
   GET http://localhost:3000/shortener/abc123
   ```

3. **Retrieve URL Statistics:**

   ```http
   GET http://localhost:3000/shortener/{short_code}/stats
   ```

   Example:

   ```http
   GET http://localhost:3000/shortener/abc123/stats
   ```

4. **Retrieve Token:**

   ```http
   GET http://localhost:4000/token
   ```

   Example:

   ```http
   GET http://localhost:4000/token
   ```

## Authentication

For certain actions, authentication may be required using the token provided by the Token Service.

## Contributors

- [Prakhar Rai](https://www.twitter.com/prakharrai1609)
