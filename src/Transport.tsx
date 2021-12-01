import * as Tone from 'tone';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';

import { PitchClass, TransportProps } from './utils/types';
import { midi, encodeMidi } from './utils/midi';
import Voice from './Voice';
import PitchControl from './TransportSubComponents/PitchControl';
import { NumOfStepsControl } from './TransportSubComponents/NumOfStepsControl';
import { BpmController } from './TransportSubComponents/BpmController';

const Transport = ({ source1, source2, source3 }: TransportProps) => {
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

	const validTempo = bpm >= 20 && bpm <= 300 && !isNaN(bpm) ? true : false;

	// implement midi export of loop

	const toggleTransport = () => {
		Tone.Transport.toggle();
		triggerText === 'play'
			? setTriggerText('stop')
			: setTriggerText('play');
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
				<button onClick={() => triggerLoop()}>{triggerText}</button>
				<div>
					<BpmController bpm={bpm} setBpm={setBpm} />
				</div>

				<div id={'paramsContainer'}>
					<div className={'voiceControls'}>
						<Typography variant="body2" width="120px">
							voice 1
						</Typography>
						<NumOfStepsControl
							numOfSteps={numOfSteps1}
							setNumOfSteps={setNumOfSteps1}
						/>
						<PitchControl
							pitch={pitch1}
							setPitch={setPitch1}
							defaultInd={0}
						/>
					</div>
					<div className={'voiceControls'}>
						<Typography variant="body2" width="120px">
							voice 2
						</Typography>
						<NumOfStepsControl
							numOfSteps={numOfSteps2}
							setNumOfSteps={setNumOfSteps2}
						/>
						<PitchControl
							pitch={pitch2}
							setPitch={setPitch2}
							defaultInd={5}
						/>
					</div>
					<div className={'voiceControls'}>
						<Typography variant="body2" width="120px">
							voice 3
						</Typography>
						<NumOfStepsControl
							numOfSteps={numOfSteps3}
							setNumOfSteps={setNumOfSteps3}
						/>
						<PitchControl
							pitch={pitch3}
							setPitch={setPitch3}
							defaultInd={11}
						/>
					</div>
				</div>
			</div>

			<div>
				<button onClick={() => encodeMidi(bpm)}>encode midi</button>
				<button onClick={() => resetNumOfSteps()}>
					reset step counts
				</button>
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
