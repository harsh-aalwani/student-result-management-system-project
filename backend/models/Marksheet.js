import mongoose from 'mongoose';

// Define a subject schema for better structure
const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    marks: { type: Number, required: true }
});

// Main marksheet schema
const marksheetSchema = new mongoose.Schema({
    serialId: { type: String, required: true, unique: true },
    studentName: { type: String, required: true },
    subjects: { type: [subjectSchema], required: true }, // Use the subject schema here
    totalMarks: { type: Number, required: true },
    percentage: { type: Number, required: true },
    grade: { type: String, required: true },
    course: { type: String, required: true },
    semester: { type: String, required: true },
    year: { type: String, required: true },
    marksheet_title: { type: String, required: true }
});

// Create the model
const Marksheet = mongoose.model('Marksheet', marksheetSchema);

export default Marksheet;
