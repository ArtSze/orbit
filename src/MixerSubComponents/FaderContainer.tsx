import * as Tone from 'tone';
import { ChannelFader } from './ChannelFader';

import { ThemeColors } from '../utils/Theme';

type FaderContainerProps = {
	channel: Tone.Channel;
	defaultValue: number;
	label?: string;
	color: ThemeColors;
};

export const FaderContainer = ({
	channel,
	defaultValue,
	label,
	color,
}: FaderContainerProps) => {
	return (
		<ChannelFader
			label={label}
			onChange={(event, value) => {
				value < -14
					? channel.set({
							volume: (value as number) * 2,
					  })
					: channel.set({
							volume: value as number,
					  });
			}}
			defaultValue={defaultValue}
			color={color}
		/>
	);
};
