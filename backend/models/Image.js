import mongoose from 'mongoose';

const ImageSchema = mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    image:{
        data:Buffer,
        contentType:String
    }
});

export default mongoose.model('ImageModel', ImageSchema)