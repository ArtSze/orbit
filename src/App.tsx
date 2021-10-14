import React from 'react';
import * as Tone from 'tone';

import { PitchClass } from './utils/types';
import Looper from './Looper';

const App = () => {
	return (
		<div>
			<header></header>
			<div>
				<Looper />
			</div>
		</div>
	);
};

export default App;
