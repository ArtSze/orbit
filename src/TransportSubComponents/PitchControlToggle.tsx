import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { PitchClass, PitchControlProps } from '../utils/types';

export const PitchControlToggle = ({
	pitch,
	setPitch,
	defaultInd,
}: PitchControlProps) => {
	const handleNewPitch = (
		event: React.MouseEvent<HTMLElement>,
		newPitch: PitchClass
	) => {
		setPitch(newPitch);
	};

	return (
		<ToggleButtonGroup
			value={pitch}
			exclusive
			onChange={handleNewPitch}
			aria-label="pitch selection">
			<ToggleButton value={PitchClass.C}>C</ToggleButton>
			<ToggleButton value={PitchClass.C_sharp}>C#</ToggleButton>
			<ToggleButton value={PitchClass.D}>D </ToggleButton>
			<ToggleButton value={PitchClass.D_sharp}>D#</ToggleButton>
			<ToggleButton value={PitchClass.E}>E </ToggleButton>
			<ToggleButton value={PitchClass.F}>F </ToggleButton>
			<ToggleButton value={PitchClass.F_sharp}>F# </ToggleButton>
			<ToggleButton value={PitchClass.G}>G </ToggleButton>
			<ToggleButton value={PitchClass.G_sharp}>G# </ToggleButton>
			<ToggleButton value={PitchClass.A}>A </ToggleButton>
			<ToggleButton value={PitchClass.A_sharp}>A# </ToggleButton>
			<ToggleButton value={PitchClass.B}>B </ToggleButton>
		</ToggleButtonGroup>
	);
};
