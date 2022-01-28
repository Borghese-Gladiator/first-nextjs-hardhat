import { useState } from "react";
import Head from 'next/head';
import Navbar from "../src/components/Navbar";
import GreeterDisplay from '../src/components/GreeterDisplay';
import SimpleStorageDisplay from '../src/components/SimpleStorageDisplay';
import {
  Heading,
  Box,
  Flex,
  Stack,
  VStack,
  HStack,
  Button,
  Text,
  FormControl,
  Input,
  Link,
  Center,
  Container
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const delay = ms => new Promise(res => setTimeout(res, ms));
const defaultGreeting = "";
const defaultStorageValue = 0;

function NoWalletDetected() {
  return (
    <Container
      maxW='container.sm'
      p={3}
      border='1px'
      borderColor='gray.200'
    >
      <VStack
        spacing={4}
      >
        <form
          action="https://metamask.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button colorScheme='teal' type="submit" isFullWidth>
            Install MetaMask 🦊<ExternalLinkIcon mx='2px' />
          </Button>
        </form>
        <Text fontSize='lg'>
          MetaMask is a Chrome Extension that lets you approve Ethereum
          transactions
        </Text>
        <Text fontSize='sm'>
          Once MetaMask is installed, this page should{' '}
          <Link color='teal.500' href='/'>
            refresh
          </Link>{' '}
          automatically
        </Text>
      </VStack>
    </Container>
  )
}


export default function Home({ contractList }) {
  console.log(contractList);
  const [greeting, setGreeting] = useState(defaultGreeting);
  const [storageValue, setStorageValue] = useState(defaultStorageValue);

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

  return (
    <div>
      <Head>
        <title>First DApp</title>
        <meta name="description" content="This DApp uses two contracts deployed to Ropsten TestNet (Greeter and SimpleStorage) and displays frontend to use the contracts. Only my wallet address has been AllowListed in Infura" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <Flex direction="column" justify="center" alignItems="center" style={{ minHeight: "80vh" }}>
          {
            typeof window !== "undefined" && typeof window.ethereum === "undefined"
              ? <NoWalletDetected />
              :
              <>
                <GreeterDisplay greeting={greeting} setGreeting={setGreeting} handleSubmitGreeting={handleSubmitGreeting} />
                <SimpleStorageDisplay
                  storageValue={storageValue}
                  setStorageValue={setStorageValue}
                  handleSubmitStorageValue={handleSubmitStorageValue}
                />
              </>
          }
        </Flex>
      </main>
    </div>
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
