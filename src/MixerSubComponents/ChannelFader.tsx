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
		return (Math.pow(50, Math.abs(value)) - 1) / 49;
	};

	return (
		<div>
			<Slider
				onChange={onChange}
				orientation="vertical"
				defaultValue={defaultValue}
				max={-1}
				min={-60}
				scale={calculateValue}
				sx={{
					'.MuiSlider-thumb': {
						borderRadius: '1px',
					},
				}}
				aria-label={`Channel${label}Fader`}
			/>
			<Typography variant="h4">{label}</Typography>
		</div>
	);
};
