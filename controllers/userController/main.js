import User, { userSchema } from "../../models/user/main.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const showAllUsers = async(req, res) => {
    try {
        User.find((err, users) => {
            if (err) { res.send(err); return false; }
            res.status(200).send(users);
        });
    } catch (e) {
        res.status(404).send({ error: e.message });
    }
}

export const showAUser = async(req, res) => {
    try {
        User.findOne({ _id: req.params.uid }, (err, user) => {
            if (err) { res.send({ error: err.message }); return false; }

            if (!user) { res.status(404).send({ message: "User not found" }); return false; }

            res.status(200).send(user);
        });
    } catch (e) {
        res.status(404).send({ error: e.message });
    }
}

export const updateAUser = async(req, res) => {
    try {
        const { token } = req.body;

        if (!token) { res.status(404).send({ message: 'token required' }); return false; }

        const user = jwt.verify(token, process.env.SECRET);

        if (!user.id) { res.status(404).send({ message: 'invalid token' }); }

        if (req.body.password) {
            const password = await bcrypt.hash(req.body.password, 10);
            req.body.password = password;
        }

        User.findOneAndUpdate({ _id: req.params.uid }, req.body, (err, user) => {
            if (err) { res.status(422).send({ error: err.errors }); return false; }

            if (!user) { res.status(404).send({ message: "User not found" }); return false; }

            res.status(200).send({ message: "User updated" });
        });
    } catch (e) {
        res.status(404).send({ error: e.message });
    }
}

export const deleteAUser = async(req, res) => {
    try {
        User.findOneAndDelete({ _id: req.params.uid }, (err, user) => {
            if (err) { res.status(500).send({ error: err.message }); return false; }

            if (!user) { res.status(404).send({ message: "User not found" }); return false; }

            res.status(200).send({ message: "User deleted" });
        });
    } catch (e) {
        res.status(404).send({ error: e.message });
    }
}