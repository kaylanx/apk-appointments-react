<?php
/**
 * User: Andy Kayley
 * Date: 28/6/20
 * Time: 16:00:28
 *
 * @package     APK_Appointments
 */

/**
 * Appointment Settings
 */
class APK_Appointments_Settings {

	/**
	 * Constructor for the class
	 */
	public function __construct() {
		// Add Settings and Fields.
		add_action( 'admin_init', array( $this, 'setup_sections' ) );
		add_action( 'admin_init', array( $this, 'setup_fields' ) );
	}

	/**
	 * Lack of php / WordPress knowledge, this is called from apk-appointments.php for a reason I don't
	 * know why.
	 */
	public function display() {
	}

	/**
	 * Draw the form
	 */
	public function apk_appointment_settings_form() {?>
		<div class="wrap">
			<h2>APK Appointments Settings</h2>
			<?php
			if ( isset( $_GET['settings-updated'] ) && $_GET['settings-updated'] ) {
				$this->admin_notice();
			}
			?>
			<form method="POST" action="options.php">
				<?php
					settings_fields( APK_APPOINTMENTS_SETTINGS_FIELDS );
					do_settings_sections( APK_APPOINTMENTS_SETTINGS_FIELDS );
					submit_button();
				?>
			</form>
		</div> 
		<?php
	}

	/**
	 * Called when settings are updated.
	 */
	public function admin_notice() {
		?>
		<div class="notice notice-success is-dismissible">
			<p>Your settings have been updated!</p>
		</div>
		<?php
	}

	/**
	 * Adds the settings sections
	 */
	public function setup_sections() {
		add_settings_section( 'display_format_section', 'Display Settings', array( $this, 'section_callback' ), APK_APPOINTMENTS_SETTINGS_FIELDS );
		add_settings_section( 'appointment_availability_section', 'Appointment Availablity', array( $this, 'section_callback' ), APK_APPOINTMENTS_SETTINGS_FIELDS );
	}

	/**
	 * Callback for the settings sections.
	 *
	 * @param Array associative array containging details fo the sections.
	 */
	public function section_callback( $arguments ) {
		switch ( $arguments['id'] ) {
			case 'display_format_section':
				echo 'Controls for various display settings';
				break;
			case 'appointment_availability_section':
				echo 'Set appointment availability and optional fees to be displayed';
				break;
		}
	}

	/**
	 * Draws the day check boxes.
	 */
	public function create_day_checkboxes_array() {

		$days_of_the_week['monday']    = 'Monday';
		$days_of_the_week['tuesday']   = 'Tuesday';
		$days_of_the_week['wednesday'] = 'Wednesday';
		$days_of_the_week['thursday']  = 'Thursday';
		$days_of_the_week['friday']    = 'Friday';
		$days_of_the_week['saturday']  = 'Saturday';
		$days_of_the_week['sunday']    = 'Sunday';

		$checkbox_day_array = array();

		foreach ( $days_of_the_week as $key => $value ) {
			$checkbox_day_array[] = array(
				'uid'     => "apk_${key}_appointment_availability",
				'uid_fee' => "apk_${key}_appointment_fee",
				'label'   => "$value",
				'section' => 'appointment_availability_section',
				'type'    => 'time_fee',
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
			);
		}

		return $checkbox_day_array;
	}

	/**
	 * Sets up the fields based and registers them with WordPress.
	 */
	public function setup_fields() {
		$fields = $this->merge_checkboxes_with_rest_of_fields( $this->create_day_checkboxes_array() );

		foreach ( $fields as $field ) {
			add_settings_field( $field['uid'], $field['label'], array( $this, 'field_callback' ), APK_APPOINTMENTS_SETTINGS_FIELDS, $field['section'], $field );
			register_setting( APK_APPOINTMENTS_SETTINGS_FIELDS, $field['uid'] );
			if ( 'time_fee' === $field['type'] ) {
				register_setting( APK_APPOINTMENTS_SETTINGS_FIELDS, $field['uid_fee'] );
			}
		}
	}

	/**
	 * Merges the passed in array with the array from $this->create_day_checkboxes_array()
	 *
	 * @param Array $checkbox_fields list of checkbox fields.
	 */
	public function merge_checkboxes_with_rest_of_fields( $checkbox_fields ) {
		$fields = array(
			array(
				'uid'     => APK_APPOINTMENTS_TIME_DISPLAY_FORMAT,
				'label'   => 'Time Display Format',
				'section' => 'display_format_section',
				'type'    => 'select',
				'options' => array(
					'24' => '24 Hour',
					'12' => '12 Hour',
				),
			),
		);

		$merged_fields = array_merge( $fields, $this->create_day_checkboxes_array() );
		return $merged_fields;
	}

	/**
	 * If the time value is in the $option array mark it as checked.
	 *
	 * @param $option the WordPress option that may contain $time.
	 * @param time that may appear in the                  $option array.
	 */
	public function time_checked( $option, $time ) {
		return checked( $option[ array_search( strval( $time ), $option, true ) ], $time, false );
	}

	/**
	 * Gets the fee, the $option is the fee option and the index is the index we want for the array.
	 *
	 * @param $option the array.
	 * @param $index of the option we want.
	 */
	public function get_fee_for_time( $option, $index ) {
		return $option[ $index ];
	}

	public function field_callback( $arguments ) {

		$value = get_option( $arguments['uid'] );

		switch ( $arguments['type'] ) {
			case 'select':
				$this->render_select( $arguments, $value );
				break;
			case 'time_fee':
				$fee_value = get_option( $arguments['uid_fee'] );

				$this->render_time_fee( $arguments, $value, $fee_value );
				break;
		}
	}

	private function render_select( $arguments, $value ) {
		if ( ! empty( $arguments['options'] ) && is_array( $arguments['options'] ) ) {
			$attributes     = '';
			$options_markup = '';
			foreach ( $arguments['options'] as $key => $label ) {
				$options_markup .= sprintf( '<option value="%s" %s>%s</option>', $key, selected( $value[ array_search( $key, $value, true ) ], $key, false ), $label );
			}
			if ( 'multiselect' === $arguments['type'] ) {
				$attributes = ' multiple="multiple" ';
			}
			printf( '<select name="%1$s[]" id="%1$s" %2$s>%3$s</select>', $arguments['uid'], $attributes, $options_markup );
		}
	}

	private function render_time_fee( $arguments, $value, $fee_value ) {
		if ( ! empty( $arguments['options'] ) && is_array( $arguments['options'] ) ) {
			$options_markup = '<table class="fixed striped"><th style="text-align:center">Time</th><th style="text-align:center">Fee</th>';
			$iterator       = 0;
			foreach ( $arguments['options'] as $key => $label ) {
				$checked         = $this->time_checked( $value, $key );
				$fee             = $this->get_fee_for_time( $fee_value, $iterator++ );
				$uid             = $arguments['uid'];
				$uid_fee         = $arguments['uid_fee'];
				$checkbox_id     = "${uid}_${iterator}";
				$options_markup .= "<tr><td><label for='$checkbox_id'><input id='$checkbox_id' name='${uid}[]' type='checkbox' value='$key' $checked /> $label</label></td>
				<td><input name='${uid_fee}[]' id='${uid_fee}_${iterator}' type='text' placeholder='Fee e.g. £20' value='$fee'/></td></tr>";
			}

			print( "$options_markup</table>" );

		}
	}

}
