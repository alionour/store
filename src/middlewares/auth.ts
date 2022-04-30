import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/verify_token";

/**
 * authenticate token
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @return {*}
 */
export function auth(req: Request, res: Response, next: NextFunction) {
  try {
    // get the token from the header if present
    const token = req.headers.authorization!.split(" ")[1]; // Bearer <token>
    verifyToken(token);
    next();
  } catch (error) {
    res.status(401);
    res.json(`Invalid token ${error}`);
    return;
  }
}
