# School Management System

This project is a simple School Management System built with Node.js and MySQL.

[LIVE LINK HERE](https://schoolmanagement-3ros.onrender.com/listSchools?latitude=13.0827&longitude=80.2707)

## API Endpoints

- **POST**: [Add School](http://localhost:3000/addSchool)
  - Adds a new school to the database.
  - Example request body:
    ```json
    {
      "name": "Example School",
      "address": "123 Example Street",
      "latitude": 13.0827,
      "longitude": 80.2707
    }
    ```

- **GET**: [List Schools](http://localhost:3000/listSchools?latitude=13.0827&longitude=80.2707)
  - Lists all schools sorted by proximity to the provided latitude and longitude.
  - Example query parameters:
    ```
    ?latitude=13.0827&longitude=80.2707
    ```

## Setup

1. Clone the repository:
   ```
