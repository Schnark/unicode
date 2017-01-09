/*global unicode, _ */
(function () {
"use strict";

function displaySequence (sequence) {
	return sequence[0].map(unicode.getChar).join('') + ' (' +
		sequence[1] + '; ' +
		sequence[0].map(function (codepoint) {
			return '<span data-codepoint="' + codepoint + '" class="click-char">' +
				unicode.getHex(codepoint) + '</span>';
		}).join(', ') + ': ' +
		sequence[0].map(unicode.getDisplay).join(' ') + ')';
}

function showCharacter (el, codepoint) {
	function linkScript (script) {
		return '<span data-name="' + script + '" class="click-script">' + script + '</span>';
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
		external = unicode.getExternal(codepoint);
	if (names[0]) {
		html.push('<h1>' + names[0] + '</h1>');
	}
	html.push('<span class="char">' + display + '</span>');
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
	html.push('<h2>' + _('h-ext') + '</h2>');
	html.push('<ul>');
	for (i in external) {
		if (external.hasOwnProperty(i)) {
			html.push('<li><a href="' + external[i] + '" target="_blank">' + i + '</a></li>');
		}
	}
	html.push('</ul>');
	html.push('<input type="button" id="button-copy" value="' + _('button-copy') + '">');
	el.innerHTML = html.join('');
}

function getListHtml (list, skip, max) {
	var html = [], count = 0, all = 0;
	skip = Number(skip) || 0;
	max = max || 2048;
	html.push('<ul class="char-list">');
	list.forEach(function (codepoint) {
		var gc = unicode.getGC(codepoint).toLowerCase();
		if (gc !== 'cn') {
			count++;
		}
		all++;
		if (all > skip && all - skip <= max) {
			html.push(
				'<li data-codepoint="' + codepoint + '" class="click-char gc-' + gc +
				' age-' + unicode.getAge(codepoint).replace('.', '-') +  '"><span class="char">' +
				unicode.getDisplay(codepoint) + '</span></li>'
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
	return '<p style="clear: both;"><span class="click-' + type + '" data-name="' + name + '" data-skip="' + skip + '">' +
		(dir ? _('next-slice') : _('prev-slice')) + '</span></p>';
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

function showBlocks (el) {
	var html = [];
	html.push('<ul class="link-list">');
	unicode.getBlockNames().forEach(function (name) {
		html.push('<li class="click-block" data-name="' + name + '">' +
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
		html.push('<li class="click-script" data-name="' + name + '">' + name + ' (' + l + ')</li>');
	});
	html.push('</ul>');
	el.innerHTML = html.join('');
}

function showCharsFromString (el, string) {
	var html = [];
	html.push('<p>' + string.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</p>');
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
		search: document.getElementById('page-result-search')
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

function displayAbout () {
	currentView.hidden = true;
	currentView = views.about;
	currentView.hidden = false;
	scrollTop();
}

function displayList (list) {
	currentView.hidden = true;
	currentView = views.list;
	currentView.hidden = false;
	if (list) {
		if (needsInit[list]) {
			if (list === 'block') {
				showBlocks(pages.list.block.getElementsByTagName('div')[0]);
			} else if (list === 'script') {
				showScripts(pages.list.script.getElementsByTagName('div')[0]);
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
		}
		pages.result.block.hidden = true;
		pages.result.script.hidden = true;
		pages.result.chars.hidden = true;
		pages.result.search.hidden = true;
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

inputs.search.addEventListener('keypress', function (e) {
	var val;
	if (e.which === 13) {
		val = inputs.search.value;
		if (val) {
			inputs.search.blur();
			displayListResult('search', val);
		}
	}
}, false);

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
	case 'click-char':
		displayChar(el.dataset.codepoint);
		return;
	}
}, false);

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
	}, false);
	unicode.generateData(checkDone);
}

init();

})();