import * as Tone from 'tone';
import { useState, useEffect } from 'react';
import { PitchClass } from './utils/types';

type VoiceProps = {
	period: number;
	voice: number;
	pitch: PitchClass;
};

const Voice = ({ period, voice, pitch }: VoiceProps) => {
	const [numOfSteps, setNumOfSteps] = useState(4);
	const [interval, setInterval] = useState(1);
	const [loopID, setLoopId] = useState(0);
	const [stepsErrorMessage, setStepsErrorMessage] = useState('');

	const synth = new Tone.Synth().toDestination();

	const validTimeParams = numOfSteps !== (NaN || 0) ? true : false;

	const stepsWithinRange = numOfSteps! <= 128 ? true : false;

	const flashStepsErrorMessage = () => {
		setStepsErrorMessage(
			'number of steps must be less than or equal to 128'
		);
		setTimeout(() => setStepsErrorMessage(''), 3 * 1000);
	};

	useEffect(() => {
		Tone.Transport.clear(loopID);
		if (validTimeParams && stepsWithinRange) {
			setInterval(period / numOfSteps);
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
			</div>
		</div>
	);
};

export default Voice;
