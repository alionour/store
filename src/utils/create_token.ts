import jwt from "jsonwebtoken";

/**
 * creates a token
 *
 * @export
 * @param {Object} payload
 * @return {*}  {string}
 */
export function generateToken(payload: Object): string {
  const secret = process.env.TOKEN_SECRET as string;
  const token = jwt.sign(payload, secret, {
    expiresIn: "72h",
  });
  return token;
}
