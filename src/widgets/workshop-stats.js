import { render, useState, useEffect } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';
import apiFetch from '@wordpress/api-fetch';
import { Spinner, FormToggle } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

import { transformAnmeldungen, transformWp, getAnmeldungen } from './helper';

const WorkshopAnmeldeStatWidget = () => {
	const [ anmeldungen, setAnmeldungen ] = useState( [] );
	const [ workshops, setWorkshops ] = useState( [] );
	const [ isLoading, setIsLoading ] = useState( true );

	useEffect( () => {
		Promise.all( [
			apiFetch( { path: 'wp/v2/anmeldung?per_page=5000' } ),
			apiFetch( { path: 'wp/v2/workshops?per_page=100' } ),
		] )
			.then( ( [ anmeldungen, workshops ] ) => {
				setAnmeldungen( transformAnmeldungen( anmeldungen ) );
				setWorkshops( transformWp( workshops ) );
				setIsLoading( false );
			} )
			.catch( ( error ) => console.error( error ) );
	}, [] );

	return (
		<>
			{ isLoading ? (
				<Spinner />
			) : (
				<>
					<table className={ 'wp-list-table widefat striped workshops' }>
						<thead>
							<tr>
								<th className={ 'column-title' }>Nr.</th>
								<th className={ 'column-title' }>Titel</th>
								<th className={ 'column-title' }></th>
							</tr>
						</thead>
						<tbody id="the-list">
							{ workshops
								.sort( ( a, b ) => a.nr > b.nr )
								.filter( workshop => 'storniert' != workshop.status )
								.map( ( workshop ) => {
									const workshopAnmeldungen = getAnmeldungen(
										anmeldungen,
										'workshops',
										workshop.id
									);

									const { nr, character, title, id, registrationClosed } = workshop;
									return (
										<tr key={ id }>
											<td>
												<span className="nr">{ `${ character }${ nr }` }</span>
											</td>
											<td>
												<a href={ `/wp-admin/post.php?post=${id}&action=edit` } target="_blank" dangerouslySetInnerHTML={ {
													__html: `${title}${ registrationClosed ? '<span class="ausgebucht">Ausgebucht!</span>' : '' }`,
												} } />
											</td>
											<td>
												<b>{ workshopAnmeldungen }</b>
											</td>
										</tr>
									);
								} ) }
						</tbody>
					</table>
				</>
			) }
		</>
	);
};

domReady( () => {
	render(
		<WorkshopAnmeldeStatWidget />,
		document.getElementById( 'workshops-stats-widget' )
	);
} );
