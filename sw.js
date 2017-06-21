/*global caches, fetch, Promise */
(function (worker) {
"use strict";

var VERSION = 'v1.6',
	FILES = [
		'index.html',
		'style.css',
		'icons/icon-512.png',
		'js/app.js',
		'js/display.js',
		'js/font.js',
		'js/properties.js',
		'js/unicode.js',
		'js/lib/l10n.js',
		'l10n/de.properties',
		'l10n/en.properties',
		'l10n/locales.ini',
		'unicode-data/Blocks.txt',
		'unicode-data/DerivedAge.txt',
		'unicode-data/emoji-sequences.txt',
		'unicode-data/emoji-variation-sequences.txt',
		'unicode-data/emoji-zwj-sequences.txt',
		'unicode-data/Jamo.txt',
		'unicode-data/NameAliases.txt',
		'unicode-data/NamedSequences.txt',
		'unicode-data/PropertyValueAliases.txt',
		'unicode-data/RelatedChars.txt',
		'unicode-data/ScriptExtensions.txt',
		'unicode-data/Scripts.txt',
		'unicode-data/SpecialCasing.txt',
		'unicode-data/StandardizedVariants.txt',
		'unicode-data/UnicodeData.modified.txt'
	];

worker.addEventListener('install', function (e) {
	e.waitUntil(
		caches.open(VERSION).then(function (cache) {
			return cache.addAll(FILES);
		})
	);
});

worker.addEventListener('activate', function (e) {
	e.waitUntil(
		caches.keys().then(function (keys) {
			return Promise.all(keys.map(function (key) {
				if (key !== VERSION) {
					return caches.delete(key);
				}
			}));
		})
	);
});

worker.addEventListener('fetch', function (e) {
	e.respondWith(caches.match(e.request, {ignoreSearch: true})
		.then(function (response) {
			return response || fetch(e.request);
		})
	);
});

})(this);
