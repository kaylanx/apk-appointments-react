<?php

$GLOBALS['hook_suffix'] = 'x';
class ShortcodeTest extends WP_UnitTestCase {

	public function test_links_to_react_app_are_all_present_and_correct() {

		$full_paths = array(
			'/Users/andykayley/Development/react/apk-appointments/build/apk-appointments/includes/js/main.8dfd3b3a.chunk.js',
			'/Users/andykayley/Development/react/apk-appointments/build/apk-appointments/includes/js/runtime-main.efae874d.js',
			'/Users/andykayley/Development/react/apk-appointments/build/apk-appointments/includes/js/2.962758c1.chunk.js',
			'/Users/andykayley/Development/react/apk-appointments/build/apk-appointments/includes/css/main.5ecd60fb.chunk.css',
		);

		$expected_list_of_assets = array(
			'/js/main.8dfd3b3a.chunk.js',
			'/js/runtime-main.efae874d.js',
			'/js/2.962758c1.chunk.js',
			'/css/main.5ecd60fb.chunk.css',
		);

		$actual_list_of_assets = format_react_app_filenames( $full_paths );

		$this->assertEquals( $expected_list_of_assets, $actual_list_of_assets, 'Arrays differ' );
	}

	public function test_react_app_is_registered() {

		do_action( 'wp_enqueue_scripts' );

		$this->assertTrue( wp_script_is( '/js/main.8dfd3b3a.chunk.js', 'registered' ), '/js/main.8dfd3b3a.chunk.js not enqueued' );
		$this->assertTrue( wp_script_is( '/js/runtime-main.efae874d.js', 'registered' ), '/js/runtime-main.efae874d.js not enqueued' );
		$this->assertTrue( wp_script_is( '/js/2.962758c1.chunk.js', 'registered' ), '/js/2.962758c1.chunk.js not enqueued' );
		$this->assertTrue( wp_style_is( '/css/main.5ecd60fb.chunk.css', 'registered' ), '/css/main.5ecd60fb.chunk.css not enqueued' );
	}
}

/**
 * This will get called when do_action( 'wp_enqueue_scripts' ) is called
 */
function apk_appointments_test_enqueue_react_app() {
	$scripts_to_load = array(
		'/js/main.8dfd3b3a.chunk.js',
		'/js/runtime-main.efae874d.js',
		'/js/2.962758c1.chunk.js',
		'/css/main.5ecd60fb.chunk.css',
	);

	print ( ' does this get called? ' );
	enqueue_react_app( $scripts_to_load );
}
add_action( 'wp_enqueue_scripts', 'apk_appointments_test_enqueue_react_app' );
