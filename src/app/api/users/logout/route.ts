import { NextResponse } from "next/server";

export const GET = async () =>{

    try{
        const response = NextResponse.json({status: true, msg: "Logout Successful"});
        console.log(response);
        response.cookies.set('token', "", {httpOnly: true, expires: new Date(0)});
        return response;

    }
    catch(error){
        return NextResponse.json({status: false, msg: `Error ${error}`}, {status: 500}) 
    }

}