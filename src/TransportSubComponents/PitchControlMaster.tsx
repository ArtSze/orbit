import { useState } from 'react';
import Box from '@mui/material/Box';
import PianoSharpIcon from '@mui/icons-material/PianoSharp';
import IconButton from '@mui/material/IconButton';
import Grow from '@mui/material/Grow';
import Tooltip from '@mui/material/Tooltip';
import { PitchControlKnob } from './PitchControlKnob';
import useMediaQuery from '@mui/material/useMediaQuery';

import { PitchClass, PitchControlMasterProps } from '../utils/types';

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
	color1,
	color2,
	color3,
}: PitchControlMasterProps) => {
	const [display, setDisplay] = useState(false);

	const handleClick = () => {
		setDisplay((prev: boolean) => !prev);
	};

	const fullScreen = useMediaQuery('(min-width:800px)', { noSsr: true });

	return (
		<Box sx={{ display: 'flex' }} className={'controlRow'}>
			<Tooltip title={`pitches`}>
				<IconButton onClick={handleClick} className={'icon'}>
					<PianoSharpIcon />
				</IconButton>
			</Tooltip>
			<Grow in={display}>
				<Box
					sx={
						fullScreen
							? {
									display: 'flex',
									flexDirection: 'row',
									marginLeft: '20px',
							  }
							: {
									display: 'flex',
									flexDirection: 'column',
									marginLeft: '20px',
							  }
					}>
					<PitchControlKnob
						pitch={pitch1}
						setPitch={setPitch1}
						defaultInd={defaultPitchInd1}
						color={color1}
					/>
					<PitchControlKnob
						pitch={pitch2}
						setPitch={setPitch2}
						defaultInd={defaultPitchInd2}
						color={color2}
					/>
					<PitchControlKnob
						pitch={pitch3}
						setPitch={setPitch3}
						defaultInd={defaultPitchInd3}
						color={color3}
					/>
				</Box>
			</Grow>
		</Box>
	);
};
