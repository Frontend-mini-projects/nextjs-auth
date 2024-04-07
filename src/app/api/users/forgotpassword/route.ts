import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import connect from "@/dbConfig/dbConfig";
import bcryptjs from 'bcryptjs';
import { sendEmail } from "@/helper/mailer";
connect();
export async function POST(request: NextRequest){
    try {
        const {email} = await request.json();
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({status: false, msg: "User not found"});
        }
        const userId = user?._id.toString();

        await sendEmail({email: user.email, emailType: "RESET", userId});
        return NextResponse.json({status: true, msg: "Reset password mail has been sent" });

    } catch (error:any) {
        console.log('error', error);
        return NextResponse.json({status: false, msg: "Internal Server Error"});
        
    }
}