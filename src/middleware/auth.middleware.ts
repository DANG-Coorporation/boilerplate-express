/// <reference path="../controllers/custom.d.ts" />

import { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";
import { UnauthorizedException } from "../helper/Error/UnauthorizedException/UnauthorizedException";
import { ProcessError } from "../helper/Error/errorHandler";
// import JwtService from "../service/jwt.service";
// import Users from "../database/models/user";

const serviceAccount = require("../../eventopia-jcwdol-011-firebase-adminsdk-5yqm4-618f9fc9af.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://eventopia-jcwdol-011.firebaseio.com",
});

export const firebaseAdmin = admin;
export default class AuthMiddleware {
  public async checkAuth(req: Request, res: Response, next: NextFunction) {
    // try {
    //   const bypassAuth = ["/external", "/auth", "/master-data", "/users"];
    //   for (let whitelist of bypassAuth) {
    //     if (req.path.startsWith(whitelist)) {
    //       return next();
    //     }
    //   }
    //   if (req.path === "/") {
    //     return next();
    //   }
    //   if (req.path.startsWith("/event") && req.method === "GET") {
    //     return next();
    //   }
    //   if (!req.headers.authorization)
    //     throw new UnauthorizedException("Unauthorized", {});
    //   req.user = undefined;
    //   const token = req.headers.authorization.split(" ")[1];
    //   const jwtService = new JwtService();
    //   try {
    //     const decoded = await jwtService.verifyToken(token);
    //     req.user = decoded;
    //   } catch (jwtError) {
    //     console.log("AuthMiddleware:checkAuth:JWT error");
    //     // If JWT verification fails, proceed to Firebase verification
    //     try {
    //       const decodedFirebase = await admin.auth().verifyIdToken(token);
    //       const uid = decodedFirebase.uid;
    //       const user = await Users.findOne({
    //         where: {
    //           googleUid: uid,
    //         },
    //       });
    //       if (!user) {
    //         throw new UnauthorizedException("Unauthorized", {});
    //       }
    //       req.user = user.toJSON();
    //     } catch (firebaseError) {
    //       console.log("AuthMiddleware:checkAuth:Firebase error");
    //       // If both JWT and Firebase verification fail, throw UnauthorizedException
    //       throw new UnauthorizedException("Unauthorized", {});
    //     }
    //   }
    //   // If either JWT or Firebase verification succeeds, continue with the next middleware
    //   next();
    // } catch (error) {
    //   console.log("apakah error?");
    //   ProcessError(error, res);
    // }
  }
}
