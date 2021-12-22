import { Box, Tooltip, IconButton } from '@mui/material';
import HelpSharpIcon from '@mui/icons-material/HelpSharp';
import Info from './Info';

export type InfoContainerProps = {
	openInfo: boolean;
	setOpenInfo: React.Dispatch<React.SetStateAction<boolean>>;
};

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
