const createJob = async (req,res) =>{
    res.send('create job')
}
const deleteJob = async (req,res) =>{
    res.send('deleteJob job')
}
const getAllJobs = async (req,res) =>{
    res.send('getAllJobs')
}
const updateJob = async (req,res) =>{
    res.send('updateJob')
}
const showStats = async (req,res) =>{
    res.send('show stats')
}



export {createJob, deleteJob ,getAllJobs, updateJob, showStats}