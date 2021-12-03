import * as Tone from 'tone';
import { useState, useEffect } from 'react';

import { PitchClass, TransportProps } from './utils/types';
import { midi } from './utils/midi';
import Voice from './Voice';
import { PlayPauseTrigger } from './TransportSubComponents/PlayPauseTrigger';
import { MidiDownloadButton } from './TransportSubComponents/MidiDownloadButton';
import { ResetStepCountButton } from './TransportSubComponents/ResetStepCountButton';
import { NumOfStepsMaster } from './TransportSubComponents/NumOfStepsMaster';
import { PitchControlMaster } from './TransportSubComponents/PitchControlMaster';
import { BpmContainer } from './TransportSubComponents/BpmContainer';

const Transport = ({ source1, source2, source3 }: TransportProps) => {
	const [bpm, setBpm] = useState(120);
	const [period, setPeriod] = useState(Tone.Time('1m').toSeconds());
	const [numOfSteps1, setNumOfSteps1] = useState<number>(4);
	const [numOfSteps2, setNumOfSteps2] = useState<number>(4);
	const [numOfSteps3, setNumOfSteps3] = useState<number>(4);

	const [pitch1, setPitch1] = useState<PitchClass>(PitchClass.C);
	const [pitch2, setPitch2] = useState<PitchClass>(PitchClass.E);
	const [pitch3, setPitch3] = useState<PitchClass>(PitchClass.B);

	const [playing, setPlaying] = useState<boolean>(false);
	const [bpmErrorMessage, setBpmErrorMessage] = useState('');

	const validTempo = bpm >= 20 && bpm <= 300 && !isNaN(bpm) ? true : false;

	// implement midi export of loop

	const toggleTransport = () => {
		Tone.Transport.toggle();
		playing ? setPlaying(false) : setPlaying(true);
	};

	const resetNumOfSteps = () => {
		setNumOfSteps1(4);
		setNumOfSteps2(4);
		setNumOfSteps3(4);
		// will need to include code to change value for sliders to correspond as well
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

	useEffect(() => {
		console.log(midi);
	}, [midi]);

	return (
		<div className={`transport`}>
			<div id={'controlContainer'}>
				<PlayPauseTrigger playing={playing} triggerLoop={triggerLoop} />
				<BpmContainer bpm={bpm} setBpm={setBpm} />

				<div id={'paramsContainer'}>
					<NumOfStepsMaster
						numOfSteps1={numOfSteps1}
						setNumOfSteps1={setNumOfSteps1}
						numOfSteps2={numOfSteps2}
						setNumOfSteps2={setNumOfSteps2}
						numOfSteps3={numOfSteps3}
						setNumOfSteps3={setNumOfSteps3}
					/>
					<PitchControlMaster
						pitch1={pitch1}
						setPitch1={setPitch1}
						defaultPitchInd1={0}
						pitch2={pitch2}
						setPitch2={setPitch2}
						defaultPitchInd2={5}
						pitch3={pitch3}
						setPitch3={setPitch3}
						defaultPitchInd3={11}
					/>
				</div>
			</div>

			<div>
				<MidiDownloadButton bpm={bpm} />
				<ResetStepCountButton resetNumOfSteps={resetNumOfSteps} />
			</div>

			<div id={'voiceContainer'}>
				<Voice
					source={source1}
					period={period}
					voice={1}
					pitch={pitch1}
					numOfSteps={numOfSteps1}
					track={midi.tracks[0]}
				/>
				<Voice
					source={source2}
					period={period}
					voice={2}
					pitch={pitch2}
					numOfSteps={numOfSteps2}
					track={midi.tracks[1]}
				/>
				<Voice
					source={source3}
					period={period}
					voice={3}
					pitch={pitch3}
					numOfSteps={numOfSteps3}
					track={midi.tracks[2]}
				/>
			</div>
		</div>
	);
};

export default Transport;
