import React from 'react';
import * as Tone from 'tone';
import { PitchClass } from './utils/types';

const App = () => {
	const synth = new Tone.Synth().toDestination();

	const playNote = (note: PitchClass): void => {
		synth.triggerAttackRelease(`${note}4`, '8n');
	};

	return (
		<div>
			<header></header>
			<div>
				<button className="note" onClick={() => playNote(PitchClass.C)}>
					C
				</button>
			</div>
		</div>
	);
};

export default App;
