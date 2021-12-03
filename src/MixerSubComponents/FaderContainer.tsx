import * as Tone from 'tone';
import { ChannelFader } from './ChannelFader';

type FaderContainerProps = {
	channel: Tone.Channel;
	defaultValue: number;
	label: string;
};

export const FaderContainer = ({
	channel,
	defaultValue,
	label,
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
		/>
	);
};
