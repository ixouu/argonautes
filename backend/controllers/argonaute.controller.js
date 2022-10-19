const argonauteModel = require('../models/argonauteSchema');

module.exports.addMember = async (req, res, next) => {
    try {
        const { name, age, strength, weapon } = req.body;
        // check if all the informations are provided
        if (!name || !age || !strength || !weapon) {
            return res.status(403).json({
                message: 'Please provide all necessary informations'
            })
        }
        // check if the name is already used r
        const memberIsExisting = await argonauteModel.find({ name: req.body.name })
        if (memberIsExisting.length !== 0) {
            return res.status(403).json({
                message: 'This name is already used, please choose an another one'
            })
        }
        // check type and length of name
        if (typeof name != 'string' || name.length > 35 || name.length < 2) {
            return res.status(403).json({
                message: 'Please provide a valid name'
            })
        }
        // check age
        if (typeof age != 'number' || age > 70 || age < 18) {
            return res.status(403).json({
                message: 'Please provide a valid age'
            })
        }
        // check strength
        if (typeof strength != 'number' || strength < 1 || strength > 5) {
            return res.status(403).json({
                message: 'Please provide a valid strength'
            })
        }
        // check weapons
        if (typeof weapon!= 'string') {
            return res.status(403).json({
                message: 'Please provide a valid weapon'
            })
        } else {
            const newMember = await argonauteModel.create({
                name: req.body.name,
                age: req.body.age,
                strength: req.body.strength,
                weapon: req.body.weapon
            })
            res.status(201).json({
                status: 'success',
                data: {
                    argonaute: newMember
                }
            })

        }
    }
    catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
}

module.exports.getMembers = async (req, res, next)  => {
    try{
        const crew = await argonauteModel.find();
        res.status(200).json({crew});
    }
    catch (error) {
        res.status(500).json(error);
    }
}
