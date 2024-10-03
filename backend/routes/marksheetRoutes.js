import express from 'express';
import multer from 'multer';
import { uploadCSV, getMarksheetTitles, getMarksheetByTitle , deleteMarksheet} from '../controllers/marksheetController.js';

const router = express.Router();

// Set up multer to handle file uploads (store the file in the 'uploads' directory)
const upload = multer({ dest: 'uploads/' });

// POST route for uploading CSV
router.post('/upload', upload.single('file'), uploadCSV);

// GET route for fetching distinct marksheet titles
router.get('/titles', getMarksheetTitles);

// GET route for fetching marksheet by title
router.get('/title/:title', getMarksheetByTitle);

router.delete('/:id', deleteMarksheet);

export default router;
