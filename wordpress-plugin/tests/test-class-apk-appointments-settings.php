<?php

$GLOBALS['hook_suffix'] = 'x';
class APK_Appointments_Settings_Test extends WP_UnitTestCase {

	private $settings;

	function setUp() {
		parent::setUp();
		print( 'setup called' );
		$this->settings = new APK_Appointments_Settings();
	}

	function tearDown() {
		parent::tearDown();
		print( 'teardown called' );

		$this->settings = null;
	}

	public function test_create_day_checkboxes_array() {
		$expected_array = $this->expected_checkbox_array();

		$actual_array = $this->settings->create_day_checkboxes_array();

		$this->assertEquals( array_values( $expected_array ), $actual_array );
	}

	public function test_merging_of_checkbox_arrays_with_the_other_fields() {

		$actual_array = $this->settings->merge_checkboxes_with_rest_of_fields( $this->settings->create_day_checkboxes_array() );

		$expected_array = $this->expected_merged_array();

		$this->assertEquals( $expected_array, $actual_array );
	}

	private function expected_checkbox_array() {
		return array(
			array(
				'uid'     => 'apk_monday_appointment_availability',
				'label'   => 'Monday',
				'section' => 'appointment_availability_section',
				'type'    => 'checkbox',
				'options' => array(
					8  => '08:00',
					9  => '09:00',
					10 => '10:00',
					11 => '11:00',
					12 => '12:00',
					13 => '13:00',
					14 => '14:00',
					15 => '15:00',
					16 => '16:00',
					17 => '17:00',
					18 => '18:00',
					19 => '19:00',
					20 => '20:00',
					21 => '21:00',
				),
				'default' => array(),
			),
			array(
				'uid'     => 'apk_tuesday_appointment_availability',
				'label'   => 'Tuesday',
				'section' => 'appointment_availability_section',
				'type'    => 'checkbox',
				'options' => array(
					8  => '08:00',
					9  => '09:00',
					10 => '10:00',
					11 => '11:00',
					12 => '12:00',
					13 => '13:00',
					14 => '14:00',
					15 => '15:00',
					16 => '16:00',
					17 => '17:00',
					18 => '18:00',
					19 => '19:00',
					20 => '20:00',
					21 => '21:00',
				),
				'default' => array(),
			),
			array(
				'uid'     => 'apk_wednesday_appointment_availability',
				'label'   => 'Wednesday',
				'section' => 'appointment_availability_section',
				'type'    => 'checkbox',
				'options' => array(
					8  => '08:00',
					9  => '09:00',
					10 => '10:00',
					11 => '11:00',
					12 => '12:00',
					13 => '13:00',
					14 => '14:00',
					15 => '15:00',
					16 => '16:00',
					17 => '17:00',
					18 => '18:00',
					19 => '19:00',
					20 => '20:00',
					21 => '21:00',
				),
				'default' => array(),
			),
			array(
				'uid'     => 'apk_thursday_appointment_availability',
				'label'   => 'Thursday',
				'section' => 'appointment_availability_section',
				'type'    => 'checkbox',
				'options' => array(
					8  => '08:00',
					9  => '09:00',
					10 => '10:00',
					11 => '11:00',
					12 => '12:00',
					13 => '13:00',
					14 => '14:00',
					15 => '15:00',
					16 => '16:00',
					17 => '17:00',
					18 => '18:00',
					19 => '19:00',
					20 => '20:00',
					21 => '21:00',
				),
				'default' => array(),
			),
			array(
				'uid'     => 'apk_friday_appointment_availability',
				'label'   => 'Friday',
				'section' => 'appointment_availability_section',
				'type'    => 'checkbox',
				'options' => array(
					8  => '08:00',
					9  => '09:00',
					10 => '10:00',
					11 => '11:00',
					12 => '12:00',
					13 => '13:00',
					14 => '14:00',
					15 => '15:00',
					16 => '16:00',
					17 => '17:00',
					18 => '18:00',
					19 => '19:00',
					20 => '20:00',
					21 => '21:00',
				),
				'default' => array(),
			),
			array(
				'uid'     => 'apk_saturday_appointment_availability',
				'label'   => 'Saturday',
				'section' => 'appointment_availability_section',
				'type'    => 'checkbox',
				'options' => array(
					8  => '08:00',
					9  => '09:00',
					10 => '10:00',
					11 => '11:00',
					12 => '12:00',
					13 => '13:00',
					14 => '14:00',
					15 => '15:00',
					16 => '16:00',
					17 => '17:00',
					18 => '18:00',
					19 => '19:00',
					20 => '20:00',
					21 => '21:00',
				),
				'default' => array(),
			),
			array(
				'uid'     => 'apk_sunday_appointment_availability',
				'label'   => 'Sunday',
				'section' => 'appointment_availability_section',
				'type'    => 'checkbox',
				'options' => array(
					8  => '08:00',
					9  => '09:00',
					10 => '10:00',
					11 => '11:00',
					12 => '12:00',
					13 => '13:00',
					14 => '14:00',
					15 => '15:00',
					16 => '16:00',
					17 => '17:00',
					18 => '18:00',
					19 => '19:00',
					20 => '20:00',
					21 => '21:00',
				),
				'default' => array(),
			),
		);
	}

