import Course from '../models/Course.js';

// Fetch all courses
export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courses: ' + error.message });
    }
};

// Fetch course names only
export const getCourseNames = async (req, res) => {
    try {
        const courses = await Course.find({}, 'courseName'); // Fetch only courseName
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courses: ' + error.message });
    }
};

// Fetch course by ID
export const getCourseById = async (req, res) => {
    const { id } = req.params;

    try {
        const course = await Course.findById(id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching course: ' + error.message });
    }
};

// Create new course
export const createCourse = async (req, res) => {
    const { courseName, semester, description } = req.body;

    try {
        const newCourse = new Course({ courseName, semester, description });
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(500).json({ message: 'Error creating course: ' + error.message });
    }
};

// Update course by ID
export const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { courseName, semester, description } = req.body;

    try {
        const updatedCourse = await Course.findByIdAndUpdate(id, { courseName, semester, description }, { new: true });
        if (!updatedCourse) return res.status(404).json({ message: 'Course not found' });

        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({ message: 'Error updating course: ' + error.message });
    }
};

// Delete course by ID
export const deleteCourse = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCourse = await Course.findByIdAndDelete(id);
        if (!deletedCourse) return res.status(404).json({ message: 'Course not found' });

        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting course: ' + error.message });
    }
};
