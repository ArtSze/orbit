// @ts-ignore
import { Knob, Scale, Pointer } from 'rc-knob';
import Typography from '@mui/material/Typography';

import { PitchControlProps, PitchClass } from '../utils/types';
import { useEffect, useState } from 'react';

export const PitchControlKnob = ({
	pitch,
	setPitch,
	defaultInd,
	color,
}: PitchControlProps) => {
	const [pitchNumVal, setPitchNumVal] = useState<number>(defaultInd);
	const [y, setY] = useState<number>();

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

	useEffect(() => {
		const dragPitch = Math.round(11 * (y! / 43));
		setPitchNumVal(dragPitch);
	}, [y]);

	useEffect(() => {
		setPitch(parsePitch(pitchNumVal));
	}, [pitchNumVal]);

	return (
		<div>
			<Knob
				size={100}
				angleOffset={220}
				angleRange={280}
				steps={11}
				min={0}
				max={11}
				value={pitchNumVal}
				onChange={(value: number) =>
					setPitchNumVal(parseInt(value.toFixed()))
				}
				snap={true}
				className="pitchControlContainer">
				<Scale tickWidth={1} tickHeight={5} radius={45} color={color} />
				<Pointer
					width={1}
					height={7}
					radius={38}
					type="rect"
					color="#180094"
					percentage={
						pitchNumVal ? pitchNumVal / 11 : defaultInd / 11
					}
				/>
			</Knob>
			<div
				onMouseMove={(e) => {
					e.preventDefault();
					if (e.buttons == 1) {
						setY(e.nativeEvent.offsetY);
					}
				}}>
				<Typography
					style={
						accidentals.includes(pitch)
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
					{pitch}
				</Typography>
			</div>
		</div>
	);
};
