import connect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
connect();

export async function POST(request: NextRequest){
    try {
        console.log('verify request', request);
        const {token} = await request.json();

        const user = await User.findOne({verifyToken:token, verifyTokenExpiry: {$gt: Date.now()}});

        if(!user){
            return NextResponse.json({status: false, msg: "Invalid Token"});
        }
        console.log('user:', user);
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();


        return NextResponse.json({status: true, user, msg: "Email verified successful"});
        
    } catch (error:any) {
        return NextResponse.json({status: false, msg: error.message});
    }
}