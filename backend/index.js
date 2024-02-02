const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { sendEmailNotification } = require('./email'); 
const { Student } = require('./db');

app.use(bodyParser.json());

app.post('/submit-form', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();

    await sendEmailNotification(
      req.body.email,
      'Form Submission',
      'Thank you for submitting the form.'
    );

    res.status(200).json({ message: 'Form submitted successfully.' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});
app.get('/scholarship-assignments', async (req, res) => {
    try {
      const scholarshipAssignments = await getScholarshipAssignments(); 
  
      res.status(200).json(scholarshipAssignments);
    } catch (error) {
      console.error('Error fetching scholarship assignments:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
