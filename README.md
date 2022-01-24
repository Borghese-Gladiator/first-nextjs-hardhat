# First Full Stack Blockchain
App to 
- View live: []()

## Table of Contents
- [Technologies](#technologies)
- [Local Setup Commands](#local-setup-commands)
- [Implementation](#implementation)

## Technologies
- Hardhat.js
- Ether.js
- Next.js - React framework with Routing, & serverless functions
- Chakra UI - component library
- Vercel - hosting platform

## Local Setup Commands
- Compile smart contract - ```npx hardhat compile```
- Start local network - ```npx hardhat node```
- Deploy contract to local network - ```npx hardhat run scripts/deploy.js --network localhost```
- Deploy to live network - ```npx hardhat run scripts/deploy.js --network ropsten```
- Start up Next.js local frontend - ```npm run dev```
- Deploy to Vercel (CD set up with GitHub repo - make new commit to deploy changes)

## Implementation

#### Groundwork
- Created MetaMask wallet with Chrome extension (did not add real Ether) - [https://metamask.io/download/](https://metamask.io/download/)
  - Changed settings to show test networks like localhost
  - Changed network to Ropsten
- Got 1 rETH with Faucet into my MetaMask wallet address (took around 3 minutes - was one of the following sites)
  - [https://faucet.metamask.io/](https://faucet.metamask.io/)
  - [https://faucet.ropsten.be/](https://faucet.ropsten.be/)
  - [https://faucet.dimensions.network/](https://faucet.dimensions.network/)
- Created account with Infura - [https://infura.io/](https://infura.io/)
- Used Repl to create my first Smart Contract - [https://replit.com/@inanis3/Solidity-starter-beta#contract.sol](https://replit.com/@inanis3/Solidity-starter-beta#contract.sol)

#### Steps
- npx create-next-app first-nextjs-hardhat
- npm install ethers hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers
- npx hardhat
- Rename sample-script.js to deploy.js
- npx hardhat compile
- npx hardhat node
- npx hardhat run scripts/deploy.js --network localhost
- npm run dev
- Added dotenv ENV file with Infura private key
- Added Infura private key to hardhat.config.js to connect to ropsten
- npx hardhat run scripts/deploy.js --network ropsten
- Verified deployed contract in Etherscan Ropsten Testnet Explorer [https://ropsten.etherscan.io/](https://ropsten.etherscan.io/)

### Bugs
- [https://stackoverflow.com/questions/66449576/importing-ethers-via-hardhat-fails-despite-official-testing-documentation](https://stackoverflow.com/questions/66449576/importing-ethers-via-hardhat-fails-despite-official-testing-documentation)

#### Resources
- Mainly followed here: [https://dev.to/dabit3/the-complete-guide-to-full-stack-ethereum-development-3j13](https://dev.to/dabit3/the-complete-guide-to-full-stack-ethereum-development-3j13)
- [https://hardhat.org/tutorial/](https://hardhat.org/tutorial/)
- Learned Solidity through [https://www.tutorialspoint.com/solidity/solidity_overview.htm](https://www.tutorialspoint.com/solidity/solidity_overview.htm)

#### Glossary
- Ethereum - blockchain platform that runs smart contracts
- Solidity - high level programming language for EVM
- EVM (Ethereum Virtual Machine) - runtime environment for smart contracts
- Smart Contract - code running on Blockchain guaranteed to produce same result for everyone who runs them. Enables credible transactions without third parties.
- Ropsten Ethereuem - Ethereuem test network supported by Geth and OpenEthereum (only Proof of Work testnet which means unpredictable block times and frequent chain reorganizations though it most closely resembles mainnet)
- Ropsten Ethereum Faucet - pool of Ropsten Ether from where you require rETHs and it sends to you automatically [https://faucet.ropsten.be/](https://faucet.ropsten.be/)
- OpenZeppelin - npm library for smart contract development. Developers can load base contract to build off of [https://github.com/OpenZeppelin/openzeppelin-contracts](https://github.com/OpenZeppelin/openzeppelin-contracts)
- Geth (Go Ethereum) - Go implementation of Ethereum
- ABI (Application Binary Interface) - interface between client-side application and blockchain like Ethereuem. ABIs are compiled from Solidity smart contracts.
- PolygonScan - Blockchain explorer to support high transaction activity [https://polygonscan.com/](https://polygonscan.com/)
- Ganache - local Ethereum network for development (equivalent of Hardhat Network)
- Infura/Alcehmy/Moralis - Blockchain Node Providers so developers do not need to set up and manage their own blockchain nodes. (I used Infura)

## Hardhat README
This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

## Next.js README
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
