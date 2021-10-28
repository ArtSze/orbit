import { useState, useEffect } from 'react';
import './utils/styles.css';
import Step from './Step';
import { StepProps } from './Voice';

const Steps = ({ steps }: { steps: StepProps[] }) => {
	return (
		<div>
			{steps.map((step, index) => {
				return <Step {...step} key={index}></Step>;
			})}
		</div>
	);
};

export default Steps;
