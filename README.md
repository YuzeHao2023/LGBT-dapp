# LGBT-dapp
<img src="img/logo.svg" align="right" width="80px">
面向LGBTQ+群体的去中心化社交应用（目前只提供中文版本） Decentralized App for LGBTQ+ Community




# 开发目标
对于LGBTQ+群体尤其是来自中国的群体面临着隐私泄露的风险，为此我们开发一个去中心化的社交应用用于100%隐私保护的社交。


<h1 align="left">产品Demo</h1>

<img src="img/Demo1.png" align="center">

产品试用[Demo](https://lgbt-dapp.github.io/LGBT-dapp/)已经发布, 您可以访问该Demo体验，并可以使用Issue功能为我们提出新的意见。

应用使用MetaMask或其他钱包登录，并集成私聊，发帖等基本社交功能。


**LGBT dApp — 去中心化社交与社区表达平台**

一个基于以太坊智能合约与现代前端栈构建的去中心化社交演示项目，致力于为 LGBTQ+ 社区提供更私密、抗审查且可扩展的表达与互动空间。前端采用 Vite + React，合约使用 Hardhat，项目包含发帖、发现、个人资料与聊天等演示功能。

**为什么做这个项目**

- 为边缘化群体提供更高的隐私与表达自由，降低中心化平台对言论的干预风险。
- 作为教育与示范用途，展示如何把社交功能与智能合约结合，便于研究者与开发者学习与扩展。

**核心特性**

- 钱包登录与身份（以地址为基础）
- 帖子创建与发现（CreatePost、DiscoverPage）
- 个人主页与资料展示（ProfilePage）
- 聊天演示（ChatPage）
- 智能合约逻辑（见 contracts/SocialProtocol.sol）

技术栈
-------

- 前端：React + Vite + Tailwind CSS
- 合约与工具：Hardhat、ethers
- 状态与请求：zustand、react-query 等

仓库重要路径
----------------

- [src/](src/) — 前端源码，页面位于 [src/pages/](src/pages/)
- [contracts/SocialProtocol.sol](contracts/SocialProtocol.sol) — 智能合约
- [scripts/deploy.js](scripts/deploy.js) — 部署脚本
- [hardhat.config.js](hardhat.config.js) — Hardhat 配置
- [DEPLOY_GITHUB_PAGES.md](DEPLOY_GITHUB_PAGES.md) — GitHub Pages 部署说明

快速开始（开发者）
-------------------

先决条件：Node.js（推荐 18+）、npm

克隆并安装依赖：

```bash
git clone https://github.com/LGBT-dapp/LGBT-dapp.git
cd LGBT-dapp
npm install
```

启动前端开发服务器：

```bash
npm run dev
```

本地编译与部署合约：

1. 在新终端启动本地节点：

```bash
npx hardhat node
```

2. 编译并部署合约到本地节点：

```bash
npm run compile-contracts
npm run deploy-contracts
```

环境变量（示例）：在项目根目录创建 `.env` 或 `.env.local`，包含：

```
PRIVATE_KEY=你的本地测试私钥（仅测试用）
RPC_URL=https://your-rpc-provider
```

构建与预览生产包：

```bash
npm run build
npm run preview
```

常用脚本
---------

- `npm run dev` — 启动前端开发
- `npm run build` — 生成生产构建
- `npm run preview` — 本地预览构建
- `npm run compile-contracts` — 编译 Solidity 合约
- `npm run deploy-contracts` — 部署合约到本地节点

开发建议
---------

- 开发合约时在单独终端运行 `npx hardhat node` 进行联调。
- 前端通过 `lib/socialContract.js` 封装了常见合约调用，优先复用。
- 提交 PR 前请运行 `npm run lint` 并确保构建通过。

后续开发方向（建议）
--------------------

- 隐私增强：将敏感内容链下存储（IPFS、加密存储），仅上链必要索引或哈希；探索零知识证明方案。
- 身份与体验：集成 ENS/DID、支持更友好的用户名、资料恢复机制。
- 社区治理：实现投票/仲裁机制，或以 DAO 方式管理社区规则。
- 可扩展查询：添加索引子图（The Graph）或自建索引服务提升发现效率。
- 移动与离线：优化为 PWA，改善移动端交互体验。

贡献与联系
-------------

欢迎 issue、PR 与讨论：请先 fork 仓库、在本地分支完成修改并提交 PR。遇到设计或安全问题，优先在 Issue 讨论。

部署说明
---------

如果要部署到 GitHub Pages，请参阅 [DEPLOY_GITHUB_PAGES.md](DEPLOY_GITHUB_PAGES.md)。

许可证
-------

当前文档声明为开源项目，但仓库中尚未添加许可证文件。合并前请补充 LICENSE。

——

已完成 README 重构，包含功能介绍、快速上手、部署与后续方向。如果你希望我继续：

- 新增 `.env.example` 文件；
- 将 README 同步为英文版本；
- 或把部署脚本适配某个测试网，我可以接着做。
