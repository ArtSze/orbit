import * as Tone from 'tone';
import { Track } from '@tonejs/midi';

export enum PitchClass {
	C = 'C',
	C_sharp = 'C#',
	D = 'D',
	D_sharp = 'D#',
	E = 'E',
	F = 'F',
	F_sharp = 'F#',
	G = 'G',
	G_sharp = 'G#',
	A = 'A',
	A_sharp = 'A#',
	B = 'B',
}

export type VoiceProps = {
	source: Tone.Synth<Tone.SynthOptions>;
	period: number;
	voice: number;
	pitch: PitchClass;
	numOfSteps: number;
	track: Track;
};

export type StepProps = {
	isActive: boolean;
};

export type TransportProps = {
	source1: Tone.Synth<Tone.SynthOptions>;
	source2: Tone.Synth<Tone.SynthOptions>;
	source3: Tone.Synth<Tone.SynthOptions>;
};

export type PitchControlProps = {
	pitch: PitchClass;
	setPitch: React.Dispatch<React.SetStateAction<PitchClass>>;
	defaultInd: number;
};
