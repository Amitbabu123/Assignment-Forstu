

const readXlsxFile = require('read-excel-file/node');
const mongoose = require('mongoose');
const { Student } = require('./db');


const filePath = './excelfile/excl.xlsx';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/scholarshipDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

readXlsxFile(filePath).then(async (rows) => {
  for (let i = 1; i < rows.length; i++) {
    const student = {
      name: rows[i][0],
      email: rows[i][1],
      enrollmentDate: rows[i][2],
    };

  
    try {
      await Student.create(student);
      console.log(`Info: ${student.name} saved successfully`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  
  mongoose.disconnect();
});
