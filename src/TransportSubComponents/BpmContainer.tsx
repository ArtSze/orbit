import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Grow from '@mui/material/Grow';
import Tooltip from '@mui/material/Tooltip';

import { MetronomeIcon } from '../utils/MetronomeIcon';
import { BpmKnob } from './BpmKnob';
import { BpmContainerProps } from '../utils/types';

export const BpmContainer = ({ bpm, setBpm }: BpmContainerProps) => {
	const [display, setDisplay] = useState(false);

	const handleClick = () => {
		setDisplay((prev: boolean) => !prev);
	};

	return (
		<Box sx={{ display: 'flex' }} className={'controlRow'}>
			<Tooltip title={`tempo control`}>
				<IconButton onClick={handleClick} className={'icon'}>
					<MetronomeIcon />
				</IconButton>
			</Tooltip>
			<Grow in={display}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						marginLeft: '20px',
					}}>
					<BpmKnob bpm={bpm} setBpm={setBpm} />
				</Box>
			</Grow>
		</Box>
	);
};
