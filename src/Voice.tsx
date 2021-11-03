import * as Tone from 'tone';
import { useState, useEffect, useMemo } from 'react';

import { PitchClass } from './utils/types';
import StepContainer from './StepContainer';

type VoiceProps = {
	period: number;
	voice: number;
	pitch: PitchClass;
};

export type StepProps = {
	isPlayHead: boolean;
	isActive: boolean;
	isPlaying: boolean;
};

const Voice = ({ period, voice, pitch }: VoiceProps) => {
	const [numOfSteps, setNumOfSteps] = useState<number>(4);
	const [interval, setInterval] = useState<number>(1);
	const [stepsErrorMessage, setStepsErrorMessage] = useState<string>('');

	const initialSteps: StepProps[] = [
		{ isActive: true, isPlayHead: false, isPlaying: true },
		{ isActive: true, isPlayHead: false, isPlaying: false },
		{ isActive: true, isPlayHead: false, isPlaying: false },
		{ isActive: true, isPlayHead: false, isPlaying: false },
	];

	const [steps, setSteps] = useState<StepProps[]>(initialSteps);

	const [seqArgs, setSeqArgs] = useState<string[]>([
		`${pitch}4`,
		`${pitch}4`,
		`${pitch}4`,
		`${pitch}4`,
	]);
	const [seq, setSeq] = useState<Tone.Sequence<string>>();
	const [headIndex, setHeadIndex] = useState<number>(0);

	const synth = new Tone.Synth().toDestination();

	const validTimeParams = numOfSteps !== (NaN || 0) ? true : false;

	const stepsWithinRange = numOfSteps <= 128 ? true : false;

	const flashStepsErrorMessage = () => {
		setStepsErrorMessage(
			'number of steps must be less than or equal to 128'
		);
		setTimeout(() => setStepsErrorMessage(''), 3 * 1000);
	};

	const flashAndIterate = (headIndex: number) => {
		const tempSteps = [...steps];
		tempSteps[headIndex].isPlaying = false;
		setSteps(tempSteps);
		if (headIndex === steps.length - 1) {
			tempSteps[0].isPlaying = true;
			setHeadIndex(0);
			setSteps(tempSteps);
		} else {
			tempSteps[headIndex + 1].isPlaying = true;
			setHeadIndex(headIndex + 1);
			console.log(headIndex);
			setSteps(tempSteps);
		}

		console.log('inside');
	};

	// handle changes in numOfSteps
	useEffect(() => {
		if (seq) {
			seq.clear();
		}
		if (validTimeParams && stepsWithinRange) {
			setInterval(period / numOfSteps);

			const tempSeqArgs = [...seqArgs];
			const diff = numOfSteps - seqArgs.length;

			if (diff > 0) {
				for (let i = 0; i < diff; i++) {
					tempSeqArgs.push(`${pitch}4`);
				}
			} else if (diff < 0) {
				tempSeqArgs.splice(numOfSteps - 1, Math.abs(diff));
			}
			setSeqArgs(tempSeqArgs);
		} else if (!stepsWithinRange) {
			flashStepsErrorMessage();
		}
	}, [period, numOfSteps]);

	// updates steps to correspond to changes in seqArgs
	useEffect(() => {
		const tempSteps = [...steps];
		const diff = numOfSteps - tempSteps.length;

		if (diff > 0) {
			for (let i = 0; i < diff; i++) {
				tempSteps.push({
					isActive: true,
					isPlayHead: false,
					isPlaying: false,
				});
			}
		} else if (diff < 0) {
			tempSteps.splice(numOfSteps - 1, Math.abs(diff));
		}

		tempSteps.forEach((step, i) => {
			step.isActive = seqArgs[i] === '' ? false : true;
		});

		setSteps(tempSteps);
		console.log(seqArgs);
	}, [seqArgs, numOfSteps]);

	// event scheduling
	useEffect(() => {
		if (seq) {
			seq.clear();
		}
		if (validTimeParams) {
			setInterval(period / numOfSteps);
			setSeq(
				new Tone.Sequence(
					(time, note) => {
						note === ''
							? (seq!.mute = true)
							: synth.triggerAttackRelease(
									note,
									interval * 0.75,
									time
							  );
						// Tone.Draw.schedule(() => {
						// 	// setHeadIndex(headIndex + 1);
						// 	// console.log(headIndex);
						// 	// console.log('draw!');
						// 	// flashAndIterate();
						// }, time);
					},
					[...seqArgs],
					interval
				).start(0)
			);

			Tone.Transport.scheduleRepeat((time) => {
				Tone.Draw.schedule(() => {
					flashAndIterate(headIndex);
				}, time);
			}, interval);
		}
	}, [period, interval, seqArgs]);

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
					<StepContainer
						steps={steps}
						seqArgs={seqArgs}
						setSeqArgs={setSeqArgs}
						pitch={pitch}
					/>
				) : (
					<div />
				)}
				<button
					onClick={() => {
						flashAndIterate(headIndex);
					}}>
					flash and iterate
				</button>
			</div>
		</div>
	);
};

export default Voice;
