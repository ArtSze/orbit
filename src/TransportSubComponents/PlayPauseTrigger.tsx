import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import { PlayPauseTriggerProps } from '../utils/types';

export const PlayPauseTrigger = ({
	playing,
	triggerLoop,
}: PlayPauseTriggerProps) => {
	return (
		<Box className={'controlRow'}>
			<Tooltip title={`play/pause`}>
				<IconButton onClick={triggerLoop} sx={{ width: '42px' }}>
					{playing ? <PauseCircleIcon /> : <PlayCircleIcon />}
				</IconButton>
			</Tooltip>
		</Box>
	);
};
