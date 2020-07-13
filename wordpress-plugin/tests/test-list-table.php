<?php

$GLOBALS['hook_suffix'] = 'x';
class List_TableTest extends WP_UnitTestCase {

	public function test_when_checkbox_column_is_rendered_then_checkbox_html_returned() {
		$list_table    = new APK_Appointment_List_Table();
		$expected_html = '<input type="checkbox" name="appointment[]" value="2015-04-22,16,NO" />';
		$actual_html   = $list_table->column_cb( $this->get_appointment_not_closed() );

		$this->assertEquals( $expected_html, $actual_html );
	}

	public function test_when_get_columns_called_column_names_are_correct() {
		$list_table = new APK_Appointment_List_Table();
		$columns    = $list_table->get_columns();
		$this->assertEquals( 4, count( $columns ) );
		$this->assertTrue( array_key_exists( APK_Appointment_List_Table::COLUMN_CHECKBOX, $columns ) );
		$this->assertTrue( array_key_exists( APK_Appointment_List_Table::COLUMN_DATE, $columns ) );
		$this->assertTrue( array_key_exists( APK_Appointment_List_Table::COLUMN_TIME, $columns ) );
		$this->assertTrue( array_key_exists( APK_Appointment_List_Table::COLUMN_CLOSED, $columns ) );

		$this->assertEquals( '<input type="checkbox" />', $columns[ APK_Appointment_List_Table::COLUMN_CHECKBOX ] );
		$this->assertEquals( 'Date', $columns[ APK_Appointment_List_Table::COLUMN_DATE ] );
		$this->assertEquals( 'Time', $columns[ APK_Appointment_List_Table::COLUMN_TIME ] );
		$this->assertEquals( 'Closed?', $columns[ APK_Appointment_List_Table::COLUMN_CLOSED ] );
	}

	public function test_there_are_no_hidden_columns() {
		$list_table = new APK_Appointment_List_Table();
		$this->assertEquals( 0, count( $list_table->get_hidden_columns() ) );
	}

	public function test_column_values_for_checkbox() {
		$list_table                     = new APK_Appointment_List_Table();
		$check_box_column_display_value = $list_table->column_default( $this->get_appointment_not_closed(), APK_Appointment_List_Table::COLUMN_CHECKBOX );
		$this->assertEquals( '', $check_box_column_display_value );
	}

	public function test_column_values_for_date() {
		$list_table                = new APK_Appointment_List_Table();
		$date_column_display_value = $list_table->column_default( $this->get_appointment_not_closed(), APK_Appointment_List_Table::COLUMN_DATE );
		$this->assertEquals( '2015-04-22', $date_column_display_value );
	}

	public function test_column_values_for_closed_when_not_closed() {
		$list_table                  = new APK_Appointment_List_Table();
		$closed_column_display_value = $list_table->column_default( $this->get_appointment_not_closed(), APK_Appointment_List_Table::COLUMN_CLOSED );
		$this->assertEquals( 'NO', $closed_column_display_value );
	}

	public function test_column_values_for_closed_when_closed() {
		$list_table                  = new APK_Appointment_List_Table();
		$closed_column_display_value = $list_table->column_default( $this->get_appointment_closed(), APK_Appointment_List_Table::COLUMN_CLOSED );
		$this->assertEquals( 'YES', $closed_column_display_value );
	}

	public function test_column_values_for_time_when_closed() {
		$list_table                = new APK_Appointment_List_Table();
		$time_column_display_value = $list_table->column_default( $this->get_appointment_closed(), APK_Appointment_List_Table::COLUMN_TIME );
		$this->assertEquals( '', $time_column_display_value );
	}

	public function test_column_values_for_time_when_appointment_at_8_then_empty_string() {
		$this->assertAppointmentTimesKeyGivesCorrectDisplayValue( '8', '' );
	}

