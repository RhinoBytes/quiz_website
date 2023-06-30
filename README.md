## LHL Quiz Website
# Overview
The LHL Quiz Website is an interactive platform designed to test users' knowledge through engaging quizzes on a variety of subjects. This document will guide you through the process of setting up and running the project.

# Preview
Refer to the included screenshots for a visual overview of the project.

# Dependencies
Please ensure that the following dependencies are installed before setting up the LHL Quiz Website:

Node.js 10.x or above
NPM 5.x or above
PG 6.x
# Setup
Setting up the LHL Quiz Website involves the following steps:

1. Clone the project repository from GitHub.
2. Navigate to the project directory via a terminal or command prompt.
3. Install the necessary dependencies with npm install.
4. Create a PostgreSQL database to house the quiz data.
5. Create a .env file in the project root directory and add the following environment variables:

DB_HOST=localhost
DB_USER=labber 
DB_PASS=labber
DB_NAME=midterm
DB_PORT=5432

6. Reset the database using npm run db:reset. Use this command each time there is a change to the database schema or seeds.
- Check the db folder to see what gets created and seeded in the SDB.
# Running the Project
Start the LHL Quiz Website with npm run local. The site will be accessible at http://localhost:8080/. Note: nodemon is used, so restarting your server shouldn't be necessary.

# Feedback and Collaboration
If you have any questions or suggestions, we welcome you to reach out.

# Collaborators
This project is the result of the combined efforts of Ahmed Alhajahmed, Doug Ross, and Hardeep Aulakh. If you have any queries or wish to contribute, feel free to contact us. Happy quizzing!
