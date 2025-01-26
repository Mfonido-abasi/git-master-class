/* This system is designed to manage the database of all SS3 Mathematics students for the school year. 
The school year is divided into 3 school terms; 1st term, 2nd term and 3rd term. 
In order to predict how the students will perfom in WAEC, the system is required to find the average of their scores from 1st and 2nd terms.
This will enable arrangements to provide lessons for the students with poor grades. 
The students fall into 3 class streams which is art, science and commercial students. 
The system is also required to hide student's names so that teacher can't directly know which grades belong to whom or manipulate the scores
*/ 

// Base class for general SS3 database
class SS3GeneralDatabase {
    static totalStudents = 374;
    static totalBoys = 200;
    static totalGirls = 174;
    
   static studentDistribution() {
       console.log ("115 Science Students, 182 Art Students, 77 Commercial Students")
    }
  
    constructor(students) {
      this.students = []; // Array to store student objects
    }
  
    // Method to add a new student
    addStudent(student) {
      this.students.push(student);
      console.log(`Student ${student.getName()} added successfully.`);
    }
  
    // View all students
    viewAllStudents() {
      this.students.forEach((student) => {
        console.log(student.getDetails());
      });
    }
  }
  
  // Class for SS3 Mathematics
  class SS3MathematicsDatabase extends SS3GeneralDatabase {
    constructor() {
      super();
    }
  
    // Override addStudent to ensure students have grades
    addStudent(student) {
      if (student.grades.length === 0) {
        throw new Error ("Cannot add student without grades.");
        return;
      }
      super.addStudent(student);
    }
  
    // Predict WAEC performance based on average grade
    predictWAECPerformance(studentID) {
      const student = this.students.find((s) => s.id === studentID);
      if (!student) {
        throw new Error (`No student found with ID: ${studentID}`);
        return;
      }
      const average = student.calculateAverage();
      const prediction =
        average >= 70
          ? "Excellent"
          : average >= 50
          ? "Good"
          : average >= 40
          ? "Fair"
          : "Needs Improvement";
      console.log(
        `Student ${student.getName()} (${student.id}): WAEC Prediction - ${prediction}`
      );
    }
  }
  
  // Student class
  class Student {
    #name; // Encapsulated property
  
    constructor(id, name, stream, grades = []) {
      this.id = id; // Unique ID
      this.#name = name; // Encapsulated name
      this.stream = stream; // Stream (Arts, Science, Commercial)
      this.grades = grades; // Array of grades for each term, eg: [85, 70, 90])
    }
  
    // Getter for encapsulated name
    getName() {
      return this.#name;
    }
  
    // Method to calculate average grade
    calculateAverage() {
      if (this.grades.length === 0) return 0;
      const total = this.grades.reduce((sum, grade) => sum + grade, 0);
      return (total / this.grades.length).toFixed(2);
    }
  
    // Get details about the student
    getDetails() {
      return `ID: ${this.id}, Stream: ${this.stream}, Average Grade: ${this.calculateAverage()}`;
    }
  }
   // SS3 Class details
   console.log("\nSS3 Class Details:"); 
   console.log (SS3GeneralDatabase)
   SS3GeneralDatabase.studentDistribution ()


  // Initialize SS3 Mathematics Database
  const mathDatabase = new SS3MathematicsDatabase();
  
  // Add students
  console.log("\nStudent Scores:");
  const student1 = new Student(1, "Augusta Ayotunde", "Science", [85, 90]);
  const student2 = new Student(2, "Chioma Ugwu", "Arts", [60, 70]);
  const student3 = new Student(3, "Layi Wusa", "Commercial", [20, 48]);
  
  mathDatabase.addStudent(student1);
  mathDatabase.addStudent(student2);
  mathDatabase.addStudent(student3);
  
  // View all students
  console.log("\nAll Students:");
  mathDatabase.viewAllStudents();
  
  // Predict WAEC performance
  console.log("\nWAEC Predictions:");
  mathDatabase.predictWAECPerformance(1);
  mathDatabase.predictWAECPerformance(2);
  mathDatabase.predictWAECPerformance(3);
  
  // Try to add a student without grades
  console.log("\nStudent without Grade:");
  const studentWithoutGrades = new Student(4, "David", "Science", []);
  mathDatabase.addStudent(studentWithoutGrades);