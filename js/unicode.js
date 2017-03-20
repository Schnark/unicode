/*global CodepointList, EnumProperty, MapProperty, CodepointSequence, unicode: true */
/*jshint bitwise: false*/
unicode =
(function () {
"use strict";

var store = {};

function loadFile (name, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onload = function () {
		callback(parseDataFile(xhr.responseText));
	};
	xhr.open('GET', 'unicode-data/' + name + '.txt');
	xhr.overrideMimeType('text/plain');
	xhr.send();
}

function parseDataFile (content) {
	var lines, i, line, pos, result = [];
	lines = content.split('\n');
	for (i = 0; i < lines.length; i++) {
		line = lines[i];
		pos = line.indexOf('#');
		if (pos !== -1) {
			line = line.slice(0, pos);
		}
		line = line.trim();
		if (line) {
			result.push(line.split(/\s*;\s*/));
		}
	}
	return result;
}

function decomposeHangul (codepoint) {
	var l, v, t;
	codepoint -= 0xAC00;
	l = 0x1100 + Math.floor(codepoint / (21 * 28));
	v = 0x1161 + Math.floor((codepoint % (21 * 28)) / 28);
	t = 0x11A7 + codepoint % 28;
	return t === 0x11A7 ? [l, v] : [l, v, t];
}

function hex (codepoint) {
	return ('000' + Number(codepoint).toString(16)).toUpperCase().replace(/^0+([0-9A-F]{4,})$/, '$1');
}

function nameFallback (codepoint) {
	if (
		(0x3400 <= codepoint && codepoint <= 0x4DB5) ||
		(0x4E00 <= codepoint && codepoint <= 0x9FD5) ||
		(0x20000 <= codepoint && codepoint <= 0x2A6D6) ||
		(0x2A700 <= codepoint && codepoint <= 0x2B734) ||
		(0x2B740 <= codepoint && codepoint <= 0x2B81D) ||
		(0x2B820 <= codepoint && codepoint <= 0x2CEA1)
	) {
		return 'CJK UNIFIED IDEOGRAPH-' + hex(codepoint);
	} else if (0xAC00 <= codepoint && codepoint <= 0xD7A3) {
		return 'HANGUL SYLLABLE ' + decomposeHangul(codepoint).map(getJamo).join('');
	} else if (0x17000 <= codepoint && codepoint <= 0x187EC) {
		return 'TANGUT IDEOGRAPH-' + hex(codepoint);
	}
	return '';
}

function decompFallback (codepoint) {
	if (0xAC00 <= codepoint && codepoint <= 0xD7A3) {
		return new CodepointSequence(decomposeHangul(codepoint).map(hex).join(' '), 'canonical', hex(codepoint));
	}
}

function generateBlocks (data) {
	var i;
	store.blocks = new EnumProperty('No_Block');
	for (i = 0; i < data.length; i++) {
		store.blocks.add(data[i][0], data[i][1]);
	}
}

function generateAge (data) {
	var i;
	store.age = new EnumProperty('Unassigned');
	for (i = 0; i < data.length; i++) {
		store.age.add(data[i][0], data[i][1]);
	}
}

function generateSequences (emoji1, emoji2, named, variants) {

	var i;
	store.sequences = new MapProperty([]);
	for (i = 0; i < emoji1.length; i++) {
		store.sequences.addSequence(new CodepointSequence(emoji1[i][0], emoji1[i][2]));
	}
	for (i = 0; i < emoji2.length; i++) {
		store.sequences.addSequence(new CodepointSequence(emoji2[i][0], emoji2[i][2]));
	}
	for (i = 0; i < named.length; i++) {
		store.sequences.addSequence(new CodepointSequence(named[i][1], named[i][0]));
	}
	for (i = 0; i < variants.length; i++) {
		store.sequences.addSequence(new CodepointSequence(variants[i][0], variants[i][1]));
	}
}

function generateJamo (data) {
	var i;
	store.jamo = new EnumProperty('');
	for (i = 0; i < data.length; i++) {
		store.jamo.add(data[i][0], data[i][1]);
	}
}

function generateAliases (data) {
	var i;
	store.aliases = new MapProperty([]);
	for (i = 0; i < data.length; i++) {
		store.aliases.add(data[i][0], data[i][1]);
	}
}

function generateScripts (data) {
	var i;
	store.scripts = new EnumProperty('Unknown');
	for (i = 0; i < data.length; i++) {
		store.scripts.add(data[i][0], data[i][1]);
	}
}

function generateScriptExtensions (data, aliasesData) {
	var i, aliases = {};
	for (i = 0; i < aliasesData.length; i++) {
		if (aliasesData[i][0] === 'sc') {
			aliases[aliasesData[i][1]] = aliasesData[i][2];
		}
	}
	store.scriptExtensionsMap = new MapProperty([]);
	store.scriptExtensionsList = new EnumProperty('');

	function add (codepoint, script) {
		store.scriptExtensionsMap.add(codepoint, script);
		store.scriptExtensionsList.add(codepoint, script);
	}

	function getAdd (i) {
		return function (script) {
			add(data[i][0], aliases[script]);
		};
	}

	for (i = 0; i < data.length; i++) {
		data[i][1].split(/\s+/).forEach(getAdd(i));
	}
}

function generateSpecialCasingData (data) {
	var i;
	store.specialCase = new MapProperty([]);
	for (i = 0; i < data.length; i++) {
		store.specialCase.addSequence(new CodepointSequence(data[i][1], 'lowercase', data[i][0]));
		store.specialCase.addSequence(new CodepointSequence(data[i][3], 'uppercase', data[i][0]));
		store.specialCase.addSequence(new CodepointSequence(data[i][2], 'titlecase', data[i][0]));
	}
}

function generateUnicodeData (data) {
	var i, match;
	store.name = new MapProperty(nameFallback, true);
	store.gc = new EnumProperty('Cn');
	store.oldName = new MapProperty('', true);
	store.decomp = new MapProperty(decompFallback, true);
	store.simpleCase = new MapProperty([]);
	for (i = 0; i < data.length; i++) {
		if (data[i][1].charAt(0) !== '<') {
			store.name.add(data[i][0], data[i][1]);
		}
		store.gc.add(data[i][0], data[i][2]);
		if (data[i][10]) {
			store.oldName.add(data[i][0], data[i][10]);
		}
		match = /^(?:<([a-zA-Z]+)>\s*)?([0-9a-zA-Z ]+)$/.exec(data[i][5]);
		if (match) {
			store.decomp.addSequence(new CodepointSequence(match[2], (match[1] || 'canonical').toLowerCase(), data[i][0]));
		}
		if (data[i][12]) {
			store.simpleCase.addSequence(new CodepointSequence(data[i][12], 'uppercase', data[i][0]));
		}
		if (data[i][13]) {
			store.simpleCase.addSequence(new CodepointSequence(data[i][13], 'lowercase', data[i][0]));
		}
		if (data[i][14] && data[i][14] !== data[i][12] && data[i][14] !== data[i][0]) {
			store.simpleCase.addSequence(new CodepointSequence(data[i][14], 'titlecase', data[i][0]));
		}
	}
}

function generateData (callback) {
	var todo = 9;
	function checkDone () {
		todo--;
		if (todo === 0) {
			fixScriptExtensions();
			callback();
		}
	}

	loadFile('Blocks', function (data) {
		generateBlocks(data);
		checkDone();
	});
	loadFile('DerivedAge', function (data) {
		generateAge(data);
		checkDone();
	});
	loadFile('emoji-sequences', function (emoji1) {
		loadFile('emoji-zwj-sequences', function (emoji2) {
			loadFile('NamedSequences', function (named) {
				loadFile('StandardizedVariants', function (variants) {
					generateSequences(emoji1, emoji2, named, variants);
					checkDone();
				});
			});
		});
	});
	loadFile('Jamo', function (data) {
		generateJamo(data);
		checkDone();
	});
	loadFile('NameAliases', function (data) {
		generateAliases(data);
		checkDone();
	});
	loadFile('Scripts', function (data) {
		generateScripts(data);
		checkDone();
	});
	loadFile('ScriptExtensions', function (data) {
		loadFile('PropertyValueAliases', function (aliases) {
			generateScriptExtensions(data, aliases);
			checkDone();
		});
	});
	loadFile('SpecialCasing', function (data) {
		generateSpecialCasingData(data);
		checkDone();
	});
	loadFile('UnicodeData.modified', function (data) {
		generateUnicodeData(data);
		checkDone();
	});
}

function fixScriptExtensions () {
	var origExt = store.scriptExtensionsList, fixedExt = new EnumProperty('');
	origExt.getProperties().forEach(function (script) {
		origExt.getList(script).forEach(function (codepoint) {
			if (store.scripts.getProperty(codepoint) !== script) {
				fixedExt.add(hex(codepoint), script);
			}
		});
	});
	store.scriptExtensionsList = fixedExt;
}

function getNames (codepoint) {
	var list = JSON.parse(JSON.stringify(store.aliases.getProperty(codepoint))),
		old = store.oldName.getProperty(codepoint);
	if (old && list.indexOf(old) === -1) {
		list.push(old);
	}
	list.unshift(store.name.getProperty(codepoint));
	return list;
}

function getHex (codepoint) {
	return 'U+' + hex(codepoint);
}

function getChar (codepoint) {
	return codepoint <= 0xFFFF ?
		String.fromCharCode(codepoint) :
		String.fromCharCode(((codepoint - 0x10000) >> 10) + 0xD800) +
		String.fromCharCode((codepoint - 0x10000) % 0x400 + 0xDC00);
}

function getDisplay (codepoint) {
	var gc = getGC(codepoint), char = getChar(codepoint);
	switch (gc.toLowerCase()) {
	case 'mn': case 'mc': case 'me':
		return '◌' + char;
	case 'zs':
		return '|' + char + '|';
	case 'zl': case 'zp': case 'cc': case 'cf':
		return '░';
	case 'cn':
		return '';
	default:
		return char;
	}
}

function getJamo (codepoint) {
	return store.jamo.getProperty(codepoint);
}

function getGC (codepoint) {
	return store.gc.getProperty(codepoint);
}

function getGcChars (gc) {
	return store.gc.getList(gc);
}

function getAge (codepoint) {
	return store.age.getProperty(codepoint);
}

function getAgeChars (age) {
	return store.age.getList(age);
}

function getSequences (codepoint) {
	return store.sequences.getProperty(codepoint);
}

function getBlockNames () {
	return store.blocks.getProperties();
}

function getBlockChars (block) {
	return store.blocks.getList(block);
}

function getBlock (codepoint) {
	return store.blocks.getProperty(codepoint);
}

function getScriptNames () {
	return store.scripts.getProperties();
}

function getScriptChars (script) {
	return [store.scripts.getList(script), store.scriptExtensionsList.getList(script)];
}

function getScript (codepoint) {
	return [store.scripts.getProperty(codepoint), store.scriptExtensionsMap.getProperty(codepoint)];
}

function getDecompostion (codepoint) {
	return store.decomp.getProperty(codepoint);
}

function getCasing (codepoint) {
	var simple = store.simpleCase.getProperty(codepoint),
		special = store.specialCase.getProperty(codepoint),
		all = simple.slice(),
		i;

	function format (seq) {
		return seq.format(hex, ' ');
	}

	function add (seq) {
		var s = format(seq);
		if (s !== hex(codepoint) && all.map(format).indexOf(s) === -1) {
			all.push(seq);
		}
	}

	for (i = 0; i < special.length; i++) {
		add(special[i]);
	}
	return all;
}

function getExternal (codepoint) {
	return {
		'Unicode': 'http://unicode.org/cldr/utility/character.jsp?a=' + hex(codepoint),
		'Graphemica': 'http://graphemica.com/' + getChar(codepoint),
		'Codepoints': 'https://codepoints.net/' + getHex(codepoint),
		'Scriptsource': 'http://scriptsource.org/cms/scripts/page.php?item_id=character_detail&key=U' +
			('00000' + Number(codepoint).toString(16)).slice(-6),
		'Fileformat': 'http://www.fileformat.info/info/unicode/char/' + hex(codepoint) + '/index.htm',
		'Isthisthingon': 'http://www.isthisthingon.org/unicode/index.phtml?glyph=' + hex(codepoint)
	};
}

function normalizeForSearch (name) {
	return name.toUpperCase().replace(/[^A-Z0-9]+/g, '');
}

function searchForName (search, callback, limit) {
	var result = new CodepointList(), blocks, i, c;
	limit = limit || Infinity;
	search = normalizeForSearch(search);
	blocks = unicode.getBlockNames();
	i = 0;
	c = 0;
	function matchesArray (array, search) {
		return array.map(normalizeForSearch).join('\n').indexOf(search) > -1;
	}
	function next () {
		var block = blocks[i];
		if (!block) {
			callback(result);
			return;
		}
		unicode.getBlockChars(block).forEach(function (codepoint) {
			if (c >= limit) {
				return;
			}
			if (
				matchesArray(unicode.getNames(codepoint), search) ||
				matchesArray(unicode.getSequences(codepoint).map(function (s) {
					return s.getName();
				}), search) ||
				matchesArray([unicode.getHex(codepoint)], search)
			) {
				c++;
				result.add(hex(codepoint));
			}
		});
		i++;
		if (c >= limit) {
			callback(result);
			return;
		}
		window.setTimeout(next);
	}
	next();
}

function getCodepoints (s) {
	var result = [], c;
	while (s.length > 0) {
		c = s.charCodeAt(0);
		s = s.slice(1);
		if (0xD800 <= c && c <= 0xDBFF && 0xDC00 <= s.charCodeAt(0) && s.charCodeAt(0) <= 0xDFFF) {
			c -= 0xD800;
			c <<= 10;
			c += (s.charCodeAt(0) - 0xDC00);
			c += 0x10000;
			s = s.slice(1);
		}
		result.push(c);
	}
	return result;
}

return {
	generateData: generateData,
	getNames: getNames,
	getHex: getHex,
	getChar: getChar,
	getDisplay: getDisplay,
	getGC: getGC,
	getAge: getAge,
	getSequences: getSequences,
	getBlockNames: getBlockNames,
	getBlockChars: getBlockChars,
	getGcChars: getGcChars,
	getAgeChars: getAgeChars,
	getBlock: getBlock,
	getScriptNames: getScriptNames,
	getScriptChars: getScriptChars,
	getScript: getScript,
	getDecomposition: getDecompostion,
	getCasing: getCasing,
	getExternal: getExternal,
	searchForName: searchForName,
	getCodepoints: getCodepoints,
	normalizeForSearch: normalizeForSearch
};

})();
