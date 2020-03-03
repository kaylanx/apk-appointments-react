<?php
// fwrite(STDERR, print_r($generatedJson, TRUE));

$GLOBALS['hook_suffix'] = 'x';
class ListTableTest extends WP_UnitTestCase {

	public function test_when_checkbox_column_is_rendered_then_checkbox_html_returned() {
		$listTable    = new APK_Appointment_List_Table();
		$expectedHtml = '<input type="checkbox" name="appointment[]" value="2015-04-22,16,NO" />';
		$actualHtml   = $listTable->column_cb( $this->get_appointment_not_closed() );

		$this->assertEquals( $expectedHtml, $actualHtml );
	}

	public function test_when_get_columns_called_column_names_are_correct() {
		$listTable = new APK_Appointment_List_Table();
		$columns   = $listTable->get_columns();
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
		$listTable = new APK_Appointment_List_Table();
		$this->assertEquals( 0, count( $listTable->get_hidden_columns() ) );
	}

	public function test_column_values_for_checkbox() {
		$listTable                  = new APK_Appointment_List_Table();
		$checkBoxColumnDisplayValue = $listTable->column_default( $this->get_appointment_not_closed(), APK_Appointment_List_Table::COLUMN_CHECKBOX );
		$this->assertEquals( '', $checkBoxColumnDisplayValue );
	}

	public function test_column_values_for_date() {
		$listTable              = new APK_Appointment_List_Table();
		$dateColumnDisplayValue = $listTable->column_default( $this->get_appointment_not_closed(), APK_Appointment_List_Table::COLUMN_DATE );
		$this->assertEquals( '2015-04-22', $dateColumnDisplayValue );
	}

	public function test_column_values_for_closed_when_not_closed() {
		$listTable                = new APK_Appointment_List_Table();
		$closedColumnDisplayValue = $listTable->column_default( $this->get_appointment_not_closed(), APK_Appointment_List_Table::COLUMN_CLOSED );
		$this->assertEquals( 'NO', $closedColumnDisplayValue );
	}

	public function test_column_values_for_closed_when_closed() {
		$listTable                = new APK_Appointment_List_Table();
		$closedColumnDisplayValue = $listTable->column_default( $this->get_appointment_closed(), APK_Appointment_List_Table::COLUMN_CLOSED );
		$this->assertEquals( 'YES', $closedColumnDisplayValue );
	}

	public function test_column_values_for_time_when_closed() {
		$listTable              = new APK_Appointment_List_Table();
		$timeColumnDisplayValue = $listTable->column_default( $this->get_appointment_closed(), APK_Appointment_List_Table::COLUMN_TIME );
		$this->assertEquals( '', $timeColumnDisplayValue );
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
		$actual_appointments = $this->remove_date_or_times( '2019-07-23', 12, $appointments );
		$this->assertEquals( 3, count( $actual_appointments ) );

		$this->assertAppointmentPartsEquals( '2015-04-22', array( 16 ), false, $actual_appointments[0] );
		$this->assertAppointmentPartsEquals( '2019-07-23', array( 11, 13 ), false, $actual_appointments[1] );
		$this->assertAppointmentPartsEquals( '2015-04-23', array(), true, $actual_appointments[2] );
	}

	public function test_remove_date_or_times_remove_closed() {
		$appointments        = $this->get_appointments_options();
		$actual_appointments = $this->remove_date_or_times( '2015-04-23', 12, $appointments );
		$this->assertEquals( 2, count( $actual_appointments ) );

		$this->assertAppointmentPartsEquals( '2015-04-22', array( 16 ), false, $actual_appointments[0] );
		$this->assertAppointmentPartsEquals( '2019-07-23', array( 11, 12, 13 ), false, $actual_appointments[1] );
	}

	public function test_remove_date_or_times_remove_date_with_one_time_closed() {
		$appointments        = $this->get_appointments_options();
		$actual_appointments = $this->remove_date_or_times( '2015-04-22', 16, $appointments );

		$this->assertEquals( 2, count( $actual_appointments ) );
		$this->assertAppointmentPartsEquals( '2019-07-23', array( 11, 12, 13 ), false, $actual_appointments[0] );
		$this->assertAppointmentPartsEquals( '2015-04-23', array(), true, $actual_appointments[1] );
	}

	public function test_remove_date_or_times_remove_date_with_3_appointments() {
		$appointments        = $this->get_appointments_options();
		$actual_appointments = $this->remove_date_or_times( '2019-07-23', 11, $appointments );
		$actual_appointments = $this->remove_date_or_times( '2019-07-23', 12, $actual_appointments );
		$actual_appointments = $this->remove_date_or_times( '2019-07-23', 13, $actual_appointments );

		$this->assertEquals( 2, count( $actual_appointments ) );
		$this->assertAppointmentPartsEquals( '2015-04-22', array( 16 ), false, $actual_appointments[0] );
		$this->assertAppointmentPartsEquals( '2015-04-23', array(), true, $actual_appointments[1] );
	}

