import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import Container from '@mui/material/Container';

export type NumOfStepsControlProps = {
	numOfSteps: number;
	setNumOfSteps: (value: React.SetStateAction<number>) => void;
};

const Input = styled(MuiInput)`
	width: 50px;
`;

export const NumOfStepsControl = ({
	numOfSteps,
	setNumOfSteps,
}: NumOfStepsControlProps) => {
	const handleSliderChange = (event: Event, newValue: number | number[]) => {
		setNumOfSteps(newValue as number);
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (Number(event.target.value) < 33) {
			setNumOfSteps(
				event.target.value === '' ? 0 : Number(event.target.value)
			);
		}
	};

	const handleBlur = () => {
		if (numOfSteps < 0) {
			setNumOfSteps(0);
		} else if (numOfSteps > 32) {
			setNumOfSteps(32);
		}
	};

	return (
		<Container
			className={'numOfStepsControl'}
			sx={{ display: 'flex', paddingLeft: '0px' }}>
			<Slider
				value={typeof numOfSteps === 'number' ? numOfSteps : 4}
				onChange={handleSliderChange}
				max={32}
				aria-labelledby="input-slider"
			/>

			<Input
				value={numOfSteps}
				size="small"
				onChange={handleInputChange}
				onBlur={handleBlur}
				inputProps={{
					step: 1,
					min: 0,
					max: 32,
					type: 'number',
					'aria-labelledby': 'input-slider',
				}}
				sx={{ marginLeft: '25px' }}
			/>
		</Container>
	);
};
