<?php
// fwrite(STDERR, print_r($generatedJson, TRUE));

use APK\Appointments\ListTable;

$GLOBALS['hook_suffix'] = 'x';
class ListTableTest extends WP_UnitTestCase
{
    public function test_when_checkbox_column_is_rendered_then_checkbox_html_returned() {
        $listTable = new ListTable();
        $expectedHtml = '<input type="checkbox" name="appointment[2015-04-22,16,NO]" value="" />';
        $actualHtml = $listTable->column_cb($this->get_appointment_not_closed());

        $this->assertEquals($expectedHtml, $actualHtml);
    }

    public function test_when_get_columns_called_column_names_are_correct() {
        $listTable = new ListTable();
        $columns = $listTable->get_columns();
        $this->assertEquals(4, count($columns));
        $this->assertTrue(array_key_exists(ListTable::COLUMN_CHECKBOX, $columns));
        $this->assertTrue(array_key_exists(ListTable::COLUMN_DATE, $columns));
        $this->assertTrue(array_key_exists(ListTable::COLUMN_TIME, $columns));
        $this->assertTrue(array_key_exists(ListTable::COLUMN_CLOSED, $columns));

        $this->assertEquals('<input type="checkbox" />', $columns[ListTable::COLUMN_CHECKBOX]);
        $this->assertEquals('Date', $columns[ListTable::COLUMN_DATE]);
        $this->assertEquals('Time', $columns[ListTable::COLUMN_TIME]);
        $this->assertEquals('Closed?', $columns[ListTable::COLUMN_CLOSED]);
    }

    public function test_there_are_no_hidden_columns() {
        $listTable = new ListTable();
        $this->assertEquals(0, count($listTable->get_hidden_columns()));
    }

    public function test_column_values_for_checkbox() {
        $listTable = new ListTable();
        $checkBoxColumnDisplayValue = $listTable->column_default($this->get_appointment_not_closed(), ListTable::COLUMN_CHECKBOX);
        $this->assertEquals('', $checkBoxColumnDisplayValue);
    }

    public function test_column_values_for_date() {
        $listTable = new ListTable();
        $dateColumnDisplayValue = $listTable->column_default($this->get_appointment_not_closed(), ListTable::COLUMN_DATE);
        $this->assertEquals('2015-04-22', $dateColumnDisplayValue);
    }

    public function test_column_values_for_closed_when_not_closed() {
        $listTable = new ListTable();
        $closedColumnDisplayValue = $listTable->column_default($this->get_appointment_not_closed(), ListTable::COLUMN_CLOSED);
        $this->assertEquals('NO', $closedColumnDisplayValue);
    }

    public function test_column_values_for_closed_when_closed() {
        $listTable = new ListTable();
        $closedColumnDisplayValue = $listTable->column_default($this->get_appointment_closed(), ListTable::COLUMN_CLOSED);
        $this->assertEquals('YES', $closedColumnDisplayValue);
    }

    public function test_column_values_for_time_when_closed() {
        $listTable = new ListTable();
        $timeColumnDisplayValue = $listTable->column_default($this->get_appointment_closed(), ListTable::COLUMN_TIME);
        $this->assertEquals('', $timeColumnDisplayValue);
    }

    public function test_column_values_for_time_when_appointment_at_8_then_empty_string() {
        $this->assertAppointmentTimesKeyGivesCorrectDisplayValue('8', '');
    }

    public function test_column_values_for_time_when_appointment_exists_then_return_with_AM_or_PM() {
        $this->assertAppointmentTimesKeyGivesCorrectDisplayValue('9', '9 AM');
        $this->assertAppointmentTimesKeyGivesCorrectDisplayValue('10', '10 AM');
        $this->assertAppointmentTimesKeyGivesCorrectDisplayValue('11', '11 AM');
        $this->assertAppointmentTimesKeyGivesCorrectDisplayValue('12', '12 PM');
        $this->assertAppointmentTimesKeyGivesCorrectDisplayValue('13', '1 PM');
        $this->assertAppointmentTimesKeyGivesCorrectDisplayValue('14', '2 PM');
        $this->assertAppointmentTimesKeyGivesCorrectDisplayValue('15', '3 PM');
        $this->assertAppointmentTimesKeyGivesCorrectDisplayValue('16', '4 PM');
        $this->assertAppointmentTimesKeyGivesCorrectDisplayValue('17', '5 PM');
        $this->assertAppointmentTimesKeyGivesCorrectDisplayValue('18', '6 PM');
        $this->assertAppointmentTimesKeyGivesCorrectDisplayValue('19', '7 PM');
        $this->assertAppointmentTimesKeyGivesCorrectDisplayValue('20', '8 PM');
    }

    public function test_table_data() {
        $listTable = new ListTable();
        $appointments = array();
        $appointments[] = $this->get_appointment_option_not_closed();
        $appointments[] = $this->get_appointment_option_closed();
        
        $reflector = new ReflectionObject($listTable);
        $method = $reflector->getMethod('table_data');
        $method->setAccessible(true);
        $dataModel = $method->invoke($listTable, $appointments);

        var_dump($dataModel);
        $this->assertEquals(['TODO'],$dataModel);
    }

    private function assertAppointmentTimesKeyGivesCorrectDisplayValue($key, $display_value) {
        $listTable = new ListTable();
        $appointment = $this->get_appointment_not_closed();
        $appointment[ListTable::COLUMN_TIME] = $key;
        $timeColumnDisplayValue = $listTable->column_default($appointment, ListTable::COLUMN_TIME);
        $this->assertEquals($display_value, $timeColumnDisplayValue);
    }

    private function get_appointment_not_closed() {
        $wpOptionAppointment[ListTable::COLUMN_DATE] = '2015-04-22';
        $wpOptionAppointment[ListTable::COLUMN_TIME] = 16;
        $wpOptionAppointment[ListTable::COLUMN_CLOSED] = 'NO';
        return $wpOptionAppointment;
    }

    private function get_appointment_closed() {
        $wpOptionAppointment[ListTable::COLUMN_DATE] = '2015-04-22';
        $wpOptionAppointment[ListTable::COLUMN_CLOSED] = 'YES';
        return $wpOptionAppointment;
    }


    private function get_appointment_option_not_closed() {
        $wpOptionAppointment['date'] = '2015-04-22';
        $wpOptionAppointment['times'] = [16];
        $wpOptionAppointment['closed'] = false;
        return $wpOptionAppointment;
    }

    private function get_appointment_option_closed() {
        $wpOptionAppointment['date'] = '2015-04-22';
        $wpOptionAppointment['times'] = [];
        $wpOptionAppointment['closed'] = true;
        return $wpOptionAppointment;
    }
}
