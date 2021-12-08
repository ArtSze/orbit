import Box from '@mui/material/Box';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

export const ResetStepCountButton = ({
	resetNumOfSteps,
}: {
	resetNumOfSteps: () => void;
}) => {
	return (
		<Box className={'controlRow'}>
			<Tooltip title="Reset step counts">
				<IconButton
					onClick={() => resetNumOfSteps()}
					sx={{ width: '42px' }}>
					<DeleteSharpIcon />
				</IconButton>
			</Tooltip>
		</Box>
	);
};
