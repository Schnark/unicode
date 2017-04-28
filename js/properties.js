(function (global) {
"use strict";

function toNumber (hex) {
	return parseInt(hex, 16);
}

function parseCodepoint (codepoint) {
	var i;
	i = codepoint.indexOf('..');
	if (i === -1) {
		return [toNumber(codepoint), toNumber(codepoint)];
	} else {
		return [toNumber(codepoint.slice(0, i)), toNumber(codepoint.slice(i + 2))];
	}
}

function CodepointList () {
	this.length = 0;
	this.list = [];
}

CodepointList.prototype.add = function (codepoint) {
	var i;
	codepoint = parseCodepoint(codepoint);
	this.length += codepoint[1] - codepoint[0] + 1;
	for (i = this.list.length; i > 0; i--) {
		if (this.list[i - 1][0] < codepoint[0]) {
			break;
		}
	}
	this.list.splice(i, 0, codepoint);
};

CodepointList.prototype.forEach = function (callback) {
	var i, c;
	for (i = 0; i < this.list.length; i++) {
		for (c = this.list[i][0]; c <= this.list[i][1]; c++) {
			callback(c);
		}
	}
};

CodepointList.prototype.contains = function (codepoint) {
	var first = 0, last = this.list.length - 1, middle;
	if (this.list[first][0] > codepoint) {
		return false;
	}
	if (this.list[first][1] >= codepoint) {
		return true;
	}
	if (this.list[last][1] < codepoint) {
		return false;
	}
	if (this.list[last][0] <= codepoint) {
		return true;
	}
	while (last - first > 1) {
		middle = Math.floor((first + last) / 2);
		if (this.list[middle][0] > codepoint) {
			last = middle;
		} else if (this.list[middle][1] < codepoint) {
			first = middle;
		} else {
			return true;
		}
	}
	return false;
};

CodepointList.prototype.getMax = function () {
	return this.list.length ? this.list[this.list.length - 1][1] : -1;
};

function EnumProperty (fallback) {
	this.properties = [];
	this.data = {};
	this.fallback = fallback;
}

EnumProperty.prototype.add = function (codepoint, property) {
	if (this.properties.indexOf(property) === -1) {
		this.properties.push(property);
		this.data[property] = new CodepointList();
	}
	this.data[property].add(codepoint);
};

EnumProperty.prototype.getProperty = function (codepoint) {
	var i, property;
	for (i = 0; i < this.properties.length; i++) {
		property = this.properties[i];
		if (this.data[property].contains(codepoint)) {
			return property;
		}
	}
	return typeof this.fallback === 'function' ? this.fallback(codepoint) : this.fallback;
};

EnumProperty.prototype.getList = function (property) {
	return this.data[property] || new CodepointList();
};

EnumProperty.prototype.getProperties = function () {
	return this.properties;
};

function MapProperty (fallback, unique) {
	this.fallback = fallback;
	this.unique = !!unique;
	this.data = {};
}

MapProperty.prototype.add = function (codepoint, property) {
	var c = parseCodepoint(codepoint);
	for (codepoint = c[0]; codepoint <= c[1]; codepoint++) {
		if (this.unique) {
			this.data[codepoint] = property;
		} else {
			if (!this.data[codepoint]) {
				this.data[codepoint] = [];
			}
			this.data[codepoint].push(property);
		}
	}
};

MapProperty.prototype.addSequence = function (sequence) {
	this.add(sequence.getBase(), sequence);
};

MapProperty.prototype.getProperty = function (codepoint) {
	return this.data[codepoint] || (typeof this.fallback === 'function' ? this.fallback(codepoint) : this.fallback);
};

function CodepointSequence (seq, name, base) {
	seq = seq.split(/\s+/);
	this.name = name;
	this.base = base || seq[0];
	this.seq = seq.map(toNumber);
}

CodepointSequence.prototype.getName = function () {
	return this.name;
};

CodepointSequence.prototype.getLength = function () {
	return this.seq.length;
};

CodepointSequence.prototype.getBase = function () {
	return this.base;
};

CodepointSequence.prototype.format = function (m, j) {
	return this.seq.map(m).join(j || '');
};

global.CodepointList = CodepointList;
global.EnumProperty = EnumProperty;
global.MapProperty = MapProperty;
global.CodepointSequence = CodepointSequence;

})(window);