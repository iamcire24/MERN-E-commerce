import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name='description' content={description} />
		</Helmet>
	);
};

Meta.defaultProps = {
	title: 'Welcome to AniManga',
	description: 'We sell best manga all over the world '
};

export default Meta;
