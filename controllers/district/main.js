import District from "../../models/district/main.js";
import Province from "../../models/province/main.js";

export const createDistrict = (req, res) => {
    try {
        const { name, province } = req.body;

        const district = new District(req.body);

        district.save((err, result) => {
            if (err) {
                const errors = [];

                for (const key in err.errors) {
                    if (err.errors.hasOwnProperty(key)) {
                        errors.push(err.errors[key].message);
                    }
                }

                res.status(422).json({ errors }); return false;
            }

            if (province != undefined) {
                Province.findOne({ _id: province }, (err, province) => {
                    if (err) {
                        const errors = [];

                        for (const key in err.errors) {
                            if (err.errors.hasOwnProperty(key)) {
                                errors.push(err.errors[key].message);
                            }
                        }

                        res.status(422).json({ errors }); return false;
                    }

                    if (!province) { res.status(404).json({ message: "Province not found" }) }

                    district.province = province;
                    district.save();

                    res.status(200).json({ message: "District created", districtDTO: result });
                });
            } else {
                res.status(200).json({ message: "District created", districtDTO: result });
            }
        })
    } catch (e) {
        console.log(e);
    }
}

export const getADistrict = (req, res) => {
    try {
        District.findOne({ _id: req.params.id }, (err, district) => {
            if (!district) { res.status(404).json({ message: "District not found" }); return false; }

            res.status(200).json(district);
        }).populate('province');
    } catch (e) {
        console.log(e);
    }
}

export const getAllDistrict = (req, res) => {
    try {
        District.find((err, districts) => {
            if (err) {
                const errors = [];

                for (const key in err.errors) {
                    if (err.errors.hasOwnProperty(key)) {
                        errors.push(err.errors[key].message);
                    }
                }

                res.status(422).json({ errors }); return false;
            }

            res.status(200).json(districts);
        }).populate('province');
    } catch (e) {
        console.log(e);
    }
}

export const updateADistrict = (req, res) => {
    try {
        District.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }, (err, district) => {
            // if (err) {
            //     const errors = [];

            //     for (const key in err.errors) {
            //         if (err.errors.hasOwnProperty(key)) {
            //             errors.push(err.errors[key].message);
            //         }
            //     }

            //     res.status(422).json({ errors }); return false;
            // }

            if (!district) { res.status(404).json({ message: "District not found" }); return false; }

            res.status(200).json({ message: "District updated", districtDTO: district });
        }).populate('province');
    } catch (e) {
        console.log(e);
    }
}

export const deleteADistrict = (req, res) => {
    try {
        District.findOneAndRemove({ _id: req.params.id }, (err, district) => {
            // if (err) {
            //     const errors = [];

            //     for (const key in err.errors) {
            //         if (err.errors.hasOwnProperty(key)) {
            //             errors.push(err.errors[key].message);
            //         }
            //     }

            //     res.status(422).json({ errors }); return false;
            // }

            if (!district) { res.status(404).json({ message: "District not found" }); return false; }

            res.status(200).json({ message: "District deleted" });
        });
    } catch (e) {
        console.log(e);
    }
}

export const deleteMultipleDistrict = (req, res) => {
    try {
        District.deleteMany({ _id: { $in: req.body.ids } }, (err) => {
            if (err) {
                const errors = [];

                for (const key in err.errors) {
                    if (err.errors.hasOwnProperty(key)) {
                        errors.push(err.errors[key].message);
                    }
                }

                res.status(422).json({ errors }); return false;
            }

            res.status(200).json({ message: "Districts deleted" });
        });
    } catch (e) {
        console.log(e);
    }
}