	public function test_remove_date_or_times_remove_all() {
		$appointments        = $this->get_appointments_options();
		$actual_appointments = $this->remove_date_or_times( '2015-04-22', 16, $appointments );
		$actual_appointments = $this->remove_date_or_times( '2019-07-23', 11, $actual_appointments );
		$actual_appointments = $this->remove_date_or_times( '2019-07-23', 12, $actual_appointments );
		$actual_appointments = $this->remove_date_or_times( '2019-07-23', 13, $actual_appointments );
		$actual_appointments = $this->remove_date_or_times( '2015-04-23', 1, $actual_appointments );

		$this->assertEquals( 0, count( $actual_appointments ) );
	}

	private function get_appointments_options() {
		$appointments   = array();
		$appointments[] = $this->get_appointment_option_not_closed();
		$appointments[] = $this->get_appointment_option_not_closed( '2019-07-23', array( 11, 12, 13 ), false );
		$appointments[] = $this->get_appointment_option_closed();
		return $appointments;
	}

	private function remove_date_or_times( $date, $time, $appointments ) {
		$listTable = new APK_Appointment_List_Table();
		$reflector = new ReflectionObject( $listTable );
		$method    = $reflector->getMethod( 'remove_date_or_times' );
		$method->setAccessible( true );
		return $method->invoke( $listTable, $date, $time, $appointments );
	}

	public function test_table_data() {
		$listTable      = new APK_Appointment_List_Table();
		$appointments   = array();
		$appointments[] = $this->get_appointment_option_not_closed( '2015-04-22', array( 14, 15, 16 ), false );
		$appointments[] = $this->get_appointment_option_closed();

		$reflector = new ReflectionObject( $listTable );
		$method    = $reflector->getMethod( 'table_data' );
		$method->setAccessible( true );
		$dataModel = $method->invoke( $listTable, $appointments );

		$this->assertEquals( 4, count( $dataModel ) );
		$this->assertThatAppointmentOptionTransformedToTableDisplayRows( $dataModel[0], '2015-04-22', 14, 'NO' );
		$this->assertThatAppointmentOptionTransformedToTableDisplayRows( $dataModel[1], '2015-04-22', 15, 'NO' );
		$this->assertThatAppointmentOptionTransformedToTableDisplayRows( $dataModel[2], '2015-04-22', 16, 'NO' );
		$this->assertThatAppointmentOptionTransformedToTableDisplayRows( $dataModel[3], '2015-04-23', null, 'YES' );
	}

	private function assertThatAppointmentOptionTransformedToTableDisplayRows( $actualAppointment, $expectedDate, $expectedTime, $expectedClosed ) {
		$this->assertEquals( $expectedDate, $actualAppointment[ APK_Appointment_List_Table::COLUMN_DATE ] );
		$this->assertEquals( $expectedTime, $actualAppointment[ APK_Appointment_List_Table::COLUMN_TIME ] );
		$this->assertEquals( $expectedClosed, $actualAppointment[ APK_Appointment_List_Table::COLUMN_CLOSED ] );
	}

	private function assertAppointmentTimesKeyGivesCorrectDisplayValue( $key, $display_value ) {
		$listTable   = new APK_Appointment_List_Table();
		$appointment = $this->get_appointment_not_closed();
		$appointment[ APK_Appointment_List_Table::COLUMN_TIME ] = $key;
		$timeColumnDisplayValue                                 = $listTable->column_default( $appointment, APK_Appointment_List_Table::COLUMN_TIME );
		$this->assertEquals( $display_value, $timeColumnDisplayValue );
	}

	private function assertAppointmentPartsEquals( $expected_date, $expected_times, $expected_closed, $actual_appointment ) {
		$this->assertEquals( $expected_date, $actual_appointment['date'] );
		$this->assertEquals( $expected_times, $actual_appointment['times'] );
		$this->assertEquals( $expected_closed, $actual_appointment['closed'] );
	}

	private function get_appointment_not_closed( $date = '2015-04-22', $time = 16, $closed = 'NO' ) {
		$wpOptionAppointment[ APK_Appointment_List_Table::COLUMN_DATE ]   = $date;
		$wpOptionAppointment[ APK_Appointment_List_Table::COLUMN_TIME ]   = $time;
		$wpOptionAppointment[ APK_Appointment_List_Table::COLUMN_CLOSED ] = $closed;
		return $wpOptionAppointment;
	}

	private function get_appointment_closed() {
		$wpOptionAppointment[ APK_Appointment_List_Table::COLUMN_DATE ]   = '2015-04-23';
		$wpOptionAppointment[ APK_Appointment_List_Table::COLUMN_CLOSED ] = 'YES';
		return $wpOptionAppointment;
	}

	private function get_appointment_option_not_closed( $date = '2015-04-22', $times = array( 16 ), $closed = false ) {
		$wpOptionAppointment['date']   = $date;
		$wpOptionAppointment['times']  = $times;
		$wpOptionAppointment['closed'] = $closed;
		return $wpOptionAppointment;
	}

	private function get_appointment_option_closed() {
		$wpOptionAppointment['date']   = '2015-04-23';
		$wpOptionAppointment['times']  = array();
		$wpOptionAppointment['closed'] = true;
		return $wpOptionAppointment;
	}
}
