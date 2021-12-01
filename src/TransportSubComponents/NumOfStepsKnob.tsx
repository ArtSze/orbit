// @ts-ignore
import { Knob, Scale, Pointer, Value } from 'rc-knob';
import { NumOfStepsControlProps } from './NumOfStepsControl';
import Input from '@mui/material/Input';

export const NumOfStepsKnob = ({
	numOfSteps,
	setNumOfSteps,
}: NumOfStepsControlProps) => {
	return (
		<div className="numOfStepsKnobContainer">
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
					color="#FC5A96"
				/>
				<Scale
					tickWidth={1}
					tickHeight={2}
					radius={45}
					color="#FC5A96"
				/>
				<Pointer
					width={1}
					height={5}
					radius={40}
					type="rect"
					color="#180094"
				/>
				<Value marginBottom={40} className="value" />
			</Knob>
			<div>
				<button
					onClick={() => {
						setNumOfSteps(numOfSteps + 1);
					}}>
					up
				</button>
				<button
					onClick={() => {
						setNumOfSteps(numOfSteps - 1);
					}}>
					down
				</button>
			</div>
		</div>
	);
};
