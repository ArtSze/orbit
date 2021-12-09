import MicExternalOnIcon from '@mui/icons-material/MicExternalOn';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

export const ModeSwitch = ({
	tonal,
	setTonal,
}: {
	tonal: boolean;
	setTonal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	return (
		<Box className={'controlRow'}>
			{tonal ? (
				<Tooltip title="switch to perc mode">
					<IconButton
						onClick={() => setTonal(!tonal)}
						sx={{ width: '42px' }}>
						<MusicNoteIcon />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title="switch to tonal mode">
					<IconButton
						onClick={() => setTonal(!tonal)}
						sx={{ width: '42px' }}>
						<MicExternalOnIcon />
					</IconButton>
				</Tooltip>
			)}
		</Box>
	);
};
