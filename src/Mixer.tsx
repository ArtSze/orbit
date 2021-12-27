import * as Tone from 'tone';
import { useState, useMemo } from 'react';

import Transport from './Transport';

const Mixer = () => {
	const [tonal, setTonal] = useState(true);

	const limiter = useMemo(() => {
		return new Tone.Limiter(-5).toDestination();
	}, []);

	const channel1 = useMemo(() => {
		return new Tone.Channel().connect(limiter);
	}, []);
	const channel2 = useMemo(() => {
		return new Tone.Channel().connect(limiter);
	}, []);
	const channel3 = useMemo(() => {
		return new Tone.Channel().connect(limiter);
	}, []);

	const synth1 = useMemo(() => {
		return new Tone.Synth().connect(channel1);
	}, []);
	const synth2 = useMemo(() => {
		return new Tone.Synth().connect(channel2);
	}, []);
	const synth3 = useMemo(() => {
		return new Tone.Synth().connect(channel3);
	}, []);

	const player1 = useMemo(() => {
		return new Tone.Player(
			'https://archive.org/download/JeanLucCohen/JeanLucCohen44.zip/JeanLucCohen44%2FKick_15.wav'
		).connect(channel1);
	}, []);
	const player2 = useMemo(() => {
		return new Tone.Player(
			'https://archive.org/download/JeanLucCohen/JeanLucCohen44.zip/JeanLucCohen44%2FSnare_11.wav'
		).connect(channel2);
	}, []);
	const player3 = useMemo(() => {
		return new Tone.Player(
			'https://archive.org/download/JeanLucCohen/JeanLucCohen44.zip/JeanLucCohen44%2FHat_01.wav'
		).connect(channel3);
	}, []);

	player1.volume.value = -2;
	player2.volume.value = 0;
	player3.volume.value = -7;

	const chorus = useMemo(() => {
		return new Tone.Chorus(4, 2.5, 0.5).start().connect(limiter);
	}, []);
	const chorusChannel = useMemo(() => {
		return new Tone.Channel({ volume: -60 }).connect(chorus);
	}, []);
	chorusChannel.receive('chorus');

	const reverb = useMemo(() => {
		return new Tone.JCReverb(0.7).connect(limiter);
	}, []);
	const reverbChannel = useMemo(() => {
		return new Tone.Channel({ volume: -60 }).connect(reverb);
	}, []);
	reverbChannel.receive('reverb');

	channel1.send('chorus', -2);
	channel2.send('chorus', -2);
	channel3.send('chorus', -2);

	channel1.send('reverb', -8);
	channel2.send('reverb', -8);
	channel3.send('reverb', -8);

	return (
		<Transport
			source1={tonal ? synth1 : player1}
			source2={tonal ? synth2 : player2}
			source3={tonal ? synth3 : player3}
			channel1={channel1}
			channel2={channel2}
			channel3={channel3}
			chorusChannel={chorusChannel}
			reverbChannel={reverbChannel}
			tonal={tonal}
			setTonal={setTonal}
		/>
	);
};

export default Mixer;
