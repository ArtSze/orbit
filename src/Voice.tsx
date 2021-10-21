import * as Tone from 'tone';
import { useState, useEffect } from 'react';
import { PitchClass } from './utils/types';

type VoiceProps = {
	period: number;
	voice: number;
	pitch: PitchClass;
};

// handle edge case for no. of steps being 0 or NaN

const Voice = ({ period, voice, pitch }: VoiceProps) => {
	const [numOfSteps, setNumOfSteps] = useState(4);
	const [interval, setInterval] = useState(1);
	const [loopID, setLoopId] = useState(0);

	const synth = new Tone.Synth().toDestination();

	useEffect(() => {
		Tone.Transport.clear(loopID);
		setInterval(period / numOfSteps);
	}, [period, numOfSteps]);

	useEffect(() => {
		Tone.Transport.clear(loopID);
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
			</div>
		</div>
	);
};

export default Voice;
