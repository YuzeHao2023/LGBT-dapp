import { ethers } from "ethers";
import { SOCIAL_CONTRACT_ADDRESS } from "./contractConfig";

const SocialABI = [
  "function setEncryptionPublicKey(bytes publicKey)",
  "function encryptionPublicKeys(address) view returns (bytes)",
  "function createPost(string cid, address[] recipients, bytes[] encryptedKeysForRecipients)",
  "function getPost(uint256 id) view returns (uint256, address, string, uint256)",
  "function getEncryptedKey(uint256 id, address recipient) view returns (bytes)",
  "function totalPosts() view returns (uint256)",
  "event PostCreated(uint256 indexed id, address indexed author, string cid, uint256 timestamp)",
  "event EncryptionKeySet(address indexed user, bytes publicKey)"
];

function getProvider() {
  if (typeof window.ethereum !== "undefined") {
    return new ethers.BrowserProvider(window.ethereum);
  }
  throw new Error("No web3 provider");
}

export async function getContract(signerRequired = false) {
  const provider = getProvider();
  if (signerRequired) {
    const signer = await provider.getSigner();
    return new ethers.Contract(SOCIAL_CONTRACT_ADDRESS, SocialABI, signer);
  }
  return new ethers.Contract(SOCIAL_CONTRACT_ADDRESS, SocialABI, provider);
}

export async function setEncryptionPublicKeyOnChain(publicKey) {
  const contract = await getContract(true);
  const tx = await contract.setEncryptionPublicKey(publicKey);
  return tx;
}

export async function getEncryptionPublicKeyOnChain(address) {
  const contract = await getContract(false);
  return await contract.encryptionPublicKeys(address);
}

export async function createPostOnChain(cid, recipients, encryptedKeys) {
  const contract = await getContract(true);
  const tx = await contract.createPost(cid, recipients, encryptedKeys);
  return tx;
}

export async function getPostOnChain(id) {
  const contract = await getContract(false);
  const res = await contract.getPost(id);
  return { id: res[0], author: res[1], cid: res[2], timestamp: Number(res[3]) };
}

export async function getEncryptedKeyOnChain(postId, recipient) {
  const contract = await getContract(false);
  return await contract.getEncryptedKey(postId, recipient);
}

export async function totalPosts() {
  const contract = await getContract(false);
  const t = await contract.totalPosts();
  return Number(t);
}
