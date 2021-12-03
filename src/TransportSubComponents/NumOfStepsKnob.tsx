// @ts-ignore
import { Knob, Scale, Pointer, Value } from 'rc-knob';

export type NumOfStepsControlProps = {
	numOfSteps: number;
	setNumOfSteps: (value: React.SetStateAction<number>) => void;
};

export const NumOfStepsKnob = ({
	numOfSteps,
	setNumOfSteps,
}: NumOfStepsControlProps) => {
	return (
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
				color="#52b02c"
			/>
			<Scale tickWidth={1} tickHeight={2} radius={45} color="#52b02c" />
			<Pointer
				width={1}
				height={7}
				radius={38}
				type="rect"
				color="#180094"
				percentage={(numOfSteps - 0) / 32}
			/>
			<Value value={numOfSteps} marginBottom={40} className="value" />
		</Knob>
	);
};
