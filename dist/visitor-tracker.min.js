/*! For license information please see visitor-tracker.min.js.LICENSE.txt */
(() => {
  "use strict";
  function e() {
    e = function () {
      return n;
    };
    var t,
      n = {},
      r = Object.prototype,
      o = r.hasOwnProperty,
      a =
        Object.defineProperty ||
        function (e, t, n) {
          e[t] = n.value;
        },
      c = "function" == typeof Symbol ? Symbol : {},
      u = c.iterator || "@@iterator",
      s = c.asyncIterator || "@@asyncIterator",
      l = c.toStringTag || "@@toStringTag";
    function d(e, t, n) {
      return (
        Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        }),
        e[t]
      );
    }
    try {
      d({}, "");
    } catch (t) {
      d = function (e, t, n) {
        return (e[t] = n);
      };
    }
    function f(e, t, n, r) {
      var o = t && t.prototype instanceof b ? t : b,
        i = Object.create(o.prototype),
        c = new G(r || []);
      return a(i, "_invoke", { value: Z(e, n, c) }), i;
    }
    function h(e, t, n) {
      try {
        return { type: "normal", arg: e.call(t, n) };
      } catch (e) {
        return { type: "throw", arg: e };
      }
    }
    n.wrap = f;
    var v = "suspendedStart",
      m = "suspendedYield",
      p = "executing",
      y = "completed",
      g = {};
    function b() {}
    function w() {}
    function k() {}
    var L = {};
    d(L, u, function () {
      return this;
    });
    var x = Object.getPrototypeOf,
      S = x && x(x(j([])));
    S && S !== r && o.call(S, u) && (L = S);
    var V = (k.prototype = b.prototype = Object.create(L));
    function I(e) {
      ["next", "throw", "return"].forEach(function (t) {
        d(e, t, function (e) {
          return this._invoke(t, e);
        });
      });
    }
    function W(e, t) {
      function n(r, a, c, u) {
        var s = h(e[r], e, a);
        if ("throw" !== s.type) {
          var l = s.arg,
            d = l.value;
          return d && "object" == i(d) && o.call(d, "__await")
            ? t.resolve(d.__await).then(
                function (e) {
                  n("next", e, c, u);
                },
                function (e) {
                  n("throw", e, c, u);
                }
              )
            : t.resolve(d).then(
                function (e) {
                  (l.value = e), c(l);
                },
                function (e) {
                  return n("throw", e, c, u);
                }
              );
        }
        u(s.arg);
      }
      var r;
      a(this, "_invoke", {
        value: function (e, o) {
          function i() {
            return new t(function (t, r) {
              n(e, o, t, r);
            });
          }
          return (r = r ? r.then(i, i) : i());
        },
      });
    }
    function Z(e, n, r) {
      var o = v;
      return function (i, a) {
        if (o === p) throw Error("Generator is already running");
        if (o === y) {
          if ("throw" === i) throw a;
          return { value: t, done: !0 };
        }
        for (r.method = i, r.arg = a; ; ) {
          var c = r.delegate;
          if (c) {
            var u = F(c, r);
            if (u) {
              if (u === g) continue;
              return u;
            }
          }
          if ("next" === r.method) r.sent = r._sent = r.arg;
          else if ("throw" === r.method) {
            if (o === v) throw ((o = y), r.arg);
            r.dispatchException(r.arg);
          } else "return" === r.method && r.abrupt("return", r.arg);
          o = p;
          var s = h(e, n, r);
          if ("normal" === s.type) {
            if (((o = r.done ? y : m), s.arg === g)) continue;
            return { value: s.arg, done: r.done };
          }
          "throw" === s.type &&
            ((o = y), (r.method = "throw"), (r.arg = s.arg));
        }
      };
    }
    function F(e, n) {
      var r = n.method,
        o = e.iterator[r];
      if (o === t)
        return (
          (n.delegate = null),
          ("throw" === r &&
            e.iterator.return &&
            ((n.method = "return"),
            (n.arg = t),
            F(e, n),
            "throw" === n.method)) ||
            ("return" !== r &&
              ((n.method = "throw"),
              (n.arg = new TypeError(
                "The iterator does not provide a '" + r + "' method"
              )))),
          g
        );
      var i = h(o, e.iterator, n.arg);
      if ("throw" === i.type)
        return (n.method = "throw"), (n.arg = i.arg), (n.delegate = null), g;
      var a = i.arg;
      return a
        ? a.done
          ? ((n[e.resultName] = a.value),
            (n.next = e.nextLoc),
            "return" !== n.method && ((n.method = "next"), (n.arg = t)),
            (n.delegate = null),
            g)
          : a
        : ((n.method = "throw"),
          (n.arg = new TypeError("iterator result is not an object")),
          (n.delegate = null),
          g);
    }
    function P(e) {
      var t = { tryLoc: e[0] };
      1 in e && (t.catchLoc = e[1]),
        2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
        this.tryEntries.push(t);
    }
    function E(e) {
      var t = e.completion || {};
      (t.type = "normal"), delete t.arg, (e.completion = t);
    }
    function G(e) {
      (this.tryEntries = [{ tryLoc: "root" }]),
        e.forEach(P, this),
        this.reset(!0);
    }
    function j(e) {
      if (e || "" === e) {
        var n = e[u];
        if (n) return n.call(e);
        if ("function" == typeof e.next) return e;
        if (!isNaN(e.length)) {
          var r = -1,
            a = function n() {
              for (; ++r < e.length; )
                if (o.call(e, r)) return (n.value = e[r]), (n.done = !1), n;
              return (n.value = t), (n.done = !0), n;
            };
          return (a.next = a);
        }
      }
      throw new TypeError(i(e) + " is not iterable");
    }
    return (
      (w.prototype = k),
      a(V, "constructor", { value: k, configurable: !0 }),
      a(k, "constructor", { value: w, configurable: !0 }),
      (w.displayName = d(k, l, "GeneratorFunction")),
      (n.isGeneratorFunction = function (e) {
        var t = "function" == typeof e && e.constructor;
        return (
          !!t && (t === w || "GeneratorFunction" === (t.displayName || t.name))
        );
      }),
      (n.mark = function (e) {
        return (
          Object.setPrototypeOf
            ? Object.setPrototypeOf(e, k)
            : ((e.__proto__ = k), d(e, l, "GeneratorFunction")),
          (e.prototype = Object.create(V)),
          e
        );
      }),
      (n.awrap = function (e) {
        return { __await: e };
      }),
      I(W.prototype),
      d(W.prototype, s, function () {
        return this;
      }),
      (n.AsyncIterator = W),
      (n.async = function (e, t, r, o, i) {
        void 0 === i && (i = Promise);
        var a = new W(f(e, t, r, o), i);
        return n.isGeneratorFunction(t)
          ? a
          : a.next().then(function (e) {
              return e.done ? e.value : a.next();
            });
      }),
      I(V),
      d(V, l, "Generator"),
      d(V, u, function () {
        return this;
      }),
      d(V, "toString", function () {
        return "[object Generator]";
      }),
      (n.keys = function (e) {
        var t = Object(e),
          n = [];
        for (var r in t) n.push(r);
        return (
          n.reverse(),
          function e() {
            for (; n.length; ) {
              var r = n.pop();
              if (r in t) return (e.value = r), (e.done = !1), e;
            }
            return (e.done = !0), e;
          }
        );
      }),
      (n.values = j),
      (G.prototype = {
        constructor: G,
        reset: function (e) {
          if (
            ((this.prev = 0),
            (this.next = 0),
            (this.sent = this._sent = t),
            (this.done = !1),
            (this.delegate = null),
            (this.method = "next"),
            (this.arg = t),
            this.tryEntries.forEach(E),
            !e)
          )
            for (var n in this)
              "t" === n.charAt(0) &&
                o.call(this, n) &&
                !isNaN(+n.slice(1)) &&
                (this[n] = t);
        },
        stop: function () {
          this.done = !0;
          var e = this.tryEntries[0].completion;
          if ("throw" === e.type) throw e.arg;
          return this.rval;
        },
        dispatchException: function (e) {
          if (this.done) throw e;
          var n = this;
          function r(r, o) {
            return (
              (c.type = "throw"),
              (c.arg = e),
              (n.next = r),
              o && ((n.method = "next"), (n.arg = t)),
              !!o
            );
          }
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var a = this.tryEntries[i],
              c = a.completion;
            if ("root" === a.tryLoc) return r("end");
            if (a.tryLoc <= this.prev) {
              var u = o.call(a, "catchLoc"),
                s = o.call(a, "finallyLoc");
              if (u && s) {
                if (this.prev < a.catchLoc) return r(a.catchLoc, !0);
                if (this.prev < a.finallyLoc) return r(a.finallyLoc);
              } else if (u) {
                if (this.prev < a.catchLoc) return r(a.catchLoc, !0);
              } else {
                if (!s) throw Error("try statement without catch or finally");
                if (this.prev < a.finallyLoc) return r(a.finallyLoc);
              }
            }
          }
        },
        abrupt: function (e, t) {
          for (var n = this.tryEntries.length - 1; n >= 0; --n) {
            var r = this.tryEntries[n];
            if (
              r.tryLoc <= this.prev &&
              o.call(r, "finallyLoc") &&
              this.prev < r.finallyLoc
            ) {
              var i = r;
              break;
            }
          }
          i &&
            ("break" === e || "continue" === e) &&
            i.tryLoc <= t &&
            t <= i.finallyLoc &&
            (i = null);
          var a = i ? i.completion : {};
          return (
            (a.type = e),
            (a.arg = t),
            i
              ? ((this.method = "next"), (this.next = i.finallyLoc), g)
              : this.complete(a)
          );
        },
        complete: function (e, t) {
          if ("throw" === e.type) throw e.arg;
          return (
            "break" === e.type || "continue" === e.type
              ? (this.next = e.arg)
              : "return" === e.type
              ? ((this.rval = this.arg = e.arg),
                (this.method = "return"),
                (this.next = "end"))
              : "normal" === e.type && t && (this.next = t),
            g
          );
        },
        finish: function (e) {
          for (var t = this.tryEntries.length - 1; t >= 0; --t) {
            var n = this.tryEntries[t];
            if (n.finallyLoc === e)
              return this.complete(n.completion, n.afterLoc), E(n), g;
          }
        },
        catch: function (e) {
          for (var t = this.tryEntries.length - 1; t >= 0; --t) {
            var n = this.tryEntries[t];
            if (n.tryLoc === e) {
              var r = n.completion;
              if ("throw" === r.type) {
                var o = r.arg;
                E(n);
              }
              return o;
            }
          }
          throw Error("illegal catch attempt");
        },
        delegateYield: function (e, n, r) {
          return (
            (this.delegate = { iterator: j(e), resultName: n, nextLoc: r }),
            "next" === this.method && (this.arg = t),
            g
          );
        },
      }),
      n
    );
  }
  function t(e, t, n, r, o, i, a) {
    try {
      var c = e[i](a),
        u = c.value;
    } catch (e) {
      return void n(e);
    }
    c.done ? t(u) : Promise.resolve(u).then(r, o);
  }
  function n(e) {
    return function () {
      var n = this,
        r = arguments;
      return new Promise(function (o, i) {
        var a = e.apply(n, r);
        function c(e) {
          t(a, o, i, c, u, "next", e);
        }
        function u(e) {
          t(a, o, i, c, u, "throw", e);
        }
        c(void 0);
      });
    };
  }
  function r(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      (r.enumerable = r.enumerable || !1),
        (r.configurable = !0),
        "value" in r && (r.writable = !0),
        Object.defineProperty(e, o(r.key), r);
    }
  }
  function o(e) {
    var t = (function (e) {
      if ("object" != i(e) || !e) return e;
      var t = e[Symbol.toPrimitive];
      if (void 0 !== t) {
        var n = t.call(e, "string");
        if ("object" != i(n)) return n;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return String(e);
    })(e);
    return "symbol" == i(t) ? t : t + "";
  }
  function i(e) {
    return (
      (i =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            }),
      i(e)
    );
  }
  var a = (function (e) {
    var t = function () {
      return (
        (t =
          Object.assign ||
          function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
              for (var o in (t = arguments[n]))
                Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e;
          }),
        t.apply(this, arguments)
      );
    };
    function n(e, t, n, r) {
      return new (n || (n = Promise))(function (o, i) {
        function a(e) {
          try {
            u(r.next(e));
          } catch (e) {
            i(e);
          }
        }
        function c(e) {
          try {
            u(r.throw(e));
          } catch (e) {
            i(e);
          }
        }
        function u(e) {
          var t;
          e.done
            ? o(e.value)
            : ((t = e.value),
              t instanceof n
                ? t
                : new n(function (e) {
                    e(t);
                  })).then(a, c);
        }
        u((r = r.apply(e, t || [])).next());
      });
    }
    function r(e, t) {
      var n,
        r,
        o,
        i,
        a = {
          label: 0,
          sent: function () {
            if (1 & o[0]) throw o[1];
            return o[1];
          },
          trys: [],
          ops: [],
        };
      return (
        (i = { next: c(0), throw: c(1), return: c(2) }),
        "function" == typeof Symbol &&
          (i[Symbol.iterator] = function () {
            return this;
          }),
        i
      );
      function c(c) {
        return function (u) {
          return (function (c) {
            if (n) throw new TypeError("Generator is already executing.");
            for (; i && ((i = 0), c[0] && (a = 0)), a; )
              try {
                if (
                  ((n = 1),
                  r &&
                    (o =
                      2 & c[0]
                        ? r.return
                        : c[0]
                        ? r.throw || ((o = r.return) && o.call(r), 0)
                        : r.next) &&
                    !(o = o.call(r, c[1])).done)
                )
                  return o;
                switch (((r = 0), o && (c = [2 & c[0], o.value]), c[0])) {
                  case 0:
                  case 1:
                    o = c;
                    break;
                  case 4:
                    return a.label++, { value: c[1], done: !1 };
                  case 5:
                    a.label++, (r = c[1]), (c = [0]);
                    continue;
                  case 7:
                    (c = a.ops.pop()), a.trys.pop();
                    continue;
                  default:
                    if (
                      !(
                        (o = (o = a.trys).length > 0 && o[o.length - 1]) ||
                        (6 !== c[0] && 2 !== c[0])
                      )
                    ) {
                      a = 0;
                      continue;
                    }
                    if (3 === c[0] && (!o || (c[1] > o[0] && c[1] < o[3]))) {
                      a.label = c[1];
                      break;
                    }
                    if (6 === c[0] && a.label < o[1]) {
                      (a.label = o[1]), (o = c);
                      break;
                    }
                    if (o && a.label < o[2]) {
                      (a.label = o[2]), a.ops.push(c);
                      break;
                    }
                    o[2] && a.ops.pop(), a.trys.pop();
                    continue;
                }
                c = t.call(e, a);
              } catch (e) {
                (c = [6, e]), (r = 0);
              } finally {
                n = o = 0;
              }
            if (5 & c[0]) throw c[1];
            return { value: c[0] ? c[1] : void 0, done: !0 };
          })([c, u]);
        };
      }
    }
    function o(e, t, n) {
      if (n || 2 === arguments.length)
        for (var r, o = 0, i = t.length; o < i; o++)
          (!r && o in t) ||
            (r || (r = Array.prototype.slice.call(t, 0, o)), (r[o] = t[o]));
      return e.concat(r || Array.prototype.slice.call(t));
    }
    var a = "4.5.1";
    function c(e, t) {
      return new Promise(function (n) {
        return setTimeout(n, e, t);
      });
    }
    function u(e) {
      return !!e && "function" == typeof e.then;
    }
    function s(e, t) {
      try {
        var n = e();
        u(n)
          ? n.then(
              function (e) {
                return t(!0, e);
              },
              function (e) {
                return t(!1, e);
              }
            )
          : t(!0, n);
      } catch (e) {
        t(!1, e);
      }
    }
    function l(e, t, o) {
      return (
        void 0 === o && (o = 16),
        n(this, void 0, void 0, function () {
          var n, i, a, c;
          return r(this, function (r) {
            switch (r.label) {
              case 0:
                (n = Array(e.length)), (i = Date.now()), (a = 0), (r.label = 1);
              case 1:
                return a < e.length
                  ? ((n[a] = t(e[a], a)),
                    (c = Date.now()) >= i + o
                      ? ((i = c),
                        [
                          4,
                          new Promise(function (e) {
                            var t = new MessageChannel();
                            (t.port1.onmessage = function () {
                              return e();
                            }),
                              t.port2.postMessage(null);
                          }),
                        ])
                      : [3, 3])
                  : [3, 4];
              case 2:
                r.sent(), (r.label = 3);
              case 3:
                return ++a, [3, 1];
              case 4:
                return [2, n];
            }
          });
        })
      );
    }
    function d(e) {
      return e.then(void 0, function () {}), e;
    }
    function f(e) {
      return parseInt(e);
    }
    function h(e) {
      return parseFloat(e);
    }
    function v(e, t) {
      return "number" == typeof e && isNaN(e) ? t : e;
    }
    function m(e) {
      return e.reduce(function (e, t) {
        return e + (t ? 1 : 0);
      }, 0);
    }
    function p(e, t) {
      if ((void 0 === t && (t = 1), Math.abs(t) >= 1))
        return Math.round(e / t) * t;
      var n = 1 / t;
      return Math.round(e * n) / n;
    }
    function y(e, t) {
      var n = e[0] >>> 16,
        r = 65535 & e[0],
        o = e[1] >>> 16,
        i = 65535 & e[1],
        a = t[0] >>> 16,
        c = 65535 & t[0],
        u = t[1] >>> 16,
        s = 0,
        l = 0,
        d = 0,
        f = 0;
      (d += (f += i + (65535 & t[1])) >>> 16),
        (f &= 65535),
        (l += (d += o + u) >>> 16),
        (d &= 65535),
        (s += (l += r + c) >>> 16),
        (l &= 65535),
        (s += n + a),
        (s &= 65535),
        (e[0] = (s << 16) | l),
        (e[1] = (d << 16) | f);
    }
    function g(e, t) {
      var n = e[0] >>> 16,
        r = 65535 & e[0],
        o = e[1] >>> 16,
        i = 65535 & e[1],
        a = t[0] >>> 16,
        c = 65535 & t[0],
        u = t[1] >>> 16,
        s = 65535 & t[1],
        l = 0,
        d = 0,
        f = 0,
        h = 0;
      (f += (h += i * s) >>> 16),
        (h &= 65535),
        (d += (f += o * s) >>> 16),
        (f &= 65535),
        (d += (f += i * u) >>> 16),
        (f &= 65535),
        (l += (d += r * s) >>> 16),
        (d &= 65535),
        (l += (d += o * u) >>> 16),
        (d &= 65535),
        (l += (d += i * c) >>> 16),
        (d &= 65535),
        (l += n * s + r * u + o * c + i * a),
        (l &= 65535),
        (e[0] = (l << 16) | d),
        (e[1] = (f << 16) | h);
    }
    function b(e, t) {
      var n = e[0];
      32 == (t %= 64)
        ? ((e[0] = e[1]), (e[1] = n))
        : t < 32
        ? ((e[0] = (n << t) | (e[1] >>> (32 - t))),
          (e[1] = (e[1] << t) | (n >>> (32 - t))))
        : ((t -= 32),
          (e[0] = (e[1] << t) | (n >>> (32 - t))),
          (e[1] = (n << t) | (e[1] >>> (32 - t))));
    }
    function w(e, t) {
      0 != (t %= 64) &&
        (t < 32
          ? ((e[0] = e[1] >>> (32 - t)), (e[1] = e[1] << t))
          : ((e[0] = e[1] << (t - 32)), (e[1] = 0)));
    }
    function k(e, t) {
      (e[0] ^= t[0]), (e[1] ^= t[1]);
    }
    var L = [4283543511, 3981806797],
      x = [3301882366, 444984403];
    function S(e) {
      var t = [0, e[0] >>> 1];
      k(e, t),
        g(e, L),
        (t[1] = e[0] >>> 1),
        k(e, t),
        g(e, x),
        (t[1] = e[0] >>> 1),
        k(e, t);
    }
    var V = [2277735313, 289559509],
      I = [1291169091, 658871167],
      W = [0, 5],
      Z = [0, 1390208809],
      F = [0, 944331445];
    function P(e, t) {
      var n = (function (e) {
        for (var t = new Uint8Array(e.length), n = 0; n < e.length; n++) {
          var r = e.charCodeAt(n);
          if (r > 127) return new TextEncoder().encode(e);
          t[n] = r;
        }
        return t;
      })(e);
      t = t || 0;
      var r,
        o = [0, n.length],
        i = o[1] % 16,
        a = o[1] - i,
        c = [0, t],
        u = [0, t],
        s = [0, 0],
        l = [0, 0];
      for (r = 0; r < a; r += 16)
        (s[0] =
          n[r + 4] | (n[r + 5] << 8) | (n[r + 6] << 16) | (n[r + 7] << 24)),
          (s[1] = n[r] | (n[r + 1] << 8) | (n[r + 2] << 16) | (n[r + 3] << 24)),
          (l[0] =
            n[r + 12] |
            (n[r + 13] << 8) |
            (n[r + 14] << 16) |
            (n[r + 15] << 24)),
          (l[1] =
            n[r + 8] | (n[r + 9] << 8) | (n[r + 10] << 16) | (n[r + 11] << 24)),
          g(s, V),
          b(s, 31),
          g(s, I),
          k(c, s),
          b(c, 27),
          y(c, u),
          g(c, W),
          y(c, Z),
          g(l, I),
          b(l, 33),
          g(l, V),
          k(u, l),
          b(u, 31),
          y(u, c),
          g(u, W),
          y(u, F);
      (s[0] = 0), (s[1] = 0), (l[0] = 0), (l[1] = 0);
      var d = [0, 0];
      switch (i) {
        case 15:
          (d[1] = n[r + 14]), w(d, 48), k(l, d);
        case 14:
          (d[1] = n[r + 13]), w(d, 40), k(l, d);
        case 13:
          (d[1] = n[r + 12]), w(d, 32), k(l, d);
        case 12:
          (d[1] = n[r + 11]), w(d, 24), k(l, d);
        case 11:
          (d[1] = n[r + 10]), w(d, 16), k(l, d);
        case 10:
          (d[1] = n[r + 9]), w(d, 8), k(l, d);
        case 9:
          (d[1] = n[r + 8]), k(l, d), g(l, I), b(l, 33), g(l, V), k(u, l);
        case 8:
          (d[1] = n[r + 7]), w(d, 56), k(s, d);
        case 7:
          (d[1] = n[r + 6]), w(d, 48), k(s, d);
        case 6:
          (d[1] = n[r + 5]), w(d, 40), k(s, d);
        case 5:
          (d[1] = n[r + 4]), w(d, 32), k(s, d);
        case 4:
          (d[1] = n[r + 3]), w(d, 24), k(s, d);
        case 3:
          (d[1] = n[r + 2]), w(d, 16), k(s, d);
        case 2:
          (d[1] = n[r + 1]), w(d, 8), k(s, d);
        case 1:
          (d[1] = n[r]), k(s, d), g(s, V), b(s, 31), g(s, I), k(c, s);
      }
      return (
        k(c, o),
        k(u, o),
        y(c, u),
        y(u, c),
        S(c),
        S(u),
        y(c, u),
        y(u, c),
        ("00000000" + (c[0] >>> 0).toString(16)).slice(-8) +
          ("00000000" + (c[1] >>> 0).toString(16)).slice(-8) +
          ("00000000" + (u[0] >>> 0).toString(16)).slice(-8) +
          ("00000000" + (u[1] >>> 0).toString(16)).slice(-8)
      );
    }
    function E(e) {
      return "function" != typeof e;
    }
    function G(e, t, o, i) {
      var a = Object.keys(e).filter(function (e) {
          return !(function (e, t) {
            for (var n = 0, r = e.length; n < r; ++n) if (e[n] === t) return !0;
            return !1;
          })(o, e);
        }),
        c = d(
          l(
            a,
            function (n) {
              return (function (e, t) {
                var n = d(
                  new Promise(function (n) {
                    var r = Date.now();
                    s(e.bind(null, t), function () {
                      for (var e = [], t = 0; t < arguments.length; t++)
                        e[t] = arguments[t];
                      var o = Date.now() - r;
                      if (!e[0])
                        return n(function () {
                          return { error: e[1], duration: o };
                        });
                      var i = e[1];
                      if (E(i))
                        return n(function () {
                          return { value: i, duration: o };
                        });
                      n(function () {
                        return new Promise(function (e) {
                          var t = Date.now();
                          s(i, function () {
                            for (var n = [], r = 0; r < arguments.length; r++)
                              n[r] = arguments[r];
                            var i = o + Date.now() - t;
                            if (!n[0]) return e({ error: n[1], duration: i });
                            e({ value: n[1], duration: i });
                          });
                        });
                      });
                    });
                  })
                );
                return function () {
                  return n.then(function (e) {
                    return e();
                  });
                };
              })(e[n], t);
            },
            i
          )
        );
      return function () {
        return n(this, void 0, void 0, function () {
          var e, t, n, o;
          return r(this, function (r) {
            switch (r.label) {
              case 0:
                return [4, c];
              case 1:
                return [
                  4,
                  l(
                    r.sent(),
                    function (e) {
                      return d(e());
                    },
                    i
                  ),
                ];
              case 2:
                return (e = r.sent()), [4, Promise.all(e)];
              case 3:
                for (t = r.sent(), n = {}, o = 0; o < a.length; ++o)
                  n[a[o]] = t[o];
                return [2, n];
            }
          });
        });
      };
    }
    function j() {
      var e = window,
        t = navigator;
      return (
        m([
          "MSCSSMatrix" in e,
          "msSetImmediate" in e,
          "msIndexedDB" in e,
          "msMaxTouchPoints" in t,
          "msPointerEnabled" in t,
        ]) >= 4
      );
    }
    function R() {
      var e = window,
        t = navigator;
      return (
        m([
          "msWriteProfilerMark" in e,
          "MSStream" in e,
          "msLaunchUri" in t,
          "msSaveBlob" in t,
        ]) >= 3 && !j()
      );
    }
    function M() {
      var e = window,
        t = navigator;
      return (
        m([
          "webkitPersistentStorage" in t,
          "webkitTemporaryStorage" in t,
          0 === t.vendor.indexOf("Google"),
          "webkitResolveLocalFileSystemURL" in e,
          "BatteryManager" in e,
          "webkitMediaStream" in e,
          "webkitSpeechGrammar" in e,
        ]) >= 5
      );
    }
    function _() {
      var e = window;
      return (
        m([
          "ApplePayError" in e,
          "CSSPrimitiveValue" in e,
          "Counter" in e,
          0 === navigator.vendor.indexOf("Apple"),
          "RGBColor" in e,
          "WebKitMediaKeys" in e,
        ]) >= 4
      );
    }
    function C() {
      var e = window,
        t = e.HTMLElement,
        n = e.Document;
      return (
        m([
          "safari" in e,
          !("ongestureend" in e),
          !("TouchEvent" in e),
          !("orientation" in e),
          t && !("autocapitalize" in t.prototype),
          n && "pointerLockElement" in n.prototype,
        ]) >= 4
      );
    }
    function Y() {
      var e,
        t = window;
      return (
        (e = t.print),
        /^function\s.*?\{\s*\[native code]\s*}$/.test(String(e)) &&
          "[object WebPageNamespace]" === String(t.browser)
      );
    }
    function A() {
      var e,
        t,
        n = window;
      return (
        m([
          "buildID" in navigator,
          "MozAppearance" in
            (null !==
              (t =
                null === (e = document.documentElement) || void 0 === e
                  ? void 0
                  : e.style) && void 0 !== t
              ? t
              : {}),
          "onmozfullscreenchange" in n,
          "mozInnerScreenX" in n,
          "CSSMozDocumentRule" in n,
          "CanvasCaptureMediaStream" in n,
        ]) >= 4
      );
    }
    function X() {
      var e = window,
        t = navigator,
        n = e.CSS,
        r = e.HTMLButtonElement;
      return (
        m([
          !("getStorageUpdates" in t),
          r && "popover" in r.prototype,
          "CSSCounterStyleRule" in e,
          n.supports("font-size-adjust: ex-height 0.5"),
          n.supports("text-transform: full-width"),
        ]) >= 4
      );
    }
    function N() {
      var e = document;
      return (
        e.fullscreenElement ||
        e.msFullscreenElement ||
        e.mozFullScreenElement ||
        e.webkitFullscreenElement ||
        null
      );
    }
    function T() {
      var e = M(),
        t = A(),
        n = window,
        r = navigator,
        o = "connection";
      return e
        ? m([
            !("SharedWorker" in n),
            r[o] && "ontypechange" in r[o],
            !("sinkId" in new Audio()),
          ]) >= 2
        : !!t &&
            m([
              "onorientationchange" in n,
              "orientation" in n,
              /android/i.test(r.appVersion),
            ]) >= 2;
    }
    function H() {
      var e = navigator,
        t = window,
        n = Audio.prototype,
        r = t.visualViewport;
      return (
        m([
          "srLatency" in n,
          "srChannelCount" in n,
          "devicePosture" in e,
          r && "segments" in r,
          "getTextInformation" in Image.prototype,
        ]) >= 3
      );
    }
    function D() {
      var e = window,
        t = e.OfflineAudioContext || e.webkitOfflineAudioContext;
      if (!t) return -2;
      if (
        _() &&
        !C() &&
        !(function () {
          var e = window;
          return (
            m([
              "DOMRectList" in e,
              "RTCPeerConnectionIceEvent" in e,
              "SVGGeometryElement" in e,
              "ontransitioncancel" in e,
            ]) >= 3
          );
        })()
      )
        return -1;
      var n = new t(1, 5e3, 44100),
        r = n.createOscillator();
      (r.type = "triangle"), (r.frequency.value = 1e4);
      var o = n.createDynamicsCompressor();
      (o.threshold.value = -50),
        (o.knee.value = 40),
        (o.ratio.value = 12),
        (o.attack.value = 0),
        (o.release.value = 0.25),
        r.connect(o),
        o.connect(n.destination),
        r.start(0);
      var i = (function (e) {
          var t = function () {},
            n = new Promise(function (n, r) {
              var o = !1,
                i = 0,
                a = 0;
              e.oncomplete = function (e) {
                return n(e.renderedBuffer);
              };
              var c = function () {
                  setTimeout(function () {
                    return r(J("timeout"));
                  }, Math.min(500, a + 5e3 - Date.now()));
                },
                s = function () {
                  try {
                    var t = e.startRendering();
                    switch ((u(t) && d(t), e.state)) {
                      case "running":
                        (a = Date.now()), o && c();
                        break;
                      case "suspended":
                        document.hidden || i++,
                          o && i >= 3 ? r(J("suspended")) : setTimeout(s, 500);
                    }
                  } catch (e) {
                    r(e);
                  }
                };
              s(),
                (t = function () {
                  o || ((o = !0), a > 0 && c());
                });
            });
          return [n, t];
        })(n),
        a = i[0],
        c = i[1],
        s = d(
          a.then(
            function (e) {
              return (function (e) {
                for (var t = 0, n = 0; n < e.length; ++n) t += Math.abs(e[n]);
                return t;
              })(e.getChannelData(0).subarray(4500));
            },
            function (e) {
              if ("timeout" === e.name || "suspended" === e.name) return -3;
              throw e;
            }
          )
        );
      return function () {
        return c(), s;
      };
    }
    function J(e) {
      var t = new Error(e);
      return (t.name = e), t;
    }
    function O(e, t, o) {
      var i, a, u;
      return (
        void 0 === o && (o = 50),
        n(this, void 0, void 0, function () {
          var n, s;
          return r(this, function (r) {
            switch (r.label) {
              case 0:
                (n = document), (r.label = 1);
              case 1:
                return n.body ? [3, 3] : [4, c(o)];
              case 2:
                return r.sent(), [3, 1];
              case 3:
                (s = n.createElement("iframe")), (r.label = 4);
              case 4:
                return (
                  r.trys.push([4, , 10, 11]),
                  [
                    4,
                    new Promise(function (e, r) {
                      var o = !1,
                        i = function () {
                          (o = !0), e();
                        };
                      (s.onload = i),
                        (s.onerror = function (e) {
                          (o = !0), r(e);
                        });
                      var a = s.style;
                      a.setProperty("display", "block", "important"),
                        (a.position = "absolute"),
                        (a.top = "0"),
                        (a.left = "0"),
                        (a.visibility = "hidden"),
                        t && "srcdoc" in s
                          ? (s.srcdoc = t)
                          : (s.src = "about:blank"),
                        n.body.appendChild(s);
                      var c = function () {
                        var e, t;
                        o ||
                          ("complete" ===
                          (null ===
                            (t =
                              null === (e = s.contentWindow) || void 0 === e
                                ? void 0
                                : e.document) || void 0 === t
                            ? void 0
                            : t.readyState)
                            ? i()
                            : setTimeout(c, 10));
                      };
                      c();
                    }),
                  ]
                );
              case 5:
                r.sent(), (r.label = 6);
              case 6:
                return (
                  null ===
                    (a =
                      null === (i = s.contentWindow) || void 0 === i
                        ? void 0
                        : i.document) || void 0 === a
                    ? void 0
                    : a.body
                )
                  ? [3, 8]
                  : [4, c(o)];
              case 7:
                return r.sent(), [3, 6];
              case 8:
                return [4, e(s, s.contentWindow)];
              case 9:
                return [2, r.sent()];
              case 10:
                return (
                  null === (u = s.parentNode) ||
                    void 0 === u ||
                    u.removeChild(s),
                  [7]
                );
              case 11:
                return [2];
            }
          });
        })
      );
    }
    function B(e) {
      for (
        var t = (function (e) {
            for (
              var t,
                n,
                r = "Unexpected syntax '".concat(e, "'"),
                o = /^\s*([a-z-]*)(.*)$/i.exec(e),
                i = o[1] || void 0,
                a = {},
                c = /([.:#][\w-]+|\[.+?\])/gi,
                u = function (e, t) {
                  (a[e] = a[e] || []), a[e].push(t);
                };
              ;

            ) {
              var s = c.exec(o[2]);
              if (!s) break;
              var l = s[0];
              switch (l[0]) {
                case ".":
                  u("class", l.slice(1));
                  break;
                case "#":
                  u("id", l.slice(1));
                  break;
                case "[":
                  var d =
                    /^\[([\w-]+)([~|^$*]?=("(.*?)"|([\w-]+)))?(\s+[is])?\]$/.exec(
                      l
                    );
                  if (!d) throw new Error(r);
                  u(
                    d[1],
                    null !==
                      (n = null !== (t = d[4]) && void 0 !== t ? t : d[5]) &&
                      void 0 !== n
                      ? n
                      : ""
                  );
                  break;
                default:
                  throw new Error(r);
              }
            }
            return [i, a];
          })(e),
          n = t[0],
          r = t[1],
          o = document.createElement(null != n ? n : "div"),
          i = 0,
          a = Object.keys(r);
        i < a.length;
        i++
      ) {
        var c = a[i],
          u = r[c].join(" ");
        "style" === c ? z(o.style, u) : o.setAttribute(c, u);
      }
      return o;
    }
    function z(e, t) {
      for (var n = 0, r = t.split(";"); n < r.length; n++) {
        var o = r[n],
          i = /^\s*([\w-]+)\s*:\s*(.+?)(\s*!([\w-]+))?\s*$/.exec(o);
        if (i) {
          var a = i[1],
            c = i[2],
            u = i[4];
          e.setProperty(a, c, u || "");
        }
      }
    }
    var U,
      K,
      Q = ["monospace", "sans-serif", "serif"],
      q = [
        "sans-serif-thin",
        "ARNO PRO",
        "Agency FB",
        "Arabic Typesetting",
        "Arial Unicode MS",
        "AvantGarde Bk BT",
        "BankGothic Md BT",
        "Batang",
        "Bitstream Vera Sans Mono",
        "Calibri",
        "Century",
        "Century Gothic",
        "Clarendon",
        "EUROSTILE",
        "Franklin Gothic",
        "Futura Bk BT",
        "Futura Md BT",
        "GOTHAM",
        "Gill Sans",
        "HELV",
        "Haettenschweiler",
        "Helvetica Neue",
        "Humanst521 BT",
        "Leelawadee",
        "Letter Gothic",
        "Levenim MT",
        "Lucida Bright",
        "Lucida Sans",
        "Menlo",
        "MS Mincho",
        "MS Outlook",
        "MS Reference Specialty",
        "MS UI Gothic",
        "MT Extra",
        "MYRIAD PRO",
        "Marlett",
        "Meiryo UI",
        "Microsoft Uighur",
        "Minion Pro",
        "Monotype Corsiva",
        "PMingLiU",
        "Pristina",
        "SCRIPTINA",
        "Segoe UI Light",
        "Serifa",
        "SimHei",
        "Small Fonts",
        "Staccato222 BT",
        "TRAJAN PRO",
        "Univers CE 55 Medium",
        "Vrinda",
        "ZWAdobeF",
      ];
    function $(e) {
      var t,
        n,
        r,
        o = !1,
        i = (function () {
          var e = document.createElement("canvas");
          return (e.width = 1), (e.height = 1), [e, e.getContext("2d")];
        })(),
        a = i[0],
        c = i[1];
      return (
        (function (e, t) {
          return !(!t || !e.toDataURL);
        })(a, c)
          ? ((o = (function (e) {
              return (
                e.rect(0, 0, 10, 10),
                e.rect(2, 2, 6, 6),
                !e.isPointInPath(5, 5, "evenodd")
              );
            })(c)),
            e
              ? (n = r = "skipped")
              : ((t = (function (e, t) {
                  !(function (e, t) {
                    (e.width = 240),
                      (e.height = 60),
                      (t.textBaseline = "alphabetic"),
                      (t.fillStyle = "#f60"),
                      t.fillRect(100, 1, 62, 20),
                      (t.fillStyle = "#069"),
                      (t.font = '11pt "Times New Roman"');
                    var n = "Cwm fjordbank gly ".concat(
                      String.fromCharCode(55357, 56835)
                    );
                    t.fillText(n, 2, 15),
                      (t.fillStyle = "rgba(102, 204, 0, 0.2)"),
                      (t.font = "18pt Arial"),
                      t.fillText(n, 4, 45);
                  })(e, t);
                  var n = ee(e);
                  return n !== ee(e)
                    ? ["unstable", "unstable"]
                    : ((function (e, t) {
                        (e.width = 122),
                          (e.height = 110),
                          (t.globalCompositeOperation = "multiply");
                        for (
                          var n = 0,
                            r = [
                              ["#f2f", 40, 40],
                              ["#2ff", 80, 40],
                              ["#ff2", 60, 80],
                            ];
                          n < r.length;
                          n++
                        ) {
                          var o = r[n],
                            i = o[0],
                            a = o[1],
                            c = o[2];
                          (t.fillStyle = i),
                            t.beginPath(),
                            t.arc(a, c, 40, 0, 2 * Math.PI, !0),
                            t.closePath(),
                            t.fill();
                        }
                        (t.fillStyle = "#f9c"),
                          t.arc(60, 60, 60, 0, 2 * Math.PI, !0),
                          t.arc(60, 60, 20, 0, 2 * Math.PI, !0),
                          t.fill("evenodd");
                      })(e, t),
                      [ee(e), n]);
                })(a, c)),
                (n = t[0]),
                (r = t[1])))
          : (n = r = "unsupported"),
        { winding: o, geometry: n, text: r }
      );
    }
    function ee(e) {
      return e.toDataURL();
    }
    function te() {
      var e = screen,
        t = function (e) {
          return v(f(e), null);
        },
        n = [t(e.width), t(e.height)];
      return n.sort().reverse(), n;
    }
    function ne() {
      var e = this;
      return (
        (function () {
          if (void 0 === K) {
            var e = function () {
              var t = re();
              oe(t) ? (K = setTimeout(e, 2500)) : ((U = t), (K = void 0));
            };
            e();
          }
        })(),
        function () {
          return n(e, void 0, void 0, function () {
            var e;
            return r(this, function (t) {
              switch (t.label) {
                case 0:
                  return oe((e = re()))
                    ? U
                      ? [2, o([], U, !0)]
                      : N()
                      ? [
                          4,
                          ((n = document),
                          (
                            n.exitFullscreen ||
                            n.msExitFullscreen ||
                            n.mozCancelFullScreen ||
                            n.webkitExitFullscreen
                          ).call(n)),
                        ]
                      : [3, 2]
                    : [3, 2];
                case 1:
                  t.sent(), (e = re()), (t.label = 2);
                case 2:
                  return oe(e) || (U = e), [2, e];
              }
              var n;
            });
          });
        }
      );
    }
    function re() {
      var e = screen;
      return [
        v(h(e.availTop), null),
        v(h(e.width) - h(e.availWidth) - v(h(e.availLeft), 0), null),
        v(h(e.height) - h(e.availHeight) - v(h(e.availTop), 0), null),
        v(h(e.availLeft), null),
      ];
    }
    function oe(e) {
      for (var t = 0; t < 4; ++t) if (e[t]) return !1;
      return !0;
    }
    function ie(e) {
      var t;
      return n(this, void 0, void 0, function () {
        var n, o, i, a, u, s, l;
        return r(this, function (r) {
          switch (r.label) {
            case 0:
              for (
                n = document,
                  o = n.createElement("div"),
                  i = new Array(e.length),
                  a = {},
                  ae(o),
                  l = 0;
                l < e.length;
                ++l
              )
                "DIALOG" === (u = B(e[l])).tagName && u.show(),
                  ae((s = n.createElement("div"))),
                  s.appendChild(u),
                  o.appendChild(s),
                  (i[l] = u);
              r.label = 1;
            case 1:
              return n.body ? [3, 3] : [4, c(50)];
            case 2:
              return r.sent(), [3, 1];
            case 3:
              n.body.appendChild(o);
              try {
                for (l = 0; l < e.length; ++l)
                  i[l].offsetParent || (a[e[l]] = !0);
              } finally {
                null === (t = o.parentNode) || void 0 === t || t.removeChild(o);
              }
              return [2, a];
          }
        });
      });
    }
    function ae(e) {
      e.style.setProperty("visibility", "hidden", "important"),
        e.style.setProperty("display", "block", "important");
    }
    function ce(e) {
      return matchMedia("(inverted-colors: ".concat(e, ")")).matches;
    }
    function ue(e) {
      return matchMedia("(forced-colors: ".concat(e, ")")).matches;
    }
    function se(e) {
      return matchMedia("(prefers-contrast: ".concat(e, ")")).matches;
    }
    function le(e) {
      return matchMedia("(prefers-reduced-motion: ".concat(e, ")")).matches;
    }
    function de(e) {
      return matchMedia("(prefers-reduced-transparency: ".concat(e, ")"))
        .matches;
    }
    function fe(e) {
      return matchMedia("(dynamic-range: ".concat(e, ")")).matches;
    }
    var he = Math,
      ve = function () {
        return 0;
      },
      me = {
        default: [],
        apple: [{ font: "-apple-system-body" }],
        serif: [{ fontFamily: "serif" }],
        sans: [{ fontFamily: "sans-serif" }],
        mono: [{ fontFamily: "monospace" }],
        min: [{ fontSize: "1px" }],
        system: [{ fontFamily: "system-ui" }],
      },
      pe = new Set([
        10752, 2849, 2884, 2885, 2886, 2928, 2929, 2930, 2931, 2932, 2960, 2961,
        2962, 2963, 2964, 2965, 2966, 2967, 2968, 2978, 3024, 3042, 3088, 3089,
        3106, 3107, 32773, 32777, 32777, 32823, 32824, 32936, 32937, 32938,
        32939, 32968, 32969, 32970, 32971, 3317, 33170, 3333, 3379, 3386, 33901,
        33902, 34016, 34024, 34076, 3408, 3410, 3411, 3412, 3413, 3414, 3415,
        34467, 34816, 34817, 34818, 34819, 34877, 34921, 34930, 35660, 35661,
        35724, 35738, 35739, 36003, 36004, 36005, 36347, 36348, 36349, 37440,
        37441, 37443, 7936, 7937, 7938,
      ]),
      ye = new Set([
        34047, 35723, 36063, 34852, 34853, 34854, 34229, 36392, 36795, 38449,
      ]),
      ge = ["FRAGMENT_SHADER", "VERTEX_SHADER"],
      be = [
        "LOW_FLOAT",
        "MEDIUM_FLOAT",
        "HIGH_FLOAT",
        "LOW_INT",
        "MEDIUM_INT",
        "HIGH_INT",
      ],
      we = "WEBGL_debug_renderer_info";
    function ke(e) {
      if (e.webgl) return e.webgl.context;
      var t,
        n = document.createElement("canvas");
      n.addEventListener("webglCreateContextError", function () {
        return (t = void 0);
      });
      for (var r = 0, o = ["webgl", "experimental-webgl"]; r < o.length; r++) {
        var i = o[r];
        try {
          t = n.getContext(i);
        } catch (e) {}
        if (t) break;
      }
      return (e.webgl = { context: t }), t;
    }
    function Le(e, t, n) {
      var r = e.getShaderPrecisionFormat(e[t], e[n]);
      return r ? [r.rangeMin, r.rangeMax, r.precision] : [];
    }
    function xe(e) {
      return Object.keys(e.__proto__).filter(Se);
    }
    function Se(e) {
      return "string" == typeof e && !e.match(/[^A-Z0-9_x]/);
    }
    function Ve() {
      return A();
    }
    function Ie(e) {
      return "function" == typeof e.getParameter;
    }
    var We = {
      fonts: function () {
        var e = this;
        return O(function (t, o) {
          var i = o.document;
          return n(e, void 0, void 0, function () {
            var e, t, n, o, a, c, u, s, l, d, f;
            return r(this, function (r) {
              for (
                (e = i.body).style.fontSize = "48px",
                  (t = i.createElement("div")).style.setProperty(
                    "visibility",
                    "hidden",
                    "important"
                  ),
                  n = {},
                  o = {},
                  a = function (e) {
                    var n = i.createElement("span"),
                      r = n.style;
                    return (
                      (r.position = "absolute"),
                      (r.top = "0"),
                      (r.left = "0"),
                      (r.fontFamily = e),
                      (n.textContent = "mmMwWLliI0O&1"),
                      t.appendChild(n),
                      n
                    );
                  },
                  c = function (e, t) {
                    return a("'".concat(e, "',").concat(t));
                  },
                  u = function () {
                    for (
                      var e = {},
                        t = function (t) {
                          e[t] = Q.map(function (e) {
                            return c(t, e);
                          });
                        },
                        n = 0,
                        r = q;
                      n < r.length;
                      n++
                    )
                      t(r[n]);
                    return e;
                  },
                  s = function (e) {
                    return Q.some(function (t, r) {
                      return (
                        e[r].offsetWidth !== n[t] || e[r].offsetHeight !== o[t]
                      );
                    });
                  },
                  l = Q.map(a),
                  d = u(),
                  e.appendChild(t),
                  f = 0;
                f < Q.length;
                f++
              )
                (n[Q[f]] = l[f].offsetWidth), (o[Q[f]] = l[f].offsetHeight);
              return [
                2,
                q.filter(function (e) {
                  return s(d[e]);
                }),
              ];
            });
          });
        });
      },
      domBlockers: function (e) {
        var t = (void 0 === e ? {} : e).debug;
        return n(this, void 0, void 0, function () {
          var e, n, o, i, a;
          return r(this, function (r) {
            switch (r.label) {
              case 0:
                return _() || T()
                  ? ((c = atob),
                    (e = {
                      abpIndo: [
                        "#Iklan-Melayang",
                        "#Kolom-Iklan-728",
                        "#SidebarIklan-wrapper",
                        '[title="ALIENBOLA" i]',
                        c("I0JveC1CYW5uZXItYWRz"),
                      ],
                      abpvn: [
                        ".quangcao",
                        "#mobileCatfish",
                        c("LmNsb3NlLWFkcw=="),
                        '[id^="bn_bottom_fixed_"]',
                        "#pmadv",
                      ],
                      adBlockFinland: [
                        ".mainostila",
                        c("LnNwb25zb3JpdA=="),
                        ".ylamainos",
                        c("YVtocmVmKj0iL2NsaWNrdGhyZ2guYXNwPyJd"),
                        c(
                          "YVtocmVmXj0iaHR0cHM6Ly9hcHAucmVhZHBlYWsuY29tL2FkcyJd"
                        ),
                      ],
                      adBlockPersian: [
                        "#navbar_notice_50",
                        ".kadr",
                        'TABLE[width="140px"]',
                        "#divAgahi",
                        c("YVtocmVmXj0iaHR0cDovL2cxLnYuZndtcm0ubmV0L2FkLyJd"),
                      ],
                      adBlockWarningRemoval: [
                        "#adblock-honeypot",
                        ".adblocker-root",
                        ".wp_adblock_detect",
                        c("LmhlYWRlci1ibG9ja2VkLWFk"),
                        c("I2FkX2Jsb2NrZXI="),
                      ],
                      adGuardAnnoyances: [
                        ".hs-sosyal",
                        "#cookieconsentdiv",
                        'div[class^="app_gdpr"]',
                        ".as-oil",
                        '[data-cypress="soft-push-notification-modal"]',
                      ],
                      adGuardBase: [
                        ".BetterJsPopOverlay",
                        c("I2FkXzMwMFgyNTA="),
                        c("I2Jhbm5lcmZsb2F0MjI="),
                        c("I2NhbXBhaWduLWJhbm5lcg=="),
                        c("I0FkLUNvbnRlbnQ="),
                      ],
                      adGuardChinese: [
                        c("LlppX2FkX2FfSA=="),
                        c("YVtocmVmKj0iLmh0aGJldDM0LmNvbSJd"),
                        "#widget-quan",
                        c("YVtocmVmKj0iLzg0OTkyMDIwLnh5eiJd"),
                        c("YVtocmVmKj0iLjE5NTZobC5jb20vIl0="),
                      ],
                      adGuardFrench: [
                        "#pavePub",
                        c("LmFkLWRlc2t0b3AtcmVjdGFuZ2xl"),
                        ".mobile_adhesion",
                        ".widgetadv",
                        c("LmFkc19iYW4="),
                      ],
                      adGuardGerman: ['aside[data-portal-id="leaderboard"]'],
                      adGuardJapanese: [
                        "#kauli_yad_1",
                        c(
                          "YVtocmVmXj0iaHR0cDovL2FkMi50cmFmZmljZ2F0ZS5uZXQvIl0="
                        ),
                        c("Ll9wb3BJbl9pbmZpbml0ZV9hZA=="),
                        c("LmFkZ29vZ2xl"),
                        c("Ll9faXNib29zdFJldHVybkFk"),
                      ],
                      adGuardMobile: [
                        c("YW1wLWF1dG8tYWRz"),
                        c("LmFtcF9hZA=="),
                        'amp-embed[type="24smi"]',
                        "#mgid_iframe1",
                        c("I2FkX2ludmlld19hcmVh"),
                      ],
                      adGuardRussian: [
                        c("YVtocmVmXj0iaHR0cHM6Ly9hZC5sZXRtZWFkcy5jb20vIl0="),
                        c("LnJlY2xhbWE="),
                        'div[id^="smi2adblock"]',
                        c("ZGl2W2lkXj0iQWRGb3hfYmFubmVyXyJd"),
                        "#psyduckpockeball",
                      ],
                      adGuardSocial: [
                        c(
                          "YVtocmVmXj0iLy93d3cuc3R1bWJsZXVwb24uY29tL3N1Ym1pdD91cmw9Il0="
                        ),
                        c("YVtocmVmXj0iLy90ZWxlZ3JhbS5tZS9zaGFyZS91cmw/Il0="),
                        ".etsy-tweet",
                        "#inlineShare",
                        ".popup-social",
                      ],
                      adGuardSpanishPortuguese: [
                        "#barraPublicidade",
                        "#Publicidade",
                        "#publiEspecial",
                        "#queTooltip",
                        ".cnt-publi",
                      ],
                      adGuardTrackingProtection: [
                        "#qoo-counter",
                        c("YVtocmVmXj0iaHR0cDovL2NsaWNrLmhvdGxvZy5ydS8iXQ=="),
                        c(
                          "YVtocmVmXj0iaHR0cDovL2hpdGNvdW50ZXIucnUvdG9wL3N0YXQucGhwIl0="
                        ),
                        c("YVtocmVmXj0iaHR0cDovL3RvcC5tYWlsLnJ1L2p1bXAiXQ=="),
                        "#top100counter",
                      ],
                      adGuardTurkish: [
                        "#backkapat",
                        c("I3Jla2xhbWk="),
                        c(
                          "YVtocmVmXj0iaHR0cDovL2Fkc2Vydi5vbnRlay5jb20udHIvIl0="
                        ),
                        c(
                          "YVtocmVmXj0iaHR0cDovL2l6bGVuemkuY29tL2NhbXBhaWduLyJd"
                        ),
                        c(
                          "YVtocmVmXj0iaHR0cDovL3d3dy5pbnN0YWxsYWRzLm5ldC8iXQ=="
                        ),
                      ],
                      bulgarian: [
                        c("dGQjZnJlZW5ldF90YWJsZV9hZHM="),
                        "#ea_intext_div",
                        ".lapni-pop-over",
                        "#xenium_hot_offers",
                      ],
                      easyList: [
                        ".yb-floorad",
                        c("LndpZGdldF9wb19hZHNfd2lkZ2V0"),
                        c("LnRyYWZmaWNqdW5reS1hZA=="),
                        ".textad_headline",
                        c("LnNwb25zb3JlZC10ZXh0LWxpbmtz"),
                      ],
                      easyListChina: [
                        c(
                          "LmFwcGd1aWRlLXdyYXBbb25jbGljayo9ImJjZWJvcy5jb20iXQ=="
                        ),
                        c("LmZyb250cGFnZUFkdk0="),
                        "#taotaole",
                        "#aafoot.top_box",
                        ".cfa_popup",
                      ],
                      easyListCookie: [
                        ".ezmob-footer",
                        ".cc-CookieWarning",
                        "[data-cookie-number]",
                        c("LmF3LWNvb2tpZS1iYW5uZXI="),
                        ".sygnal24-gdpr-modal-wrap",
                      ],
                      easyListCzechSlovak: [
                        "#onlajny-stickers",
                        c("I3Jla2xhbW5pLWJveA=="),
                        c("LnJla2xhbWEtbWVnYWJvYXJk"),
                        ".sklik",
                        c("W2lkXj0ic2tsaWtSZWtsYW1hIl0="),
                      ],
                      easyListDutch: [
                        c("I2FkdmVydGVudGll"),
                        c("I3ZpcEFkbWFya3RCYW5uZXJCbG9jaw=="),
                        ".adstekst",
                        c("YVtocmVmXj0iaHR0cHM6Ly94bHR1YmUubmwvY2xpY2svIl0="),
                        "#semilo-lrectangle",
                      ],
                      easyListGermany: [
                        "#SSpotIMPopSlider",
                        c("LnNwb25zb3JsaW5rZ3J1ZW4="),
                        c("I3dlcmJ1bmdza3k="),
                        c("I3Jla2xhbWUtcmVjaHRzLW1pdHRl"),
                        c("YVtocmVmXj0iaHR0cHM6Ly9iZDc0Mi5jb20vIl0="),
                      ],
                      easyListItaly: [
                        c("LmJveF9hZHZfYW5udW5jaQ=="),
                        ".sb-box-pubbliredazionale",
                        c(
                          "YVtocmVmXj0iaHR0cDovL2FmZmlsaWF6aW9uaWFkcy5zbmFpLml0LyJd"
                        ),
                        c("YVtocmVmXj0iaHR0cHM6Ly9hZHNlcnZlci5odG1sLml0LyJd"),
                        c(
                          "YVtocmVmXj0iaHR0cHM6Ly9hZmZpbGlhemlvbmlhZHMuc25haS5pdC8iXQ=="
                        ),
                      ],
                      easyListLithuania: [
                        c("LnJla2xhbW9zX3RhcnBhcw=="),
                        c("LnJla2xhbW9zX251b3JvZG9z"),
                        c("aW1nW2FsdD0iUmVrbGFtaW5pcyBza3lkZWxpcyJd"),
                        c("aW1nW2FsdD0iRGVkaWt1b3RpLmx0IHNlcnZlcmlhaSJd"),
                        c("aW1nW2FsdD0iSG9zdGluZ2FzIFNlcnZlcmlhaS5sdCJd"),
                      ],
                      estonian: [
                        c("QVtocmVmKj0iaHR0cDovL3BheTRyZXN1bHRzMjQuZXUiXQ=="),
                      ],
                      fanboyAnnoyances: [
                        "#ac-lre-player",
                        ".navigate-to-top",
                        "#subscribe_popup",
                        ".newsletter_holder",
                        "#back-top",
                      ],
                      fanboyAntiFacebook: [".util-bar-module-firefly-visible"],
                      fanboyEnhancedTrackers: [
                        ".open.pushModal",
                        "#issuem-leaky-paywall-articles-zero-remaining-nag",
                        "#sovrn_container",
                        'div[class$="-hide"][zoompage-fontsize][style="display: block;"]',
                        ".BlockNag__Card",
                      ],
                      fanboySocial: [
                        "#FollowUs",
                        "#meteored_share",
                        "#social_follow",
                        ".article-sharer",
                        ".community__social-desc",
                      ],
                      frellwitSwedish: [
                        c(
                          "YVtocmVmKj0iY2FzaW5vcHJvLnNlIl1bdGFyZ2V0PSJfYmxhbmsiXQ=="
                        ),
                        c("YVtocmVmKj0iZG9rdG9yLXNlLm9uZWxpbmsubWUiXQ=="),
                        "article.category-samarbete",
                        c("ZGl2LmhvbGlkQWRz"),
                        "ul.adsmodern",
                      ],
                      greekAdBlock: [
                        c("QVtocmVmKj0iYWRtYW4ub3RlbmV0LmdyL2NsaWNrPyJd"),
                        c(
                          "QVtocmVmKj0iaHR0cDovL2F4aWFiYW5uZXJzLmV4b2R1cy5nci8iXQ=="
                        ),
                        c(
                          "QVtocmVmKj0iaHR0cDovL2ludGVyYWN0aXZlLmZvcnRobmV0LmdyL2NsaWNrPyJd"
                        ),
                        "DIV.agores300",
                        "TABLE.advright",
                      ],
                      hungarian: [
                        "#cemp_doboz",
                        ".optimonk-iframe-container",
                        c("LmFkX19tYWlu"),
                        c("W2NsYXNzKj0iR29vZ2xlQWRzIl0="),
                        "#hirdetesek_box",
                      ],
                      iDontCareAboutCookies: [
                        '.alert-info[data-block-track*="CookieNotice"]',
                        ".ModuleTemplateCookieIndicator",
                        ".o--cookies--container",
                        "#cookies-policy-sticky",
                        "#stickyCookieBar",
                      ],
                      icelandicAbp: [
                        c(
                          "QVtocmVmXj0iL2ZyYW1ld29yay9yZXNvdXJjZXMvZm9ybXMvYWRzLmFzcHgiXQ=="
                        ),
                      ],
                      latvian: [
                        c(
                          "YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiAxMjBweDsgaGVpZ2h0OiA0MHB4OyBvdmVyZmxvdzogaGlkZGVuOyBwb3NpdGlvbjogcmVsYXRpdmU7Il0="
                        ),
                        c(
                          "YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiA4OHB4OyBoZWlnaHQ6IDMxcHg7IG92ZXJmbG93OiBoaWRkZW47IHBvc2l0aW9uOiByZWxhdGl2ZTsiXQ=="
                        ),
                      ],
                      listKr: [
                        c("YVtocmVmKj0iLy9hZC5wbGFuYnBsdXMuY28ua3IvIl0="),
                        c("I2xpdmVyZUFkV3JhcHBlcg=="),
                        c("YVtocmVmKj0iLy9hZHYuaW1hZHJlcC5jby5rci8iXQ=="),
                        c("aW5zLmZhc3R2aWV3LWFk"),
                        ".revenue_unit_item.dable",
                      ],
                      listeAr: [
                        c("LmdlbWluaUxCMUFk"),
                        ".right-and-left-sponsers",
                        c("YVtocmVmKj0iLmFmbGFtLmluZm8iXQ=="),
                        c("YVtocmVmKj0iYm9vcmFxLm9yZyJd"),
                        c(
                          "YVtocmVmKj0iZHViaXp6bGUuY29tL2FyLz91dG1fc291cmNlPSJd"
                        ),
                      ],
                      listeFr: [
                        c("YVtocmVmXj0iaHR0cDovL3Byb21vLnZhZG9yLmNvbS8iXQ=="),
                        c("I2FkY29udGFpbmVyX3JlY2hlcmNoZQ=="),
                        c("YVtocmVmKj0id2Vib3JhbWEuZnIvZmNnaS1iaW4vIl0="),
                        ".site-pub-interstitiel",
                        'div[id^="crt-"][data-criteo-id]',
                      ],
                      officialPolish: [
                        "#ceneo-placeholder-ceneo-12",
                        c("W2hyZWZePSJodHRwczovL2FmZi5zZW5kaHViLnBsLyJd"),
                        c(
                          "YVtocmVmXj0iaHR0cDovL2Fkdm1hbmFnZXIudGVjaGZ1bi5wbC9yZWRpcmVjdC8iXQ=="
                        ),
                        c(
                          "YVtocmVmXj0iaHR0cDovL3d3dy50cml6ZXIucGwvP3V0bV9zb3VyY2UiXQ=="
                        ),
                        c("ZGl2I3NrYXBpZWNfYWQ="),
                      ],
                      ro: [
                        c(
                          "YVtocmVmXj0iLy9hZmZ0cmsuYWx0ZXgucm8vQ291bnRlci9DbGljayJd"
                        ),
                        c(
                          "YVtocmVmXj0iaHR0cHM6Ly9ibGFja2ZyaWRheXNhbGVzLnJvL3Ryay9zaG9wLyJd"
                        ),
                        c(
                          "YVtocmVmXj0iaHR0cHM6Ly9ldmVudC4ycGVyZm9ybWFudC5jb20vZXZlbnRzL2NsaWNrIl0="
                        ),
                        c("YVtocmVmXj0iaHR0cHM6Ly9sLnByb2ZpdHNoYXJlLnJvLyJd"),
                        'a[href^="/url/"]',
                      ],
                      ruAd: [
                        c("YVtocmVmKj0iLy9mZWJyYXJlLnJ1LyJd"),
                        c("YVtocmVmKj0iLy91dGltZy5ydS8iXQ=="),
                        c("YVtocmVmKj0iOi8vY2hpa2lkaWtpLnJ1Il0="),
                        "#pgeldiz",
                        ".yandex-rtb-block",
                      ],
                      thaiAds: [
                        "a[href*=macau-uta-popup]",
                        c("I2Fkcy1nb29nbGUtbWlkZGxlX3JlY3RhbmdsZS1ncm91cA=="),
                        c("LmFkczMwMHM="),
                        ".bumq",
                        ".img-kosana",
                      ],
                      webAnnoyancesUltralist: [
                        "#mod-social-share-2",
                        "#social-tools",
                        c("LmN0cGwtZnVsbGJhbm5lcg=="),
                        ".zergnet-recommend",
                        ".yt.btn-link.btn-md.btn",
                      ],
                    }),
                    (n = Object.keys(e)),
                    [
                      4,
                      ie(
                        (a = []).concat.apply(
                          a,
                          n.map(function (t) {
                            return e[t];
                          })
                        )
                      ),
                    ])
                  : [2, void 0];
              case 1:
                return (
                  (o = r.sent()),
                  t &&
                    (function (e, t) {
                      for (
                        var n = "DOM blockers debug:\n```",
                          r = 0,
                          o = Object.keys(e);
                        r < o.length;
                        r++
                      ) {
                        var i = o[r];
                        n += "\n".concat(i, ":");
                        for (var a = 0, c = e[i]; a < c.length; a++) {
                          var u = c[a];
                          n += "\n  ".concat(t[u] ? "🚫" : "➡️", " ").concat(u);
                        }
                      }
                      console.log("".concat(n, "\n```"));
                    })(e, o),
                  (i = n.filter(function (t) {
                    var n = e[t];
                    return (
                      m(
                        n.map(function (e) {
                          return o[e];
                        })
                      ) >
                      0.6 * n.length
                    );
                  })).sort(),
                  [2, i]
                );
            }
            var c;
          });
        });
      },
      fontPreferences: function () {
        return (
          void 0 === e && (e = 4e3),
          O(function (t, n) {
            var r = n.document,
              i = r.body,
              a = i.style;
            (a.width = "".concat(e, "px")),
              (a.webkitTextSizeAdjust = a.textSizeAdjust = "none"),
              M()
                ? (i.style.zoom = "".concat(1 / n.devicePixelRatio))
                : _() && (i.style.zoom = "reset");
            var c = r.createElement("div");
            return (
              (c.textContent = o([], Array((e / 20) | 0), !0)
                .map(function () {
                  return "word";
                })
                .join(" ")),
              i.appendChild(c),
              (function (e, t) {
                for (
                  var n = {}, r = {}, o = 0, i = Object.keys(me);
                  o < i.length;
                  o++
                ) {
                  var a = i[o],
                    c = me[a],
                    u = c[0],
                    s = void 0 === u ? {} : u,
                    l = c[1],
                    d = void 0 === l ? "mmMwWLliI0fiflO&1" : l,
                    f = e.createElement("span");
                  (f.textContent = d), (f.style.whiteSpace = "nowrap");
                  for (var h = 0, v = Object.keys(s); h < v.length; h++) {
                    var m = v[h],
                      p = s[m];
                    void 0 !== p && (f.style[m] = p);
                  }
                  (n[a] = f), t.append(e.createElement("br"), f);
                }
                for (var y = 0, g = Object.keys(me); y < g.length; y++)
                  r[(a = g[y])] = n[a].getBoundingClientRect().width;
                return r;
              })(r, i)
            );
          }, '<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1">')
        );
        var e;
      },
      audio: function () {
        return (_() && X() && Y()) ||
          (M() &&
            H() &&
            ((t = (e = window).URLPattern),
            m([
              "union" in Set.prototype,
              "Iterator" in e,
              t && "hasRegExpGroups" in t.prototype,
              "RGB8" in WebGLRenderingContext.prototype,
            ]) >= 3))
          ? -4
          : D();
        var e, t;
      },
      screenFrame: function () {
        var e = this;
        if (_() && X() && Y())
          return function () {
            return Promise.resolve(void 0);
          };
        var t = ne();
        return function () {
          return n(e, void 0, void 0, function () {
            var e, n;
            return r(this, function (r) {
              switch (r.label) {
                case 0:
                  return [4, t()];
                case 1:
                  return (
                    (e = r.sent()),
                    [
                      2,
                      [
                        (n = function (e) {
                          return null === e ? null : p(e, 10);
                        })(e[0]),
                        n(e[1]),
                        n(e[2]),
                        n(e[3]),
                      ],
                    ]
                  );
              }
            });
          });
        };
      },
      canvas: function () {
        return $(_() && X() && Y());
      },
      osCpu: function () {
        return navigator.oscpu;
      },
      languages: function () {
        var e,
          t = navigator,
          n = [],
          r =
            t.language ||
            t.userLanguage ||
            t.browserLanguage ||
            t.systemLanguage;
        if ((void 0 !== r && n.push([r]), Array.isArray(t.languages)))
          (M() &&
            m([
              !("MediaSettingsRange" in (e = window)),
              "RTCEncodedAudioFrame" in e,
              "" + e.Intl == "[object Intl]",
              "" + e.Reflect == "[object Reflect]",
            ]) >= 3) ||
            n.push(t.languages);
        else if ("string" == typeof t.languages) {
          var o = t.languages;
          o && n.push(o.split(","));
        }
        return n;
      },
      colorDepth: function () {
        return window.screen.colorDepth;
      },
      deviceMemory: function () {
        return v(h(navigator.deviceMemory), void 0);
      },
      screenResolution: function () {
        if (!(_() && X() && Y())) return te();
      },
      hardwareConcurrency: function () {
        return v(f(navigator.hardwareConcurrency), void 0);
      },
      timezone: function () {
        var e,
          t =
            null === (e = window.Intl) || void 0 === e
              ? void 0
              : e.DateTimeFormat;
        if (t) {
          var n = new t().resolvedOptions().timeZone;
          if (n) return n;
        }
        var r,
          o =
            ((r = new Date().getFullYear()),
            -Math.max(
              h(new Date(r, 0, 1).getTimezoneOffset()),
              h(new Date(r, 6, 1).getTimezoneOffset())
            ));
        return "UTC".concat(o >= 0 ? "+" : "").concat(o);
      },
      sessionStorage: function () {
        try {
          return !!window.sessionStorage;
        } catch (e) {
          return !0;
        }
      },
      localStorage: function () {
        try {
          return !!window.localStorage;
        } catch (e) {
          return !0;
        }
      },
      indexedDB: function () {
        if (!j() && !R())
          try {
            return !!window.indexedDB;
          } catch (e) {
            return !0;
          }
      },
      openDatabase: function () {
        return !!window.openDatabase;
      },
      cpuClass: function () {
        return navigator.cpuClass;
      },
      platform: function () {
        var e = navigator.platform;
        return "MacIntel" === e && _() && !C()
          ? (function () {
              if ("iPad" === navigator.platform) return !0;
              var e = screen,
                t = e.width / e.height;
              return (
                m([
                  "MediaSource" in window,
                  !!Element.prototype.webkitRequestFullscreen,
                  t > 0.65 && t < 1.53,
                ]) >= 2
              );
            })()
            ? "iPad"
            : "iPhone"
          : e;
      },
      plugins: function () {
        var e = navigator.plugins;
        if (e) {
          for (var t = [], n = 0; n < e.length; ++n) {
            var r = e[n];
            if (r) {
              for (var o = [], i = 0; i < r.length; ++i) {
                var a = r[i];
                o.push({ type: a.type, suffixes: a.suffixes });
              }
              t.push({
                name: r.name,
                description: r.description,
                mimeTypes: o,
              });
            }
          }
          return t;
        }
      },
      touchSupport: function () {
        var e,
          t = navigator,
          n = 0;
        void 0 !== t.maxTouchPoints
          ? (n = f(t.maxTouchPoints))
          : void 0 !== t.msMaxTouchPoints && (n = t.msMaxTouchPoints);
        try {
          document.createEvent("TouchEvent"), (e = !0);
        } catch (t) {
          e = !1;
        }
        return {
          maxTouchPoints: n,
          touchEvent: e,
          touchStart: "ontouchstart" in window,
        };
      },
      vendor: function () {
        return navigator.vendor || "";
      },
      vendorFlavors: function () {
        for (
          var e = [],
            t = 0,
            n = [
              "chrome",
              "safari",
              "__crWeb",
              "__gCrWeb",
              "yandex",
              "__yb",
              "__ybro",
              "__firefox__",
              "__edgeTrackingPreventionStatistics",
              "webkit",
              "oprt",
              "samsungAr",
              "ucweb",
              "UCShellJava",
              "puffinDevice",
            ];
          t < n.length;
          t++
        ) {
          var r = n[t],
            o = window[r];
          o && "object" == i(o) && e.push(r);
        }
        return e.sort();
      },
      cookiesEnabled: function () {
        var e = document;
        try {
          e.cookie = "cookietest=1; SameSite=Strict;";
          var t = -1 !== e.cookie.indexOf("cookietest=");
          return (
            (e.cookie =
              "cookietest=1; SameSite=Strict; expires=Thu, 01-Jan-1970 00:00:01 GMT"),
            t
          );
        } catch (e) {
          return !1;
        }
      },
      colorGamut: function () {
        for (var e = 0, t = ["rec2020", "p3", "srgb"]; e < t.length; e++) {
          var n = t[e];
          if (matchMedia("(color-gamut: ".concat(n, ")")).matches) return n;
        }
      },
      invertedColors: function () {
        return !!ce("inverted") || (!ce("none") && void 0);
      },
      forcedColors: function () {
        return !!ue("active") || (!ue("none") && void 0);
      },
      monochrome: function () {
        if (matchMedia("(min-monochrome: 0)").matches) {
          for (var e = 0; e <= 100; ++e)
            if (matchMedia("(max-monochrome: ".concat(e, ")")).matches)
              return e;
          throw new Error("Too high value");
        }
      },
      contrast: function () {
        return se("no-preference")
          ? 0
          : se("high") || se("more")
          ? 1
          : se("low") || se("less")
          ? -1
          : se("forced")
          ? 10
          : void 0;
      },
      reducedMotion: function () {
        return !!le("reduce") || (!le("no-preference") && void 0);
      },
      reducedTransparency: function () {
        return !!de("reduce") || (!de("no-preference") && void 0);
      },
      hdr: function () {
        return !!fe("high") || (!fe("standard") && void 0);
      },
      math: function () {
        var e,
          t = he.acos || ve,
          n = he.acosh || ve,
          r = he.asin || ve,
          o = he.asinh || ve,
          i = he.atanh || ve,
          a = he.atan || ve,
          c = he.sin || ve,
          u = he.sinh || ve,
          s = he.cos || ve,
          l = he.cosh || ve,
          d = he.tan || ve,
          f = he.tanh || ve,
          h = he.exp || ve,
          v = he.expm1 || ve,
          m = he.log1p || ve;
        return {
          acos: t(0.12312423423423424),
          acosh: n(1e308),
          acoshPf: ((e = 1e154), he.log(e + he.sqrt(e * e - 1))),
          asin: r(0.12312423423423424),
          asinh: o(1),
          asinhPf: he.log(1 + he.sqrt(2)),
          atanh: i(0.5),
          atanhPf: he.log(3) / 2,
          atan: a(0.5),
          sin: c(-1e300),
          sinh: u(1),
          sinhPf: he.exp(1) - 1 / he.exp(1) / 2,
          cos: s(10.000000000123),
          cosh: l(1),
          coshPf: (he.exp(1) + 1 / he.exp(1)) / 2,
          tan: d(-1e300),
          tanh: f(1),
          tanhPf: (he.exp(2) - 1) / (he.exp(2) + 1),
          exp: h(1),
          expm1: v(1),
          expm1Pf: he.exp(1) - 1,
          log1p: m(10),
          log1pPf: he.log(11),
          powPI: he.pow(he.PI, -100),
        };
      },
      pdfViewerEnabled: function () {
        return navigator.pdfViewerEnabled;
      },
      architecture: function () {
        var e = new Float32Array(1),
          t = new Uint8Array(e.buffer);
        return (e[0] = 1 / 0), (e[0] = e[0] - e[0]), t[3];
      },
      applePay: function () {
        var e = window.ApplePaySession;
        if ("function" != typeof (null == e ? void 0 : e.canMakePayments))
          return -1;
        if (
          (function () {
            for (var e = window; ; ) {
              var t = e.parent;
              if (!t || t === e) return !1;
              try {
                if (t.location.origin !== e.location.origin) return !0;
              } catch (e) {
                if (e instanceof Error && "SecurityError" === e.name) return !0;
                throw e;
              }
              e = t;
            }
          })()
        )
          return -3;
        try {
          return e.canMakePayments() ? 1 : 0;
        } catch (e) {
          return (function (e) {
            if (
              e instanceof Error &&
              "InvalidAccessError" === e.name &&
              /\bfrom\b.*\binsecure\b/i.test(e.message)
            )
              return -2;
            throw e;
          })(e);
        }
      },
      privateClickMeasurement: function () {
        var e,
          t = document.createElement("a"),
          n =
            null !== (e = t.attributionSourceId) && void 0 !== e
              ? e
              : t.attributionsourceid;
        return void 0 === n ? void 0 : String(n);
      },
      audioBaseLatency: function () {
        var e;
        return T() || _()
          ? window.AudioContext &&
            null !== (e = new AudioContext().baseLatency) &&
            void 0 !== e
            ? e
            : -1
          : -2;
      },
      webGlBasics: function (e) {
        var t,
          n,
          r,
          o,
          i,
          a,
          c = ke(e.cache);
        if (!c) return -1;
        if (!Ie(c)) return -2;
        var u = Ve() ? null : c.getExtension(we);
        return {
          version:
            (null === (t = c.getParameter(c.VERSION)) || void 0 === t
              ? void 0
              : t.toString()) || "",
          vendor:
            (null === (n = c.getParameter(c.VENDOR)) || void 0 === n
              ? void 0
              : n.toString()) || "",
          vendorUnmasked: u
            ? null === (r = c.getParameter(u.UNMASKED_VENDOR_WEBGL)) ||
              void 0 === r
              ? void 0
              : r.toString()
            : "",
          renderer:
            (null === (o = c.getParameter(c.RENDERER)) || void 0 === o
              ? void 0
              : o.toString()) || "",
          rendererUnmasked: u
            ? null === (i = c.getParameter(u.UNMASKED_RENDERER_WEBGL)) ||
              void 0 === i
              ? void 0
              : i.toString()
            : "",
          shadingLanguageVersion:
            (null === (a = c.getParameter(c.SHADING_LANGUAGE_VERSION)) ||
            void 0 === a
              ? void 0
              : a.toString()) || "",
        };
      },
      webGlExtensions: function (e) {
        var t = ke(e.cache);
        if (!t) return -1;
        if (!Ie(t)) return -2;
        var n = t.getSupportedExtensions(),
          r = t.getContextAttributes(),
          o = [],
          i = [],
          a = [],
          c = [],
          u = [];
        if (r)
          for (var s = 0, l = Object.keys(r); s < l.length; s++) {
            var d = l[s];
            i.push("".concat(d, "=").concat(r[d]));
          }
        for (var f = 0, h = xe(t); f < h.length; f++) {
          var v = t[(k = h[f])];
          a.push(
            ""
              .concat(k, "=")
              .concat(v)
              .concat(pe.has(v) ? "=".concat(t.getParameter(v)) : "")
          );
        }
        if (n)
          for (var m = 0, p = n; m < p.length; m++) {
            var y = p[m];
            if (
              !(
                (y === we && Ve()) ||
                ("WEBGL_polygon_mode" === y && (M() || _()))
              )
            ) {
              var g = t.getExtension(y);
              if (g)
                for (var b = 0, w = xe(g); b < w.length; b++) {
                  var k;
                  (v = g[(k = w[b])]),
                    c.push(
                      ""
                        .concat(k, "=")
                        .concat(v)
                        .concat(ye.has(v) ? "=".concat(t.getParameter(v)) : "")
                    );
                }
              else o.push(y);
            }
          }
        for (var L = 0, x = ge; L < x.length; L++)
          for (var S = x[L], V = 0, I = be; V < I.length; V++) {
            var W = I[V],
              Z = Le(t, S, W);
            u.push("".concat(S, ".").concat(W, "=").concat(Z.join(",")));
          }
        return (
          c.sort(),
          a.sort(),
          {
            contextAttributes: i,
            parameters: a,
            shaderPrecisions: u,
            extensions: n,
            extensionParameters: c,
            unsupportedExtensions: o,
          }
        );
      },
    };
    function Ze(e) {
      return JSON.stringify(
        e,
        function (e, n) {
          return n instanceof Error
            ? t(
                {
                  name: (r = n).name,
                  message: r.message,
                  stack:
                    null === (o = r.stack) || void 0 === o
                      ? void 0
                      : o.split("\n"),
                },
                r
              )
            : n;
          var r, o;
        },
        2
      );
    }
    function Fe(e) {
      return P(
        (function (e) {
          for (
            var t = "", n = 0, r = Object.keys(e).sort();
            n < r.length;
            n++
          ) {
            var o = r[n],
              i = e[o],
              a = "error" in i ? "error" : JSON.stringify(i.value);
            t += ""
              .concat(t ? "|" : "")
              .concat(o.replace(/([:|\\])/g, "\\$1"), ":")
              .concat(a);
          }
          return t;
        })(e)
      );
    }
    function Pe(e) {
      return (
        void 0 === e && (e = 50),
        (function (e, t) {
          void 0 === t && (t = 1 / 0);
          var n = window.requestIdleCallback;
          return n
            ? new Promise(function (e) {
                return n.call(
                  window,
                  function () {
                    return e();
                  },
                  { timeout: t }
                );
              })
            : c(Math.min(e, t));
        })(e, 2 * e)
      );
    }
    function Ee(e, t) {
      var o = Date.now();
      return {
        get: function (i) {
          return n(this, void 0, void 0, function () {
            var n, c, u;
            return r(this, function (r) {
              switch (r.label) {
                case 0:
                  return (n = Date.now()), [4, e()];
                case 1:
                  return (
                    (c = r.sent()),
                    (u = (function (e) {
                      var t,
                        n = (function (e) {
                          var t = (function (e) {
                              if (T()) return 0.4;
                              if (_()) return !C() || (X() && Y()) ? 0.3 : 0.5;
                              var t =
                                "value" in e.platform ? e.platform.value : "";
                              return /^Win/.test(t)
                                ? 0.6
                                : /^Mac/.test(t)
                                ? 0.5
                                : 0.7;
                            })(e),
                            n = (function (e) {
                              return p(0.99 + 0.01 * e, 1e-4);
                            })(t);
                          return {
                            score: t,
                            comment:
                              "$ if upgrade to Pro: https://fpjs.dev/pro".replace(
                                /\$/g,
                                "".concat(n)
                              ),
                          };
                        })(e);
                      return {
                        get visitorId() {
                          return void 0 === t && (t = Fe(this.components)), t;
                        },
                        set visitorId(e) {
                          t = e;
                        },
                        confidence: n,
                        components: e,
                        version: a,
                      };
                    })(c)),
                    (t || (null == i ? void 0 : i.debug)) &&
                      console.log(
                        "Copy the text below to get the debug data:\n\n```\nversion: "
                          .concat(u.version, "\nuserAgent: ")
                          .concat(
                            navigator.userAgent,
                            "\ntimeBetweenLoadAndGet: "
                          )
                          .concat(n - o, "\nvisitorId: ")
                          .concat(u.visitorId, "\ncomponents: ")
                          .concat(Ze(c), "\n```")
                      ),
                    [2, u]
                  );
              }
            });
          });
        },
      };
    }
    function Ge(e) {
      var t;
      return (
        void 0 === e && (e = {}),
        n(this, void 0, void 0, function () {
          var n, o, i;
          return r(this, function (r) {
            switch (r.label) {
              case 0:
                return (
                  (null === (t = e.monitoring) || void 0 === t || t) &&
                    (function () {
                      if (!(window.__fpjs_d_m || Math.random() >= 0.001))
                        try {
                          var e = new XMLHttpRequest();
                          e.open(
                            "get",
                            "https://m1.openfpcdn.io/fingerprintjs/v".concat(
                              a,
                              "/npm-monitoring"
                            ),
                            !0
                          ),
                            e.send();
                        } catch (e) {
                          console.error(e);
                        }
                    })(),
                  (n = e.delayFallback),
                  (o = e.debug),
                  [4, Pe(n)]
                );
              case 1:
                return (
                  r.sent(),
                  (i = (function (e) {
                    return G(We, e, []);
                  })({ cache: {}, debug: o })),
                  [2, Ee(i, o)]
                );
            }
          });
        })
      );
    }
    var je = { load: Ge, hashComponents: Fe, componentsToDebugString: Ze },
      Re = P;
    return (
      (e.componentsToDebugString = Ze),
      (e.default = je),
      (e.getFullscreenElement = N),
      (e.getUnstableAudioFingerprint = D),
      (e.getUnstableCanvasFingerprint = $),
      (e.getUnstableScreenFrame = ne),
      (e.getUnstableScreenResolution = te),
      (e.getWebGLContext = ke),
      (e.hashComponents = Fe),
      (e.isAndroid = T),
      (e.isChromium = M),
      (e.isDesktopWebKit = C),
      (e.isEdgeHTML = R),
      (e.isGecko = A),
      (e.isSamsungInternet = H),
      (e.isTrident = j),
      (e.isWebKit = _),
      (e.load = Ge),
      (e.loadSources = G),
      (e.murmurX64Hash128 = Re),
      (e.prepareForSources = Pe),
      (e.sources = We),
      (e.transformSource = function (e, t) {
        var n = function (e) {
          return E(e)
            ? t(e)
            : function () {
                var n = e();
                return u(n) ? n.then(t) : t(n);
              };
        };
        return function (t) {
          var r = e(t);
          return u(r) ? r.then(n) : n(r);
        };
      }),
      (e.withIframe = O),
      Object.defineProperty(e, "__esModule", { value: !0 }),
      e
    );
  })({});
  !(function () {
    var t = document.currentScript;
    if (t) {
      var o = new URL(t.src),
        i = o.searchParams.get("key"),
        c = o.searchParams.get("tid");
      if (i && c) {
        var u = "http://localhost:3000/api",
          s = (function () {
            return (
              (o = function e() {
                !(function (e, t) {
                  if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function");
                })(this, e);
                var n = new URL(t.src);
                (this.storageKey = "anonymous_visitor_id"),
                  (this.storage_visitor_data = "storage_visitor_data"),
                  (this.apiKey = n.searchParams.get("key")),
                  (this.tenantId = n.searchParams.get("tid")),
                  (this.isValidated = !1),
                  (this.visitorData = null),
                  (this.anonymousId = null),
                  this.apiKey && this.tenantId
                    ? this.validateAndInit()
                    : console.error(
                        "Visitor Tracker: API key and tenant ID are required"
                      );
              }),
              (i = [
                {
                  key: "validateAndInit",
                  value:
                    ((h = n(
                      e().mark(function t() {
                        return e().wrap(
                          function (e) {
                            for (;;)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  return (
                                    (e.prev = 0),
                                    (e.next = 3),
                                    this.validateApiKey()
                                  );
                                case 3:
                                  if (e.sent) {
                                    e.next = 6;
                                    break;
                                  }
                                  return e.abrupt("return");
                                case 6:
                                  return (
                                    (this.isValidated = !0),
                                    (e.next = 9),
                                    this.init()
                                  );
                                case 9:
                                  e.next = 14;
                                  break;
                                case 11:
                                  (e.prev = 11),
                                    (e.t0 = e.catch(0)),
                                    console.error(
                                      "Visitor Tracker: Validation failed",
                                      e.t0
                                    );
                                case 14:
                                case "end":
                                  return e.stop();
                              }
                          },
                          t,
                          this,
                          [[0, 11]]
                        );
                      })
                    )),
                    function () {
                      return h.apply(this, arguments);
                    }),
                },
                {
                  key: "validateApiKey",
                  value:
                    ((f = n(
                      e().mark(function t() {
                        var n, r;
                        return e().wrap(
                          function (e) {
                            for (;;)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  return (
                                    (e.prev = 0),
                                    (e.next = 3),
                                    fetch("".concat(u, "/verify-api-key"), {
                                      method: "POST",
                                      headers: {
                                        "Content-Type": "application/json",
                                        "X-API-KEY": this.apiKey,
                                      },
                                      body: JSON.stringify({
                                        apiKey: this.apiKey,
                                        tenant_id: this.tenantId,
                                      }),
                                    })
                                  );
                                case 3:
                                  if (
                                    ((n = e.sent),
                                    console.log(
                                      "🚀 ~ ValidatedVisitorTracker ~ validateApiKey ~ response:",
                                      n
                                    ),
                                    n.ok)
                                  ) {
                                    e.next = 7;
                                    break;
                                  }
                                  return e.abrupt("return", !1);
                                case 7:
                                  return (e.next = 9), n.json();
                                case 9:
                                  return (
                                    (r = e.sent),
                                    e.abrupt("return", !0 === r.data.valid)
                                  );
                                case 13:
                                  return (
                                    (e.prev = 13),
                                    (e.t0 = e.catch(0)),
                                    console.error(
                                      "API key validation failed:",
                                      e.t0
                                    ),
                                    e.abrupt("return", !1)
                                  );
                                case 17:
                                case "end":
                                  return e.stop();
                              }
                          },
                          t,
                          this,
                          [[0, 13]]
                        );
                      })
                    )),
                    function () {
                      return f.apply(this, arguments);
                    }),
                },
                {
                  key: "generateDeviceInfo",
                  value:
                    ((d = n(
                      e().mark(function t() {
                        var n, r, o;
                        return e().wrap(
                          function (e) {
                            for (;;)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  return (
                                    (n = {
                                      width: window.screen.width,
                                      height: window.screen.height,
                                    }),
                                    (r = navigator.userAgent.toLowerCase()),
                                    (o =
                                      /mobile|android|iphone|ipad|ipod/i.test(
                                        r
                                      )),
                                    e.abrupt("return", {
                                      type: o ? "mobile" : "desktop",
                                      model: this.parseDeviceModel(r),
                                      screen: n,
                                    })
                                  );
                                case 4:
                                case "end":
                                  return e.stop();
                              }
                          },
                          t,
                          this
                        );
                      })
                    )),
                    function () {
                      return d.apply(this, arguments);
                    }),
                },
                {
                  key: "getBrowserInfo",
                  value: function () {
                    var e = navigator.userAgent;
                    return {
                      name: this.getBrowserName(e),
                      version: this.getBrowserVersion(e),
                      language: navigator.language,
                      userAgent: e,
                    };
                  },
                },
                {
                  key: "getBrowserName",
                  value: function (e) {
                    return e.includes("Chrome")
                      ? "Chrome"
                      : e.includes("Firefox")
                      ? "Firefox"
                      : e.includes("Safari")
                      ? "Safari"
                      : e.includes("Edge")
                      ? "Edge"
                      : "Unknown";
                  },
                },
                {
                  key: "getBrowserVersion",
                  value: function (e) {
                    var t = e.match(
                      /(chrome|firefox|safari|edge)\/(\d+(\.\d+)*)/i
                    );
                    return t ? t[2] : "Unknown";
                  },
                },
                {
                  key: "parseDeviceModel",
                  value: function (e) {
                    if (e.includes("iphone")) {
                      var t = e.match(/iphone\s*(?:OS\s*)?(\d+)/i);
                      return "iPhone ".concat(t ? t[1] : "");
                    }
                    return e.includes("android") ? "Android Device" : "Desktop";
                  },
                },
                {
                  key: "getStoredId",
                  value: function () {
                    var e = localStorage.getItem(this.storageKey);
                    if (e) return e;
                    var t = sessionStorage.getItem(this.storageKey);
                    return t
                      ? (localStorage.setItem(this.storageKey, t), t)
                      : null;
                  },
                },
                {
                  key: "generateNewId",
                  value:
                    ((l = n(
                      e().mark(function t() {
                        var n, r, o;
                        return e().wrap(
                          function (e) {
                            for (;;)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  return (
                                    (e.prev = 0),
                                    (n = a.load({
                                      components: {
                                        screen: {
                                          width: window.screen.width,
                                          height: window.screen.height,
                                          depth: window.screen.colorDepth,
                                          devicePixelRatio:
                                            window.devicePixelRatio,
                                        },
                                      },
                                    })),
                                    (e.next = 4),
                                    n
                                  );
                                case 4:
                                  return (r = e.sent), (e.next = 7), r.get();
                                case 7:
                                  if (null == (o = e.sent) || !o.visitorId) {
                                    e.next = 10;
                                    break;
                                  }
                                  return e.abrupt("return", o.visitorId);
                                case 10:
                                  e.next = 16;
                                  break;
                                case 12:
                                  return (
                                    (e.prev = 12),
                                    (e.t0 = e.catch(0)),
                                    console.warn(
                                      "Fingerprinting failed, using fallback ID generation",
                                      e.t0
                                    ),
                                    e.abrupt(
                                      "return",
                                      this.generateFallbackId()
                                    )
                                  );
                                case 16:
                                case "end":
                                  return e.stop();
                              }
                          },
                          t,
                          this,
                          [[0, 12]]
                        );
                      })
                    )),
                    function () {
                      return l.apply(this, arguments);
                    }),
                },
                {
                  key: "storeId",
                  value: function (e) {
                    try {
                      localStorage.setItem(this.storageKey, e),
                        sessionStorage.setItem(this.storageKey, e);
                    } catch (e) {
                      console.warn("Failed to store anonymous ID", e);
                    }
                  },
                },
                {
                  key: "removeId",
                  value: function () {
                    try {
                      localStorage.removeItem(this.storageKey),
                        sessionStorage.removeItem(this.storageKey);
                    } catch (e) {
                      console.warn("Failed to store anonymous ID", e);
                    }
                  },
                },
                {
                  key: "registerVisitor",
                  value:
                    ((s = n(
                      e().mark(function t(n) {
                        var r, o, i, a;
                        return e().wrap(
                          function (e) {
                            for (;;)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  if (
                                    null ===
                                      (r = JSON.parse(
                                        localStorage.getItem(
                                          this.storage_visitor_data
                                        )
                                      )) ||
                                    void 0 === r ||
                                    !r.id
                                  ) {
                                    e.next = 2;
                                    break;
                                  }
                                  return e.abrupt(
                                    "return",
                                    JSON.parse(
                                      localStorage.getItem(
                                        this.storage_visitor_data
                                      )
                                    )
                                  );
                                case 2:
                                  return (
                                    (e.t0 = n),
                                    (e.next = 5),
                                    this.generateDeviceInfo()
                                  );
                                case 5:
                                  return (
                                    (e.t1 = e.sent),
                                    (e.t2 = this.getBrowserInfo()),
                                    (o = {
                                      anonymous_id: e.t0,
                                      user_id: null,
                                      device_info: e.t1,
                                      browser_info: e.t2,
                                    }),
                                    (e.prev = 8),
                                    (e.next = 11),
                                    fetch("".concat(u, "/visitors"), {
                                      method: "POST",
                                      headers: {
                                        "Content-Type": "application/json",
                                        "X-API-KEY": this.apiKey,
                                      },
                                      body: JSON.stringify(o),
                                    })
                                  );
                                case 11:
                                  if ((i = e.sent).ok) {
                                    e.next = 15;
                                    break;
                                  }
                                  throw (
                                    (this.removeId(),
                                    new Error(
                                      "API call failed: ".concat(i.status)
                                    ))
                                  );
                                case 15:
                                  return (e.next = 17), i.json();
                                case 17:
                                  return (
                                    (a = e.sent),
                                    localStorage.setItem(
                                      this.storage_visitor_data,
                                      JSON.stringify(a)
                                    ),
                                    sessionStorage.setItem(
                                      this.storage_visitor_data,
                                      JSON.stringify(a)
                                    ),
                                    (this.visitorData = a),
                                    e.abrupt("return", a)
                                  );
                                case 24:
                                  throw (
                                    ((e.prev = 24),
                                    (e.t3 = e.catch(8)),
                                    this.removeId(),
                                    console.error(
                                      "Failed to register visitor:",
                                      e.t3
                                    ),
                                    e.t3)
                                  );
                                case 29:
                                case "end":
                                  return e.stop();
                              }
                          },
                          t,
                          this,
                          [[8, 24]]
                        );
                      })
                    )),
                    function (e) {
                      return s.apply(this, arguments);
                    }),
                },
                {
                  key: "init",
                  value:
                    ((c = n(
                      e().mark(function t() {
                        var n;
                        return e().wrap(
                          function (e) {
                            for (;;)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  if (this.isValidated) {
                                    e.next = 2;
                                    break;
                                  }
                                  return e.abrupt("return");
                                case 2:
                                  if (
                                    ((e.prev = 2),
                                    (n = this.getStoredId()),
                                    console.log(
                                      "🚀 ~ ValidatedVisitorTracker ~ init ~ anonymousId:",
                                      n
                                    ),
                                    n)
                                  ) {
                                    e.next = 12;
                                    break;
                                  }
                                  return (e.next = 8), this.generateNewId();
                                case 8:
                                  return (
                                    (n = e.sent),
                                    this.storeId(n),
                                    (e.next = 12),
                                    this.registerVisitor(n)
                                  );
                                case 12:
                                  if (
                                    ((this.anonymousId = n),
                                    (this.isInitialized = !0),
                                    this.anonymousId)
                                  ) {
                                    e.next = 16;
                                    break;
                                  }
                                  return e.abrupt("return");
                                case 16:
                                  e.next = 21;
                                  break;
                                case 18:
                                  (e.prev = 18),
                                    (e.t0 = e.catch(2)),
                                    console.error(
                                      "Tracking initialization failed:",
                                      e.t0
                                    );
                                case 21:
                                case "end":
                                  return e.stop();
                              }
                          },
                          t,
                          this,
                          [[2, 18]]
                        );
                      })
                    )),
                    function () {
                      return c.apply(this, arguments);
                    }),
                },
              ]),
              i && r(o.prototype, i),
              Object.defineProperty(o, "prototype", { writable: !1 }),
              o
            );
            var o, i, c, s, l, d, f, h;
          })();
        (window._visitorTracker = new s()),
          (window.updateVisitorUserId = function (e) {
            window._visitorTracker && window._visitorTracker.updateUserId(e);
          });
      } else
        console.error("Visitor Tracker: API key and tenant ID are required");
    }
  })();
})();
