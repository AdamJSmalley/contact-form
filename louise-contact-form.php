<?php
/*
Plugin Name: Contact form
Plugin URI: https://swanleyhypnotherapist.co.uk
Description: Simple contact forum
Version: 1.0
Author: Adam Smalley
Author URI: https://swanleyhypnotherapist.co.uk
*/

//add the first part of the form to the page
function cfShortcode() {
	wp_register_style( 'sheet', plugin_dir_url( __FILE__ ).'styles.css' );
    wp_enqueue_style( 'sheet' );

	echo "<script src='".plugin_dir_url( __FILE__ )."cf-script.js'></script>";
	echo "<div id='cform'>";
	echo "<textarea rows='6' cols='50' id='problem' placeholder='Please describe your problem to me' autofocus></textarea>"; //class='penis'
	echo "<button id='next'><i class='fa fa-angle-right fa-3x'></i></button>";
	echo "<input type='hidden' id='subURL' name='subURL' value='".plugin_dir_url( __FILE__ )."send.php'>";
	echo "</div>";
}

//add the form to wordpress
add_shortcode('contact_form', 'cfShortcode');