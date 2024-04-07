import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs, { hash } from 'bcryptjs';
export async function POST(request: NextRequest){
    try {
        
        const {token, password} = await request.json();
        const user = await User.findOne({forgetPasswordToken: token, forgetPasswordTokenExpiry: {$gt: Date.now()}});

        if(!user){
            return NextResponse.json({status: false, msg: "Invalid Token"});
        }
        console.log('user:', user);
        const hashedPassword = await bcryptjs.hash(password, 10);

        user.password = hashedPassword;
        user.forgetPasswordToken = undefined;
        user.forgetPasswordTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({status: true, msg: "Password reset successful"});

    } catch (error:any) {
        return NextResponse.json({status: false, msg: "Internal Server Error"});
    }
}