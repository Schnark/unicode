/*global unicode, webfonts, _ */
(function () {
"use strict";

function displaySequence (sequence, translate) {
	var name = sequence.getName();
	if (translate) {
		name = translate(name);
	}
	return [
		'<span class="font-support">' + sequence.format(unicode.getChar) + '</span>',
		' (',
		name + '; ',
		sequence.format(function (codepoint) {
			return '<span data-codepoint="' + codepoint + '" class="click-char">' +
				unicode.getHex(codepoint) + '</span>';
		}, ', '),
		sequence.getLength() > 1 ?
			': <span class="font-support">' + sequence.format(unicode.getDisplay, ' ') + '</span>' :
			'',
		')'
	].join('');
}

function showCharacter (el, codepoint) {
	function linkScript (script) {
		return '<span data-name="' + script + '" class="click-script">' + script + '</span>';
	}

	function translateName (name) {
		return _('related-' + name);
	}

	var html = [], i,
		names = unicode.getNames(codepoint),
		hex = unicode.getHex(codepoint),
		display = unicode.getDisplay(codepoint),
		gc = unicode.getGC(codepoint),
		age = unicode.getAge(codepoint),
		block = unicode.getBlock(codepoint),
		script = unicode.getScript(codepoint),
		sequences = unicode.getSequences(codepoint),
		decomp = unicode.getDecomposition(codepoint),
		casing = unicode.getCasing(codepoint),
		related = casing.slice(),
		external = unicode.getExternal(codepoint);
	if (names[0]) {
		html.push('<h1>' + names[0] + '</h1>');
	}
	html.push('<span class="char font-support">' + display + '</span>');
	html.push('<ul>');
	html.push('<li class="alt-name">' + hex + '</li>');
	for (i = 1; i < names.length; i++) {
		html.push('<li class="alt-name">' + names[i] + '</li>');
	}
	html.push('</ul>');
	html.push('<h2>' + _('h-props') + '</h2>');
	html.push('<ul>');
	html.push('<li>' + _('gc', {gc: _('gc-' + gc.toLowerCase())}) + '</li>');
	html.push('<li>' + _('age', {a: age}) + '</li>');
	html.push('<li><span data-name="' + block + '" class="click-block">' + _('block', {b: block}) + '</span></li>');
	html.push('<li>' + _('script', {s:
		linkScript(script[0]) + (script[1].length ? ' (' + script[1].map(linkScript).join(', ') + ')' : '')
	}) + '</li>');
	html.push('</ul>');
	if (sequences.length) {
		html.push('<h2>' + _('h-seq') + '</h2>');
		html.push('<ul>');
		for (i = 0; i < sequences.length; i++) {
			html.push('<li>' + displaySequence(sequences[i]) + '</li>');
		}
		html.push('</ul>');
	}
	if (decomp) {
		related.unshift(decomp);
	}
	if (related.length) {
		html.push('<h2>' + _('h-related') + '</h2>');
		html.push('<ul>');
		for (i = 0; i < related.length; i++) {
			html.push('<li>' + displaySequence(related[i], translateName) + '</li>');
		}
		html.push('</ul>');
	}
	html.push('<h2>' + _('h-ext') + '</h2>');
	html.push('<ul>');
	for (i in external) {
		if (external.hasOwnProperty(i)) {
			html.push('<li><a href="' + external[i] + '" target="_blank">' + i + '</a></li>');
		}
	}
	html.push('</ul>');
	if (codepoint > 0) {
		html.push('<input type="button" class="click-char" data-codepoint="' +
			(codepoint - 1) + '" value="' + _('prev-char') + '">');
	}
	html.push('<input type="button" id="button-copy" value="' + _('button-copy') + '">');
	if (codepoint < 0x10FFFF) {
		html.push('<input type="button" class="click-char" data-codepoint="' +
			(Number(codepoint) + 1) + '" value="' + _('next-char') + '">');
	}
	el.innerHTML = html.join('');
}

function getListHtml (list, skip, max) {
	var html = [], count = 0, all = 0;
	skip = Number(skip) || 0;
	max = max || 2048;
	html.push('<ul class="char-list font-support">');
	list.forEach(function (codepoint) {
		var gc = unicode.getGC(codepoint).toLowerCase();
		if (gc !== 'cn') {
			count++;
		}
		all++;
		if (all > skip && all - skip <= max) {
			html.push(
				'<li data-codepoint="' + codepoint + '" class="click-char gc-' + gc +
				' age-' + unicode.getAge(codepoint).replace('.', '-') +
				'" title="' + (unicode.getNames(codepoint)[0] || '') + '">' +
				'<span class="char">' + unicode.getDisplay(codepoint) + '</span></li>'
			);
		}
	});
	html.push('</ul>');
	return [html.join(''), count, list.length,
		skip ? Math.max(0, skip - max) : undefined, (all - skip > max) ? skip + max : undefined];
}

function makeNextPrev (name, skip, type, dir) {
	if (skip === undefined) {
		return '';
	}
	return '<p style="clear: both;"><input type="button" class="click-' + type +
		'" data-name="' + name + '" data-skip="' + skip + '" value="' +
		(dir ? _('next-slice') : _('prev-slice')) + '"></p>';
}

function showBlock (el, name, skip) {
	var html = [], data = getListHtml(unicode.getBlockChars(name), skip);
	html.push('<h1>' + name + '</h1>');
	html.push('<p>' + data[1] + '/' + data[2] + '</p>');
	html.push(makeNextPrev(name, data[3], 'block'));
	html.push(data[0]);
	html.push(makeNextPrev(name, data[4], 'block', true));
	el.innerHTML = html.join('');
}

function showScript (el, name, skip) {
	var html = [], lists = unicode.getScriptChars(name), data;
	html.push('<h1>' + name + '</h1>');
	data = getListHtml(lists[0], skip);
	html.push(makeNextPrev(name, data[3], 'script'));
	html.push(data[0]);
	html.push(makeNextPrev(name, data[4], 'script', true));
	if (lists[1].length) {
		html.push('<h2 style="clear: both;">' + _('h-add') + '</h2>');
		html.push(getListHtml(lists[1], 0, Infinity)[0]);
	}
	el.innerHTML = html.join('');
}

function showGC (el, name, skip) {
	var html = [], data = getListHtml(unicode.getGcChars(name), skip);
	html.push('<h1>' + _('gc-' + name.toLowerCase()) + '</h1>');
	html.push('<p>' + data[2] + '</p>');
	html.push(makeNextPrev(name, data[3], 'gc'));
	html.push(data[0]);
	html.push(makeNextPrev(name, data[4], 'gc', true));
	el.innerHTML = html.join('');
}

function showAge (el, name, skip) {
	var html = [], data = getListHtml(unicode.getAgeChars(name), skip);
	html.push('<h1>' + name + '</h1>');
	html.push('<p>' + data[2] + '</p>');
	html.push(makeNextPrev(name, data[3], 'age'));
	html.push(data[0]);
	html.push(makeNextPrev(name, data[4], 'age', true));
	el.innerHTML = html.join('');
}

function showBlocks (el) {
	var html = [];
	html.push('<ul class="link-list">');
	unicode.getBlockNames().forEach(function (name) {
		html.push('<li class="click-block" data-name="' + name + '" ' +
			'data-filter-name="' + unicode.normalizeForSearch(name) + '">' +
			name + ' (' + unicode.getBlockChars(name).length + ')</li>');
	});
	html.push('</ul>');
	el.innerHTML = html.join('');
}

function showScripts (el) {
	var html = [];
	html.push('<ul class="link-list">');
	unicode.getScriptNames().forEach(function (name) {
		var l = unicode.getScriptChars(name).map(function (list) {
			return list.length;
		});
		if (l[1]) {
			l = l.join('+');
		} else {
			l = l[0];
		}
		html.push('<li class="click-script" data-name="' + name + '" ' +
			'data-filter-name="' + unicode.normalizeForSearch(name) + '">' +
			name + ' (' + l + ')</li>');
	});
	html.push('</ul>');
	el.innerHTML = html.join('');
}

function showCharsFromString (el, string) {
	var html = [];
	html.push('<p class="font-support">' + string.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</p>');
	html.push(getListHtml(unicode.getCodepoints(string), 0, Infinity)[0]);
	el.innerHTML = html.join('');
}

function showNameSearch (el, search) {
	el.innerHTML = _('search-wait');
	unicode.searchForName(search, function (result) {
		var html = [];
		html.push('<p>' + _('search-result', {n: result.length}) + '</p>');
		html.push(getListHtml(result)[0]);
		el.innerHTML = html.join('');
	}, 2048);
}

var currentView = document.getElementById('page-loading'), views = {
	main: document.getElementById('page-main'),
	list: document.getElementById('page-list'),
	result: document.getElementById('page-result'),
	char: document.getElementById('page-char'),
	fonts: document.getElementById('page-fonts'),
	about: document.getElementById('page-about')
}, pages = {
	list: {
		block: document.getElementById('page-list-block'),
		script: document.getElementById('page-list-script'),
		chars: document.getElementById('page-list-chars'),
		search: document.getElementById('page-list-search')
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
}, currentChar = '';

function scrollTop () {
	var divs = currentView.getElementsByTagName('div'), i;
	for (i = 0; i < divs.length; i++) {
		divs[i].scrollTop = 0;
	}
}

function displayMain () {
	currentView.hidden = true;
	currentView = views.main;
	currentView.hidden = false;
	scrollTop();
}

function displayFonts () {
	currentView.hidden = true;
	currentView = views.fonts;
	currentView.hidden = false;
	scrollTop();
}

function displayAbout (noScroll) {
	currentView.hidden = true;
	currentView = views.about;
	currentView.hidden = false;
	if (!noScroll) {
		scrollTop();
	}
}

function displayList (list) {
	currentView.hidden = true;
	currentView = views.list;
	currentView.hidden = false;
	if (list) {
		if (needsInit[list]) {
			if (list === 'block') {
				showBlocks(pages.list.block.getElementsByTagName('div')[1]);
			} else if (list === 'script') {
				showScripts(pages.list.script.getElementsByTagName('div')[1]);
			}
			needsInit[list] = false;
		}
		pages.list.block.hidden = true;
		pages.list.script.hidden = true;
		pages.list.chars.hidden = true;
		pages.list.search.hidden = true;
		pages.list[list].hidden = false;
		scrollTop();
		if (inputs[list]) {
			inputs[list].focus();
			inputs[list].select();
		}
	}
}

function displayListResult (list, search, skip) {
	currentView.hidden = true;
	currentView = views.result;
	currentView.hidden = false;
	if (list) {
		switch (list) {
		case 'block':
			showBlock(pages.result.block.getElementsByTagName('div')[0], search, skip);
			break;
		case 'script':
			showScript(pages.result.script.getElementsByTagName('div')[0], search, skip);
			break;
		case 'chars':
			showCharsFromString(pages.result.chars.getElementsByTagName('div')[0], search);
			break;
		case 'search':
			showNameSearch(pages.result.search.getElementsByTagName('div')[0], search);
			break;
		case 'gc':
			showGC(pages.result.gc.getElementsByTagName('div')[0], search, skip);
			break;
		case 'age':
			showAge(pages.result.age.getElementsByTagName('div')[0], search, skip);
		}
		pages.result.block.hidden = true;
		pages.result.script.hidden = true;
		pages.result.chars.hidden = true;
		pages.result.search.hidden = true;
		pages.result.gc.hidden = true;
		pages.result.age.hidden = true;
		pages.result[list].hidden = false;
		scrollTop();
	}
}

function displayChar (codepoint) {
	currentView.hidden = true;
	currentView = views.char;
	currentView.hidden = false;
	showCharacter(views.char.getElementsByTagName('div')[0], codepoint);
	currentChar = unicode.getChar(codepoint);
	scrollTop();
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

	inputs.search.addEventListener('keypress', function (e) {
		var val;
		if (e.which === 13) {
			val = inputs.search.value;
			if (val) {
				inputs.search.blur();
				displayListResult('search', val);
			}
		}
	});

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
			displayAbout();
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
		case 'back-about':
			displayAbout(true);
			return;
		case 'back-list':
			displayList();
			return;
		case 'back-result':
			displayListResult();
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
			displayMain();
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
