import { Box, Tooltip, IconButton } from '@mui/material';
import HelpSharpIcon from '@mui/icons-material/HelpSharp';
import Info from './Info';
import { InfoContainerProps } from './utils/types';

const InfoContainer = ({ openInfo, setOpenInfo }: InfoContainerProps) => {
	return (
		<Box className={'controlRow'} justifyContent={'flex-end'}>
			<Tooltip title={'info'}>
				<IconButton onClick={() => setOpenInfo(true)}>
					<HelpSharpIcon />
				</IconButton>
			</Tooltip>
			<Info openInfo={openInfo} setOpenInfo={setOpenInfo} />
		</Box>
	);
};

export default InfoContainer;
