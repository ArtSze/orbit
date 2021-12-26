import { Midi } from '@tonejs/midi';
import * as FileSaver from 'file-saver';

export const midi = new Midi();

for (let i = 0; i < 3; i++) {
	midi.addTrack();
	midi.tracks[i].instrument.number = 1;
	midi.tracks[i].channel = i + 1;
}

export const encodeMidi = (bpm: number) => {
	midi.header.tempos = [{ ticks: 0, bpm: bpm }];
	const blob = new Blob([midi.toArray()], { type: 'audio/midi' });
	console.log({ midi });
	FileSaver.saveAs(blob, 'orbit.mid');
};
