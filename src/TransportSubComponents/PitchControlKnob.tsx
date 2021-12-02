// @ts-ignore
import { Knob, Scale, Value } from 'rc-knob';
import Typography from '@mui/material/Typography';

import { PitchControlProps, PitchClass } from '../utils/types';

export const PitchControlKnob = ({
	pitch,
	setPitch,
	defaultInd,
}: PitchControlProps) => {
	const parsePitch = (pitchNum: number) => {
		switch (pitchNum) {
			case 0:
				return PitchClass.C;
			case 1:
				return PitchClass.C_sharp;
			case 2:
				return PitchClass.D;
			case 3:
				return PitchClass.D_sharp;
			case 4:
				return PitchClass.E;
			case 5:
				return PitchClass.F;
			case 6:
				return PitchClass.F_sharp;
			case 7:
				return PitchClass.G;
			case 8:
				return PitchClass.G_sharp;
			case 9:
				return PitchClass.A;
			case 10:
				return PitchClass.A_sharp;
			case 11:
				return PitchClass.B;
			default:
				return pitch;
		}
	};

	const accidentals = [
		PitchClass.A_sharp,
		PitchClass.C_sharp,
		PitchClass.D_sharp,
		PitchClass.F_sharp,
		PitchClass.G_sharp,
	];

	return (
		<div>
			<Knob
				size={100}
				angleOffset={220}
				angleRange={280}
				value={defaultInd}
				steps={11}
				min={0}
				max={11}
				onChange={(value: number) => setPitch(parsePitch(value))}>
				<Scale
					tickWidth={1}
					tickHeight={5}
					radius={45}
					color="#52b02c"
					activeColor="#180094"
				/>
			</Knob>

			<Typography
				style={
					accidentals.includes(pitch)
						? {
								transform: `translateX(31px) translateY(-70px)`,
								color: 'rgb(5, 136, 0)',
						  }
						: {
								transform: `translateX(41px) translateY(-70px)`,
								color: 'rgb(5, 136, 0)',
						  }
				}
				variant="h4">
				{pitch}
			</Typography>
		</div>
	);
};
