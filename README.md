# LHL Quiz Website
## Overview
The LHL Quiz Website is an interactive platform designed to test users' knowledge through engaging quizzes on a variety of subjects. This document will guide you through the process of setting up and running the project.

## Final product
!["Screenshot of the home page"]()
!["Screenshot of creating a quiz"]()
!["Screenshot of attempting a quiz"]()
!["Screenshot of the result page"]()
## Dependencies
Please ensure that the following dependencies are installed before setting up the LHL Quiz Website:

- Node.js 10.x or above
- NPM 5.x or above
- PG 6.x
- bootstrap
- chalk
- cookie-session
- dotenv
- ejs
- express
- express-session
- morgan
- pg
- sass
## Getting Started
Setting up the LHL Quiz Website involves the following steps:

1. Clone the repository: git clone `https://github.com/Rhinokick/quiz_website`
2. Open the project in your preferred code editor.
3. Navigate to the project directory via a terminal or command prompt.
4. Install dependencies using the `npm install` command.
5. Start the web server using the `npm run local` command.
6. Create a PostgreSQL database to house the quiz data.
7. Create a .env file in the project root directory and add the following environment variables:

- DB_HOST=localhost
- DB_USER=labber 
- DB_PASS=labber
- DB_NAME=midterm
- DB_PORT=5432

8. Reset the database using npm run db:reset. Use this command each time there is a change to the database schema or seeds.
- Check the db folder to see what gets created and seeded in the SDB.
## Running the Project
Start the LHL Quiz Website with npm run local. The site will be accessible at `http://localhost:8080/`. Note: nodemon is used, so restarting your server shouldn't be necessary.

## Feedback and Collaboration
If you have any questions or suggestions, we welcome you to reach out.

## Collaborators
This project is the result of the combined efforts of:
 - [Ahmed Alhajahmed](https://github.com/Alhajahmed)
 - [Doug Ross](https://github.com/Rhinokick)
 - [Hardeep Aulakh](https://github.com/aulakhhardeep)

If you have any queries or wish to contribute, feel free to contact us. Happy quizzing!
