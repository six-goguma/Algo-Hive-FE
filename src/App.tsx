import { Routes } from '@app/routes';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactQueryClientProvider } from '@shared/lib';
import { GlobalStyle } from '@widgets/themes';

const App = () => {
	return (
		<ReactQueryClientProvider>
			<ChakraProvider theme={GlobalStyle}>
				<Routes />
			</ChakraProvider>
		</ReactQueryClientProvider>
	);
};

export default App;
