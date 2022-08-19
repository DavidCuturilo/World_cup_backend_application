import * as bcrypt from 'bcrypt';

export function encodePassword(rawPassword: string) {
  const SALT = bcrypt.genSaltSync();
  return bcrypt.hash(rawPassword, SALT);
}

export function comparePassword(rawPassword: string, hash: string) {
  return bcrypt.compareSync(rawPassword, hash);
}
