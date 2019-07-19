<?php
// fwrite(STDERR, print_r($generatedJson, TRUE));

use APK\Appointments\ListTable;

$GLOBALS['hook_suffix'] = 'x';
class ListTableTest extends WP_UnitTestCase
{
	/**
	 * A single example test.
	 */
	public function test_sample() {
        // Replace this with some actual testing code.
        
        $listTable = new ListTable();

        // ["d"]=> string(10) "2015-04-22" ["t"]=> string(2) "16" ["c"]=> string(2) "NO"
        $wpOptionAppointment['d'] = '2015-04-22';
        $wpOptionAppointment['t'] = 16;
        $wpOptionAppointment['c'] = 'NO';

        $expectedHtml = '<input type="checkbox" name="appointment[2015-04-22,16,NO]" value="" />';
        $actualHtml = $listTable->column_cb($wpOptionAppointment);
        
        $this->assertEquals($expectedHtml, $actualHtml);
	}
}
