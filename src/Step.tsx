import { useState, useEffect } from 'react';
import './utils/styles.css';
import { StepProps } from './Voice';

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
	return (
		<div
			className={step.isActive ? 'active' : 'inactive'}
			onClick={() => {
				const tempSteps = steps;
				tempSteps[ind].isActive = !tempSteps[ind].isActive;
				setSteps([...tempSteps]);
			}}></div>
	);
};

export default Step;
