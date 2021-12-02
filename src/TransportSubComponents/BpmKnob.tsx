// @ts-ignore
import { Knob, Arc, Pointer, Value } from 'rc-knob';

type BpmControllerProps = {
	bpm: number;
	setBpm: React.Dispatch<React.SetStateAction<number>>;
};

export const BpmKnob = ({ bpm, setBpm }: BpmControllerProps) => {
	return (
		<div className="styledBpmKnob">
			<Knob
				size={100}
				angleOffset={220}
				angleRange={280}
				min={20}
				max={240}
				onChange={(value: number) => setBpm(Math.round(value))}
				value={bpm}>
				<Arc
					arcWidth={3}
					background="#058800"
					color="#B1FF92"
					radius={47.5}
				/>
				<Pointer width={5} radius={40} type="circle" color="#B1FF92" />
				<Value marginBottom={40} className="value" />
			</Knob>
		</div>
	);
};
