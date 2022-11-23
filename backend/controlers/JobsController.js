import User from '../models/User.js';
import Post from '../models/Posts.js';
import Review from '../models/Review.js';


// send all users to the home page 
const allUsers = async (req, res) => {
    User.find({}, function (err, user) {
        if (err) {
            res.status(400).json({ msg: "server error" })
        }
        res.status(200).json({ user })
    })
}
// Indivisual user data
const userData = async (req, res) => {

    const id = req.body.userid;
    // console.log(id);

    User.findById(id, (err, data) => {
        if (err) {
            // console.log(err);
            res.status(404).send('user not found')
        } else {
            // console.log(data);
            res.status(200).send(data)
        }
    });

}
// add post 
const addPosts = async (req, res) => {
    const { userid, name, lastname, posttitle, postbody } = req.body;
    if (!userid || !name || !lastname || !posttitle || !postbody) {
        res.status(406).json({ msg: "fill all the value" })
    } else {
        try {
            const post = await Post.create(req.body)
            // console.log(post);
            res.status(201).send('post created')
        }
        catch (err) {
            console.log('there an error saving post');
            res.status(400).send('err')
        }
    }
}

// get indivisual users all post 
const myPosts = async (req, res) => {
    const userid = req.body.userid;
    if (!userid || userid == '' || userid == null) {
        res.status(400).send('User not found')
    } else {
        const posts = await Post.find({ userid: userid })
        res.status(200).send(posts)
    }
}
// delete indivisual post
const deletePost = async (req, res) => {
    try {
        const id = req.body.postid;
        await Post.findByIdAndDelete(id)
        res.status(200).json({ msg: "Post Deleted" })
    }
    catch (err) {
        console.log('error');
        res.status(400).send("Error")
    }
}
// get all post
const allPost = async (req, res) => {
    try {
        Post.find({}, function (err, post) {
            if (err) {
                res.status(400).json({ msg: "server error" })
            }
            res.status(200).json({ post })
        })
    }
    catch (err) {
        res.status(400).send('err')
    }
}
// get indivisual post
const post = async (req,res) => {
    const id = req.body.postid;
    try{
        Post.findById(id, (err, data) => {
            if (err) {
                // console.log(err);
                res.status(404).send('post not found')
            } else {
                // console.log(data);
                res.status(200).json(data)
            }
        });
    }
    catch(err){
        res.send(400).send(err)
    }
    

}
// update post user name only for now 
const updatePost = async (req, res) => {
    const userid = req.body.userid;
    const { name, lastname, photo } = req.body;

    const filter = { 'userid': userid };
    const doc = await Post.find(filter);

    doc.map((ele) => {
        const update = {
            name: name == undefined ? ele.name : name == "" ? "" : name,
            lastname: lastname == undefined ? ele.lastname : lastname == "" ? "" : lastname,
            photo: photo == undefined ? ele.photo : photo == "" ? "" : photo,
        }
        Post.updateMany(filter, update, { upsert: true }, function (err, res) {
            if (err) {
                console.log('err');
                res.status(400).json({ msg: "not changed" })
            }
            return res;
        });
    })
}
// user review
const review = async (req, res) => {
    const { userid, name, lastname, photo, ratings, review } = req.body;
    if (!userid || !name || !lastname || !photo || !ratings || !review) {
        res.status(406).json({ msg: "fill all the value" })
    } else {
        try {
            const post = await Review.create(req.body)
            // console.log(post);
            res.status(201).send('Review posted')
        }
        catch (err) {
            console.log('there an error saving post');
            res.status(400).send('err')
        }
    }
}
// update post Review 
const updateReview = async (req, res) => {
    const userid = req.body.userid;
    const { name, lastname, photo } = req.body;

    const filter = { 'userid': userid };
    const doc = await Review.find(filter);

    doc.map((ele) => {
        const update = {
            name: name == undefined ? ele.name : name == "" ? "" : name,
            lastname: lastname == undefined ? ele.lastname : lastname == "" ? "" : lastname,
            photo: photo == undefined ? ele.photo : photo == "" ? "" : photo,
        }
        Review.updateMany(filter, update, { upsert: true }, function (err, res) {
            if (err) {
                console.log('err');
                res.status(400).json({ msg: "not changed" })
            }
            return res;
        });
    })
}
// find all review
const allreview = async (req, res) => {
    try{
        const allreview = await Review.find();
        res.status(200).json({allreview})
    }
    catch(err){
        res.status(400).send('err')
    }
 
}
// delete review
const deleteReview = async (req, res) => {
    try {
        const id = req.body.reviewid;
        await Review.findByIdAndDelete(id)
        res.status(200).json({ msg: "Review Deleted" })
    }
    catch (err) {
        console.log('error');
        res.status(400).send("Error");
    }
}

export { userData, allUsers, addPosts, myPosts, deletePost, allPost, updatePost,review,allreview,deleteReview,post,updateReview }