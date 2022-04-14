<?php
/**
 * Enqueue Assets
 *
 * @package dashboard
 */

namespace gemeindetag\dashboard;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\enqueue_widget_assets' );

/**
 * enqueue widget assets
 */
function enqueue_widget_assets() {
	$screen = get_current_screen();
	if ( 'dashboard' === $screen->id ) {

		$widgets_path         = '/build/index.js';
		$widgets_dependencies = ( include _get_plugin_directory() . '/build/index.asset.php' );

		wp_enqueue_script(
			'gemeindetag-dashboard-widgets',
			_get_plugin_url() . $widgets_path,
			array_merge( $widgets_dependencies['dependencies'], [ 'postbox', 'wp-data' ] ),
			$widgets_dependencies['version'],
			false
		);

		wp_enqueue_style(
			'gemeindetag-dashboard-widgets-style',
			_get_plugin_url() . '/widgets.css',
			[ 'wp-components' ],
			$widgets_dependencies['version']
		);
	}
}
