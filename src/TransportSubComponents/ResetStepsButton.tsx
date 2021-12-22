import Box from '@mui/material/Box';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

export const ResetStepsButton = ({
	resetSteps,
}: {
	resetSteps: () => void;
}) => {
	return (
		<Box className={'controlRow'}>
			<Tooltip title="reset steps/step counts">
				<IconButton onClick={() => resetSteps()} sx={{ width: '42px' }}>
					<DeleteSharpIcon />
				</IconButton>
			</Tooltip>
		</Box>
	);
};
