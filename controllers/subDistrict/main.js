import SubDistrict from "../../models/subDistrict/main.js";

export const createSubDistrict = (req, res) => {
    try {
        const subDistrict = SubDistrict(req.body);
        subDistrict.save((err, result) => {
            if (err) {
                const errors = [];

                for (const key in err.errors) {
                    if (err.errors.hasOwnProperty(key)) {
                        errors.push(err.errors[key].message);
                    }
                }

                res.status(422).json({ errors }); return false;
            }

            res.status(200).json({ message: "Sub District created", subDistrictDTO: result });
        });
    } catch (e) {
        console.log(e);
    }
}

export const getASubDistrict = (req, res) => {
    try {
        SubDistrict.findOne({ _id: req.params.id }, (err, subDistrict) => {
            if (!subDistrict) { res.status(404).json({ message: "Sub District not found" }); return false; }

            res.status(200).json(subDistrict);
        }).populate(['province', 'district']);
    } catch (e) {
        console.log(e);
    }
}

export const getAllSubDistrict = (req, res) => {
    try {
        SubDistrict.find((err, subDistricts) => {
            if (err) {
                const errors = [];

                for (const key in err.errors) {
                    if (err.errors.hasOwnProperty(key)) {
                        errors.push(err.errors[key].message);
                    }
                }

                res.status(422).json({ errors }); return false;
            }

            res.status(200).json(subDistricts);
        }).populate(['province', 'district']);
    } catch (e) {
        console.log(e);
    }
}

export const updateASubDistrict = (req, res) => {
    try {
        SubDistrict.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }, (err, subDistrict) => {
            if (!subDistrict) { res.status(404).json({ message: "Sub District not found" }); return false; }

            res.status(200).json({ message: "Sub District updated", subDistrictDTO: subDistrict });
        }).populate(['province', 'district']);
    } catch (e) {
        console.log(e);
    }
}

export const deleteASubDistrict = (req, res) => {
    try {
        SubDistrict.findOneAndRemove({ _id: req.params.id }, (err, subDistrict) => {
            if (!subDistrict) { res.status(404).json({ message: "Sub District not found" }); return false; }

            res.status(200).json({ message: "Sub District deleted" });
        });
    } catch (e) {
        console.log(e);
    }
}

export const deleteMultipleSubDistrict = (req, res) => {
    try {
        SubDistrict.deleteMany({ _id: { $in: req.body.ids } }, (err) => {
            if (err) {
                const errors = [];

                for (const key in err.errors) {
                    if (err.errors.hasOwnProperty(key)) {
                        errors.push(err.errors[key].message);
                    }
                }

                res.status(422).json({ errors }); return false;
            }

            res.status(200).json({ message: "Sub Districts deleted" });
        });
    } catch (e) {
        console.log(e);
    }
}