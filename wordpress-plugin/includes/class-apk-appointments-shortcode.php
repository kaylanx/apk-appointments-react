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
function apk_appointment_shortcode( $atts = [] ) {
	require_once 'wp-admin/includes/file.php';
	$react_app_files     = list_files( __DIR__ );
	$scripts_to_register = format_react_app_filenames( $react_app_files );

	$form_id = esc_html__($atts['contact-form-7-form-id']);
	$analytics_config = $atts['analytics-config'];
	
	enqueue_react_app( $scripts_to_register );
	return "<div id='apk-appointments' data-analytics-config='$analytics_config' data-contact-form-7-form-id='$form_id'></div>";
}
add_shortcode( 'apk-appointments', 'apk_appointment_shortcode' );

/**
 * Formats the react app filenames correctly.
 *
 * @param Array $full_paths the react app js and css paths.
 */
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

/**
 * Enqueues the react app
 *
 * @param Array $paths Array of strings of the paths to the react app.
 */
function enqueue_react_app( $paths ) {
	foreach ( $paths as $path ) {
		if ( str_ends_with( $path, '.css' ) ) {
			enqueue_css( $path );
		} elseif ( str_ends_with( $path, '.js' ) ) {
			enqueue_js( $path );
		}
	}
}

/**
 * Enqueues a css file
 *
 * @param String $css_script Path to a css file that belongs to the react app.
 */
function enqueue_css( $css_script ) {
	wp_enqueue_style( $css_script, plugins_url( $css_script, __FILE__ ), array(), '1.0.0', false );
}

/**
 * Enqueues a js file
 *
 * @param String $js_script Path to a css file that belongs to the react app.
 */
function enqueue_js( $js_script ) {
	wp_enqueue_script( $js_script, plugins_url( $js_script, __FILE__ ), array(), '1.0.0', false );
}

/**
 * Finds the string after another string e.g. $after = hello, $string = hello world, would return world.
 *
 * @param String $string the full string.
 * @param String $after the the string contained in $string we are looking for what is after.
 */
function find_string_after( $string, $after ) {
	$index_of_after = strrpos( $string, $after );
	$remaining_text = substr( $string, $index_of_after + strlen( $after ) - 1 );
	return $remaining_text;
}

/**
 * Return true if string ends another string
 *
 * @param String $string haystack string we are looking for the needle in.
 * @param String $end_string needle that we're are looking for in the haystack $string.
 */
function str_ends_with( $string, $end_string ) {
	$len = strlen( $end_string );
	if ( 0 === $len ) {
		return true;
	}
	return ( substr( $string, -$len ) === $end_string );
}
