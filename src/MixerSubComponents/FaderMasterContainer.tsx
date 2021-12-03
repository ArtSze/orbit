import * as Tone from 'tone';
import { useState } from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Grow from '@mui/material/Grow';
import Tooltip from '@mui/material/Tooltip';
import SettingsInputComponentSharpIcon from '@mui/icons-material/SettingsInputComponentSharp';

import { FaderContainer } from './FaderContainer';

type FaderMasterContainerProps = {
	channel1: Tone.Channel;
	channel2: Tone.Channel;
	channel3: Tone.Channel;
	chorusChannel: Tone.Channel;
	crusherChannel: Tone.Channel;
};

export const FaderMasterContainer = ({
	channel1,
	channel2,
	channel3,
	chorusChannel,
	crusherChannel,
}: FaderMasterContainerProps) => {
	const [display, setDisplay] = useState(false);

	const handleClick = () => {
		setDisplay((prev: boolean) => !prev);
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<Tooltip title={`mixer`}>
				<IconButton onClick={handleClick}>
					<SettingsInputComponentSharpIcon />
				</IconButton>
			</Tooltip>
			<Grow in={display}>
				<Box sx={{ display: 'flex', flexDirection: 'row' }}>
					<FaderContainer
						channel={channel1}
						defaultValue={-1}
						label="1"
					/>
					<FaderContainer
						channel={channel2}
						defaultValue={-1}
						label="2"
					/>
					<FaderContainer
						channel={channel3}
						defaultValue={-1}
						label="3"
					/>
					<FaderContainer
						channel={chorusChannel}
						defaultValue={-60}
						label="chorus"
					/>
					<FaderContainer
						channel={crusherChannel}
						defaultValue={-60}
						label="crusher"
					/>
				</Box>
			</Grow>
		</Box>
	);
};