	public function test_column_values_for_time_when_appointment_exists_then_return_with_AM_or_PM() {
		$this->assertAppointmentTimesKeyGivesCorrectDisplayValue( '9', '9 AM' );
		$this->assertAppointmentTimesKeyGivesCorrectDisplayValue( '10', '10 AM' );
		$this->assertAppointmentTimesKeyGivesCorrectDisplayValue( '11', '11 AM' );
		$this->assertAppointmentTimesKeyGivesCorrectDisplayValue( '12', '12 PM' );
		$this->assertAppointmentTimesKeyGivesCorrectDisplayValue( '13', '1 PM' );
		$this->assertAppointmentTimesKeyGivesCorrectDisplayValue( '14', '2 PM' );
		$this->assertAppointmentTimesKeyGivesCorrectDisplayValue( '15', '3 PM' );
		$this->assertAppointmentTimesKeyGivesCorrectDisplayValue( '16', '4 PM' );
		$this->assertAppointmentTimesKeyGivesCorrectDisplayValue( '17', '5 PM' );
		$this->assertAppointmentTimesKeyGivesCorrectDisplayValue( '18', '6 PM' );
		$this->assertAppointmentTimesKeyGivesCorrectDisplayValue( '19', '7 PM' );
		$this->assertAppointmentTimesKeyGivesCorrectDisplayValue( '20', '8 PM' );
	}

	public function test_remove_date_or_times_remove_one_time() {
		$appointments        = $this->get_appointments_options();
		$actual_appointments = $this->remove_date_or_times( '2019-07-23', array( 'time' => 12 ), $appointments );
		$this->assertEquals( 3, count( $actual_appointments ) );

		$this->assertAppointmentPartsEquals( '2015-04-22', array( array( 'time' => 16 ) ), false, $actual_appointments[0] );
		$this->assertAppointmentPartsEquals( '2019-07-23', array( array( 'time' => 11 ), array( 'time' => 13 ) ), false, $actual_appointments[1] );
		$this->assertAppointmentPartsEquals( '2015-04-23', array(), true, $actual_appointments[2] );
	}

	public function test_remove_date_or_times_remove_closed() {
		$appointments        = $this->get_appointments_options();
		$actual_appointments = $this->remove_date_or_times( '2015-04-23', array( 'time' => 12 ), $appointments );
		$this->assertEquals( 2, count( $actual_appointments ) );

		$this->assertAppointmentPartsEquals( '2015-04-22', array( array( 'time' => 16 ) ), false, $actual_appointments[0] );
		$this->assertAppointmentPartsEquals( '2019-07-23', array( array( 'time' => 11 ), array( 'time' => 12 ), array( 'time' => 13 ) ), false, $actual_appointments[1] );
	}

	public function test_remove_date_or_times_remove_date_with_one_time_closed() {
		$appointments        = $this->get_appointments_options();
		$actual_appointments = $this->remove_date_or_times( '2015-04-22', array( 'time' => 16 ), $appointments );

		$this->assertEquals( 2, count( $actual_appointments ) );
		$this->assertAppointmentPartsEquals( '2019-07-23', array( array( 'time' => 11 ), array( 'time' => 12 ), array( 'time' => 13 ) ), false, $actual_appointments[0] );
		$this->assertAppointmentPartsEquals( '2015-04-23', array(), true, $actual_appointments[1] );
	}

	public function test_remove_date_or_times_remove_date_with_3_appointments() {
		$appointments        = $this->get_appointments_options();
		$actual_appointments = $this->remove_date_or_times( '2019-07-23', array( 'time' => 11 ), $appointments );
		$actual_appointments = $this->remove_date_or_times( '2019-07-23', array( 'time' => 12 ), $actual_appointments );
		$actual_appointments = $this->remove_date_or_times( '2019-07-23', array( 'time' => 13 ), $actual_appointments );

		$this->assertEquals( 2, count( $actual_appointments ) );
		$this->assertAppointmentPartsEquals( '2015-04-22', array( array( 'time' => 16 ) ), false, $actual_appointments[0] );
		$this->assertAppointmentPartsEquals( '2015-04-23', array(), true, $actual_appointments[1] );
	}

	public function test_remove_date_or_times_remove_all() {
		$appointments        = $this->get_appointments_options();
		$actual_appointments = $this->remove_date_or_times( '2015-04-22', array( 'time' => 16 ), $appointments );
		$actual_appointments = $this->remove_date_or_times( '2019-07-23', array( 'time' => 11 ), $actual_appointments );
		$actual_appointments = $this->remove_date_or_times( '2019-07-23', array( 'time' => 12 ), $actual_appointments );
		$actual_appointments = $this->remove_date_or_times( '2019-07-23', array( 'time' => 13 ), $actual_appointments );
		$actual_appointments = $this->remove_date_or_times( '2015-04-23', array( 'time' => 1 ), $actual_appointments );

		$this->assertEquals( 0, count( $actual_appointments ) );
	}

