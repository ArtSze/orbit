// @ts-ignore
import { Knob, Arc, Pointer, Value } from 'rc-knob';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

type BpmControllerProps = {
	bpm: number;
	setBpm: React.Dispatch<React.SetStateAction<number>>;
};

export const BpmKnob = ({ bpm, setBpm }: BpmControllerProps) => {
	const theme = useTheme();

	return (
		<div>
			<Knob
				size={100}
				angleOffset={220}
				angleRange={280}
				min={20}
				max={240}
				onChange={(value: number) => setBpm(parseInt(value.toFixed()))}
				value={bpm}
				className="styledBpmKnob">
				<Arc
					arcWidth={2}
					background={theme.palette.grey[200]}
					color={theme.palette.grey[500]}
					radius={47.5}
				/>
				<Pointer
					width={1}
					height={7}
					radius={40}
					type="rect"
					color={theme.palette.info}
					percentage={(bpm - 20) / 220}
				/>
			</Knob>
			<Typography
				style={
					bpm > 99
						? {
								transform: `translateX(22px) translateY(-47px)`,
								color: `${theme.palette.grey[500]}`,
						  }
						: {
								transform: `translateX(31px) translateY(-47px)`,
								color: `${theme.palette.grey[500]}`,
						  }
				}
				variant="h4">
				{bpm}
			</Typography>
		</div>
	);
};
