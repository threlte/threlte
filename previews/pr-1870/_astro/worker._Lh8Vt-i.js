// src/worker.ts
import { expose, transfer } from "comlink";

// src/wasm/msdfgen_wasm.js
var createMSDFGenModule = (() => {
  var _scriptName = import.meta.url;
  return (function(moduleArg = {}) {
    var moduleRtn;
    var m = moduleArg, aa, p, ba = new Promise((a, b) => {
      aa = a;
      p = b;
    }), ca = Object.assign({}, m), r = "", da;
    "undefined" != typeof document && document.currentScript && (r = document.currentScript.src);
    _scriptName && (r = _scriptName);
    r.startsWith("blob:") ? r = "" : r = r.substr(0, r.replace(/[?#].*/, "").lastIndexOf("/") + 1);
    da = async (a) => {
      a = await fetch(a, { credentials: "same-origin" });
      if (a.ok) return a.arrayBuffer();
      throw Error(a.status + " : " + a.url);
    };
    var ea = m.print || console.log.bind(console), w = m.printErr || console.error.bind(console);
    Object.assign(m, ca);
    ca = null;
    var x = m.wasmBinary, A, B = false, fa, ha, C, D, E, G, H, ia, ja;
    function ka() {
      var a = A.buffer;
      m.HEAP8 = ha = new Int8Array(a);
      m.HEAP16 = D = new Int16Array(a);
      m.HEAPU8 = C = new Uint8Array(a);
      m.HEAPU16 = E = new Uint16Array(a);
      m.HEAP32 = G = new Int32Array(a);
      m.HEAPU32 = H = new Uint32Array(a);
      m.HEAPF32 = ia = new Float32Array(a);
      m.HEAPF64 = ja = new Float64Array(a);
    }
    var la = [], ma = [], na = [];
    function oa() {
      var a = m.preRun.shift();
      la.unshift(a);
    }
    var I = 0, J = null;
    function pa(a) {
      m.onAbort?.(a);
      a = "Aborted(" + a + ")";
      w(a);
      B = true;
      a = new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
      p(a);
      throw a;
    }
    var qa = (a) => a.startsWith("data:application/octet-stream;base64,"), ra;
    async function sa(a) {
      if (!x) try {
        var b = await da(a);
        return new Uint8Array(b);
      } catch {
      }
      if (a == ra && x) a = new Uint8Array(x);
      else throw "both async and sync fetching of the wasm failed";
      return a;
    }
    async function ta(a, b) {
      try {
        var c = await sa(a);
        return await WebAssembly.instantiate(c, b);
      } catch (d) {
        w(`failed to asynchronously prepare wasm: ${d}`), pa(d);
      }
    }
    async function ua(a) {
      var b = ra;
      if (!x && "function" == typeof WebAssembly.instantiateStreaming && !qa(b) && "function" == typeof fetch) try {
        var c = fetch(b, { credentials: "same-origin" });
        return await WebAssembly.instantiateStreaming(c, a);
      } catch (d) {
        w(`wasm streaming compile failed: ${d}`), w("falling back to ArrayBuffer instantiation");
      }
      return ta(b, a);
    }
    class va {
      name = "ExitStatus";
      constructor(a) {
        this.message = `Program terminated with exit(${a})`;
        this.status = a;
      }
    }
    var wa = (a) => {
      for (; 0 < a.length; ) a.shift()(m);
    }, ya = m.noExitRuntime || true;
    class za {
      constructor(a) {
        this.K = a - 24;
      }
    }
    var Aa = 0, Ba = 0, Ca = {}, Da = (a) => {
      for (; a.length; ) {
        var b = a.pop();
        a.pop()(b);
      }
    };
    function K(a) {
      return this.fromWireType(H[a >> 2]);
    }
    var L = {}, M = {}, Ea = {}, N, P = (a, b, c) => {
      function d(g) {
        g = c(g);
        if (g.length !== a.length) throw new N("Mismatched type converter count");
        for (var l = 0; l < a.length; ++l) O(a[l], g[l]);
      }
      a.forEach((g) => Ea[g] = b);
      var e = Array(b.length), f = [], h = 0;
      b.forEach((g, l) => {
        M.hasOwnProperty(g) ? e[l] = M[g] : (f.push(g), L.hasOwnProperty(g) || (L[g] = []), L[g].push(() => {
          e[l] = M[g];
          ++h;
          h === f.length && d(e);
        }));
      });
      0 === f.length && d(e);
    }, Fa, Q = (a) => {
      for (var b = ""; C[a]; ) b += Fa[C[a++]];
      return b;
    }, R, Ga = (a) => {
      throw new R(a);
    };
    function Ha(a, b, c = {}) {
      var d = b.name;
      if (!a) throw new R(`type "${d}" must have a positive integer typeid pointer`);
      if (M.hasOwnProperty(a)) {
        if (c.pa) return;
        throw new R(`Cannot register type '${d}' twice`);
      }
      M[a] = b;
      delete Ea[a];
      L.hasOwnProperty(a) && (b = L[a], delete L[a], b.forEach((e) => e()));
    }
    function O(a, b, c = {}) {
      return Ha(a, b, c);
    }
    var Ia = (a) => {
      throw new R(a.I.L.J.name + " instance already deleted");
    }, Ja = false, Ka = () => {
    }, La = (a, b, c) => {
      if (b === c) return a;
      if (void 0 === c.N) return null;
      a = La(a, b, c.N);
      return null === a ? null : c.ia(a);
    }, Ma = {}, Na = {}, Oa = (a, b) => {
      if (void 0 === b) throw new R("ptr should not be undefined");
      for (; a.N; ) b = a.Z(b), a = a.N;
      return Na[b];
    }, Pa = (a, b) => {
      if (!b.L || !b.K) throw new N("makeClassHandle requires ptr and ptrType");
      if (!!b.O !== !!b.M) throw new N("Both smartPtrType and smartPtr must be specified");
      b.count = { value: 1 };
      return S(Object.create(
        a,
        { I: { value: b, writable: true } }
      ));
    }, S = (a) => {
      if ("undefined" === typeof FinalizationRegistry) return S = (b) => b, a;
      Ja = new FinalizationRegistry((b) => {
        b = b.I;
        --b.count.value;
        0 === b.count.value && (b.M ? b.O.R(b.M) : b.L.J.R(b.K));
      });
      S = (b) => {
        var c = b.I;
        c.M && Ja.register(b, { I: c }, b);
        return b;
      };
      Ka = (b) => {
        Ja.unregister(b);
      };
      return S(a);
    }, Qa = [];
    function Ra() {
    }
    var Sa = (a, b) => Object.defineProperty(b, "name", { value: a }), Ta = (a, b, c) => {
      if (void 0 === a[b].T) {
        var d = a[b];
        a[b] = function(...e) {
          if (!a[b].T.hasOwnProperty(e.length)) throw new R(`Function '${c}' called with an invalid number of arguments (${e.length}) - expects one of (${a[b].T})!`);
          return a[b].T[e.length].apply(this, e);
        };
        a[b].T = [];
        a[b].T[d.W] = d;
      }
    }, Ua = (a, b) => {
      if (m.hasOwnProperty(a)) throw new R(`Cannot register public name '${a}' twice`);
      m[a] = b;
      m[a].W = void 0;
    }, Va = (a) => {
      a = a.replace(/[^a-zA-Z0-9_]/g, "$");
      var b = a.charCodeAt(0);
      return 48 <= b && 57 >= b ? `_${a}` : a;
    };
    function Wa(a, b, c, d, e, f, h, g) {
      this.name = a;
      this.constructor = b;
      this.V = c;
      this.R = d;
      this.N = e;
      this.ka = f;
      this.Z = h;
      this.ia = g;
      this.ra = [];
    }
    var Xa = (a, b, c) => {
      for (; b !== c; ) {
        if (!b.Z) throw new R(`Expected null or instance of ${c.name}, got an instance of ${b.name}`);
        a = b.Z(a);
        b = b.N;
      }
      return a;
    };
    function Ya(a, b) {
      if (null === b) {
        if (this.ba) throw new R(`null is not a valid ${this.name}`);
        return 0;
      }
      if (!b.I) throw new R(`Cannot pass "${Za(b)}" as a ${this.name}`);
      if (!b.I.K) throw new R(`Cannot pass deleted object as a pointer of type ${this.name}`);
      return Xa(b.I.K, b.I.L.J, this.J);
    }
    function $a(a, b) {
      if (null === b) {
        if (this.ba) throw new R(`null is not a valid ${this.name}`);
        if (this.aa) {
          var c = this.ca();
          null !== a && a.push(this.R, c);
          return c;
        }
        return 0;
      }
      if (!b || !b.I) throw new R(`Cannot pass "${Za(b)}" as a ${this.name}`);
      if (!b.I.K) throw new R(`Cannot pass deleted object as a pointer of type ${this.name}`);
      if (!this.$ && b.I.L.$) throw new R(`Cannot convert argument of type ${b.I.O ? b.I.O.name : b.I.L.name} to parameter type ${this.name}`);
      c = Xa(b.I.K, b.I.L.J, this.J);
      if (this.aa) {
        if (void 0 === b.I.M) throw new R("Passing raw pointer to smart pointer is illegal");
        switch (this.wa) {
          case 0:
            if (b.I.O === this) c = b.I.M;
            else throw new R(`Cannot convert argument of type ${b.I.O ? b.I.O.name : b.I.L.name} to parameter type ${this.name}`);
            break;
          case 1:
            c = b.I.M;
            break;
          case 2:
            if (b.I.O === this) c = b.I.M;
            else {
              var d = b.clone();
              c = this.sa(c, ab(() => d["delete"]()));
              null !== a && a.push(this.R, c);
            }
            break;
          default:
            throw new R("Unsupporting sharing policy");
        }
      }
      return c;
    }
    function bb(a, b) {
      if (null === b) {
        if (this.ba) throw new R(`null is not a valid ${this.name}`);
        return 0;
      }
      if (!b.I) throw new R(`Cannot pass "${Za(b)}" as a ${this.name}`);
      if (!b.I.K) throw new R(`Cannot pass deleted object as a pointer of type ${this.name}`);
      if (b.I.L.$) throw new R(`Cannot convert argument of type ${b.I.L.name} to parameter type ${this.name}`);
      return Xa(b.I.K, b.I.L.J, this.J);
    }
    function cb(a, b, c, d, e, f, h, g, l, k, n) {
      this.name = a;
      this.J = b;
      this.ba = c;
      this.$ = d;
      this.aa = e;
      this.qa = f;
      this.wa = h;
      this.ga = g;
      this.ca = l;
      this.sa = k;
      this.R = n;
      e || void 0 !== b.N ? this.toWireType = $a : (this.toWireType = d ? Ya : bb, this.P = null);
    }
    var eb = (a, b) => {
      if (!m.hasOwnProperty(a)) throw new N("Replacing nonexistent public symbol");
      m[a] = b;
      m[a].W = void 0;
    }, fb, gb = (a, b, c = []) => {
      a.includes("j") ? (a = a.replace(/p/g, "i"), b = (0, m["dynCall_" + a])(b, ...c)) : b = fb.get(b)(...c);
      return b;
    }, hb = (a, b) => (...c) => gb(a, b, c), V = (a, b) => {
      a = Q(a);
      var c = a.includes("j") ? hb(a, b) : fb.get(b);
      if ("function" != typeof c) throw new R(`unknown function pointer with signature ${a}: ${b}`);
      return c;
    }, ib, kb = (a) => {
      a = jb(a);
      var b = Q(a);
      W(a);
      return b;
    }, lb = (a, b) => {
      function c(f) {
        e[f] || M[f] || (Ea[f] ? Ea[f].forEach(c) : (d.push(f), e[f] = true));
      }
      var d = [], e = {};
      b.forEach(c);
      throw new ib(`${a}: ` + d.map(kb).join([", "]));
    }, mb = (a, b) => {
      for (var c = [], d = 0; d < a; d++) c.push(H[b + 4 * d >> 2]);
      return c;
    };
    function nb(a) {
      for (var b = 1; b < a.length; ++b) if (null !== a[b] && void 0 === a[b].P) return true;
      return false;
    }
    function ob(a) {
      var b = Function;
      if (!(b instanceof Function)) throw new TypeError(`new_ called with constructor type ${typeof b} which is not a function`);
      var c = Sa(b.name || "unknownFunctionName", function() {
      });
      c.prototype = b.prototype;
      c = new c();
      a = b.apply(c, a);
      return a instanceof Object ? a : c;
    }
    function pb(a, b, c, d, e, f) {
      var h = b.length;
      if (2 > h) throw new R("argTypes array size mismatch! Must at least get return value and 'this' types!");
      var g = null !== b[1] && null !== c, l = nb(b);
      c = "void" !== b[0].name;
      d = [a, Ga, d, e, Da, b[0], b[1]];
      for (e = 0; e < h - 2; ++e) d.push(b[e + 2]);
      if (!l) for (e = g ? 1 : 2; e < b.length; ++e) null !== b[e].P && d.push(b[e].P);
      l = nb(b);
      e = b.length - 2;
      var k = [], n = ["fn"];
      g && n.push("thisWired");
      for (h = 0; h < e; ++h) k.push(`arg${h}`), n.push(`arg${h}Wired`);
      k = k.join(",");
      n = n.join(",");
      k = `return function (${k}) {
`;
      l && (k += "var destructors = [];\n");
      var q = l ? "destructors" : "null", t = "humanName throwBindingError invoker fn runDestructors retType classParam".split(" ");
      g && (k += `var thisWired = classParam['toWireType'](${q}, this);
`);
      for (h = 0; h < e; ++h) k += `var arg${h}Wired = argType${h}['toWireType'](${q}, arg${h});
`, t.push(`argType${h}`);
      k += (c || f ? "var rv = " : "") + `invoker(${n});
`;
      if (l) k += "runDestructors(destructors);\n";
      else for (h = g ? 1 : 2; h < b.length; ++h) f = 1 === h ? "thisWired" : "arg" + (h - 2) + "Wired", null !== b[h].P && (k += `${f}_dtor(${f});
`, t.push(`${f}_dtor`));
      c && (k += "var ret = retType['fromWireType'](rv);\nreturn ret;\n");
      let [v, u] = [t, k + "}\n"];
      v.push(u);
      b = ob(v)(...d);
      return Sa(a, b);
    }
    var qb = (a) => {
      a = a.trim();
      const b = a.indexOf("(");
      return -1 !== b ? a.substr(0, b) : a;
    }, rb = [], X = [], ab = (a) => {
      switch (a) {
        case void 0:
          return 2;
        case null:
          return 4;
        case true:
          return 6;
        case false:
          return 8;
        default:
          const b = rb.pop() || X.length;
          X[b] = a;
          X[b + 1] = 1;
          return b;
      }
    }, sb = { name: "emscripten::val", fromWireType: (a) => {
      if (!a) throw new R("Cannot use deleted val. handle = " + a);
      var b = X[a];
      9 < a && 0 === --X[a + 1] && (X[a] = void 0, rb.push(a));
      return b;
    }, toWireType: (a, b) => ab(b), S: 8, readValueFromPointer: K, P: null }, Za = (a) => {
      if (null === a) return "null";
      var b = typeof a;
      return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;
    }, tb = (a, b) => {
      switch (b) {
        case 4:
          return function(c) {
            return this.fromWireType(ia[c >> 2]);
          };
        case 8:
          return function(c) {
            return this.fromWireType(ja[c >> 3]);
          };
        default:
          throw new TypeError(`invalid float width (${b}): ${a}`);
      }
    }, ub = (a, b, c) => {
      switch (b) {
        case 1:
          return c ? (d) => ha[d] : (d) => C[d];
        case 2:
          return c ? (d) => D[d >> 1] : (d) => E[d >> 1];
        case 4:
          return c ? (d) => G[d >> 2] : (d) => H[d >> 2];
        default:
          throw new TypeError(`invalid integer width (${b}): ${a}`);
      }
    }, vb = Object.assign(
      { optional: true },
      sb
    ), wb = "undefined" != typeof TextDecoder ? new TextDecoder() : void 0, xb = (a, b = 0, c = NaN) => {
      var d = b + c;
      for (c = b; a[c] && !(c >= d); ) ++c;
      if (16 < c - b && a.buffer && wb) return wb.decode(a.subarray(b, c));
      for (d = ""; b < c; ) {
        var e = a[b++];
        if (e & 128) {
          var f = a[b++] & 63;
          if (192 == (e & 224)) d += String.fromCharCode((e & 31) << 6 | f);
          else {
            var h = a[b++] & 63;
            e = 224 == (e & 240) ? (e & 15) << 12 | f << 6 | h : (e & 7) << 18 | f << 12 | h << 6 | a[b++] & 63;
            65536 > e ? d += String.fromCharCode(e) : (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023));
          }
        } else d += String.fromCharCode(e);
      }
      return d;
    }, yb = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0, zb = (a, b) => {
      var c = a >> 1;
      for (var d = c + b / 2; !(c >= d) && E[c]; ) ++c;
      c <<= 1;
      if (32 < c - a && yb) return yb.decode(C.subarray(a, c));
      c = "";
      for (d = 0; !(d >= b / 2); ++d) {
        var e = D[a + 2 * d >> 1];
        if (0 == e) break;
        c += String.fromCharCode(e);
      }
      return c;
    }, Ab = (a, b, c) => {
      c ??= 2147483647;
      if (2 > c) return 0;
      c -= 2;
      var d = b;
      c = c < 2 * a.length ? c / 2 : a.length;
      for (var e = 0; e < c; ++e) D[b >> 1] = a.charCodeAt(e), b += 2;
      D[b >> 1] = 0;
      return b - d;
    }, Bb = (a) => 2 * a.length, Cb = (a, b) => {
      for (var c = 0, d = ""; !(c >= b / 4); ) {
        var e = G[a + 4 * c >> 2];
        if (0 == e) break;
        ++c;
        65536 <= e ? (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023)) : d += String.fromCharCode(e);
      }
      return d;
    }, Db = (a, b, c) => {
      c ??= 2147483647;
      if (4 > c) return 0;
      var d = b;
      c = d + c - 4;
      for (var e = 0; e < a.length; ++e) {
        var f = a.charCodeAt(e);
        if (55296 <= f && 57343 >= f) {
          var h = a.charCodeAt(++e);
          f = 65536 + ((f & 1023) << 10) | h & 1023;
        }
        G[b >> 2] = f;
        b += 4;
        if (b + 4 > c) break;
      }
      G[b >> 2] = 0;
      return b - d;
    }, Eb = (a) => {
      for (var b = 0, c = 0; c < a.length; ++c) {
        var d = a.charCodeAt(c);
        55296 <= d && 57343 >= d && ++c;
        b += 4;
      }
      return b;
    }, Fb = 0, Y = {}, Gb = (a) => {
      if (!(a instanceof va || "unwind" == a)) throw a;
    }, Hb = (a) => {
      fa = a;
      ya || 0 < Fb || (m.onExit?.(a), B = true);
      throw new va(a);
    }, Ib = (a) => {
      if (!B) try {
        if (a(), !(ya || 0 < Fb)) try {
          fa = a = fa, Hb(a);
        } catch (b) {
          Gb(b);
        }
      } catch (b) {
        Gb(b);
      }
    }, Jb = [null, [], []];
    N = m.InternalError = class extends Error {
      constructor(a) {
        super(a);
        this.name = "InternalError";
      }
    };
    for (var Kb = Array(256), Lb = 0; 256 > Lb; ++Lb) Kb[Lb] = String.fromCharCode(Lb);
    Fa = Kb;
    R = m.BindingError = class extends Error {
      constructor(a) {
        super(a);
        this.name = "BindingError";
      }
    };
    Object.assign(Ra.prototype, { isAliasOf: function(a) {
      if (!(this instanceof Ra && a instanceof Ra)) return false;
      var b = this.I.L.J, c = this.I.K;
      a.I = a.I;
      var d = a.I.L.J;
      for (a = a.I.K; b.N; ) c = b.Z(c), b = b.N;
      for (; d.N; ) a = d.Z(a), d = d.N;
      return b === d && c === a;
    }, clone: function() {
      this.I.K || Ia(this);
      if (this.I.Y) return this.I.count.value += 1, this;
      var a = S, b = Object, c = b.create, d = Object.getPrototypeOf(this), e = this.I;
      a = a(c.call(b, d, { I: { value: { count: e.count, X: e.X, Y: e.Y, K: e.K, L: e.L, M: e.M, O: e.O } } }));
      a.I.count.value += 1;
      a.I.X = false;
      return a;
    }, ["delete"]() {
      this.I.K || Ia(this);
      if (this.I.X && !this.I.Y) throw new R("Object already scheduled for deletion");
      Ka(this);
      var a = this.I;
      --a.count.value;
      0 === a.count.value && (a.M ? a.O.R(a.M) : a.L.J.R(a.K));
      this.I.Y || (this.I.M = void 0, this.I.K = void 0);
    }, isDeleted: function() {
      return !this.I.K;
    }, deleteLater: function() {
      this.I.K || Ia(this);
      if (this.I.X && !this.I.Y) throw new R("Object already scheduled for deletion");
      Qa.push(this);
      this.I.X = true;
      return this;
    } });
    Object.assign(cb.prototype, { la(a) {
      this.ga && (a = this.ga(a));
      return a;
    }, ea(a) {
      this.R?.(a);
    }, S: 8, readValueFromPointer: K, fromWireType: function(a) {
      function b() {
        return this.aa ? Pa(this.J.V, { L: this.qa, K: c, O: this, M: a }) : Pa(this.J.V, { L: this, K: a });
      }
      var c = this.la(a);
      if (!c) return this.ea(a), null;
      var d = Oa(this.J, c);
      if (void 0 !== d) {
        if (0 === d.I.count.value) return d.I.K = c, d.I.M = a, d.clone();
        d = d.clone();
        this.ea(a);
        return d;
      }
      d = this.J.ka(c);
      d = Ma[d];
      if (!d) return b.call(this);
      d = this.$ ? d.ha : d.pointerType;
      var e = La(c, this.J, d.J);
      return null === e ? b.call(this) : this.aa ? Pa(d.J.V, { L: d, K: e, O: this, M: a }) : Pa(d.J.V, { L: d, K: e });
    } });
    ib = m.UnboundTypeError = ((a, b) => {
      var c = Sa(b, function(d) {
        this.name = b;
        this.message = d;
        d = Error(d).stack;
        void 0 !== d && (this.stack = this.toString() + "\n" + d.replace(/^Error(:[^\n]*)?\n/, ""));
      });
      c.prototype = Object.create(a.prototype);
      c.prototype.constructor = c;
      c.prototype.toString = function() {
        return void 0 === this.message ? this.name : `${this.name}: ${this.message}`;
      };
      return c;
    })(Error, "UnboundTypeError");
    X.push(0, 1, void 0, 1, null, 1, true, 1, false, 1);
    m.count_emval_handles = () => X.length / 2 - 5 - rb.length;
    var Ob = {
      h: (a, b, c) => {
        var d = new za(a);
        H[d.K + 16 >> 2] = 0;
        H[d.K + 4 >> 2] = b;
        H[d.K + 8 >> 2] = c;
        Aa = a;
        Ba++;
        throw Aa;
      },
      w: () => pa(""),
      e: (a) => {
        var b = Ca[a];
        delete Ca[a];
        var c = b.ca, d = b.R, e = b.fa, f = e.map((h) => h.oa).concat(e.map((h) => h.ua));
        P([a], f, (h) => {
          var g = {};
          e.forEach((l, k) => {
            var n = h[k], q = l.ma, t = l.na, v = h[k + e.length], u = l.ta, z = l.va;
            g[l.ja] = { read: (F) => n.fromWireType(q(t, F)), write: (F, T) => {
              var y = [];
              u(z, F, v.toWireType(y, T));
              Da(y);
            } };
          });
          return [{ name: b.name, fromWireType: (l) => {
            var k = {}, n;
            for (n in g) k[n] = g[n].read(l);
            d(l);
            return k;
          }, toWireType: (l, k) => {
            for (var n in g) if (!(n in k)) throw new TypeError(`Missing field: "${n}"`);
            var q = c();
            for (n in g) g[n].write(q, k[n]);
            null !== l && l.push(d, q);
            return q;
          }, S: 8, readValueFromPointer: K, P: d }];
        });
      },
      p: () => {
      },
      z: (a, b, c, d) => {
        b = Q(b);
        O(a, { name: b, fromWireType: function(e) {
          return !!e;
        }, toWireType: function(e, f) {
          return f ? c : d;
        }, S: 8, readValueFromPointer: function(e) {
          return this.fromWireType(C[e]);
        }, P: null });
      },
      j: (a, b, c, d, e, f, h, g, l, k, n, q, t) => {
        n = Q(n);
        f = V(e, f);
        g &&= V(h, g);
        k &&= V(l, k);
        t = V(q, t);
        var v = Va(n);
        Ua(v, function() {
          lb(
            `Cannot construct ${n} due to unbound types`,
            [d]
          );
        });
        P([a, b, c], d ? [d] : [], (u) => {
          u = u[0];
          if (d) {
            var z = u.J;
            var F = z.V;
          } else F = Ra.prototype;
          u = Sa(n, function(...xa) {
            if (Object.getPrototypeOf(this) !== T) throw new R("Use 'new' to construct " + n);
            if (void 0 === y.U) throw new R(n + " has no accessible constructor");
            var db = y.U[xa.length];
            if (void 0 === db) throw new R(`Tried to invoke ctor of ${n} with invalid number of parameters (${xa.length}) - expected (${Object.keys(y.U).toString()}) parameters instead!`);
            return db.apply(this, xa);
          });
          var T = Object.create(F, { constructor: { value: u } });
          u.prototype = T;
          var y = new Wa(n, u, T, t, z, f, g, k);
          if (y.N) {
            var U;
            (U = y.N).da ?? (U.da = []);
            y.N.da.push(y);
          }
          z = new cb(n, y, true, false, false);
          U = new cb(n + "*", y, false, false, false);
          F = new cb(n + " const*", y, false, true, false);
          Ma[a] = { pointerType: U, ha: F };
          eb(v, u);
          return [z, U, F];
        });
      },
      i: (a, b, c, d, e, f) => {
        var h = mb(b, c);
        e = V(d, e);
        P([], [a], (g) => {
          g = g[0];
          var l = `constructor ${g.name}`;
          void 0 === g.J.U && (g.J.U = []);
          if (void 0 !== g.J.U[b - 1]) throw new R(`Cannot register multiple constructors with identical number of parameters (${b - 1}) for class '${g.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
          g.J.U[b - 1] = () => {
            lb(`Cannot construct ${g.name} due to unbound types`, h);
          };
          P([], h, (k) => {
            k.splice(1, 0, null);
            g.J.U[b - 1] = pb(l, k, null, e, f);
            return [];
          });
          return [];
        });
      },
      c: (a, b, c, d, e, f, h, g, l) => {
        var k = mb(c, d);
        b = Q(b);
        b = qb(b);
        f = V(e, f);
        P([], [a], (n) => {
          function q() {
            lb(`Cannot call ${t} due to unbound types`, k);
          }
          n = n[0];
          var t = `${n.name}.${b}`;
          b.startsWith("@@") && (b = Symbol[b.substring(2)]);
          g && n.J.ra.push(b);
          var v = n.J.V, u = v[b];
          void 0 === u || void 0 === u.T && u.className !== n.name && u.W === c - 2 ? (q.W = c - 2, q.className = n.name, v[b] = q) : (Ta(
            v,
            b,
            t
          ), v[b].T[c - 2] = q);
          P([], k, (z) => {
            z = pb(t, z, n, f, h, l);
            void 0 === v[b].T ? (z.W = c - 2, v[b] = z) : v[b].T[c - 2] = z;
            return [];
          });
          return [];
        });
      },
      x: (a) => O(a, sb),
      k: (a, b, c) => {
        b = Q(b);
        O(a, { name: b, fromWireType: (d) => d, toWireType: (d, e) => e, S: 8, readValueFromPointer: tb(b, c), P: null });
      },
      d: (a, b, c, d, e) => {
        b = Q(b);
        -1 === e && (e = 4294967295);
        e = (g) => g;
        if (0 === d) {
          var f = 32 - 8 * c;
          e = (g) => g << f >>> f;
        }
        var h = b.includes("unsigned") ? function(g, l) {
          return l >>> 0;
        } : function(g, l) {
          return l;
        };
        O(a, { name: b, fromWireType: e, toWireType: h, S: 8, readValueFromPointer: ub(b, c, 0 !== d), P: null });
      },
      a: (a, b, c) => {
        function d(f) {
          return new e(ha.buffer, H[f + 4 >> 2], H[f >> 2]);
        }
        var e = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][b];
        c = Q(c);
        O(a, { name: c, fromWireType: d, S: 8, readValueFromPointer: d }, { pa: true });
      },
      n: (a) => {
        O(a, vb);
      },
      y: (a, b) => {
        b = Q(b);
        O(a, { name: b, fromWireType: function(c) {
          for (var d = H[c >> 2], e = c + 4, f, h = e, g = 0; g <= d; ++g) {
            var l = e + g;
            if (g == d || 0 == C[l]) h = h ? xb(C, h, l - h) : "", void 0 === f ? f = h : (f += String.fromCharCode(0), f += h), h = l + 1;
          }
          W(c);
          return f;
        }, toWireType: function(c, d) {
          d instanceof ArrayBuffer && (d = new Uint8Array(d));
          var e, f = "string" == typeof d;
          if (!(f || d instanceof Uint8Array || d instanceof Uint8ClampedArray || d instanceof Int8Array)) throw new R("Cannot pass non-string to std::string");
          var h;
          if (f) for (e = h = 0; e < d.length; ++e) {
            var g = d.charCodeAt(e);
            127 >= g ? h++ : 2047 >= g ? h += 2 : 55296 <= g && 57343 >= g ? (h += 4, ++e) : h += 3;
          }
          else h = d.length;
          e = h;
          h = Mb(4 + e + 1);
          g = h + 4;
          H[h >> 2] = e;
          if (f) {
            if (f = g, g = e + 1, e = C, 0 < g) {
              g = f + g - 1;
              for (var l = 0; l < d.length; ++l) {
                var k = d.charCodeAt(l);
                if (55296 <= k && 57343 >= k) {
                  var n = d.charCodeAt(++l);
                  k = 65536 + ((k & 1023) << 10) | n & 1023;
                }
                if (127 >= k) {
                  if (f >= g) break;
                  e[f++] = k;
                } else {
                  if (2047 >= k) {
                    if (f + 1 >= g) break;
                    e[f++] = 192 | k >> 6;
                  } else {
                    if (65535 >= k) {
                      if (f + 2 >= g) break;
                      e[f++] = 224 | k >> 12;
                    } else {
                      if (f + 3 >= g) break;
                      e[f++] = 240 | k >> 18;
                      e[f++] = 128 | k >> 12 & 63;
                    }
                    e[f++] = 128 | k >> 6 & 63;
                  }
                  e[f++] = 128 | k & 63;
                }
              }
              e[f] = 0;
            }
          } else if (f) for (f = 0; f < e; ++f) {
            l = d.charCodeAt(f);
            if (255 < l) throw W(g), new R("String has UTF-16 code units that do not fit in 8 bits");
            C[g + f] = l;
          }
          else for (f = 0; f < e; ++f) C[g + f] = d[f];
          null !== c && c.push(W, h);
          return h;
        }, S: 8, readValueFromPointer: K, P(c) {
          W(c);
        } });
      },
      g: (a, b, c) => {
        c = Q(c);
        if (2 === b) {
          var d = zb;
          var e = Ab;
          var f = Bb;
          var h = (g) => E[g >> 1];
        } else 4 === b && (d = Cb, e = Db, f = Eb, h = (g) => H[g >> 2]);
        O(a, {
          name: c,
          fromWireType: (g) => {
            for (var l = H[g >> 2], k, n = g + 4, q = 0; q <= l; ++q) {
              var t = g + 4 + q * b;
              if (q == l || 0 == h(t)) n = d(n, t - n), void 0 === k ? k = n : (k += String.fromCharCode(0), k += n), n = t + b;
            }
            W(g);
            return k;
          },
          toWireType: (g, l) => {
            if ("string" != typeof l) throw new R(`Cannot pass non-string to C++ string type ${c}`);
            var k = f(l), n = Mb(4 + k + b);
            H[n >> 2] = k / b;
            e(l, n + 4, k + b);
            null !== g && g.push(W, n);
            return n;
          },
          S: 8,
          readValueFromPointer: K,
          P(g) {
            W(g);
          }
        });
      },
      f: (a, b, c, d, e, f) => {
        Ca[a] = { name: Q(b), ca: V(c, d), R: V(e, f), fa: [] };
      },
      b: (a, b, c, d, e, f, h, g, l, k) => {
        Ca[a].fa.push({ ja: Q(b), oa: c, ma: V(d, e), na: f, ua: h, ta: V(g, l), va: k });
      },
      l: (a, b) => {
        b = Q(b);
        O(a, { xa: true, name: b, S: 0, fromWireType: () => {
        }, toWireType: () => {
        } });
      },
      r: () => {
        ya = false;
        Fb = 0;
      },
      m: (a, b) => {
        var c = M[a];
        if (void 0 === c) throw a = `${"_emval_take_value"} has unknown type ${kb(a)}`, new R(a);
        a = c;
        a = a.readValueFromPointer(b);
        return ab(a);
      },
      s: (a, b) => {
        Y[a] && (clearTimeout(Y[a].id), delete Y[a]);
        if (!b) return 0;
        var c = setTimeout(() => {
          delete Y[a];
          Ib(() => Nb(a, performance.now()));
        }, b);
        Y[a] = { id: c, ya: b };
        return 0;
      },
      t: (a) => {
        var b = C.length;
        a >>>= 0;
        if (2147483648 < a) return false;
        for (var c = 1; 4 >= c; c *= 2) {
          var d = b * (1 + 0.2 / c);
          d = Math.min(d, a + 100663296);
          a: {
            d = (Math.min(2147483648, 65536 * Math.ceil(Math.max(a, d) / 65536)) - A.buffer.byteLength + 65535) / 65536 | 0;
            try {
              A.grow(d);
              ka();
              var e = 1;
              break a;
            } catch (f) {
            }
            e = void 0;
          }
          if (e) return true;
        }
        return false;
      },
      v: () => 52,
      o: function() {
        return 70;
      },
      u: (a, b, c, d) => {
        for (var e = 0, f = 0; f < c; f++) {
          var h = H[b >> 2], g = H[b + 4 >> 2];
          b += 8;
          for (var l = 0; l < g; l++) {
            var k = C[h + l], n = Jb[a];
            0 === k || 10 === k ? ((1 === a ? ea : w)(xb(n)), n.length = 0) : n.push(k);
          }
          e += g;
        }
        H[d >> 2] = e;
        return 0;
      },
      q: Hb
    }, Z;
    (async function() {
      function a(d) {
        Z = d.exports;
        A = Z.A;
        ka();
        fb = Z.D;
        ma.unshift(Z.B);
        I--;
        m.monitorRunDependencies?.(I);
        0 == I && J && (d = J, J = null, d());
        return Z;
      }
      I++;
      m.monitorRunDependencies?.(I);
      var b = { a: Ob };
      if (m.instantiateWasm) try {
        return m.instantiateWasm(b, a);
      } catch (d) {
        w(`Module.instantiateWasm callback failed with error: ${d}`), p(d);
      }
      ra ??= m.locateFile ? qa("msdfgen_wasm.wasm") ? "msdfgen_wasm.wasm" : m.locateFile ? m.locateFile("msdfgen_wasm.wasm", r) : r + "msdfgen_wasm.wasm" : new URL("msdfgen_wasm.wasm", import.meta.url).href;
      try {
        var c = await ua(b);
        a(c.instance);
        return c;
      } catch (d) {
        p(d);
      }
    })();
    var jb = (a) => (jb = Z.C)(a), Mb = (a) => (Mb = Z.E)(a), W = (a) => (W = Z.F)(a), Nb = (a, b) => (Nb = Z.G)(a, b);
    m.dynCall_jiji = (a, b, c, d, e) => (m.dynCall_jiji = Z.H)(a, b, c, d, e);
    var Pb;
    J = function Qb() {
      Pb || Rb();
      Pb || (J = Qb);
    };
    function Rb() {
      function a() {
        if (!Pb && (Pb = true, m.calledRun = true, !B)) {
          wa(ma);
          aa(m);
          m.onRuntimeInitialized?.();
          if (m.postRun) for ("function" == typeof m.postRun && (m.postRun = [m.postRun]); m.postRun.length; ) {
            var b = m.postRun.shift();
            na.unshift(b);
          }
          wa(na);
        }
      }
      if (!(0 < I)) {
        if (m.preRun) for ("function" == typeof m.preRun && (m.preRun = [m.preRun]); m.preRun.length; ) oa();
        wa(la);
        0 < I || (m.setStatus ? (m.setStatus("Running..."), setTimeout(() => {
          setTimeout(() => m.setStatus(""), 1);
          a();
        }, 1)) : a());
      }
    }
    if (m.preInit) for ("function" == typeof m.preInit && (m.preInit = [m.preInit]); 0 < m.preInit.length; ) m.preInit.pop()();
    Rb();
    moduleRtn = ba;
    return moduleRtn;
  });
})();
var msdfgen_wasm_default = createMSDFGenModule;

// src/generator.ts
var MSDFGenerator = class {
  module;
  font = null;
  constructor(wasmModule) {
    this.module = wasmModule;
  }
  async loadFont(fontData) {
    this.font = new this.module.Font();
    const vec = new this.module.VectorUnsignedChar();
    for (let i = 0; i < fontData.length; i++) {
      vec.push_back(fontData[i]);
    }
    const success = this.font.loadFromMemory(vec);
    vec.delete();
    if (!success) throw new Error("Failed to load font from memory");
  }
  generateAtlas(options) {
    if (!this.font) throw new Error("No font loaded");
    const {
      charset,
      fontSize = 48,
      textureSize = [512, 512],
      fieldRange = 4,
      padding = 4,
      fixOverlaps = true
    } = options;
    const metrics = this.font.getMetrics();
    const info = this.getFontProperties();
    const scale = fontSize / metrics.emSize;
    const baseline = metrics.ascender * scale;
    const pad = Math.floor(fieldRange / 2);
    const chars = Array.from(new Set(charset));
    const glyphs = [];
    let atlasX = 0;
    let atlasY = 0;
    let rowHeight = 0;
    const texture = new Uint8ClampedArray(textureSize[0] * textureSize[1] * 4);
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      const unicode = char.codePointAt(0);
      const shape = this.font.getGlyphShape(unicode);
      const pixelLeft = Math.floor(shape.left * scale);
      const pixelBottom = Math.floor(shape.bottom * scale);
      const pixelRight = Math.ceil(shape.right * scale);
      const pixelTop = Math.ceil(shape.top * scale);
      const glyphWidth = pixelRight - pixelLeft + pad * 2;
      const glyphHeight = pixelTop - pixelBottom + pad * 2;
      if (atlasX + glyphWidth > textureSize[0]) {
        atlasX = 0;
        atlasY += rowHeight + padding;
        rowHeight = 0;
      }
      const shapeWidth = shape.right - shape.left;
      const shapeHeight = shape.top - shape.bottom;
      const msdfScale = scale;
      const translateX = 0.5 * (glyphWidth / msdfScale - shapeWidth) - shape.left;
      const rawTranslateY = 0.5 * (glyphHeight / msdfScale - shapeHeight) - shape.bottom;
      const translateY = Math.round(rawTranslateY * msdfScale) / msdfScale;
      const result = fixOverlaps ? this.font.generateMSDFWithOverlapFix(
        unicode,
        glyphWidth,
        glyphHeight,
        fieldRange,
        translateX,
        translateY,
        msdfScale
      ) : this.font.generateMSDF(
        unicode,
        glyphWidth,
        glyphHeight,
        fieldRange,
        translateX,
        translateY,
        msdfScale
      );
      for (let py = 0; py < glyphHeight; py++) {
        for (let px = 0; px < glyphWidth; px++) {
          const srcIdx = (py * glyphWidth + px) * 3;
          const dstIdx = ((atlasY + py) * textureSize[0] + (atlasX + px)) * 4;
          texture[dstIdx + 0] = result.data.get(srcIdx + 0) ?? 0;
          texture[dstIdx + 1] = result.data.get(srcIdx + 1) ?? 0;
          texture[dstIdx + 2] = result.data.get(srcIdx + 2) ?? 0;
          texture[dstIdx + 3] = 255;
        }
      }
      result.data.delete();
      glyphs.push({
        unicode,
        char,
        atlasPosition: [atlasX, atlasY],
        atlasSize: [glyphWidth, glyphHeight],
        bounds: {
          left: pixelLeft,
          bottom: pixelBottom,
          right: pixelRight,
          top: pixelTop
        },
        advance: shape.advance * scale,
        xoffset: pixelLeft - pad,
        yoffset: baseline - pixelTop - pad
      });
      atlasX += glyphWidth + padding;
      rowHeight = Math.max(rowHeight, glyphHeight);
    }
    const kerning = [];
    for (let i = 0; i < chars.length; i++) {
      for (let j = 0; j < chars.length; j++) {
        const first = chars[i].codePointAt(0);
        const second = chars[j].codePointAt(0);
        const amount = this.font.getKerning(first, second) * scale;
        if (amount !== 0) {
          kerning.push({
            first: chars[i],
            second: chars[j],
            amount
          });
        }
      }
    }
    return {
      texture: new ImageData(texture, textureSize[0], textureSize[1]),
      glyphs,
      metrics: {
        emSize: metrics.emSize,
        ascender: metrics.ascender * scale,
        descender: metrics.descender * scale,
        lineHeight: metrics.lineHeight * scale
      },
      info,
      kerning,
      textureSize,
      fieldRange
    };
  }
  getFontProperties() {
    if (!this.font) throw new Error("No font loaded");
    const props = this.font.getFontProperties();
    return {
      ...props,
      name: String(props.name)
    };
  }
  exportJSON(options) {
    const { atlas, fontSize = 48 } = options;
    const pad = Math.floor(atlas.fieldRange / 2);
    return {
      pages: ["texture.png"],
      chars: atlas.glyphs.map((g, index) => ({
        id: g.unicode,
        index,
        char: g.char,
        width: g.atlasSize[0],
        height: g.atlasSize[1],
        xoffset: g.xoffset,
        yoffset: g.yoffset,
        xadvance: g.advance,
        chnl: 15,
        x: g.atlasPosition[0],
        y: g.atlasPosition[1],
        page: 0
      })),
      info: {
        face: atlas.info.name,
        size: fontSize,
        bold: atlas.info.bold ? 1 : 0,
        italic: atlas.info.italic ? 1 : 0,
        charset: atlas.glyphs.map((g) => g.char),
        unicode: 1,
        stretchH: 100,
        smooth: 1,
        aa: 1,
        padding: [pad, pad, pad, pad],
        spacing: [0, 0],
        outline: 0
      },
      common: {
        lineHeight: atlas.metrics.lineHeight,
        base: atlas.metrics.ascender,
        scaleW: atlas.textureSize[0],
        scaleH: atlas.textureSize[1],
        pages: 1,
        packed: 0,
        alphaChnl: 0,
        redChnl: 0,
        greenChnl: 0,
        blueChnl: 0
      },
      distanceField: {
        fieldType: "msdf",
        distanceRange: atlas.fieldRange
      },
      kernings: atlas.kerning.map((k) => ({
        first: k.first.codePointAt(0),
        second: k.second.codePointAt(0),
        amount: k.amount
      }))
    };
  }
  /**
   * Clean up resources
   */
  dispose() {
    if (this.font) {
      this.font.delete();
      this.font = null;
    }
  }
};

// src/worker.ts
var MSDFGeneratorWorker = class {
  generator = null;
  async initialize(wasmBinaryUrl) {
    try {
      const moduleConfig = wasmBinaryUrl ? {
        locateFile: (path) => {
          if (path.endsWith(".wasm")) return wasmBinaryUrl;
          return path;
        }
      } : void 0;
      const module = await msdfgen_wasm_default(moduleConfig);
      this.generator = new MSDFGenerator(module);
    } catch (err) {
      console.error("[MSDF Generator] Failed to initialize worker:", err);
      throw err;
    }
  }
  ensureInitialized() {
    if (!this.generator)
      throw new Error("Worker not initialized. Call initialize() first.");
    return this.generator;
  }
  async loadFont(fontData) {
    await this.ensureInitialized().loadFont(fontData);
  }
  generateAtlas(options) {
    return this.ensureInitialized().generateAtlas({
      ...options,
      font: new Uint8Array(0)
    });
  }
  exportJSON(options) {
    return this.ensureInitialized().exportJSON(options);
  }
  dispose() {
    this.generator?.dispose();
    this.generator = null;
  }
  async generateMSDFAtlas(options) {
    this.ensureInitialized();
    await this.loadFont(options.font);
    const atlas = this.generateAtlas(options);
    return transfer(atlas, [atlas.texture.data.buffer]);
  }
  async generateMSDFFont(options) {
    this.ensureInitialized();
    await this.loadFont(options.font);
    const atlas = this.generateAtlas(options);
    return this.exportJSON({
      atlas,
      fontSize: options.fontSize || 48
    });
  }
};
expose(new MSDFGeneratorWorker());
