import bcrypt from "bcrypt";

const pepper = process.env.PEPPER as string;
/**
 * compare hashes
 *
 * @export
 * @param {string} password
 * @param {string} hash
 * @return {*}  {string}
 */
export function compareHash(password: string, hash: string): boolean {
  const result = bcrypt.compareSync(password + pepper, hash);
  return result;
}
