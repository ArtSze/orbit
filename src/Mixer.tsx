import { useState, useEffect, useRef } from 'react';
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

	const crusher = new Tone.BitCrusher(5).connect(limiter);
	const crusherChannel = new Tone.Channel({ volume: -60 }).connect(crusher);
	crusherChannel.receive('crusher');

	channel1.send('chorus');
	channel2.send('chorus');
	channel3.send('chorus');

	channel1.send('crusher');
	channel2.send('crusher');
	channel3.send('crusher');

	useEffect(() => {
		console.log(channel1.volume.value);
	}, [channel1.volume]);

	return (
		<div>
			<div id={'faderContainer'}>
				<div>
					<label>channel 1 level:</label>
					<input
						type="range"
						max={-2}
						min={-40}
						step={1}
						onChange={(event) => {
							channel1.set({
								volume: parseInt(event.target.value),
							});
						}}
					/>
				</div>
				<div>
					<label>channel 2 level:</label>
					<input
						type="range"
						max={-2}
						min={-40}
						step={1}
						onChange={(event) =>
							channel2.set({
								volume: parseInt(event.target.value),
							})
						}
					/>
				</div>
				<div>
					<label>channel 3 level:</label>
					<input
						type="range"
						max={-2}
						min={-40}
						step={1}
						onChange={(event) =>
							channel3.set({
								volume: parseInt(event.target.value),
							})
						}
					/>
				</div>
			</div>

			<div id={'fxContainer'}>
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
					<label>crusher level:</label>
					<input
						type="range"
						defaultValue={-60}
						max={0}
						min={-60}
						step={1}
						onChange={(event) =>
							(crusherChannel.volume.value = parseInt(
								event.target.value
							))
						}
					/>
				</div>
			</div>

			<Transport source1={source1} source2={source2} source3={source3} />
		</div>
	);
};

export default Mixer;
