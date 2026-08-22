import crypto from "crypto";
const ALGORITHM = "aes-256-cbc";
if (!process.env.ENCRYPTION_KEY) {
    throw new Error("Encryption key is not configured");
}
// Derive a 32-byte key from ENCRYPTION_KEY
const ENCRYPTION_KEY = crypto
    .createHash("sha256")
    .update(process.env.ENCRYPTION_KEY)
    .digest();
/**
 * Encrypts cleartext using AES-256-CBC.
 * Returns the format `ivHex:encryptedHex`.
 */
export function encrypt(text) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return `${iv.toString("hex")}:${encrypted}`;
}
/**
 * Decrypts encrypted text formatted as `ivHex:encryptedHex` using AES-256-CBC.
 */
export function decrypt(encryptedText) {
    const [ivHex, encrypted] = encryptedText.split(":");
    if (!ivHex || !encrypted) {
        throw new Error("Invalid encrypted text format");
    }
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}
//# sourceMappingURL=encryption.js.map