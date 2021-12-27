import * as Tone from 'tone';
import { useState } from 'react';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Grow from '@mui/material/Grow';
import Tooltip from '@mui/material/Tooltip';
import SettingsInputComponentSharpIcon from '@mui/icons-material/SettingsInputComponentSharp';
import BlurLinearIcon from '@mui/icons-material/BlurLinear';
import WavesIcon from '@mui/icons-material/Waves';

import { FaderContainer } from './FaderContainer';
import { ThemeColors } from '../utils/Theme';

import useMediaQuery from '@mui/material/useMediaQuery';
import { FaderMasterContainerProps } from '../utils/types';

export const FaderMasterContainer = ({
	channel1,
	channel2,
	channel3,
	chorusChannel,
	reverbChannel,
}: FaderMasterContainerProps) => {
	const [display, setDisplay] = useState(false);

	const handleClick = () => {
		setDisplay((prev: boolean) => !prev);
	};

	const theme = useTheme();

	const fullScreen = useMediaQuery('(min-width:800px)', { noSsr: true });

	return fullScreen ? (
		<Box sx={{ display: 'flex' }} id={'mixer'}>
			<Grow in={display}>
				<Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							marginTop: '12px',
						}}>
						<FaderContainer
							channel={channel1}
							defaultValue={-1}
							color={theme.palette.primary.main as ThemeColors}
						/>
						<FaderContainer
							channel={channel2}
							defaultValue={-1}
							color={theme.palette.secondary.main as ThemeColors}
						/>
						<FaderContainer
							channel={channel3}
							defaultValue={-1}
							color={theme.palette.success.main as ThemeColors}
						/>
						<FaderContainer
							channel={chorusChannel}
							defaultValue={-60}
							color={theme.palette.info.main as ThemeColors}
						/>

						<FaderContainer
							channel={reverbChannel}
							defaultValue={-60}
							color={theme.palette.info.main as ThemeColors}
						/>
					</Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'end',
							marginTop: '6px',
						}}>
						<WavesIcon
							sx={{
								transform: `translateX(-18px) translateY(-4px);`,
							}}
						/>
						<BlurLinearIcon
							sx={{
								transform: `translateX(-6px) translateY(-4px);`,
							}}
						/>
					</Box>
				</Box>
			</Grow>

			<Tooltip title={`mixer`}>
				<IconButton onClick={handleClick} className={'icon'}>
					<SettingsInputComponentSharpIcon />
				</IconButton>
			</Tooltip>
		</Box>
	) : (
		<Box
			sx={{ display: 'flex', transform: 'translate(-30px, -250px)' }}
			id={'mixer'}>
			<Tooltip title={`mixer`}>
				<IconButton onClick={handleClick} className={'icon'}>
					<SettingsInputComponentSharpIcon />
				</IconButton>
			</Tooltip>
			<Grow in={display}>
				<Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							marginTop: '12px',
						}}>
						<FaderContainer
							channel={channel1}
							defaultValue={-1}
							color={theme.palette.primary.main as ThemeColors}
						/>
						<FaderContainer
							channel={channel2}
							defaultValue={-1}
							color={theme.palette.secondary.main as ThemeColors}
						/>
						<FaderContainer
							channel={channel3}
							defaultValue={-1}
							color={theme.palette.success.main as ThemeColors}
						/>
						<FaderContainer
							channel={chorusChannel}
							max={-6}
							defaultValue={-60}
							color={theme.palette.info.main as ThemeColors}
						/>

						<FaderContainer
							channel={reverbChannel}
							max={-6}
							defaultValue={-60}
							color={theme.palette.info.main as ThemeColors}
						/>
					</Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'end',
							marginTop: '6px',
						}}>
						<WavesIcon
							sx={{
								transform: `translateX(-18px) translateY(-4px);`,
							}}
						/>
						<BlurLinearIcon
							sx={{
								transform: `translateX(-6px) translateY(-4px);`,
							}}
						/>
					</Box>
				</Box>
			</Grow>
		</Box>
	);
};
