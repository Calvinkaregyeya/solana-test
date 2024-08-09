import { Keypair } from '@solana/web3.js';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET_KEY;

if (!secretKey) {
    throw new Error('SECRET_KEY is not set in the environment');
}

try {
    const secretKeyArray = JSON.parse(secretKey);
    const keypair = Keypair.fromSecretKey(Uint8Array.from(secretKeyArray));
    console.log(`Public Key: ${keypair.publicKey.toBase58()}`);
} catch (error) {
    console.error('Error parsing secret key:', error);
}