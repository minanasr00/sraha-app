import crypto from "node:crypto";
import { algorithm, securityKey } from "../../../config/config.service.js";

/**
 * Encryption and Decryption utilities using AES-256-GCM
 */

export function encryptData(data) { 
    const IV = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(securityKey, 'hex'), IV);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const tag = cipher.getAuthTag().toString('hex');
    return `${IV.toString('hex')}:${tag}:${encrypted}`;
}

export function decryptData(encryptedData) {
    const [iv, tag, content] = encryptedData.split(':');
    
    const decipher = crypto.createDecipheriv(
        algorithm, 
        Buffer.from(securityKey, 'hex'), 
        Buffer.from(iv, 'hex')
    );
    
    decipher.setAuthTag(Buffer.from(tag, 'hex'));
    
    let decrypted = decipher.update(content, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
}