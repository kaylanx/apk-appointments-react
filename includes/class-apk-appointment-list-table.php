<?php
/**
 * User: andy
 * Date: 19/4/15
 * Time: 14:55
 *
 * @package APK_Appointments
 */

if ( ! class_exists( 'WP_List_Table' ) ) {
	require_once ABSPATH . 'wp-admin/includes/class-wp-list-table.php';
}

/**
 * Create a new table class that will extend the WP_List_Table
 *
 * @property mixed _column_headers
 */
class APK_Appointment_List_Table extends WP_List_Table {

	const PLUGIN_HOME_URI      = '/wp-admin/admin.php?page=apk-appointments';
	const APPOINTMENT_SINGULAR = 'appointment';
	const APPOINTMENT_PLURAL   = 'appointments';

	const COLUMN_CHECKBOX = 'cb';
	const COLUMN_DATE     = 'd';
	const COLUMN_TIME     = 't';
	const COLUMN_CLOSED   = 'c';

	/**
	 * Creates the list table instance.
	 */
	public function __construct() {
		// Set parent defaults.
		parent::__construct(
			array(
				'singular' => self::APPOINTMENT_SINGULAR,     // singular name of the listed records.
				'plural'   => self::APPOINTMENT_PLURAL,    // plural name of the listed records.
				'ajax'     => false,              // does this table support ajax?
			)
		);
	}

	/**
	 * Prepare the items for the table to process
	 */
	public function prepare_items() {
		$columns  = $this->get_columns();
		$hidden   = $this->get_hidden_columns();
		$sortable = $this->get_sortable_columns();

		$this->process_action();

		$appointments = get_option( APK_APPOINTMENTS_OPTION );
		$data         = $this->table_data( $appointments );
		usort( $data, array( &$this, 'sort_data' ) );

		wp_create_nonce( 'apk-bulk-delete' );

		$this->_column_headers = array( $columns, $hidden, $sortable );
		$this->items           = $data;

	}

	/**
	 * Override the parent columns method. Defines the columns to use in your listing table
	 *
	 * @return Array
	 */
	public function get_columns() {
		$columns = array(
			self::COLUMN_CHECKBOX => '<input type="checkbox" />',
			self::COLUMN_DATE     => 'Date',
			self::COLUMN_TIME     => 'Time',
			self::COLUMN_CLOSED   => 'Closed?',
		);

		return $columns;
	}

	/**
	 * Define which columns are hidden
	 *
	 * @return Array
	 */
	public function get_hidden_columns() {
		return array();
	}

	/**
	 * Define what data to show on each column of the table
	 *
	 * @param  Array  $item        Data.
	 * @param  String $column_name - Current column name.
	 *
	 * @return Mixed
	 */
	public function column_default( $item, $column_name ) {

		if ( ! array_key_exists( $column_name, $item ) ) {
			return '';
		}

		switch ( $column_name ) {
			case self::COLUMN_DATE:
				return $item[ $column_name ];
			case self::COLUMN_TIME:
				return $this->time_description( $item[ $column_name ] );
			case self::COLUMN_CLOSED:
				return $item[ $column_name ];
			default:
				return '';
		}
	}

	/**
	 * Returns the html for the checkbox column.
	 *
	 * @param Array $row The table data.
	 *
	 * @return string The html for the checkbox.
	 */
	public function column_cb( $row ) {
		return sprintf(
			'<input type="checkbox" name="%1$s[]" value="%2$s,%3$s,%4$s" />',
			/*$1%s*/ $this->_args['singular'],
			/*$2%s*/ $row[ self::COLUMN_DATE ],
			/*$3%s*/ $row[ self::COLUMN_TIME ],
			/*$4%s*/ $row[ self::COLUMN_CLOSED ]
		);
	}

