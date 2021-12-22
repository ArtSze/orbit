import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import SwitchRightIcon from '@mui/icons-material/SwitchRight';
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
				<Tooltip title="switch to percussive mode">
					<IconButton
						onClick={() => setTonal(!tonal)}
						sx={{ width: '42px' }}>
						<SwitchLeftIcon />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title="switch to tonal mode">
					<IconButton
						onClick={() => setTonal(!tonal)}
						sx={{ width: '42px' }}>
						<SwitchRightIcon />
					</IconButton>
				</Tooltip>
			)}
		</Box>
	);
};
