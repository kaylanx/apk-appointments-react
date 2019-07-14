<?php
/*
Plugin Name: APK Appointments
Plugin URI: http://kayley.name
Description: APK Appointments plug-in.
Version: 1.0.0
Author: Andy Kayley
Author URI: http://kayley.name
*/
defined( 'ABSPATH' ) or die( 'Plugin file cannot be accessed directly.' );


// WP_List_Table is not loaded automatically so we need to load it in our application
if( ! class_exists( 'APK_List_Table' ) ) {
    //require_once( ABSPATH . 'wp-admin/includes/class-wp-list-table.php' );
    require_once( ABSPATH . 'wp-content/plugins/apk-appointments/includes/class-wp-list-table.php' );
}

require_once(ABSPATH . 'wp-content/plugins/apk-appointments/includes/class-apk-appointment-list-table.php');
require_once(ABSPATH . 'wp-content/plugins/apk-appointments/includes/class-apk-appointments-options-page.php');
require_once(ABSPATH . 'wp-content/plugins/apk-appointments/includes/class-apk-appointments-shortcode.php');


if( is_admin() ) {
    new APK_Appointments_Options_Page;
}
new APK_Appointments_Shortcode;



