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

require_once __DIR__ . '/includes/class-apk-appointment-list-table.php';
require_once __DIR__ . '/includes/class-apk-appointments-options-page.php';
require_once __DIR__ . '/includes/class-apk-appointments-appointment-creator.php';
require_once __DIR__ . '/includes/class-apk-appointments-menu-creator.php';

if ( is_admin() ) {
	$options_page        = new APK_Appointments_Options_Page();
	$appointment_creator = new APK_Appointments_Appointment_Creator();
	$menu_creator        = new APK_Appointments_Menu_Creator( $options_page, $appointment_creator );
	add_action( 'admin_menu', array( $menu_creator, 'plugin_menu' ) );

	if ( array_key_exists( 'page', $_GET ) && 'apk-appointments-new' === $_GET['page'] ) {
		$appointment_creator->display();
	}
} else {
	include __DIR__ . '/includes/class-apk-appointments-shortcode.php';
}
