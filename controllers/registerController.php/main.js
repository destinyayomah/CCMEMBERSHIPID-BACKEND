import mongoose from "mongoose";
import User, { userSchema } from "../../models/user/main.js";
import todayDate from "../../utils/date.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const registerUser = async(req, res) => {
    try {
        const user = new User({
            fullname: req.body.fullname,
            nickname: req.body.nickname,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            gender: req.body.gender,
            occupation: req.body.occupation,
            phone: req.body.phone,
            province: req.body.province,
            district: req.body.district,
            facebook: req.body.facebook,
            twitter: req.body.twitter,
            graduate_at: req.body.graduate_at,
            identity_photo: req.body.identity_photo,
            selfie_photo: req.body.selfie_photo,
            administrator_field: req.body.administrator_field,
            administrator: req.body.administrator,
            management_position: req.body.management_position,
            last_education: req.body.last_education,
            files: req.body.files,
            role: req.body.role,
            status: 'Inactive',
            date_joined: todayDate()
        });

        userSchema.path('email').validate(async(value) => {
            const emailCount = await mongoose.models.User.countDocuments({ email: value });
            return !emailCount;
        }, 'email already exists');

        userSchema.path('username').validate(async(value) => {
            const usernameCount = await mongoose.models.User.countDocuments({ username: value });

            return !usernameCount;
        }, 'username already exists');

        userSchema.path('role').validate(async(value) => {
            let result = true;

            if (value === 'Superadmin') { result = false; }

            console.log(result);
        }, 'Superadmin already exists');

        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) { res.status(422).send({ error: err }); return false; }

            user.password = hash;
        });

        user.save((err, result) => {
            if (err) { res.status(422).send({ error: err }); return false; }

            const token = jwt.sign({
                id: result._id,
                email: result.email
            }, process.env.SECRET);

            res.status(201).send({ message: "User registered", token });
        });
    } catch (e) {
        res.status(404).send({ error: e.message });
    }
}

export default registerUser;