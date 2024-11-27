import { Request, Response, NextFunction } from 'express';
const db = require("../models");
const User = db.user;

const checkDuplicateUsernameOrEmail = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.username || !req.body.email) {
        return res.status(400).send({ message: "Username and email are required." });
    }

    try {
        // Check username
        const userByUsername = await User.findOne({
            where: { username: req.body.username },
        });

        if (userByUsername) {
            return res.status(400).send({ message: "Failed! Username is already in use!" });
        }

        // Check email
        const userByEmail = await User.findOne({
            where: { email: req.body.email },
        });

        if (userByEmail) {
            return res.status(400).send({ message: "Failed! Email is already in use!" });
        }

        // Proceed to the next middleware
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error while validating user data." });
    }
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
