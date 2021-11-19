import * as Tone from 'tone';
import { useState, useEffect, useRef } from 'react';

import { PitchClass } from './utils/types';
import StepContainer from './StepContainer';

type VoiceProps = {
	source: Tone.Synth<Tone.SynthOptions>;
	period: number;
	voice: number;
	pitch: PitchClass;
	numOfSteps: number;
};

export type StepProps = {
	isActive: boolean;
};

const Voice = ({ source, period, voice, pitch, numOfSteps }: VoiceProps) => {
	const [interval, setInterval] = useState<number>(1);
	const [stepsErrorMessage, setStepsErrorMessage] = useState<string>('');

	const synth = source;

	const initialSteps: StepProps[] = [
		{ isActive: true },
		{ isActive: true },
		{ isActive: true },
		{ isActive: true },
	];

	let headIndex = useRef<number>(0);

	const [steps, setSteps] = useState<StepProps[]>(initialSteps);

	const [seqArgs, setSeqArgs] = useState<string[]>([
		`${pitch}4`,
		`${pitch}4`,
		`${pitch}4`,
		`${pitch}4`,
	]);
	const [seq, setSeq] = useState<Tone.Sequence<string>>();
	const [flashEvents, setFlashEvents] = useState<number>();

	const myEmitter = new Tone.Emitter();

	const validTimeParams = numOfSteps !== (NaN || 0) ? true : false;

	const stepsWithinRange = numOfSteps <= 128 ? true : false;

	const emitHeadIndex = () => {
		myEmitter.emit(`${headIndex.current}`);
	};

	const incrementHeadIndex = () => {
		headIndex.current++;
	};
	const resetHeadIndex = () => {
		headIndex.current = 0;
	};

	const flashStepsErrorMessage = () => {
		setStepsErrorMessage(
			'number of steps must be less than or equal to 128'
		);
		setTimeout(() => setStepsErrorMessage(''), 3 * 1000);
	};

	// handle changes in numOfSteps
	useEffect(() => {
		if (seq && flashEvents) {
			seq.clear();
			Tone.Transport.clear(flashEvents);
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

		if (numOfSteps === 0 && flashEvents) {
			setSteps([]);
			Tone.Transport.clear(flashEvents);
		} else {
			if (diff > 0) {
				for (let i = 0; i < diff; i++) {
					tempSteps.push({
						isActive: true,
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
		if (seq && flashEvents) {
			seq.clear();
			Tone.Transport.clear(flashEvents);
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

			setFlashEvents(
				Tone.Transport.scheduleRepeat(
					(time) => {
						Tone.Draw.schedule(() => {
							if (headIndex.current !== numOfSteps - 1) {
								emitHeadIndex();
								incrementHeadIndex();
							} else {
								emitHeadIndex();
								resetHeadIndex();
							}
						}, time);
					},
					interval,
					0
				)
			);

			Tone.Transport.schedule((time) => {
				Tone.Draw.schedule(() => {
					resetHeadIndex();
					console.log(Tone.Transport);
				}, time);
			}, period - 0.01);
		}
	}, [period, interval, seqArgs]);

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
					emitter={myEmitter}
				/>
			) : (
				<div />
			)}
		</div>
	);
};

export default Voice;
