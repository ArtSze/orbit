import * as Tone from 'tone';

import Transport from './Transport';

const Mixer = () => {
	const limiter = new Tone.Limiter(-5).toDestination();

	const channel1 = new Tone.Channel().connect(limiter);
	const channel2 = new Tone.Channel().connect(limiter);
	const channel3 = new Tone.Channel().connect(limiter);

	const source1 = new Tone.Synth().connect(channel1);
	const source2 = new Tone.Synth().connect(channel2);
	const source3 = new Tone.Synth().connect(channel3);

	const chorus = new Tone.Chorus(4, 2.5, 0.5).start().connect(limiter);
	const chorusChannel = new Tone.Channel({ volume: -60 }).connect(chorus);
	chorusChannel.receive('chorus');

	const crusher = new Tone.BitCrusher(6).connect(limiter);
	const crusherChannel = new Tone.Channel({ volume: -60 }).connect(crusher);
	crusherChannel.receive('crusher');

	channel1.send('chorus');
	channel2.send('chorus');
	channel3.send('chorus');

	channel1.send('crusher', -8);
	channel2.send('crusher', -8);
	channel3.send('crusher', -8);

	return (
		<Transport
			source1={source1}
			source2={source2}
			source3={source3}
			channel1={channel1}
			channel2={channel2}
			channel3={channel3}
			chorusChannel={chorusChannel}
			crusherChannel={crusherChannel}
		/>
	);
};

export default Mixer;
