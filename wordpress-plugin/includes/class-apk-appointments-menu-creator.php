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
class APK_Appointments_Menu_Creator {

	/**
	 * The options page, this is a dependency that is passed in on the constructor.
	 *
	 * @var APK_Appointments_Option_Page
	 */
	private $options_page;

	/**
	 * The Appointment Creator page (Add New Appointment), this is a dependency that is passed in on the constructor.
	 *
	 * @var APK_Appointments_Appointment_Creator
	 */
	private $appointment_creator;

	/**
	 * Creates the menu creator has dependencies on the options_page (APK_Appointments_Option_Page)
	 * and the appointment_creator (APK_Appointments_Appointment_Creator)
	 *
	 * @param APK_Appointments_Option_Page         $options_page  The options page.
	 * @param APK_Appointments_Appointment_Creator $appointment_creator The add new appointment page.
	 */
	public function __construct( $options_page, $appointment_creator ) {
		$this->options_page        = $options_page;
		$this->appointment_creator = $appointment_creator;
	}

	/**
	 * Create the plug in menu that appears at the side.
	 */
	public function plugin_menu() {

		$hook = add_menu_page(
			'APK Shop Appointments',
			'Appointments',
			'manage_options',
			'apk-appointments',
			array( $this->options_page, 'apk_appointments_options_page' ),
			'dashicons-calendar-alt'
		);
		add_action( "load-$hook", array( $this->options_page, 'screen_option' ) );

		$edit = add_submenu_page(
			'apk-appointments',
			'Appointments',
			'Appointments',
			'edit_pages',
			'apk-appointments'
		);
		add_action( "load-$edit", array( $this->options_page, 'screen_option' ) );

		$addnew = add_submenu_page(
			'apk-appointments',
			'Add New Appointment',
			'Add New',
			'edit_pages',
			'apk-appointments-new',
			array( $this->appointment_creator, 'apk_add_appointment_form' )
		);
		add_action( "load-$addnew", array( $this->appointment_creator, 'screen_option' ) );
	}
}
