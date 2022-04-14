<?php
/**
 * Plugin Name: Dashboard
 * Description: Adds dashboard widgets to get an overview of the gemeindetag.
 * Author: Fabian Kägy
 * Author URI: fabian-kaegy.com
 * Version: 1.0.0
 * License: GLPv2
 *
 * @package dashboard
 */

namespace gemeindetag\dashboard;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * get plugin directory
 */
function _get_plugin_directory() {
	return __DIR__;
}

/**
 * get plugin url
 */
function _get_plugin_url() {
	static $plugin_url;

	if ( empty( $plugin_url ) ) {
		$plugin_url = plugins_url( null, __FILE__ );
	}

	return $plugin_url;
}

require _get_plugin_directory() . '/widgets.php';
require _get_plugin_directory() . '/enqueue-assets.php';
