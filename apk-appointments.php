<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              http://kayley.name/apk-appointments
 * @since             1.0.0
 * @package           APK_Appointments
 *
 * @wordpress-plugin
 * Plugin Name:       APK Appointments
 * Plugin URI:        http://kayley.name/apk-appointments/
 * Description:       Allows the user to create a form with appointments that can be chosen from a date picker.
 * Version:           1.0.0
 * Author:            Andy Kayley
 * Author URI:        http://kayley.name/apk-appointments/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       apk-appointments
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

require_once plugin_dir_path( __FILE__ ) . 'includes/apk-appointments-defines.php';

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-apk-appointments-activator.php
 */
function activate_apk_appointments() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-apk-appointments-activator.php';
	APK_Appointments_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-apk-appointments-deactivator.php
 */
function deactivate_apk_appointments() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-apk-appointments-deactivator.php';
	APK_Appointments_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_apk_appointments' );
register_deactivation_hook( __FILE__, 'deactivate_apk_appointments' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-apk-appointments.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_apk_appointments() {

	$plugin = new APK_Appointments();
	$plugin->run();

}
run_apk_appointments();
