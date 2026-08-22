/**
 * Encrypts cleartext using AES-256-CBC.
 * Returns the format `ivHex:encryptedHex`.
 */
export declare function encrypt(text: string): string;
/**
 * Decrypts encrypted text formatted as `ivHex:encryptedHex` using AES-256-CBC.
 */
export declare function decrypt(encryptedText: string): string;
//# sourceMappingURL=encryption.d.ts.map