

//////////////////////////////////////////////////////////////////
// Default global variables
//////////////////////////////////////////////////////////////////

"use strict";

// Identifiers provided by the ECMAScript standard.
exports.vars = {};

exports.vars.reservedVars = {
	arguments : {writable: false, type: 'Arguments'},
	NaN       : {writable: false, type: 'Number'}
};

exports.vars.ecmaIdentifiers = {
	Array              : {writable: false, type: 'Function'},
	Boolean            : {writable: false, type: 'Function'},
	Date               : {writable: false, type: 'Function'},
	decodeURI          : {writable: false, type: 'Function'},
	decodeURIComponent : {writable: false, type: 'Function'},
	encodeURI          : {writable: false, type: 'Function'},
	encodeURIComponent : {writable: false, type: 'Function'},
	Error              : {writable: false, type: 'Function'},
	"eval"             : {writable: false, type: 'Function'},
	EvalError          : {writable: false, type: 'Function'},
	Function           : {writable: false, type: 'Function'},
	hasOwnProperty     : {writable: false, type: 'Function'},
	isFinite           : {writable: false, type: 'Function'},
	isNaN              : {writable: false, type: 'Function'},
	JSON               : {writable: false, type: 'JSON'},
	Math               : {writable: false, type: 'Math'},
	Map                : {writable: false, type: 'Function'},
	Number             : {writable: false, type: 'Function'},
	Object             : {writable: false, type: 'Function'},
	parseInt           : {writable: false, type: 'Function'},
	parseFloat         : {writable: false, type: 'Function'},
	RangeError         : {writable: false, type: 'Function'},
	ReferenceError     : {writable: false, type: 'Function'},
	RegExp             : {writable: false, type: 'Function'},
	Set                : {writable: false, type: 'Function'},
	String             : {writable: false, type: 'Function'},
	SyntaxError        : {writable: false, type: 'Function'},
	TypeError          : {writable: false, type: 'Function'},
	URIError           : {writable: false, type: 'Function'},
	WeakMap            : {writable: false, type: 'Function'}
};

// Global variables commonly provided by a web browser environment.

