import Province from "../../models/province/main.js";

export const createProvince = (req, res) => {
    try {
        const { name } = req.body;
        const province = new Province({ name });
        province.save((err, result) => {
            if (err) {
                const errors = [];

                for (const key in err.errors) {
                    if (err.errors.hasOwnProperty(key)) {
                        errors.push(err.errors[key].message);
                    }
                }

                res.status(422).json({ errors }); return false;
            }

            res.status(200).json({ message: "Province created", provinceDTO: result });
        });
    } catch (e) {
        console.log(e);
    }
}

export const getAProvince = (req, res) => {
    try {
        Province.findOne({ _id: req.params.id }, (err, province) => {
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

            res.status(200).json(province);
        });
    } catch (e) {
        console.log(e);
    }
}

export const getAllProvince = (req, res) => {
    try {
        Province.find((err, provinces) => {
            if (err) {
                const errors = [];

                for (const key in err.errors) {
                    if (err.errors.hasOwnProperty(key)) {
                        errors.push(err.errors[key].message);
                    }
                }

                res.status(422).json({ errors }); return false;
            }

            res.status(200).json(provinces);
        });
    } catch (e) {
        console.log(e);
    }
}

export const updateAProvince = (req, res) => {
    try {
        Province.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }, (err, province) => {
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

            res.status(200).json({ message: "Province updated", provinceDTO: province });
        });
    } catch (e) {
        console.log(e);
    }
}

export const deleteAProvince = (req, res) => {
    try {
        Province.findOneAndRemove({ _id: req.params.id }, (err, province) => {
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

            res.status(200).json({ message: "Province deleted" });
        });
    } catch (e) {
        console.log(e);
    }
}

export const deleteMultipleProvince = (req, res) => {
    try {
        const { ids } = req.body;
        Province.deleteMany({ _id: { $in: ids } }, (err) => {
            if (err) {
                const errors = [];

                for (const key in err.errors) {
                    if (err.errors.hasOwnProperty(key)) {
                        errors.push(err.errors[key].message);
                    }
                }

                res.status(422).json({ errors }); return false;
            }

            res.status(200).json({ message: "Provinces deleted" });
        });
    } catch (e) {
        console.log(e);
    }
}