
// Call smart contract on network
import { ethers } from 'ethers'
import Greeter from '../src/artifacts/contracts/Greeter.sol/Greeter.json'
import { useState } from "react";
// Frontend components
import RootLayout from '../src/components/RootLayout';
import NoWalletDetected from '../src/components/NoWalletDetected';
import GreeterDisplay from '../src/components/GreeterDisplay';
import SimpleStorageDisplay from '../src/components/SimpleStorageDisplay';

const delay = ms => new Promise(res => setTimeout(res, ms));
// const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const greeterAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

export default function Home({ contractList }) {
  console.log(contractList);
  const [greeting, setGreeting] = useState();
  const [storageValue, setStorageValue] = useState();

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  // call the smart contract, read the current greeting value
  async function fetchGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
      try {
        const data = await contract.greet()
        console.log('data: ', data)
      } catch (err) {
        console.log("Error: ", err)
      }
    }
  }

  // call the smart contract, send an update
  async function updateGreeting() {
    if (!greeting) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(greeting)
      await transaction.wait()
      fetchGreeting()
    }
  }

  const handleSubmitGreeting = async (e) => {
    e.preventDefault();
    const newGreeting = e.target.greeting.value;
    console.log("current greeting", greeting);
    console.log("new expected greeting", newGreeting);
  }
  const handleSubmitStorageValue = async (newValue) => {
    console.log("current storage", storageValue);
    console.log("new expected value", newValue);
    await delay(5000);
    console.log("Delay finished")
    return newValue;
  }

  if (typeof window !== "undefined" && typeof window.ethereum === "undefined") {
    return (
      <RootLayout>
        <NoWalletDetected />
      </RootLayout>
    )
  }

  return (
    <RootLayout>
      <button onClick={fetchGreeting}>Fetch Greeting</button>
      <button onClick={updateGreeting}>Set Greeting</button>
      <input onChange={e => setGreeting(e.target.value)} placeholder="Set greeting" />
      <GreeterDisplay greeting={greeting} setGreeting={setGreeting} handleSubmitGreeting={handleSubmitGreeting} />
      <SimpleStorageDisplay
        storageValue={storageValue}
        setStorageValue={setStorageValue}
        handleSubmitStorageValue={handleSubmitStorageValue}
      />
    </RootLayout>
  )
}

export async function getStaticProps() {
  const path = require('path');
  const fs = require('fs');
  const contractsDir = path.join(process.cwd(), "contracts")
  const filenames = fs.readdirSync(contractsDir).map(filename => {
    return (
      filename
    )
  });
  console.log(filenames)
  return {
    props: {
      contractList: filenames
    }
  }
}
