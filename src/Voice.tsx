import * as Tone from 'tone';
import { useState, useEffect } from 'react';

import { PitchClass } from './utils/types';
import StepContainer from './StepContainer';

type VoiceProps = {
	period: number;
	voice: number;
	pitch: PitchClass;
	numOfSteps: number;
};

export type StepProps = {
	isPlayHead: boolean;
	isActive: boolean;
	isPlaying: boolean;
};

const Voice = ({ period, voice, pitch, numOfSteps }: VoiceProps) => {
	const [interval, setInterval] = useState<number>(1);
	const [stepsErrorMessage, setStepsErrorMessage] = useState<string>('');

	const initialSteps: StepProps[] = [
		{ isActive: true, isPlayHead: true, isPlaying: false },
		{ isActive: true, isPlayHead: false, isPlaying: false },
		{ isActive: true, isPlayHead: false, isPlaying: false },
		{ isActive: true, isPlayHead: false, isPlaying: false },
	];

	const myEmitter = new Tone.Emitter();
	const [headIndex, setHeadIndex] = useState(0);

	const [steps, setSteps] = useState<StepProps[]>(initialSteps);

	const [seqArgs, setSeqArgs] = useState<string[]>([
		`${pitch}4`,
		`${pitch}4`,
		`${pitch}4`,
		`${pitch}4`,
	]);
	const [seq, setSeq] = useState<Tone.Sequence<string>>();

	const synth = new Tone.Synth().toDestination();

	const validTimeParams = numOfSteps !== (NaN || 0) ? true : false;

	const stepsWithinRange = numOfSteps <= 128 ? true : false;

	const flashStepsErrorMessage = () => {
		setStepsErrorMessage(
			'number of steps must be less than or equal to 128'
		);
		setTimeout(() => setStepsErrorMessage(''), 3 * 1000);
	};

	const flashAndIterate = () => {
		const tempIndex = headIndex;
		const tempSteps = [...steps];
		tempSteps[tempIndex].isPlaying = true;
		setSteps(tempSteps);
		if (tempIndex === steps.length - 1) {
			tempSteps[tempIndex].isPlaying = false;
			tempSteps[tempIndex].isPlayHead = false;
			tempSteps[0].isPlayHead = true;
			setSteps(tempSteps);
			setHeadIndex(0);
		} else {
			tempSteps[tempIndex].isPlaying = false;
			tempSteps[tempIndex].isPlayHead = false;
			tempSteps[tempIndex + 1].isPlayHead = true;
			setSteps(tempSteps);
			setHeadIndex(tempIndex + 1);
		}
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

		if (numOfSteps === 0) {
			setSteps([]);
		} else {
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
		}
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
					},
					[...seqArgs],
					interval
				).start(0)
			);

			Tone.Transport.scheduleRepeat((time) => {
				Tone.Draw.schedule(() => {
					myEmitter.emit('ping');
				}, time);
			}, interval);
		}
	}, [period, interval, seqArgs]);

	myEmitter.on('ping', () => {
		flashAndIterate();
		console.log('pong');
	});

	return (
		<div className={`voice`}>
			<div>{`${stepsErrorMessage}`}</div>
			{steps ? (
				<StepContainer
					steps={steps}
					seqArgs={seqArgs}
					setSeqArgs={setSeqArgs}
					pitch={pitch}
					voice={voice}
				/>
			) : (
				<div />
			)}
		</div>
	);
};

export default Voice;
