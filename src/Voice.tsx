import * as Tone from 'tone';
import { useState, useEffect } from 'react';

import { PitchClass } from './utils/types';
import StepContainer from './StepContainer';

type VoiceProps = {
	period: number;
	voice: number;
	pitch: PitchClass;
};

export type StepProps = {
	isHead: boolean;
	isActive: boolean;
	isPlaying: boolean;
};

// need to make setSteps accessible to inner workings of each step div so that clicking actually triggers a state change

const Voice = ({ period, voice, pitch }: VoiceProps) => {
	const [numOfSteps, setNumOfSteps] = useState<number>(4);
	const [interval, setInterval] = useState<number>(1);
	const [stepsErrorMessage, setStepsErrorMessage] = useState<string>('');

	const initialSteps: StepProps[] = [
		{ isActive: true, isHead: true, isPlaying: false },
		{ isActive: false, isHead: false, isPlaying: false },
	];

	const [steps, setSteps] = useState<StepProps[]>(initialSteps);

	const synth = new Tone.Synth().toDestination();

	const validTimeParams = numOfSteps !== (NaN || 0) ? true : false;

	const stepsWithinRange = numOfSteps <= 128 ? true : false;

	const flashStepsErrorMessage = () => {
		setStepsErrorMessage(
			'number of steps must be less than or equal to 128'
		);
		setTimeout(() => setStepsErrorMessage(''), 3 * 1000);
	};

	useEffect(() => {
		if (validTimeParams && stepsWithinRange) {
			setInterval(period / numOfSteps);
		} else if (!stepsWithinRange) {
			flashStepsErrorMessage();
		}
	}, [period, numOfSteps]);

	useEffect(() => {
		if (validTimeParams) {
			setInterval(period / numOfSteps);
		}
	}, [period, interval]);

	useEffect(() => {
		console.log(steps);
	}, [steps]);

	return (
		<div>
			<div>
				{`Voice ${voice}: num of steps-`}
				<input
					value={numOfSteps}
					onChange={(event) =>
						setNumOfSteps(parseInt(event.target.value))
					}
				/>
				<div>{`${stepsErrorMessage}`}</div>
				{steps ? (
					<StepContainer steps={steps} setSteps={setSteps} />
				) : (
					<div />
				)}
			</div>
		</div>
	);
};

export default Voice;
