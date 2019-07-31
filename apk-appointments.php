<?php
/**
 * APK Appointments
 *
 * @package     APK_Appointments
 * @author      Andy Kayley
 * @copyright   2019 Andy Kayley
 * @license     GPL-2.0-or-later
 *
 * @wordpress-plugin
 * Plugin Name: APK Appointments
 * Plugin URI: http://kayley.name
 * Description: APK Appointments plug-in.
 * Version: 1.0.0
 * Author: Andy Kayley
 * Author URI: http://kayley.name
 */

defined( 'ABSPATH' ) || die( 'Plugin file cannot be accessed directly.' );

define( 'APK_APPOINTMENT_PLUGIN_FILE', __FILE__ );
require_once __DIR__ . '/includes/apk-appointments-defines.php';

/**
 * Hook that runs when the plugin is activated.  Will setup an empty list of appointments in the database.
 */
function apk_appointments_activation_hook() {
	$option = get_option( APK_APPOINTMENTS_OPTION );
	if ( ! $option ) {
		add_option( APK_APPOINTMENTS_OPTION, array(), '', 'no' );
	}
}
register_activation_hook( APK_APPOINTMENT_PLUGIN_FILE, 'apk_appointments_activation_hook' );

/**
 * Define the update_option_<option_name> callback.
 *
 * @param mixed[] $array Don't know what this is?.
 */
function action_update_option_apk_appointments_options( $array ) {
	write_log( 'action_update_option_apk_appointments_options' );
	write_log( $array );
}
// add_action( 'update_option_apk_appointments_options', 'action_update_option_apk_appointments_options', 10, 1 );

/**
 * Sanitises apk_appointments_options option values.
 *
 * @param string $value  The unsanitised value.
 * @param string $option The name of the option.
 * @return string Sanitized value.
 */
function sanitize_apk_appointments_options( $value, $option ) {
	write_log( $value );
	write_log( $option );
	return $value;
}
add_filter( 'sanitize_option_apk_appointments_options', 'sanitize_apk_appointments_options', 10, 2 );

if ( ! function_exists( 'write_log' ) ) {
	/**
	 * Writes log text to error_log will use print_r if it's an object.
	 *
	 * @param string $log The text to log.
	 */
	function write_log( $log ) {
		if ( is_array( $log ) || is_object( $log ) ) {
			error_log( print_r( $log, true ) );
		} else {
			error_log( $log );
		}
	}
}

require_once __DIR__ . '/includes/class-apk-appointment-list-table.php';
require_once __DIR__ . '/includes/class-apk-appointments-options-page.php';
require_once __DIR__ . '/includes/class-apk-appointments-appointment-creator.php';
require_once __DIR__ . '/includes/class-apk-appointments-menu-creator.php';

use APK_Appointments_Appointment_Creator;
use APK_Appointments_Options_Page;
use APK_Appointments_Menu_Creator;

if ( is_admin() ) {
	$options_page        = new APK_Appointments_Options_Page();
	$appointment_creator = new APK_Appointments_Appointment_Creator();
	$menu_creator        = new APK_Appointments_Menu_Creator( $options_page, $appointment_creator );
	add_action( 'admin_menu', array( $menu_creator, 'plugin_menu' ) );

	if ( array_key_exists( 'page', $_GET ) && 'apk-appointments-new' === $_GET['page'] ) {
		$appointment_creator->display();
	} else {
		$options_page->display();
	}
} else {
	include __DIR__ . '/includes/class-apk-appointments-shortcode.php';
}
