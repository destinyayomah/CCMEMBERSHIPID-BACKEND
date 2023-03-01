import Village from "../../models/village/main.js";

export const createVillage = (req, res) => {
    try {
        const village = Village(req.body);
        village.save((err, result) => {
            if (err) {
                const errors = [];

                for (const key in err.errors) {
                    if (err.errors.hasOwnProperty(key)) {
                        errors.push(err.errors[key].message);
                    }
                }

                res.status(422).json({ errors }); return false;
            }

            res.status(200).json({ message: "Village created", villageDTO: result });
        });
    } catch (e) {
        console.log(e);
    }
}

export const getAVillage = (req, res) => {
    try {
        Village.findOne({ _id: req.params.id }, (err, village) => {
            if (!village) { res.status(404).json({ message: "Village not found" }); return false; }

            res.status(200).json(village);
        }).populate(['province', 'district', 'sub_district']);
    } catch (e) {
        console.log(e);
    }
}

export const getAllVillage = (req, res) => {
    try {
        Village.find((err, villages) => {
            if (err) {
                const errors = [];

                for (const key in err.errors) {
                    if (err.errors.hasOwnProperty(key)) {
                        errors.push(err.errors[key].message);
                    }
                }

                res.status(422).json({ errors }); return false;
            }

            res.status(200).json(villages);
        }).populate(['province', 'district', 'sub_district']);
    } catch (e) {
        console.log(e);
    }
}

export const updateAVillage = (req, res) => {
    try {
        Village.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }, (err, village) => {
            if (!village) { res.status(404).json({ message: "Village not found" }); return false; }

            res.status(200).json({ message: "Village updated", villageDTO: village });
        }).populate(['province', 'district', 'sub_district']);
    } catch (e) {
        console.log(e);
    }
}

export const deleteAVillage = (req, res) => {
    try {
        Village.findOneAndRemove({ _id: req.params.id }, (err, village) => {
            if (!village) { res.status(404).json({ message: "Village not found" }); return false; }

            res.status(200).json({ message: "Village deleted" });
        });
    } catch (e) {
        console.log(e);
    }
}

export const deleteMultipleVillage = (req, res) => {
    try {
        Village.deleteMany({ _id: { $in: req.body.ids } }, (err) => {
            if (err) {
                const errors = [];

                for (const key in err.errors) {
                    if (err.errors.hasOwnProperty(key)) {
                        errors.push(err.errors[key].message);
                    }
                }

                res.status(422).json({ errors }); return false;
            }

            res.status(200).json({ message: "Villages deleted" });
        });
    } catch (e) {
        console.log(e);
    }
}