	/**
	 * Returns the html for the date column.
	 *
	 * @param Array $row The table data.
	 *
	 * @return string The html for the checkbox.
	 */
	public function column_d( $row ) {
		$delete_nonce = wp_create_nonce( 'delete' );
		$title        = '<strong>' . $row[ self::COLUMN_DATE ] . '</strong>';
		$actions      = array(
			'delete' => sprintf(
				'<a href="?page=%s&action=%s&date=%s&time=%s&_wpnonce=%s">Delete</a>',
				$this->get_param( 'page' ),
				'delete',
				$row[ self::COLUMN_DATE ],
				absint( $row[ self::COLUMN_TIME ] ),
				$delete_nonce
			),
		);
		return $title . $this->row_actions( $actions );
	}


	/**
	 * Safely gets the request param, unslashes and sanitizes
	 *
	 * @param string $param_name The parameter name to find in $_GET.
	 *
	 * @return string The sanitized unslashed string in $_GET[$param_name] or '' if it isn't present.
	 */
	private function get_param( $param_name ) {

		if ( isset( $_GET[ $param_name ] ) ) {
			return sanitize_text_field( wp_unslash( $_GET[ $param_name ] ) );
		}

		return '';
	}

	/**
	 * Define the sortable columns
	 *
	 * @return Array
	 */
	public function get_sortable_columns() {
		return array( self::COLUMN_DATE => array( self::COLUMN_DATE, false ) );
	}

	/**
	 * Get the table data
	 *
	 * @param Array $appointments The appointments.
	 *
	 * @return Array
	 */
	private function table_data( $appointments ) {
		$data_model = array();

		foreach ( $appointments as $appointment ) {

			$appointment_date = $appointment['date'];
			$shop_closed      = $appointment['closed'];

			$table_appointment = array();

			if ( ! $shop_closed ) {
				$appointment_times = $appointment['times'];
				foreach ( $appointment_times as $time ) {
					$data_model[] = $this->create_appointment( $appointment_date, $time, 'NO' );
				}
			} else {
				$data_model[] = $this->create_appointment( $appointment_date, '', 'YES' );
			}
		}

		return $data_model;
	}

	/**
	 * Given a date, time and closed boolean, creates a dictionary that can be used as a datamodel for
	 * the list table.
	 *
	 * @param string  $date The date of the appointment in 'yyyy-mm-dd' format.
	 * @param string  $time The hour of the appointment in 24 hour format, e.g. 14 signifies 2pm will be blank if closed is set.
	 * @param boolean $closed Whether there are no appointments on that day because the shop is closed.  Will be false if there is a time set.
	 *
	 * @return Array
	 */
	private function create_appointment( $date, $time, $closed ) {
		$table_appointment[ self::COLUMN_DATE ]   = $date;
		$table_appointment[ self::COLUMN_TIME ]   = $time;
		$table_appointment[ self::COLUMN_CLOSED ] = $closed;
		return $table_appointment;
	}

	/**
	 * Get an associative array ( option_name => option_title ) with the list
	 * of bulk actions available on this table.
	 *
	 * @return array
	 */
	protected function get_bulk_actions() {
		$actions = array(
			'bulk-delete' => 'Delete',
		);

		return $actions;
	}

	/**
	 * Process any actions there are on the request.
	 */
	private function process_action() {
		$this->process_single_delete();
		$this->process_bulk_delete();
		$this->process_add_new();
	}

