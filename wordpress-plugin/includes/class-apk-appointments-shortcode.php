<?php
/**
 * User: Andy Kayley
 * Date: 19/4/15
 * Time: 15:56
 *
 * @package     APK_Appointments
 */

/**
 * Scripts to be enqueued by the plugin
 */
function apk_appointment_scripts() {
	wp_register_script( 'apk-picker-script', plugins_url( '/js/pickadate/picker.js', __FILE__ ), array(), '3.5.4', true );
	wp_register_script( 'apk-picker-date-script', plugins_url( '/js/pickadate/picker.date.js', __FILE__ ), array(), '3.5.4', true );
	wp_register_script( 'apk-picker-time-script', plugins_url( '/js/pickadate/picker.time.js', __FILE__ ), array(), '3.5.4', true );
	wp_register_script( 'apk-appointments-script', plugins_url( '/js/appointments.js', __FILE__ ), array(), '1.0.0', true );

	wp_register_style( 'apk-picker-classic', plugins_url( '/css/pickadate/classic.css', __FILE__ ), array(), '3.5.4', false );
	wp_register_style( 'apk-picker-classic-date', plugins_url( '/css/pickadate/classic.date.css', __FILE__ ), array(), '3.5.4', false );
	wp_register_style( 'apk-picker-classic-time', plugins_url( '/css/pickadate/classic.time.css', __FILE__ ), array(), '3.5.4', false );
}
add_action( 'wp_enqueue_scripts', 'apk_appointment_scripts' );

/**
 * The method that's actually the shortcode
 */
function apk_appointment_shortcode() {
	wp_enqueue_style( 'apk-picker-classic' );
	wp_enqueue_style( 'apk-picker-classic-date' );
	wp_enqueue_style( 'apk-picker-classic-time' );

	wp_enqueue_script( 'apk-picker-script' );
	wp_enqueue_script( 'apk-picker-date-script' );
	wp_enqueue_script( 'apk-picker-time-script' );
	wp_enqueue_script( 'apk-appointments-script' );

	$appointments = get_option( 'apk_appointments_options' );

	return '<script type="text/javascript">
                        const appointmentsJson = ' . wp_json_encode( $appointments ) . ';'
		. '</script>';
}
add_shortcode( 'apk-appointments', 'apk_appointment_shortcode' );
