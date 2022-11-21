import express from 'express';
const router = express.Router();

import { userData,allUsers,addPosts, myPosts,deletePost ,allPost,updatePost,review,allreview,deleteReview} from '../controlers/JobsController.js';


router.route('/userdata').post(userData);
router.route('/all-users').get(allUsers);
router.route('/add-posts').post(addPosts);
router.route('/my-posts').post(myPosts);
router.route('/delete-post').delete(deletePost);
router.route('/all-post').get(allPost);
router.route('/update-post').patch(updatePost);
router.route('/review').post(review);
router.route('/all-review').get(allreview);
router.route('/delete-review').delete(deleteReview);
export default router;