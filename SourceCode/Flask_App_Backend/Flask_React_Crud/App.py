# Import necessary libraries and modules
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

# Create a Flask web application
app = Flask(__name__)

# Enable CORS for the app to allow cross-origin requests
CORS(app)

# Configure the SQLAlchemy database connection
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:turabi!123@localhost/studentreportsyedhusain'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy and Marshmallow
db = SQLAlchemy(app)
ma = Marshmallow(app)

# Define the Students model
class Students(db.Model):
    __tablename__ = 'students'
    StudentID = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(255))
    CreditsEarned = db.Column(db.Integer)

    def __init__(self, StudentID, Name, CreditsEarned):
        self.StudentID = StudentID
        self.Name = Name
        self.CreditsEarned = CreditsEarned

# Define the StudentSchema for serialization
class StudentSchema(ma.Schema):
    class Meta:
        fields = ('StudentID', 'Name', 'CreditsEarned')

# Initialize StudentSchema instances
student_schema = StudentSchema()
students_schema = StudentSchema(many=True)

# Define a route for the home page
@app.route("/")
def hello_world():
    return "Hello World"

# Route to list all students
@app.route('/listusers', methods=['GET'])
def listusers():
    all_students = Students.query.all()
    results = students_schema.dump(all_students)
    return jsonify(results)

# Route to get details of a specific student
@app.route('/userdetails/<int:StudentID>', methods=['GET'])
def userdetails(StudentID):
    student = Students.query.get(StudentID)
    return student_schema.jsonify(student)

# Route to update a student's information
@app.route('/userupdate/<int:StudentID>', methods=['PUT'])
def userupdate(StudentID):
    student = Students.query.get(StudentID)

    # Extract data from the request JSON
    StudentID = request.json['StudentID']
    Name = request.json['Name']
    CreditsEarned = request.json['CreditsEarned']

    # Update the student's information and commit to the database
    student.StudentID = StudentID
    student.Name = Name
    student.CreditsEarned = CreditsEarned
    db.session.commit()

    return student_schema.jsonify(student)

# Route to delete a student
@app.route('/userdelete/<int:StudentID>', methods=['DELETE'])
def userdelete(StudentID):
    student = Students.query.get(StudentID)
    db.session.delete(student)
    db.session.commit()
    return student_schema.jsonify(student)

# Route to add a new student
@app.route('/useradd', methods=['POST'])
def useradd():
    StudentID = request.json['StudentID']
    Name = request.json['Name']
    CreditsEarned = request.json['CreditsEarned']

    # Create a new student and add to the database
    students = Students(StudentID=StudentID, Name=Name, CreditsEarned=CreditsEarned)
    db.session.add(students)
    db.session.commit()

    return student_schema.jsonify(students)

# Define the Instructors model
class Instructors(db.Model):
    __tablename__ = 'instructors'
    InstructorID = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(255))
    Department = db.Column(db.String(255))

    def __init__(self, InstructorID, Name, Department):
        self.InstructorID = InstructorID
        self.Name = Name
        self.Department = Department

# Define the InstructorSchema for serialization
class InstructorSchema(ma.Schema):
    class Meta:
        fields = ('InstructorID', 'Name', 'Department')

# Initialize InstructorSchema instances
instructor_schema = InstructorSchema()
instructors_schema = InstructorSchema(many=True)

# Route to list all instructors
@app.route('/listinstructors', methods=['GET'])
def listinstructors():
    all_instructors = Instructors.query.all()
    results = instructors_schema.dump(all_instructors)
    return jsonify(results)

# Route to get details of a specific instructor
@app.route('/instructordetails/<int:InstructorID>', methods=['GET'])
def instructordetails(InstructorID):
    instructor = Instructors.query.get(InstructorID)
    return instructor_schema.jsonify(instructor)

# Route to update an instructor's information
@app.route('/instructorupdate/<int:InstructorID>', methods=['PUT'])
def instructorupdate(InstructorID):
    instructor = Instructors.query.get(InstructorID)

    # Extract data from the request JSON
    InstructorID = request.json['InstructorID']
    Name = request.json['Name']
    Department = request.json['Department']

    # Update the instructor's information and commit to the database
    instructor.InstructorID = InstructorID
    instructor.Name = Name
    instructor.Department = Department

    db.session.commit()
    return instructor_schema.jsonify(instructor)

# Route to delete an instructor
@app.route('/instructordelete/<int:InstructorID>', methods=['DELETE'])
def instructordelete(InstructorID):
    instructor = Instructors.query.get(InstructorID)
    db.session.delete(instructor)
    db.session.commit()
    return instructor_schema.jsonify(instructor)

# Route to add a new instructor
@app.route('/instructoradd', methods=['POST'])
def instructoradd():
    InstructorID = request.json['InstructorID']
    Name = request.json['Name']
    Department = request.json['Department']

    # Create a new instructor and add to the database
    instructor = Instructors(InstructorID=InstructorID, Name=Name, Department=Department)
    db.session.add(instructor)
    db.session.commit()

    return instructor_schema.jsonify(instructor)

