import * as Tone from 'tone';
import * as FileSaver from 'file-saver';
import { Header, Midi } from '@tonejs/midi';
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

	const limiter = new Tone.Limiter(-5).toDestination();

	const source1 = new Tone.Synth().connect(limiter);
	const source2 = new Tone.Synth().connect(limiter);
	const source3 = new Tone.Synth().connect(limiter);

	const midi = new Midi();

	const track1 = midi.addTrack();
	const track2 = midi.addTrack();
	const track3 = midi.addTrack();

	track1.instrument.number = 1;
	track2.instrument.number = 1;
	track3.instrument.number = 1;

	track1.channel = 1;
	track2.channel = 2;
	track3.channel = 3;

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
			// midi.header.tempos = [{ ticks: 0, bpm: bpm }];
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

	const encodeMidi = () => {
		console.log(midi.header.ppq);
		console.log(Tone.Transport.PPQ);
		console.log(midi);

		midi.header.tempos = [{ ticks: 0, bpm: bpm }];
		const blob = new Blob([midi.toArray()], { type: 'audio/midi' });
		FileSaver.saveAs(blob, 'test.mid');
	};

	useEffect(() => {
		console.log(midi);
	}, [midi]);

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

			<div id={'faderContainer'}>
				<div>
					<label>channel 1 level:</label>
					<input
						type="range"
						max={0}
						min={-21}
						step={1}
						onChange={(event) => {
							source1.volume.value = parseInt(event.target.value);
							console.log(source1.volume.value);
						}}
					/>
				</div>
				<div>
					<label>channel 2 level:</label>
					<input
						type="range"
						max={0}
						min={-21}
						step={1}
						onChange={(event) =>
							(source2.volume.value = parseInt(
								event.target.value
							))
						}
					/>
				</div>
				<div>
					<label>channel 3 level:</label>
					<input
						type="range"
						max={0}
						min={-21}
						step={1}
						onChange={(event) =>
							(source3.volume.value = parseInt(
								event.target.value
							))
						}
					/>
				</div>
			</div>

			<div>
				<button onClick={encodeMidi}>encode midi</button>
			</div>

			<div id={'voiceContainer'}>
				<Voice
					source={source1}
					period={period}
					voice={1}
					pitch={pitch1}
					numOfSteps={numOfSteps1}
					track={track1}
				/>
				<Voice
					source={source2}
					period={period}
					voice={2}
					pitch={pitch2}
					numOfSteps={numOfSteps2}
					track={track2}
				/>
				<Voice
					source={source3}
					period={period}
					voice={3}
					pitch={pitch3}
					numOfSteps={numOfSteps3}
					track={track3}
				/>
			</div>
		</div>
	);
};

export default Transport;
