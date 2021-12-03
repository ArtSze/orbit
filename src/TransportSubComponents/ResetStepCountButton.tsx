import Button from '@mui/material/Button';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';

export const ResetStepCountButton = ({
	resetNumOfSteps,
}: {
	resetNumOfSteps: () => void;
}) => {
	return (
		<Button
			variant="outlined"
			onClick={() => resetNumOfSteps()}
			color="info"
			startIcon={<DeleteSharpIcon />}>
			Reset step counts
		</Button>
	);
};