# Define the Courses model with a foreign key to Instructors
class Courses(db.Model):
    __tablename__ = 'courses'
    CourseID = db.Column(db.Integer, primary_key=True)
    CourseTitle = db.Column(db.String(255))
    InstructorID = db.Column(db.Integer, db.ForeignKey('instructors.InstructorID'))

    def __init__(self, CourseID, CourseTitle, InstructorID):
        self.CourseID = CourseID
        self.CourseTitle = CourseTitle
        self.InstructorID = InstructorID

# Define the CourseSchema for serialization
class CourseSchema(ma.Schema):
    class Meta:
        fields = ('CourseID', 'CourseTitle', 'InstructorID')

# Initialize CourseSchema instances
course_schema = CourseSchema()
courses_schema = CourseSchema(many=True)

# Route to list all courses
@app.route('/listcourses', methods=['GET'])
def listcourses():
    all_courses = Courses.query.all()
    results = courses_schema.dump(all_courses)
    return jsonify(results)

# Route to get course details
@app.route('/coursedetails/<int:CourseID>', methods=['GET'])
def coursedetails(CourseID):
    course = Courses.query.get(CourseID)
    return course_schema.jsonify(course)

# Route to update course details
@app.route('/courseupdate/<int:CourseID>', methods=['PUT'])
def courseupdate(CourseID):
    course = Courses.query.get(CourseID)

    # Extract data from the request JSON
    CourseID = request.json['CourseID']
    CourseTitle = request.json['CourseTitle']
    InstructorID = request.json['InstructorID']

    # Update the course's information and commit to the database
    course.CourseID = CourseID
    course.CourseTitle = CourseTitle
    course.InstructorID = InstructorID

    db.session.commit()
    return course_schema.jsonify(course)

# Route to delete a course
@app.route('/coursedelete/<int:CourseID>', methods=['DELETE'])
def coursedelete(CourseID):
    course = Courses.query.get(CourseID)
    db.session.delete(course)
    db.session.commit()
    return course_schema.jsonify(course)

# Route to add a new course
@app.route('/courseadd', methods=['POST'])
def courseadd():
    CourseID = request.json['CourseID']
    CourseTitle = request.json['CourseTitle']
    InstructorID = request.json['InstructorID']

    # Create a new course and add to the database
    course = Courses(CourseID=CourseID, CourseTitle=CourseTitle, InstructorID=InstructorID)
    db.session.add(course)
    db.session.commit()

    return course_schema.jsonify(course)

# Define the Enrollments model
class Enrollments(db.Model):
    __tablename__ = 'enrollments'
    EnrollmentID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    StudentID = db.Column(db.Integer, db.ForeignKey('students.StudentID'))
    CourseID = db.Column(db.Integer, db.ForeignKey('courses.CourseID'))
    Grade = db.Column(db.Integer)

    def __init__(self, StudentID, CourseID, Grade):
        self.StudentID = StudentID
        self.CourseID = CourseID
        self.Grade = Grade

# Define the EnrollmentSchema for serialization
class EnrollmentSchema(ma.Schema):
    class Meta:
        fields = ('EnrollmentID', 'StudentID', 'CourseID', 'Grade')

# Initialize EnrollmentSchema instances
enrollment_schema = EnrollmentSchema()
enrollments_schema = EnrollmentSchema(many=True)

# Route to list all enrollments
@app.route('/enrollments', methods=['GET'])
def list_enrollments():
    all_enrollments = Enrollments.query.all()
    result = enrollments_schema.dump(all_enrollments)
    return jsonify(result)

# Route to get enrollment details
@app.route('/enrollmentdetails/<int:EnrollmentID>', methods=['GET'])
def enrollment_details(EnrollmentID):
    enrollment = Enrollments.query.get(EnrollmentID)
    return enrollment_schema.jsonify(enrollment)

# Route to add a new enrollment
@app.route('/enrollmentadd', methods=['POST'])
def enrollment_add():
    StudentID = request.json['StudentID']
    CourseID = request.json['CourseID']
    Grade = request.json['Grade']

    # Create a new enrollment and add to the database
    enrollment = Enrollments(StudentID=StudentID, CourseID=CourseID, Grade=Grade)
    db.session.add(enrollment)
    db.session.commit()

    return enrollment_schema.jsonify(enrollment)

# Route to update enrollment details
@app.route('/enrollmentupdate/<int:EnrollmentID>', methods=['PUT'])
def enrollment_update(EnrollmentID):
    enrollment = Enrollments.query.get(EnrollmentID)

    # Extract data from the request JSON
    StudentID = request.json['StudentID']
    CourseID = request.json['CourseID']
    Grade = request.json['Grade']

    # Update the enrollment details and commit to the database
    enrollment.StudentID = StudentID
    enrollment.CourseID = CourseID
    enrollment.Grade = Grade

    db.session.commit()
    return enrollment_schema.jsonify(enrollment)

# Route to delete an enrollment
@app.route('/enrollmentdelete/<int:EnrollmentID>', methods=['DELETE'])
def enrollment_delete(EnrollmentID):
    enrollment = Enrollments.query.get(EnrollmentID)
    db.session.delete(enrollment)
    db.session.commit()
    return enrollment_schema.jsonify(enrollment)

# Start the Flask application
if __name__ == '__main__':
    app.run(debug=True)

