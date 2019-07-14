<?php
/**
 * Created by IntelliJ IDEA.
 * User: andy
 * Date: 19/4/15
 * Time: 15:56
 */

class APK_Appointments_Shortcode {
    private $appointments;

    public function __construct() {

        wp_register_script( 'apk-picker-script', plugins_url( '/js/pickadate/picker.js' , __FILE__ ), array(), '3.5.4', true );
        wp_register_script( 'apk-picker-date-script', plugins_url( '/js/pickadate/picker.date.js' , __FILE__ ), array(), '3.5.4', true );
        wp_register_script( 'apk-picker-time-script', plugins_url( '/js/pickadate/picker.time.js' , __FILE__ ), array(), '3.5.4', true );
        wp_register_script( 'apk-appointments-script', plugins_url( '/js/appointments.js' , __FILE__ ), array(), '1.0.0', true );

        wp_register_style( 'apk-picker-classic', plugins_url( '/css/pickadate/classic.css' , __FILE__ ), array(), '3.5.4', false );
        wp_register_style( 'apk-picker-classic-date', plugins_url( '/css/pickadate/classic.date.css' , __FILE__ ), array(), '3.5.4', false );
        wp_register_style( 'apk-picker-classic-time', plugins_url( '/css/pickadate/classic.time.css', __FILE__  ), array(), '3.5.4', false );

        add_shortcode('apk-appointments', array($this, 'shortcode'));
    }

    public function shortcode() {

        wp_enqueue_style( 'apk-picker-classic' );
        wp_enqueue_style( 'apk-picker-classic-date' );
        wp_enqueue_style( 'apk-picker-classic-time' );

        wp_enqueue_script( 'apk-picker-script' );
        wp_enqueue_script( 'apk-picker-date-script' );
        wp_enqueue_script( 'apk-picker-time-script' );
        wp_enqueue_script( 'apk-appointments-script' );

        $this->appointments = get_option( 'apk_appointments_options' );

        var_dump($this->appointments);

        $div_html = '<script type="text/javascript">
			            var appointmentsJson = [';

        if (isset($this->appointments)) {

            $appointmentsIterator = new CachingIterator(new ArrayIterator($this->appointments));
            foreach ($appointmentsIterator as $appointment_key => $appointment) {

                if (isset($appointment['closed']) && $appointment['closed']) {
                    $div_html .= '{ "date" : "'.$appointment['date'].'", "closed" : true }';
                }
                else {
                    $appointmentTimesIterator = new CachingIterator(new ArrayIterator($appointment['times']));
                    foreach ($appointmentTimesIterator as $times_key => $time) {
                        $div_html .= '{ "date" : "'.$appointment['date'].'", "time" : '.$time.', "closed" : false }';
                        if ($appointmentTimesIterator->hasNext()) {
                            $div_html .= ',';
                        }
                    }
                }

                if ($appointmentsIterator->hasNext()) {
                    $div_html .= ',';
                }
            }

        }

        $div_html .= '];</script><div id="appointment-data" style="display: none;">
			04/04/2019 CLOSED;
05/04/2019 CLOSED;
06/04/2019 CLOSED;
03/04/2019 CLOSED;
06/04/2019 CLOSED;
07/04/2019 15;
07/04/2019 16;
16/06/2019 CLOSED;
17/06/2019 CLOSED;
18/06/2019 CLOSED;
19/06/2019 CLOSED;
20/06/2019 CLOSED;
21/06/2019 CLOSED;
22/06/2019 CLOSED;
23/06/2019 CLOSED;
09/08/2019 CLOSED;
10/08/2019 CLOSED;
11/08/2019 CLOSED;
12/08/2019 CLOSED;
13/08/2019 CLOSED;
14/08/2019 CLOSED;
15/08/2019 CLOSED;
16/08/2019 CLOSED;
17/08/2019 CLOSED;
18/08/2019 CLOSED;
19/08/2019 CLOSED;
30/10/2019 CLOSED;
31/10/2019 CLOSED;
01/11/2019 CLOSED;
02/11/2019 CLOSED;
24/12/2019 CLOSED;
25/12/2019 CLOSED;
26/12/2019 CLOSED;
27/12/2019 CLOSED;</div>';

        return $div_html;
    }
}