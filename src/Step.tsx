import './utils/styles.scss';
import { StepProps } from './Voice';
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
	return (
		<div
			style={circleProps}
			className={step.isActive ? 'stepActive' : 'stepInactive'}
			onClick={() => {
				const tempSeqArgs = [...seqArgs];
				tempSeqArgs[ind] = step.isActive ? '' : `${pitch}4`;
				setSeqArgs(tempSeqArgs);
			}}></div>
	);
};

export default Step;
