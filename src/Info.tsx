import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import { Typography, Divider, Link } from '@mui/material';
import { InfoContainerProps } from './utils/types';

const Info = ({ openInfo, setOpenInfo }: InfoContainerProps) => {
	return (
		<Dialog open={openInfo} onClose={() => setOpenInfo(false)}>
			<DialogTitle>
				<Typography variant={'h5'}>Info</Typography>{' '}
			</DialogTitle>
			<Divider />
			<DialogContent>
				<Typography variant={'body1'}>
					This is a Euclidean sequencer. This means that the period of
					the loop is divided evenly by each voice's step count. This
					allows for exploration of interesting rhythmic relationships
					uncommon in Western music (i.e. "4 against 5"). You can read
					more about the concept {` `}
					<Link
						rel="noopener noreferrer"
						target="_blank"
						href="https://www.musicradar.com/how-to/what-is-euclidean-sequencing-and-how-do-you-use-it">
						here
					</Link>
					.
				</Typography>

				<Typography
					variant={'h6'}
					marginTop={'30px'}
					marginBottom={'10px'}>
					handy features/tips
				</Typography>

				<Typography
					variant={'body2'}
					marginTop={'8px'}
					marginBottom={'8px'}>
					When working with sequences that have high step counts, it's
					possible to toggle steps on/off by clicking your mouse and
					dragging over multiple steps in one smooth motion. Easier
					than clicking on each individual step yeah?
				</Typography>
				<Typography
					variant={'body2'}
					marginTop={'8px'}
					marginBottom={'8px'}>
					If you find yourself listening to nonsensical noise after a
					bit of tinkering, fear not! You can reset the step counts
					and sequences by clicking on the garbage can icon.
				</Typography>
				<Typography
					variant={'body2'}
					marginTop={'8px'}
					marginBottom={'8px'}>
					There are two modes available: 'tonal', which uses three
					triangle-wave oscillators and allows control of each voice's
					pitch, and 'percussive' which features drum samples.
				</Typography>
				<Typography
					variant={'body2'}
					marginTop={'8px'}
					marginBottom={'8px'}>
					There is a mixer that contains faders corresponding to each
					voice's level as well as the levels for chorus and
					bitcrusher effects.
				</Typography>
				<Typography
					variant={'body2'}
					marginTop={'8px'}
					marginBottom={'8px'}>
					It's possible to download a midi file containing your
					programmed sequence so that you can import it into your
					favorite DAWs like Logic Pro or Ableton.
				</Typography>
				<Typography
					variant={'body2'}
					marginTop={'8px'}
					marginBottom={'8px'}>
					Click on any of the three icons above the info button in
					order to switch through presets to see what's possible with
					this app!
				</Typography>
			</DialogContent>
		</Dialog>
	);
};

export default Info;
