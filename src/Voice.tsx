import * as Tone from 'tone';
import { useState, useEffect } from 'react';
import { PitchClass } from './utils/types';

type VoiceProps = {
	period: number;
	scheduleEvents: (interval: number, callback: (time: any) => void) => void;
	voice: number;
	pitch: PitchClass;
};

const Voice = ({ period, scheduleEvents, voice, pitch }: VoiceProps) => {
	const [numOfSteps, setNumOfSteps] = useState(4);
	const [interval, setInterval] = useState(1);

	const synth = new Tone.Synth().toDestination();

	useEffect(() => {
		Tone.Transport.cancel();
		setInterval(period / numOfSteps);
	}, [period, numOfSteps]);

	useEffect(() => {
		Tone.Transport.cancel();
		setInterval(period / numOfSteps);
		scheduleEvents(interval, (time) =>
			synth.triggerAttackRelease(`${pitch}4`, interval * 0.75, time)
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
