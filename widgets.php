<?php
/**
 * Add dashboard widgets
 *
 * @package dashboard
 */

namespace gemeindetag\dashboard;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

add_action( 'wp_dashboard_setup', __NAMESPACE__ . '\create_dashboard_widgets', 10, 4 );

/**
 * creates dashboard widget entrypoints for js to render them
 */
function create_dashboard_widgets() {

	$widgets = [
		'anmeldungen-stats-widget'   => 'Anmeldungen',
		'workshops-stats-widget'     => 'Workshop Anmeldungen',
		'ausfluege-stats-widget'     => 'Ausflug Anmeldungen',
		'essen-stats-widget'         => 'Essen Anmeldungen',
		'tickets-stats-widget'       => 'Anmeldungen pro Tag',
		'age-stats-widget'           => 'Alter der Anmeldungen',
		'total-earnings-widget'      => 'Einnahmen',
		'anmeldungen-kinderprogramm' => 'Anmeldungen Kinderprogramm',
		'countdown-timer'            => 'Countdown',
		'mennoconnect'               => 'Mennoconnect',
	];

	foreach ( $widgets as $widget_slug => $widget_title ) {
		wp_add_dashboard_widget(
			"$widget_slug-wrapper",
			$widget_title,
			function() use ( $widget_slug ) {
				echo sprintf( '<div id="%s" class="gemeindetag-stats-widget">Loading...</div>', esc_attr( $widget_slug ) );
			}
		);
	}
};
