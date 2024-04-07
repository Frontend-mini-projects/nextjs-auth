
import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import bcryptjs from 'bcryptjs';
import User from '@/models/userModel';
import { sendEmail } from "@/helper/mailer";

connect();
export const POST = async (request: NextRequest) => {

    console.log('backend signup called');
    try{

        
        const reqBody = await request.json();
        console.log('req body', reqBody);
        let {username, email, password} = reqBody;
        const uname = await User.findOne({username});
        if(uname){
            return NextResponse.json({status: false, msg: "Username already exist"});
        }
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({status: false, msg: "Email already exist"});
        }

        // hash password
        const hashedPassword = await bcryptjs.hash(password, 10);
        console.log('hashed password', hashedPassword);

        // create user instance
        const newUser = await User.create({
            username, email, password: hashedPassword
        })

        if(!newUser){
            return NextResponse.json({status: false, msg: "something went wrong"});
        }

        await sendEmail({email: newUser.email, emailType: "VERIFY", userId: newUser._id});
        return NextResponse.json({status: true, msg: "Signup successful",user: newUser});

    }
    catch(error: any){
        console.log('error', error);
        return NextResponse.json({status: false, msg: `Error ${error}` })
    }

}