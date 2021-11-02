import { useState, useEffect } from 'react';
import './utils/styles.css';
import Step from './Step';
import { StepProps } from './Voice';
import { PitchClass } from './utils/types';

const stepContainer = ({
	steps,
	seqArgs,
	setSeqArgs,
	pitch,
}: {
	steps: StepProps[];
	seqArgs: string[];
	setSeqArgs: React.Dispatch<React.SetStateAction<string[]>>;
	pitch: PitchClass;
}) => {
	return (
		<div className="stepContainer">
			{steps.map((step, index) => {
				return (
					<Step
						pitch={pitch}
						step={step}
						key={index}
						ind={index}
						seqArgs={seqArgs}
						setSeqArgs={setSeqArgs}></Step>
				);
			})}
		</div>
	);
};

export default stepContainer;
