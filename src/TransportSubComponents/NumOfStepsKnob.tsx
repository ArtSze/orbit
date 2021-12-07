// @ts-ignore
import { Knob, Scale, Pointer, Value } from 'rc-knob';
import { ThemeColors } from '../utils/Theme';
import Typography from '@mui/material/Typography';

export type NumOfStepsControlProps = {
	numOfSteps: number;
	setNumOfSteps: (value: React.SetStateAction<number>) => void;
	color: ThemeColors;
};

export const NumOfStepsKnob = ({
	numOfSteps,
	setNumOfSteps,
	color,
}: NumOfStepsControlProps) => {
	return (
		<div>
			<Knob
				size={100}
				angleOffset={220}
				angleRange={280}
				steps={32}
				min={0}
				max={32}
				value={numOfSteps}
				onChange={(value: number) =>
					setNumOfSteps(parseInt(value.toFixed()))
				}
				snap={true}
				className="numKnob">
				<Scale
					steps={16}
					tickWidth={1}
					tickHeight={5}
					radius={45}
					color={color}
				/>
				<Scale tickWidth={1} tickHeight={2} radius={45} color={color} />
				<Pointer
					width={1}
					height={7}
					radius={38}
					type="rect"
					color="#180094"
					percentage={(numOfSteps - 0) / 32}
				/>
			</Knob>

			<Typography
				style={
					numOfSteps > 9
						? {
								transform: `translateX(31px) translateY(-47px)`,
								color: color,
						  }
						: {
								transform: `translateX(41px) translateY(-47px)`,
								color: color,
						  }
				}
				variant="h4">
				{numOfSteps}
			</Typography>
		</div>
	);
};
