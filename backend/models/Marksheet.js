import mongoose from 'mongoose';

const marksheetSchema = new mongoose.Schema({
    serialId: { type: String, required: true, unique: true },
    studentName: { type: String, required: true },
    subjects: { type: Array, required: true },
    totalMarks: { type: Number, required: true },
    percentage: { type: Number, required: true },
    grade: { type: String, required: true },
    course: { type: String, required: true },
    semester: { type: String, required: true },
    year: { type: String, required: true },
    marksheet_title: { type: String, required: true }
});

const Marksheet = mongoose.model('Marksheet', marksheetSchema);

export default Marksheet;
