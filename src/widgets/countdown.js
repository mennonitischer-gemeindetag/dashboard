import { render } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';
import { _n } from '@wordpress/i18n';

import moment from 'moment';

const CountdownTimer = () => {
    
    const eventDate = moment("2023-04-28");
    const todaysDate = moment();
    const daysUntil = eventDate.diff(todaysDate, 'days');

	return (
		<>
			<h3 className="countdown-timer">
				{ `Noch ${daysUntil} ${ _n( 'Tag', 'Tage', daysUntil, 'gemeindetag' ) } bis zum Gemeindetag 2023!` }
			</h3>
		</>
	);
};

domReady( () => {
	render(
		<CountdownTimer />,
		document.getElementById( 'countdown-timer' )
	);
} );
