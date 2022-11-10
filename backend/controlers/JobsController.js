import User from '../models/User.js';


const createJob = async (req,res) =>{
    res.send('create job')
}
const deleteJob = async (req,res) =>{
    res.send('deleteJob job')
}
const updateJob = async (req,res) =>{
    res.send('updateJob')
}
const showStats = async (req,res) =>{
    res.send('show stats')
}

// send all users to the home page 

const allUsers = async (req,res) =>{
    User.find({}, function(err,user){
        if(err){
            res.status(400).json({msg:"server error"})
        }
        res.status(200).json({user})
    })
} 
const userData = async (req,res) =>{
    
    const id = req.body.userid;
    // console.log(id);

    User.findById(id, (err,data)=>{
        if(err){
            // console.log(err);
            res.status(404).send('user not found')
        }else{
            // console.log(data);
            res.status(200).send(data)
        }
    });
    
}

export {createJob, deleteJob, updateJob, showStats,userData,allUsers}