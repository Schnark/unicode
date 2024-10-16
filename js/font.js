(function () {
"use strict";

function cdnLink (repo, path) {
	var repos = {
		//emojione: 'gh/Ranks/emojione@844221d8931592dcc188caa74b7cad085a186bc8/',
		delan: 'gh/delan/charming@7e6545fe5c22be3d66423466978f2b6f8e795b22/', //fonts no longer in use there
		noto: 'gh/notofonts/notofonts.github.io@0f60329462d271c235250be61f62f4203c251539/',
		cjk: 'gh/notofonts/noto-cjk@9b0f1436e455d902de067a2501422e5dc71ad16b/'
	};
	return 'https://cdn.jsdelivr.net/' + repos[repo] + path;
}

function noto (font, serif) {
	var name = 'Noto' + (serif || 'Sans') + font;
	return cdnLink('noto', 'fonts/' + name + '/hinted/ttf/' + name + '-Regular.ttf');
}

var webfonts = [], prios = [[], [], ['sans-serif']], orig, fonts = {
	//emojiOne: [cdnLink('emojione', 'extras/fonts/emojione-svg.woff'), 0],
	twitterColorEmoji: [cdnLink('delan', 'dist/TwitterColorEmoji-SVGinOT.ttf'), 0],
	symbola: [cdnLink('delan', 'dist/Symbola.ttf'), 1],

	notoSans: [noto(''), 0],
	notoAdlam: [noto('Adlam'), 0],
	notoAnatolianHieroglyphs: [noto('AnatolianHieroglyphs'), 0],
	notoArabic: [noto('Arabic'), 0],
	notoArmenian: [noto('Armenian'), 0],
	notoAvestan: [noto('Avestan'), 0],
	notoBalinese: [noto('Balinense'), 0],
	notoBamum: [noto('Bamum'), 0],
	notoBassaVah: [noto('BassaVah'), 0],
	notoBatak: [noto('Batak'), 0],
	notoBengali: [noto('Bengali'), 0],
	notoBhaiksuki: [noto('Bhaiksuki'), 0],
	notoBrahmi: [noto('Brahmi'), 0],
	notoBuginese: [noto('Buginese'), 0],
	notoBuhid: [noto('Buhid'), 0],
	notoCanadianAboriginal: [noto('CanadianAboriginal'), 0],
	notoCaucasianAlbanian: [noto('CaucasianAlbanian'), 0],
	notoCarian: [noto('Carian'), 0],
	notoChakma: [noto('Chakma'), 0],
	notoCham: [noto('Cham'), 0],
	notoCherokee: [noto('Cherokee'), 0],
	notoChorasmian: [noto('Chorasmian'), 0],
	notoCoptic: [noto('Coptic'), 0],
	notoCuneiform: [noto('Cuneiform'), 0],
	notoCypriot: [noto('Cypriot'), 0],
	notoCyproMinoan: [noto('CyproMinoan'), 0],
	notoDeseret: [noto('Deseret'), 0],
	notoDuployan: [noto('Duployan'), 0],
	notoDevanagari: [noto('Devanagari'), 0],
	notoEgyptianHieroglyphs: [noto('EgyptianHieroglyphs'), 0],
	notoElbasan: [noto('Elbasan'), 0],
	notoElymaic: [noto('Elymaic'), 0],
	notoEthiopic: [noto('Ethiopic'), 0],
	notoGeorgian: [noto('Georgian'), 0],
	notoGlagolitic: [noto('Glagolitic'), 0],
	notoGothic: [noto('Gothic'), 0],
	notoGrantha: [noto('Grantha'), 0],
	notoGujarati: [noto('Gujarati'), 0],
	notoGunjalaGondi: [noto('GunjalaGondi'), 0],
	notoGurmukhi: [noto('Gurmukhi'), 0],
	notoHanifiRohingya: [noto('HanifiRohingya'), 0],
	notoHanunoo: [noto('Hanunoo'), 0],
	notoHatran: [noto('Hatran'), 0],
	notoHebrew: [noto('Hebrew'), 0],
	notoImperialAramaic: [noto('ImperialAramaic'), 0],
	notoIndicSiyaqNumbers: [noto('IndicSiyaqNumbers'), 0],
	notoInscriptionalPahlavi: [noto('InscriptionalPahlavi'), 0],
	notoInscriptionalParthian: [noto('InscriptionalParthian'), 0],
	notoJavanese: [noto('Javanese'), 0],
	notoKaithi: [noto('Kaithi'), 0],
	notoKannada: [noto('Kannada'), 0],
	notoKayahLi: [noto('KayahLi'), 0],
	notoKawi: [noto('Kawi'), 0],
	notoKharoshthi: [noto('Kharoshthi'), 0],
	notoKhmer: [noto('Khmer'), 0],
	notoKhojki: [noto('Khojki'), 0],
	notoKhudawadi: [noto('Khudawadi'), 0],
	notoLao: [noto('Lao'), 0],
	notoLepcha: [noto('Lepcha'), 0],
	notoLimbu: [noto('Limbu'), 0],
	notoLinearA: [noto('LinearA'), 0],
	notoLinearB: [noto('LinearB'), 0],
	notoLisu: [noto('Lisu'), 0],
	notoLycian: [noto('Lycian'), 0],
	notoLydian: [noto('Lydian'), 0],
	notoMahajani: [noto('Mahajani'), 0],
	notoMalayalam: [noto('Malayalam'), 0],
	notoMandaic: [noto('Mandaic'), 0],
	notoManichaean: [noto('Manichaean'), 0],
	notoMarchen: [noto('Marchen'), 0],
	notoMasaramGondi: [noto('MasaramGondi'), 0],
	notoMath: [noto('Math'), 0],
	notoMayanNumerals: [noto('MayanNumerals'), 0],
	notoMedefaidrin: [noto('Medefaidrin'), 0],
	notoMeeteiMayek: [noto('MeeteiMayek'), 0],
	notoMendeKikakui: [noto('MendeKikakui'), 0],
	notoMerotic: [noto('Merotic'), 0],
	notoMiao: [noto('Miao'), 0],
	notoModi: [noto('Modi'), 0],
	notoMongolian: [noto('Mongolian'), 0],
	notoMro: [noto('Mro'), 0],
	notoMultani: [noto('Multani'), 0],
	notoMyanmar: [noto('Myanmar'), 0],
	notoNabataean: [noto('Nabataean'), 0],
	notoNagMundari: [noto('NagMundari'), 0],
	notoNandinagari: [noto('Nandinagari'), 0],
	notoNewa: [noto('Newa'), 0],
	notoNewTaiLue: [noto('NewTaiLue'), 0],
	notoNKo: [noto('NKo'), 0],
	notoNushu: [noto('Nushu'), 0],
	notoOgham: [noto('Ogham'), 0],
	notoOlChiki: [noto('OlChiki'), 0],
	notoOldHungarian: [noto('OldHungarian'), 0],
	notoOldItalic: [noto('OldItalic'), 0],
	notoOldNorthArabian: [noto('OldNorthArabian'), 0],
	notoOldPermic: [noto('OldPermic'), 0],
	notoOldPersian: [noto('OldPersian'), 0],
	notoOldSogdian: [noto('OldSogdian'), 0],
	notoOldSouthArabian: [noto('OldSouthArabian'), 0],
	notoOldTurkic: [noto('OldTurkic'), 0],
	notoOriya: [noto('Oriya'), 0],
	notoOsage: [noto('Osage'), 0],
	notoOsmanya: [noto('Osmanya'), 0],
	notoPahawhHmong: [noto('PahawhHmong'), 0],
	notoPalmyrene: [noto('Palmyrene'), 0],
	notoPauCinHau: [noto('PauCinHau'), 0],
	notoPhagsPa: [noto('PhagsPa'), 0],
	notoPhoenician: [noto('Phoenician'), 0],
	notoPsalterPahlavi: [noto('PsalterPahlavi'), 0],
	notoRejang: [noto('Rejang'), 0],
	notoRunic: [noto('Runic'), 0],
	notoSamaritan: [noto('Samaritan'), 0],
	notoSaurashtra: [noto('Saurashtra'), 0],
	notoSharada: [noto('Sharada'), 0],
	notoShavian: [noto('Shavian'), 0],
	notoSiddham: [noto('Siddham'), 0],
	notoSignWriting: [noto('SignWriting'), 0],
	notoSinhala: [noto('Sinhala'), 0],
	notoSogdian: [noto('Sogdian'), 0],
	notoSoraSompeng: [noto('SoraSompeng'), 0],
	notoSoyombo: [noto('Soyombo'), 0],
	notoSundanese: [noto('Sundanese'), 0],
	notoSylotiNagri: [noto('SylotiNagri'), 0],
	notoSymbols: [noto('Symbols'), 0],
	notoSymbols2: [noto('Symbols2'), 0],
	notoSyriac: [noto('Syriac'), 0],
	notoTagalog: [noto('Tagalog'), 0],
	notoTagbanwa: [noto('Tagbanwa'), 0],
	notoTaiLe: [noto('TaiLe'), 0],
	notoTaiTham: [noto('TaiTham'), 0],
	notoTaiViet: [noto('TaiViet'), 0],
	notoTakri: [noto('Takri'), 0],
	notoTamil: [noto('Tamil'), 0],
	notoTamilSupplement: [noto('TamilSupplement'), 0],
	notoTangsa: [noto('Tangsa'), 0],
	notoTelugu: [noto('Telugu'), 0],
	notoThaana: [noto('Thaana'), 0],
	notoThai: [noto('Thai'), 0],
	notoTifinagh: [noto('Tifinagh'), 0],
	notoTirhuta: [noto('Tirhuta'), 0],
	notoUgaritic: [noto('Ugaritic'), 0],
	notoVai: [noto('Vai'), 0],
	notoVithkuqi: [noto('Vithkuqi'), 0],
	notoWancho: [noto('Wancho'), 0],
	notoWarangCiti: [noto('WarangCiti'), 0],
	notoYi: [noto('Yi'), 0],
	notoZanabazarSquare: [noto('ZanabazarSquare'), 0],

	notoAhom: [noto('Ahom', 'Serif'), 0],
	notoDivesAkuru: [noto('DivesAkuru', 'Serif'), 0],
	notoDogra: [noto('Dogra', 'Serif'), 0],
	notoMakasar: [noto('Makasar', 'Serif'), 0],
	notoNyiakengPuachueHmong: [noto('NyiakengPuachueHmong', 'Serif'), 0],
	notoTangut: [noto('Tangut', 'Serif'), 0],
	notoTibetan: [noto('Tibetan', 'Serif'), 0],
	notoYezidi: [noto('Yezidi', 'Serif'), 0],

	notoMusic: [noto('', 'Music'), 0], //NotoMusic
	notoZnamennyMusicalNotation: [noto('', 'ZnamennyMusicalNotation'), 0],

	notoCJK: [cdnLink('cjk', 'Serif/OTF/Japanese/NotoSerifCJKjp-Regular.otf'), 0]
}, fontGroups = {
	//grouped like in the Unicode Standard
	notationalSystemsSymbols: [
		'notoSymbols', 'notoSymbols2',
		'notoMath',
		'notoMusic',
		'notoZnamennyMusicalNotation',
		'notoIndicSiyaqNumbers',
		'notoMayanNumerals',
		'notoDuployan',
		'notoSignWriting',
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
		'notoLinearA',
		'notoLinearB',
		'notoCypriot',
		'notoCyproMinoan',
		'notoLydian', 'notoLycian', 'notoCarian', //Anatolian Alphabets
		'notoOldItalic',
		'notoRunic',
		'notoOldHungarian',
		'notoGothic',
		'notoElbasan',
		'notoCaucasianAlbanian',
		'notoVithkuqi',
		//Todhri
		'notoOldPermic',
		'notoOgham',
		'notoShavian'
	],
	middleEast1: [
		'notoHebrew',
		'notoArabic',
		'notoSyriac',
		'notoSamaritan',
		'notoMandaic',
		'notoYezidi'
	],
	middleEast2: [
		'notoOldNorthArabian',
		'notoOldSouthArabian',
		'notoPhoenician',
		'notoImperialAramaic',
		'notoManichaean',
		'notoInscriptionalParthian',
		'notoInscriptionalPahlavi',
		'notoPsalterPahlavi',
		'notoAvestan',
		'notoChorasmian',
		'notoElymaic',
		'notoNabataean',
		'notoPalmyrene',
		'notoHatran'
	],
	cuneiformHieroglyphs: [
		'notoCuneiform',
		'notoUgaritic',
		'notoOldPersian',
		'notoEgyptianHieroglyphs',
		'notoMerotic',
		'notoAnatolianHieroglyphs'
	],
	southCentralAsia1: [
		'notoDevanagari',
		'notoBengali',
		'notoGurmukhi',
		'notoGujarati',
		'notoOriya',
		'notoTamil', 'notoTamilSupplement',
		'notoTelugu',
		'notoKannada',
		'notoMalayalam'
	],
	southCentralAsia2: [
		'notoThaana',
		'notoSinhala',
		'notoNewa',
		'notoTibetan',
		'notoMongolian',
		'notoLimbu',
		'notoMeeteiMayek',
		'notoMro',
		'notoWarangCiti',
		'notoOlChiki',
		//Ol Onal
		'notoNagMundari',
		'notoChakma',
		'notoLepcha',
		'notoSaurashtra',
		'notoMasaramGondi',
		'notoGunjalaGondi',
		'notoWancho',
		//Toto
		'notoTangsa'
		//Sunuwar
		//Gurung Khema
		//Kirat Rai
	],
	southCentralAsia3: [
		'notoBrahmi',
		'notoKharoshthi',
		'notoBhaiksuki',
		'notoPhagsPa',
		'notoMarchen',
		'notoZanabazarSquare',
		'notoSoyombo',
		'notoOldTurkic',
		'notoOldSogdian',
		'notoSogdian'
		//Old Uyghur
	],
	southCentralAsia4: [
		'notoSylotiNagri',
		'notoKaithi',
		'notoSharada',
		'notoTakri',
		'notoSiddham',
		'notoMahajani',
		'notoKhojki',
		'notoDogra',
		'notoKhudawadi',
		'notoMultani',
		'notoTirhuta',
		'notoModi',
		'notoNandinagari',
		'notoGrantha',
		'notoDivesAkuru',
		'notoAhom',
		'notoSoraSompeng'
		//Tulu-Tigalari
	],
	southeastAsia: [
		'notoThai',
		'notoLao',
		'notoMyanmar',
		'notoKhmer',
		'notoTaiLe',
		'notoNewTaiLue',
		'notoTaiTham',
		'notoTaiViet',
		'notoKayahLi',
		'notoCham',
		'notoPahawhHmong',
		'notoNyiakengPuachueHmong',
		'notoPauCinHau',
		'notoHanifiRohingya'
	],
	indonesiaOceania: [
		'notoTagalog',
		'notoHanunoo',
		'notoBuhid',
		'notoTagbanwa',
		'notoBuginese',
		'notoBalinese',
		'notoJavanese',
		'notoRejang',
		'notoBatak',
		'notoSundanese',
		'notoMakasar',
		'notoKawi'
	],
	eastAsia: [
		'notoCJK',
		//the following are probably somewhere included
		//Bopomofo
		//Hiragana
		//Katakana
		//Hangul
		'notoYi',
		'notoNushu',
		'notoLisu',
		'notoMiao',
		'notoTangut'
		//Khitan Small Script
	],
	africa: [
		'notoEthiopic',
		'notoOsmanya',
		'notoTifinagh',
		'notoNKo',
		'notoVai',
		'notoBamum',
		'notoBassaVah',
		'notoMendeKikakui',
		'notoAdlam',
		'notoMedefaidrin'
		//Garay
	],
	americas: [
		'notoCherokee',
		'notoCanadianAboriginal',
		'notoOsage',
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