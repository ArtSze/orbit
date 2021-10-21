import * as Tone from 'tone';
import { useState, useEffect } from 'react';

import Voice from './Voice';

const Transport = () => {
	const [bpm, setBpm] = useState(120);
	const [period, setPeriod] = useState(Tone.Time('2m').toSeconds());

	useEffect(() => {
		Tone.Transport.cancel();
		Tone.Transport.bpm.value = bpm;
		setPeriod(Tone.Time('2m').toSeconds());
	}, [bpm]);

	useEffect(() => {
		Tone.Transport.cancel();

		Tone.Transport.loopStart = 0;
		Tone.Transport.loopEnd = period;
		Tone.Transport.loop = true;
	}, [bpm, period]);

	const initialize = () => {
		Tone.start();
	};

	const triggerLoop = () => {
		Tone.Transport.start();
	};

	const stopLoop = () => {
		Tone.Transport.stop();
	};

	const scheduleEvents = (
		interval: number,
		callback: (time: any) => void
	) => {
		Tone.Transport.scheduleRepeat(
			(time) => {
				callback(time);
			},
			interval,
			0,
			period
		);
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
			<Voice period={period} scheduleEvents={scheduleEvents} />
			<div>{`length of period in seconds: ${period}`}</div>
		</div>
	);
};

export default Transport;
