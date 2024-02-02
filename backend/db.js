// db.js
const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb+srv://amitkumar823906:yMufWjRgzsgRTWEE@test-pro-db.hdfc1nl.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database', err);
  });


const studentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true }, 
  enrollmentDate: Date,
  state: { type: String, default: 'Maharashtra' } 
});

studentSchema.pre('save', async function (next) {
    const self = this;
    const result = await mongoose.models["Student"].findOne({ email: self.email });
    if (result) {
      self.invalidate("email", "Email must be unique");
      next(new Error(self.email + ' already exist in database'));
    } else {
      next();
    }
  });

const Student = mongoose.model('Student', studentSchema);

module.exports = {
  Student 
};