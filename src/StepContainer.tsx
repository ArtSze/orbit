import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import './utils/styles.scss';
import Step from './Step';
import { StepProps } from './Voice';
import { PitchClass } from './utils/types';

const StepContainer = ({
	steps,
	seqArgs,
	setSeqArgs,
	pitch,
	voice,
}: {
	steps: StepProps[];
	seqArgs: string[];
	setSeqArgs: React.Dispatch<React.SetStateAction<string[]>>;
	pitch: PitchClass;
	voice: number;
}) => {
	const targetRef = useRef<HTMLDivElement & undefined>(null);
	const [dimensions, setDimensions] = useState<{
		width: number | undefined;
		height: number | undefined;
	}>({ width: undefined, height: undefined });
	const [movementTimer, setMovementTimer] = useState();
	const [theta, setTheta] = useState<number[]>([]);

	const RESET_TIMEOUT = 100;

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

	window.addEventListener('resize', () => {
		clearInterval(movementTimer);
		// @ts-ignore
		setMovementTimer(setTimeout(test_dimensions, RESET_TIMEOUT));
	});

	useEffect(() => {
		const frags = 360 / steps.length;
		const tempTheta = [];
		for (var i = 0; i <= steps.length; i++) {
			tempTheta.push((frags / 180) * i * Math.PI);
		}
		setTheta(tempTheta);
	}, [steps]);

	return (
		<div ref={targetRef} className="stepContainer" id={`voice${voice}`}>
			{steps.map((step, index) => {
				const height = dimensions.height;

				const posX =
					Math.round(height! * Math.cos(theta![index])) + 'px';
				const posY =
					Math.round(height! * Math.sin(theta![index])) + 'px';

				const style: React.CSSProperties = {
					position: 'absolute',
					top:
						height! / 5 -
						parseInt(posY.slice(0, -2)) /* + 200  */ +
						'px',
					left:
						height! / 5 +
						parseInt(posX.slice(0, -2)) /* + 200 */ +
						'px',
					// padding: 20 + 'px',
				};

				return (
					<Step
						pitch={pitch}
						step={step}
						key={`${pitch}4- ${index}`}
						ind={index}
						seqArgs={seqArgs}
						setSeqArgs={setSeqArgs}
						circleProps={style}></Step>
				);
			})}
		</div>
	);
};

export default StepContainer;
