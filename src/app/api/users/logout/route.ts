import { NextResponse } from "next/server";

export const GET = async () =>{

    try{
        const response = NextResponse.json({status: true, msg: "Logout Successful"});
        response.cookies.set('token', "");
        return response;

    }
    catch(error){
        return NextResponse.json({status: false, msg: `Error ${error}`}, {status: 500}) 
    }

}