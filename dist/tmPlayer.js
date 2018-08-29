var bundle = (function (exports) {
	'use strict';

	function __$styleInject(css) {
	    if (!css) return;

	    if (typeof window == 'undefined') return;
	    var style = document.createElement('style');
	    style.setAttribute('media', 'screen');

	    style.innerHTML = css;
	    document.head.appendChild(style);
	    return css;
	}

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.5.7' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var document$1 = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is = _isObject(document$1) && _isObject(document$1.createElement);
	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var _redefine = createCommonjsModule(function (module) {
	var SRC = _uid('src');
	var TO_STRING = 'toString';
	var $toString = Function[TO_STRING];
	var TPL = ('' + $toString).split(TO_STRING);

	_core.inspectSource = function (it) {
	  return $toString.call(it);
	};

	(module.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
	  if (O[key] === val) return;
	  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if (O === _global) {
	    O[key] = val;
	  } else if (!safe) {
	    delete O[key];
	    _hide(O, key, val);
	  } else if (O[key]) {
	    O[key] = val;
	  } else {
	    _hide(O, key, val);
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString() {
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});
	});

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
	  var key, own, out, exp;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // extend global
	    if (target) _redefine(target, key, out, type & $export.U);
	    // export
	    if (exports[key] != out) _hide(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};
	_global.core = _core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	var _meta = createCommonjsModule(function (module) {
	var META = _uid('meta');


	var setDesc = _objectDp.f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !_fails(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META, { value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  } });
	};
	var fastKey = function (it, create) {
	  // return primitive with prefix
	  if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function (it, create) {
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};
	});
	var _meta_1 = _meta.KEY;
	var _meta_2 = _meta.NEED;
	var _meta_3 = _meta.fastKey;
	var _meta_4 = _meta.getWeak;
	var _meta_5 = _meta.onFreeze;

	var _library = false;

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode: _library ? 'pure' : 'global',
	  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
	});
	});

	var _wks = createCommonjsModule(function (module) {
	var store = _shared('wks');

	var Symbol = _global.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var def = _objectDp.f;

	var TAG = _wks('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

	var f$1 = _wks;

	var _wksExt = {
		f: f$1
	};

	var defineProperty = _objectDp.f;
	var _wksDefine = function (name) {
	  var $Symbol = _core.Symbol || (_core.Symbol = _library ? {} : _global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: _wksExt.f(name) });
	};

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var shared = _shared('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (_has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var f$2 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$2
	};

	var f$3 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$3
	};

	// all enumerable object keys, includes symbols



	var _enumKeys = function (it) {
	  var result = _objectKeys(it);
	  var getSymbols = _objectGops.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = _objectPie.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  } return result;
	};

	// 7.2.2 IsArray(argument)

	var _isArray = Array.isArray || function isArray(arg) {
	  return _cof(arg) == 'Array';
	};

	var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  _anObject(O);
	  var keys = _objectKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

	var document$2 = _global.document;
	var _html = document$2 && document$2.documentElement;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$1 = _sharedKey('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE$1 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate('iframe');
	  var i = _enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$1] = _anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : _objectDps(result, Properties);
	};

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

	var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

	var f$4 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return _objectKeysInternal(O, hiddenKeys);
	};

	var _objectGopn = {
		f: f$4
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

	var gOPN = _objectGopn.f;
	var toString$1 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	var f$5 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
	};

	var _objectGopnExt = {
		f: f$5
	};

	var gOPD = Object.getOwnPropertyDescriptor;

	var f$6 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = _toIobject(O);
	  P = _toPrimitive(P, true);
	  if (_ie8DomDefine) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
	};

	var _objectGopd = {
		f: f$6
	};

	// ECMAScript 6 symbols shim





	var META = _meta.KEY;



















	var gOPD$1 = _objectGopd.f;
	var dP$1 = _objectDp.f;
	var gOPN$1 = _objectGopnExt.f;
	var $Symbol = _global.Symbol;
	var $JSON = _global.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE$2 = 'prototype';
	var HIDDEN = _wks('_hidden');
	var TO_PRIMITIVE = _wks('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = _shared('symbol-registry');
	var AllSymbols = _shared('symbols');
	var OPSymbols = _shared('op-symbols');
	var ObjectProto = Object[PROTOTYPE$2];
	var USE_NATIVE = typeof $Symbol == 'function';
	var QObject = _global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = _descriptors && _fails(function () {
	  return _objectCreate(dP$1({}, 'a', {
	    get: function () { return dP$1(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD$1(ObjectProto, key);
	  if (protoDesc) delete ObjectProto[key];
	  dP$1(it, key, D);
	  if (protoDesc && it !== ObjectProto) dP$1(ObjectProto, key, protoDesc);
	} : dP$1;

	var wrap = function (tag) {
	  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
	  _anObject(it);
	  key = _toPrimitive(key, true);
	  _anObject(D);
	  if (_has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!_has(it, HIDDEN)) dP$1(it, HIDDEN, _propertyDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP$1(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  _anObject(it);
	  var keys = _enumKeys(P = _toIobject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = _toPrimitive(key, true));
	  if (this === ObjectProto && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
	  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = _toIobject(it);
	  key = _toPrimitive(key, true);
	  if (it === ObjectProto && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
	  var D = gOPD$1(it, key);
	  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN$1(_toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto;
	  var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto) $set.call(OPSymbols, value);
	      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, _propertyDesc(1, value));
	    };
	    if (_descriptors && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
	    return this._k;
	  });

	  _objectGopd.f = $getOwnPropertyDescriptor;
	  _objectDp.f = $defineProperty;
	  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
	  _objectPie.f = $propertyIsEnumerable;
	  _objectGops.f = $getOwnPropertySymbols;

	  if (_descriptors && !_library) {
	    _redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  _wksExt.f = function (name) {
	    return wrap(_wks(name));
	  };
	}

	_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Symbol: $Symbol });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j = 0; es6Symbols.length > j;)_wks(es6Symbols[j++]);

	for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

	_export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return _has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
	    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
	  },
	  useSetter: function () { setter = true; },
	  useSimple: function () { setter = false; }
	});

	_export(_export.S + _export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    $replacer = replacer = args[1];
	    if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    if (!_isArray(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	_setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	_setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	_setToStringTag(_global.JSON, 'JSON', true);

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	_export(_export.S, 'Object', { create: _objectCreate });

	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

	// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperties: _objectDps });

	// most Object methods by ES6 should accept primitives



	var _objectSap = function (KEY, exec) {
	  var fn = (_core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
	};

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)

	var $getOwnPropertyDescriptor$1 = _objectGopd.f;

	_objectSap('getOwnPropertyDescriptor', function () {
	  return function getOwnPropertyDescriptor(it, key) {
	    return $getOwnPropertyDescriptor$1(_toIobject(it), key);
	  };
	});

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	var IE_PROTO$2 = _sharedKey('IE_PROTO');
	var ObjectProto$1 = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = _toObject(O);
	  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto$1 : null;
	};

	// 19.1.2.9 Object.getPrototypeOf(O)



	_objectSap('getPrototypeOf', function () {
	  return function getPrototypeOf(it) {
	    return _objectGpo(_toObject(it));
	  };
	});

	// 19.1.2.14 Object.keys(O)



	_objectSap('keys', function () {
	  return function keys(it) {
	    return _objectKeys(_toObject(it));
	  };
	});

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	_objectSap('getOwnPropertyNames', function () {
	  return _objectGopnExt.f;
	});

	// 19.1.2.5 Object.freeze(O)

	var meta = _meta.onFreeze;

	_objectSap('freeze', function ($freeze) {
	  return function freeze(it) {
	    return $freeze && _isObject(it) ? $freeze(meta(it)) : it;
	  };
	});

	// 19.1.2.17 Object.seal(O)

	var meta$1 = _meta.onFreeze;

	_objectSap('seal', function ($seal) {
	  return function seal(it) {
	    return $seal && _isObject(it) ? $seal(meta$1(it)) : it;
	  };
	});

	// 19.1.2.15 Object.preventExtensions(O)

	var meta$2 = _meta.onFreeze;

	_objectSap('preventExtensions', function ($preventExtensions) {
	  return function preventExtensions(it) {
	    return $preventExtensions && _isObject(it) ? $preventExtensions(meta$2(it)) : it;
	  };
	});

	// 19.1.2.12 Object.isFrozen(O)


	_objectSap('isFrozen', function ($isFrozen) {
	  return function isFrozen(it) {
	    return _isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
	  };
	});

	// 19.1.2.13 Object.isSealed(O)


	_objectSap('isSealed', function ($isSealed) {
	  return function isSealed(it) {
	    return _isObject(it) ? $isSealed ? $isSealed(it) : false : true;
	  };
	});

	// 19.1.2.11 Object.isExtensible(O)


	_objectSap('isExtensible', function ($isExtensible) {
	  return function isExtensible(it) {
	    return _isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
	  };
	});

	// 19.1.2.1 Object.assign(target, source, ...)





	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || _fails(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = _toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = _objectGops.f;
	  var isEnum = _objectPie.f;
	  while (aLen > index) {
	    var S = _iobject(arguments[index++]);
	    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	  } return T;
	} : $assign;

	// 19.1.3.1 Object.assign(target, source)


	_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

	// 7.2.9 SameValue(x, y)
	var _sameValue = Object.is || function is(x, y) {
	  // eslint-disable-next-line no-self-compare
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

	// 19.1.3.10 Object.is(value1, value2)

	_export(_export.S, 'Object', { is: _sameValue });

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */


	var check = function (O, proto) {
	  _anObject(O);
	  if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	var _setProto = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function (test, buggy, set) {
	      try {
	        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch (e) { buggy = true; }
	      return function setPrototypeOf(O, proto) {
	        check(O, proto);
	        if (buggy) O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

	// 19.1.3.19 Object.setPrototypeOf(O, proto)

	_export(_export.S, 'Object', { setPrototypeOf: _setProto.set });

	// getting tag from 19.1.3.6 Object.prototype.toString()

	var TAG$1 = _wks('toStringTag');
	// ES3 wrong here
	var ARG = _cof(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	var _classof = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
	    // builtinTag case
	    : ARG ? _cof(O)
	    // ES3 arguments fallback
	    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	// 19.1.3.6 Object.prototype.toString()

	var test = {};
	test[_wks('toStringTag')] = 'z';
	if (test + '' != '[object z]') {
	  _redefine(Object.prototype, 'toString', function toString() {
	    return '[object ' + _classof(this) + ']';
	  }, true);
	}

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	var _invoke = function (fn, args, that) {
	  var un = that === undefined;
	  switch (args.length) {
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return fn.apply(that, args);
	};

	var arraySlice = [].slice;
	var factories = {};

	var construct = function (F, len, args) {
	  if (!(len in factories)) {
	    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
	    // eslint-disable-next-line no-new-func
	    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	  } return factories[len](F, args);
	};

	var _bind = Function.bind || function bind(that /* , ...args */) {
	  var fn = _aFunction(this);
	  var partArgs = arraySlice.call(arguments, 1);
	  var bound = function (/* args... */) {
	    var args = partArgs.concat(arraySlice.call(arguments));
	    return this instanceof bound ? construct(fn, args.length, args) : _invoke(fn, args, that);
	  };
	  if (_isObject(fn.prototype)) bound.prototype = fn.prototype;
	  return bound;
	};

	// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)


	_export(_export.P, 'Function', { bind: _bind });

	var dP$2 = _objectDp.f;
	var FProto = Function.prototype;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME = 'name';

	// 19.2.4.2 name
	NAME in FProto || _descriptors && dP$2(FProto, NAME, {
	  configurable: true,
	  get: function () {
	    try {
	      return ('' + this).match(nameRE)[1];
	    } catch (e) {
	      return '';
	    }
	  }
	});

	var HAS_INSTANCE = _wks('hasInstance');
	var FunctionProto = Function.prototype;
	// 19.2.3.6 Function.prototype[@@hasInstance](V)
	if (!(HAS_INSTANCE in FunctionProto)) _objectDp.f(FunctionProto, HAS_INSTANCE, { value: function (O) {
	  if (typeof this != 'function' || !_isObject(O)) return false;
	  if (!_isObject(this.prototype)) return O instanceof this;
	  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
	  while (O = _objectGpo(O)) if (this.prototype === O) return true;
	  return false;
	} });

	var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var space = '[' + _stringWs + ']';
	var non = '\u200b\u0085';
	var ltrim = RegExp('^' + space + space + '*');
	var rtrim = RegExp(space + space + '*$');

	var exporter = function (KEY, exec, ALIAS) {
	  var exp = {};
	  var FORCE = _fails(function () {
	    return !!_stringWs[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : _stringWs[KEY];
	  if (ALIAS) exp[ALIAS] = fn;
	  _export(_export.P + _export.F * FORCE, 'String', exp);
	};

	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function (string, TYPE) {
	  string = String(_defined(string));
	  if (TYPE & 1) string = string.replace(ltrim, '');
	  if (TYPE & 2) string = string.replace(rtrim, '');
	  return string;
	};

	var _stringTrim = exporter;

	var $parseInt = _global.parseInt;
	var $trim = _stringTrim.trim;

	var hex = /^[-+]?0[xX]/;

	var _parseInt = $parseInt(_stringWs + '08') !== 8 || $parseInt(_stringWs + '0x16') !== 22 ? function parseInt(str, radix) {
	  var string = $trim(String(str), 3);
	  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
	} : $parseInt;

	// 18.2.5 parseInt(string, radix)
	_export(_export.G + _export.F * (parseInt != _parseInt), { parseInt: _parseInt });

	var $parseFloat = _global.parseFloat;
	var $trim$1 = _stringTrim.trim;

	var _parseFloat = 1 / $parseFloat(_stringWs + '-0') !== -Infinity ? function parseFloat(str) {
	  var string = $trim$1(String(str), 3);
	  var result = $parseFloat(string);
	  return result === 0 && string.charAt(0) == '-' ? -0 : result;
	} : $parseFloat;

	// 18.2.4 parseFloat(string)
	_export(_export.G + _export.F * (parseFloat != _parseFloat), { parseFloat: _parseFloat });

	var setPrototypeOf = _setProto.set;
	var _inheritIfRequired = function (that, target, C) {
	  var S = target.constructor;
	  var P;
	  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && _isObject(P) && setPrototypeOf) {
	    setPrototypeOf(that, P);
	  } return that;
	};

	var gOPN$2 = _objectGopn.f;
	var gOPD$2 = _objectGopd.f;
	var dP$3 = _objectDp.f;
	var $trim$2 = _stringTrim.trim;
	var NUMBER = 'Number';
	var $Number = _global[NUMBER];
	var Base = $Number;
	var proto = $Number.prototype;
	// Opera ~12 has broken Object#toString
	var BROKEN_COF = _cof(_objectCreate(proto)) == NUMBER;
	var TRIM = 'trim' in String.prototype;

	// 7.1.3 ToNumber(argument)
	var toNumber = function (argument) {
	  var it = _toPrimitive(argument, false);
	  if (typeof it == 'string' && it.length > 2) {
	    it = TRIM ? it.trim() : $trim$2(it, 3);
	    var first = it.charCodeAt(0);
	    var third, radix, maxCode;
	    if (first === 43 || first === 45) {
	      third = it.charCodeAt(2);
	      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if (first === 48) {
	      switch (it.charCodeAt(1)) {
	        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
	        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
	        default: return +it;
	      }
	      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
	        code = digits.charCodeAt(i);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if (code < 48 || code > maxCode) return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};

	if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
	  $Number = function Number(value) {
	    var it = arguments.length < 1 ? 0 : value;
	    var that = this;
	    return that instanceof $Number
	      // check on 1..constructor(foo) case
	      && (BROKEN_COF ? _fails(function () { proto.valueOf.call(that); }) : _cof(that) != NUMBER)
	        ? _inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
	  };
	  for (var keys = _descriptors ? gOPN$2(Base) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES6 (in case, if modules with ES6 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	  ).split(','), j$1 = 0, key; keys.length > j$1; j$1++) {
	    if (_has(Base, key = keys[j$1]) && !_has($Number, key)) {
	      dP$3($Number, key, gOPD$2(Base, key));
	    }
	  }
	  $Number.prototype = proto;
	  proto.constructor = $Number;
	  _redefine(_global, NUMBER, $Number);
	}

	var _aNumberValue = function (it, msg) {
	  if (typeof it != 'number' && _cof(it) != 'Number') throw TypeError(msg);
	  return +it;
	};

	var _stringRepeat = function repeat(count) {
	  var str = String(_defined(this));
	  var res = '';
	  var n = _toInteger(count);
	  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
	  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
	  return res;
	};

	var $toFixed = 1.0.toFixed;
	var floor$1 = Math.floor;
	var data = [0, 0, 0, 0, 0, 0];
	var ERROR = 'Number.toFixed: incorrect invocation!';
	var ZERO = '0';

	var multiply = function (n, c) {
	  var i = -1;
	  var c2 = c;
	  while (++i < 6) {
	    c2 += n * data[i];
	    data[i] = c2 % 1e7;
	    c2 = floor$1(c2 / 1e7);
	  }
	};
	var divide = function (n) {
	  var i = 6;
	  var c = 0;
	  while (--i >= 0) {
	    c += data[i];
	    data[i] = floor$1(c / n);
	    c = (c % n) * 1e7;
	  }
	};
	var numToString = function () {
	  var i = 6;
	  var s = '';
	  while (--i >= 0) {
	    if (s !== '' || i === 0 || data[i] !== 0) {
	      var t = String(data[i]);
	      s = s === '' ? t : s + _stringRepeat.call(ZERO, 7 - t.length) + t;
	    }
	  } return s;
	};
	var pow = function (x, n, acc) {
	  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
	};
	var log = function (x) {
	  var n = 0;
	  var x2 = x;
	  while (x2 >= 4096) {
	    n += 12;
	    x2 /= 4096;
	  }
	  while (x2 >= 2) {
	    n += 1;
	    x2 /= 2;
	  } return n;
	};

	_export(_export.P + _export.F * (!!$toFixed && (
	  0.00008.toFixed(3) !== '0.000' ||
	  0.9.toFixed(0) !== '1' ||
	  1.255.toFixed(2) !== '1.25' ||
	  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
	) || !_fails(function () {
	  // V8 ~ Android 4.3-
	  $toFixed.call({});
	})), 'Number', {
	  toFixed: function toFixed(fractionDigits) {
	    var x = _aNumberValue(this, ERROR);
	    var f = _toInteger(fractionDigits);
	    var s = '';
	    var m = ZERO;
	    var e, z, j, k;
	    if (f < 0 || f > 20) throw RangeError(ERROR);
	    // eslint-disable-next-line no-self-compare
	    if (x != x) return 'NaN';
	    if (x <= -1e21 || x >= 1e21) return String(x);
	    if (x < 0) {
	      s = '-';
	      x = -x;
	    }
	    if (x > 1e-21) {
	      e = log(x * pow(2, 69, 1)) - 69;
	      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
	      z *= 0x10000000000000;
	      e = 52 - e;
	      if (e > 0) {
	        multiply(0, z);
	        j = f;
	        while (j >= 7) {
	          multiply(1e7, 0);
	          j -= 7;
	        }
	        multiply(pow(10, j, 1), 0);
	        j = e - 1;
	        while (j >= 23) {
	          divide(1 << 23);
	          j -= 23;
	        }
	        divide(1 << j);
	        multiply(1, 1);
	        divide(2);
	        m = numToString();
	      } else {
	        multiply(0, z);
	        multiply(1 << -e, 0);
	        m = numToString() + _stringRepeat.call(ZERO, f);
	      }
	    }
	    if (f > 0) {
	      k = m.length;
	      m = s + (k <= f ? '0.' + _stringRepeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
	    } else {
	      m = s + m;
	    } return m;
	  }
	});

	var $toPrecision = 1.0.toPrecision;

	_export(_export.P + _export.F * (_fails(function () {
	  // IE7-
	  return $toPrecision.call(1, undefined) !== '1';
	}) || !_fails(function () {
	  // V8 ~ Android 4.3-
	  $toPrecision.call({});
	})), 'Number', {
	  toPrecision: function toPrecision(precision) {
	    var that = _aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
	    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
	  }
	});

	// 20.1.2.1 Number.EPSILON


	_export(_export.S, 'Number', { EPSILON: Math.pow(2, -52) });

	// 20.1.2.2 Number.isFinite(number)

	var _isFinite = _global.isFinite;

	_export(_export.S, 'Number', {
	  isFinite: function isFinite(it) {
	    return typeof it == 'number' && _isFinite(it);
	  }
	});

	// 20.1.2.3 Number.isInteger(number)

	var floor$2 = Math.floor;
	var _isInteger = function isInteger(it) {
	  return !_isObject(it) && isFinite(it) && floor$2(it) === it;
	};

	// 20.1.2.3 Number.isInteger(number)


	_export(_export.S, 'Number', { isInteger: _isInteger });

	// 20.1.2.4 Number.isNaN(number)


	_export(_export.S, 'Number', {
	  isNaN: function isNaN(number) {
	    // eslint-disable-next-line no-self-compare
	    return number != number;
	  }
	});

	// 20.1.2.5 Number.isSafeInteger(number)


	var abs = Math.abs;

	_export(_export.S, 'Number', {
	  isSafeInteger: function isSafeInteger(number) {
	    return _isInteger(number) && abs(number) <= 0x1fffffffffffff;
	  }
	});

	// 20.1.2.6 Number.MAX_SAFE_INTEGER


	_export(_export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });

	// 20.1.2.10 Number.MIN_SAFE_INTEGER


	_export(_export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });

	// 20.1.2.12 Number.parseFloat(string)
	_export(_export.S + _export.F * (Number.parseFloat != _parseFloat), 'Number', { parseFloat: _parseFloat });

	// 20.1.2.13 Number.parseInt(string, radix)
	_export(_export.S + _export.F * (Number.parseInt != _parseInt), 'Number', { parseInt: _parseInt });

	// 20.2.2.20 Math.log1p(x)
	var _mathLog1p = Math.log1p || function log1p(x) {
	  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
	};

	// 20.2.2.3 Math.acosh(x)


	var sqrt = Math.sqrt;
	var $acosh = Math.acosh;

	_export(_export.S + _export.F * !($acosh
	  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
	  && Math.floor($acosh(Number.MAX_VALUE)) == 710
	  // Tor Browser bug: Math.acosh(Infinity) -> NaN
	  && $acosh(Infinity) == Infinity
	), 'Math', {
	  acosh: function acosh(x) {
	    return (x = +x) < 1 ? NaN : x > 94906265.62425156
	      ? Math.log(x) + Math.LN2
	      : _mathLog1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
	  }
	});

	// 20.2.2.5 Math.asinh(x)

	var $asinh = Math.asinh;

	function asinh(x) {
	  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
	}

	// Tor Browser bug: Math.asinh(0) -> -0
	_export(_export.S + _export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });

	// 20.2.2.7 Math.atanh(x)

	var $atanh = Math.atanh;

	// Tor Browser bug: Math.atanh(-0) -> 0
	_export(_export.S + _export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
	  atanh: function atanh(x) {
	    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
	  }
	});

	// 20.2.2.28 Math.sign(x)
	var _mathSign = Math.sign || function sign(x) {
	  // eslint-disable-next-line no-self-compare
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	};

	// 20.2.2.9 Math.cbrt(x)



	_export(_export.S, 'Math', {
	  cbrt: function cbrt(x) {
	    return _mathSign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
	  }
	});

	// 20.2.2.11 Math.clz32(x)


	_export(_export.S, 'Math', {
	  clz32: function clz32(x) {
	    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
	  }
	});

	// 20.2.2.12 Math.cosh(x)

	var exp = Math.exp;

	_export(_export.S, 'Math', {
	  cosh: function cosh(x) {
	    return (exp(x = +x) + exp(-x)) / 2;
	  }
	});

	// 20.2.2.14 Math.expm1(x)
	var $expm1 = Math.expm1;
	var _mathExpm1 = (!$expm1
	  // Old FF bug
	  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
	  // Tor Browser bug
	  || $expm1(-2e-17) != -2e-17
	) ? function expm1(x) {
	  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
	} : $expm1;

	// 20.2.2.14 Math.expm1(x)



	_export(_export.S + _export.F * (_mathExpm1 != Math.expm1), 'Math', { expm1: _mathExpm1 });

	// 20.2.2.16 Math.fround(x)

	var pow$1 = Math.pow;
	var EPSILON = pow$1(2, -52);
	var EPSILON32 = pow$1(2, -23);
	var MAX32 = pow$1(2, 127) * (2 - EPSILON32);
	var MIN32 = pow$1(2, -126);

	var roundTiesToEven = function (n) {
	  return n + 1 / EPSILON - 1 / EPSILON;
	};

	var _mathFround = Math.fround || function fround(x) {
	  var $abs = Math.abs(x);
	  var $sign = _mathSign(x);
	  var a, result;
	  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
	  a = (1 + EPSILON32 / EPSILON) * $abs;
	  result = a - (a - $abs);
	  // eslint-disable-next-line no-self-compare
	  if (result > MAX32 || result != result) return $sign * Infinity;
	  return $sign * result;
	};

	// 20.2.2.16 Math.fround(x)


	_export(_export.S, 'Math', { fround: _mathFround });

	// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])

	var abs$1 = Math.abs;

	_export(_export.S, 'Math', {
	  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
	    var sum = 0;
	    var i = 0;
	    var aLen = arguments.length;
	    var larg = 0;
	    var arg, div;
	    while (i < aLen) {
	      arg = abs$1(arguments[i++]);
	      if (larg < arg) {
	        div = larg / arg;
	        sum = sum * div * div + 1;
	        larg = arg;
	      } else if (arg > 0) {
	        div = arg / larg;
	        sum += div * div;
	      } else sum += arg;
	    }
	    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
	  }
	});

	// 20.2.2.18 Math.imul(x, y)

	var $imul = Math.imul;

	// some WebKit versions fails with big numbers, some has wrong arity
	_export(_export.S + _export.F * _fails(function () {
	  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
	}), 'Math', {
	  imul: function imul(x, y) {
	    var UINT16 = 0xffff;
	    var xn = +x;
	    var yn = +y;
	    var xl = UINT16 & xn;
	    var yl = UINT16 & yn;
	    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
	  }
	});

	// 20.2.2.21 Math.log10(x)


	_export(_export.S, 'Math', {
	  log10: function log10(x) {
	    return Math.log(x) * Math.LOG10E;
	  }
	});

	// 20.2.2.20 Math.log1p(x)


	_export(_export.S, 'Math', { log1p: _mathLog1p });

	// 20.2.2.22 Math.log2(x)


	_export(_export.S, 'Math', {
	  log2: function log2(x) {
	    return Math.log(x) / Math.LN2;
	  }
	});

	// 20.2.2.28 Math.sign(x)


	_export(_export.S, 'Math', { sign: _mathSign });

	// 20.2.2.30 Math.sinh(x)


	var exp$1 = Math.exp;

	// V8 near Chromium 38 has a problem with very small numbers
	_export(_export.S + _export.F * _fails(function () {
	  return !Math.sinh(-2e-17) != -2e-17;
	}), 'Math', {
	  sinh: function sinh(x) {
	    return Math.abs(x = +x) < 1
	      ? (_mathExpm1(x) - _mathExpm1(-x)) / 2
	      : (exp$1(x - 1) - exp$1(-x - 1)) * (Math.E / 2);
	  }
	});

	// 20.2.2.33 Math.tanh(x)


	var exp$2 = Math.exp;

	_export(_export.S, 'Math', {
	  tanh: function tanh(x) {
	    var a = _mathExpm1(x = +x);
	    var b = _mathExpm1(-x);
	    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp$2(x) + exp$2(-x));
	  }
	});

	// 20.2.2.34 Math.trunc(x)


	_export(_export.S, 'Math', {
	  trunc: function trunc(it) {
	    return (it > 0 ? Math.floor : Math.ceil)(it);
	  }
	});

	var fromCharCode = String.fromCharCode;
	var $fromCodePoint = String.fromCodePoint;

	// length should be 1, old FF problem
	_export(_export.S + _export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
	  // 21.1.2.2 String.fromCodePoint(...codePoints)
	  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
	    var res = [];
	    var aLen = arguments.length;
	    var i = 0;
	    var code;
	    while (aLen > i) {
	      code = +arguments[i++];
	      if (_toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
	      res.push(code < 0x10000
	        ? fromCharCode(code)
	        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
	      );
	    } return res.join('');
	  }
	});

	_export(_export.S, 'String', {
	  // 21.1.2.4 String.raw(callSite, ...substitutions)
	  raw: function raw(callSite) {
	    var tpl = _toIobject(callSite.raw);
	    var len = _toLength(tpl.length);
	    var aLen = arguments.length;
	    var res = [];
	    var i = 0;
	    while (len > i) {
	      res.push(String(tpl[i++]));
	      if (i < aLen) res.push(String(arguments[i]));
	    } return res.join('');
	  }
	});

	// 21.1.3.25 String.prototype.trim()
	_stringTrim('trim', function ($trim) {
	  return function trim() {
	    return $trim(this, 3);
	  };
	});

	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(_defined(that));
	    var i = _toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var _iterators = {};

	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

	var _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
	  _setToStringTag(Constructor, NAME + ' Iterator');
	};

	var ITERATOR = _wks('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  _iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      _setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (typeof IteratorPrototype[ITERATOR] != 'function') _hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if (BUGGY || VALUES_BUG || !proto[ITERATOR]) {
	    _hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  _iterators[NAME] = $default;
	  _iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) _redefine(proto, key, methods[key]);
	    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	var $at = _stringAt(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	_iterDefine(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});

	var $at$1 = _stringAt(false);
	_export(_export.P, 'String', {
	  // 21.1.3.3 String.prototype.codePointAt(pos)
	  codePointAt: function codePointAt(pos) {
	    return $at$1(this, pos);
	  }
	});

	// 7.2.8 IsRegExp(argument)


	var MATCH = _wks('match');
	var _isRegexp = function (it) {
	  var isRegExp;
	  return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
	};

	// helper for String#{startsWith, endsWith, includes}



	var _stringContext = function (that, searchString, NAME) {
	  if (_isRegexp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(_defined(that));
	};

	var MATCH$1 = _wks('match');
	var _failsIsRegexp = function (KEY) {
	  var re = /./;
	  try {
	    '/./'[KEY](re);
	  } catch (e) {
	    try {
	      re[MATCH$1] = false;
	      return !'/./'[KEY](re);
	    } catch (f) { /* empty */ }
	  } return true;
	};

	var ENDS_WITH = 'endsWith';
	var $endsWith = ''[ENDS_WITH];

	_export(_export.P + _export.F * _failsIsRegexp(ENDS_WITH), 'String', {
	  endsWith: function endsWith(searchString /* , endPosition = @length */) {
	    var that = _stringContext(this, searchString, ENDS_WITH);
	    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
	    var len = _toLength(that.length);
	    var end = endPosition === undefined ? len : Math.min(_toLength(endPosition), len);
	    var search = String(searchString);
	    return $endsWith
	      ? $endsWith.call(that, search, end)
	      : that.slice(end - search.length, end) === search;
	  }
	});

	var INCLUDES = 'includes';

	_export(_export.P + _export.F * _failsIsRegexp(INCLUDES), 'String', {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~_stringContext(this, searchString, INCLUDES)
	      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	_export(_export.P, 'String', {
	  // 21.1.3.13 String.prototype.repeat(count)
	  repeat: _stringRepeat
	});

	var STARTS_WITH = 'startsWith';
	var $startsWith = ''[STARTS_WITH];

	_export(_export.P + _export.F * _failsIsRegexp(STARTS_WITH), 'String', {
	  startsWith: function startsWith(searchString /* , position = 0 */) {
	    var that = _stringContext(this, searchString, STARTS_WITH);
	    var index = _toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
	    var search = String(searchString);
	    return $startsWith
	      ? $startsWith.call(that, search, index)
	      : that.slice(index, index + search.length) === search;
	  }
	});

	var quot = /"/g;
	// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
	var createHTML = function (string, tag, attribute, value) {
	  var S = String(_defined(string));
	  var p1 = '<' + tag;
	  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
	  return p1 + '>' + S + '</' + tag + '>';
	};
	var _stringHtml = function (NAME, exec) {
	  var O = {};
	  O[NAME] = exec(createHTML);
	  _export(_export.P + _export.F * _fails(function () {
	    var test = ''[NAME]('"');
	    return test !== test.toLowerCase() || test.split('"').length > 3;
	  }), 'String', O);
	};

	// B.2.3.2 String.prototype.anchor(name)
	_stringHtml('anchor', function (createHTML) {
	  return function anchor(name) {
	    return createHTML(this, 'a', 'name', name);
	  };
	});

	// B.2.3.3 String.prototype.big()
	_stringHtml('big', function (createHTML) {
	  return function big() {
	    return createHTML(this, 'big', '', '');
	  };
	});

	// B.2.3.4 String.prototype.blink()
	_stringHtml('blink', function (createHTML) {
	  return function blink() {
	    return createHTML(this, 'blink', '', '');
	  };
	});

	// B.2.3.5 String.prototype.bold()
	_stringHtml('bold', function (createHTML) {
	  return function bold() {
	    return createHTML(this, 'b', '', '');
	  };
	});

	// B.2.3.6 String.prototype.fixed()
	_stringHtml('fixed', function (createHTML) {
	  return function fixed() {
	    return createHTML(this, 'tt', '', '');
	  };
	});

	// B.2.3.7 String.prototype.fontcolor(color)
	_stringHtml('fontcolor', function (createHTML) {
	  return function fontcolor(color) {
	    return createHTML(this, 'font', 'color', color);
	  };
	});

	// B.2.3.8 String.prototype.fontsize(size)
	_stringHtml('fontsize', function (createHTML) {
	  return function fontsize(size) {
	    return createHTML(this, 'font', 'size', size);
	  };
	});

	// B.2.3.9 String.prototype.italics()
	_stringHtml('italics', function (createHTML) {
	  return function italics() {
	    return createHTML(this, 'i', '', '');
	  };
	});

	// B.2.3.10 String.prototype.link(url)
	_stringHtml('link', function (createHTML) {
	  return function link(url) {
	    return createHTML(this, 'a', 'href', url);
	  };
	});

	// B.2.3.11 String.prototype.small()
	_stringHtml('small', function (createHTML) {
	  return function small() {
	    return createHTML(this, 'small', '', '');
	  };
	});

	// B.2.3.12 String.prototype.strike()
	_stringHtml('strike', function (createHTML) {
	  return function strike() {
	    return createHTML(this, 'strike', '', '');
	  };
	});

	// B.2.3.13 String.prototype.sub()
	_stringHtml('sub', function (createHTML) {
	  return function sub() {
	    return createHTML(this, 'sub', '', '');
	  };
	});

	// B.2.3.14 String.prototype.sup()
	_stringHtml('sup', function (createHTML) {
	  return function sup() {
	    return createHTML(this, 'sup', '', '');
	  };
	});

	// 20.3.3.1 / 15.9.4.4 Date.now()


	_export(_export.S, 'Date', { now: function () { return new Date().getTime(); } });

	_export(_export.P + _export.F * _fails(function () {
	  return new Date(NaN).toJSON() !== null
	    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
	}), 'Date', {
	  // eslint-disable-next-line no-unused-vars
	  toJSON: function toJSON(key) {
	    var O = _toObject(this);
	    var pv = _toPrimitive(O);
	    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
	  }
	});

	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()

	var getTime = Date.prototype.getTime;
	var $toISOString = Date.prototype.toISOString;

	var lz = function (num) {
	  return num > 9 ? num : '0' + num;
	};

	// PhantomJS / old WebKit has a broken implementations
	var _dateToIsoString = (_fails(function () {
	  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
	}) || !_fails(function () {
	  $toISOString.call(new Date(NaN));
	})) ? function toISOString() {
	  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
	  var d = this;
	  var y = d.getUTCFullYear();
	  var m = d.getUTCMilliseconds();
	  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
	  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
	    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
	    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
	    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
	} : $toISOString;

	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()



	// PhantomJS / old WebKit has a broken implementations
	_export(_export.P + _export.F * (Date.prototype.toISOString !== _dateToIsoString), 'Date', {
	  toISOString: _dateToIsoString
	});

	var DateProto = Date.prototype;
	var INVALID_DATE = 'Invalid Date';
	var TO_STRING = 'toString';
	var $toString = DateProto[TO_STRING];
	var getTime$1 = DateProto.getTime;
	if (new Date(NaN) + '' != INVALID_DATE) {
	  _redefine(DateProto, TO_STRING, function toString() {
	    var value = getTime$1.call(this);
	    // eslint-disable-next-line no-self-compare
	    return value === value ? $toString.call(this) : INVALID_DATE;
	  });
	}

	var NUMBER$1 = 'number';

	var _dateToPrimitive = function (hint) {
	  if (hint !== 'string' && hint !== NUMBER$1 && hint !== 'default') throw TypeError('Incorrect hint');
	  return _toPrimitive(_anObject(this), hint != NUMBER$1);
	};

	var TO_PRIMITIVE$1 = _wks('toPrimitive');
	var proto$1 = Date.prototype;

	if (!(TO_PRIMITIVE$1 in proto$1)) _hide(proto$1, TO_PRIMITIVE$1, _dateToPrimitive);

	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)


	_export(_export.S, 'Array', { isArray: _isArray });

	// call something on iterator step with safe closing on error

	var _iterCall = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) _anObject(ret.call(iterator));
	    throw e;
	  }
	};

	// check on default Array iterator

	var ITERATOR$1 = _wks('iterator');
	var ArrayProto = Array.prototype;

	var _isArrayIter = function (it) {
	  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
	};

	var _createProperty = function (object, index, value) {
	  if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));
	  else object[index] = value;
	};

	var ITERATOR$2 = _wks('iterator');

	var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$2]
	    || it['@@iterator']
	    || _iterators[_classof(it)];
	};

	var ITERATOR$3 = _wks('iterator');
	var SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR$3]();
	  riter['return'] = function () { SAFE_CLOSING = true; };
	} catch (e) { /* empty */ }

	var _iterDetect = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7];
	    var iter = arr[ITERATOR$3]();
	    iter.next = function () { return { done: safe = true }; };
	    arr[ITERATOR$3] = function () { return iter; };
	    exec(arr);
	  } catch (e) { /* empty */ }
	  return safe;
	};

	_export(_export.S + _export.F * !_iterDetect(function (iter) { }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	    var O = _toObject(arrayLike);
	    var C = typeof this == 'function' ? this : Array;
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var index = 0;
	    var iterFn = core_getIteratorMethod(O);
	    var length, result, step, iterator;
	    if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
	      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	        _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = _toLength(O.length);
	      for (result = new C(length); length > index; index++) {
	        _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});

	// WebKit Array.of isn't generic
	_export(_export.S + _export.F * _fails(function () {
	  function F() { /* empty */ }
	  return !(Array.of.call(F) instanceof F);
	}), 'Array', {
	  // 22.1.2.3 Array.of( ...items)
	  of: function of(/* ...args */) {
	    var index = 0;
	    var aLen = arguments.length;
	    var result = new (typeof this == 'function' ? this : Array)(aLen);
	    while (aLen > index) _createProperty(result, index, arguments[index++]);
	    result.length = aLen;
	    return result;
	  }
	});

	var _strictMethod = function (method, arg) {
	  return !!method && _fails(function () {
	    // eslint-disable-next-line no-useless-call
	    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
	  });
	};

	// 22.1.3.13 Array.prototype.join(separator)


	var arrayJoin = [].join;

	// fallback for not array-like strings
	_export(_export.P + _export.F * (_iobject != Object || !_strictMethod(arrayJoin)), 'Array', {
	  join: function join(separator) {
	    return arrayJoin.call(_toIobject(this), separator === undefined ? ',' : separator);
	  }
	});

	var arraySlice$1 = [].slice;

	// fallback for not array-like ES3 strings and DOM objects
	_export(_export.P + _export.F * _fails(function () {
	  if (_html) arraySlice$1.call(_html);
	}), 'Array', {
	  slice: function slice(begin, end) {
	    var len = _toLength(this.length);
	    var klass = _cof(this);
	    end = end === undefined ? len : end;
	    if (klass == 'Array') return arraySlice$1.call(this, begin, end);
	    var start = _toAbsoluteIndex(begin, len);
	    var upTo = _toAbsoluteIndex(end, len);
	    var size = _toLength(upTo - start);
	    var cloned = new Array(size);
	    var i = 0;
	    for (; i < size; i++) cloned[i] = klass == 'String'
	      ? this.charAt(start + i)
	      : this[start + i];
	    return cloned;
	  }
	});

	var $sort = [].sort;
	var test$1 = [1, 2, 3];

	_export(_export.P + _export.F * (_fails(function () {
	  // IE8-
	  test$1.sort(undefined);
	}) || !_fails(function () {
	  // V8 bug
	  test$1.sort(null);
	  // Old WebKit
	}) || !_strictMethod($sort)), 'Array', {
	  // 22.1.3.25 Array.prototype.sort(comparefn)
	  sort: function sort(comparefn) {
	    return comparefn === undefined
	      ? $sort.call(_toObject(this))
	      : $sort.call(_toObject(this), _aFunction(comparefn));
	  }
	});

	var SPECIES = _wks('species');

	var _arraySpeciesConstructor = function (original) {
	  var C;
	  if (_isArray(original)) {
	    C = original.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
	    if (_isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


	var _arraySpeciesCreate = function (original, length) {
	  return new (_arraySpeciesConstructor(original))(length);
	};

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex





	var _arrayMethods = function (TYPE, $create) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  var create = $create || _arraySpeciesCreate;
	  return function ($this, callbackfn, that) {
	    var O = _toObject($this);
	    var self = _iobject(O);
	    var f = _ctx(callbackfn, that, 3);
	    var length = _toLength(self.length);
	    var index = 0;
	    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var val, res;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      val = self[index];
	      res = f(val, index, O);
	      if (TYPE) {
	        if (IS_MAP) result[index] = res;   // map
	        else if (res) switch (TYPE) {
	          case 3: return true;             // some
	          case 5: return val;              // find
	          case 6: return index;            // findIndex
	          case 2: result.push(val);        // filter
	        } else if (IS_EVERY) return false; // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

	var $forEach = _arrayMethods(0);
	var STRICT = _strictMethod([].forEach, true);

	_export(_export.P + _export.F * !STRICT, 'Array', {
	  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
	  forEach: function forEach(callbackfn /* , thisArg */) {
	    return $forEach(this, callbackfn, arguments[1]);
	  }
	});

	var $map = _arrayMethods(1);

	_export(_export.P + _export.F * !_strictMethod([].map, true), 'Array', {
	  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments[1]);
	  }
	});

	var $filter = _arrayMethods(2);

	_export(_export.P + _export.F * !_strictMethod([].filter, true), 'Array', {
	  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments[1]);
	  }
	});

	var $some = _arrayMethods(3);

	_export(_export.P + _export.F * !_strictMethod([].some, true), 'Array', {
	  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
	  some: function some(callbackfn /* , thisArg */) {
	    return $some(this, callbackfn, arguments[1]);
	  }
	});

	var $every = _arrayMethods(4);

	_export(_export.P + _export.F * !_strictMethod([].every, true), 'Array', {
	  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
	  every: function every(callbackfn /* , thisArg */) {
	    return $every(this, callbackfn, arguments[1]);
	  }
	});

	var _arrayReduce = function (that, callbackfn, aLen, memo, isRight) {
	  _aFunction(callbackfn);
	  var O = _toObject(that);
	  var self = _iobject(O);
	  var length = _toLength(O.length);
	  var index = isRight ? length - 1 : 0;
	  var i = isRight ? -1 : 1;
	  if (aLen < 2) for (;;) {
	    if (index in self) {
	      memo = self[index];
	      index += i;
	      break;
	    }
	    index += i;
	    if (isRight ? index < 0 : length <= index) {
	      throw TypeError('Reduce of empty array with no initial value');
	    }
	  }
	  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
	    memo = callbackfn(memo, self[index], index, O);
	  }
	  return memo;
	};

	_export(_export.P + _export.F * !_strictMethod([].reduce, true), 'Array', {
	  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
	  reduce: function reduce(callbackfn /* , initialValue */) {
	    return _arrayReduce(this, callbackfn, arguments.length, arguments[1], false);
	  }
	});

	_export(_export.P + _export.F * !_strictMethod([].reduceRight, true), 'Array', {
	  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
	  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
	    return _arrayReduce(this, callbackfn, arguments.length, arguments[1], true);
	  }
	});

	var $indexOf = _arrayIncludes(false);
	var $native = [].indexOf;
	var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

	_export(_export.P + _export.F * (NEGATIVE_ZERO || !_strictMethod($native)), 'Array', {
	  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? $native.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments[1]);
	  }
	});

	var $native$1 = [].lastIndexOf;
	var NEGATIVE_ZERO$1 = !!$native$1 && 1 / [1].lastIndexOf(1, -0) < 0;

	_export(_export.P + _export.F * (NEGATIVE_ZERO$1 || !_strictMethod($native$1)), 'Array', {
	  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
	  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
	    // convert -0 to +0
	    if (NEGATIVE_ZERO$1) return $native$1.apply(this, arguments) || 0;
	    var O = _toIobject(this);
	    var length = _toLength(O.length);
	    var index = length - 1;
	    if (arguments.length > 1) index = Math.min(index, _toInteger(arguments[1]));
	    if (index < 0) index = length + index;
	    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
	    return -1;
	  }
	});

	var _arrayCopyWithin = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
	  var O = _toObject(this);
	  var len = _toLength(O.length);
	  var to = _toAbsoluteIndex(target, len);
	  var from = _toAbsoluteIndex(start, len);
	  var end = arguments.length > 2 ? arguments[2] : undefined;
	  var count = Math.min((end === undefined ? len : _toAbsoluteIndex(end, len)) - from, len - to);
	  var inc = 1;
	  if (from < to && to < from + count) {
	    inc = -1;
	    from += count - 1;
	    to += count - 1;
	  }
	  while (count-- > 0) {
	    if (from in O) O[to] = O[from];
	    else delete O[to];
	    to += inc;
	    from += inc;
	  } return O;
	};

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = _wks('unscopables');
	var ArrayProto$1 = Array.prototype;
	if (ArrayProto$1[UNSCOPABLES] == undefined) _hide(ArrayProto$1, UNSCOPABLES, {});
	var _addToUnscopables = function (key) {
	  ArrayProto$1[UNSCOPABLES][key] = true;
	};

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)


	_export(_export.P, 'Array', { copyWithin: _arrayCopyWithin });

	_addToUnscopables('copyWithin');

	var _arrayFill = function fill(value /* , start = 0, end = @length */) {
	  var O = _toObject(this);
	  var length = _toLength(O.length);
	  var aLen = arguments.length;
	  var index = _toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
	  var end = aLen > 2 ? arguments[2] : undefined;
	  var endPos = end === undefined ? length : _toAbsoluteIndex(end, length);
	  while (endPos > index) O[index++] = value;
	  return O;
	};

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)


	_export(_export.P, 'Array', { fill: _arrayFill });

	_addToUnscopables('fill');

	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

	var $find = _arrayMethods(5);
	var KEY = 'find';
	var forced = true;
	// Shouldn't skip holes
	if (KEY in []) Array(1)[KEY](function () { forced = false; });
	_export(_export.P + _export.F * forced, 'Array', {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	_addToUnscopables(KEY);

	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)

	var $find$1 = _arrayMethods(6);
	var KEY$1 = 'findIndex';
	var forced$1 = true;
	// Shouldn't skip holes
	if (KEY$1 in []) Array(1)[KEY$1](function () { forced$1 = false; });
	_export(_export.P + _export.F * forced$1, 'Array', {
	  findIndex: function findIndex(callbackfn /* , that = undefined */) {
	    return $find$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	_addToUnscopables(KEY$1);

	var SPECIES$1 = _wks('species');

	var _setSpecies = function (KEY) {
	  var C = _global[KEY];
	  if (_descriptors && C && !C[SPECIES$1]) _objectDp.f(C, SPECIES$1, {
	    configurable: true,
	    get: function () { return this; }
	  });
	};

	_setSpecies('Array');

	var _iterStep = function (done, value) {
	  return { value: value, done: !!done };
	};

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
	  this._t = _toIobject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return _iterStep(1);
	  }
	  if (kind == 'keys') return _iterStep(0, index);
	  if (kind == 'values') return _iterStep(0, O[index]);
	  return _iterStep(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	_iterators.Arguments = _iterators.Array;

	_addToUnscopables('keys');
	_addToUnscopables('values');
	_addToUnscopables('entries');

	// 21.2.5.3 get RegExp.prototype.flags

	var _flags = function () {
	  var that = _anObject(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var dP$4 = _objectDp.f;
	var gOPN$3 = _objectGopn.f;


	var $RegExp = _global.RegExp;
	var Base$1 = $RegExp;
	var proto$2 = $RegExp.prototype;
	var re1 = /a/g;
	var re2 = /a/g;
	// "new" creates a new object, old webkit buggy here
	var CORRECT_NEW = new $RegExp(re1) !== re1;

	if (_descriptors && (!CORRECT_NEW || _fails(function () {
	  re2[_wks('match')] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
	}))) {
	  $RegExp = function RegExp(p, f) {
	    var tiRE = this instanceof $RegExp;
	    var piRE = _isRegexp(p);
	    var fiU = f === undefined;
	    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
	      : _inheritIfRequired(CORRECT_NEW
	        ? new Base$1(piRE && !fiU ? p.source : p, f)
	        : Base$1((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? _flags.call(p) : f)
	      , tiRE ? this : proto$2, $RegExp);
	  };
	  var proxy = function (key) {
	    key in $RegExp || dP$4($RegExp, key, {
	      configurable: true,
	      get: function () { return Base$1[key]; },
	      set: function (it) { Base$1[key] = it; }
	    });
	  };
	  for (var keys$1 = gOPN$3(Base$1), i = 0; keys$1.length > i;) proxy(keys$1[i++]);
	  proto$2.constructor = $RegExp;
	  $RegExp.prototype = proto$2;
	  _redefine(_global, 'RegExp', $RegExp);
	}

	_setSpecies('RegExp');

	// 21.2.5.3 get RegExp.prototype.flags()
	if (_descriptors && /./g.flags != 'g') _objectDp.f(RegExp.prototype, 'flags', {
	  configurable: true,
	  get: _flags
	});

	var TO_STRING$1 = 'toString';
	var $toString$1 = /./[TO_STRING$1];

	var define$1 = function (fn) {
	  _redefine(RegExp.prototype, TO_STRING$1, fn, true);
	};

	// 21.2.5.14 RegExp.prototype.toString()
	if (_fails(function () { return $toString$1.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
	  define$1(function toString() {
	    var R = _anObject(this);
	    return '/'.concat(R.source, '/',
	      'flags' in R ? R.flags : !_descriptors && R instanceof RegExp ? _flags.call(R) : undefined);
	  });
	// FF44- RegExp#toString has a wrong name
	} else if ($toString$1.name != TO_STRING$1) {
	  define$1(function toString() {
	    return $toString$1.call(this);
	  });
	}

	var _fixReWks = function (KEY, length, exec) {
	  var SYMBOL = _wks(KEY);
	  var fns = exec(_defined, SYMBOL, ''[KEY]);
	  var strfn = fns[0];
	  var rxfn = fns[1];
	  if (_fails(function () {
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  })) {
	    _redefine(String.prototype, KEY, strfn);
	    _hide(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function (string, arg) { return rxfn.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function (string) { return rxfn.call(string, this); }
	    );
	  }
	};

	// @@match logic
	_fixReWks('match', 1, function (defined, MATCH, $match) {
	  // 21.1.3.11 String.prototype.match(regexp)
	  return [function match(regexp) {
	    var O = defined(this);
	    var fn = regexp == undefined ? undefined : regexp[MATCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	  }, $match];
	});

	// @@replace logic
	_fixReWks('replace', 2, function (defined, REPLACE, $replace) {
	  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
	  return [function replace(searchValue, replaceValue) {
	    var O = defined(this);
	    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	    return fn !== undefined
	      ? fn.call(searchValue, O, replaceValue)
	      : $replace.call(String(O), searchValue, replaceValue);
	  }, $replace];
	});

	// @@search logic
	_fixReWks('search', 1, function (defined, SEARCH, $search) {
	  // 21.1.3.15 String.prototype.search(regexp)
	  return [function search(regexp) {
	    var O = defined(this);
	    var fn = regexp == undefined ? undefined : regexp[SEARCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	  }, $search];
	});

	// @@split logic
	_fixReWks('split', 2, function (defined, SPLIT, $split) {
	  var isRegExp = _isRegexp;
	  var _split = $split;
	  var $push = [].push;
	  var $SPLIT = 'split';
	  var LENGTH = 'length';
	  var LAST_INDEX = 'lastIndex';
	  if (
	    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
	    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
	    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
	    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
	    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
	    ''[$SPLIT](/.?/)[LENGTH]
	  ) {
	    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
	    // based on es5-shim implementation, need to rework it
	    $split = function (separator, limit) {
	      var string = String(this);
	      if (separator === undefined && limit === 0) return [];
	      // If `separator` is not a regex, use native split
	      if (!isRegExp(separator)) return _split.call(string, separator, limit);
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var separator2, match, lastIndex, lastLength, i;
	      // Doesn't need flags gy, but they don't hurt
	      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
	      while (match = separatorCopy.exec(string)) {
	        // `separatorCopy.lastIndex` is not reliable cross-browser
	        lastIndex = match.index + match[0][LENGTH];
	        if (lastIndex > lastLastIndex) {
	          output.push(string.slice(lastLastIndex, match.index));
	          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
	          // eslint-disable-next-line no-loop-func
	          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
	            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
	          });
	          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
	          lastLength = match[0][LENGTH];
	          lastLastIndex = lastIndex;
	          if (output[LENGTH] >= splitLimit) break;
	        }
	        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
	      }
	      if (lastLastIndex === string[LENGTH]) {
	        if (lastLength || !separatorCopy.test('')) output.push('');
	      } else output.push(string.slice(lastLastIndex));
	      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
	    };
	  // Chakra, V8
	  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
	    $split = function (separator, limit) {
	      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
	    };
	  }
	  // 21.1.3.17 String.prototype.split(separator, limit)
	  return [function split(separator, limit) {
	    var O = defined(this);
	    var fn = separator == undefined ? undefined : separator[SPLIT];
	    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
	  }, $split];
	});

	var _anInstance = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

	var _forOf = createCommonjsModule(function (module) {
	var BREAK = {};
	var RETURN = {};
	var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
	  var iterFn = ITERATOR ? function () { return iterable; } : core_getIteratorMethod(iterable);
	  var f = _ctx(fn, that, entries ? 2 : 1);
	  var index = 0;
	  var length, step, iterator, result;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
	    result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if (result === BREAK || result === RETURN) return result;
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    result = _iterCall(iterator, f, step.value, entries);
	    if (result === BREAK || result === RETURN) return result;
	  }
	};
	exports.BREAK = BREAK;
	exports.RETURN = RETURN;
	});

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)


	var SPECIES$2 = _wks('species');
	var _speciesConstructor = function (O, D) {
	  var C = _anObject(O).constructor;
	  var S;
	  return C === undefined || (S = _anObject(C)[SPECIES$2]) == undefined ? D : _aFunction(S);
	};

	var process = _global.process;
	var setTask = _global.setImmediate;
	var clearTask = _global.clearImmediate;
	var MessageChannel = _global.MessageChannel;
	var Dispatch = _global.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;
	var run = function () {
	  var id = +this;
	  // eslint-disable-next-line no-prototype-builtins
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function (event) {
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!setTask || !clearTask) {
	  setTask = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func
	      _invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (_cof(process) == 'process') {
	    defer = function (id) {
	      process.nextTick(_ctx(run, id, 1));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(_ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = _ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (_global.addEventListener && typeof postMessage == 'function' && !_global.importScripts) {
	    defer = function (id) {
	      _global.postMessage(id + '', '*');
	    };
	    _global.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in _domCreate('script')) {
	    defer = function (id) {
	      _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function () {
	        _html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(_ctx(run, id, 1), 0);
	    };
	  }
	}
	var _task = {
	  set: setTask,
	  clear: clearTask
	};

	var macrotask = _task.set;
	var Observer = _global.MutationObserver || _global.WebKitMutationObserver;
	var process$1 = _global.process;
	var Promise$1 = _global.Promise;
	var isNode = _cof(process$1) == 'process';

	var _microtask = function () {
	  var head, last, notify;

	  var flush = function () {
	    var parent, fn;
	    if (isNode && (parent = process$1.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (e) {
	        if (head) notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // Node.js
	  if (isNode) {
	    notify = function () {
	      process$1.nextTick(flush);
	    };
	  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
	  } else if (Observer && !(_global.navigator && _global.navigator.standalone)) {
	    var toggle = true;
	    var node = document.createTextNode('');
	    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise$1 && Promise$1.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    var promise = Promise$1.resolve(undefined);
	    notify = function () {
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(_global, flush);
	    };
	  }

	  return function (fn) {
	    var task = { fn: fn, next: undefined };
	    if (last) last.next = task;
	    if (!head) {
	      head = task;
	      notify();
	    } last = task;
	  };
	};

	// 25.4.1.5 NewPromiseCapability(C)


	function PromiseCapability(C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = _aFunction(resolve);
	  this.reject = _aFunction(reject);
	}

	var f$7 = function (C) {
	  return new PromiseCapability(C);
	};

	var _newPromiseCapability = {
		f: f$7
	};

	var _perform = function (exec) {
	  try {
	    return { e: false, v: exec() };
	  } catch (e) {
	    return { e: true, v: e };
	  }
	};

	var navigator$1 = _global.navigator;

	var _userAgent = navigator$1 && navigator$1.userAgent || '';

	var _promiseResolve = function (C, x) {
	  _anObject(C);
	  if (_isObject(x) && x.constructor === C) return x;
	  var promiseCapability = _newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var _redefineAll = function (target, src, safe) {
	  for (var key in src) _redefine(target, key, src[key], safe);
	  return target;
	};

	var task = _task.set;
	var microtask = _microtask();




	var PROMISE = 'Promise';
	var TypeError$1 = _global.TypeError;
	var process$2 = _global.process;
	var versions = process$2 && process$2.versions;
	var v8 = versions && versions.v8 || '';
	var $Promise = _global[PROMISE];
	var isNode$1 = _classof(process$2) == 'process';
	var empty = function () { /* empty */ };
	var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
	var newPromiseCapability = newGenericPromiseCapability = _newPromiseCapability.f;

	var USE_NATIVE$1 = !!function () {
	  try {
	    // correct subclassing with @@species support
	    var promise = $Promise.resolve(1);
	    var FakePromise = (promise.constructor = {})[_wks('species')] = function (exec) {
	      exec(empty, empty);
	    };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode$1 || typeof PromiseRejectionEvent == 'function')
	      && promise.then(empty) instanceof FakePromise
	      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	      // we can't detect it synchronously, so just check versions
	      && v8.indexOf('6.6') !== 0
	      && _userAgent.indexOf('Chrome/66') === -1;
	  } catch (e) { /* empty */ }
	}();

	// helpers
	var isThenable = function (it) {
	  var then;
	  return _isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var notify = function (promise, isReject) {
	  if (promise._n) return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function () {
	    var value = promise._v;
	    var ok = promise._s == 1;
	    var i = 0;
	    var run = function (reaction) {
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then, exited;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (promise._h == 2) onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value); // may throw
	            if (domain) {
	              domain.exit();
	              exited = true;
	            }
	          }
	          if (result === reaction.promise) {
	            reject(TypeError$1('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (e) {
	        if (domain && !exited) domain.exit();
	        reject(e);
	      }
	    };
	    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if (isReject && !promise._h) onUnhandled(promise);
	  });
	};
	var onUnhandled = function (promise) {
	  task.call(_global, function () {
	    var value = promise._v;
	    var unhandled = isUnhandled(promise);
	    var result, handler, console;
	    if (unhandled) {
	      result = _perform(function () {
	        if (isNode$1) {
	          process$2.emit('unhandledRejection', value, promise);
	        } else if (handler = _global.onunhandledrejection) {
	          handler({ promise: promise, reason: value });
	        } else if ((console = _global.console) && console.error) {
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if (unhandled && result.e) throw result.v;
	  });
	};
	var isUnhandled = function (promise) {
	  return promise._h !== 1 && (promise._a || promise._c).length === 0;
	};
	var onHandleUnhandled = function (promise) {
	  task.call(_global, function () {
	    var handler;
	    if (isNode$1) {
	      process$2.emit('rejectionHandled', promise);
	    } else if (handler = _global.onrejectionhandled) {
	      handler({ promise: promise, reason: promise._v });
	    }
	  });
	};
	var $reject = function (value) {
	  var promise = this;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if (!promise._a) promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function (value) {
	  var promise = this;
	  var then;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
	    if (then = isThenable(value)) {
	      microtask(function () {
	        var wrapper = { _w: promise, _d: false }; // wrap
	        try {
	          then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1));
	        } catch (e) {
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch (e) {
	    $reject.call({ _w: promise, _d: false }, e); // wrap
	  }
	};

	// constructor polyfill
	if (!USE_NATIVE$1) {
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor) {
	    _anInstance(this, $Promise, PROMISE, '_h');
	    _aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(_ctx($resolve, this, 1), _ctx($reject, this, 1));
	    } catch (err) {
	      $reject.call(this, err);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars
	  Internal = function Promise(executor) {
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = _redefineAll($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected) {
	      var reaction = newPromiseCapability(_speciesConstructor(this, $Promise));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode$1 ? process$2.domain : undefined;
	      this._c.push(reaction);
	      if (this._a) this._a.push(reaction);
	      if (this._s) notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    this.promise = promise;
	    this.resolve = _ctx($resolve, promise, 1);
	    this.reject = _ctx($reject, promise, 1);
	  };
	  _newPromiseCapability.f = newPromiseCapability = function (C) {
	    return C === $Promise || C === Wrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };
	}

	_export(_export.G + _export.W + _export.F * !USE_NATIVE$1, { Promise: $Promise });
	_setToStringTag($Promise, PROMISE);
	_setSpecies(PROMISE);
	Wrapper = _core[PROMISE];

	// statics
	_export(_export.S + _export.F * !USE_NATIVE$1, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this);
	    var $$reject = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	_export(_export.S + _export.F * (!USE_NATIVE$1), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x) {
	    return _promiseResolve(_library && this === Wrapper ? $Promise : this, x);
	  }
	});
	_export(_export.S + _export.F * !(USE_NATIVE$1 && _iterDetect(function (iter) {
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = _perform(function () {
	      var values = [];
	      var index = 0;
	      var remaining = 1;
	      _forOf(iterable, false, function (promise) {
	        var $index = index++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var reject = capability.reject;
	    var result = _perform(function () {
	      _forOf(iterable, false, function (promise) {
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  }
	});

	var _validateCollection = function (it, TYPE) {
	  if (!_isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
	  return it;
	};

	var dP$5 = _objectDp.f;









	var fastKey = _meta.fastKey;

	var SIZE = _descriptors ? '_s' : 'size';

	var getEntry = function (that, key) {
	  // fast case
	  var index = fastKey(key);
	  var entry;
	  if (index !== 'F') return that._i[index];
	  // frozen object case
	  for (entry = that._f; entry; entry = entry.n) {
	    if (entry.k == key) return entry;
	  }
	};

	var _collectionStrong = {
	  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      _anInstance(that, C, NAME, '_i');
	      that._t = NAME;         // collection type
	      that._i = _objectCreate(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    _redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear() {
	        for (var that = _validateCollection(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
	          entry.r = true;
	          if (entry.p) entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function (key) {
	        var that = _validateCollection(this, NAME);
	        var entry = getEntry(that, key);
	        if (entry) {
	          var next = entry.n;
	          var prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if (prev) prev.n = next;
	          if (next) next.p = prev;
	          if (that._f == entry) that._f = next;
	          if (that._l == entry) that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /* , that = undefined */) {
	        _validateCollection(this, NAME);
	        var f = _ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	        var entry;
	        while (entry = entry ? entry.n : this._f) {
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while (entry && entry.r) entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(_validateCollection(this, NAME), key);
	      }
	    });
	    if (_descriptors) dP$5(C.prototype, 'size', {
	      get: function () {
	        return _validateCollection(this, NAME)[SIZE];
	      }
	    });
	    return C;
	  },
	  def: function (that, key, value) {
	    var entry = getEntry(that, key);
	    var prev, index;
	    // change existing entry
	    if (entry) {
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if (!that._f) that._f = entry;
	      if (prev) prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if (index !== 'F') that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function (C, NAME, IS_MAP) {
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    _iterDefine(C, NAME, function (iterated, kind) {
	      this._t = _validateCollection(iterated, NAME); // target
	      this._k = kind;                     // kind
	      this._l = undefined;                // previous
	    }, function () {
	      var that = this;
	      var kind = that._k;
	      var entry = that._l;
	      // revert to the last existing entry
	      while (entry && entry.r) entry = entry.p;
	      // get next entry
	      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
	        // or finish the iteration
	        that._t = undefined;
	        return _iterStep(1);
	      }
	      // return step by kind
	      if (kind == 'keys') return _iterStep(0, entry.k);
	      if (kind == 'values') return _iterStep(0, entry.v);
	      return _iterStep(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    _setSpecies(NAME);
	  }
	};

	var _collection = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
	  var Base = _global[NAME];
	  var C = Base;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var proto = C && C.prototype;
	  var O = {};
	  var fixMethod = function (KEY) {
	    var fn = proto[KEY];
	    _redefine(proto, KEY,
	      KEY == 'delete' ? function (a) {
	        return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'has' ? function has(a) {
	        return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'get' ? function get(a) {
	        return IS_WEAK && !_isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
	        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
	    );
	  };
	  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !_fails(function () {
	    new C().entries().next();
	  }))) {
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    _redefineAll(C.prototype, methods);
	    _meta.NEED = true;
	  } else {
	    var instance = new C();
	    // early implementations not supports chaining
	    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
	    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	    var THROWS_ON_PRIMITIVES = _fails(function () { instance.has(1); });
	    // most early implementations doesn't supports iterables, most modern - not close it correctly
	    var ACCEPT_ITERABLES = _iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
	    // for early implementations -0 and +0 not the same
	    var BUGGY_ZERO = !IS_WEAK && _fails(function () {
	      // V8 ~ Chromium 42- fails only with 5+ elements
	      var $instance = new C();
	      var index = 5;
	      while (index--) $instance[ADDER](index, index);
	      return !$instance.has(-0);
	    });
	    if (!ACCEPT_ITERABLES) {
	      C = wrapper(function (target, iterable) {
	        _anInstance(target, C, NAME);
	        var that = _inheritIfRequired(new Base(), target, C);
	        if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      });
	      C.prototype = proto;
	      proto.constructor = C;
	    }
	    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
	    // weak collections should not contains .clear method
	    if (IS_WEAK && proto.clear) delete proto.clear;
	  }

	  _setToStringTag(C, NAME);

	  O[NAME] = C;
	  _export(_export.G + _export.W + _export.F * (C != Base), O);

	  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

	var MAP = 'Map';

	// 23.1 Map Objects
	var es6_map = _collection(MAP, function (get) {
	  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key) {
	    var entry = _collectionStrong.getEntry(_validateCollection(this, MAP), key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value) {
	    return _collectionStrong.def(_validateCollection(this, MAP), key === 0 ? 0 : key, value);
	  }
	}, _collectionStrong, true);

	var SET = 'Set';

	// 23.2 Set Objects
	var es6_set = _collection(SET, function (get) {
	  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value) {
	    return _collectionStrong.def(_validateCollection(this, SET), value = value === 0 ? 0 : value, value);
	  }
	}, _collectionStrong);

	var getWeak = _meta.getWeak;







	var arrayFind = _arrayMethods(5);
	var arrayFindIndex = _arrayMethods(6);
	var id$1 = 0;

	// fallback for uncaught frozen keys
	var uncaughtFrozenStore = function (that) {
	  return that._l || (that._l = new UncaughtFrozenStore());
	};
	var UncaughtFrozenStore = function () {
	  this.a = [];
	};
	var findUncaughtFrozen = function (store, key) {
	  return arrayFind(store.a, function (it) {
	    return it[0] === key;
	  });
	};
	UncaughtFrozenStore.prototype = {
	  get: function (key) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) return entry[1];
	  },
	  has: function (key) {
	    return !!findUncaughtFrozen(this, key);
	  },
	  set: function (key, value) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) entry[1] = value;
	    else this.a.push([key, value]);
	  },
	  'delete': function (key) {
	    var index = arrayFindIndex(this.a, function (it) {
	      return it[0] === key;
	    });
	    if (~index) this.a.splice(index, 1);
	    return !!~index;
	  }
	};

	var _collectionWeak = {
	  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      _anInstance(that, C, NAME, '_i');
	      that._t = NAME;      // collection type
	      that._i = id$1++;      // collection id
	      that._l = undefined; // leak store for uncaught frozen objects
	      if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    _redefineAll(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function (key) {
	        if (!_isObject(key)) return false;
	        var data = getWeak(key);
	        if (data === true) return uncaughtFrozenStore(_validateCollection(this, NAME))['delete'](key);
	        return data && _has(data, this._i) && delete data[this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key) {
	        if (!_isObject(key)) return false;
	        var data = getWeak(key);
	        if (data === true) return uncaughtFrozenStore(_validateCollection(this, NAME)).has(key);
	        return data && _has(data, this._i);
	      }
	    });
	    return C;
	  },
	  def: function (that, key, value) {
	    var data = getWeak(_anObject(key), true);
	    if (data === true) uncaughtFrozenStore(that).set(key, value);
	    else data[that._i] = value;
	    return that;
	  },
	  ufstore: uncaughtFrozenStore
	};

	var es6_weakMap = createCommonjsModule(function (module) {
	var each = _arrayMethods(0);







	var WEAK_MAP = 'WeakMap';
	var getWeak = _meta.getWeak;
	var isExtensible = Object.isExtensible;
	var uncaughtFrozenStore = _collectionWeak.ufstore;
	var tmp = {};
	var InternalMap;

	var wrapper = function (get) {
	  return function WeakMap() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	};

	var methods = {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key) {
	    if (_isObject(key)) {
	      var data = getWeak(key);
	      if (data === true) return uncaughtFrozenStore(_validateCollection(this, WEAK_MAP)).get(key);
	      return data ? data[this._i] : undefined;
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value) {
	    return _collectionWeak.def(_validateCollection(this, WEAK_MAP), key, value);
	  }
	};

	// 23.3 WeakMap Objects
	var $WeakMap = module.exports = _collection(WEAK_MAP, wrapper, methods, _collectionWeak, true, true);

	// IE11 WeakMap frozen keys fix
	if (_fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
	  InternalMap = _collectionWeak.getConstructor(wrapper, WEAK_MAP);
	  _objectAssign(InternalMap.prototype, methods);
	  _meta.NEED = true;
	  each(['delete', 'has', 'get', 'set'], function (key) {
	    var proto = $WeakMap.prototype;
	    var method = proto[key];
	    _redefine(proto, key, function (a, b) {
	      // store frozen objects on internal weakmap shim
	      if (_isObject(a) && !isExtensible(a)) {
	        if (!this._f) this._f = new InternalMap();
	        var result = this._f[key](a, b);
	        return key == 'set' ? this : result;
	      // store all the rest on native weakmap
	      } return method.call(this, a, b);
	    });
	  });
	}
	});

	var WEAK_SET = 'WeakSet';

	// 23.4 WeakSet Objects
	_collection(WEAK_SET, function (get) {
	  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.4.3.1 WeakSet.prototype.add(value)
	  add: function add(value) {
	    return _collectionWeak.def(_validateCollection(this, WEAK_SET), value, true);
	  }
	}, _collectionWeak, false, true);

	var TYPED = _uid('typed_array');
	var VIEW = _uid('view');
	var ABV = !!(_global.ArrayBuffer && _global.DataView);
	var CONSTR = ABV;
	var i$1 = 0;
	var l = 9;
	var Typed;

	var TypedArrayConstructors = (
	  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
	).split(',');

	while (i$1 < l) {
	  if (Typed = _global[TypedArrayConstructors[i$1++]]) {
	    _hide(Typed.prototype, TYPED, true);
	    _hide(Typed.prototype, VIEW, true);
	  } else CONSTR = false;
	}

	var _typed = {
	  ABV: ABV,
	  CONSTR: CONSTR,
	  TYPED: TYPED,
	  VIEW: VIEW
	};

	// https://tc39.github.io/ecma262/#sec-toindex


	var _toIndex = function (it) {
	  if (it === undefined) return 0;
	  var number = _toInteger(it);
	  var length = _toLength(number);
	  if (number !== length) throw RangeError('Wrong length!');
	  return length;
	};

	var _typedBuffer = createCommonjsModule(function (module, exports) {











	var gOPN = _objectGopn.f;
	var dP = _objectDp.f;


	var ARRAY_BUFFER = 'ArrayBuffer';
	var DATA_VIEW = 'DataView';
	var PROTOTYPE = 'prototype';
	var WRONG_LENGTH = 'Wrong length!';
	var WRONG_INDEX = 'Wrong index!';
	var $ArrayBuffer = _global[ARRAY_BUFFER];
	var $DataView = _global[DATA_VIEW];
	var Math = _global.Math;
	var RangeError = _global.RangeError;
	// eslint-disable-next-line no-shadow-restricted-names
	var Infinity = _global.Infinity;
	var BaseBuffer = $ArrayBuffer;
	var abs = Math.abs;
	var pow = Math.pow;
	var floor = Math.floor;
	var log = Math.log;
	var LN2 = Math.LN2;
	var BUFFER = 'buffer';
	var BYTE_LENGTH = 'byteLength';
	var BYTE_OFFSET = 'byteOffset';
	var $BUFFER = _descriptors ? '_b' : BUFFER;
	var $LENGTH = _descriptors ? '_l' : BYTE_LENGTH;
	var $OFFSET = _descriptors ? '_o' : BYTE_OFFSET;

	// IEEE754 conversions based on https://github.com/feross/ieee754
	function packIEEE754(value, mLen, nBytes) {
	  var buffer = new Array(nBytes);
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
	  var i = 0;
	  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
	  var e, m, c;
	  value = abs(value);
	  // eslint-disable-next-line no-self-compare
	  if (value != value || value === Infinity) {
	    // eslint-disable-next-line no-self-compare
	    m = value != value ? 1 : 0;
	    e = eMax;
	  } else {
	    e = floor(log(value) / LN2);
	    if (value * (c = pow(2, -e)) < 1) {
	      e--;
	      c *= 2;
	    }
	    if (e + eBias >= 1) {
	      value += rt / c;
	    } else {
	      value += rt * pow(2, 1 - eBias);
	    }
	    if (value * c >= 2) {
	      e++;
	      c /= 2;
	    }
	    if (e + eBias >= eMax) {
	      m = 0;
	      e = eMax;
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * pow(2, eBias - 1) * pow(2, mLen);
	      e = 0;
	    }
	  }
	  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
	  e = e << mLen | m;
	  eLen += mLen;
	  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
	  buffer[--i] |= s * 128;
	  return buffer;
	}
	function unpackIEEE754(buffer, mLen, nBytes) {
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var nBits = eLen - 7;
	  var i = nBytes - 1;
	  var s = buffer[i--];
	  var e = s & 127;
	  var m;
	  s >>= 7;
	  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
	  m = e & (1 << -nBits) - 1;
	  e >>= -nBits;
	  nBits += mLen;
	  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : s ? -Infinity : Infinity;
	  } else {
	    m = m + pow(2, mLen);
	    e = e - eBias;
	  } return (s ? -1 : 1) * m * pow(2, e - mLen);
	}

	function unpackI32(bytes) {
	  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
	}
	function packI8(it) {
	  return [it & 0xff];
	}
	function packI16(it) {
	  return [it & 0xff, it >> 8 & 0xff];
	}
	function packI32(it) {
	  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
	}
	function packF64(it) {
	  return packIEEE754(it, 52, 8);
	}
	function packF32(it) {
	  return packIEEE754(it, 23, 4);
	}

	function addGetter(C, key, internal) {
	  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
	}

	function get(view, bytes, index, isLittleEndian) {
	  var numIndex = +index;
	  var intIndex = _toIndex(numIndex);
	  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b;
	  var start = intIndex + view[$OFFSET];
	  var pack = store.slice(start, start + bytes);
	  return isLittleEndian ? pack : pack.reverse();
	}
	function set(view, bytes, index, conversion, value, isLittleEndian) {
	  var numIndex = +index;
	  var intIndex = _toIndex(numIndex);
	  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b;
	  var start = intIndex + view[$OFFSET];
	  var pack = conversion(+value);
	  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
	}

	if (!_typed.ABV) {
	  $ArrayBuffer = function ArrayBuffer(length) {
	    _anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
	    var byteLength = _toIndex(length);
	    this._b = _arrayFill.call(new Array(byteLength), 0);
	    this[$LENGTH] = byteLength;
	  };

	  $DataView = function DataView(buffer, byteOffset, byteLength) {
	    _anInstance(this, $DataView, DATA_VIEW);
	    _anInstance(buffer, $ArrayBuffer, DATA_VIEW);
	    var bufferLength = buffer[$LENGTH];
	    var offset = _toInteger(byteOffset);
	    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
	    byteLength = byteLength === undefined ? bufferLength - offset : _toLength(byteLength);
	    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
	    this[$BUFFER] = buffer;
	    this[$OFFSET] = offset;
	    this[$LENGTH] = byteLength;
	  };

	  if (_descriptors) {
	    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
	    addGetter($DataView, BUFFER, '_b');
	    addGetter($DataView, BYTE_LENGTH, '_l');
	    addGetter($DataView, BYTE_OFFSET, '_o');
	  }

	  _redefineAll($DataView[PROTOTYPE], {
	    getInt8: function getInt8(byteOffset) {
	      return get(this, 1, byteOffset)[0] << 24 >> 24;
	    },
	    getUint8: function getUint8(byteOffset) {
	      return get(this, 1, byteOffset)[0];
	    },
	    getInt16: function getInt16(byteOffset /* , littleEndian */) {
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
	    },
	    getUint16: function getUint16(byteOffset /* , littleEndian */) {
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return bytes[1] << 8 | bytes[0];
	    },
	    getInt32: function getInt32(byteOffset /* , littleEndian */) {
	      return unpackI32(get(this, 4, byteOffset, arguments[1]));
	    },
	    getUint32: function getUint32(byteOffset /* , littleEndian */) {
	      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
	    },
	    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
	      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
	    },
	    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
	      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
	    },
	    setInt8: function setInt8(byteOffset, value) {
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
	      set(this, 4, byteOffset, packF32, value, arguments[2]);
	    },
	    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
	      set(this, 8, byteOffset, packF64, value, arguments[2]);
	    }
	  });
	} else {
	  if (!_fails(function () {
	    $ArrayBuffer(1);
	  }) || !_fails(function () {
	    new $ArrayBuffer(-1); // eslint-disable-line no-new
	  }) || _fails(function () {
	    new $ArrayBuffer(); // eslint-disable-line no-new
	    new $ArrayBuffer(1.5); // eslint-disable-line no-new
	    new $ArrayBuffer(NaN); // eslint-disable-line no-new
	    return $ArrayBuffer.name != ARRAY_BUFFER;
	  })) {
	    $ArrayBuffer = function ArrayBuffer(length) {
	      _anInstance(this, $ArrayBuffer);
	      return new BaseBuffer(_toIndex(length));
	    };
	    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
	    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
	      if (!((key = keys[j++]) in $ArrayBuffer)) _hide($ArrayBuffer, key, BaseBuffer[key]);
	    }
	    ArrayBufferProto.constructor = $ArrayBuffer;
	  }
	  // iOS Safari 7.x bug
	  var view = new $DataView(new $ArrayBuffer(2));
	  var $setInt8 = $DataView[PROTOTYPE].setInt8;
	  view.setInt8(0, 2147483648);
	  view.setInt8(1, 2147483649);
	  if (view.getInt8(0) || !view.getInt8(1)) _redefineAll($DataView[PROTOTYPE], {
	    setInt8: function setInt8(byteOffset, value) {
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    }
	  }, true);
	}
	_setToStringTag($ArrayBuffer, ARRAY_BUFFER);
	_setToStringTag($DataView, DATA_VIEW);
	_hide($DataView[PROTOTYPE], _typed.VIEW, true);
	exports[ARRAY_BUFFER] = $ArrayBuffer;
	exports[DATA_VIEW] = $DataView;
	});

	var ArrayBuffer$1 = _global.ArrayBuffer;

	var $ArrayBuffer = _typedBuffer.ArrayBuffer;
	var $DataView = _typedBuffer.DataView;
	var $isView = _typed.ABV && ArrayBuffer$1.isView;
	var $slice = $ArrayBuffer.prototype.slice;
	var VIEW$1 = _typed.VIEW;
	var ARRAY_BUFFER = 'ArrayBuffer';

	_export(_export.G + _export.W + _export.F * (ArrayBuffer$1 !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

	_export(_export.S + _export.F * !_typed.CONSTR, ARRAY_BUFFER, {
	  // 24.1.3.1 ArrayBuffer.isView(arg)
	  isView: function isView(it) {
	    return $isView && $isView(it) || _isObject(it) && VIEW$1 in it;
	  }
	});

	_export(_export.P + _export.U + _export.F * _fails(function () {
	  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
	}), ARRAY_BUFFER, {
	  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
	  slice: function slice(start, end) {
	    if ($slice !== undefined && end === undefined) return $slice.call(_anObject(this), start); // FF fix
	    var len = _anObject(this).byteLength;
	    var first = _toAbsoluteIndex(start, len);
	    var fin = _toAbsoluteIndex(end === undefined ? len : end, len);
	    var result = new (_speciesConstructor(this, $ArrayBuffer))(_toLength(fin - first));
	    var viewS = new $DataView(this);
	    var viewT = new $DataView(result);
	    var index = 0;
	    while (first < fin) {
	      viewT.setUint8(index++, viewS.getUint8(first++));
	    } return result;
	  }
	});

	_setSpecies(ARRAY_BUFFER);

	_export(_export.G + _export.W + _export.F * !_typed.ABV, {
	  DataView: _typedBuffer.DataView
	});

	var _typedArray = createCommonjsModule(function (module) {
	if (_descriptors) {
	  var global = _global;
	  var fails = _fails;
	  var $export = _export;
	  var $typed = _typed;
	  var $buffer = _typedBuffer;
	  var ctx = _ctx;
	  var anInstance = _anInstance;
	  var propertyDesc = _propertyDesc;
	  var hide = _hide;
	  var redefineAll = _redefineAll;
	  var toInteger = _toInteger;
	  var toLength = _toLength;
	  var toIndex = _toIndex;
	  var toAbsoluteIndex = _toAbsoluteIndex;
	  var toPrimitive = _toPrimitive;
	  var has = _has;
	  var classof = _classof;
	  var isObject = _isObject;
	  var toObject = _toObject;
	  var isArrayIter = _isArrayIter;
	  var create = _objectCreate;
	  var getPrototypeOf = _objectGpo;
	  var gOPN = _objectGopn.f;
	  var getIterFn = core_getIteratorMethod;
	  var uid = _uid;
	  var wks = _wks;
	  var createArrayMethod = _arrayMethods;
	  var createArrayIncludes = _arrayIncludes;
	  var speciesConstructor = _speciesConstructor;
	  var ArrayIterators = es6_array_iterator;
	  var Iterators = _iterators;
	  var $iterDetect = _iterDetect;
	  var setSpecies = _setSpecies;
	  var arrayFill = _arrayFill;
	  var arrayCopyWithin = _arrayCopyWithin;
	  var $DP = _objectDp;
	  var $GOPD = _objectGopd;
	  var dP = $DP.f;
	  var gOPD = $GOPD.f;
	  var RangeError = global.RangeError;
	  var TypeError = global.TypeError;
	  var Uint8Array = global.Uint8Array;
	  var ARRAY_BUFFER = 'ArrayBuffer';
	  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
	  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
	  var PROTOTYPE = 'prototype';
	  var ArrayProto = Array[PROTOTYPE];
	  var $ArrayBuffer = $buffer.ArrayBuffer;
	  var $DataView = $buffer.DataView;
	  var arrayForEach = createArrayMethod(0);
	  var arrayFilter = createArrayMethod(2);
	  var arraySome = createArrayMethod(3);
	  var arrayEvery = createArrayMethod(4);
	  var arrayFind = createArrayMethod(5);
	  var arrayFindIndex = createArrayMethod(6);
	  var arrayIncludes = createArrayIncludes(true);
	  var arrayIndexOf = createArrayIncludes(false);
	  var arrayValues = ArrayIterators.values;
	  var arrayKeys = ArrayIterators.keys;
	  var arrayEntries = ArrayIterators.entries;
	  var arrayLastIndexOf = ArrayProto.lastIndexOf;
	  var arrayReduce = ArrayProto.reduce;
	  var arrayReduceRight = ArrayProto.reduceRight;
	  var arrayJoin = ArrayProto.join;
	  var arraySort = ArrayProto.sort;
	  var arraySlice = ArrayProto.slice;
	  var arrayToString = ArrayProto.toString;
	  var arrayToLocaleString = ArrayProto.toLocaleString;
	  var ITERATOR = wks('iterator');
	  var TAG = wks('toStringTag');
	  var TYPED_CONSTRUCTOR = uid('typed_constructor');
	  var DEF_CONSTRUCTOR = uid('def_constructor');
	  var ALL_CONSTRUCTORS = $typed.CONSTR;
	  var TYPED_ARRAY = $typed.TYPED;
	  var VIEW = $typed.VIEW;
	  var WRONG_LENGTH = 'Wrong length!';

	  var $map = createArrayMethod(1, function (O, length) {
	    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
	  });

	  var LITTLE_ENDIAN = fails(function () {
	    // eslint-disable-next-line no-undef
	    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
	  });

	  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
	    new Uint8Array(1).set({});
	  });

	  var toOffset = function (it, BYTES) {
	    var offset = toInteger(it);
	    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
	    return offset;
	  };

	  var validate = function (it) {
	    if (isObject(it) && TYPED_ARRAY in it) return it;
	    throw TypeError(it + ' is not a typed array!');
	  };

	  var allocate = function (C, length) {
	    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
	      throw TypeError('It is not a typed array constructor!');
	    } return new C(length);
	  };

	  var speciesFromList = function (O, list) {
	    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
	  };

	  var fromList = function (C, list) {
	    var index = 0;
	    var length = list.length;
	    var result = allocate(C, length);
	    while (length > index) result[index] = list[index++];
	    return result;
	  };

	  var addGetter = function (it, key, internal) {
	    dP(it, key, { get: function () { return this._d[internal]; } });
	  };

	  var $from = function from(source /* , mapfn, thisArg */) {
	    var O = toObject(source);
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var iterFn = getIterFn(O);
	    var i, length, values, result, step, iterator;
	    if (iterFn != undefined && !isArrayIter(iterFn)) {
	      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
	        values.push(step.value);
	      } O = values;
	    }
	    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
	    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
	      result[i] = mapping ? mapfn(O[i], i) : O[i];
	    }
	    return result;
	  };

	  var $of = function of(/* ...items */) {
	    var index = 0;
	    var length = arguments.length;
	    var result = allocate(this, length);
	    while (length > index) result[index] = arguments[index++];
	    return result;
	  };

	  // iOS Safari 6.x fails here
	  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

	  var $toLocaleString = function toLocaleString() {
	    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
	  };

	  var proto = {
	    copyWithin: function copyWithin(target, start /* , end */) {
	      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    every: function every(callbackfn /* , thisArg */) {
	      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
	      return arrayFill.apply(validate(this), arguments);
	    },
	    filter: function filter(callbackfn /* , thisArg */) {
	      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
	        arguments.length > 1 ? arguments[1] : undefined));
	    },
	    find: function find(predicate /* , thisArg */) {
	      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    findIndex: function findIndex(predicate /* , thisArg */) {
	      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    forEach: function forEach(callbackfn /* , thisArg */) {
	      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    indexOf: function indexOf(searchElement /* , fromIndex */) {
	      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    includes: function includes(searchElement /* , fromIndex */) {
	      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    join: function join(separator) { // eslint-disable-line no-unused-vars
	      return arrayJoin.apply(validate(this), arguments);
	    },
	    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
	      return arrayLastIndexOf.apply(validate(this), arguments);
	    },
	    map: function map(mapfn /* , thisArg */) {
	      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
	      return arrayReduce.apply(validate(this), arguments);
	    },
	    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
	      return arrayReduceRight.apply(validate(this), arguments);
	    },
	    reverse: function reverse() {
	      var that = this;
	      var length = validate(that).length;
	      var middle = Math.floor(length / 2);
	      var index = 0;
	      var value;
	      while (index < middle) {
	        value = that[index];
	        that[index++] = that[--length];
	        that[length] = value;
	      } return that;
	    },
	    some: function some(callbackfn /* , thisArg */) {
	      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    sort: function sort(comparefn) {
	      return arraySort.call(validate(this), comparefn);
	    },
	    subarray: function subarray(begin, end) {
	      var O = validate(this);
	      var length = O.length;
	      var $begin = toAbsoluteIndex(begin, length);
	      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
	        O.buffer,
	        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
	        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
	      );
	    }
	  };

	  var $slice = function slice(start, end) {
	    return speciesFromList(this, arraySlice.call(validate(this), start, end));
	  };

	  var $set = function set(arrayLike /* , offset */) {
	    validate(this);
	    var offset = toOffset(arguments[1], 1);
	    var length = this.length;
	    var src = toObject(arrayLike);
	    var len = toLength(src.length);
	    var index = 0;
	    if (len + offset > length) throw RangeError(WRONG_LENGTH);
	    while (index < len) this[offset + index] = src[index++];
	  };

	  var $iterators = {
	    entries: function entries() {
	      return arrayEntries.call(validate(this));
	    },
	    keys: function keys() {
	      return arrayKeys.call(validate(this));
	    },
	    values: function values() {
	      return arrayValues.call(validate(this));
	    }
	  };

	  var isTAIndex = function (target, key) {
	    return isObject(target)
	      && target[TYPED_ARRAY]
	      && typeof key != 'symbol'
	      && key in target
	      && String(+key) == String(key);
	  };
	  var $getDesc = function getOwnPropertyDescriptor(target, key) {
	    return isTAIndex(target, key = toPrimitive(key, true))
	      ? propertyDesc(2, target[key])
	      : gOPD(target, key);
	  };
	  var $setDesc = function defineProperty(target, key, desc) {
	    if (isTAIndex(target, key = toPrimitive(key, true))
	      && isObject(desc)
	      && has(desc, 'value')
	      && !has(desc, 'get')
	      && !has(desc, 'set')
	      // TODO: add validation descriptor w/o calling accessors
	      && !desc.configurable
	      && (!has(desc, 'writable') || desc.writable)
	      && (!has(desc, 'enumerable') || desc.enumerable)
	    ) {
	      target[key] = desc.value;
	      return target;
	    } return dP(target, key, desc);
	  };

	  if (!ALL_CONSTRUCTORS) {
	    $GOPD.f = $getDesc;
	    $DP.f = $setDesc;
	  }

	  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
	    getOwnPropertyDescriptor: $getDesc,
	    defineProperty: $setDesc
	  });

	  if (fails(function () { arrayToString.call({}); })) {
	    arrayToString = arrayToLocaleString = function toString() {
	      return arrayJoin.call(this);
	    };
	  }

	  var $TypedArrayPrototype$ = redefineAll({}, proto);
	  redefineAll($TypedArrayPrototype$, $iterators);
	  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
	  redefineAll($TypedArrayPrototype$, {
	    slice: $slice,
	    set: $set,
	    constructor: function () { /* noop */ },
	    toString: arrayToString,
	    toLocaleString: $toLocaleString
	  });
	  addGetter($TypedArrayPrototype$, 'buffer', 'b');
	  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
	  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
	  addGetter($TypedArrayPrototype$, 'length', 'e');
	  dP($TypedArrayPrototype$, TAG, {
	    get: function () { return this[TYPED_ARRAY]; }
	  });

	  // eslint-disable-next-line max-statements
	  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
	    CLAMPED = !!CLAMPED;
	    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
	    var GETTER = 'get' + KEY;
	    var SETTER = 'set' + KEY;
	    var TypedArray = global[NAME];
	    var Base = TypedArray || {};
	    var TAC = TypedArray && getPrototypeOf(TypedArray);
	    var FORCED = !TypedArray || !$typed.ABV;
	    var O = {};
	    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
	    var getter = function (that, index) {
	      var data = that._d;
	      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
	    };
	    var setter = function (that, index, value) {
	      var data = that._d;
	      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
	      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
	    };
	    var addElement = function (that, index) {
	      dP(that, index, {
	        get: function () {
	          return getter(this, index);
	        },
	        set: function (value) {
	          return setter(this, index, value);
	        },
	        enumerable: true
	      });
	    };
	    if (FORCED) {
	      TypedArray = wrapper(function (that, data, $offset, $length) {
	        anInstance(that, TypedArray, NAME, '_d');
	        var index = 0;
	        var offset = 0;
	        var buffer, byteLength, length, klass;
	        if (!isObject(data)) {
	          length = toIndex(data);
	          byteLength = length * BYTES;
	          buffer = new $ArrayBuffer(byteLength);
	        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
	          buffer = data;
	          offset = toOffset($offset, BYTES);
	          var $len = data.byteLength;
	          if ($length === undefined) {
	            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
	            byteLength = $len - offset;
	            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
	          } else {
	            byteLength = toLength($length) * BYTES;
	            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
	          }
	          length = byteLength / BYTES;
	        } else if (TYPED_ARRAY in data) {
	          return fromList(TypedArray, data);
	        } else {
	          return $from.call(TypedArray, data);
	        }
	        hide(that, '_d', {
	          b: buffer,
	          o: offset,
	          l: byteLength,
	          e: length,
	          v: new $DataView(buffer)
	        });
	        while (index < length) addElement(that, index++);
	      });
	      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
	      hide(TypedArrayPrototype, 'constructor', TypedArray);
	    } else if (!fails(function () {
	      TypedArray(1);
	    }) || !fails(function () {
	      new TypedArray(-1); // eslint-disable-line no-new
	    }) || !$iterDetect(function (iter) {
	      new TypedArray(); // eslint-disable-line no-new
	      new TypedArray(null); // eslint-disable-line no-new
	      new TypedArray(1.5); // eslint-disable-line no-new
	      new TypedArray(iter); // eslint-disable-line no-new
	    }, true)) {
	      TypedArray = wrapper(function (that, data, $offset, $length) {
	        anInstance(that, TypedArray, NAME);
	        var klass;
	        // `ws` module bug, temporarily remove validation length for Uint8Array
	        // https://github.com/websockets/ws/pull/645
	        if (!isObject(data)) return new Base(toIndex(data));
	        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
	          return $length !== undefined
	            ? new Base(data, toOffset($offset, BYTES), $length)
	            : $offset !== undefined
	              ? new Base(data, toOffset($offset, BYTES))
	              : new Base(data);
	        }
	        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
	        return $from.call(TypedArray, data);
	      });
	      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
	        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
	      });
	      TypedArray[PROTOTYPE] = TypedArrayPrototype;
	      TypedArrayPrototype.constructor = TypedArray;
	    }
	    var $nativeIterator = TypedArrayPrototype[ITERATOR];
	    var CORRECT_ITER_NAME = !!$nativeIterator
	      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
	    var $iterator = $iterators.values;
	    hide(TypedArray, TYPED_CONSTRUCTOR, true);
	    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
	    hide(TypedArrayPrototype, VIEW, true);
	    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

	    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
	      dP(TypedArrayPrototype, TAG, {
	        get: function () { return NAME; }
	      });
	    }

	    O[NAME] = TypedArray;

	    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

	    $export($export.S, NAME, {
	      BYTES_PER_ELEMENT: BYTES
	    });

	    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
	      from: $from,
	      of: $of
	    });

	    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

	    $export($export.P, NAME, proto);

	    setSpecies(NAME);

	    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

	    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

	    if (TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

	    $export($export.P + $export.F * fails(function () {
	      new TypedArray(1).slice();
	    }), NAME, { slice: $slice });

	    $export($export.P + $export.F * (fails(function () {
	      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
	    }) || !fails(function () {
	      TypedArrayPrototype.toLocaleString.call([1, 2]);
	    })), NAME, { toLocaleString: $toLocaleString });

	    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
	    if (!CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
	  };
	} else module.exports = function () { /* empty */ };
	});

	_typedArray('Int8', 1, function (init) {
	  return function Int8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArray('Uint8', 1, function (init) {
	  return function Uint8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArray('Uint8', 1, function (init) {
	  return function Uint8ClampedArray(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	}, true);

	_typedArray('Int16', 2, function (init) {
	  return function Int16Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArray('Uint16', 2, function (init) {
	  return function Uint16Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArray('Int32', 4, function (init) {
	  return function Int32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArray('Uint32', 4, function (init) {
	  return function Uint32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArray('Float32', 4, function (init) {
	  return function Float32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArray('Float64', 8, function (init) {
	  return function Float64Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)



	var rApply = (_global.Reflect || {}).apply;
	var fApply = Function.apply;
	// MS Edge argumentsList argument is optional
	_export(_export.S + _export.F * !_fails(function () {
	  rApply(function () { /* empty */ });
	}), 'Reflect', {
	  apply: function apply(target, thisArgument, argumentsList) {
	    var T = _aFunction(target);
	    var L = _anObject(argumentsList);
	    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
	  }
	});

	// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])







	var rConstruct = (_global.Reflect || {}).construct;

	// MS Edge supports only 2 arguments and argumentsList argument is optional
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	var NEW_TARGET_BUG = _fails(function () {
	  function F() { /* empty */ }
	  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
	});
	var ARGS_BUG = !_fails(function () {
	  rConstruct(function () { /* empty */ });
	});

	_export(_export.S + _export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
	  construct: function construct(Target, args /* , newTarget */) {
	    _aFunction(Target);
	    _anObject(args);
	    var newTarget = arguments.length < 3 ? Target : _aFunction(arguments[2]);
	    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
	    if (Target == newTarget) {
	      // w/o altered newTarget, optimization for 0-4 arguments
	      switch (args.length) {
	        case 0: return new Target();
	        case 1: return new Target(args[0]);
	        case 2: return new Target(args[0], args[1]);
	        case 3: return new Target(args[0], args[1], args[2]);
	        case 4: return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (_bind.apply(Target, $args))();
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto = newTarget.prototype;
	    var instance = _objectCreate(_isObject(proto) ? proto : Object.prototype);
	    var result = Function.apply.call(Target, instance, args);
	    return _isObject(result) ? result : instance;
	  }
	});

	// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)





	// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
	_export(_export.S + _export.F * _fails(function () {
	  // eslint-disable-next-line no-undef
	  Reflect.defineProperty(_objectDp.f({}, 1, { value: 1 }), 1, { value: 2 });
	}), 'Reflect', {
	  defineProperty: function defineProperty(target, propertyKey, attributes) {
	    _anObject(target);
	    propertyKey = _toPrimitive(propertyKey, true);
	    _anObject(attributes);
	    try {
	      _objectDp.f(target, propertyKey, attributes);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});

	// 26.1.4 Reflect.deleteProperty(target, propertyKey)

	var gOPD$3 = _objectGopd.f;


	_export(_export.S, 'Reflect', {
	  deleteProperty: function deleteProperty(target, propertyKey) {
	    var desc = gOPD$3(_anObject(target), propertyKey);
	    return desc && !desc.configurable ? false : delete target[propertyKey];
	  }
	});

	// 26.1.5 Reflect.enumerate(target)


	var Enumerate = function (iterated) {
	  this._t = _anObject(iterated); // target
	  this._i = 0;                  // next index
	  var keys = this._k = [];      // keys
	  var key;
	  for (key in iterated) keys.push(key);
	};
	_iterCreate(Enumerate, 'Object', function () {
	  var that = this;
	  var keys = that._k;
	  var key;
	  do {
	    if (that._i >= keys.length) return { value: undefined, done: true };
	  } while (!((key = keys[that._i++]) in that._t));
	  return { value: key, done: false };
	});

	_export(_export.S, 'Reflect', {
	  enumerate: function enumerate(target) {
	    return new Enumerate(target);
	  }
	});

	// 26.1.6 Reflect.get(target, propertyKey [, receiver])







	function get(target, propertyKey /* , receiver */) {
	  var receiver = arguments.length < 3 ? target : arguments[2];
	  var desc, proto;
	  if (_anObject(target) === receiver) return target[propertyKey];
	  if (desc = _objectGopd.f(target, propertyKey)) return _has(desc, 'value')
	    ? desc.value
	    : desc.get !== undefined
	      ? desc.get.call(receiver)
	      : undefined;
	  if (_isObject(proto = _objectGpo(target))) return get(proto, propertyKey, receiver);
	}

	_export(_export.S, 'Reflect', { get: get });

	// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)




	_export(_export.S, 'Reflect', {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
	    return _objectGopd.f(_anObject(target), propertyKey);
	  }
	});

	// 26.1.8 Reflect.getPrototypeOf(target)




	_export(_export.S, 'Reflect', {
	  getPrototypeOf: function getPrototypeOf(target) {
	    return _objectGpo(_anObject(target));
	  }
	});

	// 26.1.9 Reflect.has(target, propertyKey)


	_export(_export.S, 'Reflect', {
	  has: function has(target, propertyKey) {
	    return propertyKey in target;
	  }
	});

	// 26.1.10 Reflect.isExtensible(target)


	var $isExtensible = Object.isExtensible;

	_export(_export.S, 'Reflect', {
	  isExtensible: function isExtensible(target) {
	    _anObject(target);
	    return $isExtensible ? $isExtensible(target) : true;
	  }
	});

	// all object keys, includes non-enumerable and symbols



	var Reflect$1 = _global.Reflect;
	var _ownKeys = Reflect$1 && Reflect$1.ownKeys || function ownKeys(it) {
	  var keys = _objectGopn.f(_anObject(it));
	  var getSymbols = _objectGops.f;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

	// 26.1.11 Reflect.ownKeys(target)


	_export(_export.S, 'Reflect', { ownKeys: _ownKeys });

	// 26.1.12 Reflect.preventExtensions(target)


	var $preventExtensions = Object.preventExtensions;

	_export(_export.S, 'Reflect', {
	  preventExtensions: function preventExtensions(target) {
	    _anObject(target);
	    try {
	      if ($preventExtensions) $preventExtensions(target);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});

	// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])









	function set(target, propertyKey, V /* , receiver */) {
	  var receiver = arguments.length < 4 ? target : arguments[3];
	  var ownDesc = _objectGopd.f(_anObject(target), propertyKey);
	  var existingDescriptor, proto;
	  if (!ownDesc) {
	    if (_isObject(proto = _objectGpo(target))) {
	      return set(proto, propertyKey, V, receiver);
	    }
	    ownDesc = _propertyDesc(0);
	  }
	  if (_has(ownDesc, 'value')) {
	    if (ownDesc.writable === false || !_isObject(receiver)) return false;
	    if (existingDescriptor = _objectGopd.f(receiver, propertyKey)) {
	      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
	      existingDescriptor.value = V;
	      _objectDp.f(receiver, propertyKey, existingDescriptor);
	    } else _objectDp.f(receiver, propertyKey, _propertyDesc(0, V));
	    return true;
	  }
	  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	}

	_export(_export.S, 'Reflect', { set: set });

	// 26.1.14 Reflect.setPrototypeOf(target, proto)



	if (_setProto) _export(_export.S, 'Reflect', {
	  setPrototypeOf: function setPrototypeOf(target, proto) {
	    _setProto.check(target, proto);
	    try {
	      _setProto.set(target, proto);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});

	// https://github.com/tc39/Array.prototype.includes

	var $includes = _arrayIncludes(true);

	_export(_export.P, 'Array', {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	_addToUnscopables('includes');

	// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray




	var IS_CONCAT_SPREADABLE = _wks('isConcatSpreadable');

	function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
	  var targetIndex = start;
	  var sourceIndex = 0;
	  var mapFn = mapper ? _ctx(mapper, thisArg, 3) : false;
	  var element, spreadable;

	  while (sourceIndex < sourceLen) {
	    if (sourceIndex in source) {
	      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

	      spreadable = false;
	      if (_isObject(element)) {
	        spreadable = element[IS_CONCAT_SPREADABLE];
	        spreadable = spreadable !== undefined ? !!spreadable : _isArray(element);
	      }

	      if (spreadable && depth > 0) {
	        targetIndex = flattenIntoArray(target, original, element, _toLength(element.length), targetIndex, depth - 1) - 1;
	      } else {
	        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
	        target[targetIndex] = element;
	      }

	      targetIndex++;
	    }
	    sourceIndex++;
	  }
	  return targetIndex;
	}

	var _flattenIntoArray = flattenIntoArray;

	// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap







	_export(_export.P, 'Array', {
	  flatMap: function flatMap(callbackfn /* , thisArg */) {
	    var O = _toObject(this);
	    var sourceLen, A;
	    _aFunction(callbackfn);
	    sourceLen = _toLength(O.length);
	    A = _arraySpeciesCreate(O, 0);
	    _flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
	    return A;
	  }
	});

	_addToUnscopables('flatMap');

	// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten







	_export(_export.P, 'Array', {
	  flatten: function flatten(/* depthArg = 1 */) {
	    var depthArg = arguments[0];
	    var O = _toObject(this);
	    var sourceLen = _toLength(O.length);
	    var A = _arraySpeciesCreate(O, 0);
	    _flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : _toInteger(depthArg));
	    return A;
	  }
	});

	_addToUnscopables('flatten');

	// https://github.com/mathiasbynens/String.prototype.at

	var $at$2 = _stringAt(true);

	_export(_export.P, 'String', {
	  at: function at(pos) {
	    return $at$2(this, pos);
	  }
	});

	// https://github.com/tc39/proposal-string-pad-start-end




	var _stringPad = function (that, maxLength, fillString, left) {
	  var S = String(_defined(that));
	  var stringLength = S.length;
	  var fillStr = fillString === undefined ? ' ' : String(fillString);
	  var intMaxLength = _toLength(maxLength);
	  if (intMaxLength <= stringLength || fillStr == '') return S;
	  var fillLen = intMaxLength - stringLength;
	  var stringFiller = _stringRepeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
	  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
	  return left ? stringFiller + S : S + stringFiller;
	};

	// https://github.com/tc39/proposal-string-pad-start-end




	// https://github.com/zloirock/core-js/issues/280
	_export(_export.P + _export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(_userAgent), 'String', {
	  padStart: function padStart(maxLength /* , fillString = ' ' */) {
	    return _stringPad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
	  }
	});

	// https://github.com/tc39/proposal-string-pad-start-end




	// https://github.com/zloirock/core-js/issues/280
	_export(_export.P + _export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(_userAgent), 'String', {
	  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
	    return _stringPad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
	  }
	});

	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	_stringTrim('trimLeft', function ($trim) {
	  return function trimLeft() {
	    return $trim(this, 1);
	  };
	}, 'trimStart');

	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	_stringTrim('trimRight', function ($trim) {
	  return function trimRight() {
	    return $trim(this, 2);
	  };
	}, 'trimEnd');

	// https://tc39.github.io/String.prototype.matchAll/





	var RegExpProto = RegExp.prototype;

	var $RegExpStringIterator = function (regexp, string) {
	  this._r = regexp;
	  this._s = string;
	};

	_iterCreate($RegExpStringIterator, 'RegExp String', function next() {
	  var match = this._r.exec(this._s);
	  return { value: match, done: match === null };
	});

	_export(_export.P, 'String', {
	  matchAll: function matchAll(regexp) {
	    _defined(this);
	    if (!_isRegexp(regexp)) throw TypeError(regexp + ' is not a regexp!');
	    var S = String(this);
	    var flags = 'flags' in RegExpProto ? String(regexp.flags) : _flags.call(regexp);
	    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
	    rx.lastIndex = _toLength(regexp.lastIndex);
	    return new $RegExpStringIterator(rx, S);
	  }
	});

	_wksDefine('asyncIterator');

	_wksDefine('observable');

	// https://github.com/tc39/proposal-object-getownpropertydescriptors






	_export(_export.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = _toIobject(object);
	    var getDesc = _objectGopd.f;
	    var keys = _ownKeys(O);
	    var result = {};
	    var i = 0;
	    var key, desc;
	    while (keys.length > i) {
	      desc = getDesc(O, key = keys[i++]);
	      if (desc !== undefined) _createProperty(result, key, desc);
	    }
	    return result;
	  }
	});

	var isEnum$1 = _objectPie.f;
	var _objectToArray = function (isEntries) {
	  return function (it) {
	    var O = _toIobject(it);
	    var keys = _objectKeys(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) if (isEnum$1.call(O, key = keys[i++])) {
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

	// https://github.com/tc39/proposal-object-values-entries

	var $values = _objectToArray(false);

	_export(_export.S, 'Object', {
	  values: function values(it) {
	    return $values(it);
	  }
	});

	// https://github.com/tc39/proposal-object-values-entries

	var $entries = _objectToArray(true);

	_export(_export.S, 'Object', {
	  entries: function entries(it) {
	    return $entries(it);
	  }
	});

	// Forced replacement prototype accessors methods
	var _objectForcedPam = !_fails(function () {
	  var K = Math.random();
	  // In FF throws only define methods
	  // eslint-disable-next-line no-undef, no-useless-call
	  __defineSetter__.call(null, K, function () { /* empty */ });
	  delete _global[K];
	});

	// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
	_descriptors && _export(_export.P + _objectForcedPam, 'Object', {
	  __defineGetter__: function __defineGetter__(P, getter) {
	    _objectDp.f(_toObject(this), P, { get: _aFunction(getter), enumerable: true, configurable: true });
	  }
	});

	// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
	_descriptors && _export(_export.P + _objectForcedPam, 'Object', {
	  __defineSetter__: function __defineSetter__(P, setter) {
	    _objectDp.f(_toObject(this), P, { set: _aFunction(setter), enumerable: true, configurable: true });
	  }
	});

	var getOwnPropertyDescriptor = _objectGopd.f;

	// B.2.2.4 Object.prototype.__lookupGetter__(P)
	_descriptors && _export(_export.P + _objectForcedPam, 'Object', {
	  __lookupGetter__: function __lookupGetter__(P) {
	    var O = _toObject(this);
	    var K = _toPrimitive(P, true);
	    var D;
	    do {
	      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
	    } while (O = _objectGpo(O));
	  }
	});

	var getOwnPropertyDescriptor$1 = _objectGopd.f;

	// B.2.2.5 Object.prototype.__lookupSetter__(P)
	_descriptors && _export(_export.P + _objectForcedPam, 'Object', {
	  __lookupSetter__: function __lookupSetter__(P) {
	    var O = _toObject(this);
	    var K = _toPrimitive(P, true);
	    var D;
	    do {
	      if (D = getOwnPropertyDescriptor$1(O, K)) return D.set;
	    } while (O = _objectGpo(O));
	  }
	});

	var _arrayFromIterable = function (iter, ITERATOR) {
	  var result = [];
	  _forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON


	var _collectionToJson = function (NAME) {
	  return function toJSON() {
	    if (_classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
	    return _arrayFromIterable(this);
	  };
	};

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON


	_export(_export.P + _export.R, 'Map', { toJSON: _collectionToJson('Map') });

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON


	_export(_export.P + _export.R, 'Set', { toJSON: _collectionToJson('Set') });

	// https://tc39.github.io/proposal-setmap-offrom/


	var _setCollectionOf = function (COLLECTION) {
	  _export(_export.S, COLLECTION, { of: function of() {
	    var length = arguments.length;
	    var A = new Array(length);
	    while (length--) A[length] = arguments[length];
	    return new this(A);
	  } });
	};

	// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
	_setCollectionOf('Map');

	// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
	_setCollectionOf('Set');

	// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
	_setCollectionOf('WeakMap');

	// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
	_setCollectionOf('WeakSet');

	// https://tc39.github.io/proposal-setmap-offrom/





	var _setCollectionFrom = function (COLLECTION) {
	  _export(_export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
	    var mapFn = arguments[1];
	    var mapping, A, n, cb;
	    _aFunction(this);
	    mapping = mapFn !== undefined;
	    if (mapping) _aFunction(mapFn);
	    if (source == undefined) return new this();
	    A = [];
	    if (mapping) {
	      n = 0;
	      cb = _ctx(mapFn, arguments[2], 2);
	      _forOf(source, false, function (nextItem) {
	        A.push(cb(nextItem, n++));
	      });
	    } else {
	      _forOf(source, false, A.push, A);
	    }
	    return new this(A);
	  } });
	};

	// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
	_setCollectionFrom('Map');

	// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
	_setCollectionFrom('Set');

	// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
	_setCollectionFrom('WeakMap');

	// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
	_setCollectionFrom('WeakSet');

	// https://github.com/tc39/proposal-global


	_export(_export.G, { global: _global });

	// https://github.com/tc39/proposal-global


	_export(_export.S, 'System', { global: _global });

	// https://github.com/ljharb/proposal-is-error



	_export(_export.S, 'Error', {
	  isError: function isError(it) {
	    return _cof(it) === 'Error';
	  }
	});

	// https://rwaldron.github.io/proposal-math-extensions/


	_export(_export.S, 'Math', {
	  clamp: function clamp(x, lower, upper) {
	    return Math.min(upper, Math.max(lower, x));
	  }
	});

	// https://rwaldron.github.io/proposal-math-extensions/


	_export(_export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });

	// https://rwaldron.github.io/proposal-math-extensions/

	var RAD_PER_DEG = 180 / Math.PI;

	_export(_export.S, 'Math', {
	  degrees: function degrees(radians) {
	    return radians * RAD_PER_DEG;
	  }
	});

	// https://rwaldron.github.io/proposal-math-extensions/
	var _mathScale = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
	  if (
	    arguments.length === 0
	      // eslint-disable-next-line no-self-compare
	      || x != x
	      // eslint-disable-next-line no-self-compare
	      || inLow != inLow
	      // eslint-disable-next-line no-self-compare
	      || inHigh != inHigh
	      // eslint-disable-next-line no-self-compare
	      || outLow != outLow
	      // eslint-disable-next-line no-self-compare
	      || outHigh != outHigh
	  ) return NaN;
	  if (x === Infinity || x === -Infinity) return x;
	  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
	};

	// https://rwaldron.github.io/proposal-math-extensions/




	_export(_export.S, 'Math', {
	  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
	    return _mathFround(_mathScale(x, inLow, inHigh, outLow, outHigh));
	  }
	});

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703


	_export(_export.S, 'Math', {
	  iaddh: function iaddh(x0, x1, y0, y1) {
	    var $x0 = x0 >>> 0;
	    var $x1 = x1 >>> 0;
	    var $y0 = y0 >>> 0;
	    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
	  }
	});

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703


	_export(_export.S, 'Math', {
	  isubh: function isubh(x0, x1, y0, y1) {
	    var $x0 = x0 >>> 0;
	    var $x1 = x1 >>> 0;
	    var $y0 = y0 >>> 0;
	    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
	  }
	});

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703


	_export(_export.S, 'Math', {
	  imulh: function imulh(u, v) {
	    var UINT16 = 0xffff;
	    var $u = +u;
	    var $v = +v;
	    var u0 = $u & UINT16;
	    var v0 = $v & UINT16;
	    var u1 = $u >> 16;
	    var v1 = $v >> 16;
	    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
	    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
	  }
	});

	// https://rwaldron.github.io/proposal-math-extensions/


	_export(_export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });

	// https://rwaldron.github.io/proposal-math-extensions/

	var DEG_PER_RAD = Math.PI / 180;

	_export(_export.S, 'Math', {
	  radians: function radians(degrees) {
	    return degrees * DEG_PER_RAD;
	  }
	});

	// https://rwaldron.github.io/proposal-math-extensions/


	_export(_export.S, 'Math', { scale: _mathScale });

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703


	_export(_export.S, 'Math', {
	  umulh: function umulh(u, v) {
	    var UINT16 = 0xffff;
	    var $u = +u;
	    var $v = +v;
	    var u0 = $u & UINT16;
	    var v0 = $v & UINT16;
	    var u1 = $u >>> 16;
	    var v1 = $v >>> 16;
	    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
	    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
	  }
	});

	// http://jfbastien.github.io/papers/Math.signbit.html


	_export(_export.S, 'Math', { signbit: function signbit(x) {
	  // eslint-disable-next-line no-self-compare
	  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
	} });

	_export(_export.P + _export.R, 'Promise', { 'finally': function (onFinally) {
	  var C = _speciesConstructor(this, _core.Promise || _global.Promise);
	  var isFunction = typeof onFinally == 'function';
	  return this.then(
	    isFunction ? function (x) {
	      return _promiseResolve(C, onFinally()).then(function () { return x; });
	    } : onFinally,
	    isFunction ? function (e) {
	      return _promiseResolve(C, onFinally()).then(function () { throw e; });
	    } : onFinally
	  );
	} });

	// https://github.com/tc39/proposal-promise-try




	_export(_export.S, 'Promise', { 'try': function (callbackfn) {
	  var promiseCapability = _newPromiseCapability.f(this);
	  var result = _perform(callbackfn);
	  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
	  return promiseCapability.promise;
	} });

	var shared$1 = _shared('metadata');
	var store = shared$1.store || (shared$1.store = new (es6_weakMap)());

	var getOrCreateMetadataMap = function (target, targetKey, create) {
	  var targetMetadata = store.get(target);
	  if (!targetMetadata) {
	    if (!create) return undefined;
	    store.set(target, targetMetadata = new es6_map());
	  }
	  var keyMetadata = targetMetadata.get(targetKey);
	  if (!keyMetadata) {
	    if (!create) return undefined;
	    targetMetadata.set(targetKey, keyMetadata = new es6_map());
	  } return keyMetadata;
	};
	var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
	  var metadataMap = getOrCreateMetadataMap(O, P, false);
	  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
	};
	var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
	  var metadataMap = getOrCreateMetadataMap(O, P, false);
	  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
	};
	var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
	  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
	};
	var ordinaryOwnMetadataKeys = function (target, targetKey) {
	  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
	  var keys = [];
	  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
	  return keys;
	};
	var toMetaKey = function (it) {
	  return it === undefined || typeof it == 'symbol' ? it : String(it);
	};
	var exp$3 = function (O) {
	  _export(_export.S, 'Reflect', O);
	};

	var _metadata = {
	  store: store,
	  map: getOrCreateMetadataMap,
	  has: ordinaryHasOwnMetadata,
	  get: ordinaryGetOwnMetadata,
	  set: ordinaryDefineOwnMetadata,
	  keys: ordinaryOwnMetadataKeys,
	  key: toMetaKey,
	  exp: exp$3
	};

	var toMetaKey$1 = _metadata.key;
	var ordinaryDefineOwnMetadata$1 = _metadata.set;

	_metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
	  ordinaryDefineOwnMetadata$1(metadataKey, metadataValue, _anObject(target), toMetaKey$1(targetKey));
	} });

	var toMetaKey$2 = _metadata.key;
	var getOrCreateMetadataMap$1 = _metadata.map;
	var store$1 = _metadata.store;

	_metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
	  var targetKey = arguments.length < 3 ? undefined : toMetaKey$2(arguments[2]);
	  var metadataMap = getOrCreateMetadataMap$1(_anObject(target), targetKey, false);
	  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
	  if (metadataMap.size) return true;
	  var targetMetadata = store$1.get(target);
	  targetMetadata['delete'](targetKey);
	  return !!targetMetadata.size || store$1['delete'](target);
	} });

	var ordinaryHasOwnMetadata$1 = _metadata.has;
	var ordinaryGetOwnMetadata$1 = _metadata.get;
	var toMetaKey$3 = _metadata.key;

	var ordinaryGetMetadata = function (MetadataKey, O, P) {
	  var hasOwn = ordinaryHasOwnMetadata$1(MetadataKey, O, P);
	  if (hasOwn) return ordinaryGetOwnMetadata$1(MetadataKey, O, P);
	  var parent = _objectGpo(O);
	  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
	};

	_metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
	  return ordinaryGetMetadata(metadataKey, _anObject(target), arguments.length < 3 ? undefined : toMetaKey$3(arguments[2]));
	} });

	var ordinaryOwnMetadataKeys$1 = _metadata.keys;
	var toMetaKey$4 = _metadata.key;

	var ordinaryMetadataKeys = function (O, P) {
	  var oKeys = ordinaryOwnMetadataKeys$1(O, P);
	  var parent = _objectGpo(O);
	  if (parent === null) return oKeys;
	  var pKeys = ordinaryMetadataKeys(parent, P);
	  return pKeys.length ? oKeys.length ? _arrayFromIterable(new es6_set(oKeys.concat(pKeys))) : pKeys : oKeys;
	};

	_metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
	  return ordinaryMetadataKeys(_anObject(target), arguments.length < 2 ? undefined : toMetaKey$4(arguments[1]));
	} });

	var ordinaryGetOwnMetadata$2 = _metadata.get;
	var toMetaKey$5 = _metadata.key;

	_metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
	  return ordinaryGetOwnMetadata$2(metadataKey, _anObject(target)
	    , arguments.length < 3 ? undefined : toMetaKey$5(arguments[2]));
	} });

	var ordinaryOwnMetadataKeys$2 = _metadata.keys;
	var toMetaKey$6 = _metadata.key;

	_metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
	  return ordinaryOwnMetadataKeys$2(_anObject(target), arguments.length < 2 ? undefined : toMetaKey$6(arguments[1]));
	} });

	var ordinaryHasOwnMetadata$2 = _metadata.has;
	var toMetaKey$7 = _metadata.key;

	var ordinaryHasMetadata = function (MetadataKey, O, P) {
	  var hasOwn = ordinaryHasOwnMetadata$2(MetadataKey, O, P);
	  if (hasOwn) return true;
	  var parent = _objectGpo(O);
	  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
	};

	_metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
	  return ordinaryHasMetadata(metadataKey, _anObject(target), arguments.length < 3 ? undefined : toMetaKey$7(arguments[2]));
	} });

	var ordinaryHasOwnMetadata$3 = _metadata.has;
	var toMetaKey$8 = _metadata.key;

	_metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
	  return ordinaryHasOwnMetadata$3(metadataKey, _anObject(target)
	    , arguments.length < 3 ? undefined : toMetaKey$8(arguments[2]));
	} });

	var toMetaKey$9 = _metadata.key;
	var ordinaryDefineOwnMetadata$2 = _metadata.set;

	_metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
	  return function decorator(target, targetKey) {
	    ordinaryDefineOwnMetadata$2(
	      metadataKey, metadataValue,
	      (targetKey !== undefined ? _anObject : _aFunction)(target),
	      toMetaKey$9(targetKey)
	    );
	  };
	} });

	// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask

	var microtask$1 = _microtask();
	var process$3 = _global.process;
	var isNode$2 = _cof(process$3) == 'process';

	_export(_export.G, {
	  asap: function asap(fn) {
	    var domain = isNode$2 && process$3.domain;
	    microtask$1(domain ? domain.bind(fn) : fn);
	  }
	});

	// https://github.com/zenparsing/es-observable



	var microtask$2 = _microtask();
	var OBSERVABLE = _wks('observable');






	var RETURN = _forOf.RETURN;

	var getMethod = function (fn) {
	  return fn == null ? undefined : _aFunction(fn);
	};

	var cleanupSubscription = function (subscription) {
	  var cleanup = subscription._c;
	  if (cleanup) {
	    subscription._c = undefined;
	    cleanup();
	  }
	};

	var subscriptionClosed = function (subscription) {
	  return subscription._o === undefined;
	};

	var closeSubscription = function (subscription) {
	  if (!subscriptionClosed(subscription)) {
	    subscription._o = undefined;
	    cleanupSubscription(subscription);
	  }
	};

	var Subscription = function (observer, subscriber) {
	  _anObject(observer);
	  this._c = undefined;
	  this._o = observer;
	  observer = new SubscriptionObserver(this);
	  try {
	    var cleanup = subscriber(observer);
	    var subscription = cleanup;
	    if (cleanup != null) {
	      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
	      else _aFunction(cleanup);
	      this._c = cleanup;
	    }
	  } catch (e) {
	    observer.error(e);
	    return;
	  } if (subscriptionClosed(this)) cleanupSubscription(this);
	};

	Subscription.prototype = _redefineAll({}, {
	  unsubscribe: function unsubscribe() { closeSubscription(this); }
	});

	var SubscriptionObserver = function (subscription) {
	  this._s = subscription;
	};

	SubscriptionObserver.prototype = _redefineAll({}, {
	  next: function next(value) {
	    var subscription = this._s;
	    if (!subscriptionClosed(subscription)) {
	      var observer = subscription._o;
	      try {
	        var m = getMethod(observer.next);
	        if (m) return m.call(observer, value);
	      } catch (e) {
	        try {
	          closeSubscription(subscription);
	        } finally {
	          throw e;
	        }
	      }
	    }
	  },
	  error: function error(value) {
	    var subscription = this._s;
	    if (subscriptionClosed(subscription)) throw value;
	    var observer = subscription._o;
	    subscription._o = undefined;
	    try {
	      var m = getMethod(observer.error);
	      if (!m) throw value;
	      value = m.call(observer, value);
	    } catch (e) {
	      try {
	        cleanupSubscription(subscription);
	      } finally {
	        throw e;
	      }
	    } cleanupSubscription(subscription);
	    return value;
	  },
	  complete: function complete(value) {
	    var subscription = this._s;
	    if (!subscriptionClosed(subscription)) {
	      var observer = subscription._o;
	      subscription._o = undefined;
	      try {
	        var m = getMethod(observer.complete);
	        value = m ? m.call(observer, value) : undefined;
	      } catch (e) {
	        try {
	          cleanupSubscription(subscription);
	        } finally {
	          throw e;
	        }
	      } cleanupSubscription(subscription);
	      return value;
	    }
	  }
	});

	var $Observable = function Observable(subscriber) {
	  _anInstance(this, $Observable, 'Observable', '_f')._f = _aFunction(subscriber);
	};

	_redefineAll($Observable.prototype, {
	  subscribe: function subscribe(observer) {
	    return new Subscription(observer, this._f);
	  },
	  forEach: function forEach(fn) {
	    var that = this;
	    return new (_core.Promise || _global.Promise)(function (resolve, reject) {
	      _aFunction(fn);
	      var subscription = that.subscribe({
	        next: function (value) {
	          try {
	            return fn(value);
	          } catch (e) {
	            reject(e);
	            subscription.unsubscribe();
	          }
	        },
	        error: reject,
	        complete: resolve
	      });
	    });
	  }
	});

	_redefineAll($Observable, {
	  from: function from(x) {
	    var C = typeof this === 'function' ? this : $Observable;
	    var method = getMethod(_anObject(x)[OBSERVABLE]);
	    if (method) {
	      var observable = _anObject(method.call(x));
	      return observable.constructor === C ? observable : new C(function (observer) {
	        return observable.subscribe(observer);
	      });
	    }
	    return new C(function (observer) {
	      var done = false;
	      microtask$2(function () {
	        if (!done) {
	          try {
	            if (_forOf(x, false, function (it) {
	              observer.next(it);
	              if (done) return RETURN;
	            }) === RETURN) return;
	          } catch (e) {
	            if (done) throw e;
	            observer.error(e);
	            return;
	          } observer.complete();
	        }
	      });
	      return function () { done = true; };
	    });
	  },
	  of: function of() {
	    for (var i = 0, l = arguments.length, items = new Array(l); i < l;) items[i] = arguments[i++];
	    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
	      var done = false;
	      microtask$2(function () {
	        if (!done) {
	          for (var j = 0; j < items.length; ++j) {
	            observer.next(items[j]);
	            if (done) return;
	          } observer.complete();
	        }
	      });
	      return function () { done = true; };
	    });
	  }
	});

	_hide($Observable.prototype, OBSERVABLE, function () { return this; });

	_export(_export.G, { Observable: $Observable });

	_setSpecies('Observable');

	// ie9- setTimeout & setInterval additional parameters fix



	var slice = [].slice;
	var MSIE = /MSIE .\./.test(_userAgent); // <- dirty ie9- check
	var wrap$1 = function (set) {
	  return function (fn, time /* , ...args */) {
	    var boundArgs = arguments.length > 2;
	    var args = boundArgs ? slice.call(arguments, 2) : false;
	    return set(boundArgs ? function () {
	      // eslint-disable-next-line no-new-func
	      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
	    } : fn, time);
	  };
	};
	_export(_export.G + _export.B + _export.F * MSIE, {
	  setTimeout: wrap$1(_global.setTimeout),
	  setInterval: wrap$1(_global.setInterval)
	});

	_export(_export.G + _export.B, {
	  setImmediate: _task.set,
	  clearImmediate: _task.clear
	});

	var ITERATOR$4 = _wks('iterator');
	var TO_STRING_TAG = _wks('toStringTag');
	var ArrayValues = _iterators.Array;

	var DOMIterables = {
	  CSSRuleList: true, // TODO: Not spec compliant, should be false.
	  CSSStyleDeclaration: false,
	  CSSValueList: false,
	  ClientRectList: false,
	  DOMRectList: false,
	  DOMStringList: false,
	  DOMTokenList: true,
	  DataTransferItemList: false,
	  FileList: false,
	  HTMLAllCollection: false,
	  HTMLCollection: false,
	  HTMLFormElement: false,
	  HTMLSelectElement: false,
	  MediaList: true, // TODO: Not spec compliant, should be false.
	  MimeTypeArray: false,
	  NamedNodeMap: false,
	  NodeList: true,
	  PaintRequestList: false,
	  Plugin: false,
	  PluginArray: false,
	  SVGLengthList: false,
	  SVGNumberList: false,
	  SVGPathSegList: false,
	  SVGPointList: false,
	  SVGStringList: false,
	  SVGTransformList: false,
	  SourceBufferList: false,
	  StyleSheetList: true, // TODO: Not spec compliant, should be false.
	  TextTrackCueList: false,
	  TextTrackList: false,
	  TouchList: false
	};

	for (var collections = _objectKeys(DOMIterables), i$2 = 0; i$2 < collections.length; i$2++) {
	  var NAME$1 = collections[i$2];
	  var explicit = DOMIterables[NAME$1];
	  var Collection = _global[NAME$1];
	  var proto$3 = Collection && Collection.prototype;
	  var key$1;
	  if (proto$3) {
	    if (!proto$3[ITERATOR$4]) _hide(proto$3, ITERATOR$4, ArrayValues);
	    if (!proto$3[TO_STRING_TAG]) _hide(proto$3, TO_STRING_TAG, NAME$1);
	    _iterators[NAME$1] = ArrayValues;
	    if (explicit) for (key$1 in es6_array_iterator) if (!proto$3[key$1]) _redefine(proto$3, key$1, es6_array_iterator[key$1], true);
	  }
	}

	var runtime = createCommonjsModule(function (module) {
	/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */

	!(function(global) {

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }

	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = module.exports;

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  runtime.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };

	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype &&
	      NativeIteratorPrototype !== Op &&
	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }

	  var Gp = GeneratorFunctionPrototype.prototype =
	    Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] =
	    GeneratorFunction.displayName = "GeneratorFunction";

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  runtime.awrap = function(arg) {
	    return { __await: arg };
	  };

	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value &&
	            typeof value === "object" &&
	            hasOwn.call(value, "__await")) {
	          return Promise.resolve(value.__await).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration. If the Promise is rejected, however, the
	          // result for this iteration will be rejected with the same
	          // reason. Note that rejections of yielded Promises are not
	          // thrown back into the generator function, as is the case
	          // when an awaited Promise is rejected. This difference in
	          // behavior between yield and await is important, because it
	          // allows the consumer to decide what to do with the yielded
	          // rejection (swallow it and continue, manually .throw it back
	          // into the generator, abandon iteration, whatever). With
	          // await, by contrast, there is no opportunity to examine the
	          // rejection reason outside the generator function, so the
	          // only option is to throw it from the await expression, and
	          // let the generator function handle the exception.
	          result.value = unwrapped;
	          resolve(result);
	        }, reject);
	      }
	    }

	    if (typeof global.process === "object" && global.process.domain) {
	      invoke = global.process.domain.bind(invoke);
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);
	  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	    return this;
	  };
	  runtime.AsyncIterator = AsyncIterator;

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );

	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      context.method = method;
	      context.arg = arg;

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }

	        if (context.method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = context.arg;

	        } else if (context.method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw context.arg;
	          }

	          context.dispatchException(context.arg);

	        } else if (context.method === "return") {
	          context.abrupt("return", context.arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          if (record.arg === ContinueSentinel) {
	            continue;
	          }

	          return {
	            value: record.arg,
	            done: context.done
	          };

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(context.arg) call above.
	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  }

	  // Call delegate.iterator[context.method](context.arg) and handle the
	  // result, either by returning a { value, done } result from the
	  // delegate iterator, or by modifying context.method and context.arg,
	  // setting context.delegate to null, and returning the ContinueSentinel.
	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];
	    if (method === undefined) {
	      // A .throw or .return when the delegate iterator has no .throw
	      // method always terminates the yield* loop.
	      context.delegate = null;

	      if (context.method === "throw") {
	        if (delegate.iterator.return) {
	          // If the delegate iterator has a return method, give it a
	          // chance to clean up.
	          context.method = "return";
	          context.arg = undefined;
	          maybeInvokeDelegate(delegate, context);

	          if (context.method === "throw") {
	            // If maybeInvokeDelegate(context) changed context.method from
	            // "return" to "throw", let that override the TypeError below.
	            return ContinueSentinel;
	          }
	        }

	        context.method = "throw";
	        context.arg = new TypeError(
	          "The iterator does not provide a 'throw' method");
	      }

	      return ContinueSentinel;
	    }

	    var record = tryCatch(method, delegate.iterator, context.arg);

	    if (record.type === "throw") {
	      context.method = "throw";
	      context.arg = record.arg;
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    var info = record.arg;

	    if (! info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    if (info.done) {
	      // Assign the result of the finished delegate to the temporary
	      // variable specified by delegate.resultName (see delegateYield).
	      context[delegate.resultName] = info.value;

	      // Resume execution at the desired location (see delegateYield).
	      context.next = delegate.nextLoc;

	      // If context.method was "throw" but the delegate handled the
	      // exception, let the outer generator proceed normally. If
	      // context.method was "next", forget context.arg since it has been
	      // "consumed" by the delegate iterator. If context.method was
	      // "return", allow the original .return call to continue in the
	      // outer generator.
	      if (context.method !== "return") {
	        context.method = "next";
	        context.arg = undefined;
	      }

	    } else {
	      // Re-yield the result returned by the delegate method.
	      return info;
	    }

	    // The delegate iterator is finished, so forget it and continue with
	    // the outer generator.
	    context.delegate = null;
	    return ContinueSentinel;
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[toStringTagSymbol] = "Generator";

	  // A Generator should always return itself as the iterator object when the
	  // @@iterator function is called on it. Some browsers' implementations of the
	  // iterator prototype chain incorrectly implement this, causing the Generator
	  // object to not be returned from this call. This ensures that doesn't happen.
	  // See https://github.com/facebook/regenerator/issues/274 for more details.
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;

	  function doneResult() {
	    return { value: undefined, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined;
	      this.done = false;
	      this.delegate = null;

	      this.method = "next";
	      this.arg = undefined;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;

	        if (caught) {
	          // If the dispatched exception was caught by a catch block,
	          // then let that catch block handle the exception normally.
	          context.method = "next";
	          context.arg = undefined;
	        }

	        return !! caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.method = "next";
	        this.next = finallyEntry.finallyLoc;
	        return ContinueSentinel;
	      }

	      return this.complete(record);
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = this.arg = record.arg;
	        this.method = "return";
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }

	      return ContinueSentinel;
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      if (this.method === "next") {
	        // Deliberately forget the last sent value so that we don't
	        // accidentally pass it on to the delegate.
	        this.arg = undefined;
	      }

	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof commonjsGlobal === "object" ? commonjsGlobal :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : commonjsGlobal
	);
	});

	var _replacer = function (regExp, replace) {
	  var replacer = replace === Object(replace) ? function (part) {
	    return replace[part];
	  } : replace;
	  return function (it) {
	    return String(it).replace(regExp, replacer);
	  };
	};

	// https://github.com/benjamingr/RexExp.escape

	var $re = _replacer(/[\\^$*+?.()|[\]{}]/g, '\\$&');

	_export(_export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });

	var _escape = _core.RegExp.escape;

	if (commonjsGlobal._babelPolyfill) {
	  throw new Error("only one instance of babel-polyfill is allowed");
	}
	commonjsGlobal._babelPolyfill = true;

	var DEFINE_PROPERTY = "defineProperty";
	function define$2(O, key, value) {
	  O[key] || Object[DEFINE_PROPERTY](O, key, {
	    writable: true,
	    configurable: true,
	    value: value
	  });
	}

	define$2(String.prototype, "padLeft", "".padStart);
	define$2(String.prototype, "padRight", "".padEnd);

	"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
	  [][key] && define$2(Array, key, Function.call.bind([][key]));
	});

	function _typeof(obj) {
	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    _typeof = function (obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof = function (obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	function _objectSpread(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i] != null ? arguments[i] : {};
	    var ownKeys = Object.keys(source);

	    if (typeof Object.getOwnPropertySymbols === 'function') {
	      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
	        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
	      }));
	    }

	    ownKeys.forEach(function (key) {
	      _defineProperty(target, key, source[key]);
	    });
	  }

	  return target;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf(subClass, superClass);
	}

	function _getPrototypeOf(o) {
	  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	function _possibleConstructorReturn(self, call) {
	  if (call && (typeof call === "object" || typeof call === "function")) {
	    return call;
	  }

	  return _assertThisInitialized(self);
	}

	function _readOnlyError(name) {
	  throw new Error("\"" + name + "\" is read-only");
	}

	var EventEmitter = createCommonjsModule(function (module) {
	(function (exports) {

	    /**
	     * Class for managing events.
	     * Can be extended to provide event functionality in other classes.
	     *
	     * @class EventEmitter Manages event registering and emitting.
	     */
	    function EventEmitter() {}

	    // Shortcuts to improve speed and size
	    var proto = EventEmitter.prototype;
	    var originalGlobalValue = exports.EventEmitter;

	    /**
	     * Finds the index of the listener for the event in its storage array.
	     *
	     * @param {Function[]} listeners Array of listeners to search through.
	     * @param {Function} listener Method to look for.
	     * @return {Number} Index of the specified listener, -1 if not found
	     * @api private
	     */
	    function indexOfListener(listeners, listener) {
	        var i = listeners.length;
	        while (i--) {
	            if (listeners[i].listener === listener) {
	                return i;
	            }
	        }

	        return -1;
	    }

	    /**
	     * Alias a method while keeping the context correct, to allow for overwriting of target method.
	     *
	     * @param {String} name The name of the target method.
	     * @return {Function} The aliased method
	     * @api private
	     */
	    function alias(name) {
	        return function aliasClosure() {
	            return this[name].apply(this, arguments);
	        };
	    }

	    /**
	     * Returns the listener array for the specified event.
	     * Will initialise the event object and listener arrays if required.
	     * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
	     * Each property in the object response is an array of listener functions.
	     *
	     * @param {String|RegExp} evt Name of the event to return the listeners from.
	     * @return {Function[]|Object} All listener functions for the event.
	     */
	    proto.getListeners = function getListeners(evt) {
	        var events = this._getEvents();
	        var response;
	        var key;

	        // Return a concatenated array of all matching events if
	        // the selector is a regular expression.
	        if (evt instanceof RegExp) {
	            response = {};
	            for (key in events) {
	                if (events.hasOwnProperty(key) && evt.test(key)) {
	                    response[key] = events[key];
	                }
	            }
	        }
	        else {
	            response = events[evt] || (events[evt] = []);
	        }

	        return response;
	    };

	    /**
	     * Takes a list of listener objects and flattens it into a list of listener functions.
	     *
	     * @param {Object[]} listeners Raw listener objects.
	     * @return {Function[]} Just the listener functions.
	     */
	    proto.flattenListeners = function flattenListeners(listeners) {
	        var flatListeners = [];
	        var i;

	        for (i = 0; i < listeners.length; i += 1) {
	            flatListeners.push(listeners[i].listener);
	        }

	        return flatListeners;
	    };

	    /**
	     * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
	     *
	     * @param {String|RegExp} evt Name of the event to return the listeners from.
	     * @return {Object} All listener functions for an event in an object.
	     */
	    proto.getListenersAsObject = function getListenersAsObject(evt) {
	        var listeners = this.getListeners(evt);
	        var response;

	        if (listeners instanceof Array) {
	            response = {};
	            response[evt] = listeners;
	        }

	        return response || listeners;
	    };

	    function isValidListener (listener) {
	        if (typeof listener === 'function' || listener instanceof RegExp) {
	            return true
	        } else if (listener && typeof listener === 'object') {
	            return isValidListener(listener.listener)
	        } else {
	            return false
	        }
	    }

	    /**
	     * Adds a listener function to the specified event.
	     * The listener will not be added if it is a duplicate.
	     * If the listener returns true then it will be removed after it is called.
	     * If you pass a regular expression as the event name then the listener will be added to all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to attach the listener to.
	     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.addListener = function addListener(evt, listener) {
	        if (!isValidListener(listener)) {
	            throw new TypeError('listener must be a function');
	        }

	        var listeners = this.getListenersAsObject(evt);
	        var listenerIsWrapped = typeof listener === 'object';
	        var key;

	        for (key in listeners) {
	            if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
	                listeners[key].push(listenerIsWrapped ? listener : {
	                    listener: listener,
	                    once: false
	                });
	            }
	        }

	        return this;
	    };

	    /**
	     * Alias of addListener
	     */
	    proto.on = alias('addListener');

	    /**
	     * Semi-alias of addListener. It will add a listener that will be
	     * automatically removed after its first execution.
	     *
	     * @param {String|RegExp} evt Name of the event to attach the listener to.
	     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.addOnceListener = function addOnceListener(evt, listener) {
	        return this.addListener(evt, {
	            listener: listener,
	            once: true
	        });
	    };

	    /**
	     * Alias of addOnceListener.
	     */
	    proto.once = alias('addOnceListener');

	    /**
	     * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
	     * You need to tell it what event names should be matched by a regex.
	     *
	     * @param {String} evt Name of the event to create.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.defineEvent = function defineEvent(evt) {
	        this.getListeners(evt);
	        return this;
	    };

	    /**
	     * Uses defineEvent to define multiple events.
	     *
	     * @param {String[]} evts An array of event names to define.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.defineEvents = function defineEvents(evts) {
	        for (var i = 0; i < evts.length; i += 1) {
	            this.defineEvent(evts[i]);
	        }
	        return this;
	    };

	    /**
	     * Removes a listener function from the specified event.
	     * When passed a regular expression as the event name, it will remove the listener from all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to remove the listener from.
	     * @param {Function} listener Method to remove from the event.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.removeListener = function removeListener(evt, listener) {
	        var listeners = this.getListenersAsObject(evt);
	        var index;
	        var key;

	        for (key in listeners) {
	            if (listeners.hasOwnProperty(key)) {
	                index = indexOfListener(listeners[key], listener);

	                if (index !== -1) {
	                    listeners[key].splice(index, 1);
	                }
	            }
	        }

	        return this;
	    };

	    /**
	     * Alias of removeListener
	     */
	    proto.off = alias('removeListener');

	    /**
	     * Adds listeners in bulk using the manipulateListeners method.
	     * If you pass an object as the first argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
	     * You can also pass it a regular expression to add the array of listeners to all events that match it.
	     * Yeah, this function does quite a bit. That's probably a bad thing.
	     *
	     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
	     * @param {Function[]} [listeners] An optional array of listener functions to add.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.addListeners = function addListeners(evt, listeners) {
	        // Pass through to manipulateListeners
	        return this.manipulateListeners(false, evt, listeners);
	    };

	    /**
	     * Removes listeners in bulk using the manipulateListeners method.
	     * If you pass an object as the first argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	     * You can also pass it an event name and an array of listeners to be removed.
	     * You can also pass it a regular expression to remove the listeners from all events that match it.
	     *
	     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
	     * @param {Function[]} [listeners] An optional array of listener functions to remove.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.removeListeners = function removeListeners(evt, listeners) {
	        // Pass through to manipulateListeners
	        return this.manipulateListeners(true, evt, listeners);
	    };

	    /**
	     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
	     * The first argument will determine if the listeners are removed (true) or added (false).
	     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	     * You can also pass it an event name and an array of listeners to be added/removed.
	     * You can also pass it a regular expression to manipulate the listeners of all events that match it.
	     *
	     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
	     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
	     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
	        var i;
	        var value;
	        var single = remove ? this.removeListener : this.addListener;
	        var multiple = remove ? this.removeListeners : this.addListeners;

	        // If evt is an object then pass each of its properties to this method
	        if (typeof evt === 'object' && !(evt instanceof RegExp)) {
	            for (i in evt) {
	                if (evt.hasOwnProperty(i) && (value = evt[i])) {
	                    // Pass the single listener straight through to the singular method
	                    if (typeof value === 'function') {
	                        single.call(this, i, value);
	                    }
	                    else {
	                        // Otherwise pass back to the multiple function
	                        multiple.call(this, i, value);
	                    }
	                }
	            }
	        }
	        else {
	            // So evt must be a string
	            // And listeners must be an array of listeners
	            // Loop over it and pass each one to the multiple method
	            i = listeners.length;
	            while (i--) {
	                single.call(this, evt, listeners[i]);
	            }
	        }

	        return this;
	    };

	    /**
	     * Removes all listeners from a specified event.
	     * If you do not specify an event then all listeners will be removed.
	     * That means every event will be emptied.
	     * You can also pass a regex to remove all events that match it.
	     *
	     * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.removeEvent = function removeEvent(evt) {
	        var type = typeof evt;
	        var events = this._getEvents();
	        var key;

	        // Remove different things depending on the state of evt
	        if (type === 'string') {
	            // Remove all listeners for the specified event
	            delete events[evt];
	        }
	        else if (evt instanceof RegExp) {
	            // Remove all events matching the regex.
	            for (key in events) {
	                if (events.hasOwnProperty(key) && evt.test(key)) {
	                    delete events[key];
	                }
	            }
	        }
	        else {
	            // Remove all listeners in all events
	            delete this._events;
	        }

	        return this;
	    };

	    /**
	     * Alias of removeEvent.
	     *
	     * Added to mirror the node API.
	     */
	    proto.removeAllListeners = alias('removeEvent');

	    /**
	     * Emits an event of your choice.
	     * When emitted, every listener attached to that event will be executed.
	     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
	     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
	     * So they will not arrive within the array on the other side, they will be separate.
	     * You can also pass a regular expression to emit to all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	     * @param {Array} [args] Optional array of arguments to be passed to each listener.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.emitEvent = function emitEvent(evt, args) {
	        var listenersMap = this.getListenersAsObject(evt);
	        var listeners;
	        var listener;
	        var i;
	        var key;
	        var response;

	        for (key in listenersMap) {
	            if (listenersMap.hasOwnProperty(key)) {
	                listeners = listenersMap[key].slice(0);

	                for (i = 0; i < listeners.length; i++) {
	                    // If the listener returns true then it shall be removed from the event
	                    // The function is executed either with a basic call or an apply if there is an args array
	                    listener = listeners[i];

	                    if (listener.once === true) {
	                        this.removeListener(evt, listener.listener);
	                    }

	                    response = listener.listener.apply(this, args || []);

	                    if (response === this._getOnceReturnValue()) {
	                        this.removeListener(evt, listener.listener);
	                    }
	                }
	            }
	        }

	        return this;
	    };

	    /**
	     * Alias of emitEvent
	     */
	    proto.trigger = alias('emitEvent');

	    /**
	     * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
	     * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	     * @param {...*} Optional additional arguments to be passed to each listener.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.emit = function emit(evt) {
	        var args = Array.prototype.slice.call(arguments, 1);
	        return this.emitEvent(evt, args);
	    };

	    /**
	     * Sets the current value to check against when executing listeners. If a
	     * listeners return value matches the one set here then it will be removed
	     * after execution. This value defaults to true.
	     *
	     * @param {*} value The new value to check for when executing listeners.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.setOnceReturnValue = function setOnceReturnValue(value) {
	        this._onceReturnValue = value;
	        return this;
	    };

	    /**
	     * Fetches the current value to check against when executing listeners. If
	     * the listeners return value matches this one then it should be removed
	     * automatically. It will return true by default.
	     *
	     * @return {*|Boolean} The current value to check for or the default, true.
	     * @api private
	     */
	    proto._getOnceReturnValue = function _getOnceReturnValue() {
	        if (this.hasOwnProperty('_onceReturnValue')) {
	            return this._onceReturnValue;
	        }
	        else {
	            return true;
	        }
	    };

	    /**
	     * Fetches the events object and creates one if required.
	     *
	     * @return {Object} The events storage object.
	     * @api private
	     */
	    proto._getEvents = function _getEvents() {
	        return this._events || (this._events = {});
	    };

	    /**
	     * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
	     *
	     * @return {Function} Non conflicting EventEmitter class.
	     */
	    EventEmitter.noConflict = function noConflict() {
	        exports.EventEmitter = originalGlobalValue;
	        return EventEmitter;
	    };

	    // Expose the class either via AMD, CommonJS or the global object
	    if (module.exports){
	        module.exports = EventEmitter;
	    }
	    else {
	        exports.EventEmitter = EventEmitter;
	    }
	}(typeof window !== 'undefined' ? window : commonjsGlobal || {}));
	});

	var createDom = function createDom() {
	  var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
	  var tpl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	  var attrs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	  var cname = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
	  var dom = document.createElement(el);
	  dom.className = cname;
	  dom.innerHTML = tpl;
	  Object.keys(attrs).forEach(function (item) {
	    var key = item;
	    var value = attrs[item];

	    if (el === 'video' || el === 'audio') {
	      if (value) {
	        dom.setAttribute(key, value);
	      }
	    } else {
	      dom.setAttribute(key, value);
	    }
	  });
	  return dom;
	};
	var setAttribute = function setAttribute(dom) {
	  var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  Object.keys(attrs).forEach(function (item) {
	    var key = item;
	    var value = attrs[item];
	    dom.setAttribute(key, value);
	  });
	};
	var hasClass = function hasClass(el, className) {
	  if (el.classList) {
	    return Array.prototype.some.call(el.classList, function (item) {
	      return item === className;
	    });
	  } else {
	    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
	  }
	};
	var addClass = function addClass(el, className) {
	  if (el.classList) {
	    className.replace(/(^\s+|\s+$)/g, '').split(/\s+/g).forEach(function (item) {
	      item && el.classList.add(item);
	    });
	  } else if (!hasClass(el, className)) {
	    el.className += ' ' + className;
	  }
	};
	var removeClass = function removeClass(el, className) {
	  if (el.classList) {
	    className.split(/\s+/g).forEach(function (item) {
	      el.classList.remove(item);
	    });
	  } else if (hasClass(el, className)) {
	    className.split(/\s+/g).forEach(function (item) {
	      var reg = new RegExp('(\\s|^)' + item + '(\\s|$)');
	      el.className = el.className.replace(reg, ' ');
	    });
	  }
	};
	var findDom = function findDom(sel) {
	  var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
	  return el.querySelector(sel);
	};
	var typeOf = function typeOf(obj) {
	  return Object.prototype.toString.call(obj).match(/([^\s.*]+)(?=]$)/g)[0];
	};

	var errorTypes = {
	  'log': function log(logMsg) {
	    return console.log("%cVIDEO Log '%s'", "color: green", logMsg);
	  },
	  'error': function error(msg) {
	    console.error("%cVIDEO Error: %s", "color: red", msg);
	  },
	  'warn': function warn(msg) {
	    console.warn("%cVIDEO Warn '%s'", "color: #88CA3B", msg);
	  }
	};

	var defaultProps = {
	  autoplay: false,
	  control: false,
	  muted: false,
	  scale: '16:9',
	  // 视频比例
	  poster: [],
	  // array or string
	  src: ''
	};
	var eventList = [{
	  origin: 'canplay',
	  instance: 'ready'
	}, {
	  origin: 'volumechange',
	  instance: 'volumechange'
	}, {
	  origin: 'play',
	  instance: 'play'
	}, {
	  origin: 'pause',
	  instance: 'pause'
	}, {
	  origin: 'loadeddata',
	  instance: 'loadeddata'
	}, {
	  origin: 'error',
	  instance: 'error'
	}, {
	  origin: 'durationchange',
	  instance: 'durationchange'
	}];
	var ROOT_CLASS = 'tm-player';

	var Player =
	/*#__PURE__*/
	function () {
	  function Player(options) {
	    _classCallCheck(this, Player);

	    options = _objectSpread({}, defaultProps, options);
	    this.options = options;
	    var _options = options,
	        autoplay = _options.autoplay,
	        control = _options.control,
	        muted = _options.muted,
	        id = _options.id;
	    var event$$1 = new EventEmitter();
	    Object.assign(Player.prototype, event$$1.__proto__); // this.setErrorListener();

	    this.checkParams(options);
	    this.video = findDom("#".concat(id));
	    var option = {
	      autoplay: autoplay,
	      control: false,
	      muted: muted
	    };

	    if (!this.video) {
	      this.video = createDom('video', 'your browser don`t support HTML5 video tag', option, 'video');
	    } else {
	      setAttribute(this.video, option);
	    }

	    this._createVideoFrame();

	    this._setVideoEventListener();
	  }

	  _createClass(Player, [{
	    key: "dispose",

	    /**
	     * destory
	     */
	    value: function dispose() {
	      removeClass(this.root, ROOT_CLASS);
	      this.removeEvent();
	      this.video = null;
	    }
	    /**
	     *
	     *
	     * @param {string} poster
	     * @returns
	     * @memberof Player
	     */

	  }, {
	    key: "setPoster",
	    value: function setPoster(poster) {
	      if (typeOf(poster) !== 'string') return;
	      this._posterImg.src = poster;
	    }
	  }, {
	    key: "pause",
	    value: function pause() {
	      this.video.pause();
	    }
	  }, {
	    key: "play",
	    value: function play() {
	      this.video.play();
	    }
	    /**
	     *  creat root div and controls, appent video in root
	     */

	  }, {
	    key: "_createVideoFrame",
	    value: function _createVideoFrame() {
	      var _this = this;

	      var wrapper = this.video.parentElement;
	      var scaleInfo = this.options.scale.split(":");
	      var scalePercent = scaleInfo[1] / scaleInfo[0];

	      if (!wrapper) {
	        this.emitEvent('warn', 'should creat a root dom');
	        wrapper = (_readOnlyError("wrapper"), findDom('body'));
	      }

	      var posterUrl = this.options.poster;

	      if (typeOf(this.options.poster) === 'array') {
	        var length = this.options.poster;
	        posterUrl = this.options.poster[Math.floor(Math.random() * length)];
	      }

	      this._posterImg = createDom('img', '', {
	        src: posterUrl
	      }, 'poster');
	      this.poster = createDom('div', '', {}, 'poster-wrapper hide');
	      this.poster.appendChild(this._posterImg);
	      this.root = createDom('div', '', {}, ROOT_CLASS);
	      this.root.appendChild(this.poster);
	      this.root.appendChild(this.video);
	      wrapper.appendChild(this.root);
	      addClass(this.root, ROOT_CLASS);
	      this.root.style.paddingBottom = scalePercent * 100 + '%';

	      this.poster.show = function (visible) {
	        !visible && addClass(_this.poster, 'hide');
	        visible && removeClass(_this.poster, 'hide');
	      };
	    }
	  }, {
	    key: "_setVideoEventListener",
	    value: function _setVideoEventListener() {
	      var _this2 = this,
	          _arguments = arguments;

	      //video origin event
	      eventList.map(function (event$$1) {
	        _this2.video.addEventListener(event$$1.origin, function () {
	          _this2.emitEvent(event$$1.instance, _arguments);
	        });
	      });
	    }
	  }, {
	    key: "setErrorListener",
	    value: function setErrorListener() {
	      var _this3 = this;

	      Object.keys(errorTypes).map(function (error) {
	        console.log(errorTypes[error]);

	        _this3.addListeners(error, [errorTypes[error]]);
	      });
	    }
	  }, {
	    key: "checkParams",
	    value: function checkParams(props) {
	      if (!props.id) {
	        this.emitEvent('error', ['must have a video Id']);
	      }
	    }
	  }, {
	    key: "muted",
	    get: function get() {
	      return this.video.muted;
	    }
	    /**
	     *
	     * @param {boolean} muted
	     * @memberof Player
	     */
	    ,
	    set: function set(muted) {
	      this.video.muted = muted;
	    }
	  }, {
	    key: "srcObject",
	    get: function get() {
	      return null;
	    },
	    set: function set(stream) {
	      if (!stream) {
	        this.emitEvent('warn', 'no stream');
	        return;
	      }

	      this.video.srcObject = stream;
	    }
	  }, {
	    key: "currentTime",
	    get: function get() {
	      return this.video.currentTime;
	    },
	    set: function set(time) {
	      this.video.currentTime = time;
	    }
	  }, {
	    key: "src",
	    set: function set(url) {
	      this.options.src = url;
	      this.video.setAttribute("src", url);
	      this.video.load();
	    },
	    get: function get() {
	      return this.options.src;
	    }
	  }]);

	  return Player;
	}();

	var FlvPlayer =
	/*#__PURE__*/
	function (_Player) {
	  _inherits(FlvPlayer, _Player);

	  function FlvPlayer(options) {
	    var _this;

	    _classCallCheck(this, FlvPlayer);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(FlvPlayer).call(this, options));

	    _this.renderSwfFrame();

	    return _this;
	  }

	  _createClass(FlvPlayer, [{
	    key: "renderSwfFrame",
	    value: function renderSwfFrame() {
	      this.root.removeChild(this.video);
	      this.video = createDom('object', '', {
	        // data: '/src/assets/player.swf',
	        // type: 'application/x-shockwave-flash',
	        width: '100%'
	      }, 'video');
	      var param1 = createDom('param', '', {
	        name: 'movie',
	        value: '/src/assets/player.swf' // value: swf

	      });
	      var param2 = createDom('param', '', {
	        name: 'wmode',
	        value: 'opaque'
	      });
	      var param3 = createDom('param', '', {
	        name: 'src',
	        value: this.options.src
	      });
	      var param4 = createDom('param', '', {
	        name: 'allowFullScreen',
	        value: true
	      });
	      var param5 = createDom('embed', '', {
	        swliveconnect: true,
	        name: 'flashplayer',
	        src: '/src/assets/player.swf',
	        type: 'application/x-shockwave-flash',
	        width: '100%'
	      });
	      this.video.appendChild(param1);
	      this.video.appendChild(param2);
	      this.video.appendChild(param3);
	      this.video.appendChild(param4);
	      this.video.appendChild(param5);

	      if (this.options.autoplay) {
	        var param = createDom('param', '', {
	          name: 'autoplay',
	          value: true
	        });
	        this.video.appendChild(param);
	      }

	      this.root.appendChild(this.video);
	    }
	  }]);

	  return FlvPlayer;
	}(Player);

	var global$1 = (typeof global !== "undefined" ? global :
	            typeof self !== "undefined" ? self :
	            typeof window !== "undefined" ? window : {});

	(function (f) {
	  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
	    module.exports = f();
	  } else if (typeof define === "function" && define.amd) {
	    define([], f);
	  } else {
	    var g;

	    if (typeof window !== "undefined") {
	      g = window;
	    } else if (typeof global$1 !== "undefined") {
	      g = global$1;
	    } else if (typeof self !== "undefined") {
	      g = self;
	    } else {
	      g = this;
	    }

	    g.muxjs = f();
	  }
	})(function () {
	  return function () {
	    function e(t, n, r) {
	      function s(o, u) {
	        if (!n[o]) {
	          if (!t[o]) {
	            var a = typeof require == "function" && require;
	            if (!u && a) return a(o, !0);
	            if (i) return i(o, !0);
	            var f = new Error("Cannot find module '" + o + "'");
	            throw f.code = "MODULE_NOT_FOUND", f;
	          }

	          var l = n[o] = {
	            exports: {}
	          };
	          t[o][0].call(l.exports, function (e) {
	            var n = t[o][1][e];
	            return s(n ? n : e);
	          }, l, l.exports, e, t, n, r);
	        }

	        return n[o].exports;
	      }

	      var i = typeof require == "function" && require;

	      for (var o = 0; o < r.length; o++) {
	        s(r[o]);
	      }

	      return s;
	    }

	    return e;
	  }()({
	    1: [function (require, module, exports) {

	      var Stream = require('../utils/stream.js'); // Constants


	      var _AacStream;
	      /**
	       * Splits an incoming stream of binary data into ADTS and ID3 Frames.
	       */


	      _AacStream = function AacStream() {
	        var everything = new Uint8Array(),
	            timeStamp = 0;

	        _AacStream.prototype.init.call(this);

	        this.setTimestamp = function (timestamp) {
	          timeStamp = timestamp;
	        };

	        this.parseId3TagSize = function (header, byteIndex) {
	          var returnSize = header[byteIndex + 6] << 21 | header[byteIndex + 7] << 14 | header[byteIndex + 8] << 7 | header[byteIndex + 9],
	              flags = header[byteIndex + 5],
	              footerPresent = (flags & 16) >> 4;

	          if (footerPresent) {
	            return returnSize + 20;
	          }

	          return returnSize + 10;
	        };

	        this.parseAdtsSize = function (header, byteIndex) {
	          var lowThree = (header[byteIndex + 5] & 0xE0) >> 5,
	              middle = header[byteIndex + 4] << 3,
	              highTwo = header[byteIndex + 3] & 0x3 << 11;
	          return highTwo | middle | lowThree;
	        };

	        this.push = function (bytes) {
	          var frameSize = 0,
	              byteIndex = 0,
	              bytesLeft,
	              chunk,
	              packet,
	              tempLength; // If there are bytes remaining from the last segment, prepend them to the
	          // bytes that were pushed in

	          if (everything.length) {
	            tempLength = everything.length;
	            everything = new Uint8Array(bytes.byteLength + tempLength);
	            everything.set(everything.subarray(0, tempLength));
	            everything.set(bytes, tempLength);
	          } else {
	            everything = bytes;
	          }

	          while (everything.length - byteIndex >= 3) {
	            if (everything[byteIndex] === 'I'.charCodeAt(0) && everything[byteIndex + 1] === 'D'.charCodeAt(0) && everything[byteIndex + 2] === '3'.charCodeAt(0)) {
	              // Exit early because we don't have enough to parse
	              // the ID3 tag header
	              if (everything.length - byteIndex < 10) {
	                break;
	              } // check framesize


	              frameSize = this.parseId3TagSize(everything, byteIndex); // Exit early if we don't have enough in the buffer
	              // to emit a full packet

	              if (frameSize > everything.length) {
	                break;
	              }

	              chunk = {
	                type: 'timed-metadata',
	                data: everything.subarray(byteIndex, byteIndex + frameSize)
	              };
	              this.trigger('data', chunk);
	              byteIndex += frameSize;
	              continue;
	            } else if (everything[byteIndex] & 0xff === 0xff && (everything[byteIndex + 1] & 0xf0) === 0xf0) {
	              // Exit early because we don't have enough to parse
	              // the ADTS frame header
	              if (everything.length - byteIndex < 7) {
	                break;
	              }

	              frameSize = this.parseAdtsSize(everything, byteIndex); // Exit early if we don't have enough in the buffer
	              // to emit a full packet

	              if (frameSize > everything.length) {
	                break;
	              }

	              packet = {
	                type: 'audio',
	                data: everything.subarray(byteIndex, byteIndex + frameSize),
	                pts: timeStamp,
	                dts: timeStamp
	              };
	              this.trigger('data', packet);
	              byteIndex += frameSize;
	              continue;
	            }

	            byteIndex++;
	          }

	          bytesLeft = everything.length - byteIndex;

	          if (bytesLeft > 0) {
	            everything = everything.subarray(byteIndex);
	          } else {
	            everything = new Uint8Array();
	          }
	        };
	      };

	      _AacStream.prototype = new Stream();
	      module.exports = _AacStream;
	    }, {
	      "../utils/stream.js": 30
	    }],
	    2: [function (require, module, exports) {

	      var ADTS_SAMPLING_FREQUENCIES = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350];

	      var parseSyncSafeInteger = function parseSyncSafeInteger(data) {
	        return data[0] << 21 | data[1] << 14 | data[2] << 7 | data[3];
	      }; // return a percent-encoded representation of the specified byte range
	      // @see http://en.wikipedia.org/wiki/Percent-encoding


	      var percentEncode = function percentEncode(bytes, start, end) {
	        var i,
	            result = '';

	        for (i = start; i < end; i++) {
	          result += '%' + ('00' + bytes[i].toString(16)).slice(-2);
	        }

	        return result;
	      }; // return the string representation of the specified byte range,
	      // interpreted as ISO-8859-1.


	      var parseIso88591 = function parseIso88591(bytes, start, end) {
	        return unescape(percentEncode(bytes, start, end)); // jshint ignore:line
	      };

	      var parseId3TagSize = function parseId3TagSize(header, byteIndex) {
	        var returnSize = header[byteIndex + 6] << 21 | header[byteIndex + 7] << 14 | header[byteIndex + 8] << 7 | header[byteIndex + 9],
	            flags = header[byteIndex + 5],
	            footerPresent = (flags & 16) >> 4;

	        if (footerPresent) {
	          return returnSize + 20;
	        }

	        return returnSize + 10;
	      };

	      var parseAdtsSize = function parseAdtsSize(header, byteIndex) {
	        var lowThree = (header[byteIndex + 5] & 0xE0) >> 5,
	            middle = header[byteIndex + 4] << 3,
	            highTwo = header[byteIndex + 3] & 0x3 << 11;
	        return highTwo | middle | lowThree;
	      };

	      var parseType = function parseType(header, byteIndex) {
	        if (header[byteIndex] === 'I'.charCodeAt(0) && header[byteIndex + 1] === 'D'.charCodeAt(0) && header[byteIndex + 2] === '3'.charCodeAt(0)) {
	          return 'timed-metadata';
	        } else if (header[byteIndex] & 0xff === 0xff && (header[byteIndex + 1] & 0xf0) === 0xf0) {
	          return 'audio';
	        }

	        return null;
	      };

	      var parseSampleRate = function parseSampleRate(packet) {
	        var i = 0;

	        while (i + 5 < packet.length) {
	          if (packet[i] !== 0xFF || (packet[i + 1] & 0xF6) !== 0xF0) {
	            // If a valid header was not found,  jump one forward and attempt to
	            // find a valid ADTS header starting at the next byte
	            i++;
	            continue;
	          }

	          return ADTS_SAMPLING_FREQUENCIES[(packet[i + 2] & 0x3c) >>> 2];
	        }

	        return null;
	      };

	      var parseAacTimestamp = function parseAacTimestamp(packet) {
	        var frameStart, frameSize, frame, frameHeader; // find the start of the first frame and the end of the tag

	        frameStart = 10;

	        if (packet[5] & 0x40) {
	          // advance the frame start past the extended header
	          frameStart += 4; // header size field

	          frameStart += parseSyncSafeInteger(packet.subarray(10, 14));
	        } // parse one or more ID3 frames
	        // http://id3.org/id3v2.3.0#ID3v2_frame_overview


	        do {
	          // determine the number of bytes in this frame
	          frameSize = parseSyncSafeInteger(packet.subarray(frameStart + 4, frameStart + 8));

	          if (frameSize < 1) {
	            return null;
	          }

	          frameHeader = String.fromCharCode(packet[frameStart], packet[frameStart + 1], packet[frameStart + 2], packet[frameStart + 3]);

	          if (frameHeader === 'PRIV') {
	            frame = packet.subarray(frameStart + 10, frameStart + frameSize + 10);

	            for (var i = 0; i < frame.byteLength; i++) {
	              if (frame[i] === 0) {
	                var owner = parseIso88591(frame, 0, i);

	                if (owner === 'com.apple.streaming.transportStreamTimestamp') {
	                  var d = frame.subarray(i + 1);
	                  var size = (d[3] & 0x01) << 30 | d[4] << 22 | d[5] << 14 | d[6] << 6 | d[7] >>> 2;
	                  size *= 4;
	                  size += d[7] & 0x03;
	                  return size;
	                }

	                break;
	              }
	            }
	          }

	          frameStart += 10; // advance past the frame header

	          frameStart += frameSize; // advance past the frame body
	        } while (frameStart < packet.byteLength);

	        return null;
	      };

	      module.exports = {
	        parseId3TagSize: parseId3TagSize,
	        parseAdtsSize: parseAdtsSize,
	        parseType: parseType,
	        parseSampleRate: parseSampleRate,
	        parseAacTimestamp: parseAacTimestamp
	      };
	    }, {}],
	    3: [function (require, module, exports) {

	      var Stream = require('../utils/stream.js');

	      var _AdtsStream;

	      var ADTS_SAMPLING_FREQUENCIES = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350];
	      /*
	       * Accepts a ElementaryStream and emits data events with parsed
	       * AAC Audio Frames of the individual packets. Input audio in ADTS
	       * format is unpacked and re-emitted as AAC frames.
	       *
	       * @see http://wiki.multimedia.cx/index.php?title=ADTS
	       * @see http://wiki.multimedia.cx/?title=Understanding_AAC
	       */

	      _AdtsStream = function AdtsStream() {
	        var buffer;

	        _AdtsStream.prototype.init.call(this);

	        this.push = function (packet) {
	          var i = 0,
	              frameNum = 0,
	              frameLength,
	              protectionSkipBytes,
	              frameEnd,
	              oldBuffer,
	              sampleCount,
	              adtsFrameDuration;

	          if (packet.type !== 'audio') {
	            // ignore non-audio data
	            return;
	          } // Prepend any data in the buffer to the input data so that we can parse
	          // aac frames the cross a PES packet boundary


	          if (buffer) {
	            oldBuffer = buffer;
	            buffer = new Uint8Array(oldBuffer.byteLength + packet.data.byteLength);
	            buffer.set(oldBuffer);
	            buffer.set(packet.data, oldBuffer.byteLength);
	          } else {
	            buffer = packet.data;
	          } // unpack any ADTS frames which have been fully received
	          // for details on the ADTS header, see http://wiki.multimedia.cx/index.php?title=ADTS


	          while (i + 5 < buffer.length) {
	            // Loook for the start of an ADTS header..
	            if (buffer[i] !== 0xFF || (buffer[i + 1] & 0xF6) !== 0xF0) {
	              // If a valid header was not found,  jump one forward and attempt to
	              // find a valid ADTS header starting at the next byte
	              i++;
	              continue;
	            } // The protection skip bit tells us if we have 2 bytes of CRC data at the
	            // end of the ADTS header


	            protectionSkipBytes = (~buffer[i + 1] & 0x01) * 2; // Frame length is a 13 bit integer starting 16 bits from the
	            // end of the sync sequence

	            frameLength = (buffer[i + 3] & 0x03) << 11 | buffer[i + 4] << 3 | (buffer[i + 5] & 0xe0) >> 5;
	            sampleCount = ((buffer[i + 6] & 0x03) + 1) * 1024;
	            adtsFrameDuration = sampleCount * 90000 / ADTS_SAMPLING_FREQUENCIES[(buffer[i + 2] & 0x3c) >>> 2];
	            frameEnd = i + frameLength; // If we don't have enough data to actually finish this ADTS frame, return
	            // and wait for more data

	            if (buffer.byteLength < frameEnd) {
	              return;
	            } // Otherwise, deliver the complete AAC frame


	            this.trigger('data', {
	              pts: packet.pts + frameNum * adtsFrameDuration,
	              dts: packet.dts + frameNum * adtsFrameDuration,
	              sampleCount: sampleCount,
	              audioobjecttype: (buffer[i + 2] >>> 6 & 0x03) + 1,
	              channelcount: (buffer[i + 2] & 1) << 2 | (buffer[i + 3] & 0xc0) >>> 6,
	              samplerate: ADTS_SAMPLING_FREQUENCIES[(buffer[i + 2] & 0x3c) >>> 2],
	              samplingfrequencyindex: (buffer[i + 2] & 0x3c) >>> 2,
	              // assume ISO/IEC 14496-12 AudioSampleEntry default of 16
	              samplesize: 16,
	              data: buffer.subarray(i + 7 + protectionSkipBytes, frameEnd)
	            }); // If the buffer is empty, clear it and return

	            if (buffer.byteLength === frameEnd) {
	              buffer = undefined;
	              return;
	            }

	            frameNum++; // Remove the finished frame from the buffer and start the process again

	            buffer = buffer.subarray(frameEnd);
	          }
	        };

	        this.flush = function () {
	          this.trigger('done');
	        };
	      };

	      _AdtsStream.prototype = new Stream();
	      module.exports = _AdtsStream;
	    }, {
	      "../utils/stream.js": 30
	    }],
	    4: [function (require, module, exports) {

	      var Stream = require('../utils/stream.js');

	      var ExpGolomb = require('../utils/exp-golomb.js');

	      var _H264Stream, _NalByteStream;

	      var PROFILES_WITH_OPTIONAL_SPS_DATA;
	      /**
	       * Accepts a NAL unit byte stream and unpacks the embedded NAL units.
	       */

	      _NalByteStream = function NalByteStream() {
	        var syncPoint = 0,
	            i,
	            buffer;

	        _NalByteStream.prototype.init.call(this);

	        this.push = function (data) {
	          var swapBuffer;

	          if (!buffer) {
	            buffer = data.data;
	          } else {
	            swapBuffer = new Uint8Array(buffer.byteLength + data.data.byteLength);
	            swapBuffer.set(buffer);
	            swapBuffer.set(data.data, buffer.byteLength);
	            buffer = swapBuffer;
	          } // Rec. ITU-T H.264, Annex B
	          // scan for NAL unit boundaries
	          // a match looks like this:
	          // 0 0 1 .. NAL .. 0 0 1
	          // ^ sync point        ^ i
	          // or this:
	          // 0 0 1 .. NAL .. 0 0 0
	          // ^ sync point        ^ i
	          // advance the sync point to a NAL start, if necessary


	          for (; syncPoint < buffer.byteLength - 3; syncPoint++) {
	            if (buffer[syncPoint + 2] === 1) {
	              // the sync point is properly aligned
	              i = syncPoint + 5;
	              break;
	            }
	          }

	          while (i < buffer.byteLength) {
	            // look at the current byte to determine if we've hit the end of
	            // a NAL unit boundary
	            switch (buffer[i]) {
	              case 0:
	                // skip past non-sync sequences
	                if (buffer[i - 1] !== 0) {
	                  i += 2;
	                  break;
	                } else if (buffer[i - 2] !== 0) {
	                  i++;
	                  break;
	                } // deliver the NAL unit if it isn't empty


	                if (syncPoint + 3 !== i - 2) {
	                  this.trigger('data', buffer.subarray(syncPoint + 3, i - 2));
	                } // drop trailing zeroes


	                do {
	                  i++;
	                } while (buffer[i] !== 1 && i < buffer.length);

	                syncPoint = i - 2;
	                i += 3;
	                break;

	              case 1:
	                // skip past non-sync sequences
	                if (buffer[i - 1] !== 0 || buffer[i - 2] !== 0) {
	                  i += 3;
	                  break;
	                } // deliver the NAL unit


	                this.trigger('data', buffer.subarray(syncPoint + 3, i - 2));
	                syncPoint = i - 2;
	                i += 3;
	                break;

	              default:
	                // the current byte isn't a one or zero, so it cannot be part
	                // of a sync sequence
	                i += 3;
	                break;
	            }
	          } // filter out the NAL units that were delivered


	          buffer = buffer.subarray(syncPoint);
	          i -= syncPoint;
	          syncPoint = 0;
	        };

	        this.flush = function () {
	          // deliver the last buffered NAL unit
	          if (buffer && buffer.byteLength > 3) {
	            this.trigger('data', buffer.subarray(syncPoint + 3));
	          } // reset the stream state


	          buffer = null;
	          syncPoint = 0;
	          this.trigger('done');
	        };
	      };

	      _NalByteStream.prototype = new Stream(); // values of profile_idc that indicate additional fields are included in the SPS
	      // see Recommendation ITU-T H.264 (4/2013),
	      // 7.3.2.1.1 Sequence parameter set data syntax

	      PROFILES_WITH_OPTIONAL_SPS_DATA = {
	        100: true,
	        110: true,
	        122: true,
	        244: true,
	        44: true,
	        83: true,
	        86: true,
	        118: true,
	        128: true,
	        138: true,
	        139: true,
	        134: true
	      };
	      /**
	       * Accepts input from a ElementaryStream and produces H.264 NAL unit data
	       * events.
	       */

	      _H264Stream = function H264Stream() {
	        var nalByteStream = new _NalByteStream(),
	            self,
	            trackId,
	            currentPts,
	            currentDts,
	            discardEmulationPreventionBytes,
	            readSequenceParameterSet,
	            skipScalingList;

	        _H264Stream.prototype.init.call(this);

	        self = this;

	        this.push = function (packet) {
	          if (packet.type !== 'video') {
	            return;
	          }

	          trackId = packet.trackId;
	          currentPts = packet.pts;
	          currentDts = packet.dts;
	          nalByteStream.push(packet);
	        };

	        nalByteStream.on('data', function (data) {
	          var event = {
	            trackId: trackId,
	            pts: currentPts,
	            dts: currentDts,
	            data: data
	          };

	          switch (data[0] & 0x1f) {
	            case 0x05:
	              event.nalUnitType = 'slice_layer_without_partitioning_rbsp_idr';
	              break;

	            case 0x06:
	              event.nalUnitType = 'sei_rbsp';
	              event.escapedRBSP = discardEmulationPreventionBytes(data.subarray(1));
	              break;

	            case 0x07:
	              event.nalUnitType = 'seq_parameter_set_rbsp';
	              event.escapedRBSP = discardEmulationPreventionBytes(data.subarray(1));
	              event.config = readSequenceParameterSet(event.escapedRBSP);
	              break;

	            case 0x08:
	              event.nalUnitType = 'pic_parameter_set_rbsp';
	              break;

	            case 0x09:
	              event.nalUnitType = 'access_unit_delimiter_rbsp';
	              break;

	            default:
	              break;
	          }

	          self.trigger('data', event);
	        });
	        nalByteStream.on('done', function () {
	          self.trigger('done');
	        });

	        this.flush = function () {
	          nalByteStream.flush();
	        };
	        /**
	         * Advance the ExpGolomb decoder past a scaling list. The scaling
	         * list is optionally transmitted as part of a sequence parameter
	         * set and is not relevant to transmuxing.
	         * @param count {number} the number of entries in this scaling list
	         * @param expGolombDecoder {object} an ExpGolomb pointed to the
	         * start of a scaling list
	         * @see Recommendation ITU-T H.264, Section 7.3.2.1.1.1
	         */


	        skipScalingList = function skipScalingList(count, expGolombDecoder) {
	          var lastScale = 8,
	              nextScale = 8,
	              j,
	              deltaScale;

	          for (j = 0; j < count; j++) {
	            if (nextScale !== 0) {
	              deltaScale = expGolombDecoder.readExpGolomb();
	              nextScale = (lastScale + deltaScale + 256) % 256;
	            }

	            lastScale = nextScale === 0 ? lastScale : nextScale;
	          }
	        };
	        /**
	         * Expunge any "Emulation Prevention" bytes from a "Raw Byte
	         * Sequence Payload"
	         * @param data {Uint8Array} the bytes of a RBSP from a NAL
	         * unit
	         * @return {Uint8Array} the RBSP without any Emulation
	         * Prevention Bytes
	         */


	        discardEmulationPreventionBytes = function discardEmulationPreventionBytes(data) {
	          var length = data.byteLength,
	              emulationPreventionBytesPositions = [],
	              i = 1,
	              newLength,
	              newData; // Find all `Emulation Prevention Bytes`

	          while (i < length - 2) {
	            if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0x03) {
	              emulationPreventionBytesPositions.push(i + 2);
	              i += 2;
	            } else {
	              i++;
	            }
	          } // If no Emulation Prevention Bytes were found just return the original
	          // array


	          if (emulationPreventionBytesPositions.length === 0) {
	            return data;
	          } // Create a new array to hold the NAL unit data


	          newLength = length - emulationPreventionBytesPositions.length;
	          newData = new Uint8Array(newLength);
	          var sourceIndex = 0;

	          for (i = 0; i < newLength; sourceIndex++, i++) {
	            if (sourceIndex === emulationPreventionBytesPositions[0]) {
	              // Skip this byte
	              sourceIndex++; // Remove this position index

	              emulationPreventionBytesPositions.shift();
	            }

	            newData[i] = data[sourceIndex];
	          }

	          return newData;
	        };
	        /**
	         * Read a sequence parameter set and return some interesting video
	         * properties. A sequence parameter set is the H264 metadata that
	         * describes the properties of upcoming video frames.
	         * @param data {Uint8Array} the bytes of a sequence parameter set
	         * @return {object} an object with configuration parsed from the
	         * sequence parameter set, including the dimensions of the
	         * associated video frames.
	         */


	        readSequenceParameterSet = function readSequenceParameterSet(data) {
	          var frameCropLeftOffset = 0,
	              frameCropRightOffset = 0,
	              frameCropTopOffset = 0,
	              frameCropBottomOffset = 0,
	              sarScale = 1,
	              expGolombDecoder,
	              profileIdc,
	              levelIdc,
	              profileCompatibility,
	              chromaFormatIdc,
	              picOrderCntType,
	              numRefFramesInPicOrderCntCycle,
	              picWidthInMbsMinus1,
	              picHeightInMapUnitsMinus1,
	              frameMbsOnlyFlag,
	              scalingListCount,
	              sarRatio,
	              aspectRatioIdc,
	              i;
	          expGolombDecoder = new ExpGolomb(data);
	          profileIdc = expGolombDecoder.readUnsignedByte(); // profile_idc

	          profileCompatibility = expGolombDecoder.readUnsignedByte(); // constraint_set[0-5]_flag

	          levelIdc = expGolombDecoder.readUnsignedByte(); // level_idc u(8)

	          expGolombDecoder.skipUnsignedExpGolomb(); // seq_parameter_set_id
	          // some profiles have more optional data we don't need

	          if (PROFILES_WITH_OPTIONAL_SPS_DATA[profileIdc]) {
	            chromaFormatIdc = expGolombDecoder.readUnsignedExpGolomb();

	            if (chromaFormatIdc === 3) {
	              expGolombDecoder.skipBits(1); // separate_colour_plane_flag
	            }

	            expGolombDecoder.skipUnsignedExpGolomb(); // bit_depth_luma_minus8

	            expGolombDecoder.skipUnsignedExpGolomb(); // bit_depth_chroma_minus8

	            expGolombDecoder.skipBits(1); // qpprime_y_zero_transform_bypass_flag

	            if (expGolombDecoder.readBoolean()) {
	              // seq_scaling_matrix_present_flag
	              scalingListCount = chromaFormatIdc !== 3 ? 8 : 12;

	              for (i = 0; i < scalingListCount; i++) {
	                if (expGolombDecoder.readBoolean()) {
	                  // seq_scaling_list_present_flag[ i ]
	                  if (i < 6) {
	                    skipScalingList(16, expGolombDecoder);
	                  } else {
	                    skipScalingList(64, expGolombDecoder);
	                  }
	                }
	              }
	            }
	          }

	          expGolombDecoder.skipUnsignedExpGolomb(); // log2_max_frame_num_minus4

	          picOrderCntType = expGolombDecoder.readUnsignedExpGolomb();

	          if (picOrderCntType === 0) {
	            expGolombDecoder.readUnsignedExpGolomb(); // log2_max_pic_order_cnt_lsb_minus4
	          } else if (picOrderCntType === 1) {
	            expGolombDecoder.skipBits(1); // delta_pic_order_always_zero_flag

	            expGolombDecoder.skipExpGolomb(); // offset_for_non_ref_pic

	            expGolombDecoder.skipExpGolomb(); // offset_for_top_to_bottom_field

	            numRefFramesInPicOrderCntCycle = expGolombDecoder.readUnsignedExpGolomb();

	            for (i = 0; i < numRefFramesInPicOrderCntCycle; i++) {
	              expGolombDecoder.skipExpGolomb(); // offset_for_ref_frame[ i ]
	            }
	          }

	          expGolombDecoder.skipUnsignedExpGolomb(); // max_num_ref_frames

	          expGolombDecoder.skipBits(1); // gaps_in_frame_num_value_allowed_flag

	          picWidthInMbsMinus1 = expGolombDecoder.readUnsignedExpGolomb();
	          picHeightInMapUnitsMinus1 = expGolombDecoder.readUnsignedExpGolomb();
	          frameMbsOnlyFlag = expGolombDecoder.readBits(1);

	          if (frameMbsOnlyFlag === 0) {
	            expGolombDecoder.skipBits(1); // mb_adaptive_frame_field_flag
	          }

	          expGolombDecoder.skipBits(1); // direct_8x8_inference_flag

	          if (expGolombDecoder.readBoolean()) {
	            // frame_cropping_flag
	            frameCropLeftOffset = expGolombDecoder.readUnsignedExpGolomb();
	            frameCropRightOffset = expGolombDecoder.readUnsignedExpGolomb();
	            frameCropTopOffset = expGolombDecoder.readUnsignedExpGolomb();
	            frameCropBottomOffset = expGolombDecoder.readUnsignedExpGolomb();
	          }

	          if (expGolombDecoder.readBoolean()) {
	            // vui_parameters_present_flag
	            if (expGolombDecoder.readBoolean()) {
	              // aspect_ratio_info_present_flag
	              aspectRatioIdc = expGolombDecoder.readUnsignedByte();

	              switch (aspectRatioIdc) {
	                case 1:
	                  sarRatio = [1, 1];
	                  break;

	                case 2:
	                  sarRatio = [12, 11];
	                  break;

	                case 3:
	                  sarRatio = [10, 11];
	                  break;

	                case 4:
	                  sarRatio = [16, 11];
	                  break;

	                case 5:
	                  sarRatio = [40, 33];
	                  break;

	                case 6:
	                  sarRatio = [24, 11];
	                  break;

	                case 7:
	                  sarRatio = [20, 11];
	                  break;

	                case 8:
	                  sarRatio = [32, 11];
	                  break;

	                case 9:
	                  sarRatio = [80, 33];
	                  break;

	                case 10:
	                  sarRatio = [18, 11];
	                  break;

	                case 11:
	                  sarRatio = [15, 11];
	                  break;

	                case 12:
	                  sarRatio = [64, 33];
	                  break;

	                case 13:
	                  sarRatio = [160, 99];
	                  break;

	                case 14:
	                  sarRatio = [4, 3];
	                  break;

	                case 15:
	                  sarRatio = [3, 2];
	                  break;

	                case 16:
	                  sarRatio = [2, 1];
	                  break;

	                case 255:
	                  {
	                    sarRatio = [expGolombDecoder.readUnsignedByte() << 8 | expGolombDecoder.readUnsignedByte(), expGolombDecoder.readUnsignedByte() << 8 | expGolombDecoder.readUnsignedByte()];
	                    break;
	                  }
	              }

	              if (sarRatio) {
	                sarScale = sarRatio[0] / sarRatio[1];
	              }
	            }
	          }

	          return {
	            profileIdc: profileIdc,
	            levelIdc: levelIdc,
	            profileCompatibility: profileCompatibility,
	            width: Math.ceil(((picWidthInMbsMinus1 + 1) * 16 - frameCropLeftOffset * 2 - frameCropRightOffset * 2) * sarScale),
	            height: (2 - frameMbsOnlyFlag) * (picHeightInMapUnitsMinus1 + 1) * 16 - frameCropTopOffset * 2 - frameCropBottomOffset * 2
	          };
	        };
	      };

	      _H264Stream.prototype = new Stream();
	      module.exports = {
	        H264Stream: _H264Stream,
	        NalByteStream: _NalByteStream
	      };
	    }, {
	      "../utils/exp-golomb.js": 29,
	      "../utils/stream.js": 30
	    }],
	    5: [function (require, module, exports) {
	      module.exports = {
	        adts: require('./adts'),
	        h264: require('./h264')
	      };
	    }, {
	      "./adts": 3,
	      "./h264": 4
	    }],
	    6: [function (require, module, exports) {
	      var highPrefix = [33, 16, 5, 32, 164, 27];
	      var lowPrefix = [33, 65, 108, 84, 1, 2, 4, 8, 168, 2, 4, 8, 17, 191, 252];

	      var zeroFill = function zeroFill(count) {
	        var a = [];

	        while (count--) {
	          a.push(0);
	        }

	        return a;
	      };

	      var makeTable = function makeTable(metaTable) {
	        return Object.keys(metaTable).reduce(function (obj, key) {
	          obj[key] = new Uint8Array(metaTable[key].reduce(function (arr, part) {
	            return arr.concat(part);
	          }, []));
	          return obj;
	        }, {});
	      }; // Frames-of-silence to use for filling in missing AAC frames


	      var coneOfSilence = {
	        96000: [highPrefix, [227, 64], zeroFill(154), [56]],
	        88200: [highPrefix, [231], zeroFill(170), [56]],
	        64000: [highPrefix, [248, 192], zeroFill(240), [56]],
	        48000: [highPrefix, [255, 192], zeroFill(268), [55, 148, 128], zeroFill(54), [112]],
	        44100: [highPrefix, [255, 192], zeroFill(268), [55, 163, 128], zeroFill(84), [112]],
	        32000: [highPrefix, [255, 192], zeroFill(268), [55, 234], zeroFill(226), [112]],
	        24000: [highPrefix, [255, 192], zeroFill(268), [55, 255, 128], zeroFill(268), [111, 112], zeroFill(126), [224]],
	        16000: [highPrefix, [255, 192], zeroFill(268), [55, 255, 128], zeroFill(268), [111, 255], zeroFill(269), [223, 108], zeroFill(195), [1, 192]],
	        12000: [lowPrefix, zeroFill(268), [3, 127, 248], zeroFill(268), [6, 255, 240], zeroFill(268), [13, 255, 224], zeroFill(268), [27, 253, 128], zeroFill(259), [56]],
	        11025: [lowPrefix, zeroFill(268), [3, 127, 248], zeroFill(268), [6, 255, 240], zeroFill(268), [13, 255, 224], zeroFill(268), [27, 255, 192], zeroFill(268), [55, 175, 128], zeroFill(108), [112]],
	        8000: [lowPrefix, zeroFill(268), [3, 121, 16], zeroFill(47), [7]]
	      };
	      module.exports = makeTable(coneOfSilence);
	    }, {}],
	    7: [function (require, module, exports) {

	      var Stream = require('../utils/stream.js');
	      /**
	       * The final stage of the transmuxer that emits the flv tags
	       * for audio, video, and metadata. Also tranlates in time and
	       * outputs caption data and id3 cues.
	       */


	      var CoalesceStream = function CoalesceStream(options) {
	        // Number of Tracks per output segment
	        // If greater than 1, we combine multiple
	        // tracks into a single segment
	        this.numberOfTracks = 0;
	        this.metadataStream = options.metadataStream;
	        this.videoTags = [];
	        this.audioTags = [];
	        this.videoTrack = null;
	        this.audioTrack = null;
	        this.pendingCaptions = [];
	        this.pendingMetadata = [];
	        this.pendingTracks = 0;
	        this.processedTracks = 0;
	        CoalesceStream.prototype.init.call(this); // Take output from multiple

	        this.push = function (output) {
	          // buffer incoming captions until the associated video segment
	          // finishes
	          if (output.text) {
	            return this.pendingCaptions.push(output);
	          } // buffer incoming id3 tags until the final flush


	          if (output.frames) {
	            return this.pendingMetadata.push(output);
	          }

	          if (output.track.type === 'video') {
	            this.videoTrack = output.track;
	            this.videoTags = output.tags;
	            this.pendingTracks++;
	          }

	          if (output.track.type === 'audio') {
	            this.audioTrack = output.track;
	            this.audioTags = output.tags;
	            this.pendingTracks++;
	          }
	        };
	      };

	      CoalesceStream.prototype = new Stream();

	      CoalesceStream.prototype.flush = function (flushSource) {
	        var id3,
	            caption,
	            i,
	            timelineStartPts,
	            event = {
	          tags: {},
	          captions: [],
	          captionStreams: {},
	          metadata: []
	        };

	        if (this.pendingTracks < this.numberOfTracks) {
	          if (flushSource !== 'VideoSegmentStream' && flushSource !== 'AudioSegmentStream') {
	            // Return because we haven't received a flush from a data-generating
	            // portion of the segment (meaning that we have only recieved meta-data
	            // or captions.)
	            return;
	          } else if (this.pendingTracks === 0) {
	            // In the case where we receive a flush without any data having been
	            // received we consider it an emitted track for the purposes of coalescing
	            // `done` events.
	            // We do this for the case where there is an audio and video track in the
	            // segment but no audio data. (seen in several playlists with alternate
	            // audio tracks and no audio present in the main TS segments.)
	            this.processedTracks++;

	            if (this.processedTracks < this.numberOfTracks) {
	              return;
	            }
	          }
	        }

	        this.processedTracks += this.pendingTracks;
	        this.pendingTracks = 0;

	        if (this.processedTracks < this.numberOfTracks) {
	          return;
	        }

	        if (this.videoTrack) {
	          timelineStartPts = this.videoTrack.timelineStartInfo.pts;
	        } else if (this.audioTrack) {
	          timelineStartPts = this.audioTrack.timelineStartInfo.pts;
	        }

	        event.tags.videoTags = this.videoTags;
	        event.tags.audioTags = this.audioTags; // Translate caption PTS times into second offsets into the
	        // video timeline for the segment, and add track info

	        for (i = 0; i < this.pendingCaptions.length; i++) {
	          caption = this.pendingCaptions[i];
	          caption.startTime = caption.startPts - timelineStartPts;
	          caption.startTime /= 90e3;
	          caption.endTime = caption.endPts - timelineStartPts;
	          caption.endTime /= 90e3;
	          event.captionStreams[caption.stream] = true;
	          event.captions.push(caption);
	        } // Translate ID3 frame PTS times into second offsets into the
	        // video timeline for the segment


	        for (i = 0; i < this.pendingMetadata.length; i++) {
	          id3 = this.pendingMetadata[i];
	          id3.cueTime = id3.pts - timelineStartPts;
	          id3.cueTime /= 90e3;
	          event.metadata.push(id3);
	        } // We add this to every single emitted segment even though we only need
	        // it for the first


	        event.metadata.dispatchType = this.metadataStream.dispatchType; // Reset stream state

	        this.videoTrack = null;
	        this.audioTrack = null;
	        this.videoTags = [];
	        this.audioTags = [];
	        this.pendingCaptions.length = 0;
	        this.pendingMetadata.length = 0;
	        this.pendingTracks = 0;
	        this.processedTracks = 0; // Emit the final segment

	        this.trigger('data', event);
	        this.trigger('done');
	      };

	      module.exports = CoalesceStream;
	    }, {
	      "../utils/stream.js": 30
	    }],
	    8: [function (require, module, exports) {

	      var FlvTag = require('./flv-tag.js'); // For information on the FLV format, see
	      // http://download.macromedia.com/f4v/video_file_format_spec_v10_1.pdf.
	      // Technically, this function returns the header and a metadata FLV tag
	      // if duration is greater than zero
	      // duration in seconds
	      // @return {object} the bytes of the FLV header as a Uint8Array


	      var getFlvHeader = function getFlvHeader(duration, audio, video) {
	        // :ByteArray {
	        var headBytes = new Uint8Array(3 + 1 + 1 + 4),
	            head = new DataView(headBytes.buffer),
	            metadata,
	            result,
	            metadataLength; // default arguments

	        duration = duration || 0;
	        audio = audio === undefined ? true : audio;
	        video = video === undefined ? true : video; // signature

	        head.setUint8(0, 0x46); // 'F'

	        head.setUint8(1, 0x4c); // 'L'

	        head.setUint8(2, 0x56); // 'V'
	        // version

	        head.setUint8(3, 0x01); // flags

	        head.setUint8(4, (audio ? 0x04 : 0x00) | (video ? 0x01 : 0x00)); // data offset, should be 9 for FLV v1

	        head.setUint32(5, headBytes.byteLength); // init the first FLV tag

	        if (duration <= 0) {
	          // no duration available so just write the first field of the first
	          // FLV tag
	          result = new Uint8Array(headBytes.byteLength + 4);
	          result.set(headBytes);
	          result.set([0, 0, 0, 0], headBytes.byteLength);
	          return result;
	        } // write out the duration metadata tag


	        metadata = new FlvTag(FlvTag.METADATA_TAG);
	        metadata.pts = metadata.dts = 0;
	        metadata.writeMetaDataDouble('duration', duration);
	        metadataLength = metadata.finalize().length;
	        result = new Uint8Array(headBytes.byteLength + metadataLength);
	        result.set(headBytes);
	        result.set(head.byteLength, metadataLength);
	        return result;
	      };

	      module.exports = getFlvHeader;
	    }, {
	      "./flv-tag.js": 9
	    }],
	    9: [function (require, module, exports) {

	      var _FlvTag; // (type:uint, extraData:Boolean = false) extends ByteArray


	      _FlvTag = function FlvTag(type, extraData) {
	        var // Counter if this is a metadata tag, nal start marker if this is a video
	        // tag. unused if this is an audio tag
	        adHoc = 0,
	            // :uint
	        // The default size is 16kb but this is not enough to hold iframe
	        // data and the resizing algorithm costs a bit so we create a larger
	        // starting buffer for video tags
	        bufferStartSize = 16384,
	            // checks whether the FLV tag has enough capacity to accept the proposed
	        // write and re-allocates the internal buffers if necessary
	        prepareWrite = function prepareWrite(flv, count) {
	          var bytes,
	              minLength = flv.position + count;

	          if (minLength < flv.bytes.byteLength) {
	            // there's enough capacity so do nothing
	            return;
	          } // allocate a new buffer and copy over the data that will not be modified


	          bytes = new Uint8Array(minLength * 2);
	          bytes.set(flv.bytes.subarray(0, flv.position), 0);
	          flv.bytes = bytes;
	          flv.view = new DataView(flv.bytes.buffer);
	        },
	            // commonly used metadata properties
	        widthBytes = _FlvTag.widthBytes || new Uint8Array('width'.length),
	            heightBytes = _FlvTag.heightBytes || new Uint8Array('height'.length),
	            videocodecidBytes = _FlvTag.videocodecidBytes || new Uint8Array('videocodecid'.length),
	            i;

	        if (!_FlvTag.widthBytes) {
	          // calculating the bytes of common metadata names ahead of time makes the
	          // corresponding writes faster because we don't have to loop over the
	          // characters
	          // re-test with test/perf.html if you're planning on changing this
	          for (i = 0; i < 'width'.length; i++) {
	            widthBytes[i] = 'width'.charCodeAt(i);
	          }

	          for (i = 0; i < 'height'.length; i++) {
	            heightBytes[i] = 'height'.charCodeAt(i);
	          }

	          for (i = 0; i < 'videocodecid'.length; i++) {
	            videocodecidBytes[i] = 'videocodecid'.charCodeAt(i);
	          }

	          _FlvTag.widthBytes = widthBytes;
	          _FlvTag.heightBytes = heightBytes;
	          _FlvTag.videocodecidBytes = videocodecidBytes;
	        }

	        this.keyFrame = false; // :Boolean

	        switch (type) {
	          case _FlvTag.VIDEO_TAG:
	            this.length = 16; // Start the buffer at 256k

	            bufferStartSize *= 6;
	            break;

	          case _FlvTag.AUDIO_TAG:
	            this.length = 13;
	            this.keyFrame = true;
	            break;

	          case _FlvTag.METADATA_TAG:
	            this.length = 29;
	            this.keyFrame = true;
	            break;

	          default:
	            throw new Error('Unknown FLV tag type');
	        }

	        this.bytes = new Uint8Array(bufferStartSize);
	        this.view = new DataView(this.bytes.buffer);
	        this.bytes[0] = type;
	        this.position = this.length;
	        this.keyFrame = extraData; // Defaults to false
	        // presentation timestamp

	        this.pts = 0; // decoder timestamp

	        this.dts = 0; // ByteArray#writeBytes(bytes:ByteArray, offset:uint = 0, length:uint = 0)

	        this.writeBytes = function (bytes, offset, length) {
	          var start = offset || 0,
	              end;
	          length = length || bytes.byteLength;
	          end = start + length;
	          prepareWrite(this, length);
	          this.bytes.set(bytes.subarray(start, end), this.position);
	          this.position += length;
	          this.length = Math.max(this.length, this.position);
	        }; // ByteArray#writeByte(value:int):void


	        this.writeByte = function (byte) {
	          prepareWrite(this, 1);
	          this.bytes[this.position] = byte;
	          this.position++;
	          this.length = Math.max(this.length, this.position);
	        }; // ByteArray#writeShort(value:int):void


	        this.writeShort = function (short) {
	          prepareWrite(this, 2);
	          this.view.setUint16(this.position, short);
	          this.position += 2;
	          this.length = Math.max(this.length, this.position);
	        }; // Negative index into array
	        // (pos:uint):int


	        this.negIndex = function (pos) {
	          return this.bytes[this.length - pos];
	        }; // The functions below ONLY work when this[0] == VIDEO_TAG.
	        // We are not going to check for that because we dont want the overhead
	        // (nal:ByteArray = null):int


	        this.nalUnitSize = function () {
	          if (adHoc === 0) {
	            return 0;
	          }

	          return this.length - (adHoc + 4);
	        };

	        this.startNalUnit = function () {
	          // remember position and add 4 bytes
	          if (adHoc > 0) {
	            throw new Error('Attempted to create new NAL wihout closing the old one');
	          } // reserve 4 bytes for nal unit size


	          adHoc = this.length;
	          this.length += 4;
	          this.position = this.length;
	        }; // (nal:ByteArray = null):void


	        this.endNalUnit = function (nalContainer) {
	          var nalStart, // :uint
	          nalLength; // :uint
	          // Rewind to the marker and write the size

	          if (this.length === adHoc + 4) {
	            // we started a nal unit, but didnt write one, so roll back the 4 byte size value
	            this.length -= 4;
	          } else if (adHoc > 0) {
	            nalStart = adHoc + 4;
	            nalLength = this.length - nalStart;
	            this.position = adHoc;
	            this.view.setUint32(this.position, nalLength);
	            this.position = this.length;

	            if (nalContainer) {
	              // Add the tag to the NAL unit
	              nalContainer.push(this.bytes.subarray(nalStart, nalStart + nalLength));
	            }
	          }

	          adHoc = 0;
	        };
	        /**
	         * Write out a 64-bit floating point valued metadata property. This method is
	         * called frequently during a typical parse and needs to be fast.
	         */
	        // (key:String, val:Number):void


	        this.writeMetaDataDouble = function (key, val) {
	          var i;
	          prepareWrite(this, 2 + key.length + 9); // write size of property name

	          this.view.setUint16(this.position, key.length);
	          this.position += 2; // this next part looks terrible but it improves parser throughput by
	          // 10kB/s in my testing
	          // write property name

	          if (key === 'width') {
	            this.bytes.set(widthBytes, this.position);
	            this.position += 5;
	          } else if (key === 'height') {
	            this.bytes.set(heightBytes, this.position);
	            this.position += 6;
	          } else if (key === 'videocodecid') {
	            this.bytes.set(videocodecidBytes, this.position);
	            this.position += 12;
	          } else {
	            for (i = 0; i < key.length; i++) {
	              this.bytes[this.position] = key.charCodeAt(i);
	              this.position++;
	            }
	          } // skip null byte


	          this.position++; // write property value

	          this.view.setFloat64(this.position, val);
	          this.position += 8; // update flv tag length

	          this.length = Math.max(this.length, this.position);
	          ++adHoc;
	        }; // (key:String, val:Boolean):void


	        this.writeMetaDataBoolean = function (key, val) {
	          var i;
	          prepareWrite(this, 2);
	          this.view.setUint16(this.position, key.length);
	          this.position += 2;

	          for (i = 0; i < key.length; i++) {
	            // if key.charCodeAt(i) >= 255, handle error
	            prepareWrite(this, 1);
	            this.bytes[this.position] = key.charCodeAt(i);
	            this.position++;
	          }

	          prepareWrite(this, 2);
	          this.view.setUint8(this.position, 0x01);
	          this.position++;
	          this.view.setUint8(this.position, val ? 0x01 : 0x00);
	          this.position++;
	          this.length = Math.max(this.length, this.position);
	          ++adHoc;
	        }; // ():ByteArray


	        this.finalize = function () {
	          var dtsDelta, // :int
	          len; // :int

	          switch (this.bytes[0]) {
	            // Video Data
	            case _FlvTag.VIDEO_TAG:
	              // We only support AVC, 1 = key frame (for AVC, a seekable
	              // frame), 2 = inter frame (for AVC, a non-seekable frame)
	              this.bytes[11] = (this.keyFrame || extraData ? 0x10 : 0x20) | 0x07;
	              this.bytes[12] = extraData ? 0x00 : 0x01;
	              dtsDelta = this.pts - this.dts;
	              this.bytes[13] = (dtsDelta & 0x00FF0000) >>> 16;
	              this.bytes[14] = (dtsDelta & 0x0000FF00) >>> 8;
	              this.bytes[15] = (dtsDelta & 0x000000FF) >>> 0;
	              break;

	            case _FlvTag.AUDIO_TAG:
	              this.bytes[11] = 0xAF; // 44 kHz, 16-bit stereo

	              this.bytes[12] = extraData ? 0x00 : 0x01;
	              break;

	            case _FlvTag.METADATA_TAG:
	              this.position = 11;
	              this.view.setUint8(this.position, 0x02); // String type

	              this.position++;
	              this.view.setUint16(this.position, 0x0A); // 10 Bytes

	              this.position += 2; // set "onMetaData"

	              this.bytes.set([0x6f, 0x6e, 0x4d, 0x65, 0x74, 0x61, 0x44, 0x61, 0x74, 0x61], this.position);
	              this.position += 10;
	              this.bytes[this.position] = 0x08; // Array type

	              this.position++;
	              this.view.setUint32(this.position, adHoc);
	              this.position = this.length;
	              this.bytes.set([0, 0, 9], this.position);
	              this.position += 3; // End Data Tag

	              this.length = this.position;
	              break;
	          }

	          len = this.length - 11; // write the DataSize field

	          this.bytes[1] = (len & 0x00FF0000) >>> 16;
	          this.bytes[2] = (len & 0x0000FF00) >>> 8;
	          this.bytes[3] = (len & 0x000000FF) >>> 0; // write the Timestamp

	          this.bytes[4] = (this.dts & 0x00FF0000) >>> 16;
	          this.bytes[5] = (this.dts & 0x0000FF00) >>> 8;
	          this.bytes[6] = (this.dts & 0x000000FF) >>> 0;
	          this.bytes[7] = (this.dts & 0xFF000000) >>> 24; // write the StreamID

	          this.bytes[8] = 0;
	          this.bytes[9] = 0;
	          this.bytes[10] = 0; // Sometimes we're at the end of the view and have one slot to write a
	          // uint32, so, prepareWrite of count 4, since, view is uint8

	          prepareWrite(this, 4);
	          this.view.setUint32(this.length, this.length);
	          this.length += 4;
	          this.position += 4; // trim down the byte buffer to what is actually being used

	          this.bytes = this.bytes.subarray(0, this.length);
	          this.frameTime = _FlvTag.frameTime(this.bytes); // if bytes.bytelength isn't equal to this.length, handle error

	          return this;
	        };
	      };

	      _FlvTag.AUDIO_TAG = 0x08; // == 8, :uint

	      _FlvTag.VIDEO_TAG = 0x09; // == 9, :uint

	      _FlvTag.METADATA_TAG = 0x12; // == 18, :uint
	      // (tag:ByteArray):Boolean {

	      _FlvTag.isAudioFrame = function (tag) {
	        return _FlvTag.AUDIO_TAG === tag[0];
	      }; // (tag:ByteArray):Boolean {


	      _FlvTag.isVideoFrame = function (tag) {
	        return _FlvTag.VIDEO_TAG === tag[0];
	      }; // (tag:ByteArray):Boolean {


	      _FlvTag.isMetaData = function (tag) {
	        return _FlvTag.METADATA_TAG === tag[0];
	      }; // (tag:ByteArray):Boolean {


	      _FlvTag.isKeyFrame = function (tag) {
	        if (_FlvTag.isVideoFrame(tag)) {
	          return tag[11] === 0x17;
	        }

	        if (_FlvTag.isAudioFrame(tag)) {
	          return true;
	        }

	        if (_FlvTag.isMetaData(tag)) {
	          return true;
	        }

	        return false;
	      }; // (tag:ByteArray):uint {


	      _FlvTag.frameTime = function (tag) {
	        var pts = tag[4] << 16; // :uint

	        pts |= tag[5] << 8;
	        pts |= tag[6] << 0;
	        pts |= tag[7] << 24;
	        return pts;
	      };

	      module.exports = _FlvTag;
	    }, {}],
	    10: [function (require, module, exports) {
	      module.exports = {
	        tag: require('./flv-tag'),
	        Transmuxer: require('./transmuxer'),
	        getFlvHeader: require('./flv-header')
	      };
	    }, {
	      "./flv-header": 8,
	      "./flv-tag": 9,
	      "./transmuxer": 12
	    }],
	    11: [function (require, module, exports) {

	      var TagList = function TagList() {
	        var self = this;
	        this.list = [];

	        this.push = function (tag) {
	          this.list.push({
	            bytes: tag.bytes,
	            dts: tag.dts,
	            pts: tag.pts,
	            keyFrame: tag.keyFrame,
	            metaDataTag: tag.metaDataTag
	          });
	        };

	        Object.defineProperty(this, 'length', {
	          get: function get() {
	            return self.list.length;
	          }
	        });
	      };

	      module.exports = TagList;
	    }, {}],
	    12: [function (require, module, exports) {

	      var Stream = require('../utils/stream.js');

	      var FlvTag = require('./flv-tag.js');

	      var m2ts = require('../m2ts/m2ts.js');

	      var AdtsStream = require('../codecs/adts.js');

	      var H264Stream = require('../codecs/h264').H264Stream;

	      var CoalesceStream = require('./coalesce-stream.js');

	      var TagList = require('./tag-list.js');

	      var _Transmuxer, _VideoSegmentStream, _AudioSegmentStream, collectTimelineInfo, metaDataTag, extraDataTag;
	      /**
	       * Store information about the start and end of the tracka and the
	       * duration for each frame/sample we process in order to calculate
	       * the baseMediaDecodeTime
	       */


	      collectTimelineInfo = function collectTimelineInfo(track, data) {
	        if (typeof data.pts === 'number') {
	          if (track.timelineStartInfo.pts === undefined) {
	            track.timelineStartInfo.pts = data.pts;
	          } else {
	            track.timelineStartInfo.pts = Math.min(track.timelineStartInfo.pts, data.pts);
	          }
	        }

	        if (typeof data.dts === 'number') {
	          if (track.timelineStartInfo.dts === undefined) {
	            track.timelineStartInfo.dts = data.dts;
	          } else {
	            track.timelineStartInfo.dts = Math.min(track.timelineStartInfo.dts, data.dts);
	          }
	        }
	      };

	      metaDataTag = function metaDataTag(track, pts) {
	        var tag = new FlvTag(FlvTag.METADATA_TAG); // :FlvTag

	        tag.dts = pts;
	        tag.pts = pts;
	        tag.writeMetaDataDouble('videocodecid', 7);
	        tag.writeMetaDataDouble('width', track.width);
	        tag.writeMetaDataDouble('height', track.height);
	        return tag;
	      };

	      extraDataTag = function extraDataTag(track, pts) {
	        var i,
	            tag = new FlvTag(FlvTag.VIDEO_TAG, true);
	        tag.dts = pts;
	        tag.pts = pts;
	        tag.writeByte(0x01); // version

	        tag.writeByte(track.profileIdc); // profile

	        tag.writeByte(track.profileCompatibility); // compatibility

	        tag.writeByte(track.levelIdc); // level

	        tag.writeByte(0xFC | 0x03); // reserved (6 bits), NULA length size - 1 (2 bits)

	        tag.writeByte(0xE0 | 0x01); // reserved (3 bits), num of SPS (5 bits)

	        tag.writeShort(track.sps[0].length); // data of SPS

	        tag.writeBytes(track.sps[0]); // SPS

	        tag.writeByte(track.pps.length); // num of PPS (will there ever be more that 1 PPS?)

	        for (i = 0; i < track.pps.length; ++i) {
	          tag.writeShort(track.pps[i].length); // 2 bytes for length of PPS

	          tag.writeBytes(track.pps[i]); // data of PPS
	        }

	        return tag;
	      };
	      /**
	       * Constructs a single-track, media segment from AAC data
	       * events. The output of this stream can be fed to flash.
	       */


	      _AudioSegmentStream = function AudioSegmentStream(track) {
	        var adtsFrames = [],
	            videoKeyFrames = [],
	            oldExtraData;

	        _AudioSegmentStream.prototype.init.call(this);

	        this.push = function (data) {
	          collectTimelineInfo(track, data);

	          if (track) {
	            track.audioobjecttype = data.audioobjecttype;
	            track.channelcount = data.channelcount;
	            track.samplerate = data.samplerate;
	            track.samplingfrequencyindex = data.samplingfrequencyindex;
	            track.samplesize = data.samplesize;
	            track.extraData = track.audioobjecttype << 11 | track.samplingfrequencyindex << 7 | track.channelcount << 3;
	          }

	          data.pts = Math.round(data.pts / 90);
	          data.dts = Math.round(data.dts / 90); // buffer audio data until end() is called

	          adtsFrames.push(data);
	        };

	        this.flush = function () {
	          var currentFrame,
	              adtsFrame,
	              lastMetaPts,
	              tags = new TagList(); // return early if no audio data has been observed

	          if (adtsFrames.length === 0) {
	            this.trigger('done', 'AudioSegmentStream');
	            return;
	          }

	          lastMetaPts = -Infinity;

	          while (adtsFrames.length) {
	            currentFrame = adtsFrames.shift(); // write out a metadata frame at every video key frame

	            if (videoKeyFrames.length && currentFrame.pts >= videoKeyFrames[0]) {
	              lastMetaPts = videoKeyFrames.shift();
	              this.writeMetaDataTags(tags, lastMetaPts);
	            } // also write out metadata tags every 1 second so that the decoder
	            // is re-initialized quickly after seeking into a different
	            // audio configuration.


	            if (track.extraData !== oldExtraData || currentFrame.pts - lastMetaPts >= 1000) {
	              this.writeMetaDataTags(tags, currentFrame.pts);
	              oldExtraData = track.extraData;
	              lastMetaPts = currentFrame.pts;
	            }

	            adtsFrame = new FlvTag(FlvTag.AUDIO_TAG);
	            adtsFrame.pts = currentFrame.pts;
	            adtsFrame.dts = currentFrame.dts;
	            adtsFrame.writeBytes(currentFrame.data);
	            tags.push(adtsFrame.finalize());
	          }

	          videoKeyFrames.length = 0;
	          oldExtraData = null;
	          this.trigger('data', {
	            track: track,
	            tags: tags.list
	          });
	          this.trigger('done', 'AudioSegmentStream');
	        };

	        this.writeMetaDataTags = function (tags, pts) {
	          var adtsFrame;
	          adtsFrame = new FlvTag(FlvTag.METADATA_TAG); // For audio, DTS is always the same as PTS. We want to set the DTS
	          // however so we can compare with video DTS to determine approximate
	          // packet order

	          adtsFrame.pts = pts;
	          adtsFrame.dts = pts; // AAC is always 10

	          adtsFrame.writeMetaDataDouble('audiocodecid', 10);
	          adtsFrame.writeMetaDataBoolean('stereo', track.channelcount === 2);
	          adtsFrame.writeMetaDataDouble('audiosamplerate', track.samplerate); // Is AAC always 16 bit?

	          adtsFrame.writeMetaDataDouble('audiosamplesize', 16);
	          tags.push(adtsFrame.finalize());
	          adtsFrame = new FlvTag(FlvTag.AUDIO_TAG, true); // For audio, DTS is always the same as PTS. We want to set the DTS
	          // however so we can compare with video DTS to determine approximate
	          // packet order

	          adtsFrame.pts = pts;
	          adtsFrame.dts = pts;
	          adtsFrame.view.setUint16(adtsFrame.position, track.extraData);
	          adtsFrame.position += 2;
	          adtsFrame.length = Math.max(adtsFrame.length, adtsFrame.position);
	          tags.push(adtsFrame.finalize());
	        };

	        this.onVideoKeyFrame = function (pts) {
	          videoKeyFrames.push(pts);
	        };
	      };

	      _AudioSegmentStream.prototype = new Stream();
	      /**
	       * Store FlvTags for the h264 stream
	       * @param track {object} track metadata configuration
	       */

	      _VideoSegmentStream = function VideoSegmentStream(track) {
	        var nalUnits = [],
	            config,
	            h264Frame;

	        _VideoSegmentStream.prototype.init.call(this);

	        this.finishFrame = function (tags, frame) {
	          if (!frame) {
	            return;
	          } // Check if keyframe and the length of tags.
	          // This makes sure we write metadata on the first frame of a segment.


	          if (config && track && track.newMetadata && (frame.keyFrame || tags.length === 0)) {
	            // Push extra data on every IDR frame in case we did a stream change + seek
	            var metaTag = metaDataTag(config, frame.dts).finalize();
	            var extraTag = extraDataTag(track, frame.dts).finalize();
	            metaTag.metaDataTag = extraTag.metaDataTag = true;
	            tags.push(metaTag);
	            tags.push(extraTag);
	            track.newMetadata = false;
	            this.trigger('keyframe', frame.dts);
	          }

	          frame.endNalUnit();
	          tags.push(frame.finalize());
	          h264Frame = null;
	        };

	        this.push = function (data) {
	          collectTimelineInfo(track, data);
	          data.pts = Math.round(data.pts / 90);
	          data.dts = Math.round(data.dts / 90); // buffer video until flush() is called

	          nalUnits.push(data);
	        };

	        this.flush = function () {
	          var currentNal,
	              tags = new TagList(); // Throw away nalUnits at the start of the byte stream until we find
	          // the first AUD

	          while (nalUnits.length) {
	            if (nalUnits[0].nalUnitType === 'access_unit_delimiter_rbsp') {
	              break;
	            }

	            nalUnits.shift();
	          } // return early if no video data has been observed


	          if (nalUnits.length === 0) {
	            this.trigger('done', 'VideoSegmentStream');
	            return;
	          }

	          while (nalUnits.length) {
	            currentNal = nalUnits.shift(); // record the track config

	            if (currentNal.nalUnitType === 'seq_parameter_set_rbsp') {
	              track.newMetadata = true;
	              config = currentNal.config;
	              track.width = config.width;
	              track.height = config.height;
	              track.sps = [currentNal.data];
	              track.profileIdc = config.profileIdc;
	              track.levelIdc = config.levelIdc;
	              track.profileCompatibility = config.profileCompatibility;
	              h264Frame.endNalUnit();
	            } else if (currentNal.nalUnitType === 'pic_parameter_set_rbsp') {
	              track.newMetadata = true;
	              track.pps = [currentNal.data];
	              h264Frame.endNalUnit();
	            } else if (currentNal.nalUnitType === 'access_unit_delimiter_rbsp') {
	              if (h264Frame) {
	                this.finishFrame(tags, h264Frame);
	              }

	              h264Frame = new FlvTag(FlvTag.VIDEO_TAG);
	              h264Frame.pts = currentNal.pts;
	              h264Frame.dts = currentNal.dts;
	            } else {
	              if (currentNal.nalUnitType === 'slice_layer_without_partitioning_rbsp_idr') {
	                // the current sample is a key frame
	                h264Frame.keyFrame = true;
	              }

	              h264Frame.endNalUnit();
	            }

	            h264Frame.startNalUnit();
	            h264Frame.writeBytes(currentNal.data);
	          }

	          if (h264Frame) {
	            this.finishFrame(tags, h264Frame);
	          }

	          this.trigger('data', {
	            track: track,
	            tags: tags.list
	          }); // Continue with the flush process now

	          this.trigger('done', 'VideoSegmentStream');
	        };
	      };

	      _VideoSegmentStream.prototype = new Stream();
	      /**
	       * An object that incrementally transmuxes MPEG2 Trasport Stream
	       * chunks into an FLV.
	       */

	      _Transmuxer = function Transmuxer(options) {
	        var self = this,
	            packetStream,
	            parseStream,
	            elementaryStream,
	            videoTimestampRolloverStream,
	            audioTimestampRolloverStream,
	            timedMetadataTimestampRolloverStream,
	            adtsStream,
	            h264Stream,
	            videoSegmentStream,
	            audioSegmentStream,
	            captionStream,
	            coalesceStream;

	        _Transmuxer.prototype.init.call(this);

	        options = options || {}; // expose the metadata stream

	        this.metadataStream = new m2ts.MetadataStream();
	        options.metadataStream = this.metadataStream; // set up the parsing pipeline

	        packetStream = new m2ts.TransportPacketStream();
	        parseStream = new m2ts.TransportParseStream();
	        elementaryStream = new m2ts.ElementaryStream();
	        videoTimestampRolloverStream = new m2ts.TimestampRolloverStream('video');
	        audioTimestampRolloverStream = new m2ts.TimestampRolloverStream('audio');
	        timedMetadataTimestampRolloverStream = new m2ts.TimestampRolloverStream('timed-metadata');
	        adtsStream = new AdtsStream();
	        h264Stream = new H264Stream();
	        coalesceStream = new CoalesceStream(options); // disassemble MPEG2-TS packets into elementary streams

	        packetStream.pipe(parseStream).pipe(elementaryStream); // !!THIS ORDER IS IMPORTANT!!
	        // demux the streams

	        elementaryStream.pipe(videoTimestampRolloverStream).pipe(h264Stream);
	        elementaryStream.pipe(audioTimestampRolloverStream).pipe(adtsStream);
	        elementaryStream.pipe(timedMetadataTimestampRolloverStream).pipe(this.metadataStream).pipe(coalesceStream); // if CEA-708 parsing is available, hook up a caption stream

	        captionStream = new m2ts.CaptionStream();
	        h264Stream.pipe(captionStream).pipe(coalesceStream); // hook up the segment streams once track metadata is delivered

	        elementaryStream.on('data', function (data) {
	          var i, videoTrack, audioTrack;

	          if (data.type === 'metadata') {
	            i = data.tracks.length; // scan the tracks listed in the metadata

	            while (i--) {
	              if (data.tracks[i].type === 'video') {
	                videoTrack = data.tracks[i];
	              } else if (data.tracks[i].type === 'audio') {
	                audioTrack = data.tracks[i];
	              }
	            } // hook up the video segment stream to the first track with h264 data


	            if (videoTrack && !videoSegmentStream) {
	              coalesceStream.numberOfTracks++;
	              videoSegmentStream = new _VideoSegmentStream(videoTrack); // Set up the final part of the video pipeline

	              h264Stream.pipe(videoSegmentStream).pipe(coalesceStream);
	            }

	            if (audioTrack && !audioSegmentStream) {
	              // hook up the audio segment stream to the first track with aac data
	              coalesceStream.numberOfTracks++;
	              audioSegmentStream = new _AudioSegmentStream(audioTrack); // Set up the final part of the audio pipeline

	              adtsStream.pipe(audioSegmentStream).pipe(coalesceStream);

	              if (videoSegmentStream) {
	                videoSegmentStream.on('keyframe', audioSegmentStream.onVideoKeyFrame);
	              }
	            }
	          }
	        }); // feed incoming data to the front of the parsing pipeline

	        this.push = function (data) {
	          packetStream.push(data);
	        }; // flush any buffered data


	        this.flush = function () {
	          // Start at the top of the pipeline and flush all pending work
	          packetStream.flush();
	        }; // Caption data has to be reset when seeking outside buffered range


	        this.resetCaptions = function () {
	          captionStream.reset();
	        }; // Re-emit any data coming from the coalesce stream to the outside world


	        coalesceStream.on('data', function (event) {
	          self.trigger('data', event);
	        }); // Let the consumer know we have finished flushing the entire pipeline

	        coalesceStream.on('done', function () {
	          self.trigger('done');
	        });
	      };

	      _Transmuxer.prototype = new Stream(); // forward compatibility

	      module.exports = _Transmuxer;
	    }, {
	      "../codecs/adts.js": 3,
	      "../codecs/h264": 4,
	      "../m2ts/m2ts.js": 16,
	      "../utils/stream.js": 30,
	      "./coalesce-stream.js": 7,
	      "./flv-tag.js": 9,
	      "./tag-list.js": 11
	    }],
	    13: [function (require, module, exports) {

	      var muxjs = {
	        codecs: require('./codecs'),
	        mp4: require('./mp4'),
	        flv: require('./flv'),
	        mp2t: require('./m2ts')
	      }; // include all the tools when the full library is required

	      muxjs.mp4.tools = require('./tools/mp4-inspector');
	      muxjs.flv.tools = require('./tools/flv-inspector');
	      muxjs.mp2t.tools = require('./tools/ts-inspector');
	      module.exports = muxjs;
	    }, {
	      "./codecs": 5,
	      "./flv": 10,
	      "./m2ts": 15,
	      "./mp4": 21,
	      "./tools/flv-inspector": 25,
	      "./tools/mp4-inspector": 26,
	      "./tools/ts-inspector": 27
	    }],
	    14: [function (require, module, exports) {
	      // Link To Transport
	      // -----------------
	      // Supplemental enhancement information (SEI) NAL units have a
	      // payload type field to indicate how they are to be
	      // interpreted. CEAS-708 caption content is always transmitted with
	      // payload type 0x04.

	      var USER_DATA_REGISTERED_ITU_T_T35 = 4,
	          RBSP_TRAILING_BITS = 128,
	          Stream = require('../utils/stream');
	      /**
	        * Parse a supplemental enhancement information (SEI) NAL unit.
	        * Stops parsing once a message of type ITU T T35 has been found.
	        *
	        * @param bytes {Uint8Array} the bytes of a SEI NAL unit
	        * @return {object} the parsed SEI payload
	        * @see Rec. ITU-T H.264, 7.3.2.3.1
	        */


	      var parseSei = function parseSei(bytes) {
	        var i = 0,
	            result = {
	          payloadType: -1,
	          payloadSize: 0
	        },
	            payloadType = 0,
	            payloadSize = 0; // go through the sei_rbsp parsing each each individual sei_message

	        while (i < bytes.byteLength) {
	          // stop once we have hit the end of the sei_rbsp
	          if (bytes[i] === RBSP_TRAILING_BITS) {
	            break;
	          } // Parse payload type


	          while (bytes[i] === 0xFF) {
	            payloadType += 255;
	            i++;
	          }

	          payloadType += bytes[i++]; // Parse payload size

	          while (bytes[i] === 0xFF) {
	            payloadSize += 255;
	            i++;
	          }

	          payloadSize += bytes[i++]; // this sei_message is a 608/708 caption so save it and break
	          // there can only ever be one caption message in a frame's sei

	          if (!result.payload && payloadType === USER_DATA_REGISTERED_ITU_T_T35) {
	            result.payloadType = payloadType;
	            result.payloadSize = payloadSize;
	            result.payload = bytes.subarray(i, i + payloadSize);
	            break;
	          } // skip the payload and parse the next message


	          i += payloadSize;
	          payloadType = 0;
	          payloadSize = 0;
	        }

	        return result;
	      }; // see ANSI/SCTE 128-1 (2013), section 8.1


	      var parseUserData = function parseUserData(sei) {
	        // itu_t_t35_contry_code must be 181 (United States) for
	        // captions
	        if (sei.payload[0] !== 181) {
	          return null;
	        } // itu_t_t35_provider_code should be 49 (ATSC) for captions


	        if ((sei.payload[1] << 8 | sei.payload[2]) !== 49) {
	          return null;
	        } // the user_identifier should be "GA94" to indicate ATSC1 data


	        if (String.fromCharCode(sei.payload[3], sei.payload[4], sei.payload[5], sei.payload[6]) !== 'GA94') {
	          return null;
	        } // finally, user_data_type_code should be 0x03 for caption data


	        if (sei.payload[7] !== 0x03) {
	          return null;
	        } // return the user_data_type_structure and strip the trailing
	        // marker bits


	        return sei.payload.subarray(8, sei.payload.length - 1);
	      }; // see CEA-708-D, section 4.4


	      var parseCaptionPackets = function parseCaptionPackets(pts, userData) {
	        var results = [],
	            i,
	            count,
	            offset,
	            data; // if this is just filler, return immediately

	        if (!(userData[0] & 0x40)) {
	          return results;
	        } // parse out the cc_data_1 and cc_data_2 fields


	        count = userData[0] & 0x1f;

	        for (i = 0; i < count; i++) {
	          offset = i * 3;
	          data = {
	            type: userData[offset + 2] & 0x03,
	            pts: pts
	          }; // capture cc data when cc_valid is 1

	          if (userData[offset + 2] & 0x04) {
	            data.ccData = userData[offset + 3] << 8 | userData[offset + 4];
	            results.push(data);
	          }
	        }

	        return results;
	      };

	      var CaptionStream = function CaptionStream() {
	        CaptionStream.prototype.init.call(this);
	        this.captionPackets_ = [];
	        this.ccStreams_ = [new Cea608Stream(0, 0), // eslint-disable-line no-use-before-define
	        new Cea608Stream(0, 1), // eslint-disable-line no-use-before-define
	        new Cea608Stream(1, 0), // eslint-disable-line no-use-before-define
	        new Cea608Stream(1, 1) // eslint-disable-line no-use-before-define
	        ];
	        this.reset(); // forward data and done events from CCs to this CaptionStream

	        this.ccStreams_.forEach(function (cc) {
	          cc.on('data', this.trigger.bind(this, 'data'));
	          cc.on('done', this.trigger.bind(this, 'done'));
	        }, this);
	      };

	      CaptionStream.prototype = new Stream();

	      CaptionStream.prototype.push = function (event) {
	        var sei, userData; // only examine SEI NALs

	        if (event.nalUnitType !== 'sei_rbsp') {
	          return;
	        } // parse the sei


	        sei = parseSei(event.escapedRBSP); // ignore everything but user_data_registered_itu_t_t35

	        if (sei.payloadType !== USER_DATA_REGISTERED_ITU_T_T35) {
	          return;
	        } // parse out the user data payload


	        userData = parseUserData(sei); // ignore unrecognized userData

	        if (!userData) {
	          return;
	        } // Sometimes, the same segment # will be downloaded twice. To stop the
	        // caption data from being processed twice, we track the latest dts we've
	        // received and ignore everything with a dts before that. However, since
	        // data for a specific dts can be split across packets on either side of
	        // a segment boundary, we need to make sure we *don't* ignore the packets
	        // from the *next* segment that have dts === this.latestDts_. By constantly
	        // tracking the number of packets received with dts === this.latestDts_, we
	        // know how many should be ignored once we start receiving duplicates.


	        if (event.dts < this.latestDts_) {
	          // We've started getting older data, so set the flag.
	          this.ignoreNextEqualDts_ = true;
	          return;
	        } else if (event.dts === this.latestDts_ && this.ignoreNextEqualDts_) {
	          this.numSameDts_--;

	          if (!this.numSameDts_) {
	            // We've received the last duplicate packet, time to start processing again
	            this.ignoreNextEqualDts_ = false;
	          }

	          return;
	        } // parse out CC data packets and save them for later


	        this.captionPackets_ = this.captionPackets_.concat(parseCaptionPackets(event.pts, userData));

	        if (this.latestDts_ !== event.dts) {
	          this.numSameDts_ = 0;
	        }

	        this.numSameDts_++;
	        this.latestDts_ = event.dts;
	      };

	      CaptionStream.prototype.flush = function () {
	        // make sure we actually parsed captions before proceeding
	        if (!this.captionPackets_.length) {
	          this.ccStreams_.forEach(function (cc) {
	            cc.flush();
	          }, this);
	          return;
	        } // In Chrome, the Array#sort function is not stable so add a
	        // presortIndex that we can use to ensure we get a stable-sort


	        this.captionPackets_.forEach(function (elem, idx) {
	          elem.presortIndex = idx;
	        }); // sort caption byte-pairs based on their PTS values

	        this.captionPackets_.sort(function (a, b) {
	          if (a.pts === b.pts) {
	            return a.presortIndex - b.presortIndex;
	          }

	          return a.pts - b.pts;
	        });
	        this.captionPackets_.forEach(function (packet) {
	          if (packet.type < 2) {
	            // Dispatch packet to the right Cea608Stream
	            this.dispatchCea608Packet(packet);
	          } // this is where an 'else' would go for a dispatching packets
	          // to a theoretical Cea708Stream that handles SERVICEn data

	        }, this);
	        this.captionPackets_.length = 0;
	        this.ccStreams_.forEach(function (cc) {
	          cc.flush();
	        }, this);
	        return;
	      };

	      CaptionStream.prototype.reset = function () {
	        this.latestDts_ = null;
	        this.ignoreNextEqualDts_ = false;
	        this.numSameDts_ = 0;
	        this.activeCea608Channel_ = [null, null];
	        this.ccStreams_.forEach(function (ccStream) {
	          ccStream.reset();
	        });
	      };

	      CaptionStream.prototype.dispatchCea608Packet = function (packet) {
	        // NOTE: packet.type is the CEA608 field
	        if (this.setsChannel1Active(packet)) {
	          this.activeCea608Channel_[packet.type] = 0;
	        } else if (this.setsChannel2Active(packet)) {
	          this.activeCea608Channel_[packet.type] = 1;
	        }

	        if (this.activeCea608Channel_[packet.type] === null) {
	          // If we haven't received anything to set the active channel, discard the
	          // data; we don't want jumbled captions
	          return;
	        }

	        this.ccStreams_[(packet.type << 1) + this.activeCea608Channel_[packet.type]].push(packet);
	      };

	      CaptionStream.prototype.setsChannel1Active = function (packet) {
	        return (packet.ccData & 0x7800) === 0x1000;
	      };

	      CaptionStream.prototype.setsChannel2Active = function (packet) {
	        return (packet.ccData & 0x7800) === 0x1800;
	      }; // ----------------------
	      // Session to Application
	      // ----------------------


	      var CHARACTER_TRANSLATION = {
	        0x2a: 0xe1,
	        // á
	        0x5c: 0xe9,
	        // é
	        0x5e: 0xed,
	        // í
	        0x5f: 0xf3,
	        // ó
	        0x60: 0xfa,
	        // ú
	        0x7b: 0xe7,
	        // ç
	        0x7c: 0xf7,
	        // ÷
	        0x7d: 0xd1,
	        // Ñ
	        0x7e: 0xf1,
	        // ñ
	        0x7f: 0x2588,
	        // █
	        0x0130: 0xae,
	        // ®
	        0x0131: 0xb0,
	        // °
	        0x0132: 0xbd,
	        // ½
	        0x0133: 0xbf,
	        // ¿
	        0x0134: 0x2122,
	        // ™
	        0x0135: 0xa2,
	        // ¢
	        0x0136: 0xa3,
	        // £
	        0x0137: 0x266a,
	        // ♪
	        0x0138: 0xe0,
	        // à
	        0x0139: 0xa0,
	        //
	        0x013a: 0xe8,
	        // è
	        0x013b: 0xe2,
	        // â
	        0x013c: 0xea,
	        // ê
	        0x013d: 0xee,
	        // î
	        0x013e: 0xf4,
	        // ô
	        0x013f: 0xfb,
	        // û
	        0x0220: 0xc1,
	        // Á
	        0x0221: 0xc9,
	        // É
	        0x0222: 0xd3,
	        // Ó
	        0x0223: 0xda,
	        // Ú
	        0x0224: 0xdc,
	        // Ü
	        0x0225: 0xfc,
	        // ü
	        0x0226: 0x2018,
	        // ‘
	        0x0227: 0xa1,
	        // ¡
	        0x0228: 0x2a,
	        // *
	        0x0229: 0x27,
	        // '
	        0x022a: 0x2014,
	        // —
	        0x022b: 0xa9,
	        // ©
	        0x022c: 0x2120,
	        // ℠
	        0x022d: 0x2022,
	        // •
	        0x022e: 0x201c,
	        // “
	        0x022f: 0x201d,
	        // ”
	        0x0230: 0xc0,
	        // À
	        0x0231: 0xc2,
	        // Â
	        0x0232: 0xc7,
	        // Ç
	        0x0233: 0xc8,
	        // È
	        0x0234: 0xca,
	        // Ê
	        0x0235: 0xcb,
	        // Ë
	        0x0236: 0xeb,
	        // ë
	        0x0237: 0xce,
	        // Î
	        0x0238: 0xcf,
	        // Ï
	        0x0239: 0xef,
	        // ï
	        0x023a: 0xd4,
	        // Ô
	        0x023b: 0xd9,
	        // Ù
	        0x023c: 0xf9,
	        // ù
	        0x023d: 0xdb,
	        // Û
	        0x023e: 0xab,
	        // «
	        0x023f: 0xbb,
	        // »
	        0x0320: 0xc3,
	        // Ã
	        0x0321: 0xe3,
	        // ã
	        0x0322: 0xcd,
	        // Í
	        0x0323: 0xcc,
	        // Ì
	        0x0324: 0xec,
	        // ì
	        0x0325: 0xd2,
	        // Ò
	        0x0326: 0xf2,
	        // ò
	        0x0327: 0xd5,
	        // Õ
	        0x0328: 0xf5,
	        // õ
	        0x0329: 0x7b,
	        // {
	        0x032a: 0x7d,
	        // }
	        0x032b: 0x5c,
	        // \
	        0x032c: 0x5e,
	        // ^
	        0x032d: 0x5f,
	        // _
	        0x032e: 0x7c,
	        // |
	        0x032f: 0x7e,
	        // ~
	        0x0330: 0xc4,
	        // Ä
	        0x0331: 0xe4,
	        // ä
	        0x0332: 0xd6,
	        // Ö
	        0x0333: 0xf6,
	        // ö
	        0x0334: 0xdf,
	        // ß
	        0x0335: 0xa5,
	        // ¥
	        0x0336: 0xa4,
	        // ¤
	        0x0337: 0x2502,
	        // │
	        0x0338: 0xc5,
	        // Å
	        0x0339: 0xe5,
	        // å
	        0x033a: 0xd8,
	        // Ø
	        0x033b: 0xf8,
	        // ø
	        0x033c: 0x250c,
	        // ┌
	        0x033d: 0x2510,
	        // ┐
	        0x033e: 0x2514,
	        // └
	        0x033f: 0x2518 // ┘

	      };

	      var getCharFromCode = function getCharFromCode(code) {
	        if (code === null) {
	          return '';
	        }

	        code = CHARACTER_TRANSLATION[code] || code;
	        return String.fromCharCode(code);
	      }; // the index of the last row in a CEA-608 display buffer


	      var BOTTOM_ROW = 14; // This array is used for mapping PACs -> row #, since there's no way of
	      // getting it through bit logic.

	      var ROWS = [0x1100, 0x1120, 0x1200, 0x1220, 0x1500, 0x1520, 0x1600, 0x1620, 0x1700, 0x1720, 0x1000, 0x1300, 0x1320, 0x1400, 0x1420]; // CEA-608 captions are rendered onto a 34x15 matrix of character
	      // cells. The "bottom" row is the last element in the outer array.

	      var createDisplayBuffer = function createDisplayBuffer() {
	        var result = [],
	            i = BOTTOM_ROW + 1;

	        while (i--) {
	          result.push('');
	        }

	        return result;
	      };

	      var Cea608Stream = function Cea608Stream(field, dataChannel) {
	        Cea608Stream.prototype.init.call(this);
	        this.field_ = field || 0;
	        this.dataChannel_ = dataChannel || 0;
	        this.name_ = 'CC' + ((this.field_ << 1 | this.dataChannel_) + 1);
	        this.setConstants();
	        this.reset();

	        this.push = function (packet) {
	          var data, swap, char0, char1, text; // remove the parity bits

	          data = packet.ccData & 0x7f7f; // ignore duplicate control codes; the spec demands they're sent twice

	          if (data === this.lastControlCode_) {
	            this.lastControlCode_ = null;
	            return;
	          } // Store control codes


	          if ((data & 0xf000) === 0x1000) {
	            this.lastControlCode_ = data;
	          } else if (data !== this.PADDING_) {
	            this.lastControlCode_ = null;
	          }

	          char0 = data >>> 8;
	          char1 = data & 0xff;

	          if (data === this.PADDING_) {
	            return;
	          } else if (data === this.RESUME_CAPTION_LOADING_) {
	            this.mode_ = 'popOn';
	          } else if (data === this.END_OF_CAPTION_) {
	            this.clearFormatting(packet.pts); // if a caption was being displayed, it's gone now

	            this.flushDisplayed(packet.pts); // flip memory

	            swap = this.displayed_;
	            this.displayed_ = this.nonDisplayed_;
	            this.nonDisplayed_ = swap; // start measuring the time to display the caption

	            this.startPts_ = packet.pts;
	          } else if (data === this.ROLL_UP_2_ROWS_) {
	            this.topRow_ = BOTTOM_ROW - 1;
	            this.mode_ = 'rollUp';
	          } else if (data === this.ROLL_UP_3_ROWS_) {
	            this.topRow_ = BOTTOM_ROW - 2;
	            this.mode_ = 'rollUp';
	          } else if (data === this.ROLL_UP_4_ROWS_) {
	            this.topRow_ = BOTTOM_ROW - 3;
	            this.mode_ = 'rollUp';
	          } else if (data === this.CARRIAGE_RETURN_) {
	            this.clearFormatting(packet.pts);
	            this.flushDisplayed(packet.pts);
	            this.shiftRowsUp_();
	            this.startPts_ = packet.pts;
	          } else if (data === this.BACKSPACE_) {
	            if (this.mode_ === 'popOn') {
	              this.nonDisplayed_[BOTTOM_ROW] = this.nonDisplayed_[BOTTOM_ROW].slice(0, -1);
	            } else {
	              this.displayed_[BOTTOM_ROW] = this.displayed_[BOTTOM_ROW].slice(0, -1);
	            }
	          } else if (data === this.ERASE_DISPLAYED_MEMORY_) {
	            this.flushDisplayed(packet.pts);
	            this.displayed_ = createDisplayBuffer();
	          } else if (data === this.ERASE_NON_DISPLAYED_MEMORY_) {
	            this.nonDisplayed_ = createDisplayBuffer();
	          } else if (data === this.RESUME_DIRECT_CAPTIONING_) {
	            this.mode_ = 'paintOn'; // Append special characters to caption text
	          } else if (this.isSpecialCharacter(char0, char1)) {
	            // Bitmask char0 so that we can apply character transformations
	            // regardless of field and data channel.
	            // Then byte-shift to the left and OR with char1 so we can pass the
	            // entire character code to `getCharFromCode`.
	            char0 = (char0 & 0x03) << 8;
	            text = getCharFromCode(char0 | char1);
	            this[this.mode_](packet.pts, text);
	            this.column_++; // Append extended characters to caption text
	          } else if (this.isExtCharacter(char0, char1)) {
	            // Extended characters always follow their "non-extended" equivalents.
	            // IE if a "è" is desired, you'll always receive "eè"; non-compliant
	            // decoders are supposed to drop the "è", while compliant decoders
	            // backspace the "e" and insert "è".
	            // Delete the previous character
	            if (this.mode_ === 'popOn') {
	              this.nonDisplayed_[this.row_] = this.nonDisplayed_[this.row_].slice(0, -1);
	            } else {
	              this.displayed_[BOTTOM_ROW] = this.displayed_[BOTTOM_ROW].slice(0, -1);
	            } // Bitmask char0 so that we can apply character transformations
	            // regardless of field and data channel.
	            // Then byte-shift to the left and OR with char1 so we can pass the
	            // entire character code to `getCharFromCode`.


	            char0 = (char0 & 0x03) << 8;
	            text = getCharFromCode(char0 | char1);
	            this[this.mode_](packet.pts, text);
	            this.column_++; // Process mid-row codes
	          } else if (this.isMidRowCode(char0, char1)) {
	            // Attributes are not additive, so clear all formatting
	            this.clearFormatting(packet.pts); // According to the standard, mid-row codes
	            // should be replaced with spaces, so add one now

	            this[this.mode_](packet.pts, ' ');
	            this.column_++;

	            if ((char1 & 0xe) === 0xe) {
	              this.addFormatting(packet.pts, ['i']);
	            }

	            if ((char1 & 0x1) === 0x1) {
	              this.addFormatting(packet.pts, ['u']);
	            } // Detect offset control codes and adjust cursor

	          } else if (this.isOffsetControlCode(char0, char1)) {
	            // Cursor position is set by indent PAC (see below) in 4-column
	            // increments, with an additional offset code of 1-3 to reach any
	            // of the 32 columns specified by CEA-608. So all we need to do
	            // here is increment the column cursor by the given offset.
	            this.column_ += char1 & 0x03; // Detect PACs (Preamble Address Codes)
	          } else if (this.isPAC(char0, char1)) {
	            // There's no logic for PAC -> row mapping, so we have to just
	            // find the row code in an array and use its index :(
	            var row = ROWS.indexOf(data & 0x1f20);

	            if (row !== this.row_) {
	              // formatting is only persistent for current row
	              this.clearFormatting(packet.pts);
	              this.row_ = row;
	            } // All PACs can apply underline, so detect and apply
	            // (All odd-numbered second bytes set underline)


	            if (char1 & 0x1 && this.formatting_.indexOf('u') === -1) {
	              this.addFormatting(packet.pts, ['u']);
	            }

	            if ((data & 0x10) === 0x10) {
	              // We've got an indent level code. Each successive even number
	              // increments the column cursor by 4, so we can get the desired
	              // column position by bit-shifting to the right (to get n/2)
	              // and multiplying by 4.
	              this.column_ = ((data & 0xe) >> 1) * 4;
	            }

	            if (this.isColorPAC(char1)) {
	              // it's a color code, though we only support white, which
	              // can be either normal or italicized. white italics can be
	              // either 0x4e or 0x6e depending on the row, so we just
	              // bitwise-and with 0xe to see if italics should be turned on
	              if ((char1 & 0xe) === 0xe) {
	                this.addFormatting(packet.pts, ['i']);
	              }
	            } // We have a normal character in char0, and possibly one in char1

	          } else if (this.isNormalChar(char0)) {
	            if (char1 === 0x00) {
	              char1 = null;
	            }

	            text = getCharFromCode(char0);
	            text += getCharFromCode(char1);
	            this[this.mode_](packet.pts, text);
	            this.column_ += text.length;
	          } // finish data processing

	        };
	      };

	      Cea608Stream.prototype = new Stream(); // Trigger a cue point that captures the current state of the
	      // display buffer

	      Cea608Stream.prototype.flushDisplayed = function (pts) {
	        var content = this.displayed_ // remove spaces from the start and end of the string
	        .map(function (row) {
	          return row.trim();
	        }) // combine all text rows to display in one cue
	        .join('\n') // and remove blank rows from the start and end, but not the middle
	        .replace(/^\n+|\n+$/g, '');

	        if (content.length) {
	          this.trigger('data', {
	            startPts: this.startPts_,
	            endPts: pts,
	            text: content,
	            stream: this.name_
	          });
	        }
	      };
	      /**
	       * Zero out the data, used for startup and on seek
	       */


	      Cea608Stream.prototype.reset = function () {
	        this.mode_ = 'popOn'; // When in roll-up mode, the index of the last row that will
	        // actually display captions. If a caption is shifted to a row
	        // with a lower index than this, it is cleared from the display
	        // buffer

	        this.topRow_ = 0;
	        this.startPts_ = 0;
	        this.displayed_ = createDisplayBuffer();
	        this.nonDisplayed_ = createDisplayBuffer();
	        this.lastControlCode_ = null; // Track row and column for proper line-breaking and spacing

	        this.column_ = 0;
	        this.row_ = BOTTOM_ROW; // This variable holds currently-applied formatting

	        this.formatting_ = [];
	      };
	      /**
	       * Sets up control code and related constants for this instance
	       */


	      Cea608Stream.prototype.setConstants = function () {
	        // The following attributes have these uses:
	        // ext_ :    char0 for mid-row codes, and the base for extended
	        //           chars (ext_+0, ext_+1, and ext_+2 are char0s for
	        //           extended codes)
	        // control_: char0 for control codes, except byte-shifted to the
	        //           left so that we can do this.control_ | CONTROL_CODE
	        // offset_:  char0 for tab offset codes
	        //
	        // It's also worth noting that control codes, and _only_ control codes,
	        // differ between field 1 and field2. Field 2 control codes are always
	        // their field 1 value plus 1. That's why there's the "| field" on the
	        // control value.
	        if (this.dataChannel_ === 0) {
	          this.BASE_ = 0x10;
	          this.EXT_ = 0x11;
	          this.CONTROL_ = (0x14 | this.field_) << 8;
	          this.OFFSET_ = 0x17;
	        } else if (this.dataChannel_ === 1) {
	          this.BASE_ = 0x18;
	          this.EXT_ = 0x19;
	          this.CONTROL_ = (0x1c | this.field_) << 8;
	          this.OFFSET_ = 0x1f;
	        } // Constants for the LSByte command codes recognized by Cea608Stream. This
	        // list is not exhaustive. For a more comprehensive listing and semantics see
	        // http://www.gpo.gov/fdsys/pkg/CFR-2010-title47-vol1/pdf/CFR-2010-title47-vol1-sec15-119.pdf
	        // Padding


	        this.PADDING_ = 0x0000; // Pop-on Mode

	        this.RESUME_CAPTION_LOADING_ = this.CONTROL_ | 0x20;
	        this.END_OF_CAPTION_ = this.CONTROL_ | 0x2f; // Roll-up Mode

	        this.ROLL_UP_2_ROWS_ = this.CONTROL_ | 0x25;
	        this.ROLL_UP_3_ROWS_ = this.CONTROL_ | 0x26;
	        this.ROLL_UP_4_ROWS_ = this.CONTROL_ | 0x27;
	        this.CARRIAGE_RETURN_ = this.CONTROL_ | 0x2d; // paint-on mode (not supported)

	        this.RESUME_DIRECT_CAPTIONING_ = this.CONTROL_ | 0x29; // Erasure

	        this.BACKSPACE_ = this.CONTROL_ | 0x21;
	        this.ERASE_DISPLAYED_MEMORY_ = this.CONTROL_ | 0x2c;
	        this.ERASE_NON_DISPLAYED_MEMORY_ = this.CONTROL_ | 0x2e;
	      };
	      /**
	       * Detects if the 2-byte packet data is a special character
	       *
	       * Special characters have a second byte in the range 0x30 to 0x3f,
	       * with the first byte being 0x11 (for data channel 1) or 0x19 (for
	       * data channel 2).
	       *
	       * @param  {Integer} char0 The first byte
	       * @param  {Integer} char1 The second byte
	       * @return {Boolean}       Whether the 2 bytes are an special character
	       */


	      Cea608Stream.prototype.isSpecialCharacter = function (char0, char1) {
	        return char0 === this.EXT_ && char1 >= 0x30 && char1 <= 0x3f;
	      };
	      /**
	       * Detects if the 2-byte packet data is an extended character
	       *
	       * Extended characters have a second byte in the range 0x20 to 0x3f,
	       * with the first byte being 0x12 or 0x13 (for data channel 1) or
	       * 0x1a or 0x1b (for data channel 2).
	       *
	       * @param  {Integer} char0 The first byte
	       * @param  {Integer} char1 The second byte
	       * @return {Boolean}       Whether the 2 bytes are an extended character
	       */


	      Cea608Stream.prototype.isExtCharacter = function (char0, char1) {
	        return (char0 === this.EXT_ + 1 || char0 === this.EXT_ + 2) && char1 >= 0x20 && char1 <= 0x3f;
	      };
	      /**
	       * Detects if the 2-byte packet is a mid-row code
	       *
	       * Mid-row codes have a second byte in the range 0x20 to 0x2f, with
	       * the first byte being 0x11 (for data channel 1) or 0x19 (for data
	       * channel 2).
	       *
	       * @param  {Integer} char0 The first byte
	       * @param  {Integer} char1 The second byte
	       * @return {Boolean}       Whether the 2 bytes are a mid-row code
	       */


	      Cea608Stream.prototype.isMidRowCode = function (char0, char1) {
	        return char0 === this.EXT_ && char1 >= 0x20 && char1 <= 0x2f;
	      };
	      /**
	       * Detects if the 2-byte packet is an offset control code
	       *
	       * Offset control codes have a second byte in the range 0x21 to 0x23,
	       * with the first byte being 0x17 (for data channel 1) or 0x1f (for
	       * data channel 2).
	       *
	       * @param  {Integer} char0 The first byte
	       * @param  {Integer} char1 The second byte
	       * @return {Boolean}       Whether the 2 bytes are an offset control code
	       */


	      Cea608Stream.prototype.isOffsetControlCode = function (char0, char1) {
	        return char0 === this.OFFSET_ && char1 >= 0x21 && char1 <= 0x23;
	      };
	      /**
	       * Detects if the 2-byte packet is a Preamble Address Code
	       *
	       * PACs have a first byte in the range 0x10 to 0x17 (for data channel 1)
	       * or 0x18 to 0x1f (for data channel 2), with the second byte in the
	       * range 0x40 to 0x7f.
	       *
	       * @param  {Integer} char0 The first byte
	       * @param  {Integer} char1 The second byte
	       * @return {Boolean}       Whether the 2 bytes are a PAC
	       */


	      Cea608Stream.prototype.isPAC = function (char0, char1) {
	        return char0 >= this.BASE_ && char0 < this.BASE_ + 8 && char1 >= 0x40 && char1 <= 0x7f;
	      };
	      /**
	       * Detects if a packet's second byte is in the range of a PAC color code
	       *
	       * PAC color codes have the second byte be in the range 0x40 to 0x4f, or
	       * 0x60 to 0x6f.
	       *
	       * @param  {Integer} char1 The second byte
	       * @return {Boolean}       Whether the byte is a color PAC
	       */


	      Cea608Stream.prototype.isColorPAC = function (char1) {
	        return char1 >= 0x40 && char1 <= 0x4f || char1 >= 0x60 && char1 <= 0x7f;
	      };
	      /**
	       * Detects if a single byte is in the range of a normal character
	       *
	       * Normal text bytes are in the range 0x20 to 0x7f.
	       *
	       * @param  {Integer} char  The byte
	       * @return {Boolean}       Whether the byte is a normal character
	       */


	      Cea608Stream.prototype.isNormalChar = function (char) {
	        return char >= 0x20 && char <= 0x7f;
	      }; // Adds the opening HTML tag for the passed character to the caption text,
	      // and keeps track of it for later closing


	      Cea608Stream.prototype.addFormatting = function (pts, format) {
	        this.formatting_ = this.formatting_.concat(format);
	        var text = format.reduce(function (text, format) {
	          return text + '<' + format + '>';
	        }, '');
	        this[this.mode_](pts, text);
	      }; // Adds HTML closing tags for current formatting to caption text and
	      // clears remembered formatting


	      Cea608Stream.prototype.clearFormatting = function (pts) {
	        if (!this.formatting_.length) {
	          return;
	        }

	        var text = this.formatting_.reverse().reduce(function (text, format) {
	          return text + '</' + format + '>';
	        }, '');
	        this.formatting_ = [];
	        this[this.mode_](pts, text);
	      }; // Mode Implementations


	      Cea608Stream.prototype.popOn = function (pts, text) {
	        var baseRow = this.nonDisplayed_[this.row_]; // buffer characters

	        baseRow += text;
	        this.nonDisplayed_[this.row_] = baseRow;
	      };

	      Cea608Stream.prototype.rollUp = function (pts, text) {
	        var baseRow = this.displayed_[BOTTOM_ROW];
	        baseRow += text;
	        this.displayed_[BOTTOM_ROW] = baseRow;
	      };

	      Cea608Stream.prototype.shiftRowsUp_ = function () {
	        var i; // clear out inactive rows

	        for (i = 0; i < this.topRow_; i++) {
	          this.displayed_[i] = '';
	        } // shift displayed rows up


	        for (i = this.topRow_; i < BOTTOM_ROW; i++) {
	          this.displayed_[i] = this.displayed_[i + 1];
	        } // clear out the bottom row


	        this.displayed_[BOTTOM_ROW] = '';
	      }; // paintOn mode is not implemented


	      Cea608Stream.prototype.paintOn = function () {}; // exports


	      module.exports = {
	        CaptionStream: CaptionStream,
	        Cea608Stream: Cea608Stream
	      };
	    }, {
	      "../utils/stream": 30
	    }],
	    15: [function (require, module, exports) {
	      module.exports = require('./m2ts');
	    }, {
	      "./m2ts": 16
	    }],
	    16: [function (require, module, exports) {

	      var Stream = require('../utils/stream.js'),
	          CaptionStream = require('./caption-stream'),
	          StreamTypes = require('./stream-types'),
	          TimestampRolloverStream = require('./timestamp-rollover-stream').TimestampRolloverStream;

	      var m2tsStreamTypes = require('./stream-types.js'); // object types


	      var _TransportPacketStream, _TransportParseStream, _ElementaryStream; // constants


	      var MP2T_PACKET_LENGTH = 188,
	          // bytes
	      SYNC_BYTE = 0x47;
	      /**
	       * Splits an incoming stream of binary data into MPEG-2 Transport
	       * Stream packets.
	       */

	      _TransportPacketStream = function TransportPacketStream() {
	        var buffer = new Uint8Array(MP2T_PACKET_LENGTH),
	            bytesInBuffer = 0;

	        _TransportPacketStream.prototype.init.call(this); // Deliver new bytes to the stream.


	        this.push = function (bytes) {
	          var startIndex = 0,
	              endIndex = MP2T_PACKET_LENGTH,
	              everything; // If there are bytes remaining from the last segment, prepend them to the
	          // bytes that were pushed in

	          if (bytesInBuffer) {
	            everything = new Uint8Array(bytes.byteLength + bytesInBuffer);
	            everything.set(buffer.subarray(0, bytesInBuffer));
	            everything.set(bytes, bytesInBuffer);
	            bytesInBuffer = 0;
	          } else {
	            everything = bytes;
	          } // While we have enough data for a packet


	          while (endIndex < everything.byteLength) {
	            // Look for a pair of start and end sync bytes in the data..
	            if (everything[startIndex] === SYNC_BYTE && everything[endIndex] === SYNC_BYTE) {
	              // We found a packet so emit it and jump one whole packet forward in
	              // the stream
	              this.trigger('data', everything.subarray(startIndex, endIndex));
	              startIndex += MP2T_PACKET_LENGTH;
	              endIndex += MP2T_PACKET_LENGTH;
	              continue;
	            } // If we get here, we have somehow become de-synchronized and we need to step
	            // forward one byte at a time until we find a pair of sync bytes that denote
	            // a packet


	            startIndex++;
	            endIndex++;
	          } // If there was some data left over at the end of the segment that couldn't
	          // possibly be a whole packet, keep it because it might be the start of a packet
	          // that continues in the next segment


	          if (startIndex < everything.byteLength) {
	            buffer.set(everything.subarray(startIndex), 0);
	            bytesInBuffer = everything.byteLength - startIndex;
	          }
	        };

	        this.flush = function () {
	          // If the buffer contains a whole packet when we are being flushed, emit it
	          // and empty the buffer. Otherwise hold onto the data because it may be
	          // important for decoding the next segment
	          if (bytesInBuffer === MP2T_PACKET_LENGTH && buffer[0] === SYNC_BYTE) {
	            this.trigger('data', buffer);
	            bytesInBuffer = 0;
	          }

	          this.trigger('done');
	        };
	      };

	      _TransportPacketStream.prototype = new Stream();
	      /**
	       * Accepts an MP2T TransportPacketStream and emits data events with parsed
	       * forms of the individual transport stream packets.
	       */

	      _TransportParseStream = function TransportParseStream() {
	        var parsePsi, parsePat, parsePmt, self;

	        _TransportParseStream.prototype.init.call(this);

	        self = this;
	        this.packetsWaitingForPmt = [];
	        this.programMapTable = undefined;

	        parsePsi = function parsePsi(payload, psi) {
	          var offset = 0; // PSI packets may be split into multiple sections and those
	          // sections may be split into multiple packets. If a PSI
	          // section starts in this packet, the payload_unit_start_indicator
	          // will be true and the first byte of the payload will indicate
	          // the offset from the current position to the start of the
	          // section.

	          if (psi.payloadUnitStartIndicator) {
	            offset += payload[offset] + 1;
	          }

	          if (psi.type === 'pat') {
	            parsePat(payload.subarray(offset), psi);
	          } else {
	            parsePmt(payload.subarray(offset), psi);
	          }
	        };

	        parsePat = function parsePat(payload, pat) {
	          pat.section_number = payload[7]; // eslint-disable-line camelcase

	          pat.last_section_number = payload[8]; // eslint-disable-line camelcase
	          // skip the PSI header and parse the first PMT entry

	          self.pmtPid = (payload[10] & 0x1F) << 8 | payload[11];
	          pat.pmtPid = self.pmtPid;
	        };
	        /**
	         * Parse out the relevant fields of a Program Map Table (PMT).
	         * @param payload {Uint8Array} the PMT-specific portion of an MP2T
	         * packet. The first byte in this array should be the table_id
	         * field.
	         * @param pmt {object} the object that should be decorated with
	         * fields parsed from the PMT.
	         */


	        parsePmt = function parsePmt(payload, pmt) {
	          var sectionLength, tableEnd, programInfoLength, offset; // PMTs can be sent ahead of the time when they should actually
	          // take effect. We don't believe this should ever be the case
	          // for HLS but we'll ignore "forward" PMT declarations if we see
	          // them. Future PMT declarations have the current_next_indicator
	          // set to zero.

	          if (!(payload[5] & 0x01)) {
	            return;
	          } // overwrite any existing program map table


	          self.programMapTable = {
	            video: null,
	            audio: null,
	            'timed-metadata': {}
	          }; // the mapping table ends at the end of the current section

	          sectionLength = (payload[1] & 0x0f) << 8 | payload[2];
	          tableEnd = 3 + sectionLength - 4; // to determine where the table is, we have to figure out how
	          // long the program info descriptors are

	          programInfoLength = (payload[10] & 0x0f) << 8 | payload[11]; // advance the offset to the first entry in the mapping table

	          offset = 12 + programInfoLength;

	          while (offset < tableEnd) {
	            var streamType = payload[offset];
	            var pid = (payload[offset + 1] & 0x1F) << 8 | payload[offset + 2]; // only map a single elementary_pid for audio and video stream types
	            // TODO: should this be done for metadata too? for now maintain behavior of
	            //       multiple metadata streams

	            if (streamType === StreamTypes.H264_STREAM_TYPE && self.programMapTable.video === null) {
	              self.programMapTable.video = pid;
	            } else if (streamType === StreamTypes.ADTS_STREAM_TYPE && self.programMapTable.audio === null) {
	              self.programMapTable.audio = pid;
	            } else if (streamType === StreamTypes.METADATA_STREAM_TYPE) {
	              // map pid to stream type for metadata streams
	              self.programMapTable['timed-metadata'][pid] = streamType;
	            } // move to the next table entry
	            // skip past the elementary stream descriptors, if present


	            offset += ((payload[offset + 3] & 0x0F) << 8 | payload[offset + 4]) + 5;
	          } // record the map on the packet as well


	          pmt.programMapTable = self.programMapTable;
	        };
	        /**
	         * Deliver a new MP2T packet to the stream.
	         */


	        this.push = function (packet) {
	          var result = {},
	              offset = 4;
	          result.payloadUnitStartIndicator = !!(packet[1] & 0x40); // pid is a 13-bit field starting at the last bit of packet[1]

	          result.pid = packet[1] & 0x1f;
	          result.pid <<= 8;
	          result.pid |= packet[2]; // if an adaption field is present, its length is specified by the
	          // fifth byte of the TS packet header. The adaptation field is
	          // used to add stuffing to PES packets that don't fill a complete
	          // TS packet, and to specify some forms of timing and control data
	          // that we do not currently use.

	          if ((packet[3] & 0x30) >>> 4 > 0x01) {
	            offset += packet[offset] + 1;
	          } // parse the rest of the packet based on the type


	          if (result.pid === 0) {
	            result.type = 'pat';
	            parsePsi(packet.subarray(offset), result);
	            this.trigger('data', result);
	          } else if (result.pid === this.pmtPid) {
	            result.type = 'pmt';
	            parsePsi(packet.subarray(offset), result);
	            this.trigger('data', result); // if there are any packets waiting for a PMT to be found, process them now

	            while (this.packetsWaitingForPmt.length) {
	              this.processPes_.apply(this, this.packetsWaitingForPmt.shift());
	            }
	          } else if (this.programMapTable === undefined) {
	            // When we have not seen a PMT yet, defer further processing of
	            // PES packets until one has been parsed
	            this.packetsWaitingForPmt.push([packet, offset, result]);
	          } else {
	            this.processPes_(packet, offset, result);
	          }
	        };

	        this.processPes_ = function (packet, offset, result) {
	          // set the appropriate stream type
	          if (result.pid === this.programMapTable.video) {
	            result.streamType = StreamTypes.H264_STREAM_TYPE;
	          } else if (result.pid === this.programMapTable.audio) {
	            result.streamType = StreamTypes.ADTS_STREAM_TYPE;
	          } else {
	            // if not video or audio, it is timed-metadata or unknown
	            // if unknown, streamType will be undefined
	            result.streamType = this.programMapTable['timed-metadata'][result.pid];
	          }

	          result.type = 'pes';
	          result.data = packet.subarray(offset);
	          this.trigger('data', result);
	        };
	      };

	      _TransportParseStream.prototype = new Stream();
	      _TransportParseStream.STREAM_TYPES = {
	        h264: 0x1b,
	        adts: 0x0f
	      };
	      /**
	       * Reconsistutes program elementary stream (PES) packets from parsed
	       * transport stream packets. That is, if you pipe an
	       * mp2t.TransportParseStream into a mp2t.ElementaryStream, the output
	       * events will be events which capture the bytes for individual PES
	       * packets plus relevant metadata that has been extracted from the
	       * container.
	       */

	      _ElementaryStream = function ElementaryStream() {
	        var self = this,
	            // PES packet fragments
	        video = {
	          data: [],
	          size: 0
	        },
	            audio = {
	          data: [],
	          size: 0
	        },
	            timedMetadata = {
	          data: [],
	          size: 0
	        },
	            parsePes = function parsePes(payload, pes) {
	          var ptsDtsFlags; // get the packet length, this will be 0 for video

	          pes.packetLength = 6 + (payload[4] << 8 | payload[5]); // find out if this packets starts a new keyframe

	          pes.dataAlignmentIndicator = (payload[6] & 0x04) !== 0; // PES packets may be annotated with a PTS value, or a PTS value
	          // and a DTS value. Determine what combination of values is
	          // available to work with.

	          ptsDtsFlags = payload[7]; // PTS and DTS are normally stored as a 33-bit number.  Javascript
	          // performs all bitwise operations on 32-bit integers but javascript
	          // supports a much greater range (52-bits) of integer using standard
	          // mathematical operations.
	          // We construct a 31-bit value using bitwise operators over the 31
	          // most significant bits and then multiply by 4 (equal to a left-shift
	          // of 2) before we add the final 2 least significant bits of the
	          // timestamp (equal to an OR.)

	          if (ptsDtsFlags & 0xC0) {
	            // the PTS and DTS are not written out directly. For information
	            // on how they are encoded, see
	            // http://dvd.sourceforge.net/dvdinfo/pes-hdr.html
	            pes.pts = (payload[9] & 0x0E) << 27 | (payload[10] & 0xFF) << 20 | (payload[11] & 0xFE) << 12 | (payload[12] & 0xFF) << 5 | (payload[13] & 0xFE) >>> 3;
	            pes.pts *= 4; // Left shift by 2

	            pes.pts += (payload[13] & 0x06) >>> 1; // OR by the two LSBs

	            pes.dts = pes.pts;

	            if (ptsDtsFlags & 0x40) {
	              pes.dts = (payload[14] & 0x0E) << 27 | (payload[15] & 0xFF) << 20 | (payload[16] & 0xFE) << 12 | (payload[17] & 0xFF) << 5 | (payload[18] & 0xFE) >>> 3;
	              pes.dts *= 4; // Left shift by 2

	              pes.dts += (payload[18] & 0x06) >>> 1; // OR by the two LSBs
	            }
	          } // the data section starts immediately after the PES header.
	          // pes_header_data_length specifies the number of header bytes
	          // that follow the last byte of the field.


	          pes.data = payload.subarray(9 + payload[8]);
	        },
	            flushStream = function flushStream(stream, type, forceFlush) {
	          var packetData = new Uint8Array(stream.size),
	              event = {
	            type: type
	          },
	              i = 0,
	              offset = 0,
	              packetFlushable = false,
	              fragment; // do nothing if there is not enough buffered data for a complete
	          // PES header

	          if (!stream.data.length || stream.size < 9) {
	            return;
	          }

	          event.trackId = stream.data[0].pid; // reassemble the packet

	          for (i = 0; i < stream.data.length; i++) {
	            fragment = stream.data[i];
	            packetData.set(fragment.data, offset);
	            offset += fragment.data.byteLength;
	          } // parse assembled packet's PES header


	          parsePes(packetData, event); // non-video PES packets MUST have a non-zero PES_packet_length
	          // check that there is enough stream data to fill the packet

	          packetFlushable = type === 'video' || event.packetLength <= stream.size; // flush pending packets if the conditions are right

	          if (forceFlush || packetFlushable) {
	            stream.size = 0;
	            stream.data.length = 0;
	          } // only emit packets that are complete. this is to avoid assembling
	          // incomplete PES packets due to poor segmentation


	          if (packetFlushable) {
	            self.trigger('data', event);
	          }
	        };

	        _ElementaryStream.prototype.init.call(this);

	        this.push = function (data) {
	          ({
	            pat: function pat() {// we have to wait for the PMT to arrive as well before we
	              // have any meaningful metadata
	            },
	            pes: function pes() {
	              var stream, streamType;

	              switch (data.streamType) {
	                case StreamTypes.H264_STREAM_TYPE:
	                case m2tsStreamTypes.H264_STREAM_TYPE:
	                  stream = video;
	                  streamType = 'video';
	                  break;

	                case StreamTypes.ADTS_STREAM_TYPE:
	                  stream = audio;
	                  streamType = 'audio';
	                  break;

	                case StreamTypes.METADATA_STREAM_TYPE:
	                  stream = timedMetadata;
	                  streamType = 'timed-metadata';
	                  break;

	                default:
	                  // ignore unknown stream types
	                  return;
	              } // if a new packet is starting, we can flush the completed
	              // packet


	              if (data.payloadUnitStartIndicator) {
	                flushStream(stream, streamType, true);
	              } // buffer this fragment until we are sure we've received the
	              // complete payload


	              stream.data.push(data);
	              stream.size += data.data.byteLength;
	            },
	            pmt: function pmt() {
	              var event = {
	                type: 'metadata',
	                tracks: []
	              },
	                  programMapTable = data.programMapTable; // translate audio and video streams to tracks

	              if (programMapTable.video !== null) {
	                event.tracks.push({
	                  timelineStartInfo: {
	                    baseMediaDecodeTime: 0
	                  },
	                  id: +programMapTable.video,
	                  codec: 'avc',
	                  type: 'video'
	                });
	              }

	              if (programMapTable.audio !== null) {
	                event.tracks.push({
	                  timelineStartInfo: {
	                    baseMediaDecodeTime: 0
	                  },
	                  id: +programMapTable.audio,
	                  codec: 'adts',
	                  type: 'audio'
	                });
	              }

	              self.trigger('data', event);
	            }
	          })[data.type]();
	        };
	        /**
	         * Flush any remaining input. Video PES packets may be of variable
	         * length. Normally, the start of a new video packet can trigger the
	         * finalization of the previous packet. That is not possible if no
	         * more video is forthcoming, however. In that case, some other
	         * mechanism (like the end of the file) has to be employed. When it is
	         * clear that no additional data is forthcoming, calling this method
	         * will flush the buffered packets.
	         */


	        this.flush = function () {
	          // !!THIS ORDER IS IMPORTANT!!
	          // video first then audio
	          flushStream(video, 'video');
	          flushStream(audio, 'audio');
	          flushStream(timedMetadata, 'timed-metadata');
	          this.trigger('done');
	        };
	      };

	      _ElementaryStream.prototype = new Stream();
	      var m2ts = {
	        PAT_PID: 0x0000,
	        MP2T_PACKET_LENGTH: MP2T_PACKET_LENGTH,
	        TransportPacketStream: _TransportPacketStream,
	        TransportParseStream: _TransportParseStream,
	        ElementaryStream: _ElementaryStream,
	        TimestampRolloverStream: TimestampRolloverStream,
	        CaptionStream: CaptionStream.CaptionStream,
	        Cea608Stream: CaptionStream.Cea608Stream,
	        MetadataStream: require('./metadata-stream')
	      };

	      for (var type in StreamTypes) {
	        if (StreamTypes.hasOwnProperty(type)) {
	          m2ts[type] = StreamTypes[type];
	        }
	      }

	      module.exports = m2ts;
	    }, {
	      "../utils/stream.js": 30,
	      "./caption-stream": 14,
	      "./metadata-stream": 17,
	      "./stream-types": 19,
	      "./stream-types.js": 19,
	      "./timestamp-rollover-stream": 20
	    }],
	    17: [function (require, module, exports) {

	      var Stream = require('../utils/stream'),
	          StreamTypes = require('./stream-types'),
	          // return a percent-encoded representation of the specified byte range
	      // @see http://en.wikipedia.org/wiki/Percent-encoding
	      percentEncode = function percentEncode(bytes, start, end) {
	        var i,
	            result = '';

	        for (i = start; i < end; i++) {
	          result += '%' + ('00' + bytes[i].toString(16)).slice(-2);
	        }

	        return result;
	      },
	          // return the string representation of the specified byte range,
	      // interpreted as UTf-8.
	      parseUtf8 = function parseUtf8(bytes, start, end) {
	        return decodeURIComponent(percentEncode(bytes, start, end));
	      },
	          // return the string representation of the specified byte range,
	      // interpreted as ISO-8859-1.
	      parseIso88591 = function parseIso88591(bytes, start, end) {
	        return unescape(percentEncode(bytes, start, end)); // jshint ignore:line
	      },
	          parseSyncSafeInteger = function parseSyncSafeInteger(data) {
	        return data[0] << 21 | data[1] << 14 | data[2] << 7 | data[3];
	      },
	          tagParsers = {
	        TXXX: function TXXX(tag) {
	          var i;

	          if (tag.data[0] !== 3) {
	            // ignore frames with unrecognized character encodings
	            return;
	          }

	          for (i = 1; i < tag.data.length; i++) {
	            if (tag.data[i] === 0) {
	              // parse the text fields
	              tag.description = parseUtf8(tag.data, 1, i); // do not include the null terminator in the tag value

	              tag.value = parseUtf8(tag.data, i + 1, tag.data.length).replace(/\0*$/, '');
	              break;
	            }
	          }

	          tag.data = tag.value;
	        },
	        WXXX: function WXXX(tag) {
	          var i;

	          if (tag.data[0] !== 3) {
	            // ignore frames with unrecognized character encodings
	            return;
	          }

	          for (i = 1; i < tag.data.length; i++) {
	            if (tag.data[i] === 0) {
	              // parse the description and URL fields
	              tag.description = parseUtf8(tag.data, 1, i);
	              tag.url = parseUtf8(tag.data, i + 1, tag.data.length);
	              break;
	            }
	          }
	        },
	        PRIV: function PRIV(tag) {
	          var i;

	          for (i = 0; i < tag.data.length; i++) {
	            if (tag.data[i] === 0) {
	              // parse the description and URL fields
	              tag.owner = parseIso88591(tag.data, 0, i);
	              break;
	            }
	          }

	          tag.privateData = tag.data.subarray(i + 1);
	          tag.data = tag.privateData;
	        }
	      },
	          _MetadataStream;

	      _MetadataStream = function MetadataStream(options) {
	        var settings = {
	          debug: !!(options && options.debug),
	          // the bytes of the program-level descriptor field in MP2T
	          // see ISO/IEC 13818-1:2013 (E), section 2.6 "Program and
	          // program element descriptors"
	          descriptor: options && options.descriptor
	        },
	            // the total size in bytes of the ID3 tag being parsed
	        tagSize = 0,
	            // tag data that is not complete enough to be parsed
	        buffer = [],
	            // the total number of bytes currently in the buffer
	        bufferSize = 0,
	            i;

	        _MetadataStream.prototype.init.call(this); // calculate the text track in-band metadata track dispatch type
	        // https://html.spec.whatwg.org/multipage/embedded-content.html#steps-to-expose-a-media-resource-specific-text-track


	        this.dispatchType = StreamTypes.METADATA_STREAM_TYPE.toString(16);

	        if (settings.descriptor) {
	          for (i = 0; i < settings.descriptor.length; i++) {
	            this.dispatchType += ('00' + settings.descriptor[i].toString(16)).slice(-2);
	          }
	        }

	        this.push = function (chunk) {
	          var tag, frameStart, frameSize, frame, i, frameHeader;

	          if (chunk.type !== 'timed-metadata') {
	            return;
	          } // if data_alignment_indicator is set in the PES header,
	          // we must have the start of a new ID3 tag. Assume anything
	          // remaining in the buffer was malformed and throw it out


	          if (chunk.dataAlignmentIndicator) {
	            bufferSize = 0;
	            buffer.length = 0;
	          } // ignore events that don't look like ID3 data


	          if (buffer.length === 0 && (chunk.data.length < 10 || chunk.data[0] !== 'I'.charCodeAt(0) || chunk.data[1] !== 'D'.charCodeAt(0) || chunk.data[2] !== '3'.charCodeAt(0))) {
	            if (settings.debug) {
	              // eslint-disable-next-line no-console
	              console.log('Skipping unrecognized metadata packet');
	            }

	            return;
	          } // add this chunk to the data we've collected so far


	          buffer.push(chunk);
	          bufferSize += chunk.data.byteLength; // grab the size of the entire frame from the ID3 header

	          if (buffer.length === 1) {
	            // the frame size is transmitted as a 28-bit integer in the
	            // last four bytes of the ID3 header.
	            // The most significant bit of each byte is dropped and the
	            // results concatenated to recover the actual value.
	            tagSize = parseSyncSafeInteger(chunk.data.subarray(6, 10)); // ID3 reports the tag size excluding the header but it's more
	            // convenient for our comparisons to include it

	            tagSize += 10;
	          } // if the entire frame has not arrived, wait for more data


	          if (bufferSize < tagSize) {
	            return;
	          } // collect the entire frame so it can be parsed


	          tag = {
	            data: new Uint8Array(tagSize),
	            frames: [],
	            pts: buffer[0].pts,
	            dts: buffer[0].dts
	          };

	          for (i = 0; i < tagSize;) {
	            tag.data.set(buffer[0].data.subarray(0, tagSize - i), i);
	            i += buffer[0].data.byteLength;
	            bufferSize -= buffer[0].data.byteLength;
	            buffer.shift();
	          } // find the start of the first frame and the end of the tag


	          frameStart = 10;

	          if (tag.data[5] & 0x40) {
	            // advance the frame start past the extended header
	            frameStart += 4; // header size field

	            frameStart += parseSyncSafeInteger(tag.data.subarray(10, 14)); // clip any padding off the end

	            tagSize -= parseSyncSafeInteger(tag.data.subarray(16, 20));
	          } // parse one or more ID3 frames
	          // http://id3.org/id3v2.3.0#ID3v2_frame_overview


	          do {
	            // determine the number of bytes in this frame
	            frameSize = parseSyncSafeInteger(tag.data.subarray(frameStart + 4, frameStart + 8));

	            if (frameSize < 1) {
	              // eslint-disable-next-line no-console
	              return console.log('Malformed ID3 frame encountered. Skipping metadata parsing.');
	            }

	            frameHeader = String.fromCharCode(tag.data[frameStart], tag.data[frameStart + 1], tag.data[frameStart + 2], tag.data[frameStart + 3]);
	            frame = {
	              id: frameHeader,
	              data: tag.data.subarray(frameStart + 10, frameStart + frameSize + 10)
	            };
	            frame.key = frame.id;

	            if (tagParsers[frame.id]) {
	              tagParsers[frame.id](frame); // handle the special PRIV frame used to indicate the start
	              // time for raw AAC data

	              if (frame.owner === 'com.apple.streaming.transportStreamTimestamp') {
	                var d = frame.data,
	                    size = (d[3] & 0x01) << 30 | d[4] << 22 | d[5] << 14 | d[6] << 6 | d[7] >>> 2;
	                size *= 4;
	                size += d[7] & 0x03;
	                frame.timeStamp = size; // in raw AAC, all subsequent data will be timestamped based
	                // on the value of this frame
	                // we couldn't have known the appropriate pts and dts before
	                // parsing this ID3 tag so set those values now

	                if (tag.pts === undefined && tag.dts === undefined) {
	                  tag.pts = frame.timeStamp;
	                  tag.dts = frame.timeStamp;
	                }

	                this.trigger('timestamp', frame);
	              }
	            }

	            tag.frames.push(frame);
	            frameStart += 10; // advance past the frame header

	            frameStart += frameSize; // advance past the frame body
	          } while (frameStart < tagSize);

	          this.trigger('data', tag);
	        };
	      };

	      _MetadataStream.prototype = new Stream();
	      module.exports = _MetadataStream;
	    }, {
	      "../utils/stream": 30,
	      "./stream-types": 19
	    }],
	    18: [function (require, module, exports) {

	      var StreamTypes = require('./stream-types.js');

	      var parsePid = function parsePid(packet) {
	        var pid = packet[1] & 0x1f;
	        pid <<= 8;
	        pid |= packet[2];
	        return pid;
	      };

	      var parsePayloadUnitStartIndicator = function parsePayloadUnitStartIndicator(packet) {
	        return !!(packet[1] & 0x40);
	      };

	      var parseAdaptionField = function parseAdaptionField(packet) {
	        var offset = 0; // if an adaption field is present, its length is specified by the
	        // fifth byte of the TS packet header. The adaptation field is
	        // used to add stuffing to PES packets that don't fill a complete
	        // TS packet, and to specify some forms of timing and control data
	        // that we do not currently use.

	        if ((packet[3] & 0x30) >>> 4 > 0x01) {
	          offset += packet[4] + 1;
	        }

	        return offset;
	      };

	      var parseType = function parseType(packet, pmtPid) {
	        var pid = parsePid(packet);

	        if (pid === 0) {
	          return 'pat';
	        } else if (pid === pmtPid) {
	          return 'pmt';
	        } else if (pmtPid) {
	          return 'pes';
	        }

	        return null;
	      };

	      var parsePat = function parsePat(packet) {
	        var pusi = parsePayloadUnitStartIndicator(packet);
	        var offset = 4 + parseAdaptionField(packet);

	        if (pusi) {
	          offset += packet[offset] + 1;
	        }

	        return (packet[offset + 10] & 0x1f) << 8 | packet[offset + 11];
	      };

	      var parsePmt = function parsePmt(packet) {
	        var programMapTable = {};
	        var pusi = parsePayloadUnitStartIndicator(packet);
	        var payloadOffset = 4 + parseAdaptionField(packet);

	        if (pusi) {
	          payloadOffset += packet[payloadOffset] + 1;
	        } // PMTs can be sent ahead of the time when they should actually
	        // take effect. We don't believe this should ever be the case
	        // for HLS but we'll ignore "forward" PMT declarations if we see
	        // them. Future PMT declarations have the current_next_indicator
	        // set to zero.


	        if (!(packet[payloadOffset + 5] & 0x01)) {
	          return;
	        }

	        var sectionLength, tableEnd, programInfoLength; // the mapping table ends at the end of the current section

	        sectionLength = (packet[payloadOffset + 1] & 0x0f) << 8 | packet[payloadOffset + 2];
	        tableEnd = 3 + sectionLength - 4; // to determine where the table is, we have to figure out how
	        // long the program info descriptors are

	        programInfoLength = (packet[payloadOffset + 10] & 0x0f) << 8 | packet[payloadOffset + 11]; // advance the offset to the first entry in the mapping table

	        var offset = 12 + programInfoLength;

	        while (offset < tableEnd) {
	          var i = payloadOffset + offset; // add an entry that maps the elementary_pid to the stream_type

	          programMapTable[(packet[i + 1] & 0x1F) << 8 | packet[i + 2]] = packet[i]; // move to the next table entry
	          // skip past the elementary stream descriptors, if present

	          offset += ((packet[i + 3] & 0x0F) << 8 | packet[i + 4]) + 5;
	        }

	        return programMapTable;
	      };

	      var parsePesType = function parsePesType(packet, programMapTable) {
	        var pid = parsePid(packet);
	        var type = programMapTable[pid];

	        switch (type) {
	          case StreamTypes.H264_STREAM_TYPE:
	            return 'video';

	          case StreamTypes.ADTS_STREAM_TYPE:
	            return 'audio';

	          case StreamTypes.METADATA_STREAM_TYPE:
	            return 'timed-metadata';

	          default:
	            return null;
	        }
	      };

	      var parsePesTime = function parsePesTime(packet) {
	        var pusi = parsePayloadUnitStartIndicator(packet);

	        if (!pusi) {
	          return null;
	        }

	        var offset = 4 + parseAdaptionField(packet);

	        if (offset >= packet.byteLength) {
	          // From the H 222.0 MPEG-TS spec
	          // "For transport stream packets carrying PES packets, stuffing is needed when there
	          //  is insufficient PES packet data to completely fill the transport stream packet
	          //  payload bytes. Stuffing is accomplished by defining an adaptation field longer than
	          //  the sum of the lengths of the data elements in it, so that the payload bytes
	          //  remaining after the adaptation field exactly accommodates the available PES packet
	          //  data."
	          //
	          // If the offset is >= the length of the packet, then the packet contains no data
	          // and instead is just adaption field stuffing bytes
	          return null;
	        }

	        var pes = null;
	        var ptsDtsFlags; // PES packets may be annotated with a PTS value, or a PTS value
	        // and a DTS value. Determine what combination of values is
	        // available to work with.

	        ptsDtsFlags = packet[offset + 7]; // PTS and DTS are normally stored as a 33-bit number.  Javascript
	        // performs all bitwise operations on 32-bit integers but javascript
	        // supports a much greater range (52-bits) of integer using standard
	        // mathematical operations.
	        // We construct a 31-bit value using bitwise operators over the 31
	        // most significant bits and then multiply by 4 (equal to a left-shift
	        // of 2) before we add the final 2 least significant bits of the
	        // timestamp (equal to an OR.)

	        if (ptsDtsFlags & 0xC0) {
	          pes = {}; // the PTS and DTS are not written out directly. For information
	          // on how they are encoded, see
	          // http://dvd.sourceforge.net/dvdinfo/pes-hdr.html

	          pes.pts = (packet[offset + 9] & 0x0E) << 27 | (packet[offset + 10] & 0xFF) << 20 | (packet[offset + 11] & 0xFE) << 12 | (packet[offset + 12] & 0xFF) << 5 | (packet[offset + 13] & 0xFE) >>> 3;
	          pes.pts *= 4; // Left shift by 2

	          pes.pts += (packet[offset + 13] & 0x06) >>> 1; // OR by the two LSBs

	          pes.dts = pes.pts;

	          if (ptsDtsFlags & 0x40) {
	            pes.dts = (packet[offset + 14] & 0x0E) << 27 | (packet[offset + 15] & 0xFF) << 20 | (packet[offset + 16] & 0xFE) << 12 | (packet[offset + 17] & 0xFF) << 5 | (packet[offset + 18] & 0xFE) >>> 3;
	            pes.dts *= 4; // Left shift by 2

	            pes.dts += (packet[offset + 18] & 0x06) >>> 1; // OR by the two LSBs
	          }
	        }

	        return pes;
	      };

	      var parseNalUnitType = function parseNalUnitType(type) {
	        switch (type) {
	          case 0x05:
	            return 'slice_layer_without_partitioning_rbsp_idr';

	          case 0x06:
	            return 'sei_rbsp';

	          case 0x07:
	            return 'seq_parameter_set_rbsp';

	          case 0x08:
	            return 'pic_parameter_set_rbsp';

	          case 0x09:
	            return 'access_unit_delimiter_rbsp';

	          default:
	            return null;
	        }
	      };

	      var videoPacketContainsKeyFrame = function videoPacketContainsKeyFrame(packet) {
	        var offset = 4 + parseAdaptionField(packet);
	        var frameBuffer = packet.subarray(offset);
	        var frameI = 0;
	        var frameSyncPoint = 0;
	        var foundKeyFrame = false;
	        var nalType; // advance the sync point to a NAL start, if necessary

	        for (; frameSyncPoint < frameBuffer.byteLength - 3; frameSyncPoint++) {
	          if (frameBuffer[frameSyncPoint + 2] === 1) {
	            // the sync point is properly aligned
	            frameI = frameSyncPoint + 5;
	            break;
	          }
	        }

	        while (frameI < frameBuffer.byteLength) {
	          // look at the current byte to determine if we've hit the end of
	          // a NAL unit boundary
	          switch (frameBuffer[frameI]) {
	            case 0:
	              // skip past non-sync sequences
	              if (frameBuffer[frameI - 1] !== 0) {
	                frameI += 2;
	                break;
	              } else if (frameBuffer[frameI - 2] !== 0) {
	                frameI++;
	                break;
	              }

	              if (frameSyncPoint + 3 !== frameI - 2) {
	                nalType = parseNalUnitType(frameBuffer[frameSyncPoint + 3] & 0x1f);

	                if (nalType === 'slice_layer_without_partitioning_rbsp_idr') {
	                  foundKeyFrame = true;
	                }
	              } // drop trailing zeroes


	              do {
	                frameI++;
	              } while (frameBuffer[frameI] !== 1 && frameI < frameBuffer.length);

	              frameSyncPoint = frameI - 2;
	              frameI += 3;
	              break;

	            case 1:
	              // skip past non-sync sequences
	              if (frameBuffer[frameI - 1] !== 0 || frameBuffer[frameI - 2] !== 0) {
	                frameI += 3;
	                break;
	              }

	              nalType = parseNalUnitType(frameBuffer[frameSyncPoint + 3] & 0x1f);

	              if (nalType === 'slice_layer_without_partitioning_rbsp_idr') {
	                foundKeyFrame = true;
	              }

	              frameSyncPoint = frameI - 2;
	              frameI += 3;
	              break;

	            default:
	              // the current byte isn't a one or zero, so it cannot be part
	              // of a sync sequence
	              frameI += 3;
	              break;
	          }
	        }

	        frameBuffer = frameBuffer.subarray(frameSyncPoint);
	        frameI -= frameSyncPoint;
	        frameSyncPoint = 0; // parse the final nal

	        if (frameBuffer && frameBuffer.byteLength > 3) {
	          nalType = parseNalUnitType(frameBuffer[frameSyncPoint + 3] & 0x1f);

	          if (nalType === 'slice_layer_without_partitioning_rbsp_idr') {
	            foundKeyFrame = true;
	          }
	        }

	        return foundKeyFrame;
	      };

	      module.exports = {
	        parseType: parseType,
	        parsePat: parsePat,
	        parsePmt: parsePmt,
	        parsePayloadUnitStartIndicator: parsePayloadUnitStartIndicator,
	        parsePesType: parsePesType,
	        parsePesTime: parsePesTime,
	        videoPacketContainsKeyFrame: videoPacketContainsKeyFrame
	      };
	    }, {
	      "./stream-types.js": 19
	    }],
	    19: [function (require, module, exports) {

	      module.exports = {
	        H264_STREAM_TYPE: 0x1B,
	        ADTS_STREAM_TYPE: 0x0F,
	        METADATA_STREAM_TYPE: 0x15
	      };
	    }, {}],
	    20: [function (require, module, exports) {

	      var Stream = require('../utils/stream');

	      var MAX_TS = 8589934592;
	      var RO_THRESH = 4294967296;

	      var handleRollover = function handleRollover(value, reference) {
	        var direction = 1;

	        if (value > reference) {
	          // If the current timestamp value is greater than our reference timestamp and we detect a
	          // timestamp rollover, this means the roll over is happening in the opposite direction.
	          // Example scenario: Enter a long stream/video just after a rollover occurred. The reference
	          // point will be set to a small number, e.g. 1. The user then seeks backwards over the
	          // rollover point. In loading this segment, the timestamp values will be very large,
	          // e.g. 2^33 - 1. Since this comes before the data we loaded previously, we want to adjust
	          // the time stamp to be `value - 2^33`.
	          direction = -1;
	        } // Note: A seek forwards or back that is greater than the RO_THRESH (2^32, ~13 hours) will
	        // cause an incorrect adjustment.


	        while (Math.abs(reference - value) > RO_THRESH) {
	          value += direction * MAX_TS;
	        }

	        return value;
	      };

	      var TimestampRolloverStream = function TimestampRolloverStream(type) {
	        var lastDTS, referenceDTS;
	        TimestampRolloverStream.prototype.init.call(this);
	        this.type_ = type;

	        this.push = function (data) {
	          if (data.type !== this.type_) {
	            return;
	          }

	          if (referenceDTS === undefined) {
	            referenceDTS = data.dts;
	          }

	          data.dts = handleRollover(data.dts, referenceDTS);
	          data.pts = handleRollover(data.pts, referenceDTS);
	          lastDTS = data.dts;
	          this.trigger('data', data);
	        };

	        this.flush = function () {
	          referenceDTS = lastDTS;
	          this.trigger('done');
	        };

	        this.discontinuity = function () {
	          referenceDTS = void 0;
	          lastDTS = void 0;
	        };
	      };

	      TimestampRolloverStream.prototype = new Stream();
	      module.exports = {
	        TimestampRolloverStream: TimestampRolloverStream,
	        handleRollover: handleRollover
	      };
	    }, {
	      "../utils/stream": 30
	    }],
	    21: [function (require, module, exports) {
	      module.exports = {
	        generator: require('./mp4-generator'),
	        Transmuxer: require('./transmuxer').Transmuxer,
	        AudioSegmentStream: require('./transmuxer').AudioSegmentStream,
	        VideoSegmentStream: require('./transmuxer').VideoSegmentStream
	      };
	    }, {
	      "./mp4-generator": 22,
	      "./transmuxer": 24
	    }],
	    22: [function (require, module, exports) {

	      var UINT32_MAX = Math.pow(2, 32) - 1;
	      var box, dinf, esds, ftyp, mdat, mfhd, minf, moof, moov, mvex, mvhd, trak, tkhd, mdia, mdhd, hdlr, sdtp, stbl, stsd, traf, trex, trun, types, MAJOR_BRAND, MINOR_VERSION, AVC1_BRAND, VIDEO_HDLR, AUDIO_HDLR, HDLR_TYPES, VMHD, SMHD, DREF, STCO, STSC, STSZ, STTS; // pre-calculate constants

	      (function () {
	        var i;
	        types = {
	          avc1: [],
	          // codingname
	          avcC: [],
	          btrt: [],
	          dinf: [],
	          dref: [],
	          esds: [],
	          ftyp: [],
	          hdlr: [],
	          mdat: [],
	          mdhd: [],
	          mdia: [],
	          mfhd: [],
	          minf: [],
	          moof: [],
	          moov: [],
	          mp4a: [],
	          // codingname
	          mvex: [],
	          mvhd: [],
	          sdtp: [],
	          smhd: [],
	          stbl: [],
	          stco: [],
	          stsc: [],
	          stsd: [],
	          stsz: [],
	          stts: [],
	          styp: [],
	          tfdt: [],
	          tfhd: [],
	          traf: [],
	          trak: [],
	          trun: [],
	          trex: [],
	          tkhd: [],
	          vmhd: []
	        }; // In environments where Uint8Array is undefined (e.g., IE8), skip set up so that we
	        // don't throw an error

	        if (typeof Uint8Array === 'undefined') {
	          return;
	        }

	        for (i in types) {
	          if (types.hasOwnProperty(i)) {
	            types[i] = [i.charCodeAt(0), i.charCodeAt(1), i.charCodeAt(2), i.charCodeAt(3)];
	          }
	        }

	        MAJOR_BRAND = new Uint8Array(['i'.charCodeAt(0), 's'.charCodeAt(0), 'o'.charCodeAt(0), 'm'.charCodeAt(0)]);
	        AVC1_BRAND = new Uint8Array(['a'.charCodeAt(0), 'v'.charCodeAt(0), 'c'.charCodeAt(0), '1'.charCodeAt(0)]);
	        MINOR_VERSION = new Uint8Array([0, 0, 0, 1]);
	        VIDEO_HDLR = new Uint8Array([0x00, // version 0
	        0x00, 0x00, 0x00, // flags
	        0x00, 0x00, 0x00, 0x00, // pre_defined
	        0x76, 0x69, 0x64, 0x65, // handler_type: 'vide'
	        0x00, 0x00, 0x00, 0x00, // reserved
	        0x00, 0x00, 0x00, 0x00, // reserved
	        0x00, 0x00, 0x00, 0x00, // reserved
	        0x56, 0x69, 0x64, 0x65, 0x6f, 0x48, 0x61, 0x6e, 0x64, 0x6c, 0x65, 0x72, 0x00 // name: 'VideoHandler'
	        ]);
	        AUDIO_HDLR = new Uint8Array([0x00, // version 0
	        0x00, 0x00, 0x00, // flags
	        0x00, 0x00, 0x00, 0x00, // pre_defined
	        0x73, 0x6f, 0x75, 0x6e, // handler_type: 'soun'
	        0x00, 0x00, 0x00, 0x00, // reserved
	        0x00, 0x00, 0x00, 0x00, // reserved
	        0x00, 0x00, 0x00, 0x00, // reserved
	        0x53, 0x6f, 0x75, 0x6e, 0x64, 0x48, 0x61, 0x6e, 0x64, 0x6c, 0x65, 0x72, 0x00 // name: 'SoundHandler'
	        ]);
	        HDLR_TYPES = {
	          video: VIDEO_HDLR,
	          audio: AUDIO_HDLR
	        };
	        DREF = new Uint8Array([0x00, // version 0
	        0x00, 0x00, 0x00, // flags
	        0x00, 0x00, 0x00, 0x01, // entry_count
	        0x00, 0x00, 0x00, 0x0c, // entry_size
	        0x75, 0x72, 0x6c, 0x20, // 'url' type
	        0x00, // version 0
	        0x00, 0x00, 0x01 // entry_flags
	        ]);
	        SMHD = new Uint8Array([0x00, // version
	        0x00, 0x00, 0x00, // flags
	        0x00, 0x00, // balance, 0 means centered
	        0x00, 0x00 // reserved
	        ]);
	        STCO = new Uint8Array([0x00, // version
	        0x00, 0x00, 0x00, // flags
	        0x00, 0x00, 0x00, 0x00 // entry_count
	        ]);
	        STSC = STCO;
	        STSZ = new Uint8Array([0x00, // version
	        0x00, 0x00, 0x00, // flags
	        0x00, 0x00, 0x00, 0x00, // sample_size
	        0x00, 0x00, 0x00, 0x00 // sample_count
	        ]);
	        STTS = STCO;
	        VMHD = new Uint8Array([0x00, // version
	        0x00, 0x00, 0x01, // flags
	        0x00, 0x00, // graphicsmode
	        0x00, 0x00, 0x00, 0x00, 0x00, 0x00 // opcolor
	        ]);
	      })();

	      box = function box(type) {
	        var payload = [],
	            size = 0,
	            i,
	            result,
	            view;

	        for (i = 1; i < arguments.length; i++) {
	          payload.push(arguments[i]);
	        }

	        i = payload.length; // calculate the total size we need to allocate

	        while (i--) {
	          size += payload[i].byteLength;
	        }

	        result = new Uint8Array(size + 8);
	        view = new DataView(result.buffer, result.byteOffset, result.byteLength);
	        view.setUint32(0, result.byteLength);
	        result.set(type, 4); // copy the payload into the result

	        for (i = 0, size = 8; i < payload.length; i++) {
	          result.set(payload[i], size);
	          size += payload[i].byteLength;
	        }

	        return result;
	      };

	      dinf = function dinf() {
	        return box(types.dinf, box(types.dref, DREF));
	      };

	      esds = function esds(track) {
	        return box(types.esds, new Uint8Array([0x00, // version
	        0x00, 0x00, 0x00, // flags
	        // ES_Descriptor
	        0x03, // tag, ES_DescrTag
	        0x19, // length
	        0x00, 0x00, // ES_ID
	        0x00, // streamDependenceFlag, URL_flag, reserved, streamPriority
	        // DecoderConfigDescriptor
	        0x04, // tag, DecoderConfigDescrTag
	        0x11, // length
	        0x40, // object type
	        0x15, // streamType
	        0x00, 0x06, 0x00, // bufferSizeDB
	        0x00, 0x00, 0xda, 0xc0, // maxBitrate
	        0x00, 0x00, 0xda, 0xc0, // avgBitrate
	        // DecoderSpecificInfo
	        0x05, // tag, DecoderSpecificInfoTag
	        0x02, // length
	        // ISO/IEC 14496-3, AudioSpecificConfig
	        // for samplingFrequencyIndex see ISO/IEC 13818-7:2006, 8.1.3.2.2, Table 35
	        track.audioobjecttype << 3 | track.samplingfrequencyindex >>> 1, track.samplingfrequencyindex << 7 | track.channelcount << 3, 0x06, 0x01, 0x02 // GASpecificConfig
	        ]));
	      };

	      ftyp = function ftyp() {
	        return box(types.ftyp, MAJOR_BRAND, MINOR_VERSION, MAJOR_BRAND, AVC1_BRAND);
	      };

	      hdlr = function hdlr(type) {
	        return box(types.hdlr, HDLR_TYPES[type]);
	      };

	      mdat = function mdat(data) {
	        return box(types.mdat, data);
	      };

	      mdhd = function mdhd(track) {
	        var result = new Uint8Array([0x00, // version 0
	        0x00, 0x00, 0x00, // flags
	        0x00, 0x00, 0x00, 0x02, // creation_time
	        0x00, 0x00, 0x00, 0x03, // modification_time
	        0x00, 0x01, 0x5f, 0x90, // timescale, 90,000 "ticks" per second
	        track.duration >>> 24 & 0xFF, track.duration >>> 16 & 0xFF, track.duration >>> 8 & 0xFF, track.duration & 0xFF, // duration
	        0x55, 0xc4, // 'und' language (undetermined)
	        0x00, 0x00]); // Use the sample rate from the track metadata, when it is
	        // defined. The sample rate can be parsed out of an ADTS header, for
	        // instance.

	        if (track.samplerate) {
	          result[12] = track.samplerate >>> 24 & 0xFF;
	          result[13] = track.samplerate >>> 16 & 0xFF;
	          result[14] = track.samplerate >>> 8 & 0xFF;
	          result[15] = track.samplerate & 0xFF;
	        }

	        return box(types.mdhd, result);
	      };

	      mdia = function mdia(track) {
	        return box(types.mdia, mdhd(track), hdlr(track.type), minf(track));
	      };

	      mfhd = function mfhd(sequenceNumber) {
	        return box(types.mfhd, new Uint8Array([0x00, 0x00, 0x00, 0x00, // flags
	        (sequenceNumber & 0xFF000000) >> 24, (sequenceNumber & 0xFF0000) >> 16, (sequenceNumber & 0xFF00) >> 8, sequenceNumber & 0xFF // sequence_number
	        ]));
	      };

	      minf = function minf(track) {
	        return box(types.minf, track.type === 'video' ? box(types.vmhd, VMHD) : box(types.smhd, SMHD), dinf(), stbl(track));
	      };

	      moof = function moof(sequenceNumber, tracks) {
	        var trackFragments = [],
	            i = tracks.length; // build traf boxes for each track fragment

	        while (i--) {
	          trackFragments[i] = traf(tracks[i]);
	        }

	        return box.apply(null, [types.moof, mfhd(sequenceNumber)].concat(trackFragments));
	      };
	      /**
	       * Returns a movie box.
	       * @param tracks {array} the tracks associated with this movie
	       * @see ISO/IEC 14496-12:2012(E), section 8.2.1
	       */


	      moov = function moov(tracks) {
	        var i = tracks.length,
	            boxes = [];

	        while (i--) {
	          boxes[i] = trak(tracks[i]);
	        }

	        return box.apply(null, [types.moov, mvhd(0xffffffff)].concat(boxes).concat(mvex(tracks)));
	      };

	      mvex = function mvex(tracks) {
	        var i = tracks.length,
	            boxes = [];

	        while (i--) {
	          boxes[i] = trex(tracks[i]);
	        }

	        return box.apply(null, [types.mvex].concat(boxes));
	      };

	      mvhd = function mvhd(duration) {
	        var bytes = new Uint8Array([0x00, // version 0
	        0x00, 0x00, 0x00, // flags
	        0x00, 0x00, 0x00, 0x01, // creation_time
	        0x00, 0x00, 0x00, 0x02, // modification_time
	        0x00, 0x01, 0x5f, 0x90, // timescale, 90,000 "ticks" per second
	        (duration & 0xFF000000) >> 24, (duration & 0xFF0000) >> 16, (duration & 0xFF00) >> 8, duration & 0xFF, // duration
	        0x00, 0x01, 0x00, 0x00, // 1.0 rate
	        0x01, 0x00, // 1.0 volume
	        0x00, 0x00, // reserved
	        0x00, 0x00, 0x00, 0x00, // reserved
	        0x00, 0x00, 0x00, 0x00, // reserved
	        0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, // transformation: unity matrix
	        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // pre_defined
	        0xff, 0xff, 0xff, 0xff // next_track_ID
	        ]);
	        return box(types.mvhd, bytes);
	      };

	      sdtp = function sdtp(track) {
	        var samples = track.samples || [],
	            bytes = new Uint8Array(4 + samples.length),
	            flags,
	            i; // leave the full box header (4 bytes) all zero
	        // write the sample table

	        for (i = 0; i < samples.length; i++) {
	          flags = samples[i].flags;
	          bytes[i + 4] = flags.dependsOn << 4 | flags.isDependedOn << 2 | flags.hasRedundancy;
	        }

	        return box(types.sdtp, bytes);
	      };

	      stbl = function stbl(track) {
	        return box(types.stbl, stsd(track), box(types.stts, STTS), box(types.stsc, STSC), box(types.stsz, STSZ), box(types.stco, STCO));
	      };

	      (function () {
	        var videoSample, audioSample;

	        stsd = function stsd(track) {
	          return box(types.stsd, new Uint8Array([0x00, // version 0
	          0x00, 0x00, 0x00, // flags
	          0x00, 0x00, 0x00, 0x01]), track.type === 'video' ? videoSample(track) : audioSample(track));
	        };

	        videoSample = function videoSample(track) {
	          var sps = track.sps || [],
	              pps = track.pps || [],
	              sequenceParameterSets = [],
	              pictureParameterSets = [],
	              i; // assemble the SPSs

	          for (i = 0; i < sps.length; i++) {
	            sequenceParameterSets.push((sps[i].byteLength & 0xFF00) >>> 8);
	            sequenceParameterSets.push(sps[i].byteLength & 0xFF); // sequenceParameterSetLength

	            sequenceParameterSets = sequenceParameterSets.concat(Array.prototype.slice.call(sps[i])); // SPS
	          } // assemble the PPSs


	          for (i = 0; i < pps.length; i++) {
	            pictureParameterSets.push((pps[i].byteLength & 0xFF00) >>> 8);
	            pictureParameterSets.push(pps[i].byteLength & 0xFF);
	            pictureParameterSets = pictureParameterSets.concat(Array.prototype.slice.call(pps[i]));
	          }

	          return box(types.avc1, new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // reserved
	          0x00, 0x01, // data_reference_index
	          0x00, 0x00, // pre_defined
	          0x00, 0x00, // reserved
	          0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // pre_defined
	          (track.width & 0xff00) >> 8, track.width & 0xff, // width
	          (track.height & 0xff00) >> 8, track.height & 0xff, // height
	          0x00, 0x48, 0x00, 0x00, // horizresolution
	          0x00, 0x48, 0x00, 0x00, // vertresolution
	          0x00, 0x00, 0x00, 0x00, // reserved
	          0x00, 0x01, // frame_count
	          0x13, 0x76, 0x69, 0x64, 0x65, 0x6f, 0x6a, 0x73, 0x2d, 0x63, 0x6f, 0x6e, 0x74, 0x72, 0x69, 0x62, 0x2d, 0x68, 0x6c, 0x73, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // compressorname
	          0x00, 0x18, // depth = 24
	          0x11, 0x11 // pre_defined = -1
	          ]), box(types.avcC, new Uint8Array([0x01, // configurationVersion
	          track.profileIdc, // AVCProfileIndication
	          track.profileCompatibility, // profile_compatibility
	          track.levelIdc, // AVCLevelIndication
	          0xff // lengthSizeMinusOne, hard-coded to 4 bytes
	          ].concat([sps.length // numOfSequenceParameterSets
	          ]).concat(sequenceParameterSets).concat([pps.length // numOfPictureParameterSets
	          ]).concat(pictureParameterSets))), // "PPS"
	          box(types.btrt, new Uint8Array([0x00, 0x1c, 0x9c, 0x80, // bufferSizeDB
	          0x00, 0x2d, 0xc6, 0xc0, // maxBitrate
	          0x00, 0x2d, 0xc6, 0xc0])) // avgBitrate
	          );
	        };

	        audioSample = function audioSample(track) {
	          return box(types.mp4a, new Uint8Array([// SampleEntry, ISO/IEC 14496-12
	          0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // reserved
	          0x00, 0x01, // data_reference_index
	          // AudioSampleEntry, ISO/IEC 14496-12
	          0x00, 0x00, 0x00, 0x00, // reserved
	          0x00, 0x00, 0x00, 0x00, // reserved
	          (track.channelcount & 0xff00) >> 8, track.channelcount & 0xff, // channelcount
	          (track.samplesize & 0xff00) >> 8, track.samplesize & 0xff, // samplesize
	          0x00, 0x00, // pre_defined
	          0x00, 0x00, // reserved
	          (track.samplerate & 0xff00) >> 8, track.samplerate & 0xff, 0x00, 0x00 // samplerate, 16.16
	          // MP4AudioSampleEntry, ISO/IEC 14496-14
	          ]), esds(track));
	        };
	      })();

	      tkhd = function tkhd(track) {
	        var result = new Uint8Array([0x00, // version 0
	        0x00, 0x00, 0x07, // flags
	        0x00, 0x00, 0x00, 0x00, // creation_time
	        0x00, 0x00, 0x00, 0x00, // modification_time
	        (track.id & 0xFF000000) >> 24, (track.id & 0xFF0000) >> 16, (track.id & 0xFF00) >> 8, track.id & 0xFF, // track_ID
	        0x00, 0x00, 0x00, 0x00, // reserved
	        (track.duration & 0xFF000000) >> 24, (track.duration & 0xFF0000) >> 16, (track.duration & 0xFF00) >> 8, track.duration & 0xFF, // duration
	        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // reserved
	        0x00, 0x00, // layer
	        0x00, 0x00, // alternate_group
	        0x01, 0x00, // non-audio track volume
	        0x00, 0x00, // reserved
	        0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, // transformation: unity matrix
	        (track.width & 0xFF00) >> 8, track.width & 0xFF, 0x00, 0x00, // width
	        (track.height & 0xFF00) >> 8, track.height & 0xFF, 0x00, 0x00 // height
	        ]);
	        return box(types.tkhd, result);
	      };
	      /**
	       * Generate a track fragment (traf) box. A traf box collects metadata
	       * about tracks in a movie fragment (moof) box.
	       */


	      traf = function traf(track) {
	        var trackFragmentHeader, trackFragmentDecodeTime, trackFragmentRun, sampleDependencyTable, dataOffset, upperWordBaseMediaDecodeTime, lowerWordBaseMediaDecodeTime;
	        trackFragmentHeader = box(types.tfhd, new Uint8Array([0x00, // version 0
	        0x00, 0x00, 0x3a, // flags
	        (track.id & 0xFF000000) >> 24, (track.id & 0xFF0000) >> 16, (track.id & 0xFF00) >> 8, track.id & 0xFF, // track_ID
	        0x00, 0x00, 0x00, 0x01, // sample_description_index
	        0x00, 0x00, 0x00, 0x00, // default_sample_duration
	        0x00, 0x00, 0x00, 0x00, // default_sample_size
	        0x00, 0x00, 0x00, 0x00 // default_sample_flags
	        ]));
	        upperWordBaseMediaDecodeTime = Math.floor(track.baseMediaDecodeTime / (UINT32_MAX + 1));
	        lowerWordBaseMediaDecodeTime = Math.floor(track.baseMediaDecodeTime % (UINT32_MAX + 1));
	        trackFragmentDecodeTime = box(types.tfdt, new Uint8Array([0x01, // version 1
	        0x00, 0x00, 0x00, // flags
	        // baseMediaDecodeTime
	        upperWordBaseMediaDecodeTime >>> 24 & 0xFF, upperWordBaseMediaDecodeTime >>> 16 & 0xFF, upperWordBaseMediaDecodeTime >>> 8 & 0xFF, upperWordBaseMediaDecodeTime & 0xFF, lowerWordBaseMediaDecodeTime >>> 24 & 0xFF, lowerWordBaseMediaDecodeTime >>> 16 & 0xFF, lowerWordBaseMediaDecodeTime >>> 8 & 0xFF, lowerWordBaseMediaDecodeTime & 0xFF])); // the data offset specifies the number of bytes from the start of
	        // the containing moof to the first payload byte of the associated
	        // mdat

	        dataOffset = 32 + // tfhd
	        20 + // tfdt
	        8 + // traf header
	        16 + // mfhd
	        8 + // moof header
	        8; // mdat header
	        // audio tracks require less metadata

	        if (track.type === 'audio') {
	          trackFragmentRun = trun(track, dataOffset);
	          return box(types.traf, trackFragmentHeader, trackFragmentDecodeTime, trackFragmentRun);
	        } // video tracks should contain an independent and disposable samples
	        // box (sdtp)
	        // generate one and adjust offsets to match


	        sampleDependencyTable = sdtp(track);
	        trackFragmentRun = trun(track, sampleDependencyTable.length + dataOffset);
	        return box(types.traf, trackFragmentHeader, trackFragmentDecodeTime, trackFragmentRun, sampleDependencyTable);
	      };
	      /**
	       * Generate a track box.
	       * @param track {object} a track definition
	       * @return {Uint8Array} the track box
	       */


	      trak = function trak(track) {
	        track.duration = track.duration || 0xffffffff;
	        return box(types.trak, tkhd(track), mdia(track));
	      };

	      trex = function trex(track) {
	        var result = new Uint8Array([0x00, // version 0
	        0x00, 0x00, 0x00, // flags
	        (track.id & 0xFF000000) >> 24, (track.id & 0xFF0000) >> 16, (track.id & 0xFF00) >> 8, track.id & 0xFF, // track_ID
	        0x00, 0x00, 0x00, 0x01, // default_sample_description_index
	        0x00, 0x00, 0x00, 0x00, // default_sample_duration
	        0x00, 0x00, 0x00, 0x00, // default_sample_size
	        0x00, 0x01, 0x00, 0x01 // default_sample_flags
	        ]); // the last two bytes of default_sample_flags is the sample
	        // degradation priority, a hint about the importance of this sample
	        // relative to others. Lower the degradation priority for all sample
	        // types other than video.

	        if (track.type !== 'video') {
	          result[result.length - 1] = 0x00;
	        }

	        return box(types.trex, result);
	      };

	      (function () {
	        var audioTrun, videoTrun, trunHeader; // This method assumes all samples are uniform. That is, if a
	        // duration is present for the first sample, it will be present for
	        // all subsequent samples.
	        // see ISO/IEC 14496-12:2012, Section 8.8.8.1

	        trunHeader = function trunHeader(samples, offset) {
	          var durationPresent = 0,
	              sizePresent = 0,
	              flagsPresent = 0,
	              compositionTimeOffset = 0; // trun flag constants

	          if (samples.length) {
	            if (samples[0].duration !== undefined) {
	              durationPresent = 0x1;
	            }

	            if (samples[0].size !== undefined) {
	              sizePresent = 0x2;
	            }

	            if (samples[0].flags !== undefined) {
	              flagsPresent = 0x4;
	            }

	            if (samples[0].compositionTimeOffset !== undefined) {
	              compositionTimeOffset = 0x8;
	            }
	          }

	          return [0x00, // version 0
	          0x00, durationPresent | sizePresent | flagsPresent | compositionTimeOffset, 0x01, // flags
	          (samples.length & 0xFF000000) >>> 24, (samples.length & 0xFF0000) >>> 16, (samples.length & 0xFF00) >>> 8, samples.length & 0xFF, // sample_count
	          (offset & 0xFF000000) >>> 24, (offset & 0xFF0000) >>> 16, (offset & 0xFF00) >>> 8, offset & 0xFF // data_offset
	          ];
	        };

	        videoTrun = function videoTrun(track, offset) {
	          var bytes, samples, sample, i;
	          samples = track.samples || [];
	          offset += 8 + 12 + 16 * samples.length;
	          bytes = trunHeader(samples, offset);

	          for (i = 0; i < samples.length; i++) {
	            sample = samples[i];
	            bytes = bytes.concat([(sample.duration & 0xFF000000) >>> 24, (sample.duration & 0xFF0000) >>> 16, (sample.duration & 0xFF00) >>> 8, sample.duration & 0xFF, // sample_duration
	            (sample.size & 0xFF000000) >>> 24, (sample.size & 0xFF0000) >>> 16, (sample.size & 0xFF00) >>> 8, sample.size & 0xFF, // sample_size
	            sample.flags.isLeading << 2 | sample.flags.dependsOn, sample.flags.isDependedOn << 6 | sample.flags.hasRedundancy << 4 | sample.flags.paddingValue << 1 | sample.flags.isNonSyncSample, sample.flags.degradationPriority & 0xF0 << 8, sample.flags.degradationPriority & 0x0F, // sample_flags
	            (sample.compositionTimeOffset & 0xFF000000) >>> 24, (sample.compositionTimeOffset & 0xFF0000) >>> 16, (sample.compositionTimeOffset & 0xFF00) >>> 8, sample.compositionTimeOffset & 0xFF // sample_composition_time_offset
	            ]);
	          }

	          return box(types.trun, new Uint8Array(bytes));
	        };

	        audioTrun = function audioTrun(track, offset) {
	          var bytes, samples, sample, i;
	          samples = track.samples || [];
	          offset += 8 + 12 + 8 * samples.length;
	          bytes = trunHeader(samples, offset);

	          for (i = 0; i < samples.length; i++) {
	            sample = samples[i];
	            bytes = bytes.concat([(sample.duration & 0xFF000000) >>> 24, (sample.duration & 0xFF0000) >>> 16, (sample.duration & 0xFF00) >>> 8, sample.duration & 0xFF, // sample_duration
	            (sample.size & 0xFF000000) >>> 24, (sample.size & 0xFF0000) >>> 16, (sample.size & 0xFF00) >>> 8, sample.size & 0xFF]); // sample_size
	          }

	          return box(types.trun, new Uint8Array(bytes));
	        };

	        trun = function trun(track, offset) {
	          if (track.type === 'audio') {
	            return audioTrun(track, offset);
	          }

	          return videoTrun(track, offset);
	        };
	      })();

	      module.exports = {
	        ftyp: ftyp,
	        mdat: mdat,
	        moof: moof,
	        moov: moov,
	        initSegment: function initSegment(tracks) {
	          var fileType = ftyp(),
	              movie = moov(tracks),
	              result;
	          result = new Uint8Array(fileType.byteLength + movie.byteLength);
	          result.set(fileType);
	          result.set(movie, fileType.byteLength);
	          return result;
	        }
	      };
	    }, {}],
	    23: [function (require, module, exports) {

	      var _findBox, parseType, timescale, startTime; // Find the data for a box specified by its path


	      _findBox = function findBox(data, path) {
	        var results = [],
	            i,
	            size,
	            type,
	            end,
	            subresults;

	        if (!path.length) {
	          // short-circuit the search for empty paths
	          return null;
	        }

	        for (i = 0; i < data.byteLength;) {
	          size = data[i] << 24;
	          size |= data[i + 1] << 16;
	          size |= data[i + 2] << 8;
	          size |= data[i + 3];
	          type = parseType(data.subarray(i + 4, i + 8));
	          end = size > 1 ? i + size : data.byteLength;

	          if (type === path[0]) {
	            if (path.length === 1) {
	              // this is the end of the path and we've found the box we were
	              // looking for
	              results.push(data.subarray(i + 8, end));
	            } else {
	              // recursively search for the next box along the path
	              subresults = _findBox(data.subarray(i + 8, end), path.slice(1));

	              if (subresults.length) {
	                results = results.concat(subresults);
	              }
	            }
	          }

	          i = end;
	        } // we've finished searching all of data


	        return results;
	      };
	      /**
	       * Returns the string representation of an ASCII encoded four byte buffer.
	       * @param buffer {Uint8Array} a four-byte buffer to translate
	       * @return {string} the corresponding string
	       */


	      parseType = function parseType(buffer) {
	        var result = '';
	        result += String.fromCharCode(buffer[0]);
	        result += String.fromCharCode(buffer[1]);
	        result += String.fromCharCode(buffer[2]);
	        result += String.fromCharCode(buffer[3]);
	        return result;
	      };
	      /**
	       * Parses an MP4 initialization segment and extracts the timescale
	       * values for any declared tracks. Timescale values indicate the
	       * number of clock ticks per second to assume for time-based values
	       * elsewhere in the MP4.
	       *
	       * To determine the start time of an MP4, you need two pieces of
	       * information: the timescale unit and the earliest base media decode
	       * time. Multiple timescales can be specified within an MP4 but the
	       * base media decode time is always expressed in the timescale from
	       * the media header box for the track:
	       * ```
	       * moov > trak > mdia > mdhd.timescale
	       * ```
	       * @param init {Uint8Array} the bytes of the init segment
	       * @return {object} a hash of track ids to timescale values or null if
	       * the init segment is malformed.
	       */


	      timescale = function timescale(init) {
	        var result = {},
	            traks = _findBox(init, ['moov', 'trak']); // mdhd timescale


	        return traks.reduce(function (result, trak) {
	          var tkhd, version, index, id, mdhd;
	          tkhd = _findBox(trak, ['tkhd'])[0];

	          if (!tkhd) {
	            return null;
	          }

	          version = tkhd[0];
	          index = version === 0 ? 12 : 20;
	          id = tkhd[index] << 24 | tkhd[index + 1] << 16 | tkhd[index + 2] << 8 | tkhd[index + 3];
	          mdhd = _findBox(trak, ['mdia', 'mdhd'])[0];

	          if (!mdhd) {
	            return null;
	          }

	          version = mdhd[0];
	          index = version === 0 ? 12 : 20;
	          result[id] = mdhd[index] << 24 | mdhd[index + 1] << 16 | mdhd[index + 2] << 8 | mdhd[index + 3];
	          return result;
	        }, result);
	      };
	      /**
	       * Determine the base media decode start time, in seconds, for an MP4
	       * fragment. If multiple fragments are specified, the earliest time is
	       * returned.
	       *
	       * The base media decode time can be parsed from track fragment
	       * metadata:
	       * ```
	       * moof > traf > tfdt.baseMediaDecodeTime
	       * ```
	       * It requires the timescale value from the mdhd to interpret.
	       *
	       * @param timescale {object} a hash of track ids to timescale values.
	       * @return {number} the earliest base media decode start time for the
	       * fragment, in seconds
	       */


	      startTime = function startTime(timescale, fragment) {
	        var trafs, baseTimes, result; // we need info from two childrend of each track fragment box

	        trafs = _findBox(fragment, ['moof', 'traf']); // determine the start times for each track

	        baseTimes = [].concat.apply([], trafs.map(function (traf) {
	          return _findBox(traf, ['tfhd']).map(function (tfhd) {
	            var id, scale, baseTime; // get the track id from the tfhd

	            id = tfhd[4] << 24 | tfhd[5] << 16 | tfhd[6] << 8 | tfhd[7]; // assume a 90kHz clock if no timescale was specified

	            scale = timescale[id] || 90e3; // get the base media decode time from the tfdt

	            baseTime = _findBox(traf, ['tfdt']).map(function (tfdt) {
	              var version, result;
	              version = tfdt[0];
	              result = tfdt[4] << 24 | tfdt[5] << 16 | tfdt[6] << 8 | tfdt[7];

	              if (version === 1) {
	                result *= Math.pow(2, 32);
	                result += tfdt[8] << 24 | tfdt[9] << 16 | tfdt[10] << 8 | tfdt[11];
	              }

	              return result;
	            })[0];
	            baseTime = baseTime || Infinity; // convert base time to seconds

	            return baseTime / scale;
	          });
	        })); // return the minimum

	        result = Math.min.apply(null, baseTimes);
	        return isFinite(result) ? result : 0;
	      };

	      module.exports = {
	        parseType: parseType,
	        timescale: timescale,
	        startTime: startTime
	      };
	    }, {}],
	    24: [function (require, module, exports) {

	      var Stream = require('../utils/stream.js');

	      var mp4 = require('./mp4-generator.js');

	      var m2ts = require('../m2ts/m2ts.js');

	      var AdtsStream = require('../codecs/adts.js');

	      var H264Stream = require('../codecs/h264').H264Stream;

	      var AacStream = require('../aac');

	      var coneOfSilence = require('../data/silence');

	      var clock = require('../utils/clock'); // constants


	      var AUDIO_PROPERTIES = ['audioobjecttype', 'channelcount', 'samplerate', 'samplingfrequencyindex', 'samplesize'];
	      var VIDEO_PROPERTIES = ['width', 'height', 'profileIdc', 'levelIdc', 'profileCompatibility'];
	      var ONE_SECOND_IN_TS = 90000; // 90kHz clock
	      // object types

	      var _VideoSegmentStream2, _AudioSegmentStream2, _Transmuxer2, _CoalesceStream; // Helper functions


	      var createDefaultSample, isLikelyAacData, collectDtsInfo, clearDtsInfo, calculateTrackBaseMediaDecodeTime, arrayEquals, sumFrameByteLengths;
	      /**
	       * Default sample object
	       * see ISO/IEC 14496-12:2012, section 8.6.4.3
	       */

	      createDefaultSample = function createDefaultSample() {
	        return {
	          size: 0,
	          flags: {
	            isLeading: 0,
	            dependsOn: 1,
	            isDependedOn: 0,
	            hasRedundancy: 0,
	            degradationPriority: 0
	          }
	        };
	      };

	      isLikelyAacData = function isLikelyAacData(data) {
	        if (data[0] === 'I'.charCodeAt(0) && data[1] === 'D'.charCodeAt(0) && data[2] === '3'.charCodeAt(0)) {
	          return true;
	        }

	        return false;
	      };
	      /**
	       * Compare two arrays (even typed) for same-ness
	       */


	      arrayEquals = function arrayEquals(a, b) {
	        var i;

	        if (a.length !== b.length) {
	          return false;
	        } // compare the value of each element in the array


	        for (i = 0; i < a.length; i++) {
	          if (a[i] !== b[i]) {
	            return false;
	          }
	        }

	        return true;
	      };
	      /**
	       * Sum the `byteLength` properties of the data in each AAC frame
	       */


	      sumFrameByteLengths = function sumFrameByteLengths(array) {
	        var i,
	            currentObj,
	            sum = 0; // sum the byteLength's all each nal unit in the frame

	        for (i = 0; i < array.length; i++) {
	          currentObj = array[i];
	          sum += currentObj.data.byteLength;
	        }

	        return sum;
	      };
	      /**
	       * Constructs a single-track, ISO BMFF media segment from AAC data
	       * events. The output of this stream can be fed to a SourceBuffer
	       * configured with a suitable initialization segment.
	       * @param track {object} track metadata configuration
	       * @param options {object} transmuxer options object
	       * @param options.keepOriginalTimestamps {boolean} If true, keep the timestamps
	       *        in the source; false to adjust the first segment to start at 0.
	       */


	      _AudioSegmentStream2 = function AudioSegmentStream(track, options) {
	        var adtsFrames = [],
	            sequenceNumber = 0,
	            earliestAllowedDts = 0,
	            audioAppendStartTs = 0,
	            videoBaseMediaDecodeTime = Infinity;
	        options = options || {};

	        _AudioSegmentStream2.prototype.init.call(this);

	        this.push = function (data) {
	          collectDtsInfo(track, data);

	          if (track) {
	            AUDIO_PROPERTIES.forEach(function (prop) {
	              track[prop] = data[prop];
	            });
	          } // buffer audio data until end() is called


	          adtsFrames.push(data);
	        };

	        this.setEarliestDts = function (earliestDts) {
	          earliestAllowedDts = earliestDts - track.timelineStartInfo.baseMediaDecodeTime;
	        };

	        this.setVideoBaseMediaDecodeTime = function (baseMediaDecodeTime) {
	          videoBaseMediaDecodeTime = baseMediaDecodeTime;
	        };

	        this.setAudioAppendStart = function (timestamp) {
	          audioAppendStartTs = timestamp;
	        };

	        this.flush = function () {
	          var frames, moof, mdat, boxes; // return early if no audio data has been observed

	          if (adtsFrames.length === 0) {
	            this.trigger('done', 'AudioSegmentStream');
	            return;
	          }

	          frames = this.trimAdtsFramesByEarliestDts_(adtsFrames);
	          track.baseMediaDecodeTime = calculateTrackBaseMediaDecodeTime(track, options.keepOriginalTimestamps);
	          this.prefixWithSilence_(track, frames); // we have to build the index from byte locations to
	          // samples (that is, adts frames) in the audio data

	          track.samples = this.generateSampleTable_(frames); // concatenate the audio data to constuct the mdat

	          mdat = mp4.mdat(this.concatenateFrameData_(frames));
	          adtsFrames = [];
	          moof = mp4.moof(sequenceNumber, [track]);
	          boxes = new Uint8Array(moof.byteLength + mdat.byteLength); // bump the sequence number for next time

	          sequenceNumber++;
	          boxes.set(moof);
	          boxes.set(mdat, moof.byteLength);
	          clearDtsInfo(track);
	          this.trigger('data', {
	            track: track,
	            boxes: boxes
	          });
	          this.trigger('done', 'AudioSegmentStream');
	        }; // Possibly pad (prefix) the audio track with silence if appending this track
	        // would lead to the introduction of a gap in the audio buffer


	        this.prefixWithSilence_ = function (track, frames) {
	          var baseMediaDecodeTimeTs,
	              frameDuration = 0,
	              audioGapDuration = 0,
	              audioFillFrameCount = 0,
	              audioFillDuration = 0,
	              silentFrame,
	              i;

	          if (!frames.length) {
	            return;
	          }

	          baseMediaDecodeTimeTs = clock.audioTsToVideoTs(track.baseMediaDecodeTime, track.samplerate); // determine frame clock duration based on sample rate, round up to avoid overfills

	          frameDuration = Math.ceil(ONE_SECOND_IN_TS / (track.samplerate / 1024));

	          if (audioAppendStartTs && videoBaseMediaDecodeTime) {
	            // insert the shortest possible amount (audio gap or audio to video gap)
	            audioGapDuration = baseMediaDecodeTimeTs - Math.max(audioAppendStartTs, videoBaseMediaDecodeTime); // number of full frames in the audio gap

	            audioFillFrameCount = Math.floor(audioGapDuration / frameDuration);
	            audioFillDuration = audioFillFrameCount * frameDuration;
	          } // don't attempt to fill gaps smaller than a single frame or larger
	          // than a half second


	          if (audioFillFrameCount < 1 || audioFillDuration > ONE_SECOND_IN_TS / 2) {
	            return;
	          }

	          silentFrame = coneOfSilence[track.samplerate];

	          if (!silentFrame) {
	            // we don't have a silent frame pregenerated for the sample rate, so use a frame
	            // from the content instead
	            silentFrame = frames[0].data;
	          }

	          for (i = 0; i < audioFillFrameCount; i++) {
	            frames.splice(i, 0, {
	              data: silentFrame
	            });
	          }

	          track.baseMediaDecodeTime -= Math.floor(clock.videoTsToAudioTs(audioFillDuration, track.samplerate));
	        }; // If the audio segment extends before the earliest allowed dts
	        // value, remove AAC frames until starts at or after the earliest
	        // allowed DTS so that we don't end up with a negative baseMedia-
	        // DecodeTime for the audio track


	        this.trimAdtsFramesByEarliestDts_ = function (adtsFrames) {
	          if (track.minSegmentDts >= earliestAllowedDts) {
	            return adtsFrames;
	          } // We will need to recalculate the earliest segment Dts


	          track.minSegmentDts = Infinity;
	          return adtsFrames.filter(function (currentFrame) {
	            // If this is an allowed frame, keep it and record it's Dts
	            if (currentFrame.dts >= earliestAllowedDts) {
	              track.minSegmentDts = Math.min(track.minSegmentDts, currentFrame.dts);
	              track.minSegmentPts = track.minSegmentDts;
	              return true;
	            } // Otherwise, discard it


	            return false;
	          });
	        }; // generate the track's raw mdat data from an array of frames


	        this.generateSampleTable_ = function (frames) {
	          var i,
	              currentFrame,
	              samples = [];

	          for (i = 0; i < frames.length; i++) {
	            currentFrame = frames[i];
	            samples.push({
	              size: currentFrame.data.byteLength,
	              duration: 1024 // For AAC audio, all samples contain 1024 samples

	            });
	          }

	          return samples;
	        }; // generate the track's sample table from an array of frames


	        this.concatenateFrameData_ = function (frames) {
	          var i,
	              currentFrame,
	              dataOffset = 0,
	              data = new Uint8Array(sumFrameByteLengths(frames));

	          for (i = 0; i < frames.length; i++) {
	            currentFrame = frames[i];
	            data.set(currentFrame.data, dataOffset);
	            dataOffset += currentFrame.data.byteLength;
	          }

	          return data;
	        };
	      };

	      _AudioSegmentStream2.prototype = new Stream();
	      /**
	       * Constructs a single-track, ISO BMFF media segment from H264 data
	       * events. The output of this stream can be fed to a SourceBuffer
	       * configured with a suitable initialization segment.
	       * @param track {object} track metadata configuration
	       * @param options {object} transmuxer options object
	       * @param options.alignGopsAtEnd {boolean} If true, start from the end of the
	       *        gopsToAlignWith list when attempting to align gop pts
	       * @param options.keepOriginalTimestamps {boolean} If true, keep the timestamps
	       *        in the source; false to adjust the first segment to start at 0.
	       */

	      _VideoSegmentStream2 = function VideoSegmentStream(track, options) {
	        var sequenceNumber = 0,
	            nalUnits = [],
	            gopsToAlignWith = [],
	            config,
	            pps;
	        options = options || {};

	        _VideoSegmentStream2.prototype.init.call(this);

	        delete track.minPTS;
	        this.gopCache_ = [];

	        this.push = function (nalUnit) {
	          collectDtsInfo(track, nalUnit); // record the track config

	          if (nalUnit.nalUnitType === 'seq_parameter_set_rbsp' && !config) {
	            config = nalUnit.config;
	            track.sps = [nalUnit.data];
	            VIDEO_PROPERTIES.forEach(function (prop) {
	              track[prop] = config[prop];
	            }, this);
	          }

	          if (nalUnit.nalUnitType === 'pic_parameter_set_rbsp' && !pps) {
	            pps = nalUnit.data;
	            track.pps = [nalUnit.data];
	          } // buffer video until flush() is called


	          nalUnits.push(nalUnit);
	        };

	        this.flush = function () {
	          var frames, gopForFusion, gops, moof, mdat, boxes; // Throw away nalUnits at the start of the byte stream until
	          // we find the first AUD

	          while (nalUnits.length) {
	            if (nalUnits[0].nalUnitType === 'access_unit_delimiter_rbsp') {
	              break;
	            }

	            nalUnits.shift();
	          } // Return early if no video data has been observed


	          if (nalUnits.length === 0) {
	            this.resetStream_();
	            this.trigger('done', 'VideoSegmentStream');
	            return;
	          } // Organize the raw nal-units into arrays that represent
	          // higher-level constructs such as frames and gops
	          // (group-of-pictures)


	          frames = this.groupNalsIntoFrames_(nalUnits);
	          gops = this.groupFramesIntoGops_(frames); // If the first frame of this fragment is not a keyframe we have
	          // a problem since MSE (on Chrome) requires a leading keyframe.
	          //
	          // We have two approaches to repairing this situation:
	          // 1) GOP-FUSION:
	          //    This is where we keep track of the GOPS (group-of-pictures)
	          //    from previous fragments and attempt to find one that we can
	          //    prepend to the current fragment in order to create a valid
	          //    fragment.
	          // 2) KEYFRAME-PULLING:
	          //    Here we search for the first keyframe in the fragment and
	          //    throw away all the frames between the start of the fragment
	          //    and that keyframe. We then extend the duration and pull the
	          //    PTS of the keyframe forward so that it covers the time range
	          //    of the frames that were disposed of.
	          //
	          // #1 is far prefereable over #2 which can cause "stuttering" but
	          // requires more things to be just right.

	          if (!gops[0][0].keyFrame) {
	            // Search for a gop for fusion from our gopCache
	            gopForFusion = this.getGopForFusion_(nalUnits[0], track);

	            if (gopForFusion) {
	              gops.unshift(gopForFusion); // Adjust Gops' metadata to account for the inclusion of the
	              // new gop at the beginning

	              gops.byteLength += gopForFusion.byteLength;
	              gops.nalCount += gopForFusion.nalCount;
	              gops.pts = gopForFusion.pts;
	              gops.dts = gopForFusion.dts;
	              gops.duration += gopForFusion.duration;
	            } else {
	              // If we didn't find a candidate gop fall back to keyframe-pulling
	              gops = this.extendFirstKeyFrame_(gops);
	            }
	          } // Trim gops to align with gopsToAlignWith


	          if (gopsToAlignWith.length) {
	            var alignedGops;

	            if (options.alignGopsAtEnd) {
	              alignedGops = this.alignGopsAtEnd_(gops);
	            } else {
	              alignedGops = this.alignGopsAtStart_(gops);
	            }

	            if (!alignedGops) {
	              // save all the nals in the last GOP into the gop cache
	              this.gopCache_.unshift({
	                gop: gops.pop(),
	                pps: track.pps,
	                sps: track.sps
	              }); // Keep a maximum of 6 GOPs in the cache

	              this.gopCache_.length = Math.min(6, this.gopCache_.length); // Clear nalUnits

	              nalUnits = []; // return early no gops can be aligned with desired gopsToAlignWith

	              this.resetStream_();
	              this.trigger('done', 'VideoSegmentStream');
	              return;
	            } // Some gops were trimmed. clear dts info so minSegmentDts and pts are correct
	            // when recalculated before sending off to CoalesceStream


	            clearDtsInfo(track);
	            gops = alignedGops;
	          }

	          collectDtsInfo(track, gops); // First, we have to build the index from byte locations to
	          // samples (that is, frames) in the video data

	          track.samples = this.generateSampleTable_(gops); // Concatenate the video data and construct the mdat

	          mdat = mp4.mdat(this.concatenateNalData_(gops));
	          track.baseMediaDecodeTime = calculateTrackBaseMediaDecodeTime(track, options.keepOriginalTimestamps);
	          this.trigger('processedGopsInfo', gops.map(function (gop) {
	            return {
	              pts: gop.pts,
	              dts: gop.dts,
	              byteLength: gop.byteLength
	            };
	          })); // save all the nals in the last GOP into the gop cache

	          this.gopCache_.unshift({
	            gop: gops.pop(),
	            pps: track.pps,
	            sps: track.sps
	          }); // Keep a maximum of 6 GOPs in the cache

	          this.gopCache_.length = Math.min(6, this.gopCache_.length); // Clear nalUnits

	          nalUnits = [];
	          this.trigger('baseMediaDecodeTime', track.baseMediaDecodeTime);
	          this.trigger('timelineStartInfo', track.timelineStartInfo);
	          moof = mp4.moof(sequenceNumber, [track]); // it would be great to allocate this array up front instead of
	          // throwing away hundreds of media segment fragments

	          boxes = new Uint8Array(moof.byteLength + mdat.byteLength); // Bump the sequence number for next time

	          sequenceNumber++;
	          boxes.set(moof);
	          boxes.set(mdat, moof.byteLength);
	          this.trigger('data', {
	            track: track,
	            boxes: boxes
	          });
	          this.resetStream_(); // Continue with the flush process now

	          this.trigger('done', 'VideoSegmentStream');
	        };

	        this.resetStream_ = function () {
	          clearDtsInfo(track); // reset config and pps because they may differ across segments
	          // for instance, when we are rendition switching

	          config = undefined;
	          pps = undefined;
	        }; // Search for a candidate Gop for gop-fusion from the gop cache and
	        // return it or return null if no good candidate was found


	        this.getGopForFusion_ = function (nalUnit) {
	          var halfSecond = 45000,
	              // Half-a-second in a 90khz clock
	          allowableOverlap = 10000,
	              // About 3 frames @ 30fps
	          nearestDistance = Infinity,
	              dtsDistance,
	              nearestGopObj,
	              currentGop,
	              currentGopObj,
	              i; // Search for the GOP nearest to the beginning of this nal unit

	          for (i = 0; i < this.gopCache_.length; i++) {
	            currentGopObj = this.gopCache_[i];
	            currentGop = currentGopObj.gop; // Reject Gops with different SPS or PPS

	            if (!(track.pps && arrayEquals(track.pps[0], currentGopObj.pps[0])) || !(track.sps && arrayEquals(track.sps[0], currentGopObj.sps[0]))) {
	              continue;
	            } // Reject Gops that would require a negative baseMediaDecodeTime


	            if (currentGop.dts < track.timelineStartInfo.dts) {
	              continue;
	            } // The distance between the end of the gop and the start of the nalUnit


	            dtsDistance = nalUnit.dts - currentGop.dts - currentGop.duration; // Only consider GOPS that start before the nal unit and end within
	            // a half-second of the nal unit

	            if (dtsDistance >= -allowableOverlap && dtsDistance <= halfSecond) {
	              // Always use the closest GOP we found if there is more than
	              // one candidate
	              if (!nearestGopObj || nearestDistance > dtsDistance) {
	                nearestGopObj = currentGopObj;
	                nearestDistance = dtsDistance;
	              }
	            }
	          }

	          if (nearestGopObj) {
	            return nearestGopObj.gop;
	          }

	          return null;
	        };

	        this.extendFirstKeyFrame_ = function (gops) {
	          var currentGop;

	          if (!gops[0][0].keyFrame && gops.length > 1) {
	            // Remove the first GOP
	            currentGop = gops.shift();
	            gops.byteLength -= currentGop.byteLength;
	            gops.nalCount -= currentGop.nalCount; // Extend the first frame of what is now the
	            // first gop to cover the time period of the
	            // frames we just removed

	            gops[0][0].dts = currentGop.dts;
	            gops[0][0].pts = currentGop.pts;
	            gops[0][0].duration += currentGop.duration;
	          }

	          return gops;
	        }; // Convert an array of nal units into an array of frames with each frame being
	        // composed of the nal units that make up that frame
	        // Also keep track of cummulative data about the frame from the nal units such
	        // as the frame duration, starting pts, etc.


	        this.groupNalsIntoFrames_ = function (nalUnits) {
	          var i,
	              currentNal,
	              currentFrame = [],
	              frames = [];
	          currentFrame.byteLength = 0;

	          for (i = 0; i < nalUnits.length; i++) {
	            currentNal = nalUnits[i]; // Split on 'aud'-type nal units

	            if (currentNal.nalUnitType === 'access_unit_delimiter_rbsp') {
	              // Since the very first nal unit is expected to be an AUD
	              // only push to the frames array when currentFrame is not empty
	              if (currentFrame.length) {
	                currentFrame.duration = currentNal.dts - currentFrame.dts;
	                frames.push(currentFrame);
	              }

	              currentFrame = [currentNal];
	              currentFrame.byteLength = currentNal.data.byteLength;
	              currentFrame.pts = currentNal.pts;
	              currentFrame.dts = currentNal.dts;
	            } else {
	              // Specifically flag key frames for ease of use later
	              if (currentNal.nalUnitType === 'slice_layer_without_partitioning_rbsp_idr') {
	                currentFrame.keyFrame = true;
	              }

	              currentFrame.duration = currentNal.dts - currentFrame.dts;
	              currentFrame.byteLength += currentNal.data.byteLength;
	              currentFrame.push(currentNal);
	            }
	          } // For the last frame, use the duration of the previous frame if we
	          // have nothing better to go on


	          if (frames.length && (!currentFrame.duration || currentFrame.duration <= 0)) {
	            currentFrame.duration = frames[frames.length - 1].duration;
	          } // Push the final frame


	          frames.push(currentFrame);
	          return frames;
	        }; // Convert an array of frames into an array of Gop with each Gop being composed
	        // of the frames that make up that Gop
	        // Also keep track of cummulative data about the Gop from the frames such as the
	        // Gop duration, starting pts, etc.


	        this.groupFramesIntoGops_ = function (frames) {
	          var i,
	              currentFrame,
	              currentGop = [],
	              gops = []; // We must pre-set some of the values on the Gop since we
	          // keep running totals of these values

	          currentGop.byteLength = 0;
	          currentGop.nalCount = 0;
	          currentGop.duration = 0;
	          currentGop.pts = frames[0].pts;
	          currentGop.dts = frames[0].dts; // store some metadata about all the Gops

	          gops.byteLength = 0;
	          gops.nalCount = 0;
	          gops.duration = 0;
	          gops.pts = frames[0].pts;
	          gops.dts = frames[0].dts;

	          for (i = 0; i < frames.length; i++) {
	            currentFrame = frames[i];

	            if (currentFrame.keyFrame) {
	              // Since the very first frame is expected to be an keyframe
	              // only push to the gops array when currentGop is not empty
	              if (currentGop.length) {
	                gops.push(currentGop);
	                gops.byteLength += currentGop.byteLength;
	                gops.nalCount += currentGop.nalCount;
	                gops.duration += currentGop.duration;
	              }

	              currentGop = [currentFrame];
	              currentGop.nalCount = currentFrame.length;
	              currentGop.byteLength = currentFrame.byteLength;
	              currentGop.pts = currentFrame.pts;
	              currentGop.dts = currentFrame.dts;
	              currentGop.duration = currentFrame.duration;
	            } else {
	              currentGop.duration += currentFrame.duration;
	              currentGop.nalCount += currentFrame.length;
	              currentGop.byteLength += currentFrame.byteLength;
	              currentGop.push(currentFrame);
	            }
	          }

	          if (gops.length && currentGop.duration <= 0) {
	            currentGop.duration = gops[gops.length - 1].duration;
	          }

	          gops.byteLength += currentGop.byteLength;
	          gops.nalCount += currentGop.nalCount;
	          gops.duration += currentGop.duration; // push the final Gop

	          gops.push(currentGop);
	          return gops;
	        }; // generate the track's sample table from an array of gops


	        this.generateSampleTable_ = function (gops, baseDataOffset) {
	          var h,
	              i,
	              sample,
	              currentGop,
	              currentFrame,
	              dataOffset = baseDataOffset || 0,
	              samples = [];

	          for (h = 0; h < gops.length; h++) {
	            currentGop = gops[h];

	            for (i = 0; i < currentGop.length; i++) {
	              currentFrame = currentGop[i];
	              sample = createDefaultSample();
	              sample.dataOffset = dataOffset;
	              sample.compositionTimeOffset = currentFrame.pts - currentFrame.dts;
	              sample.duration = currentFrame.duration;
	              sample.size = 4 * currentFrame.length; // Space for nal unit size

	              sample.size += currentFrame.byteLength;

	              if (currentFrame.keyFrame) {
	                sample.flags.dependsOn = 2;
	              }

	              dataOffset += sample.size;
	              samples.push(sample);
	            }
	          }

	          return samples;
	        }; // generate the track's raw mdat data from an array of gops


	        this.concatenateNalData_ = function (gops) {
	          var h,
	              i,
	              j,
	              currentGop,
	              currentFrame,
	              currentNal,
	              dataOffset = 0,
	              nalsByteLength = gops.byteLength,
	              numberOfNals = gops.nalCount,
	              totalByteLength = nalsByteLength + 4 * numberOfNals,
	              data = new Uint8Array(totalByteLength),
	              view = new DataView(data.buffer); // For each Gop..

	          for (h = 0; h < gops.length; h++) {
	            currentGop = gops[h]; // For each Frame..

	            for (i = 0; i < currentGop.length; i++) {
	              currentFrame = currentGop[i]; // For each NAL..

	              for (j = 0; j < currentFrame.length; j++) {
	                currentNal = currentFrame[j];
	                view.setUint32(dataOffset, currentNal.data.byteLength);
	                dataOffset += 4;
	                data.set(currentNal.data, dataOffset);
	                dataOffset += currentNal.data.byteLength;
	              }
	            }
	          }

	          return data;
	        }; // trim gop list to the first gop found that has a matching pts with a gop in the list
	        // of gopsToAlignWith starting from the START of the list


	        this.alignGopsAtStart_ = function (gops) {
	          var alignIndex, gopIndex, align, gop, byteLength, nalCount, duration, alignedGops;
	          byteLength = gops.byteLength;
	          nalCount = gops.nalCount;
	          duration = gops.duration;
	          alignIndex = gopIndex = 0;

	          while (alignIndex < gopsToAlignWith.length && gopIndex < gops.length) {
	            align = gopsToAlignWith[alignIndex];
	            gop = gops[gopIndex];

	            if (align.pts === gop.pts) {
	              break;
	            }

	            if (gop.pts > align.pts) {
	              // this current gop starts after the current gop we want to align on, so increment
	              // align index
	              alignIndex++;
	              continue;
	            } // current gop starts before the current gop we want to align on. so increment gop
	            // index


	            gopIndex++;
	            byteLength -= gop.byteLength;
	            nalCount -= gop.nalCount;
	            duration -= gop.duration;
	          }

	          if (gopIndex === 0) {
	            // no gops to trim
	            return gops;
	          }

	          if (gopIndex === gops.length) {
	            // all gops trimmed, skip appending all gops
	            return null;
	          }

	          alignedGops = gops.slice(gopIndex);
	          alignedGops.byteLength = byteLength;
	          alignedGops.duration = duration;
	          alignedGops.nalCount = nalCount;
	          alignedGops.pts = alignedGops[0].pts;
	          alignedGops.dts = alignedGops[0].dts;
	          return alignedGops;
	        }; // trim gop list to the first gop found that has a matching pts with a gop in the list
	        // of gopsToAlignWith starting from the END of the list


	        this.alignGopsAtEnd_ = function (gops) {
	          var alignIndex, gopIndex, align, gop, alignEndIndex, matchFound;
	          alignIndex = gopsToAlignWith.length - 1;
	          gopIndex = gops.length - 1;
	          alignEndIndex = null;
	          matchFound = false;

	          while (alignIndex >= 0 && gopIndex >= 0) {
	            align = gopsToAlignWith[alignIndex];
	            gop = gops[gopIndex];

	            if (align.pts === gop.pts) {
	              matchFound = true;
	              break;
	            }

	            if (align.pts > gop.pts) {
	              alignIndex--;
	              continue;
	            }

	            if (alignIndex === gopsToAlignWith.length - 1) {
	              // gop.pts is greater than the last alignment candidate. If no match is found
	              // by the end of this loop, we still want to append gops that come after this
	              // point
	              alignEndIndex = gopIndex;
	            }

	            gopIndex--;
	          }

	          if (!matchFound && alignEndIndex === null) {
	            return null;
	          }

	          var trimIndex;

	          if (matchFound) {
	            trimIndex = gopIndex;
	          } else {
	            trimIndex = alignEndIndex;
	          }

	          if (trimIndex === 0) {
	            return gops;
	          }

	          var alignedGops = gops.slice(trimIndex);
	          var metadata = alignedGops.reduce(function (total, gop) {
	            total.byteLength += gop.byteLength;
	            total.duration += gop.duration;
	            total.nalCount += gop.nalCount;
	            return total;
	          }, {
	            byteLength: 0,
	            duration: 0,
	            nalCount: 0
	          });
	          alignedGops.byteLength = metadata.byteLength;
	          alignedGops.duration = metadata.duration;
	          alignedGops.nalCount = metadata.nalCount;
	          alignedGops.pts = alignedGops[0].pts;
	          alignedGops.dts = alignedGops[0].dts;
	          return alignedGops;
	        };

	        this.alignGopsWith = function (newGopsToAlignWith) {
	          gopsToAlignWith = newGopsToAlignWith;
	        };
	      };

	      _VideoSegmentStream2.prototype = new Stream();
	      /**
	       * Store information about the start and end of the track and the
	       * duration for each frame/sample we process in order to calculate
	       * the baseMediaDecodeTime
	       */

	      collectDtsInfo = function collectDtsInfo(track, data) {
	        if (typeof data.pts === 'number') {
	          if (track.timelineStartInfo.pts === undefined) {
	            track.timelineStartInfo.pts = data.pts;
	          }

	          if (track.minSegmentPts === undefined) {
	            track.minSegmentPts = data.pts;
	          } else {
	            track.minSegmentPts = Math.min(track.minSegmentPts, data.pts);
	          }

	          if (track.maxSegmentPts === undefined) {
	            track.maxSegmentPts = data.pts;
	          } else {
	            track.maxSegmentPts = Math.max(track.maxSegmentPts, data.pts);
	          }
	        }

	        if (typeof data.dts === 'number') {
	          if (track.timelineStartInfo.dts === undefined) {
	            track.timelineStartInfo.dts = data.dts;
	          }

	          if (track.minSegmentDts === undefined) {
	            track.minSegmentDts = data.dts;
	          } else {
	            track.minSegmentDts = Math.min(track.minSegmentDts, data.dts);
	          }

	          if (track.maxSegmentDts === undefined) {
	            track.maxSegmentDts = data.dts;
	          } else {
	            track.maxSegmentDts = Math.max(track.maxSegmentDts, data.dts);
	          }
	        }
	      };
	      /**
	       * Clear values used to calculate the baseMediaDecodeTime between
	       * tracks
	       */


	      clearDtsInfo = function clearDtsInfo(track) {
	        delete track.minSegmentDts;
	        delete track.maxSegmentDts;
	        delete track.minSegmentPts;
	        delete track.maxSegmentPts;
	      };
	      /**
	       * Calculate the track's baseMediaDecodeTime based on the earliest
	       * DTS the transmuxer has ever seen and the minimum DTS for the
	       * current track
	       * @param track {object} track metadata configuration
	       * @param keepOriginalTimestamps {boolean} If true, keep the timestamps
	       *        in the source; false to adjust the first segment to start at 0.
	       */


	      calculateTrackBaseMediaDecodeTime = function calculateTrackBaseMediaDecodeTime(track, keepOriginalTimestamps) {
	        var baseMediaDecodeTime,
	            scale,
	            minSegmentDts = track.minSegmentDts; // Optionally adjust the time so the first segment starts at zero.

	        if (!keepOriginalTimestamps) {
	          minSegmentDts -= track.timelineStartInfo.dts;
	        } // track.timelineStartInfo.baseMediaDecodeTime is the location, in time, where
	        // we want the start of the first segment to be placed


	        baseMediaDecodeTime = track.timelineStartInfo.baseMediaDecodeTime; // Add to that the distance this segment is from the very first

	        baseMediaDecodeTime += minSegmentDts; // baseMediaDecodeTime must not become negative

	        baseMediaDecodeTime = Math.max(0, baseMediaDecodeTime);

	        if (track.type === 'audio') {
	          // Audio has a different clock equal to the sampling_rate so we need to
	          // scale the PTS values into the clock rate of the track
	          scale = track.samplerate / ONE_SECOND_IN_TS;
	          baseMediaDecodeTime *= scale;
	          baseMediaDecodeTime = Math.floor(baseMediaDecodeTime);
	        }

	        return baseMediaDecodeTime;
	      };
	      /**
	       * A Stream that can combine multiple streams (ie. audio & video)
	       * into a single output segment for MSE. Also supports audio-only
	       * and video-only streams.
	       */


	      _CoalesceStream = function CoalesceStream(options, metadataStream) {
	        // Number of Tracks per output segment
	        // If greater than 1, we combine multiple
	        // tracks into a single segment
	        this.numberOfTracks = 0;
	        this.metadataStream = metadataStream;

	        if (typeof options.remux !== 'undefined') {
	          this.remuxTracks = !!options.remux;
	        } else {
	          this.remuxTracks = true;
	        }

	        this.pendingTracks = [];
	        this.videoTrack = null;
	        this.pendingBoxes = [];
	        this.pendingCaptions = [];
	        this.pendingMetadata = [];
	        this.pendingBytes = 0;
	        this.emittedTracks = 0;

	        _CoalesceStream.prototype.init.call(this); // Take output from multiple


	        this.push = function (output) {
	          // buffer incoming captions until the associated video segment
	          // finishes
	          if (output.text) {
	            return this.pendingCaptions.push(output);
	          } // buffer incoming id3 tags until the final flush


	          if (output.frames) {
	            return this.pendingMetadata.push(output);
	          } // Add this track to the list of pending tracks and store
	          // important information required for the construction of
	          // the final segment


	          this.pendingTracks.push(output.track);
	          this.pendingBoxes.push(output.boxes);
	          this.pendingBytes += output.boxes.byteLength;

	          if (output.track.type === 'video') {
	            this.videoTrack = output.track;
	          }

	          if (output.track.type === 'audio') {
	            this.audioTrack = output.track;
	          }
	        };
	      };

	      _CoalesceStream.prototype = new Stream();

	      _CoalesceStream.prototype.flush = function (flushSource) {
	        var offset = 0,
	            event = {
	          captions: [],
	          captionStreams: {},
	          metadata: [],
	          info: {}
	        },
	            caption,
	            id3,
	            initSegment,
	            timelineStartPts = 0,
	            i;

	        if (this.pendingTracks.length < this.numberOfTracks) {
	          if (flushSource !== 'VideoSegmentStream' && flushSource !== 'AudioSegmentStream') {
	            // Return because we haven't received a flush from a data-generating
	            // portion of the segment (meaning that we have only recieved meta-data
	            // or captions.)
	            return;
	          } else if (this.remuxTracks) {
	            // Return until we have enough tracks from the pipeline to remux (if we
	            // are remuxing audio and video into a single MP4)
	            return;
	          } else if (this.pendingTracks.length === 0) {
	            // In the case where we receive a flush without any data having been
	            // received we consider it an emitted track for the purposes of coalescing
	            // `done` events.
	            // We do this for the case where there is an audio and video track in the
	            // segment but no audio data. (seen in several playlists with alternate
	            // audio tracks and no audio present in the main TS segments.)
	            this.emittedTracks++;

	            if (this.emittedTracks >= this.numberOfTracks) {
	              this.trigger('done');
	              this.emittedTracks = 0;
	            }

	            return;
	          }
	        }

	        if (this.videoTrack) {
	          timelineStartPts = this.videoTrack.timelineStartInfo.pts;
	          VIDEO_PROPERTIES.forEach(function (prop) {
	            event.info[prop] = this.videoTrack[prop];
	          }, this);
	        } else if (this.audioTrack) {
	          timelineStartPts = this.audioTrack.timelineStartInfo.pts;
	          AUDIO_PROPERTIES.forEach(function (prop) {
	            event.info[prop] = this.audioTrack[prop];
	          }, this);
	        }

	        if (this.pendingTracks.length === 1) {
	          event.type = this.pendingTracks[0].type;
	        } else {
	          event.type = 'combined';
	        }

	        this.emittedTracks += this.pendingTracks.length;
	        initSegment = mp4.initSegment(this.pendingTracks); // Create a new typed array to hold the init segment

	        event.initSegment = new Uint8Array(initSegment.byteLength); // Create an init segment containing a moov
	        // and track definitions

	        event.initSegment.set(initSegment); // Create a new typed array to hold the moof+mdats

	        event.data = new Uint8Array(this.pendingBytes); // Append each moof+mdat (one per track) together

	        for (i = 0; i < this.pendingBoxes.length; i++) {
	          event.data.set(this.pendingBoxes[i], offset);
	          offset += this.pendingBoxes[i].byteLength;
	        } // Translate caption PTS times into second offsets into the
	        // video timeline for the segment, and add track info


	        for (i = 0; i < this.pendingCaptions.length; i++) {
	          caption = this.pendingCaptions[i];
	          caption.startTime = caption.startPts - timelineStartPts;
	          caption.startTime /= 90e3;
	          caption.endTime = caption.endPts - timelineStartPts;
	          caption.endTime /= 90e3;
	          event.captionStreams[caption.stream] = true;
	          event.captions.push(caption);
	        } // Translate ID3 frame PTS times into second offsets into the
	        // video timeline for the segment


	        for (i = 0; i < this.pendingMetadata.length; i++) {
	          id3 = this.pendingMetadata[i];
	          id3.cueTime = id3.pts - timelineStartPts;
	          id3.cueTime /= 90e3;
	          event.metadata.push(id3);
	        } // We add this to every single emitted segment even though we only need
	        // it for the first


	        event.metadata.dispatchType = this.metadataStream.dispatchType; // Reset stream state

	        this.pendingTracks.length = 0;
	        this.videoTrack = null;
	        this.pendingBoxes.length = 0;
	        this.pendingCaptions.length = 0;
	        this.pendingBytes = 0;
	        this.pendingMetadata.length = 0; // Emit the built segment

	        this.trigger('data', event); // Only emit `done` if all tracks have been flushed and emitted

	        if (this.emittedTracks >= this.numberOfTracks) {
	          this.trigger('done');
	          this.emittedTracks = 0;
	        }
	      };
	      /**
	       * A Stream that expects MP2T binary data as input and produces
	       * corresponding media segments, suitable for use with Media Source
	       * Extension (MSE) implementations that support the ISO BMFF byte
	       * stream format, like Chrome.
	       */


	      _Transmuxer2 = function Transmuxer(options) {
	        var self = this,
	            hasFlushed = true,
	            videoTrack,
	            audioTrack;

	        _Transmuxer2.prototype.init.call(this);

	        options = options || {};
	        this.baseMediaDecodeTime = options.baseMediaDecodeTime || 0;
	        this.transmuxPipeline_ = {};

	        this.setupAacPipeline = function () {
	          var pipeline = {};
	          this.transmuxPipeline_ = pipeline;
	          pipeline.type = 'aac';
	          pipeline.metadataStream = new m2ts.MetadataStream(); // set up the parsing pipeline

	          pipeline.aacStream = new AacStream();
	          pipeline.audioTimestampRolloverStream = new m2ts.TimestampRolloverStream('audio');
	          pipeline.timedMetadataTimestampRolloverStream = new m2ts.TimestampRolloverStream('timed-metadata');
	          pipeline.adtsStream = new AdtsStream();
	          pipeline.coalesceStream = new _CoalesceStream(options, pipeline.metadataStream);
	          pipeline.headOfPipeline = pipeline.aacStream;
	          pipeline.aacStream.pipe(pipeline.audioTimestampRolloverStream).pipe(pipeline.adtsStream);
	          pipeline.aacStream.pipe(pipeline.timedMetadataTimestampRolloverStream).pipe(pipeline.metadataStream).pipe(pipeline.coalesceStream);
	          pipeline.metadataStream.on('timestamp', function (frame) {
	            pipeline.aacStream.setTimestamp(frame.timeStamp);
	          });
	          pipeline.aacStream.on('data', function (data) {
	            if (data.type === 'timed-metadata' && !pipeline.audioSegmentStream) {
	              audioTrack = audioTrack || {
	                timelineStartInfo: {
	                  baseMediaDecodeTime: self.baseMediaDecodeTime
	                },
	                codec: 'adts',
	                type: 'audio'
	              }; // hook up the audio segment stream to the first track with aac data

	              pipeline.coalesceStream.numberOfTracks++;
	              pipeline.audioSegmentStream = new _AudioSegmentStream2(audioTrack, options); // Set up the final part of the audio pipeline

	              pipeline.adtsStream.pipe(pipeline.audioSegmentStream).pipe(pipeline.coalesceStream);
	            }
	          }); // Re-emit any data coming from the coalesce stream to the outside world

	          pipeline.coalesceStream.on('data', this.trigger.bind(this, 'data')); // Let the consumer know we have finished flushing the entire pipeline

	          pipeline.coalesceStream.on('done', this.trigger.bind(this, 'done'));
	        };

	        this.setupTsPipeline = function () {
	          var pipeline = {};
	          this.transmuxPipeline_ = pipeline;
	          pipeline.type = 'ts';
	          pipeline.metadataStream = new m2ts.MetadataStream(); // set up the parsing pipeline

	          pipeline.packetStream = new m2ts.TransportPacketStream();
	          pipeline.parseStream = new m2ts.TransportParseStream();
	          pipeline.elementaryStream = new m2ts.ElementaryStream();
	          pipeline.videoTimestampRolloverStream = new m2ts.TimestampRolloverStream('video');
	          pipeline.audioTimestampRolloverStream = new m2ts.TimestampRolloverStream('audio');
	          pipeline.timedMetadataTimestampRolloverStream = new m2ts.TimestampRolloverStream('timed-metadata');
	          pipeline.adtsStream = new AdtsStream();
	          pipeline.h264Stream = new H264Stream();
	          pipeline.captionStream = new m2ts.CaptionStream();
	          pipeline.coalesceStream = new _CoalesceStream(options, pipeline.metadataStream);
	          pipeline.headOfPipeline = pipeline.packetStream; // disassemble MPEG2-TS packets into elementary streams

	          pipeline.packetStream.pipe(pipeline.parseStream).pipe(pipeline.elementaryStream); // !!THIS ORDER IS IMPORTANT!!
	          // demux the streams

	          pipeline.elementaryStream.pipe(pipeline.videoTimestampRolloverStream).pipe(pipeline.h264Stream);
	          pipeline.elementaryStream.pipe(pipeline.audioTimestampRolloverStream).pipe(pipeline.adtsStream);
	          pipeline.elementaryStream.pipe(pipeline.timedMetadataTimestampRolloverStream).pipe(pipeline.metadataStream).pipe(pipeline.coalesceStream); // Hook up CEA-608/708 caption stream

	          pipeline.h264Stream.pipe(pipeline.captionStream).pipe(pipeline.coalesceStream);
	          pipeline.elementaryStream.on('data', function (data) {
	            var i;

	            if (data.type === 'metadata') {
	              i = data.tracks.length; // scan the tracks listed in the metadata

	              while (i--) {
	                if (!videoTrack && data.tracks[i].type === 'video') {
	                  videoTrack = data.tracks[i];
	                  videoTrack.timelineStartInfo.baseMediaDecodeTime = self.baseMediaDecodeTime;
	                } else if (!audioTrack && data.tracks[i].type === 'audio') {
	                  audioTrack = data.tracks[i];
	                  audioTrack.timelineStartInfo.baseMediaDecodeTime = self.baseMediaDecodeTime;
	                }
	              } // hook up the video segment stream to the first track with h264 data


	              if (videoTrack && !pipeline.videoSegmentStream) {
	                pipeline.coalesceStream.numberOfTracks++;
	                pipeline.videoSegmentStream = new _VideoSegmentStream2(videoTrack, options);
	                pipeline.videoSegmentStream.on('timelineStartInfo', function (timelineStartInfo) {
	                  // When video emits timelineStartInfo data after a flush, we forward that
	                  // info to the AudioSegmentStream, if it exists, because video timeline
	                  // data takes precedence.
	                  if (audioTrack) {
	                    audioTrack.timelineStartInfo = timelineStartInfo; // On the first segment we trim AAC frames that exist before the
	                    // very earliest DTS we have seen in video because Chrome will
	                    // interpret any video track with a baseMediaDecodeTime that is
	                    // non-zero as a gap.

	                    pipeline.audioSegmentStream.setEarliestDts(timelineStartInfo.dts);
	                  }
	                });
	                pipeline.videoSegmentStream.on('processedGopsInfo', self.trigger.bind(self, 'gopInfo'));
	                pipeline.videoSegmentStream.on('baseMediaDecodeTime', function (baseMediaDecodeTime) {
	                  if (audioTrack) {
	                    pipeline.audioSegmentStream.setVideoBaseMediaDecodeTime(baseMediaDecodeTime);
	                  }
	                }); // Set up the final part of the video pipeline

	                pipeline.h264Stream.pipe(pipeline.videoSegmentStream).pipe(pipeline.coalesceStream);
	              }

	              if (audioTrack && !pipeline.audioSegmentStream) {
	                // hook up the audio segment stream to the first track with aac data
	                pipeline.coalesceStream.numberOfTracks++;
	                pipeline.audioSegmentStream = new _AudioSegmentStream2(audioTrack, options); // Set up the final part of the audio pipeline

	                pipeline.adtsStream.pipe(pipeline.audioSegmentStream).pipe(pipeline.coalesceStream);
	              }
	            }
	          }); // Re-emit any data coming from the coalesce stream to the outside world

	          pipeline.coalesceStream.on('data', this.trigger.bind(this, 'data')); // Let the consumer know we have finished flushing the entire pipeline

	          pipeline.coalesceStream.on('done', this.trigger.bind(this, 'done'));
	        }; // hook up the segment streams once track metadata is delivered


	        this.setBaseMediaDecodeTime = function (baseMediaDecodeTime) {
	          var pipeline = this.transmuxPipeline_;
	          this.baseMediaDecodeTime = baseMediaDecodeTime;

	          if (audioTrack) {
	            audioTrack.timelineStartInfo.dts = undefined;
	            audioTrack.timelineStartInfo.pts = undefined;
	            clearDtsInfo(audioTrack);
	            audioTrack.timelineStartInfo.baseMediaDecodeTime = baseMediaDecodeTime;

	            if (pipeline.audioTimestampRolloverStream) {
	              pipeline.audioTimestampRolloverStream.discontinuity();
	            }
	          }

	          if (videoTrack) {
	            if (pipeline.videoSegmentStream) {
	              pipeline.videoSegmentStream.gopCache_ = [];
	              pipeline.videoTimestampRolloverStream.discontinuity();
	            }

	            videoTrack.timelineStartInfo.dts = undefined;
	            videoTrack.timelineStartInfo.pts = undefined;
	            clearDtsInfo(videoTrack);
	            pipeline.captionStream.reset();
	            videoTrack.timelineStartInfo.baseMediaDecodeTime = baseMediaDecodeTime;
	          }

	          if (pipeline.timedMetadataTimestampRolloverStream) {
	            pipeline.timedMetadataTimestampRolloverStream.discontinuity();
	          }
	        };

	        this.setAudioAppendStart = function (timestamp) {
	          if (audioTrack) {
	            this.transmuxPipeline_.audioSegmentStream.setAudioAppendStart(timestamp);
	          }
	        };

	        this.alignGopsWith = function (gopsToAlignWith) {
	          if (videoTrack && this.transmuxPipeline_.videoSegmentStream) {
	            this.transmuxPipeline_.videoSegmentStream.alignGopsWith(gopsToAlignWith);
	          }
	        }; // feed incoming data to the front of the parsing pipeline


	        this.push = function (data) {
	          if (hasFlushed) {
	            var isAac = isLikelyAacData(data);

	            if (isAac && this.transmuxPipeline_.type !== 'aac') {
	              this.setupAacPipeline();
	            } else if (!isAac && this.transmuxPipeline_.type !== 'ts') {
	              this.setupTsPipeline();
	            }

	            hasFlushed = false;
	          }

	          this.transmuxPipeline_.headOfPipeline.push(data);
	        }; // flush any buffered data


	        this.flush = function () {
	          hasFlushed = true; // Start at the top of the pipeline and flush all pending work

	          this.transmuxPipeline_.headOfPipeline.flush();
	        }; // Caption data has to be reset when seeking outside buffered range


	        this.resetCaptions = function () {
	          if (this.transmuxPipeline_.captionStream) {
	            this.transmuxPipeline_.captionStream.reset();
	          }
	        };
	      };

	      _Transmuxer2.prototype = new Stream();
	      module.exports = {
	        Transmuxer: _Transmuxer2,
	        VideoSegmentStream: _VideoSegmentStream2,
	        AudioSegmentStream: _AudioSegmentStream2,
	        AUDIO_PROPERTIES: AUDIO_PROPERTIES,
	        VIDEO_PROPERTIES: VIDEO_PROPERTIES
	      };
	    }, {
	      "../aac": 1,
	      "../codecs/adts.js": 3,
	      "../codecs/h264": 4,
	      "../data/silence": 6,
	      "../m2ts/m2ts.js": 16,
	      "../utils/clock": 28,
	      "../utils/stream.js": 30,
	      "./mp4-generator.js": 22
	    }],
	    25: [function (require, module, exports) {

	      var tagTypes = {
	        0x08: 'audio',
	        0x09: 'video',
	        0x12: 'metadata'
	      },
	          hex = function hex(val) {
	        return '0x' + ('00' + val.toString(16)).slice(-2).toUpperCase();
	      },
	          hexStringList = function hexStringList(data) {
	        var arr = [],
	            i;

	        while (data.byteLength > 0) {
	          i = 0;
	          arr.push(hex(data[i++]));
	          data = data.subarray(i);
	        }

	        return arr.join(' ');
	      },
	          parseAVCTag = function parseAVCTag(tag, obj) {
	        var avcPacketTypes = ['AVC Sequence Header', 'AVC NALU', 'AVC End-of-Sequence'],
	            compositionTime = tag[1] & parseInt('01111111', 2) << 16 | tag[2] << 8 | tag[3];
	        obj = obj || {};
	        obj.avcPacketType = avcPacketTypes[tag[0]];
	        obj.CompositionTime = tag[1] & parseInt('10000000', 2) ? -compositionTime : compositionTime;

	        if (tag[0] === 1) {
	          obj.nalUnitTypeRaw = hexStringList(tag.subarray(4, 100));
	        } else {
	          obj.data = hexStringList(tag.subarray(4));
	        }

	        return obj;
	      },
	          parseVideoTag = function parseVideoTag(tag, obj) {
	        var frameTypes = ['Unknown', 'Keyframe (for AVC, a seekable frame)', 'Inter frame (for AVC, a nonseekable frame)', 'Disposable inter frame (H.263 only)', 'Generated keyframe (reserved for server use only)', 'Video info/command frame'],
	            codecID = tag[0] & parseInt('00001111', 2);
	        obj = obj || {};
	        obj.frameType = frameTypes[(tag[0] & parseInt('11110000', 2)) >>> 4];
	        obj.codecID = codecID;

	        if (codecID === 7) {
	          return parseAVCTag(tag.subarray(1), obj);
	        }

	        return obj;
	      },
	          parseAACTag = function parseAACTag(tag, obj) {
	        var packetTypes = ['AAC Sequence Header', 'AAC Raw'];
	        obj = obj || {};
	        obj.aacPacketType = packetTypes[tag[0]];
	        obj.data = hexStringList(tag.subarray(1));
	        return obj;
	      },
	          parseAudioTag = function parseAudioTag(tag, obj) {
	        var formatTable = ['Linear PCM, platform endian', 'ADPCM', 'MP3', 'Linear PCM, little endian', 'Nellymoser 16-kHz mono', 'Nellymoser 8-kHz mono', 'Nellymoser', 'G.711 A-law logarithmic PCM', 'G.711 mu-law logarithmic PCM', 'reserved', 'AAC', 'Speex', 'MP3 8-Khz', 'Device-specific sound'],
	            samplingRateTable = ['5.5-kHz', '11-kHz', '22-kHz', '44-kHz'],
	            soundFormat = (tag[0] & parseInt('11110000', 2)) >>> 4;
	        obj = obj || {};
	        obj.soundFormat = formatTable[soundFormat];
	        obj.soundRate = samplingRateTable[(tag[0] & parseInt('00001100', 2)) >>> 2];
	        obj.soundSize = (tag[0] & parseInt('00000010', 2)) >>> 1 ? '16-bit' : '8-bit';
	        obj.soundType = tag[0] & parseInt('00000001', 2) ? 'Stereo' : 'Mono';

	        if (soundFormat === 10) {
	          return parseAACTag(tag.subarray(1), obj);
	        }

	        return obj;
	      },
	          parseGenericTag = function parseGenericTag(tag) {
	        return {
	          tagType: tagTypes[tag[0]],
	          dataSize: tag[1] << 16 | tag[2] << 8 | tag[3],
	          timestamp: tag[7] << 24 | tag[4] << 16 | tag[5] << 8 | tag[6],
	          streamID: tag[8] << 16 | tag[9] << 8 | tag[10]
	        };
	      },
	          inspectFlvTag = function inspectFlvTag(tag) {
	        var header = parseGenericTag(tag);

	        switch (tag[0]) {
	          case 0x08:
	            parseAudioTag(tag.subarray(11), header);
	            break;

	          case 0x09:
	            parseVideoTag(tag.subarray(11), header);
	            break;

	          case 0x12:
	        }

	        return header;
	      },
	          inspectFlv = function inspectFlv(bytes) {
	        var i = 9,
	            // header
	        dataSize,
	            parsedResults = [],
	            tag; // traverse the tags

	        i += 4; // skip previous tag size

	        while (i < bytes.byteLength) {
	          dataSize = bytes[i + 1] << 16;
	          dataSize |= bytes[i + 2] << 8;
	          dataSize |= bytes[i + 3];
	          dataSize += 11;
	          tag = bytes.subarray(i, i + dataSize);
	          parsedResults.push(inspectFlvTag(tag));
	          i += dataSize + 4;
	        }

	        return parsedResults;
	      },
	          textifyFlv = function textifyFlv(flvTagArray) {
	        return JSON.stringify(flvTagArray, null, 2);
	      };

	      module.exports = {
	        inspectTag: inspectFlvTag,
	        inspect: inspectFlv,
	        textify: textifyFlv
	      };
	    }, {}],
	    26: [function (require, module, exports) {
	      (function (global) {

	        var inspectMp4,
	            _textifyMp,
	            parseType = require('../mp4/probe').parseType,
	            parseMp4Date = function parseMp4Date(seconds) {
	          return new Date(seconds * 1000 - 2082844800000);
	        },
	            parseSampleFlags = function parseSampleFlags(flags) {
	          return {
	            isLeading: (flags[0] & 0x0c) >>> 2,
	            dependsOn: flags[0] & 0x03,
	            isDependedOn: (flags[1] & 0xc0) >>> 6,
	            hasRedundancy: (flags[1] & 0x30) >>> 4,
	            paddingValue: (flags[1] & 0x0e) >>> 1,
	            isNonSyncSample: flags[1] & 0x01,
	            degradationPriority: flags[2] << 8 | flags[3]
	          };
	        },
	            nalParse = function nalParse(avcStream) {
	          var avcView = new DataView(avcStream.buffer, avcStream.byteOffset, avcStream.byteLength),
	              result = [],
	              i,
	              length;

	          for (i = 0; i + 4 < avcStream.length; i += length) {
	            length = avcView.getUint32(i);
	            i += 4; // bail if this doesn't appear to be an H264 stream

	            if (length <= 0) {
	              result.push('<span style=\'color:red;\'>MALFORMED DATA</span>');
	              continue;
	            }

	            switch (avcStream[i] & 0x1F) {
	              case 0x01:
	                result.push('slice_layer_without_partitioning_rbsp');
	                break;

	              case 0x05:
	                result.push('slice_layer_without_partitioning_rbsp_idr');
	                break;

	              case 0x06:
	                result.push('sei_rbsp');
	                break;

	              case 0x07:
	                result.push('seq_parameter_set_rbsp');
	                break;

	              case 0x08:
	                result.push('pic_parameter_set_rbsp');
	                break;

	              case 0x09:
	                result.push('access_unit_delimiter_rbsp');
	                break;

	              default:
	                result.push('UNKNOWN NAL - ' + avcStream[i] & 0x1F);
	                break;
	            }
	          }

	          return result;
	        },
	            // registry of handlers for individual mp4 box types
	        parse = {
	          // codingname, not a first-class box type. stsd entries share the
	          // same format as real boxes so the parsing infrastructure can be
	          // shared
	          avc1: function avc1(data) {
	            var view = new DataView(data.buffer, data.byteOffset, data.byteLength);
	            return {
	              dataReferenceIndex: view.getUint16(6),
	              width: view.getUint16(24),
	              height: view.getUint16(26),
	              horizresolution: view.getUint16(28) + view.getUint16(30) / 16,
	              vertresolution: view.getUint16(32) + view.getUint16(34) / 16,
	              frameCount: view.getUint16(40),
	              depth: view.getUint16(74),
	              config: inspectMp4(data.subarray(78, data.byteLength))
	            };
	          },
	          avcC: function avcC(data) {
	            var view = new DataView(data.buffer, data.byteOffset, data.byteLength),
	                result = {
	              configurationVersion: data[0],
	              avcProfileIndication: data[1],
	              profileCompatibility: data[2],
	              avcLevelIndication: data[3],
	              lengthSizeMinusOne: data[4] & 0x03,
	              sps: [],
	              pps: []
	            },
	                numOfSequenceParameterSets = data[5] & 0x1f,
	                numOfPictureParameterSets,
	                nalSize,
	                offset,
	                i; // iterate past any SPSs

	            offset = 6;

	            for (i = 0; i < numOfSequenceParameterSets; i++) {
	              nalSize = view.getUint16(offset);
	              offset += 2;
	              result.sps.push(new Uint8Array(data.subarray(offset, offset + nalSize)));
	              offset += nalSize;
	            } // iterate past any PPSs


	            numOfPictureParameterSets = data[offset];
	            offset++;

	            for (i = 0; i < numOfPictureParameterSets; i++) {
	              nalSize = view.getUint16(offset);
	              offset += 2;
	              result.pps.push(new Uint8Array(data.subarray(offset, offset + nalSize)));
	              offset += nalSize;
	            }

	            return result;
	          },
	          btrt: function btrt(data) {
	            var view = new DataView(data.buffer, data.byteOffset, data.byteLength);
	            return {
	              bufferSizeDB: view.getUint32(0),
	              maxBitrate: view.getUint32(4),
	              avgBitrate: view.getUint32(8)
	            };
	          },
	          esds: function esds(data) {
	            return {
	              version: data[0],
	              flags: new Uint8Array(data.subarray(1, 4)),
	              esId: data[6] << 8 | data[7],
	              streamPriority: data[8] & 0x1f,
	              decoderConfig: {
	                objectProfileIndication: data[11],
	                streamType: data[12] >>> 2 & 0x3f,
	                bufferSize: data[13] << 16 | data[14] << 8 | data[15],
	                maxBitrate: data[16] << 24 | data[17] << 16 | data[18] << 8 | data[19],
	                avgBitrate: data[20] << 24 | data[21] << 16 | data[22] << 8 | data[23],
	                decoderConfigDescriptor: {
	                  tag: data[24],
	                  length: data[25],
	                  audioObjectType: data[26] >>> 3 & 0x1f,
	                  samplingFrequencyIndex: (data[26] & 0x07) << 1 | data[27] >>> 7 & 0x01,
	                  channelConfiguration: data[27] >>> 3 & 0x0f
	                }
	              }
	            };
	          },
	          ftyp: function ftyp(data) {
	            var view = new DataView(data.buffer, data.byteOffset, data.byteLength),
	                result = {
	              majorBrand: parseType(data.subarray(0, 4)),
	              minorVersion: view.getUint32(4),
	              compatibleBrands: []
	            },
	                i = 8;

	            while (i < data.byteLength) {
	              result.compatibleBrands.push(parseType(data.subarray(i, i + 4)));
	              i += 4;
	            }

	            return result;
	          },
	          dinf: function dinf(data) {
	            return {
	              boxes: inspectMp4(data)
	            };
	          },
	          dref: function dref(data) {
	            return {
	              version: data[0],
	              flags: new Uint8Array(data.subarray(1, 4)),
	              dataReferences: inspectMp4(data.subarray(8))
	            };
	          },
	          hdlr: function hdlr(data) {
	            var view = new DataView(data.buffer, data.byteOffset, data.byteLength),
	                result = {
	              version: view.getUint8(0),
	              flags: new Uint8Array(data.subarray(1, 4)),
	              handlerType: parseType(data.subarray(8, 12)),
	              name: ''
	            },
	                i = 8; // parse out the name field

	            for (i = 24; i < data.byteLength; i++) {
	              if (data[i] === 0x00) {
	                // the name field is null-terminated
	                i++;
	                break;
	              }

	              result.name += String.fromCharCode(data[i]);
	            } // decode UTF-8 to javascript's internal representation
	            // see http://ecmanaut.blogspot.com/2006/07/encoding-decoding-utf8-in-javascript.html


	            result.name = decodeURIComponent(global.escape(result.name));
	            return result;
	          },
	          mdat: function mdat(data) {
	            return {
	              byteLength: data.byteLength,
	              nals: nalParse(data)
	            };
	          },
	          mdhd: function mdhd(data) {
	            var view = new DataView(data.buffer, data.byteOffset, data.byteLength),
	                i = 4,
	                language,
	                result = {
	              version: view.getUint8(0),
	              flags: new Uint8Array(data.subarray(1, 4)),
	              language: ''
	            };

	            if (result.version === 1) {
	              i += 4;
	              result.creationTime = parseMp4Date(view.getUint32(i)); // truncating top 4 bytes

	              i += 8;
	              result.modificationTime = parseMp4Date(view.getUint32(i)); // truncating top 4 bytes

	              i += 4;
	              result.timescale = view.getUint32(i);
	              i += 8;
	              result.duration = view.getUint32(i); // truncating top 4 bytes
	            } else {
	              result.creationTime = parseMp4Date(view.getUint32(i));
	              i += 4;
	              result.modificationTime = parseMp4Date(view.getUint32(i));
	              i += 4;
	              result.timescale = view.getUint32(i);
	              i += 4;
	              result.duration = view.getUint32(i);
	            }

	            i += 4; // language is stored as an ISO-639-2/T code in an array of three 5-bit fields
	            // each field is the packed difference between its ASCII value and 0x60

	            language = view.getUint16(i);
	            result.language += String.fromCharCode((language >> 10) + 0x60);
	            result.language += String.fromCharCode(((language & 0x03c0) >> 5) + 0x60);
	            result.language += String.fromCharCode((language & 0x1f) + 0x60);
	            return result;
	          },
	          mdia: function mdia(data) {
	            return {
	              boxes: inspectMp4(data)
	            };
	          },
	          mfhd: function mfhd(data) {
	            return {
	              version: data[0],
	              flags: new Uint8Array(data.subarray(1, 4)),
	              sequenceNumber: data[4] << 24 | data[5] << 16 | data[6] << 8 | data[7]
	            };
	          },
	          minf: function minf(data) {
	            return {
	              boxes: inspectMp4(data)
	            };
	          },
	          // codingname, not a first-class box type. stsd entries share the
	          // same format as real boxes so the parsing infrastructure can be
	          // shared
	          mp4a: function mp4a(data) {
	            var view = new DataView(data.buffer, data.byteOffset, data.byteLength),
	                result = {
	              // 6 bytes reserved
	              dataReferenceIndex: view.getUint16(6),
	              // 4 + 4 bytes reserved
	              channelcount: view.getUint16(16),
	              samplesize: view.getUint16(18),
	              // 2 bytes pre_defined
	              // 2 bytes reserved
	              samplerate: view.getUint16(24) + view.getUint16(26) / 65536
	            }; // if there are more bytes to process, assume this is an ISO/IEC
	            // 14496-14 MP4AudioSampleEntry and parse the ESDBox

	            if (data.byteLength > 28) {
	              result.streamDescriptor = inspectMp4(data.subarray(28))[0];
	            }

	            return result;
	          },
	          moof: function moof(data) {
	            return {
	              boxes: inspectMp4(data)
	            };
	          },
	          moov: function moov(data) {
	            return {
	              boxes: inspectMp4(data)
	            };
	          },
	          mvex: function mvex(data) {
	            return {
	              boxes: inspectMp4(data)
	            };
	          },
	          mvhd: function mvhd(data) {
	            var view = new DataView(data.buffer, data.byteOffset, data.byteLength),
	                i = 4,
	                result = {
	              version: view.getUint8(0),
	              flags: new Uint8Array(data.subarray(1, 4))
	            };

	            if (result.version === 1) {
	              i += 4;
	              result.creationTime = parseMp4Date(view.getUint32(i)); // truncating top 4 bytes

	              i += 8;
	              result.modificationTime = parseMp4Date(view.getUint32(i)); // truncating top 4 bytes

	              i += 4;
	              result.timescale = view.getUint32(i);
	              i += 8;
	              result.duration = view.getUint32(i); // truncating top 4 bytes
	            } else {
	              result.creationTime = parseMp4Date(view.getUint32(i));
	              i += 4;
	              result.modificationTime = parseMp4Date(view.getUint32(i));
	              i += 4;
	              result.timescale = view.getUint32(i);
	              i += 4;
	              result.duration = view.getUint32(i);
	            }

	            i += 4; // convert fixed-point, base 16 back to a number

	            result.rate = view.getUint16(i) + view.getUint16(i + 2) / 16;
	            i += 4;
	            result.volume = view.getUint8(i) + view.getUint8(i + 1) / 8;
	            i += 2;
	            i += 2;
	            i += 2 * 4;
	            result.matrix = new Uint32Array(data.subarray(i, i + 9 * 4));
	            i += 9 * 4;
	            i += 6 * 4;
	            result.nextTrackId = view.getUint32(i);
	            return result;
	          },
	          pdin: function pdin(data) {
	            var view = new DataView(data.buffer, data.byteOffset, data.byteLength);
	            return {
	              version: view.getUint8(0),
	              flags: new Uint8Array(data.subarray(1, 4)),
	              rate: view.getUint32(4),
	              initialDelay: view.getUint32(8)
	            };
	          },
	          sdtp: function sdtp(data) {
	            var result = {
	              version: data[0],
	              flags: new Uint8Array(data.subarray(1, 4)),
	              samples: []
	            },
	                i;

	            for (i = 4; i < data.byteLength; i++) {
	              result.samples.push({
	                dependsOn: (data[i] & 0x30) >> 4,
	                isDependedOn: (data[i] & 0x0c) >> 2,
	                hasRedundancy: data[i] & 0x03
	              });
	            }

	            return result;
	          },
	          sidx: function sidx(data) {
	            var view = new DataView(data.buffer, data.byteOffset, data.byteLength),
	                result = {
	              version: data[0],
	              flags: new Uint8Array(data.subarray(1, 4)),
	              references: [],
	              referenceId: view.getUint32(4),
	              timescale: view.getUint32(8),
	              earliestPresentationTime: view.getUint32(12),
	              firstOffset: view.getUint32(16)
	            },
	                referenceCount = view.getUint16(22),
	                i;

	            for (i = 24; referenceCount; i += 12, referenceCount--) {
	              result.references.push({
	                referenceType: (data[i] & 0x80) >>> 7,
	                referencedSize: view.getUint32(i) & 0x7FFFFFFF,
	                subsegmentDuration: view.getUint32(i + 4),
	                startsWithSap: !!(data[i + 8] & 0x80),
	                sapType: (data[i + 8] & 0x70) >>> 4,
	                sapDeltaTime: view.getUint32(i + 8) & 0x0FFFFFFF
	              });
	            }

	            return result;
	          },
	          smhd: function smhd(data) {
	            return {
	              version: data[0],
	              flags: new Uint8Array(data.subarray(1, 4)),
	              balance: data[4] + data[5] / 256
	            };
	          },
	          stbl: function stbl(data) {
	            return {
	              boxes: inspectMp4(data)
	            };
	          },
	          stco: function stco(data) {
	            var view = new DataView(data.buffer, data.byteOffset, data.byteLength),
	                result = {
	              version: data[0],
	              flags: new Uint8Array(data.subarray(1, 4)),
	              chunkOffsets: []
	            },
	                entryCount = view.getUint32(4),
	                i;

	            for (i = 8; entryCount; i += 4, entryCount--) {
	              result.chunkOffsets.push(view.getUint32(i));
	            }

	            return result;
	          },
	          stsc: function stsc(data) {
	            var view = new DataView(data.buffer, data.byteOffset, data.byteLength),
	                entryCount = view.getUint32(4),
	                result = {
	              version: data[0],
	              flags: new Uint8Array(data.subarray(1, 4)),
	              sampleToChunks: []
	            },
	                i;

	            for (i = 8; entryCount; i += 12, entryCount--) {
	              result.sampleToChunks.push({
	                firstChunk: view.getUint32(i),
	                samplesPerChunk: view.getUint32(i + 4),
	                sampleDescriptionIndex: view.getUint32(i + 8)
	              });
	            }

	            return result;
	          },
	          stsd: function stsd(data) {
	            return {
	              version: data[0],
	              flags: new Uint8Array(data.subarray(1, 4)),
	              sampleDescriptions: inspectMp4(data.subarray(8))
	            };
	          },
	          stsz: function stsz(data) {
	            var view = new DataView(data.buffer, data.byteOffset, data.byteLength),
	                result = {
	              version: data[0],
	              flags: new Uint8Array(data.subarray(1, 4)),
	              sampleSize: view.getUint32(4),
	              entries: []
	            },
	                i;

	            for (i = 12; i < data.byteLength; i += 4) {
	              result.entries.push(view.getUint32(i));
	            }

	            return result;
	          },
	          stts: function stts(data) {
	            var view = new DataView(data.buffer, data.byteOffset, data.byteLength),
	                result = {
	              version: data[0],
	              flags: new Uint8Array(data.subarray(1, 4)),
	              timeToSamples: []
	            },
	                entryCount = view.getUint32(4),
	                i;

	            for (i = 8; entryCount; i += 8, entryCount--) {
	              result.timeToSamples.push({
	                sampleCount: view.getUint32(i),
	                sampleDelta: view.getUint32(i + 4)
	              });
	            }

	            return result;
	          },
	          styp: function styp(data) {
	            return parse.ftyp(data);
	          },
	          tfdt: function tfdt(data) {
	            var result = {
	              version: data[0],
	              flags: new Uint8Array(data.subarray(1, 4)),
	              baseMediaDecodeTime: data[4] << 24 | data[5] << 16 | data[6] << 8 | data[7]
	            };

	            if (result.version === 1) {
	              result.baseMediaDecodeTime *= Math.pow(2, 32);
	              result.baseMediaDecodeTime += data[8] << 24 | data[9] << 16 | data[10] << 8 | data[11];
	            }

	            return result;
	          },
	          tfhd: function tfhd(data) {
	            var view = new DataView(data.buffer, data.byteOffset, data.byteLength),
	                result = {
	              version: data[0],
	              flags: new Uint8Array(data.subarray(1, 4)),
	              trackId: view.getUint32(4)
	            },
	                baseDataOffsetPresent = result.flags[2] & 0x01,
	                sampleDescriptionIndexPresent = result.flags[2] & 0x02,
	                defaultSampleDurationPresent = result.flags[2] & 0x08,
	                defaultSampleSizePresent = result.flags[2] & 0x10,
	                defaultSampleFlagsPresent = result.flags[2] & 0x20,
	                i;
	            i = 8;

	            if (baseDataOffsetPresent) {
	              i += 4; // truncate top 4 bytes

	              result.baseDataOffset = view.getUint32(12);
	              i += 4;
	            }

	            if (sampleDescriptionIndexPresent) {
	              result.sampleDescriptionIndex = view.getUint32(i);
	              i += 4;
	            }

	            if (defaultSampleDurationPresent) {
	              result.defaultSampleDuration = view.getUint32(i);
	              i += 4;
	            }

	            if (defaultSampleSizePresent) {
	              result.defaultSampleSize = view.getUint32(i);
	              i += 4;
	            }

	            if (defaultSampleFlagsPresent) {
	              result.defaultSampleFlags = view.getUint32(i);
	            }

	            return result;
	          },
	          tkhd: function tkhd(data) {
	            var view = new DataView(data.buffer, data.byteOffset, data.byteLength),
	                i = 4,
	                result = {
	              version: view.getUint8(0),
	              flags: new Uint8Array(data.subarray(1, 4))
	            };

	            if (result.version === 1) {
	              i += 4;
	              result.creationTime = parseMp4Date(view.getUint32(i)); // truncating top 4 bytes

	              i += 8;
	              result.modificationTime = parseMp4Date(view.getUint32(i)); // truncating top 4 bytes

	              i += 4;
	              result.trackId = view.getUint32(i);
	              i += 4;
	              i += 8;
	              result.duration = view.getUint32(i); // truncating top 4 bytes
	            } else {
	              result.creationTime = parseMp4Date(view.getUint32(i));
	              i += 4;
	              result.modificationTime = parseMp4Date(view.getUint32(i));
	              i += 4;
	              result.trackId = view.getUint32(i);
	              i += 4;
	              i += 4;
	              result.duration = view.getUint32(i);
	            }

	            i += 4;
	            i += 2 * 4;
	            result.layer = view.getUint16(i);
	            i += 2;
	            result.alternateGroup = view.getUint16(i);
	            i += 2; // convert fixed-point, base 16 back to a number

	            result.volume = view.getUint8(i) + view.getUint8(i + 1) / 8;
	            i += 2;
	            i += 2;
	            result.matrix = new Uint32Array(data.subarray(i, i + 9 * 4));
	            i += 9 * 4;
	            result.width = view.getUint16(i) + view.getUint16(i + 2) / 16;
	            i += 4;
	            result.height = view.getUint16(i) + view.getUint16(i + 2) / 16;
	            return result;
	          },
	          traf: function traf(data) {
	            return {
	              boxes: inspectMp4(data)
	            };
	          },
	          trak: function trak(data) {
	            return {
	              boxes: inspectMp4(data)
	            };
	          },
	          trex: function trex(data) {
	            var view = new DataView(data.buffer, data.byteOffset, data.byteLength);
	            return {
	              version: data[0],
	              flags: new Uint8Array(data.subarray(1, 4)),
	              trackId: view.getUint32(4),
	              defaultSampleDescriptionIndex: view.getUint32(8),
	              defaultSampleDuration: view.getUint32(12),
	              defaultSampleSize: view.getUint32(16),
	              sampleDependsOn: data[20] & 0x03,
	              sampleIsDependedOn: (data[21] & 0xc0) >> 6,
	              sampleHasRedundancy: (data[21] & 0x30) >> 4,
	              samplePaddingValue: (data[21] & 0x0e) >> 1,
	              sampleIsDifferenceSample: !!(data[21] & 0x01),
	              sampleDegradationPriority: view.getUint16(22)
	            };
	          },
	          trun: function trun(data) {
	            var result = {
	              version: data[0],
	              flags: new Uint8Array(data.subarray(1, 4)),
	              samples: []
	            },
	                view = new DataView(data.buffer, data.byteOffset, data.byteLength),
	                dataOffsetPresent = result.flags[2] & 0x01,
	                firstSampleFlagsPresent = result.flags[2] & 0x04,
	                sampleDurationPresent = result.flags[1] & 0x01,
	                sampleSizePresent = result.flags[1] & 0x02,
	                sampleFlagsPresent = result.flags[1] & 0x04,
	                sampleCompositionTimeOffsetPresent = result.flags[1] & 0x08,
	                sampleCount = view.getUint32(4),
	                offset = 8,
	                sample;

	            if (dataOffsetPresent) {
	              result.dataOffset = view.getUint32(offset);
	              offset += 4;
	            }

	            if (firstSampleFlagsPresent && sampleCount) {
	              sample = {
	                flags: parseSampleFlags(data.subarray(offset, offset + 4))
	              };
	              offset += 4;

	              if (sampleDurationPresent) {
	                sample.duration = view.getUint32(offset);
	                offset += 4;
	              }

	              if (sampleSizePresent) {
	                sample.size = view.getUint32(offset);
	                offset += 4;
	              }

	              if (sampleCompositionTimeOffsetPresent) {
	                sample.compositionTimeOffset = view.getUint32(offset);
	                offset += 4;
	              }

	              result.samples.push(sample);
	              sampleCount--;
	            }

	            while (sampleCount--) {
	              sample = {};

	              if (sampleDurationPresent) {
	                sample.duration = view.getUint32(offset);
	                offset += 4;
	              }

	              if (sampleSizePresent) {
	                sample.size = view.getUint32(offset);
	                offset += 4;
	              }

	              if (sampleFlagsPresent) {
	                sample.flags = parseSampleFlags(data.subarray(offset, offset + 4));
	                offset += 4;
	              }

	              if (sampleCompositionTimeOffsetPresent) {
	                sample.compositionTimeOffset = view.getUint32(offset);
	                offset += 4;
	              }

	              result.samples.push(sample);
	            }

	            return result;
	          },
	          'url ': function url(data) {
	            return {
	              version: data[0],
	              flags: new Uint8Array(data.subarray(1, 4))
	            };
	          },
	          vmhd: function vmhd(data) {
	            var view = new DataView(data.buffer, data.byteOffset, data.byteLength);
	            return {
	              version: data[0],
	              flags: new Uint8Array(data.subarray(1, 4)),
	              graphicsmode: view.getUint16(4),
	              opcolor: new Uint16Array([view.getUint16(6), view.getUint16(8), view.getUint16(10)])
	            };
	          }
	        };
	        /**
	         * Return a javascript array of box objects parsed from an ISO base
	         * media file.
	         * @param data {Uint8Array} the binary data of the media to be inspected
	         * @return {array} a javascript array of potentially nested box objects
	         */


	        inspectMp4 = function inspectMp4(data) {
	          var i = 0,
	              result = [],
	              view,
	              size,
	              type,
	              end,
	              box; // Convert data from Uint8Array to ArrayBuffer, to follow Dataview API

	          var ab = new ArrayBuffer(data.length);
	          var v = new Uint8Array(ab);

	          for (var z = 0; z < data.length; ++z) {
	            v[z] = data[z];
	          }

	          view = new DataView(ab);

	          while (i < data.byteLength) {
	            // parse box data
	            size = view.getUint32(i);
	            type = parseType(data.subarray(i + 4, i + 8));
	            end = size > 1 ? i + size : data.byteLength; // parse type-specific data

	            box = (parse[type] || function (data) {
	              return {
	                data: data
	              };
	            })(data.subarray(i + 8, end));

	            box.size = size;
	            box.type = type; // store this box and move to the next

	            result.push(box);
	            i = end;
	          }

	          return result;
	        };
	        /**
	         * Returns a textual representation of the javascript represtentation
	         * of an MP4 file. You can use it as an alternative to
	         * JSON.stringify() to compare inspected MP4s.
	         * @param inspectedMp4 {array} the parsed array of boxes in an MP4
	         * file
	         * @param depth {number} (optional) the number of ancestor boxes of
	         * the elements of inspectedMp4. Assumed to be zero if unspecified.
	         * @return {string} a text representation of the parsed MP4
	         */


	        _textifyMp = function textifyMp4(inspectedMp4, depth) {
	          var indent;
	          depth = depth || 0;
	          indent = new Array(depth * 2 + 1).join(' '); // iterate over all the boxes

	          return inspectedMp4.map(function (box, index) {
	            // list the box type first at the current indentation level
	            return indent + box.type + '\n' + // the type is already included and handle child boxes separately
	            Object.keys(box).filter(function (key) {
	              return key !== 'type' && key !== 'boxes'; // output all the box properties
	            }).map(function (key) {
	              var prefix = indent + '  ' + key + ': ',
	                  value = box[key]; // print out raw bytes as hexademical

	              if (value instanceof Uint8Array || value instanceof Uint32Array) {
	                var bytes = Array.prototype.slice.call(new Uint8Array(value.buffer, value.byteOffset, value.byteLength)).map(function (byte) {
	                  return ' ' + ('00' + byte.toString(16)).slice(-2);
	                }).join('').match(/.{1,24}/g);

	                if (!bytes) {
	                  return prefix + '<>';
	                }

	                if (bytes.length === 1) {
	                  return prefix + '<' + bytes.join('').slice(1) + '>';
	                }

	                return prefix + '<\n' + bytes.map(function (line) {
	                  return indent + '  ' + line;
	                }).join('\n') + '\n' + indent + '  >';
	              } // stringify generic objects


	              return prefix + JSON.stringify(value, null, 2).split('\n').map(function (line, index) {
	                if (index === 0) {
	                  return line;
	                }

	                return indent + '  ' + line;
	              }).join('\n');
	            }).join('\n') + ( // recursively textify the child boxes
	            box.boxes ? '\n' + _textifyMp(box.boxes, depth + 1) : '');
	          }).join('\n');
	        };

	        module.exports = {
	          inspect: inspectMp4,
	          textify: _textifyMp
	        };
	      }).call(this, typeof global$1 !== "undefined" ? global$1 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
	    }, {
	      "../mp4/probe": 23
	    }],
	    27: [function (require, module, exports) {

	      var StreamTypes = require('../m2ts/stream-types.js');

	      var handleRollover = require('../m2ts/timestamp-rollover-stream.js').handleRollover;

	      var probe = {};
	      probe.ts = require('../m2ts/probe.js');
	      probe.aac = require('../aac/probe.js');
	      var PES_TIMESCALE = 90000,
	          MP2T_PACKET_LENGTH = 188,
	          // bytes
	      SYNC_BYTE = 0x47;

	      var isLikelyAacData = function isLikelyAacData(data) {
	        if (data[0] === 'I'.charCodeAt(0) && data[1] === 'D'.charCodeAt(0) && data[2] === '3'.charCodeAt(0)) {
	          return true;
	        }

	        return false;
	      };
	      /**
	       * walks through segment data looking for pat and pmt packets to parse out
	       * program map table information
	       */


	      var parsePsi_ = function parsePsi_(bytes, pmt) {
	        var startIndex = 0,
	            endIndex = MP2T_PACKET_LENGTH,
	            packet,
	            type;

	        while (endIndex < bytes.byteLength) {
	          // Look for a pair of start and end sync bytes in the data..
	          if (bytes[startIndex] === SYNC_BYTE && bytes[endIndex] === SYNC_BYTE) {
	            // We found a packet
	            packet = bytes.subarray(startIndex, endIndex);
	            type = probe.ts.parseType(packet, pmt.pid);

	            switch (type) {
	              case 'pat':
	                if (!pmt.pid) {
	                  pmt.pid = probe.ts.parsePat(packet);
	                }

	                break;

	              case 'pmt':
	                if (!pmt.table) {
	                  pmt.table = probe.ts.parsePmt(packet);
	                }

	                break;

	              default:
	                break;
	            } // Found the pat and pmt, we can stop walking the segment


	            if (pmt.pid && pmt.table) {
	              return;
	            }

	            startIndex += MP2T_PACKET_LENGTH;
	            endIndex += MP2T_PACKET_LENGTH;
	            continue;
	          } // If we get here, we have somehow become de-synchronized and we need to step
	          // forward one byte at a time until we find a pair of sync bytes that denote
	          // a packet


	          startIndex++;
	          endIndex++;
	        }
	      };
	      /**
	       * walks through the segment data from the start and end to get timing information
	       * for the first and last audio pes packets
	       */


	      var parseAudioPes_ = function parseAudioPes_(bytes, pmt, result) {
	        var startIndex = 0,
	            endIndex = MP2T_PACKET_LENGTH,
	            packet,
	            type,
	            pesType,
	            pusi,
	            parsed;
	        var endLoop = false; // Start walking from start of segment to get first audio packet

	        while (endIndex < bytes.byteLength) {
	          // Look for a pair of start and end sync bytes in the data..
	          if (bytes[startIndex] === SYNC_BYTE && bytes[endIndex] === SYNC_BYTE) {
	            // We found a packet
	            packet = bytes.subarray(startIndex, endIndex);
	            type = probe.ts.parseType(packet, pmt.pid);

	            switch (type) {
	              case 'pes':
	                pesType = probe.ts.parsePesType(packet, pmt.table);
	                pusi = probe.ts.parsePayloadUnitStartIndicator(packet);

	                if (pesType === 'audio' && pusi) {
	                  parsed = probe.ts.parsePesTime(packet);

	                  if (parsed) {
	                    parsed.type = 'audio';
	                    result.audio.push(parsed);
	                    endLoop = true;
	                  }
	                }

	                break;

	              default:
	                break;
	            }

	            if (endLoop) {
	              break;
	            }

	            startIndex += MP2T_PACKET_LENGTH;
	            endIndex += MP2T_PACKET_LENGTH;
	            continue;
	          } // If we get here, we have somehow become de-synchronized and we need to step
	          // forward one byte at a time until we find a pair of sync bytes that denote
	          // a packet


	          startIndex++;
	          endIndex++;
	        } // Start walking from end of segment to get last audio packet


	        endIndex = bytes.byteLength;
	        startIndex = endIndex - MP2T_PACKET_LENGTH;
	        endLoop = false;

	        while (startIndex >= 0) {
	          // Look for a pair of start and end sync bytes in the data..
	          if (bytes[startIndex] === SYNC_BYTE && bytes[endIndex] === SYNC_BYTE) {
	            // We found a packet
	            packet = bytes.subarray(startIndex, endIndex);
	            type = probe.ts.parseType(packet, pmt.pid);

	            switch (type) {
	              case 'pes':
	                pesType = probe.ts.parsePesType(packet, pmt.table);
	                pusi = probe.ts.parsePayloadUnitStartIndicator(packet);

	                if (pesType === 'audio' && pusi) {
	                  parsed = probe.ts.parsePesTime(packet);

	                  if (parsed) {
	                    parsed.type = 'audio';
	                    result.audio.push(parsed);
	                    endLoop = true;
	                  }
	                }

	                break;

	              default:
	                break;
	            }

	            if (endLoop) {
	              break;
	            }

	            startIndex -= MP2T_PACKET_LENGTH;
	            endIndex -= MP2T_PACKET_LENGTH;
	            continue;
	          } // If we get here, we have somehow become de-synchronized and we need to step
	          // forward one byte at a time until we find a pair of sync bytes that denote
	          // a packet


	          startIndex--;
	          endIndex--;
	        }
	      };
	      /**
	       * walks through the segment data from the start and end to get timing information
	       * for the first and last video pes packets as well as timing information for the first
	       * key frame.
	       */


	      var parseVideoPes_ = function parseVideoPes_(bytes, pmt, result) {
	        var startIndex = 0,
	            endIndex = MP2T_PACKET_LENGTH,
	            packet,
	            type,
	            pesType,
	            pusi,
	            parsed,
	            frame,
	            i,
	            pes;
	        var endLoop = false;
	        var currentFrame = {
	          data: [],
	          size: 0
	        }; // Start walking from start of segment to get first video packet

	        while (endIndex < bytes.byteLength) {
	          // Look for a pair of start and end sync bytes in the data..
	          if (bytes[startIndex] === SYNC_BYTE && bytes[endIndex] === SYNC_BYTE) {
	            // We found a packet
	            packet = bytes.subarray(startIndex, endIndex);
	            type = probe.ts.parseType(packet, pmt.pid);

	            switch (type) {
	              case 'pes':
	                pesType = probe.ts.parsePesType(packet, pmt.table);
	                pusi = probe.ts.parsePayloadUnitStartIndicator(packet);

	                if (pesType === 'video') {
	                  if (pusi && !endLoop) {
	                    parsed = probe.ts.parsePesTime(packet);

	                    if (parsed) {
	                      parsed.type = 'video';
	                      result.video.push(parsed);
	                      endLoop = true;
	                    }
	                  }

	                  if (!result.firstKeyFrame) {
	                    if (pusi) {
	                      if (currentFrame.size !== 0) {
	                        frame = new Uint8Array(currentFrame.size);
	                        i = 0;

	                        while (currentFrame.data.length) {
	                          pes = currentFrame.data.shift();
	                          frame.set(pes, i);
	                          i += pes.byteLength;
	                        }

	                        if (probe.ts.videoPacketContainsKeyFrame(frame)) {
	                          result.firstKeyFrame = probe.ts.parsePesTime(frame);
	                          result.firstKeyFrame.type = 'video';
	                        }

	                        currentFrame.size = 0;
	                      }
	                    }

	                    currentFrame.data.push(packet);
	                    currentFrame.size += packet.byteLength;
	                  }
	                }

	                break;

	              default:
	                break;
	            }

	            if (endLoop && result.firstKeyFrame) {
	              break;
	            }

	            startIndex += MP2T_PACKET_LENGTH;
	            endIndex += MP2T_PACKET_LENGTH;
	            continue;
	          } // If we get here, we have somehow become de-synchronized and we need to step
	          // forward one byte at a time until we find a pair of sync bytes that denote
	          // a packet


	          startIndex++;
	          endIndex++;
	        } // Start walking from end of segment to get last video packet


	        endIndex = bytes.byteLength;
	        startIndex = endIndex - MP2T_PACKET_LENGTH;
	        endLoop = false;

	        while (startIndex >= 0) {
	          // Look for a pair of start and end sync bytes in the data..
	          if (bytes[startIndex] === SYNC_BYTE && bytes[endIndex] === SYNC_BYTE) {
	            // We found a packet
	            packet = bytes.subarray(startIndex, endIndex);
	            type = probe.ts.parseType(packet, pmt.pid);

	            switch (type) {
	              case 'pes':
	                pesType = probe.ts.parsePesType(packet, pmt.table);
	                pusi = probe.ts.parsePayloadUnitStartIndicator(packet);

	                if (pesType === 'video' && pusi) {
	                  parsed = probe.ts.parsePesTime(packet);

	                  if (parsed) {
	                    parsed.type = 'video';
	                    result.video.push(parsed);
	                    endLoop = true;
	                  }
	                }

	                break;

	              default:
	                break;
	            }

	            if (endLoop) {
	              break;
	            }

	            startIndex -= MP2T_PACKET_LENGTH;
	            endIndex -= MP2T_PACKET_LENGTH;
	            continue;
	          } // If we get here, we have somehow become de-synchronized and we need to step
	          // forward one byte at a time until we find a pair of sync bytes that denote
	          // a packet


	          startIndex--;
	          endIndex--;
	        }
	      };
	      /**
	       * Adjusts the timestamp information for the segment to account for
	       * rollover and convert to seconds based on pes packet timescale (90khz clock)
	       */


	      var adjustTimestamp_ = function adjustTimestamp_(segmentInfo, baseTimestamp) {
	        if (segmentInfo.audio && segmentInfo.audio.length) {
	          var audioBaseTimestamp = baseTimestamp;

	          if (typeof audioBaseTimestamp === 'undefined') {
	            audioBaseTimestamp = segmentInfo.audio[0].dts;
	          }

	          segmentInfo.audio.forEach(function (info) {
	            info.dts = handleRollover(info.dts, audioBaseTimestamp);
	            info.pts = handleRollover(info.pts, audioBaseTimestamp); // time in seconds

	            info.dtsTime = info.dts / PES_TIMESCALE;
	            info.ptsTime = info.pts / PES_TIMESCALE;
	          });
	        }

	        if (segmentInfo.video && segmentInfo.video.length) {
	          var videoBaseTimestamp = baseTimestamp;

	          if (typeof videoBaseTimestamp === 'undefined') {
	            videoBaseTimestamp = segmentInfo.video[0].dts;
	          }

	          segmentInfo.video.forEach(function (info) {
	            info.dts = handleRollover(info.dts, videoBaseTimestamp);
	            info.pts = handleRollover(info.pts, videoBaseTimestamp); // time in seconds

	            info.dtsTime = info.dts / PES_TIMESCALE;
	            info.ptsTime = info.pts / PES_TIMESCALE;
	          });

	          if (segmentInfo.firstKeyFrame) {
	            var frame = segmentInfo.firstKeyFrame;
	            frame.dts = handleRollover(frame.dts, videoBaseTimestamp);
	            frame.pts = handleRollover(frame.pts, videoBaseTimestamp); // time in seconds

	            frame.dtsTime = frame.dts / PES_TIMESCALE;
	            frame.ptsTime = frame.dts / PES_TIMESCALE;
	          }
	        }
	      };
	      /**
	       * inspects the aac data stream for start and end time information
	       */


	      var inspectAac_ = function inspectAac_(bytes) {
	        var endLoop = false,
	            audioCount = 0,
	            sampleRate = null,
	            timestamp = null,
	            frameSize = 0,
	            byteIndex = 0,
	            packet;

	        while (bytes.length - byteIndex >= 3) {
	          var type = probe.aac.parseType(bytes, byteIndex);

	          switch (type) {
	            case 'timed-metadata':
	              // Exit early because we don't have enough to parse
	              // the ID3 tag header
	              if (bytes.length - byteIndex < 10) {
	                endLoop = true;
	                break;
	              }

	              frameSize = probe.aac.parseId3TagSize(bytes, byteIndex); // Exit early if we don't have enough in the buffer
	              // to emit a full packet

	              if (frameSize > bytes.length) {
	                endLoop = true;
	                break;
	              }

	              if (timestamp === null) {
	                packet = bytes.subarray(byteIndex, byteIndex + frameSize);
	                timestamp = probe.aac.parseAacTimestamp(packet);
	              }

	              byteIndex += frameSize;
	              break;

	            case 'audio':
	              // Exit early because we don't have enough to parse
	              // the ADTS frame header
	              if (bytes.length - byteIndex < 7) {
	                endLoop = true;
	                break;
	              }

	              frameSize = probe.aac.parseAdtsSize(bytes, byteIndex); // Exit early if we don't have enough in the buffer
	              // to emit a full packet

	              if (frameSize > bytes.length) {
	                endLoop = true;
	                break;
	              }

	              if (sampleRate === null) {
	                packet = bytes.subarray(byteIndex, byteIndex + frameSize);
	                sampleRate = probe.aac.parseSampleRate(packet);
	              }

	              audioCount++;
	              byteIndex += frameSize;
	              break;

	            default:
	              byteIndex++;
	              break;
	          }

	          if (endLoop) {
	            return null;
	          }
	        }

	        if (sampleRate === null || timestamp === null) {
	          return null;
	        }

	        var audioTimescale = PES_TIMESCALE / sampleRate;
	        var result = {
	          audio: [{
	            type: 'audio',
	            dts: timestamp,
	            pts: timestamp
	          }, {
	            type: 'audio',
	            dts: timestamp + audioCount * 1024 * audioTimescale,
	            pts: timestamp + audioCount * 1024 * audioTimescale
	          }]
	        };
	        return result;
	      };
	      /**
	       * inspects the transport stream segment data for start and end time information
	       * of the audio and video tracks (when present) as well as the first key frame's
	       * start time.
	       */


	      var inspectTs_ = function inspectTs_(bytes) {
	        var pmt = {
	          pid: null,
	          table: null
	        };
	        var result = {};
	        parsePsi_(bytes, pmt);

	        for (var pid in pmt.table) {
	          if (pmt.table.hasOwnProperty(pid)) {
	            var type = pmt.table[pid];

	            switch (type) {
	              case StreamTypes.H264_STREAM_TYPE:
	                result.video = [];
	                parseVideoPes_(bytes, pmt, result);

	                if (result.video.length === 0) {
	                  delete result.video;
	                }

	                break;

	              case StreamTypes.ADTS_STREAM_TYPE:
	                result.audio = [];
	                parseAudioPes_(bytes, pmt, result);

	                if (result.audio.length === 0) {
	                  delete result.audio;
	                }

	                break;

	              default:
	                break;
	            }
	          }
	        }

	        return result;
	      };
	      /**
	       * Inspects segment byte data and returns an object with start and end timing information
	       *
	       * @param {Uint8Array} bytes The segment byte data
	       * @param {Number} baseTimestamp Relative reference timestamp used when adjusting frame
	       *  timestamps for rollover. This value must be in 90khz clock.
	       * @return {Object} Object containing start and end frame timing info of segment.
	       */


	      var inspect = function inspect(bytes, baseTimestamp) {
	        var isAacData = isLikelyAacData(bytes);
	        var result;

	        if (isAacData) {
	          result = inspectAac_(bytes);
	        } else {
	          result = inspectTs_(bytes);
	        }

	        if (!result || !result.audio && !result.video) {
	          return null;
	        }

	        adjustTimestamp_(result, baseTimestamp);
	        return result;
	      };

	      module.exports = {
	        inspect: inspect
	      };
	    }, {
	      "../aac/probe.js": 2,
	      "../m2ts/probe.js": 18,
	      "../m2ts/stream-types.js": 19,
	      "../m2ts/timestamp-rollover-stream.js": 20
	    }],
	    28: [function (require, module, exports) {
	      var ONE_SECOND_IN_TS = 90000,
	          // 90kHz clock
	      secondsToVideoTs,
	          secondsToAudioTs,
	          videoTsToSeconds,
	          audioTsToSeconds,
	          audioTsToVideoTs,
	          videoTsToAudioTs;

	      secondsToVideoTs = function secondsToVideoTs(seconds) {
	        return seconds * ONE_SECOND_IN_TS;
	      };

	      secondsToAudioTs = function secondsToAudioTs(seconds, sampleRate) {
	        return seconds * sampleRate;
	      };

	      videoTsToSeconds = function videoTsToSeconds(timestamp) {
	        return timestamp / ONE_SECOND_IN_TS;
	      };

	      audioTsToSeconds = function audioTsToSeconds(timestamp, sampleRate) {
	        return timestamp / sampleRate;
	      };

	      audioTsToVideoTs = function audioTsToVideoTs(timestamp, sampleRate) {
	        return secondsToVideoTs(audioTsToSeconds(timestamp, sampleRate));
	      };

	      videoTsToAudioTs = function videoTsToAudioTs(timestamp, sampleRate) {
	        return secondsToAudioTs(videoTsToSeconds(timestamp), sampleRate);
	      };

	      module.exports = {
	        secondsToVideoTs: secondsToVideoTs,
	        secondsToAudioTs: secondsToAudioTs,
	        videoTsToSeconds: videoTsToSeconds,
	        audioTsToSeconds: audioTsToSeconds,
	        audioTsToVideoTs: audioTsToVideoTs,
	        videoTsToAudioTs: videoTsToAudioTs
	      };
	    }, {}],
	    29: [function (require, module, exports) {

	      var ExpGolomb;
	      /**
	       * Parser for exponential Golomb codes, a variable-bitwidth number encoding
	       * scheme used by h264.
	       */

	      ExpGolomb = function ExpGolomb(workingData) {
	        var // the number of bytes left to examine in workingData
	        workingBytesAvailable = workingData.byteLength,
	            // the current word being examined
	        workingWord = 0,
	            // :uint
	        // the number of bits left to examine in the current word
	        workingBitsAvailable = 0; // :uint;
	        // ():uint

	        this.length = function () {
	          return 8 * workingBytesAvailable;
	        }; // ():uint


	        this.bitsAvailable = function () {
	          return 8 * workingBytesAvailable + workingBitsAvailable;
	        }; // ():void


	        this.loadWord = function () {
	          var position = workingData.byteLength - workingBytesAvailable,
	              workingBytes = new Uint8Array(4),
	              availableBytes = Math.min(4, workingBytesAvailable);

	          if (availableBytes === 0) {
	            throw new Error('no bytes available');
	          }

	          workingBytes.set(workingData.subarray(position, position + availableBytes));
	          workingWord = new DataView(workingBytes.buffer).getUint32(0); // track the amount of workingData that has been processed

	          workingBitsAvailable = availableBytes * 8;
	          workingBytesAvailable -= availableBytes;
	        }; // (count:int):void


	        this.skipBits = function (count) {
	          var skipBytes; // :int

	          if (workingBitsAvailable > count) {
	            workingWord <<= count;
	            workingBitsAvailable -= count;
	          } else {
	            count -= workingBitsAvailable;
	            skipBytes = Math.floor(count / 8);
	            count -= skipBytes * 8;
	            workingBytesAvailable -= skipBytes;
	            this.loadWord();
	            workingWord <<= count;
	            workingBitsAvailable -= count;
	          }
	        }; // (size:int):uint


	        this.readBits = function (size) {
	          var bits = Math.min(workingBitsAvailable, size),
	              // :uint
	          valu = workingWord >>> 32 - bits; // :uint
	          // if size > 31, handle error

	          workingBitsAvailable -= bits;

	          if (workingBitsAvailable > 0) {
	            workingWord <<= bits;
	          } else if (workingBytesAvailable > 0) {
	            this.loadWord();
	          }

	          bits = size - bits;

	          if (bits > 0) {
	            return valu << bits | this.readBits(bits);
	          }

	          return valu;
	        }; // ():uint


	        this.skipLeadingZeros = function () {
	          var leadingZeroCount; // :uint

	          for (leadingZeroCount = 0; leadingZeroCount < workingBitsAvailable; ++leadingZeroCount) {
	            if ((workingWord & 0x80000000 >>> leadingZeroCount) !== 0) {
	              // the first bit of working word is 1
	              workingWord <<= leadingZeroCount;
	              workingBitsAvailable -= leadingZeroCount;
	              return leadingZeroCount;
	            }
	          } // we exhausted workingWord and still have not found a 1


	          this.loadWord();
	          return leadingZeroCount + this.skipLeadingZeros();
	        }; // ():void


	        this.skipUnsignedExpGolomb = function () {
	          this.skipBits(1 + this.skipLeadingZeros());
	        }; // ():void


	        this.skipExpGolomb = function () {
	          this.skipBits(1 + this.skipLeadingZeros());
	        }; // ():uint


	        this.readUnsignedExpGolomb = function () {
	          var clz = this.skipLeadingZeros(); // :uint

	          return this.readBits(clz + 1) - 1;
	        }; // ():int


	        this.readExpGolomb = function () {
	          var valu = this.readUnsignedExpGolomb(); // :int

	          if (0x01 & valu) {
	            // the number is odd if the low order bit is set
	            return 1 + valu >>> 1; // add 1 to make it even, and divide by 2
	          }

	          return -1 * (valu >>> 1); // divide by two then make it negative
	        }; // Some convenience functions
	        // :Boolean


	        this.readBoolean = function () {
	          return this.readBits(1) === 1;
	        }; // ():int


	        this.readUnsignedByte = function () {
	          return this.readBits(8);
	        };

	        this.loadWord();
	      };

	      module.exports = ExpGolomb;
	    }, {}],
	    30: [function (require, module, exports) {

	      var Stream = function Stream() {
	        this.init = function () {
	          var listeners = {};
	          /**
	           * Add a listener for a specified event type.
	           * @param type {string} the event name
	           * @param listener {function} the callback to be invoked when an event of
	           * the specified type occurs
	           */

	          this.on = function (type, listener) {
	            if (!listeners[type]) {
	              listeners[type] = [];
	            }

	            listeners[type] = listeners[type].concat(listener);
	          };
	          /**
	           * Remove a listener for a specified event type.
	           * @param type {string} the event name
	           * @param listener {function} a function previously registered for this
	           * type of event through `on`
	           */


	          this.off = function (type, listener) {
	            var index;

	            if (!listeners[type]) {
	              return false;
	            }

	            index = listeners[type].indexOf(listener);
	            listeners[type] = listeners[type].slice();
	            listeners[type].splice(index, 1);
	            return index > -1;
	          };
	          /**
	           * Trigger an event of the specified type on this stream. Any additional
	           * arguments to this function are passed as parameters to event listeners.
	           * @param type {string} the event name
	           */


	          this.trigger = function (type) {
	            var callbacks, i, length, args;
	            callbacks = listeners[type];

	            if (!callbacks) {
	              return;
	            } // Slicing the arguments on every invocation of this method
	            // can add a significant amount of overhead. Avoid the
	            // intermediate object creation for the common case of a
	            // single callback argument


	            if (arguments.length === 2) {
	              length = callbacks.length;

	              for (i = 0; i < length; ++i) {
	                callbacks[i].call(this, arguments[1]);
	              }
	            } else {
	              args = [];
	              i = arguments.length;

	              for (i = 1; i < arguments.length; ++i) {
	                args.push(arguments[i]);
	              }

	              length = callbacks.length;

	              for (i = 0; i < length; ++i) {
	                callbacks[i].apply(this, args);
	              }
	            }
	          };
	          /**
	           * Destroys the stream and cleans up.
	           */


	          this.dispose = function () {
	            listeners = {};
	          };
	        };
	      };
	      /**
	       * Forwards all `data` events on this stream to the destination stream. The
	       * destination stream should provide a method `push` to receive the data
	       * events as they arrive.
	       * @param destination {stream} the stream that will receive all `data` events
	       * @param autoFlush {boolean} if false, we will not call `flush` on the destination
	       *                            when the current stream emits a 'done' event
	       * @see http://nodejs.org/api/stream.html#stream_readable_pipe_destination_options
	       */


	      Stream.prototype.pipe = function (destination) {
	        this.on('data', function (data) {
	          destination.push(data);
	        });
	        this.on('done', function (flushSource) {
	          destination.flush(flushSource);
	        });
	        return destination;
	      }; // Default stream functions that are expected to be overridden to perform
	      // actual work. These are provided by the prototype as a sort of no-op
	      // implementation so that we don't have to check for their existence in the
	      // `pipe` function above.


	      Stream.prototype.push = function (data) {
	        this.trigger('data', data);
	      };

	      Stream.prototype.flush = function (flushSource) {
	        this.trigger('done', flushSource);
	      };

	      module.exports = Stream;
	    }, {}]
	  }, {}, [13])(13);
	});

	var has = Object.prototype.hasOwnProperty;

	var hexTable = (function () {
	    var array = [];
	    for (var i = 0; i < 256; ++i) {
	        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
	    }

	    return array;
	}());

	var compactQueue = function compactQueue(queue) {
	    var obj;

	    while (queue.length) {
	        var item = queue.pop();
	        obj = item.obj[item.prop];

	        if (Array.isArray(obj)) {
	            var compacted = [];

	            for (var j = 0; j < obj.length; ++j) {
	                if (typeof obj[j] !== 'undefined') {
	                    compacted.push(obj[j]);
	                }
	            }

	            item.obj[item.prop] = compacted;
	        }
	    }

	    return obj;
	};

	var arrayToObject = function arrayToObject(source, options) {
	    var obj = options && options.plainObjects ? Object.create(null) : {};
	    for (var i = 0; i < source.length; ++i) {
	        if (typeof source[i] !== 'undefined') {
	            obj[i] = source[i];
	        }
	    }

	    return obj;
	};

	var merge = function merge(target, source, options) {
	    if (!source) {
	        return target;
	    }

	    if (typeof source !== 'object') {
	        if (Array.isArray(target)) {
	            target.push(source);
	        } else if (typeof target === 'object') {
	            if (options.plainObjects || options.allowPrototypes || !has.call(Object.prototype, source)) {
	                target[source] = true;
	            }
	        } else {
	            return [target, source];
	        }

	        return target;
	    }

	    if (typeof target !== 'object') {
	        return [target].concat(source);
	    }

	    var mergeTarget = target;
	    if (Array.isArray(target) && !Array.isArray(source)) {
	        mergeTarget = arrayToObject(target, options);
	    }

	    if (Array.isArray(target) && Array.isArray(source)) {
	        source.forEach(function (item, i) {
	            if (has.call(target, i)) {
	                if (target[i] && typeof target[i] === 'object') {
	                    target[i] = merge(target[i], item, options);
	                } else {
	                    target.push(item);
	                }
	            } else {
	                target[i] = item;
	            }
	        });
	        return target;
	    }

	    return Object.keys(source).reduce(function (acc, key) {
	        var value = source[key];

	        if (has.call(acc, key)) {
	            acc[key] = merge(acc[key], value, options);
	        } else {
	            acc[key] = value;
	        }
	        return acc;
	    }, mergeTarget);
	};

	var assign = function assignSingleSource(target, source) {
	    return Object.keys(source).reduce(function (acc, key) {
	        acc[key] = source[key];
	        return acc;
	    }, target);
	};

	var decode = function (str) {
	    try {
	        return decodeURIComponent(str.replace(/\+/g, ' '));
	    } catch (e) {
	        return str;
	    }
	};

	var encode = function encode(str) {
	    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
	    // It has been adapted here for stricter adherence to RFC 3986
	    if (str.length === 0) {
	        return str;
	    }

	    var string = typeof str === 'string' ? str : String(str);

	    var out = '';
	    for (var i = 0; i < string.length; ++i) {
	        var c = string.charCodeAt(i);

	        if (
	            c === 0x2D // -
	            || c === 0x2E // .
	            || c === 0x5F // _
	            || c === 0x7E // ~
	            || (c >= 0x30 && c <= 0x39) // 0-9
	            || (c >= 0x41 && c <= 0x5A) // a-z
	            || (c >= 0x61 && c <= 0x7A) // A-Z
	        ) {
	            out += string.charAt(i);
	            continue;
	        }

	        if (c < 0x80) {
	            out = out + hexTable[c];
	            continue;
	        }

	        if (c < 0x800) {
	            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
	            continue;
	        }

	        if (c < 0xD800 || c >= 0xE000) {
	            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
	            continue;
	        }

	        i += 1;
	        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
	        out += hexTable[0xF0 | (c >> 18)]
	            + hexTable[0x80 | ((c >> 12) & 0x3F)]
	            + hexTable[0x80 | ((c >> 6) & 0x3F)]
	            + hexTable[0x80 | (c & 0x3F)];
	    }

	    return out;
	};

	var compact = function compact(value) {
	    var queue = [{ obj: { o: value }, prop: 'o' }];
	    var refs = [];

	    for (var i = 0; i < queue.length; ++i) {
	        var item = queue[i];
	        var obj = item.obj[item.prop];

	        var keys = Object.keys(obj);
	        for (var j = 0; j < keys.length; ++j) {
	            var key = keys[j];
	            var val = obj[key];
	            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
	                queue.push({ obj: obj, prop: key });
	                refs.push(val);
	            }
	        }
	    }

	    return compactQueue(queue);
	};

	var isRegExp = function isRegExp(obj) {
	    return Object.prototype.toString.call(obj) === '[object RegExp]';
	};

	var isBuffer = function isBuffer(obj) {
	    if (obj === null || typeof obj === 'undefined') {
	        return false;
	    }

	    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
	};

	var utils = {
	    arrayToObject: arrayToObject,
	    assign: assign,
	    compact: compact,
	    decode: decode,
	    encode: encode,
	    isBuffer: isBuffer,
	    isRegExp: isRegExp,
	    merge: merge
	};

	var replace = String.prototype.replace;
	var percentTwenties = /%20/g;

	var formats = {
	    'default': 'RFC3986',
	    formatters: {
	        RFC1738: function (value) {
	            return replace.call(value, percentTwenties, '+');
	        },
	        RFC3986: function (value) {
	            return value;
	        }
	    },
	    RFC1738: 'RFC1738',
	    RFC3986: 'RFC3986'
	};

	var arrayPrefixGenerators = {
	    brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
	        return prefix + '[]';
	    },
	    indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
	        return prefix + '[' + key + ']';
	    },
	    repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
	        return prefix;
	    }
	};

	var toISO = Date.prototype.toISOString;

	var defaults = {
	    delimiter: '&',
	    encode: true,
	    encoder: utils.encode,
	    encodeValuesOnly: false,
	    serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
	        return toISO.call(date);
	    },
	    skipNulls: false,
	    strictNullHandling: false
	};

	var stringify = function stringify( // eslint-disable-line func-name-matching
	    object,
	    prefix,
	    generateArrayPrefix,
	    strictNullHandling,
	    skipNulls,
	    encoder,
	    filter,
	    sort,
	    allowDots,
	    serializeDate,
	    formatter,
	    encodeValuesOnly
	) {
	    var obj = object;
	    if (typeof filter === 'function') {
	        obj = filter(prefix, obj);
	    } else if (obj instanceof Date) {
	        obj = serializeDate(obj);
	    } else if (obj === null) {
	        if (strictNullHandling) {
	            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder) : prefix;
	        }

	        obj = '';
	    }

	    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
	        if (encoder) {
	            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder);
	            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder))];
	        }
	        return [formatter(prefix) + '=' + formatter(String(obj))];
	    }

	    var values = [];

	    if (typeof obj === 'undefined') {
	        return values;
	    }

	    var objKeys;
	    if (Array.isArray(filter)) {
	        objKeys = filter;
	    } else {
	        var keys = Object.keys(obj);
	        objKeys = sort ? keys.sort(sort) : keys;
	    }

	    for (var i = 0; i < objKeys.length; ++i) {
	        var key = objKeys[i];

	        if (skipNulls && obj[key] === null) {
	            continue;
	        }

	        if (Array.isArray(obj)) {
	            values = values.concat(stringify(
	                obj[key],
	                generateArrayPrefix(prefix, key),
	                generateArrayPrefix,
	                strictNullHandling,
	                skipNulls,
	                encoder,
	                filter,
	                sort,
	                allowDots,
	                serializeDate,
	                formatter,
	                encodeValuesOnly
	            ));
	        } else {
	            values = values.concat(stringify(
	                obj[key],
	                prefix + (allowDots ? '.' + key : '[' + key + ']'),
	                generateArrayPrefix,
	                strictNullHandling,
	                skipNulls,
	                encoder,
	                filter,
	                sort,
	                allowDots,
	                serializeDate,
	                formatter,
	                encodeValuesOnly
	            ));
	        }
	    }

	    return values;
	};

	var stringify_1 = function (object, opts) {
	    var obj = object;
	    var options = opts ? utils.assign({}, opts) : {};

	    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
	        throw new TypeError('Encoder has to be a function.');
	    }

	    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
	    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
	    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
	    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
	    var encoder = typeof options.encoder === 'function' ? options.encoder : defaults.encoder;
	    var sort = typeof options.sort === 'function' ? options.sort : null;
	    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
	    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;
	    var encodeValuesOnly = typeof options.encodeValuesOnly === 'boolean' ? options.encodeValuesOnly : defaults.encodeValuesOnly;
	    if (typeof options.format === 'undefined') {
	        options.format = formats['default'];
	    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
	        throw new TypeError('Unknown format option provided.');
	    }
	    var formatter = formats.formatters[options.format];
	    var objKeys;
	    var filter;

	    if (typeof options.filter === 'function') {
	        filter = options.filter;
	        obj = filter('', obj);
	    } else if (Array.isArray(options.filter)) {
	        filter = options.filter;
	        objKeys = filter;
	    }

	    var keys = [];

	    if (typeof obj !== 'object' || obj === null) {
	        return '';
	    }

	    var arrayFormat;
	    if (options.arrayFormat in arrayPrefixGenerators) {
	        arrayFormat = options.arrayFormat;
	    } else if ('indices' in options) {
	        arrayFormat = options.indices ? 'indices' : 'repeat';
	    } else {
	        arrayFormat = 'indices';
	    }

	    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

	    if (!objKeys) {
	        objKeys = Object.keys(obj);
	    }

	    if (sort) {
	        objKeys.sort(sort);
	    }

	    for (var i = 0; i < objKeys.length; ++i) {
	        var key = objKeys[i];

	        if (skipNulls && obj[key] === null) {
	            continue;
	        }

	        keys = keys.concat(stringify(
	            obj[key],
	            key,
	            generateArrayPrefix,
	            strictNullHandling,
	            skipNulls,
	            encode ? encoder : null,
	            filter,
	            sort,
	            allowDots,
	            serializeDate,
	            formatter,
	            encodeValuesOnly
	        ));
	    }

	    var joined = keys.join(delimiter);
	    var prefix = options.addQueryPrefix === true ? '?' : '';

	    return joined.length > 0 ? prefix + joined : '';
	};

	var has$1 = Object.prototype.hasOwnProperty;

	var defaults$1 = {
	    allowDots: false,
	    allowPrototypes: false,
	    arrayLimit: 20,
	    decoder: utils.decode,
	    delimiter: '&',
	    depth: 5,
	    parameterLimit: 1000,
	    plainObjects: false,
	    strictNullHandling: false
	};

	var parseValues = function parseQueryStringValues(str, options) {
	    var obj = {};
	    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
	    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
	    var parts = cleanStr.split(options.delimiter, limit);

	    for (var i = 0; i < parts.length; ++i) {
	        var part = parts[i];

	        var bracketEqualsPos = part.indexOf(']=');
	        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

	        var key, val;
	        if (pos === -1) {
	            key = options.decoder(part, defaults$1.decoder);
	            val = options.strictNullHandling ? null : '';
	        } else {
	            key = options.decoder(part.slice(0, pos), defaults$1.decoder);
	            val = options.decoder(part.slice(pos + 1), defaults$1.decoder);
	        }
	        if (has$1.call(obj, key)) {
	            obj[key] = [].concat(obj[key]).concat(val);
	        } else {
	            obj[key] = val;
	        }
	    }

	    return obj;
	};

	var parseObject = function (chain, val, options) {
	    var leaf = val;

	    for (var i = chain.length - 1; i >= 0; --i) {
	        var obj;
	        var root = chain[i];

	        if (root === '[]') {
	            obj = [];
	            obj = obj.concat(leaf);
	        } else {
	            obj = options.plainObjects ? Object.create(null) : {};
	            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
	            var index = parseInt(cleanRoot, 10);
	            if (
	                !isNaN(index)
	                && root !== cleanRoot
	                && String(index) === cleanRoot
	                && index >= 0
	                && (options.parseArrays && index <= options.arrayLimit)
	            ) {
	                obj = [];
	                obj[index] = leaf;
	            } else {
	                obj[cleanRoot] = leaf;
	            }
	        }

	        leaf = obj;
	    }

	    return leaf;
	};

	var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
	    if (!givenKey) {
	        return;
	    }

	    // Transform dot notation to bracket notation
	    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

	    // The regex chunks

	    var brackets = /(\[[^[\]]*])/;
	    var child = /(\[[^[\]]*])/g;

	    // Get the parent

	    var segment = brackets.exec(key);
	    var parent = segment ? key.slice(0, segment.index) : key;

	    // Stash the parent if it exists

	    var keys = [];
	    if (parent) {
	        // If we aren't using plain objects, optionally prefix keys
	        // that would overwrite object prototype properties
	        if (!options.plainObjects && has$1.call(Object.prototype, parent)) {
	            if (!options.allowPrototypes) {
	                return;
	            }
	        }

	        keys.push(parent);
	    }

	    // Loop through children appending to the array until we hit depth

	    var i = 0;
	    while ((segment = child.exec(key)) !== null && i < options.depth) {
	        i += 1;
	        if (!options.plainObjects && has$1.call(Object.prototype, segment[1].slice(1, -1))) {
	            if (!options.allowPrototypes) {
	                return;
	            }
	        }
	        keys.push(segment[1]);
	    }

	    // If there's a remainder, just add whatever is left

	    if (segment) {
	        keys.push('[' + key.slice(segment.index) + ']');
	    }

	    return parseObject(keys, val, options);
	};

	var parse = function (str, opts) {
	    var options = opts ? utils.assign({}, opts) : {};

	    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
	        throw new TypeError('Decoder has to be a function.');
	    }

	    options.ignoreQueryPrefix = options.ignoreQueryPrefix === true;
	    options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults$1.delimiter;
	    options.depth = typeof options.depth === 'number' ? options.depth : defaults$1.depth;
	    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults$1.arrayLimit;
	    options.parseArrays = options.parseArrays !== false;
	    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults$1.decoder;
	    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults$1.allowDots;
	    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults$1.plainObjects;
	    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults$1.allowPrototypes;
	    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults$1.parameterLimit;
	    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults$1.strictNullHandling;

	    if (str === '' || str === null || typeof str === 'undefined') {
	        return options.plainObjects ? Object.create(null) : {};
	    }

	    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
	    var obj = options.plainObjects ? Object.create(null) : {};

	    // Iterate over the keys and setup the new object

	    var keys = Object.keys(tempObj);
	    for (var i = 0; i < keys.length; ++i) {
	        var key = keys[i];
	        var newObj = parseKeys(key, tempObj[key], options);
	        obj = utils.merge(obj, newObj, options);
	    }

	    return utils.compact(obj);
	};

	var lib$1 = {
	    formats: formats,
	    parse: parse,
	    stringify: stringify_1
	};

	var LEVEL_PLAYLIST_REGEX_FAST = new RegExp([/#EXTINF:\s*(\d*(?:\.\d+)?)(?:,(.*)\s+)?/.source, // duration (#EXTINF:<duration>,<title>), group 1 => duration, group 2 => title
	/|(?!#)(\S+)/.source, // segment URI, group 3 => the URI (note newline is not eaten)
	/|#EXT-X-BYTERANGE:*(.+)/.source, // next segment's byterange, group 4 => range spec (x@y)
	/|#EXT-X-PROGRAM-DATE-TIME:(.+)/.source, // next segment's program date/time group 5 => the datetime spec
	/|#.*/.source // All other non-segment oriented tags will match with all groups empty
	].join(''), 'g');
	var parserM3u8Index = function parserM3u8Index(data) {
	  var list = data.match(LEVEL_PLAYLIST_REGEX_FAST);
	  var result = [];

	  if (list && list[0] === "#EXTM3U") {
	    list.forEach(function (item, index) {
	      if (item.indexOf('NAME') > -1) {
	        var info = lib$1.parse(item.split(':')[1], {
	          delimiter: ','
	        });
	        var url = list[index + 1];
	        result.push(_objectSpread({}, info, {
	          url: url
	        }));
	      }
	    });
	  }

	  return result;
	};
	var parserM3u8Ts = function parserM3u8Ts(data) {
	  var list = data.match(LEVEL_PLAYLIST_REGEX_FAST);
	  var result = [];

	  if (list && list[0] === "#EXTM3U") {
	    list.forEach(function (item, index) {
	      if (item.indexOf('EXTINF') > -1) {
	        var duration = parseInt(item.split(':')[1], 10);
	        var url = list[index + 1];
	        result.push({
	          duration: duration,
	          url: url
	        });
	      }
	    });
	  }

	  return result;
	};

	var bind = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};

	/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <https://feross.org>
	 * @license  MIT
	 */

	// The _isBuffer check is for Safari 5-7 support, because it's missing
	// Object.prototype.constructor. Remove this eventually
	var isBuffer_1 = function (obj) {
	  return obj != null && (isBuffer$1(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
	};

	function isBuffer$1 (obj) {
	  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	}

	// For Node v0.10 support. Remove this eventually.
	function isSlowBuffer (obj) {
	  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer$1(obj.slice(0, 0))
	}

	/*global toString:true*/

	// utils is a library of generic helper functions non-specific to axios

	var toString$2 = Object.prototype.toString;

	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString$2.call(val) === '[object Array]';
	}

	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString$2.call(val) === '[object ArrayBuffer]';
	}

	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return (typeof FormData !== 'undefined') && (val instanceof FormData);
	}

	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}

	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}

	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}

	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}

	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}

	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString$2.call(val) === '[object Date]';
	}

	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString$2.call(val) === '[object File]';
	}

	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString$2.call(val) === '[object Blob]';
	}

	/**
	 * Determine if a value is a Function
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	function isFunction(val) {
	  return toString$2.call(val) === '[object Function]';
	}

	/**
	 * Determine if a value is a Stream
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	function isStream(val) {
	  return isObject(val) && isFunction(val.pipe);
	}

	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	function isURLSearchParams(val) {
	  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	}

	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim$1(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}

	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  navigator.product -> 'ReactNative'
	 */
	function isStandardBrowserEnv() {
	  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
	    return false;
	  }
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined'
	  );
	}

	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }

	  // Force an array if not already something iterable
	  if (typeof obj !== 'object') {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }

	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}

	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge$1(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (typeof result[key] === 'object' && typeof val === 'object') {
	      result[key] = merge$1(result[key], val);
	    } else {
	      result[key] = val;
	    }
	  }

	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}

	/**
	 * Extends object a by mutably adding to it the properties of object b.
	 *
	 * @param {Object} a The object to be extended
	 * @param {Object} b The object to copy properties from
	 * @param {Object} thisArg The object to bind function to
	 * @return {Object} The resulting value of object a
	 */
	function extend(a, b, thisArg) {
	  forEach(b, function assignValue(val, key) {
	    if (thisArg && typeof val === 'function') {
	      a[key] = bind(val, thisArg);
	    } else {
	      a[key] = val;
	    }
	  });
	  return a;
	}

	var utils$1 = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isBuffer: isBuffer_1,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge$1,
	  extend: extend,
	  trim: trim$1
	};

	// shim for using process in browser
	// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	var cachedSetTimeout = defaultSetTimout;
	var cachedClearTimeout = defaultClearTimeout;
	if (typeof global$1.setTimeout === 'function') {
	    cachedSetTimeout = setTimeout;
	}
	if (typeof global$1.clearTimeout === 'function') {
	    cachedClearTimeout = clearTimeout;
	}

	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue$1 = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue$1 = currentQueue.concat(queue$1);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue$1.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue$1.length;
	    while(len) {
	        currentQueue = queue$1;
	        queue$1 = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue$1.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	function nextTick(fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue$1.push(new Item(fun, args));
	    if (queue$1.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	}
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	var title = 'browser';
	var platform = 'browser';
	var browser = true;
	var env = {};
	var argv = [];
	var version = ''; // empty string to avoid regexp issues
	var versions$1 = {};
	var release = {};
	var config = {};

	function noop() {}

	var on = noop;
	var addListener = noop;
	var once = noop;
	var off = noop;
	var removeListener = noop;
	var removeAllListeners = noop;
	var emit = noop;

	function binding(name) {
	    throw new Error('process.binding is not supported');
	}

	function cwd () { return '/' }
	function chdir (dir) {
	    throw new Error('process.chdir is not supported');
	}function umask() { return 0; }

	// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
	var performance = global$1.performance || {};
	var performanceNow =
	  performance.now        ||
	  performance.mozNow     ||
	  performance.msNow      ||
	  performance.oNow       ||
	  performance.webkitNow  ||
	  function(){ return (new Date()).getTime() };

	// generate timestamp or delta
	// see http://nodejs.org/api/process.html#process_process_hrtime
	function hrtime(previousTimestamp){
	  var clocktime = performanceNow.call(performance)*1e-3;
	  var seconds = Math.floor(clocktime);
	  var nanoseconds = Math.floor((clocktime%1)*1e9);
	  if (previousTimestamp) {
	    seconds = seconds - previousTimestamp[0];
	    nanoseconds = nanoseconds - previousTimestamp[1];
	    if (nanoseconds<0) {
	      seconds--;
	      nanoseconds += 1e9;
	    }
	  }
	  return [seconds,nanoseconds]
	}

	var startTime = new Date();
	function uptime() {
	  var currentTime = new Date();
	  var dif = currentTime - startTime;
	  return dif / 1000;
	}

	var process$4 = {
	  nextTick: nextTick,
	  title: title,
	  browser: browser,
	  env: env,
	  argv: argv,
	  version: version,
	  versions: versions$1,
	  on: on,
	  addListener: addListener,
	  once: once,
	  off: off,
	  removeListener: removeListener,
	  removeAllListeners: removeAllListeners,
	  emit: emit,
	  binding: binding,
	  cwd: cwd,
	  chdir: chdir,
	  umask: umask,
	  hrtime: hrtime,
	  platform: platform,
	  release: release,
	  config: config,
	  uptime: uptime
	};

	var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
	  utils$1.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};

	/**
	 * Update an Error with the specified config, error code, and response.
	 *
	 * @param {Error} error The error to update.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The error.
	 */
	var enhanceError = function enhanceError(error, config, code, request, response) {
	  error.config = config;
	  if (code) {
	    error.code = code;
	  }
	  error.request = request;
	  error.response = response;
	  return error;
	};

	/**
	 * Create an Error with the specified message, config, error code, request and response.
	 *
	 * @param {string} message The error message.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The created error.
	 */
	var createError = function createError(message, config, code, request, response) {
	  var error = new Error(message);
	  return enhanceError(error, config, code, request, response);
	};

	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 */
	var settle = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;
	  // Note: status is not exposed by XDomainRequest
	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(createError(
	      'Request failed with status code ' + response.status,
	      response.config,
	      null,
	      response.request,
	      response
	    ));
	  }
	};

	function encode$1(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}

	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	var buildURL = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }

	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else if (utils$1.isURLSearchParams(params)) {
	    serializedParams = params.toString();
	  } else {
	    var parts = [];

	    utils$1.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }

	      if (utils$1.isArray(val)) {
	        key = key + '[]';
	      } else {
	        val = [val];
	      }

	      utils$1.forEach(val, function parseValue(v) {
	        if (utils$1.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils$1.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode$1(key) + '=' + encode$1(v));
	      });
	    });

	    serializedParams = parts.join('&');
	  }

	  if (serializedParams) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }

	  return url;
	};

	// Headers whose duplicates are ignored by node
	// c.f. https://nodejs.org/api/http.html#http_message_headers
	var ignoreDuplicateOf = [
	  'age', 'authorization', 'content-length', 'content-type', 'etag',
	  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
	  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
	  'referer', 'retry-after', 'user-agent'
	];

	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	var parseHeaders = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;

	  if (!headers) { return parsed; }

	  utils$1.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils$1.trim(line.substr(0, i)).toLowerCase();
	    val = utils$1.trim(line.substr(i + 1));

	    if (key) {
	      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
	        return;
	      }
	      if (key === 'set-cookie') {
	        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
	      } else {
	        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	      }
	    }
	  });

	  return parsed;
	};

	var isURLSameOrigin = (
	  utils$1.isStandardBrowserEnv() ?

	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	  (function standardBrowserEnv() {
	    var msie = /(msie|trident)/i.test(navigator.userAgent);
	    var urlParsingNode = document.createElement('a');
	    var originURL;

	    /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	    function resolveURL(url) {
	      var href = url;

	      if (msie) {
	        // IE needs attribute set twice to normalize properties
	        urlParsingNode.setAttribute('href', href);
	        href = urlParsingNode.href;
	      }

	      urlParsingNode.setAttribute('href', href);

	      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	      return {
	        href: urlParsingNode.href,
	        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	        host: urlParsingNode.host,
	        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	        hostname: urlParsingNode.hostname,
	        port: urlParsingNode.port,
	        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	                  urlParsingNode.pathname :
	                  '/' + urlParsingNode.pathname
	      };
	    }

	    originURL = resolveURL(window.location.href);

	    /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	    return function isURLSameOrigin(requestURL) {
	      var parsed = (utils$1.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	      return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	    };
	  })() :

	  // Non standard browser envs (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return function isURLSameOrigin() {
	      return true;
	    };
	  })()
	);

	// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	function E() {
	  this.message = 'String contains an invalid character';
	}
	E.prototype = new Error;
	E.prototype.code = 5;
	E.prototype.name = 'InvalidCharacterError';

	function btoa(input) {
	  var str = String(input);
	  var output = '';
	  for (
	    // initialize result and counter
	    var block, charCode, idx = 0, map = chars;
	    // if the next str index does not exist:
	    //   change the mapping table to "="
	    //   check if d has no fractional digits
	    str.charAt(idx | 0) || (map = '=', idx % 1);
	    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	  ) {
	    charCode = str.charCodeAt(idx += 3 / 4);
	    if (charCode > 0xFF) {
	      throw new E();
	    }
	    block = block << 8 | charCode;
	  }
	  return output;
	}

	var btoa_1 = btoa;

	var cookies = (
	  utils$1.isStandardBrowserEnv() ?

	  // Standard browser envs support document.cookie
	  (function standardBrowserEnv() {
	    return {
	      write: function write(name, value, expires, path, domain, secure) {
	        var cookie = [];
	        cookie.push(name + '=' + encodeURIComponent(value));

	        if (utils$1.isNumber(expires)) {
	          cookie.push('expires=' + new Date(expires).toGMTString());
	        }

	        if (utils$1.isString(path)) {
	          cookie.push('path=' + path);
	        }

	        if (utils$1.isString(domain)) {
	          cookie.push('domain=' + domain);
	        }

	        if (secure === true) {
	          cookie.push('secure');
	        }

	        document.cookie = cookie.join('; ');
	      },

	      read: function read(name) {
	        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	        return (match ? decodeURIComponent(match[3]) : null);
	      },

	      remove: function remove(name) {
	        this.write(name, '', Date.now() - 86400000);
	      }
	    };
	  })() :

	  // Non standard browser env (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return {
	      write: function write() {},
	      read: function read() { return null; },
	      remove: function remove() {}
	    };
	  })()
	);

	var btoa$1 = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || btoa_1;

	var xhr = function xhrAdapter(config$$1) {
	  return new Promise(function dispatchXhrRequest(resolve, reject) {
	    var requestData = config$$1.data;
	    var requestHeaders = config$$1.headers;

	    if (utils$1.isFormData(requestData)) {
	      delete requestHeaders['Content-Type']; // Let the browser set it
	    }

	    var request = new XMLHttpRequest();
	    var loadEvent = 'onreadystatechange';
	    var xDomain = false;

	    // For IE 8/9 CORS support
	    // Only supports POST and GET calls and doesn't returns the response headers.
	    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
	    if (typeof window !== 'undefined' &&
	        window.XDomainRequest && !('withCredentials' in request) &&
	        !isURLSameOrigin(config$$1.url)) {
	      request = new window.XDomainRequest();
	      loadEvent = 'onload';
	      xDomain = true;
	      request.onprogress = function handleProgress() {};
	      request.ontimeout = function handleTimeout() {};
	    }

	    // HTTP basic authentication
	    if (config$$1.auth) {
	      var username = config$$1.auth.username || '';
	      var password = config$$1.auth.password || '';
	      requestHeaders.Authorization = 'Basic ' + btoa$1(username + ':' + password);
	    }

	    request.open(config$$1.method.toUpperCase(), buildURL(config$$1.url, config$$1.params, config$$1.paramsSerializer), true);

	    // Set the request timeout in MS
	    request.timeout = config$$1.timeout;

	    // Listen for ready state
	    request[loadEvent] = function handleLoad() {
	      if (!request || (request.readyState !== 4 && !xDomain)) {
	        return;
	      }

	      // The request errored out and we didn't get a response, this will be
	      // handled by onerror instead
	      // With one exception: request that using file: protocol, most browsers
	      // will return status as 0 even though it's a successful request
	      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
	        return;
	      }

	      // Prepare the response
	      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	      var responseData = !config$$1.responseType || config$$1.responseType === 'text' ? request.responseText : request.response;
	      var response = {
	        data: responseData,
	        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
	        status: request.status === 1223 ? 204 : request.status,
	        statusText: request.status === 1223 ? 'No Content' : request.statusText,
	        headers: responseHeaders,
	        config: config$$1,
	        request: request
	      };

	      settle(resolve, reject, response);

	      // Clean up request
	      request = null;
	    };

	    // Handle low level network errors
	    request.onerror = function handleError() {
	      // Real errors are hidden from us by the browser
	      // onerror should only fire if it's a network error
	      reject(createError('Network Error', config$$1, null, request));

	      // Clean up request
	      request = null;
	    };

	    // Handle timeout
	    request.ontimeout = function handleTimeout() {
	      reject(createError('timeout of ' + config$$1.timeout + 'ms exceeded', config$$1, 'ECONNABORTED',
	        request));

	      // Clean up request
	      request = null;
	    };

	    // Add xsrf header
	    // This is only done if running in a standard browser environment.
	    // Specifically not if we're in a web worker, or react-native.
	    if (utils$1.isStandardBrowserEnv()) {
	      var cookies$$1 = cookies;

	      // Add xsrf header
	      var xsrfValue = (config$$1.withCredentials || isURLSameOrigin(config$$1.url)) && config$$1.xsrfCookieName ?
	          cookies$$1.read(config$$1.xsrfCookieName) :
	          undefined;

	      if (xsrfValue) {
	        requestHeaders[config$$1.xsrfHeaderName] = xsrfValue;
	      }
	    }

	    // Add headers to the request
	    if ('setRequestHeader' in request) {
	      utils$1.forEach(requestHeaders, function setRequestHeader(val, key) {
	        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	          // Remove Content-Type if data is undefined
	          delete requestHeaders[key];
	        } else {
	          // Otherwise add header to the request
	          request.setRequestHeader(key, val);
	        }
	      });
	    }

	    // Add withCredentials to request if needed
	    if (config$$1.withCredentials) {
	      request.withCredentials = true;
	    }

	    // Add responseType to request if needed
	    if (config$$1.responseType) {
	      try {
	        request.responseType = config$$1.responseType;
	      } catch (e) {
	        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
	        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
	        if (config$$1.responseType !== 'json') {
	          throw e;
	        }
	      }
	    }

	    // Handle progress if needed
	    if (typeof config$$1.onDownloadProgress === 'function') {
	      request.addEventListener('progress', config$$1.onDownloadProgress);
	    }

	    // Not all browsers support upload events
	    if (typeof config$$1.onUploadProgress === 'function' && request.upload) {
	      request.upload.addEventListener('progress', config$$1.onUploadProgress);
	    }

	    if (config$$1.cancelToken) {
	      // Handle cancellation
	      config$$1.cancelToken.promise.then(function onCanceled(cancel) {
	        if (!request) {
	          return;
	        }

	        request.abort();
	        reject(cancel);
	        // Clean up request
	        request = null;
	      });
	    }

	    if (requestData === undefined) {
	      requestData = null;
	    }

	    // Send the request
	    request.send(requestData);
	  });
	};

	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};

	function setContentTypeIfUnset(headers, value) {
	  if (!utils$1.isUndefined(headers) && utils$1.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}

	function getDefaultAdapter() {
	  var adapter;
	  if (typeof XMLHttpRequest !== 'undefined') {
	    // For browsers use XHR adapter
	    adapter = xhr;
	  } else if (typeof process$4 !== 'undefined') {
	    // For node use HTTP adapter
	    adapter = xhr;
	  }
	  return adapter;
	}

	var defaults$2 = {
	  adapter: getDefaultAdapter(),

	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName(headers, 'Content-Type');
	    if (utils$1.isFormData(data) ||
	      utils$1.isArrayBuffer(data) ||
	      utils$1.isBuffer(data) ||
	      utils$1.isStream(data) ||
	      utils$1.isFile(data) ||
	      utils$1.isBlob(data)
	    ) {
	      return data;
	    }
	    if (utils$1.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils$1.isURLSearchParams(data)) {
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }
	    if (utils$1.isObject(data)) {
	      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
	      return JSON.stringify(data);
	    }
	    return data;
	  }],

	  transformResponse: [function transformResponse(data) {
	    /*eslint no-param-reassign:0*/
	    if (typeof data === 'string') {
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],

	  /**
	   * A timeout in milliseconds to abort a request. If set to 0 (default) a
	   * timeout is not created.
	   */
	  timeout: 0,

	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',

	  maxContentLength: -1,

	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  }
	};

	defaults$2.headers = {
	  common: {
	    'Accept': 'application/json, text/plain, */*'
	  }
	};

	utils$1.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  defaults$2.headers[method] = {};
	});

	utils$1.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  defaults$2.headers[method] = utils$1.merge(DEFAULT_CONTENT_TYPE);
	});

	var defaults_1 = defaults$2;

	function InterceptorManager() {
	  this.handlers = [];
	}

	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};

	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};

	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils$1.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};

	var InterceptorManager_1 = InterceptorManager;

	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	var transformData = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils$1.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });

	  return data;
	};

	var isCancel = function isCancel(value) {
	  return !!(value && value.__CANCEL__);
	};

	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	var isAbsoluteURL = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};

	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	var combineURLs = function combineURLs(baseURL, relativeURL) {
	  return relativeURL
	    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
	    : baseURL;
	};

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	function throwIfCancellationRequested(config) {
	  if (config.cancelToken) {
	    config.cancelToken.throwIfRequested();
	  }
	}

	/**
	 * Dispatch a request to the server using the configured adapter.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	var dispatchRequest = function dispatchRequest(config) {
	  throwIfCancellationRequested(config);

	  // Support baseURL config
	  if (config.baseURL && !isAbsoluteURL(config.url)) {
	    config.url = combineURLs(config.baseURL, config.url);
	  }

	  // Ensure headers exist
	  config.headers = config.headers || {};

	  // Transform request data
	  config.data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );

	  // Flatten headers
	  config.headers = utils$1.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers || {}
	  );

	  utils$1.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );

	  var adapter = config.adapter || defaults_1.adapter;

	  return adapter(config).then(function onAdapterResolution(response) {
	    throwIfCancellationRequested(config);

	    // Transform response data
	    response.data = transformData(
	      response.data,
	      response.headers,
	      config.transformResponse
	    );

	    return response;
	  }, function onAdapterRejection(reason) {
	    if (!isCancel(reason)) {
	      throwIfCancellationRequested(config);

	      // Transform response data
	      if (reason && reason.response) {
	        reason.response.data = transformData(
	          reason.response.data,
	          reason.response.headers,
	          config.transformResponse
	        );
	      }
	    }

	    return Promise.reject(reason);
	  });
	};

	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} instanceConfig The default config for the instance
	 */
	function Axios(instanceConfig) {
	  this.defaults = instanceConfig;
	  this.interceptors = {
	    request: new InterceptorManager_1(),
	    response: new InterceptorManager_1()
	  };
	}

	/**
	 * Dispatch a request
	 *
	 * @param {Object} config The config specific for this request (merged with this.defaults)
	 */
	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = utils$1.merge({
	      url: arguments[0]
	    }, arguments[1]);
	  }

	  config = utils$1.merge(defaults_1, {method: 'get'}, this.defaults, config);
	  config.method = config.method.toLowerCase();

	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);

	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });

	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });

	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }

	  return promise;
	};

	// Provide aliases for supported request methods
	utils$1.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, config) {
	    return this.request(utils$1.merge(config || {}, {
	      method: method,
	      url: url
	    }));
	  };
	});

	utils$1.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, data, config) {
	    return this.request(utils$1.merge(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	});

	var Axios_1 = Axios;

	/**
	 * A `Cancel` is an object that is thrown when an operation is canceled.
	 *
	 * @class
	 * @param {string=} message The message.
	 */
	function Cancel(message) {
	  this.message = message;
	}

	Cancel.prototype.toString = function toString() {
	  return 'Cancel' + (this.message ? ': ' + this.message : '');
	};

	Cancel.prototype.__CANCEL__ = true;

	var Cancel_1 = Cancel;

	/**
	 * A `CancelToken` is an object that can be used to request cancellation of an operation.
	 *
	 * @class
	 * @param {Function} executor The executor function.
	 */
	function CancelToken(executor) {
	  if (typeof executor !== 'function') {
	    throw new TypeError('executor must be a function.');
	  }

	  var resolvePromise;
	  this.promise = new Promise(function promiseExecutor(resolve) {
	    resolvePromise = resolve;
	  });

	  var token = this;
	  executor(function cancel(message) {
	    if (token.reason) {
	      // Cancellation has already been requested
	      return;
	    }

	    token.reason = new Cancel_1(message);
	    resolvePromise(token.reason);
	  });
	}

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	CancelToken.prototype.throwIfRequested = function throwIfRequested() {
	  if (this.reason) {
	    throw this.reason;
	  }
	};

	/**
	 * Returns an object that contains a new `CancelToken` and a function that, when called,
	 * cancels the `CancelToken`.
	 */
	CancelToken.source = function source() {
	  var cancel;
	  var token = new CancelToken(function executor(c) {
	    cancel = c;
	  });
	  return {
	    token: token,
	    cancel: cancel
	  };
	};

	var CancelToken_1 = CancelToken;

	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	var spread = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};

	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 * @return {Axios} A new instance of Axios
	 */
	function createInstance(defaultConfig) {
	  var context = new Axios_1(defaultConfig);
	  var instance = bind(Axios_1.prototype.request, context);

	  // Copy axios.prototype to instance
	  utils$1.extend(instance, Axios_1.prototype, context);

	  // Copy context to instance
	  utils$1.extend(instance, context);

	  return instance;
	}

	// Create the default instance to be exported
	var axios = createInstance(defaults_1);

	// Expose Axios class to allow class inheritance
	axios.Axios = Axios_1;

	// Factory for creating new instances
	axios.create = function create(instanceConfig) {
	  return createInstance(utils$1.merge(defaults_1, instanceConfig));
	};

	// Expose Cancel & CancelToken
	axios.Cancel = Cancel_1;
	axios.CancelToken = CancelToken_1;
	axios.isCancel = isCancel;

	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = spread;

	var axios_1 = axios;

	// Allow use of default import syntax in TypeScript
	var default_1 = axios;
	axios_1.default = default_1;

	var axios$1 = axios_1;

	var loader = axios$1;

	var mime = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
	var indexUrl = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';

	var HlsPlayer =
	/*#__PURE__*/
	function (_Player) {
	  _inherits(HlsPlayer, _Player);

	  function HlsPlayer(options) {
	    var _this;

	    _classCallCheck(this, HlsPlayer);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(HlsPlayer).call(this, options));

	    _this.handleSourceOpen = function (e) {
	      mediaSource.duration = 0;

	      var sourceBuffer = _this.mediaSource.addSourceBuffer(mime);

	      sourceBuffer.mode = 'segments';
	      _this.sourceBuffer = sourceBuffer;

	      var fetchTs = function fetchTs() {
	        if (_this.tsList.length === 0) {
	          _this.mediaSource.endOfStream();

	          return;
	        }

	        var _this$tsList$shift = _this.tsList.shift(),
	            url = _this$tsList$shift.url,
	            duration = _this$tsList$shift.duration; // if (!sourceBuffer.updating && this.mediaSource.readyState === 'open') {
	        //   mediaSource.duration += duration;
	        // }


	        _this.fetchSegmentAndAppend('https://video-dev.github.io/streams/x36xhzz/url_8/' + url);
	      };

	      sourceBuffer.addEventListener('updateend', function () {
	        fetchTs();
	      });
	      fetchTs();
	    };

	    if (!HlsPlayer.isSupported(mime)) {
	      _this.emitEvent('error', ['Your Browser is not supported']);

	      return _possibleConstructorReturn(_this);
	    } // this.bitRate = HD;


	    _this.loadM3u8File(indexUrl, function (data) {
	      _this.m3u8List = parserM3u8Index(data);
	      console.log(_this.m3u8List);

	      _this.loadM3u8File('https://video-dev.github.io/streams/x36xhzz/' + _this.m3u8List[4].url, function (data) {
	        _this.tsList = parserM3u8Ts(data).slice(0, 4);

	        _this.loadVideo();
	      });
	    });

	    _this.transmuxer = new muxjs.mp4.Transmuxer();

	    _this.transmuxer.on('data', function (segment) {
	      var remuxedSegs = [];
	      var remuxedBytesLength = 0;
	      var remuxedInitSegment = null;
	      var bytes = null;
	      var offset = 0;
	      remuxedSegs.push(segment);
	      remuxedBytesLength += segment.data.byteLength;
	      remuxedInitSegment = segment.initSegment;
	      bytes = new Uint8Array(remuxedInitSegment.byteLength + remuxedBytesLength);
	      bytes.set(remuxedInitSegment, offset);
	      offset += remuxedInitSegment.byteLength;

	      for (var j = 0, i = offset; j < remuxedSegs.length; j++) {
	        bytes.set(remuxedSegs[j].data, i);
	        i += remuxedSegs[j].byteLength;
	      }

	      _this.sourceBuffer.appendBuffer(bytes);
	    });

	    return _this;
	  }

	  _createClass(HlsPlayer, [{
	    key: "loadM3u8File",
	    value: function loadM3u8File(url, cb) {
	      loader.get(url).then(function (res) {
	        return cb(res.data);
	      });
	    }
	  }, {
	    key: "loadVideo",
	    value: function loadVideo() {
	      this.mediaSource = new MediaSource();
	      this.video.src = URL.createObjectURL(this.mediaSource);
	      this.mediaSource.addEventListener('sourceopen', this.handleSourceOpen);
	      window.mediaSource = this.mediaSource;
	    }
	  }, {
	    key: "fetchSegmentAndAppend",
	    value: function fetchSegmentAndAppend(segmentUrl) {
	      var _this2 = this;

	      loader({
	        method: 'get',
	        url: segmentUrl,
	        responseType: 'arraybuffer'
	      }).then(function (res) {
	        _this2.transmuxer.push(new Uint8Array(res.data));

	        _this2.transmuxer.flush();
	      });
	    }
	  }], [{
	    key: "isSupported",
	    value: function isSupported(mime) {
	      return MediaSource && typeof MediaSource.isTypeSupported === 'function' && MediaSource.isTypeSupported(mime);
	    }
	  }]);

	  return HlsPlayer;
	}(Player);

	__$styleInject(".tm-player {\n  position: relative;\n  width: 100%;\n  height: 0;\n  padding-bottom: 75%;\n  box-sizing: border-box;\n}\n.tm-player .video {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 1;\n}\n.tm-player .poster-wrapper {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: #fff;\n  z-index: 2;\n  overflow: hidden;\n}\n.tm-player .poster-wrapper.hide {\n  display: none;\n}\n.tm-player .poster-wrapper img.poster {\n  width: 100%;\n  display: block;\n}\n");

	window.Player = Player;
	var FlvPlayer$1 = FlvPlayer;
	var HlsPlayer$1 = HlsPlayer;
	window.FlvPlayer = FlvPlayer$1;
	window.HlsPlayer = HlsPlayer$1;

	exports.default = Player;
	exports.FlvPlayer = FlvPlayer$1;
	exports.HlsPlayer = HlsPlayer$1;

	return exports;

}({}));
//# sourceMappingURL=tmPlayer.js.map
