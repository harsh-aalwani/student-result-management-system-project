import express from 'express';
import multer from 'multer';
import {
    uploadCSV,
    getMarksheetTitles,
    getMarksheetByTitle,
    getMarksheetBySerialId,
    deleteMarksheetById,
} from '../controllers/marksheetController.js';

const router = express.Router();

// Set up multer to handle file uploads (store the file in the 'uploads' directory)
const upload = multer({ dest: 'uploads/' });

// POST route for uploading CSV
router.post('/upload', upload.single('file'), uploadCSV);

// GET route for fetching distinct marksheet titles
router.get('/titles', getMarksheetTitles);

// GET route for fetching marksheet by title
router.get('/title/:title', getMarksheetByTitle);

// GET route for fetching marksheet by serialId
router.get('/serial/:serialNo', getMarksheetBySerialId);

// DELETE route for deleting a marksheet by ID
router.delete('/:id', deleteMarksheetById);

export default router;
