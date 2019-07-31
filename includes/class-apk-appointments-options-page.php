<?php
/**
 * Created by IntelliJ IDEA.
 * User: andy
 * Date: 19/4/15
 * Time: 14:57
 * To change this template use File | Settings | File Templates.
 */

/**
 * Admin Options
 */
class APK_Appointments_Options_Page {
    
    private $appointmentListTable;

    /**
     * Start up
     */
    function __construct() {
    }

    public function display() {
        add_filter( 'set-screen-option', array( __CLASS__, 'set_screen' ), 10, 3 );
    }

    public static function set_screen( $status, $option, $value ) {
		return $value;
	}

    /**
	 * Screen options
	 */
	public function screen_option() {

		$option = 'per_page';
		$args   = [
			'label'   => 'Appointments',
			'default' => 5,
			'option'  => 'appointments_per_page'
		];

        add_screen_option( $option, $args );
        
        $this->appointmentListTable = new APK_Appointments_List_Table();
	}

    /**
     * Options page callback
     */
    function apk_appointments_options_page() {

        $this->appointmentListTable->prepare_items();
        ?>
        <div class="wrap">
            <h2>Appointments</h2>
            <form method="post">
                <?php $this->appointmentListTable->display(); ?>
            </form>
        </div>
       <?php
    }
}