exports.vars.browser = {
	ArrayBuffer          : {writable: false, type: 'Function'},
	ArrayBufferView      : {writable: false, type: 'Function'},
	Audio                : {writable: false, type: 'Function'},
	Blob                 : {writable: false, type: 'Function'},
	addEventListener     : {writable: false, type: 'Function'},
	applicationCache     : {writable: false, type: 'Function'},
	atob                 : {writable: false, type: 'Function'},
	blur                 : {writable: false, type: 'Function'},
	btoa                 : {writable: false, type: 'Function'},
	clearInterval        : {writable: false, type: 'Function'},
	clearTimeout         : {writable: false, type: 'Function'},
	close                : {writable: false, type: 'Function'},
	closed               : {writable: false, type: 'Function'},
	DataView             : {writable: false, type: 'Function'},
	DOMParser            : {writable: false, type: 'Function'},
	defaultStatus        : {writable: false, type: 'String'},
	document             : {writable: false, type: 'HTMLDocument'},
	Element              : {writable: false, type: 'Function'},
	event                : {writable: false, type: 'Event'},
	FileReader           : {writable: false, type: 'Function'},
	Float32Array         : {writable: false, type: 'Function'},
	Float64Array         : {writable: false, type: 'Function'},
	FormData             : {writable: false, type: 'Function'},
	focus                : {writable: false, type: 'Function'},
	frames               : {writable: false, type: 'global'},
	getComputedStyle     : {writable: false, type: 'Function'},
	HTMLElement          : {writable: false, type: 'Function'},
	HTMLAnchorElement    : {writable: false, type: 'Function'},
	HTMLBaseElement      : {writable: false, type: 'Function'},
	HTMLBlockquoteElement: {writable: false, type: 'Function'},
	HTMLBodyElement      : {writable: false, type: 'Function'},
	HTMLBRElement        : {writable: false, type: 'Function'},
	HTMLButtonElement    : {writable: false, type: 'Function'},
	HTMLCanvasElement    : {writable: false, type: 'Function'},
	HTMLDirectoryElement : {writable: false, type: 'Function'},
	HTMLDivElement       : {writable: false, type: 'Function'},
	HTMLDListElement     : {writable: false, type: 'Function'},
	HTMLFieldSetElement  : {writable: false, type: 'Function'},
	HTMLFontElement      : {writable: false, type: 'Function'},
	HTMLFormElement      : {writable: false, type: 'Function'},
	HTMLFrameElement     : {writable: false, type: 'Function'},
	HTMLFrameSetElement  : {writable: false, type: 'Function'},
	HTMLHeadElement      : {writable: false, type: 'Function'},
	HTMLHeadingElement   : {writable: false, type: 'Function'},
	HTMLHRElement        : {writable: false, type: 'Function'},
	HTMLHtmlElement      : {writable: false, type: 'Function'},
	HTMLIFrameElement    : {writable: false, type: 'Function'},
	HTMLImageElement     : {writable: false, type: 'Function'},
	HTMLInputElement     : {writable: false, type: 'Function'},
	HTMLIsIndexElement   : {writable: false, type: 'Function'},
	HTMLLabelElement     : {writable: false, type: 'Function'},
	HTMLLayerElement     : {writable: false, type: 'Function'},
	HTMLLegendElement    : {writable: false, type: 'Function'},
	HTMLLIElement        : {writable: false, type: 'Function'},
	HTMLLinkElement      : {writable: false, type: 'Function'},
	HTMLMapElement       : {writable: false, type: 'Function'},
	HTMLMenuElement      : {writable: false, type: 'Function'},
	HTMLMetaElement      : {writable: false, type: 'Function'},
	HTMLModElement       : {writable: false, type: 'Function'},
	HTMLObjectElement    : {writable: false, type: 'Function'},
	HTMLOListElement     : {writable: false, type: 'Function'},
	HTMLOptGroupElement  : {writable: false, type: 'Function'},
	HTMLOptionElement    : {writable: false, type: 'Function'},
	HTMLParagraphElement : {writable: false, type: 'Function'},
	HTMLParamElement     : {writable: false, type: 'Function'},
	HTMLPreElement       : {writable: false, type: 'Function'},
	HTMLQuoteElement     : {writable: false, type: 'Function'},
	HTMLScriptElement    : {writable: false, type: 'Function'},
	HTMLSelectElement    : {writable: false, type: 'Function'},
	HTMLStyleElement     : {writable: false, type: 'Function'},
	HTMLTableCaptionElement: {writable: false, type: 'Function'},
	HTMLTableCellElement : {writable: false, type: 'Function'},
	HTMLTableColElement  : {writable: false, type: 'Function'},
	HTMLTableElement     : {writable: false, type: 'Function'},
	HTMLTableRowElement  : {writable: false, type: 'Function'},
	HTMLTableSectionElement: {writable: false, type: 'Function'},
	HTMLTextAreaElement  : {writable: false, type: 'Function'},
	HTMLTitleElement     : {writable: false, type: 'Function'},
	HTMLUListElement     : {writable: false, type: 'Function'},
	HTMLVideoElement     : {writable: false, type: 'Function'},
	history              : {writable: false, type: 'History'},
	Int16Array           : {writable: false, type: 'Function'},
	Int32Array           : {writable: false, type: 'Function'},
	Int8Array            : {writable: false, type: 'Function'},
	Image                : {writable: false, type: 'Function'},
	length               : {writable: false, type: 'Number'},
	localStorage         : {writable: false, type: 'Storage'},
	location             : {writable: false, type: 'Location'},
	MessageChannel       : {writable: false, type: 'Function'},
	MessageEvent         : {writable: false, type: 'Function'},
	MessagePort          : {writable: false, type: 'Function'},
	moveBy               : {writable: false, type: 'Function'},
	moveTo               : {writable: false, type: 'Function'},
	MutationObserver     : {writable: false, type: 'Function'},
	name                 : {writable: false, type: 'String'},
	Node                 : {writable: false, type: 'Function'},
	NodeFilter           : {writable: false, type: 'Function'},
	navigator            : {writable: false, type: 'Navigator'},
	onbeforeunload       : {writable: true, type: 'Function'},
	onblur               : {writable: true, type: 'Function'},
	onerror              : {writable: true, type: 'Function'},
	onfocus              : {writable: true, type: 'Function'},
	onload               : {writable: true, type: 'Function'},
	onresize             : {writable: true, type: 'Function'},
	onunload             : {writable: true, type: 'Function'},
	open                 : {writable: false, type: 'Function'},
	openDatabase         : {writable: false, type: 'Function'},
	opener               : {writable: false, type: 'Object'},
	Option               : {writable: false, type: 'Function'},
	parent               : {writable: false, type: 'global'},
	print                : {writable: false, type: 'Function'},
	removeEventListener  : {writable: false, type: 'Function'},
	resizeBy             : {writable: false, type: 'Function'},
	resizeTo             : {writable: false, type: 'Function'},
	screen               : {writable: false, type: 'Screen'},
	scroll               : {writable: false, type: 'Function'},
	scrollBy             : {writable: false, type: 'Function'},
	scrollTo             : {writable: false, type: 'Function'},
	sessionStorage       : {writable: false, type: 'Storage'},
	setInterval          : {writable: false, type: 'Function'},
	setTimeout           : {writable: false, type: 'Function'},
	SharedWorker         : {writable: false, type: 'Function'},
	status               : {writable: false, type: 'String'},
	top                  : {writable: false, type: 'global'},
	Uint16Array          : {writable: false, type: 'Function'},
	Uint32Array          : {writable: false, type: 'Function'},
	Uint8Array           : {writable: false, type: 'Function'},
	Uint8ClampedArray    : {writable: false, type: 'Function'},
	WebSocket            : {writable: false, type: 'Function'},
	window               : {writable: false, type: 'global'},
	Worker               : {writable: false, type: 'Function'},
	XMLHttpRequest       : {writable: false, type: 'Function'},
	XMLSerializer        : {writable: false, type: 'Function'},
	XPathEvaluator       : {writable: false, type: 'Function'},
	XPathException       : {writable: false, type: 'Function'},
	XPathExpression      : {writable: false, type: 'Function'},
	XPathNamespace       : {writable: false, type: 'Function'},
	XPathNSResolver      : {writable: false, type: 'Function'},
	XPathResult          : {writable: false, type: 'Function'}
};

