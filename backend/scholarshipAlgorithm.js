const { Student } = require('./db');

// Define eligibility criteria
const isEligible = (student) => {
  // Example criteria: Student must have an enrollment date in the past year
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  return student.enrollmentDate > oneYearAgo;
};

// Assign scholarship based on eligibility criteria
const assignScholarship = async () => {
  try {
    // Fetch all students from the database
    const students = await Student.find();

    // Process each student
    for (const student of students) {
      if (isEligible(student)) {
        // Assign scholarship to the eligible student
        // You can implement your logic here
        console.log(`Scholarship assigned to ${student.name}`);
      }
    }
  } catch (error) {
    console.error('Error assigning scholarships:', error);
  }
};

// Run the scholarship assignment algorithm
assignScholarship();
