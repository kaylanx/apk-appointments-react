<?php
// fwrite(STDERR, print_r($generatedJson, TRUE));

use APK\Appointments\ListTable;

$GLOBALS['hook_suffix'] = 'x';
class ListTableTest extends WP_UnitTestCase
{
    public function test_when_checkbox_column_is_rendered_then_checkbox_html_returned() {
        $listTable = new ListTable();

        $wpOptionAppointment[ListTable::COLUMN_DATE] = '2015-04-22';
        $wpOptionAppointment[ListTable::COLUMN_TIME] = 16;
        $wpOptionAppointment[ListTable::COLUMN_CLOSED] = 'NO';

        $expectedHtml = '<input type="checkbox" name="appointment[2015-04-22,16,NO]" value="" />';
        $actualHtml = $listTable->column_cb($wpOptionAppointment);

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
}
