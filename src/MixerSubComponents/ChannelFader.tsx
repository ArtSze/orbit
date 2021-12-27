import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { ChannelFaderProps } from '../utils/types';

export const ChannelFader = ({
	label,
	onChange,
	defaultValue,
	color,
	max,
}: ChannelFaderProps) => {
	const calculateValue = (value: number) => {
		return value;
	};

	return (
		<div className={'channelFader'}>
			<Slider
				onChange={onChange}
				orientation="vertical"
				defaultValue={defaultValue}
				step={0.1}
				max={max ? max : -1}
				min={-15}
				scale={calculateValue}
				sx={{
					padding: '16px',
					marginBottom: '10px',
					'.MuiSlider-thumb': {
						borderRadius: '1px',
					},
					'.MuiSlider-rail': {
						top: '-4px',
						padding: '1px',
					},
					color: `${color}`,
				}}
				aria-label={`Channel${label}Fader`}
			/>
			<Typography variant="body1">{label}</Typography>
		</div>
	);
};
