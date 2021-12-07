import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as Metronome } from '../assets/metronome-svgrepo-com.svg';

export const MetronomeIcon = (props: any) => {
	return (
		<SvgIcon
			component={Metronome}
			viewBox="0 0 511.999 511.999"
			{...props}></SvgIcon>
	);
};
