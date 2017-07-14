(function () {
"use strict";

var webfonts = [], prios = [[], [], ['sans-serif']], orig, fonts = {
	//jscs:disable maximumLineLength
	//emojiOne: ['https://cdn.rawgit.com/Ranks/emojione/844221d8/extras/fonts/emojione-svg.woff', 0],
	twitterColorEmoji: ['https://cdn.rawgit.com/delan/charming/ebd2e7d2/TwitterColorEmoji-SVGinOT.ttf', 0],
	symbola: ['https://cdn.rawgit.com/delan/charming/ebd2e7d2/Symbola.ttf', 1],

	notoSans: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/hinted/NotoSans-Regular.ttf', 0],
	notoArabic: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/hinted/NotoNaskhArabic-Regular.ttf', 0],
	notoArmenian: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/hinted/NotoSansArmenian-Regular.ttf', 0],
	notoBengali: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/hinted/NotoSansBengali-Regular.ttf', 0],
	notoCham: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/hinted/NotoSansCham-Regular.ttf', 0],
	notoDevanagari: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/hinted/NotoSansDevanagari-Regular.ttf', 0],
	notoEthiopic: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/hinted/NotoSansEthiopic-Regular.ttf', 0],
	notoGeorgian: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/hinted/NotoSansGeorgian-Regular.ttf', 0],
	notoGujarati: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/hinted/NotoSansGujarati-Regular.ttf', 0],
	notoGurmukhi: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/hinted/NotoSansGurmukhi-Regular.ttf', 0],
	notoHebrew: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/hinted/NotoSansHebrew-Regular.ttf', 0],
	notoKannada: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/hinted/NotoSansKannada-Regular.ttf', 0],
	notoKhmer: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/hinted/NotoSansKhmer-Regular.ttf', 0],
	notoLao: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/hinted/NotoSansLao-Regular.ttf', 0],
	notoMalayalam: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/hinted/NotoSansMalayalam-Regular.ttf', 0],
	notoMyanmar: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/hinted/NotoSansMyanmar-Regular.ttf', 0],
	notoOriya: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/hinted/NotoSansOriya-Regular.ttf', 0],
	notoSinhala: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/hinted/NotoSansSinhala-Regular.ttf', 0],
	notoTamil: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/hinted/NotoSansTamil-Regular.ttf', 0],
	notoTelugu: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/hinted/NotoSansTelugu-Regular.ttf', 0],
	notoThaana: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/hinted/NotoSansThaana-Regular.ttf', 0],
	notoThai: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/hinted/NotoSansThai-Regular.ttf', 0],
	notoTibetan: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/hinted/NotoSansTibetan-Regular.ttf', 0],

	notoAdlam: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7a6494d7/unhinted/NotoSansAdlam-Regular.ttf', 0],
	notoAvestan: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansAvestan-Regular.ttf', 0],
	notoBalinese: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansBalinese-Regular.ttf', 0],
	notoBamum: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansBamum-Regular.ttf', 0],
	notoBatak: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansBatak-Regular.ttf', 0],
	notoBrahmi: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansBrahmi-Regular.ttf', 0],
	notoBuginese: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansBuginese-Regular.ttf', 0],
	notoBuhid: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansBuhid-Regular.ttf', 0],
	notoCanadianAboriginal: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansCanadianAboriginal-Regular.ttf', 0],
	notoCarian: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansCarian-Regular.ttf', 0],
	notoCherokee: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansCherokee-Regular.ttf', 0],
	notoCoptic: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansCoptic-Regular.ttf', 0],
	notoCuneiform: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansCuneiform-Regular.ttf', 0],
	notoCypriot: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansCypriot-Regular.ttf', 0],
	notoDeseret: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansDeseret-Regular.ttf', 0],
	notoEgyptianHieroglyphs: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansEgyptianHieroglyphs-Regular.ttf', 0],
	notoGlagolitic: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansGlagolitic-Regular.ttf', 0],
	notoGothic: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansGothic-Regular.ttf', 0],
	notoHanunoo: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansHanunoo-Regular.ttf', 0],
	notoImperialAramaic: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansImperialAramaic-Regular.ttf', 0],
	notoInscriptionalPahlavi: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansInscriptionalPahlavi-Regular.ttf', 0],
	notoInscriptionalParthian: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansInscriptionalParthian-Regular.ttf', 0],
	notoJavanese: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansJavanese-Regular.ttf', 0],
	notoKaithi: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansKaithi-Regular.ttf', 0],
	notoKayahLi: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansKayahLi-Regular.ttf', 0],
	notoKharoshthi: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansKharoshthi-Regular.ttf', 0],
	notoLepcha: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansLepcha-Regular.ttf', 0],
	notoLimbu: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansLimbu-Regular.ttf', 0],
	notoLinearB: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansLinearB-Regular.ttf', 0],
	notoLisu: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansLisu-Regular.ttf', 0],
	notoLycian: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansLycian-Regular.ttf', 0],
	notoLydian: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansLydian-Regular.ttf', 0],
	notoMandaic: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansMandaic-Regular.ttf', 0],
	notoMeeteiMayek: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansMeeteiMayek-Regular.ttf', 0],
	notoMongolian: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansMongolian-Regular.ttf', 0],
	notoNKo: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansNKo-Regular.ttf', 0],
	notoNewTaiLue: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansNewTaiLue-Regular.ttf', 0],
	notoOgham: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansOgham-Regular.ttf', 0],
	notoOlChiki: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansOlChiki-Regular.ttf', 0],
	notoOldItalic: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansOldItalic-Regular.ttf', 0],
	notoOldPersian: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansOldPersian-Regular.ttf', 0],
	notoOldSouthArabian: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansOldSouthArabian-Regular.ttf', 0],
	notoOldTurkic: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansOldTurkic-Regular.ttf', 0],
	notoOsmanya: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansOsmanya-Regular.ttf', 0],
	notoPhagsPa: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansPhagsPa-Regular.ttf', 0],
	notoPhoenician: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansPhoenician-Regular.ttf', 0],
	notoRejang: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansRejang-Regular.ttf', 0],
	notoRunic: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansRunic-Regular.ttf', 0],
	notoSamaritan: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansSamaritan-Regular.ttf', 0],
	notoSaurashtra: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansSaurashtra-Regular.ttf', 0],
	notoShavian: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansShavian-Regular.ttf', 0],
	notoSundanese: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansSundanese-Regular.ttf', 0],
	notoSylotiNagri: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansSylotiNagri-Regular.ttf', 0],
	notoSymbols: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansSymbols-Regular.ttf', 1], //prefer TwitterColorEmoji over NotoSymbols
	notoSyriac: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansSyriacWestern-Regular.ttf', 0],
	notoTagalog: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansTagalog-Regular.ttf', 0],
	notoTagbanwa: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansTagbanwa-Regular.ttf', 0],
	notoTaiLe: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansTaiLe-Regular.ttf', 0],
	notoTaiTham: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansTaiTham-Regular.ttf', 0],
	notoTaiViet: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansTaiViet-Regular.ttf', 0],
	notoTifinagh: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansTifinagh-Regular.ttf', 0],
	notoUgaritic: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansUgaritic-Regular.ttf', 0],
	notoVai: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansVai-Regular.ttf', 0],
	notoYi: ['https://cdn.rawgit.com/googlei18n/noto-fonts/7aa32030/unhinted/NotoSansYi-Regular.ttf', 0],

	notoCJK: ['https://cdn.rawgit.com/googlei18n/noto-cjk/496e2f1b/NotoSansCJKjp-Regular.otf', 0]
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
		'notoEgyptianHieroglyphs'
		//Anatolian Hieroglyphs
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
		//Chakma
		//Newa
		//Mro
		'notoLepcha',
		'notoTibetan',
		//Warang Citi
		'notoSaurashtra',
		'notoMongolian'
	],
	southCentralAsia3: [
		'notoBrahmi',
		//Bhaiksuki
		//Marchen
		'notoKharoshthi',
		'notoPhagsPa',
		'notoOldTurkic'
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
	],
	americas: [
		'notoCherokee',
		//Osage
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