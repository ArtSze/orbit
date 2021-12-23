// @ts-ignore
import { Knob, Scale, Pointer } from 'rc-knob';
import Typography from '@mui/material/Typography';
import { NumOfStepsControlProps } from '../utils/types';
import { useState, useEffect } from 'react';

export const NumOfStepsKnob = ({
	numOfSteps,
	setNumOfSteps,
	color,
}: NumOfStepsControlProps) => {
	const [y, setY] = useState<number>();
	const [displayStepCount, setDisplayStepCount] = useState(4);
	const [stepCountTimer, setStepCountTimer] = useState();

	const setStepCountWithBuffer = () => {
		clearInterval(stepCountTimer);
		setStepCountTimer(
			// @ts-ignore
			setTimeout(() => {
				setNumOfSteps(displayStepCount);
			}, 200)
		);
	};

	useEffect(() => {
		const dragStepCount = Math.round(32 * ((y! + 1) / 43));
		setDisplayStepCount(dragStepCount);
	}, [y]);

	useEffect(() => {
		setStepCountWithBuffer();
	}, [displayStepCount]);

	useEffect(() => {
		setDisplayStepCount(numOfSteps);
	}, [numOfSteps]);

	return (
		<div>
			<Knob
				size={100}
				angleOffset={220}
				angleRange={280}
				steps={32}
				min={0}
				max={32}
				value={numOfSteps}
				onChange={(value: number) =>
					setNumOfSteps(parseInt(value.toFixed()))
				}
				snap={true}
				className="numKnob">
				<Scale
					steps={16}
					tickWidth={1}
					tickHeight={5}
					radius={45}
					color={color}
				/>
				<Scale tickWidth={1} tickHeight={2} radius={45} color={color} />
				<Pointer
					width={1}
					height={7}
					radius={38}
					type="rect"
					color="#180094"
					percentage={(displayStepCount - 0) / 32}
				/>
			</Knob>
			<div
				onMouseMove={(e) => {
					e.preventDefault();
					if (e.buttons == 1) {
						setY(e.nativeEvent.offsetY);
					}
				}}>
				<Typography
					style={
						displayStepCount > 9
							? {
									transform: `translateX(31px) translateY(-47px)`,
									color: color,
							  }
							: {
									transform: `translateX(41px) translateY(-47px)`,
									color: color,
							  }
					}
					variant="h4">
					{displayStepCount}
				</Typography>
			</div>
		</div>
	);
};
