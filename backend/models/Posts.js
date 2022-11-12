import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    userid:{
        type: String,
        required:true,
    },
    postedby:{
        type: String,
        required:true,
        trim:true,
        default:''
    },
    posttitle:{
        type: String,
        requied:true,
        trim:true,
        default:''
    },
    postbody:{
        type: String,
        requied:true,
        trim:true,
        default:''
    },
    postdate:{
        type: Date,
        default: Date.now
    }
});


export default mongoose.model('Post', PostSchema)