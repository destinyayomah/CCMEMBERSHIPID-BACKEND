import mongoose from "mongoose";
import dotenv from 'dotenv';
import express from 'express';
import User from "../models/user/main.js";
import todayDate from "./date.js";
import bcrpt from 'bcrypt';

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

const connectDB = async() => {
    try {
        mongoose.set("strictQuery", false);

        mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true },
            (err) => {
                if (err) { res.send(err); return false; }

                // CREATE SUPERADMIN
                User.findOne({ role: 'Superadmin' }, (err, user) => {
                    if (err) { res.status(404).send({ error: err }); return false; }

                    if (!user) {
                        bcrpt.hash(process.env.PASSWORD, 10, (err, hash) => {
                            if (err) { res.status(500).send({ error: err }); return false; }
                            const superadmin = User({
                                fullname: 'Superadmin',
                                nickname: 'superadmin',
                                username: 'superadmin',
                                password: hash,
                                email: 'superadmin@gmail.com',
                                role: 'Superadmin',
                                status: 'Active',
                                date_joined: todayDate()
                            });

                            superadmin.save();
                        });
                    }
                });

                console.log('connected to database');
            });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;