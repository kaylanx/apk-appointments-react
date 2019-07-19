<?php
/*
Plugin Name: APK Appointments
Plugin URI: http://kayley.name
Description: APK Appointments plug-in.
Version: 1.0.0
Author: Andy Kayley
Author URI: http://kayley.name
 */
defined('ABSPATH') or die('Plugin file cannot be accessed directly.');

define( 'APK_APPOINTMENT_PLUGIN_FILE', __FILE__ );
define( 'APK_APPOINTMENTS_OPTION', 'apk_appointments_options' );

function apk_appointments_activation_hook() {
    $option = get_option(APK_APPOINTMENTS_OPTION);
    if ($option === false) {
        add_option(APK_APPOINTMENTS_OPTION, array(), null, 'no');
    }
}
register_activation_hook(APK_APPOINTMENT_PLUGIN_FILE, 'apk_appointments_activation_hook');

function apk_appointments_deactivation_hook() {
}
register_deactivation_hook(APK_APPOINTMENT_PLUGIN_FILE, 'apk_appointments_deactivation_hook');

function apk_appointments_uninstall_hook() {
    delete_option(APK_APPOINTMENTS_OPTION);
}
register_uninstall_hook(APK_APPOINTMENT_PLUGIN_FILE, 'apk_appointments_uninstall_hook');

require_once __DIR__ . '/includes/class-apk-appointment-list-table.php';
require_once __DIR__ . '/includes/class-apk-appointments-options-page.php';

use APK\Appointments\OptionsPage;

if (is_admin()) {
    new APK\Appointments\OptionsPage;
} else {
    include(__DIR__ . '/includes/class-apk-appointments-shortcode.php');
}
