import User from "../../models/user/main.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const login = async(req, res) => {
    try {
        User.findOne({ username: req.body.username }, (err, user) => {
            if (err) { res.status(404).send({ err }); return false; }

            if (!user) { res.status(404).send({ message: 'Invalid credentials' }); return false; }

            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) { res.status(404).send({ err }); return false; }

                if (!result) { res.status(404).send({ message: 'Invalid credentials' }); return false; }

                const token = jwt.sign({
                    id: user._id,
                    username: user.username
                }, process.env.SECRET);

                res.status(200).send({ message: "Access Granted", token });
            });
        });
    } catch (e) {
        res.status(404).send({ error: e.message });
    }
}

export default login;