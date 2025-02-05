import Container from '@/components/container';
import React from 'react';

const AboutPage: React.FC = () => {
	return (
		<Container>
			<h1 className="py-10 text-center">Register Your Flagway Team</h1>
			

			<iframe className="rounded-3xl" src="https://bostonu.qualtrics.com/jfe/form/SV_eRjUqaxlAYSmPJk" height="600" width="100%" scrolling="yes"></iframe>
		</Container>
	);
};

export default AboutPage;