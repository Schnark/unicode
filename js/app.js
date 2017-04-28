/*global unicode, display, webfonts */
(function () {
"use strict";

var currentView = document.getElementById('page-loading'), views = {
	main: document.getElementById('page-main'),
	list: document.getElementById('page-list'),
	result: document.getElementById('page-result'),
	char: document.getElementById('page-char'),
	fonts: document.getElementById('page-fonts')
}, pages = {
	list: {
		block: document.getElementById('page-list-block'),
		script: document.getElementById('page-list-script'),
		chars: document.getElementById('page-list-chars'),
		search: document.getElementById('page-list-search'),
		about: document.getElementById('page-about')
	},
	result: {
		block: document.getElementById('page-result-block'),
		script: document.getElementById('page-result-script'),
		chars: document.getElementById('page-result-chars'),
		search: document.getElementById('page-result-search'),
		gc: document.getElementById('page-result-gc'),
		age: document.getElementById('page-result-age')
	}
}, inputs = {
	chars: document.getElementById('input-chars'),
	search: document.getElementById('input-search')
}, needsInit = {
	block: true,
	script: true
}, currentChar = '', backToMain = true;

function scrollTop () {
	var divs = currentView.getElementsByTagName('div'), i;
	for (i = 0; i < divs.length; i++) {
		divs[i].scrollTop = 0;
	}
}

function displayMain () {
	backToMain = false;
	currentView.hidden = true;
	currentView = views.main;
	currentView.hidden = false;
	scrollTop();
	setHash('');
}

function displayFonts () {
	currentView.hidden = true;
	currentView = views.fonts;
	currentView.hidden = false;
	scrollTop();
	setHash('fonts');
}

function displayList (list) {
	currentView.hidden = true;
	currentView = views.list;
	currentView.hidden = false;
	if (list && pages.list[list]) {
		if (needsInit[list]) {
			if (list === 'block') {
				display.showBlocks(pages.list.block.getElementsByTagName('div')[1]);
			} else if (list === 'script') {
				display.showScripts(pages.list.script.getElementsByTagName('div')[1]);
			}
			needsInit[list] = false;
		}
		pages.list.block.hidden = true;
		pages.list.script.hidden = true;
		pages.list.chars.hidden = true;
		pages.list.search.hidden = true;
		pages.list.about.hidden = true;
		pages.list[list].hidden = false;
		scrollTop();
		if (inputs[list]) {
			inputs[list].focus();
			inputs[list].select();
		}
		setHash(list);
	}
}

function displayListResult (list, search, skip) {
	currentView.hidden = true;
	currentView = views.result;
	currentView.hidden = false;
	if (list) {
		switch (list) {
		case 'block':
			display.showBlock(pages.result.block.getElementsByTagName('div')[0], search, skip);
			break;
		case 'script':
			display.showScript(pages.result.script.getElementsByTagName('div')[0], search, skip);
			break;
		case 'chars':
			display.showCharsFromString(pages.result.chars.getElementsByTagName('div')[0], search);
			break;
		case 'search':
			display.showNameSearch(pages.result.search.getElementsByTagName('div')[0], search, skip);
			break;
		case 'gc':
			display.showGC(pages.result.gc.getElementsByTagName('div')[0], search, skip);
			break;
		case 'age':
			display.showAge(pages.result.age.getElementsByTagName('div')[0], search, skip);
			break;
		default:
			return;
		}
		pages.result.block.hidden = true;
		pages.result.script.hidden = true;
		pages.result.chars.hidden = true;
		pages.result.search.hidden = true;
		pages.result.gc.hidden = true;
		pages.result.age.hidden = true;
		pages.result[list].hidden = false;
		scrollTop();
		setHash(list, search);
	}
}

function displayChar (codepoint) {
	currentView.hidden = true;
	currentView = views.char;
	currentView.hidden = false;
	display.showCharacter(views.char.getElementsByTagName('div')[0], codepoint);
	currentChar = unicode.getChar(codepoint);
	scrollTop();
	setHash('char', codepoint);
}

function displayFromHash (hash) {
	var pos = hash.indexOf('='), key, val;
	if (pos === -1) {
		key = hash;
		val = '';
	} else {
		key = hash.slice(0, pos);
		val = decodeURIComponent(hash.slice(pos + 1));
	}
	switch (key) {
	case 'block':
	case 'script':
	case 'chars':
	case 'search':
	//should only be called with val
	case 'gc':
	case 'age':
	//should never be called with val
	case 'about':
		if (val) {
			displayListResult(key, val);
		} else {
			displayList(key);
		}
		return;
	case 'char':
		displayChar(val);
		return;
	case 'fonts':
		displayFonts();
		return;
	default:
		displayMain();
	}
}

function setHash (key, val) {
	var hash = key;
	if (val) {
		hash += '=' + encodeURIComponent(val);
	}
	if (hash || location.hash) {
		if (history.replaceState) {
			history.replaceState(null, '', '#' + hash);
		} else {
			location.hash = hash;
		}
	}
}

function bindFilterInput (input, callback, delay) {
	var timeout;
	input.addEventListener('keyup', function () {
		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(function () {
			timeout = false;
			callback(input.value);
		}, delay);
	});
	return function () {
		input.value = '';
		callback('');
	};
}

function generateFilterCSS (filter) {
	filter = unicode.normalizeForSearch(filter);
	if (filter) {
		return '.link-list li:not([data-filter-name*="' + filter + '"]){display:none;}';
	}
	return '';
}

function enableFilters () {
	var reset1, reset2, styleSheet = document.getElementById('filter-style');
	function updateCSS (filter) {
		styleSheet.textContent = generateFilterCSS(filter);
	}
	reset1 = bindFilterInput(document.getElementById('filter-blocks'), updateCSS, 1000);
	reset2 = bindFilterInput(document.getElementById('filter-scripts'), updateCSS, 1000);
	return function () {
		reset1();
		reset2();
	};
}

function initEvents () {
	var resetFilters = enableFilters();

	inputs.search.addEventListener('keydown', function (e) {
		var val;
		if (e.key === 'Enter' || e.which === 13) { //TODO drop which at some point
			val = inputs.search.value;
			if (val) {
				inputs.search.blur();
				displayListResult('search', val);
			}
		}
	});

	/*window.addEventListener('popstate', function () {
		if (location.hash) {
			displayFromHash(location.hash.slice(1));
		}
	});*/

	document.addEventListener('click', function (e) {
		if (e.button !== 0) {
			return;
		}
		var el = e.target, id = el.id, cls = el.className.replace(/ .*/, ''), val;
		if (cls === 'char') {
			el = el.parentNode;
			cls = el.className.replace(/ .*/, '');
		}
		switch (id) {
		case 'button-blocks':
			displayList('block');
			return;
		case 'button-scripts':
			displayList('script');
			return;
		case 'button-chars':
			displayList('chars');
			return;
		case 'button-search':
			displayList('search');
			return;
		case 'button-fonts':
			displayFonts();
			return;
		case 'button-about':
			displayList('about');
			return;
		case 'button-chars-go':
			val = inputs.chars.value;
			if (val) {
				displayListResult('chars', val);
			}
			return;
		case 'button-search-go':
			val = inputs.search.value;
			if (val) {
				displayListResult('search', val);
			}
			return;
		case 'button-copy':
			document.getElementById('input-chars').value += currentChar;
		}
		switch (cls) {
		case 'back-main':
			displayMain();
			resetFilters();
			return;
		case 'back-list':
			if (backToMain) {
				displayMain();
			} else {
				displayList();
			}
			return;
		case 'back-result':
			if (backToMain) {
				displayMain();
			} else {
				displayListResult();
			}
			return;
		case 'click-block':
			displayListResult('block', el.dataset.name, el.dataset.skip);
			return;
		case 'click-script':
			displayListResult('script', el.dataset.name, el.dataset.skip);
			return;
		case 'click-gc':
			displayListResult('gc', el.dataset.name, el.dataset.skip);
			return;
		case 'click-age':
			displayListResult('age', el.dataset.name, el.dataset.skip);
			return;
		case 'click-search-page':
			displayListResult('search', el.dataset.name, el.dataset.skip);
			return;
		case 'click-char':
			displayChar(el.dataset.codepoint);
			return;
		case 'font-load':
			el.style.display = 'none';
			addWebfonts(el.dataset.name);
			return;
		case 'font-toggle':
			toggleFont();
			return;
		}
	});
}

function toggleFont (state) {
	var spans = document.getElementsByClassName('font-toggle'), i;
	if (!state) {
		state = spans[0].className.indexOf('disable') > -1 ? 'enable' : 'disable';
		if (state === 'enable') {
			webfonts.disable();
		} else {
			webfonts.enable();
		}
	}
	for (i = 0; i < spans.length; i++) {
		spans[i].className = spans[i].className.replace(/\bfont-(?:none|disable|enable)\b/, 'font-' + state);
	}
}

function addWebfonts (data) {
	webfonts.add(data);
	toggleFont('disable');
}

function init () {
	var todo = 2;
	function checkDone () {
		todo--;
		if (todo === 0) {
			if (location.hash) {
				displayFromHash(location.hash.slice(1));
			} else {
				displayMain();
			}
		}
	}

	window.addEventListener('localized', function () {
		document.documentElement.lang = document.webL10n.getLanguage();
		document.documentElement.dir = document.webL10n.getDirection();
		checkDone();
	});
	unicode.generateData(checkDone);
	initEvents();
}

init();

})();
