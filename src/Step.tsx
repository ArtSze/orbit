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
}: {
	step: StepProps;
	ind: number;
	seqArgs: string[];
	setSeqArgs: React.Dispatch<React.SetStateAction<string[]>>;
	pitch: PitchClass;
}) => {
	const props = useSpring({
		background:
			// step.isPlayHead && step.isActive
			// 	? 'green'
			step.isActive ? 'rgb(23, 175, 99)' : 'rgb(220, 255, 238)',
		config: { tension: 500 },
	});

	return (
		<animated.div
			className={'step'}
			style={props}
			onClick={() => {
				const tempSeqArgs = [...seqArgs];
				tempSeqArgs[ind] = step.isActive ? '' : `${pitch}4`;
				setSeqArgs(tempSeqArgs);
			}}></animated.div>
	);
};

export default Step;
