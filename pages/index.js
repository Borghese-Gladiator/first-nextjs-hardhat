import Head from 'next/head'
import { useState } from "react";
import Navbar from "../src/components/Navbar";
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from "../src/components/ErrorFallback";
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
import { ExternalLinkIcon } from '@chakra-ui/icons'

const delay = ms => new Promise(res => setTimeout(res, ms));
const textOneLineStyle = { whiteSpace: "nowrap" }
const defaultGreeting = "";
const defaultStorageValue = 0;
const operationList = [
  { text: "+2", operate: (num) => num + 2 },
  { text: "-2", operate: (num) => num - 2 },
  { text: "*2", operate: (num) => num * 2 },
  { text: "/2", operate: (num) => num / 2 },
]

function NotConfiguredMetaMaskDisplay() {
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

function GreeterContractDisplay({ greeting, setGreeting, handleSubmitGreeting }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => setGreeting(defaultGreeting)}
    >
      <Box
        minWidth={"10rem"}
        borderWidth={2}
        mt={3}
        p={3}
        width={[
          '100%', // 0-30em
          '80%', // 30em-48em
          '60%', // 48em-62em
          '40%', // 62em+
        ]}
      >
        <Stack>
          <Heading>Greeter</Heading>
          <Text p>Current greeting: {greeting}</Text>
          <form onSubmit={handleSubmitGreeting}>
            <FormControl isRequired>
              <Flex alignItems="center" m={1}>
                <Text style={textOneLineStyle}>Set Greeting</Text>
                <Box pl={1} />
                <Input name="greeting" placeholder={greeting} size="lg" />
                <Button type="submit">Submit</Button>
              </Flex>
            </FormControl>
          </form>
        </Stack>
      </Box>
    </ErrorBoundary>
  )
}

function SimpleStorageContractDisplay({ storageValue, setStorageValue, handleSubmitStorageValue }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => setStorageValue(defaultStorageValue)}
    >
      <Box
        minWidth={"10rem"}
        borderWidth={2}
        mt={3}
        p={3}
        width={[
          '100%', // 0-30em
          '80%', // 30em-48em
          '60%', // 48em-62em
          '40%', // 62em+
        ]}
      >
        <Stack>
          <Heading>SimpleStorage</Heading>
          <Text p>Current value: {storageValue}</Text>
          <HStack>
            {operationList.map(({ text, operate }, idx) =>
              <Button key={`operate-btn-${idx}`} onClick={() => {
                handleSubmitStorageValue(operate(storageValue)).then((val) => {
                  setStorageValue(val)
                })
              }}>{text}</Button>
            )}
          </HStack>
        </Stack>
      </Box>
    </ErrorBoundary>
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
      <div>
        <Navbar />
        <main>
          {
            typeof window !== "undefined" && typeof window.ethereum !== "undefined"
              ?
              <NotConfiguredMetaMaskDisplay />
              :
              <>
                <GreeterContractDisplay greeting={greeting} setGreeting={setGreeting} handleSubmitGreeting={handleSubmitGreeting} />
                <SimpleStorageContractDisplay
                  storageValue={storageValue}
                  setStorageValue={setStorageValue}
                  handleSubmitStorageValue={handleSubmitStorageValue}
                />
              </>
          }
        </main>
      </div>
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
