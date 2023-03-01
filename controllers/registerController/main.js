import mongoose from "mongoose";
import User, { userSchema } from "../../models/user/main.js";
import todayDate from "../../utils/date.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const registerUser = async (req, res) => {
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
            sub_district: req.body.sub_district,
            village: req.body.village,
            facebook: req.body.facebook,
            twitter: req.body.twitter,
            graduate_at: req.body.graduate_at,
            identity_photo: req.body.identity_photo,
            selfie_photo: req.body.selfie_photo,
            start_date: req.body.start_date,
            administrator: req.body.administrator,
            tunas: req.body.tunas,
            place_implementation_buds: req.body.place_implementation_buds,
            last_education: req.body.last_education,
            role: req.body.role,
            status: 'Inactive',
            date_joined: todayDate()
        });

        userSchema.path('email').validate(async (value) => {
            const emailCount = await mongoose.models.User.countDocuments({ email: value });
            return !emailCount;
        }, 'email already exists');

        userSchema.path('username').validate(async (value) => {
            const usernameCount = await mongoose.models.User.countDocuments({ username: value });

            return !usernameCount;
        }, 'username already exists');

        userSchema.path('role').validate(async (value) => {
            let result = true;

            if (value === 'Superadmin') { result = false; }
        }, 'Superadmin already exists');

        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) { res.status(422).send({ error: 'failed data parse handling' }); return false; }

            user.password = hash;
        });

        if (user.password) {
            user.save((err, result) => {
                if (err) {
                    const errors = [];

                    for (const key in err.errors) {
                        if (err.errors.hasOwnProperty(key)) {
                            errors.push(err.errors[key].message);
                        }
                    }

                    res.status(422).json({ errors }); return false;
                }

                const token = jwt.sign({
                    id: result._id,
                    email: result.email
                }, process.env.SECRET);

                res.status(201).send({ message: "User registered", token });
            });
        }
    } catch (e) {
        res.status(404).send({ error: e.message });
    }
}

export default registerUser;