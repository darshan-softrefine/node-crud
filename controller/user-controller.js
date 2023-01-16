const _ = require('lodash/core');
const bcrypt = require('bcryptjs');
const User = require('../model/user-model');
const UserCred = require('../model/user-cred-model');
const apiResponse = require('../helper/apiResponse');
const { use } = require('../routes/routes');
const crypt = require('../helper/crpyto');

exports.uerRegister = async (req, res) => {

    const { username, email, password, confirm, mobileno, gender } = req.body;

    try {

        const encryptedPassword = crypt.encrypt(password);

        const user = await User.create({
            username: username,
            email: email,
            password: encryptedPassword,
            confirm: encryptedPassword,
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

exports.userLogin = async(req,res)=>{

    const{email,password} = req.body;

    if (!(email && password)) {
        return res.status(400).send({ status: false, message:"All input is required"});
    }

    const user = await User.findOne({email});

    if(!user){
        return res.status(400).send({ status: false, message:"You are not registered, please signup"});
    }
    
    const decryptedPassword = crypt.decrypt(user.password);

    if (user && password === decryptedPassword) {
        apiResponse.successApiResponse(res,true,"user loggedin",user);
    }else{
        return res.status(400).send({ status: false, message:"wrong Password"});
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

        if(JSON.stringify(req.body) === '{}'){
            return res.status(400).send({ status: false, message: "Please Add required field"});
        }
        req.body.password  = crypt.encrypt(req.body.password);
        const usercred = new UserCred(req.body);
        await usercred.save();
        apiResponse.successApiResponse(res, true, "Data Added successfully", usercred);

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
},

exports.userDecryptPassword = async(req,res)=>{

    const user = await UserCred.findById(req.query.id);

    const decryptedPassword = crypt.decrypt(user.password);

    console.log("usercred",decryptedPassword);

    apiResponse.successApiResponse(res,true,"decrypted password fetched", decryptedPassword);

};
