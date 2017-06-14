/*
   Designed4Pixels Theme: jQuery for WordPress Customizer LIVE Preview.

 * This file adds some LIVE to the Theme Customizer live preview. To leverage
 * this, set your custom settings to 'postMessage' and then add your handling
 * here. Your javascript should grab settings from customizer controls, and 
 * then make any necessary changes to the page using jQuery.
 */

( function( $ ) {

	var $style = $( '#custom-color-scheme' ),
		api = wp.customize;

	function hex2rgba(hex,opacity){
 		hex = hex.replace('#','');
 		r = parseInt(hex.substring(0,2), 16);
 		g = parseInt(hex.substring(2,4), 16);
 		b = parseInt(hex.substring(4,6), 16);

 		result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
 		return result;
	}


	// Color Scheme CSS.
	api.bind( 'preview-ready', function() {
		api.preview.bind( 'update-color-scheme-css', function( css ) {
			css_saved = css;
			$style.html( css_saved );
		} );
	} );


	//* Update site header logo image in real time ...
	wp.customize( 'd4p_header_logo_image', function( value ) {
		value.bind( function( newval ) {
			if ( newval != '') {
				$('#title-area').addClass('logo-img');
				$('.logo-img').css( 'background', 'url( ' + newval + ') no-repeat' );
			} else {
				$('.logo-img').css( 'background', '' ); //* Remove the inline styling
				$('#title-area').removeClass('logo-img');
			}
		} );
	} );


	//* Update site hero image in real time ...
	wp.customize( 'd4p_hero_image', function( value ) {
		value.bind( function( newval ) {
			$('.image-feature').css( 'background-image', 'url( ' + newval + ')' );
		} );
	} );


	//* Update site parallax image in real time ...
	wp.customize( 'd4p_parallax_image', function( value ) {
		value.bind( function( newval ) {
			$('#parallax').removeClass('parallax-feature');
			$('#parallax').addClass('parallax-custom');
			$('.parallax-custom').css( { 'background':'url( ' + newval + ') no-repeat fixed center center', 'background-size':'cover'} );
		} );
	} );


	//* Update site parallax image in real time ...
	wp.customize( 'd4p_footer_text', function( value ) {
		value.bind( function( newval ) {
			$('div.footer-left').html( newval );
		} );
	} );


	//* Update site accent color in real time ...
	wp.customize( 'd4p_accent_color', function( value ) {
		value.bind( function( newval ) {
			$('body').removeClass( 'color-one color-two color-three color-four color-five color-six custom-color' );
			if ( newval == 'pastelblue' ) {					
			    $('body').addClass( 'color-one' );
			} else if ( newval == 'darkblue' ) {					
			    $('body').addClass( 'color-two' );
			} else if ( newval == 'red' ) {					
			    $('body').addClass( 'color-three' );
			} else if ( newval == 'green' ) {					
			    $('body').addClass( 'color-four' );
			} else if ( newval == 'violet' ) {					
			    $('body').addClass( 'color-five' );
			} else if ( newval == 'gold' ) {					
			    $('body').addClass( 'color-six' );
			} else if ( newval == 'custom' ) {					
			    $('body').addClass( 'custom-color' );
			}
		} );
	} );


	// Custom color hue.
	wp.customize( 'd4p_custom_accent_color', function( value ) {
		value.bind( function( to ) {

			// Update custom color CSS.
			var style = $( '#custom-accent-color' ),
				accent_color = style.data( 'accent-color' ),
				accent_color_light = style.data( 'accent-color-light' ),
				rgba = hex2rgba( to, 50 ),
				css = style.html();

			// Equivalent to css.replaceAll, with hue followed by comma to prevent values with units from being changed.
			css = css.split( accent_color ).join( to );

			// Equivalent to css.replaceAll, with hue followed by comma to prevent values with units from being changed.
			css = css.split( accent_color_light ).join( rgba );

			style.html( css ).data( 'accent-color', to );
			style.html( css ).data( 'accent-color-light', rgba );
		});
	});


	//* Update site color scheme in real time ...
	wp.customize( 'd4p_color_scheme', function( value ) {
		value.bind( function( newval ) {
			$('body').removeClass( 'dark-color-scheme light-color-scheme custom-color-scheme' );
			if ( newval == 'light' ) {
				$('body').addClass( 'light-color-scheme' );
			} else if ( newval == 'dark' ) {
				$('body').addClass( 'dark-color-scheme' );
			} else if ( newval == 'custom' ) {
				$('body').addClass( 'custom-color-scheme' );
			}  
		} );
	} );

	

	
} )( jQuery );