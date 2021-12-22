import { Box, Tooltip, Stack, IconButton, Typography } from '@mui/material';
import LooksOneSharpIcon from '@mui/icons-material/LooksOneSharp';
import LooksTwoSharpIcon from '@mui/icons-material/LooksTwoSharp';
import LooksThreeSharpIcon from '@mui/icons-material/Looks3Sharp';

type PresetProps = {
	triggerPreset1: () => void;
	triggerPreset2: () => void;
	triggerPreset3: () => void;
};

const Presets = ({
	triggerPreset1,
	triggerPreset2,
	triggerPreset3,
}: PresetProps) => {
	return (
		<Box marginTop={'260px'}>
			<Stack flexDirection={'column'} alignItems={'flex-end'}>
				<Box className={'controlRow'}>
					<Tooltip title={`preset 1`}>
						<IconButton onClick={triggerPreset1} className={'icon'}>
							<LooksOneSharpIcon />
						</IconButton>
					</Tooltip>
				</Box>

				<Box className={'controlRow'}>
					<Tooltip title={`preset 2`}>
						<IconButton onClick={triggerPreset2} className={'icon'}>
							<LooksTwoSharpIcon />
						</IconButton>
					</Tooltip>
				</Box>

				<Box className={'controlRow'}>
					<Tooltip title={`preset 3`}>
						<IconButton onClick={triggerPreset3} className={'icon'}>
							<LooksThreeSharpIcon />
						</IconButton>
					</Tooltip>
				</Box>
			</Stack>
		</Box>
	);
};

export default Presets;