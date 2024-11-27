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
![image](https://github.com/user-attachments/assets/cb644c34-eddd-41c4-acfc-c59503348480)



    

- **GET**: [List Schools](http://localhost:3000/listSchools?latitude=13.0827&longitude=80.2707)
  - Lists all schools sorted by proximity to the provided latitude and longitude.
  - Example query parameters:
    ```
    ?latitude=13.0827&longitude=80.2707
    ```
![image](https://github.com/user-attachments/assets/33b0ed9f-0ec3-4d8c-a535-bb6e54cb9ecf)
## Setup  

1. Clone the repository:
- git clone https://github.com/harshita795/schoolManagement.git


2. Install dependencies:
- cd schoolManagement
- npm install


3. Create a `.env` file in the root directory and add your MySQL database credentials:
- host=your_host
- user=your_user
- password=your_password
- database=your_database


4. Start the server:
- npm start



