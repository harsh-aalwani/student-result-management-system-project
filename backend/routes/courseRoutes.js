import express from 'express';
import { getAllCourses, getCourseById, updateCourse, createCourse, deleteCourse } from '../controllers/courseController.js';

const router = express.Router();

// Route to get all courses
router.get('/', getAllCourses);

// Route to get a course by ID
router.get('/:id', getCourseById);

// Route to create a new course
router.post('/', createCourse); // Ensure this route is set up correctly

// Route to update a course by ID
router.put('/update/:id', updateCourse);

// Route to delete a course by ID
router.delete('/:id', deleteCourse);

export default router;
    