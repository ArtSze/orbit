import Button from '@mui/material/Button';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { encodeMidi } from '../utils/midi';

export const MidiDownloadButton = ({ bpm }: { bpm: number }) => {
	return (
		<Button
			variant="outlined"
			onClick={() => encodeMidi(bpm)}
			color="info"
			startIcon={<FileDownloadIcon />}>
			Download MIDI
		</Button>
	);
};
