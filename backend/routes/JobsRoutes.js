import express from 'express';
const router = express.Router();

// import { createJob, deleteJob, updateJob, showStats } from '../controlers/JobsController';
import { userData, deleteJob, updateJob, showStats } from '../controlers/JobsController.js';



// router.route('/').post(createJob).get(getAllJobs);
// remember about id 
router.route('/stats').get(showStats);
router.route('/:id').delete(deleteJob).patch(updateJob);
router.route('/userdata').post(userData);
export default router;