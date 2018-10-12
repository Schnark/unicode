(function () {
"use strict";

var webfonts = [], prios = [[], [], ['sans-serif']], orig, fonts = {
	//jscs:disable maximumLineLength
	//emojiOne: ['https://cdn.rawgit.com/Ranks/emojione/844221d8/extras/fonts/emojione-svg.woff', 0],
	twitterColorEmoji: ['https://cdn.rawgit.com/delan/charming/e9cd209e/TwitterColorEmoji-SVGinOT.ttf', 0],
	symbola: ['https://cdn.rawgit.com/delan/charming/e9cd209e/Symbola.ttf', 1],

	notoSans: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSans-Regular.ttf', 0],
	//notoArabic: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoNaskhArabic-Regular.ttf', 0],
	notoAdlam: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansAdlam-Regular.ttf', 0],
	notoArabic: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansArabic-Regular.ttf', 0],
	notoArmenian: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansArmenian-Regular.ttf', 0],
	notoAvestan: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansAvestan-Regular.ttf', 0],
	notoBamum: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansBamum-Regular.ttf', 0],
	notoBengali: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansBengali-Regular.ttf', 0],
	notoBuhid: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansBuhid-Regular.ttf', 0],
	notoCarian: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansCarian-Regular.ttf', 0],
	notoChakma: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansChakma-Regular.ttf', 0],
	notoCherokee: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansCherokee-Regular.ttf', 0],
	notoCypriot: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansCypriot-Regular.ttf', 0],
	notoDeseret: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansDeseret-Regular.ttf', 0],
	notoDevanagari: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansDevanagari-Regular.ttf', 0],
	notoEthiopic: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansEthiopic-Regular.ttf', 0],
	notoGeorgian: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansGeorgian-Regular.ttf', 0],
	notoGlagolitic: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansGlagolitic-Regular.ttf', 0],
	notoGothic: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansGothic-Regular.ttf', 0],
	notoGujarati: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansGujarati-Regular.ttf', 0],
	notoGurmukhi: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansGurmukhi-Regular.ttf', 0],
	notoHebrew: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansHebrew-Regular.ttf', 0],
	notoKannada: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansKannada-Regular.ttf', 0],
	notoKayahLi: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansKayahLi-Regular.ttf', 0],
	notoKhmer: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansKhmer-Regular.ttf', 0],
	notoLao: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansLao-Regular.ttf', 0],
	notoLisu: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansLisu-Regular.ttf', 0],
	notoMalayalam: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansMalayalam-Regular.ttf', 0],
	notoMandaic: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansMandaic-Regular.ttf', 0],
	notoMyanmar: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansMyanmar-Regular.ttf', 0],
	notoNKo: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansNKo-Regular.ttf', 0],
	notoOlChiki: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansOlChiki-Regular.ttf', 0],
	notoOldTurkic: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansOldTurkic-Regular.ttf', 0],
	notoOriya: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansOriya-Regular.ttf', 0],
	notoOsage: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansOsage-Regular.ttf', 0],
	notoOsmanya: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansOsmanya-Regular.ttf', 0],
	notoShavian: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansShavian-Regular.ttf', 0],
	notoSinhala: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansSinhala-Regular.ttf', 0],
	notoSymbols: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansSymbols-Regular.ttf', 0],
	notoTamil: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansTamil-Regular.ttf', 0],
	notoTelugu: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansTelugu-Regular.ttf', 0],
	notoThaana: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansThaana-Regular.ttf', 0],
	notoThai: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansThai-Regular.ttf', 0],
	notoTibetan: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansTibetan-Regular.ttf', 0],
	notoVai: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/hinted/NotoSansVai-Regular.ttf', 0],

	notoAnatolianHieroglyphs: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansAnatolianHieroglyphs-Regular.ttf', 0],
	notoBalinese: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansBalinese-Regular.ttf', 0],
	notoBatak: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansBatak-Regular.ttf', 0],
	notoBrahmi: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansBrahmi-Regular.ttf', 0],
	notoBuginese: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansBuginese-Regular.ttf', 0],
	notoCanadianAboriginal: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansCanadianAboriginal-Regular.ttf', 0],
	notoCham: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansCham-Regular.ttf', 0],
	notoCoptic: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansCoptic-Regular.ttf', 0],
	notoCuneiform: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansCuneiform-Regular.ttf', 0],
	notoEgyptianHieroglyphs: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansEgyptianHieroglyphs-Regular.ttf', 0],
	notoHanunoo: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansHanunoo-Regular.ttf', 0],
	notoImperialAramaic: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansImperialAramaic-Regular.ttf', 0],
	notoInscriptionalPahlavi: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansInscriptionalPahlavi-Regular.ttf', 0],
	notoInscriptionalParthian: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansInscriptionalParthian-Regular.ttf', 0],
	notoJavanese: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansJavanese-Regular.ttf', 0],
	notoKaithi: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansKaithi-Regular.ttf', 0],
	notoKharoshthi: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansKharoshthi-Regular.ttf', 0],
	notoLepcha: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansLepcha-Regular.ttf', 0],
	notoLimbu: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansLimbu-Regular.ttf', 0],
	notoLinearB: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansLinearB-Regular.ttf', 0],
	notoLycian: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansLycian-Regular.ttf', 0],
	notoLydian: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansLydian-Regular.ttf', 0],
	notoMeeteiMayek: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansMeeteiMayek-Regular.ttf', 0],
	notoMongolian: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansMongolian-Regular.ttf', 0],
	notoNewTaiLue: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansNewTaiLue-Regular.ttf', 0],
	notoOgham: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansOgham-Regular.ttf', 0],
	notoOldItalic: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansOldItalic-Regular.ttf', 0],
	notoOldPersian: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansOldPersian-Regular.ttf', 0],
	notoOldSouthArabian: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansOldSouthArabian-Regular.ttf', 0],
	notoPhagsPa: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansPhagsPa-Regular.ttf', 0],
	notoPhoenician: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansPhoenician-Regular.ttf', 0],
	notoRejang: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansRejang-Regular.ttf', 0],
	notoRunic: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansRunic-Regular.ttf', 0],
	notoSamaritan: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansSamaritan-Regular.ttf', 0],
	notoSaurashtra: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansSaurashtra-Regular.ttf', 0],
	notoSundanese: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansSundanese-Regular.ttf', 0],
	notoSylotiNagri: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansSylotiNagri-Regular.ttf', 0],
	notoTagalog: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansTagalog-Regular.ttf', 0],
	notoTagbanwa: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansTagbanwa-Regular.ttf', 0],
	notoTaiLe: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansTaiLe-Regular.ttf', 0],
	notoTaiTham: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansTaiTham-Regular.ttf', 0],
	notoTaiViet: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansTaiViet-Regular.ttf', 0],
	notoTifinagh: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansTifinagh-Regular.ttf', 0],
	notoUgaritic: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansUgaritic-Regular.ttf', 0],
	notoYi: ['https://cdn.rawgit.com/googlei18n/noto-fonts/d3dc69b4/unhinted/NotoSansYi-Regular.ttf', 0],

	notoCJK: ['https://cdn.rawgit.com/googlei18n/noto-cjk/32a58445/NotoSansCJKjp-Regular.otf', 0]
	//jscs:enable maximumLineLength
}, fontGroups = {
	//grouped like in the Unicode Standard
	notationalSystemsSymbols: [
		'notoSymbols',
		'symbola',
		'twitterColorEmoji'
	],
	europa1: [
		'notoSans', //Latin, Cyrillic, Greek, Modifier letters, Combining marks
		'notoGeorgian',
		'notoGlagolitic',
		'notoCoptic',
		'notoArmenian'
	],
	europa2: [
		//Linear A
		'notoOldItalic',
		//Caucasian Albanian
		'notoLinearB',
		'notoRunic',
		//Old Permic
		'notoCypriot',
		//Old Hungarian
		'notoOgham',
		'notoLydian', 'notoLycian', 'notoCarian', //Anatolian Alphabets
		'notoGothic',
		'notoShavian'
		//Elbasan
	],
	middleEast1: [
		'notoHebrew',
		'notoSyriac',
		'notoMandaic',
		'notoArabic',
		'notoSamaritan'
	],
	middleEast2: [
		//Old North Arabian
		//Manichaean
		//Nabataean
		'notoOldSouthArabian',
		'notoInscriptionalParthian',
		'notoInscriptionalPahlavi',
		//Palmyrene
		'notoPhoenician',
		'notoAvestan',
		//Hatran
		'notoImperialAramaic'
	],
	cuneiformHieroglyphs: [
		'notoCuneiform',
		'notoOldPersian',
		//Merotic
		'notoUgaritic',
		'notoEgyptianHieroglyphs',
		'notoAnatolianHieroglyphs'
	],
	southCentralAsia1: [
		'notoDevanagari',
		'notoGujarati',
		'notoTelugu',
		'notoBengali',
		'notoOriya',
		'notoKannada',
		'notoGurmukhi',
		'notoTamil',
		'notoMalayalam'
	],
	southCentralAsia2: [
		'notoThaana',
		'notoLimbu',
		'notoOlChiki',
		'notoSinhala',
		'notoMeeteiMayek',
		'notoChakma',
		//Newa
		//Mro
		'notoLepcha',
		'notoTibetan',
		//Warang Citi
		'notoSaurashtra',
		'notoMongolian'
		//Masaram Gondi
		//Gunjala Gondi
	],
	southCentralAsia3: [
		'notoBrahmi',
		//Bhaiksuki
		//Marchen
		'notoKharoshthi',
		'notoPhagsPa',
		'notoOldTurkic'
		//Zanabazar Square
		//Old Sogdian
		//Soyombo, Sogdian
	],
	southCentralAsia4: [
		'notoSylotiNagri',
		//Mahajani
		//Modi
		'notoKaithi'
		//Khojki
		//Grantha
		//Sharada
		//Khudawadi
		//Ahom
		//Takri
		//Multani
		//Sora Sompeng
		//Siddham
		//Tirhuta
		//Dogra
	],
	southeastAsia: [
		'notoThai',
		'notoTaiLe',
		'notoKayahLi',
		'notoLao',
		'notoNewTaiLue',
		'notoCham',
		'notoMyanmar',
		'notoTaiTham',
		//Pahawh Hmong
		'notoKhmer',
		'notoTaiViet'
		//Pau Cin Hau
		//Hanifi Rohinga
	],
	indonesiaOceania: [
		'notoTagalog',
		'notoHanunoo',
		'notoBuhid',
		'notoTagbanwa',
		'notoJavanese',
		'notoBatak',
		'notoBuginese',
		'notoRejang',
		'notoSundanese',
		'notoBalinese'
		//Makasar
	],
	eastAsia: [
		'notoCJK',
		//Katakana
		'notoLisu',
		//Bopomofo
		//Hangul
		//Miao
		//Hiragana
		'notoYi'
		//Tangut
		//Nüshu
	],
	africa: [
		'notoEthiopic',
		'notoNKo',
		//Bassa Vah
		'notoOsmanya',
		'notoVai',
		//Mende Kikakui
		'notoTifinagh',
		'notoBamum',
		'notoAdlam'
		//Medefaidrin
	],
	americas: [
		'notoCherokee',
		'notoOsage',
		'notoCanadianAboriginal',
		'notoDeseret'
	]
};

function addWebfont (src, prio) {
	var name = 'Webfont-' + webfonts.length;
	prios[prio].push('"' + name + '"');
	webfonts.push(src);
}

function getStyle () {
	return webfonts.map(function (src, i) {
		var name = 'Webfont-' + i;
		return '@font-face{font-family:"' + name + '";src:url(' + src + ');}';
	}).join('') + '.font-support{font-family:' +
	prios.map(function (list) {
		return list.join(',');
	}).join(',').replace(/,,+/g, ',').replace(/,$/, '') + ';}';
}

function updateStyle (css) {
	var style = document.getElementById('font-style');
	if (!orig) {
		orig = style.textContent;
	}
	style.textContent = css;
}

function addWebfonts (list) {
	var i;
	for (i = 0; i < list.length; i++) {
		addWebfont(list[i][0], list[i][1]);
	}
	updateStyle(getStyle());
}

function addGroup (group) {
	group = fontGroups[group] || [];
	addWebfonts(group.map(function (font) {
		return fonts[font];
	}));
}

function disable () {
	if (orig) {
		updateStyle(orig);
	}
}

function enable () {
	updateStyle(getStyle());
}

window.webfonts = {
	add: addGroup,
	enable: enable,
	disable: disable
};

})();