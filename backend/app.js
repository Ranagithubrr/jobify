import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import connDb from './db/connect.js';
import bodyparser from 'body-parser';
dotenv.config();

const PORT = process.env.PORT || 6000;


// routers setup
import authRouter from './routes/AuthRoutes.js';
import jobRouter from './routes/JobsRoutes.js';


// initialize app
const app = express();


app.use(bodyparser.json())
app.use(cors());
app.use(express.json());



app.get('/',(req,res)=>{
    res.json({msg:'Hello from the backend'}) 
    // res.end('hello from backend server')
});
app.get('/api/v1',(req,res)=>{
    res.json({msg:'This is the api'}) 
    // res.end('hello from backend server')
});

app.use('/api/v1/auth', authRouter )
app.use('/api/v1/jobs', jobRouter )


// not found path
app.get('*',(req,res)=>{
    res.send('Path not found')
})



// connect the database and if connected then start the server 

const dbstart = async () =>{
    try{
        await connDb(process.env.MONGO_URL);
        app.listen(PORT,()=>{
            console.log(`server is running at port ${PORT} and connected to db`);
        })
    }
    catch(err){
        console.log('db not connected, cause server stopped');
        console.log(err);
    }
}
dbstart()