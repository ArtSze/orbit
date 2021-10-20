import * as Tone from 'tone';
import { useState, useEffect } from 'react';

const Transport = () => {
	const [bpm, setBpm] = useState(120);
	const [numOfSteps, setNumOfSteps] = useState(4);
	const [period, setPeriod] = useState(Tone.Time('2m').toSeconds());
	const [interval, setInterval] = useState(1);
	const synth = new Tone.Synth().toDestination();

	useEffect(() => {
		Tone.Transport.cancel();
		Tone.Transport.bpm.value = bpm;
		setPeriod(Tone.Time('2m').toSeconds());
		setInterval(period / numOfSteps);
	}, [bpm, numOfSteps]);

	useEffect(() => {
		Tone.Transport.cancel();
		setInterval(period / numOfSteps);

		Tone.Transport.scheduleRepeat(
			(time) => {
				synth.triggerAttackRelease('C4', interval * 0.75, time);
			},
			interval,
			0,
			period
		);

		Tone.Transport.loopStart = 0;
		Tone.Transport.loopEnd = period;
		Tone.Transport.loop = true;
	}, [interval]);

	const initialize = () => {
		Tone.start();
	};

	const triggerLoop = () => {
		Tone.Transport.start();
	};

	const stopLoop = () => {
		Tone.Transport.stop();
	};

	return (
		<div>
			<button onClick={() => initialize()}>initialize</button>
			<button onClick={() => triggerLoop()}>play</button>
			<button onClick={() => stopLoop()}>stop</button>
			<div>
				{'bpm:'}
				<input
					value={bpm}
					onChange={(event) => setBpm(parseInt(event.target.value))}
				/>
			</div>
			<div>
				{'num of steps:'}
				<input
					value={numOfSteps}
					onChange={(event) =>
						setNumOfSteps(parseInt(event.target.value))
					}
				/>
			</div>
			<div>{`length of period in seconds: ${period}`}</div>
		</div>
	);
};

export default Transport;
