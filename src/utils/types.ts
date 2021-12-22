import * as Tone from 'tone';
import { Track } from '@tonejs/midi';
import { ThemeColors } from './Theme';

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
	source: Tone.Synth<Tone.SynthOptions> | Tone.Player;
	period: number;
	voice: number;
	pitch: PitchClass;
	numOfSteps: number;
	track: Track;
	color: ThemeColors;
	seqArgsDefault: string[];
};

export type StepProps = {
	isActive: boolean;
};

export type TransportProps = {
	source1: Tone.Synth<Tone.SynthOptions> | Tone.Player;
	source2: Tone.Synth<Tone.SynthOptions> | Tone.Player;
	source3: Tone.Synth<Tone.SynthOptions> | Tone.Player;
	channel1: Tone.Channel;
	channel2: Tone.Channel;
	channel3: Tone.Channel;
	chorusChannel: Tone.Channel;
	crusherChannel: Tone.Channel;
	tonal: boolean;
	setTonal: React.Dispatch<React.SetStateAction<boolean>>;
};

export type PitchControlProps = {
	pitch: PitchClass;
	setPitch: React.Dispatch<React.SetStateAction<PitchClass>>;
	defaultInd: number;
	color: ThemeColors;
};

export type ChannelFaderProps = {
	label?: string;
	onChange: (
		event: Event,
		value: number | number[],
		activeThumb: number
	) => void;
	defaultValue: number;
	color: ThemeColors;
};

export type FaderContainerProps = {
	channel: Tone.Channel;
	defaultValue: number;
	label?: string;
	color: ThemeColors;
};

export type FaderMasterContainerProps = {
	channel1: Tone.Channel;
	channel2: Tone.Channel;
	channel3: Tone.Channel;
	chorusChannel: Tone.Channel;
	crusherChannel: Tone.Channel;
};

export type BpmContainerProps = {
	bpm: number;
	setBpm: React.Dispatch<React.SetStateAction<number>>;
};

export type BpmControllerProps = {
	bpm: number;
	setBpm: React.Dispatch<React.SetStateAction<number>>;
};

export type NumOfStepsControlProps = {
	numOfSteps: number;
	setNumOfSteps: (value: React.SetStateAction<number>) => void;
	color: ThemeColors;
};

export type NumOfStepsMasterProps = {
	numOfSteps1: number;
	setNumOfSteps1: React.Dispatch<React.SetStateAction<number>>;
	numOfSteps2: number;
	setNumOfSteps2: React.Dispatch<React.SetStateAction<number>>;
	numOfSteps3: number;
	setNumOfSteps3: React.Dispatch<React.SetStateAction<number>>;
	color1: ThemeColors;
	color2: ThemeColors;
	color3: ThemeColors;
};

export type PitchControlMasterProps = {
	pitch1: PitchClass;
	setPitch1: React.Dispatch<React.SetStateAction<PitchClass>>;
	defaultPitchInd1: number;
	pitch2: PitchClass;
	setPitch2: React.Dispatch<React.SetStateAction<PitchClass>>;
	defaultPitchInd2: number;
	pitch3: PitchClass;
	setPitch3: React.Dispatch<React.SetStateAction<PitchClass>>;
	defaultPitchInd3: number;
	color1: ThemeColors;
	color2: ThemeColors;
	color3: ThemeColors;
};

export type PlayPauseTriggerProps = {
	playing: boolean;
	triggerLoop: () => Promise<void>;
};

export type InfoContainerProps = {
	openInfo: boolean;
	setOpenInfo: React.Dispatch<React.SetStateAction<boolean>>;
};

export type PresetProps = {
	triggerPreset1: () => void;
	triggerPreset2: () => void;
	triggerPreset3: () => void;
};
