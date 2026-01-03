// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract SocialProtocol {
    struct Post {
        uint256 id;
        address author;
        string cid; // IPFS CID or content identifier
        uint256 timestamp;
    }

    Post[] private posts;

    // encrypted symmetric keys per post per recipient
    mapping(uint256 => mapping(address => bytes)) private encryptedKeys;

    // users can register their public encryption key (for example, MetaMask encryption public key)
    mapping(address => bytes) public encryptionPublicKeys;

    event PostCreated(uint256 indexed id, address indexed author, string cid, uint256 timestamp);
    event EncryptionKeySet(address indexed user, bytes publicKey);

    function setEncryptionPublicKey(bytes calldata publicKey) external {
        encryptionPublicKeys[msg.sender] = publicKey;
        emit EncryptionKeySet(msg.sender, publicKey);
    }

    function createPost(string calldata cid, address[] calldata recipients, bytes[] calldata encryptedKeysForRecipients) external {
        require(recipients.length == encryptedKeysForRecipients.length, "recipients and keys length mismatch");

        uint256 id = posts.length;
        posts.push(Post({id: id, author: msg.sender, cid: cid, timestamp: block.timestamp}));

        for (uint256 i = 0; i < recipients.length; i++) {
            encryptedKeys[id][recipients[i]] = encryptedKeysForRecipients[i];
        }

        emit PostCreated(id, msg.sender, cid, block.timestamp);
    }

    function getPost(uint256 id) external view returns (uint256, address, string memory, uint256) {
        require(id < posts.length, "invalid post id");
        Post storage p = posts[id];
        return (p.id, p.author, p.cid, p.timestamp);
    }

    function getEncryptedKey(uint256 id, address recipient) external view returns (bytes memory) {
        require(id < posts.length, "invalid post id");
        return encryptedKeys[id][recipient];
    }

    function totalPosts() external view returns (uint256) {
        return posts.length;
    }
}
