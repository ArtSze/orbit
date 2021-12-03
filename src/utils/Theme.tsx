import { createTheme } from '@mui/material/styles';

const themeOptions = {
	palette: {
		type: 'light',
		primary: {
			main: '#3696fe',
		},
		secondary: {
			main: '#fca52b',
		},
		success: {
			main: '#00c000',
		},
		info: {
			main: '#020202',
		},
	},
};

export const theme = createTheme(themeOptions);
