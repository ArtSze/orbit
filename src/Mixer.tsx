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

	channel1.send('chorus');
	channel2.send('chorus');
	channel3.send('chorus');

	let vol1 = useRef<number>().current;
	const [vol2, setVol2] = useState<number>();
	const [vol3, setVol3] = useState<number>();

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
						max={0}
						min={-21}
						step={1}
						onChange={(event) => {
							vol1 = parseInt(event.target.value);
							channel1.set({ volume: vol1 });
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
			</div>

			<Transport source1={source1} source2={source2} source3={source3} />
		</div>
	);
};

export default Mixer;
