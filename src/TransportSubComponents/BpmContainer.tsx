import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Grow from '@mui/material/Grow';
import Tooltip from '@mui/material/Tooltip';

import { MetronomeIcon } from '../utils/MetronomeIcon';
import { BpmKnob } from './BpmKnob';

type BpmContainerProps = {
	bpm: number;
	setBpm: React.Dispatch<React.SetStateAction<number>>;
};

export const BpmContainer = ({ bpm, setBpm }: BpmContainerProps) => {
	const [display, setDisplay] = useState(false);

	const handleClick = () => {
		setDisplay((prev: boolean) => !prev);
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<Tooltip title={`show controls for each voice's step count`}>
				<IconButton onClick={handleClick}>
					<MetronomeIcon />
				</IconButton>
			</Tooltip>
			<Grow in={display}>
				<Box sx={{ display: 'flex', flexDirection: 'row' }}>
					<BpmKnob bpm={bpm} setBpm={setBpm} />
				</Box>
			</Grow>
		</Box>
	);
};
