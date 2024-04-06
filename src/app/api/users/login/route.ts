
import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import bcryptjs from 'bcryptjs';
import User from '@/models/userModel';
import jwt from 'jsonwebtoken';

connect();
export const POST = async (request: NextRequest) => {

    console.log('backend login called');
    try{

        
        const reqBody = await request.json();
        console.log('req body', reqBody);
        let {email, password} = reqBody;
        const uname = await User.findOne({email});
        
        if(!uname ){
            return NextResponse.json({status: false, msg: "User does not exist"})
        }
        const verifyPass = await bcryptjs.compare(password, uname.password);
        if(!verifyPass){
            return NextResponse.json({status: false, msg: "Invalid username/password"})
        }

        // create token data
        const tokenData = {
            id: uname._id,
            username: uname.username,
            email: uname.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "1d"});
        console.log('token', token);

        const response = NextResponse.json({
            msg: "Login successful",
            status: true
        })
        response.cookies.set("token", token);

        return response;

    }
    catch(error: any){
        console.log('error', error);
        return NextResponse.json({status: false, msg: `Error ${error}`}, {status: 500})
    }

}