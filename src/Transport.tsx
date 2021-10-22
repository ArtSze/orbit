import * as Tone from 'tone';
import { useState, useEffect } from 'react';

import Voice from './Voice';
import { PitchClass } from './utils/types';

const Transport = () => {
	const [bpm, setBpm] = useState(120);
	const [period, setPeriod] = useState(Tone.Time('1m').toSeconds());

	const [triggerText, setTriggerText] = useState('play');
	const [bpmErrorMessage, setBpmErrorMessage] = useState('');

	const validTempo = bpm >= 20 && bpm <= 300 && !isNaN(bpm) ? true : false;

	const toggleTransport = () => {
		Tone.Transport.toggle();
		triggerText === 'play'
			? setTriggerText('stop')
			: setTriggerText('play');
	};

	const flashBpmErrorMessage = () => {
		setBpmErrorMessage('BPM must fall within range of 20 through 300 BPM');
		setTimeout(() => setBpmErrorMessage(''), 4 * 1000);
	};

	useEffect(() => {
		if (validTempo) {
			Tone.Transport.cancel();
			Tone.Transport.bpm.value = bpm;
			setPeriod(Tone.Time('1m').toSeconds());
		} else if (!validTempo) {
			if (Tone.Transport.state === 'started') {
				toggleTransport();
			}
			flashBpmErrorMessage();
		}
	}, [bpm]);

	useEffect(() => {
		Tone.Transport.cancel();
		Tone.Transport.loopStart = 0;
		Tone.Transport.loopEnd = period;
		Tone.Transport.loop = true;
	}, [bpm, period]);

	const triggerLoop = async () => {
		if (validTempo) {
			if (Tone.context.state === 'suspended') {
				await Tone.start();
				console.log(`context resumed`);
			}

			toggleTransport();
			console.log(Tone.Transport.state);
		}
	};

	return (
		<div>
			<button onClick={() => triggerLoop()}>{triggerText}</button>
			<div>
				{'bpm:'}
				<input
					value={bpm}
					onChange={(event) => setBpm(parseInt(event.target.value))}
				/>
				<div>{`${bpmErrorMessage}`}</div>
			</div>
			<Voice period={period} voice={1} pitch={PitchClass.C} />
			<Voice period={period} voice={2} pitch={PitchClass.G} />
			<Voice period={period} voice={3} pitch={PitchClass.B} />
			<div>{`length of period in seconds: ${period}`}</div>
		</div>
	);
};

export default Transport;
