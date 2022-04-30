import bcrypt from "bcrypt";

const saltRounds = process.env.SALT_ROUNDS as string;
const pepper = process.env.PEPPER as string;
/**
 * hashes the given password through bcrypt
 *
 * @export
 * @param {string} password
 * @return {*}  {string}
 */
export function hashPassword(password: string): string {
  const hash: string = bcrypt.hashSync(password + pepper, parseInt(saltRounds));
  return hash;
}
