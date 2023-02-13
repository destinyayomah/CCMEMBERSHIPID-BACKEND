import mongoose from "mongoose";

const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

export const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'fullname is required']
    },
    nickname: {
        type: String,
        required: [true, 'nickname is required']
    },
    username: {
        type: String,
        required: [true, 'username is required']
    },
    password: {
        type: String,
        minLength: [6, 'password too short'],
        maxLength: [64, 'password too long'],
        required: [true, 'password is required']
    },
    email: {
        type: String,
        required: [true, 'email address is required'],
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    occupation: {
        type: String
    },
    phone: {
        type: String,
        minLength: 7,
        maxLength: 15
    },
    province: {
        type: String
    },
    district: {
        type: String
    },
    facebook: String,
    twitter: String,
    graduate_at: {
        type: String
    },
    identity_photo: {
        type: String
    },
    selfie_photo: {
        type: String
    },
    administrator_field: {
        type: String,
    },
    administrator: {
        type: String,
        enum: ['Regional administrator', 'Branch manager', 'Regular member', 'Not yet an administrator'],
    },
    management_position: {
        type: String,
        enum: ['Chairman/deputy chairman', 'Secretary/deputy secretary', 'Treasurer/deputy treasurer', 'Field head', 'Not yet a member'],
    },
    last_education: {
        type: String,
        enum: ['Middle school', 'High School', 'Bachelor\'s degree', 'Master\'s degree'],
    },
    files: String,
    role: {
        type: String,
        enum: ['Superadmin', 'Admin', 'User'],
        required: [true, 'role is required']
    },
    status: {
        type: String,
        required: [true, 'status is required']
    },
    date_joined: String
});

const User = mongoose.model("User", userSchema);

export default User;