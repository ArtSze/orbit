import { useState, useEffect } from 'react';
import './utils/styles.css';

const Step = () => {
	const [indicator, setIndicator] = useState(false);

	return <div className={indicator ? 'active' : 'inactive'}></div>;
};
