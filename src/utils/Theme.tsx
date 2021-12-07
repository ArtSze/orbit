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

type blue = '#3696fe';
type orange = '#fca52b';
type green = '#00c000';
type grey = ' #020202';

export type ThemeColors = blue | orange | green | grey;
