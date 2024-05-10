# Todo Project README

This README provides instructions for setting up and running the Todo project, which consists of a React.js frontend , Node.js backend and MongoDB cloud for database storage.

## Getting Started

### Clone the Repository

Clone the Git repository to your local machine:

```bash
git clone <repository-url>
```

### Create the database in MongoDB Cloud

visit [MongoDB cloud platform](https://www.mongodb.com/products/platform/cloud) and create an account

Create a cluster and a collection inside the cluster as instructed.

### Create a .env file at the root of the 'backend' folder in the cloned repository 

In the .env folder replace the respective variable values with your database details


```bash
DB_USERNAME=your_mongodb_username
DB_PASSWORD=your_mongodb_password
DB_CLUSTERNAME=your_mongodb_cluster_name
DB_DATABASE=your_mongodb_database_name
```

### Run the frontend  

Navigate to the directory where frontend is present and run the react application.
```bash
 cd frontend/toddo-frontend
 npm start
```

### Run the backend  

Navigate to the directory where backend source code is present and run the nodejs application.
```bash

cd backend
nodemon index.js

```
### Run the test cases
```bash
cd frontend/toddo-frontend
npm run test

```
### Walk through of the application 
1. Register the user by clicking on the register button in the home page.
2. Enter the username, password and email 
3. Click on the submit button. When the user is created, an alert will pop up with confirmation message.
4. After creating the account , you will be redirected to the login page. Enter the email and the password for the created account
5. On successful login, a confirmation alert will pop up and user will be redirected to the home page where the list of projects associated with his/her account will be displayed.
6. Create a project by clicking on the create project button at the top of the page.
7. After creating the project it will be displayed on the page along with edit and delete options corresponding to each project.
8. User can edit the name of the project by clicking on the edit button and entering the new name of the project.
9. On clicking the delete button, that project will be deleted.
10. To view the tasks inside each project, click on the project name.
11. To create a task, click on the create task button at the top of the page and enter the desciption of the task.
12. The created tasks will be displayed on the page with edit, delete, changeStatus options, description, status and date created at.
13. Click on delete to delete that task, click on edit to edit the description of that task and click on change status to change the status of that task('pending' or 'completed).
14. Click on export button at the top to download a markdown file in the localsystem that contains project name, summary of the project tasks, number of tasks completed and list of pending and completed tasks with checkboxes(checked when the tasks are marked as completed)
15. User can logout of the application by clicking on the logout button at the top. The user will be redirected to the home page and will only be able to see the list of projects if he logs in again.
