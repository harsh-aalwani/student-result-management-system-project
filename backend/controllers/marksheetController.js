import csv from 'csv-parser';
import fs from 'fs';
import Marksheet from '../models/Marksheet.js';

// Controller to handle CSV upload
export const uploadCSV = (req, res) => {
    const { title, course, courseYear, semester } = req.body; // Destructure form fields

    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const results = [];

    // Read CSV file and parse it
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
            try {
                // Ensure the subjects field is parsed correctly
                data.subjects = JSON.parse(data.subjects); // Parse the subjects field
                results.push({
                    serialId: data.serialId,
                    studentName: data.studentName,
                    subjects: data.subjects,
                    totalMarks: parseFloat(data.totalMarks),
                    percentage: parseFloat(data.percentage),
                    grade: data.grade,
                    course: course, // Use course from the form
                    semester: semester, // Use semester from the form
                    year: courseYear, // Use courseYear from the form
                    marksheet_title: title // Use title from the form
                });
            } catch (error) {
                console.error('Error parsing subjects JSON:', error);
            }
        })
        .on('end', async () => {
            try {
                // Insert the parsed data into MongoDB
                await Marksheet.insertMany(results);
                res.status(200).json({ message: 'CSV data uploaded successfully' });
                console.log('Parsed results:', results);
            } catch (error) {
                console.error('Error saving data to database:', error);
                res.status(500).json({ message: 'Error saving data to the database', error: error.message });
            } finally {
                // Optionally, delete the uploaded file after processing
                fs.unlinkSync(filePath);
            }
        })
        .on('error', (error) => {
            console.error('Error reading CSV file:', error);
            res.status(500).json({ message: 'Error reading CSV file', error: error.message });
        });
};

// Controller to fetch distinct marksheet titles
export const getMarksheetTitles = async (req, res) => {
    try {
        const titles = await Marksheet.distinct('marksheet_title');
        res.status(200).json(titles);
    } catch (error) {
        console.error('Error fetching marksheet titles:', error);
        res.status(500).json({ message: 'Error fetching marksheet titles', error: error.message });
    }
};

// Controller to fetch marksheet data by title
export const getMarksheetByTitle = async (req, res) => {
    const { title } = req.params;
    try {
        const marksheets = await Marksheet.find({ marksheet_title: title });
        res.status(200).json(marksheets);
    } catch (error) {
        console.error('Error fetching marksheets by title:', error);
        res.status(500).json({ message: 'Error fetching marksheets', error: error.message });
    }
};

// Controller to fetch marksheet by serialId
export const getMarksheetBySerialId = async (req, res) => {
    const { serialNo } = req.params;
    console.log('Fetching marksheet with serialNo:', serialNo); // Debugging log
    try {
        const marksheet = await Marksheet.findOne({ serialId: serialNo });
        if (!marksheet) {
            return res.status(404).json({ message: 'No student found with this Serial ID' });
        }
        res.status(200).json(marksheet);
    } catch (error) {
        console.error('Error fetching marksheet by serial ID:', error);
        res.status(500).json({ message: 'Error fetching marksheet', error: error.message });
    }
};
export const deleteMarksheetById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedMarksheet = await Marksheet.findByIdAndDelete(id);
        if (!deletedMarksheet) {
            return res.status(404).json({ message: 'Marksheet not found' });
        }
        res.status(200).json({ message: 'Marksheet deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting marksheet', error });
    }
};
