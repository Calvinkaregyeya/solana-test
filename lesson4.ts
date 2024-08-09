import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey,
  } from "@solana/web3.js";
  import "dotenv/config";
  import { getKeypairFromEnvironment } from "@solana-developers/helpers";
  import { Keypair } from '@solana/web3.js';
import dotenv from 'dotenv';

dotenv.config();
   
  const suppliedToPubkey = process.argv[2] || null;
   
  if (!suppliedToPubkey) {
    console.log(`Please provide a public key to send to`);
    process.exit(1);
  }

  const secretKey = process.env.SECRET_KEY;

  if (!secretKey) {
    throw new Error('SECRET_KEY is not set in the environment');
}
   

  const secretKeyArray = JSON.parse(secretKey);
  const senderKeypair = Keypair.fromSecretKey(Uint8Array.from(secretKeyArray));
  console.log(`Public Key: ${senderKeypair.publicKey.toBase58()}`);
   
  console.log(`suppliedToPubkey: ${suppliedToPubkey}`);
   
  
  const toPubkey = new PublicKey(suppliedToPubkey);
   
  const connection = new Connection("https://api.devnet.solana.com", "confirmed");
   
  console.log(
    `✅ Loaded our own keypair, the destination public key, and connected to Solana`,
  );
   
  const transaction = new Transaction();
   
  const LAMPORTS_TO_SEND = 5000;
   
  const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey,
    lamports: LAMPORTS_TO_SEND,
  });
   
  transaction.add(sendSolInstruction);
   
  const signature = await sendAndConfirmTransaction(connection, transaction, [
    senderKeypair,
  ]);
   
  console.log(
    `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `,
  );
  console.log(`Transaction signature is ${signature}!`);