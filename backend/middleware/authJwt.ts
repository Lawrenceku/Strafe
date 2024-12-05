import { NextFunction, Request, Response } from "express";
const config = require('../config/auth.config.ts');

const jwt = require('jsonwebtoken');
// const User = db.user

const verifyToken = (req: any, res: Response, next: NextFunction) => {
    let token = req.headers["x-access-token"];
    
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    
    jwt.verify(token, config.secret , (err:any, decoded:any) => {
        if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
    }

    const authJwt = {
        verifyToken: verifyToken
    };

    module.exports = authJwt;