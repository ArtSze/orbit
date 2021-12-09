import * as Tone from 'tone';
import { useState, useEffect, useCallback } from 'react';

import { PitchClass, TransportProps } from './utils/types';
import { midi } from './utils/midi';
import Voice from './Voice';
import { useTheme } from '@mui/material/styles';
import { ThemeColors } from './utils/Theme';
import { PlayPauseTrigger } from './TransportSubComponents/PlayPauseTrigger';
import { MidiDownloadButton } from './TransportSubComponents/MidiDownloadButton';
import { ResetStepCountButton } from './TransportSubComponents/ResetStepCountButton';
import { NumOfStepsMaster } from './TransportSubComponents/NumOfStepsMaster';
import { PitchControlMaster } from './TransportSubComponents/PitchControlMaster';
import { BpmContainer } from './TransportSubComponents/BpmContainer';
import { FaderMasterContainer } from './MixerSubComponents/FaderMasterContainer';
import { ModeSwitch } from './TransportSubComponents/ModeSwitch';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';

const Transport = ({
	source1,
	source2,
	source3,
	channel1,
	channel2,
	channel3,
	chorusChannel,
	crusherChannel,
	tonal,
	setTonal,
}: TransportProps) => {
	const [bpm, setBpm] = useState(120);
	const [period, setPeriod] = useState(Tone.Time('1m').toSeconds());
	const [numOfSteps1, setNumOfSteps1] = useState<number>(4);
	const [numOfSteps2, setNumOfSteps2] = useState<number>(4);
	const [numOfSteps3, setNumOfSteps3] = useState<number>(4);

	const [pitch1, setPitch1] = useState<PitchClass>(PitchClass.C);
	const [pitch2, setPitch2] = useState<PitchClass>(PitchClass.E);
	const [pitch3, setPitch3] = useState<PitchClass>(PitchClass.B);

	const theme = useTheme();

	const [playing, setPlaying] = useState<boolean>(false);

	const validTempo = bpm >= 20 && bpm <= 300 && !isNaN(bpm) ? true : false;

	// implement midi export of loop

	const resetNumOfSteps = () => {
		setNumOfSteps1(4);
		setNumOfSteps2(4);
		setNumOfSteps3(4);
		// will need to include code to change value for sliders to correspond as well
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
		}
	}, [bpm]);

	useEffect(() => {
		Tone.Transport.cancel();
		Tone.Transport.loopStart = 0;
		Tone.Transport.loopEnd = period;
		Tone.Transport.loop = true;
	}, [bpm, period]);

	const toggleTransport = () => {
		Tone.Transport.toggle();
		playing ? setPlaying(false) : setPlaying(true);
	};

	const triggerLoop = async () => {
		if (validTempo) {
			if (Tone.context.state === 'suspended') {
				await Tone.start();
			}
			toggleTransport();
		}
	};

	const checkKeyPress = useCallback(
		(e) => {
			console.log(e);
			if (e.key === ' ' && e.target === document.body) {
				e.preventDefault();
				triggerLoop();
			}
		},
		[playing]
	);

	useEffect(() => {
		window.addEventListener('keydown', checkKeyPress);
		return () => {
			window.removeEventListener('keydown', checkKeyPress);
		};
	}, [checkKeyPress]);

	const fullScreen = useMediaQuery('(min-width:700px)', { noSsr: true });

	return (
		<Grid
			container
			direction="row"
			justifyContent="space-between"
			alignItems="start"
			sx={
				fullScreen
					? {
							paddingLeft: '80px',
							paddingRight: '80px',
					  }
					: {}
			}>
			<Grid
				item
				sx={
					fullScreen
						? {}
						: {
								transform: `scale(0.6) translate(-50px, -110px)`,
						  }
				}>
				<PlayPauseTrigger playing={playing} triggerLoop={triggerLoop} />
				<BpmContainer bpm={bpm} setBpm={setBpm} />
				<NumOfStepsMaster
					numOfSteps1={numOfSteps1}
					setNumOfSteps1={setNumOfSteps1}
					numOfSteps2={numOfSteps2}
					setNumOfSteps2={setNumOfSteps2}
					numOfSteps3={numOfSteps3}
					setNumOfSteps3={setNumOfSteps3}
					color1={theme.palette.primary.main as ThemeColors}
					color2={theme.palette.secondary.main as ThemeColors}
					color3={theme.palette.success.main as ThemeColors}
				/>
				{tonal ? (
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
						color1={theme.palette.primary.main as ThemeColors}
						color2={theme.palette.secondary.main as ThemeColors}
						color3={theme.palette.success.main as ThemeColors}
					/>
				) : null}
				<ModeSwitch tonal={tonal} setTonal={setTonal} />
				<MidiDownloadButton bpm={bpm} />
				<ResetStepCountButton resetNumOfSteps={resetNumOfSteps} />
			</Grid>

			<Grid
				item
				sx={
					fullScreen
						? {}
						: {
								transform: `scale(0.7) translate(-260px, 40px);`,
						  }
				}>
				<Voice
					source={source1}
					period={period}
					voice={1}
					pitch={pitch1}
					numOfSteps={numOfSteps1}
					track={midi.tracks[0]}
					color={theme.palette.primary.main as ThemeColors}
				/>
				<Voice
					source={source2}
					period={period}
					voice={2}
					pitch={pitch2}
					numOfSteps={numOfSteps2}
					track={midi.tracks[1]}
					color={theme.palette.secondary.main as ThemeColors}
				/>
				<Voice
					source={source3}
					period={period}
					voice={3}
					pitch={pitch3}
					numOfSteps={numOfSteps3}
					track={midi.tracks[2]}
					color={theme.palette.success.main as ThemeColors}
				/>
			</Grid>

			<Grid
				item
				sx={
					fullScreen
						? {}
						: {
								transform: `scale(0.6) translate(-50px, -110px)`,
						  }
				}>
				<FaderMasterContainer
					channel1={channel1}
					channel2={channel2}
					channel3={channel3}
					chorusChannel={chorusChannel}
					crusherChannel={crusherChannel}
				/>
			</Grid>
		</Grid>
	);
};

export default Transport;
