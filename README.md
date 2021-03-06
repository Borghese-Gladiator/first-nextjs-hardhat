# First Full Stack Blockchain
App uses two contracts deployed to Ropsten TestNet (Greeter and SimpleStorage) and displays frontend to use the contracts. Only my wallet address has been AllowListed in Infura
- View live: [https://first-nextjs-hardhat.vercel.app/](https://first-nextjs-hardhat.vercel.app/)

## Table of Contents
- [Technologies](#technologies)
- [Local Setup Commands](#local-setup-commands)
- [Implementation](#implementation)

## Technologies
- Hardhat.js - Ethereum development environment
- Ether.js - library to allow developers to interact with Ethereum blockchain (necessary for hardhat)
- Next.js - React framework with default Routing and serverless functions (internally uses Node.js server)
- Chakra UI - component library
- Vercel - hosting platform for JAMStack apps (frontend with serverless functions)

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
- npm i dotenv
- Add dotenv config to hardhat.config.js
- Created Ropsten project using tutorial and saved project ID to .env [https://blog.infura.io/getting-started-with-infura-28e41844cc89/](https://blog.infura.io/getting-started-with-infura-28e41844cc89/)
  - Add Metamask account wallet address to "CONTRACT ADDRESSES" AllowList
  - Validate project is connected to Mainnet with curl call from WSL (NOTE - curl command did not work on Windows due to \" issue)
    - Mainnet - ```curl https://mainnet.infura.io/v3/{INFURA_PROJECT_ID} -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params": [],"id":1}'```
    - Ropsten - ```curl https://ropsten.infura.io/v3/{INFURA_PROJECT_ID} -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params": [],"id":1}'```
- Exported private key from Metamask account and Infura project ID into .env file for dotenv
- Used Infura project ID and Metamask Account private to hardhat.config.js
- npx hardhat run scripts/deploy.js --network ropsten
- Verified deployed contract in Etherscan Ropsten Testnet Explorer [https://ropsten.etherscan.io/](https://ropsten.etherscan.io/)
  - First deployed smart contract [https://ropsten.etherscan.io/address/0x5faE1243c0D292d7FdA51fc08872D8e3C25d81C0](https://ropsten.etherscan.io/address/0x5faE1243c0D292d7FdA51fc08872D8e3C25d81C0)
- Wrote up frontend
  - Installed Chakra UI - ```npm i @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^5```
  - Added ChakraProvider to _app for Next.js to load styles
  - Wrote Header and then Display for both contracts in index.js
  - Used React Error Boundaries to localize Contract errors
  - Add icons - ```npm i @chakra-ui/icons```

### Bugs
- [https://stackoverflow.com/questions/66449576/importing-ethers-via-hardhat-fails-despite-official-testing-documentation](https://stackoverflow.com/questions/66449576/importing-ethers-via-hardhat-fails-despite-official-testing-documentation)
- ```{"code":-32602,"message":"Trying to send a raw transaction with an invalid chainId. The expected chainId is 31337"``` - fix by updating hardhat.config.js (missing ```hardhat: { chainId: 337 }```) [https://hardhat.org/metamask-issue.html](https://hardhat.org/metamask-issue.html)

#### Takeaways
- Learned that when testing, NAME MY ACCOUNTS!! Currently, I don't know which test account to interact with which network
- Use react-query to expedite frontend code

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
- ETH2 - Ethereum 2.0 to use PoS as opposed to original ETH which uses PoW.
- PoW (Proof of Work) - Consensus mechanism to validate transactions and mint new currency by having miners calculate next valid hash for given transaction and broadcast it to the network. Therefore, computational power enables miners to get ahead of each other.
- PoS (Proof of Stakes) - Consensus mechanism to validate transactions and mint new currency. Instead of computing power, network substitutes staking for computational ppower and individual's mining ability is randomized by network.
- PoA (Proof of Authority) - Consenus mechanism for test networks where authorized users have full control.
- WSL (Windows Subsystem for Linux) - setup info here [https://docs.microsoft.com/en-us/windows/wsl/install](https://docs.microsoft.com/en-us/windows/wsl/install)

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
