import mongoose from "mongoose";

const connect = async () =>{
    try{
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', ()=>{
            console.log('Mongodb connected successfully');
        });

        connection.on('error', (err)=>{
            console.log('Error in connecting mongo', err);
            process.exit();
        })
    }
    catch(err){
        console.log('Something went wrong');
        console.log(err);
        
    }
} 
export default connect;