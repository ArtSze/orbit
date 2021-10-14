import * as Tone from 'tone';

const Looper = () => {
	const synth = new Tone.Synth().toDestination();

	Tone.Transport.setLoopPoints(0, '2m');
	Tone.Transport.loop = true;

	Tone.Transport.schedule((time) => {
		// invoked on measure 0
		console.log('measure 0!');
	}, '0:0:0');

	Tone.Transport.schedule((time) => {
		// invoked on measure 1
		console.log('measure 1!');
	}, '1:0:0');

	const triggerLoop = () => {
		Tone.Transport.start();
	};

	const stopLoop = () => {
		Tone.Transport.stop();
	};

	return (
		<div>
			<button onClick={() => triggerLoop()}>trigger loop</button>
			<button onClick={() => stopLoop()}>stop loop</button>
		</div>
	);
};

export default Looper;
