(function () {
"use strict";

function cdnLink (repo, path) {
	var repos = {
		//emojione: 'gh/Ranks/emojione@844221d8931592dcc188caa74b7cad085a186bc8/',
		delan: 'gh/delan/charming@e9cd209e2f6073066cc372bce357cec286675c1e/',
		noto: 'gh/googlei18n/noto-fonts@fadc9ff5dd82c9ae781d3ba40ae4c238310e06e7/',
		cjk: 'gh/googlei18n/noto-cjk@be6c059ac1587e556e2412b27f5155c8eb3ddbe6/'
	};
	return 'https://cdn.jsdelivr.net/' + repos[repo] + path;
}

var webfonts = [], prios = [[], [], ['sans-serif']], orig, fonts = {
	//emojiOne: [cdnLink('emojione', 'extras/fonts/emojione-svg.woff'), 0],
	twitterColorEmoji: [cdnLink('delan', 'TwitterColorEmoji-SVGinOT.ttf'), 0],
	symbola: [cdnLink('delan', 'Symbola.ttf'), 1],

	notoSans: [cdnLink('noto', 'hinted/NotoSans-Regular.ttf'), 0],
	notoAdlam: [cdnLink('noto', 'hinted/NotoSansAdlam-Regular.ttf'), 0],
	notoAnatolianHieroglyphs: [cdnLink('noto', 'hinted/NotoSansAnatolianHieroglyphs-Regular.ttf'), 0],
	notoArabic: [cdnLink('noto', 'hinted/NotoSansArabic-Regular.ttf'), 0],
	notoArmenian: [cdnLink('noto', 'hinted/NotoSansArmenian-Regular.ttf'), 0],
	notoAvestan: [cdnLink('noto', 'hinted/NotoSansAvestan-Regular.ttf'), 0],
	notoBalinese: [cdnLink('noto', 'hinted/NotoSerifBalinese-Regular.ttf'), 0], //NB Serif
	notoBamum: [cdnLink('noto', 'hinted/NotoSansBamum-Regular.ttf'), 0],
	notoBassaVah: [cdnLink('noto', 'hinted/NotoSansBassaVah-Regular.ttf'), 0],
	notoBatak: [cdnLink('noto', 'hinted/NotoSansBatak-Regular.ttf'), 0],
	notoBengali: [cdnLink('noto', 'hinted/NotoSansBengali-Regular.ttf'), 0],
	notoBhaiksuki: [cdnLink('noto', 'hinted/NotoSansBhaiksuki-Regular.ttf'), 0],
	notoBrahmi: [cdnLink('noto', 'hinted/NotoSansBrahmi-Regular.ttf'), 0],
	notoBuginese: [cdnLink('noto', 'hinted/NotoSansBuginese-Regular.ttf'), 0],
	notoBuhid: [cdnLink('noto', 'hinted/NotoSansBuhid-Regular.ttf'), 0],
	notoCaucasianAlbanian: [cdnLink('noto', 'hinted/NotoSansCaucasianAlbanian-Regular.ttf'), 0],
	notoCanadianAboriginal: [cdnLink('noto', 'hinted/NotoSansCanadianAboriginal-Regular.ttf'), 0],
	notoCarian: [cdnLink('noto', 'hinted/NotoSansCarian-Regular.ttf'), 0],
	notoChakma: [cdnLink('noto', 'hinted/NotoSansChakma-Regular.ttf'), 0],
	notoCham: [cdnLink('noto', 'hinted/NotoSansCham-Regular.ttf'), 0],
	notoCherokee: [cdnLink('noto', 'hinted/NotoSansCherokee-Regular.ttf'), 0],
	notoCoptic: [cdnLink('noto', 'hinted/NotoSansCoptic-Regular.ttf'), 0],
	notoCuneiform: [cdnLink('noto', 'hinted/NotoSansCuneiform-Regular.ttf'), 0],
	notoCypriot: [cdnLink('noto', 'hinted/NotoSansCypriot-Regular.ttf'), 0],
	notoDeseret: [cdnLink('noto', 'hinted/NotoSansDeseret-Regular.ttf'), 0],
	notoDuployan: [cdnLink('noto', 'hinted/NotoSansDuployan-Regular.ttf'), 0],
	notoDevanagari: [cdnLink('noto', 'hinted/NotoSansDevanagari-Regular.ttf'), 0],
	notoEgyptianHieroglyphs: [cdnLink('noto', 'hinted/NotoSansEgyptianHieroglyphs-Regular.ttf'), 0],
	notoElbasan: [cdnLink('noto', 'hinted/NotoSansElbasan-Regular.ttf'), 0],
	notoEthiopic: [cdnLink('noto', 'hinted/NotoSansEthiopic-Regular.ttf'), 0],
	notoGeorgian: [cdnLink('noto', 'hinted/NotoSansGeorgian-Regular.ttf'), 0],
	notoGlagolitic: [cdnLink('noto', 'hinted/NotoSansGlagolitic-Regular.ttf'), 0],
	notoGothic: [cdnLink('noto', 'hinted/NotoSansGothic-Regular.ttf'), 0],
	notoGrantha: [cdnLink('noto', 'hinted/NotoSansGrantha-Regular.ttf'), 0],
	notoGujarati: [cdnLink('noto', 'hinted/NotoSansGujarati-Regular.ttf'), 0],
	notoGurmukhi: [cdnLink('noto', 'hinted/NotoSansGurmukhi-Regular.ttf'), 0],
	notoHanunoo: [cdnLink('noto', 'hinted/NotoSansHanunoo-Regular.ttf'), 0],
	notoHatran: [cdnLink('noto', 'hinted/NotoSansHatran-Regular.ttf'), 0],
	notoHebrew: [cdnLink('noto', 'hinted/NotoSansHebrew-Regular.ttf'), 0],
	notoImperialAramaic: [cdnLink('noto', 'hinted/NotoSansImperialAramaic-Regular.ttf'), 0],
	notoInscriptionalPahlavi: [cdnLink('noto', 'hinted/NotoSansInscriptionalPahlavi-Regular.ttf'), 0],
	notoInscriptionalParthian: [cdnLink('noto', 'hinted/NotoSansInscriptionalParthian-Regular.ttf'), 0],
	notoJavanese: [cdnLink('noto', 'hinted/NotoSansJavanese-Regular.ttf'), 0],
	notoKaithi: [cdnLink('noto', 'hinted/NotoSansKaithi-Regular.ttf'), 0],
	notoKannada: [cdnLink('noto', 'hinted/NotoSansKannada-Regular.ttf'), 0],
	notoKayahLi: [cdnLink('noto', 'hinted/NotoSansKayahLi-Regular.ttf'), 0],
	notoKharoshthi: [cdnLink('noto', 'hinted/NotoSansKharoshthi-Regular.ttf'), 0],
	notoKhmer: [cdnLink('noto', 'hinted/NotoSansKhmer-Regular.ttf'), 0],
	notoKhojki: [cdnLink('noto', 'hinted/NotoSansKhojki-Regular.ttf'), 0],
	notoKhudawadi: [cdnLink('noto', 'hinted/NotoSansKhudawadi-Regular.ttf'), 0],
	notoLao: [cdnLink('noto', 'hinted/NotoSansLao-Regular.ttf'), 0],
	notoLepcha: [cdnLink('noto', 'hinted/NotoSansLepcha-Regular.ttf'), 0],
	notoLimbu: [cdnLink('noto', 'hinted/NotoSansLimbu-Regular.ttf'), 0],
	notoLinearA: [cdnLink('noto', 'hinted/NotoSansLinearA-Regular.ttf'), 0],
	notoLinearB: [cdnLink('noto', 'hinted/NotoSansLinearB-Regular.ttf'), 0],
	notoLisu: [cdnLink('noto', 'hinted/NotoSansLisu-Regular.ttf'), 0],
	notoLycian: [cdnLink('noto', 'hinted/NotoSansLycian-Regular.ttf'), 0],
	notoLydian: [cdnLink('noto', 'hinted/NotoSansLydian-Regular.ttf'), 0],
	notoMahajani: [cdnLink('noto', 'hinted/NotoSansMahajani-Regular.ttf'), 0],
	notoMalayalam: [cdnLink('noto', 'hinted/NotoSansMalayalam-Regular.ttf'), 0],
	notoMandaic: [cdnLink('noto', 'hinted/NotoSansMandaic-Regular.ttf'), 0],
	notoManichaean: [cdnLink('noto', 'hinted/NotoSansManichaean-Regular.ttf'), 0],
	notoMarchen: [cdnLink('noto', 'hinted/NotoSansMarchen-Regular.ttf'), 0],
	notoMath: [cdnLink('noto', 'hinted/NotoSansMath-Regular.ttf'), 0],
	notoMeeteiMayek: [cdnLink('noto', 'hinted/NotoSansMeeteiMayek-Regular.ttf'), 0],
	notoMendeKikakui: [cdnLink('noto', 'hinted/NotoSansMendeKikakui-Regular.ttf'), 0],
	notoMerotic: [cdnLink('noto', 'hinted/NotoSansMerotic-Regular.ttf'), 0],
	notoMiao: [cdnLink('noto', 'hinted/NotoSansMiao-Regular.ttf'), 0],
	notoModi: [cdnLink('noto', 'hinted/NotoSansModi-Regular.ttf'), 0],
	notoMongolian: [cdnLink('noto', 'hinted/NotoSansMongolian-Regular.ttf'), 0],
	notoMro: [cdnLink('noto', 'hinted/NotoSansMro-Regular.ttf'), 0],
	notoMultani: [cdnLink('noto', 'hinted/NotoSansMultani-Regular.ttf'), 0],
	notoMyanmar: [cdnLink('noto', 'hinted/NotoSansMyanmar-Regular.ttf'), 0],
	notoNabataean: [cdnLink('noto', 'hinted/NotoSansNabataean-Regular.ttf'), 0],
	notoNewa: [cdnLink('noto', 'hinted/NotoSansNewa-Regular.ttf'), 0],
	notoNewTaiLue: [cdnLink('noto', 'hinted/NotoSansNewTaiLue-Regular.ttf'), 0],
	notoNKo: [cdnLink('noto', 'hinted/NotoSansNKo-Regular.ttf'), 0],
	notoOgham: [cdnLink('noto', 'hinted/NotoSansOgham-Regular.ttf'), 0],
	notoOlChiki: [cdnLink('noto', 'hinted/NotoSansOlChiki-Regular.ttf'), 0],
	notoOldHungarian: [cdnLink('noto', 'hinted/NotoSansOldHungarian-Regular.ttf'), 0],
	notoOldItalic: [cdnLink('noto', 'hinted/NotoSansOldItalic-Regular.ttf'), 0],
	notoOldNorthArabian: [cdnLink('noto', 'hinted/NotoSansOldNorthArabian-Regular.ttf'), 0],
	notoOldPermic: [cdnLink('noto', 'hinted/NotoSansOldPermic-Regular.ttf'), 0],
	notoOldPersian: [cdnLink('noto', 'hinted/NotoSansOldPersian-Regular.ttf'), 0],
	notoOldSouthArabian: [cdnLink('noto', 'hinted/NotoSansOldSouthArabian-Regular.ttf'), 0],
	notoOldTurkic: [cdnLink('noto', 'hinted/NotoSansOldTurkic-Regular.ttf'), 0],
	notoOriya: [cdnLink('noto', 'hinted/NotoSansOriya-Regular.ttf'), 0],
	notoOsage: [cdnLink('noto', 'hinted/NotoSansOsage-Regular.ttf'), 0],
	notoOsmanya: [cdnLink('noto', 'hinted/NotoSansOsmanya-Regular.ttf'), 0],
	notoPahawhHmong: [cdnLink('noto', 'hinted/NotoSansPahawhHmong-Regular.ttf'), 0],
	notoPalmyrene: [cdnLink('noto', 'hinted/NotoSansPalmyrene-Regular.ttf'), 0],
	notoPauCinHau: [cdnLink('noto', 'hinted/NotoSansPauCinHau-Regular.ttf'), 0],
	notoPhagsPa: [cdnLink('noto', 'hinted/NotoSansPhagsPa-Regular.ttf'), 0],
	notoPhoenician: [cdnLink('noto', 'hinted/NotoSansPhoenician-Regular.ttf'), 0],
	notoPsalterPahlavi: [cdnLink('noto', 'hinted/NotoSansPsalterPahlavi-Regular.ttf'), 0],
	notoRejang: [cdnLink('noto', 'hinted/NotoSansRejang-Regular.ttf'), 0],
	notoRunic: [cdnLink('noto', 'hinted/NotoSansRunic-Regular.ttf'), 0],
	notoSamaritan: [cdnLink('noto', 'hinted/NotoSansSamaritan-Regular.ttf'), 0],
	notoSaurashtra: [cdnLink('noto', 'hinted/NotoSansSaurashtra-Regular.ttf'), 0],
	notoSharada: [cdnLink('noto', 'hinted/NotoSansSharada-Regular.ttf'), 0],
	notoShavian: [cdnLink('noto', 'hinted/NotoSansShavian-Regular.ttf'), 0],
	notoSinhala: [cdnLink('noto', 'hinted/NotoSansSinhala-Regular.ttf'), 0],
	notoSoraSompeng: [cdnLink('noto', 'hinted/NotoSansSoraSompeng-Regular.ttf'), 0],
	notoSundanese: [cdnLink('noto', 'hinted/NotoSansSundanese-Regular.ttf'), 0],
	notoSymbols: [cdnLink('noto', 'hinted/NotoSansSymbols-Regular.ttf'), 0],
	notoSylotiNagri: [cdnLink('noto', 'hinted/NotoSansSylotiNagri-Regular.ttf'), 0],
	notoSyriac: [cdnLink('noto', 'hinted/NotoSansSyriac-Regular.ttf'), 0],
	notoTagalog: [cdnLink('noto', 'hinted/NotoSansTagalog-Regular.ttf'), 0],
	notoTagbanwa: [cdnLink('noto', 'hinted/NotoSansTagbanwa-Regular.ttf'), 0],
	notoTaiLe: [cdnLink('noto', 'hinted/NotoSansTaiLe-Regular.ttf'), 0],
	notoTaiTham: [cdnLink('noto', 'hinted/NotoSansTaiTham-Regular.ttf'), 0],
	notoTaiViet: [cdnLink('noto', 'hinted/NotoSansTaiViet-Regular.ttf'), 0],
	notoTakri: [cdnLink('noto', 'hinted/NotoSansTakri-Regular.ttf'), 0],
	notoTamil: [cdnLink('noto', 'hinted/NotoSansTamil-Regular.ttf'), 0],
	notoTelugu: [cdnLink('noto', 'hinted/NotoSansTelugu-Regular.ttf'), 0],
	notoThaana: [cdnLink('noto', 'hinted/NotoSansThaana-Regular.ttf'), 0],
	notoThai: [cdnLink('noto', 'hinted/NotoSansThai-Regular.ttf'), 0],
	notoTibetan: [cdnLink('noto', 'hinted/NotoSansTibetan-Regular.ttf'), 0],
	notoTifinagh: [cdnLink('noto', 'hinted/NotoSansTifinagh-Regular.ttf'), 0],
	notoTirhuta: [cdnLink('noto', 'hinted/NotoSansTirhuta-Regular.ttf'), 0],
	notoUgaritic: [cdnLink('noto', 'hinted/NotoSansUgaritic-Regular.ttf'), 0],
	notoVai: [cdnLink('noto', 'hinted/NotoSansVai-Regular.ttf'), 0],
	notoWarangCiti: [cdnLink('noto', 'hinted/NotoSansWarangCiti-Regular.ttf'), 0],
	notoYi: [cdnLink('noto', 'hinted/NotoSansYi-Regular.ttf'), 0],

	notoCJK: [cdnLink('cjk', 'NotoSansCJKjp-Regular.otf'), 0]
}, fontGroups = {
	//grouped like in the Unicode Standard
	notationalSystemsSymbols: [
		'notoSymbols',
		'notoMath',
		'notoDuployan',
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
		'notoOldItalic',
		'notoCaucasianAlbanian',
		'notoLinearA',
		'notoLinearB',
		'notoRunic',
		'notoOldPermic',
		'notoCypriot',
		'notoOldHungarian',
		'notoOgham',
		'notoLydian', 'notoLycian', 'notoCarian', //Anatolian Alphabets
		'notoGothic',
		'notoShavian',
		'notoElbasan'
	],
	middleEast1: [
		'notoHebrew',
		'notoSyriac',
		'notoMandaic',
		'notoArabic',
		'notoSamaritan'
	],
	middleEast2: [
		'notoOldNorthArabian',
		'notoManichaean',
		'notoNabataean',
		'notoOldSouthArabian',
		'notoInscriptionalParthian',
		'notoInscriptionalPahlavi',
		'notoPsalterPahlavi',
		'notoPalmyrene',
		'notoPhoenician',
		'notoAvestan',
		'notoHatran',
		'notoImperialAramaic'
		//Elymaic
	],
	cuneiformHieroglyphs: [
		'notoCuneiform',
		'notoOldPersian',
		'notoMerotic',
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
		'notoNewa',
		'notoMro',
		'notoLepcha',
		'notoTibetan',
		'notoWarangCiti',
		'notoSaurashtra',
		'notoMongolian'
		//Masaram Gondi
		//Gunjala Gondi
		//Wancho
	],
	southCentralAsia3: [
		'notoBrahmi',
		'notoBhaiksuki',
		'notoMarchen',
		'notoKharoshthi',
		'notoPhagsPa',
		'notoOldTurkic'
		//Zanabazar Square
		//Old Sogdian
		//Soyombo
		//Sogdian
	],
	southCentralAsia4: [
		'notoSylotiNagri',
		'notoMahajani',
		'notoModi',
		'notoKaithi',
		'notoKhojki',
		//Nandinagari
		'notoGrantha',
		'notoSharada',
		'notoKhudawadi',
		//Ahom
		'notoTakri',
		'notoMultani',
		'notoSoraSompeng',
		//Siddham
		'notoTirhuta'
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
		'notoPahawhHmong',
		//Nyiakeng Puachue Hmong
		'notoKhmer',
		'notoTaiViet',
		'notoPauCinHau'
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
		'notoMiao',
		//Hiragana
		'notoYi'
		//Tangut
		//Nüshu
	],
	africa: [
		'notoEthiopic',
		'notoNKo',
		'notoBassaVah',
		'notoOsmanya',
		'notoVai',
		'notoMendeKikakui',
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