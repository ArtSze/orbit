import { useState } from 'react';
import Box from '@mui/material/Box';
import PianoSharpIcon from '@mui/icons-material/PianoSharp';
import IconButton from '@mui/material/IconButton';
import Grow from '@mui/material/Grow';
import Tooltip from '@mui/material/Tooltip';
import { PitchControlKnob } from './PitchControlKnob';

import { PitchClass } from '../utils/types';

type PitchControlMasterProps = {
	pitch1: PitchClass;
	setPitch1: React.Dispatch<React.SetStateAction<PitchClass>>;
	defaultPitchInd1: number;
	pitch2: PitchClass;
	setPitch2: React.Dispatch<React.SetStateAction<PitchClass>>;
	defaultPitchInd2: number;
	pitch3: PitchClass;
	setPitch3: React.Dispatch<React.SetStateAction<PitchClass>>;
	defaultPitchInd3: number;
};

export const PitchControlMaster = ({
	pitch1,
	pitch2,
	pitch3,
	setPitch1,
	setPitch2,
	setPitch3,
	defaultPitchInd1,
	defaultPitchInd2,
	defaultPitchInd3,
}: PitchControlMasterProps) => {
	const [display, setDisplay] = useState(false);

	const handleClick = () => {
		setDisplay((prev: boolean) => !prev);
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<Tooltip title={`show controls for each voice's step count`}>
				<IconButton onClick={handleClick}>
					<PianoSharpIcon />
				</IconButton>
			</Tooltip>
			<Grow in={display}>
				<Box sx={{ display: 'flex', flexDirection: 'row' }}>
					<PitchControlKnob
						pitch={pitch1}
						setPitch={setPitch1}
						defaultInd={defaultPitchInd1}
					/>
					<PitchControlKnob
						pitch={pitch2}
						setPitch={setPitch2}
						defaultInd={defaultPitchInd2}
					/>
					<PitchControlKnob
						pitch={pitch3}
						setPitch={setPitch3}
						defaultInd={defaultPitchInd3}
					/>
				</Box>
			</Grow>
		</Box>
	);
};