exports.vars.devel = {
	alert  : {writable: false, type: 'Function'},
	confirm: {writable: false, type: 'Function'},
	console: {writable: false, type: 'Console'},
	Debug  : {writable: false, type: 'Function'},
	opera  : {writable: false, type: 'Object'},
	prompt : {writable: false, type: 'Function'}
};

exports.vars.worker = {
	importScripts: {writable: true, type: 'Function'},
	postMessage  : {writable: true, type: 'Function'},
	self         : {writable: true, type: 'global'}
};

// Widely adopted global names that are not part of ECMAScript standard
exports.vars.nonstandard = {
	escape  : {writable: false, type: 'Function'},
	unescape: {writable: false, type: 'Function'}
};

// Globals provided by popular JavaScript environments.

// exports.vars.couch = {
// 	"require" : false,
// 	respond   : false,
// 	getRow    : false,
// 	emit      : false,
// 	send      : false,
// 	start     : false,
// 	sum       : false,
// 	log       : false,
// 	exports   : false,
// 	module    : false,
// 	provides  : false
// };

exports.vars.node = {
	__filename   : {writable: false, type: 'String'},
	__dirname    : {writable: false, type: 'String'},
	Buffer       : {writable: false, type: 'Function'},
	DataView     : {writable: false, type: 'Function'},
	console      : {writable: false, type: 'Console'},
	exports      : {writable: true, type: 'Function'},  // In Node it is ok to exports = module.exports = foo();
	GLOBAL       : {writable: false, type: 'global'},
	global       : {writable: false, type: 'global'},
	module       : {writable: false, type: 'Object'},
	process      : {writable: false, type: 'process'},
	require      : {writable: false, type: 'Function'},
	setTimeout   : {writable: false, type: 'Function'},
	clearTimeout : {writable: false, type: 'Function'},
	setInterval  : {writable: false, type: 'Function'},
	clearInterval: {writable: false, type: 'Function'}
};

// exports.vars.rhino = {
// 	defineClass  : false,
// 	deserialize  : false,
// 	gc           : false,
// 	help         : false,
// 	importPackage: false,
// 	"java"       : false,
// 	load         : false,
// 	loadClass    : false,
// 	print        : false,
// 	quit         : false,
// 	readFile     : false,
// 	readUrl      : false,
// 	runCommand   : false,
// 	seal         : false,
// 	serialize    : false,
// 	spawn        : false,
// 	sync         : false,
// 	toint32      : false,
// 	version      : false
// };

// exports.vars.wsh = {
// 	ActiveXObject            : true,
// 	Enumerator               : true,
// 	GetObject                : true,
// 	ScriptEngine             : true,
// 	ScriptEngineBuildVersion : true,
// 	ScriptEngineMajorVersion : true,
// 	ScriptEngineMinorVersion : true,
// 	VBArray                  : true,
// 	WSH                      : true,
// 	WScript                  : true,
// 	XDomainRequest           : true
// };

// Globals provided by popular JavaScript libraries.

exports.vars.dojo = {
	dojo     : {writable: false, type: 'Dojo'},
	dijit    : {writable: false, type: 'Dijit'},
	dojox    : {writable: false, type: 'Dojox'},
	define	 : {writable: false, type: 'Function'},
	"require": {writable: false, type: 'Function'}
};

exports.vars.jquery = {
	"$"    : {writable: false, type: 'Function'},
	jQuery : {writable: false, type: 'Function'}
};

