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

	const findHead = (steps: StepProps[]) => {
		return {
			head: steps.find((step) => {
				return step.isHead === true;
			}),
			index: steps.findIndex((step) => {
				return step.isHead === true;
			}),
		};
	};

	const flashAndIterate = () => {
		const placeholderSteps = [...steps];
		// find head
		const headObject = findHead(steps);
		// toggle head's 'isPlaying' status 'true'
		placeholderSteps[headObject.index!].isPlaying = true;
		setSteps([...placeholderSteps]);
		// toggle back to false
		setTimeout(() => {
			placeholderSteps[headObject.index!].isPlaying = false;
			setSteps([...placeholderSteps]);
		}, 100);
		// set head's 'isHead' status to false
		placeholderSteps[headObject.index!].isHead = false;
		setSteps([...placeholderSteps]);
		// set [head + 1]'s 'isHead status to true'
		if (headObject.index! === steps.length - 1) {
			placeholderSteps[0].isHead = true;
			setSteps([...placeholderSteps]);
		} else {
			placeholderSteps[headObject.index! + 1].isHead = true;
			setSteps([...placeholderSteps]);
		}

		console.log(`flash!`);
	};

	useEffect(() => {
		if (validTimeParams && stepsWithinRange) {
			setInterval(period / numOfSteps);
			const tempSteps = [...steps];
			const diff = numOfSteps - steps.length;
			console.log(diff);

			if (diff > 0) {
				for (let i = 0; i < diff; i++) {
					tempSteps.push({
						isActive: true,
						isHead: false,
						isPlaying: false,
					});
				}
			} else if (diff < 0) {
				tempSteps.splice(numOfSteps - 1, Math.abs(diff));
			}
			setSteps([...tempSteps]);
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
				<button
					onClick={() => {
						flashAndIterate();
					}}>
					flash and iterate
				</button>
			</div>
		</div>
	);
};

export default Voice;
