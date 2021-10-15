import React from 'react';
import * as Tone from 'tone';

import { PitchClass } from './utils/types';
import Transport from './Transport';

const App = () => {
	return (
		<div>
			<header></header>
			<div>
				<Transport />
			</div>
		</div>
	);
};

export default App;
