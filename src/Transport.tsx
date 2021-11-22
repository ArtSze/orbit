import * as Tone from 'tone';
import { useState, useEffect } from 'react';

import Voice from './Voice';
import { PitchClass } from './utils/types';
import PitchControl from './TransportSubControls/PitchControl';

const Transport = () => {
	const [bpm, setBpm] = useState(120);
	const [period, setPeriod] = useState(Tone.Time('1m').toSeconds());
	const [numOfSteps1, setNumOfSteps1] = useState<number>(4);
	const [numOfSteps2, setNumOfSteps2] = useState<number>(4);
	const [numOfSteps3, setNumOfSteps3] = useState<number>(4);

	const [pitch1, setPitch1] = useState<PitchClass>(PitchClass.C);
	const [pitch2, setPitch2] = useState<PitchClass>(PitchClass.E);
	const [pitch3, setPitch3] = useState<PitchClass>(PitchClass.B);

	const [triggerText, setTriggerText] = useState('play');
	const [bpmErrorMessage, setBpmErrorMessage] = useState('');

	const limiter = new Tone.Limiter(-10).toDestination();

	const reverb = new Tone.Reverb(3).connect(limiter);
	const reverbChannel = new Tone.Channel({ volume: -60 }).connect(reverb);
	reverbChannel.receive('reverb');

	const chorus = new Tone.Chorus(4, 2.5, 0.5).start().connect(limiter);
	const chorusChannel = new Tone.Channel({ volume: -60 }).connect(chorus);
	chorusChannel.receive('chorus');

	const vibrato = new Tone.Vibrato('8n', 0.5).connect(limiter);
	const vibratoChannel = new Tone.Channel({ volume: -60 }).connect(vibrato);
	vibratoChannel.receive('vibrato');

	const channel1 = new Tone.Channel().connect(limiter);
	const channel2 = new Tone.Channel().connect(limiter);
	const channel3 = new Tone.Channel().connect(limiter);

	const source1 = new Tone.Synth();
	const source2 = new Tone.Synth();
	const source3 = new Tone.Synth();

	source1.connect(channel1);
	source2.connect(channel2);
	source3.connect(channel3);

	channel1.send('reverb');
	channel2.send('reverb');
	channel3.send('reverb');

	channel1.send('chorus');
	channel2.send('chorus');
	channel3.send('chorus');

	channel1.send('vibrato');
	channel2.send('vibrato');
	channel3.send('vibrato');

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
					{`bpm: ${bpm}`}

					<input
						type="range"
						defaultValue={bpm}
						max={300}
						min={20}
						step={1}
						onChange={(event) =>
							setBpm(parseInt(event.target.value))
						}
					/>
					<div>{`${bpmErrorMessage}`}</div>
				</div>

				<div id={'paramsContainer'}>
					<div className={'voiceControls'}>
						<label>voice 1:</label>
						<label>{numOfSteps1}</label>
						<input
							type="range"
							defaultValue={numOfSteps1}
							max={32}
							step={1}
							onChange={(event) =>
								setNumOfSteps1(parseInt(event.target.value))
							}
						/>
						<PitchControl
							pitch={pitch1}
							setPitch={setPitch1}
							defaultInd={0}
						/>
					</div>
					<div className={'voiceControls'}>
						<label>voice 2:</label>
						<label>{numOfSteps2}</label>
						<input
							type="range"
							defaultValue={numOfSteps2}
							max={32}
							step={1}
							onChange={(event) =>
								setNumOfSteps2(parseInt(event.target.value))
							}
						/>
						<PitchControl
							pitch={pitch2}
							setPitch={setPitch2}
							defaultInd={5}
						/>
					</div>
					<div className={'voiceControls'}>
						<label>voice 3:</label>
						<label>{numOfSteps3}</label>
						<input
							type="range"
							defaultValue={numOfSteps3}
							max={32}
							step={1}
							onChange={(event) =>
								setNumOfSteps3(parseInt(event.target.value))
							}
						/>
						<PitchControl
							pitch={pitch3}
							setPitch={setPitch3}
							defaultInd={11}
						/>
					</div>
				</div>
			</div>

			<div id={'fxContainer'}>
				<div>
					<label>verb level:</label>
					<input
						type="range"
						defaultValue={-60}
						max={0}
						min={-60}
						step={1}
						onChange={(event) =>
							(reverbChannel.volume.value = parseInt(
								event.target.value
							))
						}
					/>
				</div>
				<div>
					<label>chorus level:</label>
					<input
						type="range"
						defaultValue={-60}
						max={0}
						min={-60}
						step={1}
						onChange={(event) =>
							(chorusChannel.volume.value = parseInt(
								event.target.value
							))
						}
					/>
				</div>
				<div>
					<label>vibrato level:</label>
					<input
						type="range"
						defaultValue={-60}
						max={0}
						min={-60}
						step={1}
						onChange={(event) =>
							(vibratoChannel.volume.value = parseInt(
								event.target.value
							))
						}
					/>
				</div>
			</div>

			<div id={'voiceContainer'}>
				<Voice
					source={source1}
					period={period}
					voice={1}
					pitch={pitch1}
					numOfSteps={numOfSteps1}
				/>
				<Voice
					source={source2}
					period={period}
					voice={2}
					pitch={pitch2}
					numOfSteps={numOfSteps2}
				/>
				<Voice
					source={source3}
					period={period}
					voice={3}
					pitch={pitch3}
					numOfSteps={numOfSteps3}
				/>
			</div>
		</div>
	);
};

export default Transport;
