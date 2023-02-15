# Employee Review Management
* Employee review management (ERM) system to manage the performance ratings of employees.
* This is implmented with a neat interface using Node.js, Express, MongoDB, Mongoose, EJS, CSS and Bootstrap.

# Features
1. Admin and employees can login.
2. Admin can manage profile of an employee (add, view, update and delete an employee).
3. Admin can manage reviews of employee (View, add, update ratings and can also assign employee to review other employees).
4. Employee can register.
5. Employee can submit the review to other employees.

# Setup Project in local Server
**Ensure that npm ,node, mongodb are installed in your system**. Follow the steps below to setup this project in your local: 

1. Copy the git repository link.
2. Open Git bash and clone the project using **git clone** command.
3. Run **npm install** to install the dependencies.
4. Create a .env file in the root of the project.
5. Paste the following in your .env file

>PORT = PortToLaunch

>LOCAL_SECRET = TextOfYourChoice

>DATABASE_URL = YourDatabaseURL

6. Run **npm start** to start the server.

This will run on Port: 8000 (if nothing is specified in env port). 


# <a href="https://employee-review-management.onrender.com" target="_blank">Click here</a> to see the ERM.
