import * as Tone from 'tone';
import { useState, useEffect } from 'react';

type VoiceProps = {
	period: number;
	scheduleEvents: (interval: number, callback: (time: any) => void) => void;
};

const Voice = ({ period, scheduleEvents }: VoiceProps) => {
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
			synth.triggerAttackRelease('C4', interval * 0.75, time)
		);
	}, [period, interval]);

	return (
		<div>
			<div>
				{'num of steps:'}
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
