import * as Tone from 'tone';

import './utils/styles.scss';
import { StepProps } from './Voice';
import { PitchClass } from './utils/types';
import { useState, useEffect } from 'react';

const Step = ({
	step,
	ind,
	seqArgs,
	setSeqArgs,
	pitch,
	circleProps,
	emitter,
}: {
	step: StepProps;
	ind: number;
	seqArgs: string[];
	setSeqArgs: React.Dispatch<React.SetStateAction<string[]>>;
	pitch: PitchClass;
	circleProps: React.CSSProperties;
	emitter: Tone.Emitter<string>;
}) => {
	const [flash, setFlash] = useState(false);

	emitter.on(`${ind}`, () => {
		// console.log(`step ${ind} emitted`);
		if (step.isActive) {
			setFlash(true);
			setTimeout(() => {
				setFlash(false);
			}, 50);
		}
	});

	return (
		<div
			style={circleProps}
			className={
				step.isActive && flash
					? 'stepPlaying'
					: step.isActive
					? 'stepActive'
					: 'stepInactive'
			}
			onClick={() => {
				const tempSeqArgs = [...seqArgs];
				tempSeqArgs[ind] = step.isActive ? '' : `${pitch}4`;
				setSeqArgs(tempSeqArgs);
			}}></div>
	);
};

export default Step;
