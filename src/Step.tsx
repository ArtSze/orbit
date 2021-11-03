import './utils/styles.css';
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
			step.isPlaying && step.isActive
				? 'green'
				: step.isActive
				? 'coral'
				: 'white',
		config: { tension: 1000 },
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
