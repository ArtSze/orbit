import { useState, useEffect } from 'react';
import './utils/styles.css';
import { StepProps } from './Voice';

const Step = ({ isHead, isOn }: StepProps) => {
	return <div className={isOn ? 'active' : 'inactive'}></div>;
};

export default Step;