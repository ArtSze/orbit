import * as Tone from 'tone';
import { useState, useEffect } from 'react';

const Transport = () => {
	const [bpm, setBpm] = useState(120);
	const [numOfSteps, setNumOfSteps] = useState(4);
	const [period, setPeriod] = useState(Tone.Time('2m').toSeconds());

	const synth = new Tone.Synth().toDestination();

	useEffect(() => {
		Tone.Transport.cancel();
		Tone.Transport.bpm.value = bpm;
		setPeriod(Tone.Time('2m').toSeconds());
		console.log(`new bpm: ${Tone.Transport.bpm.value}`);
	}, [bpm]);

	useEffect(() => {
		Tone.Transport.cancel();

		new Tone.Loop((time) => {
			synth.triggerAttackRelease('C4', '16n');
		}, period / numOfSteps).start(0);
		// .stop(3);

		console.log(`num of steps: ${numOfSteps}`);
	}, [numOfSteps, period]);

	const loop = new Tone.Loop((time) => {
		// insert pattern from useEffect above
		// console.log(period);
	}, '2m').start(0);

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
