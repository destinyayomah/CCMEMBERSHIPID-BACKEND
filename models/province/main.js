import mongoose from "mongoose";

export const provinceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    }
}, { timestamps: true });

const Province = mongoose.model('Province', provinceSchema);

export default Province;