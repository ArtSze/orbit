import * as Tone from 'tone';
import { useState, useEffect } from 'react';
import { PitchClass } from './utils/types';
import Step from './Step';

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

	const stepsWithinRange = numOfSteps! <= 128 ? true : false;

	const flashStepsErrorMessage = () => {
		setStepsErrorMessage(
			'number of steps must be less than or equal to 128'
		);
		setTimeout(() => setStepsErrorMessage(''), 3 * 1000);
	};

	const flashAndIterate = () => {
		const og = steps;
		const flash = steps.map((step) => {
			return step.isHead ? { ...step, isOn: true } : { ...step };
		});
		setSteps(flash);
		setSteps(og);
		const iteratedHead = steps.map((step, index) => {
			if (index === steps.length - 1) {
				return index === 0
					? { ...step, isHead: true }
					: { ...step, isHead: false };
			} else {
				return steps[index - 1].isHead
					? { ...step, isHead: true }
					: { ...step, isHead: false };
			}
		});
		setSteps(iteratedHead);
	};

	useEffect(() => {
		Tone.Transport.clear(loopID);
		if (validTimeParams && stepsWithinRange) {
			setInterval(period / numOfSteps);
			setSteps([{ isHead: true, isOn: false }]);
			let remainderSteps = [];
			for (let i = 1; i < numOfSteps; i++) {
				remainderSteps.push({ isHead: false, isOn: false });
			}
			setSteps([...steps, ...remainderSteps]);
		} else if (!stepsWithinRange) {
			flashStepsErrorMessage();
		}
		console.log(steps);
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
				<div>
					{steps.map((step) => {
						return <Step {...step}></Step>;
					})}
				</div>
			</div>
		</div>
	);
};

export default Voice;
