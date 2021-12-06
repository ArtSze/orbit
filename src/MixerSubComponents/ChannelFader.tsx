import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

type ChannelFaderProps = {
	label: string;
	onChange: (
		event: Event,
		value: number | number[],
		activeThumb: number
	) => void;
	defaultValue: number;
};

export const ChannelFader = ({
	label,
	onChange,
	defaultValue,
}: ChannelFaderProps) => {
	const calculateValue = (value: number) => {
		return value;
	};

	return (
		<div>
			<Slider
				onChange={onChange}
				orientation="vertical"
				defaultValue={defaultValue}
				step={0.1}
				max={-1}
				min={-15}
				scale={calculateValue}
				sx={{
					'.MuiSlider-thumb': {
						borderRadius: '1px',
					},
				}}
				aria-label={`Channel${label}Fader`}
			/>
			<Typography variant="body1">{label}</Typography>
		</div>
	);
};
