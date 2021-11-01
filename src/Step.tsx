import './utils/styles.css';
import { StepProps } from './Voice';
import { useSpring, animated } from 'react-spring';

const Step = ({
	step,
	ind,
	setSteps,
	steps,
}: {
	step: StepProps;
	ind: number;
	setSteps: React.Dispatch<React.SetStateAction<StepProps[]>>;
	steps: StepProps[];
}) => {
	const props = useSpring({
		background: step.isPlaying
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
				const tempSteps = steps;
				tempSteps[ind].isActive = !tempSteps[ind].isActive;
				setSteps([...tempSteps]);
			}}>
			I will fade in
		</animated.div>
	);
};

export default Step;
