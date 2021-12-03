import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import Button from '@mui/material/Button';

type PlayPauseTriggerProps = {
	playing: boolean;
	triggerLoop: () => Promise<void>;
};

export const PlayPauseTrigger = ({
	playing,
	triggerLoop,
}: PlayPauseTriggerProps) => {
	return (
		<Button onClick={triggerLoop} color="info">
			{playing ? <PauseCircleIcon /> : <PlayCircleIcon />}
		</Button>
	);
};
