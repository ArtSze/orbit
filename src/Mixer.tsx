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
			'https://archive.org/download/JeanLucCohen/JeanLucCohen22.zip/JeanLucCohen22%2FKick_15.wav'
		).connect(channel1);
	}, []);
	const player2 = useMemo(() => {
		return new Tone.Player(
			'https://archive.org/download/JeanLucCohen/JeanLucCohen22.zip/JeanLucCohen22%2FSnare_11.wav'
		).connect(channel2);
	}, []);
	const player3 = useMemo(() => {
		return new Tone.Player(
			'https://archive.org/download/JeanLucCohen/JeanLucCohen22.zip/JeanLucCohen22%2FHat_01.wav'
		).connect(channel3);
	}, []);

	player1.volume.value = 4;
	player2.volume.value = 0;
	player3.volume.value = -7;

	const chorus = useMemo(() => {
		return new Tone.Chorus(4, 2.5, 0.5).start().connect(limiter);
	}, []);
	const chorusChannel = useMemo(() => {
		return new Tone.Channel({ volume: -60 }).connect(chorus);
	}, []);
	chorusChannel.receive('chorus');

	const crusher = useMemo(() => {
		return new Tone.BitCrusher(6).connect(limiter);
	}, []);
	const crusherChannel = useMemo(() => {
		return new Tone.Channel({ volume: -60 }).connect(crusher);
	}, []);
	crusherChannel.receive('crusher');

	channel1.send('chorus');
	channel2.send('chorus');
	channel3.send('chorus');

	channel1.send('crusher', -8);
	channel2.send('crusher', -8);
	channel3.send('crusher', -8);

	return (
		<Transport
			source1={tonal ? synth1 : player1}
			source2={tonal ? synth2 : player2}
			source3={tonal ? synth3 : player3}
			channel1={channel1}
			channel2={channel2}
			channel3={channel3}
			chorusChannel={chorusChannel}
			crusherChannel={crusherChannel}
			tonal={tonal}
			setTonal={setTonal}
		/>
	);
};

export default Mixer;