	private function expected_merged_array() {
		return array(
			array(
				'uid'     => 'apk_time_display_format',
				'label'   => 'Time Display Format',
				'section' => 'display_format_section',
				'type'    => 'select',
				'options' => array(
					'24' => '24 Hour',
					'12' => '12 Hour',
				),
				'default' => array(),
			),
			array(
				'uid'          => 'apk_monday_0800_fee_text_field',
				'label'        => 'Monday 08:00 Fee',
				'section'      => 'appointment_availability_section',
				'type'         => 'number',
				'placeholder'  => '£0.00',
				'supplimental' => 'Enter fee e.g. "£20.00" or leave empty',
			),
			array(
				'uid'          => 'apk_monday_0900_fee_text_field',
				'label'        => 'Monday 09:00 Fee',
				'section'      => 'appointment_availability_section',
				'type'         => 'number',
				'placeholder'  => '£0.00',
				'supplimental' => 'Enter fee e.g. "£20.00" or leave empty',
			),
			array(
				'uid'          => 'apk_monday_1000_fee_text_field',
				'label'        => 'Monday 10:00 Fee',
				'section'      => 'appointment_availability_section',
				'type'         => 'number',
				'placeholder'  => '£0.00',
				'supplimental' => 'Enter fee e.g. "£20.00" or leave empty',
			),
			array(
				'uid'     => 'apk_monday_appointment_availability',
				'label'   => 'Monday',
				'section' => 'appointment_availability_section',
				'type'    => 'checkbox',
				'options' => array(
					8  => '08:00',
					9  => '09:00',
					10 => '10:00',
					11 => '11:00',
					12 => '12:00',
					13 => '13:00',
					14 => '14:00',
					15 => '15:00',
					16 => '16:00',
					17 => '17:00',
					18 => '18:00',
					19 => '19:00',
					20 => '20:00',
					21 => '21:00',
				),
				'default' => array(),
			),
			array(
				'uid'     => 'apk_tuesday_appointment_availability',
				'label'   => 'Tuesday',
				'section' => 'appointment_availability_section',
				'type'    => 'checkbox',
				'options' => array(
					8  => '08:00',
					9  => '09:00',
					10 => '10:00',
					11 => '11:00',
					12 => '12:00',
					13 => '13:00',
					14 => '14:00',
					15 => '15:00',
					16 => '16:00',
					17 => '17:00',
					18 => '18:00',
					19 => '19:00',
					20 => '20:00',
					21 => '21:00',
				),
				'default' => array(),
			),
			array(
				'uid'     => 'apk_wednesday_appointment_availability',
				'label'   => 'Wednesday',
				'section' => 'appointment_availability_section',
				'type'    => 'checkbox',
				'options' => array(
					8  => '08:00',
					9  => '09:00',
					10 => '10:00',
					11 => '11:00',
					12 => '12:00',
					13 => '13:00',
					14 => '14:00',
					15 => '15:00',
					16 => '16:00',
					17 => '17:00',
					18 => '18:00',
					19 => '19:00',
					20 => '20:00',
					21 => '21:00',
				),
				'default' => array(),
			),
			array(
				'uid'     => 'apk_thursday_appointment_availability',
				'label'   => 'Thursday',
				'section' => 'appointment_availability_section',
				'type'    => 'checkbox',
				'options' => array(
					8  => '08:00',
					9  => '09:00',
					10 => '10:00',
					11 => '11:00',
					12 => '12:00',
					13 => '13:00',
					14 => '14:00',
					15 => '15:00',
					16 => '16:00',
					17 => '17:00',
					18 => '18:00',
					19 => '19:00',
					20 => '20:00',
					21 => '21:00',
				),
				'default' => array(),
			),
			array(
				'uid'     => 'apk_friday_appointment_availability',
				'label'   => 'Friday',
				'section' => 'appointment_availability_section',
				'type'    => 'checkbox',
				'options' => array(
					8  => '08:00',
					9  => '09:00',
					10 => '10:00',
					11 => '11:00',
					12 => '12:00',
					13 => '13:00',
					14 => '14:00',
					15 => '15:00',
					16 => '16:00',
					17 => '17:00',
					18 => '18:00',
					19 => '19:00',
					20 => '20:00',
					21 => '21:00',
				),
				'default' => array(),
			),
			array(
				'uid'     => 'apk_saturday_appointment_availability',
				'label'   => 'Saturday',
				'section' => 'appointment_availability_section',
				'type'    => 'checkbox',
				'options' => array(
					8  => '08:00',
					9  => '09:00',
					10 => '10:00',
					11 => '11:00',
					12 => '12:00',
					13 => '13:00',
					14 => '14:00',
					15 => '15:00',
					16 => '16:00',
					17 => '17:00',
					18 => '18:00',
					19 => '19:00',
					20 => '20:00',
					21 => '21:00',
				),
				'default' => array(),
			),
			array(
				'uid'     => 'apk_sunday_appointment_availability',
				'label'   => 'Sunday',
				'section' => 'appointment_availability_section',
				'type'    => 'checkbox',
				'options' => array(
					8  => '08:00',
					9  => '09:00',
					10 => '10:00',
					11 => '11:00',
					12 => '12:00',
					13 => '13:00',
					14 => '14:00',
					15 => '15:00',
					16 => '16:00',
					17 => '17:00',
					18 => '18:00',
					19 => '19:00',
					20 => '20:00',
					21 => '21:00',
				),
				'default' => array(),
			),
		);
	}
}
