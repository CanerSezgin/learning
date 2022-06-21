import crypto from 'crypto'

export interface Hash {
    iv: string,
    encrypted: string
}

export class CryptoService {
    private key = crypto.randomBytes(32)
    private algorithm = 'aes-256-cbc'

    encrypt(text: string): Hash {
        const iv = crypto.randomBytes(16)
        const cipher = crypto.createCipheriv(this.algorithm, Buffer.from(this.key), iv)
        const encrypted = Buffer.concat([cipher.update(text), cipher.final()])
        return {
            iv: iv.toString('hex'),
            encrypted: encrypted.toString('hex')
        }
    }

    decrypt(hash: Hash) {
        const iv = Buffer.from(hash.iv, 'hex')
        const encrypted = Buffer.from(hash.encrypted, 'hex')
        const decipher = crypto.createDecipheriv(this.algorithm, Buffer.from(this.key), iv)
        const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()])
        return decrypted.toString()
    }
}