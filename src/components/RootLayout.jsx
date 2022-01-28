import Head from 'next/head';
import Navbar from "./Navbar";
import {
  Flex,
} from '@chakra-ui/react';

export default function RootLayout({ children }) {
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
          {children}
        </Flex>
      </main>
    </div>
  )
}