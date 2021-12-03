import Button from '@mui/material/Button';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

export const ResetStepCountButton = ({
	resetNumOfSteps,
}: {
	resetNumOfSteps: () => void;
}) => {
	return (
		<Tooltip title="Reset step counts">
			<IconButton onClick={() => resetNumOfSteps()}>
				<DeleteSharpIcon />
			</IconButton>
		</Tooltip>
	);
};
