# Video Tutorials
- [Video Tutorial of running the source code](https://youtu.be/psBa_KsNOmU)
- [Video Tutorial of running the CRUD application](https://www.youtube.com/watch?v=7RyabFG-slM)

# Installation and Setup
## Prerequisites
Before starting, make sure you have the following software installed on your system:
- MySQL
- XAMPP
- Python 3
- Node.js

## Database Setup
### Install MySQL
If you haven't already installed MySQL, download and install it from the official website.
- [Download MYSQL](https://dev.mysql.com/downloads/installer/)

### XAMPP
1. Download and install XAMPP from the official website.
- [Download XAMPP](https://www.apachefriends.org/download.html)
3. Start Apache and MySQL from XAMPP:
   - Launch XAMPP and start the Apache and MySQL services from the control panel.
4. Access the Dashboard:
   - Open your web browser and go to http://localhost/dashboard/ to access the XAMPP dashboard.
5. Create a Database:
   - In the XAMPP dashboard, navigate to the phpMyAdmin section.
   - Click on "New" to create a new database called "studentreportsyedhusain"

#### IF YOU WISH TO RENAME DATABASE:
The database could be renamed to something else, provided that the change is implemented in the code on line 7 of `App.py`. Navigate to line 7 of the code and change `/studentreportsyedhusain` to something else if you wish to.
```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:password@localhost/studentreportsyedhusain'
```

# Run SQL Queries:

In the phpMyAdmin interface, select the "studentreportsyedhusain" database. Go to the SQL tab and execute the following SQL queries to create the required tables:

```sql
CREATE TABLE Students (
    StudentID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    CreditsEarned INT NOT NULL
);

CREATE TABLE Instructors (
    InstructorID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Department VARCHAR(255) NOT NULL
);

CREATE TABLE Courses (
    CourseID INT AUTO_INCREMENT PRIMARY KEY,
    CourseTitle VARCHAR(255) NOT NULL,
    InstructorID INT,
    FOREIGN KEY (InstructorID) REFERENCES Instructors(InstructorID)
);

CREATE TABLE Enrollments (
    EnrollmentID INT AUTO_INCREMENT PRIMARY KEY,
    StudentID INT,
    CourseID INT,
    Grade INT,
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID),
    UNIQUE (StudentID, CourseID)
);
```
# Flask Setup

## Navigate to the Flask Folder:

Open a terminal or command prompt and navigate to the Flask project folder. Use the terminal for the IndividualAssignment-SyedHusain-main code.

```bash
cd SourceCode\Flask_App_Backend\Flask_React_Crud
```

Check If there a another folder IndividualAssignment-SyedHusain-main inside IndividualAssignment-SyedHusain-main
If there is then do:
```bash
cd IndividualAssignment-SyedHusain-main\SourceCode\Flask_App_Backend\Flask_React_Crud\Flask_React_Crud
```

# Create and Activate a Virtual Environment:

## Run the following commands in the terminal:

```bash
py -3 -m venv venv
```
```bash
venv\Scripts\activate
```

# Install Python Libraries:
## Install the required Python libraries using pip:

```bash
pip install Flask
```
```bash
pip install pymysql
```
```bash
pip install -U Flask-SQLAlchemy
```
```bash
pip install flask-marshmallow
```
```bash
pip install Flask-Cors
```

# Edit App.py code:

Go on App.py and navigate to the line 7 of code:

```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:password@localhost/studentreportsyedhusain'
```

Change password after “root:” to your own password. If you haven't set up a password than leave it blank like this:
```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root@localhost/studentreportsyedhusain'
```

# Run Flask Application:

Once all the libraries are installed, code is edited, and you are running on venv, run the Flask application using the following command:

```bash
flask run
```

# Version Dependencies:

If you have error running flask make sure the libraries version matches the version on the requirements.txt

run command:
```python
pip3 freeze > requirements.txt
```

Now compare and make sure that your versions matches this requirements list:

```txt
blinker==1.6.2
click==8.1.7
colorama==0.4.6
Flask==3.0.0
Flask-Cors==4.0.0
flask-marshmallow==0.15.0
Flask-SQLAlchemy==3.1.1
greenlet==3.0.0
gunicorn==21.2.0
itsdangerous==2.1.2
Jinja2==3.1.2
MarkupSafe==2.1.3
marshmallow==3.20.1
packaging==23.2
PyMySQL==1.1.0
SQLAlchemy==2.0.21
typing_extensions==4.8.0
Werkzeug==3.0.0
React Setup:
Navigate to the React Folder:
```

# React Setup
Open a terminal or command prompt and navigate to the React project folder.
```bash
cd SourceCode\React_Frontend\myreactdev
```

Check If there a another folder IndividualAssignment-SyedHusain-main inside IndividualAssignment-SyedHusain-main
If there is then do:
```bash
cd IndividualAssignment-SyedHusain-main\SourceCode\React_Frontend\myreactdev
```

# Create a React App:

Run the following commands to create a new React app:
```bash
npx create-react-app myreactdev
```

# Install React Libraries:
## Install the required React libraries using npm:

```bash
npm install react-router-dom --save
```
```bash
npm install axios --save
```


# Run the React Application:
Once all the libraries are installed, start the React development server with the following command:
```bash
npm start
```

# Using Application 
If the react app was able to run successfully, you should see this message on the terminal

```bash
You can now view myreactdev in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.56.1:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
```

Now you click on the local side directly to run the application on go to you browser and type `http://localhost:3000`.

# Code

The Code files include:

- [App.py](SourceCode/Flask_App_Backend/Flask_React_Crud/App.py)
- [App.js](SourceCode/React_Frontend/myreactdev/src/App.js)
- [CreateCourse.js](SourceCode/React_Frontend/myreactdev/src/pages/CreateCourse.js)
- [CreateEnrollment.js](SourceCode/React_Frontend/myreactdev/src/pages/CreateEnrollment.js)
- [CreateInstructor.js](SourceCode/React_Frontend/myreactdev/src/pages/CreateInstructor.js)
- [CreateUser.js](SourceCode/React_Frontend/myreactdev/src/pages/CreateUser.js)
- [EditCourse.js](SourceCode/React_Frontend/myreactdev/src/pages/EditCourse.js)
- [EditEnrollment.js](SourceCode/React_Frontend/myreactdev/src/pages/EditEnrollment.js)
- [EditInstructor.js](SourceCode/React_Frontend/myreactdev/src/pages/EditInstructor.js)
- [EditUser.js](SourceCode/React_Frontend/myreactdev/src/pages/EditUser.js)
- [ListCoursePage.js](SourceCode/React_Frontend/myreactdev/src/pages/ListCoursePage.js)
- [ListEnrollmentPage.js](SourceCode/React_Frontend/myreactdev/src/pages/ListEnrollmentPage.js)
- [ListInstructorPage.js](SourceCode/React_Frontend/myreactdev/src/pages/ListInstructorPage.js)
- [ListUserPage.js](SourceCode/React_Frontend/myreactdev/src/pages/ListUserPage.js)
