import mongoose, { Schema } from "mongoose";

export const subDistrictSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    province: { type: Schema.Types.ObjectId, ref: 'Province' },
    district: { type: Schema.Types.ObjectId, ref: 'District' }
}, { timestamps: true });

const SubDistrict = mongoose.model('SubDistrict', subDistrictSchema);

export default SubDistrict;