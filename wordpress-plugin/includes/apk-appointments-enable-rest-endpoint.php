
<?php
function get_appointments( $data ) {
	$appointments = get_option( 'apk_appointments_options' );
	return $appointments;
}

add_action( 'rest_api_init', function () {
  register_rest_route( 'apk-appointments/v1', '/appointments', array(
    'methods' => 'GET',
    'callback' => 'get_appointments',
  ) );
} );