#!/usr/bin/env node
"use strict";
var exports = void 0;

var $node = $node || {}
void function( module ) { var exports = module.exports = this; function require( id ) { return $node[ id.replace( /^.\// , "../" ) ] }; 
;
"use strict";
Error.stackTraceLimit = 50;
var $;
(function ($) {
})($ || ($ = {}));
module.exports = $;

;

$node[ "../mam.ts" ] = $node[ "../mam.ts" ] = module.exports }.call( {} , {} )
;
"use strict"

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var $ = ( typeof module === 'object' ) ? ( module['export'+'s'] = globalThis ) : globalThis
$.$$ = $

;
"use strict";
var $;
(function ($) {
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    const mod = require('module');
    const internals = mod.builtinModules;
    function $node_internal_check(name) {
        if (name.startsWith('node:'))
            return true;
        return internals.includes(name);
    }
    $.$node_internal_check = $node_internal_check;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_promise_like(val) {
        try {
            return val && typeof val === 'object' && 'then' in val && typeof val.then === 'function';
        }
        catch {
            return false;
        }
    }
    $.$mol_promise_like = $mol_promise_like;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_fail(error) {
        throw error;
    }
    $.$mol_fail = $mol_fail;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_fail_hidden(error) {
        throw error;
    }
    $.$mol_fail_hidden = $mol_fail_hidden;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const catched = new WeakSet();
    function $mol_fail_catch(error) {
        if (typeof error !== 'object')
            return false;
        if ($mol_promise_like(error))
            $mol_fail_hidden(error);
        if (catched.has(error))
            return false;
        catched.add(error);
        return true;
    }
    $.$mol_fail_catch = $mol_fail_catch;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_try(handler) {
        try {
            return handler();
        }
        catch (error) {
            console.error(error);
            return error;
        }
    }
    $.$mol_try = $mol_try;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_fail_log(error) {
        if ($mol_promise_like(error))
            return false;
        if (!$mol_fail_catch(error))
            return false;
        $mol_try(() => { $mol_fail_hidden(error); });
        return true;
    }
    $.$mol_fail_log = $mol_fail_log;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const path = require('path');
    const mod = require('module');
    const localRequire = mod.createRequire(path.join(process.cwd(), 'package.json'));
    function $node_autoinstall(name) {
        try {
            localRequire.resolve(name);
        }
        catch {
            this.$mol_run.spawn({ command: ['npm', 'install', '--omit=dev', name], dir: '.' });
            try {
                this.$mol_run.spawn({ command: ['npm', 'install', '--omit=dev', '@types/' + name], dir: '.' });
            }
            catch (e) {
                if (this.$mol_promise_like(e))
                    this.$mol_fail_hidden(e);
                this.$mol_fail_log(e);
            }
        }
    }
    $.$node_autoinstall = $node_autoinstall;
})($ || ($ = {}));

;
"use strict";
var $node = new Proxy({ require }, {
    get(target, name, wrapper) {
        if (target[name])
            return target[name];
        if ($.$node_internal_check(name))
            return target.require(name);
        if (name[0] === '.')
            return target.require(name);
        $.$node_autoinstall(name);
        return target.require(name);
    },
    set(target, name, value) {
        target[name] = value;
        return true;
    },
});
require = (req => Object.assign(function require(name) {
    return $node[name];
}, req))(require);

;
"use strict";
var $;
(function ($) {
    const named = new WeakSet();
    function $mol_func_name(func) {
        let name = func.name;
        if (name?.length > 1)
            return name;
        if (named.has(func))
            return name;
        for (let key in this) {
            try {
                if (this[key] !== func)
                    continue;
                name = key;
                Object.defineProperty(func, 'name', { value: name });
                break;
            }
            catch { }
        }
        named.add(func);
        return name;
    }
    $.$mol_func_name = $mol_func_name;
    function $mol_func_name_from(target, source) {
        Object.defineProperty(target, 'name', { value: source.name });
        return target;
    }
    $.$mol_func_name_from = $mol_func_name_from;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function cause_serialize(cause) {
        return JSON.stringify(cause, null, '  ')
            .replace(/\(/, '<')
            .replace(/\)/, ' >');
    }
    function frame_normalize(frame) {
        return (typeof frame === 'string' ? frame : cause_serialize(frame))
            .trim()
            .replace(/at /gm, '   at ')
            .replace(/^(?!    +at )(.*)/gm, '    at | $1 (#)');
    }
    class $mol_error_mix extends AggregateError {
        cause;
        name = $$.$mol_func_name(this.constructor).replace(/^\$/, '') + '_Error';
        constructor(message, cause = {}, ...errors) {
            super(errors, message, { cause });
            this.cause = cause;
            const desc = Object.getOwnPropertyDescriptor(this, 'stack');
            const stack_get = () => desc?.get?.() ?? super.stack ?? desc?.value ?? this.message;
            Object.defineProperty(this, 'stack', {
                get: () => stack_get() + '\n' + [
                    this.cause ?? 'no cause',
                    ...this.errors.flatMap(e => [
                        String(e.stack),
                        ...e instanceof $mol_error_mix || !e.cause ? [] : [e.cause]
                    ])
                ].map(frame_normalize).join('\n')
            });
            Object.defineProperty(this, 'cause', {
                get: () => cause
            });
        }
        static [Symbol.toPrimitive]() {
            return this.toString();
        }
        static toString() {
            return $$.$mol_func_name(this);
        }
        static make(...params) {
            return new this(...params);
        }
    }
    $.$mol_error_mix = $mol_error_mix;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_ambient_ref = Symbol('$mol_ambient_ref');
    function $mol_ambient(overrides) {
        return Object.setPrototypeOf(overrides, this || $);
    }
    $.$mol_ambient = $mol_ambient;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const instances = new WeakSet();
    function $mol_delegate(proto, target) {
        const proxy = new Proxy(proto, {
            get: (_, field) => {
                const obj = target();
                let val = Reflect.get(obj, field);
                if (typeof val === 'function') {
                    val = val.bind(obj);
                }
                return val;
            },
            has: (_, field) => Reflect.has(target(), field),
            set: (_, field, value) => Reflect.set(target(), field, value),
            getOwnPropertyDescriptor: (_, field) => Reflect.getOwnPropertyDescriptor(target(), field),
            ownKeys: () => Reflect.ownKeys(target()),
            getPrototypeOf: () => Reflect.getPrototypeOf(target()),
            setPrototypeOf: (_, donor) => Reflect.setPrototypeOf(target(), donor),
            isExtensible: () => Reflect.isExtensible(target()),
            preventExtensions: () => Reflect.preventExtensions(target()),
            apply: (_, self, args) => Reflect.apply(target(), self, args),
            construct: (_, args, retarget) => Reflect.construct(target(), args, retarget),
            defineProperty: (_, field, descr) => Reflect.defineProperty(target(), field, descr),
            deleteProperty: (_, field) => Reflect.deleteProperty(target(), field),
        });
        instances.add(proxy);
        return proxy;
    }
    $.$mol_delegate = $mol_delegate;
    Reflect.defineProperty($mol_delegate, Symbol.hasInstance, {
        value: (obj) => instances.has(obj),
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_owning_map = new WeakMap();
    function $mol_owning_allow(having) {
        try {
            if (!having)
                return false;
            if (typeof having !== 'object' && typeof having !== 'function')
                return false;
            if (having instanceof $mol_delegate)
                return false;
            if (typeof having['destructor'] !== 'function')
                return false;
            return true;
        }
        catch {
            return false;
        }
    }
    $.$mol_owning_allow = $mol_owning_allow;
    function $mol_owning_get(having, Owner) {
        if (!$mol_owning_allow(having))
            return null;
        while (true) {
            const owner = $.$mol_owning_map.get(having);
            if (!owner)
                return owner;
            if (!Owner)
                return owner;
            if (owner instanceof Owner)
                return owner;
            having = owner;
        }
    }
    $.$mol_owning_get = $mol_owning_get;
    function $mol_owning_check(owner, having) {
        if (!$mol_owning_allow(having))
            return false;
        if ($.$mol_owning_map.get(having) !== owner)
            return false;
        return true;
    }
    $.$mol_owning_check = $mol_owning_check;
    function $mol_owning_catch(owner, having) {
        if (!$mol_owning_allow(having))
            return false;
        if ($.$mol_owning_map.get(having))
            return false;
        $.$mol_owning_map.set(having, owner);
        return true;
    }
    $.$mol_owning_catch = $mol_owning_catch;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $.$mol_key_handle = Symbol.for('$mol_key_handle');
    $.$mol_key_store = new WeakMap();
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    if (!Symbol.dispose)
        Symbol.dispose = Symbol('Symbol.dispose');
    class $mol_object2 {
        static $ = $;
        [Symbol.toStringTag];
        [$mol_ambient_ref] = null;
        get $() {
            if (this[$mol_ambient_ref])
                return this[$mol_ambient_ref];
            const owner = $mol_owning_get(this);
            return this[$mol_ambient_ref] = owner?.$ || this.constructor.$ || $mol_object2.$;
        }
        set $(next) {
            if (this[$mol_ambient_ref])
                $mol_fail_hidden(new Error('Context already defined'));
            this[$mol_ambient_ref] = next;
        }
        static create(init) {
            const obj = new this;
            if (init)
                init(obj);
            return obj;
        }
        static [Symbol.toPrimitive]() {
            return this.toString();
        }
        static toString() {
            return this[Symbol.toStringTag] || this.$.$mol_func_name(this);
        }
        static toJSON() {
            return this.toString();
        }
        static [$mol_key_handle]() {
            return this.toString();
        }
        destructor() { }
        static destructor() { }
        [Symbol.dispose]() {
            this.destructor();
        }
        toString() {
            return this[Symbol.toStringTag] || this.constructor.name + '<>';
        }
    }
    $.$mol_object2 = $mol_object2;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    let $$;
    (function ($$) {
        let $;
    })($$ = $_1.$$ || ($_1.$$ = {}));
    $_1.$mol_object_field = Symbol('$mol_object_field');
    class $mol_object extends $mol_object2 {
        static make(config) {
            return super.create(obj => {
                for (let key in config)
                    obj[key] = config[key];
            });
        }
    }
    $_1.$mol_object = $mol_object;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_env() {
        return {};
    }
    $.$mol_env = $mol_env;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_env = function $mol_env() {
        return this.process.env;
    };
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_guid(length = 8, exists = () => false) {
        for (;;) {
            let id = Math.random().toString(36).substring(2, length + 2).toUpperCase();
            if (exists(id))
                continue;
            return id;
        }
    }
    $.$mol_guid = $mol_guid;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let $mol_wire_cursor;
    (function ($mol_wire_cursor) {
        $mol_wire_cursor[$mol_wire_cursor["stale"] = -1] = "stale";
        $mol_wire_cursor[$mol_wire_cursor["doubt"] = -2] = "doubt";
        $mol_wire_cursor[$mol_wire_cursor["fresh"] = -3] = "fresh";
        $mol_wire_cursor[$mol_wire_cursor["final"] = -4] = "final";
    })($mol_wire_cursor = $.$mol_wire_cursor || ($.$mol_wire_cursor = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_wire_pub extends Object {
        constructor(id = `$mol_wire_pub:${$mol_guid()}`) {
            super();
            this[Symbol.toStringTag] = id;
        }
        [Symbol.toStringTag];
        data = [];
        static get [Symbol.species]() {
            return Array;
        }
        sub_from = 0;
        get sub_list() {
            const res = [];
            for (let i = this.sub_from; i < this.data.length; i += 2) {
                res.push(this.data[i]);
            }
            return res;
        }
        get sub_empty() {
            return this.sub_from === this.data.length;
        }
        sub_on(sub, pub_pos) {
            const pos = this.data.length;
            this.data.push(sub, pub_pos);
            return pos;
        }
        sub_off(sub_pos) {
            if (!(sub_pos < this.data.length)) {
                $mol_fail(new Error(`Wrong pos ${sub_pos}`));
            }
            const end = this.data.length - 2;
            if (sub_pos !== end) {
                this.peer_move(end, sub_pos);
            }
            this.data.length = end;
            if (end === this.sub_from)
                this.reap();
        }
        reap() { }
        promote() {
            $mol_wire_auto()?.track_next(this);
        }
        fresh() { }
        complete() { }
        get incompleted() {
            return false;
        }
        emit(quant = $mol_wire_cursor.stale) {
            for (let i = this.sub_from; i < this.data.length; i += 2) {
                ;
                this.data[i].absorb(quant, this.data[i + 1]);
            }
        }
        peer_move(from_pos, to_pos) {
            const peer = this.data[from_pos];
            const self_pos = this.data[from_pos + 1];
            this.data[to_pos] = peer;
            this.data[to_pos + 1] = self_pos;
            peer.peer_repos(self_pos, to_pos);
        }
        peer_repos(peer_pos, self_pos) {
            this.data[peer_pos + 1] = self_pos;
        }
    }
    $.$mol_wire_pub = $mol_wire_pub;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $.$mol_wire_auto_sub = null;
    function $mol_wire_auto(next = $.$mol_wire_auto_sub) {
        return $.$mol_wire_auto_sub = next;
    }
    $.$mol_wire_auto = $mol_wire_auto;
    $.$mol_wire_affected = [];
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $['devtoolsFormatters'] ||= [];
    function $mol_dev_format_register(config) {
        $['devtoolsFormatters'].push(config);
    }
    $.$mol_dev_format_register = $mol_dev_format_register;
    $.$mol_dev_format_head = Symbol('$mol_dev_format_head');
    $.$mol_dev_format_body = Symbol('$mol_dev_format_body');
    function $mol_dev_format_button(label, click) {
        return $mol_dev_format_auto({
            [$.$mol_dev_format_head]() {
                return $.$mol_dev_format_span({ color: 'cornflowerblue' }, label);
            },
            [$.$mol_dev_format_body]() {
                Promise.resolve().then(click);
                return $.$mol_dev_format_span({});
            }
        });
    }
    $mol_dev_format_register({
        header: (val, config = false) => {
            if (config)
                return null;
            if (!val)
                return null;
            if ($.$mol_dev_format_head in val) {
                try {
                    return val[$.$mol_dev_format_head]();
                }
                catch (error) {
                    return $.$mol_dev_format_accent($mol_dev_format_native(val), '💨', $mol_dev_format_native(error), '');
                }
            }
            if (typeof val === 'function') {
                return $mol_dev_format_native(val);
            }
            if (val instanceof Error) {
                return $.$mol_dev_format_span({}, $mol_dev_format_native(val), ' ', $mol_dev_format_button('throw', () => $mol_fail_hidden(val)));
            }
            if (val instanceof Promise) {
                return $.$mol_dev_format_shade($mol_dev_format_native(val), ' ', val[Symbol.toStringTag] ?? '');
            }
            if (Symbol.toStringTag in val) {
                return $mol_dev_format_native(val);
            }
            return null;
        },
        hasBody: (val, config = false) => {
            if (config)
                return false;
            if (!val)
                return false;
            if (val[$.$mol_dev_format_body])
                return true;
            return false;
        },
        body: (val, config = false) => {
            if (config)
                return null;
            if (!val)
                return null;
            if ($.$mol_dev_format_body in val) {
                try {
                    return val[$.$mol_dev_format_body]();
                }
                catch (error) {
                    return $.$mol_dev_format_accent($mol_dev_format_native(val), '💨', $mol_dev_format_native(error), '');
                }
            }
            return null;
        },
    });
    function $mol_dev_format_native(obj) {
        if (typeof obj === 'undefined')
            return $.$mol_dev_format_shade('undefined');
        return [
            'object',
            {
                object: obj,
                config: true,
            },
        ];
    }
    $.$mol_dev_format_native = $mol_dev_format_native;
    function $mol_dev_format_auto(obj) {
        if (obj == null)
            return $.$mol_dev_format_shade(String(obj));
        return [
            'object',
            {
                object: obj,
                config: false,
            },
        ];
    }
    $.$mol_dev_format_auto = $mol_dev_format_auto;
    function $mol_dev_format_element(element, style, ...content) {
        const styles = [];
        for (let key in style)
            styles.push(`${key} : ${style[key]}`);
        return [
            element,
            {
                style: styles.join(' ; '),
            },
            ...content,
        ];
    }
    $.$mol_dev_format_element = $mol_dev_format_element;
    $.$mol_dev_format_span = $mol_dev_format_element.bind(null, 'span');
    $.$mol_dev_format_div = $mol_dev_format_element.bind(null, 'div');
    $.$mol_dev_format_ol = $mol_dev_format_element.bind(null, 'ol');
    $.$mol_dev_format_li = $mol_dev_format_element.bind(null, 'li');
    $.$mol_dev_format_table = $mol_dev_format_element.bind(null, 'table');
    $.$mol_dev_format_tr = $mol_dev_format_element.bind(null, 'tr');
    $.$mol_dev_format_td = $mol_dev_format_element.bind(null, 'td');
    $.$mol_dev_format_accent = $.$mol_dev_format_span.bind(null, {
        'color': 'magenta',
    });
    $.$mol_dev_format_strong = $.$mol_dev_format_span.bind(null, {
        'font-weight': 'bold',
    });
    $.$mol_dev_format_string = $.$mol_dev_format_span.bind(null, {
        'color': 'green',
    });
    $.$mol_dev_format_shade = $.$mol_dev_format_span.bind(null, {
        'color': 'gray',
    });
    $.$mol_dev_format_indent = $.$mol_dev_format_div.bind(null, {
        'margin-left': '13px'
    });
    class Stack extends Array {
        toString() {
            return this.join('\n');
        }
    }
    class Call extends Object {
        type;
        function;
        method;
        eval;
        source;
        offset;
        pos;
        object;
        flags;
        [Symbol.toStringTag];
        constructor(call) {
            super();
            this.type = call.getTypeName() ?? '';
            this.function = call.getFunctionName() ?? '';
            this.method = call.getMethodName() ?? '';
            if (this.method === this.function)
                this.method = '';
            this.pos = [call.getEnclosingLineNumber() ?? 0, call.getEnclosingColumnNumber() ?? 0];
            this.eval = call.getEvalOrigin() ?? '';
            this.source = call.getScriptNameOrSourceURL() ?? '';
            this.object = call.getThis();
            this.offset = call.getPosition();
            const flags = [];
            if (call.isAsync())
                flags.push('async');
            if (call.isConstructor())
                flags.push('constructor');
            if (call.isEval())
                flags.push('eval');
            if (call.isNative())
                flags.push('native');
            if (call.isPromiseAll())
                flags.push('PromiseAll');
            if (call.isToplevel())
                flags.push('top');
            this.flags = flags;
            const type = this.type ? this.type + '.' : '';
            const func = this.function || '<anon>';
            const method = this.method ? ' [' + this.method + '] ' : '';
            this[Symbol.toStringTag] = `${type}${func}${method}`;
        }
        [Symbol.toPrimitive]() {
            return this.toString();
        }
        toString() {
            const object = this.object || '';
            const label = this[Symbol.toStringTag];
            const source = `${this.source}:${this.pos.join(':')} #${this.offset}`;
            return `\tat ${object}${label} (${source})`;
        }
        [$.$mol_dev_format_head]() {
            return $.$mol_dev_format_div({}, $mol_dev_format_native(this), $.$mol_dev_format_shade(' '), ...this.object ? [
                $mol_dev_format_native(this.object),
            ] : [], ...this.method ? [$.$mol_dev_format_shade(' ', ' [', this.method, ']')] : [], $.$mol_dev_format_shade(' ', this.flags.join(', ')));
        }
    }
    Error.prepareStackTrace ??= (error, stack) => new Stack(...stack.map(call => new Call(call)));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_wire_pub_sub extends $mol_wire_pub {
        pub_from = 0;
        cursor = $mol_wire_cursor.stale;
        get temp() {
            return false;
        }
        get pub_list() {
            const res = [];
            const max = this.cursor >= 0 ? this.cursor : this.sub_from;
            for (let i = this.pub_from; i < max; i += 2) {
                if (this.data[i])
                    res.push(this.data[i]);
            }
            return res;
        }
        track_on() {
            this.cursor = this.pub_from;
            const sub = $mol_wire_auto();
            $mol_wire_auto(this);
            return sub;
        }
        promote() {
            if (this.cursor >= this.pub_from) {
                $mol_fail(new Error('Circular subscription'));
            }
            super.promote();
        }
        track_next(pub) {
            if (this.cursor < 0)
                $mol_fail(new Error('Promo to non begun sub'));
            if (this.cursor < this.sub_from) {
                const next = this.data[this.cursor];
                if (pub === undefined)
                    return next ?? null;
                if (next === pub) {
                    this.cursor += 2;
                    return next;
                }
                if (next) {
                    if (this.sub_from < this.data.length) {
                        this.peer_move(this.sub_from, this.data.length);
                    }
                    this.peer_move(this.cursor, this.sub_from);
                    this.sub_from += 2;
                }
            }
            else {
                if (pub === undefined)
                    return null;
                if (this.sub_from < this.data.length) {
                    this.peer_move(this.sub_from, this.data.length);
                }
                this.sub_from += 2;
            }
            this.data[this.cursor] = pub;
            this.data[this.cursor + 1] = pub.sub_on(this, this.cursor);
            this.cursor += 2;
            return pub;
        }
        track_off(sub) {
            $mol_wire_auto(sub);
            if (this.cursor < 0) {
                $mol_fail(new Error('End of non begun sub'));
            }
            for (let cursor = this.pub_from; cursor < this.cursor; cursor += 2) {
                const pub = this.data[cursor];
                pub.fresh();
            }
            this.cursor = $mol_wire_cursor.fresh;
        }
        pub_off(sub_pos) {
            this.data[sub_pos] = undefined;
            this.data[sub_pos + 1] = undefined;
        }
        destructor() {
            for (let cursor = this.data.length - 2; cursor >= this.sub_from; cursor -= 2) {
                const sub = this.data[cursor];
                const pos = this.data[cursor + 1];
                sub.pub_off(pos);
            }
            this.data.length = this.sub_from;
            this.cursor = this.pub_from;
            this.track_cut();
            this.cursor = $mol_wire_cursor.stale;
        }
        track_cut() {
            if (this.cursor < this.pub_from) {
                $mol_fail(new Error('Cut of non begun sub'));
            }
            let end = this.data.length;
            for (let cursor = this.cursor; cursor < this.sub_from; cursor += 2) {
                const pub = this.data[cursor];
                pub?.sub_off(this.data[cursor + 1]);
                end -= 2;
                if (this.sub_from <= end)
                    this.peer_move(end, cursor);
            }
            this.data.length = end;
            this.sub_from = this.cursor;
        }
        complete() { }
        complete_pubs() {
            const limit = this.cursor < 0 ? this.sub_from : this.cursor;
            for (let cursor = this.pub_from; cursor < limit; cursor += 2) {
                const pub = this.data[cursor];
                if (pub?.incompleted)
                    return;
            }
            for (let cursor = this.pub_from; cursor < limit; cursor += 2) {
                const pub = this.data[cursor];
                pub?.complete();
            }
        }
        absorb(quant = $mol_wire_cursor.stale, pos = -1) {
            if (this.cursor === $mol_wire_cursor.final)
                return;
            if (this.cursor >= quant)
                return;
            this.cursor = quant;
            this.emit($mol_wire_cursor.doubt);
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_native(this);
        }
        get pub_empty() {
            return this.sub_from === this.pub_from;
        }
    }
    $.$mol_wire_pub_sub = $mol_wire_pub_sub;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_after_tick extends $mol_object2 {
        task;
        static promise = null;
        cancelled = false;
        constructor(task) {
            super();
            this.task = task;
            if (!$mol_after_tick.promise)
                $mol_after_tick.promise = Promise.resolve().then(() => {
                    $mol_after_tick.promise = null;
                });
            $mol_after_tick.promise.then(() => {
                if (this.cancelled)
                    return;
                task();
            });
        }
        destructor() {
            this.cancelled = true;
        }
    }
    $.$mol_after_tick = $mol_after_tick;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const wrappers = new WeakMap();
    class $mol_wire_fiber extends $mol_wire_pub_sub {
        task;
        host;
        static warm = true;
        static planning = new Set();
        static reaping = new Set();
        static plan_task = null;
        static plan() {
            if (this.plan_task)
                return;
            this.plan_task = new $mol_after_tick(() => {
                try {
                    this.sync();
                }
                finally {
                    $mol_wire_fiber.plan_task = null;
                }
            });
        }
        static sync() {
            while (this.planning.size) {
                for (const fiber of this.planning) {
                    this.planning.delete(fiber);
                    if (fiber.cursor >= 0)
                        continue;
                    if (fiber.cursor === $mol_wire_cursor.final)
                        continue;
                    fiber.fresh();
                }
            }
            while (this.reaping.size) {
                const fibers = this.reaping;
                this.reaping = new Set;
                for (const fiber of fibers) {
                    if (!fiber.sub_empty)
                        continue;
                    fiber.destructor();
                }
            }
        }
        cache = undefined;
        get args() {
            return this.data.slice(0, this.pub_from);
        }
        result() {
            if ($mol_promise_like(this.cache))
                return;
            if (this.cache instanceof Error)
                return;
            return this.cache;
        }
        get incompleted() {
            return $mol_promise_like(this.cache);
        }
        field() {
            return this.task.name + '()';
        }
        constructor(id, task, host, args) {
            super(id);
            this.task = task;
            this.host = host;
            if (args)
                this.data.push(...args);
            this.pub_from = this.sub_from = args?.length ?? 0;
        }
        plan() {
            $mol_wire_fiber.planning.add(this);
            $mol_wire_fiber.plan();
            return this;
        }
        reap() {
            $mol_wire_fiber.reaping.add(this);
            $mol_wire_fiber.plan();
        }
        toString() {
            return this[Symbol.toStringTag];
        }
        toJSON() {
            return this[Symbol.toStringTag];
        }
        [$mol_dev_format_head]() {
            const cursor = {
                [$mol_wire_cursor.stale]: '🔴',
                [$mol_wire_cursor.doubt]: '🟡',
                [$mol_wire_cursor.fresh]: '🟢',
                [$mol_wire_cursor.final]: '🔵',
            }[this.cursor] ?? this.cursor.toString();
            return $mol_dev_format_div({}, $mol_owning_check(this, this.cache)
                ? $mol_dev_format_shade(cursor)
                : $mol_dev_format_shade(this[Symbol.toStringTag], cursor), $mol_dev_format_auto(this.cache));
        }
        [$mol_dev_format_body]() { return null; }
        get $() {
            return (this.host ?? this.task)['$'];
        }
        emit(quant = $mol_wire_cursor.stale) {
            if (this.sub_empty)
                this.plan();
            else
                super.emit(quant);
        }
        fresh() {
            if (this.cursor === $mol_wire_cursor.fresh)
                return;
            if (this.cursor === $mol_wire_cursor.final)
                return;
            check: if (this.cursor === $mol_wire_cursor.doubt) {
                for (let i = this.pub_from; i < this.sub_from; i += 2) {
                    ;
                    this.data[i]?.fresh();
                    if (this.cursor !== $mol_wire_cursor.doubt)
                        break check;
                }
                this.cursor = $mol_wire_cursor.fresh;
                return;
            }
            const bu = this.track_on();
            let result;
            try {
                switch (this.pub_from) {
                    case 0:
                        result = this.task.call(this.host);
                        break;
                    case 1:
                        result = this.task.call(this.host, this.data[0]);
                        break;
                    default:
                        result = this.task.call(this.host, ...this.args);
                        break;
                }
                if ($mol_promise_like(result)) {
                    if (wrappers.has(result)) {
                        result = wrappers.get(result).then(a => a);
                    }
                    else {
                        const put = (res) => {
                            if (this.cache === result)
                                this.put(res);
                            return res;
                        };
                        wrappers.set(result, result = Object.assign(result.then(put, put), { destructor: result.destructor || (() => { }) }));
                        wrappers.set(result, result);
                        const error = new Error(`Promise in ${this}`);
                        Object.defineProperty(result, 'stack', { get: () => error.stack });
                    }
                }
            }
            catch (error) {
                if (error instanceof Error || $mol_promise_like(error)) {
                    result = error;
                }
                else {
                    result = new Error(String(error), { cause: error });
                }
                if ($mol_promise_like(result)) {
                    if (wrappers.has(result)) {
                        result = wrappers.get(result);
                    }
                    else {
                        const put = (v) => {
                            if (this.cache === result)
                                this.absorb();
                            return v;
                        };
                        wrappers.set(result, result = Object.assign(result.then(put, put), { destructor: result.destructor || (() => { }) }));
                        const error = new Error(`Promise in ${this}`);
                        Object.defineProperty(result, 'stack', { get: () => error.stack });
                    }
                }
            }
            if (!$mol_promise_like(result)) {
                this.track_cut();
            }
            this.track_off(bu);
            this.put(result);
            return this;
        }
        refresh() {
            this.cursor = $mol_wire_cursor.stale;
            this.fresh();
        }
        sync() {
            if (!$mol_wire_fiber.warm) {
                return this.result();
            }
            this.promote();
            this.fresh();
            if (this.cache instanceof Error) {
                return $mol_fail_hidden(this.cache);
            }
            if ($mol_promise_like(this.cache)) {
                return $mol_fail_hidden(this.cache);
            }
            return this.cache;
        }
        async async_raw() {
            while (true) {
                this.fresh();
                if (this.cache instanceof Error) {
                    $mol_fail_hidden(this.cache);
                }
                if (!$mol_promise_like(this.cache))
                    return this.cache;
                await Promise.race([this.cache, this.step()]);
                if (!$mol_promise_like(this.cache))
                    return this.cache;
                if (this.cursor === $mol_wire_cursor.final) {
                    await new Promise(() => { });
                }
            }
        }
        async() {
            const promise = this.async_raw();
            if (!promise.destructor)
                promise.destructor = () => this.destructor();
            return promise;
        }
        step() {
            return new Promise(done => {
                const sub = new $mol_wire_pub_sub;
                const prev = sub.track_on();
                sub.track_next(this);
                sub.track_off(prev);
                sub.absorb = () => {
                    done(null);
                    setTimeout(() => sub.destructor());
                };
            });
        }
        destructor() {
            super.destructor();
            $mol_wire_fiber.planning.delete(this);
            if (!$mol_owning_check(this, this.cache))
                return;
            try {
                this.cache.destructor();
            }
            catch (result) {
                if ($mol_promise_like(result)) {
                    const error = new Error(`Promise in ${this}.destructor()`);
                    Object.defineProperty(result, 'stack', { get: () => error.stack });
                }
                $mol_fail_hidden(result);
            }
        }
    }
    $.$mol_wire_fiber = $mol_wire_fiber;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_compare_deep_cache = new WeakMap();
    function $mol_compare_deep(left, right) {
        if (Object.is(left, right))
            return true;
        if (left === null)
            return false;
        if (right === null)
            return false;
        if (typeof left !== 'object')
            return false;
        if (typeof right !== 'object')
            return false;
        const left_proto = Reflect.getPrototypeOf(left);
        const right_proto = Reflect.getPrototypeOf(right);
        if (left_proto !== right_proto)
            return false;
        if (left instanceof Boolean)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof Number)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof String)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof Date)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof RegExp)
            return left.source === right.source && left.flags === right.flags;
        if (left instanceof Error)
            return left.message === right.message && $mol_compare_deep(left.stack, right.stack);
        let left_cache = $.$mol_compare_deep_cache.get(left);
        if (left_cache) {
            const right_cache = left_cache.get(right);
            if (typeof right_cache === 'boolean')
                return right_cache;
        }
        else {
            left_cache = new WeakMap();
            $.$mol_compare_deep_cache.set(left, left_cache);
        }
        left_cache.set(right, true);
        let result;
        try {
            if (!left_proto)
                result = compare_pojo(left, right);
            else if (!Reflect.getPrototypeOf(left_proto))
                result = compare_pojo(left, right);
            else if (Symbol.toPrimitive in left)
                result = compare_primitive(left, right);
            else if (Array.isArray(left))
                result = compare_array(left, right);
            else if (left instanceof Set)
                result = compare_set(left, right);
            else if (left instanceof Map)
                result = compare_map(left, right);
            else if (ArrayBuffer.isView(left))
                result = compare_buffer(left, right);
            else if (Symbol.iterator in left)
                result = compare_iterator(left[Symbol.iterator](), right[Symbol.iterator]());
            else
                result = false;
        }
        finally {
            left_cache.set(right, result);
        }
        return result;
    }
    $.$mol_compare_deep = $mol_compare_deep;
    function compare_array(left, right) {
        const len = left.length;
        if (len !== right.length)
            return false;
        for (let i = 0; i < len; ++i) {
            if (!$mol_compare_deep(left[i], right[i]))
                return false;
        }
        return true;
    }
    function compare_buffer(left, right) {
        const len = left.byteLength;
        if (len !== right.byteLength)
            return false;
        if (left instanceof DataView)
            return compare_buffer(new Uint8Array(left.buffer, left.byteOffset, left.byteLength), new Uint8Array(right.buffer, right.byteOffset, right.byteLength));
        for (let i = 0; i < len; ++i) {
            if (left[i] !== right[i])
                return false;
        }
        return true;
    }
    function compare_iterator(left, right) {
        while (true) {
            const left_next = left.next();
            const right_next = right.next();
            if (left_next.done !== right_next.done)
                return false;
            if (left_next.done)
                break;
            if (!$mol_compare_deep(left_next.value, right_next.value))
                return false;
        }
        return true;
    }
    function compare_set(left, right) {
        if (left.size !== right.size)
            return false;
        return compare_iterator(left.values(), right.values());
    }
    function compare_map(left, right) {
        if (left.size !== right.size)
            return false;
        return compare_iterator(left.keys(), right.keys())
            && compare_iterator(left.values(), right.values());
    }
    function compare_pojo(left, right) {
        const left_keys = Object.getOwnPropertyNames(left);
        const right_keys = Object.getOwnPropertyNames(right);
        if (!compare_array(left_keys, right_keys))
            return false;
        for (let key of left_keys) {
            if (!$mol_compare_deep(left[key], right[key]))
                return false;
        }
        const left_syms = Object.getOwnPropertySymbols(left);
        const right_syms = Object.getOwnPropertySymbols(right);
        if (!compare_array(left_syms, right_syms))
            return false;
        for (let key of left_syms) {
            if (!$mol_compare_deep(left[key], right[key]))
                return false;
        }
        return true;
    }
    function compare_primitive(left, right) {
        return Object.is(left[Symbol.toPrimitive]('default'), right[Symbol.toPrimitive]('default'));
    }
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_log3_area_lazy(event) {
        const self = this.$;
        const stack = self.$mol_log3_stack;
        const deep = stack.length;
        let logged = false;
        stack.push(() => {
            logged = true;
            self.$mol_log3_area.call(self, event);
        });
        return () => {
            if (logged)
                self.console.groupEnd();
            if (stack.length > deep)
                stack.length = deep;
        };
    }
    $.$mol_log3_area_lazy = $mol_log3_area_lazy;
    $.$mol_log3_stack = [];
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_span extends $mol_object2 {
        uri;
        source;
        row;
        col;
        length;
        constructor(uri, source, row, col, length) {
            super();
            this.uri = uri;
            this.source = source;
            this.row = row;
            this.col = col;
            this.length = length;
            this[Symbol.toStringTag] = this.uri + ('#' + this.row + ':' + this.col + '/' + this.length);
        }
        static unknown = $mol_span.begin('?');
        static begin(uri, source = '') {
            return new $mol_span(uri, source, 1, 1, 0);
        }
        static end(uri, source) {
            return new $mol_span(uri, source, 1, source.length + 1, 0);
        }
        static entire(uri, source) {
            return new $mol_span(uri, source, 1, 1, source.length);
        }
        toString() {
            return this[Symbol.toStringTag];
        }
        toJSON() {
            return {
                uri: this.uri,
                row: this.row,
                col: this.col,
                length: this.length
            };
        }
        error(message, Class = Error) {
            return new Class(`${message} (${this})`);
        }
        span(row, col, length) {
            return new $mol_span(this.uri, this.source, row, col, length);
        }
        after(length = 0) {
            return new $mol_span(this.uri, this.source, this.row, this.col + this.length, length);
        }
        slice(begin, end = -1) {
            let len = this.length;
            if (begin < 0)
                begin += len;
            if (end < 0)
                end += len;
            if (begin < 0 || begin > len)
                this.$.$mol_fail(this.error(`Begin value '${begin}' out of range`, RangeError));
            if (end < 0 || end > len)
                this.$.$mol_fail(this.error(`End value '${end}' out of range`, RangeError));
            if (end < begin)
                this.$.$mol_fail(this.error(`End value '${end}' can't be less than begin value`, RangeError));
            return this.span(this.row, this.col + begin, end - begin);
        }
    }
    $.$mol_span = $mol_span;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_tree2_to_string(tree) {
        let output = [];
        function dump(tree, prefix = '') {
            if (tree.type.length) {
                if (!prefix.length) {
                    prefix = "\t";
                }
                output.push(tree.type);
                if (tree.kids.length == 1) {
                    output.push(' ');
                    dump(tree.kids[0], prefix);
                    return;
                }
                output.push("\n");
            }
            else if (tree.value.length || prefix.length) {
                output.push("\\" + tree.value + "\n");
            }
            for (const kid of tree.kids) {
                output.push(prefix);
                dump(kid, prefix + "\t");
            }
        }
        dump(tree);
        return output.join('');
    }
    $.$mol_tree2_to_string = $mol_tree2_to_string;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_maybe(value) {
        return (value == null) ? [] : [value];
    }
    $.$mol_maybe = $mol_maybe;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_tree2 extends Object {
        type;
        value;
        kids;
        span;
        constructor(type, value, kids, span) {
            super();
            this.type = type;
            this.value = value;
            this.kids = kids;
            this.span = span;
            this[Symbol.toStringTag] = type || '\\' + value;
        }
        static list(kids, span = $mol_span.unknown) {
            return new $mol_tree2('', '', kids, span);
        }
        list(kids) {
            return $mol_tree2.list(kids, this.span);
        }
        static data(value, kids = [], span = $mol_span.unknown) {
            const chunks = value.split('\n');
            if (chunks.length > 1) {
                let kid_span = span.span(span.row, span.col, 0);
                const data = chunks.map(chunk => {
                    kid_span = kid_span.after(chunk.length);
                    return new $mol_tree2('', chunk, [], kid_span);
                });
                kids = [...data, ...kids];
                value = '';
            }
            return new $mol_tree2('', value, kids, span);
        }
        data(value, kids = []) {
            return $mol_tree2.data(value, kids, this.span);
        }
        static struct(type, kids = [], span = $mol_span.unknown) {
            if (/[ \n\t\\]/.test(type)) {
                $$.$mol_fail(span.error(`Wrong type ${JSON.stringify(type)}`));
            }
            return new $mol_tree2(type, '', kids, span);
        }
        struct(type, kids = []) {
            return $mol_tree2.struct(type, kids, this.span);
        }
        clone(kids, span = this.span) {
            return new $mol_tree2(this.type, this.value, kids, span);
        }
        text() {
            var values = [];
            for (var kid of this.kids) {
                if (kid.type)
                    continue;
                values.push(kid.value);
            }
            return this.value + values.join('\n');
        }
        static fromString(str, uri = 'unknown') {
            return $$.$mol_tree2_from_string(str, uri);
        }
        toString() {
            return $$.$mol_tree2_to_string(this);
        }
        insert(value, ...path) {
            return this.update($mol_maybe(value), ...path)[0];
        }
        update(value, ...path) {
            if (path.length === 0)
                return value;
            const type = path[0];
            if (typeof type === 'string') {
                let replaced = false;
                const sub = this.kids.flatMap((item, index) => {
                    if (item.type !== type)
                        return item;
                    replaced = true;
                    return item.update(value, ...path.slice(1));
                }).filter(Boolean);
                if (!replaced && value) {
                    sub.push(...this.struct(type, []).update(value, ...path.slice(1)));
                }
                return [this.clone(sub)];
            }
            else if (typeof type === 'number') {
                const ins = (this.kids[type] || this.list([]))
                    .update(value, ...path.slice(1));
                return [this.clone([
                        ...this.kids.slice(0, type),
                        ...ins,
                        ...this.kids.slice(type + 1),
                    ])];
            }
            else {
                const kids = ((this.kids.length === 0) ? [this.list([])] : this.kids)
                    .flatMap(item => item.update(value, ...path.slice(1)));
                return [this.clone(kids)];
            }
        }
        select(...path) {
            let next = [this];
            for (const type of path) {
                if (!next.length)
                    break;
                const prev = next;
                next = [];
                for (var item of prev) {
                    switch (typeof (type)) {
                        case 'string':
                            for (var child of item.kids) {
                                if (child.type == type) {
                                    next.push(child);
                                }
                            }
                            break;
                        case 'number':
                            if (type < item.kids.length)
                                next.push(item.kids[type]);
                            break;
                        default: next.push(...item.kids);
                    }
                }
            }
            return this.list(next);
        }
        filter(path, value) {
            const sub = this.kids.filter(item => {
                var found = item.select(...path);
                if (value === undefined) {
                    return Boolean(found.kids.length);
                }
                else {
                    return found.kids.some(child => child.value == value);
                }
            });
            return this.clone(sub);
        }
        hack_self(belt, context = {}) {
            let handle = belt[this.type] || belt[''];
            if (!handle || handle === Object.prototype[this.type]) {
                handle = (input, belt, context) => [
                    input.clone(input.hack(belt, context), context.span)
                ];
            }
            try {
                return handle(this, belt, context);
            }
            catch (error) {
                error.message += `\n${this.clone([])}${this.span}`;
                $mol_fail_hidden(error);
            }
        }
        hack(belt, context = {}) {
            return [].concat(...this.kids.map(child => child.hack_self(belt, context)));
        }
        error(message, Class = Error) {
            return this.span.error(`${message}\n${this.clone([])}`, Class);
        }
    }
    $.$mol_tree2 = $mol_tree2;
    class $mol_tree2_empty extends $mol_tree2 {
        constructor() {
            super('', '', [], $mol_span.unknown);
        }
    }
    $.$mol_tree2_empty = $mol_tree2_empty;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_error_syntax extends SyntaxError {
        reason;
        line;
        span;
        constructor(reason, line, span) {
            super(`${reason}\n${span}\n${line.substring(0, span.col - 1).replace(/\S/g, ' ')}${''.padEnd(span.length, '!')}\n${line}`);
            this.reason = reason;
            this.line = line;
            this.span = span;
        }
    }
    $.$mol_error_syntax = $mol_error_syntax;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_tree2_from_string(str, uri = '?') {
        const span = $mol_span.entire(uri, str);
        var root = $mol_tree2.list([], span);
        var stack = [root];
        var pos = 0, row = 0, min_indent = 0;
        while (str.length > pos) {
            var indent = 0;
            var line_start = pos;
            row++;
            while (str.length > pos && str[pos] == '\t') {
                indent++;
                pos++;
            }
            if (!root.kids.length) {
                min_indent = indent;
            }
            indent -= min_indent;
            if (indent < 0 || indent >= stack.length) {
                const sp = span.span(row, 1, pos - line_start);
                while (str.length > pos && str[pos] != '\n') {
                    pos++;
                }
                if (indent < 0) {
                    if (str.length > pos) {
                        this.$mol_fail(new this.$mol_error_syntax(`Too few tabs`, str.substring(line_start, pos), sp));
                    }
                }
                else {
                    this.$mol_fail(new this.$mol_error_syntax(`Too many tabs`, str.substring(line_start, pos), sp));
                }
            }
            stack.length = indent + 1;
            var parent = stack[indent];
            while (str.length > pos && str[pos] != '\\' && str[pos] != '\n') {
                var error_start = pos;
                while (str.length > pos && (str[pos] == ' ' || str[pos] == '\t')) {
                    pos++;
                }
                if (pos > error_start) {
                    let line_end = str.indexOf('\n', pos);
                    if (line_end === -1)
                        line_end = str.length;
                    const sp = span.span(row, error_start - line_start + 1, pos - error_start);
                    this.$mol_fail(new this.$mol_error_syntax(`Wrong nodes separator`, str.substring(line_start, line_end), sp));
                }
                var type_start = pos;
                while (str.length > pos &&
                    str[pos] != '\\' &&
                    str[pos] != ' ' &&
                    str[pos] != '\t' &&
                    str[pos] != '\n') {
                    pos++;
                }
                if (pos > type_start) {
                    let next = new $mol_tree2(str.slice(type_start, pos), '', [], span.span(row, type_start - line_start + 1, pos - type_start));
                    const parent_kids = parent.kids;
                    parent_kids.push(next);
                    parent = next;
                }
                if (str.length > pos && str[pos] == ' ') {
                    pos++;
                }
            }
            if (str.length > pos && str[pos] == '\\') {
                var data_start = pos;
                while (str.length > pos && str[pos] != '\n') {
                    pos++;
                }
                let next = new $mol_tree2('', str.slice(data_start + 1, pos), [], span.span(row, data_start - line_start + 2, pos - data_start - 1));
                const parent_kids = parent.kids;
                parent_kids.push(next);
                parent = next;
            }
            if (str.length === pos && stack.length > 0) {
                const sp = span.span(row, pos - line_start + 1, 1);
                this.$mol_fail(new this.$mol_error_syntax(`Unexpected EOF, LF required`, str.substring(line_start, str.length), sp));
            }
            stack.push(parent);
            pos++;
        }
        return root;
    }
    $.$mol_tree2_from_string = $mol_tree2_from_string;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_array_chunks(array, rule) {
        const br = typeof rule === 'number' ? (_, i) => i % rule === 0 : rule;
        let chunk = [];
        const chunks = [];
        for (let i = 0; i < array.length; ++i) {
            const item = array[i];
            if (br(item, i)) {
                if (chunk.length)
                    chunks.push(chunk);
                chunk = [];
            }
            chunk.push(item);
        }
        if (chunk.length)
            chunks.push(chunk);
        return chunks;
    }
    $.$mol_array_chunks = $mol_array_chunks;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_tree2_from_json(json, span = $mol_span.unknown) {
        if (typeof json === 'boolean' || typeof json === 'number' || json === null) {
            return new $mol_tree2(String(json), '', [], span);
        }
        if (typeof json === 'string') {
            return $mol_tree2.data(json, [], span);
        }
        if (typeof json.toJSON === 'function') {
            return $mol_tree2_from_json(json.toJSON());
        }
        if (Array.isArray(json)) {
            const sub = json.map(json => $mol_tree2_from_json(json, span));
            return new $mol_tree2('/', '', sub, span);
        }
        if (ArrayBuffer.isView(json)) {
            const buf = new Uint8Array(json.buffer, json.byteOffset, json.byteLength);
            const codes = [...buf].map(b => b.toString(16).toUpperCase().padStart(2, '0'));
            const str = $mol_array_chunks(codes, 8).map(c => c.join(' ')).join('\n');
            return $mol_tree2.data(str, [], span);
        }
        if (json instanceof Date) {
            return new $mol_tree2('', json.toISOString(), [], span);
        }
        if (json.toString !== Object.prototype.toString) {
            return $mol_tree2.data(json.toString(), [], span);
        }
        if (json instanceof Error) {
            const { name, message, stack } = json;
            json = { ...json, name, message, stack };
        }
        const sub = [];
        for (var key in json) {
            const val = json[key];
            if (val === undefined)
                continue;
            const subsub = $mol_tree2_from_json(val, span);
            if (/^[^\n\t\\ ]+$/.test(key)) {
                sub.push(new $mol_tree2(key, '', [subsub], span));
            }
            else {
                sub.push($mol_tree2.data(key, [subsub], span));
            }
        }
        return new $mol_tree2('*', '', sub, span);
    }
    $.$mol_tree2_from_json = $mol_tree2_from_json;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_term_color {
        static reset = this.ansi(0, 0);
        static bold = this.ansi(1, 22);
        static italic = this.ansi(3, 23);
        static underline = this.ansi(4, 24);
        static inverse = this.ansi(7, 27);
        static hidden = this.ansi(8, 28);
        static strike = this.ansi(9, 29);
        static gray = this.ansi(90, 39);
        static red = this.ansi(91, 39);
        static green = this.ansi(92, 39);
        static yellow = this.ansi(93, 39);
        static blue = this.ansi(94, 39);
        static magenta = this.ansi(95, 39);
        static cyan = this.ansi(96, 39);
        static Gray = (str) => this.inverse(this.gray(str));
        static Red = (str) => this.inverse(this.red(str));
        static Green = (str) => this.inverse(this.green(str));
        static Yellow = (str) => this.inverse(this.yellow(str));
        static Blue = (str) => this.inverse(this.blue(str));
        static Magenta = (str) => this.inverse(this.magenta(str));
        static Cyan = (str) => this.inverse(this.cyan(str));
        static ansi(open, close) {
            if (typeof process === 'undefined')
                return String;
            if (!process.stdout.isTTY)
                return String;
            const prefix = `\x1b[${open}m`;
            const postfix = `\x1b[${close}m`;
            const suffix_regexp = new RegExp(postfix.replace('[', '\\['), 'g');
            return function colorer(str) {
                str = String(str);
                if (str === '')
                    return str;
                const suffix = str.replace(suffix_regexp, prefix);
                return prefix + suffix + postfix;
            };
        }
    }
    $.$mol_term_color = $mol_term_color;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_log3_node_make(level, output, type, color) {
        return function $mol_log3_logger(event) {
            if (!event.time)
                event = { ...event, time: new Date().toISOString() };
            let tree = this.$mol_tree2_from_json(event);
            tree = tree.struct(type, tree.kids);
            let str = color(tree.toString());
            this.console[level](str);
            const self = this;
            return () => self.console.groupEnd();
        };
    }
    $.$mol_log3_node_make = $mol_log3_node_make;
    $.$mol_log3_come = $mol_log3_node_make('info', 'stdout', 'come', $mol_term_color.blue);
    $.$mol_log3_done = $mol_log3_node_make('info', 'stdout', 'done', $mol_term_color.green);
    $.$mol_log3_fail = $mol_log3_node_make('error', 'stderr', 'fail', $mol_term_color.red);
    $.$mol_log3_warn = $mol_log3_node_make('warn', 'stderr', 'warn', $mol_term_color.yellow);
    $.$mol_log3_rise = $mol_log3_node_make('log', 'stdout', 'rise', $mol_term_color.magenta);
    $.$mol_log3_area = $mol_log3_node_make('log', 'stdout', 'area', $mol_term_color.cyan);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_wire_task extends $mol_wire_fiber {
        static getter(task) {
            return function $mol_wire_task_get(host, args) {
                const sub = $mol_wire_auto();
                const existen = sub?.track_next();
                let cause = '';
                reuse: if (existen) {
                    if (!existen.temp)
                        break reuse;
                    if (existen.task !== task) {
                        cause = 'task';
                        break reuse;
                    }
                    if (existen.host !== host) {
                        cause = 'host';
                        break reuse;
                    }
                    if (!$mol_compare_deep(existen.args, args)) {
                        cause = 'args';
                        break reuse;
                    }
                    return existen;
                }
                const key = (host?.[Symbol.toStringTag] ?? host) + ('.' + task.name + '<#>');
                const next = new $mol_wire_task(key, task, host, args);
                if (existen?.temp) {
                    $$.$mol_log3_warn({
                        place: '$mol_wire_task',
                        message: `Different ${cause} on restart`,
                        sub,
                        prev: existen,
                        next,
                        hint: 'Maybe required additional memoization',
                    });
                }
                return next;
            };
        }
        get temp() {
            return true;
        }
        complete() {
            if ($mol_promise_like(this.cache))
                return;
            this.destructor();
        }
        put(next) {
            const prev = this.cache;
            this.cache = next;
            if ($mol_promise_like(next)) {
                this.cursor = $mol_wire_cursor.fresh;
                if (next !== prev)
                    this.emit();
                if ($mol_owning_catch(this, next)) {
                    try {
                        next[Symbol.toStringTag] = this[Symbol.toStringTag];
                    }
                    catch {
                        Object.defineProperty(next, Symbol.toStringTag, { value: this[Symbol.toStringTag] });
                    }
                }
                return next;
            }
            this.cursor = $mol_wire_cursor.final;
            if (this.sub_empty)
                this.destructor();
            else if (next !== prev)
                this.emit();
            return next;
        }
        destructor() {
            super.destructor();
            this.cursor = $mol_wire_cursor.final;
        }
    }
    $.$mol_wire_task = $mol_wire_task;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const factories = new WeakMap();
    function factory(val) {
        let make = factories.get(val);
        if (make)
            return make;
        make = $mol_func_name_from((...args) => new val(...args), val);
        factories.set(val, make);
        return make;
    }
    const getters = new WeakMap();
    function get_prop(host, field) {
        let props = getters.get(host);
        let get_val = props?.[field];
        if (get_val)
            return get_val;
        get_val = (next) => {
            if (next !== undefined)
                host[field] = next;
            return host[field];
        };
        Object.defineProperty(get_val, 'name', { value: field });
        if (!props) {
            props = {};
            getters.set(host, props);
        }
        props[field] = get_val;
        return get_val;
    }
    function $mol_wire_sync(obj) {
        return new Proxy(obj, {
            get(obj, field) {
                let val = obj[field];
                const temp = $mol_wire_task.getter(typeof val === 'function' ? val : get_prop(obj, field));
                if (typeof val !== 'function')
                    return temp(obj, []).sync();
                return function $mol_wire_sync(...args) {
                    const fiber = temp(obj, args);
                    return fiber.sync();
                };
            },
            set(obj, field, next) {
                const temp = $mol_wire_task.getter(get_prop(obj, field));
                temp(obj, [next]).sync();
                return true;
            },
            construct(obj, args) {
                const temp = $mol_wire_task.getter(factory(obj));
                return temp(obj, args).sync();
            },
            apply(obj, self, args) {
                const temp = $mol_wire_task.getter(obj);
                return temp(self, args).sync();
            },
        });
    }
    $.$mol_wire_sync = $mol_wire_sync;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_run_error extends $mol_error_mix {
    }
    $.$mol_run_error = $mol_run_error;
    $.$mol_run_spawn = (...args) => $node['child_process'].spawn(...args);
    $.$mol_run_spawn_sync = (...args) => $node['child_process'].spawnSync(...args);
    class $mol_run extends $mol_object {
        static async_enabled() {
            return Boolean(this.$.$mol_env()['MOL_RUN_ASYNC']);
        }
        static spawn(options) {
            const sync = !this.async_enabled() || !Boolean($mol_wire_auto());
            const env = options.env ?? this.$.$mol_env();
            return $mol_wire_sync(this).spawn_async({ ...options, sync, env });
        }
        static spawn_async({ dir, sync, timeout, command, env }) {
            const args_raw = typeof command === 'string' ? command.split(' ') : command;
            const [app, ...args] = args_raw;
            const opts = { shell: true, cwd: dir, env };
            const log_object = {
                place: `${this}.spawn()`,
                message: 'Run',
                command: args_raw.join(' '),
                dir: $node.path.relative('', dir),
            };
            if (sync) {
                this.$.$mol_log3_come({
                    hint: 'Run inside fiber',
                    ...log_object
                });
                let error;
                let res;
                try {
                    res = this.$.$mol_run_spawn_sync(app, args, opts);
                    error = res.error;
                }
                catch (err) {
                    error = err;
                }
                if (!res || error || res.status) {
                    throw new $mol_run_error(this.error_message(res), { ...log_object, status: res?.status, signal: res?.signal }, ...(error ? [error] : []));
                }
                return res;
            }
            let sub;
            try {
                sub = this.$.$mol_run_spawn(app, args, {
                    ...opts,
                    stdio: ['pipe', 'inherit', 'inherit'],
                });
            }
            catch (error) {
                throw new $mol_run_error(this.error_message(undefined), log_object, error);
            }
            const pid = sub.pid ?? 0;
            this.$.$mol_log3_come({
                ...log_object,
                pid,
            });
            let timeout_kill = false;
            let timer;
            const std_data = [];
            const error_data = [];
            const add = (std_chunk, error_chunk) => {
                if (std_chunk)
                    std_data.push(std_chunk);
                if (error_chunk)
                    error_data.push(error_chunk);
                if (!timeout)
                    return;
                clearTimeout(timer);
                timer = setTimeout(() => {
                    const signal = timeout_kill ? 'SIGKILL' : 'SIGTERM';
                    timeout_kill = true;
                    add();
                    sub.kill(signal);
                }, timeout);
            };
            add();
            sub.stdout?.on('data', data => add(data));
            sub.stderr?.on('data', data => add(undefined, data));
            const result_promise = new Promise((done, fail) => {
                const close = (error, status = null, signal = null) => {
                    if (!timer && timeout)
                        return;
                    clearTimeout(timer);
                    timer = undefined;
                    const res = {
                        pid,
                        signal,
                        get stdout() { return Buffer.concat(std_data); },
                        get stderr() { return Buffer.concat(error_data); }
                    };
                    if (error || status || timeout_kill)
                        return fail(new $mol_run_error(this.error_message(res) + (timeout_kill ? ', timeout' : ''), { ...log_object, pid, status, signal, timeout_kill }, ...error ? [error] : []));
                    this.$.$mol_log3_done({
                        ...log_object,
                        pid,
                    });
                    done(res);
                };
                sub.on('disconnect', () => close(new Error('Disconnected')));
                sub.on('error', err => close(err));
                sub.on('exit', (status, signal) => close(null, status, signal));
            });
            return Object.assign(result_promise, { destructor: () => {
                    clearTimeout(timer);
                    sub.kill('SIGKILL');
                } });
        }
        static error_message(res) {
            return res?.stderr.toString() || res?.stdout.toString() || 'Run error';
        }
    }
    $.$mol_run = $mol_run;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_dom_context = new $node.jsdom.JSDOM('', { url: 'https://localhost/' }).window;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_dom = $mol_dom_context;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_style_attach(id, text) {
        const doc = $mol_dom_context.document;
        if (!doc)
            return null;
        const elid = `$mol_style_attach:${id}`;
        let el = doc.getElementById(elid);
        if (!el) {
            el = doc.createElement('style');
            el.id = elid;
            doc.head.appendChild(el);
        }
        if (el.innerHTML != text)
            el.innerHTML = text;
        return el;
    }
    $.$mol_style_attach = $mol_style_attach;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_promise extends Promise {
        done;
        fail;
        constructor(executor) {
            let done;
            let fail;
            super((d, f) => {
                done = d;
                fail = f;
                executor?.(d, f);
            });
            this.done = done;
            this.fail = fail;
        }
    }
    $.$mol_promise = $mol_promise;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_promise_blocker extends $mol_promise {
        static [Symbol.toStringTag] = '$mol_promise_blocker';
    }
    $.$mol_promise_blocker = $mol_promise_blocker;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_decor {
        value;
        constructor(value) {
            this.value = value;
        }
        prefix() { return ''; }
        valueOf() { return this.value; }
        postfix() { return ''; }
        toString() {
            return `${this.prefix()}${this.valueOf()}${this.postfix()}`;
        }
    }
    $.$mol_decor = $mol_decor;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_style_unit extends $mol_decor {
        literal;
        constructor(value, literal) {
            super(value);
            this.literal = literal;
        }
        postfix() {
            return this.literal;
        }
        static per(value) { return `${value}%`; }
        static px(value) { return `${value}px`; }
        static mm(value) { return `${value}mm`; }
        static cm(value) { return `${value}cm`; }
        static Q(value) { return `${value}Q`; }
        static in(value) { return `${value}in`; }
        static pc(value) { return `${value}pc`; }
        static pt(value) { return `${value}pt`; }
        static cap(value) { return `${value}cap`; }
        static ch(value) { return `${value}ch`; }
        static em(value) { return `${value}em`; }
        static rem(value) { return `${value}rem`; }
        static ex(value) { return `${value}ex`; }
        static ic(value) { return `${value}ic`; }
        static lh(value) { return `${value}lh`; }
        static rlh(value) { return `${value}rlh`; }
        static vh(value) { return `${value}vh`; }
        static vw(value) { return `${value}vw`; }
        static vi(value) { return `${value}vi`; }
        static vb(value) { return `${value}vb`; }
        static vmin(value) { return `${value}vmin`; }
        static vmax(value) { return `${value}vmax`; }
        static deg(value) { return `${value}deg`; }
        static rad(value) { return `${value}rad`; }
        static grad(value) { return `${value}grad`; }
        static turn(value) { return `${value}turn`; }
        static s(value) { return `${value}s`; }
        static ms(value) { return `${value}ms`; }
    }
    $.$mol_style_unit = $mol_style_unit;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const { per } = $mol_style_unit;
    class $mol_style_func extends $mol_decor {
        name;
        constructor(name, value) {
            super(value);
            this.name = name;
        }
        prefix() { return this.name + '('; }
        postfix() { return ')'; }
        static linear_gradient(value) {
            return new $mol_style_func('linear-gradient', value);
        }
        static radial_gradient(value) {
            return new $mol_style_func('radial-gradient', value);
        }
        static calc(value) {
            return new $mol_style_func('calc', value);
        }
        static vary(name, defaultValue) {
            return new $mol_style_func('var', defaultValue ? [name, defaultValue] : name);
        }
        static url(href) {
            return new $mol_style_func('url', JSON.stringify(href));
        }
        static hsla(hue, saturation, lightness, alpha) {
            return new $mol_style_func('hsla', [hue, per(saturation), per(lightness), alpha]);
        }
        static clamp(min, mid, max) {
            return new $mol_style_func('clamp', [min, mid, max]);
        }
        static rgba(red, green, blue, alpha) {
            return new $mol_style_func('rgba', [red, green, blue, alpha]);
        }
        static scale(zoom) {
            return new $mol_style_func('scale', [zoom]);
        }
        static linear(...breakpoints) {
            return new $mol_style_func("linear", breakpoints.map((e) => Array.isArray(e)
                ? String(e[0]) +
                    " " +
                    (typeof e[1] === "number" ? e[1] + "%" : e[1].toString())
                : String(e)));
        }
        static cubic_bezier(x1, y1, x2, y2) {
            return new $mol_style_func('cubic-bezier', [x1, y1, x2, y2]);
        }
        static steps(value, step_position) {
            return new $mol_style_func('steps', [value, step_position]);
        }
        static blur(value) {
            return new $mol_style_func('blur', value ?? "");
        }
        static brightness(value) {
            return new $mol_style_func('brightness', value ?? "");
        }
        static contrast(value) {
            return new $mol_style_func('contrast', value ?? "");
        }
        static drop_shadow(color, x_offset, y_offset, blur_radius) {
            return new $mol_style_func("drop-shadow", blur_radius
                ? [color, x_offset, y_offset, blur_radius]
                : [color, x_offset, y_offset]);
        }
        static grayscale(value) {
            return new $mol_style_func('grayscale', value ?? "");
        }
        static hue_rotate(value) {
            return new $mol_style_func('hue-rotate', value ?? "");
        }
        static invert(value) {
            return new $mol_style_func('invert', value ?? "");
        }
        static opacity(value) {
            return new $mol_style_func('opacity', value ?? "");
        }
        static sepia(value) {
            return new $mol_style_func('sepia', value ?? "");
        }
        static saturate(value) {
            return new $mol_style_func('saturate', value ?? "");
        }
    }
    $.$mol_style_func = $mol_style_func;
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    function $mol_style_prop(prefix, keys) {
        const record = keys.reduce((rec, key) => {
            rec[key] = $mol_style_func.vary(`--${prefix}_${key}`);
            return rec;
        }, {});
        return record;
    }
    $.$mol_style_prop = $mol_style_prop;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    const TypedArray = Object.getPrototypeOf(Uint8Array);
    function $mol_key(value) {
        primitives: {
            if (typeof value === 'bigint')
                return value.toString() + 'n';
            if (typeof value === 'symbol')
                return `Symbol(${value.description})`;
            if (!value)
                return JSON.stringify(value);
            if (typeof value !== 'object' && typeof value !== 'function')
                return JSON.stringify(value);
        }
        caching: {
            let key = $mol_key_store.get(value);
            if (key)
                return key;
        }
        objects: {
            if (value instanceof TypedArray) {
                return `${value[Symbol.toStringTag]}([${[...value].map(v => $mol_key(v))}])`;
            }
            if (Array.isArray(value))
                return `[${value.map(v => $mol_key(v))}]`;
            if (value instanceof RegExp)
                return value.toString();
            if (value instanceof Date)
                return `Date(${value.valueOf()})`;
        }
        structures: {
            const proto = Reflect.getPrototypeOf(value);
            if (!proto || !Reflect.getPrototypeOf(proto)) {
                return `{${Object.entries(value).map(([k, v]) => JSON.stringify(k) + ':' + $mol_key(v))}}`;
            }
        }
        handlers: {
            if ($mol_key_handle in value) {
                return value[$mol_key_handle]();
            }
        }
        containers: {
            const key = JSON.stringify('#' + $mol_guid());
            $mol_key_store.set(value, key);
            return key;
        }
    }
    $.$mol_key = $mol_key;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_after_timeout extends $mol_object2 {
        delay;
        task;
        id;
        constructor(delay, task) {
            super();
            this.delay = delay;
            this.task = task;
            this.id = setTimeout(task, delay);
        }
        destructor() {
            clearTimeout(this.id);
        }
    }
    $.$mol_after_timeout = $mol_after_timeout;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_after_frame extends $mol_after_timeout {
        task;
        constructor(task) {
            super(16, task);
            this.task = task;
        }
    }
    $.$mol_after_frame = $mol_after_frame;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_wire_method(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const temp = $mol_wire_task.getter(orig);
        const value = function (...args) {
            const fiber = temp(this ?? null, args);
            return fiber.sync();
        };
        Object.defineProperty(value, 'name', { value: orig.name + ' ' });
        Object.assign(value, { orig });
        const descr2 = { ...descr, value };
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_method = $mol_wire_method;
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    class $mol_wire_atom extends $mol_wire_fiber {
        static solo(host, task) {
            const field = task.name + '()';
            const existen = Object.getOwnPropertyDescriptor(host ?? task, field)?.value;
            if (existen)
                return existen;
            const prefix = host?.[Symbol.toStringTag] ?? (host instanceof Function ? $$.$mol_func_name(host) : host);
            const key = prefix + ('.' + task.name + '<>');
            const fiber = new $mol_wire_atom(key, task, host, []);
            (host ?? task)[field] = fiber;
            return fiber;
        }
        static plex(host, task, key) {
            const field = task.name + '()';
            let dict = Object.getOwnPropertyDescriptor(host ?? task, field)?.value;
            const prefix = host?.[Symbol.toStringTag] ?? (host instanceof Function ? $$.$mol_func_name(host) : host);
            const key_str = $mol_key(key);
            if (dict) {
                const existen = dict.get(key_str);
                if (existen)
                    return existen;
            }
            else {
                dict = (host ?? task)[field] = new Map();
            }
            const id = prefix + ('.' + task.name) + ('<' + key_str.replace(/^"|"$/g, "'") + '>');
            const fiber = new $mol_wire_atom(id, task, host, [key]);
            dict.set(key_str, fiber);
            return fiber;
        }
        static watching = new Set();
        static watcher = null;
        static watch() {
            $mol_wire_atom.watcher = new $mol_after_frame($mol_wire_atom.watch);
            for (const atom of $mol_wire_atom.watching) {
                if (atom.cursor === $mol_wire_cursor.final) {
                    $mol_wire_atom.watching.delete(atom);
                }
                else {
                    atom.cursor = $mol_wire_cursor.stale;
                    atom.fresh();
                }
            }
        }
        watch() {
            if (!$mol_wire_atom.watcher) {
                $mol_wire_atom.watcher = new $mol_after_frame($mol_wire_atom.watch);
            }
            $mol_wire_atom.watching.add(this);
        }
        resync(args) {
            for (let cursor = this.pub_from; cursor < this.sub_from; cursor += 2) {
                const pub = this.data[cursor];
                if (pub && pub instanceof $mol_wire_task) {
                    pub.destructor();
                }
            }
            return this.put(this.task.call(this.host, ...args));
        }
        once() {
            return this.sync();
        }
        channel() {
            return Object.assign((next) => {
                if (next !== undefined)
                    return this.resync([...this.args, next]);
                if (!$mol_wire_fiber.warm)
                    return this.result();
                if ($mol_wire_auto()?.temp) {
                    return this.once();
                }
                else {
                    return this.sync();
                }
            }, { atom: this });
        }
        destructor() {
            super.destructor();
            if (this.pub_from === 0) {
                ;
                (this.host ?? this.task)[this.field()] = null;
            }
            else {
                const key = $mol_key(this.args[0]);
                const map = (this.host ?? this.task)[this.field()];
                if (!map.has(key))
                    this.$.$mol_log3_warn({
                        place: this,
                        message: 'Absent key on destruction',
                        hint: 'Check for $mol_key(key) is not changed',
                    });
                map.delete(key);
            }
        }
        put(next) {
            const prev = this.cache;
            update: if (next !== prev) {
                try {
                    if ($mol_compare_deep(prev, next))
                        break update;
                }
                catch (error) {
                    $mol_fail_log(error);
                }
                if ($mol_owning_check(this, prev)) {
                    prev.destructor();
                }
                if ($mol_owning_catch(this, next)) {
                    try {
                        next[Symbol.toStringTag] = this[Symbol.toStringTag];
                    }
                    catch {
                        Object.defineProperty(next, Symbol.toStringTag, { value: this[Symbol.toStringTag] });
                    }
                }
                if (!this.sub_empty)
                    this.emit();
            }
            this.cache = next;
            this.cursor = $mol_wire_cursor.fresh;
            if ($mol_promise_like(next))
                return next;
            this.complete_pubs();
            return next;
        }
    }
    __decorate([
        $mol_wire_method
    ], $mol_wire_atom.prototype, "resync", null);
    __decorate([
        $mol_wire_method
    ], $mol_wire_atom.prototype, "once", null);
    $.$mol_wire_atom = $mol_wire_atom;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_wire_solo(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const descr2 = {
            ...descr,
            value: function (...args) {
                let atom = $mol_wire_atom.solo(this, orig);
                if ((args.length === 0) || (args[0] === undefined)) {
                    if (!$mol_wire_fiber.warm)
                        return atom.result();
                    if ($mol_wire_auto()?.temp) {
                        return atom.once();
                    }
                    else {
                        return atom.sync();
                    }
                }
                return atom.resync(args);
            }
        };
        Reflect.defineProperty(descr2.value, 'name', { value: orig.name + ' ' });
        Reflect.defineProperty(descr2.value, 'length', { value: orig.length });
        Object.assign(descr2.value, { orig });
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_solo = $mol_wire_solo;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_wire_plex(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const descr2 = {
            ...descr,
            value: function (...args) {
                let atom = $mol_wire_atom.plex(this, orig, args[0]);
                if ((args.length === 1) || (args[1] === undefined)) {
                    if (!$mol_wire_fiber.warm)
                        return atom.result();
                    if ($mol_wire_auto()?.temp) {
                        return atom.once();
                    }
                    else {
                        return atom.sync();
                    }
                }
                return atom.resync(args);
            }
        };
        Reflect.defineProperty(descr2.value, 'name', { value: orig.name + ' ' });
        Reflect.defineProperty(descr2.value, 'length', { value: orig.length });
        Object.assign(descr2.value, { orig });
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_plex = $mol_wire_plex;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_mem = $mol_wire_solo;
    $.$mol_mem_key = $mol_wire_plex;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_action = $mol_wire_method;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_state_arg extends $mol_object {
        prefix;
        static prolog = '';
        static separator = ' ';
        static href(next) {
            return next || process.argv.slice(2).join(' ');
        }
        static href_normal() {
            return this.link({});
        }
        static dict(next) {
            if (next !== void 0)
                this.href(this.make_link(next));
            var href = this.href();
            var chunks = href.split(' ');
            var params = {};
            chunks.forEach(chunk => {
                if (!chunk)
                    return;
                var vals = chunk.split('=').map(decodeURIComponent);
                params[vals.shift()] = vals.join('=');
            });
            return params;
        }
        static value(key, next) {
            if (next === void 0)
                return this.dict()[key] ?? null;
            this.href(this.link({ [key]: next }));
            return next;
        }
        static link(next) {
            const params = {};
            var prev = this.dict();
            for (var key in prev) {
                params[key] = prev[key];
            }
            for (var key in next) {
                params[key] = next[key];
            }
            return this.make_link(params);
        }
        static make_link(next) {
            const chunks = [];
            for (const key in next) {
                if (next[key] !== null) {
                    chunks.push([key, next[key]].map(encodeURIComponent).join('='));
                }
            }
            return chunks.join(' ');
        }
        static go(next) {
            this.href(this.link(next));
        }
        static commit() { }
        constructor(prefix = '') {
            super();
            this.prefix = prefix;
        }
        value(key, next) {
            return this.constructor.value(this.prefix + key, next);
        }
        sub(postfix) {
            return new this.constructor(this.prefix + postfix + '.');
        }
        link(next) {
            const prefix = this.prefix;
            const dict = {};
            for (var key in next) {
                dict[prefix + key] = next[key];
            }
            return this.constructor.link(dict);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_state_arg, "href", null);
    __decorate([
        $mol_mem
    ], $mol_state_arg, "href_normal", null);
    __decorate([
        $mol_mem
    ], $mol_state_arg, "dict", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_arg, "value", null);
    __decorate([
        $mol_action
    ], $mol_state_arg, "go", null);
    $.$mol_state_arg = $mol_state_arg;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_media extends $mol_object2 {
        static match(query, next) {
            if (next !== undefined)
                return next;
            const res = this.$.$mol_dom_context.matchMedia?.(query) ?? {};
            res.onchange = () => this.match(query, res.matches);
            return res.matches;
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_media, "match", null);
    $.$mol_media = $mol_media;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_wire_solid() {
        let current = $mol_wire_auto();
        if (current.temp)
            current = current.host;
        if (current.reap !== nothing) {
            current?.sub_on(sub, sub.data.length);
        }
        current.reap = nothing;
    }
    $.$mol_wire_solid = $mol_wire_solid;
    const nothing = () => { };
    const sub = new $mol_wire_pub_sub;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_mem_persist = $mol_wire_solid;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_wire_probe(task, def) {
        const warm = $mol_wire_fiber.warm;
        try {
            $mol_wire_fiber.warm = false;
            const res = task();
            if (res === undefined)
                return def;
            return res;
        }
        finally {
            $mol_wire_fiber.warm = warm;
        }
    }
    $.$mol_wire_probe = $mol_wire_probe;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_mem_cached = $mol_wire_probe;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_wait_user_async() {
        return new Promise(done => $mol_dom.addEventListener('click', function onclick() {
            $mol_dom.removeEventListener('click', onclick);
            done(null);
        }));
    }
    $.$mol_wait_user_async = $mol_wait_user_async;
    function $mol_wait_user() {
        return this.$mol_wire_sync(this).$mol_wait_user_async();
    }
    $.$mol_wait_user = $mol_wait_user;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_storage extends $mol_object2 {
        static native() {
            return this.$.$mol_dom_context.navigator.storage ?? {
                persisted: async () => false,
                persist: async () => false,
                estimate: async () => ({}),
                getDirectory: async () => null,
            };
        }
        static persisted(next, cache) {
            $mol_mem_persist();
            if (cache)
                return Boolean(next);
            const native = this.native();
            if (next && !$mol_mem_cached(() => this.persisted())) {
                this.$.$mol_wait_user_async()
                    .then(() => native.persist())
                    .then(actual => {
                    setTimeout(() => this.persisted(actual, 'cache'), 5000);
                    if (actual)
                        this.$.$mol_log3_done({ place: `$mol_storage`, message: `Persist: Yes` });
                    else
                        this.$.$mol_log3_fail({ place: `$mol_storage`, message: `Persist: No` });
                });
            }
            return next ?? $mol_wire_sync(native).persisted();
        }
        static estimate() {
            return $mol_wire_sync(this.native() ?? {}).estimate();
        }
        static dir() {
            return $mol_wire_sync(this.native()).getDirectory();
        }
    }
    __decorate([
        $mol_mem
    ], $mol_storage, "native", null);
    __decorate([
        $mol_mem
    ], $mol_storage, "persisted", null);
    $.$mol_storage = $mol_storage;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_state_local extends $mol_object {
        static 'native()';
        static native() {
            if (this['native()'])
                return this['native()'];
            check: try {
                const native = $mol_dom_context.localStorage;
                if (!native)
                    break check;
                native.setItem('', '');
                native.removeItem('');
                return this['native()'] = native;
            }
            catch (error) {
                console.warn(error);
            }
            return this['native()'] = {
                getItem(key) {
                    return this[':' + key];
                },
                setItem(key, value) {
                    this[':' + key] = value;
                },
                removeItem(key) {
                    this[':' + key] = void 0;
                }
            };
        }
        static changes(next) { return next; }
        static value(key, next) {
            this.changes();
            if (next === void 0)
                return JSON.parse(this.native().getItem(key) || 'null');
            if (next === null) {
                this.native().removeItem(key);
            }
            else {
                this.native().setItem(key, JSON.stringify(next));
                this.$.$mol_storage.persisted(true);
            }
            return next;
        }
        prefix() { return ''; }
        value(key, next) {
            return $mol_state_local.value(this.prefix() + '.' + key, next);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_state_local, "changes", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_local, "value", null);
    $.$mol_state_local = $mol_state_local;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_const(value) {
        const getter = (() => value);
        getter['()'] = value;
        getter[Symbol.toStringTag] = value;
        getter[$mol_dev_format_head] = () => $mol_dev_format_span({}, '()=> ', $mol_dev_format_auto(value));
        return getter;
    }
    $.$mol_const = $mol_const;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_wire_async(obj) {
        let fiber;
        const temp = $mol_wire_task.getter(obj);
        return new Proxy(obj, {
            get(obj, field) {
                const val = obj[field];
                if (typeof val !== 'function')
                    return val;
                let fiber;
                const temp = $mol_wire_task.getter(val);
                return function $mol_wire_async(...args) {
                    fiber?.destructor();
                    fiber = temp(obj, args);
                    return fiber.async();
                };
            },
            apply(obj, self, args) {
                fiber?.destructor();
                fiber = temp(self, args);
                return fiber.async();
            },
        });
    }
    $.$mol_wire_async = $mol_wire_async;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_lock extends $mol_object {
        promise = null;
        async wait() {
            let next = () => { };
            let destructed = false;
            const task = $mol_wire_auto();
            if (!task)
                return next;
            const destructor = task.destructor.bind(task);
            task.destructor = () => {
                destructor();
                destructed = true;
                next();
            };
            let promise;
            do {
                promise = this.promise;
                await promise;
                if (destructed)
                    return next;
            } while (promise !== this.promise);
            this.promise = new Promise(done => { next = done; });
            return next;
        }
        grab() { return $mol_wire_sync(this).wait(); }
    }
    $.$mol_lock = $mol_lock;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_compare_array(a, b) {
        if (a === b)
            return true;
        if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
            return false;
        if (a.length !== b.length)
            return false;
        for (let i = 0; i < a.length; i++)
            if (a[i] !== b[i])
                return false;
        return true;
    }
    $.$mol_compare_array = $mol_compare_array;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    const decoders = {};
    function $mol_charset_decode(buffer, encoding = 'utf8') {
        let decoder = decoders[encoding];
        if (!decoder)
            decoder = decoders[encoding] = new TextDecoder(encoding);
        return decoder.decode(buffer);
    }
    $.$mol_charset_decode = $mol_charset_decode;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let buf = new Uint8Array(2 ** 12);
    function $mol_charset_buffer(size) {
        if (buf.byteLength < size)
            buf = new Uint8Array(size);
        return buf;
    }
    $.$mol_charset_buffer = $mol_charset_buffer;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_charset_encode(str) {
        const buf = $mol_charset_buffer(str.length * 3);
        return buf.slice(0, $mol_charset_encode_to(str, buf));
    }
    $.$mol_charset_encode = $mol_charset_encode;
    function $mol_charset_encode_to(str, buf, from = 0) {
        let pos = from;
        for (let i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            if (code < 0x80) {
                buf[pos++] = code;
            }
            else if (code < 0x800) {
                buf[pos++] = 0xc0 | (code >> 6);
                buf[pos++] = 0x80 | (code & 0x3f);
            }
            else if (code < 0xd800 || code >= 0xe000) {
                buf[pos++] = 0xe0 | (code >> 12);
                buf[pos++] = 0x80 | ((code >> 6) & 0x3f);
                buf[pos++] = 0x80 | (code & 0x3f);
            }
            else {
                const point = ((code - 0xd800) << 10) + str.charCodeAt(++i) + 0x2400;
                buf[pos++] = 0xf0 | (point >> 18);
                buf[pos++] = 0x80 | ((point >> 12) & 0x3f);
                buf[pos++] = 0x80 | ((point >> 6) & 0x3f);
                buf[pos++] = 0x80 | (point & 0x3f);
            }
        }
        return pos - from;
    }
    $.$mol_charset_encode_to = $mol_charset_encode_to;
    function $mol_charset_encode_size(str) {
        let size = 0;
        for (let i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            if (code < 0x80)
                size += 1;
            else if (code < 0x800)
                size += 2;
            else if (code < 0xd800 || code >= 0xe000)
                size += 3;
            else
                size += 4;
        }
        return size;
    }
    $.$mol_charset_encode_size = $mol_charset_encode_size;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file_transaction extends $mol_object {
        path() { return ''; }
        modes() { return []; }
        write(options) {
            throw new Error('Not implemented');
        }
        read() {
            throw new Error('Not implemented');
        }
        truncate(size) {
            throw new Error('Not implemented');
        }
        flush() {
            throw new Error('Not implemented');
        }
        close() {
            throw new Error('Not implemented');
        }
        destructor() {
            this.close();
        }
    }
    $.$mol_file_transaction = $mol_file_transaction;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let file_modes;
    (function (file_modes) {
        file_modes[file_modes["create"] = $node.fs.constants.O_CREAT] = "create";
        file_modes[file_modes["exists_truncate"] = $node.fs.constants.O_TRUNC] = "exists_truncate";
        file_modes[file_modes["exists_fail"] = $node.fs.constants.O_EXCL] = "exists_fail";
        file_modes[file_modes["read_only"] = $node.fs.constants.O_RDONLY] = "read_only";
        file_modes[file_modes["write_only"] = $node.fs.constants.O_WRONLY] = "write_only";
        file_modes[file_modes["read_write"] = $node.fs.constants.O_RDWR] = "read_write";
        file_modes[file_modes["append"] = $node.fs.constants.O_APPEND] = "append";
    })(file_modes || (file_modes = {}));
    function mode_mask(modes) {
        return modes.reduce((res, mode) => res | file_modes[mode], 0);
    }
    class $mol_file_transaction_node extends $mol_file_transaction {
        descr() {
            $mol_wire_solid();
            return $node.fs.openSync(this.path(), mode_mask(this.modes()));
        }
        write({ buffer, offset = 0, length, position = null }) {
            if (Array.isArray(buffer)) {
                return $node.fs.writevSync(this.descr(), buffer, position ?? undefined);
            }
            if (typeof buffer === 'string') {
                return $node.fs.writeSync(this.descr(), buffer, position);
            }
            length = length ?? buffer.byteLength;
            return $node.fs.writeSync(this.descr(), buffer, offset, length, position);
        }
        truncate(size) {
            $node.fs.ftruncateSync(this.descr());
        }
        read() {
            return $mol_file_node_buffer_normalize($node.fs.readFileSync(this.descr()));
        }
        flush() {
            $node.fs.fsyncSync(this.descr());
        }
        close() {
            $node.fs.closeSync(this.descr());
        }
    }
    __decorate([
        $mol_mem
    ], $mol_file_transaction_node.prototype, "descr", null);
    $.$mol_file_transaction_node = $mol_file_transaction_node;
    $.$mol_file_transaction = $mol_file_transaction_node;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file_base extends $mol_object {
        static absolute(path) {
            return this.make({
                path: $mol_const(path)
            });
        }
        static relative(path) {
            throw new Error('Not implemented yet');
        }
        static base = '';
        path() {
            return '.';
        }
        parent() {
            return this.resolve('..');
        }
        exists_cut() { return this.exists(); }
        root() {
            const path = this.path();
            const base = this.constructor.base;
            return base.startsWith(path) || this == this.parent();
        }
        stat(next, virt) {
            const path = this.path();
            const parent = this.parent();
            if (!this.root()) {
                parent.version();
            }
            parent.watcher();
            if (virt)
                return next ?? null;
            return next ?? this.info(path);
        }
        static changed = new Set;
        static frame = null;
        static changed_add(type, path) {
            if (/([\/\\]\.|___$)/.test(path))
                return;
            const file = this.relative(path.at(-1) === '/' ? path.slice(0, -1) : path);
            this.changed.add(file);
            if (!this.watching)
                return;
            this.frame?.destructor();
            this.frame = new this.$.$mol_after_timeout(this.watch_debounce(), () => {
                if (!this.watching)
                    return;
                this.watching = false;
                $mol_wire_async(this).flush();
            });
        }
        static watch_debounce() { return 500; }
        static flush() {
            for (const file of this.changed) {
                const parent = file.parent();
                try {
                    if ($mol_wire_probe(() => parent.sub()))
                        parent.sub(null);
                    file.reset();
                }
                catch (error) {
                    if ($mol_fail_catch(error))
                        $mol_fail_log(error);
                }
            }
            this.changed.clear();
            this.watching = true;
        }
        static watching = true;
        static lock = new $mol_lock;
        static watch_off(path) {
            this.watching = false;
            this.flush();
            this.watching = false;
            this.changed.add(this.absolute(path));
        }
        static unwatched(side_effect, affected_dir) {
            const unlock = this.lock.grab();
            this.watch_off(affected_dir);
            try {
                const result = side_effect();
                this.flush();
                unlock();
                return result;
            }
            catch (e) {
                if (!$mol_promise_like(e)) {
                    this.flush();
                    unlock();
                }
                $mol_fail_hidden(e);
            }
        }
        reset() {
            this.stat(null);
        }
        modified() { return this.stat()?.mtime ?? null; }
        version() {
            const next = this.stat()?.mtime.getTime().toString(36).toUpperCase() ?? '';
            return next;
        }
        info(path) { return null; }
        ensure() { }
        drop() { }
        copy(to) { }
        read() { return new Uint8Array; }
        write(buffer) { }
        kids() {
            return [];
        }
        readable(opts) {
            return new ReadableStream;
        }
        writable(opts) {
            return new WritableStream;
        }
        buffer(next) {
            let readed = new Uint8Array();
            if (next === undefined) {
                if (this.version())
                    readed = this.read();
            }
            const prev = $mol_mem_cached(() => this.buffer());
            const changed = prev === undefined || !$mol_compare_array(prev, next ?? readed);
            if (prev !== undefined && changed) {
                this.$.$mol_log3_rise({
                    place: `$mol_file_node.buffer()`,
                    message: 'Changed',
                    path: this.relate(),
                });
            }
            if (next === undefined)
                return changed ? readed : prev;
            if (!changed && this.exists())
                return prev;
            this.parent().exists(true);
            this.stat(this.stat_make(next.length), 'virt');
            this.write(next);
            return next;
        }
        stat_make(size) {
            const now = new Date();
            return {
                type: 'file',
                size,
                atime: now,
                mtime: now,
                ctime: now,
            };
        }
        clone(to) {
            if (!this.exists())
                return null;
            const target = this.constructor.absolute(to);
            try {
                this.version();
                target.parent().exists(true);
                this.copy(to);
                target.reset();
                return target;
            }
            catch (error) {
                if ($mol_fail_catch(error)) {
                    console.error(error);
                }
            }
            return null;
        }
        watcher() {
            return {
                destructor() { }
            };
        }
        exists(next) {
            const exists = Boolean(this.stat());
            if (next === undefined)
                return exists;
            if (next === exists)
                return exists;
            if (next) {
                this.parent().exists(true);
                this.ensure();
            }
            else {
                this.drop();
            }
            this.reset();
            return next;
        }
        type() {
            return this.stat()?.type ?? '';
        }
        name() {
            return this.path().replace(/^.*\//, '');
        }
        ext() {
            const match = /((?:\.\w+)+)$/.exec(this.path());
            return match ? match[1].substring(1) : '';
        }
        text(next, virt) {
            if (next !== undefined)
                this.exists();
            return this.text_int(next, virt);
        }
        text_int(next, virt) {
            if (virt) {
                this.stat(this.stat_make(0), 'virt');
                return next;
            }
            if (next === undefined) {
                return $mol_charset_decode(this.buffer());
            }
            else {
                const buffer = $mol_charset_encode(next);
                this.buffer(buffer);
                return next;
            }
        }
        sub(reset) {
            if (!this.exists())
                return [];
            if (this.type() !== 'dir')
                return [];
            this.version();
            return this.kids().filter(file => file.exists());
        }
        resolve(path) {
            throw new Error('implement');
        }
        relate(base = this.constructor.relative('.')) {
            const base_path = base.path();
            const path = this.path();
            return path.startsWith(base_path) ? path.slice(base_path.length) : path;
        }
        find(include, exclude) {
            const found = [];
            const sub = this.sub();
            for (const child of sub) {
                const child_path = child.path();
                if (exclude && child_path.match(exclude))
                    continue;
                if (!include || child_path.match(include))
                    found.push(child);
                if (child.type() === 'dir') {
                    const sub_child = child.find(include, exclude);
                    for (const child of sub_child)
                        found.push(child);
                }
            }
            return found;
        }
        size() {
            switch (this.type()) {
                case 'file': return this.stat()?.size ?? 0;
                default: return 0;
            }
        }
        toJSON() {
            return this.path();
        }
        open(...modes) {
            return this.$.$mol_file_transaction.make({
                path: () => this.path(),
                modes: () => modes
            });
        }
    }
    __decorate([
        $mol_action
    ], $mol_file_base.prototype, "exists_cut", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "stat", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "modified", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "version", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base.prototype, "readable", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base.prototype, "writable", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "buffer", null);
    __decorate([
        $mol_action
    ], $mol_file_base.prototype, "stat_make", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base.prototype, "clone", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "exists", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "type", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "text_int", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "sub", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "size", null);
    __decorate([
        $mol_action
    ], $mol_file_base.prototype, "open", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base, "absolute", null);
    __decorate([
        $mol_action
    ], $mol_file_base, "flush", null);
    __decorate([
        $mol_action
    ], $mol_file_base, "watch_off", null);
    $.$mol_file_base = $mol_file_base;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file extends $mol_file_base {
    }
    $.$mol_file = $mol_file;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function stat_convert(stat) {
        if (!stat)
            return null;
        let type;
        if (stat.isDirectory())
            type = 'dir';
        if (stat.isFile())
            type = 'file';
        if (stat.isSymbolicLink())
            type = 'link';
        if (!type)
            return $mol_fail(new Error(`Unsupported file type`));
        return {
            type,
            size: Number(stat.size),
            atime: stat.atime,
            mtime: stat.mtime,
            ctime: stat.ctime
        };
    }
    function $mol_file_node_buffer_normalize(buf) {
        return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
    }
    $.$mol_file_node_buffer_normalize = $mol_file_node_buffer_normalize;
    class $mol_file_node extends $mol_file {
        static relative(path) {
            return this.absolute($node.path.resolve(this.base, path).replace(/\\/g, '/'));
        }
        watcher(reset) {
            const path = this.path();
            const root = this.root();
            if (!root && !this.exists())
                return super.watcher();
            let watcher;
            try {
                watcher = $node.fs.watch(path);
            }
            catch (error) {
                if (!(error instanceof Error))
                    error = new Error('Unknown watch error', { cause: error });
                error.message += '\n' + path;
                if (root || error.code !== 'ENOENT') {
                    this.$.$mol_fail_log(error);
                }
                return super.watcher();
            }
            watcher.on('change', (type, name) => {
                if (!name)
                    return;
                const path = $node.path.join(this.path(), name.toString());
                this.constructor.changed_add(type, path);
            });
            watcher.on('error', e => this.$.$mol_fail_log(e));
            let destructed = false;
            watcher.on('close', () => {
                if (!destructed)
                    setTimeout(() => $mol_wire_async(this).watcher(null), 500);
            });
            return {
                destructor() {
                    destructed = true;
                    watcher.close();
                }
            };
        }
        info(path) {
            try {
                return stat_convert($node.fs.statSync(path));
            }
            catch (error) {
                if (this.$.$mol_fail_catch(error)) {
                    if (error.code === 'ENOENT')
                        return null;
                    if (error.code === 'EPERM')
                        return null;
                    error.message += '\n' + path;
                    this.$.$mol_fail_hidden(error);
                }
            }
            return null;
        }
        ensure() {
            const path = this.path();
            try {
                $node.fs.mkdirSync(path, { recursive: true });
                return null;
            }
            catch (e) {
                if (this.$.$mol_fail_catch(e)) {
                    if (e.code === 'EEXIST')
                        return null;
                    e.message += '\n' + path;
                    this.$.$mol_fail_hidden(e);
                }
            }
        }
        copy(to) {
            $node.fs.copyFileSync(this.path(), to);
        }
        drop() {
            $node.fs.unlinkSync(this.path());
        }
        read() {
            const path = this.path();
            try {
                return $mol_file_node_buffer_normalize($node.fs.readFileSync(path));
            }
            catch (error) {
                if (!$mol_promise_like(error)) {
                    error.message += '\n' + path;
                }
                $mol_fail_hidden(error);
            }
        }
        write(buffer) {
            const path = this.path();
            try {
                $node.fs.writeFileSync(path, buffer);
            }
            catch (error) {
                if (this.$.$mol_fail_catch(error)) {
                    error.message += '\n' + path;
                }
                return this.$.$mol_fail_hidden(error);
            }
        }
        kids() {
            const path = this.path();
            try {
                const kids = $node.fs.readdirSync(path)
                    .filter(name => !/^\.+$/.test(name))
                    .map(name => this.resolve(name));
                return kids;
            }
            catch (e) {
                if (this.$.$mol_fail_catch(e)) {
                    if (e.code === 'ENOENT')
                        return [];
                    e.message += '\n' + path;
                }
                $mol_fail_hidden(e);
            }
        }
        resolve(path) {
            return this.constructor
                .relative($node.path.join(this.path(), path));
        }
        relate(base = this.constructor.relative('.')) {
            return $node.path.relative(base.path(), this.path()).replace(/\\/g, '/');
        }
        readable(opts) {
            const { Readable } = $node['node:stream'];
            const stream = $node.fs.createReadStream(this.path(), {
                flags: 'r',
                autoClose: true,
                start: opts?.start,
                end: opts?.end,
                encoding: 'binary',
            });
            return Readable.toWeb(stream);
        }
        writable(opts) {
            const { Writable } = $node['node:stream'];
            const stream = $node.fs.createWriteStream(this.path(), {
                flags: 'w+',
                autoClose: true,
                start: opts?.start,
                encoding: 'binary',
            });
            return Writable.toWeb(stream);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_file_node.prototype, "watcher", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "info", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "ensure", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "copy", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "drop", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "read", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "write", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_node.prototype, "readable", null);
    __decorate([
        $mol_mem
    ], $mol_file_node.prototype, "writable", null);
    $.$mol_file_node = $mol_file_node;
    $.$mol_file = $mol_file_node;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_state_local_node extends $mol_state_local {
        static dir() {
            const base = process.env.XDG_DATA_HOME || ($node.os.homedir() + '/.local/share');
            return $mol_file.absolute(base).resolve('./mol_state_local');
        }
        static value(key, next) {
            const file = this.dir().resolve(encodeURIComponent(key) + '.json');
            if (next === null) {
                file.exists(false);
                return null;
            }
            const arg = next === undefined ? undefined : JSON.stringify(next);
            return JSON.parse(file.text(arg) || 'null');
        }
    }
    __decorate([
        $mol_mem
    ], $mol_state_local_node, "dir", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_local_node, "value", null);
    $.$mol_state_local_node = $mol_state_local_node;
    $.$mol_state_local = $mol_state_local_node;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function parse(theme) {
        if (theme === 'true')
            return true;
        if (theme === 'false')
            return false;
        return null;
    }
    function $mol_lights(next) {
        const arg = parse(this.$mol_state_arg.value('mol_lights'));
        const base = this.$mol_media.match('(prefers-color-scheme: light)');
        if (next === undefined) {
            return arg ?? this.$mol_state_local.value('$mol_lights') ?? base;
        }
        else {
            if (arg === null) {
                this.$mol_state_local.value('$mol_lights', next === base ? null : next);
            }
            else {
                this.$mol_state_arg.value('mol_lights', String(next));
            }
            return next;
        }
    }
    $.$mol_lights = $mol_lights;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_theme = $mol_style_prop('mol_theme', [
        'back',
        'hover',
        'card',
        'current',
        'special',
        'text',
        'control',
        'shade',
        'line',
        'focus',
        'field',
        'image',
        'spirit',
    ]);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/theme/theme.css", ":root {\n\t--mol_theme_hue: 240deg;\n\t--mol_theme_hue_spread: 90deg;\n\tcolor-scheme: dark light;\n}\n\n:where([mol_theme]) {\n\tcolor: var(--mol_theme_text);\n\tfill: var(--mol_theme_text);\n\tbackground-color: var(--mol_theme_back);\n}\n\t\n:root, [mol_theme=\"$mol_theme_dark\"], :where([mol_theme=\"$mol_theme_dark\"]) [mol_theme]  {\n\n\t--mol_theme_luma: -1;\n\t--mol_theme_image: invert(1) hue-rotate( 180deg );\n\t--mol_theme_spirit: hsl( 0deg, 0%, 0%, .75 );\n\n\t--mol_theme_back: hsl( var(--mol_theme_hue), 20%, 10% );\n\t--mol_theme_card: hsl( var(--mol_theme_hue), 50%, 20%, .25 );\n\t--mol_theme_field: hsl( var(--mol_theme_hue), 50%, 8%, .25 );\n\t--mol_theme_hover: hsl( var(--mol_theme_hue), 0%, 50%, .1 );\n\t\n\t--mol_theme_text: hsl( var(--mol_theme_hue), 0%, 80% );\n\t--mol_theme_shade: hsl( var(--mol_theme_hue), 0%, 60%, 1 );\n\t--mol_theme_line: hsl( var(--mol_theme_hue), 0%, 50%, .25 );\n\t--mol_theme_focus: hsl( calc( var(--mol_theme_hue) + 180deg ), 100%, 65% );\n\t\n\t--mol_theme_control: hsl( var(--mol_theme_hue), 60%, 65% );\n\t--mol_theme_current: hsl( calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ), 60%, 65% );\n\t--mol_theme_special: hsl( calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ), 60%, 65% );\n\n} @supports( color: oklch( 0% 0 0deg ) ) {\n:root, [mol_theme=\"$mol_theme_dark\"], :where([mol_theme=\"$mol_theme_dark\"]) [mol_theme]  {\n\t\n\t--mol_theme_back: oklch( 20% .03 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 30% .05 var(--mol_theme_hue) / .25 );\n\t--mol_theme_field: oklch( 15% 0 var(--mol_theme_hue) / .25 );\n\t--mol_theme_hover: oklch( 70% 0 var(--mol_theme_hue) / .1 );\n\t\n\t--mol_theme_text: oklch( 80% 0 var(--mol_theme_hue) );\n\t--mol_theme_shade: oklch( 60% 0 var(--mol_theme_hue) );\n\t--mol_theme_line: oklch( 60% 0 var(--mol_theme_hue) / .25 );\n\t--mol_theme_focus: oklch( 80% .2 calc( var(--mol_theme_hue) + 180deg ) );\n\t\n\t--mol_theme_control: oklch( 70% .1 var(--mol_theme_hue) );\n\t--mol_theme_current: oklch( 70% .2 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_special: oklch( 70% .2 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\n} }\n\n[mol_theme=\"$mol_theme_light\"], :where([mol_theme=\"$mol_theme_light\"]) [mol_theme] {\n\t\n\t--mol_theme_luma: 1;\n\t--mol_theme_image: none;\n\t--mol_theme_spirit: hsl( 0deg, 0%, 100%, .75 );\n\t\n\t--mol_theme_back: hsl( var(--mol_theme_hue), 20%, 92% );\n\t--mol_theme_card: hsl( var(--mol_theme_hue), 50%, 100%, .5 );\n\t--mol_theme_field: hsl( var(--mol_theme_hue), 50%, 100%, .75 );\n\t--mol_theme_hover: hsl( var(--mol_theme_hue), 0%, 50%, .1 );\n\t\n\t--mol_theme_text: hsl( var(--mol_theme_hue), 0%, 0% );\n\t--mol_theme_shade: hsl( var(--mol_theme_hue), 0%, 40%, 1 );\n\t--mol_theme_line: hsl( var(--mol_theme_hue), 0%, 50%, .25 );\n\t--mol_theme_focus: hsl( calc( var(--mol_theme_hue) + 180deg ), 100%, 40% );\n\t\n\t--mol_theme_control: hsl( var(--mol_theme_hue), 80%, 30% );\n\t--mol_theme_current: hsl( calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ), 80%, 30% );\n\t--mol_theme_special: hsl( calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ), 80%, 30% );\n\n} @supports( color: oklch( 0% 0 0deg ) ) {\n[mol_theme=\"$mol_theme_light\"], :where([mol_theme=\"$mol_theme_light\"]) [mol_theme] {\n\t--mol_theme_back: oklch( 92% .01 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 99% .01 var(--mol_theme_hue) / .5 );\n\t--mol_theme_field: oklch( 100% 0 var(--mol_theme_hue) / .5 );\n\t--mol_theme_hover: oklch( 50% 0 var(--mol_theme_hue) / .1 );\n\t\n\t--mol_theme_text: oklch( 20% 0 var(--mol_theme_hue) );\n\t--mol_theme_shade: oklch( 60% 0 var(--mol_theme_hue) );\n\t--mol_theme_line: oklch( 50% 0 var(--mol_theme_hue) / .25 );\n\t--mol_theme_focus: oklch( 60% .2 calc( var(--mol_theme_hue) + 180deg ) );\n\t\n\t--mol_theme_control: oklch( 40% .15 var(--mol_theme_hue) );\n\t--mol_theme_current: oklch( 50% .2 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_special: oklch( 50% .2 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\n} }\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_base\"] {\n\t--mol_theme_back: oklch( 25% .075 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 35% .1 var(--mol_theme_hue) / .25 );\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_base\"] {\n\t--mol_theme_back: oklch( 85% .075 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 98% .03 var(--mol_theme_hue) / .25 );\n}\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_current\"] {\n\t--mol_theme_back: oklch( 25% .05 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 35% .1 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) / .25 );\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_current\"] {\n\t--mol_theme_back: oklch( 85% .05 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 98% .03 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) / .25 );\n}\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_special\"] {\n\t--mol_theme_back: oklch( 25% .05 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 35% .1 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) / .25 );\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_special\"] {\n\t--mol_theme_back: oklch( 85% .05 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 98% .03 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) / .25 );\n}\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_accent\"] {\n\t--mol_theme_back: oklch( 35% .1 calc( var(--mol_theme_hue) + 180deg ) );\n\t--mol_theme_card: oklch( 45% .15 calc( var(--mol_theme_hue) + 180deg ) / .25 );\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_accent\"] {\n\t--mol_theme_back: oklch( 83% .1 calc( var(--mol_theme_hue) + 180deg ) );\n\t--mol_theme_card: oklch( 98% .03 calc( var(--mol_theme_hue) + 180deg ) / .25 );\n}\n\n");
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach('$mol_theme_lights', `:root { --mol_theme_back: oklch( ${$$.$mol_lights() ? 92 : 20}% .01 var(--mol_theme_hue) ) }`);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_gap = $mol_style_prop('mol_gap', [
        'page',
        'block',
        'text',
        'emoji',
        'round',
        'space',
        'blur',
    ]);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/gap/gap.css", ":root {\n\t--mol_gap_page: 3rem;\n\t--mol_gap_block: .75rem;\n\t--mol_gap_text: .5rem .75rem;\n\t--mol_gap_emoji: .5rem;\n\t--mol_gap_round: .25rem;\n\t--mol_gap_space: .25rem;\n\t--mol_gap_blur: .5rem;\n}\n");
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_children(el, childNodes) {
        const node_set = new Set(childNodes);
        let nextNode = el.firstChild;
        for (let view of childNodes) {
            if (view == null)
                continue;
            if (view instanceof $mol_dom_context.Node) {
                while (true) {
                    if (!nextNode) {
                        el.appendChild(view);
                        break;
                    }
                    if (nextNode == view) {
                        nextNode = nextNode.nextSibling;
                        break;
                    }
                    else {
                        if (node_set.has(nextNode)) {
                            el.insertBefore(view, nextNode);
                            break;
                        }
                        else {
                            const nn = nextNode.nextSibling;
                            el.removeChild(nextNode);
                            nextNode = nn;
                        }
                    }
                }
            }
            else {
                if (nextNode && nextNode.nodeName === '#text') {
                    const str = String(view);
                    if (nextNode.nodeValue !== str)
                        nextNode.nodeValue = str;
                    nextNode = nextNode.nextSibling;
                }
                else {
                    const textNode = $mol_dom_context.document.createTextNode(String(view));
                    el.insertBefore(textNode, nextNode);
                }
            }
        }
        while (nextNode) {
            const currNode = nextNode;
            nextNode = currNode.nextSibling;
            el.removeChild(currNode);
        }
    }
    $.$mol_dom_render_children = $mol_dom_render_children;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $.$mol_jsx_prefix = '';
    $.$mol_jsx_crumbs = '';
    $.$mol_jsx_booked = null;
    $.$mol_jsx_document = {
        getElementById: () => null,
        createElementNS: (space, name) => $mol_dom_context.document.createElementNS(space, name),
        createDocumentFragment: () => $mol_dom_context.document.createDocumentFragment(),
    };
    $.$mol_jsx_frag = '';
    function $mol_jsx(Elem, props, ...childNodes) {
        const id = props && props.id || '';
        const guid = id ? $.$mol_jsx_prefix ? $.$mol_jsx_prefix + '/' + id : id : $.$mol_jsx_prefix;
        const crumbs_self = id ? $.$mol_jsx_crumbs.replace(/(\S+)/g, `$1_${id.replace(/\/.*/i, '')}`) : $.$mol_jsx_crumbs;
        if (Elem && $.$mol_jsx_booked) {
            if ($.$mol_jsx_booked.has(id)) {
                $mol_fail(new Error(`JSX already has tag with id ${JSON.stringify(guid)}`));
            }
            else {
                $.$mol_jsx_booked.add(id);
            }
        }
        let node = guid ? $.$mol_jsx_document.getElementById(guid) : null;
        if ($.$mol_jsx_prefix) {
            const prefix_ext = $.$mol_jsx_prefix;
            const booked_ext = $.$mol_jsx_booked;
            const crumbs_ext = $.$mol_jsx_crumbs;
            for (const field in props) {
                const func = props[field];
                if (typeof func !== 'function')
                    continue;
                const wrapper = function (...args) {
                    const prefix = $.$mol_jsx_prefix;
                    const booked = $.$mol_jsx_booked;
                    const crumbs = $.$mol_jsx_crumbs;
                    try {
                        $.$mol_jsx_prefix = prefix_ext;
                        $.$mol_jsx_booked = booked_ext;
                        $.$mol_jsx_crumbs = crumbs_ext;
                        return func.call(this, ...args);
                    }
                    finally {
                        $.$mol_jsx_prefix = prefix;
                        $.$mol_jsx_booked = booked;
                        $.$mol_jsx_crumbs = crumbs;
                    }
                };
                $mol_func_name_from(wrapper, func);
                props[field] = wrapper;
            }
        }
        if (typeof Elem !== 'string') {
            if ('prototype' in Elem) {
                const view = node && node[String(Elem)] || new Elem;
                Object.assign(view, props);
                view[Symbol.toStringTag] = guid;
                view.childNodes = childNodes;
                if (!view.ownerDocument)
                    view.ownerDocument = $.$mol_jsx_document;
                view.className = (crumbs_self ? crumbs_self + ' ' : '') + (Elem['name'] || Elem);
                node = view.valueOf();
                node[String(Elem)] = view;
                return node;
            }
            else {
                const prefix = $.$mol_jsx_prefix;
                const booked = $.$mol_jsx_booked;
                const crumbs = $.$mol_jsx_crumbs;
                try {
                    $.$mol_jsx_prefix = guid;
                    $.$mol_jsx_booked = new Set;
                    $.$mol_jsx_crumbs = (crumbs_self ? crumbs_self + ' ' : '') + (Elem['name'] || Elem);
                    return Elem(props, ...childNodes);
                }
                finally {
                    $.$mol_jsx_prefix = prefix;
                    $.$mol_jsx_booked = booked;
                    $.$mol_jsx_crumbs = crumbs;
                }
            }
        }
        if (!node) {
            node = Elem
                ? $.$mol_jsx_document.createElementNS(props?.xmlns ?? 'http://www.w3.org/1999/xhtml', Elem)
                : $.$mol_jsx_document.createDocumentFragment();
        }
        $mol_dom_render_children(node, [].concat(...childNodes));
        if (!Elem)
            return node;
        if (guid)
            node.id = guid;
        for (const key in props) {
            if (key === 'id')
                continue;
            if (typeof props[key] === 'string') {
                if (typeof node[key] === 'string')
                    node[key] = props[key];
                node.setAttribute(key, props[key]);
            }
            else if (props[key] &&
                typeof props[key] === 'object' &&
                Reflect.getPrototypeOf(props[key]) === Reflect.getPrototypeOf({})) {
                if (typeof node[key] === 'object') {
                    Object.assign(node[key], props[key]);
                    continue;
                }
            }
            else {
                node[key] = props[key];
            }
        }
        if ($.$mol_jsx_crumbs)
            node.className = (props?.['class'] ? props['class'] + ' ' : '') + crumbs_self;
        return node;
    }
    $.$mol_jsx = $mol_jsx;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_window extends $mol_object {
        static size() {
            return {
                width: 1024,
                height: 768,
            };
        }
    }
    $.$mol_window = $mol_window;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_guard_defined(value) {
        return value !== null && value !== undefined;
    }
    $.$mol_guard_defined = $mol_guard_defined;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_view_selection extends $mol_object {
        static focused(next, notify) {
            const parents = [];
            let element = next?.[0] ?? $mol_dom_context.document.activeElement;
            while (element?.shadowRoot) {
                element = element.shadowRoot.activeElement;
            }
            while (element) {
                parents.push(element);
                const parent = element.parentNode;
                if (parent instanceof ShadowRoot)
                    element = parent.host;
                else
                    element = parent;
            }
            if (!next || notify)
                return parents;
            new $mol_after_tick(() => {
                const element = this.focused()[0];
                if (element)
                    element.focus();
                else
                    $mol_dom_context.blur();
            });
            return parents;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_view_selection, "focused", null);
    $.$mol_view_selection = $mol_view_selection;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_wrapper extends $mol_object2 {
        static wrap;
        static run(task) {
            return this.func(task)();
        }
        static func(func) {
            return this.wrap(func);
        }
        static get class() {
            return (Class) => {
                const construct = (target, args) => new Class(...args);
                const handler = {
                    construct: this.func(construct)
                };
                handler[Symbol.toStringTag] = Class.name + '#';
                return new Proxy(Class, handler);
            };
        }
        static get method() {
            return (obj, name, descr = Reflect.getOwnPropertyDescriptor(obj, name)) => {
                descr.value = this.func(descr.value);
                return descr;
            };
        }
        static get field() {
            return (obj, name, descr = Reflect.getOwnPropertyDescriptor(obj, name)) => {
                descr.get = descr.set = this.func(descr.get);
                return descr;
            };
        }
    }
    $.$mol_wrapper = $mol_wrapper;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_memo extends $mol_wrapper {
        static wrap(task) {
            const store = new WeakMap();
            const fun = function (next) {
                if (next === undefined && store.has(this))
                    return store.get(this);
                const val = task.call(this, next) ?? next;
                store.set(this, val);
                return val;
            };
            Reflect.defineProperty(fun, 'name', { value: task.name + ' ' });
            return fun;
        }
    }
    $.$mol_memo = $mol_memo;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_qname(name) {
        return name.replace(/\W/g, '').replace(/^(?=\d+)/, '_');
    }
    $.$mol_dom_qname = $mol_dom_qname;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_wire_watch() {
        const atom = $mol_wire_auto();
        if (atom instanceof $mol_wire_atom) {
            atom.watch();
        }
        else {
            $mol_fail(new Error('Atom is required for watching'));
        }
    }
    $.$mol_wire_watch = $mol_wire_watch;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_attributes(el, attrs) {
        for (let name in attrs) {
            let val = attrs[name];
            if (val === undefined) {
                continue;
            }
            else if (val === null || val === false) {
                if (!el.hasAttribute(name))
                    continue;
                el.removeAttribute(name);
            }
            else {
                const str = String(val);
                if (el.getAttribute(name) === str)
                    continue;
                el.setAttribute(name, str);
            }
        }
    }
    $.$mol_dom_render_attributes = $mol_dom_render_attributes;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_events(el, events, passive = false) {
        for (let name in events) {
            el.addEventListener(name, events[name], { passive });
        }
    }
    $.$mol_dom_render_events = $mol_dom_render_events;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_error_message(error) {
        return String((error instanceof Error ? error.message : null) || error) || 'Unknown';
    }
    $.$mol_error_message = $mol_error_message;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_styles(el, styles) {
        for (let name in styles) {
            let val = styles[name];
            const style = el.style;
            const kebab = (name) => name.replace(/[A-Z]/g, letter => '-' + letter.toLowerCase());
            if (typeof val === 'number') {
                style.setProperty(kebab(name), `${val}px`);
            }
            else {
                style.setProperty(kebab(name), val);
            }
        }
    }
    $.$mol_dom_render_styles = $mol_dom_render_styles;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_fields(el, fields) {
        for (let key in fields) {
            const val = fields[key];
            if (val === undefined)
                continue;
            if (val === el[key])
                continue;
            el[key] = val;
        }
    }
    $.$mol_dom_render_fields = $mol_dom_render_fields;
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/view/view/view.css", "@view-transition {\n\tnavigation: auto;\n}\n\n[mol_view] {\n\ttransition-property: height, width, min-height, min-width, max-width, max-height, transform, scale, translate, rotate;\n\ttransition-duration: .2s;\n\ttransition-timing-function: ease-out;\n\t-webkit-appearance: none;\n\tbox-sizing: border-box;\n\tdisplay: flex;\n\tflex-shrink: 0;\n\tcontain: style;\n\tscrollbar-color: var(--mol_theme_line) transparent;\n\tscrollbar-width: thin;\n}\t\n\n[mol_view]::selection {\n\tbackground: var(--mol_theme_line);\n}\t\n\n[mol_view]::-webkit-scrollbar {\n\twidth: .25rem;\n\theight: .25rem;\n}\n\n[mol_view]::-webkit-scrollbar-corner {\n\tbackground-color: var(--mol_theme_line);\n}\n\n[mol_view]::-webkit-scrollbar-track {\n\tbackground-color: transparent;\n}\n\n[mol_view]::-webkit-scrollbar-thumb {\n\tbackground-color: var(--mol_theme_line);\n\tborder-radius: var(--mol_gap_round);\n}\n\n[mol_view] > * {\n\tword-break: inherit;\n}\n\n[mol_view_root] {\n\tmargin: 0;\n\tpadding: 0;\n\twidth: 100%;\n\theight: 100%;\n\tbox-sizing: border-box;\n\tfont-family: system-ui, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n\tfont-size: 1rem;\n\tline-height: 1.5rem;\n\t/* background: var(--mol_theme_back);\n\tcolor: var(--mol_theme_text); */\n\tcontain: unset; /** Fixes bg ignoring when applied to body on Chrome */\n\ttab-size: 4;\n\toverscroll-behavior: contain; /** Disable navigation gestures **/\n}\n\n@media print {\n\t[mol_view_root] {\n\t\theight: auto;\n\t}\n}\n[mol_view][mol_view_error]:not([mol_view_error=\"Promise\"], [mol_view_error=\"$mol_promise_blocker\"]) {\n\tbackground-image: repeating-linear-gradient(\n\t\t-45deg,\n\t\t#f92323,\n\t\t#f92323 .5rem,\n\t\t#ff3d3d .5rem,\n\t\t#ff3d3d 1.5rem\n\t);\n\tcolor: black;\n\talign-items: center;\n\tjustify-content: center;\n}\n\n@keyframes mol_view_wait {\n\tfrom {\n\t\topacity: .25;\n\t}\n\t20% {\n\t\topacity: .75;\n\t}\n\tto {\n\t\topacity: .25;\n\t}\n}\n\n:where([mol_view][mol_view_error=\"$mol_promise_blocker\"]),\n:where([mol_view][mol_view_error=\"Promise\"]) {\n\tbackground: var(--mol_theme_hover);\n}\n\n[mol_view][mol_view_error=\"Promise\"] {\n\tanimation: mol_view_wait 1s steps(20,end) infinite;\n}\n");
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_view_visible_width() {
        return $mol_window.size().width;
    }
    $.$mol_view_visible_width = $mol_view_visible_width;
    function $mol_view_visible_height() {
        return $mol_window.size().height;
    }
    $.$mol_view_visible_height = $mol_view_visible_height;
    function $mol_view_state_key(suffix) {
        return suffix;
    }
    $.$mol_view_state_key = $mol_view_state_key;
    class $mol_view extends $mol_object {
        static Root(id) {
            return new this;
        }
        static roots() {
            return [...$mol_dom.document.querySelectorAll('[mol_view_root]:not([mol_view_root=""])')].map((node, index) => {
                const name = node.getAttribute('mol_view_root');
                const View = this.$[name];
                if (!View) {
                    $mol_fail_log(new Error(`Autobind unknown view class`, { cause: { name } }));
                    return null;
                }
                const view = View.Root(index);
                view.dom_node(node);
                return view;
            }).filter($mol_guard_defined);
        }
        static auto() {
            const roots = this.roots();
            if (!roots.length)
                return;
            for (const root of roots) {
                try {
                    root.dom_tree();
                }
                catch (error) {
                    $mol_fail_log(error);
                }
            }
            try {
                document.title = roots[0].title();
            }
            catch (error) {
                $mol_fail_log(error);
            }
            descr: try {
                const descr = roots[0].hint();
                if (!descr)
                    break descr;
                const head = $mol_dom.document.head;
                let node = head.querySelector('meta[name="description"]');
                if (node)
                    node.content = descr;
                else
                    head.append($mol_jsx("meta", { name: "description", content: descr }));
            }
            catch (error) {
                $mol_fail_log(error);
            }
        }
        title() {
            return this.toString().match(/.*\.(\w+)/)?.[1] ?? this.toString();
        }
        hint() {
            return '';
        }
        focused(next) {
            let node = this.dom_node();
            const value = $mol_view_selection.focused(next === undefined ? undefined : (next ? [node] : []));
            return value.indexOf(node) !== -1;
        }
        state_key(suffix = '') {
            return this.$.$mol_view_state_key(suffix);
        }
        dom_name() {
            return $mol_dom_qname(this.constructor.toString()) || 'div';
        }
        dom_name_space() { return 'http://www.w3.org/1999/xhtml'; }
        sub() {
            return [];
        }
        sub_visible() {
            return this.sub();
        }
        minimal_width() {
            let min = 0;
            try {
                const sub = this.sub();
                if (!sub)
                    return 0;
                sub.forEach(view => {
                    if (view instanceof $mol_view) {
                        min = Math.max(min, view.minimal_width());
                    }
                });
            }
            catch (error) {
                $mol_fail_log(error);
                return 24;
            }
            return min;
        }
        maximal_width() {
            return this.minimal_width();
        }
        minimal_height() {
            let min = 0;
            try {
                for (const view of this.sub() ?? []) {
                    if (view instanceof $mol_view) {
                        min = Math.max(min, view.minimal_height());
                    }
                }
            }
            catch (error) {
                $mol_fail_log(error);
                return 24;
            }
            return min;
        }
        static watchers = new Set();
        view_rect() {
            if ($mol_wire_probe(() => this.view_rect()) === undefined) {
                $mol_wire_watch();
                return null;
            }
            else {
                const { width, height, left, right, top, bottom } = this.dom_node().getBoundingClientRect();
                return { width, height, left, right, top, bottom };
            }
        }
        dom_id() {
            return this.toString().replace(/</g, '(').replace(/>/g, ')').replaceAll(/"/g, "'");
        }
        dom_node_external(next) {
            const node = next ?? $mol_dom_context.document.createElementNS(this.dom_name_space(), this.dom_name());
            const id = this.dom_id();
            node.setAttribute('id', id);
            node.toString = $mol_const('<#' + id + '>');
            return node;
        }
        dom_node(next) {
            $mol_wire_solid();
            const node = this.dom_node_external(next);
            $mol_dom_render_attributes(node, this.attr_static());
            const events = this.event_async();
            $mol_dom_render_events(node, events);
            return node;
        }
        dom_final() {
            this.render();
            const sub = this.sub_visible();
            if (!sub)
                return;
            for (const el of sub) {
                if (el && typeof el === 'object' && 'dom_final' in el) {
                    el['dom_final']();
                }
            }
            return this.dom_node();
        }
        dom_tree(next) {
            const node = this.dom_node(next);
            render: try {
                $mol_dom_render_attributes(node, { mol_view_error: null });
                try {
                    this.render();
                }
                finally {
                    for (let plugin of this.plugins()) {
                        if (plugin instanceof $mol_plugin) {
                            plugin.dom_tree();
                        }
                    }
                }
            }
            catch (error) {
                $mol_fail_log(error);
                const mol_view_error = $mol_promise_like(error)
                    ? error.constructor[Symbol.toStringTag] ?? 'Promise'
                    : error.name || error.constructor.name;
                $mol_dom_render_attributes(node, { mol_view_error });
                if ($mol_promise_like(error))
                    break render;
                try {
                    ;
                    node.innerText = this.$.$mol_error_message(error).replace(/^|$/mg, '\xA0\xA0');
                }
                catch { }
            }
            try {
                this.auto();
            }
            catch (error) {
                $mol_fail_log(error);
            }
            return node;
        }
        dom_node_actual() {
            const node = this.dom_node();
            const attr = this.attr();
            const style = this.style();
            $mol_dom_render_attributes(node, attr);
            $mol_dom_render_styles(node, style);
            return node;
        }
        auto() {
            return [];
        }
        render() {
            const node = this.dom_node_actual();
            const sub = this.sub_visible();
            if (!sub)
                return;
            const nodes = sub.map(child => {
                if (child == null)
                    return null;
                return (child instanceof $mol_view)
                    ? child.dom_node()
                    : child instanceof $mol_dom_context.Node
                        ? child
                        : String(child);
            });
            $mol_dom_render_children(node, nodes);
            for (const el of sub)
                if (el && typeof el === 'object' && 'dom_tree' in el)
                    el['dom_tree']();
            $mol_dom_render_fields(node, this.field());
        }
        static view_classes() {
            const proto = this.prototype;
            let current = proto;
            const classes = [];
            while (current) {
                if (current.constructor.name !== classes.at(-1)?.name) {
                    classes.push(current.constructor);
                }
                if (!(current instanceof $mol_view))
                    break;
                current = Object.getPrototypeOf(current);
            }
            return classes;
        }
        static _view_names;
        static view_names(suffix) {
            let cache = Reflect.getOwnPropertyDescriptor(this, '_view_names')?.value;
            if (!cache)
                cache = this._view_names = new Map;
            const cached = cache.get(suffix);
            if (cached)
                return cached;
            const names = [];
            const suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1);
            for (const Class of this.view_classes()) {
                if (suffix in Class.prototype)
                    names.push(this.$.$mol_func_name(Class) + suffix2);
                else
                    break;
            }
            cache.set(suffix, names);
            return names;
        }
        view_names_owned() {
            const names = [];
            let owner = $mol_owning_get(this);
            if (!(owner?.host instanceof $mol_view))
                return names;
            const suffix = owner.task.name.trim();
            const suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1);
            names.push(...owner.host.constructor.view_names(suffix));
            for (let prefix of owner.host.view_names_owned()) {
                names.push(prefix + suffix2);
            }
            return names;
        }
        view_names() {
            const names = new Set();
            for (let name of this.view_names_owned())
                names.add(name);
            for (let Class of this.constructor.view_classes()) {
                const name = this.$.$mol_func_name(Class);
                if (name)
                    names.add(name);
            }
            return names;
        }
        theme(next) {
            return next;
        }
        attr_static() {
            let attrs = {};
            for (let name of this.view_names())
                attrs[name.replace(/\$/g, '').replace(/^(?=\d)/, '_').toLowerCase()] = '';
            return attrs;
        }
        attr() {
            return {
                mol_theme: this.theme(),
            };
        }
        style() {
            return {};
        }
        field() {
            return {};
        }
        event() {
            return {};
        }
        event_async() {
            return { ...$mol_wire_async(this.event()) };
        }
        plugins() {
            return [];
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this));
        }
        *view_find(check, path = []) {
            if (path.length === 0 && check(this))
                return yield [this];
            try {
                const checked = new Set();
                const sub = this.sub();
                for (const item of sub) {
                    if (!(item instanceof $mol_view))
                        continue;
                    if (!check(item))
                        continue;
                    checked.add(item);
                    yield [...path, this, item];
                }
                for (const item of sub) {
                    if (!(item instanceof $mol_view))
                        continue;
                    if (checked.has(item))
                        continue;
                    yield* item.view_find(check, [...path, this]);
                }
            }
            catch (error) {
                if ($mol_promise_like(error))
                    $mol_fail_hidden(error);
                $mol_fail_log(error);
            }
        }
        force_render(path) {
            const kids = this.sub();
            const index = kids.findIndex(item => {
                if (item instanceof $mol_view) {
                    return path.has(item);
                }
                else {
                    return false;
                }
            });
            if (index >= 0) {
                kids[index].force_render(path);
            }
        }
        ensure_visible(view, align = "start") {
            const path = this.view_find(v => v === view).next().value;
            this.force_render(new Set(path));
            try {
                this.dom_final();
            }
            finally {
                view.dom_node().scrollIntoView({ block: align });
            }
        }
        bring() {
            const win = this.$.$mol_dom_context;
            if (win.parent !== win.self && !win.document.hasFocus())
                return;
            new this.$.$mol_after_timeout(0, () => {
                this.focused(true);
            });
        }
        destructor() {
            const node = $mol_wire_probe(() => this.dom_node());
            if (!node)
                return;
            const events = $mol_wire_probe(() => this.event_async());
            if (!events)
                return;
            for (let event_name in events) {
                node.removeEventListener(event_name, events[event_name]);
            }
        }
    }
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "title", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "focused", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "dom_name", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "minimal_width", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "minimal_height", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "view_rect", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "dom_id", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_node", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_final", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_tree", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_node_actual", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "render", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "view_names_owned", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "view_names", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "event_async", null);
    __decorate([
        $mol_mem_key
    ], $mol_view, "Root", null);
    __decorate([
        $mol_mem
    ], $mol_view, "roots", null);
    __decorate([
        $mol_mem
    ], $mol_view, "auto", null);
    __decorate([
        $mol_memo.method
    ], $mol_view, "view_classes", null);
    $.$mol_view = $mol_view;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_plugin extends $mol_view {
        dom_node_external(next) {
            return next ?? $mol_owning_get(this).host.dom_node();
        }
        render() {
            this.dom_node_actual();
        }
    }
    $.$mol_plugin = $mol_plugin;
})($ || ($ = {}));

;
	($.$mol_scroll) = class $mol_scroll extends ($.$mol_view) {
		tabindex(){
			return -1;
		}
		event_scroll(next){
			if(next !== undefined) return next;
			return null;
		}
		scroll_top(next){
			if(next !== undefined) return next;
			return 0;
		}
		scroll_left(next){
			if(next !== undefined) return next;
			return 0;
		}
		attr(){
			return {...(super.attr()), "tabindex": (this.tabindex())};
		}
		event(){
			return {...(super.event()), "scroll": (next) => (this.event_scroll(next))};
		}
	};
	($mol_mem(($.$mol_scroll.prototype), "event_scroll"));
	($mol_mem(($.$mol_scroll.prototype), "scroll_top"));
	($mol_mem(($.$mol_scroll.prototype), "scroll_left"));


;
"use strict";
var $;
(function ($) {
    class $mol_dom_listener extends $mol_object {
        _node;
        _event;
        _handler;
        _config;
        constructor(_node, _event, _handler, _config = { passive: true }) {
            super();
            this._node = _node;
            this._event = _event;
            this._handler = _handler;
            this._config = _config;
            this._node.addEventListener(this._event, this._handler, this._config);
        }
        destructor() {
            this._node.removeEventListener(this._event, this._handler, this._config);
            super.destructor();
        }
    }
    $.$mol_dom_listener = $mol_dom_listener;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_print extends $mol_object {
        static before() {
            return new $mol_dom_listener(this.$.$mol_dom_context, 'beforeprint', () => {
                this.active(true);
            });
        }
        static after() {
            return new $mol_dom_listener(this.$.$mol_dom_context, 'afterprint', () => {
                this.active(false);
            });
        }
        static active(next) {
            this.before();
            this.after();
            return next || false;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_print, "before", null);
    __decorate([
        $mol_mem
    ], $mol_print, "after", null);
    __decorate([
        $mol_mem
    ], $mol_print, "active", null);
    $.$mol_print = $mol_print;
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    function $mol_style_sheet(Component, config0) {
        let rules = [];
        const block = $mol_dom_qname($mol_ambient({}).$mol_func_name(Component));
        const kebab = (name) => name.replace(/[A-Z]/g, letter => '-' + letter.toLowerCase());
        const make_class = (prefix, path, config) => {
            const props = [];
            const selector = (prefix, path) => {
                if (path.length === 0)
                    return prefix || `[${block}]`;
                let res = `[${block}_${path.join('_')}]`;
                if (prefix)
                    res = prefix + ' :where(' + res + ')';
                return res;
            };
            for (const key of Object.keys(config).reverse()) {
                if (/^(--)?[a-z]/.test(key)) {
                    const addProp = (keys, val) => {
                        if (Array.isArray(val)) {
                            if (val[0] && [Array, Object].includes(val[0].constructor)) {
                                val = val.map(v => {
                                    return Object.entries(v).map(([n, a]) => {
                                        if (a === true)
                                            return kebab(n);
                                        if (a === false)
                                            return null;
                                        return String(a);
                                    }).filter(Boolean).join(' ');
                                }).join(',');
                            }
                            else {
                                val = val.join(' ');
                            }
                            props.push(`\t${keys.join('-')}: ${val};\n`);
                        }
                        else if (val.constructor === Object) {
                            for (let suffix of Object.keys(val).reverse()) {
                                addProp([...keys, kebab(suffix)], val[suffix]);
                            }
                        }
                        else {
                            props.push(`\t${keys.join('-')}: ${val};\n`);
                        }
                    };
                    addProp([kebab(key)], config[key]);
                }
                else if (/^[A-Z]/.test(key)) {
                    make_class(prefix, [...path, key.toLowerCase()], config[key]);
                }
                else if (key[0] === '$') {
                    make_class(selector(prefix, path) + ' :where([' + $mol_dom_qname(key) + '])', [], config[key]);
                }
                else if (key === '>') {
                    const types = config[key];
                    for (let type of Object.keys(types).reverse()) {
                        make_class(selector(prefix, path) + ' > :where([' + $mol_dom_qname(type) + '])', [], types[type]);
                    }
                }
                else if (key === '@') {
                    const attrs = config[key];
                    for (let name of Object.keys(attrs).reverse()) {
                        for (let val in attrs[name]) {
                            make_class(selector(prefix, path) + ':where([' + name + '=' + JSON.stringify(val) + '])', [], attrs[name][val]);
                        }
                    }
                }
                else if (key === '@media') {
                    const media = config[key];
                    for (let query of Object.keys(media).reverse()) {
                        rules.push('}\n');
                        make_class(prefix, path, media[query]);
                        rules.push(`${key} ${query} {\n`);
                    }
                }
                else if (key === '@starting-style') {
                    const styles = config[key];
                    rules.push('}\n');
                    make_class(prefix, path, styles);
                    rules.push(`${key} {\n`);
                }
                else if (key[0] === '[' && key[key.length - 1] === ']') {
                    const attr = key.slice(1, -1);
                    const vals = config[key];
                    for (let val of Object.keys(vals).reverse()) {
                        make_class(selector(prefix, path) + ':where([' + attr + '=' + JSON.stringify(val) + '])', [], vals[val]);
                    }
                }
                else {
                    make_class(selector(prefix, path) + key, [], config[key]);
                }
            }
            if (props.length) {
                rules.push(`${selector(prefix, path)} {\n${props.reverse().join('')}}\n`);
            }
        };
        make_class('', [], config0);
        return rules.reverse().join('');
    }
    $.$mol_style_sheet = $mol_style_sheet;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_style_define(Component, config) {
        return $mol_style_attach(Component.name, $mol_style_sheet(Component, config));
    }
    $.$mol_style_define = $mol_style_define;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_scroll extends $.$mol_scroll {
            scroll_top(next, cache) {
                const el = this.dom_node();
                if (next !== undefined && !cache)
                    el.scrollTop = next;
                return el.scrollTop;
            }
            scroll_left(next, cache) {
                const el = this.dom_node();
                if (next !== undefined && !cache)
                    el.scrollLeft = next;
                return el.scrollLeft;
            }
            event_scroll(next) {
                const el = this.dom_node();
                this.scroll_left(el.scrollLeft, 'cache');
                this.scroll_top(el.scrollTop, 'cache');
            }
            minimal_height() {
                return this.$.$mol_print.active() ? null : 0;
            }
            minimal_width() {
                return this.$.$mol_print.active() ? null : 0;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_scroll.prototype, "scroll_top", null);
        __decorate([
            $mol_mem
        ], $mol_scroll.prototype, "scroll_left", null);
        $$.$mol_scroll = $mol_scroll;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { per, rem, px } = $mol_style_unit;
        $mol_style_define($mol_scroll, {
            display: 'grid',
            overflow: 'auto',
            flex: {
                direction: 'column',
                grow: 1,
                shrink: 1,
            },
            outline: 'none',
            align: {
                self: 'stretch',
                items: 'flex-start',
            },
            boxSizing: 'border-box',
            willChange: 'scroll-position',
            scroll: {
                padding: [rem(.75), 0],
            },
            maxHeight: per(100),
            maxWidth: per(100),
            webkitOverflowScrolling: 'touch',
            contain: 'content',
            '>': {
                $mol_view: {
                    gridArea: '1/1',
                },
            },
            '::before': {
                display: 'none',
            },
            '::after': {
                display: 'none',
            },
            '::-webkit-scrollbar': {
                width: rem(.25),
                height: rem(.25),
            },
            '@media': {
                'print': {
                    overflow: 'hidden',
                    contain: 'none',
                    maxHeight: 'unset',
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_book2) = class $mol_book2 extends ($.$mol_scroll) {
		pages_deep(){
			return [];
		}
		pages(){
			return (this.pages_deep());
		}
		Placeholder(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		placeholders(){
			return [(this.Placeholder())];
		}
		menu_title(){
			return "";
		}
		sub(){
			return [...(this.pages()), ...(this.placeholders())];
		}
		minimal_width(){
			return 0;
		}
		Gap(id){
			const obj = new this.$.$mol_view();
			(obj.title) = () => ("");
			return obj;
		}
	};
	($mol_mem(($.$mol_book2.prototype), "Placeholder"));
	($mol_mem_key(($.$mol_book2.prototype), "Gap"));


;
"use strict";
var $;
(function ($) {
    $.$mol_layer = $mol_style_prop('mol_layer', [
        'hover',
        'focus',
        'speck',
        'float',
        'popup',
    ]);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/layer/layer.css", ":root {\n\t--mol_layer_hover: 1;\n\t--mol_layer_focus: 2;\n\t--mol_layer_speck: 3;\n\t--mol_layer_float: 4;\n\t--mol_layer_popup: 5;\n}\n");
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_book2 extends $.$mol_book2 {
            pages_deep() {
                let result = [];
                for (const subpage of this.pages()) {
                    if (subpage instanceof $mol_book2)
                        result = [...result, ...subpage.pages_deep()];
                    else
                        result.push(subpage);
                }
                return result;
            }
            title() {
                return this.pages_deep().map(page => {
                    try {
                        return page?.title();
                    }
                    catch (error) {
                        $mol_fail_log(error);
                    }
                }).reverse().filter(Boolean).join(' | ');
            }
            menu_title() {
                return this.pages_deep()[0]?.title() || this.title();
            }
            sub() {
                const placeholders = this.placeholders();
                const next = this.pages_deep().filter(Boolean);
                const prev = $mol_mem_cached(() => this.sub())?.filter(page => !placeholders.includes(page)) ?? [];
                for (let i = 1; i; ++i) {
                    const p = prev[prev.length - i];
                    const n = next[next.length - i];
                    if (!n)
                        break;
                    if (p === n)
                        continue;
                    new this.$.$mol_after_tick(() => {
                        const b = this.dom_node();
                        const p = n.dom_node();
                        b.scroll({
                            left: p.offsetLeft + p.offsetWidth - b.offsetWidth,
                            behavior: 'smooth',
                        });
                    });
                    break;
                }
                return [...next, ...placeholders];
            }
            bring() {
                const pages = this.pages_deep();
                if (pages.length)
                    pages[pages.length - 1].bring();
                else
                    super.bring();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_book2.prototype, "pages_deep", null);
        __decorate([
            $mol_mem
        ], $mol_book2.prototype, "sub", null);
        $$.$mol_book2 = $mol_book2;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/book2/book2.view.css", "[mol_book2] {\n\tdisplay: flex;\n\tflex-flow: row nowrap;\n\talign-items: stretch;\n\tflex: 1 1 auto;\n\talign-self: stretch;\n\tmargin: 0;\n\t/* box-shadow: 0 0 0 1px var(--mol_theme_line); */\n\t/* transform: translateZ(0); */\n\ttransition: none;\n\tscroll-snap-type: x mandatory;\n\t/* padding: 0 1px;\n\tscroll-padding: 0 1px;\n\tgap: 1px; */\n}\n\n[mol_book2] > * {\n/* \tflex: none; */\n\tscroll-snap-stop: always;\n\tscroll-snap-align: end;\n\tposition: relative;\n\tmin-height: 100%;\n\tmax-height: 100%;\n\tmax-width: 100%;\n\tflex-shrink: 0;\n\tbox-shadow: inset 0 0 0 1px var(--mol_theme_field);\n}\n\n[mol_book2] > *:not(:first-of-type):before,\n[mol_book2] > *:not(:last-of-type)::after {\n\tcontent: '';\n\tposition: absolute;\n\ttop: 1.5rem;\n\twidth: 3px;\n\theight: 1rem;\n\tbackground: linear-gradient(\n\t\tto bottom,\n\t\tvar(--mol_theme_special) 0%,\n\t\tvar(--mol_theme_special) 14%,\n\t\ttransparent 15%,\n\t\ttransparent 42%,\n\t\tvar(--mol_theme_special) 43%,\n\t\tvar(--mol_theme_special) 57%,\n\t\ttransparent 58%,\n\t\ttransparent 85%,\n\t\tvar(--mol_theme_special) 86%,\n\t\tvar(--mol_theme_special) 100%\n\t);\n\topacity: .5;\n\tz-index: var(--mol_layer_speck);\n}\n[mol_book2] > *:not(:first-of-type):before {\n\tleft: -3px;\n}\n[mol_book2] > *:not(:last-of-type)::after {\n\tright: -3px;\n}\n\n:where([mol_book2]) > * {\n\tbackground-color: var(--mol_theme_card);\n\t/* box-shadow: 0 0 0 1px var(--mol_theme_back); */\n}\n\n[mol_book2] > [mol_book2] {\n\tdisplay: contents;\n}\n\n[mol_book2] > *:first-child {\n\tscroll-snap-align: start;\n}\n\n[mol_book2] > [mol_view] {\n\ttransform: none; /* prevent content clipping */\n}\n\n[mol_book2_placeholder] {\n\tflex: 1 1 0;\n\tbackground: none;\n}\n\n[mol_book2_gap] {\n\tbackground: none;\n\tflex-grow: 1;\n\tscroll-snap-align: none;\n\tmargin-right: -1px;\n\tbox-shadow: none;\n}\n\n[mol_book2_gap]::before,\n[mol_book2_gap]::after {\n\tdisplay: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_ghost) = class $mol_ghost extends ($.$mol_view) {
		Sub(){
			const obj = new this.$.$mol_view();
			return obj;
		}
	};
	($mol_mem(($.$mol_ghost.prototype), "Sub"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_ghost extends $.$mol_ghost {
            dom_node_external(next) {
                return this.Sub().dom_node(next);
            }
            dom_node_actual() {
                this.dom_node();
                const node = this.Sub().dom_node_actual();
                const attr = this.attr();
                const style = this.style();
                const fields = this.field();
                $mol_dom_render_attributes(node, attr);
                $mol_dom_render_styles(node, style);
                $mol_dom_render_fields(node, fields);
                return node;
            }
            dom_tree() {
                const Sub = this.Sub();
                const node = Sub.dom_tree();
                try {
                    this.dom_node_actual();
                    this.auto();
                }
                catch (error) {
                    $mol_fail_log(error);
                }
                return node;
            }
            title() {
                return this.Sub().title();
            }
            minimal_width() {
                return this.Sub().minimal_width();
            }
            minimal_height() {
                return this.Sub().minimal_height();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_ghost.prototype, "dom_node_actual", null);
        $$.$mol_ghost = $mol_ghost;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_follower) = class $mol_follower extends ($.$mol_ghost) {
		transform(){
			return "";
		}
		Anchor(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		align(){
			return [-.5, -.5];
		}
		offset(){
			return [0, 0];
		}
		style(){
			return {...(super.style()), "transform": (this.transform())};
		}
	};
	($mol_mem(($.$mol_follower.prototype), "Anchor"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_follower extends $.$mol_follower {
            pos() {
                const self_rect = this.view_rect();
                const prev = $mol_wire_probe(() => this.pos());
                const anchor_rect = this.Anchor()?.view_rect();
                if (!anchor_rect)
                    return null;
                const offset = this.offset();
                const align = this.align();
                const left = Math.floor((prev?.left ?? 0)
                    - (self_rect?.left ?? 0)
                    + (self_rect?.width ?? 0) * align[0]
                    + (anchor_rect?.left ?? 0)
                    + offset[0] * (anchor_rect?.width ?? 0));
                const top = Math.floor((prev?.top ?? 0)
                    - (self_rect?.top ?? 0)
                    + (self_rect?.height ?? 0) * align[1]
                    + (anchor_rect?.top ?? 0)
                    + offset[1] * (anchor_rect?.height ?? 0));
                return { left, top };
            }
            transform() {
                const pos = this.pos();
                if (!pos)
                    return 'scale(0)';
                const { left, top } = pos;
                return `translate( ${left}px, ${top}px )`;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_follower.prototype, "pos", null);
        __decorate([
            $mol_mem
        ], $mol_follower.prototype, "transform", null);
        $$.$mol_follower = $mol_follower;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/follower/follower.view.css", "[mol_follower] {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\ttransition: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_pop) = class $mol_pop extends ($.$mol_view) {
		bubble(){
			return null;
		}
		Anchor(){
			return null;
		}
		bubble_offset(){
			return [0, 1];
		}
		bubble_align(){
			return [0, 0];
		}
		bubble_content(){
			return [];
		}
		height_max(){
			return 9999;
		}
		Bubble(){
			const obj = new this.$.$mol_pop_bubble();
			(obj.content) = () => ((this.bubble_content()));
			(obj.height_max) = () => ((this.height_max()));
			return obj;
		}
		Follower(){
			const obj = new this.$.$mol_follower();
			(obj.offset) = () => ((this.bubble_offset()));
			(obj.align) = () => ((this.bubble_align()));
			(obj.Anchor) = () => ((this.Anchor()));
			(obj.Sub) = () => ((this.Bubble()));
			return obj;
		}
		showed(next){
			if(next !== undefined) return next;
			return false;
		}
		align_vert(){
			return "";
		}
		align_hor(){
			return "";
		}
		align(){
			return "bottom_center";
		}
		prefer(){
			return "vert";
		}
		auto(){
			return [(this.bubble())];
		}
		sub(){
			return [(this.Anchor())];
		}
		sub_visible(){
			return [(this.Anchor()), (this.Follower())];
		}
	};
	($mol_mem(($.$mol_pop.prototype), "Bubble"));
	($mol_mem(($.$mol_pop.prototype), "Follower"));
	($mol_mem(($.$mol_pop.prototype), "showed"));
	($.$mol_pop_bubble) = class $mol_pop_bubble extends ($.$mol_view) {
		content(){
			return [];
		}
		height_max(){
			return 9999;
		}
		sub(){
			return (this.content());
		}
		style(){
			return {...(super.style()), "maxHeight": (this.height_max())};
		}
		attr(){
			return {
				...(super.attr()), 
				"tabindex": 0, 
				"popover": "manual"
			};
		}
	};


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_pop extends $.$mol_pop {
            showed(next = false) {
                this.focused();
                return next;
            }
            sub_visible() {
                return [
                    this.Anchor(),
                    ...this.showed() ? [this.Follower()] : [],
                ];
            }
            height_max() {
                const viewport = this.$.$mol_window.size();
                const rect_bubble = this.view_rect();
                const align = this.align_vert();
                if (align === 'bottom')
                    return (viewport.height - rect_bubble.bottom);
                if (align === 'top')
                    return rect_bubble.top;
                return 0;
            }
            align() {
                switch (this.prefer()) {
                    case 'hor': return `${this.align_hor()}_${this.align_vert()}`;
                    case 'vert': return `${this.align_vert()}_${this.align_hor()}`;
                    default: return this.prefer();
                }
            }
            align_vert() {
                const rect_pop = this.view_rect();
                if (!rect_pop)
                    return 'suspense';
                const viewport = this.$.$mol_window.size();
                return rect_pop.top > viewport.height / 2 ? 'top' : 'bottom';
            }
            align_hor() {
                const rect_pop = this.view_rect();
                if (!rect_pop)
                    return 'suspense';
                const viewport = this.$.$mol_window.size();
                return rect_pop.left > viewport.width / 2 ? 'left' : 'right';
            }
            bubble_offset() {
                const tags = new Set(this.align().split('_'));
                if (tags.has('suspense'))
                    return [0, 0];
                const hor = tags.has('right') ? 'right' : tags.has('left') ? 'left' : 'center';
                const vert = tags.has('bottom') ? 'bottom' : tags.has('top') ? 'top' : 'center';
                if ([...tags][0] === hor) {
                    return [
                        { left: 0, center: .5, right: 1 }[hor],
                        { top: 1, center: .5, bottom: 0 }[vert],
                    ];
                }
                else {
                    return [
                        { left: 1, center: .5, right: 0 }[hor],
                        { top: 0, center: .5, bottom: 1 }[vert],
                    ];
                }
            }
            bubble_align() {
                const tags = new Set(this.align().split('_'));
                if (tags.has('suspense'))
                    return [-.5, -.5];
                const hor = tags.has('right') ? 'right' : tags.has('left') ? 'left' : 'center';
                const vert = tags.has('bottom') ? 'bottom' : tags.has('top') ? 'top' : 'center';
                return [
                    { left: -1, center: -.5, right: 0, suspense: -.5 }[hor],
                    { top: -1, center: -.5, bottom: 0, suspense: -.5 }[vert],
                ];
            }
            bubble() {
                if (!this.showed())
                    return;
                this.Bubble().dom_node().showPopover?.();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "showed", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "sub_visible", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "height_max", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "align", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "align_vert", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "align_hor", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "bubble_offset", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "bubble_align", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "bubble", null);
        $$.$mol_pop = $mol_pop;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/pop/pop.view.css", "@keyframes mol_pop_show {\n\tfrom {\n\t\topacity: 0;\n\t}\n}\n\n[mol_pop] {\n\tposition: relative;\n\tdisplay: inline-flex;\n}\n\n[mol_pop_bubble] {\n\tborder: none;\n\tpadding: 0;\n\tcolor: var(--mol_theme_text);\n\tbox-shadow: 0 0 1rem hsla(0,0%,0%,.5);\n\tborder-radius: var(--mol_gap_round);\n\tposition: fixed;\n\tz-index: var(--mol_layer_popup);\n\tbackground: var(--mol_theme_back);\n\tmax-width: none;\n\tmax-height: none;\n\t/* overflow: hidden;\n\toverflow-y: scroll;\n\toverflow-y: overlay; */\n\tword-break: normal;\n\twidth: max-content;\n\t/* height: max-content; */\n\tflex-direction: column;\n\tmax-width: calc( 100vw - var(--mol_gap_page) );\n\tmax-height: 80vw;\n\tcontain: paint;\n\ttransition-property: opacity;\n\t/* Safari ios layer fix, https://t.me/mam_mol/170017 */\n\ttransform: translateZ(0);\n\tanimation: mol_pop_show .1s ease-in;\n}\n\n:where( [mol_pop_bubble] > * ) {\n\tbackground: var(--mol_theme_card);\n}\n\n[mol_pop_bubble][mol_scroll] {\n\tbackground: var(--mol_theme_back);\n}\n\n[mol_pop_bubble]:focus {\n\toutline: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_hotkey) = class $mol_hotkey extends ($.$mol_plugin) {
		keydown(next){
			if(next !== undefined) return next;
			return null;
		}
		event(){
			return {...(super.event()), "keydown": (next) => (this.keydown(next))};
		}
		key(){
			return {};
		}
		mod_ctrl(){
			return false;
		}
		mod_alt(){
			return false;
		}
		mod_shift(){
			return false;
		}
	};
	($mol_mem(($.$mol_hotkey.prototype), "keydown"));


;
"use strict";
var $;
(function ($) {
    let $mol_keyboard_code;
    (function ($mol_keyboard_code) {
        $mol_keyboard_code[$mol_keyboard_code["backspace"] = 8] = "backspace";
        $mol_keyboard_code[$mol_keyboard_code["tab"] = 9] = "tab";
        $mol_keyboard_code[$mol_keyboard_code["enter"] = 13] = "enter";
        $mol_keyboard_code[$mol_keyboard_code["shift"] = 16] = "shift";
        $mol_keyboard_code[$mol_keyboard_code["ctrl"] = 17] = "ctrl";
        $mol_keyboard_code[$mol_keyboard_code["alt"] = 18] = "alt";
        $mol_keyboard_code[$mol_keyboard_code["pause"] = 19] = "pause";
        $mol_keyboard_code[$mol_keyboard_code["capsLock"] = 20] = "capsLock";
        $mol_keyboard_code[$mol_keyboard_code["escape"] = 27] = "escape";
        $mol_keyboard_code[$mol_keyboard_code["space"] = 32] = "space";
        $mol_keyboard_code[$mol_keyboard_code["pageUp"] = 33] = "pageUp";
        $mol_keyboard_code[$mol_keyboard_code["pageDown"] = 34] = "pageDown";
        $mol_keyboard_code[$mol_keyboard_code["end"] = 35] = "end";
        $mol_keyboard_code[$mol_keyboard_code["home"] = 36] = "home";
        $mol_keyboard_code[$mol_keyboard_code["left"] = 37] = "left";
        $mol_keyboard_code[$mol_keyboard_code["up"] = 38] = "up";
        $mol_keyboard_code[$mol_keyboard_code["right"] = 39] = "right";
        $mol_keyboard_code[$mol_keyboard_code["down"] = 40] = "down";
        $mol_keyboard_code[$mol_keyboard_code["insert"] = 45] = "insert";
        $mol_keyboard_code[$mol_keyboard_code["delete"] = 46] = "delete";
        $mol_keyboard_code[$mol_keyboard_code["key0"] = 48] = "key0";
        $mol_keyboard_code[$mol_keyboard_code["key1"] = 49] = "key1";
        $mol_keyboard_code[$mol_keyboard_code["key2"] = 50] = "key2";
        $mol_keyboard_code[$mol_keyboard_code["key3"] = 51] = "key3";
        $mol_keyboard_code[$mol_keyboard_code["key4"] = 52] = "key4";
        $mol_keyboard_code[$mol_keyboard_code["key5"] = 53] = "key5";
        $mol_keyboard_code[$mol_keyboard_code["key6"] = 54] = "key6";
        $mol_keyboard_code[$mol_keyboard_code["key7"] = 55] = "key7";
        $mol_keyboard_code[$mol_keyboard_code["key8"] = 56] = "key8";
        $mol_keyboard_code[$mol_keyboard_code["key9"] = 57] = "key9";
        $mol_keyboard_code[$mol_keyboard_code["A"] = 65] = "A";
        $mol_keyboard_code[$mol_keyboard_code["B"] = 66] = "B";
        $mol_keyboard_code[$mol_keyboard_code["C"] = 67] = "C";
        $mol_keyboard_code[$mol_keyboard_code["D"] = 68] = "D";
        $mol_keyboard_code[$mol_keyboard_code["E"] = 69] = "E";
        $mol_keyboard_code[$mol_keyboard_code["F"] = 70] = "F";
        $mol_keyboard_code[$mol_keyboard_code["G"] = 71] = "G";
        $mol_keyboard_code[$mol_keyboard_code["H"] = 72] = "H";
        $mol_keyboard_code[$mol_keyboard_code["I"] = 73] = "I";
        $mol_keyboard_code[$mol_keyboard_code["J"] = 74] = "J";
        $mol_keyboard_code[$mol_keyboard_code["K"] = 75] = "K";
        $mol_keyboard_code[$mol_keyboard_code["L"] = 76] = "L";
        $mol_keyboard_code[$mol_keyboard_code["M"] = 77] = "M";
        $mol_keyboard_code[$mol_keyboard_code["N"] = 78] = "N";
        $mol_keyboard_code[$mol_keyboard_code["O"] = 79] = "O";
        $mol_keyboard_code[$mol_keyboard_code["P"] = 80] = "P";
        $mol_keyboard_code[$mol_keyboard_code["Q"] = 81] = "Q";
        $mol_keyboard_code[$mol_keyboard_code["R"] = 82] = "R";
        $mol_keyboard_code[$mol_keyboard_code["S"] = 83] = "S";
        $mol_keyboard_code[$mol_keyboard_code["T"] = 84] = "T";
        $mol_keyboard_code[$mol_keyboard_code["U"] = 85] = "U";
        $mol_keyboard_code[$mol_keyboard_code["V"] = 86] = "V";
        $mol_keyboard_code[$mol_keyboard_code["W"] = 87] = "W";
        $mol_keyboard_code[$mol_keyboard_code["X"] = 88] = "X";
        $mol_keyboard_code[$mol_keyboard_code["Y"] = 89] = "Y";
        $mol_keyboard_code[$mol_keyboard_code["Z"] = 90] = "Z";
        $mol_keyboard_code[$mol_keyboard_code["metaLeft"] = 91] = "metaLeft";
        $mol_keyboard_code[$mol_keyboard_code["metaRight"] = 92] = "metaRight";
        $mol_keyboard_code[$mol_keyboard_code["select"] = 93] = "select";
        $mol_keyboard_code[$mol_keyboard_code["numpad0"] = 96] = "numpad0";
        $mol_keyboard_code[$mol_keyboard_code["numpad1"] = 97] = "numpad1";
        $mol_keyboard_code[$mol_keyboard_code["numpad2"] = 98] = "numpad2";
        $mol_keyboard_code[$mol_keyboard_code["numpad3"] = 99] = "numpad3";
        $mol_keyboard_code[$mol_keyboard_code["numpad4"] = 100] = "numpad4";
        $mol_keyboard_code[$mol_keyboard_code["numpad5"] = 101] = "numpad5";
        $mol_keyboard_code[$mol_keyboard_code["numpad6"] = 102] = "numpad6";
        $mol_keyboard_code[$mol_keyboard_code["numpad7"] = 103] = "numpad7";
        $mol_keyboard_code[$mol_keyboard_code["numpad8"] = 104] = "numpad8";
        $mol_keyboard_code[$mol_keyboard_code["numpad9"] = 105] = "numpad9";
        $mol_keyboard_code[$mol_keyboard_code["multiply"] = 106] = "multiply";
        $mol_keyboard_code[$mol_keyboard_code["add"] = 107] = "add";
        $mol_keyboard_code[$mol_keyboard_code["subtract"] = 109] = "subtract";
        $mol_keyboard_code[$mol_keyboard_code["decimal"] = 110] = "decimal";
        $mol_keyboard_code[$mol_keyboard_code["divide"] = 111] = "divide";
        $mol_keyboard_code[$mol_keyboard_code["F1"] = 112] = "F1";
        $mol_keyboard_code[$mol_keyboard_code["F2"] = 113] = "F2";
        $mol_keyboard_code[$mol_keyboard_code["F3"] = 114] = "F3";
        $mol_keyboard_code[$mol_keyboard_code["F4"] = 115] = "F4";
        $mol_keyboard_code[$mol_keyboard_code["F5"] = 116] = "F5";
        $mol_keyboard_code[$mol_keyboard_code["F6"] = 117] = "F6";
        $mol_keyboard_code[$mol_keyboard_code["F7"] = 118] = "F7";
        $mol_keyboard_code[$mol_keyboard_code["F8"] = 119] = "F8";
        $mol_keyboard_code[$mol_keyboard_code["F9"] = 120] = "F9";
        $mol_keyboard_code[$mol_keyboard_code["F10"] = 121] = "F10";
        $mol_keyboard_code[$mol_keyboard_code["F11"] = 122] = "F11";
        $mol_keyboard_code[$mol_keyboard_code["F12"] = 123] = "F12";
        $mol_keyboard_code[$mol_keyboard_code["numLock"] = 144] = "numLock";
        $mol_keyboard_code[$mol_keyboard_code["scrollLock"] = 145] = "scrollLock";
        $mol_keyboard_code[$mol_keyboard_code["semicolon"] = 186] = "semicolon";
        $mol_keyboard_code[$mol_keyboard_code["equals"] = 187] = "equals";
        $mol_keyboard_code[$mol_keyboard_code["comma"] = 188] = "comma";
        $mol_keyboard_code[$mol_keyboard_code["dash"] = 189] = "dash";
        $mol_keyboard_code[$mol_keyboard_code["period"] = 190] = "period";
        $mol_keyboard_code[$mol_keyboard_code["forwardSlash"] = 191] = "forwardSlash";
        $mol_keyboard_code[$mol_keyboard_code["graveAccent"] = 192] = "graveAccent";
        $mol_keyboard_code[$mol_keyboard_code["bracketOpen"] = 219] = "bracketOpen";
        $mol_keyboard_code[$mol_keyboard_code["slashBack"] = 220] = "slashBack";
        $mol_keyboard_code[$mol_keyboard_code["slashBackLeft"] = 226] = "slashBackLeft";
        $mol_keyboard_code[$mol_keyboard_code["bracketClose"] = 221] = "bracketClose";
        $mol_keyboard_code[$mol_keyboard_code["quoteSingle"] = 222] = "quoteSingle";
    })($mol_keyboard_code = $.$mol_keyboard_code || ($.$mol_keyboard_code = {}));
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_hotkey extends $.$mol_hotkey {
            key() {
                return super.key();
            }
            keydown(event) {
                if (!event)
                    return;
                if (event.defaultPrevented)
                    return;
                let name = $mol_keyboard_code[event.keyCode];
                if (this.mod_ctrl() !== (event.ctrlKey || event.metaKey))
                    return;
                if (this.mod_alt() !== event.altKey)
                    return;
                if (this.mod_shift() !== event.shiftKey)
                    return;
                const handle = this.key()[name];
                if (handle)
                    handle(event);
            }
        }
        $$.$mol_hotkey = $mol_hotkey;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_nav) = class $mol_nav extends ($.$mol_plugin) {
		event_key(next){
			if(next !== undefined) return next;
			return null;
		}
		cycle(next){
			if(next !== undefined) return next;
			return false;
		}
		mod_ctrl(){
			return false;
		}
		mod_shift(){
			return false;
		}
		mod_alt(){
			return false;
		}
		keys_x(next){
			if(next !== undefined) return next;
			return [];
		}
		keys_y(next){
			if(next !== undefined) return next;
			return [];
		}
		current_x(next){
			if(next !== undefined) return next;
			return null;
		}
		current_y(next){
			if(next !== undefined) return next;
			return null;
		}
		event_up(next){
			if(next !== undefined) return next;
			return null;
		}
		event_down(next){
			if(next !== undefined) return next;
			return null;
		}
		event_left(next){
			if(next !== undefined) return next;
			return null;
		}
		event_right(next){
			if(next !== undefined) return next;
			return null;
		}
		event(){
			return {...(super.event()), "keydown": (next) => (this.event_key(next))};
		}
	};
	($mol_mem(($.$mol_nav.prototype), "event_key"));
	($mol_mem(($.$mol_nav.prototype), "cycle"));
	($mol_mem(($.$mol_nav.prototype), "keys_x"));
	($mol_mem(($.$mol_nav.prototype), "keys_y"));
	($mol_mem(($.$mol_nav.prototype), "current_x"));
	($mol_mem(($.$mol_nav.prototype), "current_y"));
	($mol_mem(($.$mol_nav.prototype), "event_up"));
	($mol_mem(($.$mol_nav.prototype), "event_down"));
	($mol_mem(($.$mol_nav.prototype), "event_left"));
	($mol_mem(($.$mol_nav.prototype), "event_right"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_nav extends $.$mol_nav {
            event_key(event) {
                if (!event)
                    return event;
                if (event.defaultPrevented)
                    return;
                if (this.mod_ctrl() && !event.ctrlKey)
                    return;
                if (this.mod_shift() && !event.shiftKey)
                    return;
                if (this.mod_alt() && !event.altKey)
                    return;
                switch (event.keyCode) {
                    case $mol_keyboard_code.up: return this.event_up(event);
                    case $mol_keyboard_code.down: return this.event_down(event);
                    case $mol_keyboard_code.left: return this.event_left(event);
                    case $mol_keyboard_code.right: return this.event_right(event);
                    case $mol_keyboard_code.pageUp: return this.event_up(event);
                    case $mol_keyboard_code.pageDown: return this.event_down(event);
                }
            }
            event_up(event) {
                if (!event)
                    return event;
                const keys = this.keys_y();
                if (keys.length < 1)
                    return;
                const index_y = this.index_y();
                const index_old = index_y === null ? 0 : index_y;
                const index_new = (index_old + keys.length - 1) % keys.length;
                event.preventDefault();
                if (index_old === 0 && !this.cycle())
                    return;
                this.current_y(this.keys_y()[index_new]);
            }
            event_down(event) {
                if (!event)
                    return event;
                const keys = this.keys_y();
                if (keys.length < 1)
                    return;
                const index_y = this.index_y();
                const index_old = index_y === null ? keys.length - 1 : index_y;
                const index_new = (index_old + 1) % keys.length;
                event.preventDefault();
                if (index_new === 0 && !this.cycle())
                    return;
                this.current_y(this.keys_y()[index_new]);
            }
            event_left(event) {
                if (!event)
                    return event;
                const keys = this.keys_x();
                if (keys.length < 1)
                    return;
                const index_x = this.index_x();
                const index_old = index_x === null ? 0 : index_x;
                const index_new = (index_old + keys.length - 1) % keys.length;
                event.preventDefault();
                if (index_old === 0 && !this.cycle())
                    return;
                this.current_x(this.keys_x()[index_new]);
            }
            event_right(event) {
                if (!event)
                    return event;
                const keys = this.keys_x();
                if (keys.length < 1)
                    return;
                const index_x = this.index_x();
                const index_old = index_x === null ? keys.length - 1 : index_x;
                const index_new = (index_old + 1) % keys.length;
                event.preventDefault();
                if (index_new === 0 && !this.cycle())
                    return;
                this.current_x(this.keys_x()[index_new]);
            }
            index_y() {
                let index = this.keys_y().indexOf(this.current_y());
                if (index < 0)
                    return null;
                return index;
            }
            index_x() {
                let index = this.keys_x().indexOf(this.current_x());
                if (index < 0)
                    return null;
                return index;
            }
        }
        $$.$mol_nav = $mol_nav;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_locale extends $mol_object {
        static lang_default() {
            return 'en';
        }
        static lang(next) {
            return this.$.$mol_state_local.value('locale', next) || $mol_dom_context.navigator.language.replace(/-.*/, '') || this.lang_default();
        }
        static source(lang) {
            return JSON.parse(this.$.$mol_file.relative(`web.locale=${lang}.json`).text().toString());
        }
        static texts(lang, next) {
            if (next)
                return next;
            try {
                return this.source(lang).valueOf();
            }
            catch (error) {
                if ($mol_fail_catch(error)) {
                    const def = this.lang_default();
                    if (lang === def)
                        throw error;
                }
            }
            return {};
        }
        static text(key) {
            const lang = this.lang();
            const target = this.texts(lang)[key];
            if (target)
                return target;
            this.warn(key);
            const en = this.texts('en')[key];
            if (!en)
                return key;
            return en;
        }
        static warn(key) {
            console.warn(`Not translated to "${this.lang()}": ${key}`);
            return null;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_locale, "lang_default", null);
    __decorate([
        $mol_mem
    ], $mol_locale, "lang", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "source", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "texts", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "text", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "warn", null);
    $.$mol_locale = $mol_locale;
})($ || ($ = {}));

;
	($.$mol_string) = class $mol_string extends ($.$mol_view) {
		selection_watcher(){
			return null;
		}
		error_report(){
			return null;
		}
		disabled(){
			return false;
		}
		value(next){
			if(next !== undefined) return next;
			return "";
		}
		value_changed(next){
			return (this.value(next));
		}
		hint(){
			return "";
		}
		hint_visible(){
			return (this.hint());
		}
		spellcheck(){
			return true;
		}
		autocomplete_native(){
			return "";
		}
		selection_end(){
			return 0;
		}
		selection_start(){
			return 0;
		}
		keyboard(){
			return "text";
		}
		enter(){
			return "go";
		}
		length_max(){
			return +Infinity;
		}
		type(next){
			if(next !== undefined) return next;
			return "text";
		}
		event_change(next){
			if(next !== undefined) return next;
			return null;
		}
		submit_with_ctrl(){
			return false;
		}
		submit(next){
			if(next !== undefined) return next;
			return null;
		}
		Submit(){
			const obj = new this.$.$mol_hotkey();
			(obj.mod_ctrl) = () => ((this.submit_with_ctrl()));
			(obj.key) = () => ({"enter": (next) => (this.submit(next))});
			return obj;
		}
		dom_name(){
			return "input";
		}
		enabled(){
			return true;
		}
		minimal_height(){
			return 40;
		}
		autocomplete(){
			return false;
		}
		selection(next){
			if(next !== undefined) return next;
			return [0, 0];
		}
		auto(){
			return [(this.selection_watcher()), (this.error_report())];
		}
		field(){
			return {
				...(super.field()), 
				"disabled": (this.disabled()), 
				"value": (this.value_changed()), 
				"placeholder": (this.hint_visible()), 
				"spellcheck": (this.spellcheck()), 
				"autocomplete": (this.autocomplete_native()), 
				"selectionEnd": (this.selection_end()), 
				"selectionStart": (this.selection_start()), 
				"inputMode": (this.keyboard()), 
				"enterkeyhint": (this.enter())
			};
		}
		attr(){
			return {
				...(super.attr()), 
				"maxlength": (this.length_max()), 
				"type": (this.type())
			};
		}
		event(){
			return {...(super.event()), "input": (next) => (this.event_change(next))};
		}
		plugins(){
			return [(this.Submit())];
		}
	};
	($mol_mem(($.$mol_string.prototype), "value"));
	($mol_mem(($.$mol_string.prototype), "type"));
	($mol_mem(($.$mol_string.prototype), "event_change"));
	($mol_mem(($.$mol_string.prototype), "submit"));
	($mol_mem(($.$mol_string.prototype), "Submit"));
	($mol_mem(($.$mol_string.prototype), "selection"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_string extends $.$mol_string {
            event_change(next) {
                if (!next)
                    return;
                const el = this.dom_node();
                const from = el.selectionStart;
                const to = el.selectionEnd;
                try {
                    el.value = this.value_changed(el.value);
                }
                catch (error) {
                    const el = this.dom_node();
                    if (error instanceof Error) {
                        el.setCustomValidity(error.message);
                        el.reportValidity();
                    }
                    $mol_fail_hidden(error);
                }
                if (to === null)
                    return;
                el.selectionEnd = to;
                el.selectionStart = from;
                this.selection_change(next);
            }
            error_report() {
                try {
                    if (this.focused())
                        this.value();
                }
                catch (error) {
                    const el = this.dom_node();
                    if (error instanceof Error) {
                        el.setCustomValidity(error.message);
                        el.reportValidity();
                    }
                }
            }
            hint_visible() {
                return (this.enabled() ? this.hint() : '') || ' ';
            }
            disabled() {
                return !this.enabled();
            }
            autocomplete_native() {
                return this.autocomplete() ? 'on' : 'off';
            }
            selection_watcher() {
                return new $mol_dom_listener(this.$.$mol_dom_context.document, 'selectionchange', $mol_wire_async(event => this.selection_change(event)));
            }
            selection_change(event) {
                const el = this.dom_node();
                if (el !== this.$.$mol_dom_context.document.activeElement)
                    return;
                const [from, to] = this.selection([
                    el.selectionStart,
                    el.selectionEnd,
                ]);
                el.selectionEnd = to;
                el.selectionStart = from;
                if (to !== from && el.selectionEnd === el.selectionStart) {
                    el.selectionEnd = to;
                }
            }
            selection_start() {
                const el = this.dom_node();
                if (!this.focused())
                    return undefined;
                if (el.selectionStart == null)
                    return undefined;
                return this.selection()[0];
            }
            selection_end() {
                const el = this.dom_node();
                if (!this.focused())
                    return undefined;
                if (el.selectionEnd == null)
                    return undefined;
                return this.selection()[1];
            }
        }
        __decorate([
            $mol_action
        ], $mol_string.prototype, "event_change", null);
        __decorate([
            $mol_mem
        ], $mol_string.prototype, "error_report", null);
        __decorate([
            $mol_mem
        ], $mol_string.prototype, "selection_watcher", null);
        $$.$mol_string = $mol_string;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/string/string.view.css", "[mol_string] {\n\tbox-sizing: border-box;\n\toutline-offset: 0;\n\tborder: none;\n\tborder-radius: var(--mol_gap_round);\n\twhite-space: pre-line;\n\toverflow: hidden;\n\ttext-overflow: ellipsis;\n\tpadding: var(--mol_gap_text);\n\ttext-align: left;\n\tposition: relative;\n\tfont: inherit;\n\tflex: 1 1 auto;\n\tbackground: transparent;\n\tmin-width: 0;\n\tcolor: inherit;\n\tbackground: var(--mol_theme_field);\n}\n\n[mol_string]:disabled:not(:placeholder-shown) {\n\tbackground-color: transparent;\n\tcolor: var(--mol_theme_text);\n}\n\n[mol_string]:where(:not(:disabled)) {\n\tbox-shadow: inset 0 0 0 1px var(--mol_theme_line);\n}\n\n[mol_string]:where(:not(:disabled)):hover {\n\tbox-shadow: inset 0 0 0 2px var(--mol_theme_line);\n\tz-index: var(--mol_layer_hover);\n}\n\n[mol_string]:focus {\n\toutline: none;\n\tz-index: var(--mol_layer_focus);\n\tcolor: var(--mol_theme_text);\n\tbox-shadow: inset 0 0 0 1px var(--mol_theme_focus);\n}\n\n[mol_string]::placeholder {\n\tcolor: var(--mol_theme_shade);\n}\n\n[mol_string]::-ms-clear {\n\tdisplay: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_svg) = class $mol_svg extends ($.$mol_view) {
		dom_name(){
			return "svg";
		}
		dom_name_space(){
			return "http://www.w3.org/2000/svg";
		}
		font_size(){
			return 16;
		}
		font_family(){
			return "";
		}
		style_size(){
			return {};
		}
	};


;
"use strict";
var $;
(function ($) {
    class $mol_state_time extends $mol_object {
        static task(precision, reset) {
            if (precision) {
                return new $mol_after_timeout(precision, () => this.task(precision, null));
            }
            else {
                return new $mol_after_frame(() => this.task(precision, null));
            }
        }
        static now(precision) {
            this.task(precision);
            return Date.now();
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_state_time, "task", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_time, "now", null);
    $.$mol_state_time = $mol_state_time;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_svg extends $.$mol_svg {
            computed_style() {
                const win = this.$.$mol_dom_context;
                const style = win.getComputedStyle(this.dom_node());
                if (!style['font-size'])
                    $mol_state_time.now(0);
                return style;
            }
            font_size() {
                return parseInt(this.computed_style()['font-size']) || 16;
            }
            font_family() {
                return this.computed_style()['font-family'];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_svg.prototype, "computed_style", null);
        __decorate([
            $mol_mem
        ], $mol_svg.prototype, "font_size", null);
        __decorate([
            $mol_mem
        ], $mol_svg.prototype, "font_family", null);
        $$.$mol_svg = $mol_svg;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_svg_root) = class $mol_svg_root extends ($.$mol_svg) {
		view_box(){
			return "0 0 100 100";
		}
		aspect(){
			return "xMidYMid";
		}
		dom_name(){
			return "svg";
		}
		attr(){
			return {
				...(super.attr()), 
				"viewBox": (this.view_box()), 
				"preserveAspectRatio": (this.aspect())
			};
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/svg/root/root.view.css", "[mol_svg_root] {\n\toverflow: hidden;\n}\n");
})($ || ($ = {}));

;
"use strict";

;
	($.$mol_svg_path) = class $mol_svg_path extends ($.$mol_svg) {
		geometry(){
			return "";
		}
		dom_name(){
			return "path";
		}
		attr(){
			return {...(super.attr()), "d": (this.geometry())};
		}
	};


;
"use strict";

;
	($.$mol_icon) = class $mol_icon extends ($.$mol_svg_root) {
		path(){
			return "";
		}
		Path(){
			const obj = new this.$.$mol_svg_path();
			(obj.geometry) = () => ((this.path()));
			return obj;
		}
		view_box(){
			return "0 0 24 24";
		}
		minimal_width(){
			return 16;
		}
		minimal_height(){
			return 16;
		}
		sub(){
			return [(this.Path())];
		}
	};
	($mol_mem(($.$mol_icon.prototype), "Path"));


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/icon/icon.view.css", "[mol_icon] {\n\tfill: currentColor;\n\tstroke: none;\n\twidth: 1em;\n\theight: 1.5em;\n\tflex: 0 0 auto;\n\tvertical-align: top;\n\tdisplay: inline-block;\n\tfilter: drop-shadow(0px 1px 1px var(--mol_theme_back));\n\ttransform-origin: center;\n}\n\n[mol_icon_path] {\n\ttransform-origin: center;\n}\n");
})($ || ($ = {}));

;
"use strict";

;
	($.$mol_icon_close) = class $mol_icon_close extends ($.$mol_icon) {
		path(){
			return "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";
		}
	};


;
"use strict";

;
	($.$mol_speck) = class $mol_speck extends ($.$mol_view) {
		value(){
			return null;
		}
		theme(){
			return "$mol_theme_accent";
		}
		sub(){
			return [(this.value())];
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/speck/speck.view.css", "[mol_speck] {\n\tfont-size: .75rem;\n\tborder-radius: 1rem;\n\tmargin: -0.5rem -0.2rem;\n\talign-self: flex-start;\n\tmin-height: 1em;\n\tmin-width: .75rem;\n\tvertical-align: sub;\n\tpadding: 0 .2rem;\n\tposition: absolute;\n\tz-index: var(--mol_layer_speck);\n\ttext-align: center;\n\tline-height: .9;\n\tdisplay: inline-block;\n\twhite-space: nowrap;\n\ttext-overflow: ellipsis;\n\tuser-select: none;\n\tbox-shadow: 0 0 3px rgba(0,0,0,.5);\n}\n");
})($ || ($ = {}));

;
"use strict";

;
	($.$mol_button) = class $mol_button extends ($.$mol_view) {
		event_activate(next){
			if(next !== undefined) return next;
			return null;
		}
		activate(next){
			return (this.event_activate(next));
		}
		clicks(next){
			if(next !== undefined) return next;
			return null;
		}
		event_key_press(next){
			if(next !== undefined) return next;
			return null;
		}
		key_press(next){
			return (this.event_key_press(next));
		}
		disabled(){
			return false;
		}
		tab_index(){
			return 0;
		}
		hint(){
			return "";
		}
		hint_safe(){
			return (this.hint());
		}
		error(){
			return "";
		}
		enabled(){
			return true;
		}
		click(next){
			if(next !== undefined) return next;
			return null;
		}
		event_click(next){
			if(next !== undefined) return next;
			return null;
		}
		status(next){
			if(next !== undefined) return next;
			return [];
		}
		event(){
			return {
				...(super.event()), 
				"click": (next) => (this.activate(next)), 
				"dblclick": (next) => (this.clicks(next)), 
				"keydown": (next) => (this.key_press(next))
			};
		}
		attr(){
			return {
				...(super.attr()), 
				"disabled": (this.disabled()), 
				"role": "button", 
				"tabindex": (this.tab_index()), 
				"title": (this.hint_safe())
			};
		}
		sub(){
			return [(this.title())];
		}
		Speck(){
			const obj = new this.$.$mol_speck();
			(obj.value) = () => ((this.error()));
			return obj;
		}
	};
	($mol_mem(($.$mol_button.prototype), "event_activate"));
	($mol_mem(($.$mol_button.prototype), "clicks"));
	($mol_mem(($.$mol_button.prototype), "event_key_press"));
	($mol_mem(($.$mol_button.prototype), "click"));
	($mol_mem(($.$mol_button.prototype), "event_click"));
	($mol_mem(($.$mol_button.prototype), "status"));
	($mol_mem(($.$mol_button.prototype), "Speck"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_button extends $.$mol_button {
            disabled() {
                return !this.enabled();
            }
            event_activate(next) {
                if (!next)
                    return;
                if (!this.enabled())
                    return;
                try {
                    this.event_click(next);
                    this.click(next);
                    this.status([null]);
                }
                catch (error) {
                    Promise.resolve().then(() => this.status([error]));
                    $mol_fail_hidden(error);
                }
            }
            event_key_press(event) {
                if (event.keyCode === $mol_keyboard_code.enter) {
                    return this.activate(event);
                }
            }
            tab_index() {
                return this.enabled() ? super.tab_index() : -1;
            }
            error() {
                const error = this.status()?.[0];
                if (!error)
                    return '';
                if ($mol_promise_like(error)) {
                    return $mol_fail_hidden(error);
                }
                return this.$.$mol_error_message(error);
            }
            hint_safe() {
                try {
                    return this.hint();
                }
                catch (error) {
                    $mol_fail_log(error);
                    return '';
                }
            }
            sub_visible() {
                return [
                    ...this.error() ? [this.Speck()] : [],
                    ...this.sub(),
                ];
            }
        }
        $$.$mol_button = $mol_button;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/button/button.view.css", "[mol_button] {\n\tborder: none;\n\tfont: inherit;\n\tdisplay: inline-flex;\n\tflex-shrink: 0;\n\ttext-decoration: inherit;\n\tcursor: inherit;\n\tposition: relative;\n\tbox-sizing: border-box;\n\tword-break: normal;\n\tcursor: default;\n\tuser-select: none;\n\t-webkit-user-select: none;\n\tborder-radius: var(--mol_gap_round);\n\tbackground: transparent;\n\tcolor: inherit;\n}\n\n[mol_button]:where(:not(:disabled)):hover {\n\tz-index: var(--mol_layer_hover);\n}\n\n[mol_button]:focus {\n\toutline: none;\n\tz-index: var(--mol_layer_focus);\n}\n");
})($ || ($ = {}));

;
	($.$mol_button_typed) = class $mol_button_typed extends ($.$mol_button) {
		minimal_height(){
			return 40;
		}
		minimal_width(){
			return 40;
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/button/typed/typed.view.css", "[mol_button_typed] {\n\talign-content: center;\n\talign-items: center;\n\tpadding: var(--mol_gap_text);\n\tborder-radius: var(--mol_gap_round);\n\tgap: var(--mol_gap_space);\n\tuser-select: none;\n\tcursor: pointer;\n\tmin-width: 2.5rem;\n\tmin-height: 2.5rem;\n}\n\n[mol_button_typed][disabled] {\n\tpointer-events: none;\n}\n\n[mol_button_typed]:hover ,\n[mol_button_typed]:focus-visible {\n\tbox-shadow: inset 0 0 0 100vmax var(--mol_theme_hover);\n}\n\n[mol_button_typed]:active {\n\tcolor: var(--mol_theme_focus);\n}\n");
})($ || ($ = {}));

;
"use strict";

;
	($.$mol_button_minor) = class $mol_button_minor extends ($.$mol_button_typed) {};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/button/minor/minor.view.css", "[mol_button_minor]:where(:not([disabled])) {\n\tcolor: var(--mol_theme_control);\n}\n");
})($ || ($ = {}));

;
"use strict";

;
	($.$mol_list) = class $mol_list extends ($.$mol_view) {
		gap_before(){
			return 0;
		}
		Gap_before(){
			const obj = new this.$.$mol_view();
			(obj.style) = () => ({"paddingTop": (this.gap_before())});
			return obj;
		}
		Empty(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		gap_after(){
			return 0;
		}
		Gap_after(){
			const obj = new this.$.$mol_view();
			(obj.style) = () => ({"paddingTop": (this.gap_after())});
			return obj;
		}
		rows(){
			return [
				(this.Gap_before()), 
				(this.Empty()), 
				(this.Gap_after())
			];
		}
		render_visible_only(){
			return true;
		}
		render_over(){
			return 0.1;
		}
		sub(){
			return (this.rows());
		}
		item_height_min(id){
			return 1;
		}
		item_width_min(id){
			return 1;
		}
		view_window_shift(next){
			if(next !== undefined) return next;
			return 0;
		}
		view_window(){
			return [0, 0];
		}
	};
	($mol_mem(($.$mol_list.prototype), "Gap_before"));
	($mol_mem(($.$mol_list.prototype), "Empty"));
	($mol_mem(($.$mol_list.prototype), "Gap_after"));
	($mol_mem(($.$mol_list.prototype), "view_window_shift"));


;
"use strict";
var $;
(function ($) {
    let cache = null;
    function $mol_support_css_overflow_anchor() {
        return cache ?? (cache = this.$mol_dom_context.CSS?.supports('overflow-anchor:auto') ?? false);
    }
    $.$mol_support_css_overflow_anchor = $mol_support_css_overflow_anchor;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_list extends $.$mol_list {
            sub() {
                const rows = this.rows();
                const next = (rows.length === 0) ? [this.Empty()] : rows;
                const prev = $mol_mem_cached(() => this.sub());
                const [start, end] = $mol_mem_cached(() => this.view_window()) ?? [0, 0];
                if (prev && $mol_mem_cached(() => prev[start] !== next[start])) {
                    const index = $mol_mem_cached(() => next.indexOf(prev[start])) ?? -1;
                    if (index >= 0)
                        this.view_window_shift(index - start);
                }
                return next;
            }
            render_visible_only() {
                return this.$.$mol_support_css_overflow_anchor();
            }
            view_window(next) {
                const kids = this.sub();
                if (kids.length < 3)
                    return [0, kids.length];
                if (this.$.$mol_print.active())
                    return [0, kids.length];
                const rect = this.view_rect();
                if (next)
                    return next;
                let [min, max] = $mol_mem_cached(() => this.view_window()) ?? [0, 0];
                const shift = this.view_window_shift();
                this.view_window_shift(0);
                min += shift;
                max += shift;
                let max2 = max = Math.min(max, kids.length);
                let min2 = min = Math.max(0, Math.min(min, max - 1));
                const anchoring = this.render_visible_only();
                const window_height = this.$.$mol_window.size().height + 40;
                const over = Math.ceil(window_height * this.render_over());
                const limit_top = -over;
                const limit_bottom = window_height + over;
                const gap_before = $mol_mem_cached(() => this.gap_before()) ?? 0;
                const gap_after = $mol_mem_cached(() => this.gap_after()) ?? 0;
                let top = Math.ceil(rect?.top ?? 0) + gap_before;
                let bottom = Math.ceil(rect?.bottom ?? 0) - gap_after;
                if (top <= limit_top && bottom >= limit_bottom) {
                    return [min2, max2];
                }
                if (anchoring && ((bottom < limit_top) || (top > limit_bottom))) {
                    min = 0;
                    top = Math.ceil(rect?.top ?? 0);
                    while (min < (kids.length - 1)) {
                        const height = this.item_height_min(min);
                        if (top + height >= limit_top)
                            break;
                        top += height;
                        ++min;
                    }
                    min2 = min;
                    max2 = max = min;
                    bottom = top;
                }
                let top2 = top;
                let bottom2 = bottom;
                if (anchoring && (top < limit_top) && (bottom < limit_bottom) && (max < kids.length)) {
                    min2 = max;
                    top2 = bottom;
                }
                if ((bottom > limit_bottom) && (top > limit_top) && (min > 0)) {
                    max2 = min;
                    bottom2 = top;
                }
                while (anchoring && ((top2 > limit_top) && (min2 > 0))) {
                    --min2;
                    top2 -= this.item_height_min(min2);
                }
                while (bottom2 < limit_bottom && max2 < kids.length) {
                    bottom2 += this.item_height_min(max2);
                    ++max2;
                }
                return [min2, max2];
            }
            item_height_min(index) {
                try {
                    return this.sub()[index]?.minimal_height() ?? 0;
                }
                catch (error) {
                    $mol_fail_log(error);
                    return 0;
                }
            }
            row_width_min(index) {
                try {
                    return this.sub()[index]?.minimal_width() ?? 0;
                }
                catch (error) {
                    $mol_fail_log(error);
                    return 0;
                }
            }
            gap_before() {
                let gap = 0;
                const skipped = this.view_window()[0];
                for (let i = 0; i < skipped; ++i)
                    gap += this.item_height_min(i);
                return gap;
            }
            gap_after() {
                let gap = 0;
                const from = this.view_window()[1];
                const to = this.sub().length;
                for (let i = from; i < to; ++i)
                    gap += this.item_height_min(i);
                return gap;
            }
            sub_visible() {
                return [
                    ...this.gap_before() ? [this.Gap_before()] : [],
                    ...this.sub().slice(...this.view_window()),
                    ...this.gap_after() ? [this.Gap_after()] : [],
                ];
            }
            minimal_height() {
                let height = 0;
                const len = this.sub().length;
                for (let i = 0; i < len; ++i)
                    height += this.item_height_min(i);
                return height;
            }
            minimal_width() {
                let width = 0;
                const len = this.sub().length;
                for (let i = 0; i < len; ++i)
                    width = Math.max(width, this.item_width_min(i));
                return width;
            }
            force_render(path) {
                const kids = this.rows();
                const index = kids.findIndex(item => path.has(item));
                if (index >= 0) {
                    const win = this.view_window();
                    if (index < win[0] || index >= win[1]) {
                        this.view_window([this.render_visible_only() ? index : 0, index + 1]);
                    }
                    kids[index].force_render(path);
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "sub", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "view_window", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "gap_before", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "gap_after", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "sub_visible", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "minimal_height", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "minimal_width", null);
        $$.$mol_list = $mol_list;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/list/list.view.css", "[mol_list] {\n\twill-change: contents;\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex-shrink: 0;\n\tmax-width: 100%;\n\t/* display: flex;\n\talign-items: stretch;\n\talign-content: stretch; */\n\ttransition: none;\n\tmin-height: 1.5rem;\n\t/* will-change: contents; */\n}\n\n[mol_list_gap_before] ,\n[mol_list_gap_after] {\n\tdisplay: block !important;\n\tflex: none;\n\ttransition: none;\n\toverflow-anchor: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_paragraph) = class $mol_paragraph extends ($.$mol_view) {
		line_height(){
			return 24;
		}
		letter_width(){
			return 7;
		}
		width_limit(){
			return +Infinity;
		}
		row_width(){
			return 0;
		}
		sub(){
			return [(this.title())];
		}
	};


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_paragraph extends $.$mol_paragraph {
            maximal_width() {
                let width = 0;
                const letter = this.letter_width();
                for (const kid of this.sub()) {
                    if (!kid)
                        continue;
                    if (kid instanceof $mol_view) {
                        width += kid.maximal_width();
                    }
                    else if (typeof kid !== 'object') {
                        width += String(kid).length * letter;
                    }
                }
                return width;
            }
            width_limit() {
                return this.$.$mol_window.size().width;
            }
            minimal_width() {
                return this.letter_width();
            }
            row_width() {
                return Math.max(Math.min(this.width_limit(), this.maximal_width()), this.letter_width());
            }
            minimal_height() {
                return Math.max(1, Math.ceil(this.maximal_width() / this.row_width())) * this.line_height();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_paragraph.prototype, "maximal_width", null);
        __decorate([
            $mol_mem
        ], $mol_paragraph.prototype, "row_width", null);
        __decorate([
            $mol_mem
        ], $mol_paragraph.prototype, "minimal_height", null);
        $$.$mol_paragraph = $mol_paragraph;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/paragraph/paragraph.view.css", ":where([mol_paragraph]) {\n\tmargin: 0;\n\tmax-width: 100%;\n}\n");
})($ || ($ = {}));

;
	($.$mol_dimmer) = class $mol_dimmer extends ($.$mol_paragraph) {
		parts(){
			return [];
		}
		string(id){
			return "";
		}
		haystack(){
			return "";
		}
		needle(){
			return "";
		}
		sub(){
			return (this.parts());
		}
		Low(id){
			const obj = new this.$.$mol_paragraph();
			(obj.sub) = () => ([(this.string(id))]);
			return obj;
		}
		High(id){
			const obj = new this.$.$mol_paragraph();
			(obj.sub) = () => ([(this.string(id))]);
			return obj;
		}
	};
	($mol_mem_key(($.$mol_dimmer.prototype), "Low"));
	($mol_mem_key(($.$mol_dimmer.prototype), "High"));


;
"use strict";

;
"use strict";

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    class $mol_regexp extends RegExp {
        groups;
        constructor(source, flags = 'gsu', groups = []) {
            super(source, flags);
            this.groups = groups;
        }
        *[Symbol.matchAll](str) {
            const index = this.lastIndex;
            this.lastIndex = 0;
            try {
                while (this.lastIndex < str.length) {
                    const found = this.exec(str);
                    if (!found)
                        break;
                    yield found;
                }
            }
            finally {
                this.lastIndex = index;
            }
        }
        [Symbol.match](str) {
            const res = [...this[Symbol.matchAll](str)].filter(r => r.groups).map(r => r[0]);
            if (!res.length)
                return null;
            return res;
        }
        [Symbol.split](str) {
            const res = [];
            let token_last = null;
            for (let token of this[Symbol.matchAll](str)) {
                if (token.groups && (token_last ? token_last.groups : true))
                    res.push('');
                res.push(token[0]);
                token_last = token;
            }
            if (!res.length)
                res.push('');
            return res;
        }
        test(str) {
            return Boolean(str.match(this));
        }
        exec(str) {
            const from = this.lastIndex;
            if (from >= str.length)
                return null;
            const res = super.exec(str);
            if (res === null) {
                this.lastIndex = str.length;
                if (!str)
                    return null;
                return Object.assign([str.slice(from)], {
                    index: from,
                    input: str,
                });
            }
            if (from === this.lastIndex) {
                $mol_fail(new Error('Captured empty substring'));
            }
            const groups = {};
            const skipped = str.slice(from, this.lastIndex - res[0].length);
            if (skipped) {
                this.lastIndex = this.lastIndex - res[0].length;
                return Object.assign([skipped], {
                    index: from,
                    input: res.input,
                });
            }
            for (let i = 0; i < this.groups.length; ++i) {
                const group = this.groups[i];
                groups[group] = groups[group] || res[i + 1] || '';
            }
            return Object.assign(res, { groups });
        }
        generate(params) {
            return null;
        }
        get native() {
            return new RegExp(this.source, this.flags);
        }
        static separated(chunk, sep) {
            return $mol_regexp.from([
                $mol_regexp.repeat_greedy([[chunk], sep], 0),
                chunk,
            ]);
        }
        static repeat(source, min = 0, max = Number.POSITIVE_INFINITY) {
            const regexp = $mol_regexp.from(source);
            const upper = Number.isFinite(max) ? max : '';
            const str = `(?:${regexp.source}){${min},${upper}}?`;
            const regexp2 = new $mol_regexp(str, regexp.flags, regexp.groups);
            regexp2.generate = params => {
                const res = regexp.generate(params);
                if (res)
                    return res;
                if (min > 0)
                    return res;
                return '';
            };
            return regexp2;
        }
        static repeat_greedy(source, min = 0, max = Number.POSITIVE_INFINITY) {
            const regexp = $mol_regexp.from(source);
            const upper = Number.isFinite(max) ? max : '';
            const str = `(?:${regexp.source}){${min},${upper}}`;
            const regexp2 = new $mol_regexp(str, regexp.flags, regexp.groups);
            regexp2.generate = params => {
                const res = regexp.generate(params);
                if (res)
                    return res;
                if (min > 0)
                    return res;
                return '';
            };
            return regexp2;
        }
        static vary(sources, flags = 'gsu') {
            const groups = [];
            const chunks = sources.map(source => {
                const regexp = $mol_regexp.from(source);
                groups.push(...regexp.groups);
                return regexp.source;
            });
            return new $mol_regexp(`(?:${chunks.join('|')})`, flags, groups);
        }
        static optional(source) {
            return $mol_regexp.repeat_greedy(source, 0, 1);
        }
        static force_after(source) {
            const regexp = $mol_regexp.from(source);
            return new $mol_regexp(`(?=${regexp.source})`, regexp.flags, regexp.groups);
        }
        static forbid_after(source) {
            const regexp = $mol_regexp.from(source);
            return new $mol_regexp(`(?!${regexp.source})`, regexp.flags, regexp.groups);
        }
        static from(source, { ignoreCase, multiline } = {
            ignoreCase: false,
            multiline: false,
        }) {
            let flags = 'gsu';
            if (multiline)
                flags += 'm';
            if (ignoreCase)
                flags += 'i';
            if (typeof source === 'number') {
                const src = `\\u{${source.toString(16)}}`;
                const regexp = new $mol_regexp(src, flags);
                regexp.generate = () => src;
                return regexp;
            }
            if (typeof source === 'string') {
                const src = source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regexp = new $mol_regexp(src, flags);
                regexp.generate = () => source;
                return regexp;
            }
            else if (source instanceof $mol_regexp) {
                const regexp = new $mol_regexp(source.source, flags, source.groups);
                regexp.generate = params => source.generate(params);
                return regexp;
            }
            if (source instanceof RegExp) {
                const test = new RegExp('|' + source.source);
                const groups = Array.from({ length: test.exec('').length - 1 }, (_, i) => String(i + 1));
                const regexp = new $mol_regexp(source.source, source.flags, groups);
                regexp.generate = () => '';
                return regexp;
            }
            if (Array.isArray(source)) {
                const patterns = source.map(src => Array.isArray(src)
                    ? $mol_regexp.optional(src)
                    : $mol_regexp.from(src));
                const chunks = patterns.map(pattern => pattern.source);
                const groups = [];
                let index = 0;
                for (const pattern of patterns) {
                    for (let group of pattern.groups) {
                        if (Number(group) >= 0) {
                            groups.push(String(index++));
                        }
                        else {
                            groups.push(group);
                        }
                    }
                }
                const regexp = new $mol_regexp(chunks.join(''), flags, groups);
                regexp.generate = params => {
                    let res = '';
                    for (const pattern of patterns) {
                        let sub = pattern.generate(params);
                        if (sub === null)
                            return '';
                        res += sub;
                    }
                    return res;
                };
                return regexp;
            }
            else {
                const groups = [];
                const chunks = Object.keys(source).map(name => {
                    groups.push(name);
                    const regexp = $mol_regexp.from(source[name]);
                    groups.push(...regexp.groups);
                    return `(${regexp.source})`;
                });
                const regexp = new $mol_regexp(`(?:${chunks.join('|')})`, flags, groups);
                const validator = new RegExp('^' + regexp.source + '$', flags);
                regexp.generate = (params) => {
                    for (let option in source) {
                        if (option in params) {
                            if (typeof params[option] === 'boolean') {
                                if (!params[option])
                                    continue;
                            }
                            else {
                                const str = String(params[option]);
                                if (str.match(validator))
                                    return str;
                                $mol_fail(new Error(`Wrong param: ${option}=${str}`));
                            }
                        }
                        else {
                            if (typeof source[option] !== 'object')
                                continue;
                        }
                        const res = $mol_regexp.from(source[option]).generate(params);
                        if (res)
                            return res;
                    }
                    return null;
                };
                return regexp;
            }
        }
        static unicode_only(...category) {
            return new $mol_regexp(`\\p{${category.join('=')}}`);
        }
        static unicode_except(...category) {
            return new $mol_regexp(`\\P{${category.join('=')}}`);
        }
        static char_range(from, to) {
            return new $mol_regexp(`${$mol_regexp.from(from).source}-${$mol_regexp.from(to).source}`);
        }
        static char_only(...allowed) {
            const regexp = allowed.map(f => $mol_regexp.from(f).source).join('');
            return new $mol_regexp(`[${regexp}]`);
        }
        static char_except(...forbidden) {
            const regexp = forbidden.map(f => $mol_regexp.from(f).source).join('');
            return new $mol_regexp(`[^${regexp}]`);
        }
        static decimal_only = $mol_regexp.from(/\d/gsu);
        static decimal_except = $mol_regexp.from(/\D/gsu);
        static latin_only = $mol_regexp.from(/\w/gsu);
        static latin_except = $mol_regexp.from(/\W/gsu);
        static space_only = $mol_regexp.from(/\s/gsu);
        static space_except = $mol_regexp.from(/\S/gsu);
        static word_break_only = $mol_regexp.from(/\b/gsu);
        static word_break_except = $mol_regexp.from(/\B/gsu);
        static tab = $mol_regexp.from(/\t/gsu);
        static slash_back = $mol_regexp.from(/\\/gsu);
        static nul = $mol_regexp.from(/\0/gsu);
        static char_any = $mol_regexp.from(/./gsu);
        static begin = $mol_regexp.from(/^/gsu);
        static end = $mol_regexp.from(/$/gsu);
        static or = $mol_regexp.from(/|/gsu);
        static line_end = $mol_regexp.from({
            win_end: [['\r'], '\n'],
            mac_end: '\r',
        });
    }
    $.$mol_regexp = $mol_regexp;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_dimmer extends $.$mol_dimmer {
            parts() {
                const needle = this.needle();
                if (needle.length < 2)
                    return [this.haystack()];
                let chunks = [];
                let strings = this.strings();
                for (let index = 0; index < strings.length; index++) {
                    if (strings[index] === '')
                        continue;
                    chunks.push((index % 2) ? this.High(index) : this.Low(index));
                }
                return chunks;
            }
            strings() {
                const options = this.needle().split(/\s+/g).filter(Boolean);
                if (!options.length)
                    return [this.haystack()];
                const variants = { ...options };
                const regexp = $mol_regexp.from({ needle: variants }, { ignoreCase: true });
                return this.haystack().split(regexp);
            }
            string(index) {
                return this.strings()[index];
            }
            *view_find(check, path = []) {
                if (check(this, this.haystack())) {
                    yield [...path, this];
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_dimmer.prototype, "strings", null);
        $$.$mol_dimmer = $mol_dimmer;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/dimmer/dimmer.view.css", "[mol_dimmer] {\n\tdisplay: block;\n\tmax-width: 100%;\n}\n\n[mol_dimmer_low] {\n\tdisplay: inline;\n\topacity: 0.8;\n}\n\n[mol_dimmer_high] {\n\tdisplay: inline;\n\tcolor: var(--mol_theme_focus);\n\ttext-shadow: 0 0;\n}\n");
})($ || ($ = {}));

;
	($.$mol_search) = class $mol_search extends ($.$mol_pop) {
		clear(next){
			if(next !== undefined) return next;
			return null;
		}
		Hotkey(){
			const obj = new this.$.$mol_hotkey();
			(obj.key) = () => ({"escape": (next) => (this.clear(next))});
			return obj;
		}
		nav_components(){
			return [];
		}
		nav_focused(next){
			if(next !== undefined) return next;
			return null;
		}
		Nav(){
			const obj = new this.$.$mol_nav();
			(obj.keys_y) = () => ((this.nav_components()));
			(obj.current_y) = (next) => ((this.nav_focused(next)));
			return obj;
		}
		suggests_showed(next){
			if(next !== undefined) return next;
			return false;
		}
		query(next){
			if(next !== undefined) return next;
			return "";
		}
		hint(){
			return (this.$.$mol_locale.text("$mol_search_hint"));
		}
		submit(next){
			if(next !== undefined) return next;
			return null;
		}
		enabled(){
			return true;
		}
		keyboard(){
			return "search";
		}
		enter(){
			return "search";
		}
		bring(){
			return (this.Query().bring());
		}
		Query(){
			const obj = new this.$.$mol_string();
			(obj.value) = (next) => ((this.query(next)));
			(obj.hint) = () => ((this.hint()));
			(obj.submit) = (next) => ((this.submit(next)));
			(obj.enabled) = () => ((this.enabled()));
			(obj.keyboard) = () => ((this.keyboard()));
			(obj.enter) = () => ((this.enter()));
			return obj;
		}
		Clear_icon(){
			const obj = new this.$.$mol_icon_close();
			return obj;
		}
		Clear(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.$.$mol_locale.text("$mol_search_Clear_hint")));
			(obj.enabled) = () => ((this.enabled()));
			(obj.click) = (next) => ((this.clear(next)));
			(obj.sub) = () => ([(this.Clear_icon())]);
			return obj;
		}
		anchor_content(){
			return [(this.Query()), (this.Clear())];
		}
		menu_items(){
			return [];
		}
		Menu(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.menu_items()));
			return obj;
		}
		Bubble_pane(){
			const obj = new this.$.$mol_scroll();
			(obj.sub) = () => ([(this.Menu())]);
			return obj;
		}
		suggest_select(id, next){
			if(next !== undefined) return next;
			return null;
		}
		suggest_label(id){
			return "";
		}
		Suggest_label(id){
			const obj = new this.$.$mol_dimmer();
			(obj.haystack) = () => ((this.suggest_label(id)));
			(obj.needle) = () => ((this.query()));
			return obj;
		}
		suggest_content(id){
			return [(this.Suggest_label(id))];
		}
		suggests(){
			return [];
		}
		plugins(){
			return [
				...(super.plugins()), 
				(this.Hotkey()), 
				(this.Nav())
			];
		}
		showed(next){
			return (this.suggests_showed(next));
		}
		align_hor(){
			return "right";
		}
		Anchor(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.anchor_content()));
			return obj;
		}
		bubble_content(){
			return [(this.Bubble_pane())];
		}
		Suggest(id){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.suggest_select(id, next)));
			(obj.sub) = () => ((this.suggest_content(id)));
			return obj;
		}
	};
	($mol_mem(($.$mol_search.prototype), "clear"));
	($mol_mem(($.$mol_search.prototype), "Hotkey"));
	($mol_mem(($.$mol_search.prototype), "nav_focused"));
	($mol_mem(($.$mol_search.prototype), "Nav"));
	($mol_mem(($.$mol_search.prototype), "suggests_showed"));
	($mol_mem(($.$mol_search.prototype), "query"));
	($mol_mem(($.$mol_search.prototype), "submit"));
	($mol_mem(($.$mol_search.prototype), "Query"));
	($mol_mem(($.$mol_search.prototype), "Clear_icon"));
	($mol_mem(($.$mol_search.prototype), "Clear"));
	($mol_mem(($.$mol_search.prototype), "Menu"));
	($mol_mem(($.$mol_search.prototype), "Bubble_pane"));
	($mol_mem_key(($.$mol_search.prototype), "suggest_select"));
	($mol_mem_key(($.$mol_search.prototype), "Suggest_label"));
	($mol_mem(($.$mol_search.prototype), "Anchor"));
	($mol_mem_key(($.$mol_search.prototype), "Suggest"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_search extends $.$mol_search {
            anchor_content() {
                return [
                    this.Query(),
                    ...this.query() ? [this.Clear()] : [],
                ];
            }
            suggests_showed(next = true) {
                this.query();
                if (!this.focused())
                    return false;
                return next;
            }
            suggest_selected(next) {
                if (next === undefined)
                    return;
                this.query(next);
                this.Query().focused(true);
            }
            nav_components() {
                return [
                    this.Query(),
                    ...this.menu_items(),
                ];
            }
            nav_focused(component) {
                if (!this.focused())
                    return null;
                if (component == null) {
                    for (let comp of this.nav_components()) {
                        if (comp && comp.focused())
                            return comp;
                    }
                    return null;
                }
                if (this.suggests_showed()) {
                    this.ensure_visible(component, "center");
                    component.focused(true);
                }
                return component;
            }
            suggest_label(key) {
                return key;
            }
            menu_items() {
                return this.suggests().map((suggest) => this.Suggest(suggest));
            }
            suggest_select(id, event) {
                this.query(id);
                this.Query().selection([id.length, id.length]);
                this.Query().focused(true);
            }
            clear(event) {
                this.query('');
            }
        }
        __decorate([
            $mol_mem
        ], $mol_search.prototype, "anchor_content", null);
        __decorate([
            $mol_mem
        ], $mol_search.prototype, "suggests_showed", null);
        __decorate([
            $mol_mem
        ], $mol_search.prototype, "nav_focused", null);
        __decorate([
            $mol_mem
        ], $mol_search.prototype, "menu_items", null);
        $$.$mol_search = $mol_search;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/search/search.view.css", "[mol_search] {\n\talign-self: flex-start;\n\tflex: auto;\n}\n\n[mol_search_anchor] {\n\tflex: 1 1 auto;\n}\n\n[mol_search_query] {\n\tflex-grow: 1;\n}\n\n[mol_search_menu] {\n\tmin-height: .75rem;\n\tdisplay: flex;\n}\n\n[mol_search_suggest] {\n\ttext-align: left;\n}\n\n[mol_search_suggest_label_high] {\n\tcolor: var(--mol_theme_shade);\n\ttext-shadow: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_link) = class $mol_link extends ($.$mol_view) {
		uri_toggle(){
			return "";
		}
		hint(){
			return "";
		}
		hint_safe(){
			return (this.hint());
		}
		target(){
			return "_self";
		}
		file_name(){
			return "";
		}
		current(){
			return false;
		}
		relation(){
			return "";
		}
		event_click(next){
			if(next !== undefined) return next;
			return null;
		}
		click(next){
			return (this.event_click(next));
		}
		uri(){
			return "";
		}
		dom_name(){
			return "a";
		}
		uri_off(){
			return "";
		}
		uri_native(){
			return null;
		}
		external(){
			return false;
		}
		attr(){
			return {
				...(super.attr()), 
				"href": (this.uri_toggle()), 
				"title": (this.hint_safe()), 
				"target": (this.target()), 
				"download": (this.file_name()), 
				"mol_link_current": (this.current()), 
				"rel": (this.relation())
			};
		}
		sub(){
			return [(this.title())];
		}
		arg(){
			return {};
		}
		event(){
			return {...(super.event()), "click": (next) => (this.click(next))};
		}
	};
	($mol_mem(($.$mol_link.prototype), "event_click"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_link extends $.$mol_link {
            uri_toggle() {
                return this.current() ? this.uri_off() : this.uri();
            }
            uri() {
                return new this.$.$mol_state_arg(this.state_key()).link(this.arg());
            }
            uri_off() {
                const arg2 = {};
                for (let i in this.arg())
                    arg2[i] = null;
                return new this.$.$mol_state_arg(this.state_key()).link(arg2);
            }
            uri_native() {
                const base = this.$.$mol_state_arg.href();
                return new URL(this.uri(), base);
            }
            current() {
                const base = this.$.$mol_state_arg.href_normal();
                const target = this.uri_native().toString();
                if (base === target)
                    return true;
                const args = this.arg();
                const keys = Object.keys(args).filter(key => args[key] != null);
                if (keys.length === 0)
                    return false;
                for (const key of keys) {
                    if (this.$.$mol_state_arg.value(key) != args[key])
                        return false;
                }
                return true;
            }
            file_name() {
                return null;
            }
            minimal_height() {
                return Math.max(super.minimal_height(), 24);
            }
            external() {
                return this.uri_native().origin !== $mol_dom_context.location.origin;
            }
            target() {
                return this.external() ? '_blank' : '_self';
            }
            hint_safe() {
                try {
                    return this.hint();
                }
                catch (error) {
                    $mol_fail_log(error);
                    return '';
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri_toggle", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri_off", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri_native", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "current", null);
        $$.$mol_link = $mol_link;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const { rem } = $mol_style_unit;
    $mol_style_define($mol_link, {
        textDecoration: 'none',
        color: $mol_theme.control,
        stroke: 'currentcolor',
        cursor: 'pointer',
        padding: $mol_gap.text,
        boxSizing: 'border-box',
        position: 'relative',
        minWidth: rem(2.5),
        minHeight: rem(2.5),
        gap: $mol_gap.space,
        border: {
            radius: $mol_gap.round,
        },
        ':hover': {
            background: {
                color: $mol_theme.hover,
            },
        },
        ':focus': {
            outline: 'none',
        },
        ':focus-visible': {
            outline: 'none',
            background: {
                color: $mol_theme.hover,
            }
        },
        ':active': {
            color: $mol_theme.focus,
        },
        '@': {
            mol_link_current: {
                'true': {
                    color: $mol_theme.current,
                    textShadow: '0 0',
                }
            }
        },
    });
})($ || ($ = {}));

;
	($.$mol_page) = class $mol_page extends ($.$mol_view) {
		tabindex(){
			return -1;
		}
		Logo(){
			return null;
		}
		title_content(){
			return [(this.Logo()), (this.title())];
		}
		Title(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("h1");
			(obj.sub) = () => ((this.title_content()));
			return obj;
		}
		tools(){
			return [];
		}
		Tools(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.tools()));
			return obj;
		}
		head(){
			return [(this.Title()), (this.Tools())];
		}
		Head(){
			const obj = new this.$.$mol_view();
			(obj.minimal_height) = () => (64);
			(obj.dom_name) = () => ("header");
			(obj.sub) = () => ((this.head()));
			return obj;
		}
		body_scroll_top(next){
			return (this.Body().scroll_top(next));
		}
		body(){
			return [];
		}
		Body_content(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.body()));
			return obj;
		}
		body_content(){
			return [(this.Body_content())];
		}
		Body(){
			const obj = new this.$.$mol_scroll();
			(obj.sub) = () => ((this.body_content()));
			return obj;
		}
		foot(){
			return [];
		}
		Foot(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("footer");
			(obj.sub) = () => ((this.foot()));
			return obj;
		}
		dom_name(){
			return "article";
		}
		attr(){
			return {...(super.attr()), "tabIndex": (this.tabindex())};
		}
		sub(){
			return [
				(this.Head()), 
				(this.Body()), 
				(this.Foot())
			];
		}
	};
	($mol_mem(($.$mol_page.prototype), "Title"));
	($mol_mem(($.$mol_page.prototype), "Tools"));
	($mol_mem(($.$mol_page.prototype), "Head"));
	($mol_mem(($.$mol_page.prototype), "Body_content"));
	($mol_mem(($.$mol_page.prototype), "Body"));
	($mol_mem(($.$mol_page.prototype), "Foot"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { per, rem } = $mol_style_unit;
        const { hsla, blur } = $mol_style_func;
        $mol_style_define($mol_page, {
            display: 'flex',
            flex: {
                basis: 'auto',
                direction: 'column',
            },
            position: 'relative',
            alignSelf: 'stretch',
            maxWidth: per(100),
            maxHeight: per(100),
            boxSizing: 'border-box',
            color: $mol_theme.text,
            ':focus': {
                outline: 'none',
            },
            Head: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-end',
                flex: 'none',
                position: 'relative',
                margin: 0,
                minHeight: rem(4),
                padding: $mol_gap.block,
                background: {
                    color: $mol_theme.card,
                },
                border: {
                    radius: $mol_gap.round,
                },
                box: {
                    shadow: [
                        [0, `-0.5rem`, `0.5rem`, `-0.5rem`, hsla(0, 0, 0, .25)],
                        [0, `0.5rem`, `0.5rem`, `-0.5rem`, hsla(0, 0, 0, .25)],
                    ],
                },
                zIndex: 2,
                '@media': {
                    'print': {
                        box: {
                            shadow: [[0, `1px`, 0, 0, hsla(0, 0, 0, .25)]],
                        },
                    },
                },
            },
            Title: {
                minHeight: rem(2),
                margin: 0,
                padding: $mol_gap.text,
                gap: $mol_gap.text,
                wordBreak: 'normal',
                textShadow: '0 0',
                font: {
                    size: 'inherit',
                    weight: 'normal',
                },
                flex: {
                    grow: 1,
                    shrink: 1,
                    basis: 'auto',
                },
            },
            Tools: {
                flex: {
                    basis: 'auto',
                    grow: 0,
                    shrink: 1,
                },
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                '@media': {
                    'print': {
                        display: 'none',
                    },
                },
            },
            Body: {
                flex: {
                    grow: 1000,
                    shrink: 1,
                    basis: per(100),
                },
            },
            Body_content: {
                padding: $mol_gap.block,
                minHeight: 0,
                minWidth: 0,
                flex: {
                    direction: 'column',
                    shrink: 1,
                    grow: 1,
                },
                justify: {
                    self: 'stretch',
                },
            },
            Foot: {
                display: 'flex',
                justifyContent: 'space-between',
                flex: 'none',
                margin: 0,
                background: {
                    color: $mol_theme.card,
                },
                border: {
                    radius: $mol_gap.round,
                },
                box: {
                    shadow: [
                        [0, `-0.5rem`, `0.5rem`, `-0.5rem`, hsla(0, 0, 0, .25)],
                        [0, `0.5rem`, `0.5rem`, `-0.5rem`, hsla(0, 0, 0, .25)],
                    ],
                },
                zIndex: 1,
                padding: $mol_gap.block,
                ':empty': {
                    display: 'none',
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_book2_catalog) = class $mol_book2_catalog extends ($.$mol_book2) {
		Menu_title(){
			return (this.Menu().Title());
		}
		menu_title(){
			return "";
		}
		Menu_tools(){
			return (this.Menu().Tools());
		}
		Menu_logo(){
			return null;
		}
		menu_head(){
			return [(this.Menu_title()), (this.Menu_tools())];
		}
		menu_filter(next){
			if(next !== undefined) return next;
			return "";
		}
		Menu_filter(){
			const obj = new this.$.$mol_search();
			(obj.query) = (next) => ((this.menu_filter(next)));
			return obj;
		}
		Menu_links_empty(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		arg(id){
			return {};
		}
		menu_link_arg(id){
			return (this.arg(id));
		}
		spread_title(id){
			return "";
		}
		Menu_link_title(id){
			const obj = new this.$.$mol_dimmer();
			(obj.needle) = () => ((this.menu_filter()));
			(obj.haystack) = () => ((this.spread_title(id)));
			return obj;
		}
		menu_link_content(id){
			return [(this.Menu_link_title(id))];
		}
		Menu_link(id){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ((this.menu_link_arg(id)));
			(obj.sub) = () => ((this.menu_link_content(id)));
			return obj;
		}
		menu_item_content(id){
			return [(this.Menu_link(id))];
		}
		Menu_item(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.menu_item_content(id)));
			return obj;
		}
		menu_links(){
			return [(this.Menu_item("0"))];
		}
		Menu_links(){
			const obj = new this.$.$mol_list();
			(obj.Empty) = () => ((this.Menu_links_empty()));
			(obj.rows) = () => ((this.menu_links()));
			return obj;
		}
		menu_body(){
			return [(this.Menu_filter()), (this.Menu_links())];
		}
		menu_foot(){
			return [];
		}
		Menu(){
			const obj = new this.$.$mol_page();
			(obj.title) = () => ((this.menu_title()));
			(obj.Logo) = () => ((this.Menu_logo()));
			(obj.tools) = () => ([...(this.menu_tools()), ...(this.addon_tools())]);
			(obj.head) = () => ((this.menu_head()));
			(obj.body) = () => ((this.menu_body()));
			(obj.foot) = () => ((this.menu_foot()));
			return obj;
		}
		spread_close_arg(){
			return {};
		}
		Spread_close_icon(){
			const obj = new this.$.$mol_icon_close();
			return obj;
		}
		param(){
			return "";
		}
		spread(next){
			if(next !== undefined) return next;
			return "";
		}
		spreads(){
			return {};
		}
		Spread(id){
			const obj = new this.$.$mol_view();
			return obj;
		}
		Spread_default(){
			return null;
		}
		spread_ids(){
			return [];
		}
		menu_filter_enabled(){
			return false;
		}
		spread_ids_filtered(){
			return [];
		}
		spread_current(){
			return null;
		}
		menu_tools(){
			return [];
		}
		addon_tools(){
			return [];
		}
		pages(){
			return [(this.Menu())];
		}
		Spread_close(){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ((this.spread_close_arg()));
			(obj.hint) = () => ((this.$.$mol_locale.text("$mol_book2_catalog_Spread_close_hint")));
			(obj.sub) = () => ([(this.Spread_close_icon())]);
			return obj;
		}
	};
	($mol_mem(($.$mol_book2_catalog.prototype), "menu_filter"));
	($mol_mem(($.$mol_book2_catalog.prototype), "Menu_filter"));
	($mol_mem(($.$mol_book2_catalog.prototype), "Menu_links_empty"));
	($mol_mem_key(($.$mol_book2_catalog.prototype), "Menu_link_title"));
	($mol_mem_key(($.$mol_book2_catalog.prototype), "Menu_link"));
	($mol_mem_key(($.$mol_book2_catalog.prototype), "Menu_item"));
	($mol_mem(($.$mol_book2_catalog.prototype), "Menu_links"));
	($mol_mem(($.$mol_book2_catalog.prototype), "Menu"));
	($mol_mem(($.$mol_book2_catalog.prototype), "Spread_close_icon"));
	($mol_mem(($.$mol_book2_catalog.prototype), "spread"));
	($mol_mem_key(($.$mol_book2_catalog.prototype), "Spread"));
	($mol_mem(($.$mol_book2_catalog.prototype), "Spread_close"));


;
"use strict";
var $;
(function ($) {
    function $mol_match_text(query, values) {
        const tags = query.toLowerCase().trim().split(/\s+/).filter(tag => tag);
        if (tags.length === 0)
            return () => true;
        return (variant) => {
            const vals = values(variant);
            return tags.every(tag => vals.some(val => val.toLowerCase().indexOf(tag) >= 0));
        };
    }
    $.$mol_match_text = $mol_match_text;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_book2_catalog extends $.$mol_book2_catalog {
            spread_current() {
                return this.spread() === '' ? this.Spread_default() : this.Spread(this.spread());
            }
            pages() {
                const spread = this.spread_current();
                return [
                    this.Menu(),
                    ...spread
                        ? spread instanceof $mol_book2
                            ? spread.pages_deep()
                            : [spread]
                        : [],
                ];
            }
            auto() {
                const spread = this.spread_current();
                if (spread instanceof $mol_book2)
                    spread.auto();
            }
            spread_ids() {
                return Object.keys(this.spreads());
            }
            menu_body() {
                return [
                    ...this.menu_filter_enabled() ? [this.Menu_filter()] : [],
                    this.Menu_links(),
                ];
            }
            menu_filter_enabled() {
                return this.spread_ids().length >= 10;
            }
            menu_links() {
                return this.spread_ids_filtered()
                    .map(spread => this.Menu_item(spread));
            }
            spread_ids_filtered() {
                return this.spread_ids()
                    .filter($mol_match_text(this.menu_filter(), spread => [this.spread_title(spread)]));
            }
            Spread(id) {
                return this.spreads()[id];
            }
            Spread_default() {
                return this.spreads()[''];
            }
            spread(next) {
                return this.$.$mol_state_arg.value(this.param(), next) ?? '';
            }
            arg(spread) {
                return { [this.param()]: spread || null };
            }
            spread_close_arg() {
                return { [this.param()]: null };
            }
            spread_title(spread) {
                const page = this.Spread(spread);
                return page instanceof $mol_book2
                    && page.menu_title()
                    || page.title()
                    || spread;
            }
            spread_current_book() {
                const spread = this.spread_current();
                return spread instanceof $mol_book2 ? spread : null;
            }
            placeholders() {
                const spread_placeholders = this.spread_current_book()?.placeholders() ?? [];
                return spread_placeholders.length ? spread_placeholders : super.placeholders();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_book2_catalog.prototype, "pages", null);
        __decorate([
            $mol_mem
        ], $mol_book2_catalog.prototype, "spread_ids", null);
        __decorate([
            $mol_mem
        ], $mol_book2_catalog.prototype, "menu_body", null);
        __decorate([
            $mol_mem
        ], $mol_book2_catalog.prototype, "menu_links", null);
        __decorate([
            $mol_mem
        ], $mol_book2_catalog.prototype, "spread_ids_filtered", null);
        __decorate([
            $mol_mem
        ], $mol_book2_catalog.prototype, "spread", null);
        __decorate([
            $mol_mem
        ], $mol_book2_catalog.prototype, "placeholders", null);
        $$.$mol_book2_catalog = $mol_book2_catalog;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($mol_book2_catalog, {
            Menu_filter: {
                flex: {
                    shrink: 0,
                    grow: 0,
                },
                alignSelf: 'stretch',
            },
            Menu_item: {
                align: {
                    items: 'flex-start',
                },
            },
            Menu_link: {
                flex: {
                    grow: 1,
                    shrink: 1,
                    wrap: 'wrap',
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$bog_theme = $mol_style_prop('mol_theme', [
        'back',
        'background',
        'hover',
        'card',
        'current',
        'special',
        'text',
        'control',
        'shade',
        'line',
        'focus',
        'field',
        'image',
        'spirit',
    ]);
    $.$bog_theme_names = [
        '$mol_theme_giper_smash_dark',
        '$mol_theme_giper_smash_light',
        '$mol_theme_light',
        '$mol_theme_dark',
        '$mol_theme_monefro_light',
        '$mol_theme_monefro_dark',
        '$mol_theme_homerent_light',
        '$mol_theme_homerent_dark',
        '$mol_theme_upwork',
        '$mol_theme_ainews_light',
        '$mol_theme_ainews_dark',
        '$mol_theme_calm_dark',
        '$mol_theme_calm_light',
    ];
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("bog/theme/theme.css", ":root {\n\t--mol_theme_hue: 645deg;\n\t--mol_theme_hue_spread: 90deg;\n\t--mol_theme_background: var(--mol_theme_back);\n\n\t/* Bog theme semantic aliases */\n\t--mol_theme_primary_hue: var(--mol_theme_hue);\n\t--mol_theme_secondary_hue: calc(var(--mol_theme_hue) + var(--mol_theme_hue_spread));\n\t--mol_theme_tertiary_hue: calc(var(--mol_theme_hue) - var(--mol_theme_hue_spread));\n\t--mol_theme_accent_hue: calc(var(--mol_theme_hue) + 180deg);\n}\n\n:where([mol_theme]) {\n\tcolor: var(--mol_theme_text);\n\tfill: var(--mol_theme_text);\n\tbackground-color: var(--mol_theme_back);\n}\n\n:root,\n[mol_theme='$mol_theme_dark'],\n:where([mol_theme='$mol_theme_dark']) [mol_theme] {\n\t--mol_theme_luma: -1;\n\t--mol_theme_image: invert(1) hue-rotate(180deg);\n\t--mol_theme_spirit: hsl(0deg, 0%, 0%, 0.75);\n\n\t--bog_theme_back: hsl(var(--bog_theme_hue), 8%, 12%);\n\t--bog_theme_card: hsl(var(--bog_theme_hue), 15%, 18%, 0.25);\n\t--bog_theme_field: hsl(var(--bog_theme_hue), 12%, 10%, 0.25);\n\t--bog_theme_hover: hsl(var(--bog_theme_hue), 0%, 50%, 0.1);\n\n\t--bog_theme_text: hsl(var(--bog_theme_hue), 8%, 85%);\n\t--bog_theme_shade: hsl(var(--bog_theme_hue), 12%, 65%, 1);\n\t--bog_theme_line: hsl(var(--bog_theme_hue), 8%, 50%, 0.25);\n\t--bog_theme_focus: hsl(calc(var(--bog_theme_hue) + 180deg), 60%, 65%);\n\n\t--bog_theme_control: hsl(var(--bog_theme_hue), 25%, 70%);\n\t--bog_theme_current: hsl(calc(var(--bog_theme_hue) - var(--bog_theme_hue_spread)), 25%, 70%);\n\t--bog_theme_special: hsl(calc(var(--bog_theme_hue) + var(--bog_theme_hue_spread)), 25%, 70%);\n}\n@supports (color: oklch(0% 0 0deg)) {\n\t:root,\n\t[mol_theme='$mol_theme_dark'],\n\t:where([mol_theme='$mol_theme_dark']) [mol_theme] {\n\t\t--bog_theme_back: oklch(12% 0.02 var(--bog_theme_hue));\n\t\t--bog_theme_card: oklch(18% 0.03 var(--bog_theme_hue) / 0.25);\n\t\t--bog_theme_field: oklch(10% 0.015 var(--bog_theme_hue) / 0.25);\n\t\t--bog_theme_hover: oklch(70% 0 var(--bog_theme_hue) / 0.1);\n\n\t\t--bog_theme_text: oklch(85% 0.025 var(--bog_theme_hue));\n\t\t--bog_theme_shade: oklch(65% 0.035 var(--bog_theme_hue));\n\t\t--bog_theme_line: oklch(50% 0.025 var(--bog_theme_hue) / 0.25);\n\t\t--bog_theme_focus: oklch(75% 0.15 calc(var(--bog_theme_hue) + 180deg));\n\n\t\t--bog_theme_control: oklch(70% 0.06 var(--bog_theme_hue));\n\t\t--bog_theme_current: oklch(70% 0.08 calc(var(--bog_theme_hue) - var(--bog_theme_hue_spread)));\n\t\t--bog_theme_special: oklch(70% 0.08 calc(var(--bog_theme_hue) + var(--bog_theme_hue_spread)));\n\t}\n}\n\n[mol_theme='$mol_theme_light'],\n:where([mol_theme='$mol_theme_light']) [mol_theme] {\n\t--mol_theme_luma: 1;\n\t--mol_theme_image: none;\n\t--mol_theme_spirit: hsl(0deg, 0%, 100%, 0.75);\n\n\t--mol_theme_back: hsl(var(--mol_theme_hue), 0%, 100%);\n\t--mol_theme_card: hsl(var(--mol_theme_hue), 50%, 100%, 0.5);\n\t--mol_theme_field: hsl(var(--mol_theme_hue), 50%, 100%, 0.75);\n\t--mol_theme_hover: hsl(var(--mol_theme_hue), 0%, 50%, 0.1);\n\n\t--mol_theme_text: hsl(var(--mol_theme_hue), 0%, 0%);\n\t--mol_theme_shade: hsl(var(--mol_theme_hue), 0%, 40%, 1);\n\t--mol_theme_line: hsl(var(--mol_theme_hue), 0%, 50%, 0.25);\n\t--mol_theme_focus: hsl(calc(var(--mol_theme_hue) + 180deg), 100%, 40%);\n\n\t--mol_theme_control: hsl(var(--mol_theme_hue), 80%, 30%);\n\t--mol_theme_current: hsl(calc(var(--mol_theme_hue) - var(--mol_theme_hue_spread)), 80%, 30%);\n\t--mol_theme_special: hsl(calc(var(--mol_theme_hue) + var(--mol_theme_hue_spread)), 80%, 30%);\n}\n@supports (color: oklch(0% 0 0deg)) {\n\t[mol_theme='$mol_theme_light'],\n\t:where([mol_theme='$mol_theme_light']) [mol_theme] {\n\t\t--mol_theme_back: oklch(100% 0 var(--mol_theme_hue));\n\t\t--mol_theme_card: oklch(99% 0.01 var(--mol_theme_hue) / 0.5);\n\t\t--mol_theme_field: oklch(100% 0 var(--mol_theme_hue) / 0.5);\n\t\t--mol_theme_hover: oklch(70% 0 var(--mol_theme_hue) / 0.1);\n\n\t\t--mol_theme_text: oklch(20% 0 var(--mol_theme_hue));\n\t\t--mol_theme_shade: oklch(60% 0 var(--mol_theme_hue));\n\t\t--mol_theme_line: oklch(50% 0 var(--mol_theme_hue) / 0.25);\n\t\t--mol_theme_focus: oklch(60% 0.2 calc(var(--mol_theme_hue) + 180deg));\n\n\t\t--mol_theme_control: oklch(40% 0.15 var(--mol_theme_hue));\n\t\t--mol_theme_current: oklch(50% 0.2 calc(var(--mol_theme_hue) - var(--mol_theme_hue_spread)));\n\t\t--mol_theme_special: oklch(50% 0.2 calc(var(--mol_theme_hue) + var(--mol_theme_hue_spread)));\n\t}\n}\n\n:where(:root, [mol_theme='$mol_theme_dark']) [mol_theme='$mol_theme_base'] {\n\t--mol_theme_back: oklch(25% 0.075 var(--mol_theme_hue));\n\t--mol_theme_card: oklch(35% 0.1 var(--mol_theme_hue) / 0.25);\n}\n:where([mol_theme='$mol_theme_light']) [mol_theme='$mol_theme_base'] {\n\t--mol_theme_back: oklch(85% 0.075 var(--mol_theme_hue));\n\t--mol_theme_card: oklch(98% 0.03 var(--mol_theme_hue) / 0.25);\n}\n\n:where(:root, [mol_theme='$mol_theme_dark']) [mol_theme='$mol_theme_current'] {\n\t--mol_theme_back: oklch(25% 0.05 calc(var(--mol_theme_hue) - var(--mol_theme_hue_spread)));\n\t--mol_theme_card: oklch(35% 0.1 calc(var(--mol_theme_hue) - var(--mol_theme_hue_spread)) / 0.25);\n}\n:where([mol_theme='$mol_theme_light']) [mol_theme='$mol_theme_current'] {\n\t--mol_theme_back: oklch(85% 0.05 calc(var(--mol_theme_hue) - var(--mol_theme_hue_spread)));\n\t--mol_theme_card: oklch(98% 0.03 calc(var(--mol_theme_hue) - var(--mol_theme_hue_spread)) / 0.25);\n}\n\n:where(:root, [mol_theme='$mol_theme_dark']) [mol_theme='$mol_theme_special'] {\n\t--mol_theme_back: oklch(25% 0.05 calc(var(--mol_theme_hue) + var(--mol_theme_hue_spread)));\n\t--mol_theme_card: oklch(35% 0.1 calc(var(--mol_theme_hue) + var(--mol_theme_hue_spread)) / 0.25);\n}\n:where([mol_theme='$mol_theme_light']) [mol_theme='$mol_theme_special'] {\n\t--mol_theme_back: oklch(85% 0.05 calc(var(--mol_theme_hue) + var(--mol_theme_hue_spread)));\n\t--mol_theme_card: oklch(98% 0.03 calc(var(--mol_theme_hue) + var(--mol_theme_hue_spread)) / 0.25);\n}\n\n:where(:root, [mol_theme='$mol_theme_dark']) [mol_theme='$mol_theme_accent'] {\n\t--mol_theme_back: oklch(35% 0.1 calc(var(--mol_theme_hue) + 180deg));\n\t--mol_theme_card: oklch(45% 0.15 calc(var(--mol_theme_hue) + 180deg) / 0.25);\n}\n:where([mol_theme='$mol_theme_light']) [mol_theme='$mol_theme_accent'] {\n\t--mol_theme_back: oklch(83% 0.1 calc(var(--mol_theme_hue) + 180deg));\n\t--mol_theme_card: oklch(98% 0.03 calc(var(--mol_theme_hue) + 180deg) / 0.25);\n}\n\n/* Upwork theme - based on Upwork brand colors */\n[mol_theme='$mol_theme_upwork'],\n:where([mol_theme='$mol_theme_upwork']) [mol_theme] {\n\t--mol_theme_luma: 1;\n\t--mol_theme_image: none;\n\t--mol_theme_spirit: rgba(255, 255, 255, 0.75);\n\n\t/* Upwork brand colors: #73bb44 (primary green), #4fab4a (medium green), #385925 (dark green), #b5deb1 (light green) */\n\t--mol_theme_back: #ffffff;\n\t--mol_theme_card: #f9fcf7;\n\t--mol_theme_field: #ffffff;\n\t--mol_theme_hover: rgba(115, 187, 68, 0.1);\n\n\t--mol_theme_text: #4c4444;\n\t--mol_theme_shade: #6e6d7a;\n\t--mol_theme_line: rgba(115, 187, 68, 0.25);\n\t--mol_theme_focus: #73bb44;\n\n\t--mol_theme_control: #73bb44;\n\t--mol_theme_current: #4fab4a;\n\t--mol_theme_special: #385925;\n}\n\n/* Ainews dark theme - based on Ainews brand palette */\n[mol_theme='$mol_theme_ainews_dark'],\n:where([mol_theme='$mol_theme_ainews_dark']) [mol_theme] {\n\t--mol_theme_luma: -1;\n\t--mol_theme_image: invert(1) hue-rotate(180deg);\n\n\t/* ВАЖНО: mol_* — именно их читает демка */\n\t--mol_theme_back: #3e3e3e; /* paper dark */\n\t--mol_theme_card: #4a4a4a40; /* paper-2 dark 25% */\n\t--mol_theme_field: #4c4c4c40; /* chip dark 25% */\n\t--mol_theme_hover: #5a5a5a1a; /* edge dark 10% */\n\n\t--mol_theme_text: #bcbcbc; /* ink dark */\n\t--mol_theme_shade: #909090; /* ink-muted dark */\n\t--mol_theme_line: #5a5a5a40; /* edge dark 25% */\n\t--mol_theme_focus: #a8bcff; /* accent dark */\n\n\t--mol_theme_control: #a8bcff; /* accent dark */\n\t--mol_theme_current: #c7b18c; /* accent-2 dark */\n\t--mol_theme_special: #d4bf9d; /* accent-2 lighter */\n}\n\n@supports (color: oklch(0% 0 0deg)) {\n\t[mol_theme='$mol_theme_ainews_dark'],\n\t:where([mol_theme='$mol_theme_ainews_dark']) [mol_theme] {\n\t\t--mol_theme_back: #3e3e3e;\n\t\t--mol_theme_card: #4a4a4a40;\n\t\t--mol_theme_field: #4c4c4c40;\n\t\t--mol_theme_hover: #5a5a5a1a;\n\n\t\t--mol_theme_text: #bcbcbc;\n\t\t--mol_theme_shade: #909090;\n\t\t--mol_theme_line: #5a5a5a40;\n\t\t--mol_theme_focus: #a8bcff;\n\n\t\t--mol_theme_control: #a8bcff;\n\t\t--mol_theme_current: #c7b18c;\n\t\t--mol_theme_special: #d4bf9d;\n\t}\n}\n\n/* Ainews light theme */\n[mol_theme='$mol_theme_ainews_light'],\n:where([mol_theme='$mol_theme_ainews_light']) [mol_theme] {\n\t--mol_theme_luma: 1;\n\t--mol_theme_image: none;\n\t--mol_theme_spirit: #fbf8f1bf; /* 75% */\n\n\t--mol_theme_back: #f7f3e9; /* paper */\n\t--mol_theme_card: #fbf8f180; /* paper-2 50% */\n\t--mol_theme_field: #efe8d8bf; /* chip 75% */\n\t--mol_theme_hover: #ded7c81a; /* edge 10% */\n\n\t--mol_theme_text: #22211f; /* ink */\n\t--mol_theme_shade: #6e6a62; /* ink-muted */\n\t--mol_theme_line: #ded7c840; /* edge 25% */\n\t--mol_theme_focus: #3b5aad; /* accent */\n\n\t--mol_theme_control: #3b5aad; /* accent */\n\t--mol_theme_current: #92734b; /* accent-2 */\n\t--mol_theme_special: #c7b18c; /* accent-2 lighter */\n}\n\n@supports (color: oklch(0% 0 0deg)) {\n\t[mol_theme='$mol_theme_ainews_light'],\n\t:where([mol_theme='$mol_theme_ainews_light']) [mol_theme] {\n\t\t--mol_theme_back: #f7f3e9;\n\t\t--mol_theme_card: #fbf8f180;\n\t\t--mol_theme_field: #efe8d8bf;\n\t\t--mol_theme_hover: #ded7c81a;\n\n\t\t--mol_theme_text: #22211f;\n\t\t--mol_theme_shade: #6e6a62;\n\t\t--mol_theme_line: #ded7c840;\n\t\t--mol_theme_focus: #3b5aad;\n\n\t\t--mol_theme_control: #3b5aad;\n\t\t--mol_theme_current: #92734b;\n\t\t--mol_theme_special: #c7b18c;\n\t}\n}\n\n/* HomeRent dark theme */\n[mol_theme='$mol_theme_homerent_dark'],\n:where([mol_theme='$mol_theme_homerent_dark']) [mol_theme] {\n\t--mol_theme_luma: -1;\n\t--mol_theme_image: invert(1) hue-rotate(180deg);\n\t--mol_theme_spirit: rgba(0, 0, 0, 0.6);\n\n\t--mol_theme_back: #2f2f2f;\n\t--mol_theme_background: #f5f5f5;\n\t--mol_theme_card: #3a3a3a;\n\t--mol_theme_field: #3a3a3a;\n\t--mol_theme_hover: rgba(255, 255, 255, 0.06);\n\n\t--mol_theme_text: #f5f5f5;\n\t--mol_theme_shade: #c7c7c7;\n\t--mol_theme_line: #ffffff26;\n\t--mol_theme_focus: #8fc32b;\n\n\t--mol_theme_control: #dbe05b;\n\t--mol_theme_current: #8fc32b;\n\t--mol_theme_special: #8fc32b;\n}\n\n@supports (color: oklch(0% 0 0deg)) {\n\t[mol_theme='$mol_theme_homerent_dark'],\n\t:where([mol_theme='$mol_theme_homerent_dark']) [mol_theme] {\n\t\t--mol_theme_back: #2f2f2f;\n\t\t--mol_theme_background: #f5f5f5;\n\t\t--mol_theme_card: #3a3a3a;\n\t\t--mol_theme_field: #3a3a3a;\n\t\t--mol_theme_hover: rgba(255, 255, 255, 0.06);\n\n\t\t--mol_theme_text: #f5f5f5;\n\t\t--mol_theme_shade: #c7c7c7;\n\t\t--mol_theme_line: #ffffff26;\n\t\t--mol_theme_focus: #8fc32b;\n\n\t\t--mol_theme_control: #dbe05b;\n\t\t--mol_theme_current: #8fc32b;\n\t\t--mol_theme_special: #8fc32b;\n\t}\n}\n\n/* HomeRent light theme */\n[mol_theme='$mol_theme_homerent_light'],\n:where([mol_theme='$mol_theme_homerent_light']) [mol_theme] {\n\t--mol_theme_luma: 1;\n\t--mol_theme_image: none;\n\t--mol_theme_spirit: rgba(245, 245, 245, 0.75);\n\n\t--mol_theme_back: #ffffff;\n\t--mol_theme_background: #f5f5f5;\n\t--mol_theme_card: #ffffff;\n\t--mol_theme_field: #ffffff;\n\t--mol_theme_hover: #8fc32b1a;\n\n\t--mol_theme_text: #4c4c4c;\n\t--mol_theme_shade: #707070;\n\t--mol_theme_line: #4c4c4c26;\n\t--mol_theme_focus: #8fc32b;\n\n\t--mol_theme_control: #dbe05b;\n\t--mol_theme_current: #8fc32b;\n\t--mol_theme_special: #8fc32b;\n}\n\n@supports (color: oklch(0% 0 0deg)) {\n\t[mol_theme='$mol_theme_homerent_light'],\n\t:where([mol_theme='$mol_theme_homerent_light']) [mol_theme] {\n\t\t--mol_theme_back: #ffffff;\n\t\t--mol_theme_background: #f5f5f5;\n\t\t--mol_theme_card: #ffffff;\n\t\t--mol_theme_field: #ffffff;\n\t\t--mol_theme_hover: #8fc32b1a;\n\n\t\t--mol_theme_text: #4c4c4c;\n\t\t--mol_theme_shade: #707070;\n\t\t--mol_theme_line: #4c4c4c26;\n\t\t--mol_theme_focus: #8fc32b;\n\n\t\t--mol_theme_control: #dbe05b;\n\t\t--mol_theme_current: #8fc32b;\n\t\t--mol_theme_special: #8fc32b;\n\t}\n}\n\n/* Giper Smash dark theme - original game palette */\n[mol_theme='$mol_theme_giper_smash_dark'],\n:where([mol_theme='$mol_theme_giper_smash_dark']) [mol_theme] {\n\t--mol_theme_luma: -1;\n\t--mol_theme_image: invert(1) hue-rotate(180deg);\n\t--mol_theme_spirit: rgba(0, 0, 0, 0.85);\n\n\t--mol_theme_back: #1a1a2e;\n\t--mol_theme_card: #2d2d44;\n\t--mol_theme_field: #16213e;\n\t--mol_theme_hover: rgba(118, 75, 162, 0.15);\n\n\t--mol_theme_text: #ffffff;\n\t--mol_theme_shade: #b0b0cc;\n\t--mol_theme_line: rgba(255, 255, 255, 0.12);\n\t--mol_theme_focus: #f5b041;\n\n\t--mol_theme_control: #44a08d;\n\t--mol_theme_current: #0088cc;\n\t--mol_theme_special: #764ba2;\n}\n\n/* Giper Smash light theme - bright game palette */\n[mol_theme='$mol_theme_giper_smash_light'],\n:where([mol_theme='$mol_theme_giper_smash_light']) [mol_theme] {\n\t--mol_theme_luma: 1;\n\t--mol_theme_image: none;\n\t--mol_theme_spirit: rgba(255, 255, 255, 0.85);\n\n\t--mol_theme_back: #f0eef5;\n\t--mol_theme_card: #ffffff;\n\t--mol_theme_field: #e8e5f0;\n\t--mol_theme_hover: rgba(118, 75, 162, 0.08);\n\n\t--mol_theme_text: #1a1a2e;\n\t--mol_theme_shade: #5c5c7a;\n\t--mol_theme_line: rgba(26, 26, 46, 0.12);\n\t--mol_theme_focus: #d4941a;\n\n\t--mol_theme_control: #2e8b73;\n\t--mol_theme_current: #0077b3;\n\t--mol_theme_special: #6a3d99;\n}\n\n/* Monefro dark theme - inspired by Monefy */\n[mol_theme='$mol_theme_monefro_dark'],\n:where([mol_theme='$mol_theme_monefro_dark']) [mol_theme] {\n\t--mol_theme_luma: -1;\n\t--mol_theme_image: invert(1) hue-rotate(180deg);\n\t--mol_theme_spirit: rgba(0, 0, 0, 0.6);\n\n\t--mol_theme_back: #24201c;\n\t--mol_theme_card: #2c2722;\n\t--mol_theme_field: #29241f;\n\t--mol_theme_hover: rgba(255, 255, 255, 0.04);\n\n\t--mol_theme_text: #f0e7dc;\n\t--mol_theme_shade: #b5a99c;\n\t--mol_theme_line: rgba(255, 255, 255, 0.12);\n\t--mol_theme_focus: #56c78a;\n\n\t--mol_theme_control: #56c78a;\n\t--mol_theme_current: #f2776e;\n\t--mol_theme_special: #f6b04a;\n}\n\n@supports (color: oklch(0% 0 0deg)) {\n\t[mol_theme='$mol_theme_monefro_dark'],\n\t:where([mol_theme='$mol_theme_monefro_dark']) [mol_theme] {\n\t\t--mol_theme_back: #24201c;\n\t\t--mol_theme_card: #2c2722;\n\t\t--mol_theme_field: #29241f;\n\t\t--mol_theme_hover: rgba(255, 255, 255, 0.04);\n\n\t\t--mol_theme_text: #f0e7dc;\n\t\t--mol_theme_shade: #b5a99c;\n\t\t--mol_theme_line: rgba(255, 255, 255, 0.12);\n\t\t--mol_theme_focus: #56c78a;\n\n\t\t--mol_theme_control: #56c78a;\n\t\t--mol_theme_current: #f2776e;\n\t\t--mol_theme_special: #f6b04a;\n\t}\n}\n\n/* Monefro light theme - inspired by Monefy */\n[mol_theme='$mol_theme_monefro_light'],\n:where([mol_theme='$mol_theme_monefro_light']) [mol_theme] {\n\t--mol_theme_luma: 1;\n\t--mol_theme_image: none;\n\t--mol_theme_spirit: rgba(255, 255, 255, 0.75);\n\n\t--mol_theme_back: #f6f2ea;\n\t--mol_theme_card: #ffffff;\n\t--mol_theme_field: #fff8ef;\n\t--mol_theme_hover: rgba(0, 0, 0, 0.04);\n\n\t--mol_theme_text: #3f3b36;\n\t--mol_theme_shade: #8b8278;\n\t--mol_theme_line: rgba(64, 55, 46, 0.15);\n\t--mol_theme_focus: #2f9a6a;\n\n\t--mol_theme_control: #2f9a6a;\n\t--mol_theme_current: #e85b54;\n\t--mol_theme_special: #f3a43b;\n}\n\n@supports (color: oklch(0% 0 0deg)) {\n\t[mol_theme='$mol_theme_monefro_light'],\n\t:where([mol_theme='$mol_theme_monefro_light']) [mol_theme] {\n\t\t--mol_theme_back: #f6f2ea;\n\t\t--mol_theme_card: #ffffff;\n\t\t--mol_theme_field: #fff8ef;\n\t\t--mol_theme_hover: rgba(0, 0, 0, 0.04);\n\n\t\t--mol_theme_text: #3f3b36;\n\t\t--mol_theme_shade: #8b8278;\n\t\t--mol_theme_line: rgba(64, 55, 46, 0.15);\n\t\t--mol_theme_focus: #2f9a6a;\n\n\t\t--mol_theme_control: #2f9a6a;\n\t\t--mol_theme_current: #e85b54;\n\t\t--mol_theme_special: #f3a43b;\n\t}\n}\n\n/* ═══════════════════════════════════════════════════════════════\n   Calm theme — universal working theme (draft for review)\n   Base hue: 230° (blue-gray), spread: 90°\n   Style: quiet, professional, no noise\n   ═══════════════════════════════════════════════════════════════ */\n\n/* Calm dark theme */\n[mol_theme='$mol_theme_calm_dark'],\n:where([mol_theme='$mol_theme_calm_dark']) [mol_theme] {\n\t--mol_theme_luma: -1;\n\t--mol_theme_image: invert(1) hue-rotate(180deg);\n\t--mol_theme_spirit: #000000bf;\n\t--mol_theme_hue: 230deg;\n\t--mol_theme_hue_spread: 90deg;\n\n\t--mol_theme_back: #0d1117;\n\t--mol_theme_card: #161b2240;\n\t--mol_theme_field: #0a0e1440;\n\t--mol_theme_hover: #ffffff0c;\n\n\t--mol_theme_text: #e6edf3;\n\t--mol_theme_shade: #8b949e;\n\t--mol_theme_line: #30363d;\n\t--mol_theme_focus: #d29922;\n\n\t--mol_theme_control: #2f81f7;\n\t--mol_theme_current: #3fb950;\n\t--mol_theme_special: #a371f7;\n}\n\n/* Calm light theme */\n[mol_theme='$mol_theme_calm_light'],\n:where([mol_theme='$mol_theme_calm_light']) [mol_theme] {\n\t--mol_theme_luma: 1;\n\t--mol_theme_image: none;\n\t--mol_theme_spirit: #f7f8fabf;\n\t--mol_theme_hue: 230deg;\n\t--mol_theme_hue_spread: 90deg;\n\n\t--mol_theme_back: #f7f8fa;\n\t--mol_theme_card: #ffffff80;\n\t--mol_theme_field: #e8eaf0bf;\n\t--mol_theme_hover: #0000000a;\n\n\t--mol_theme_text: #1a1c23;\n\t--mol_theme_shade: #656a80;\n\t--mol_theme_line: #3a3e5026;\n\t--mol_theme_focus: #b87518;\n\n\t--mol_theme_control: #3560b8;\n\t--mol_theme_current: #28856e;\n\t--mol_theme_special: #8a4aad;\n}\n\n/* Calm dark sub-themes */\n:where([mol_theme='$mol_theme_calm_dark']) [mol_theme='$mol_theme_base'] {\n\t--mol_theme_back: #1a2840;\n\t--mol_theme_card: #243450;\n}\n:where([mol_theme='$mol_theme_calm_dark']) [mol_theme='$mol_theme_current'] {\n\t--mol_theme_back: #143028;\n\t--mol_theme_card: #1c3e3450;\n}\n:where([mol_theme='$mol_theme_calm_dark']) [mol_theme='$mol_theme_special'] {\n\t--mol_theme_back: #2a1c48;\n\t--mol_theme_card: #3a2a5c50;\n}\n:where([mol_theme='$mol_theme_calm_dark']) [mol_theme='$mol_theme_accent'] {\n\t--mol_theme_back: #3a1c2a;\n\t--mol_theme_card: #4c283a50;\n}\n\n:where([mol_theme='$mol_theme_calm_light']) [mol_theme='$mol_theme_base'] {\n\t--mol_theme_back: oklch(85% 0.075 var(--mol_theme_hue));\n\t--mol_theme_card: oklch(98% 0.03 var(--mol_theme_hue) / 0.25);\n}\n:where([mol_theme='$mol_theme_calm_light']) [mol_theme='$mol_theme_current'] {\n\t--mol_theme_back: oklch(85% 0.05 calc(var(--mol_theme_hue) - var(--mol_theme_hue_spread)));\n\t--mol_theme_card: oklch(98% 0.03 calc(var(--mol_theme_hue) - var(--mol_theme_hue_spread)) / 0.25);\n}\n:where([mol_theme='$mol_theme_calm_light']) [mol_theme='$mol_theme_special'] {\n\t--mol_theme_back: oklch(85% 0.05 calc(var(--mol_theme_hue) + var(--mol_theme_hue_spread)));\n\t--mol_theme_card: oklch(98% 0.03 calc(var(--mol_theme_hue) + var(--mol_theme_hue_spread)) / 0.25);\n}\n:where([mol_theme='$mol_theme_calm_light']) [mol_theme='$mol_theme_accent'] {\n\t--mol_theme_back: oklch(83% 0.1 calc(var(--mol_theme_hue) + 180deg));\n\t--mol_theme_card: oklch(98% 0.03 calc(var(--mol_theme_hue) + 180deg) / 0.25);\n}\n");
})($ || ($ = {}));

;
	($.$bog_theme_auto) = class $bog_theme_auto extends ($.$mol_plugin) {
		themes_default(){
			return [];
		}
		theme(){
			return "";
		}
		themes(){
			return (this.themes_default());
		}
		theme_light(){
			return "$mol_theme_light";
		}
		theme_dark(){
			return "$mol_theme_dark";
		}
		theme_next(next){
			if(next !== undefined) return next;
			return null;
		}
		theme_prev(next){
			if(next !== undefined) return next;
			return null;
		}
		theme_set(next){
			if(next !== undefined) return next;
			return null;
		}
		attr(){
			return {"mol_theme": (this.theme())};
		}
	};
	($mol_mem(($.$bog_theme_auto.prototype), "theme_next"));
	($mol_mem(($.$bog_theme_auto.prototype), "theme_prev"));
	($mol_mem(($.$bog_theme_auto.prototype), "theme_set"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_theme_auto extends $.$bog_theme_auto {
            themes_default() {
                return this.$.$bog_theme_names;
            }
            theme_index(next) {
                const stored = this.$.$mol_state_local.value(`${this}.theme_index()`, next);
                if (stored === null && next === undefined) {
                    return this.system_theme_index();
                }
                return stored ?? 0;
            }
            system_theme_index() {
                const themes = this.themes();
                const prefersLight = this.$.$mol_lights();
                const preferredTheme = prefersLight ? this.theme_light() : this.theme_dark();
                const index = themes.indexOf(preferredTheme);
                return index !== -1 ? index : 0;
            }
            theme() {
                const themes = this.themes();
                const index = this.theme_index();
                if (themes.length === 0)
                    return '$mol_theme_light';
                return themes[index % themes.length];
            }
            theme_next() {
                const themes = this.themes();
                if (themes.length === 0)
                    return;
                const current = this.theme_index();
                this.theme_index((current + 1) % themes.length);
            }
            theme_prev() {
                const themes = this.themes();
                if (themes.length === 0)
                    return;
                const current = this.theme_index();
                this.theme_index(current === 0 ? themes.length - 1 : current - 1);
            }
            theme_set(index) {
                const themes = this.themes();
                if (themes.length === 0)
                    return;
                this.theme_index(index % themes.length);
            }
        }
        __decorate([
            $mol_mem
        ], $bog_theme_auto.prototype, "theme_index", null);
        __decorate([
            $mol_mem
        ], $bog_theme_auto.prototype, "system_theme_index", null);
        __decorate([
            $mol_mem
        ], $bog_theme_auto.prototype, "theme", null);
        __decorate([
            $mol_action
        ], $bog_theme_auto.prototype, "theme_next", null);
        __decorate([
            $mol_action
        ], $bog_theme_auto.prototype, "theme_prev", null);
        __decorate([
            $mol_action
        ], $bog_theme_auto.prototype, "theme_set", null);
        $$.$bog_theme_auto = $bog_theme_auto;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_icon_brightness_4) = class $mol_icon_brightness_4 extends ($.$mol_icon) {
		path(){
			return "M12,18C11.11,18 10.26,17.8 9.5,17.45C11.56,16.5 13,14.42 13,12C13,9.58 11.56,7.5 9.5,6.55C10.26,6.2 11.11,6 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z";
		}
	};


;
"use strict";

;
	($.$bog_theme_picker_row) = class $bog_theme_picker_row extends ($.$mol_button_minor) {
		focused_str(){
			return "";
		}
		hover(next){
			if(next !== undefined) return next;
			return null;
		}
		theme_name(){
			return "";
		}
		title(){
			return (this.theme_name());
		}
		attr(){
			return {...(super.attr()), "bog_theme_picker_row_focused": (this.focused_str())};
		}
		event(){
			return {...(super.event()), "pointerenter": (next) => (this.hover(next))};
		}
	};
	($mol_mem(($.$bog_theme_picker_row.prototype), "hover"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_theme_picker_row extends $.$bog_theme_picker_row {
            focused_str() {
                return this.focused() ? 'true' : '';
            }
        }
        $$.$bog_theme_picker_row = $bog_theme_picker_row;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($bog_theme_picker_row, {
            '@': {
                bog_theme_picker_row_focused: {
                    true: {
                        background: {
                            color: $mol_theme.hover,
                        },
                        boxShadow: `inset 0 0 0 1px #000, inset 0 0 0 2px #fff`,
                    },
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$bog_theme_picker) = class $bog_theme_picker extends ($.$mol_scroll) {
		theme_name(id){
			return "";
		}
		theme_focused(id){
			return false;
		}
		theme_select(id, next){
			if(next !== undefined) return next;
			return null;
		}
		theme_hover(id, next){
			if(next !== undefined) return next;
			return null;
		}
		Search(){
			const obj = new this.$.$mol_string();
			(obj.value) = (next) => ((this.query(next)));
			(obj.hint) = () => ((this.$.$mol_locale.text("$bog_theme_picker_Search_hint")));
			return obj;
		}
		theme_rows(){
			return [];
		}
		Theme_list(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.theme_rows()));
			return obj;
		}
		Content(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([(this.Search()), (this.Theme_list())]);
			return obj;
		}
		key_down(next){
			if(next !== undefined) return next;
			return null;
		}
		theme_auto(){
			const obj = new this.$.$bog_theme_auto();
			return obj;
		}
		close(next){
			if(next !== undefined) return next;
			return null;
		}
		query(next){
			if(next !== undefined) return next;
			return "";
		}
		focused_index(next){
			if(next !== undefined) return next;
			return -1;
		}
		Theme_row(id){
			const obj = new this.$.$bog_theme_picker_row();
			(obj.theme_name) = () => ((this.theme_name(id)));
			(obj.focused) = () => ((this.theme_focused(id)));
			(obj.click) = (next) => ((this.theme_select(id, next)));
			(obj.hover) = (next) => ((this.theme_hover(id, next)));
			return obj;
		}
		sub(){
			return [(this.Content())];
		}
		event(){
			return {...(super.event()), "keydown": (next) => (this.key_down(next))};
		}
	};
	($mol_mem_key(($.$bog_theme_picker.prototype), "theme_select"));
	($mol_mem_key(($.$bog_theme_picker.prototype), "theme_hover"));
	($mol_mem(($.$bog_theme_picker.prototype), "Search"));
	($mol_mem(($.$bog_theme_picker.prototype), "Theme_list"));
	($mol_mem(($.$bog_theme_picker.prototype), "Content"));
	($mol_mem(($.$bog_theme_picker.prototype), "key_down"));
	($mol_mem(($.$bog_theme_picker.prototype), "theme_auto"));
	($mol_mem(($.$bog_theme_picker.prototype), "close"));
	($mol_mem(($.$bog_theme_picker.prototype), "query"));
	($mol_mem(($.$bog_theme_picker.prototype), "focused_index"));
	($mol_mem_key(($.$bog_theme_picker.prototype), "Theme_row"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_theme_picker extends $.$bog_theme_picker {
            theme_rows() {
                const themes = this.filtered_themes();
                return themes.map((_, index) => this.Theme_row(index));
            }
            filtered_themes() {
                const query = this.query().toLowerCase().trim();
                const themes = this.$.$bog_theme_names;
                const filtered = query ? themes.filter(name => name.toLowerCase().includes(query)) : [...themes];
                const current = this.focused_index();
                if (current >= filtered.length) {
                    this.focused_index(-1);
                }
                return filtered;
            }
            theme_name(index) {
                return this.filtered_themes()[index] || '';
            }
            theme_focused(index) {
                return this.focused_index() === index;
            }
            theme_select(index, event) {
                if (!event)
                    return null;
                const themes = this.filtered_themes();
                const theme_name = themes[index];
                const global_index = this.$.$bog_theme_names.indexOf(theme_name);
                if (global_index !== -1) {
                    this.theme_auto().theme_set(global_index);
                }
                this.close();
                return null;
            }
            theme_hover(index, event) {
                if (!event)
                    return null;
                this.focused_index(index);
                const themes = this.filtered_themes();
                const theme_name = themes[index];
                const global_index = this.$.$bog_theme_names.indexOf(theme_name);
                if (global_index !== -1) {
                    this.theme_auto().theme_set(global_index);
                }
                return null;
            }
            key_down(event) {
                if (!event)
                    return null;
                const themes = this.filtered_themes();
                let current = this.focused_index();
                switch (event.key) {
                    case 'ArrowDown':
                        event.preventDefault();
                        event.stopPropagation();
                        if (current === -1) {
                            current = 0;
                        }
                        else {
                            current = current < themes.length - 1 ? current + 1 : 0;
                        }
                        this.focused_index(current);
                        this.preview_theme(current);
                        break;
                    case 'ArrowUp':
                        event.preventDefault();
                        event.stopPropagation();
                        if (current === -1) {
                            current = themes.length - 1;
                        }
                        else {
                            current = current > 0 ? current - 1 : themes.length - 1;
                        }
                        this.focused_index(current);
                        this.preview_theme(current);
                        break;
                    case 'Enter':
                        event.preventDefault();
                        if (current >= 0 && current < themes.length) {
                            this.select_theme(current);
                        }
                        break;
                    case 'Escape':
                        event.preventDefault();
                        this.close();
                        break;
                }
                return null;
            }
            select_theme(index) {
                const themes = this.filtered_themes();
                const theme_name = themes[index];
                const global_index = this.$.$bog_theme_names.indexOf(theme_name);
                if (global_index !== -1) {
                    this.theme_auto().theme_set(global_index);
                }
                this.close();
            }
            preview_theme(index) {
                const themes = this.filtered_themes();
                const theme_name = themes[index];
                const global_index = this.$.$bog_theme_names.indexOf(theme_name);
                if (global_index !== -1) {
                    this.theme_auto().theme_set(global_index);
                }
            }
        }
        __decorate([
            $mol_mem
        ], $bog_theme_picker.prototype, "theme_rows", null);
        __decorate([
            $mol_mem
        ], $bog_theme_picker.prototype, "filtered_themes", null);
        __decorate([
            $mol_action
        ], $bog_theme_picker.prototype, "select_theme", null);
        __decorate([
            $mol_action
        ], $bog_theme_picker.prototype, "preview_theme", null);
        $$.$bog_theme_picker = $bog_theme_picker;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($bog_theme_picker, {
            background: {
                color: $mol_theme.back,
            },
            borderRadius: '8px',
            overflow: 'hidden',
            opacity: 1,
            Search: {
                borderRadius: '8px',
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$bog_theme_toggle) = class $bog_theme_toggle extends ($.$mol_pop) {
		Icon(){
			const obj = new this.$.$mol_icon_brightness_4();
			return obj;
		}
		clicked(next){
			if(next !== undefined) return next;
			return null;
		}
		press_start(next){
			if(next !== undefined) return next;
			return null;
		}
		press_move(next){
			if(next !== undefined) return next;
			return null;
		}
		press_end(next){
			if(next !== undefined) return next;
			return null;
		}
		press_cancel(next){
			if(next !== undefined) return next;
			return null;
		}
		press_lost(next){
			if(next !== undefined) return next;
			return null;
		}
		backdrop_click(next){
			if(next !== undefined) return next;
			return null;
		}
		Backdrop(){
			const obj = new this.$.$mol_view();
			(obj.event) = () => ({"click": (next) => (this.backdrop_click(next))});
			return obj;
		}
		picker_close(next){
			if(next !== undefined) return next;
			return null;
		}
		Picker(){
			const obj = new this.$.$bog_theme_picker();
			(obj.theme_auto) = () => ((this.theme_auto()));
			(obj.close) = (next) => ((this.picker_close(next)));
			return obj;
		}
		theme_auto(){
			const obj = new this.$.$bog_theme_auto();
			return obj;
		}
		showed(next){
			if(next !== undefined) return next;
			return false;
		}
		align(){
			return "bottom_right";
		}
		Anchor(){
			const obj = new this.$.$mol_button_minor();
			(obj.sub) = () => ([(this.Icon())]);
			(obj.hint) = () => ((this.$.$mol_locale.text("$bog_theme_toggle_Anchor_hint")));
			(obj.click) = (next) => ((this.clicked(next)));
			(obj.event) = () => ({
				...(this.$.$mol_button_minor.prototype.event.call(obj)), 
				"pointerdown": (next) => (this.press_start(next)), 
				"pointermove": (next) => (this.press_move(next)), 
				"pointerup": (next) => (this.press_end(next)), 
				"pointercancel": (next) => (this.press_cancel(next)), 
				"lostpointercapture": (next) => (this.press_lost(next))
			});
			return obj;
		}
		bubble_content(){
			return [(this.Backdrop()), (this.Picker())];
		}
	};
	($mol_mem(($.$bog_theme_toggle.prototype), "Icon"));
	($mol_mem(($.$bog_theme_toggle.prototype), "clicked"));
	($mol_mem(($.$bog_theme_toggle.prototype), "press_start"));
	($mol_mem(($.$bog_theme_toggle.prototype), "press_move"));
	($mol_mem(($.$bog_theme_toggle.prototype), "press_end"));
	($mol_mem(($.$bog_theme_toggle.prototype), "press_cancel"));
	($mol_mem(($.$bog_theme_toggle.prototype), "press_lost"));
	($mol_mem(($.$bog_theme_toggle.prototype), "backdrop_click"));
	($mol_mem(($.$bog_theme_toggle.prototype), "Backdrop"));
	($mol_mem(($.$bog_theme_toggle.prototype), "picker_close"));
	($mol_mem(($.$bog_theme_toggle.prototype), "Picker"));
	($mol_mem(($.$bog_theme_toggle.prototype), "theme_auto"));
	($mol_mem(($.$bog_theme_toggle.prototype), "showed"));
	($mol_mem(($.$bog_theme_toggle.prototype), "Anchor"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_theme_toggle extends $.$bog_theme_toggle {
            long_press_delay = 300;
            move_threshold = 8;
            press_timer = null;
            press_start_x = 0;
            press_start_y = 0;
            is_long_press = false;
            clicked(event) {
                if (!event)
                    return null;
                if (this.is_long_press) {
                    this.is_long_press = false;
                    return null;
                }
                this.theme_auto().theme_next();
                return null;
            }
            press_start(event) {
                if (!event)
                    return null;
                this.clear_press_timer();
                this.press_start_x = event.clientX;
                this.press_start_y = event.clientY;
                this.is_long_press = false;
                this.press_timer = setTimeout(() => {
                    this.is_long_press = true;
                    this.on_long_press();
                }, this.long_press_delay);
                return null;
            }
            press_move(event) {
                if (!event || !this.press_timer)
                    return null;
                const dx = Math.abs(event.clientX - this.press_start_x);
                const dy = Math.abs(event.clientY - this.press_start_y);
                if (dx > this.move_threshold || dy > this.move_threshold) {
                    this.clear_press_timer();
                }
                return null;
            }
            press_end(event) {
                if (!event)
                    return null;
                this.clear_press_timer();
                return null;
            }
            press_cancel(event) {
                if (!event)
                    return null;
                this.clear_press_timer();
                return null;
            }
            press_lost(event) {
                if (!event)
                    return null;
                this.clear_press_timer();
                return null;
            }
            clear_press_timer() {
                if (this.press_timer) {
                    clearTimeout(this.press_timer);
                    this.press_timer = null;
                }
            }
            on_long_press() {
                this.showed(true);
                setTimeout(() => {
                    try {
                        const search = this.Picker().Search();
                        search.focused(true);
                    }
                    catch (e) {
                    }
                }, 100);
            }
            picker_close() {
                this.showed(false);
            }
            backdrop_click(event) {
                if (!event)
                    return null;
                this.showed(false);
                return null;
            }
        }
        $$.$bog_theme_toggle = $bog_theme_toggle;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($bog_theme_toggle, {
            Bubble: {
                position: 'fixed !important',
                left: '0 !important',
                top: '0 !important',
                transform: 'none !important',
                width: '100vw !important',
                height: '100vh !important',
                maxWidth: 'none !important',
                maxHeight: 'none !important',
                padding: '0 !important',
                boxShadow: 'none',
                background: 'transparent !important',
            },
            Backdrop: {
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 1,
                opacity: 0,
            },
            Picker: {
                position: 'fixed',
                left: '50%',
                top: '15vh',
                transform: 'translateX(-50%)',
                maxWidth: '400px',
                width: '90vw',
                maxHeight: '70vh',
                zIndex: 2,
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_stack) = class $mol_stack extends ($.$mol_view) {};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/stack/stack.view.css", "[mol_stack] {\n\tdisplay: grid;\n\t/* width: max-content; */\n\t/* height: max-content; */\n\talign-items: flex-start;\n\tjustify-items: flex-start;\n}\n\n[mol_stack] > * {\n\tgrid-area: 1/1;\n}\n");
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    class $mol_syntax2 {
        lexems;
        constructor(lexems) {
            this.lexems = lexems;
            for (let name in lexems) {
                this.rules.push({
                    name: name,
                    regExp: lexems[name],
                    size: RegExp('^$|' + lexems[name].source).exec('').length - 1,
                });
            }
            const parts = '(' + this.rules.map(rule => rule.regExp.source).join(')|(') + ')';
            this.regexp = RegExp(`([\\s\\S]*?)(?:(${parts})|$(?![^]))`, 'gmu');
        }
        rules = [];
        regexp;
        tokenize(text, handle) {
            let end = 0;
            lexing: while (end < text.length) {
                const start = end;
                this.regexp.lastIndex = start;
                var found = this.regexp.exec(text);
                end = this.regexp.lastIndex;
                if (start === end)
                    throw new Error('Empty token');
                var prefix = found[1];
                if (prefix)
                    handle('', prefix, [prefix], start);
                var suffix = found[2];
                if (!suffix)
                    continue;
                let offset = 4;
                for (let rule of this.rules) {
                    if (found[offset - 1]) {
                        handle(rule.name, suffix, found.slice(offset, offset + rule.size), start + prefix.length);
                        continue lexing;
                    }
                    offset += rule.size + 1;
                }
                $mol_fail(new Error('$mol_syntax2 is broken'));
            }
        }
        parse(text, handlers) {
            this.tokenize(text, (name, ...args) => handlers[name](...args));
        }
    }
    $.$mol_syntax2 = $mol_syntax2;
})($ || ($ = {}));

;
	($.$mol_text_code_token) = class $mol_text_code_token extends ($.$mol_dimmer) {
		type(){
			return "";
		}
		attr(){
			return {...(super.attr()), "mol_text_code_token_type": (this.type())};
		}
	};
	($.$mol_text_code_token_link) = class $mol_text_code_token_link extends ($.$mol_text_code_token) {
		uri(){
			return "";
		}
		dom_name(){
			return "a";
		}
		type(){
			return "code-link";
		}
		attr(){
			return {
				...(super.attr()), 
				"href": (this.uri()), 
				"target": "_blank"
			};
		}
	};


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { hsla } = $mol_style_func;
        $mol_style_define($mol_text_code_token, {
            display: 'inline',
            textDecoration: 'none',
            '@': {
                mol_text_code_token_type: {
                    'code-keyword': {
                        color: hsla(0, 70, 60, 1),
                    },
                    'code-field': {
                        color: hsla(300, 70, 50, 1),
                    },
                    'code-tag': {
                        color: hsla(330, 70, 50, 1),
                    },
                    'code-global': {
                        color: hsla(30, 80, 50, 1),
                    },
                    'code-decorator': {
                        color: hsla(180, 40, 50, 1),
                    },
                    'code-punctuation': {
                        color: hsla(0, 0, 50, 1),
                    },
                    'code-string': {
                        color: hsla(90, 40, 50, 1),
                    },
                    'code-number': {
                        color: hsla(55, 65, 45, 1),
                    },
                    'code-call': {
                        color: hsla(270, 60, 50, 1),
                    },
                    'code-link': {
                        color: hsla(210, 60, 50, 1),
                    },
                    'code-comment-inline': {
                        opacity: .5,
                    },
                    'code-comment-block': {
                        opacity: .5,
                    },
                    'code-docs': {
                        opacity: .75,
                    },
                },
            }
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_text_code_line) = class $mol_text_code_line extends ($.$mol_paragraph) {
		numb(){
			return 0;
		}
		token_type(id){
			return "";
		}
		token_text(id){
			return "";
		}
		highlight(){
			return "";
		}
		token_uri(id){
			return "";
		}
		text(){
			return "";
		}
		minimal_height(){
			return 24;
		}
		numb_showed(){
			return true;
		}
		syntax(){
			return null;
		}
		uri_resolve(id){
			return "";
		}
		Numb(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.numb())]);
			return obj;
		}
		Token(id){
			const obj = new this.$.$mol_text_code_token();
			(obj.type) = () => ((this.token_type(id)));
			(obj.haystack) = () => ((this.token_text(id)));
			(obj.needle) = () => ((this.highlight()));
			return obj;
		}
		Token_link(id){
			const obj = new this.$.$mol_text_code_token_link();
			(obj.haystack) = () => ((this.token_text(id)));
			(obj.needle) = () => ((this.highlight()));
			(obj.uri) = () => ((this.token_uri(id)));
			return obj;
		}
		find_pos(id){
			return null;
		}
	};
	($mol_mem(($.$mol_text_code_line.prototype), "Numb"));
	($mol_mem_key(($.$mol_text_code_line.prototype), "Token"));
	($mol_mem_key(($.$mol_text_code_line.prototype), "Token_link"));


;
"use strict";
var $;
(function ($) {
    $.$mol_syntax2_md_flow = new $mol_syntax2({
        'quote': /^((?:(?:[>"] )(?:[^]*?)$(\r?\n?))+)([\n\r]*)/,
        'spoiler': /^((?:(?:[\?] )(?:[^]*?)$(\r?\n?))+)([\n\r]*)/,
        'header': /^([#=]+)(\s+)(.*?)$([\n\r]*)/,
        'list': /^((?:(?: ?([*+-])|(?:\d+[\.\)])+) +(?:[^]*?)$(?:\r?\n?)(?:  (?:[^]*?)$(?:\r?\n?))*)+)((?:\r?\n)*)/,
        'code': /^(```\s*)([\w.-]*)[\r\n]+([^]*?)^(```)$([\n\r]*)/,
        'code-indent': /^((?:(?: |\t)(?:[^]*?)$\r?\n?)+)([\n\r]*)/,
        'table': /((?:^\|.+?$\r?\n?)+)([\n\r]*)/,
        'grid': /((?:^ *! .*?$\r?\n?)+)([\n\r]*)/,
        'cut': /^--+$((?:\r?\n)*)/,
        'block': /^(.*?)$((?:\r?\n)*)/,
    });
    $.$mol_syntax2_md_line = new $mol_syntax2({
        'strong': /\*\*(.+?)\*\*/,
        'emphasis': /\*(?!\s)(.+?)\*|\/\/(?!\s)(.+?)\/\//,
        'code': /```(.+?)```|;;(.+?);;|`(.+?)`/,
        'insert': /\+\+(.+?)\+\+/,
        'delete': /~~(.+?)~~|--(.+?)--/,
        'embed': /""(?:(.*?)\\)?(.*?)""/,
        'link': /\\\\(?:(.*?)\\)?(.*?)\\\\/,
        'image-link': /!\[([^\[\]]*?)\]\((.*?)\)/,
        'text-link': /\[(.*?(?:\[[^\[\]]*?\][^\[\]]*?)*)\]\((.*?)\)/,
        'text-link-http': /\b(https?:\/\/[^\s,.;:!?")]+(?:[,.;:!?")][^\s,.;:!?")]+)+)/,
    });
    $.$mol_syntax2_md_code = new $mol_syntax2({
        'code-indent': /\t+/,
        'code-docs': /\/\/\/.*?$/,
        'code-comment-block': /(?:\/\*[^]*?\*\/|\/\+[^]*?\+\/|<![^]*?>)/,
        'code-link': /(?:\w+:\/\/|#)\S+?(?=\s|\\\\|""|$)/,
        'code-comment-inline': /\/\/.*?(?:$|\/\/)|- \\(?!\\).*|(?<=^| )#!? .*/,
        'code-string': /(?:".*?"|'.*?'|`.*?`| ?\\\\.+?\\\\|\/.+?\/[dygimsu]*(?!\p{Letter})|[ \t]*\\[^\n]*)/u,
        'code-number': /[+-]?(?:\d*\.)?\d+\w*/,
        'code-call': /\.?\w+(?=\()/,
        'code-sexpr': /\((\w+ )/,
        'code-field': /(?:(?<=\.|::|->)[a-z][\w-]*|(?<=[, \t] |\t)[\w-]+\??:(?!\/\/|:))/,
        'code-keyword': /(?<=^|\t|[ )(}{=] )((throw|readonly|unknown|keyof|typeof|never|from|class|struct|interface|type|function|extends|implements|module|namespace|import|export|include|require|var|val|let|const|for|do|while|until|in|out|of|new|if|then|else|switch|case|return|async|await|yield|try|catch|break|continue|get|set|public|private|protected|void|int|float|ref)( |$|;))+/,
        'code-global': /[$]+\w*|\b[A-Z][a-z0-9]+[A-Z]\w*/,
        'code-word': /\w+/,
        'code-decorator': /(?<=^|  |\t)@\s*\S+/,
        'code-tag': /<\/?[\w-]+\/?>?|&\w+;/,
        'code-punctuation': /[\-\[\]\{\}\(\)<=>~!\?@#%&\*_\+\\\/\|;:\.,\^]+?/,
    });
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_text_code_line extends $.$mol_text_code_line {
            maximal_width() {
                return this.text().length * this.letter_width();
            }
            syntax() {
                return this.$.$mol_syntax2_md_code;
            }
            tokens(path) {
                const tokens = [];
                const text = (path.length > 0)
                    ? this.tokens(path.slice(0, path.length - 1))[path[path.length - 1]].found.slice(1, -1)
                    : this.text();
                this.syntax().tokenize(text, (name, found, chunks) => {
                    if (name === 'code-sexpr') {
                        tokens.push({ name: 'code-punctuation', found: '(', chunks: [] });
                        tokens.push({ name: 'code-call', found: chunks[0], chunks: [] });
                    }
                    else {
                        tokens.push({ name, found, chunks });
                    }
                });
                return tokens;
            }
            sub() {
                return [
                    ...this.numb_showed() ? [this.Numb()] : [],
                    ...this.row_content([])
                ];
            }
            row_content(path) {
                const content = this.tokens(path).map((t, i) => this.Token([...path, i]));
                return content.length ? content : ['\n'];
            }
            Token(path) {
                return this.token_type(path) === 'code-link' ? this.Token_link(path) : super.Token(path);
            }
            token_type(path) {
                return this.tokens([...path.slice(0, path.length - 1)])[path[path.length - 1]].name;
            }
            token_content(path) {
                const tokens = this.tokens([...path.slice(0, path.length - 1)]);
                const token = tokens[path[path.length - 1]];
                switch (token.name) {
                    case 'code-string': return [
                        token.found[0],
                        ...this.row_content(path),
                        token.found[token.found.length - 1],
                    ];
                    default: return [token.found];
                }
            }
            token_text(path) {
                const tokens = this.tokens([...path.slice(0, path.length - 1)]);
                const token = tokens[path[path.length - 1]];
                return token.found;
            }
            token_uri(path) {
                const uri = this.token_text(path);
                return this.uri_resolve(uri);
            }
            *view_find(check, path = []) {
                if (check(this, this.text())) {
                    yield [...path, this];
                }
            }
            find_pos(offset) {
                return this.find_token_pos([offset]);
            }
            find_token_pos([offset, ...path]) {
                for (const [index, token] of this.tokens(path).entries()) {
                    if (token.found.length >= offset) {
                        const token = this.Token([...path, index]);
                        return { token, offset };
                    }
                    else {
                        offset -= token.found.length;
                    }
                }
                return null;
            }
        }
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "tokens", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "row_content", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "token_type", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "token_content", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "token_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "token_uri", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "find_pos", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "find_token_pos", null);
        $$.$mol_text_code_line = $mol_text_code_line;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { rem } = $mol_style_unit;
        $mol_style_define($mol_text_code_line, {
            display: 'block',
            position: 'relative',
            font: {
                family: 'monospace',
            },
            Numb: {
                textAlign: 'right',
                color: $mol_theme.shade,
                width: rem(3),
                margin: {
                    left: rem(-4),
                },
                display: 'inline-block',
                whiteSpace: 'nowrap',
                userSelect: 'none',
                position: 'absolute',
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_blob = ($node.buffer?.Blob ?? $mol_dom_context.Blob);
})($ || ($ = {}));

;
	($.$mol_icon_clipboard) = class $mol_icon_clipboard extends ($.$mol_icon) {
		path(){
			return "M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3";
		}
	};


;
"use strict";

;
	($.$mol_icon_clipboard_outline) = class $mol_icon_clipboard_outline extends ($.$mol_icon) {
		path(){
			return "M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7Z";
		}
	};


;
"use strict";

;
	($.$mol_button_copy) = class $mol_button_copy extends ($.$mol_button_minor) {
		text(){
			return (this.title());
		}
		text_blob(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_blob([(this.text())], {"type": "text/plain"});
			return obj;
		}
		html(){
			return "";
		}
		html_blob(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_blob([(this.html())], {"type": "text/html"});
			return obj;
		}
		Icon(){
			const obj = new this.$.$mol_icon_clipboard_outline();
			return obj;
		}
		title(){
			return "";
		}
		blobs(){
			return [(this.text_blob()), (this.html_blob())];
		}
		data(){
			return {};
		}
		sub(){
			return [(this.Icon()), (this.title())];
		}
	};
	($mol_mem(($.$mol_button_copy.prototype), "text_blob"));
	($mol_mem(($.$mol_button_copy.prototype), "html_blob"));
	($mol_mem(($.$mol_button_copy.prototype), "Icon"));


;
"use strict";
var $;
(function ($) {
    const mapping = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '&': '&amp;',
    };
    function $mol_html_encode(text) {
        return text.replace(/[&<">]/gi, str => mapping[str]);
    }
    $.$mol_html_encode = $mol_html_encode;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_button_copy extends $.$mol_button_copy {
            data() {
                return Object.fromEntries(this.blobs().map(blob => [blob.type, blob]));
            }
            html() {
                return $mol_html_encode(this.text());
            }
            attachments() {
                return [new ClipboardItem(this.data())];
            }
            click(event) {
                const cb = $mol_wire_sync(this.$.$mol_dom_context.navigator.clipboard);
                cb.writeText?.(this.text());
                cb.write?.(this.attachments());
                if (cb.writeText === undefined && cb.write === undefined) {
                    throw new Error("doesn't support copy to clipoard");
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_button_copy.prototype, "html", null);
        __decorate([
            $mol_mem
        ], $mol_button_copy.prototype, "attachments", null);
        $$.$mol_button_copy = $mol_button_copy;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_text_code) = class $mol_text_code extends ($.$mol_stack) {
		sidebar_showed(){
			return false;
		}
		render_visible_only(){
			return false;
		}
		row_numb(id){
			return 0;
		}
		row_theme(id){
			return "";
		}
		row_text(id){
			return "";
		}
		syntax(){
			return null;
		}
		uri_resolve(id){
			return "";
		}
		highlight(){
			return "";
		}
		Row(id){
			const obj = new this.$.$mol_text_code_line();
			(obj.numb_showed) = () => ((this.sidebar_showed()));
			(obj.numb) = () => ((this.row_numb(id)));
			(obj.theme) = () => ((this.row_theme(id)));
			(obj.text) = () => ((this.row_text(id)));
			(obj.syntax) = () => ((this.syntax()));
			(obj.uri_resolve) = (id) => ((this.uri_resolve(id)));
			(obj.highlight) = () => ((this.highlight()));
			return obj;
		}
		rows(){
			return [(this.Row("0"))];
		}
		Rows(){
			const obj = new this.$.$mol_list();
			(obj.render_visible_only) = () => ((this.render_visible_only()));
			(obj.rows) = () => ((this.rows()));
			return obj;
		}
		text_export(){
			return "";
		}
		Copy(){
			const obj = new this.$.$mol_button_copy();
			(obj.hint) = () => ((this.$.$mol_locale.text("$mol_text_code_Copy_hint")));
			(obj.text) = () => ((this.text_export()));
			return obj;
		}
		attr(){
			return {...(super.attr()), "mol_text_code_sidebar_showed": (this.sidebar_showed())};
		}
		text(){
			return "";
		}
		text_lines(){
			return [];
		}
		find_pos(id){
			return null;
		}
		uri_base(){
			return "";
		}
		row_themes(){
			return [];
		}
		sub(){
			return [(this.Rows()), (this.Copy())];
		}
	};
	($mol_mem_key(($.$mol_text_code.prototype), "Row"));
	($mol_mem(($.$mol_text_code.prototype), "Rows"));
	($mol_mem(($.$mol_text_code.prototype), "Copy"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_text_code extends $.$mol_text_code {
            render_visible_only() {
                return this.$.$mol_support_css_overflow_anchor();
            }
            text_lines() {
                return (this.text() ?? '').split('\n');
            }
            rows() {
                return this.text_lines().map((_, index) => this.Row(index + 1));
            }
            row_text(index) {
                return this.text_lines()[index - 1];
            }
            row_numb(index) {
                return index;
            }
            find_pos(offset) {
                for (const [index, line] of this.text_lines().entries()) {
                    if (line.length >= offset) {
                        return this.Row(index + 1).find_pos(offset);
                    }
                    else {
                        offset -= line.length + 1;
                    }
                }
                return null;
            }
            sub() {
                return [
                    this.Rows(),
                    ...this.sidebar_showed() ? [this.Copy()] : []
                ];
            }
            syntax() {
                return this.$.$mol_syntax2_md_code;
            }
            uri_base() {
                return $mol_dom_context.document.location.href;
            }
            uri_resolve(uri) {
                if (/^(\w+script+:)+/.test(uri))
                    return null;
                try {
                    const url = new URL(uri, this.uri_base());
                    return url.toString();
                }
                catch (error) {
                    $mol_fail_log(error);
                    return null;
                }
            }
            text_export() {
                return this.text() + '\n';
            }
            row_theme(row) {
                return this.row_themes()[row - 1];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_text_code.prototype, "text_lines", null);
        __decorate([
            $mol_mem
        ], $mol_text_code.prototype, "rows", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code.prototype, "row_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code.prototype, "find_pos", null);
        __decorate([
            $mol_mem
        ], $mol_text_code.prototype, "sub", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code.prototype, "uri_resolve", null);
        $$.$mol_text_code = $mol_text_code;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { rem, px } = $mol_style_unit;
        $mol_style_define($mol_text_code, {
            whiteSpace: 'pre-wrap',
            font: {
                family: 'monospace',
            },
            Rows: {
                padding: $mol_gap.text,
                minWidth: 0,
            },
            Row: {
                font: {
                    family: 'inherit',
                },
            },
            Copy: {
                alignSelf: 'flex-start',
                justifySelf: 'flex-start',
            },
            '@': {
                'mol_text_code_sidebar_showed': {
                    true: {
                        $mol_text_code_line: {
                            margin: {
                                left: rem(1.75),
                            },
                        },
                    },
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_textarea) = class $mol_textarea extends ($.$mol_stack) {
		clickable(next){
			if(next !== undefined) return next;
			return false;
		}
		sidebar_showed(){
			return false;
		}
		press(next){
			if(next !== undefined) return next;
			return null;
		}
		hover(next){
			if(next !== undefined) return next;
			return null;
		}
		value(next){
			if(next !== undefined) return next;
			return "";
		}
		hint(){
			return " ";
		}
		enabled(){
			return true;
		}
		spellcheck(){
			return true;
		}
		length_max(){
			return +Infinity;
		}
		selection(next){
			if(next !== undefined) return next;
			return [];
		}
		bring(){
			return (this.Edit().bring());
		}
		submit(next){
			if(next !== undefined) return next;
			return null;
		}
		submit_with_ctrl(){
			return true;
		}
		Edit(){
			const obj = new this.$.$mol_textarea_edit();
			(obj.value) = (next) => ((this.value(next)));
			(obj.hint) = () => ((this.hint()));
			(obj.enabled) = () => ((this.enabled()));
			(obj.spellcheck) = () => ((this.spellcheck()));
			(obj.length_max) = () => ((this.length_max()));
			(obj.selection) = (next) => ((this.selection(next)));
			(obj.submit) = (next) => ((this.submit(next)));
			(obj.submit_with_ctrl) = () => ((this.submit_with_ctrl()));
			return obj;
		}
		row_numb(id){
			return 0;
		}
		highlight(){
			return "";
		}
		syntax(){
			const obj = new this.$.$mol_syntax2();
			return obj;
		}
		View(){
			const obj = new this.$.$mol_text_code();
			(obj.text) = () => ((this.value()));
			(obj.render_visible_only) = () => (false);
			(obj.row_numb) = (id) => ((this.row_numb(id)));
			(obj.sidebar_showed) = () => ((this.sidebar_showed()));
			(obj.highlight) = () => ((this.highlight()));
			(obj.syntax) = () => ((this.syntax()));
			return obj;
		}
		attr(){
			return {
				...(super.attr()), 
				"mol_textarea_clickable": (this.clickable()), 
				"mol_textarea_sidebar_showed": (this.sidebar_showed())
			};
		}
		event(){
			return {"keydown": (next) => (this.press(next)), "pointermove": (next) => (this.hover(next))};
		}
		sub(){
			return [(this.Edit()), (this.View())];
		}
		symbols_alt(){
			return {
				"comma": "<", 
				"period": ">", 
				"dash": "−", 
				"equals": "≈", 
				"graveAccent": "́", 
				"forwardSlash": "÷", 
				"E": "€", 
				"V": "✔", 
				"X": "×", 
				"C": "©", 
				"P": "§", 
				"H": "₽", 
				"key0": "°", 
				"key8": "•", 
				"key2": "@", 
				"key3": "#", 
				"key4": "$", 
				"key6": "^", 
				"key7": "&", 
				"bracketOpen": "[", 
				"bracketClose": "]", 
				"slashBack": "|"
			};
		}
		symbols_alt_ctrl(){
			return {"space": " "};
		}
		symbols_alt_shift(){
			return {
				"V": "✅", 
				"X": "❌", 
				"O": "⭕", 
				"key1": "❗", 
				"key4": "💲", 
				"key7": "❓", 
				"comma": "«", 
				"period": "»", 
				"semicolon": "“", 
				"quoteSingle": "”", 
				"dash": "—", 
				"equals": "≠", 
				"graveAccent": "̱", 
				"bracketOpen": "{", 
				"bracketClose": "}"
			};
		}
	};
	($mol_mem(($.$mol_textarea.prototype), "clickable"));
	($mol_mem(($.$mol_textarea.prototype), "press"));
	($mol_mem(($.$mol_textarea.prototype), "hover"));
	($mol_mem(($.$mol_textarea.prototype), "value"));
	($mol_mem(($.$mol_textarea.prototype), "selection"));
	($mol_mem(($.$mol_textarea.prototype), "submit"));
	($mol_mem(($.$mol_textarea.prototype), "Edit"));
	($mol_mem(($.$mol_textarea.prototype), "syntax"));
	($mol_mem(($.$mol_textarea.prototype), "View"));
	($.$mol_textarea_edit) = class $mol_textarea_edit extends ($.$mol_string) {
		dom_name(){
			return "textarea";
		}
		enter(){
			return "enter";
		}
		field(){
			return {...(super.field()), "scrollTop": 0};
		}
	};


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_textarea extends $.$mol_textarea {
            indent_inc() {
                let text = this.value();
                let [from, to] = this.selection();
                const rows = text.split('\n');
                let start = 0;
                for (let i = 0; i < rows.length; ++i) {
                    let end = start + rows[i].length;
                    if (end >= from && start <= to) {
                        if (to === from || start !== to) {
                            rows[i] = '\t' + rows[i];
                            to += 1;
                            end += 1;
                        }
                    }
                    start = end + 1;
                }
                this.value(rows.join('\n'));
                this.selection([from + 1, to]);
            }
            indent_dec() {
                let text = this.value();
                let [from, to] = this.selection();
                const rows = text.split('\n');
                let start = 0;
                for (let i = 0; i < rows.length; ++i) {
                    const end = start + rows[i].length;
                    if (end >= from && start <= to && rows[i].startsWith('\t')) {
                        rows[i] = rows[i].slice(1);
                        to -= 1;
                        if (start < from)
                            from -= 1;
                    }
                    start = end + 1;
                }
                this.value(rows.join('\n'));
                this.selection([from, to]);
            }
            symbol_insert(event) {
                const symbol = event.shiftKey
                    ? this.symbols_alt_shift()[$mol_keyboard_code[event.keyCode]]
                    : event.ctrlKey
                        ? this.symbols_alt_ctrl()[$mol_keyboard_code[event.keyCode]]
                        : this.symbols_alt()[$mol_keyboard_code[event.keyCode]];
                if (!symbol)
                    return;
                event.preventDefault();
                document.execCommand('insertText', false, symbol);
            }
            clickable(next) {
                if (!this.enabled())
                    return true;
                return next ?? false;
            }
            hover(event) {
                this.clickable(event.ctrlKey);
            }
            press(event) {
                if (event.altKey) {
                    this.symbol_insert(event);
                }
                else {
                    switch (event.keyCode) {
                        case !event.shiftKey && $mol_keyboard_code.tab:
                            this.indent_inc();
                            break;
                        case event.shiftKey && $mol_keyboard_code.tab:
                            this.indent_dec();
                            break;
                        default: return;
                    }
                    event.preventDefault();
                }
            }
            row_numb(index) {
                return index;
            }
            syntax() {
                return this.$.$mol_syntax2_md_code;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_textarea.prototype, "clickable", null);
        $$.$mol_textarea = $mol_textarea;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/textarea/textarea.view.css", "[mol_textarea] {\n\tflex: 1 0 auto;\n\tflex-direction: column;\n\tvertical-align: top;\n\tmin-height: max-content;\n\twhite-space: pre-wrap;\n\tword-break: break-word;\n\tborder-radius: var(--mol_gap_round);\n\tfont-family: monospace;\n\tposition: relative;\n\ttab-size: 4;\n}\n\n[mol_textarea_view] {\n\tpointer-events: none;\n\twhite-space: inherit;\n\tfont-family: inherit;\n\ttab-size: inherit;\n\tuser-select: none;\n}\n\n[mol_textarea_view_copy] {\n\tpointer-events: all;\n}\n\n[mol_textarea_clickable] > [mol_textarea_view] {\n\tpointer-events: all;\n\tuser-select: auto;\n}\n\n[mol_textarea_clickable] > [mol_textarea_edit] {\n\tuser-select: none;\n}\n\n[mol_textarea_edit] {\n\tfont-family: inherit;\n\tpadding: var(--mol_gap_text);\n\tcolor: transparent !important;\n\tcaret-color: var(--mol_theme_text);\n\tresize: none;\n\ttext-align: inherit;\n\twhite-space: inherit;\n\tborder-radius: inherit;\n\toverflow-anchor: none;\n\tposition: absolute;\n\theight: 100%;\n\twidth: 100%;\n\ttab-size: inherit;\n}\n\n[mol_textarea_sidebar_showed] [mol_textarea_edit] {\n\tleft: 1.75rem;\n\twidth: calc( 100% - 1.75rem );\n}\n\n[mol_textarea_edit]:hover + [mol_textarea_view] {\n\tz-index: var(--mol_layer_hover);\n}\n\n[mol_textarea_edit]:focus + [mol_textarea_view] {\n\tz-index: var(--mol_layer_focus);\n}\n");
})($ || ($ = {}));

;
	($.$mol_float) = class $mol_float extends ($.$mol_view) {
		style(){
			return {...(super.style()), "minHeight": "auto"};
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/float/float.view.css", "[mol_float] {\n\tposition: sticky;\n\ttop: 0;\n\tleft: 0;\n\tz-index: var(--mol_layer_float);\n\topacity: 1;\n\ttransition: opacity .25s ease-in;\n\tdisplay: block;\n\tbackground: linear-gradient( var(--mol_theme_card), var(--mol_theme_card) ), var(--mol_theme_back);\n\tbox-shadow: 0 0 .5rem hsla(0,0%,0%,.25);\n}\n\n");
})($ || ($ = {}));

;
"use strict";

;
	($.$mol_check) = class $mol_check extends ($.$mol_button_minor) {
		checked(next){
			if(next !== undefined) return next;
			return false;
		}
		aria_checked(){
			return "false";
		}
		aria_role(){
			return "checkbox";
		}
		Icon(){
			return null;
		}
		title(){
			return "";
		}
		Title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.title())]);
			return obj;
		}
		label(){
			return [(this.Title())];
		}
		attr(){
			return {
				...(super.attr()), 
				"mol_check_checked": (this.checked()), 
				"aria-checked": (this.aria_checked()), 
				"role": (this.aria_role())
			};
		}
		sub(){
			return [(this.Icon()), (this.label())];
		}
	};
	($mol_mem(($.$mol_check.prototype), "checked"));
	($mol_mem(($.$mol_check.prototype), "Title"));


;
"use strict";
var $;
(function ($) {
    class $mol_dom_event extends $mol_object {
        native;
        constructor(native) {
            super();
            this.native = native;
        }
        prevented(next) {
            if (next)
                this.native.preventDefault();
            return this.native.defaultPrevented;
        }
        static wrap(event) {
            return new this.$.$mol_dom_event(event);
        }
    }
    __decorate([
        $mol_action
    ], $mol_dom_event.prototype, "prevented", null);
    __decorate([
        $mol_action
    ], $mol_dom_event, "wrap", null);
    $.$mol_dom_event = $mol_dom_event;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/check/check.css", "[mol_check] {\n\tflex: 0 0 auto;\n\tjustify-content: flex-start;\n\talign-content: center;\n\t/* align-items: flex-start; */\n\tborder: none;\n\tfont-weight: inherit;\n\tbox-shadow: none;\n\ttext-align: left;\n\tdisplay: inline-flex;\n\tflex-wrap: nowrap;\n}\n\n[mol_check_title] {\n\tflex-shrink: 1;\n}\n");
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_check extends $.$mol_check {
            click(next) {
                const event = next ? $mol_dom_event.wrap(next) : null;
                if (event?.prevented())
                    return;
                event?.prevented(true);
                this.checked(!this.checked());
            }
            sub() {
                return [
                    ...$mol_maybe(this.Icon()),
                    ...this.label(),
                ];
            }
            label() {
                return this.title() ? super.label() : [];
            }
            aria_checked() {
                return String(this.checked());
            }
        }
        $$.$mol_check = $mol_check;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_icon_chevron) = class $mol_icon_chevron extends ($.$mol_icon) {
		path(){
			return "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z";
		}
	};


;
"use strict";

;
	($.$mol_check_expand) = class $mol_check_expand extends ($.$mol_check) {
		level_style(){
			return "0px";
		}
		expanded(next){
			if(next !== undefined) return next;
			return false;
		}
		expandable(){
			return false;
		}
		Icon(){
			const obj = new this.$.$mol_icon_chevron();
			return obj;
		}
		level(){
			return 0;
		}
		style(){
			return {...(super.style()), "paddingLeft": (this.level_style())};
		}
		checked(next){
			return (this.expanded(next));
		}
		enabled(){
			return (this.expandable());
		}
	};
	($mol_mem(($.$mol_check_expand.prototype), "expanded"));
	($mol_mem(($.$mol_check_expand.prototype), "Icon"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_check_expand extends $.$mol_check_expand {
            level_style() {
                return `${this.level() * 1 - 1}rem`;
            }
            expandable() {
                return this.expanded() !== null;
            }
        }
        $$.$mol_check_expand = $mol_check_expand;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/check/expand/expand.view.css", "[mol_check_expand] {\n\tmin-width: 20px;\n}\n\n:where([mol_check_expand][disabled]) [mol_check_expand_icon] {\n\tvisibility: hidden;\n}\n\n[mol_check_expand_icon] {\n\tbox-shadow: none;\n\tmargin-left: -0.375rem;\n}\n[mol_check_expand_icon] {\n\ttransform: rotateZ(0deg);\n}\n\n:where([mol_check_checked]) [mol_check_expand_icon] {\n\ttransform: rotateZ(90deg);\n}\n\n[mol_check_expand_icon] {\n\tvertical-align: text-top;\n}\n\n[mol_check_expand_label] {\n\tmargin-left: 0;\n}\n");
})($ || ($ = {}));

;
	($.$mol_grid) = class $mol_grid extends ($.$mol_view) {
		rows(){
			return [];
		}
		Table(){
			const obj = new this.$.$mol_grid_table();
			(obj.sub) = () => ((this.rows()));
			return obj;
		}
		head_cells(){
			return [];
		}
		cells(id){
			return [];
		}
		cell_content(id){
			return [];
		}
		cell_content_text(id){
			return (this.cell_content(id));
		}
		cell_content_number(id){
			return (this.cell_content(id));
		}
		col_head_content(id){
			return [];
		}
		cell_level(id){
			return 0;
		}
		cell_expanded(id, next){
			if(next !== undefined) return next;
			return false;
		}
		needle(){
			return "";
		}
		cell_value(id){
			return "";
		}
		Cell_dimmer(id){
			const obj = new this.$.$mol_dimmer();
			(obj.needle) = () => ((this.needle()));
			(obj.haystack) = () => ((this.cell_value(id)));
			return obj;
		}
		row_height(){
			return 32;
		}
		row_ids(){
			return [];
		}
		row_id(id){
			return null;
		}
		col_ids(){
			return [];
		}
		records(){
			return {};
		}
		record(id){
			return null;
		}
		hierarchy(){
			return null;
		}
		hierarchy_col(){
			return "";
		}
		minimal_width(){
			return 0;
		}
		sub(){
			return [(this.Head()), (this.Table())];
		}
		Head(){
			const obj = new this.$.$mol_grid_row();
			(obj.cells) = () => ((this.head_cells()));
			return obj;
		}
		Row(id){
			const obj = new this.$.$mol_grid_row();
			(obj.minimal_height) = () => ((this.row_height()));
			(obj.minimal_width) = () => ((this.minimal_width()));
			(obj.cells) = () => ((this.cells(id)));
			return obj;
		}
		Cell(id){
			const obj = new this.$.$mol_view();
			return obj;
		}
		cell(id){
			return null;
		}
		Cell_text(id){
			const obj = new this.$.$mol_grid_cell();
			(obj.sub) = () => ((this.cell_content_text(id)));
			return obj;
		}
		Cell_number(id){
			const obj = new this.$.$mol_grid_number();
			(obj.sub) = () => ((this.cell_content_number(id)));
			return obj;
		}
		Col_head(id){
			const obj = new this.$.$mol_float();
			(obj.dom_name) = () => ("th");
			(obj.sub) = () => ((this.col_head_content(id)));
			return obj;
		}
		Cell_branch(id){
			const obj = new this.$.$mol_check_expand();
			(obj.level) = () => ((this.cell_level(id)));
			(obj.label) = () => ((this.cell_content(id)));
			(obj.expanded) = (next) => ((this.cell_expanded(id, next)));
			return obj;
		}
		Cell_content(id){
			return [(this.Cell_dimmer(id))];
		}
	};
	($mol_mem(($.$mol_grid.prototype), "Table"));
	($mol_mem_key(($.$mol_grid.prototype), "cell_expanded"));
	($mol_mem_key(($.$mol_grid.prototype), "Cell_dimmer"));
	($mol_mem(($.$mol_grid.prototype), "Head"));
	($mol_mem_key(($.$mol_grid.prototype), "Row"));
	($mol_mem_key(($.$mol_grid.prototype), "Cell"));
	($mol_mem_key(($.$mol_grid.prototype), "Cell_text"));
	($mol_mem_key(($.$mol_grid.prototype), "Cell_number"));
	($mol_mem_key(($.$mol_grid.prototype), "Col_head"));
	($mol_mem_key(($.$mol_grid.prototype), "Cell_branch"));
	($.$mol_grid_table) = class $mol_grid_table extends ($.$mol_list) {};
	($.$mol_grid_row) = class $mol_grid_row extends ($.$mol_view) {
		cells(){
			return [];
		}
		sub(){
			return (this.cells());
		}
	};
	($.$mol_grid_cell) = class $mol_grid_cell extends ($.$mol_view) {
		minimal_height(){
			return 40;
		}
	};
	($.$mol_grid_number) = class $mol_grid_number extends ($.$mol_grid_cell) {};


;
"use strict";
var $;
(function ($) {
    class $mol_state_session extends $mol_object {
        static 'native()';
        static native() {
            if (this['native()'])
                return this['native()'];
            check: try {
                const native = $mol_dom_context.sessionStorage;
                if (!native)
                    break check;
                native.setItem('', '');
                native.removeItem('');
                return this['native()'] = native;
            }
            catch (error) {
                console.warn(error);
            }
            return this['native()'] = {
                getItem(key) {
                    return this[':' + key];
                },
                setItem(key, value) {
                    this[':' + key] = value;
                },
                removeItem(key) {
                    this[':' + key] = void 0;
                }
            };
        }
        static value(key, next) {
            if (next === void 0)
                return JSON.parse(this.native().getItem(key) || 'null');
            if (next === null)
                this.native().removeItem(key);
            else
                this.native().setItem(key, JSON.stringify(next));
            return next;
        }
        prefix() { return ''; }
        value(key, next) {
            return $mol_state_session.value(this.prefix() + '.' + key, next);
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_state_session, "value", null);
    $.$mol_state_session = $mol_state_session;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_grid extends $.$mol_grid {
            head_cells() {
                return this.col_ids().map(colId => this.Col_head(colId));
            }
            col_head_content(colId) {
                return [colId];
            }
            rows() {
                return this.row_ids().map(id => this.Row(id));
            }
            cells(row_id) {
                return this.col_ids().map(col_id => this.Cell({ row: row_id, col: col_id }));
            }
            col_type(col_id) {
                if (col_id === this.hierarchy_col())
                    return 'branch';
                const rowFirst = this.row_id(0);
                const val = this.record(rowFirst[rowFirst.length - 1])[col_id];
                if (typeof val === 'number')
                    return 'number';
                return 'text';
            }
            Cell(id) {
                switch (this.col_type(id.col).valueOf()) {
                    case 'branch': return this.Cell_branch(id);
                    case 'number': return this.Cell_number(id);
                }
                return this.Cell_text(id);
            }
            cell_content(id) {
                return [this.record(id.row[id.row.length - 1])[id.col]];
            }
            cell_content_text(id) {
                return this.cell_content(id).map(val => typeof val === 'object' ? JSON.stringify(val) : val);
            }
            records() {
                return [];
            }
            record(id) {
                return this.records()[id];
            }
            record_ids() {
                return Object.keys(this.records());
            }
            row_id(index) {
                return this.row_ids().slice(index, index + 1).valueOf()[0];
            }
            col_ids() {
                const rowFirst = this.row_id(0);
                if (rowFirst === void 0)
                    return [];
                const record = this.record(rowFirst[rowFirst.length - 1]);
                if (!record)
                    return [];
                return Object.keys(record);
            }
            hierarchy() {
                const hierarchy = {};
                const root = hierarchy[''] = {
                    id: '',
                    parent: null,
                    sub: [],
                };
                this.record_ids().map(id => {
                    root.sub.push(hierarchy[id] = {
                        id,
                        parent: root,
                        sub: [],
                    });
                });
                return hierarchy;
            }
            row_sub_ids(row) {
                return this.hierarchy()[row[row.length - 1]].sub.map(child => row.concat(child.id));
            }
            row_root_id() {
                return [''];
            }
            cell_level(id) {
                return id.row.length - 1;
            }
            row_ids() {
                const next = [];
                const add = (row) => {
                    next.push(row);
                    if (this.row_expanded(row)) {
                        this.row_sub_ids(row).forEach(child => add(child));
                    }
                };
                this.row_sub_ids(this.row_root_id()).forEach(child => add(child));
                return next;
            }
            row_expanded(row_id, next) {
                if (!this.row_sub_ids(row_id).length)
                    return null;
                const key = `row_expanded(${JSON.stringify(row_id)})`;
                const next2 = $mol_state_session.value(key, next);
                return (next2 == null) ? this.row_expanded_default(row_id) : next2;
            }
            row_expanded_default(row_id) {
                return true;
            }
            cell_expanded(id, next) {
                return this.row_expanded(id.row, next);
            }
            sub() {
                this.head_cells();
                this.rows();
                return super.sub();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_grid.prototype, "head_cells", null);
        __decorate([
            $mol_mem
        ], $mol_grid.prototype, "rows", null);
        __decorate([
            $mol_mem_key
        ], $mol_grid.prototype, "col_type", null);
        __decorate([
            $mol_mem
        ], $mol_grid.prototype, "record_ids", null);
        __decorate([
            $mol_mem
        ], $mol_grid.prototype, "hierarchy", null);
        __decorate([
            $mol_mem
        ], $mol_grid.prototype, "row_ids", null);
        $$.$mol_grid = $mol_grid;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/grid/grid.view.css", "[mol_grid] {\n\tdisplay: block;\n\tflex: 0 1 auto;\n\tposition: relative;\n\toverflow-x: auto;\n}\n\n[mol_grid_gap] {\n\tposition: absolute;\n\tpadding: .1px;\n\ttop: 0;\n\ttransform: translateZ(0);\n}\n\n[mol_grid_table] {\n\tborder-spacing: 0;\n\tdisplay: table-row-group;\n\tposition: relative;\n}\n\n[mol_grid_table] > * {\n\tdisplay: table-row;\n\ttransition: none;\n}\n\n[mol_grid_head] > *,\n[mol_grid_table] > * > * {\n\tdisplay: table-cell;\n\tpadding: var(--mol_gap_text);\n\twhite-space: nowrap;\n\tvertical-align: middle;\n\tbox-shadow: inset 2px 2px 0 -1px var(--mol_theme_line);\n}\n\n[mol_grid_row]:where(:first-child) > * {\n\tbox-shadow: inset 2px 0 0 -1px var(--mol_theme_line);\n}\n\n[mol_grid_table] > * > *:where(:first-child) {\n\tbox-shadow: inset 0px 2px 0 -1px var(--mol_theme_line);\n}\n\n[mol_grid_head] > * {\n\tbox-shadow: inset 2px -2px 0 -1px var(--mol_theme_line);\n}\n\n[mol_grid_head] > *:where(:first-child) {\n\tbox-shadow: inset 0px -2px 0 -1px var(--mol_theme_line);\n}\n\n[mol_grid_table] > [mol_grid_row]:where(:first-child) > *:where(:first-child) {\n\tbox-shadow: none;\n}\t\n\n[mol_grid_head] {\n\tdisplay: table-row;\n\ttransform: none !important;\n}\n\n/* [mol_grid_cell_number] {\n\ttext-align: right;\n} */\n\n[mol_grid_col_head] {\n\tfont-weight: inherit;\n\ttext-align: inherit;\n\tdisplay: table-cell;\n\tcolor: var(--mol_theme_shade);\n}\n\n[mol_grid_cell_dimmer] {\n\tdisplay: inline-block;\n\tvertical-align: inherit;\n}\n");
})($ || ($ = {}));

;
	($.$mol_image) = class $mol_image extends ($.$mol_view) {
		uri(){
			return "";
		}
		title(){
			return "";
		}
		loading(){
			return "lazy";
		}
		decoding(){
			return "async";
		}
		cors(){
			return null;
		}
		natural_width(){
			return 0;
		}
		natural_height(){
			return 0;
		}
		load(next){
			if(next !== undefined) return next;
			return null;
		}
		dom_name(){
			return "img";
		}
		attr(){
			return {
				...(super.attr()), 
				"src": (this.uri()), 
				"title": (this.hint()), 
				"alt": (this.title()), 
				"loading": (this.loading()), 
				"decoding": (this.decoding()), 
				"crossOrigin": (this.cors()), 
				"width": (this.natural_width()), 
				"height": (this.natural_height())
			};
		}
		event(){
			return {"load": (next) => (this.load(next))};
		}
		minimal_width(){
			return 16;
		}
		minimal_height(){
			return 16;
		}
	};
	($mol_mem(($.$mol_image.prototype), "load"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_image extends $.$mol_image {
            natural_width(next) {
                const dom = this.dom_node();
                if (dom.naturalWidth)
                    return dom.naturalWidth;
                const found = this.uri().match(/\bwidth=(\d+)/);
                return found ? Number(found[1]) : null;
            }
            natural_height(next) {
                const dom = this.dom_node();
                if (dom.naturalHeight)
                    return dom.naturalHeight;
                const found = this.uri().match(/\bheight=(\d+)/);
                return found ? Number(found[1]) : null;
            }
            load() {
                this.natural_width(null);
                this.natural_height(null);
            }
        }
        __decorate([
            $mol_mem
        ], $mol_image.prototype, "natural_width", null);
        __decorate([
            $mol_mem
        ], $mol_image.prototype, "natural_height", null);
        $$.$mol_image = $mol_image;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/image/image.view.css", "[mol_image] {\n\tborder-radius: var(--mol_gap_round);\n\toverflow: hidden;\n\tflex: 0 1 auto;\n\tmax-width: 100%;\n\tobject-fit: cover;\n\theight: fit-content;\n}\n");
})($ || ($ = {}));

;
	($.$mol_link_iconed) = class $mol_link_iconed extends ($.$mol_link) {
		icon(){
			return "";
		}
		Icon(){
			const obj = new this.$.$mol_image();
			(obj.uri) = () => ((this.icon()));
			(obj.title) = () => ("");
			return obj;
		}
		title(){
			return (this.uri());
		}
		sub(){
			return [(this.Icon())];
		}
		content(){
			return [(this.title())];
		}
		host(){
			return "";
		}
	};
	($mol_mem(($.$mol_link_iconed.prototype), "Icon"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_link_iconed extends $.$mol_link_iconed {
            icon() {
                return `https://favicon.yandex.net/favicon/${this.host()}?color=0,0,0,0&size=32&stub=1`;
            }
            host() {
                const base = this.$.$mol_state_arg.href();
                const url = new URL(this.uri(), base);
                return url.hostname;
            }
            title() {
                const uri = this.uri();
                const host = this.host();
                const suffix = (host ? uri.split(this.host(), 2)[1] : uri)?.replace(/^[\/\?#!]+/, '');
                return decodeURIComponent(suffix || host).replace(/^\//, ' ');
            }
            sub() {
                return [
                    ...this.host() ? [this.Icon()] : [],
                    ...this.content() ? [' ', ...this.content()] : [],
                ];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_link_iconed.prototype, "icon", null);
        __decorate([
            $mol_mem
        ], $mol_link_iconed.prototype, "host", null);
        __decorate([
            $mol_mem
        ], $mol_link_iconed.prototype, "title", null);
        __decorate([
            $mol_mem
        ], $mol_link_iconed.prototype, "sub", null);
        $$.$mol_link_iconed = $mol_link_iconed;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/link/iconed/iconed.view.css", "[mol_link_iconed] {\n\talign-items: baseline;\n\tdisplay: inline-flex;\n\tpadding: var(--mol_gap_text);\n}\n\n[mol_link_iconed_icon] {\n\tbox-shadow: none;\n\theight: 1.5em;\n\twidth: 1em;\n\tflex: 0 0 auto;\n\tdisplay: inline-block;\n\talign-self: normal;\n\tvertical-align: top;\n\tborder-radius: 0;\n\tobject-fit: scale-down;\n\topacity: .75;\n}\n\n[mol_theme=\"$mol_theme_dark\"] [mol_link_iconed_icon] {\n\tfilter: var(--mol_theme_image);\n}\n");
})($ || ($ = {}));

;
	($.$mol_embed_native) = class $mol_embed_native extends ($.$mol_scroll) {
		uri(next){
			if(next !== undefined) return next;
			return "about:config";
		}
		title(){
			return "";
		}
		Fallback(){
			const obj = new this.$.$mol_link();
			(obj.uri) = () => ((this.uri()));
			(obj.sub) = () => ([(this.title())]);
			return obj;
		}
		uri_change(next){
			if(next !== undefined) return next;
			return null;
		}
		dom_name(){
			return "iframe";
		}
		window(){
			return null;
		}
		attr(){
			return {...(super.attr()), "src": (this.uri())};
		}
		sub(){
			return [(this.Fallback())];
		}
		message(){
			return {"hashchange": (next) => (this.uri_change(next))};
		}
	};
	($mol_mem(($.$mol_embed_native.prototype), "uri"));
	($mol_mem(($.$mol_embed_native.prototype), "Fallback"));
	($mol_mem(($.$mol_embed_native.prototype), "uri_change"));


;
"use strict";
var $;
(function ($) {
    function $mol_wait_timeout_async(timeout) {
        const promise = new $mol_promise();
        const task = new this.$mol_after_timeout(timeout, () => promise.done());
        return Object.assign(promise, {
            destructor: () => task.destructor()
        });
    }
    $.$mol_wait_timeout_async = $mol_wait_timeout_async;
    function $mol_wait_timeout(timeout) {
        return this.$mol_wire_sync(this).$mol_wait_timeout_async(timeout);
    }
    $.$mol_wait_timeout = $mol_wait_timeout;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_embed_native extends $.$mol_embed_native {
            window() {
                $mol_wire_solid();
                this.uri_resource();
                return $mol_wire_sync(this).load(this.dom_node_actual());
            }
            load(frame) {
                return new Promise((done, fail) => {
                    frame.onload = () => {
                        try {
                            if (frame.contentWindow.location.href === 'about:blank') {
                                return;
                            }
                        }
                        catch { }
                        done(frame.contentWindow);
                    };
                    frame.onerror = (event) => {
                        fail(typeof event === 'string' ? new Error(event) : event.error || event);
                    };
                });
            }
            uri_resource() {
                return this.uri().replace(/#.*/, '');
            }
            message_listener() {
                return new $mol_dom_listener($mol_dom_context, 'message', $mol_wire_async(this).message_receive);
            }
            sub_visible() {
                this.window();
                return super.sub_visible();
            }
            message_receive(event) {
                if (!event)
                    return;
                if (event.source !== this.window())
                    return;
                if (!Array.isArray(event.data))
                    return;
                this.message()[event.data[0]]?.(event);
            }
            uri_change(event) {
                this.$.$mol_wait_timeout(1000);
                this.uri(event.data[1]);
            }
            auto() {
                return [
                    this.message_listener(),
                    this.window(),
                ];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_embed_native.prototype, "window", null);
        __decorate([
            $mol_mem
        ], $mol_embed_native.prototype, "uri_resource", null);
        __decorate([
            $mol_mem
        ], $mol_embed_native.prototype, "message_listener", null);
        $$.$mol_embed_native = $mol_embed_native;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/embed/native/native.view.css", "[mol_embed_native] {\n\tmin-width: 0;\n\tmin-height: 0;\n\tmax-width: 100%;\n\tmax-height: 100vh;\n\tobject-fit: cover;\n\tdisplay: flex;\n\tflex: 1 1 auto;\n\tobject-position: top left;\n\tborder-radius: var(--mol_gap_round);\n\taspect-ratio: 4/3;\n\tborder: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_icon_youtube) = class $mol_icon_youtube extends ($.$mol_icon) {
		path(){
			return "M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z";
		}
	};


;
"use strict";

;
	($.$mol_frame) = class $mol_frame extends ($.$mol_embed_native) {
		allow(){
			return "";
		}
		html(){
			return null;
		}
		attr(){
			return {
				"tabindex": (this.tabindex()), 
				"allow": (this.allow()), 
				"src": (this.uri()), 
				"srcdoc": (this.html())
			};
		}
		fullscreen(){
			return true;
		}
		accelerometer(){
			return true;
		}
		autoplay(){
			return true;
		}
		encription(){
			return true;
		}
		gyroscope(){
			return true;
		}
		pip(){
			return true;
		}
		clipboard_read(){
			return true;
		}
		clipboard_write(){
			return true;
		}
	};


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_frame extends $.$mol_frame {
            window() {
                return super.window();
            }
            allow() {
                return [
                    ...this.fullscreen() ? ['fullscreen'] : [],
                    ...this.accelerometer() ? ['accelerometer'] : [],
                    ...this.autoplay() ? ['autoplay'] : [],
                    ...this.encription() ? ['encrypted-media'] : [],
                    ...this.gyroscope() ? ['gyroscope'] : [],
                    ...this.pip() ? ['picture-in-picture'] : [],
                    ...this.clipboard_read() ? [`clipboard-read ${this.uri()}`] : [],
                    ...this.clipboard_write() ? [`clipboard-write ${this.uri()}`] : [],
                ].join('; ');
            }
        }
        $$.$mol_frame = $mol_frame;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_define($mol_frame, {
        border: {
            style: 'none',
        },
        maxHeight: $mol_style_unit.vh(100),
    });
})($ || ($ = {}));

;
	($.$mol_embed_service) = class $mol_embed_service extends ($.$mol_check) {
		active(next){
			if(next !== undefined) return next;
			return false;
		}
		title(){
			return "";
		}
		video_preview(){
			return "";
		}
		Image(){
			const obj = new this.$.$mol_image();
			(obj.title) = () => ((this.title()));
			(obj.uri) = () => ((this.video_preview()));
			return obj;
		}
		Hint(){
			const obj = new this.$.$mol_icon_youtube();
			return obj;
		}
		video_embed(){
			return "";
		}
		Frame(){
			const obj = new this.$.$mol_frame();
			(obj.title) = () => ((this.title()));
			(obj.uri) = () => ((this.video_embed()));
			return obj;
		}
		uri(){
			return "";
		}
		video_id(){
			return "";
		}
		checked(next){
			return (this.active(next));
		}
		sub(){
			return [
				(this.Image()), 
				(this.Hint()), 
				(this.Frame())
			];
		}
	};
	($mol_mem(($.$mol_embed_service.prototype), "active"));
	($mol_mem(($.$mol_embed_service.prototype), "Image"));
	($mol_mem(($.$mol_embed_service.prototype), "Hint"));
	($mol_mem(($.$mol_embed_service.prototype), "Frame"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_embed_service extends $.$mol_embed_service {
            sub() {
                return this.active()
                    ? [this.Frame()]
                    : [this.Image(), this.Hint()];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_embed_service.prototype, "sub", null);
        $$.$mol_embed_service = $mol_embed_service;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/embed/service/service.view.css", "[mol_embed_service] {\n\tpadding: 0;\n\tmax-width: 100%;\n}\n\n[mol_embed_service_image] {\n\tflex: auto 1 1;\n\twidth: 100vw;\n}\n\n[mol_embed_service_frame] {\n\twidth: 100vw;\n}\n\n[mol_embed_service_hint] {\n\tposition: absolute;\n    left: 50%;\n    top: 50%;\n    width: 50%;\n    height: 50%;\n    opacity: 0.3;\n    transform: translate(-50%, -50%);\n}\n\n[mol_embed_service]:hover [mol_embed_service_hint] {\n\topacity: .6;\n}\n");
})($ || ($ = {}));

;
	($.$mol_embed_youtube) = class $mol_embed_youtube extends ($.$mol_embed_service) {};


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_embed_youtube extends $.$mol_embed_youtube {
            video_embed() {
                return `https://www.youtube.com/embed/${encodeURIComponent(this.video_id())}?autoplay=1&loop=1`;
            }
            video_id() {
                return this.uri().match(/^https\:\/\/www\.youtube\.com\/(?:embed\/|shorts\/|watch\?v=)([^\/&?#]+)/)?.[1]
                    ?? this.uri().match(/^https\:\/\/youtu\.be\/([^\/&?#]+)/)?.[1]
                    ?? 'about:blank';
            }
            video_preview() {
                return `https://i.ytimg.com/vi/${this.video_id()}/sddefault.jpg`;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_embed_youtube.prototype, "video_embed", null);
        __decorate([
            $mol_mem
        ], $mol_embed_youtube.prototype, "video_id", null);
        __decorate([
            $mol_mem
        ], $mol_embed_youtube.prototype, "video_preview", null);
        $$.$mol_embed_youtube = $mol_embed_youtube;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_embed_rutube) = class $mol_embed_rutube extends ($.$mol_embed_service) {};


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_embed_rutube extends $.$mol_embed_rutube {
            video_embed() {
                return `https://rutube.ru/play/embed/${encodeURIComponent(this.video_id())}`;
            }
            video_id() {
                return this.uri().match(/^https:\/\/rutube.ru\/video\/([^\/&?#]+)/)?.[1] ?? 'about:blank';
            }
            video_preview() {
                return `https://rutube.ru/api/video/${this.video_id()}/thumbnail/?redirect=1`;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_embed_rutube.prototype, "video_embed", null);
        __decorate([
            $mol_mem
        ], $mol_embed_rutube.prototype, "video_id", null);
        __decorate([
            $mol_mem
        ], $mol_embed_rutube.prototype, "video_preview", null);
        $$.$mol_embed_rutube = $mol_embed_rutube;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_embed_vklive) = class $mol_embed_vklive extends ($.$mol_embed_service) {};


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_embed_vklive extends $.$mol_embed_vklive {
            video_embed() {
                return `https://live.vkvideo.ru/app/embed/${this.channel_id()}/${this.video_id()}`;
            }
            channel_id() {
                return this.uri().match(/^https:\/\/live\.vkvideo\.ru\/([^\/&?#]+)/)?.[1] ?? '';
            }
            video_id() {
                return this.uri().match(/^https:\/\/live\.vkvideo\.ru\/[^\/&?#]+\/record\/([^\/&?#]+)/)?.[1] ?? '';
            }
            video_preview() {
                return `https://images.live.vkvideo.ru/public_video_stream/record/${this.video_id()}/preview`;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_embed_vklive.prototype, "video_embed", null);
        __decorate([
            $mol_mem
        ], $mol_embed_vklive.prototype, "channel_id", null);
        __decorate([
            $mol_mem
        ], $mol_embed_vklive.prototype, "video_id", null);
        __decorate([
            $mol_mem
        ], $mol_embed_vklive.prototype, "video_preview", null);
        $$.$mol_embed_vklive = $mol_embed_vklive;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_embed_any) = class $mol_embed_any extends ($.$mol_view) {
		title(){
			return "";
		}
		uri(){
			return "";
		}
		Image(){
			const obj = new this.$.$mol_image();
			(obj.title) = () => ((this.title()));
			(obj.uri) = () => ((this.uri()));
			return obj;
		}
		Object(){
			const obj = new this.$.$mol_embed_native();
			(obj.title) = () => ((this.title()));
			(obj.uri) = () => ((this.uri()));
			return obj;
		}
		Youtube(){
			const obj = new this.$.$mol_embed_youtube();
			(obj.title) = () => ((this.title()));
			(obj.uri) = () => ((this.uri()));
			return obj;
		}
		Rutube(){
			const obj = new this.$.$mol_embed_rutube();
			(obj.title) = () => ((this.title()));
			(obj.uri) = () => ((this.uri()));
			return obj;
		}
		Vklive(){
			const obj = new this.$.$mol_embed_vklive();
			(obj.title) = () => ((this.title()));
			(obj.uri) = () => ((this.uri()));
			return obj;
		}
	};
	($mol_mem(($.$mol_embed_any.prototype), "Image"));
	($mol_mem(($.$mol_embed_any.prototype), "Object"));
	($mol_mem(($.$mol_embed_any.prototype), "Youtube"));
	($mol_mem(($.$mol_embed_any.prototype), "Rutube"));
	($mol_mem(($.$mol_embed_any.prototype), "Vklive"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_embed_any extends $.$mol_embed_any {
            type() {
                try {
                    const uri = this.uri();
                    if (/\b(png|gif|jpg|jpeg|jfif|webp|svg)\b/.test(uri))
                        return 'image';
                    if (/^https:\/\/www\.youtube\.com\//.test(uri))
                        return 'youtube';
                    if (/^https:\/\/youtu\.be\//.test(uri))
                        return 'youtube';
                    if (/^https:\/\/rutube\.ru\//.test(uri))
                        return 'rutube';
                    if (/^https:\/\/live\.vkvideo\.ru\//.test(uri))
                        return 'vklive';
                }
                catch (error) {
                    $mol_fail_log(error);
                    return 'image';
                }
                return 'object';
            }
            sub() {
                switch (this.type()) {
                    case 'image': return [this.Image()];
                    case 'youtube': return [this.Youtube()];
                    case 'rutube': return [this.Rutube()];
                    case 'vklive': return [this.Vklive()];
                    default: return [this.Object()];
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_embed_any.prototype, "type", null);
        __decorate([
            $mol_mem
        ], $mol_embed_any.prototype, "sub", null);
        $$.$mol_embed_any = $mol_embed_any;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_expander) = class $mol_expander extends ($.$mol_list) {
		expanded(next){
			if(next !== undefined) return next;
			return false;
		}
		expandable(){
			return true;
		}
		label(){
			return [(this.title())];
		}
		Trigger(){
			const obj = new this.$.$mol_check_expand();
			(obj.checked) = (next) => ((this.expanded(next)));
			(obj.expandable) = () => ((this.expandable()));
			(obj.label) = () => ((this.label()));
			return obj;
		}
		Tools(){
			return null;
		}
		Label(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Trigger()), (this.Tools())]);
			return obj;
		}
		content(){
			return [];
		}
		Content(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.content()));
			return obj;
		}
		rows(){
			return [(this.Label()), (this.Content())];
		}
	};
	($mol_mem(($.$mol_expander.prototype), "expanded"));
	($mol_mem(($.$mol_expander.prototype), "Trigger"));
	($mol_mem(($.$mol_expander.prototype), "Label"));
	($mol_mem(($.$mol_expander.prototype), "Content"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_expander extends $.$mol_expander {
            rows() {
                return [
                    this.Label(),
                    ...this.expanded() ? [this.Content()] : []
                ];
            }
            expandable() {
                return this.content().length > 0;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_expander.prototype, "rows", null);
        $$.$mol_expander = $mol_expander;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/expander/expander.view.css", "[mol_expander] {\n\tflex-direction: column;\n}\n\n[mol_expander_label] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\tborder-radius: var(--mol_gap_round);\n}\n\n[mol_expander_trigger] {\n\tflex: auto;\n\tposition: relative;\n}\n");
})($ || ($ = {}));

;
	($.$mol_text) = class $mol_text extends ($.$mol_list) {
		auto_scroll(){
			return null;
		}
		block_content(id){
			return [];
		}
		uri_resolve(id){
			return "";
		}
		quote_text(id){
			return "";
		}
		highlight(){
			return "";
		}
		list_type(id){
			return "-";
		}
		list_text(id){
			return "";
		}
		header_level(id){
			return 1;
		}
		header_arg(id){
			return {};
		}
		pre_text(id){
			return "";
		}
		pre_themes(id){
			return [];
		}
		code_sidebar_showed(){
			return true;
		}
		pre_sidebar_showed(){
			return (this.code_sidebar_showed());
		}
		table_head_cells(id){
			return [];
		}
		table_rows(id){
			return [];
		}
		table_cells(id){
			return [];
		}
		table_cell_text(id){
			return "";
		}
		grid_rows(id){
			return [];
		}
		grid_cells(id){
			return [];
		}
		grid_cell_text(id){
			return "";
		}
		line_text(id){
			return "";
		}
		line_type(id){
			return "";
		}
		line_content(id){
			return [];
		}
		code_syntax(){
			return null;
		}
		link_uri(id){
			return "";
		}
		link_host(id){
			return "";
		}
		spoiler_label(id){
			return "";
		}
		Spoiler_label(id){
			const obj = new this.$.$mol_text();
			(obj.text) = () => ((this.spoiler_label(id)));
			return obj;
		}
		spoiler_content(id){
			return "";
		}
		Spoiler_content(id){
			const obj = new this.$.$mol_text();
			(obj.text) = () => ((this.spoiler_content(id)));
			return obj;
		}
		uri_base(){
			return "";
		}
		text(){
			return "";
		}
		param(){
			return "";
		}
		flow_tokens(){
			return [];
		}
		block_text(id){
			return "";
		}
		auto(){
			return [(this.auto_scroll())];
		}
		Paragraph(id){
			const obj = new this.$.$mol_paragraph();
			(obj.sub) = () => ((this.block_content(id)));
			return obj;
		}
		Quote(id){
			const obj = new this.$.$mol_text();
			(obj.uri_resolve) = (id) => ((this.uri_resolve(id)));
			(obj.text) = () => ((this.quote_text(id)));
			(obj.highlight) = () => ((this.highlight()));
			(obj.auto_scroll) = () => (null);
			return obj;
		}
		List(id){
			const obj = new this.$.$mol_text_list();
			(obj.uri_resolve) = (id) => ((this.uri_resolve(id)));
			(obj.type) = () => ((this.list_type(id)));
			(obj.text) = () => ((this.list_text(id)));
			(obj.highlight) = () => ((this.highlight()));
			return obj;
		}
		item_index(id){
			return 0;
		}
		Header(id){
			const obj = new this.$.$mol_text_header();
			(obj.minimal_height) = () => (40);
			(obj.level) = () => ((this.header_level(id)));
			(obj.content) = () => ((this.block_content(id)));
			(obj.arg) = () => ((this.header_arg(id)));
			return obj;
		}
		Pre(id){
			const obj = new this.$.$mol_text_code();
			(obj.text) = () => ((this.pre_text(id)));
			(obj.row_themes) = () => ((this.pre_themes(id)));
			(obj.highlight) = () => ((this.highlight()));
			(obj.uri_resolve) = (id) => ((this.uri_resolve(id)));
			(obj.sidebar_showed) = () => ((this.pre_sidebar_showed()));
			return obj;
		}
		Cut(id){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("hr");
			return obj;
		}
		Table(id){
			const obj = new this.$.$mol_grid();
			(obj.head_cells) = () => ((this.table_head_cells(id)));
			(obj.rows) = () => ((this.table_rows(id)));
			return obj;
		}
		Table_row(id){
			const obj = new this.$.$mol_grid_row();
			(obj.cells) = () => ((this.table_cells(id)));
			return obj;
		}
		Table_cell(id){
			const obj = new this.$.$mol_text();
			(obj.auto_scroll) = () => (null);
			(obj.highlight) = () => ((this.highlight()));
			(obj.uri_resolve) = (id) => ((this.uri_resolve(id)));
			(obj.text) = () => ((this.table_cell_text(id)));
			return obj;
		}
		Grid(id){
			const obj = new this.$.$mol_grid();
			(obj.rows) = () => ((this.grid_rows(id)));
			return obj;
		}
		Grid_row(id){
			const obj = new this.$.$mol_grid_row();
			(obj.cells) = () => ((this.grid_cells(id)));
			return obj;
		}
		Grid_cell(id){
			const obj = new this.$.$mol_text();
			(obj.auto_scroll) = () => (null);
			(obj.highlight) = () => ((this.highlight()));
			(obj.uri_resolve) = (id) => ((this.uri_resolve(id)));
			(obj.text) = () => ((this.grid_cell_text(id)));
			return obj;
		}
		String(id){
			const obj = new this.$.$mol_dimmer();
			(obj.dom_name) = () => ("span");
			(obj.needle) = () => ((this.highlight()));
			(obj.haystack) = () => ((this.line_text(id)));
			return obj;
		}
		Span(id){
			const obj = new this.$.$mol_text_span();
			(obj.dom_name) = () => ("span");
			(obj.type) = () => ((this.line_type(id)));
			(obj.sub) = () => ((this.line_content(id)));
			return obj;
		}
		Code_line(id){
			const obj = new this.$.$mol_text_code_line();
			(obj.numb_showed) = () => (false);
			(obj.highlight) = () => ((this.highlight()));
			(obj.text) = () => ((this.line_text(id)));
			(obj.uri_resolve) = (id) => ((this.uri_resolve(id)));
			(obj.syntax) = () => ((this.code_syntax()));
			return obj;
		}
		Link(id){
			const obj = new this.$.$mol_link_iconed();
			(obj.uri) = () => ((this.link_uri(id)));
			(obj.content) = () => ((this.line_content(id)));
			return obj;
		}
		Link_http(id){
			const obj = new this.$.$mol_link_iconed();
			(obj.uri) = () => ((this.link_uri(id)));
			(obj.content) = () => ([(this.link_host(id))]);
			return obj;
		}
		Embed(id){
			const obj = new this.$.$mol_embed_any();
			(obj.uri) = () => ((this.link_uri(id)));
			(obj.title) = () => ((this.line_text(id)));
			return obj;
		}
		Spoiler(id){
			const obj = new this.$.$mol_expander();
			(obj.label) = () => ([(this.Spoiler_label(id))]);
			(obj.content) = () => ([(this.Spoiler_content(id))]);
			return obj;
		}
	};
	($mol_mem_key(($.$mol_text.prototype), "Spoiler_label"));
	($mol_mem_key(($.$mol_text.prototype), "Spoiler_content"));
	($mol_mem_key(($.$mol_text.prototype), "Paragraph"));
	($mol_mem_key(($.$mol_text.prototype), "Quote"));
	($mol_mem_key(($.$mol_text.prototype), "List"));
	($mol_mem_key(($.$mol_text.prototype), "Header"));
	($mol_mem_key(($.$mol_text.prototype), "Pre"));
	($mol_mem_key(($.$mol_text.prototype), "Cut"));
	($mol_mem_key(($.$mol_text.prototype), "Table"));
	($mol_mem_key(($.$mol_text.prototype), "Table_row"));
	($mol_mem_key(($.$mol_text.prototype), "Table_cell"));
	($mol_mem_key(($.$mol_text.prototype), "Grid"));
	($mol_mem_key(($.$mol_text.prototype), "Grid_row"));
	($mol_mem_key(($.$mol_text.prototype), "Grid_cell"));
	($mol_mem_key(($.$mol_text.prototype), "String"));
	($mol_mem_key(($.$mol_text.prototype), "Span"));
	($mol_mem_key(($.$mol_text.prototype), "Code_line"));
	($mol_mem_key(($.$mol_text.prototype), "Link"));
	($mol_mem_key(($.$mol_text.prototype), "Link_http"));
	($mol_mem_key(($.$mol_text.prototype), "Embed"));
	($mol_mem_key(($.$mol_text.prototype), "Spoiler"));
	($.$mol_text_header) = class $mol_text_header extends ($.$mol_paragraph) {
		arg(){
			return {};
		}
		content(){
			return [];
		}
		Link(){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ((this.arg()));
			(obj.hint) = () => ((this.$.$mol_locale.text("$mol_text_header_Link_hint")));
			(obj.sub) = () => ((this.content()));
			return obj;
		}
		level(){
			return 1;
		}
		sub(){
			return [(this.Link())];
		}
	};
	($mol_mem(($.$mol_text_header.prototype), "Link"));
	($.$mol_text_span) = class $mol_text_span extends ($.$mol_paragraph) {
		type(){
			return "";
		}
		dom_name(){
			return "span";
		}
		attr(){
			return {...(super.attr()), "mol_text_type": (this.type())};
		}
	};


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_text extends $.$mol_text {
            flow_tokens() {
                const tokens = [];
                this.$.$mol_syntax2_md_flow.tokenize(this.text(), (name, found, chunks) => tokens.push({ name, found, chunks }));
                return tokens;
            }
            block_type(index) {
                return this.flow_tokens()[index].name;
            }
            rows() {
                return this.flow_tokens().map(({ name }, index) => {
                    switch (name) {
                        case 'quote': return this.Quote(index);
                        case 'spoiler': return this.Spoiler(index);
                        case 'header': return this.Header(index);
                        case 'list': return this.List(index);
                        case 'code': return this.Pre(index);
                        case 'code-indent': return this.Pre(index);
                        case 'table': return this.Table(index);
                        case 'grid': return this.Grid(index);
                        case 'cut': return this.Cut(index);
                        default: return this.Paragraph(index);
                    }
                });
            }
            param() {
                return this.toString().replace(/^.*?[\)>]\./, '').replace(/[(<>)]/g, '');
            }
            header_level(index) {
                return this.flow_tokens()[index].chunks[0].length;
            }
            header_arg(index) {
                return {
                    [this.param()]: this.block_text(index)
                };
            }
            list_type(index) {
                return this.flow_tokens()[index].chunks[1] ?? '';
            }
            item_index(index) {
                return this.flow_tokens().slice(0, index).filter(token => token.name === 'block').length + 1;
            }
            pre_text(index) {
                const token = this.flow_tokens()[index];
                return (token.chunks[2] ?? token.chunks[0].replace(/^(\t| (?:\+\+|--|\*\*|  ) )/gm, '')).replace(/[\n\r]*$/, '');
            }
            pre_themes(index) {
                const token = this.flow_tokens()[index];
                const names = {
                    ' ** ': '$mol_theme_accent',
                    ' ++ ': '$mol_theme_current',
                    ' -- ': '$mol_theme_special',
                };
                return token.chunks[0].split('\n')
                    .map(line => names[line.match(/^ (?:\+\+|--|\*\*|  ) /gm)?.[0] ?? ''] ?? null);
            }
            quote_text(index) {
                return this.flow_tokens()[index].chunks[0].replace(/^[>"] /mg, '');
            }
            list_text(index) {
                return this.flow_tokens()[index].chunks[0].replace(/^([-*+]|(?:\d+[\.\)])+) ?/mg, '').replace(/^  ?/mg, '');
            }
            cell_content(indexBlock) {
                return this.flow_tokens()[indexBlock].chunks[0]
                    .split(/\r?\n/g)
                    .filter(row => row && !/\|--/.test(row))
                    .map((row, rowId) => {
                    return row.split(/\|/g)
                        .filter(cell => cell)
                        .map((cell, cellId) => cell.trim());
                });
            }
            table_rows(blockId) {
                return this.cell_content(blockId)
                    .slice(1)
                    .map((row, rowId) => this.Table_row({ block: blockId, row: rowId + 1 }));
            }
            table_head_cells(blockId) {
                return this.cell_content(blockId)[0]
                    .map((cell, cellId) => this.Table_cell({ block: blockId, row: 0, cell: cellId }));
            }
            table_cells(id) {
                return this.cell_content(id.block)[id.row]
                    .map((cell, cellId) => this.Table_cell({ block: id.block, row: id.row, cell: cellId }));
            }
            table_cell_text(id) {
                return this.cell_content(id.block)[id.row][id.cell];
            }
            grid_content(indexBlock) {
                return [...this.flow_tokens()[indexBlock].chunks[0].match(/(?:^! .*?$\r?\n?)+(?:^ +! .*?$\r?\n?)*/gm)]
                    .map((row, rowId) => {
                    const cells = [];
                    for (const line of row.trim().split(/\r?\n/)) {
                        const [_, indent, content] = /^( *)! (.*)/.exec(line);
                        const col = Math.ceil(indent.length / 2);
                        cells[col] = (cells[col] ? cells[col] + '\n' : '') + content;
                    }
                    return cells;
                });
            }
            grid_rows(blockId) {
                return this.grid_content(blockId)
                    .map((row, rowId) => this.Grid_row({ block: blockId, row: rowId }));
            }
            grid_cells(id) {
                return this.grid_content(id.block)[id.row]
                    .map((cell, cellId) => this.Grid_cell({ block: id.block, row: id.row, cell: cellId }));
            }
            grid_cell_text(id) {
                return this.grid_content(id.block)[id.row][id.cell];
            }
            uri_base() {
                return $mol_dom_context.document.location.href;
            }
            uri_base_abs() {
                return new URL(this.uri_base(), $mol_dom_context.document.location.href);
            }
            uri_resolve(uri) {
                if (/^(\w+script+:)+/.test(uri))
                    return null;
                if (/^#\!/.test(uri)) {
                    const params = {};
                    for (const chunk of uri.slice(2).split(this.$.$mol_state_arg.separator)) {
                        if (!chunk)
                            continue;
                        const vals = chunk.split('=').map(decodeURIComponent);
                        params[vals.shift()] = vals.join('=');
                    }
                    return this.$.$mol_state_arg.link(params);
                }
                try {
                    const url = new URL(uri, this.uri_base_abs());
                    return url.toString();
                }
                catch (error) {
                    $mol_fail_log(error);
                    return null;
                }
            }
            code_syntax() {
                return this.$.$mol_syntax2_md_code;
            }
            block_text(index) {
                const token = this.flow_tokens()[index];
                switch (token.name) {
                    case 'header': return token.chunks[2];
                    default: return token.chunks[0];
                }
            }
            block_content(index) {
                return this.line_content([index]);
            }
            line_tokens(path) {
                const tokens = [];
                this.$.$mol_syntax2_md_line.tokenize(this.line_text(path), (name, found, chunks) => tokens.push({ name, found, chunks }));
                return tokens;
            }
            line_token(path) {
                const tokens = this.line_tokens(path.slice(0, path.length - 1));
                return tokens[path[path.length - 1]];
            }
            line_type(path) {
                return this.line_token(path).name;
            }
            line_text(path) {
                if (path.length === 1)
                    return this.block_text(path[0]);
                const { name, found, chunks } = this.line_token(path);
                switch (name) {
                    case 'link': return chunks[0] || chunks[1].replace(/^.*?\/\/|\/.*$/g, '');
                    case 'text-link': return chunks[0] || chunks[1].replace(/^.*?\/\/|\/.*$/g, '');
                    default: return (chunks[0] || chunks[1] || chunks[2]) ?? found;
                }
            }
            line_content(path) {
                return this.line_tokens(path).map(({ name, chunks }, index) => {
                    const path2 = [...path, index];
                    switch (name) {
                        case 'embed': return this.Embed(path2);
                        case 'link': return this.Link(path2);
                        case 'text-link-http': return this.Link_http(path2);
                        case 'text-link': return this.Link(path2);
                        case 'image-link': return this.Embed(path2);
                        case 'code': return this.Code_line(path2);
                        case '': return this.String(path2);
                        default: return this.Span(path2);
                    }
                });
            }
            link_uri(path) {
                const token = this.line_token(path);
                const uri = this.uri_resolve(token.chunks[1] ?? token.found);
                if (!uri)
                    throw new Error('Bad link');
                return uri;
            }
            link_host(path) {
                return this.link_uri(path).replace(/^.*?\/\/|\/.*$/g, '');
            }
            auto_scroll() {
                for (const [index, token] of this.flow_tokens().entries()) {
                    if (token.name !== 'header')
                        continue;
                    const header = this.Header(index);
                    if (!header.Link().current())
                        continue;
                    new $mol_after_tick(() => this.ensure_visible(header));
                }
            }
            spoiler_rows(index) {
                return this.flow_tokens()[index].chunks[0].replace(/^[\?] /mg, '').split('\n');
            }
            spoiler_label(index) {
                return this.spoiler_rows(index)[0];
            }
            spoiler_content(index) {
                return this.spoiler_rows(index).slice(1).join('\n');
            }
        }
        __decorate([
            $mol_mem
        ], $mol_text.prototype, "flow_tokens", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "block_type", null);
        __decorate([
            $mol_mem
        ], $mol_text.prototype, "rows", null);
        __decorate([
            $mol_mem
        ], $mol_text.prototype, "param", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "header_level", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "header_arg", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "pre_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "pre_themes", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "quote_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "list_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "cell_content", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "table_rows", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "table_head_cells", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "table_cells", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "table_cell_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "grid_content", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "grid_rows", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "grid_cells", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "grid_cell_text", null);
        __decorate([
            $mol_mem
        ], $mol_text.prototype, "uri_base_abs", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "uri_resolve", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "block_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "line_tokens", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "line_token", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "line_type", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "line_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "line_content", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "link_uri", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "link_host", null);
        __decorate([
            $mol_mem
        ], $mol_text.prototype, "auto_scroll", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "spoiler_rows", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "spoiler_label", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "spoiler_content", null);
        $$.$mol_text = $mol_text;
        class $mol_text_header extends $.$mol_text_header {
            dom_name() {
                return 'h' + this.level();
            }
        }
        $$.$mol_text_header = $mol_text_header;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/text/text/text.view.css", "[mol_text] {\n\tline-height: 1.5em;\n\tbox-sizing: border-box;\n\tborder-radius: var(--mol_gap_round);\n\twhite-space: pre-line;\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex: 0 0 auto;\n\ttab-size: 4;\n}\n\n[mol_text_paragraph] {\n\tpadding: var(--mol_gap_text);\n\toverflow: auto;\n\toverflow-x: overlay;\n\tmax-width: 100%;\n\tdisplay: block;\n\tmax-width: 60rem;\n\tbreak-inside: avoid;\n}\n\n[mol_text_spoiler_label_paragraph] {\n\tpadding: 0;\n}\n\n[mol_text_span] {\n\tdisplay: inline;\n}\n\n[mol_text_string] {\n\tdisplay: inline;\n\tflex: 0 1 auto;\n\twhite-space: normal;\n}\n\n[mol_text_quote] {\n\tmargin: var(--mol_gap_block);\n\tpadding: var(--mol_gap_block);\n\tbackground: var(--mol_theme_card);\n\tbox-shadow: 0 0 0 1px var(--mol_theme_back);\n\tbreak-inside: avoid;\n}\n\n[mol_text_header] {\n\tdisplay: block;\n\ttext-shadow: 0 0;\n\tfont-weight: normal;\n\tbreak-after: avoid;\n}\n\n* + [mol_text_header] {\n\tmargin-top: 0.75rem;\n}\n\nh1[mol_text_header] {\n\tfont-size: 1.5rem;\n}\n\nh2[mol_text_header] {\n\tfont-size: 1.5rem;\n\tfont-style: italic;\n}\n\nh3[mol_text_header] {\n\tfont-size: 1.25rem;\n}\n\nh4[mol_text_header] {\n\tfont-size: 1.25em;\n\tfont-style: italic;\n}\n\nh5[mol_text_header] {\n\tfont-size: 1rem;\n}\n\nh6[mol_text_header] {\n\tfont-size: 1rem;\n\tfont-style: italic;\n}\n\n[mol_text_header_link] {\n\tcolor: inherit;\n}\n\n[mol_text_table] {\n\tbreak-inside: avoid;\n}\n\n[mol_text_table_cell] {\n\twidth: auto;\n\tdisplay: table-cell;\n\tvertical-align: baseline;\n\tpadding: 0;\n\tborder-radius: 0;\n}\n\n[mol_text_grid] {\n\tbreak-inside: avoid;\n}\n\n[mol_text_grid_cell] {\n\twidth: auto;\n\tdisplay: table-cell;\n\tvertical-align: top;\n\tpadding: 0;\n\tborder-radius: 0;\n}\n\n[mol_text_cut] {\n\tborder: none;\n\twidth: 100%;\n\tbox-shadow: 0 0 0 1px var(--mol_theme_line);\n}\n\n[mol_text_link_http],\n[mol_text_link] {\n\tpadding: 0;\n\tdisplay: inline;\n\twhite-space: nowrap;\n}\n\n[mol_text_link_icon] + [mol_text_embed] {\n\tmargin-left: -1.5rem;\n}\n\n[mol_text_embed_youtube] {\n\tdisplay: inline;\n}\n\n[mol_text_embed_youtube_image],\n[mol_text_embed_youtube_frame],\n[mol_text_embed_object] {\n\tobject-fit: contain;\n\tobject-position: center;\n\twidth: 100vw;\n\tmax-height: calc( 100vh - 6rem );\n}\n[mol_text_embed_object_fallback] {\n\tpadding: 0;\n}\n[mol_text_embed_image] {\n\tobject-fit: contain;\n\tobject-position: center;\n\tdisplay: inline;\n\t/* max-height: calc( 100vh - 6rem ); */\n\tvertical-align: top;\n}\n\n[mol_text_pre] {\n\twhite-space: pre;\n\toverflow-x: auto;\n\toverflow-x: overlay;\n\ttab-size: 2;\n\tbreak-inside: avoid;\n}\n\n[mol_text_code_line] {\n\tdisplay: inline-block;\n}\n\n[mol_text_type=\"strong\"] {\n\ttext-shadow: 0 0;\n\tfilter: contrast(1.5);\n}\n\n[mol_text_type=\"emphasis\"] {\n\tfont-style: italic;\n}\n\n[mol_text_type=\"insert\"] {\n\tcolor: var(--mol_theme_special);\n}\n\n[mol_text_type=\"delete\"] {\n\tcolor: var(--mol_theme_shade);\n}\n\n[mol_text_type=\"remark\"] {\n\tcolor: var(--mol_theme_shade);\n}\n\n[mol_text_type=\"quote\"] {\n\tfont-style: italic;\n}\n");
})($ || ($ = {}));

;
	($.$mol_text_list) = class $mol_text_list extends ($.$mol_text) {
		type(){
			return "";
		}
		auto_scroll(){
			return null;
		}
		attr(){
			return {...(super.attr()), "mol_text_list_type": (this.type())};
		}
		Paragraph(id){
			const obj = new this.$.$mol_text_list_item();
			(obj.index) = () => ((this.item_index(id)));
			(obj.sub) = () => ((this.block_content(id)));
			return obj;
		}
	};
	($mol_mem_key(($.$mol_text_list.prototype), "Paragraph"));
	($.$mol_text_list_item) = class $mol_text_list_item extends ($.$mol_paragraph) {
		index(){
			return 0;
		}
		attr(){
			return {...(super.attr()), "mol_text_list_item_index": (this.index())};
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/text/list/list.view.css", "[mol_text_list] {\r\n\tpadding-left: 1.75rem;\r\n}\r\n\r\n[mol_text_list_item] {\r\n\tcontain: none;\r\n\tdisplay: list-item;\r\n}\r\n\r\n[mol_text_list_item]::before {\r\n\tcontent: attr( mol_text_list_item_index ) \".\";\r\n\twidth: 1.25rem;\r\n\tdisplay: inline-block;\r\n\tposition: absolute;\r\n\tmargin-left: -1.75rem;\r\n\ttext-align: end;\r\n}\r\n\r\n[mol_text_list_type=\"-\"] > [mol_text_list_item]::before,\r\n[mol_text_list_type=\"*\"] > [mol_text_list_item]::before {\r\n\tcontent: \"•\";\r\n}\r\n");
})($ || ($ = {}));

;
"use strict";

;
	($.$bog_docs_editor) = class $bog_docs_editor extends ($.$mol_view) {
		source(next){
			if(next !== undefined) return next;
			return "";
		}
		Code(){
			const obj = new this.$.$mol_textarea();
			(obj.hint) = () => ("Write your view.tree code here...");
			(obj.value) = (next) => ((this.source(next)));
			return obj;
		}
		preview_text(){
			return "";
		}
		Preview(){
			const obj = new this.$.$mol_text();
			(obj.text) = () => ((this.preview_text()));
			return obj;
		}
		sub(){
			return [(this.Code()), (this.Preview())];
		}
	};
	($mol_mem(($.$bog_docs_editor.prototype), "source"));
	($mol_mem(($.$bog_docs_editor.prototype), "Code"));
	($mol_mem(($.$bog_docs_editor.prototype), "Preview"));


;
"use strict";
var $;
(function ($) {
    class $mol_view_tree2_error extends Error {
        spans;
        constructor(message, spans) {
            super(message);
            this.spans = spans;
        }
        toJSON() {
            return {
                message: this.message,
                spans: this.spans
            };
        }
    }
    $.$mol_view_tree2_error = $mol_view_tree2_error;
    class $mol_view_tree2_error_suggestions {
        suggestions;
        constructor(suggestions) {
            this.suggestions = suggestions;
        }
        toString() {
            return this.suggestions.map(suggestion => `\`${suggestion}\``).join(', ');
        }
        toJSON() {
            return this.suggestions;
        }
    }
    $.$mol_view_tree2_error_suggestions = $mol_view_tree2_error_suggestions;
    function $mol_view_tree2_error_str(strings, ...parts) {
        const spans = [];
        for (const part of parts) {
            if (part instanceof $mol_span)
                spans.push(part);
            if (Array.isArray(part) && part.length > 0 && part[0] instanceof $mol_span)
                spans.push(...part);
        }
        return new $mol_view_tree2_error(join(strings, parts), spans);
    }
    $.$mol_view_tree2_error_str = $mol_view_tree2_error_str;
    function join(strings, objects) {
        let result = '';
        let obj_pos = 0;
        let obj_len = objects.length;
        for (const str of strings) {
            result += str;
            if (obj_pos < obj_len) {
                const obj = objects[obj_pos++];
                if (Array.isArray(obj))
                    result += obj.map(item => `\`${item}\``).join(', ');
                else
                    result += `\`${String(obj)}\``;
            }
        }
        return result;
    }
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_view_tree2_child(tree) {
        if (tree.kids.length === 0) {
            return this.$mol_fail($mol_view_tree2_error_str `Required one child at ${tree.span}`);
        }
        if (tree.kids.length > 1) {
            return this.$mol_fail($mol_view_tree2_error_str `Should be only one child at ${tree.span}`);
        }
        return tree.kids[0];
    }
    $.$mol_view_tree2_child = $mol_view_tree2_child;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_view_tree2_classes(defs) {
        return defs.clone(defs.hack({
            '-': () => []
        }));
    }
    $.$mol_view_tree2_classes = $mol_view_tree2_classes;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_view_tree2_normalize(defs) {
        return defs.clone($mol_view_tree2_classes(defs).kids.map(cl => cl.clone([
            this.$mol_view_tree2_class_super(cl).clone(this.$mol_view_tree2_class_props(cl))
        ])));
    }
    $.$mol_view_tree2_normalize = $mol_view_tree2_normalize;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const { begin, end, latin_only, or, optional, repeat_greedy } = $mol_regexp;
    $.$mol_view_tree2_prop_signature = $mol_regexp.from([
        begin,
        { name: repeat_greedy(latin_only, 1) },
        { key: optional(['*', repeat_greedy(latin_only, 0)]) },
        { next: optional(['?', repeat_greedy(latin_only, 0)]) },
        end,
    ]);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_view_tree2_prop_parts(prop) {
        const groups = [...prop.type.matchAll($mol_view_tree2_prop_signature)][0]?.groups;
        if (!groups) {
            this.$mol_fail($mol_view_tree2_error_str `Required prop like some*? at ${prop.span}`);
        }
        return {
            name: groups.name,
            key: groups.key,
            next: groups.next ? '?' : ''
        };
    }
    $.$mol_view_tree2_prop_parts = $mol_view_tree2_prop_parts;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const regular_regex = /^\w+$/;
    function $mol_view_tree2_prop_quote(name) {
        if (regular_regex.test(name.value))
            return name;
        return name.data(JSON.stringify(name.value));
    }
    $.$mol_view_tree2_prop_quote = $mol_view_tree2_prop_quote;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const class_regex = /^[$A-Z][$\w<>\[\]()"'?|]+$/;
    function $mol_view_tree2_class_match(klass) {
        if (!klass?.type)
            return false;
        if (klass.type === 'NaN' || klass.type === 'Infinity')
            return false;
        return class_regex.test(klass.type);
    }
    $.$mol_view_tree2_class_match = $mol_view_tree2_class_match;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const err = $mol_view_tree2_error_str;
    function $mol_view_tree2_class_super(klass) {
        if (!$mol_view_tree2_class_match(klass))
            return this.$mol_fail(err `Wrong class name at ${klass.span}`);
        const superclass = klass.kids.length === 1 ? klass.kids[0] : undefined;
        if (!superclass)
            return this.$mol_fail(err `No super class at ${klass.span}`);
        if (!$mol_view_tree2_class_match(superclass))
            return this.$mol_fail(err `Wrong super class name ${JSON.stringify(superclass.type).replace(/(^"|"$)/g, "")} at ${superclass.span}`);
        return superclass;
    }
    $.$mol_view_tree2_class_super = $mol_view_tree2_class_super;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const err = $mol_view_tree2_error_str;
    function $mol_view_tree2_class_props(klass) {
        let props = this.$mol_view_tree2_class_super(klass);
        props = props.clone(props.hack({
            '': (node, belt) => {
                const normal = node.type.replace(/!\w+/, '*');
                if (node.type === normal)
                    return [node.clone(node.hack(belt))];
                return [node.struct(normal, node.hack(belt))];
            }
        }));
        const props_inner = {};
        const add_inner = (prop) => {
            const { name } = this.$mol_view_tree2_prop_parts(prop);
            const prev = props_inner[name];
            if (prev && prev.kids[0]?.toString() !== prop.kids[0]?.toString()) {
                this.$mol_fail(err `Need an equal default values at ${prev.span} vs ${prop.span}`);
            }
            props_inner[name] = prop;
        };
        const upper = (operator, belt, context) => {
            const prop = this.$mol_view_tree2_child(operator);
            const defs = prop.hack(belt, { factory: prop });
            if (defs.length)
                add_inner(prop.clone(defs));
            return [operator.clone([prop.clone([])])];
        };
        const props_root = props.hack({
            '<=': upper,
            '<=>': upper,
            '^': (operator, belt, context) => {
                if (operator.kids.length === 0)
                    return [operator];
                return upper(operator, belt, context);
            },
            '': (left, belt, context) => {
                let right;
                const operator = left.kids[0];
                if (operator?.type === '=>' && context.factory) {
                    right = operator.kids[0];
                    if (!right)
                        this.$mol_fail(err `Need a child ${operator.span}`);
                    if (!context.factory)
                        this.$mol_fail(err `Need a parent ${left.span}`);
                    add_inner(right.clone([
                        right.struct('=', [
                            context.factory.struct(context.factory.type.replace(/\*.*/, '*'), [left.clone([])]),
                        ]),
                    ]));
                }
                if (right)
                    context = { factory: right.clone([]) };
                else if (operator && !context.factory && $mol_view_tree2_class_match(operator)) {
                    context = { factory: left.clone([]) };
                }
                const hacked = left.clone(left.hack(belt, context));
                return [hacked];
            }
        }, { factory: undefined });
        for (const prop of props_root)
            add_inner(prop);
        return Object.values(props_inner);
    }
    $.$mol_view_tree2_class_props = $mol_view_tree2_class_props;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_tree2_js_is_number(type) {
        return type.match(/[\+\-]*NaN/) || !Number.isNaN(Number(type));
    }
    $.$mol_tree2_js_is_number = $mol_tree2_js_is_number;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const err = $mol_view_tree2_error_str;
    function name_of(prop) {
        return this.$mol_view_tree2_prop_parts(prop).name;
    }
    function params_of(prop, bidi = true) {
        const { key, next } = this.$mol_view_tree2_prop_parts(prop);
        return prop.struct('(,)', [
            ...key
                ? [prop.struct('id')]
                : [],
            ...(bidi && next) ? [prop.struct('next')] : [],
        ]);
    }
    function args_of(prop, bidi = true) {
        const { key, next } = this.$mol_view_tree2_prop_parts(prop);
        return prop.struct('(,)', [
            ...key
                ? key.length > 1
                    ? [prop.data(key.slice(1))]
                    : [prop.struct('id')]
                : [],
            ...(bidi && next) ? [prop.struct('next')] : [],
        ]);
    }
    function call_method_name(child, optional) {
        return child.struct(optional ? '?.[]' : '[]', [
            child.data(name_of.call(this, child))
        ]);
    }
    function call_of(bind, bidi = true) {
        if (bind.kids.length === 0) {
            return this.$mol_fail(err `Required one child at ${bind.span}`);
        }
        const chain = [bind.struct('this')];
        for (const child of bind.kids) {
            chain.push(call_method_name.call(this, child, chain.length > 1), args_of.call(this, child, bidi));
        }
        return bind.struct('()', chain);
    }
    const localized_string = $$.$mol_tree2_from_string(`
		()
			this
			[] \\$
			[] \\$mol_locale
			[] \\text
			(,) #key
	`, 'localized_string');
    function klass_body(acc, prop) {
        const { klass, members, addons } = acc;
        const { name, key, next } = this.$mol_view_tree2_prop_parts(prop);
        const decorate = () => {
            return prop.struct('()', [
                prop.struct(key ? '$mol_mem_key' : '$mol_mem'),
                prop.struct('(,)', [
                    prop.struct('()', [
                        klass.struct('$'),
                        prop.struct('[]', [
                            klass.data(klass.type),
                        ]),
                        prop.struct('[]', [
                            prop.data('prototype'),
                        ]),
                    ]),
                    prop.data(name),
                ]),
            ]);
        };
        const op = prop.kids[0];
        const is_delegate = op?.type === '<=>' || op?.type === '=';
        if (!is_delegate && next)
            addons.push(decorate());
        const val = prop.hack({
            '@': (locale, belt, context) => {
                const chain = context.chain?.join('_');
                return localized_string.hack({
                    '#key': key => [locale.data(`${klass.type}_${name}${chain ? `_${chain}` : ''}`)],
                });
            },
            '<=': bind => [call_of.call(this, bind, false)],
            '<=>': bind => [call_of.call(this, bind, true)],
            '=>': bind => [],
            '^': (ref, belt, context) => [
                ref.struct('...', [
                    ref.kids[0]?.type
                        ? ref.struct('()', [
                            ref.struct('this'),
                            ref.struct('[]', [ref.data(name_of.call(this, ref.kids[0]))]),
                            args_of.call(this, ref.kids[0])
                        ])
                        : context.chain
                            ? ref.struct('()', [
                                ref.struct('this'),
                                ref.struct('[]', [ref.data('$')]),
                                ref.struct('[]', [ref.data(op.type)]),
                                ref.struct('[]', [ref.data('prototype')]),
                                ref.struct('[]', [ref.data(context.chain[0])]),
                                ref.struct('[]', [ref.data('call')]),
                                ref.struct('(,)', [ref.struct('obj')]),
                                ...context.chain.slice(1).map(field => ref.struct('[]', [ref.data(field)]))
                            ])
                            : ref.struct('()', [
                                ref.struct('super'),
                                ref.struct('[]', [ref.data(name)]),
                                ref.struct('(,)')
                            ]),
                ]),
            ],
            '=': bind => [bind.struct('()', [
                    bind.struct('this'),
                    ...bind.hack({ '': (method, belt, ctx) => [
                            call_method_name.call(this, method, (ctx.item_index++) > 0),
                            args_of.call(this, method),
                            ...method.hack(belt),
                        ] }, { item_index: 0 }),
                ])],
            '': (input, belt, context) => {
                if (input.type[0] === '*') {
                    return [
                        input.struct('{,}', input.kids.map(field => {
                            if (field.type === '^')
                                return field.list([field]).hack(belt, context)[0];
                            const field_name = (field.type || field.value).replace(/\?\w*$/, '');
                            return field.struct(':', [
                                field.data(field_name),
                                field.kids[0].type === '<=>'
                                    ? field.struct('=>', [
                                        params_of.call(this, field),
                                        ...field.hack(belt),
                                    ])
                                    : field.hack(belt, { ...context, chain: [...context.chain ?? [], field_name] })[0],
                            ]);
                        }).filter(this.$mol_guard_defined))
                    ];
                }
                if (input.type[0] === '/')
                    return [
                        input.struct('[,]', input.hack(belt, context)),
                    ];
                if (input.type && $mol_tree2_js_is_number(input.type))
                    return [
                        input
                    ];
                if ($mol_view_tree2_class_match(input)) {
                    if (!next)
                        addons.push(decorate());
                    const overrides = [];
                    for (const over of input.kids) {
                        if (over.type[0] === '/')
                            continue;
                        const bind = over.kids[0];
                        if (bind.type === '=>')
                            continue;
                        const over_name = name_of.call(this, over);
                        const body = [
                            args_of.call(this, over),
                            over.struct('()', over.hack(belt, { chain: [over.type] })),
                        ];
                        overrides.push(over.struct('=', [
                            over.struct('()', [
                                over.struct('obj'),
                                over.struct('[]', [
                                    over.data(over_name),
                                ]),
                            ]),
                            over.struct('=>', body),
                        ]));
                    }
                    return [
                        input.struct('const', [
                            input.struct('obj'),
                            input.struct('new', [
                                input.struct('this'),
                                input.struct('[]', [
                                    input.data('$'),
                                ]),
                                input.struct('[]', [
                                    input.data(input.type.replace(/<.+>/g, '')),
                                ]),
                                input.struct('(,)', input.select('/', null).hack(belt)),
                            ]),
                        ]),
                        ...overrides,
                        input.struct('obj'),
                    ];
                }
                return [input];
            },
        });
        members.push(prop.struct('.', [
            prop.data(name),
            params_of.call(this, prop),
            prop.struct('{;}', [
                ...next && !is_delegate ? [
                    prop.struct('if', [
                        prop.struct('(!==)', [
                            prop.struct('next'),
                            prop.struct('undefined'),
                        ]),
                        prop.struct('return', [
                            prop.struct('next'),
                        ]),
                    ]),
                ] : [],
                ...val.slice(0, -1),
                prop.struct('return', val.slice(-1)),
            ]),
        ]));
        return acc;
    }
    function $mol_view_tree2_to_js(descr) {
        descr = $mol_view_tree2_classes(descr);
        const definitions = [];
        for (const klass of descr.kids) {
            const parent = klass.kids[0];
            const props = this.$mol_view_tree2_class_props(klass);
            const addons = [];
            const members = [];
            const acc = { klass, addons, members };
            for (const prop of props) {
                try {
                    klass_body.call(this, acc, prop);
                }
                catch (e) {
                    e.message += ` at ${prop.span}`;
                    $mol_fail_hidden(e);
                }
            }
            definitions.push(klass.struct('=', [
                klass.struct('()', [
                    klass.struct('$'),
                    klass.struct('[]', [
                        klass.data(klass.type),
                    ]),
                ]),
                klass.struct('class', [
                    klass.struct(klass.type),
                    parent.struct('extends', [
                        parent.struct('()', [
                            parent.struct('$'),
                            parent.struct('[]', [
                                parent.data(parent.type),
                            ]),
                        ]),
                    ]),
                    klass.struct('{}', members),
                ]),
            ]), ...addons);
        }
        return descr.list([
            descr.struct(';', definitions)
        ]);
    }
    $.$mol_view_tree2_to_js = $mol_view_tree2_to_js;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function is_identifier(tree) {
        if (tree.type)
            return false;
        return /^[a-z_$][a-z_$0-9]*$/i.test(tree.text());
    }
    function $mol_tree2_js_to_text(js) {
        function sequence(open, separator, close) {
            return (input, belt) => [
                input.struct('line', [
                    ...open ? [input.data(open)] : [],
                    input.struct(separator && input.kids.length > 2 ? 'indent' : 'line', [].concat(...input.kids.map((kid, index) => [
                        kid.struct('line', [
                            ...kid.list([kid]).hack(belt),
                            ...(separator && index < input.kids.length - 1) ? [input.data(separator)] : [],
                        ]),
                    ]))),
                    ...close ? [input.data(close)] : [],
                ]),
            ];
        }
        function block(open, separator, close) {
            return (input, belt) => [
                ...open ? [input.data(open)] : [],
                ...input.kids.length === 0 ? [] : [input.struct('indent', input.kids.map((kid, index) => kid.struct('line', [
                        ...kid.list([kid]).hack(belt),
                        ...(separator) ? [input.data(separator)] : [],
                    ])))],
                ...close ? [input.data(close)] : [],
            ];
        }
        function duplet(open, separator, close) {
            return (input, belt) => [
                input.struct('line', [
                    ...open ? [input.data(open)] : [],
                    ...input.list(input.kids.slice(0, 1)).hack(belt),
                    ...(separator && input.kids.length > 1) ? [input.data(separator)] : [],
                    ...input.list(input.kids.slice(1, 2)).hack(belt),
                    ...close ? [input.data(close)] : [],
                ]),
            ];
        }
        function triplet(open, separator12, separator23, close) {
            return (input, belt) => [
                input.struct('line', [
                    ...open ? [input.data(open)] : [],
                    ...input.list(input.kids.slice(0, 1)).hack(belt),
                    ...(separator12 && input.kids.length > 1) ? [input.data(separator12)] : [],
                    ...input.list(input.kids.slice(1, 2)).hack(belt),
                    ...(separator23 && input.kids.length > 2) ? [input.data(separator23)] : [],
                    ...input.list(input.kids.slice(2, 3)).hack(belt),
                    ...close ? [input.data(close)] : [],
                ]),
            ];
        }
        return js.list(js.hack({
            '+': sequence('+'),
            '-': sequence('-'),
            '!': sequence('!'),
            '~': sequence('~'),
            'return': sequence('return '),
            'break': sequence('break '),
            'continue': sequence('continue '),
            'yield': sequence('yield '),
            'yield*': sequence('yield* '),
            'await': sequence('await '),
            'void': sequence('void '),
            'delete': sequence('delete '),
            'typeof': sequence('typeof '),
            'new': sequence('new '),
            '...': sequence('...'),
            '@++': sequence('', '', '++'),
            '@--': sequence('', '', '--'),
            '(in)': sequence('(', ' in ', ')'),
            '(instanceof)': sequence('(', ' instanceof ', ')'),
            '(+)': sequence('(', ' + ', ')'),
            '(-)': sequence('(', ' - ', ')'),
            '(*)': sequence('(', ' * ', ')'),
            '(/)': sequence('(', ' / ', ')'),
            '(%)': sequence('(', ' % ', ')'),
            '(**)': sequence('(', ' ** ', ')'),
            '(<)': sequence('(', ' < ', ')'),
            '(<=)': sequence('(', ' <= ', ')'),
            '(>)': sequence('(', ' > ', ')'),
            '(>=)': sequence('(', ' >= ', ')'),
            '(==)': sequence('(', ' == ', ')'),
            '(!=)': sequence('(', ' != ', ')'),
            '(===)': sequence('(', ' === ', ')'),
            '(!==)': sequence('(', ' !== ', ')'),
            '(<<)': sequence('(', ' << ', ')'),
            '(>>)': sequence('(', ' >> ', ')'),
            '(>>>)': sequence('(', ' >>> ', ')'),
            '(&)': sequence('(', ' & ', ')'),
            '(|)': sequence('(', ' | ', ')'),
            '(^)': sequence('(', ' ^ ', ')'),
            '(&&)': sequence('(', ' && ', ')'),
            '(||)': sequence('(', ' || ', ')'),
            '(,)': sequence('(', ', ', ')'),
            '{;}': block('{', ';', '}'),
            ';': block('', ';', ''),
            '[,]': sequence('[', ', ', ']'),
            '{,}': sequence('{', ', ', '}'),
            '()': sequence('(', '', ')'),
            '{}': block('{', '', '}'),
            '[]': (input, belt) => {
                const first = input.kids[0];
                if (!is_identifier(first))
                    return sequence('[', '', ']')(input, belt);
                else
                    return [input.data('.' + first.text())];
            },
            '?.[]': (input, belt) => {
                const first = input.kids[0];
                if (!is_identifier(first))
                    return sequence('?.[', '', ']')(input, belt);
                else
                    return [input.data('?.' + first.text())];
            },
            ':': (input, belt) => input.kids[0].type
                ? duplet('[', ']: ')(input, belt)
                : duplet('', ': ')(input, belt),
            'let': duplet('let ', ' = '),
            'const': duplet('const ', ' = '),
            'var': duplet('var ', ' = '),
            '=': duplet('', ' = '),
            '+=': duplet('', ' += '),
            '-=': duplet('', ' -= '),
            '*=': duplet('', ' *= '),
            '/=': duplet('', ' /= '),
            '%=': duplet('', ' %= '),
            '**=': duplet('', ' **= '),
            '<<=': duplet('', ' <<= '),
            '>>=': duplet('', ' >>= '),
            '>>>=': duplet('', ' >>>= '),
            '&=': duplet('', ' &= '),
            '|=': duplet('', ' |= '),
            '^=': duplet('', ' ^= '),
            '&&=': duplet('', ' &&= '),
            '||=': duplet('', ' ||= '),
            '=>': duplet('', ' => '),
            'async=>': duplet('async ', ' => '),
            'function': triplet('function '),
            'function*': triplet('function* '),
            'async': triplet('async function '),
            'async*': triplet('async function* '),
            'class': triplet('class ', ' '),
            'extends': sequence('extends ', '', ' '),
            'if': triplet('if', ' ', 'else'),
            '?:': triplet('', ' ? ', ' : '),
            '.': (input, belt) => {
                const first = input.kids[0];
                if (!is_identifier(first))
                    return triplet('[', ']')(input, belt);
                else
                    return [
                        input.data(first.text()),
                        ...input.list(input.kids.slice(1)).hack(belt),
                    ];
            },
            'get': triplet('get [', ']'),
            'set': triplet('set [', ']'),
            'static': triplet('static [', ']'),
            '/./': sequence(),
            '.global': sequence('g'),
            '.multiline': sequence('m'),
            '.ignoreCase': sequence('i'),
            '.source': (input, belt) => [
                input.data('/'),
                input.data(JSON.stringify(input.text()).slice(1, -1)),
                input.data('/'),
            ],
            '``': (input, belt) => {
                return [
                    input.struct('line', [
                        input.data('`'),
                        ...[].concat(...input.kids.map(kid => {
                            if (kid.type) {
                                return [
                                    kid.data('${'),
                                    ...kid.list([kid]).hack(belt),
                                    kid.data('}'),
                                ];
                            }
                            else {
                                return [
                                    input.data(JSON.stringify(kid.text()).slice(1, -1)),
                                ];
                            }
                        })),
                        input.data('`'),
                    ]),
                ];
            },
            '': (input, belt) => {
                if (!input.type)
                    return [
                        input.data(JSON.stringify(input.text())),
                    ];
                if (/^[\w$#][\w0-9$]*$/i.test(input.type))
                    return [
                        input.data(input.type),
                    ];
                if ($mol_tree2_js_is_number(input.type))
                    return [
                        input.data(input.type)
                    ];
                $mol_fail(new SyntaxError(`Wrong node type`));
            },
        }));
    }
    $.$mol_tree2_js_to_text = $mol_tree2_js_to_text;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_tree2_text_to_string(text) {
        let res = '';
        function visit(text, prefix, inline) {
            if (text.type === 'indent') {
                if (inline)
                    res += '\n';
                for (let kid of text.kids) {
                    visit(kid, prefix + '\t', false);
                }
                if (inline)
                    res += prefix;
            }
            else if (text.type === 'line') {
                if (!inline)
                    res += prefix;
                for (let kid of text.kids) {
                    visit(kid, prefix, true);
                }
                if (!inline)
                    res += '\n';
            }
            else {
                if (!inline)
                    res += prefix;
                res += text.text();
                if (!inline)
                    res += '\n';
            }
        }
        for (let kid of text.kids) {
            visit(kid, '', false);
        }
        return res;
    }
    $.$mol_tree2_text_to_string = $mol_tree2_text_to_string;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_docs_editor extends $.$bog_docs_editor {
            transpiled() {
                const source = this.source();
                if (!source.trim())
                    return '';
                const tree = this.$.$mol_tree2_from_string(source, 'editor.view.tree');
                const js_tree = this.$.$mol_view_tree2_to_js(tree);
                const js_text = this.$.$mol_tree2_js_to_text(js_tree);
                return this.$.$mol_tree2_text_to_string(js_text);
            }
            preview_text() {
                try {
                    const js = this.transpiled();
                    if (!js)
                        return '';
                    return '```javascript\n' + js + '```';
                }
                catch (error) {
                    if (error instanceof Promise)
                        throw error;
                    return '> **Error:** ' + String(error.message || error);
                }
            }
        }
        __decorate([
            $mol_mem
        ], $bog_docs_editor.prototype, "transpiled", null);
        __decorate([
            $mol_mem
        ], $bog_docs_editor.prototype, "preview_text", null);
        $$.$bog_docs_editor = $bog_docs_editor;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($bog_docs_editor, {
            display: 'flex',
            flex: {
                wrap: 'wrap',
            },
            gap: $mol_gap.block,
            Code: {
                flex: {
                    basis: '300px',
                    grow: 1,
                    shrink: 1,
                },
                minHeight: '10rem',
            },
            Preview: {
                flex: {
                    basis: '300px',
                    grow: 1,
                    shrink: 1,
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$bog_docs_landing) = class $bog_docs_landing extends ($.$mol_page) {
		Hero_title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.$.$mol_locale.text("$bog_docs_landing_Hero_title_sub"))]);
			return obj;
		}
		Hero_subtitle(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.$.$mol_locale.text("$bog_docs_landing_Hero_subtitle_sub"))]);
			return obj;
		}
		Get_started(){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ({"page": "guide"});
			(obj.sub) = () => ([(this.$.$mol_locale.text("$bog_docs_landing_Get_started_sub"))]);
			return obj;
		}
		Play_link(){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ({"page": "play"});
			(obj.sub) = () => ([(this.$.$mol_locale.text("$bog_docs_landing_Play_link_sub"))]);
			return obj;
		}
		Hero_actions(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Get_started()), (this.Play_link())]);
			return obj;
		}
		Hero(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Hero_title()), 
				(this.Hero_subtitle()), 
				(this.Hero_actions())
			]);
			return obj;
		}
		Prop_reactive_icon(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => (["⚡"]);
			return obj;
		}
		Prop_reactive_title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.$.$mol_locale.text("$bog_docs_landing_Prop_reactive_title_sub"))]);
			return obj;
		}
		Prop_reactive_text(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.$.$mol_locale.text("$bog_docs_landing_Prop_reactive_text_sub"))]);
			return obj;
		}
		Prop_reactive(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Prop_reactive_icon()), 
				(this.Prop_reactive_title()), 
				(this.Prop_reactive_text())
			]);
			return obj;
		}
		Prop_composable_icon(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => (["🧩"]);
			return obj;
		}
		Prop_composable_title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.$.$mol_locale.text("$bog_docs_landing_Prop_composable_title_sub"))]);
			return obj;
		}
		Prop_composable_text(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.$.$mol_locale.text("$bog_docs_landing_Prop_composable_text_sub"))]);
			return obj;
		}
		Prop_composable(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Prop_composable_icon()), 
				(this.Prop_composable_title()), 
				(this.Prop_composable_text())
			]);
			return obj;
		}
		Prop_lightweight_icon(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => (["🪶"]);
			return obj;
		}
		Prop_lightweight_title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.$.$mol_locale.text("$bog_docs_landing_Prop_lightweight_title_sub"))]);
			return obj;
		}
		Prop_lightweight_text(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.$.$mol_locale.text("$bog_docs_landing_Prop_lightweight_text_sub"))]);
			return obj;
		}
		Prop_lightweight(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Prop_lightweight_icon()), 
				(this.Prop_lightweight_title()), 
				(this.Prop_lightweight_text())
			]);
			return obj;
		}
		Props(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Prop_reactive()), 
				(this.Prop_composable()), 
				(this.Prop_lightweight())
			]);
			return obj;
		}
		Demo_title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.$.$mol_locale.text("$bog_docs_landing_Demo_title_sub"))]);
			return obj;
		}
		Demo_subtitle(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.$.$mol_locale.text("$bog_docs_landing_Demo_subtitle_sub"))]);
			return obj;
		}
		demo_source(next){
			if(next !== undefined) return next;
			return "";
		}
		Demo_editor(){
			const obj = new this.$.$bog_docs_editor();
			(obj.source) = (next) => ((this.demo_source(next)));
			return obj;
		}
		Demo(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Demo_title()), 
				(this.Demo_subtitle()), 
				(this.Demo_editor())
			]);
			return obj;
		}
		Ecosystem_title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.$.$mol_locale.text("$bog_docs_landing_Ecosystem_title_sub"))]);
			return obj;
		}
		Link_mam(){
			const obj = new this.$.$mol_link();
			(obj.uri) = () => ("https://github.com/hyoo-ru/mam");
			(obj.target) = () => ("_blank");
			(obj.sub) = () => (["MAM"]);
			return obj;
		}
		Link_giper(){
			const obj = new this.$.$mol_link();
			(obj.uri) = () => ("https://baza.hyoo.ru/");
			(obj.target) = () => ("_blank");
			(obj.sub) = () => (["Giper Baza"]);
			return obj;
		}
		Link_components(){
			const obj = new this.$.$mol_link();
			(obj.uri) = () => ("https://mol.hyoo.ru/");
			(obj.target) = () => ("_blank");
			(obj.sub) = () => (["Components"]);
			return obj;
		}
		Link_tauri(){
			const obj = new this.$.$mol_link();
			(obj.uri) = () => ("https://tauri.app/");
			(obj.target) = () => ("_blank");
			(obj.sub) = () => (["Tauri"]);
			return obj;
		}
		Ecosystem_links(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Link_mam()), 
				(this.Link_giper()), 
				(this.Link_components()), 
				(this.Link_tauri())
			]);
			return obj;
		}
		Ecosystem(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Ecosystem_title()), (this.Ecosystem_links())]);
			return obj;
		}
		Link_github(){
			const obj = new this.$.$mol_link();
			(obj.uri) = () => ("https://github.com/hyoo-ru/mam");
			(obj.target) = () => ("_blank");
			(obj.sub) = () => (["GitHub"]);
			return obj;
		}
		Link_docs(){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ({"page": "guide"});
			(obj.sub) = () => ([(this.$.$mol_locale.text("$bog_docs_landing_Link_docs_sub"))]);
			return obj;
		}
		Link_community(){
			const obj = new this.$.$mol_link();
			(obj.uri) = () => ("https://t.me/nicehero");
			(obj.target) = () => ("_blank");
			(obj.sub) = () => ([(this.$.$mol_locale.text("$bog_docs_landing_Link_community_sub"))]);
			return obj;
		}
		Footer_links(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Link_github()), 
				(this.Link_docs()), 
				(this.Link_community())
			]);
			return obj;
		}
		Footer(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Footer_links())]);
			return obj;
		}
		title(){
			return (this.$.$mol_locale.text("$bog_docs_landing_title"));
		}
		body(){
			return [
				(this.Hero()), 
				(this.Props()), 
				(this.Demo()), 
				(this.Ecosystem()), 
				(this.Footer())
			];
		}
	};
	($mol_mem(($.$bog_docs_landing.prototype), "Hero_title"));
	($mol_mem(($.$bog_docs_landing.prototype), "Hero_subtitle"));
	($mol_mem(($.$bog_docs_landing.prototype), "Get_started"));
	($mol_mem(($.$bog_docs_landing.prototype), "Play_link"));
	($mol_mem(($.$bog_docs_landing.prototype), "Hero_actions"));
	($mol_mem(($.$bog_docs_landing.prototype), "Hero"));
	($mol_mem(($.$bog_docs_landing.prototype), "Prop_reactive_icon"));
	($mol_mem(($.$bog_docs_landing.prototype), "Prop_reactive_title"));
	($mol_mem(($.$bog_docs_landing.prototype), "Prop_reactive_text"));
	($mol_mem(($.$bog_docs_landing.prototype), "Prop_reactive"));
	($mol_mem(($.$bog_docs_landing.prototype), "Prop_composable_icon"));
	($mol_mem(($.$bog_docs_landing.prototype), "Prop_composable_title"));
	($mol_mem(($.$bog_docs_landing.prototype), "Prop_composable_text"));
	($mol_mem(($.$bog_docs_landing.prototype), "Prop_composable"));
	($mol_mem(($.$bog_docs_landing.prototype), "Prop_lightweight_icon"));
	($mol_mem(($.$bog_docs_landing.prototype), "Prop_lightweight_title"));
	($mol_mem(($.$bog_docs_landing.prototype), "Prop_lightweight_text"));
	($mol_mem(($.$bog_docs_landing.prototype), "Prop_lightweight"));
	($mol_mem(($.$bog_docs_landing.prototype), "Props"));
	($mol_mem(($.$bog_docs_landing.prototype), "Demo_title"));
	($mol_mem(($.$bog_docs_landing.prototype), "Demo_subtitle"));
	($mol_mem(($.$bog_docs_landing.prototype), "demo_source"));
	($mol_mem(($.$bog_docs_landing.prototype), "Demo_editor"));
	($mol_mem(($.$bog_docs_landing.prototype), "Demo"));
	($mol_mem(($.$bog_docs_landing.prototype), "Ecosystem_title"));
	($mol_mem(($.$bog_docs_landing.prototype), "Link_mam"));
	($mol_mem(($.$bog_docs_landing.prototype), "Link_giper"));
	($mol_mem(($.$bog_docs_landing.prototype), "Link_components"));
	($mol_mem(($.$bog_docs_landing.prototype), "Link_tauri"));
	($mol_mem(($.$bog_docs_landing.prototype), "Ecosystem_links"));
	($mol_mem(($.$bog_docs_landing.prototype), "Ecosystem"));
	($mol_mem(($.$bog_docs_landing.prototype), "Link_github"));
	($mol_mem(($.$bog_docs_landing.prototype), "Link_docs"));
	($mol_mem(($.$bog_docs_landing.prototype), "Link_community"));
	($mol_mem(($.$bog_docs_landing.prototype), "Footer_links"));
	($mol_mem(($.$bog_docs_landing.prototype), "Footer"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const d = '$';
        class $bog_docs_landing extends $.$bog_docs_landing {
            demo_source(next) {
                return next ?? [
                    `${d}my_counter ${d}mol_page`,
                    `\ttitle \\My Counter`,
                    `\tbody /`,
                    `\t\t<= Count ${d}mol_number`,
                    `\t\t\tvalue? <=> count? 0`,
                    `\t\t<= Reset ${d}mol_button_major`,
                    `\t\t\ttitle \\Reset`,
                    `\t\t\tclick? <=> reset? null`,
                ].join('\n');
            }
        }
        __decorate([
            $mol_mem
        ], $bog_docs_landing.prototype, "demo_source", null);
        $$.$bog_docs_landing = $bog_docs_landing;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($bog_docs_landing, {
            Hero: {
                flex: {
                    direction: 'column',
                },
                align: {
                    items: 'center',
                },
                justify: {
                    content: 'center',
                },
                padding: {
                    top: '4rem',
                    bottom: '4rem',
                    left: '2rem',
                    right: '2rem',
                },
                gap: '1.5rem',
                textAlign: 'center',
            },
            Hero_title: {
                font: {
                    size: '2.5rem',
                    weight: 'bold',
                },
                color: $mol_theme.text,
            },
            Hero_subtitle: {
                font: {
                    size: '1.25rem',
                },
                color: $mol_theme.shade,
            },
            Hero_actions: {
                gap: '1rem',
                justify: {
                    content: 'center',
                },
                flex: {
                    wrap: 'wrap',
                },
            },
            Get_started: {
                padding: {
                    top: '0.75rem',
                    bottom: '0.75rem',
                    left: '2rem',
                    right: '2rem',
                },
                background: {
                    color: $mol_theme.control,
                },
                color: $mol_theme.back,
                border: {
                    radius: $mol_gap.round,
                },
                font: {
                    weight: 'bold',
                    size: '1rem',
                },
            },
            Play_link: {
                padding: {
                    top: '0.75rem',
                    bottom: '0.75rem',
                    left: '2rem',
                    right: '2rem',
                },
                border: {
                    style: 'solid',
                    width: '2px',
                    color: $mol_theme.control,
                    radius: $mol_gap.round,
                },
                color: $mol_theme.control,
                font: {
                    weight: 'bold',
                    size: '1rem',
                },
            },
            Props: {
                flex: {
                    wrap: 'wrap',
                },
                justify: {
                    content: 'center',
                },
                gap: '1.5rem',
                padding: {
                    top: '2rem',
                    bottom: '3rem',
                    left: '2rem',
                    right: '2rem',
                },
            },
            Prop_reactive: {
                flex: {
                    direction: 'column',
                    basis: '250px',
                    grow: 1,
                    shrink: 1,
                },
                maxWidth: '350px',
                padding: $mol_gap.block,
                border: {
                    style: 'solid',
                    width: '1px',
                    color: $mol_theme.line,
                    radius: $mol_gap.round,
                },
                gap: '0.5rem',
            },
            Prop_composable: {
                flex: {
                    direction: 'column',
                    basis: '250px',
                    grow: 1,
                    shrink: 1,
                },
                maxWidth: '350px',
                padding: $mol_gap.block,
                border: {
                    style: 'solid',
                    width: '1px',
                    color: $mol_theme.line,
                    radius: $mol_gap.round,
                },
                gap: '0.5rem',
            },
            Prop_lightweight: {
                flex: {
                    direction: 'column',
                    basis: '250px',
                    grow: 1,
                    shrink: 1,
                },
                maxWidth: '350px',
                padding: $mol_gap.block,
                border: {
                    style: 'solid',
                    width: '1px',
                    color: $mol_theme.line,
                    radius: $mol_gap.round,
                },
                gap: '0.5rem',
            },
            Prop_reactive_icon: {
                font: {
                    size: '2rem',
                },
            },
            Prop_composable_icon: {
                font: {
                    size: '2rem',
                },
            },
            Prop_lightweight_icon: {
                font: {
                    size: '2rem',
                },
            },
            Prop_reactive_title: {
                font: {
                    size: '1.25rem',
                    weight: 'bold',
                },
                color: $mol_theme.text,
            },
            Prop_composable_title: {
                font: {
                    size: '1.25rem',
                    weight: 'bold',
                },
                color: $mol_theme.text,
            },
            Prop_lightweight_title: {
                font: {
                    size: '1.25rem',
                    weight: 'bold',
                },
                color: $mol_theme.text,
            },
            Prop_reactive_text: {
                color: $mol_theme.shade,
            },
            Prop_composable_text: {
                color: $mol_theme.shade,
            },
            Prop_lightweight_text: {
                color: $mol_theme.shade,
            },
            Demo: {
                flex: {
                    direction: 'column',
                },
                align: {
                    items: 'center',
                },
                padding: {
                    top: '2rem',
                    bottom: '3rem',
                    left: '2rem',
                    right: '2rem',
                },
                gap: '1rem',
            },
            Demo_title: {
                font: {
                    size: '1.5rem',
                    weight: 'bold',
                },
                color: $mol_theme.text,
            },
            Demo_subtitle: {
                color: $mol_theme.shade,
                textAlign: 'center',
            },
            Demo_editor: {
                width: '100%',
                maxWidth: '800px',
                border: {
                    style: 'solid',
                    width: '1px',
                    color: $mol_theme.line,
                    radius: $mol_gap.round,
                },
                padding: $mol_gap.block,
            },
            Ecosystem: {
                flex: {
                    direction: 'column',
                },
                align: {
                    items: 'center',
                },
                padding: {
                    top: '2rem',
                    bottom: '2rem',
                    left: '2rem',
                    right: '2rem',
                },
                gap: '1.5rem',
            },
            Ecosystem_title: {
                font: {
                    size: '1.5rem',
                    weight: 'bold',
                },
                color: $mol_theme.text,
            },
            Ecosystem_links: {
                flex: {
                    wrap: 'wrap',
                },
                justify: {
                    content: 'center',
                },
                gap: '1rem',
            },
            Link_mam: {
                padding: {
                    top: '0.5rem',
                    bottom: '0.5rem',
                    left: '1.5rem',
                    right: '1.5rem',
                },
                border: {
                    style: 'solid',
                    width: '1px',
                    color: $mol_theme.line,
                    radius: $mol_gap.round,
                },
                color: $mol_theme.control,
            },
            Link_giper: {
                padding: {
                    top: '0.5rem',
                    bottom: '0.5rem',
                    left: '1.5rem',
                    right: '1.5rem',
                },
                border: {
                    style: 'solid',
                    width: '1px',
                    color: $mol_theme.line,
                    radius: $mol_gap.round,
                },
                color: $mol_theme.control,
            },
            Link_components: {
                padding: {
                    top: '0.5rem',
                    bottom: '0.5rem',
                    left: '1.5rem',
                    right: '1.5rem',
                },
                border: {
                    style: 'solid',
                    width: '1px',
                    color: $mol_theme.line,
                    radius: $mol_gap.round,
                },
                color: $mol_theme.control,
            },
            Link_tauri: {
                padding: {
                    top: '0.5rem',
                    bottom: '0.5rem',
                    left: '1.5rem',
                    right: '1.5rem',
                },
                border: {
                    style: 'solid',
                    width: '1px',
                    color: $mol_theme.line,
                    radius: $mol_gap.round,
                },
                color: $mol_theme.control,
            },
            Footer: {
                flex: {
                    direction: 'column',
                },
                align: {
                    items: 'center',
                },
                padding: {
                    top: '2rem',
                    bottom: '2rem',
                    left: '2rem',
                    right: '2rem',
                },
                border: {
                    top: {
                        style: 'solid',
                        width: '1px',
                        color: $mol_theme.line,
                    },
                },
            },
            Footer_links: {
                gap: '2rem',
                justify: {
                    content: 'center',
                },
                flex: {
                    wrap: 'wrap',
                },
            },
            Link_github: {
                color: $mol_theme.shade,
            },
            Link_docs: {
                color: $mol_theme.shade,
            },
            Link_community: {
                color: $mol_theme.shade,
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_button_major) = class $mol_button_major extends ($.$mol_button_minor) {
		theme(){
			return "$mol_theme_base";
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/button/major/major.view.css", "[mol_button_major] {\n\tbackground-color: var(--mol_theme_back);\n\tcolor: var(--mol_theme_text);\n}\n");
})($ || ($ = {}));

;
"use strict";

;
	($.$bog_docs_guide_lesson) = class $bog_docs_guide_lesson extends ($.$mol_page) {
		lesson_title(){
			return (this.$.$mol_locale.text("$bog_docs_guide_lesson_lesson_title"));
		}
		explanation(){
			return "";
		}
		Explanation(){
			const obj = new this.$.$mol_text();
			(obj.text) = () => ((this.explanation()));
			return obj;
		}
		code(next){
			if(next !== undefined) return next;
			return "";
		}
		Code_editor(){
			const obj = new this.$.$bog_docs_editor();
			(obj.source) = (next) => ((this.code(next)));
			return obj;
		}
		task_text(){
			return "";
		}
		Task_description(){
			const obj = new this.$.$mol_text();
			(obj.text) = () => ((this.task_text()));
			return obj;
		}
		hints_shown(){
			return [];
		}
		Hints_section(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.hints_shown()));
			return obj;
		}
		check(next){
			if(next !== undefined) return next;
			return null;
		}
		Check_button(){
			const obj = new this.$.$mol_button_major();
			(obj.click) = (next) => ((this.check(next)));
			(obj.sub) = () => ([(this.$.$mol_locale.text("$bog_docs_guide_lesson_Check_button_sub"))]);
			return obj;
		}
		check_result_sub(){
			return [];
		}
		Check_result(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.check_result_sub()));
			return obj;
		}
		show_hint(next){
			if(next !== undefined) return next;
			return null;
		}
		Hint_button(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.show_hint(next)));
			(obj.sub) = () => ([(this.$.$mol_locale.text("$bog_docs_guide_lesson_Hint_button_sub"))]);
			return obj;
		}
		show_solution(next){
			if(next !== undefined) return next;
			return null;
		}
		Solution_button(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.show_solution(next)));
			(obj.sub) = () => ([(this.$.$mol_locale.text("$bog_docs_guide_lesson_Solution_button_sub"))]);
			return obj;
		}
		next_arg(){
			return {};
		}
		Next_button(){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ((this.next_arg()));
			(obj.sub) = () => ([(this.$.$mol_locale.text("$bog_docs_guide_lesson_Next_button_sub"))]);
			return obj;
		}
		Actions(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Check_button()), 
				(this.Check_result()), 
				(this.Hint_button()), 
				(this.Solution_button()), 
				(this.Next_button())
			]);
			return obj;
		}
		Task_section(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Task_description()), 
				(this.Hints_section()), 
				(this.Actions())
			]);
			return obj;
		}
		hint_text(id){
			return "";
		}
		title(){
			return (this.lesson_title());
		}
		lesson_id(){
			return "";
		}
		initial_code(){
			return "";
		}
		solution(){
			return "";
		}
		hints(){
			return [];
		}
		body(){
			return [
				(this.Explanation()), 
				(this.Code_editor()), 
				(this.Task_section())
			];
		}
		Hint_text(id){
			const obj = new this.$.$mol_text();
			(obj.text) = () => ((this.hint_text(id)));
			return obj;
		}
		Check_success(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.$.$mol_locale.text("$bog_docs_guide_lesson_Check_success_sub"))]);
			return obj;
		}
		Check_error(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.$.$mol_locale.text("$bog_docs_guide_lesson_Check_error_sub"))]);
			return obj;
		}
	};
	($mol_mem(($.$bog_docs_guide_lesson.prototype), "Explanation"));
	($mol_mem(($.$bog_docs_guide_lesson.prototype), "code"));
	($mol_mem(($.$bog_docs_guide_lesson.prototype), "Code_editor"));
	($mol_mem(($.$bog_docs_guide_lesson.prototype), "Task_description"));
	($mol_mem(($.$bog_docs_guide_lesson.prototype), "Hints_section"));
	($mol_mem(($.$bog_docs_guide_lesson.prototype), "check"));
	($mol_mem(($.$bog_docs_guide_lesson.prototype), "Check_button"));
	($mol_mem(($.$bog_docs_guide_lesson.prototype), "Check_result"));
	($mol_mem(($.$bog_docs_guide_lesson.prototype), "show_hint"));
	($mol_mem(($.$bog_docs_guide_lesson.prototype), "Hint_button"));
	($mol_mem(($.$bog_docs_guide_lesson.prototype), "show_solution"));
	($mol_mem(($.$bog_docs_guide_lesson.prototype), "Solution_button"));
	($mol_mem(($.$bog_docs_guide_lesson.prototype), "Next_button"));
	($mol_mem(($.$bog_docs_guide_lesson.prototype), "Actions"));
	($mol_mem(($.$bog_docs_guide_lesson.prototype), "Task_section"));
	($mol_mem_key(($.$bog_docs_guide_lesson.prototype), "Hint_text"));
	($mol_mem(($.$bog_docs_guide_lesson.prototype), "Check_success"));
	($mol_mem(($.$bog_docs_guide_lesson.prototype), "Check_error"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($bog_docs_guide_lesson, {
            Explanation: {
                padding: $mol_gap.block,
                background: {
                    color: $mol_theme.card,
                },
                border: {
                    radius: $mol_gap.round,
                },
            },
            Code_editor: {
                border: {
                    style: 'solid',
                    width: '1px',
                    color: $mol_theme.line,
                    radius: $mol_gap.round,
                },
                padding: $mol_gap.block,
            },
            Task_section: {
                flex: {
                    direction: 'column',
                },
                gap: $mol_gap.block,
                padding: $mol_gap.block,
                background: {
                    color: $mol_theme.card,
                },
                border: {
                    radius: $mol_gap.round,
                },
            },
            Hints_section: {
                flex: {
                    direction: 'column',
                },
                gap: '0.5rem',
            },
            Hint_text: {
                padding: $mol_gap.block,
                background: {
                    color: '#ffb3001a',
                },
                border: {
                    radius: $mol_gap.round,
                },
            },
            Actions: {
                gap: $mol_gap.block,
                flex: {
                    wrap: 'wrap',
                },
                align: {
                    items: 'center',
                },
                padding: {
                    top: '0.75rem',
                },
                border: {
                    top: {
                        style: 'solid',
                        width: '1px',
                        color: $mol_theme.line,
                    },
                },
            },
            Check_success: {
                color: '#388e3c',
                font: {
                    weight: 'bold',
                },
                padding: {
                    top: '0.25rem',
                    bottom: '0.25rem',
                    left: '0.75rem',
                    right: '0.75rem',
                },
                background: {
                    color: '#388e3c1a',
                },
                border: {
                    radius: $mol_gap.round,
                },
            },
            Check_error: {
                color: '#d32f2f',
                font: {
                    weight: 'bold',
                },
                padding: {
                    top: '0.25rem',
                    bottom: '0.25rem',
                    left: '0.75rem',
                    right: '0.75rem',
                },
                background: {
                    color: '#d32f2f1a',
                },
                border: {
                    radius: $mol_gap.round,
                },
            },
            Next_button: {
                color: $mol_theme.control,
                font: {
                    weight: 'bold',
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_docs_guide_lesson extends $.$bog_docs_guide_lesson {
            code(next) {
                const id = this.lesson_id();
                const key = 'bog_docs_code_' + id;
                if (next !== undefined) {
                    this.$.$mol_state_local.value(key, next);
                    return next;
                }
                const saved = this.$.$mol_state_local.value(key);
                return saved ?? this.initial_code();
            }
            check_status(next) {
                const id = this.lesson_id();
                if (next !== undefined) {
                    if (next === 'success') {
                        this.$.$mol_state_local.value('bog_docs_done_' + id, true);
                    }
                    return next;
                }
                const done = this.$.$mol_state_local.value('bog_docs_done_' + id);
                return done ? 'success' : '';
            }
            check_result_sub() {
                const status = this.check_status();
                if (status === 'success')
                    return [this.Check_success()];
                if (status === 'error')
                    return [this.Check_error()];
                return [];
            }
            check(next) {
                try {
                    const code = this.code().trim();
                    const solution = this.solution().trim();
                    if (!solution) {
                        this.check_status('error');
                        return null;
                    }
                    const code_tree = this.$.$mol_tree2_from_string(code, 'user.view.tree');
                    const solution_tree = this.$.$mol_tree2_from_string(solution, 'solution.view.tree');
                    if (this.trees_equal(code_tree, solution_tree)) {
                        this.check_status('success');
                    }
                    else {
                        this.check_status('error');
                    }
                }
                catch (error) {
                    if (error instanceof Promise)
                        throw error;
                    this.check_status('error');
                }
                return null;
            }
            hints_count(next) {
                return next ?? 0;
            }
            hints_shown() {
                const count = this.hints_count();
                if (count === 0)
                    return [];
                const hints = this.hints();
                const shown = [];
                for (let i = 0; i < Math.min(count, hints.length); i++) {
                    shown.push(this.Hint_text(i));
                }
                return shown;
            }
            hint_text(index) {
                return this.hints()[index] ?? '';
            }
            show_hint(next) {
                const hints = this.hints();
                const current = this.hints_count();
                if (current < hints.length) {
                    this.hints_count(current + 1);
                }
                return null;
            }
            show_solution(next) {
                const solution = this.solution();
                if (solution) {
                    this.code(solution);
                }
                return null;
            }
            trees_equal(a, b) {
                if (a.type !== b.type)
                    return false;
                if (a.value !== b.value)
                    return false;
                if (a.kids.length !== b.kids.length)
                    return false;
                for (let i = 0; i < a.kids.length; i++) {
                    if (!this.trees_equal(a.kids[i], b.kids[i]))
                        return false;
                }
                return true;
            }
        }
        __decorate([
            $mol_mem
        ], $bog_docs_guide_lesson.prototype, "code", null);
        __decorate([
            $mol_mem
        ], $bog_docs_guide_lesson.prototype, "check_status", null);
        __decorate([
            $mol_mem
        ], $bog_docs_guide_lesson.prototype, "check_result_sub", null);
        __decorate([
            $mol_action
        ], $bog_docs_guide_lesson.prototype, "check", null);
        __decorate([
            $mol_mem
        ], $bog_docs_guide_lesson.prototype, "hints_count", null);
        __decorate([
            $mol_mem
        ], $bog_docs_guide_lesson.prototype, "hints_shown", null);
        __decorate([
            $mol_action
        ], $bog_docs_guide_lesson.prototype, "show_hint", null);
        __decorate([
            $mol_action
        ], $bog_docs_guide_lesson.prototype, "show_solution", null);
        $$.$bog_docs_guide_lesson = $bog_docs_guide_lesson;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$bog_docs_guide) = class $bog_docs_guide extends ($.$mol_page) {
		prev_arg(){
			return {};
		}
		Prev_link(){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ((this.prev_arg()));
			(obj.sub) = () => (["‹"]);
			return obj;
		}
		progress_text(){
			return "";
		}
		Progress(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.progress_text())]);
			return obj;
		}
		next_arg(){
			return {};
		}
		Next_link(){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ((this.next_arg()));
			(obj.sub) = () => (["›"]);
			return obj;
		}
		reset_progress(next){
			if(next !== undefined) return next;
			return null;
		}
		Reset_button(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.reset_progress(next)));
			(obj.sub) = () => ([(this.$.$mol_locale.text("$bog_docs_guide_Reset_button_sub"))]);
			return obj;
		}
		current_title(){
			return "";
		}
		current_explanation(){
			return "";
		}
		current_task(){
			return "";
		}
		current_initial_code(){
			return "";
		}
		current_solution(){
			return "";
		}
		current_lesson_id(){
			return "";
		}
		lesson_next_arg(){
			return {};
		}
		Current_lesson(){
			const obj = new this.$.$bog_docs_guide_lesson();
			(obj.lesson_title) = () => ((this.current_title()));
			(obj.explanation) = () => ((this.current_explanation()));
			(obj.task_text) = () => ((this.current_task()));
			(obj.initial_code) = () => ((this.current_initial_code()));
			(obj.solution) = () => ((this.current_solution()));
			(obj.lesson_id) = () => ((this.current_lesson_id()));
			(obj.next_arg) = () => ((this.lesson_next_arg()));
			return obj;
		}
		title(){
			return (this.$.$mol_locale.text("$bog_docs_guide_title"));
		}
		tools(){
			return [
				(this.Prev_link()), 
				(this.Progress()), 
				(this.Next_link()), 
				(this.Reset_button())
			];
		}
		body(){
			return [(this.Current_lesson())];
		}
	};
	($mol_mem(($.$bog_docs_guide.prototype), "Prev_link"));
	($mol_mem(($.$bog_docs_guide.prototype), "Progress"));
	($mol_mem(($.$bog_docs_guide.prototype), "Next_link"));
	($mol_mem(($.$bog_docs_guide.prototype), "reset_progress"));
	($mol_mem(($.$bog_docs_guide.prototype), "Reset_button"));
	($mol_mem(($.$bog_docs_guide.prototype), "Current_lesson"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_docs_guide extends $.$bog_docs_guide {
            lesson_index() {
                const arg = this.$.$mol_state_arg.value('lesson');
                if (arg)
                    return Math.max(0, Math.min(parseInt(arg) - 1, this.lessons().length - 1));
                return 0;
            }
            current_lesson_data() {
                return this.lessons()[this.lesson_index()] ?? this.lessons()[0];
            }
            current_title() {
                return this.current_lesson_data().title;
            }
            current_explanation() {
                return this.current_lesson_data().explanation;
            }
            current_task() {
                return this.current_lesson_data().task;
            }
            current_initial_code() {
                return this.current_lesson_data().initial_code;
            }
            current_solution() {
                return this.current_lesson_data().solution;
            }
            Current_lesson() {
                const obj = super.Current_lesson();
                obj.hints = () => this.current_lesson_data().hints;
                return obj;
            }
            current_lesson_id() {
                return String(this.lesson_index());
            }
            completed_count() {
                let count = 0;
                for (let i = 0; i < this.lessons().length; i++) {
                    if (this.$.$mol_state_local.value('bog_docs_done_' + i))
                        count++;
                }
                return count;
            }
            progress_text() {
                const done = this.completed_count();
                return `${this.lesson_index() + 1} / ${this.lessons().length} (${done} done)`;
            }
            reset_progress(next) {
                const count = this.lessons().length;
                for (let i = 0; i < count; i++) {
                    this.$.$mol_state_local.value('bog_docs_code_' + i, null);
                    this.$.$mol_state_local.value('bog_docs_done_' + i, null);
                }
                return null;
            }
            prev_arg() {
                const idx = this.lesson_index();
                if (idx <= 0)
                    return { lesson: '1' };
                return { lesson: String(idx) };
            }
            next_arg() {
                const idx = this.lesson_index();
                const max = this.lessons().length;
                if (idx >= max - 1)
                    return { lesson: String(max) };
                return { lesson: String(idx + 2) };
            }
            lesson_next_arg() {
                return this.next_arg();
            }
            lessons() {
                const d = '$';
                return [
                    {
                        title: 'Welcome to ' + d + 'mol',
                        explanation: [
                            '# Getting Started',
                            '',
                            'Welcome to the interactive ' + d + 'mol guide. In this lesson you will create your first component.',
                            '',
                            '## Module Structure',
                            '',
                            'Every ' + d + 'mol module lives in its own folder:',
                            '',
                            '```',
                            'my/hello/',
                            '    hello.view.tree    \u2014 component layout',
                            '    hello.view.ts      \u2014 component logic',
                            '    hello.view.css.ts  \u2014 component styles',
                            '```',
                            '',
                            '## view.tree Basics',
                            '',
                            'Components are declared in `.view.tree` files:',
                            '',
                            '```',
                            d + 'my_hello ' + d + 'mol_view',
                            '    sub /',
                            '        \\Hello World!',
                            '```',
                            '',
                            '- Class name starts with `' + d + '` and matches the folder path',
                            '- `' + d + 'mol_view` is the simplest base component',
                            '- `sub /` defines the list of child elements',
                        ].join('\n'),
                        task: 'Create a component `' + d + 'my_hello` extending `' + d + 'mol_view` that displays **Hello World!**.',
                        initial_code: '',
                        solution: [
                            d + 'my_hello ' + d + 'mol_view',
                            '\tsub /',
                            '\t\t\\Hello World!',
                        ].join('\n'),
                        hints: [
                            'Start with: `' + d + 'my_hello ' + d + 'mol_view`',
                            'Add `sub /` on the next line (indented with a tab)',
                            'Add `\\Hello World!` as a child (indented with two tabs)',
                        ],
                    },
                    {
                        title: 'view.tree Syntax',
                        explanation: [
                            '# view.tree Syntax',
                            '',
                            '**view.tree** is the declarative language for describing UI components in ' + d + 'mol.',
                            '',
                            '## Component Declaration',
                            '',
                            'A component starts with its class name and the base class:',
                            '',
                            '```',
                            d + 'my_hello ' + d + 'mol_view',
                            '    sub /',
                            '        \\Hello World!',
                            '```',
                            '',
                            '- `' + d + 'my_hello` \u2014 your component class name',
                            '- `' + d + 'mol_view` \u2014 base class to extend',
                            '- `sub /` \u2014 list of child elements',
                            '- `\\Hello World!` \u2014 raw text content',
                            '',
                            '## Nesting Components',
                            '',
                            'Use `<=` to declare named sub-components:',
                            '',
                            '```',
                            d + 'my_app ' + d + 'mol_view',
                            '    sub /',
                            '        <= Title ' + d + 'mol_view',
                            '            sub / \\Welcome',
                            '        <= Button ' + d + 'mol_button_minor',
                            '            sub / \\Click me',
                            '```',
                            '',
                            'Each `<= Name ' + d + 'Component` creates a named property that returns a component instance.',
                            'This is how you compose complex UIs from simple building blocks.',
                            '',
                            '## Indentation',
                            '',
                            'view.tree uses **tab indentation** to express nesting. Each nested level adds one more tab.',
                        ].join('\n'),
                        task: [
                            'Add a `' + d + 'mol_button_minor` named **Action** inside `' + d + 'my_app` below the existing text.',
                            '',
                            'The button should display text **"Click me"**.',
                            '',
                            'Use `<=` binding syntax to declare the button as a named property.',
                        ].join('\n'),
                        initial_code: [
                            d + 'my_app ' + d + 'mol_view',
                            '\tsub /',
                            '\t\t\\Click the button below',
                        ].join('\n'),
                        solution: [
                            d + 'my_app ' + d + 'mol_view',
                            '\tsub /',
                            '\t\t\\Click the button below',
                            '\t\t<= Action ' + d + 'mol_button_minor',
                            '\t\t\tsub /',
                            '\t\t\t\t\\Click me',
                        ].join('\n'),
                        hints: [
                            'Use `<= Action ' + d + 'mol_button_minor` to add a named sub-component',
                            'The button needs its own `sub /` with `\\Click me` inside',
                            'Align `<= Action` at the same indent level as `\\Click the button below`',
                        ],
                    },
                    {
                        title: 'Bindings',
                        explanation: [
                            '# Bindings in view.tree',
                            '',
                            'Bindings connect properties between components. There are three types:',
                            '',
                            '## One-way binding `<=`',
                            '',
                            'Reads a value from a property. The child **receives** data from the parent:',
                            '',
                            '```',
                            d + 'my_app ' + d + 'mol_view',
                            '    sub /',
                            '        <= Title ' + d + 'mol_view',
                            '            sub / <= title \\Hello',
                            '```',
                            '',
                            'Here `<= title` reads the `title` property. The component displays its value.',
                            '',
                            '## Two-way binding `<=>`',
                            '',
                            'Creates a **synchronized** link between two properties. Changes flow in both directions:',
                            '',
                            '```',
                            d + 'my_form ' + d + 'mol_view',
                            '    sub /',
                            '        <= Name_input ' + d + 'mol_string',
                            '            value? <=> name? \\',
                            '```',
                            '',
                            'When the user types in `Name_input`, the `name` property updates. If `name` changes elsewhere, the input updates too.',
                            '',
                            'The `?` after the property name means it accepts a new value (is writable).',
                            '',
                            '## Output binding `=>`',
                            '',
                            'Passes a property **out** to the parent. The child **provides** data:',
                            '',
                            '```',
                            d + 'my_page ' + d + 'mol_page',
                            '    title <= page_title \\My Page',
                            '    body /',
                            '        <= Content ' + d + 'mol_view',
                            '            sub / <= page_title',
                            '```',
                            '',
                            '## Common Pattern',
                            '',
                            'A typical pattern is connecting an input field to a label so they share the same value:',
                            '',
                            '```',
                            d + 'my_greeting ' + d + 'mol_view',
                            '    sub /',
                            '        <= Input ' + d + 'mol_string',
                            '            value? <=> user_name? \\World',
                            '        <= Output ' + d + 'mol_view',
                            '            sub / <= greeting \\',
                            '```',
                            '',
                            'The `user_name` property is shared between the input and can be used elsewhere.',
                        ].join('\n'),
                        task: [
                            'Create a component `' + d + 'my_form` extending `' + d + 'mol_view` with:',
                            '',
                            '1. A `' + d + 'mol_string` input named **Name_input** with two-way binding `<=>` to property `name?` (default empty `\\`)',
                            '2. A `' + d + 'mol_view` named **Greeting** that displays the `name` property via `<= name`',
                            '',
                            'Both should be children in `sub /`.',
                        ].join('\n'),
                        initial_code: [
                            d + 'my_form ' + d + 'mol_view',
                            '\tsub /',
                            '\t\t<= Name_input ' + d + 'mol_string',
                            '\t\t<= Greeting ' + d + 'mol_view',
                        ].join('\n'),
                        solution: [
                            d + 'my_form ' + d + 'mol_view',
                            '\tsub /',
                            '\t\t<= Name_input ' + d + 'mol_string',
                            '\t\t\tvalue? <=> name? \\',
                            '\t\t<= Greeting ' + d + 'mol_view',
                            '\t\t\tsub / <= name',
                        ].join('\n'),
                        hints: [
                            'Add `value? <=> name? \\` inside Name_input to create a two-way binding',
                            'Add `sub / <= name` inside Greeting to read the name property',
                            'The `?` after property names marks them as writable (accepting new values)',
                        ],
                    },
                    {
                        title: 'Reactivity',
                        explanation: [
                            '# Reactivity with @' + d + 'mol_mem',
                            '',
                            'In ' + d + 'mol, every property is **automatically reactive**. This is powered by the `@' + d + 'mol_mem` decorator.',
                            '',
                            '## What @' + d + 'mol_mem Does',
                            '',
                            'When you declare a property in view.tree:',
                            '',
                            '```',
                            d + 'my_app ' + d + 'mol_view',
                            '    title \\Hello',
                            '```',
                            '',
                            'The generated TypeScript code is:',
                            '',
                            '```typescript',
                            '@' + d + 'mol_mem',
                            'title() { return "Hello" }',
                            '```',
                            '',
                            '`@' + d + 'mol_mem` gives every property three superpowers:',
                            '',
                            '1. **Memoization** — the value is computed once, then cached',
                            '2. **Auto-tracking** — dependencies are tracked automatically',
                            '3. **Lazy evaluation** — nothing computes until actually accessed',
                            '',
                            '## Auto-tracking in Action',
                            '',
                            'When two components share the same property, they stay in sync **automatically**:',
                            '',
                            '```',
                            d + 'my_sync ' + d + 'mol_view',
                            '    sub /',
                            '        <= Editor ' + d + 'mol_string',
                            '            value? <=> message? \\Hello',
                            '        <= Display ' + d + 'mol_view',
                            '            sub / <= message',
                            '```',
                            '',
                            '- `message?` is a reactive state (writable because of `?`)',
                            '- `Editor` writes to `message` through `<=>`',
                            '- `Display` reads `message` through `<=`',
                            '- When `message` changes → `Display` **automatically** re-renders',
                            '',
                            'No manual subscriptions. No event listeners. No `setState()`. The reactive system tracks everything.',
                            '',
                            '## Reactive Graph',
                            '',
                            'All reactive properties form a **dependency graph**. When a source property changes, only the properties that depend on it recompute. Everything else stays cached.',
                            '',
                            'This makes ' + d + 'mol apps very efficient — only what needs to update actually updates.',
                        ].join('\n'),
                        task: [
                            'Create a component `' + d + 'my_reactive` extending `' + d + 'mol_page` that demonstrates reactive state sharing.',
                            '',
                            'The page should have two `' + d + 'mol_string` inputs in the body:',
                            '',
                            '1. **Input** — with hint `\\Type something` and `value?` bound to `text?` (default empty `\\`)',
                            '2. **Mirror** — with hint `\\Watch this update` and `value?` bound to the same `text?`',
                            '',
                            'Both inputs share the same reactive property, so typing in one instantly updates the other.',
                        ].join('\n'),
                        initial_code: [
                            d + 'my_reactive ' + d + 'mol_page',
                            '\ttitle \\Reactivity Demo',
                            '\tbody /',
                            '\t\t<= Input ' + d + 'mol_string',
                            '\t\t\thint \\Type something',
                            '\t\t<= Mirror ' + d + 'mol_string',
                            '\t\t\thint \\Watch this update',
                        ].join('\n'),
                        solution: [
                            d + 'my_reactive ' + d + 'mol_page',
                            '\ttitle \\Reactivity Demo',
                            '\tbody /',
                            '\t\t<= Input ' + d + 'mol_string',
                            '\t\t\thint \\Type something',
                            '\t\t\tvalue? <=> text? \\',
                            '\t\t<= Mirror ' + d + 'mol_string',
                            '\t\t\thint \\Watch this update',
                            '\t\t\tvalue? <=> text?',
                        ].join('\n'),
                        hints: [
                            'Both inputs need to share a common property via two-way binding `<=>`',
                            'Add `value? <=> text? \\` on Input to create the writable `text` property with empty default',
                            'Add `value? <=> text?` on Mirror to bind it to the same property (no default needed)',
                        ],
                    },
                    {
                        title: 'Built-in Components',
                        explanation: [
                            '# Built-in Components',
                            '',
                            d + 'mol provides a rich set of ready-to-use components. Let\'s explore the most important ones.',
                            '',
                            '## ' + d + 'mol_page',
                            '',
                            'The standard page layout with a title bar, toolbar, and scrollable body:',
                            '',
                            '```',
                            d + 'my_app ' + d + 'mol_page',
                            '    title \\My App',
                            '    tools /',
                            '        <= Settings ' + d + 'mol_button_minor',
                            '            sub / \\Options',
                            '    body /',
                            '        <= Content ' + d + 'mol_view',
                            '            sub / \\Page content here',
                            '```',
                            '',
                            '- `title` — text in the header bar',
                            '- `tools /` — buttons/links in the top-right corner',
                            '- `body /` — scrollable content area',
                            '',
                            '## Buttons',
                            '',
                            d + 'mol has two button styles:',
                            '',
                            '```',
                            '<= Primary ' + d + 'mol_button_major',
                            '    title \\Save',
                            '',
                            '<= Secondary ' + d + 'mol_button_minor',
                            '    title \\Cancel',
                            '```',
                            '',
                            '- `' + d + 'mol_button_major` — accented button for primary actions',
                            '- `' + d + 'mol_button_minor` — subtle button for secondary actions',
                            '- Both accept `click?` for handling clicks and `title` or `sub /` for content',
                            '',
                            '## ' + d + 'mol_form',
                            '',
                            'A structured form that groups input fields:',
                            '',
                            '```',
                            d + 'my_settings ' + d + 'mol_form',
                            '    form_fields /',
                            '        <= Name ' + d + 'mol_string',
                            '            value? <=> name? \\',
                            '        <= Email ' + d + 'mol_string',
                            '            value? <=> email? \\',
                            '    buttons /',
                            '        <= Submit ' + d + 'mol_button_major',
                            '            title \\Save',
                            '```',
                            '',
                            '- `form_fields /` — list of input components',
                            '- `buttons /` — action buttons at the bottom',
                            '',
                            '## ' + d + 'mol_list',
                            '',
                            'A virtual list that efficiently renders large collections:',
                            '',
                            '```',
                            '<= Items ' + d + 'mol_list',
                            '    rows /',
                            '        <= First ' + d + 'mol_view',
                            '            sub / \\Item 1',
                            '        <= Second ' + d + 'mol_view',
                            '            sub / \\Item 2',
                            '```',
                            '',
                            '`' + d + 'mol_list` only renders visible rows, making it performant even with thousands of items.',
                        ].join('\n'),
                        task: [
                            'Create a component `' + d + 'my_profile` extending `' + d + 'mol_page` with:',
                            '',
                            '1. Title set to `\\My Profile`',
                            '2. A `' + d + 'mol_button_minor` named **Edit_btn** in `tools /` with `title \\Edit`',
                            '3. A `' + d + 'mol_form` named **Form** in `body /` containing:',
                            '    - A `' + d + 'mol_string` named **Name** with `value? <=> name? \\`',
                            '    - A `' + d + 'mol_string` named **Email** with `value? <=> email? \\`',
                        ].join('\n'),
                        initial_code: [
                            d + 'my_profile ' + d + 'mol_page',
                            '\ttitle \\My Profile',
                        ].join('\n'),
                        solution: [
                            d + 'my_profile ' + d + 'mol_page',
                            '\ttitle \\My Profile',
                            '\ttools /',
                            '\t\t<= Edit_btn ' + d + 'mol_button_minor',
                            '\t\t\ttitle \\Edit',
                            '\tbody /',
                            '\t\t<= Form ' + d + 'mol_form',
                            '\t\t\tform_fields /',
                            '\t\t\t\t<= Name ' + d + 'mol_string',
                            '\t\t\t\t\tvalue? <=> name? \\',
                            '\t\t\t\t<= Email ' + d + 'mol_string',
                            '\t\t\t\t\tvalue? <=> email? \\',
                        ].join('\n'),
                        hints: [
                            'Add `tools /` with `<= Edit_btn ' + d + 'mol_button_minor` inside, and set `title \\Edit` on it',
                            'Add `body /` with `<= Form ' + d + 'mol_form` inside, then add `form_fields /` to the form',
                            'Inside `form_fields /` add two `' + d + 'mol_string` components with `value? <=> name? \\` and `value? <=> email? \\`',
                        ],
                    },
                    {
                        title: 'Styling',
                        explanation: [
                            '# Styling with view.css.ts',
                            '',
                            'In ' + d + 'mol, styles are written in **TypeScript** using `' + d + 'mol_style_define`. This gives you full type-checking — no typos, no invalid values.',
                            '',
                            '## Basic Structure',
                            '',
                            'Every component can have a `*.view.css.ts` file:',
                            '',
                            '```typescript',
                            'namespace ' + d + '.' + d + d + ' {',
                            '    ' + d + 'mol_style_define(' + d + 'my_card, {',
                            '        padding: ' + d + 'mol_gap.block,',
                            '        background: {',
                            '            color: ' + d + 'mol_theme.card,',
                            '        },',
                            '    })',
                            '}',
                            '```',
                            '',
                            '## Theme Tokens',
                            '',
                            'Use built-in theme tokens instead of hardcoded colors:',
                            '',
                            '| Token | Purpose |',
                            '|---|---|',
                            '| `' + d + 'mol_theme.back` | Page background |',
                            '| `' + d + 'mol_theme.card` | Card background |',
                            '| `' + d + 'mol_theme.text` | Main text |',
                            '| `' + d + 'mol_theme.shade` | Muted text |',
                            '| `' + d + 'mol_theme.accent` | Accent color |',
                            '| `' + d + 'mol_theme.control` | Buttons/controls |',
                            '| `' + d + 'mol_theme.field` | Input fields |',
                            '',
                            'And spacing tokens: `' + d + 'mol_gap.block` (standard padding), `' + d + 'mol_gap.round` (border-radius).',
                            '',
                            '## Styling Sub-components',
                            '',
                            'Target sub-components by their **property name** (PascalCase):',
                            '',
                            '```typescript',
                            d + 'mol_style_define(' + d + 'my_card, {',
                            '    Title: {',
                            '        font: {',
                            '            size: \'1.25rem\',',
                            '            weight: \'bold\',',
                            '        },',
                            '        color: ' + d + 'mol_theme.text,',
                            '    },',
                            '    Description: {',
                            '        color: ' + d + 'mol_theme.shade,',
                            '    },',
                            '})',
                            '```',
                            '',
                            'The keys `Title` and `Description` match the property names from view.tree.',
                            '',
                            '## Key Rules',
                            '',
                            '1. **No `as any`** — if TypeScript complains, fix the format',
                            '2. **No `rgba()`** — use hex: `\'#9c27b04d\'` instead of `rgba(156,39,176,0.3)`',
                            '3. **No shorthand strings** for padding/margin: `padding: \'0.5rem 1rem\'` is wrong, use `padding: { top: \'0.5rem\', left: \'1rem\', ... }`',
                            '4. Use `borderRadius` (camelCase) not `border: { radius }` for border-radius',
                            '5. Sub-components are **top-level only** — no nesting `Icon` inside `Header`',
                            '',
                            '## Flex Layout',
                            '',
                            '```typescript',
                            'flex: {',
                            '    direction: \'column\',',
                            '    wrap: \'wrap\',',
                            '    grow: 1,',
                            '},',
                            '```',
                            '',
                            'Dark and light themes are supported **automatically** — theme tokens adapt to the current scheme.',
                        ].join('\n'),
                        task: [
                            'Create a component `' + d + 'my_card` extending `' + d + 'mol_view` with named sub-components:',
                            '',
                            '1. A `' + d + 'mol_view` named **Title** with `sub / \\My Card`',
                            '2. A `' + d + 'mol_view` named **Description** with `sub / \\Card description text`',
                            '',
                            'These property names (`Title`, `Description`) would be targeted by `' + d + 'mol_style_define` in a real css.ts file.',
                        ].join('\n'),
                        initial_code: [
                            d + 'my_card ' + d + 'mol_view',
                            '\tsub /',
                            '\t\t\\My Card',
                            '\t\t\\Card description text',
                        ].join('\n'),
                        solution: [
                            d + 'my_card ' + d + 'mol_view',
                            '\tsub /',
                            '\t\t<= Title ' + d + 'mol_view',
                            '\t\t\tsub / \\My Card',
                            '\t\t<= Description ' + d + 'mol_view',
                            '\t\t\tsub / \\Card description text',
                        ].join('\n'),
                        hints: [
                            'Replace plain text with named sub-components using `<= Name ' + d + 'mol_view`',
                            '`<= Title ' + d + 'mol_view` creates a named property that can be targeted by css.ts',
                            'Each sub-component needs `sub / \\text` to hold its content',
                        ],
                    },
                    {
                        title: 'Lists & Collections',
                        explanation: [
                            '# Lists & Collections',
                            '',
                            'In ' + d + 'mol, `*` is used for two purposes: **dictionaries** (key-value maps) and **multi-properties** (keyed component factories).',
                            '',
                            '## Dictionary `*`',
                            '',
                            'Use `*` to define a key-value map:',
                            '',
                            '```',
                            '<= Lang ' + d + 'mol_select',
                            '    value? <=> lang? \\en',
                            '    dictionary *',
                            '        en \\English',
                            '        ru \\Russian',
                            '        de \\German',
                            '```',
                            '',
                            '`dictionary *` creates a static map `{ en: "English", ru: "Russian", de: "German" }`. Components like `' + d + 'mol_select` use this for option lists.',
                            '',
                            '## Multi-property `Item*`',
                            '',
                            'Adding `*` to a property name makes it **parameterized** — it creates one component instance per key:',
                            '',
                            '```',
                            d + 'my_list ' + d + 'mol_list',
                            '    rows /',
                            '        <= Row* ' + d + 'mol_view',
                            '            sub / <= row_title* \\',
                            '```',
                            '',
                            'In TypeScript this generates:',
                            '',
                            '```typescript',
                            '@' + d + 'mol_mem_key',
                            'Row( id: any ) { return new ' + d + 'mol_view() }',
                            '',
                            'row_title( id: any ) { return "" }',
                            '```',
                            '',
                            'The `*` suffix means the property takes an `id` parameter. Calling `Row("first")` returns one instance, `Row("second")` returns another.',
                            '',
                            '## Dynamic Lists',
                            '',
                            'To populate a list dynamically, override `rows()` in TypeScript:',
                            '',
                            '```typescript',
                            '@' + d + 'mol_mem',
                            'rows() {',
                            '    return [ "buy_milk", "clean", "read" ].map(',
                            '        id => this.Row( id )',
                            '    )',
                            '}',
                            '',
                            '@' + d + 'mol_mem_key',
                            'row_title( id: string ) {',
                            '    const titles: Record< string, string > = {',
                            '        buy_milk: "Buy milk",',
                            '        clean: "Clean house",',
                            '        read: "Read book",',
                            '    }',
                            '    return titles[ id ] ?? id',
                            '}',
                            '```',
                            '',
                            'Each `Row(id)` is a separate component instance with its own lifecycle. ' + d + 'mol_list renders only the visible ones (virtual scrolling).',
                            '',
                            '## Key Point',
                            '',
                            '- `*` after a value = **dictionary** (key-value map)',
                            '- `*` after a property name = **multi-property** (keyed factory)',
                            '- Multi-properties generate `@' + d + 'mol_mem_key` in TypeScript',
                            '- Use them with `' + d + 'mol_list` for efficient dynamic rendering',
                        ].join('\n'),
                        task: [
                            'Create a component `' + d + 'my_nav` extending `' + d + 'mol_view` with:',
                            '',
                            '1. `sub /` containing a `' + d + 'mol_list` named **Menu**',
                            '2. The Menu has `rows /` with a multi-property `<= Row* ' + d + 'mol_button_minor`',
                            '3. Each Row has `title <= row_title* \\`',
                            '',
                            'This creates a reusable navigation list where each `Row(id)` is a separate button.',
                        ].join('\n'),
                        initial_code: [
                            d + 'my_nav ' + d + 'mol_view',
                            '\tsub /',
                            '\t\t<= Menu ' + d + 'mol_list',
                        ].join('\n'),
                        solution: [
                            d + 'my_nav ' + d + 'mol_view',
                            '\tsub /',
                            '\t\t<= Menu ' + d + 'mol_list',
                            '\t\t\trows /',
                            '\t\t\t\t<= Row* ' + d + 'mol_button_minor',
                            '\t\t\t\t\ttitle <= row_title* \\',
                        ].join('\n'),
                        hints: [
                            'Add `rows /` inside the Menu component to define its children',
                            'Use `<= Row* ' + d + 'mol_button_minor` — the `*` makes it a multi-property (one button per key)',
                            'Add `title <= row_title* \\` inside Row — the `*` on `row_title` matches the `*` on `Row`',
                        ],
                    },
                    {
                        title: 'State Management',
                        explanation: [
                            '# State Management with @' + d + 'mol_mem',
                            '',
                            'In ' + d + 'mol, **every property is a reactive atom**. There is no separate "store" — the component tree itself is the state tree.',
                            '',
                            '## @' + d + 'mol_mem as Getter + Setter',
                            '',
                            'A property decorated with `@' + d + 'mol_mem` acts as both a **getter** and **setter**:',
                            '',
                            '```typescript',
                            '@' + d + 'mol_mem',
                            'count( next?: number ) {',
                            '    return next ?? 0     // default value is 0',
                            '}',
                            '```',
                            '',
                            '- `this.count()` — reads the current value (starts at 0)',
                            '- `this.count(5)` — writes a new value',
                            '- After writing, all dependents recompute automatically',
                            '',
                            'In **view.tree**, writable properties use `?`:',
                            '',
                            '```',
                            d + 'my_app ' + d + 'mol_view',
                            '    count? 0',
                            '```',
                            '',
                            'This generates the same `@' + d + 'mol_mem` getter/setter in TypeScript.',
                            '',
                            '## Derived State',
                            '',
                            'A reactive property that reads other reactive properties becomes **derived state**:',
                            '',
                            '```typescript',
                            '@' + d + 'mol_mem',
                            'doubled() {',
                            '    return this.count() * 2',
                            '}',
                            '```',
                            '',
                            '- `doubled()` depends on `count()`',
                            '- When `count` changes, `doubled` recomputes automatically',
                            '- If `count` hasn\'t changed, `doubled` returns cached value',
                            '',
                            'This is **lazy** — `doubled` doesn\'t compute until someone reads it.',
                            '',
                            '## @' + d + 'mol_action for Mutations',
                            '',
                            '`@' + d + 'mol_mem` properties must be **pure computations** — no side effects! To write to atoms safely, use `@' + d + 'mol_action`:',
                            '',
                            '```typescript',
                            '@' + d + 'mol_action',
                            'increment() {',
                            '    this.count( this.count() + 1 )   // safe: action can write',
                            '}',
                            '```',
                            '',
                            '**Key rule**: `@' + d + 'mol_mem` = pure read. `@' + d + 'mol_action` = safe write.',
                            '',
                            'In view.tree, click handlers are declared as writable properties:',
                            '',
                            '```',
                            '<= Add_btn ' + d + 'mol_button_major',
                            '    click? <=> increment? null',
                            '    title \\+1',
                            '```',
                            '',
                            'Then override with `@' + d + 'mol_action` in TypeScript.',
                            '',
                            '## @' + d + 'mol_mem_key for Collections',
                            '',
                            'When state is **parameterized** (per item), use `@' + d + 'mol_mem_key`:',
                            '',
                            '```typescript',
                            '@' + d + 'mol_mem_key',
                            'task_done( id: string, next?: boolean ) {',
                            '    return next ?? false',
                            '}',
                            '```',
                            '',
                            '- `this.task_done("a")` — reads item "a" state',
                            '- `this.task_done("a", true)` — writes item "a" state',
                            '- Each key has its own independent reactive atom',
                            '',
                            'In view.tree, `*` generates `@' + d + 'mol_mem_key`:',
                            '',
                            '```',
                            '<= Task* ' + d + 'mol_check',
                            '    checked? <=> task_done*? false',
                            '```',
                            '',
                            '## No Store Needed',
                            '',
                            d + 'mol doesn\'t need Redux, MobX, or any external state library. The reactive property graph **is** the state manager:',
                            '',
                            '- Component properties = state atoms',
                            '- Derived methods = computed selectors',
                            '- `@' + d + 'mol_action` = reducers/actions',
                            '- Parent-child bindings = state wiring',
                        ].join('\n'),
                        task: [
                            'Create a component `' + d + 'my_counter` extending `' + d + 'mol_page` that demonstrates state management:',
                            '',
                            '1. Title set to `\\Counter`',
                            '2. `body /` containing:',
                            '    - A `' + d + 'mol_number` named **Count** with `value? <=> count? 0`',
                            '    - A `' + d + 'mol_button_major` named **Reset_btn** with `click? <=> reset? null` and `title \\Reset`',
                            '',
                            'The count property is a writable reactive atom. The Reset button\'s click handler can be overridden in TypeScript with `@' + d + 'mol_action` to set `count` back to 0.',
                        ].join('\n'),
                        initial_code: [
                            d + 'my_counter ' + d + 'mol_page',
                            '\ttitle \\Counter',
                            '\tbody /',
                        ].join('\n'),
                        solution: [
                            d + 'my_counter ' + d + 'mol_page',
                            '\ttitle \\Counter',
                            '\tbody /',
                            '\t\t<= Count ' + d + 'mol_number',
                            '\t\t\tvalue? <=> count? 0',
                            '\t\t<= Reset_btn ' + d + 'mol_button_major',
                            '\t\t\tclick? <=> reset? null',
                            '\t\t\ttitle \\Reset',
                        ].join('\n'),
                        hints: [
                            'Add `<= Count ' + d + 'mol_number` inside `body /` with `value? <=> count? 0` to create a numeric input bound to reactive state',
                            'Add `<= Reset_btn ' + d + 'mol_button_major` with `click? <=> reset? null` to declare a click handler',
                            'Add `title \\Reset` to the Reset_btn to set its label',
                        ],
                    },
                    {
                        title: 'Testing',
                        explanation: [
                            '# Testing with ' + d + 'mol_test',
                            '',
                            d + 'mol has a simple built-in testing framework. Tests live in `*.test.ts` files next to your code.',
                            '',
                            '## Test File Structure',
                            '',
                            'A test file declares tests inside `' + d + 'mol_test()`:',
                            '',
                            '```typescript',
                            'namespace ' + d + ' {',
                            '    ' + d + 'mol_test( {',
                            '',
                            '        \'greeting shows name\'() {',
                            '            const app = new ' + d + 'my_hello()',
                            '            app.name( "Alice" )',
                            '            ' + d + 'mol_assert_equal( app.greeting(), "Hello, Alice!" )',
                            '        },',
                            '',
                            '    } )',
                            '}',
                            '```',
                            '',
                            '- Tests are methods of an object passed to `' + d + 'mol_test()`',
                            '- Test names are string keys describing the behavior',
                            '- No `describe`/`it` wrappers — just a flat map of tests',
                            '',
                            '## Assertions',
                            '',
                            d + 'mol provides three assertion functions:',
                            '',
                            '### ' + d + 'mol_assert_equal',
                            '',
                            'Checks that all arguments are **structurally equal** (deep comparison):',
                            '',
                            '```typescript',
                            d + 'mol_assert_equal( 2, 2 )                   // scalars',
                            d + 'mol_assert_equal( [1, 2], [1, 2] )         // arrays',
                            d + 'mol_assert_equal( { a: 1 }, { a: 1 } )     // objects',
                            d + 'mol_assert_equal( "a", "a", "a" )          // 3+ values',
                            '```',
                            '',
                            '### ' + d + 'mol_assert_unique',
                            '',
                            'Checks that all arguments are **structurally different**:',
                            '',
                            '```typescript',
                            d + 'mol_assert_unique( [1], [2], [3] )  // all different',
                            '```',
                            '',
                            '### ' + d + 'mol_assert_fail',
                            '',
                            'Checks that a function **throws an error**:',
                            '',
                            '```typescript',
                            d + 'mol_assert_fail( () => {',
                            '    JSON.parse( "invalid" )',
                            '} )',
                            '```',
                            '',
                            '## Testing Reactive Properties',
                            '',
                            'Since every `@' + d + 'mol_mem` property is a reactive atom, you can test state changes directly:',
                            '',
                            '```typescript',
                            d + 'mol_test( {',
                            '',
                            '    \'counter starts at zero\'() {',
                            '        const app = new ' + d + 'my_counter()',
                            '        ' + d + 'mol_assert_equal( app.count(), 0 )',
                            '    },',
                            '',
                            '    \'counter increments\'() {',
                            '        const app = new ' + d + 'my_counter()',
                            '        app.count( 5 )',
                            '        ' + d + 'mol_assert_equal( app.count(), 5 )',
                            '    },',
                            '',
                            '} )',
                            '```',
                            '',
                            'No mocking frameworks needed — `@' + d + 'mol_mem` properties are self-contained atoms.',
                            '',
                            '## File Naming',
                            '',
                            '- `my/hello/hello.test.ts` — tests for the `' + d + 'my_hello` module',
                            '- MAM automatically discovers all `.test.ts` files',
                            '- Tests compile into `node.test.js` and `web.test.js` bundles',
                            '',
                            '## Key Points',
                            '',
                            '- Tests are plain functions — no setup/teardown boilerplate',
                            '- Assertions use **deep structural comparison** (order-independent for objects)',
                            '- Create component instances directly: `new ' + d + 'my_app()`',
                            '- Read/write reactive state: `app.count()` / `app.count(5)`',
                            '- Test names should describe the expected behavior',
                        ].join('\n'),
                        task: [
                            'Create a component `' + d + 'my_testable` extending `' + d + 'mol_page` that is easy to test:',
                            '',
                            '1. Title set to `\\Test Demo`',
                            '2. `body /` containing:',
                            '    - A `' + d + 'mol_string` named **Input** with `value? <=> text? \\`',
                            '    - A `' + d + 'mol_view` named **Output** with `sub / <= text`',
                            '',
                            'This component has a clear testable contract: `text` property is shared between Input and Output.',
                            'A test could verify: `app.text("Hi")` → `app.Output().sub()` reflects the change.',
                        ].join('\n'),
                        initial_code: [
                            d + 'my_testable ' + d + 'mol_page',
                            '\ttitle \\Test Demo',
                            '\tbody /',
                        ].join('\n'),
                        solution: [
                            d + 'my_testable ' + d + 'mol_page',
                            '\ttitle \\Test Demo',
                            '\tbody /',
                            '\t\t<= Input ' + d + 'mol_string',
                            '\t\t\tvalue? <=> text? \\',
                            '\t\t<= Output ' + d + 'mol_view',
                            '\t\t\tsub / <= text',
                        ].join('\n'),
                        hints: [
                            'Add `<= Input ' + d + 'mol_string` in `body /` with `value? <=> text? \\` to create the writable text property',
                            'Add `<= Output ' + d + 'mol_view` with `sub / <= text` to read the same property',
                            'The `text` property is shared — both Input and Output reference it, making it testable',
                        ],
                    },
                    {
                        title: 'Navigation',
                        explanation: [
                            '# Navigation',
                            '',
                            d + 'mol provides built-in tools for page navigation and URL-based routing.',
                            '',
                            '## ' + d + 'mol_book2',
                            '',
                            d + 'mol_book2 is a multi-page container that stacks pages horizontally. It is the foundation for app navigation:',
                            '',
                            '```',
                            d + 'my_app ' + d + 'mol_book2',
                            '    pages /',
                            '        <= Menu ' + d + 'mol_page',
                            '            title \\Menu',
                            '        <= Detail ' + d + 'mol_page',
                            '            title \\Detail',
                            '```',
                            '',
                            'On desktop, pages appear side by side. On mobile, they stack and only the top page is visible.',
                            '',
                            '## ' + d + 'mol_link',
                            '',
                            d + 'mol_link creates a link that **modifies URL arguments** instead of navigating to a new page:',
                            '',
                            '```',
                            '<= Nav ' + d + 'mol_link',
                            '    arg *',
                            '        page \\about',
                            '    sub / \\About',
                            '```',
                            '',
                            'Clicking this link sets `#!page=about` in the URL hash. The page does **not** reload — only the arguments change reactively.',
                            '',
                            '## `arg *` Syntax',
                            '',
                            '`arg *` is a dictionary that maps argument names to values:',
                            '',
                            '```',
                            '<= Home_link ' + d + 'mol_link',
                            '    arg *',
                            '        page \\home',
                            '        tab \\main',
                            '    sub / \\Home',
                            '```',
                            '',
                            'This produces `#!page=home&tab=main` in the URL. Multiple arguments can be set at once.',
                            '',
                            '## ' + d + 'mol_state_arg',
                            '',
                            'To read arguments in TypeScript, use `' + d + 'mol_state_arg`:',
                            '',
                            '```typescript',
                            '// Read the "page" argument from URL',
                            'const page = this.' + d + '.' + d + 'mol_state_arg.value("page")',
                            '```',
                            '',
                            'This is **reactive** — when the URL argument changes, any component reading it re-renders automatically.',
                            '',
                            '## Routing Pattern',
                            '',
                            'A common pattern: use `' + d + 'mol_link` in a menu and `' + d + 'mol_state_arg` in TypeScript to decide which pages to show:',
                            '',
                            '```',
                            d + 'my_app ' + d + 'mol_book2',
                            '    pages <= current_pages /',
                            '```',
                            '',
                            '```typescript',
                            '@' + d + 'mol_mem',
                            'current_pages() {',
                            '    const page = this.' + d + '.' + d + 'mol_state_arg.value("page")',
                            '    switch (page) {',
                            '        case "settings": return [ this.Menu(), this.Settings() ]',
                            '        default: return [ this.Menu(), this.Home() ]',
                            '    }',
                            '}',
                            '```',
                            '',
                            'The pages list updates reactively when the URL changes.',
                        ].join('\n'),
                        task: [
                            'Create a component `' + d + 'my_app` extending `' + d + 'mol_page` with:',
                            '',
                            '1. Title set to `\\My App`',
                            '2. `tools /` containing two `' + d + 'mol_link` components:',
                            '    - **Home_link** with `arg * page \\home` and `sub / \\Home`',
                            '    - **Settings_link** with `arg * page \\settings` and `sub / \\Settings`',
                            '',
                            'These links modify URL arguments for navigation without a full page reload.',
                        ].join('\n'),
                        initial_code: [
                            d + 'my_app ' + d + 'mol_page',
                            '\ttitle \\My App',
                            '\ttools /',
                        ].join('\n'),
                        solution: [
                            d + 'my_app ' + d + 'mol_page',
                            '\ttitle \\My App',
                            '\ttools /',
                            '\t\t<= Home_link ' + d + 'mol_link',
                            '\t\t\targ *',
                            '\t\t\t\tpage \\home',
                            '\t\t\tsub / \\Home',
                            '\t\t<= Settings_link ' + d + 'mol_link',
                            '\t\t\targ *',
                            '\t\t\t\tpage \\settings',
                            '\t\t\tsub / \\Settings',
                        ].join('\n'),
                        hints: [
                            'Use `<= Home_link ' + d + 'mol_link` to create a named link component inside `tools /`',
                            'Add `arg *` inside the link, then indent `page \\home` under it to set the URL argument',
                            'Each link needs `sub / \\Text` to display its label',
                        ],
                    },
                    {
                        title: 'Project Architecture',
                        explanation: [
                            '# Project Architecture',
                            '',
                            'MAM (Meta Abstract Modules) is a monorepo build system that uses **file structure as the module graph**. Understanding its conventions is essential for organizing ' + d + 'mol projects.',
                            '',
                            '## Namespace = Folder Path',
                            '',
                            'Every class name maps **directly** to a folder path. Underscores `_` in class names become directory separators:',
                            '',
                            '```',
                            d + 'my_app           →  my/app/',
                            d + 'my_app_header    →  my/app/header/',
                            d + 'mol_page         →  mol/page/',
                            d + 'mol_button_major →  mol/button/major/',
                            '```',
                            '',
                            'This is **automatic** — MAM scans your TypeScript for `' + d + '`-prefixed identifiers and resolves them to folders. No manual imports needed!',
                            '',
                            '**Important**: folder names **cannot** contain underscores. Use nested folders instead:',
                            '',
                            '```',
                            'my/app/game_field/    ← WRONG: MAM looks for my/app/game/field/',
                            'my/app/game/field/    ← CORRECT',
                            '```',
                            '',
                            '## Module Structure',
                            '',
                            'Each module folder contains files named after the folder:',
                            '',
                            '```',
                            'my/app/',
                            '    app.view.tree    — declarative layout',
                            '    app.view.ts      — component logic',
                            '    app.view.css.ts  — typed styles',
                            '    app.test.ts      — tests',
                            '    app.locale=en.json — English translations',
                            '```',
                            '',
                            'The file prefix must match the folder name. MAM uses this convention to auto-discover all module files.',
                            '',
                            '## meta.tree',
                            '',
                            'The `meta.tree` file declares project metadata and **explicit dependencies** that MAM cannot auto-detect:',
                            '',
                            '```',
                            'include \\/mol/view',
                            'include \\/mol/page',
                            'include \\/mol/button/major',
                            '```',
                            '',
                            'Most dependencies are resolved automatically from `' + d + '`-prefixed identifiers in code. You only need `include` for:',
                            '',
                            '- Dependencies used only in `.view.tree` (not in `.ts`)',
                            '- External packages: `include \\/node_modules/some-lib`',
                            '- Modules from other namespaces that are not directly referenced in code',
                            '',
                            '## index.html',
                            '',
                            'The entry point file lives inside the app module folder:',
                            '',
                            '```html',
                            '<div mol_view_root="' + d + 'my_app"></div>',
                            '<script src="web.js"></script>',
                            '```',
                            '',
                            '`mol_view_root` attribute tells ' + d + 'mol which class to mount. The `web.js` script is auto-generated by MAM.',
                            '',
                            '## Build',
                            '',
                            'MAM builds from the **repository root**, not from the module folder:',
                            '',
                            '```bash',
                            '# From the mam root directory:',
                            'npm exec mam my/app',
                            '```',
                            '',
                            'The build output goes to `my/app/-/` with bundled `web.js`, `web.css`, `web.test.js`, and more.',
                            '',
                            '## Key Rules',
                            '',
                            '1. Class name = folder path (replace `_` with `/`)',
                            '2. No underscores in folder names — use nesting',
                            '3. Files named after their parent folder',
                            '4. `meta.tree` for explicit includes only',
                            '5. Build from repo root: `npm exec mam path/to/app`',
                            '6. Auto-resolution: use `' + d + 'something` in code → MAM finds it',
                        ].join('\n'),
                        task: [
                            'Create a component `' + d + 'my_blog` extending `' + d + 'mol_page` with the correct MAM structure:',
                            '',
                            '1. Title set to `\\My Blog`',
                            '2. `body /` containing:',
                            '    - A `' + d + 'mol_list` named **Posts** with `rows /`',
                            '    - Inside rows: a `<= Post* ' + d + 'mol_view` multi-property',
                            '    - Each Post has `sub / <= post_title* \\`',
                            '',
                            'This represents a properly structured ' + d + 'mol module at the path `my/blog/` with auto-resolved dependencies.',
                        ].join('\n'),
                        initial_code: [
                            d + 'my_blog ' + d + 'mol_page',
                            '\ttitle \\My Blog',
                            '\tbody /',
                        ].join('\n'),
                        solution: [
                            d + 'my_blog ' + d + 'mol_page',
                            '\ttitle \\My Blog',
                            '\tbody /',
                            '\t\t<= Posts ' + d + 'mol_list',
                            '\t\t\trows /',
                            '\t\t\t\t<= Post* ' + d + 'mol_view',
                            '\t\t\t\t\tsub / <= post_title* \\',
                        ].join('\n'),
                        hints: [
                            'Add `<= Posts ' + d + 'mol_list` inside `body /` to create the list container',
                            'Add `rows /` inside Posts, then `<= Post* ' + d + 'mol_view` for the multi-property',
                            'Inside Post add `sub / <= post_title* \\` — the `*` on `post_title` matches the `*` on `Post`',
                        ],
                    },
                ];
            }
        }
        __decorate([
            $mol_mem
        ], $bog_docs_guide.prototype, "lesson_index", null);
        __decorate([
            $mol_mem
        ], $bog_docs_guide.prototype, "Current_lesson", null);
        __decorate([
            $mol_action
        ], $bog_docs_guide.prototype, "reset_progress", null);
        __decorate([
            $mol_mem
        ], $bog_docs_guide.prototype, "prev_arg", null);
        __decorate([
            $mol_mem
        ], $bog_docs_guide.prototype, "next_arg", null);
        __decorate([
            $mol_mem
        ], $bog_docs_guide.prototype, "lesson_next_arg", null);
        $$.$bog_docs_guide = $bog_docs_guide;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($bog_docs_guide, {
            Progress: {
                font: {
                    weight: 'bold',
                    size: '0.85rem',
                },
                color: $mol_theme.shade,
                whiteSpace: 'nowrap',
            },
            Prev_link: {
                font: {
                    size: '1.25rem',
                },
            },
            Next_link: {
                font: {
                    size: '1.25rem',
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$bog_docs_play) = class $bog_docs_play extends ($.$mol_page) {
		preset_hello(next){
			if(next !== undefined) return next;
			return null;
		}
		Preset_hello(){
			const obj = new this.$.$mol_button_minor();
			(obj.title) = () => ("Hello World");
			(obj.click) = (next) => ((this.preset_hello(next)));
			return obj;
		}
		preset_counter(next){
			if(next !== undefined) return next;
			return null;
		}
		Preset_counter(){
			const obj = new this.$.$mol_button_minor();
			(obj.title) = () => ("Counter");
			(obj.click) = (next) => ((this.preset_counter(next)));
			return obj;
		}
		preset_todo(next){
			if(next !== undefined) return next;
			return null;
		}
		Preset_todo(){
			const obj = new this.$.$mol_button_minor();
			(obj.title) = () => ("Todo List");
			(obj.click) = (next) => ((this.preset_todo(next)));
			return obj;
		}
		share_title(){
			return "Share";
		}
		share(next){
			if(next !== undefined) return next;
			return null;
		}
		Share_btn(){
			const obj = new this.$.$mol_button_minor();
			(obj.title) = () => ((this.share_title()));
			(obj.click) = (next) => ((this.share(next)));
			return obj;
		}
		source(next){
			if(next !== undefined) return next;
			return "";
		}
		Code_editor(){
			const obj = new this.$.$bog_docs_editor();
			(obj.source) = (next) => ((this.source(next)));
			return obj;
		}
		title(){
			return (this.$.$mol_locale.text("$bog_docs_play_title"));
		}
		tools(){
			return [
				(this.Preset_hello()), 
				(this.Preset_counter()), 
				(this.Preset_todo()), 
				(this.Share_btn())
			];
		}
		body(){
			return [(this.Code_editor())];
		}
	};
	($mol_mem(($.$bog_docs_play.prototype), "preset_hello"));
	($mol_mem(($.$bog_docs_play.prototype), "Preset_hello"));
	($mol_mem(($.$bog_docs_play.prototype), "preset_counter"));
	($mol_mem(($.$bog_docs_play.prototype), "Preset_counter"));
	($mol_mem(($.$bog_docs_play.prototype), "preset_todo"));
	($mol_mem(($.$bog_docs_play.prototype), "Preset_todo"));
	($mol_mem(($.$bog_docs_play.prototype), "share"));
	($mol_mem(($.$bog_docs_play.prototype), "Share_btn"));
	($mol_mem(($.$bog_docs_play.prototype), "source"));
	($mol_mem(($.$bog_docs_play.prototype), "Code_editor"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_docs_play extends $.$bog_docs_play {
            source(next) {
                if (next !== undefined)
                    return next;
                const hash = location.hash.replace(/^#!?/, '');
                const params = new URLSearchParams(hash);
                const code_param = params.get('code');
                if (code_param) {
                    try {
                        const base64 = code_param.replace(/-/g, '+').replace(/_/g, '/');
                        const binary = atob(base64);
                        const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
                        return new TextDecoder().decode(bytes);
                    }
                    catch {
                    }
                }
                return this.preset_code_hello();
            }
            preset_code_hello() {
                const d = '$';
                return [
                    d + 'my_hello ' + d + 'mol_view',
                    '\tsub /',
                    '\t\t\\Hello World!',
                ].join('\n');
            }
            preset_code_counter() {
                const d = '$';
                return [
                    d + 'my_counter ' + d + 'mol_page',
                    '\ttitle \\Counter',
                    '\tbody /',
                    '\t\t<= Count ' + d + 'mol_number',
                    '\t\t\tvalue? <=> count? 0',
                    '\t\t<= Reset_btn ' + d + 'mol_button_major',
                    '\t\t\ttitle \\Reset',
                    '\t\t\tclick? <=> reset? null',
                ].join('\n');
            }
            preset_code_todo() {
                const d = '$';
                return [
                    d + 'my_todo ' + d + 'mol_page',
                    '\ttitle \\Todo List',
                    '\ttools /',
                    '\t\t<= Add_btn ' + d + 'mol_button_minor',
                    '\t\t\ttitle \\Add',
                    '\t\t\tclick? <=> add? null',
                    '\tbody /',
                    '\t\t<= Input ' + d + 'mol_string',
                    '\t\t\tvalue? <=> task_text? \\',
                    '\t\t\thint \\New task...',
                    '\t\t<= List ' + d + 'mol_list',
                    '\t\t\trows <= items /',
                ].join('\n');
            }
            preset_hello(next) {
                this.source(this.preset_code_hello());
            }
            preset_counter(next) {
                this.source(this.preset_code_counter());
            }
            preset_todo(next) {
                this.source(this.preset_code_todo());
            }
            share_copied(next) {
                return next ?? false;
            }
            share_title() {
                return this.share_copied() ? 'Copied!' : 'Share';
            }
            share(next) {
                const code = this.source();
                const bytes = new TextEncoder().encode(code);
                const binary = Array.from(bytes, b => String.fromCharCode(b)).join('');
                const encoded = btoa(binary)
                    .replace(/\+/g, '-')
                    .replace(/\//g, '_')
                    .replace(/=+$/, '');
                const base = location.href.replace(/#.*/, '');
                const url = base + '#!page=play&code=' + encoded;
                navigator.clipboard?.writeText(url);
                this.share_copied(true);
                setTimeout(() => this.share_copied(false), 2000);
            }
        }
        __decorate([
            $mol_mem
        ], $bog_docs_play.prototype, "source", null);
        __decorate([
            $mol_action
        ], $bog_docs_play.prototype, "preset_hello", null);
        __decorate([
            $mol_action
        ], $bog_docs_play.prototype, "preset_counter", null);
        __decorate([
            $mol_action
        ], $bog_docs_play.prototype, "preset_todo", null);
        __decorate([
            $mol_mem
        ], $bog_docs_play.prototype, "share_copied", null);
        __decorate([
            $mol_mem
        ], $bog_docs_play.prototype, "share_title", null);
        __decorate([
            $mol_action
        ], $bog_docs_play.prototype, "share", null);
        $$.$bog_docs_play = $bog_docs_play;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$bog_docs_app) = class $bog_docs_app extends ($.$mol_book2_catalog) {
		Theme_auto(){
			const obj = new this.$.$bog_theme_auto();
			(obj.themes) = () => (["$mol_theme_calm_light", "$mol_theme_calm_dark"]);
			(obj.theme_light) = () => ("$mol_theme_calm_light");
			(obj.theme_dark) = () => ("$mol_theme_calm_dark");
			return obj;
		}
		Theme_toggle(){
			const obj = new this.$.$bog_theme_toggle();
			(obj.theme_auto) = () => ((this.Theme_auto()));
			return obj;
		}
		switch_en(next){
			if(next !== undefined) return next;
			return null;
		}
		Lang_en(){
			const obj = new this.$.$mol_button_minor();
			(obj.title) = () => ("EN");
			(obj.click) = (next) => ((this.switch_en(next)));
			return obj;
		}
		switch_ru(next){
			if(next !== undefined) return next;
			return null;
		}
		Lang_ru(){
			const obj = new this.$.$mol_button_minor();
			(obj.title) = () => ("RU");
			(obj.click) = (next) => ((this.switch_ru(next)));
			return obj;
		}
		Github_link(){
			const obj = new this.$.$mol_link();
			(obj.uri) = () => ("https://github.com/hyoo-ru/mam");
			(obj.target) = () => ("_blank");
			(obj.sub) = () => (["GitHub"]);
			return obj;
		}
		Landing(){
			const obj = new this.$.$bog_docs_landing();
			(obj.tools) = () => ([(this.Spread_close())]);
			return obj;
		}
		Guide(){
			const obj = new this.$.$bog_docs_guide();
			return obj;
		}
		Play(){
			const obj = new this.$.$bog_docs_play();
			return obj;
		}
		plugins(){
			return [(this.Theme_auto())];
		}
		param(){
			return "page";
		}
		menu_title(){
			return (this.$.$mol_locale.text("$bog_docs_app_menu_title"));
		}
		menu_tools(){
			return [
				(this.Theme_toggle()), 
				(this.Lang_en()), 
				(this.Lang_ru())
			];
		}
		menu_foot(){
			return [(this.Github_link())];
		}
		spreads(){
			return {
				"landing": (this.Landing()), 
				"guide": (this.Guide()), 
				"play": (this.Play())
			};
		}
	};
	($mol_mem(($.$bog_docs_app.prototype), "Theme_auto"));
	($mol_mem(($.$bog_docs_app.prototype), "Theme_toggle"));
	($mol_mem(($.$bog_docs_app.prototype), "switch_en"));
	($mol_mem(($.$bog_docs_app.prototype), "Lang_en"));
	($mol_mem(($.$bog_docs_app.prototype), "switch_ru"));
	($mol_mem(($.$bog_docs_app.prototype), "Lang_ru"));
	($mol_mem(($.$bog_docs_app.prototype), "Github_link"));
	($mol_mem(($.$bog_docs_app.prototype), "Landing"));
	($mol_mem(($.$bog_docs_app.prototype), "Guide"));
	($mol_mem(($.$bog_docs_app.prototype), "Play"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_docs_app extends $.$bog_docs_app {
            spread(next) {
                return this.$.$mol_state_arg.value(this.param(), next) ?? 'landing';
            }
            title() {
                const spread = this.spread();
                switch (spread) {
                    case 'guide': return this.Guide().title() + ' \u2014 $mol Framework';
                    case 'play': return 'Playground \u2014 $mol Framework';
                    default: return '$mol Framework \u2014 Reactive UI';
                }
            }
            Guide() {
                const guide = super.Guide();
                guide.tools = () => [
                    guide.Prev_link(),
                    guide.Progress(),
                    guide.Next_link(),
                    guide.Reset_button(),
                    this.Spread_close(),
                ];
                return guide;
            }
            Play() {
                const play = super.Play();
                play.tools = () => [
                    play.Preset_hello(),
                    play.Preset_counter(),
                    play.Preset_todo(),
                    play.Share_btn(),
                    this.Spread_close(),
                ];
                return play;
            }
            switch_en(next) {
                this.$.$mol_locale.lang('en');
            }
            switch_ru(next) {
                this.$.$mol_locale.lang('ru');
            }
        }
        __decorate([
            $mol_mem
        ], $bog_docs_app.prototype, "spread", null);
        __decorate([
            $mol_mem
        ], $bog_docs_app.prototype, "Guide", null);
        __decorate([
            $mol_mem
        ], $bog_docs_app.prototype, "Play", null);
        __decorate([
            $mol_action
        ], $bog_docs_app.prototype, "switch_en", null);
        __decorate([
            $mol_action
        ], $bog_docs_app.prototype, "switch_ru", null);
        $$.$bog_docs_app = $bog_docs_app;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
var $node = $node || {} ; $node[ "/bog/docs/app/og-image.png" ] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABLAAAAJ2CAYAAABPQHtcAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAEsKADAAQAAAABAAACdgAAAADwaHwAAABAAElEQVR4AezdCbxdVX0o/kXIQAIJmQMhQBgCIUwBZJBRQByxVEHtq9N71tb2tc9a31Dtv1qHV7VagVYffQ4Va9UqFauggoIIiIgyyJQwhxDIQCDzHDL8z2/n7Zt9zh3OuTfnJvuc812fz/Wcs/faa6/1Xetec36stfZeU6eesD1JBAgQIECAAAECBAgQIECAAAECBEoqMKSk9VItAgQIECBAgAABAgQIECBAgAABApmAAJaBQIAAAQIECBAgQIAAAQIECBAgUGoBAaxSd4/KESBAgAABAgQIECBAgAABAgQICGAZAwQIECBAgAABAgQIECBAgAABAqUWEMAqdfeoHAECBAgQIECAAAECBAgQIECAgACWMUCAAAECBAgQIECAAAECBAgQIFBqAQGsUnePyhEgQIAAAQIECBAgQIAAAQIECAhgGQMECBAgQIAAAQIECBAgQIAAAQKlFhDAKnX3qBwBAgQIECBAgAABAgQIECBAgIAAljFAgAABAgQIECBAgAABAgQIECBQagEBrFJ3j8oRIECAAAECBAgQIECAAAECBAgIYBkDBAgQIECAAAECBAgQIECAAAECpRYQwCp196gcAQIECBAgQIAAAQIECBAgQICAAJYxQIAAAQIECBAgQIAAAQIECBAgUGoBAaxSd4/KESBAgAABAgQIECBAgAABAgQICGAZAwQIECBAgAABAgQIECBAgAABAqUWEMAqdfeoHAECBAgQIECAAAECBAgQIECAgACWMUCAAAECBAgQIECAAAECBAgQIFBqAQGsUnePyhEgQIAAAQIECBAgQIAAAQIECAhgGQMECBAgQIAAAQIECBAgQIAAAQKlFhDAKnX3qBwBAgQIECBAgAABAgQIECBAgIAAljFAgAABAgQIECBAgAABAgQIECBQagEBrFJ3j8oRIECAAAECBAgQIECAAAECBAgIYBkDBAgQIECAAAECBAgQIECAAAECpRYQwCp196gcAQIECBAgQIAAAQIECBAgQICAAJYxQIAAAQIECBAgQIAAAQIECBAgUGoBAaxSd4/KESBAgAABAgQIECBAgAABAgQICGAZAwQIECBAgAABAgQIECBAgAABAqUWEMAqdfeoHAECBAgQIECAAAECBAgQIECAgACWMUCAAAECBAgQIECAAAECBAgQIFBqAQGsUnePyhEgQIAAAQIECBAgQIAAAQIECAhgGQMECBAgQIAAAQIECBAgQIAAAQKlFhDAKnX3qBwBAgQIECBAgAABAgQIECBAgIAAljFAgAABAgQIECBAgAABAgQIECBQagEBrFJ3j8oRIECAAAECBAgQIECAAAECBAgIYBkDBAgQIECAAAECBAgQIECAAAECpRYQwCp196gcAQIECBAgQIAAAQIECBAgQICAAJYxQIAAAQIECBAgQIAAAQIECBAgUGoBAaxSd4/KESBAgAABAgQIECBAgAABAgQICGAZAwQIECBAgAABAgQIECBAgAABAqUWEMAqdfeoHAECBAgQIECAAAECBAgQIECAgACWMUCAAAECBAgQIECAAAECBAgQIFBqAQGsUnePyhEgQIAAAQIECBAgQIAAAQIECAhgGQMECBAgQIAAAQIECBAgQIAAAQKlFhDAKnX3qBwBAgQIECBAgAABAgQIECBAgIAAljFAgAABAgQIECBAgAABAgQIECBQagEBrFJ3j8oRIECAAAECBAgQIECAAAECBAgIYBkDBAgQIECAAAECBAgQIECAAAECpRYQwCp196gcAQIECBAgQIAAAQIECBAgQICAAJYxQIAAAQIECBAgQIAAAQIECBAgUGoBAaxSd4/KESBAgAABAgQIECBAgAABAgQICGAZAwQIECBAgAABAgQIECBAgAABAqUWEMAqdfeoHAECBAgQIECAAAECBAgQIECAgACWMUCAAAECBAgQIECAAAECBAgQIFBqAQGsUnePyhEgQIAAAQIECBAgQIAAAQIECAhgGQMECBAgQIAAAQIECBAgQIAAAQKlFhDAKnX3qBwBAgQIECBAgAABAgQIECBAgIAAljFAgAABAgQIECBAgAABAgQIECBQagEBrFJ3j8oRIECAAAECBAgQIECAAAECBAgIYBkDBAgQIECAAAECBAgQIECAAAECpRYQwCp196gcAQIECBAgQIAAAQIECBAgQICAAJYxQIAAAQIECBAgQIAAAQIECBAgUGoBAaxSd4/KESBAgAABAgQIECBAgAABAgQICGAZAwQIECBAgAABAgQIECBAgAABAqUWEMAqdfeoHAECBAgQIECAAAECBAgQIECAgACWMUCAAAECBAgQIECAAAECBAgQIFBqAQGsUnePyhEgQIAAAQIECBAgQIAAAQIECAhgGQMECBAgQIAAAQIECBAgQIAAAQKlFhDAKnX3qBwBAgQIECBAgAABAgQIECBAgIAAljFAgAABAgQIECBAgAABAgQIECBQagEBrFJ3j8oRIECAAAECBAgQIECAAAECBAgIYBkDBAgQIECAAAECBAgQIECAAAECpRYQwCp196gcAQIECBAgQIAAAQIECBAgQICAAJYxQIAAAQIECBAgQIAAAQIECBAgUGoBAaxSd4/KESBAgAABAgQIECBAgAABAgQICGAZAwQIECBAgAABAgQIECBAgAABAqUWEMAqdfeoHAECBAgQIECAAAECBAgQIECAgACWMUCAAAECBAgQIECAAAECBAgQIFBqAQGsUnePyhEgQIAAAQIECBAgQIAAAQIECAhgGQMECBAgQIAAAQIECBAgQIAAAQKlFhDAKnX3qBwBAgQIECBAgAABAgQIECBAgIAAljFAgAABAgQIECBAgAABAgQIECBQagEBrFJ3j8oRIECAAAECBAgQIECAAAECBAgIYBkDBAgQIECAAAECBAgQIECAAAECpRYQwCp196gcAQIECBAgQIAAAQIECBAgQICAAJYxQIAAAQIECBAgQIAAAQIECBAgUGoBAaxSd4/KESBAgAABAgQIECBAgAABAgQICGAZAwQIECBAgAABAgQIECBAgAABAqUWEMAqdfeoHAECBAgQIECAAAECBAgQIECAgACWMUCAAAECBAgQIECAAAECBAgQIFBqAQGsUnePyhEgQIAAAQIECBAgQIAAAQIECAhgGQMECBAgQIAAAQIECBAgQIAAAQKlFhDAKnX3qBwBAgQIECBAgAABAgQIECBAgIAAljFAgAABAgQIECBAgAABAgQIECBQagEBrFJ3j8oRIECAAAECBAgQIECAAAECBAgIYBkDBAgQIECAAAECBAgQIECAAAECpRYQwCp196gcAQIECBAgQIAAAQIECBAgQICAAJYxQIAAAQIECBAgQIAAAQIECBAgUGoBAaxSd4/KESBAgAABAgQIECBAgAABAgQICGAZAwQIECBAgAABAgQIECBAgAABAqUWEMAqdfeoHAECBAgQIECAAAECBAgQIECAgACWMUCAAAECBAgQIECAAAECBAgQIFBqAQGsUnePyhEgQIAAAQIECBAgQIAAAQIECAhgGQMECBAgQIAAAQIECBAgQIAAAQKlFhDAKnX3qBwBAgQIECBAgAABAgQIECBAgIAAljFAgAABAgQIECBAgAABAgQIECBQagEBrFJ3j8oRIECAAAECBAgQIECAAAECBAgIYBkDBAgQIECAAAECBAgQIECAAAECpRYQwCp196gcAQIECBAgQIAAAQIECBAgQICAAJYxQIAAAQIECBAgQIAAAQIECBAgUGoBAaxSd4/KESBAgAABAgQIECBAgAABAgQICGAZAwQIECBAgAABAgQIECBAgAABAqUWEMAqdfeoHAECBAgQIECAAAECBAgQIECAgACWMUCAAAECBAgQIECAAAECBAgQIFBqAQGsUnePyhEgQIAAAQIECBAgQIAAAQIECAhgGQMECBAgQIAAAQIECBAgQIAAAQKlFhDAKnX3qBwBAgQIECBAgAABAgQIECBAgIAAljFAgAABAgQIECBAgAABAgQIECBQagEBrFJ3j8oRIECAAAECBAgQIECAAAECBAgIYBkDBAgQIECAAAECBAgQIECAAAECpRYQwCp196gcAQIECBAgQIAAAQIECBAgQICAAJYxQIAAAQIECBAgQIAAAQIECBAgUGoBAaxSd4/KESBAgAABAgQIECBAgAABAgQICGAZAwQIECBAgAABAgQIECBAgAABAqUWEMAqdfeoHAECBAgQIECAAAECBAgQIECAgACWMUCAAAECBAgQIECAAAECBAgQIFBqAQGsUnePyhEgQIAAAQIECBAgQIAAAQIECAhgGQMECBAgQIAAAQIECBAgQIAAAQKlFhDAKnX3qBwBAgQIECBAgAABAgQIECBAgIAAljFAgAABAgQIECBAgAABAgQIECBQagEBrFJ3j8oRIECAAAECBAgQIECAAAECBAgIYBkDBAgQIECAAAECBAgQIECAAAECpRYQwCp196gcAQIECBAgQIAAAQIECBAgQICAAJYxQIAAAQIECBAgQIAAAQIECBAgUGoBAaxSd4/KESBAgAABAgQIECBAgAABAgQICGAZAwQIECBAgAABAgQIECBAgAABAqUWEMAqdfeoHAECBAgQIECAAAECBAgQIECAgACWMUCAAAECBAgQIECAAAECBAgQIFBqAQGsUnePyhEgQIAAAQIECBAgQIAAAQIECAhgGQMECBAgQIAAAQIECBAgQIAAAQKlFhDAKnX3qBwBAgQIECBAgAABAgQIECBAgIAAljFAgAABAgQIECBAgAABAgQIECBQagEBrFJ3j8oRIECAAAECBAgQIECAAAECBAgIYBkDBAgQIECAAAECBAgQIECAAAECpRYQwCp196gcAQIECBAgQIAAAQIECBAgQICAAJYxQIAAAQIECBAgQIAAAQIECBAgUGoBAaxSd4/KESBAgAABAgQIECBAgAABAgQICGAZAwQIECBAgAABAgQIECBAgAABAqUWEMAqdfeoHAECBAgQIECAAAECBAgQIECAgACWMUCAAAECBAgQIECAAAECBAgQIFBqAQGsUnePyhEgQIAAAQIECBAgQIAAAQIECAhgGQMECBAgQIAAAQIECBAgQIAAAQKlFhDAKnX3qBwBAgQIECBAgAABAgQIECBAgIAAljFAgAABAgQIECBAgAABAgQIECBQagEBrFJ3j8oRIECAAAECBAgQIECAAAECBAgIYBkDBAgQIECAAAECBAgQIECAAAECpRYQwCp196gcAQIECBAgQIAAAQIECBAgQICAAJYxQIAAAQIECBAgQIAAAQIECBAgUGoBAaxSd4/KESBAgAABAgQIECBAgAABAgQICGAZAwQIECBAgAABAgQIECBAgAABAqUWEMAqdfeoHAECBAgQIECAAAECBAgQIECAgACWMUCAAAECBAgQIECAAAECBAgQIFBqAQGsUnePyhEgQIAAAQIECBAgQIAAAQIECAhgGQMECBAgQIAAAQIECBAgQIAAAQKlFhDAKnX3qBwBAgQIECBAgAABAgQIECBAgIAAljFAgAABAgQIECBAgAABAgQIECBQagEBrFJ3j8oRIECAAAECBAgQIECAAAECBAgIYBkDBAgQIECAAAECBAgQIECAAAECpRYQwCp196gcAQIECBAgQIAAAQIECBAgQICAAJYxQIAAAQIECBAgQIAAAQIECBAgUGoBAaxSd4/KESBAgAABAgQIECBAgAABAgQICGAZAwQIECBAgAABAgQIECBAgAABAqUWEMAqdfeoHAECBAgQIECAAAECBAgQIECAgACWMUCAAAECBAgQIECAAAECBAgQIFBqAQGsUnePyhEgQIAAAQIECBAgQIAAAQIECAhgGQMECBAgQIAAAQIECBAgQIAAAQKlFhDAKnX3qBwBAgQIECBAgAABAgQIECBAgIAAljFAgAABAgQIECBAgAABAgQIECBQagEBrFJ3j8oRIECAAAECBAgQIECAAAECBAgIYBkDBAgQIECAAAECBAgQIECAAAECpRYQwCp196gcAQIECBAgQIAAAQIECBAgQICAAJYxQIAAAQIECBAgQIAAAQIECBAgUGoBAaxSd4/KESBAgAABAgQIECBAgAABAgQIDEVAgAABAgQIEGhEYPjwYZVse3Vl3bZtW9qyZUvXZ28IECBAgAABAgQIDJaAANZgySqXAAECBAi0kcC4cfun66//lzRkyM7J28uXr0gXX/yuNmqlphAgQIAAAQIECJRVYOe/QstaQ/UiQIAAAQIE9rjA0KFDq4JXUaHhw4fv8XqpAAECBAgQIECAQGcICGB1Rj9rJQECBAgQIECAAAECBAgQIECgZQUEsFq261ScAAECBAgQIECAAAECBAgQINAZAgJYndHPWkmAAAECBAgQIECAAAECBAgQaFkBm7i3bNepOAECBAgQIECAQC7wqledlyZOHJ9/7Pa6ffv2dO21P06bN2/uds4BAgQIECBAoPwCAljl7yM1JECAAAECu1XgoIMOTCeffFyaNGlCGj9+bPYzefKkbnXYd99R6V//9R/TwoVLsp9Fi5akefMWpAcffCRt3bq1W34HCAymwHvf+4504IGT+7zFnXfenZ55ZmGfeZwkQIAAAQIEyikggFXOflErAgQIECCwWwVe9rIT07nnnpHOOOPkNG3agQ3de6+99kpHHDE9+ylesG7d+nTPPQ+kO++8J91++11p1ao1xdPeEyBAgAABAgQIEOi3gABWv8lcQIAAAQIE2kfghBOOSX/yJ+9KJ544q2mNiplZ55338uzn/e//w/S97/04fetb/5FWrFjVtHsoiAABAgQIECBAoLMEBLA6q7+1lgABAgQIZALjxo1NH/rQn6Wzzz5tUEVGjtwnve1tb0qXXvr69G//9v301a/+W2V54bZBvafCCRAgQIAAAQIE2k/AUwjbr0+1iAABAgQI9Clw6KEHpa985bODHrwqVmKffUak//Jf3pr+8R//d4rgmUSAAAECBAgQIECgPwICWP3RkpcAAQIECLS4wOzZx6YvfvGzlc2up+yRlpx00nHpa1+7Ih111OF75P5uSoAAAQIECBAg0JoCAlit2W9qTYAAAQIE+i0QG65fccVH05gx+/X72mZeEE83/Pu//0iaOHF8M4tVFgECBAgQIECAQBsLCGC1cedqGgECBAgQyAViY/VPfeqDacSIEfmhhl+3bNmatmzZ0nD+RjJG8Oqzn/1wpT7DG8kuDwECBAgQIECAQIcL2MS9wweA5hMgQIBAZwh8+MPvT9OmTW2osdu3b093331/+sUvfp3uuuu+tHjx0mzJ31e/ennV9WvXrkuXXfZH6aCDDkgxu+s1r3lFiiWCe+21V1W+3j4cffQR6c///D3pM5+5qrcsjhMgQIAAAQIECBDIBASwDAQCBAgQINDmAhdccFY699wzGmrlnDmPpcsv/1J65JEnGsq/evWaFD+R/4c/vCkdcMDkLCh13nmN3e/iiy/Knk747LOLGrqfTAQIECBAgAABAp0pYAlhZ/a7VhMgQIBAhwgMGTIkvec9b2uotT/96W3pve/9y4aDVz0VumTJ0vShD30y/d3f/Z+0efNLPWWpOjZ06N6Ve76j6pgPBAgQIECAAAECBGoFBLBqRXwmQIAAAQJtJPCa15yfpk+fVrdFd911b/r4x69I27Ztq5u3kQw/+MFP0qc//YVGsqaYIRbLECUCBAgQIECAAAECvQkIYPUm4zgBAgQIEGgDgTe/+eK6rYhN2mPZYLOCV/kNb7zx5+nb3/5B/rHP17POOrXP804SIECAAAECBAh0toAAVmf3v9YTIECAQBsLxJP+YqP0eilmSz333OJ62QZ0/otf/Ne0atXqutcKYNUlkoEAAQIECBAg0NECAlgd3f0aT4AAAQLtLNBIUGj9+g3pq1/99qAxbNq0OV177Y/rlh9PLxwxYnjdfDIQIECAAAECBAh0poAAVmf2u1YTIECAQAcInHLKCXVbefvtd6UVK1bWzbcrGa699kdpy5YtfRYxdOjQdOCBU/rM4yQBAgQIECBAgEDnCghgdW7fazkBAgQItLnA5MkT6rbwqaeeqZtnVzOsWLEqNXKfRuq7q3VxffME9t577xTLVI866vDKgwIOTjNmHJZ9juMSAQIECBAgQKDZAkObXaDyCBAgQIAAgXIIjB8/rm5F5s0b/ABWVOLxx+fV3Y9r8uSJdevbzAwx62v27Flp2rSp6eCDp1ZeD8xex47dPy1btiItXLi48rOk63XOnMfT2rXrdqkKEew5/fST0uTJkyo/E9KkSROyoM9ee+2V3TPu++KLy7Of+++fk+6998Gmb64/kAaMHLlPOuOMk9PZZ5+eZs48Io0fPzaNGTM6Rb17SqtXr01LlixNd999f7rrrvvSAw/MrTsLr6dyHCNAgAABAgQI5AICWLmEVwIECBAg0GYC48btX7dFETDZHenxx5+q3OaiPm81ZEhjE8P322/fdOWVH0t9zfR58smn09/+7T/2eL/hw4enSy55VXrb295UCSL1HDQbO3ZMOuKIQ6uuj+DVt771H+k737kubdiwsepcXx/iHq9+9XmVn1ekww+vLrN43YQJ3QOO0T8333x7uuGGn2dBwGL+wX6/995D0mtfe0G64IKz0sknn5CGDx/W8C3HjNmvEuDaL5udFc6x11oEs77xje+lOXMea7gcGQkQIECAAAECuYAAVi7hlQABAgQItJlABA323XdUn62KQM3uSN/73g3p+utv6vNWmze/1Of5/GTMBpo166j8Y4+vw4Z1/yfOqFEj06WXvi699a2XZDOIerywj4MROPujP3p7evOb35C+/vV/T//xHzekvuocM7ze857fT29/+5tSo8G52ttHUCvqGz/XXHN9+sIXrt4tM5lOPXV2ev/735MOO+yQ2ioN6HPYn3fey7OfX/7y7vTlL39ztwfkBlRxFxEgQIAAAQKlEej+r7vSVE1FCBAgQIAAgV0RaCRocuSRh6Xf/Ob+XblNQ9du3769z2BPQ4XsQqZYHvi5z/1NtkRwF4rJLo2ZbX/+5+9JF110Xnrf+/46m11UW2YEfv7mbz6QzUCqPTfQz295yxvSccfNTB/+8GfS4sXPD7SYPq876KADKm36g3TOOaf3mW9XTsbTMc8882XppptuT5/5zFU9+u1K+a4lQIAAAQIE2lOgsbn67dl2rSJAgAABAm0tsHLlqrrtiz2Z2j3Nnn1s+spX/r4pwaui1axZM9JnP/vhytK64cXD6XWvuzBdffUVTQ1e5TeIe1599eW9Ln3M8w3k9aSTjktf+9qVgxq8yusVe2e96lXnpX/+58+lQw89KD/slQABAgQIECDQq4AAVq80ThAgQIAAgdYWWLlydd0GnHjirG4BmLoXtVCGWAr3D//w8WzD8cGodgR9YqldnmJ20Yc+9Gf9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BAjMCfzd3NBGJkCAAAECBAgQIECAAAECBAgQINALCLB6Iz0IECBAgAABAgQIECBAgAABAgQGBQRYg/iGJkCAAAECBAgQIECAAAECBAgQ6AUEWL2RHgQIECBAgAABAgQIECBAgAABAoMCAqxBfEMTIECAAAECBAgQIECAAAECBAj0AgKs3kgPAgQIECBAgAABAgQIECBAgACBQQEB1iC+oQkQIECAAAECBAgQIECAAAECBHoBAVZvpAcBAgQIECBAgAABAgQIECBAgMCggABrEN/QBAgQIECAAAECBAgQIECAAAECvYAAqzfSgwABAgQIECBAgAABAgQIECBAYFBAgDWIb2gCBAgQIECAAAECBAgQIECAAIFeQIDVG+lBgAABAgQIECBAgAABAgQIECAwKCDAGsQ3NAECBAgQIECAAAECBAgQIECAQC8gwOqN9CBAgAABAgQIECBAgAABAgQIEBgUEGAN4huaAAECBAgQIECAAAECBAgQIECgFxBg9UZ6ECBAgAABAgQIECBAgAABAgQIDAoIsAbxDU2AAAECBAgQIECAAAECBAgQINALCLB6Iz0IECBAgAABAgQIECBAgAABAgQGBQRYg/iGJkCAAAECBAgQIECAAAECBAgQ6AUEWL2RHgQIECBAgAABAgQIECBAgAABAoMCAqxBfEMTIECAAAECBAgQIECAAAECBAj0AgKs3kgPAgQIECBAgAABAgQIECBAgACBQQEB1iC+oQkQIECAAAECBAgQIECAAAECBHoBAVZvpAcBAgQIECBAgAABAgQIECBAgMCggABrEN/QBAgQIECAAAECBAgQIECAAAECvYAAqzfSgwABAgQIECBAgAABAgQIECBAYFBAgDWIb2gCBAgQIECAAAECBAgQIECAAIFeQIDVG+lBgAABAgQIECBAgAABAgQIECAwKCDAGsQ3NAECBAgQIECAAAECBAgQIECAQC8gwOqN9CBAgAABAgQIECBAgAABAgQIEBgUEGAN4huaAAECBAgQIECAAAECBAgQIECgFxBg9UZ6ECBAgAABAgQIECBAgAABAgQIDAoIsAbxDU2AAAECBAgQIECAAAECBAgQINALCLB6Iz0IECBAgAABAgQIECBAgAABAgQGBQRYg/iGJkCAAAECBAgQIECAAAECBAgQ6AUEWL2RHgQIECBAgAABAgQIECBAgAABAoMCAqxBfEMTIECAAAECBAgQIECAAAECBAj0AgKs3kgPAgQIECBAgAABAgQIECBAgACBQQEB1iC+oQkQIECAAAECBAgQIECAAAECBHoBAVZvpAcBAgQIECBAgAABAgQIECBAgMCggABrEN/QBAgQIECAAAECBAgQIECAAAECvYAAqzfSgwABAgQIECBAgAABAgQIECBAYFBAgDWIb2gCBAgQIECAAAECBAgQIECAAIFeQIDVG+lBgAABAgQIECBAgAABAgQIECAwKCDAGsQ3NAECBAgQIECAAAECBAgQIECAQC8gwOqN9CBAgAABAgQIECBAgAABAgQIEBgUEGAN4huaAAECBAgQIECAAAECBAgQIECgFxBg9UZ6ECBAgAABAgQIECBAgAABAgQIDAoIsAbxDU2AAAECBAgQIECAAAECBAgQINALCLB6Iz0IECBAgAABAgQIECBAgAABAgQGBQRYg/iGJkCAAAECBAgQIECAAAECBAgQ6AUEWL2RHgQIECBAgAABAgQIECBAgAABAoMCAqxBfEMTIECAAAECBAgQIECAAAECBAj0AgKs3kgPAgQIECBAgAABAgQIECBAgACBQQEB1iC+oQkQIECAAAECBAgQIECAAAECBHoBAVZvpAcBAgQIECBAgAABAgQIECBAgMCggABrEN/QBAgQIECAAAECBAgQIECAAAECvYAAqzfSgwABAgQIECBAgAABAgQIECBAYFBAgDWIb2gCBAgQIECAAAECBAgQIECAAIFeQIDVG+lBgAABAgQIECBAgAABAgQIECAwKCDAGsQ3NAECBAgQIECAAAECBAgQIECAQC8gwOqN9CBAgAABAgQIECBAgAABAgQIEBgUEGAN4huaAAECBAgQIECAAAECBAgQIECgFxBg9UZ6ECBAgAABAgQIECBAgAABAgQIDAoIsAbxDU2AAAECBAgQIECAAAECBAgQINALCLB6Iz0IECBAgAABAgQIECBAgAABAgQGBQRYg/iGJkCAAAECBAgQIECAAAECBAgQ6AUEWL2RHgQIECBAgAABAgQIECBAgAABAoMCAqxBfEMTIECAAAECBAgQIECAAAECBAj0AgKs3kgPAgQIECBAgAABAgQIECBAgACBQQEB1iC+oQkQIECAAAECBAgQIECAAAECBHoBAVZvpAcBAgQIECBAgAABAgQIECBAgMCggABrEN/QBAgQIECAAAECBAgQIECAAAECvYAAqzfSgwABAgQIECBAgAABAgQIECBAYFBAgDWIb2gCBAgQIECAAAECBAgQIECAAIFeQIDVG+lBgAABAgQIECBAgAABAgQIECAwKCDAGsQ3NAECBAgQIECAAAECBAgQIECAQC8gwOqN9CBAgAABAgQIECBAgAABAgQIEBgUEGAN4huaAAECBAgQIECAAAECBAgQIECgFxBg9UZ6ECBAgAABAgQIECBAgAABAgQIDAoIsAbxDU2AAAECBAgQIECAAAECBAgQINALCLB6Iz0IECBAgAABAgQIECBAgAABAgQGBQRYg/iGJkCAAAECBAgQIECAAAECBAgQ6AUEWL2RHgQIECBAgAABAgQIECBAgAABAoMCAqxBfEMTIECAAAECBAgQIECAAAECBAj0AgKs3kgPAgQIECBAgAABAgQIECBAgACBQQEB1iC+oQkQIECAAAECBAgQIECAAAECBHoBAVZvpAcBAgQIECBAgAABAgQIECBAgMCggABrEN/QBAgQIECAAAECBAgQIECAAAECvYAAqzfSgwABAgQIECBAgAABAgQIECBAYFBAgDWIb2gCBAgQIECAAAECBAgQIECAAIFeQIDVG+lBgAABAgQIECBAgAABAgQIECAwKCDAGsQ3NAECBAgQIECAAAECBAgQIECAQC8gwOqN9CBAgAABAgQIECBAgAABAgQIEBgUEGAN4huaAAECBAgQIECAAAECBAgQIECgFxBg9UZ6ECBAgAABAgQIECBAgAABAgQIDAoIsAbxDU2AAAECBAgQIECAAAECBAgQINALCLB6Iz0IECBAgAABAgQIECBAgAABAgQGBQRYg/iGJkCAAAECBAgQIECAAAECBAgQ6AUEWL2RHgQIECBAgAABAgQIECBAgAABAoMCAqxBfEMTIECAAAECBAgQIECAAAECBAj0AgKs3kgPAgQIECBAgAABAgQIECBAgACBQQEB1iC+oQkQIECAAAECBAgQIECAAAECBHoBAVZvpAcBAgQIECBAgAABAgQIECBAgMCggABrEN/QBAgQIECAAAECBAgQIECAAAECvYAAqzfSgwABAgQIECBAgAABAgQIECBAYFBAgDWIb2gCBAgQIECAAAECBAgQIECAAIFeQIDVG+lBgAABAgQIECBAgAABAgQIECAwKCDAGsQ3NAECBAgQIECAAAECBAgQIECAQC8gwOqN9CBAgAABAgQIECBAgAABAgQIEBgUEGAN4huaAAECBAgQIECAAAECBAgQIECgFxBg9UZ6ECBAgAABAgQIECBAgAABAgQIDAoIsAbxDU2AAAECBAgQIECAAAECBAgQINALCLB6Iz0IECBAgAABAgQIECBAgAABAgQGBQRYg/iGJkCAAAECBAgQIECAAAECBAgQ6AUEWL2RHgQIECBAgAABAgQIECBAgAABAoMCAqxBfEMTIECAAAECBAgQIECAAAECBAj0AgKs3kgPAgQIECBAgAABAgQIECBAgACBQQEB1iC+oQkQIECAAAECBAgQIECAAAECBHoBAVZvpAcBAgQIECBAgAABAgQIECBAgMCggABrEN/QBAgQIECAAAECBAgQIECAAAECvYAAqzfSgwABAgQIECBAgAABAgQIECBAYFBAgDWIb2gCBAgQIECAAAECBAgQIECAAIFeQIDVG+lBgAABAgQIECBAgAABAgQIECAwKCDAGsQ3NAECBAgQIECAAAECBAgQIECAQC8gwOqN9CBAgAABAgQIECBAgAABAgQIEBgUEGAN4huaAAECBAgQIECAAAECBAgQIECgFxBg9UZ6ECBAgAABAgQIECBAgAABAgQIDAoIsAbxDU2AAAECBAgQIECAACa8JsEAAAdESURBVAECBAgQINALCLB6Iz0IECBAgAABAgQIECBAgAABAgQGBQRYg/iGJkCAAAECBAgQIECAAAECBAgQ6AUEWL2RHgQIECBAgAABAgQIECBAgAABAoMCAqxBfEMTIECAAAECBAgQIECAAAECBAj0AgKs3kgPAgQIECBAgAABAgQIECBAgACBQQEB1iC+oQkQIECAAAECBAgQIECAAAECBHoBAVZvpAcBAgQIECBAgAABAgQIECBAgMCggABrEN/QBAgQIECAAAECBAgQIECAAAECvYAAqzfSgwABAgQIECBAgAABAgQIECBAYFBAgDWIb2gCBAgQIECAAAECBAgQIECAAIFeQIDVG+lBgAABAgQIECBAgAABAgQIECAwKCDAGsQ3NAECBAgQIECAAAECBAgQIECAQC8gwOqN9CBAgAABAgQIECBAgAABAgQIEBgUEGAN4huaAAECBAgQIECAAAECBAgQIECgFxBg9UZ6ECBAgAABAgQIECBAgAABAgQIDAoIsAbxDU2AAAECBAgQIECAAAECBAgQINALCLB6Iz0IECBAgAABAgQIECBAgAABAgQGBQRYg/iGJkCAAAECBAgQIECAAAECBAgQ6AUEWL2RHgQIECBAgAABAgQIECBAgAABAoMCAqxBfEMTIECAAAECBAgQIECAAAECBAj0AgKs3kgPAgQIECBAgAABAgQIECBAgACBQQEB1iC+oQkQIECAAAECBAgQIECAAAECBHoBAVZvpAcBAgQIECBAgAABAgQIECBAgMCggABrEN/QBAgQIECAAAECBAgQIECAAAECvYAAqzfSgwABAgQIECBAgAABAgQIECBAYFBAgDWIb2gCBAgQIECAAAECBAgQIECAAIFeQIDVG+lBgAABAgQIECBAgAABAgQIECAwKCDAGsQ3NAECBAgQIECAAAECBAgQIECAQC8gwOqN9CBAgAABAgQIECBAgAABAgQIEBgUEGAN4huaAAECBAgQIECAAAECBAgQIECgFxBg9UZ6ECBAgAABAgQIECBAgAABAgQIDAoIsAbxDU2AAAECBAgQIECAAAECBAgQINALCLB6Iz0IECBAgAABAgQIECBAgAABAgQGBQRYg/iGJkCAAAECBAgQIECAAAECBAgQ6AUEWL2RHgQIECBAgAABAgQIECBAgAABAoMCAqxBfEMTIECAAAECBAgQIECAAAECBAj0AgKs3kgPAgQIECBAgAABAgQIECBAgACBQQEB1iC+oQkQIECAAAECBAgQIECAAAECBHoBAVZvpAcBAgQIECBAgAABAgQIECBAgMCggABrEN/QBAgQIECAAAECBAgQIECAAAECvYAAqzfSgwABAgQIECBAgAABAgQIECBAYFBAgDWIb2gCBAgQIECAAAECBAgQIECAAIFeQIDVG+lBgAABAgQIECBAgAABAgQIECAwKCDAGsQ3NAECBAgQIECAAAECBAgQIECAQC8gwOqN9CBAgAABAgQIECBAgAABAgQIEBgUEGAN4huaAAECBAgQIECAAAECBAgQIECgFxBg9UZ6ECBAgAABAgQIECBAgAABAgQIDAoIsAbxDU2AAAECBAgQIECAAAECBAgQINALCLB6Iz0IECBAgAABAgQIECBAgAABAgQGBQRYg/iGJkCAAAECBAgQIECAAAECBAgQ6AUEWL2RHgQIECBAgAABAgQIECBAgAABAoMCAqxBfEMTIECAAAECBAgQIECAAAECBAj0AgKs3kgPAgQIECBAgAABAgQIECBAgACBQQEB1iC+oQkQIECAAAECBAgQIECAAAECBHoBAVZvpAcBAgQIECBAgAABAgQIECBAgMCggABrEN/QBAgQIECAAAECBAgQIECAAAECvYAAqzfSgwABAgQIECBAgAABAgQIECBAYFBAgDWIb2gCBAgQIECAAAECBAgQIECAAIFeQIDVG+lBgAABAgQIECBAgAABAgQIECAwKCDAGsQ3NAECBAgQIECAAAECBAgQIECAQC8gwOqN9CBAgAABAgQIECBAgAABAgQIEBgUEGAN4huaAAECBAgQIECAAAECBAgQIECgFxBg9UZ6ECBAgAABAgQIECBAgAABAgQIDAoIsAbxDU2AAAECBAgQIECAAAECBAgQINALCLB6Iz0IECBAgAABAgQIECBAgAABAgQGBQRYg/iGJkCAAAECBAgQIECAAAECBAgQ6AUEWL2RHgQIECBAgAABAgQIECBAgAABAoMCAqxBfEMTIECAAAECBAgQIECAAAECBAj0AgKs3kgPAgQIECBAgAABAgQIECBAgACBQQEB1iC+oQkQIECAAAECBAgQIECAAAECBHoBAVZvpAcBAgQIECBAgAABAgQIECBAgMCggABrEN/QBAgQIECAAAECBAgQIECAAAECvYAAqzfSgwABAgQIECBAgAABAgQIECBAYFBAgDWIb2gCBAgQIECAAAECBAgQIECAAIFe4P8AX/FCnmeeongAAAAASUVORK5CYII="

;
var $node = $node || {} ; $node[ "/bog/docs/app/og-image.svg" ] = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgdmlld0JveD0iMCAwIDEyMDAgNjMwIj4KCTxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgZmlsbD0iIzFhMWEyZSIvPgoJPHRleHQgeD0iNjAwIiB5PSIyNjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iOTYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjZTBlMGUwIj4kbW9sPC90ZXh0PgoJPHRleHQgeD0iNjAwIiB5PSIzNTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMzYiIGZpbGw9IiM4ODgiPlJlYWN0aXZlIFVJIEZyYW1ld29yazwvdGV4dD4KCTx0ZXh0IHg9IjYwMCIgeT0iNDIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic3lzdGVtLXVpLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmaWxsPSIjNjY2Ij5JbnRlcmFjdGl2ZSBEb2NzICZhbXA7IFBsYXlncm91bmQ8L3RleHQ+Cjwvc3ZnPgo="

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($bog_docs_app, {
            flex: {
                grow: 1,
            },
            Github_link: {
                padding: $mol_gap.block,
                color: $mol_theme.shade,
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));


export default $
//# sourceMappingURL=node.js.map
