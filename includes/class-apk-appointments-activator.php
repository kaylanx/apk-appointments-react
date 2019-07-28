<?php

/**
 * Fired during plugin activation
 *
 * @link       http://kayley.name/apk-appointments
 * @since      1.0.0
 *
 * @package    APK_Appointments
 * @subpackage APK_Appointments/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    APK_Appointments
 * @subpackage APK_Appointments/includes
 * @author     Andy Kayley <apk-appointments@kayley.name>
 */
class APK_Appointments_Activator {

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function activate() {
		$option = get_option( APK_APPOINTMENTS_OPTION );
		if ( ! $option ) {
			add_option( APK_APPOINTMENTS_OPTION, array(), '', 'no' );
		}
	}

}