	/**
	 * Date the appointment that is on the request.
	 */
	private function process_single_delete() {
		if ( 'delete' === $this->current_action() ) {
			if ( $this->check_nonce( 'action', 'delete' ) || $this->check_nonce( 'action2', 'delete' ) ) {
				if ( isset( $_GET['date'], $_GET['time'] ) ) {
					$this->delete_appointment( sanitize_text_field( wp_unslash( $_GET['date'] ) ), absint( wp_unslash( $_GET['time'] ) ) );

					$escaped_url = esc_url_raw( self::PLUGIN_HOME_URI );
					wp_safe_redirect( $escaped_url );
					exit;
				}
			}
		}
	}
	/**
	 * TEST DATA
	 * a:4:{i:0;a:3:{s:4:"date";s:10:"2020-03-23";s:5:"times";a:1:{i:0;i:13;}s:6:"closed";b:0;}i:1;a:3:{s:4:"date";s:10:"2020-03-18";s:5:"times";a:1:{i:0;i:16;}s:6:"closed";b:0;}i:2;a:3:{s:4:"date";s:10:"2020-03-17";s:5:"times";a:1:{i:0;i:13;}s:6:"closed";b:0;}i:3;a:3:{s:4:"date";s:10:"2020-03-28";s:5:"times";a:0:{}s:6:"closed";b:1;}}
	 */
	private function process_bulk_delete() {
		if ( 'bulk-delete' === $this->current_action() ) {
			if ( $this->check_nonce( 'action', 'bulk-delete' )
			|| $this->check_nonce( 'action2', 'bulk-delete' ) ) {
				$appointments_to_delete = $this->get_post_param_with_nonce_check( 'appointment', 'bulk-' . $this->_args['plural'] );
				$appointments           = get_option( APK_APPOINTMENTS_OPTION );

				foreach ( $appointments_to_delete as $string_appointment ) {
					$appointment_to_delete = explode( ',', $string_appointment );
					$appointments          = $this->remove_date_or_times( $appointment_to_delete[0], absint( $appointment_to_delete[1] ), $appointments );
				}

				$updated = update_option( APK_APPOINTMENTS_OPTION, $appointments );

				wp_safe_redirect( esc_url_raw( self::PLUGIN_HOME_URI ) );
				exit();
			}
		}
	}

	/**
	 * Add new appointment
	 */
	private function process_add_new() {
		if ( 'update' === $this->current_action() ) {
			$appointment_to_add = $this->get_post_param_with_nonce_check( 'apk_appointments_options', 'apk_appointments_option_group-options' );

			if ( isset( $appointment_to_add['appointment_date'] ) && isset( $appointment_to_add['appointment_time'] ) ) {

				$appointments = get_option( APK_APPOINTMENTS_OPTION );

				$appointment_date = sanitize_text_field( $appointment_to_add['appointment_date'] );
				$appointment_time = (int) sanitize_text_field( $appointment_to_add['appointment_time'] );
				$shop_closed      = 'on' === sanitize_text_field( $appointment_to_add['shop_closed'] ) ? true : false;

				foreach ( $appointments as $index => $appointment ) {
					if ( $appointment['date'] === $appointment_date ) {
						$existing_appointment = $appointment;
						$existing_index       = $index;
						break;
					}
				}

				// adding a new time to an existing date...
				if ( isset( $existing_appointment ) && isset( $existing_index ) ) {
					$existing_appointment['closed'] = $shop_closed;

					if ( $shop_closed ) {
						$existing_appointment['times'] = array();
					} else {
						$existing_appointment['times'][] = $appointment_time;
					}
					$appointments[ $existing_index ] = $existing_appointment;
				} else {
					// Adding a new date and time.
					$new_appointment['date']   = $appointment_date;
					$new_appointment['times']  = array( $appointment_time );
					$new_appointment['closed'] = $shop_closed;

					if ( $shop_closed ) {
						$new_appointment['times'] = array();
					}

					$appointments[] = $new_appointment;
				}

				$updated = update_option( APK_APPOINTMENTS_OPTION, $appointments );
			}
		}

	}

	/**
	 * Checks the nonce for function apk_delete_appointment, verifies that $value === $_POST[$key]
	 *
	 * @param string $key a key in the $_POST global.
	 * @param string $value a value we want to check from the $_POST specified by the key.
	 */
	private function check_nonce( $key, $value ) {
		$nonce_value = 'delete' === $value ? $value : 'bulk-' . $this->_args['plural'];
		return isset( $_REQUEST['_wpnonce'] ) && wp_verify_nonce( sanitize_key( $_REQUEST['_wpnonce'] ), $nonce_value ) && ( isset( $_REQUEST[ $key ] ) && $value === $_REQUEST[ $key ] );
	}

