/*
   Designed4Pixels Theme: jQuery for WordPress Customizer LIVE Preview.

 * This file adds LIVE updates to the Theme Customizer live preview. To make
 * use of this feature, set your custom settings to 'postMessage' and then
 * add your handlinghere. Your javascript should grab settings from customizer
 * controls, and then make any necessary changes to the page using jQuery.
 */


( function( $ ) {

	var cssTemplate = wp.template( 'd4p-color-scheme' ),
		api = wp.customize,
		colorSettings = _.keys( colorScheme );
		themeSettings = _.keys( defaultSettings );


	api.controlConstructor.select = api.Control.extend( {
		ready: function() {
			if ( 'd4p_color_scheme' === 'custom' ) {
					this.setting.bind( 'change', function( value ) {

						_.each( colorSettings, function( setting ) {

							// Background Color.
							api( setting ).set( colorScheme[ setting ] );
							api.control( setting ).container.find( '.color-picker-hex' )
								.data( 'data-default-color', colorScheme[ setting ] )
								.wpColorPicker( 'defaultColor', colorScheme[ setting ] );
						});
					} );
				}
			}
		} );



		// Generate the CSS for the Current Color Settings.
		function updateCSS() {

			var css,
				colors = _.object( defaultSettings );


			// Merge in Color Scheme Overrides.
			_.each( themeSettings, function( setting ) {
				colors[ setting ] = api( setting )();
			});

			// Create the CSS Template & Send to Preview
			css = cssTemplate( colors );
			api.previewer.send( 'update-color-scheme-css', css );
		}


		// Update the CSS whenever a Color Setting is changed.
		_.each( themeSettings, function( setting ) {
			api( setting, function( setting ) {
			setting.bind( updateCSS );
			} );
		} );
	
		/* ------ Add Customizer Controls & Settings Here ------ */

			wp.customize.bind( 'ready', function() {


				// Only show the Body Background Color when Custom Accent Color Scheme.
				wp.customize( 'd4p_accent_color', function( setting ) {
					wp.customize.control( 'd4p_custom_accent_color', function( control ) {
						var visibility = function() {
							if ( 'custom' === setting.get() ) {
								control.container.slideDown( 180 );
							} else {
								control.container.slideUp( 180 );
							}
						};

						visibility();
						setting.bind( visibility );
					});
				});


			_.each( colorSettings, function( setting ) {	

				// Only show the Body Background Color when there's a Custom Color Scheme.
				wp.customize( 'd4p_color_scheme', function( setting ) {
					wp.customize.control( setting, function( control ) {
						var visibility = function() {
							if ( 'custom' === setting.get() ) {
								control.container.slideDown( 180 );
							} else {
								control.container.slideUp( 180 );
							}
						};

					visibility();
					setting.bind( visibility );
					});
				});
			});

			/* ------ End of Controls ------ */

			});

} )( jQuery );
