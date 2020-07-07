<?php

$GLOBALS['hook_suffix'] = 'x';
class APK_Appointments_Settings_Test extends WP_UnitTestCase {

	private $settings;

	function setUp() {
		parent::setUp();
		$this->settings = new APK_Appointments_Settings();
	}

	function tearDown() {
		parent::tearDown();
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

	public function test_values_of_checkboxes_have_9am_and_12pm_selected() {

		$monday_options = array(
			'9',
			'',
			'',
			'',
			'',
			'',
			'12',
			'',
			'',
			'',
			'',
			'',
			'',
			'',
			'',
			'',
			'',
			'',
			'',
			'',
		);

		$this->assertEquals( " checked='checked'", $this->settings->time_checked( $monday_options, '9' ) );
		$this->assertEquals( " checked='checked'", $this->settings->time_checked( $monday_options, '12' ) );
		$this->assertEquals( '', $this->settings->time_checked( $monday_options, '11' ) );
	}

	public function test_values_of_fee_is_present_for_1800() {

		$monday_options = array(
			'9',
			'',
			'',
			'',
			'',
			'',
			'12',
			'',
			'',
			'',
			'',
			'',
			'',
			'',
			'',
			'',
			'',
			'',
			'18',
			'£20.00',
		);

		$this->assertEquals( " checked='checked'", $this->settings->time_checked( $monday_options, '18' ) );
		$this->assertEquals( '£20.00', $this->settings->get_fee_for_time( $monday_options, '18' ) );
	}

	/*
			$expected_values = array(
			'9','',
			'10', '£20',
			'11', '',
			'','',
			'13', '',
			'14', '',
			'','',
			'','',
			'','',
			'','',
		);
	*/

	private function expected_checkbox_array() {
		return array(
			array(
				'uid'           => 'apk_monday_appointment_availability',
				'label'         => 'Monday',
				'section'       => 'appointment_availability_section',
				'type'          => 'time_fee',
				'options'       => array(
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
				'uid_fee_field' => 'apk_monday_appointment_fee',
			),
			array(
				'uid'           => 'apk_tuesday_appointment_availability',
				'label'         => 'Tuesday',
				'section'       => 'appointment_availability_section',
				'type'          => 'time_fee',
				'options'       => array(
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
				'uid_fee_field' => 'apk_tuesday_appointment_fee',
			),
			array(
				'uid'           => 'apk_wednesday_appointment_availability',
				'label'         => 'Wednesday',
				'section'       => 'appointment_availability_section',
				'type'          => 'time_fee',
				'options'       => array(
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
				'uid_fee_field' => 'apk_wednesday_appointment_fee',
			),
			array(
				'uid'           => 'apk_thursday_appointment_availability',
				'label'         => 'Thursday',
				'section'       => 'appointment_availability_section',
				'type'          => 'time_fee',
				'options'       => array(
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
				'uid_fee_field' => 'apk_thursday_appointment_fee',
			),
			array(
				'uid'           => 'apk_friday_appointment_availability',
				'label'         => 'Friday',
				'section'       => 'appointment_availability_section',
				'type'          => 'time_fee',
				'options'       => array(
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
				'uid_fee_field' => 'apk_friday_appointment_fee',
			),
			array(
				'uid'           => 'apk_saturday_appointment_availability',
				'label'         => 'Saturday',
				'section'       => 'appointment_availability_section',
				'type'          => 'time_fee',
				'options'       => array(
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
				'uid_fee_field' => 'apk_saturday_appointment_fee',
			),
			array(
				'uid'           => 'apk_sunday_appointment_availability',
				'label'         => 'Sunday',
				'section'       => 'appointment_availability_section',
				'type'          => 'time_fee',
				'options'       => array(
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
				'uid_fee_field' => 'apk_sunday_appointment_fee',
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
			),
			array(
				'uid'           => 'apk_monday_appointment_availability',
				'label'         => 'Monday',
				'section'       => 'appointment_availability_section',
				'type'          => 'time_fee',
				'options'       => array(
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
				'uid_fee_field' => 'apk_monday_appointment_fee',
			),
			array(
				'uid'           => 'apk_tuesday_appointment_availability',
				'label'         => 'Tuesday',
				'section'       => 'appointment_availability_section',
				'type'          => 'time_fee',
				'options'       => array(
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
				'uid_fee_field' => 'apk_tuesday_appointment_fee',
			),
			array(
				'uid'           => 'apk_wednesday_appointment_availability',
				'label'         => 'Wednesday',
				'section'       => 'appointment_availability_section',
				'type'          => 'time_fee',
				'options'       => array(
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
				'uid_fee_field' => 'apk_wednesday_appointment_fee',
			),
			array(
				'uid'           => 'apk_thursday_appointment_availability',
				'label'         => 'Thursday',
				'section'       => 'appointment_availability_section',
				'type'          => 'time_fee',
				'options'       => array(
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
				'uid_fee_field' => 'apk_thursday_appointment_fee',
			),
			array(
				'uid'           => 'apk_friday_appointment_availability',
				'label'         => 'Friday',
				'section'       => 'appointment_availability_section',
				'type'          => 'time_fee',
				'options'       => array(
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
				'uid_fee_field' => 'apk_friday_appointment_fee',
			),
			array(
				'uid'           => 'apk_saturday_appointment_availability',
				'label'         => 'Saturday',
				'section'       => 'appointment_availability_section',
				'type'          => 'time_fee',
				'options'       => array(
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
				'uid_fee_field' => 'apk_saturday_appointment_fee',
			),
			array(
				'uid'           => 'apk_sunday_appointment_availability',
				'label'         => 'Sunday',
				'section'       => 'appointment_availability_section',
				'type'          => 'time_fee',
				'options'       => array(
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
				'uid_fee_field' => 'apk_sunday_appointment_fee',
			),
		);
	}
}
