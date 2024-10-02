const Marksheet = require('../models/Marksheet');

// Add student marksheet
exports.addMarksheet = async (req, res) => {
    const { studentName, rollNumber, subjectMarks } = req.body;
    try {
        const totalMarks = Object.values(subjectMarks).reduce((a, b) => a + b, 0);
        const percentage = totalMarks / Object.keys(subjectMarks).length;

        const newMarksheet = new Marksheet({
            studentName,
            rollNumber,
            subjectMarks,
            totalMarks,
            percentage
        });

        await newMarksheet.save();
        res.status(201).json({ message: 'Marksheet added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding marksheet', error });
    }
};
