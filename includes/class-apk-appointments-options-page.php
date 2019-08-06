<?php
/**
 * Created by IntelliJ IDEA.
 * User: andy
 * Date: 19/4/15
 * Time: 14:57
 *
 * @package     APK_Appointments
 */

/**
 * Admin Options
 */
class APK_Appointments_Options_Page {

	/**
	 * The APK_Appointment_List_Table instance.
	 *
	 * @var APK_Appointment_List_Table
	 */
	private $appointments_list_table;

	/**
	 * Start up
	 */
	public function __construct() {
	}

	/**
	 * Screen options
	 */
	public function screen_option() {

		$option = 'per_page';
		$args   = array(
			'label'   => 'Appointments',
			'default' => 5,
			'option'  => 'appointments_per_page',
		);

		add_screen_option( $option, $args );

		$this->appointments_list_table = new APK_Appointment_List_Table();
	}

	/**
	 * Options page callback
	 */
	public function apk_appointments_options_page() {

		$this->appointments_list_table->prepare_items();
		?>
		<div class="wrap">
			<h2>Appointments</h2>
			<form method="post">
				<?php $this->appointments_list_table->display(); ?>
			</form>
		</div>
		<?php
	}
}
