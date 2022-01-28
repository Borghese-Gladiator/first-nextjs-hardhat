import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from "./ErrorFallback";
import {
  Heading,
  Box,
  Flex,
  Stack,
  Button,
  Text,
  FormControl,
  Input
} from '@chakra-ui/react';

const textOneLineStyle = { whiteSpace: "nowrap" }

export default function GreeterDisplay({ greeting, setGreeting, handleSubmitGreeting }) {
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