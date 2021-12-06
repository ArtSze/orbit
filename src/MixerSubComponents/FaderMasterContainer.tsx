import * as Tone from 'tone';
import { useState } from 'react';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Grow from '@mui/material/Grow';
import Tooltip from '@mui/material/Tooltip';
import SettingsInputComponentSharpIcon from '@mui/icons-material/SettingsInputComponentSharp';

import { FaderContainer } from './FaderContainer';
import { ThemeColors } from '../utils/Theme';

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

	const theme = useTheme();

	return (
		<Box sx={{ display: 'flex' }} id={'mixerControls'}>
			<Grow in={display}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						marginTop: '12px',
					}}>
					<FaderContainer
						channel={channel1}
						defaultValue={-1}
						label="1"
						color={theme.palette.primary.main as ThemeColors}
					/>
					<FaderContainer
						channel={channel2}
						defaultValue={-1}
						label="2"
						color={theme.palette.secondary.main as ThemeColors}
					/>
					<FaderContainer
						channel={channel3}
						defaultValue={-1}
						label="3"
						color={theme.palette.success.main as ThemeColors}
					/>
					<FaderContainer
						channel={chorusChannel}
						defaultValue={-60}
						label="chorus"
						color={theme.palette.info.main as ThemeColors}
					/>
					<FaderContainer
						channel={crusherChannel}
						defaultValue={-60}
						label="crusher"
						color={theme.palette.info.main as ThemeColors}
					/>
				</Box>
			</Grow>

			<Tooltip title={`mixer`}>
				<IconButton onClick={handleClick} className={'icon'}>
					<SettingsInputComponentSharpIcon />
				</IconButton>
			</Tooltip>
		</Box>
	);
};
