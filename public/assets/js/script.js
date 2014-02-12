!function( window ) {
	'use strict';

	// cache globals to local variables
	var doc = window.document,
		loc = window.location,
		hist = window.history,

		//cached selectors
		nav = doc.getElementById( 'nav' ),
		navLinks = doc.querySelectorAll( 'nav a' ),
		pageSections = doc.querySelectorAll( 'article' ),

		// placeholder for storing page sections
		sections = {},

		// Constants
		HOME = '#/start';

	// store page sections from navigation links
	loopThroughDOM( navLinks, function( element ) {
		sections[( element.getAttribute( 'data-section' ) )] = true;
	} );

	// always set home section as default if no || wrong hash is given
	loc.hash = checkHash( loc.hash, sections, HOME );

	// initialize page section
	switchSection( pageSections, loc.hash );

	// attach events
	window.addEventListener( 'hashchange', function() {
		loc.hash = checkHash( loc.hash, sections, HOME);
		switchSection( pageSections, loc.hash );
	} );

	nav.addEventListener( 'click', function( event ) {
		var target = event.target;

		if ( target.nodeName === 'A' ) {
			event.preventDefault();

			makeNavLinkActive( navLinks, target );
			hist.pushState( null, target.getAttribute('title'), target.getAttribute( 'data-section' ) );
			switchSection( pageSections, loc.hash );
		}
	} );

	/**
	 * Compare current hash with given hash table and if no match found return default hash
	 *
	 * @param hash {string} - current location hash
	 * @param hashTable {object} - object with suppoerted hashes
	 * @param defaultHash {string} - default hash to be applied to window.location
	 * @returns {string} - location hash
	 */

	function checkHash( hash, hashTable, defaultHash ) {
		if ( !hash || !hashTable.hasOwnProperty( hash ) ) {
			return defaultHash;
		} else {
			return hash;
		}
	}

	/**
	 * Simple loop through DOM element with callback function run for every element in a loop
	 *
	 * @param elements {object} - HTML nodes
	 * @param callback {function(object)} - callback function which has a single HTML element as argument
	 */

	function loopThroughDOM( elements, callback ) {
		var i,
			length = elements.length;

		for ( i = 0; i < length; i++ ) {
			callback( elements[i] );
		}
	}

	/**
	 * Make navigation link active
	 *
	 * @param linkGroup {object} - HTML nodes
	 * @param link {object} - HTML node
	 */

	function makeNavLinkActive( linkGroup, link ) {
		loopThroughDOM( linkGroup, function( element ) {
			element.className = '';
		} );

		link.className = 'active';
	}

	/**
	 * Display page section by given ID
	 *
	 * @param pageSections {object} - HTML nodes
	 * @param hash {string} - ID of page section
	 */

	function switchSection( pageSections, hash ) {
		var	activeSection = doc.getElementById( hash.slice( 2 ) );

		loopThroughDOM( pageSections, function( element ) {
			element.className = 'hidden';
		} );

		activeSection.className = 'active';
	}
}( window );
