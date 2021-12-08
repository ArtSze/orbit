import * as Tone from 'tone';
import { useState, useEffect, useRef } from 'react';

import { StepProps, VoiceProps } from './utils/types';
import StepContainer from './StepContainer';
import Box from '@mui/material/Box';

const Voice = ({
	source,
	period,
	voice,
	pitch,
	numOfSteps,
	track,
	color,
}: VoiceProps) => {
	const [interval, setInterval] = useState<number>(1);
	const [stepsErrorMessage, setStepsErrorMessage] = useState<string>('');
	const initialSteps: StepProps[] = [
		{ isActive: true },
		{ isActive: true },
		{ isActive: true },
		{ isActive: true },
	];
	const [steps, setSteps] = useState<StepProps[]>(initialSteps);
	const [pitchTimer, setPitchTimer] = useState();
	const [seqArgs, setSeqArgs] = useState<string[]>([
		`${pitch}4`,
		`${pitch}4`,
		`${pitch}4`,
		`${pitch}4`,
	]);
	const [seq, setSeq] = useState<Tone.Sequence<string>>();
	const [flashEvents, setFlashEvents] = useState<number>();
	const synth = source;
	let headIndex = useRef<number>(0);

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

	const resetPitch = () => {
		const tempArgs = [...seqArgs];
		const newPitchArgs = tempArgs.map((arg) => {
			return arg === '' ? '' : `${pitch}4`;
		});

		setSeqArgs(newPitchArgs);
	};

	useEffect(() => {
		clearInterval(pitchTimer);
		// @ts-ignore
		setPitchTimer(setTimeout(resetPitch, 300));
	}, [pitch]);

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
			track.notes = [];
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

			seqArgs.map((note, index) => {
				if (note !== '') {
					track.addNote({
						midi: Tone.Frequency(note).toMidi(),
						time:
							interval * index * (Tone.Transport.bpm.value / 120),
						duration:
							interval * 0.75 * (Tone.Transport.bpm.value / 120),
					});
				}
			});

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
				}, time);
			}, period - 0.01);
		}
	}, [period, interval, seqArgs]);

	return (
		<Box display="flex" justifyContent="center">
			{steps ? (
				<StepContainer
					steps={steps}
					seqArgs={seqArgs}
					setSeqArgs={setSeqArgs}
					pitch={pitch}
					voice={voice}
					emitter={myEmitter}
					color={color}
				/>
			) : (
				<div />
			)}
		</Box>
	);
};

export default Voice;
