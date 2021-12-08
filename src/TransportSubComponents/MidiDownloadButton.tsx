import Box from '@mui/material/Box';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { encodeMidi } from '../utils/midi';

export const MidiDownloadButton = ({ bpm }: { bpm: number }) => {
	return (
		<Box className={'controlRow'}>
			<Tooltip title="Download MIDI">
				<IconButton
					onClick={() => encodeMidi(bpm)}
					sx={{ width: '42px' }}>
					<FileDownloadIcon />
				</IconButton>
			</Tooltip>
		</Box>
	);
};
