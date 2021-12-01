// @ts-ignore
import { Knob, Arc, Pointer, Value } from 'rc-knob';
import { useEffect, useState } from 'react';

type BpmControllerProps = {
	bpm: number;
	setBpm: React.Dispatch<React.SetStateAction<number>>;
};

export const BpmController = ({ bpm, setBpm }: BpmControllerProps) => {
	return (
		<Knob
			size={100}
			angleOffset={220}
			angleRange={280}
			min={20}
			max={240}
			onChange={(value: number) => setBpm(value)}
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
	);
};
