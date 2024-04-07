import { sendEmail } from "@/helper/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){

    try {
        const {email} = await request.json();
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({status: false, msg: "User does not exist"});
        }
        await sendEmail({email: user.email, emailType: "VERIFY", userId: user._id});

        return NextResponse.json({status: true, msg: "Verification email sent successful"});


    } catch (error:any) {
        return NextResponse.json({status: false, msg: "Internal Server Error"});
    }

}