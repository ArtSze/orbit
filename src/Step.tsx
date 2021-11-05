import './utils/styles.scss';
import { StepProps } from './Voice';
import { useSpring, animated } from 'react-spring';
import { PitchClass } from './utils/types';

const Step = ({
	step,
	ind,
	seqArgs,
	setSeqArgs,
	pitch,
	circleProps,
}: {
	step: StepProps;
	ind: number;
	seqArgs: string[];
	setSeqArgs: React.Dispatch<React.SetStateAction<string[]>>;
	pitch: PitchClass;
	circleProps: React.CSSProperties;
}) => {
	const props = useSpring({
		background:
			// step.isPlayHead && step.isActive
			// 	? 'green'
			step.isActive ? 'rgb(23, 175, 99)' : 'rgb(220, 255, 238)',
		config: { tension: 500 },
	});

	return (
		<div
			style={circleProps}
			className={step.isActive ? 'stepActive' : 'stepInactive'}
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
