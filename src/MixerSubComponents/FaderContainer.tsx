import { ChannelFader } from './ChannelFader';
import { FaderContainerProps } from '../utils/types';

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
