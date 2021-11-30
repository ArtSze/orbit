import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

type ChannelFaderProps = {
	numLabel: number;
	onChange: (
		event: Event,
		value: number | number[],
		activeThumb: number
	) => void;
};

export const ChannelFader = ({ numLabel, onChange }: ChannelFaderProps) => {
	const calculateValue = (value: number) => {
		return Math.pow(value, 0.1);
	};

	return (
		<div>
			<Slider
				onChange={onChange}
				orientation="vertical"
				defaultValue={-1}
				max={-1}
				min={-60}
				scale={calculateValue}
				sx={{
					'.MuiSlider-thumb': {
						borderRadius: '1px',
					},
				}}
				aria-label={`Channel${numLabel}Fader`}
			/>
			<Typography variant="h3">{numLabel}</Typography>
		</div>
	);
};
