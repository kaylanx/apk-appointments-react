<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       http://kayley.name/apk-appointments
 * @since      1.0.0
 *
 * @package    APK_Appointments
 * @subpackage APK_Appointments/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    APK_Appointments
 * @subpackage APK_Appointments/includes
 * @author     Andy Kayley <apk-appointments@kayley.name>
 */
class APK_Appointments_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'apk-appointments',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
