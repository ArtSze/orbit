import { PitchClass, StepProps } from './types';

export const initialSteps: StepProps[] = [
	{ isActive: true },
	{ isActive: true },
	{ isActive: true },
	{ isActive: true },
];

export const initialSeqArgs = (pitch: PitchClass) => {
	return [`${pitch}4`, `${pitch}4`, `${pitch}4`, `${pitch}4`];
};
