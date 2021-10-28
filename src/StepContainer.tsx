import { useState, useEffect } from 'react';
import './utils/styles.css';
import Step from './Step';
import { StepProps } from './Voice';

const stepContainer = ({
	steps,
	setSteps,
}: {
	steps: StepProps[];
	setSteps: React.Dispatch<React.SetStateAction<StepProps[]>>;
}) => {
	return (
		<div className="stepContainer">
			{steps.map((step, index) => {
				return (
					<Step
						step={step}
						ind={index}
						setSteps={setSteps}
						steps={steps}></Step>
				);
			})}
		</div>
	);
};

export default stepContainer;
