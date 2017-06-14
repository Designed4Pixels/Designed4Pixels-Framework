/*
   Designed4Pixels Theme: Google Font List.
*/

jQuery(document).ready(function ($) {
 

	//* Update site Google Fonts in real time ...
	wp.customize( 'd4p_google_font_option_one', function( value ) {
		value.bind( function( newval ) {
			$("head").append("<link href='https://fonts.googleapis.com/css?family=" + googleFontList[newval] + "' rel='stylesheet' type='text/css'>");
			$('.google-font-option-one').css( 'font-family', newval );
			$('.customize-body-font').find('option:nth-child(2)').remove();
			$('<option value=' + newval +'>' + newval + '</option>').insertAfter($('.customize-body-font option:nth-child(1)'));
			$('.customize-heading-font').find('option:nth-child(2)').remove();
			$('<option value=' + newval +'>' + newval + '</option>').insertAfter($('.customize-heading-font option:nth-child(1)'));			
		} );
	} );


	//* Update site Google Fonts in real time ...
	wp.customize( 'd4p_google_font_option_two', function( value ) {
		value.bind( function( newval ) {
			$("head").append("<link href='https://fonts.googleapis.com/css?family=" + googleFontList[newval] + "' rel='stylesheet' type='text/css'>");
			$('.google-font-option-two').css( 'font-family', newval );
			$('.customize-body-font').find('option:nth-child(3)').remove();
			$('<option value=' + newval +'>' + newval + '</option>').insertAfter($('.customize-body-font option:nth-child(2)'));
			$('.customize-heading-font').find('option:nth-child(3)').remove();
			$('<option value=' + newval +'>' + newval + '</option>').insertAfter($('.customize-heading-font option:nth-child(2)'));
		} );
	} );


	//* Update site Google Fonts in real time ...
	wp.customize( 'd4p_google_font_option_three', function( value ) {
		value.bind( function( newval ) {
			$("head").append("<link href='https://fonts.googleapis.com/css?family=" + googleFontList[newval] + "' rel='stylesheet' type='text/css'>");
			$('.google-font-option-three').css( 'font-family', newval );
			$('.customize-body-font').find('option:nth-child(4)').remove();
			$('<option value=' + newval +'>' + newval + '</option>').insertAfter($('.customize-body-font option:nth-child(3)'));
			$('.customize-heading-font').find('option:nth-child(4)').remove();
			$('<option value=' + newval +'>' + newval + '</option>').insertAfter($('.customize-heading-font option:nth-child(3)'));
		} );
	} );


	//* Update site Google Fonts in real time ...
	wp.customize( 'd4p_google_font_option_four', function( value ) {
		value.bind( function( newval ) {
			$("head").append("<link href='https://fonts.googleapis.com/css?family=" + googleFontList[newval] + "' rel='stylesheet' type='text/css'>");
			$('.google-font-option-four').css( 'font-family', newval );
			$('.customize-body-font').find('option:nth-child(5)').remove();
			$('<option value=' + newval +'>' + newval + '</option>').insertAfter($('.customize-body-font option:nth-child(4)'));
			$('.customize-heading-font').find('option:nth-child(5)').remove();
			$('<option value=' + newval +'>' + newval + '</option>').insertAfter($('.customize-heading-font option:nth-child(4)'));
		} );
	} );


});