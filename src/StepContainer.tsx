import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import './utils/styles.scss';
import Step from './Step';
import { StepProps, PitchClass } from './utils/types';
import * as Tone from 'tone';
import { ThemeColors } from './utils/Theme';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

const StepContainer = ({
	steps,
	seqArgs,
	setSeqArgs,
	pitch,
	voice,
	emitter,
	color,
}: {
	steps: StepProps[];
	seqArgs: string[];
	setSeqArgs: React.Dispatch<React.SetStateAction<string[]>>;
	pitch: PitchClass;
	voice: number;
	emitter: Tone.Emitter<string>;
	color: ThemeColors;
}) => {
	const targetRef = useRef<HTMLDivElement & undefined>(null);
	const [dimensions, setDimensions] = useState<{
		width: number | undefined;
		height: number | undefined;
	}>({ width: undefined, height: undefined });
	const [theta, setTheta] = useState<number[]>([]);

	const fullScreen = useMediaQuery('(min-width:800px)', { noSsr: true });

	const test_dimensions = () => {
		if (targetRef.current) {
			setDimensions({
				//@ts-ignore
				width: targetRef.current.offsetWidth,
				//@ts-ignore
				height: targetRef.current.offsetHeight,
			});
		}
	};

	useLayoutEffect(() => {
		test_dimensions();
		console.log(dimensions);
	}, []);

	useEffect(() => {
		const frags = 360 / steps.length;
		const tempTheta = [];
		for (var i = 0; i <= steps.length; i++) {
			tempTheta.push((frags / 180) * i * Math.PI);
		}
		setTheta(tempTheta);
	}, [steps]);

	return (
		<Box
			ref={targetRef}
			sx={
				fullScreen
					? {
							position: 'absolute',
							transform: 'rotate(-90deg)',
							marginLeft: '40px',
					  }
					: {
							position: 'absolute',
							transform: ` scale(0.5)`,
					  }
			}
			id={`voice${voice}${fullScreen}`}>
			{steps.map((step, index) => {
				const height = dimensions.height;

				const posX =
					Math.round(height! * Math.cos(theta![index])) + 'px';
				const posY =
					Math.round(height! * Math.sin(theta![index])) + 'px';

				const style: React.CSSProperties = {
					position: 'absolute',
					transform: `translateX(${
						height! / 5 + parseInt(posX.slice(0, -2))
					}px) translateY(${
						height! / 5 + parseInt(posY.slice(0, -2))
					}px)`,
					backgroundColor: color,
				};

				return (
					<Step
						pitch={pitch}
						step={step}
						key={`${pitch}4- ${index}`}
						ind={index}
						seqArgs={seqArgs}
						setSeqArgs={setSeqArgs}
						circleProps={style}
						emitter={emitter}></Step>
				);
			})}
		</Box>
	);
};

export default StepContainer;
