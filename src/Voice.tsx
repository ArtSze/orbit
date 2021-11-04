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
	isPlayHead: boolean;
	isActive: boolean;
	isPlaying: boolean;
};

type StepsWithHeadIndex = {
	arr: StepProps[];
	headIndex: number;
};

const Voice = ({ period, voice, pitch }: VoiceProps) => {
	const [numOfSteps, setNumOfSteps] = useState<number>(4);
	const [interval, setInterval] = useState<number>(1);
	const [stepsErrorMessage, setStepsErrorMessage] = useState<string>('');

	const initialSteps: StepProps[] = [
		{ isActive: true, isPlayHead: true, isPlaying: false },
		{ isActive: true, isPlayHead: false, isPlaying: false },
		{ isActive: true, isPlayHead: false, isPlaying: false },
		{ isActive: true, isPlayHead: false, isPlaying: false },
	];

	const [steps, setSteps] = useState<StepsWithHeadIndex>({
		arr: initialSteps,
		headIndex: 0,
	});

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

	// const flashAndIterate = () => {
	// 	const tempIndex = steps.headIndex;
	// 	const tempSteps = [...steps.arr];
	// 	tempSteps[tempIndex].isPlaying = true;
	// 	setSteps({ ...steps, arr: tempSteps });
	// 	if (tempIndex === steps.arr.length - 1) {
	// 		tempSteps[tempIndex].isPlaying = false;
	// 		tempSteps[tempIndex].isPlayHead = false;
	// 		tempSteps[0].isPlayHead = true;
	// 		setSteps({ arr: tempSteps, headIndex: 0 });
	// 	} else {
	// 		tempSteps[tempIndex].isPlaying = false;
	// 		tempSteps[tempIndex].isPlayHead = false;
	// 		tempSteps[tempIndex + 1].isPlayHead = true;
	// 		setSteps({ arr: tempSteps, headIndex: tempIndex + 1 });
	// 	}

	// 	console.log('inside');
	// };

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

			// document.documentElement.style.setProperty(
			// 	'--num-steps',
			// 	`${numOfSteps}`
			// );

			// console.log(
			// 	document.documentElement.style.getPropertyValue('--num-steps')
			// );
		} else if (!stepsWithinRange) {
			flashStepsErrorMessage();
		}
	}, [period, numOfSteps]);

	// updates steps to correspond to changes in seqArgs
	useEffect(() => {
		const tempSteps = [...steps.arr];
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

		setSteps({ ...steps, arr: tempSteps });
		// console.log(seqArgs);
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

			// new Tone.Loop(() => {
			// 	flashAndIterate();
			// }, interval)
			// 	.start(0)
			// 	.stop(period);

			// for (let i = 0; i < numOfSteps; i++) {
			// 	Tone.Transport.schedule((time) => {
			// 		Tone.Draw.schedule(() => {
			// 			const tempSteps = [...steps];
			// 			tempSteps[i].isPlaying = false;
			// 			setSteps([...tempSteps]);
			// 			if (i === steps.length - 1) {
			// 				tempSteps[0].isPlaying = true;
			// 				setSteps([...tempSteps]);
			// 			} else {
			// 				tempSteps[i + 1].isPlaying = true;
			// 				setSteps([...tempSteps]);
			// 			}
			// 		}, time);
			// 	}, `${interval}`);
			// }
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
						steps={steps.arr}
						seqArgs={seqArgs}
						setSeqArgs={setSeqArgs}
						pitch={pitch}
					/>
				) : (
					<div />
				)}
				{/* <button
					onClick={() => {
						flashAndIterate();
					}}>
					flash and iterate
				</button> */}
			</div>
		</div>
	);
};

export default Voice;
