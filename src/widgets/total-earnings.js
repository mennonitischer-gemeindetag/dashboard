import { render, useState, useEffect } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';
import apiFetch from '@wordpress/api-fetch';
import { Spinner } from '@wordpress/components';

export const formatPrice = (number) => {
	if (isNaN(number)) {
		return formatPrice(0);
	}
	return parseFloat(number).toFixed(2).toString().replace('.', ',') + ' €';
};


import { transformAnmeldungen } from './helper';

const TotelEarningsWidget = () => {
	const [ anmeldungen, setAnmeldungen ] = useState( [] );
	const [ isLoading, setIsLoading ] = useState( true );

	useEffect( () => {
		Promise.all( [ apiFetch( { path: 'wp/v2/anmeldung?per_page=5000' } ) ] )
			.then( ( [ anmeldungen ] ) => {
				setAnmeldungen( transformAnmeldungen( anmeldungen ) );
				setIsLoading( false );
			} )
			.catch( ( error ) => console.error( error ) );
	}, [] );

    const betrag = anmeldungen
        .filter( anmeldung => anmeldung.status === "bezahlt" )
        .filter( anmeldung => !Number.isNaN( Number.parseInt( anmeldung.betrag ) ) )
        .reduce( (accumulator, anmeldung) => accumulator + Number.parseInt( anmeldung.betrag ), 0 );

	return (
		<>
			{ isLoading ? (
				<Spinner />
			) : (
				<>
					<h3 className="price">{ formatPrice( betrag ) }</h3>
				</>
			) }
		</>
	);
};

domReady( () => {
	render(
		<TotelEarningsWidget />,
		document.getElementById( 'total-earnings-widget' )
	);
} );