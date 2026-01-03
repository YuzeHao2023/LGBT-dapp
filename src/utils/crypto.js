import { encrypt as mmEncrypt } from "@metamask/eth-sig-util";

// Helpers to convert between base64 and ArrayBuffer
function bufToBase64(buf) {
  return Buffer.from(buf).toString("base64");
}

function base64ToBuf(b64) {
  return Buffer.from(b64, "base64");
}

export function generateSymmetricKeyBase64() {
  // Use browser crypto for randomness
  const arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  return bufToBase64(arr);
}

export async function encryptWithSymKey(symKeyBase64, plaintext) {
  const keyBuf = base64ToBuf(symKeyBase64);
  const key = await crypto.subtle.importKey("raw", keyBuf, { name: "AES-GCM" }, false, ["encrypt"]);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const enc = new TextEncoder();
  const cipher = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, enc.encode(plaintext));
  return {
    ciphertext: bufToBase64(new Uint8Array(cipher)),
    iv: bufToBase64(iv)
  };
}

export async function decryptWithSymKey(symKeyBase64, ciphertextBase64, ivBase64) {
  const keyBuf = base64ToBuf(symKeyBase64);
  const key = await crypto.subtle.importKey("raw", keyBuf, { name: "AES-GCM" }, false, ["decrypt"]);
  const iv = base64ToBuf(ivBase64);
  const cipherBuf = base64ToBuf(ciphertextBase64);
  const plainBuf = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, cipherBuf);
  return new TextDecoder().decode(plainBuf);
}

export function encryptSymKeyWithPublicKey(pubKeyBase64, symKeyBase64) {
  // mmEncrypt expects recipient publicKey (base64) and returns an object with ciphertext components
  const enc = mmEncrypt({ publicKey: pubKeyBase64, data: symKeyBase64, version: "x25519-xsalsa20-poly1305" });
  // store as JSON string so contract can store bytes
  return JSON.stringify(enc);
}

export async function decryptSymKeyWithWallet(encryptedSymKeyJson, account) {
  // Use MetaMask eth_decrypt - must be triggered by the recipient wallet
  if (!window.ethereum) throw new Error("No wallet available");
  const decrypted = await window.ethereum.request({
    method: "eth_decrypt",
    params: [encryptedSymKeyJson, account]
  });
  return decrypted; // base64 symmetric key
}

// Simple IPFS stub: in production replace with web3.storage or pinata
export async function uploadToIPFSStub(data) {
  // returns a fake CID-like string so that frontend flow can be tested without external API keys
  const fakeCid = `bafy${Buffer.from(data).toString("hex").slice(0, 20)}`;
  return fakeCid;
}
