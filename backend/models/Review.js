import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    userid:{
        type: String,
        required:true,
    },
    name:{
        type: String,
        required:true,
        trim:true,
        default:''
    },
    lastname:{
        type: String,
        trim:true,
        default:''
    },
    photo:{
        type: String,
        trim:true,
        default:null
    },
    ratings:{
        type: Number,
        trim:true,
        default:1
    },
    review:{
        type: String,
        trim:true,
        default:''
    }
});


export default mongoose.model('Review', ReviewSchema)