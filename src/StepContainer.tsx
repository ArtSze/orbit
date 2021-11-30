import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import './utils/styles.scss';
import Step from './Step';
import { StepProps, PitchClass } from './utils/types';
import * as Tone from 'tone';

const StepContainer = ({
	steps,
	seqArgs,
	setSeqArgs,
	pitch,
	voice,
	emitter,
}: {
	steps: StepProps[];
	seqArgs: string[];
	setSeqArgs: React.Dispatch<React.SetStateAction<string[]>>;
	pitch: PitchClass;
	voice: number;
	emitter: Tone.Emitter<string>;
}) => {
	const targetRef = useRef<HTMLDivElement & undefined>(null);
	const [dimensions, setDimensions] = useState<{
		width: number | undefined;
		height: number | undefined;
	}>({ width: undefined, height: undefined });
	const [theta, setTheta] = useState<number[]>([]);

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
		<div ref={targetRef} className="stepContainer" id={`voice${voice}`}>
			{steps.map((step, index) => {
				const height = dimensions.height;

				const posX =
					Math.round(height! * Math.cos(theta![index])) + 'px';
				const posY =
					Math.round(height! * Math.sin(theta![index])) + 'px';

				const style: React.CSSProperties = {
					position: 'absolute',
					top: height! / 5 + parseInt(posY.slice(0, -2)) + 'px',
					left: height! / 5 + parseInt(posX.slice(0, -2)) + 'px',
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
		</div>
	);
};

export default StepContainer;
