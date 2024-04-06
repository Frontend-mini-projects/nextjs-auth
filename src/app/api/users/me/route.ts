import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import connect from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helper/getDataFromToken";

connect();
export async function GET(request: NextRequest){


    try{
        console.log('from me bacend');
        const userId = await getDataFromToken(request);
        const user = await User.findById(userId).select("-password");
        if(!user){
            return NextResponse.json({status: false, msg: "User not found"})
        }
        return NextResponse.json({status: true, user, msg:"workings"})
    }
    catch(error){
        return NextResponse.json({status: false, msg: "Internal Server Error"});
    }
}