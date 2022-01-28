import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from "./ErrorFallback";
import {
  Heading,
  Box,
  Stack,
  HStack,
  Button,
  Text,
} from '@chakra-ui/react';

const operationList = [
  { text: "+2", operate: (num) => num + 2 },
  { text: "-2", operate: (num) => num - 2 },
  { text: "*2", operate: (num) => num * 2 },
  { text: "/2", operate: (num) => num / 2 },
]

export default function SimpleStorageDisplay({ storageValue, setStorageValue, handleSubmitStorageValue }) {
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
