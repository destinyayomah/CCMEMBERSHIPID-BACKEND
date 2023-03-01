import mongoose, { Schema } from "mongoose";

export const villageSchemea = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    province: { type: Schema.Types.ObjectId, ref: 'Province' },
    district: { type: Schema.Types.ObjectId, ref: 'District' },
    sub_district: { type: Schema.Types.ObjectId, ref: 'SubDistrict' }
}, { timestamps: true });

const Village = mongoose.model('Village', villageSchemea);

export default Village;