	private function get_appointments_options() {
		$appointments   = array();
		$appointments[] = $this->get_appointment_option_not_closed();
		$appointments[] = $this->get_appointment_option_not_closed( '2019-07-23', array( array( 'time' => 11 ), array( 'time' => 12 ), array( 'time' => 13 ) ), false );
		$appointments[] = $this->get_appointment_option_closed();
		return $appointments;
	}

	private function remove_date_or_times( $date, $time, $appointments ) {
		$list_table = new APK_Appointment_List_Table();
		$reflector  = new ReflectionObject( $list_table );
		$method     = $reflector->getMethod( 'remove_date_or_times' );
		$method->setAccessible( true );
		return $method->invoke( $list_table, $date, $time, $appointments );
	}

	public function test_table_data() {
		$list_table     = new APK_Appointment_List_Table();
		$appointments   = array();
		$appointments[] = $this->get_appointment_option_not_closed( '2015-04-22', array( array( 'time' => 14 ), array( 'time' => 15 ), array( 'time' => 16 ) ), false );
		$appointments[] = $this->get_appointment_option_closed();

		$reflector = new ReflectionObject( $list_table );
		$method    = $reflector->getMethod( 'table_data' );
		$method->setAccessible( true );
		$data_model = $method->invoke( $list_table, $appointments );

		$this->assertEquals( 4, count( $data_model ) );
		$this->assertThatAppointmentOptionTransformedToTableDisplayRows( $data_model[0], '2015-04-22', 14, 'NO' );
		$this->assertThatAppointmentOptionTransformedToTableDisplayRows( $data_model[1], '2015-04-22', 15, 'NO' );
		$this->assertThatAppointmentOptionTransformedToTableDisplayRows( $data_model[2], '2015-04-22', 16, 'NO' );
		$this->assertThatAppointmentOptionTransformedToTableDisplayRows( $data_model[3], '2015-04-23', null, 'YES' );
	}

	private function assertThatAppointmentOptionTransformedToTableDisplayRows( $actual_appointment, $expected_date, $expected_time, $expected_closed ) {
		$this->assertEquals( $expected_date, $actual_appointment[ APK_Appointment_List_Table::COLUMN_DATE ] );
		$this->assertEquals( $expected_time, $actual_appointment[ APK_Appointment_List_Table::COLUMN_TIME ] );
		$this->assertEquals( $expected_closed, $actual_appointment[ APK_Appointment_List_Table::COLUMN_CLOSED ] );
	}

	private function assertAppointmentTimesKeyGivesCorrectDisplayValue( $key, $display_value ) {
		$list_table  = new APK_Appointment_List_Table();
		$appointment = $this->get_appointment_not_closed();
		$appointment[ APK_Appointment_List_Table::COLUMN_TIME ] = $key;
		$time_column_display_value                              = $list_table->column_default( $appointment, APK_Appointment_List_Table::COLUMN_TIME );
		$this->assertEquals( $display_value, $time_column_display_value );
	}

	private function assertAppointmentPartsEquals( $expected_date, $expected_times, $expected_closed, $actual_appointment ) {
		$this->assertEquals( $expected_date, $actual_appointment['date'] );
		$this->assertEquals( $expected_times, $actual_appointment['times'] );
		$this->assertEquals( $expected_closed, $actual_appointment['closed'] );
	}

	private function get_appointment_not_closed( $date = '2015-04-22', $time = 16, $closed = 'NO' ) {
		$wp_option_appointment[ APK_Appointment_List_Table::COLUMN_DATE ]   = $date;
		$wp_option_appointment[ APK_Appointment_List_Table::COLUMN_TIME ]   = $time;
		$wp_option_appointment[ APK_Appointment_List_Table::COLUMN_CLOSED ] = $closed;
		return $wp_option_appointment;
	}

	private function get_appointment_closed() {
		$wp_option_appointment[ APK_Appointment_List_Table::COLUMN_DATE ]   = '2015-04-23';
		$wp_option_appointment[ APK_Appointment_List_Table::COLUMN_CLOSED ] = 'YES';
		return $wp_option_appointment;
	}

	private function get_appointment_option_not_closed( $date = '2015-04-22', $times = array( array( 'time' => 16 ) ), $closed = false ) {
		$wp_option_appointment['date']   = $date;
		$wp_option_appointment['times']  = $times;
		$wp_option_appointment['closed'] = $closed;
		return $wp_option_appointment;
	}

	private function get_appointment_option_closed() {
		$wp_option_appointment['date']   = '2015-04-23';
		$wp_option_appointment['times']  = array();
		$wp_option_appointment['closed'] = true;
		return $wp_option_appointment;
	}
}
