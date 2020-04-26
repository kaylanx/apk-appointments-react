<?php
/**
 * User: Andy Kayley
 * Date: 19/4/15
 * Time: 15:56
 *
 * @package     APK_Appointments
 */

/**
 * The method that's actually the shortcode
 */
function apk_appointment_shortcode() {
	require_once 'wp-admin/includes/file.php';
	$react_app_files     = list_files( __DIR__ );
	$scripts_to_register = format_react_app_filenames( $react_app_files );
	enqueue_react_app( $scripts_to_register );

	// $appointments = get_option( 'apk_appointments_options' );

	return '<div id="apk-appointments"></div>';
}
add_shortcode( 'apk-appointments', 'apk_appointment_shortcode' );

function format_react_app_filenames( $full_paths ) {
	if ( ! is_array( $full_paths ) ) {
		return array();
	}

	$formatted_filenames = array();

	foreach ( $full_paths as $path ) {
		$search_for            = 'includes/';
		$formatted_path        = find_string_after( $path, $search_for );
		$formatted_filenames[] = $formatted_path;
	}

	return $formatted_filenames;
}

function enqueue_react_app( $paths ) {
	foreach ( $paths as $path ) {
		if ( str_ends_with( $path, '.css' ) ) {
			enqueue_css( $path );
		} elseif ( str_ends_with( $path, '.js' ) ) {
			enqueue_js( $path );
		}
	}
}

function enqueue_css( $css_script ) {
	wp_enqueue_style( $css_script, plugins_url( $css_script, __FILE__ ), array(), '1.0.0', false );
}

function enqueue_js( $js_script ) {
	wp_enqueue_script( $js_script, plugins_url( $js_script, __FILE__ ), array(), '1.0.0', false );
}

function find_string_after( $string, $after ) {
	$index_of_after = strrpos( $string, $after );
	$remaining_text = substr( $string, $index_of_after + strlen( $after ) - 1 );
	return $remaining_text;
}

function str_ends_with( $string, $end_string ) {
	$len = strlen( $end_string );
	if ( $len == 0 ) {
		return true;
	}
	return ( substr( $string, -$len ) === $end_string );
}
