<?php
/**
 * Created by IntelliJ IDEA.
 * User: andy
 * Date: 19/4/15
 * Time: 14:55
 */
namespace APK\Appointments;

if ( ! class_exists( 'WP_List_Table' ) ) {
	require_once( ABSPATH . 'wp-admin/includes/class-wp-list-table.php' );
}

use WP_List_Table;

/**
 * Create a new table class that will extend the WP_List_Table
 * @property mixed _column_headers
 */
class ListTable extends WP_List_Table
{

    function __construct(){
        //Set parent defaults
        parent::__construct( array(
            'singular'  => 'appointment',     //singular name of the listed records
            'plural'    => 'appointments',    //plural name of the listed records
            'ajax'      => false              //does this table support ajax?
        ) );

    }


    /**
     * Prepare the items for the table to process
     *
     * @return Void
     */
    public function prepare_items()
    {
        $columns = $this->get_columns();
        $hidden = $this->get_hidden_columns();
        $sortable = $this->get_sortable_columns();

        $data = $this->table_data();
        usort($data, array(&$this, 'sort_data'));

        $this->_column_headers = array($columns, $hidden, $sortable);
        $this->items = $data;

        $this->process_bulk_action();

    }

    /**
     * Override the parent columns method. Defines the columns to use in your listing table
     *
     * @return Array
     */
    public function get_columns()
    {
        $columns = array(
            'cb' => '<input type="checkbox" />',
            'd' => 'Date',
            't' => 'Time',
            'c' => 'Closed?'
        );

        return $columns;
    }

    public function column_d($item)
    {
        $actions = array('delete' => sprintf('<a href="?page=%s&action=%s&date=%s&time=%s">Delete</a>', $_REQUEST['page'], 'delete', $item['d'], $item['t']));
        return sprintf('%1$s %2$s', $item['d'], $this->row_actions($actions));
    }

    /**
     * Define which columns are hidden
     *
     * @return Array
     */
    public function get_hidden_columns()
    {
        return array();
    }

    /**
     * Define the sortable columns
     *
     * @return Array
     */
    public function get_sortable_columns()
    {
        return array('d' => array('d', false));
    }

    /**
     * Get the table data
     *
     * @return Array
     */
    private function table_data()
    {
        $appointments = get_option('apk_appointments_options');

        $data_model = array();

        foreach ($appointments as $appointment) {

            $appointment_date = $appointment['date'];
            $shop_closed = $appointment['closed'];

            $table_appointment = array();

            if (!$shop_closed) {
                $appointment_times = $appointment['times'];
                foreach ($appointment_times as $time) {
                    $table_appointment['d'] = $appointment_date;
                    $table_appointment['t'] = $time;
                    $table_appointment['c'] = 'NO';
                    $data_model[] = $table_appointment;
                }
            }
            else {
                $table_appointment['d'] = $appointment_date;
                $table_appointment['t'] = '';
                $table_appointment['c'] = 'YES';
                $data_model[] = $table_appointment;
            }
        }

        return $data_model;
    }

    function get_bulk_actions()
    {
        $actions = array();
        $actions['delete'] = '<a href="#">'.__( 'Delete' ).'</a>';

        return $actions;
    }

    function column_cb($item)
    {
        /*
         * array(3) { ["d"]=> string(10) "2015-04-22" ["t"]=> string(2) "16" ["c"]=> string(2) "NO" }
         */
        var_dump($item);
//        return sprintf(
//            '<input type="checkbox" name="appointment[]" value="%1$s|%2$s|%3$s" />',
//            $item['d'],$item['t'],$item['c']);
        return sprintf(
            '<input type="checkbox" name="%1$s[]" value="%2$s" />',
            /*$1%s*/ $this->_args['singular'],  //Let's simply repurpose the table's singular label ("video")
            /*$2%s*/ $item->id             //The value of the checkbox should be the record's id
        );

        /*
         *
         *         $actions = array('delete' => sprintf('<a href="?page=%s&action=%s&date=%s&time=%s">Delete</a>', $_REQUEST['page'], 'delete', $item['d'], $item['t']));
        return sprintf('%1$s %2$s', $item['d'], $this->row_actions($actions));
         */
    }

    function process_bulk_action() {

        // security check!
        if ( isset( $_POST['_wpnonce'] ) && ! empty( $_POST['_wpnonce'] ) ) {

            $nonce  = filter_input( INPUT_POST, '_wpnonce', FILTER_SANITIZE_STRING );
            $action = 'bulk-' . $this->_args['plural'];

            if ( ! wp_verify_nonce( $nonce, $action ) ) {
                wp_die( 'Nope! Security check failed!' );
            }

        }

        $action = $this->current_action();

        switch ( $action ) {

            case 'delete':
                wp_die( 'Delete something' );
                break;

            case 'save':
                wp_die( 'Save something' );
                break;

            default:
                // do nothing or something else
                return;
                break;
        }



    }


    /**
     * Define what data to show on each column of the table
     *
     * @param  Array $item        Data
     * @param  String $column_name - Current column name
     *
     * @return Mixed
     */
    public function column_default($item, $column_name)
    {
        switch ($column_name) {
            case 'cb':
                return '';
            case 'd':
                return $item[$column_name];
            case 't':
                return $this->time_description($item[$column_name]);
            case 'c':
                return $item[$column_name];
            default:
                return print_r($item, true);
        }
    }

    public function time_description($time_value)
    {
        // 9AM => 8PM
        $times = array(
            "9" => "9 AM",
            "10" => "10 AM",
            "11" => "11 AM",
            "12" => "12 PM",
            "13" => "1 PM",
            "14" => "2 PM",
            "15" => "3 PM",
            "16" => "4 PM",
            "17" => "5 PM",
            "18" => "6 PM",
            "19" => "7 PM",
            "20" => "8 PM",
        );

        return $times[$time_value];
    }

    /**
     * Allows you to sort the data by the variables set in the $_GET
     *
     * @return Mixed
     */
    private function sort_data($a, $b)
    {
        // Set defaults
        $orderby = 'd';
        $order = 'asc';

        // If orderby is set, use this as the sort column
        if (!empty($_GET['orderby'])) {
            $orderby = $_GET['orderby'];
        }

        // If order is set use this as the order
        if (!empty($_GET['order'])) {
            $order = $_GET['order'];
        }

        $result = strnatcmp($a[$orderby], $b[$orderby]);

        if ($order === 'asc') {
            return $result;
        }

        return -$result;
    }
}