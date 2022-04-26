import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/verify_token';

/**
 * authenticate token
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @return {*} 
 */
export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    try {
        verifyToken(req.headers['Authorization'] as string);
        next();
    } catch (error) {
        res.status(401);
        res.json(`Invalid token ${error}`);
        return;
    }

}
