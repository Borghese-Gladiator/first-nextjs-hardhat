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
  HStack,
  Button,
  Text,
  FormControl,
  Input,
} from '@chakra-ui/react';

const textOneLineStyle = { whiteSpace: "nowrap" }
const defaultGreeting = "";
const defaultStorageValue = 0;

export default function Home({ contractList }) {
  console.log(contractList);
  const [greeting, setGreeting] = useState(defaultGreeting);
  const [storageValue, setStorageValue] = useState(defaultStorageValue);

  const operationList = [
    { text: "+2", operate: (num) => num + 2 },
    { text: "-2", operate: (num) => num - 2 },
    { text: "*2", operate: (num) => num * 2 },
    { text: "/2", operate: (num) => num / 2 },
  ]
  const handleSubmitGreeting = (e) => {
    e.preventDefault();
    console.log("current greeting", greeting);
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
        <Flex direction="column" justify="center" alignItems="center">
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
                      <Input placeholder={greeting} size="lg" onChange={event => setGreeting(event.target.value)} />
                      <Button>Submit</Button>
                    </Flex>
                  </FormControl>
                </form>
              </Stack>
            </Box>
          </ErrorBoundary>
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
                    <Button key={`operate-btn-${idx}`} onClick={() => setStorageValue(operate(storageValue))}>{text}</Button>
                  )}
                </HStack>
              </Stack>
            </Box>
          </ErrorBoundary>
        </Flex>
      </main>
    </div >
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
