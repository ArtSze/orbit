import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

type PlayPauseTriggerProps = {
	playing: boolean;
	triggerLoop: () => Promise<void>;
};

export const PlayPauseTrigger = ({
	playing,
	triggerLoop,
}: PlayPauseTriggerProps) => {
	return (
		<div onClick={triggerLoop}>
			{playing ? <PauseCircleIcon /> : <PlayCircleIcon />}
		</div>
	);
};
