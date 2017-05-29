jQuery(document).foundation();
/* 
These functions make sure WordPress 
and Foundation play nice together.
*/

jQuery(document).ready(function() {
    
    // Remove empty P tags created by WP inside of Accordion and Orbit
    jQuery('.accordion p:empty, .orbit p:empty').remove();
    
	 // Makes sure last grid item floats left
	jQuery('.archive-grid .columns').last().addClass( 'end' );
	
	// Adds Flex Video to YouTube and Vimeo Embeds
	jQuery('iframe[src*="youtube.com"], iframe[src*="vimeo.com"]').wrap("<div class='flex-video'/>");

});

jQuery(window).on('load', function() {

	// The functions below take into account Height differences due to WP Admin Bar, Info Bar, and Nav Bar.
	// Start by assigning variable 'index' with the Height of the Info Bar.
	index = jQuery( ".upper-nav-bar" ).height();

	// Add Height of Info Bar to Inner content Padding.
	jQuery( "#inner-content" ).css( "padding-top", "+=" + index );

	// If WP Admin Bar is displayed add 35px on to the Height of the Info Bar.
	if ( init_settings.show_admin_bar ) {
		index = index + 35;
	}

	// Applies Height of WP Admin Bar and Info Bar to 'Off Canvas' containers and Home Page Image Feature.
    jQuery( "#off-canvas-left .off-canvas-inner, #off-canvas-right .off-canvas-inner" ).css( "margin-top", "+=" + index );
	jQuery( "#off-canvas-top button.close-button" ).css( "top", "+=" + index );
	jQuery( "#home-feature-section-1 .image-feature .narrow-container" ).css( "margin-top", "+=" + index );

	// Add Height of the Logo Bar
    index = index + jQuery( ".lower-nav-bar" ).height();

    // Applies Height of WP Admin Bar, Info Bar, and Logo Bar to content.
    jQuery( "#home-feature-section-1 .image-feature .image-mask" ).css( "height", "+=" + index);
    jQuery( "#home-feature-section-1 .slider-feature" ).css( "margin-top", "+=" + index);
    jQuery( "#off-canvas-top .off-canvas-inner" ).css( "margin-top", "+=" + index );


});

