/**
 * Encrypts cleartext using AES-256-GCM.
 * Returns the format `ivHex:encryptedHex:authTagHex`.
 */
export declare function encrypt(text: string): string;
/**
 * Decrypts encrypted text formatted as `ivHex:encryptedHex:authTagHex` using AES-256-GCM.
 * Falls back to AES-256-CBC if the formatted string has only 2 parts (iv:ciphertext).
 */
export declare function decrypt(encryptedText: string): string;
//# sourceMappingURL=encryption.d.ts.map