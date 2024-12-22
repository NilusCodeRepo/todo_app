Todo Application
A Task Management application built with Next.js, Express.js, and MongoDB. It allows users to create, view, edit, and delete tasks with a simple, intuitive interface. 
Includes search, filter, and pagination for better task management.

*** Setup Instructions ***<br>
Prerequisites
Node.js 
MongoDB 
Git

*** Steps to Run Locally ***<br>
1. Clone the Repository
git clone https://github.com/NilusCodeRepo/todo_app.git
cd task-management-app

2. Environment Setup
In the root directory, create a .env file with the following:
MONGO_URI=your_mongo_connection_string
PORT=5000

At client side
NEXT_PUBLIC_API_URL=http://localhost:5000

3.Install Dependencies
npm install

4. Run the Project
   Start the backend server: task_manager
    npm start

   Start the front-end client : my_todo_client_app
   npm run dev

*** Technologies Used ***
Front-End: Next.js, Tailwind CSS
Back-End: Express.js
Database: MongoDB


