import jwt from 'jsonwebtoken';


/**
 * verifies a token
 *
 * @export
 * @param {string} token
 * @return {*}  {string}
 */
export function verifyToken(token: string): boolean {
    try {
        const secret = process.env.TOKEN_SECRET as string;
        jwt.verify(
            token,
            secret,
        );
        return true;
    } catch (error) {
        throw new Error(`can not verify token ${error}`);

    }

}
