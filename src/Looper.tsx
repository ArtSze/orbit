import * as Tone from 'tone';
import { useState, useEffect } from 'react';

const Looper = () => {
	const [bpm, setBpm] = useState(120);
	const [period, setPeriod] = useState(Tone.Time('2m').toSeconds());

	useEffect(() => {
		Tone.Transport.bpm.value = bpm;
		setPeriod(Tone.Time('2m').toSeconds());
		Tone.Transport.cancel();
		console.log(Tone.Transport.bpm.value);
	}, [bpm]);

	const loop = new Tone.Loop((time) => {
		// triggered every eighth note.
		console.log(period);
	}, '2m').start(0);

	const triggerLoop = () => {
		Tone.start();
		Tone.Transport.start();
	};

	const stopLoop = () => {
		Tone.Transport.stop();
	};

	return (
		<div>
			<button onClick={() => triggerLoop()}>trigger loop</button>
			<button onClick={() => stopLoop()}>stop loop</button>
			<input
				value={bpm}
				onChange={(event) => setBpm(parseInt(event.target.value))}
			/>
			<div>{`halfway of period: ${period / 2}`}</div>
			<div>{`end of period: ${period}`}</div>
		</div>
	);
};

export default Looper;
