import mongoose, { Schema } from "mongoose";

export const districtSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    province: { type: Schema.Types.ObjectId, ref: "Province" }
}, { timestamps: true });

const District = mongoose.model('District', districtSchema);

export default District;