import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";

if (!process.env.ENCRYPTION_KEY) {
  throw new Error("Encryption key is not configured");
}

// Derive a 32-byte key from ENCRYPTION_KEY
const ENCRYPTION_KEY = crypto
  .createHash("sha256")
  .update(process.env.ENCRYPTION_KEY)
  .digest();

/**
 * Encrypts cleartext using AES-256-GCM.
 * Returns the format `ivHex:encryptedHex:authTagHex`.
 */
export function encrypt(text: string): string {
  const iv = crypto.randomBytes(12); // Standard GCM IV is 12 bytes
  const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag().toString("hex");
  return `${iv.toString("hex")}:${encrypted}:${authTag}`;
}

/**
 * Decrypts encrypted text formatted as `ivHex:encryptedHex:authTagHex` using AES-256-GCM.
 * Falls back to AES-256-CBC if the formatted string has only 2 parts (iv:ciphertext).
 */
export function decrypt(encryptedText: string): string {
  const parts = encryptedText.split(":");
  
  // Backward compatibility check
  if (parts.length === 2) {
    const [ivHex, encrypted] = parts;
    if (!ivHex || !encrypted) {
      throw new Error("Invalid legacy encrypted text format");
    }
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  }

  if (parts.length !== 3) {
    throw new Error("Invalid encrypted text format");
  }

  const [ivHex, encrypted, authTagHex] = parts;
  if (!ivHex || !encrypted || !authTagHex) {
    throw new Error("Invalid GCM encrypted text format");
  }
  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");
  const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
  decipher.setAuthTag(authTag);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
