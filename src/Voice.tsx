import * as Tone from 'tone';
import { useState, useEffect } from 'react';
import { PitchClass } from './utils/types';
import Step from './Step';
import Steps from './Steps';

type VoiceProps = {
	period: number;
	voice: number;
	pitch: PitchClass;
};

export type StepProps = {
	isHead: boolean;
	isOn: boolean;
};

const Voice = ({ period, voice, pitch }: VoiceProps) => {
	const [numOfSteps, setNumOfSteps] = useState<number>(4);
	const [interval, setInterval] = useState<number>(1);
	const [loopID, setLoopId] = useState<number>(0);
	const [stepsErrorMessage, setStepsErrorMessage] = useState<string>('');
	const [steps, setSteps] = useState<StepProps[]>([
		{ isHead: true, isOn: false },
		{ isHead: false, isOn: false },
		{ isHead: false, isOn: false },
		{ isHead: false, isOn: false },
	]);

	const synth = new Tone.Synth().toDestination();

	const validTimeParams = numOfSteps !== (NaN || 0) ? true : false;

	const stepsWithinRange = numOfSteps <= 128 ? true : false;

	const flashStepsErrorMessage = () => {
		setStepsErrorMessage(
			'number of steps must be less than or equal to 128'
		);
		setTimeout(() => setStepsErrorMessage(''), 3 * 1000);
	};

	const toggleIsOn = (step: StepProps) => {
		return { ...step, isOn: !step.isOn };
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

	const flashHead = () => {
		const placeholderSteps = steps;
		const headObject = findHead(steps);
		const flashingHead = toggleIsOn(headObject.head!);
		placeholderSteps[headObject.index] = flashingHead;
		setSteps(placeholderSteps);
	};

	const iterateHead = async () => {
		let placeholderSteps = [...steps];
		const prevHeadIndex = findHead(steps).index;
		const nextHeadIndex =
			prevHeadIndex === steps.length - 1 ? 0 : prevHeadIndex + 1;
		placeholderSteps[prevHeadIndex] = { isHead: false, isOn: false };
		placeholderSteps[nextHeadIndex] = { isHead: true, isOn: false };
		setSteps([...placeholderSteps]);
	};

	const flashAndIterate = () => {
		flashHead();
		iterateHead();
	};

	useEffect(() => {
		Tone.Transport.clear(loopID);
		if (validTimeParams && stepsWithinRange) {
			setInterval(period / numOfSteps);
			const headObject = findHead(steps);
			const newSteps = [] as StepProps[];
			for (let i = 0; i < numOfSteps; i++) {
				newSteps.push({ isHead: false, isOn: false });
			}
			newSteps[headObject.index] = headObject.head!;
			setSteps(newSteps);
		} else if (!stepsWithinRange) {
			flashStepsErrorMessage();
		}
	}, [period, numOfSteps]);

	useEffect(() => {
		Tone.Transport.clear(loopID);
		if (validTimeParams) {
			setInterval(period / numOfSteps);

			setLoopId(
				Tone.Transport.scheduleRepeat(
					(time) => {
						synth.triggerAttackRelease(
							`${pitch}4`,
							interval * 0.75,
							time
						);
						flashAndIterate();
					},
					interval,
					0,
					period
				)
			);
		}
	}, [period, interval]);

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
				<Steps steps={steps} />
				<button
					onClick={() => {
						flashAndIterate();
					}}>
					Flash and Iterate
				</button>
			</div>
		</div>
	);
};

export default Voice;
