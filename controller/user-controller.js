const User = require('../model/user-model');
const _ = require('lodash/core');
const apiResponse = require('../helper/apiResponse');


exports.uerRegister = async(req,res)=>{

    console.log("response", req.body);
    const{username,email,password,mobileno,gender} = req.body;
    
    try {
        
        const user = await User.create({
            username:username,
            email:email,
            password:password,
            mobileno:mobileno,
            gender:gender
        });

        console.log("user", user);

        if(_.isEmpty(user)){

            return res.status(400).send({ status: false, message:"user is not created"});
        }else{
            apiResponse.successApiResponse(res,true,"user created successfully",user);
        }


    } catch (error) {
        console.log("error", error);
        return res.status(400).send({ status: false, message:"somethingwent wrong", error:error.message});
    }
},

exports.userList = async(req,res)=>{

    console.log("list", req.query);
    console.log("list i", req.query.id);

    const userlist = await User.findById(req.query.id);
    if(_.isEmpty(userlist)){
        return res.status(400).send({ status: false, message:"no user found", data:[]});
    }else{
        apiResponse.successApiResponse(res,true,"Users fetched successfully",userlist);
    }
};

exports.userEdit = async(req,res)=>{

    const useredited = await User.findByIdAndUpdate(req.query.id,req.body,{new:true});

    if(_.isEmpty(useredited)){

        return res.status(400).send({ status: false, message:"user is not edited", data:[]});

    }else{

        apiResponse.successApiResponse(res,true,"Users edited successfully",useredited);
    }
},

exports.userDelete = async(req,res)=>{

    await User.findByIdAndDelete(req.query.id);

    apiResponse.successApiResponse(res,true,"user Deleted successfully");
}