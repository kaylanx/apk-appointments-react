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

	public function __construct() {
		// Add Settings and Fields
		add_action( 'admin_init', array( $this, 'setup_sections' ) );
		add_action( 'admin_init', array( $this, 'setup_fields' ) );
	}

	public function display() {
	}

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

	public function admin_notice() {
		?>
		<div class="notice notice-success is-dismissible">
			<p>Your settings have been updated!</p>
		</div>
		<?php
	}

	public function setup_sections() {
		add_settings_section( 'display_format_section', 'Display Settings', array( $this, 'section_callback' ), APK_APPOINTMENTS_SETTINGS_FIELDS );
		add_settings_section( 'appointment_availability_section', 'Appointment Availablity', array( $this, 'section_callback' ), APK_APPOINTMENTS_SETTINGS_FIELDS );
	}

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

	public function setup_fields() {
		$fields = $this->merge_checkboxes_with_rest_of_fields( $this->create_day_checkboxes_array() );

		foreach ( $fields as $field ) {
			add_settings_field( $field['uid'], $field['label'], array( $this, 'field_callback' ), APK_APPOINTMENTS_SETTINGS_FIELDS, $field['section'], $field );
			register_setting( APK_APPOINTMENTS_SETTINGS_FIELDS, $field['uid'] );
		}
	}

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

	public function time_checked( $option, $time ) {
		return checked( $option[ array_search( strval( $time ), $option, true ) ], $time, false );
	}

	public function get_fee_for_time( $option, $time ) {
		$return_next = false;
		foreach ( $option as $key => $value ) {
			if ( $return_next == true ) {
				return $value;
			}
			if ( $value === $time ) {
				$return_next = true;
			}
		}
	}

	public function field_callback( $arguments ) {

		$value = get_option( $arguments['uid'] );

		switch ( $arguments['type'] ) {
			case 'select':
				$this->render_select( $arguments, $value );
				break;
			case 'time_fee':
				$this->render_time_fee( $arguments, $value );
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
			if ( $arguments['type'] === 'multiselect' ) {
				$attributes = ' multiple="multiple" ';
			}
			printf( '<select name="%1$s[]" id="%1$s" %2$s>%3$s</select>', $arguments['uid'], $attributes, $options_markup );
		}
	}

	private function render_time_fee( $arguments, $value ) {
		if ( ! empty( $arguments['options'] ) && is_array( $arguments['options'] ) ) {
			$options_markup = '<table class="fixed striped"><th style="text-align:center">Time</th><th style="text-align:center">Fee</th>';
			$iterator       = 0;
			foreach ( $arguments['options'] as $key => $label ) {
				$iterator++;
				$checked         = $this->time_checked( $value, $key );
				$fee             = $this->get_fee_for_time( $value, strval( $key ) );
				$uid             = $arguments['uid'];
				$checkbox_id     = "${uid}_${iterator}";
				$options_markup .= "<tr><td><label for='$checkbox_id'><input id='$checkbox_id' name='${uid}[]' type='checkbox' value='$key' $checked /> $label</label></td>
				<td><input name='${uid}[]' id='${uid}_fee_${iterator}' type='text' placeholder='Fee e.g. £20' value='$fee'/></td></tr>";
			}

			print( "$options_markup</table>" );

		}
	}

}
