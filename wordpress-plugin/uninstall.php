<?php
/**
 * Removes plugin options on uninstall.
 *
 * @package APK_Appointments
 */

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit();
}

/**
 * Removes all the options that are added with this plugin.
 */
function apk_appointments_delete_plugin() {
	require_once __DIR__ . '/includes/apk-appointments-defines.php';
	delete_option( APK_APPOINTMENTS_OPTION );
	delete_option( APK_APPOINTMENTS_SETTINGS_FIELDS );
	delete_option( APK_APPOINTMENTS_TIME_DISPLAY_FORMAT );
	delete_option( APK_APPOINTMENTS_MONDAY_APPOINTMENT_AVAILABILITY );
	delete_option( APK_APPOINTMENTS_MONDAY_APPOINTMENT_FEE );
	delete_option( APK_APPOINTMENTS_TUESDAY_APPOINTMENT_AVAILABILITY );
	delete_option( APK_APPOINTMENTS_TUESDAY_APPOINTMENT_FEE );
	delete_option( APK_APPOINTMENTS_WEDNESDAY_APPOINTMENT_AVAILABILITY );
	delete_option( APK_APPOINTMENTS_WEDNESDAY_APPOINTMENT_FEE );
	delete_option( APK_APPOINTMENTS_THURSDAY_APPOINTMENT_AVAILABILITY );
	delete_option( APK_APPOINTMENTS_THURSDAY_APPOINTMENT_FEE );
	delete_option( APK_APPOINTMENTS_FRIDAY_APPOINTMENT_AVAILABILITY );
	delete_option( APK_APPOINTMENTS_FRIDAY_APPOINTMENT_FEE );
	delete_option( APK_APPOINTMENTS_SATURDAY_APPOINTMENT_AVAILABILITY );
	delete_option( APK_APPOINTMENTS_SATURDAY_APPOINTMENT_FEE );
	delete_option( APK_APPOINTMENTS_SUNDAY_APPOINTMENT_AVAILABILITY );
	delete_option( APK_APPOINTMENTS_SUNDAY_APPOINTMENT_FEE );
}

apk_appointments_delete_plugin();
