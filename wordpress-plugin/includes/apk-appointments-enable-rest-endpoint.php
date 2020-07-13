<?php
/**
 * User: Andy Kayley
 * Date: 19/4/15
 * Time: 14:57
 *
 * @package     APK_Appointments
 */

/**
 * Get the appointments and schedule serialiased for the rest api endpoint
 */
function get_appointments() {
	require_once __DIR__ . '/apk-appointments-defines.php';
	$display_format      = get_option( APK_APPOINTMENTS_TIME_DISPLAY_FORMAT );
	$appointments_option = get_option( APK_APPOINTMENTS_OPTION );

	$monday_availability    = create_day_availability_for_serialization(
		get_option( APK_APPOINTMENTS_MONDAY_APPOINTMENT_AVAILABILITY ),
		get_option( APK_APPOINTMENTS_MONDAY_APPOINTMENT_FEE ),
	);
	$tuesday_availability   = create_day_availability_for_serialization(
		get_option( APK_APPOINTMENTS_TUESDAY_APPOINTMENT_AVAILABILITY ),
		get_option( APK_APPOINTMENTS_TUESDAY_APPOINTMENT_FEE ),
	);
	$wednesday_availability = create_day_availability_for_serialization(
		get_option( APK_APPOINTMENTS_WEDNESDAY_APPOINTMENT_AVAILABILITY ),
		get_option( APK_APPOINTMENTS_WEDNESDAY_APPOINTMENT_FEE ),
	);
	$thursday_availability  = create_day_availability_for_serialization(
		get_option( APK_APPOINTMENTS_THURSDAY_APPOINTMENT_AVAILABILITY ),
		get_option( APK_APPOINTMENTS_THURSDAY_APPOINTMENT_FEE ),
	);
	$friday_availability    = create_day_availability_for_serialization(
		get_option( APK_APPOINTMENTS_FRIDAY_APPOINTMENT_AVAILABILITY ),
		get_option( APK_APPOINTMENTS_FRIDAY_APPOINTMENT_FEE ),
	);
	$saturday_availability  = create_day_availability_for_serialization(
		get_option( APK_APPOINTMENTS_SATURDAY_APPOINTMENT_AVAILABILITY ),
		get_option( APK_APPOINTMENTS_SATURDAY_APPOINTMENT_FEE ),
	);
	$sunday_availability    = create_day_availability_for_serialization(
		get_option( APK_APPOINTMENTS_SUNDAY_APPOINTMENT_AVAILABILITY ),
		get_option( APK_APPOINTMENTS_SUNDAY_APPOINTMENT_FEE ),
	);

	$appointments                            = new \stdClass();
	$appointments->schedule                  = new \stdClass();
	$appointments->schedule->display         = new \stdClass();
	$appointments->schedule->display->format = (int) $display_format[0];
	$appointments->schedule->monday          = (object) map_availability_for_serialization( $monday_availability );
	$appointments->schedule->tuesday         = (object) map_availability_for_serialization( $tuesday_availability );
	$appointments->schedule->wednesday       = (object) map_availability_for_serialization( $wednesday_availability );
	$appointments->schedule->thursday        = (object) map_availability_for_serialization( $thursday_availability );
	$appointments->schedule->friday          = (object) map_availability_for_serialization( $friday_availability );
	$appointments->schedule->saturday        = (object) map_availability_for_serialization( $saturday_availability );
	$appointments->schedule->sunday          = (object) map_availability_for_serialization( $sunday_availability );
	$appointments->appointments              = $appointments_option;

	return $appointments;
}

/**
 * Private method that will set the availability attribute if there are any, otherwise it will be closed
 *
 * @param Array $day_availability an array containing the times available for an appointment for a day.  e.g. ['11','12'] means appointments are available at 11am and 12pm.
 */
function map_availability_for_serialization( $day_availability ) {
	$day         = new stdClass();
	$day->closed = count( $day_availability ) === 0;
	if ( ! $day->closed ) {
		$day->availability = $day_availability;
	}
	return $day;
}

/**
 * If theres a fee for the time the set it in the availability for the day.
 *
 * @param Array $day_availability_option - WordPress option - an array containing the times available for an appointment for a day.  e.g. ['11','12'] means appointments are available at 11am and 12pm.
 * @param Array $day_fee_option - WordPress option - an array containing fee data  e.g. ['£20', '£20', '', ''] means fees are applicable at 8am and 9am.
 */
function create_day_availability_for_serialization( $day_availability_option, $day_fee_option ) {
	$day_availability = array();

	$index_map = array(
		'8'  => 0,
		'9'  => 1,
		'10' => 2,
		'11' => 3,
		'12' => 4,
		'13' => 5,
		'14' => 6,
		'15' => 7,
		'16' => 8,
		'17' => 9,
		'18' => 10,
		'19' => 11,
		'20' => 12,
		'21' => 13,
	);

	$count = isset( $day_availability_option ) && is_array( $day_availability_option ) ? count( $day_availability_option ) : 0;
	for ( $i = 0; $i < $count; $i ++ ) {

		$hour_data = new \stdClass();
		$time      = (int) $day_availability_option[ $i ];

		if ( $time > 0 ) {
			$hour_data->time = (int) $day_availability_option[ $i ];

			$fee = $day_fee_option[ $index_map[ $hour_data->time ] ];

			if ( isset( $fee ) && '' !== $fee ) {
				$hour_data->fee = $fee;
			}
			array_push( $day_availability, $hour_data );
		}
	}

	return $day_availability;
}

add_action(
	'rest_api_init',
	function () {
		register_rest_route(
			'apk-appointments/v1',
			'/appointments',
			array(
				'methods'  => 'GET',
				'callback' => 'get_appointments',
			)
		);
	}
);
