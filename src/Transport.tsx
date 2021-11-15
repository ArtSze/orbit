import * as Tone from 'tone';
import { useState, useEffect } from 'react';

import Voice from './Voice';
import { PitchClass } from './utils/types';

const Transport = () => {
	const [bpm, setBpm] = useState(120);
	const [period, setPeriod] = useState(Tone.Time('1m').toSeconds());
	const [numOfSteps1, setNumOfSteps1] = useState<number>(4);
	const [numOfSteps2, setNumOfSteps2] = useState<number>(4);
	const [numOfSteps3, setNumOfSteps3] = useState<number>(4);

	const [triggerText, setTriggerText] = useState('play');
	const [bpmErrorMessage, setBpmErrorMessage] = useState('');

	const reverb = new Tone.Reverb(2);
	reverb.wet.value = 0;

	const source1 = new Tone.Synth();
	const source2 = new Tone.Synth();
	const source3 = new Tone.Synth();

	source1.chain(reverb, Tone.Destination);
	source2.chain(reverb, Tone.Destination);
	source3.chain(reverb, Tone.Destination);

	const validTempo = bpm >= 20 && bpm <= 300 && !isNaN(bpm) ? true : false;

	// implement midi export of loop

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

	const toggleEffect = (reverb: Tone.Reverb) => {
		reverb.wet.value === 1
			? (reverb.wet.value = 0)
			: (reverb.wet.value = 1);
		console.log({ reverb });
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
			}

			toggleTransport();
		}
	};

	return (
		<div className={`transport`}>
			<div id={'controlContainer'}>
				<button onClick={() => triggerLoop()}>{triggerText}</button>
				<div>
					{'bpm:'}
					<input
						value={bpm}
						onChange={(event) =>
							setBpm(parseInt(event.target.value))
						}
					/>
					<div>{`${bpmErrorMessage}`}</div>
				</div>
				{/* <div>{`length of period in seconds: ${period}`}</div> */}
				<div id={'numOfStepsContainer'}>
					<div>
						<label>1:</label>
						<input
							value={numOfSteps1}
							onChange={(event) =>
								setNumOfSteps1(parseInt(event.target.value))
							}
						/>
					</div>
					<div>
						<label>2:</label>
						<input
							value={numOfSteps2}
							onChange={(event) =>
								setNumOfSteps2(parseInt(event.target.value))
							}
						/>
					</div>
					<div>
						<label>3:</label>
						<input
							value={numOfSteps3}
							onChange={(event) =>
								setNumOfSteps3(parseInt(event.target.value))
							}
						/>
					</div>
				</div>
			</div>

			<div id={'fxContainer'}>
				<button
					onClick={() => {
						toggleEffect(reverb);
					}}>
					reverb
				</button>
			</div>

			<div id={'voiceContainer'}>
				<Voice
					source={source1}
					period={period}
					voice={1}
					pitch={PitchClass.C}
					numOfSteps={numOfSteps1}
				/>
				<Voice
					source={source2}
					period={period}
					voice={2}
					pitch={PitchClass.G}
					numOfSteps={numOfSteps2}
				/>
				<Voice
					source={source3}
					period={period}
					voice={3}
					pitch={PitchClass.B}
					numOfSteps={numOfSteps3}
				/>
			</div>
		</div>
	);
};

export default Transport;
