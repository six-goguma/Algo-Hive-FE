import { Routes } from '@app/routes';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactQueryClientProvider } from '@shared/lib';

const App = () => {
	return (
		<ReactQueryClientProvider>
			<ChakraProvider>
				<Routes />
			</ChakraProvider>
		</ReactQueryClientProvider>
	);
};

export default App;