// exports.vars.mootools = {
// 	"$"           : false,
// 	"$$"          : false,
// 	Asset         : false,
// 	Browser       : false,
// 	Chain         : false,
// 	Class         : false,
// 	Color         : false,
// 	Cookie        : false,
// 	Core          : false,
// 	Document      : false,
// 	DomReady      : false,
// 	DOMEvent      : false,
// 	DOMReady      : false,
// 	Drag          : false,
// 	Element       : false,
// 	Elements      : false,
// 	Event         : false,
// 	Events        : false,
// 	Fx            : false,
// 	Group         : false,
// 	Hash          : false,
// 	HtmlTable     : false,
// 	Iframe        : false,
// 	IframeShim    : false,
// 	InputValidator: false,
// 	instanceOf    : false,
// 	Keyboard      : false,
// 	Locale        : false,
// 	Mask          : false,
// 	MooTools      : false,
// 	Native        : false,
// 	Options       : false,
// 	OverText      : false,
// 	Request       : false,
// 	Scroller      : false,
// 	Slick         : false,
// 	Slider        : false,
// 	Sortables     : false,
// 	Spinner       : false,
// 	Swiff         : false,
// 	Tips          : false,
// 	Type          : false,
// 	typeOf        : false,
// 	URI           : false,
// 	Window        : false
// };

// exports.vars.prototypejs = {
// 	"$"               : false,
// 	"$$"              : false,
// 	"$A"              : false,
// 	"$F"              : false,
// 	"$H"              : false,
// 	"$R"              : false,
// 	"$break"          : false,
// 	"$continue"       : false,
// 	"$w"              : false,
// 	Abstract          : false,
// 	Ajax              : false,
// 	Class             : false,
// 	Enumerable        : false,
// 	Element           : false,
// 	Event             : false,
// 	Field             : false,
// 	Form              : false,
// 	Hash              : false,
// 	Insertion         : false,
// 	ObjectRange       : false,
// 	PeriodicalExecuter: false,
// 	Position          : false,
// 	Prototype         : false,
// 	Selector          : false,
// 	Template          : false,
// 	Toggle            : false,
// 	Try               : false,
// 	Autocompleter     : false,
// 	Builder           : false,
// 	Control           : false,
// 	Draggable         : false,
// 	Draggables        : false,
// 	Droppables        : false,
// 	Effect            : false,
// 	Sortable          : false,
// 	SortableObserver  : false,
// 	Sound             : false,
// 	Scriptaculous     : false
// };

exports.vars.yui = {
	YUI       : {writable: false, type: 'Function'},
	Y         : {writable: false, type: 'YUI'},
	YUI_config: {writable: false, type: 'Object'}
};

//////////////////////////////////////////////////////////////////
// Platforms
//////////////////////////////////////////////////////////////////
exports.platforms = {
    'winrt': {
        name: 'winrt',
        desc: 'Microsoft Windows Runtime (Windows Store App)',
        vars: ['browser', 'devel', 'nonstandard']
    },
    'ie10': {
        name: 'ie10',
        desc: 'Microsoft Internet Explorer 10 (IE10)',
        vars: ['browser', 'devel', 'nonstandard']
    },
    'chrome': {
        name: 'chrome',
        desc: 'Google Chrome (Chromium) browser',
        vars: ['browser', 'devel', 'nonstandard']
    },
    'ff': {
        name: 'ff',
        desc: 'Mozilla Firefox browser',
        vars: ['browser', 'devel', 'nonstandard']
    },
    'opera': {
        name: 'opera',
        desc: 'Opera browser',
        vars: ['browser', 'devel', 'nonstandard']
    }
};

exports.libraries = {
    'jquery': {
        name: 'jquery',
        desc: 'jQuery',
        vars: ['jquery']
    }
};

//////////////////////////////////////////////////////////////////
// Analyzers
//////////////////////////////////////////////////////////////////
exports.analyzers = [
"putLengthIntoLocalVar-analyzer.js",
"reduceEval-analyzer.js",
"cacheGlobalVarWithLocalVar-analyzer.js",
"reduceTryCatch-analyzer.js",
"childNodesToNextSibling-analyzer.js",
"reduceWith-analyzer.js",
"CSSTransform-analyzer.js",
"removeGetElementFromLoop-analyzer.js",
"addClass-jquery.js",
"each-analyzer-jquery.js",
"on-event-jquery.js",
"reduce-domOperationInloop-jquery.js",
"selector-find-jquery.js",
"selector-id-jquery.js",
"requestAnimationFrame-analyzer.js",
"forEach-analyzer.js",
"innerHtml-analyzer.js",
"loadingScript-analyzer.js",
"toLocaleString-analyzer.js",
"numberToNumber-analyzer.js",
"useClassName-analyzer.js",
"parseIntToNumber-analyzer.js",
"valueOfToNumber-analyzer.js",
"putCollectionToArray-analyzer.js",
"avoidUsingForinOnArray.js",
"revokeObjectURL.js"];
