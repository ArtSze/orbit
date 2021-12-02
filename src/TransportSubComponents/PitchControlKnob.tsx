// @ts-ignore
import { Knob, Scale } from 'rc-knob';
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
				return PitchClass.C;
		}
	};

	return (
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
				tickWidth={2}
				tickHeight={2}
				radius={45}
				color="#180094"
				activeColor="#FC5A96"
			/>
			<div>{pitch}</div>
		</Knob>
	);
};
