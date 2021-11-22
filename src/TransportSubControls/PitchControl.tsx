import { listenerCount } from 'process';
import { useEffect, useState } from 'react';
import { PitchClass } from '../utils/types';

type PitchControlProps = {
	pitch: PitchClass;
	setPitch: React.Dispatch<React.SetStateAction<PitchClass>>;
	defaultInd: number;
};

const PitchControl = ({ pitch, setPitch, defaultInd }: PitchControlProps) => {
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
		<div>
			<label>{pitch.charAt(1) === '#' ? pitch : `${pitch} `}</label>
			<input
				list={'pitch_list'}
				type="range"
				defaultValue={defaultInd}
				max={11}
				step={1}
				onChange={(event) =>
					setPitch(parsePitch(parseInt(event.target.value)))
				}
			/>
			<datalist id="pitch_list">
				<select>
					<option value={0}></option>
					<option value={1}></option>
					<option value={2}></option>
					<option value={3}></option>
					<option value={4}></option>
					<option value={5}></option>
					<option value={6}></option>
					<option value={7}></option>
					<option value={8}></option>
					<option value={9}></option>
					<option value={10}></option>
					<option value={11}></option>
				</select>
			</datalist>
		</div>
	);
};

export default PitchControl;
