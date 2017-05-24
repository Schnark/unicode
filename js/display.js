/*global unicode, _, display: true */
display =
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
		related = unicode.getRelated(codepoint),
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
	related = casing.concat(related);
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
		'" data-name="' + name.replace(/"/g, '&quot;') + '" data-skip="' + skip + '" value="' +
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

function showNameSearch (el, search, page) {
	var limit = 2048;
	page = Number(page || 0);
	el.innerHTML = _('search-wait');
	unicode.searchForName(search, function (result) {
		var html = [];
		html.push('<p>' + _(result.length < limit ? 'search-result' : 'search-result-plus', {n: result.length}) + '</p>');
		if (page) {
			html.push(makeNextPrev(search, page - 1, 'search-page', false));
		}
		html.push(getListHtml(result)[0]);
		if (result.length === limit) {
			html.push(makeNextPrev(search, page + 1, 'search-page', true));
		}
		el.innerHTML = html.join('');
	}, limit, page);
}

return {
	showBlock: showBlock,
	showBlocks: showBlocks,
	showScript: showScript,
	showScripts: showScripts,
	showGC: showGC,
	showAge: showAge,
	showCharsFromString: showCharsFromString,
	showNameSearch: showNameSearch,
	showCharacter: showCharacter
};

})();