	/**
	 * Gets the sanitized value for a parameter for key includes a nonce check first.
	 *
	 * @param string $key The key of the parameter name.
	 * @param string $value a value we want to check from the $_POST specified by the key.
	 * @return array
	 */
	private function get_post_param_with_nonce_check( $key, $value ) {
		return isset( $_REQUEST['_wpnonce'] ) && wp_verify_nonce( sanitize_key( $_REQUEST['_wpnonce'] ), $value )
		&& isset( $_POST[ $key ] ) ? esc_sql( array_map( 'sanitize_text_field', wp_unslash( $_POST[ $key ] ) ) ) : array();
	}

	/**
	 * Deletes an appointment for a given date and time.
	 *
	 * @param string $date the date we want to delete.
	 * @param string $time the time on the date we want to delete.
	 */
	private function delete_appointment( $date, $time ) {
		$appointments = get_option( APK_APPOINTMENTS_OPTION );
		$appointments = $this->remove_date_or_times( $date, $time, $appointments );
		update_option( APK_APPOINTMENTS_OPTION, $appointments );
	}

	/**
	 * Removes the passed in $date and $time from the $appointments array.
	 *
	 * @param string $date the date we want to delete.
	 * @param string $time the time on the date we want to delete.
	 * @param array  $appointments the array of appointments we want to remove the appointment from.
	 */
	private function remove_date_or_times( $date, $time, $appointments ) {

		foreach ( $appointments as $index => $appointment ) {
			if ( $appointment['date'] === $date ) {
				$times = $appointment['times'];
				if ( $appointment['closed'] || count( $times ) === 1 ) {
					array_splice( $appointments, $index, 1 );
				} else {
					foreach ( $times as $time_index => $saved_time ) {
						if ( $saved_time === $time ) {
							array_splice( $times, $time_index, 1 );
							$appointment['times']   = $times;
							$appointments[ $index ] = $appointment;
							break;
						}
					}
				}
			}
		}

		return array_filter( $appointments );
	}


	/**
	 * Given a single or two digit number that represents an hour in 24 hour format, return a user friendly
	 * string for that number.  For example, if we ask for 9 then "9 AM" is returned, if we ask for 14 then 2 PM is returned.
	 *
	 * @param string $time_value The value of the time we want the user friendly string for.
	 */
	private function time_description( $time_value ) {
		$times = array(
			'9'  => '9 AM',
			'10' => '10 AM',
			'11' => '11 AM',
			'12' => '12 PM',
			'13' => '1 PM',
			'14' => '2 PM',
			'15' => '3 PM',
			'16' => '4 PM',
			'17' => '5 PM',
			'18' => '6 PM',
			'19' => '7 PM',
			'20' => '8 PM',
		);

		if ( array_key_exists( $time_value, $times ) ) {
			return $times[ $time_value ];
		}
		return '';
	}

	/**
	 * Allows you to sort the data by the variables set in the $_GET
	 *
	 * @param array $a column data passed in by the WP_List_Table.
	 * @param array $b column data passed in by the WP_List_Table.
	 * @return Mixed
	 */
	private function sort_data( $a, $b ) {
		// Set defaults.
		$orderby = self::COLUMN_DATE;
		$order   = 'asc';

		// If orderby is set, use this as the sort column.
		if ( ! empty( $this->get_param( 'orderby' ) ) ) {
			$orderby = $this->get_param( 'orderby' );
		}

		// If order is set use this as the order.
		if ( ! empty( $this->get_param( 'order' ) ) ) {
			$order = $this->get_param( 'order' );
		}

		$result = strnatcmp( $a[ $orderby ], $b[ $orderby ] );

		if ( 'asc' === $order ) {
			return $result;
		}

		return -$result;
	}
}
