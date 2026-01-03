# 合约部署说明

本项目包含一个最小的 `SocialProtocol` 合约，用于存储加密内容的 CID 以及为接收者保存加密后的对称密钥。下面是基本的本地编译与部署步骤：

1. 安装依赖

```bash
npm install
```

2. 编译合约

```bash
npm run compile-contracts
```

3. 本地节点（可选）并部署

- 在一个终端启动本地 Hardhat 节点：

```bash
npx hardhat node
```

- 在另一个终端部署合约到本地网络：

```bash
npm run deploy-contracts
```

部署脚本会输出合约地址。把地址拷贝到 `src/lib/contractConfig.js` 的 `SOCIAL_CONTRACT_ADDRESS` 常量中。

4. 前端使用

- 部署后，前端页面 `创建加密帖子` 会使用合约：
  - 用户登录后会尝试通过 `eth_getEncryptionPublicKey` 获取用户的加密公钥并写入链上（用户需在钱包确认）。
  - 发布帖子时，内容先在浏览器端用对称密钥（AES-GCM）加密，密文上传到 IPFS（当前为 stub），对称密钥会使用接收方注册的公钥（如果有）进行加密并作为 bytes 存储在链上。

注意：当前实现为示范性质，IPFS 上传为 stub（不使用真实存储服务），在生产环境请替换为 `web3.storage`、`pinata` 或类似服务。