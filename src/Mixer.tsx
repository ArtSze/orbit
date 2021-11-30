import * as Tone from 'tone';
import Stack from '@mui/material/Stack';
import { ChannelFader } from './MixerSubComponents/ChannelFader';
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

	const crusher = new Tone.BitCrusher(5).connect(limiter);
	const crusherChannel = new Tone.Channel({ volume: -60 }).connect(crusher);
	crusherChannel.receive('crusher');

	channel1.send('chorus');
	channel2.send('chorus');
	channel3.send('chorus');

	channel1.send('crusher');
	channel2.send('crusher');
	channel3.send('crusher');

	return (
		<div className={'container'}>
			<div className={'container'}>
				<Stack direction="row" spacing={2} height="350">
					<ChannelFader
						label={'1'}
						onChange={(event, value) => {
							channel1.set({
								volume: value as number,
							});
						}}
						defaultValue={-1}
					/>
					<ChannelFader
						label={'2'}
						onChange={(event, value) => {
							channel2.set({
								volume: value as number,
							});
						}}
						defaultValue={-1}
					/>
					<ChannelFader
						label={'3'}
						onChange={(event, value) => {
							channel3.set({
								volume: value as number,
							});
						}}
						defaultValue={-1}
					/>
				</Stack>
			</div>

			<div className={'container'}>
				<Stack direction="row" spacing={2} height="350">
					<ChannelFader
						label={'chorus level'}
						onChange={(event, value) => {
							chorusChannel.set({
								volume: value as number,
							});
						}}
						defaultValue={-60}
					/>
					<ChannelFader
						label={'crusher level'}
						onChange={(event, value) => {
							crusherChannel.set({
								volume: value as number,
							});
						}}
						defaultValue={-60}
					/>
				</Stack>
			</div>

			<Transport source1={source1} source2={source2} source3={source3} />
		</div>
	);
};

export default Mixer;
