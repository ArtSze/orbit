import * as Tone from 'tone';

import './utils/styles.scss';
import { StepProps } from './Voice';
import { useSpring, animated } from 'react-spring';
import { PitchClass } from './utils/types';
import { useEffect, useState } from 'react';

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
		setFlash(true);
		setTimeout(() => {
			setFlash(false);
		}, 50);
	});

	useEffect(() => {
		console.log(`step ${ind} flash = ${flash}`);
	}, [flash]);

	return (
		<div
			style={circleProps}
			className={
				flash && step.isActive
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
		// <animated.div
		// 	className={'step'}
		// 	style={props}
		// 	onClick={() => {
		// 		const tempSeqArgs = [...seqArgs];
		// 		tempSeqArgs[ind] = step.isActive ? '' : `${pitch}4`;
		// 		setSeqArgs(tempSeqArgs);
		// 	}}></animated.div>
	);
};

export default Step;
