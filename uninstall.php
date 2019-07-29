<?php

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit();
}

function apk_appointments_delete_plugin() {
	require_once __DIR__ . '/includes/apk-appointments-defines.php';
	delete_option( APK_APPOINTMENTS_OPTION );
}

apk_appointments_delete_plugin();