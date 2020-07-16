=== APK Appointments ===
Contributors: kayleya
Tags: calendar, appointment, scheduling
Requires at least: 5.4.2
Tested up to: 5.4.2
Stable tag: 1.0.2
License: GPLv2 or later

Appointment calendar.  Lets you grey out days when you are closed, lets you define how many appointments there are in each day, and will also gray out days if all appointments are already booked.

== Description ==

= What this plugin can do for you =

Plugin uses the API from Contact Form 7 to send emails to yourself and to whoever filled in the form.

= Prerequisite =
A contact form 7 form configured with the following fields:

[date* appointment-date]
[text* appointment-time]
[text* appointment-type]
[text number-of-bridesmaids]
[date event-date]
[text* your-name]
[email* your-email]
[email confirm-your-email]
[tel* your-phone-no]
[text your-budget]
[text hear-about-us]
[textarea your-message]
[submit class:enf_button "Book Appointment"]

Make sure your PHP version is TODO or higher.

= From your WordPress Dashboard =

1. Visit “Plugins” → Add New
2. Search for APK Appointments
3. Activate APK Appointments from your Plugins page.

= From WordPress.org =

1. Download APK Appointments
2. Upload the “apk-appointments” directory to your “/wp-content/plugins/” directory, using ftp, sftp, scp etc.
3. Activate APK Appointments from your Plugins page.

= Once Activated =

1. Go to Appointments
2. Add any appointments you already have.
3. Add any schedule you have in settings.

== Frequently Asked Questions ==

None yet :) 

== Screenshots ==

1. APK Appointments Plugin

== Changelog ==

= 1.0.0 - 2020-07-13 =

* Initial version

= 1.0.1 - 2020-07-14 =

* Fix bug with event dates not showing in the emails

= 1.0.2 - 2020-07-16 =

* Allow the form id from contact form 7 to be passed in to the plugin.
* Change the way analytics config is passed into the plugin
* Make the email, telephone and budget fields show up with the correct keyboards on mobile.