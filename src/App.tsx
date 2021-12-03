import React from 'react';
import Mixer from './Mixer';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './utils/Theme';

const App = () => {
	return (
		<div>
			<link
				rel="stylesheet"
				href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
			/>
			<header></header>

			<ThemeProvider theme={theme}>
				<Mixer />
			</ThemeProvider>
		</div>
	);
};

export default App;
