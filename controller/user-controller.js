const _ = require('lodash/core');
const bcrypt = require('bcryptjs');
const User = require('../model/user-model');
const UserCred = require('../model/user-cred-model');
const apiResponse = require('../helper/apiResponse');


exports.uerRegister = async (req, res) => {

    console.log("response", req.body);
    const { username, email, password, confirm, mobileno, gender } = req.body;

    try {

        const user = await User.create({
            username: username,
            email: email,
            password: password,
            confirm: confirm,
            mobileno: mobileno,
            gender: gender
        });

        console.log("user", user);

        if (_.isEmpty(user)) {

            return res.status(400).send({ status: false, message: "user is not created" });
        } else {
            apiResponse.successApiResponse(res, true, "user created successfully", user);
        }


    } catch (error) {
        console.log("error", error);
        return res.status(400).send({ status: false, message: "somethingwent wrong", error: error.message });
    }
},

    exports.userList = async (req, res) => {

        const userlist = await User.findById(req.query.id);

        if (_.isEmpty(userlist)) {
            return res.status(400).send({ status: false, message: "no user found", data: [] });
        } else {
            apiResponse.successApiResponse(res, true, "Users fetched successfully", userlist);
        }
    };

exports.userEdit = async (req, res) => {

    const useredited = await User.findByIdAndUpdate(req.query.id, req.body, { new: true });

    if (_.isEmpty(useredited)) {

        return res.status(400).send({ status: false, message: "user is not edited", data: [] });

    } else {

        apiResponse.successApiResponse(res, true, "Users edited successfully", useredited);
    }
},

exports.userDelete = async (req, res) => {

        await User.findByIdAndDelete(req.query.id);

        apiResponse.successApiResponse(res, true, "user Deleted successfully");
},

exports.userCredAdd = async(req,res)=>{

    try {

        const {userId,websitename,username, email, password} = req.body;

        encryptedPassword = await bcrypt.hash(password, 10);

        const usercred = new UserCred({
            userId:userId,
            websitename:websitename,
            username:username,
            email:email,
            password:encryptedPassword
        });


        await usercred.save((err,data)=>{

            if(err){
                return res.status(400).send({ status: false, message: "Data is not Added" });
            }else{
                apiResponse.successApiResponse(res, true, "Data Added successfully", usercred);
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(400).send({ status: false, message: "somethingwent wrong", error: error.message });
    }
   
},

exports.usercredList = async(req,res)=>{
        try {
            
            const credlist = await UserCred.find(req.query);

            if(_.isEmpty(credlist)){
                return res.status(400).send({ status: false, message: "no user found", data: [] });

            }else{
                apiResponse.successApiResponse(res, true, "Cred list Fetched successfully", credlist);
            }

        } catch (error) {
            return res.status(400).send({ status: false, message: "somethingwent wrong", error: error.message });
        }
},

exports.usercredEdit = async(req,res)=>{

    console.log("re.query.id", req.query.id);

    const usercrededited = await UserCred.findByIdAndUpdate(req.query.id, req.body, { new: true}).select({userId:0});

    if (_.isEmpty(usercrededited)) {

        return res.status(400).send({ status: false, message: "usercred is not edited", data: [] });

    } else {

        apiResponse.successApiResponse(res, true, "Users crededited successfully", usercrededited);
    }
};

