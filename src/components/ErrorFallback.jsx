export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Alert status='success'>
      <AlertIcon />
      <Box flex='1'>
        <AlertTitle>Something went wrong:</AlertTitle>
        <AlertDescription display='block'>
          {error.message}
        </AlertDescription>
      </Box>
      <CloseButton position='absolute' right='8px' top='8px' onClick={resetErrorBoundary} />
    </Alert>
  );
};