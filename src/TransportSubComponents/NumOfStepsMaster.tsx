import { useState } from 'react';
import Box from '@mui/material/Box';
import SpokeSharpIcon from '@mui/icons-material/SpokeSharp';
import IconButton from '@mui/material/IconButton';
import Grow from '@mui/material/Grow';
import Tooltip from '@mui/material/Tooltip';
import { NumOfStepsKnob } from './NumOfStepsKnob';

type NumOfStepsMasterProps = {
	numOfSteps1: number;
	setNumOfSteps1: React.Dispatch<React.SetStateAction<number>>;
	numOfSteps2: number;
	setNumOfSteps2: React.Dispatch<React.SetStateAction<number>>;
	numOfSteps3: number;
	setNumOfSteps3: React.Dispatch<React.SetStateAction<number>>;
};

export const NumOfStepsMaster = ({
	numOfSteps1,
	numOfSteps2,
	numOfSteps3,
	setNumOfSteps1,
	setNumOfSteps2,
	setNumOfSteps3,
}: NumOfStepsMasterProps) => {
	const [display, setDisplay] = useState(false);

	const handleClick = () => {
		setDisplay((prev: boolean) => !prev);
	};

	return (
		<Box sx={{ display: 'flex' }} className={'controlRow'}>
			<Tooltip title={`controls for each voice's step count`}>
				<IconButton onClick={handleClick} className={'icon'}>
					<SpokeSharpIcon />
				</IconButton>
			</Tooltip>
			<Grow in={display}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						marginLeft: '20px',
					}}>
					<NumOfStepsKnob
						numOfSteps={numOfSteps1}
						setNumOfSteps={setNumOfSteps1}
					/>
					<NumOfStepsKnob
						numOfSteps={numOfSteps2}
						setNumOfSteps={setNumOfSteps2}
					/>
					<NumOfStepsKnob
						numOfSteps={numOfSteps3}
						setNumOfSteps={setNumOfSteps3}
					/>
				</Box>
			</Grow>
		</Box>
	);
};
