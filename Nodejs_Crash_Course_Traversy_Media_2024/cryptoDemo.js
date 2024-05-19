import crypto from 'crypto'; // provides cryptographic functionality that includes a set of wrappers for OpenSSL's hash, HMAC, cipher, decipher, sign, and verify functions.
// //createHash()
// const hash = crypto.createHash('sha256');
// hash.update('password1234'); // to put the plain text passwords in the databases in a hashed form by using the SHA256 algorithm
// console.log(hash.digest('hex'));
// //randomBytes()
// crypto.randomBytes(16, (err,buf) => { // we can use it for generating user-ids, session tokens, etc.
//     if(err) throw err;
//     console.log(buf.toString('hex'));
// });
//createCipheriv & createDecipheriv - to encrypt and decrypt data
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const cipher  = crypto.createCipheriv(algorithm,key,iv);
let encrypted = cipher.update('Hello , this is a secret message', 'utf8','hex');
encrypted += cipher.final('hex');
console.log(encrypted);

const decipher = crypto.createDecipheriv(algorithm,key,iv);
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');
console.log(decrypted); 