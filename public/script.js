var Fingerprint2 = (function (n) {
  "use strict";
  var e = function () {
    return (
      (e =
        Object.assign ||
        function (n) {
          for (var e, t = 1, r = arguments.length; t < r; t++)
            for (var o in (e = arguments[t]))
              Object.prototype.hasOwnProperty.call(e, o) && (n[o] = e[o]);
          return n;
        }),
      e.apply(this, arguments)
    );
  };
  function t(n, e, t, r) {
    return new (t || (t = Promise))(function (o, i) {
      function a(n) {
        try {
          u(r.next(n));
        } catch (e) {
          i(e);
        }
      }
      function c(n) {
        try {
          u(r.throw(n));
        } catch (e) {
          i(e);
        }
      }
      function u(n) {
        var e;
        n.done
          ? o(n.value)
          : ((e = n.value),
            e instanceof t
              ? e
              : new t(function (n) {
                  n(e);
                })).then(a, c);
      }
      u((r = r.apply(n, e || [])).next());
    });
  }
  function r(n, e) {
    var t,
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
          if (t) throw new TypeError("Generator is already executing.");
          for (; i && ((i = 0), c[0] && (a = 0)), a; )
            try {
              if (
                ((t = 1),
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
                    !((o = a.trys),
                    (o = o.length > 0 && o[o.length - 1]) ||
                      (6 !== c[0] && 2 !== c[0]))
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
              c = e.call(n, a);
            } catch (u) {
              (c = [6, u]), (r = 0);
            } finally {
              t = o = 0;
            }
          if (5 & c[0]) throw c[1];
          return { value: c[0] ? c[1] : void 0, done: !0 };
        })([c, u]);
      };
    }
  }
  function o(n, e, t) {
    if (t || 2 === arguments.length)
      for (var r, o = 0, i = e.length; o < i; o++)
        (!r && o in e) ||
          (r || (r = Array.prototype.slice.call(e, 0, o)), (r[o] = e[o]));
    return n.concat(r || Array.prototype.slice.call(e));
  }
  var i = "4.5.1";
  function a(n, e) {
    return new Promise(function (t) {
      return setTimeout(t, n, e);
    });
  }
  function c(n) {
    return !!n && "function" == typeof n.then;
  }
  function u(n, e) {
    try {
      var t = n();
      c(t)
        ? t.then(
            function (n) {
              return e(!0, n);
            },
            function (n) {
              return e(!1, n);
            }
          )
        : e(!0, t);
    } catch (r) {
      e(!1, r);
    }
  }
  function s(n, e, o) {
    return (
      void 0 === o && (o = 16),
      t(this, void 0, void 0, function () {
        var t, i, a, c;
        return r(this, function (r) {
          switch (r.label) {
            case 0:
              (t = Array(n.length)), (i = Date.now()), (a = 0), (r.label = 1);
            case 1:
              return a < n.length
                ? ((t[a] = e(n[a], a)),
                  (c = Date.now()) >= i + o
                    ? ((i = c),
                      [
                        4,
                        new Promise(function (n) {
                          var e = new MessageChannel();
                          (e.port1.onmessage = function () {
                            return n();
                          }),
                            e.port2.postMessage(null);
                        }),
                      ])
                    : [3, 3])
                : [3, 4];
            case 2:
              r.sent(), (r.label = 3);
            case 3:
              return ++a, [3, 1];
            case 4:
              return [2, t];
          }
        });
      })
    );
  }
  function l(n) {
    return n.then(void 0, function () {}), n;
  }
  function d(n) {
    return parseInt(n);
  }
  function f(n) {
    return parseFloat(n);
  }
  function m(n, e) {
    return "number" == typeof n && isNaN(n) ? e : n;
  }
  function v(n) {
    return n.reduce(function (n, e) {
      return n + (e ? 1 : 0);
    }, 0);
  }
  function h(n, e) {
    if ((void 0 === e && (e = 1), Math.abs(e) >= 1))
      return Math.round(n / e) * e;
    var t = 1 / e;
    return Math.round(n * t) / t;
  }
  function p(n, e) {
    var t = n[0] >>> 16,
      r = 65535 & n[0],
      o = n[1] >>> 16,
      i = 65535 & n[1],
      a = e[0] >>> 16,
      c = 65535 & e[0],
      u = e[1] >>> 16,
      s = 0,
      l = 0,
      d = 0,
      f = 0;
    (d += (f += i + (65535 & e[1])) >>> 16),
      (f &= 65535),
      (l += (d += o + u) >>> 16),
      (d &= 65535),
      (s += (l += r + c) >>> 16),
      (l &= 65535),
      (s += t + a),
      (s &= 65535),
      (n[0] = (s << 16) | l),
      (n[1] = (d << 16) | f);
  }
  function b(n, e) {
    var t = n[0] >>> 16,
      r = 65535 & n[0],
      o = n[1] >>> 16,
      i = 65535 & n[1],
      a = e[0] >>> 16,
      c = 65535 & e[0],
      u = e[1] >>> 16,
      s = 65535 & e[1],
      l = 0,
      d = 0,
      f = 0,
      m = 0;
    (f += (m += i * s) >>> 16),
      (m &= 65535),
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
      (l += t * s + r * u + o * c + i * a),
      (l &= 65535),
      (n[0] = (l << 16) | d),
      (n[1] = (f << 16) | m);
  }
  function y(n, e) {
    var t = n[0];
    32 === (e %= 64)
      ? ((n[0] = n[1]), (n[1] = t))
      : e < 32
      ? ((n[0] = (t << e) | (n[1] >>> (32 - e))),
        (n[1] = (n[1] << e) | (t >>> (32 - e))))
      : ((e -= 32),
        (n[0] = (n[1] << e) | (t >>> (32 - e))),
        (n[1] = (t << e) | (n[1] >>> (32 - e))));
  }
  function g(n, e) {
    0 !== (e %= 64) &&
      (e < 32
        ? ((n[0] = n[1] >>> (32 - e)), (n[1] = n[1] << e))
        : ((n[0] = n[1] << (e - 32)), (n[1] = 0)));
  }
  function w(n, e) {
    (n[0] ^= e[0]), (n[1] ^= e[1]);
  }
  var L = [4283543511, 3981806797],
    k = [3301882366, 444984403];
  function V(n) {
    var e = [0, n[0] >>> 1];
    w(n, e),
      b(n, L),
      (e[1] = n[0] >>> 1),
      w(n, e),
      b(n, k),
      (e[1] = n[0] >>> 1),
      w(n, e);
  }
  var S = [2277735313, 289559509],
    W = [1291169091, 658871167],
    x = [0, 5],
    Z = [0, 1390208809],
    M = [0, 944331445];
  function R(n, e) {
    var t = (function (n) {
      for (var e = new Uint8Array(n.length), t = 0; t < n.length; t++) {
        var r = n.charCodeAt(t);
        if (r > 127) return new TextEncoder().encode(n);
        e[t] = r;
      }
      return e;
    })(n);
    e = e || 0;
    var r,
      o = [0, t.length],
      i = o[1] % 16,
      a = o[1] - i,
      c = [0, e],
      u = [0, e],
      s = [0, 0],
      l = [0, 0];
    for (r = 0; r < a; r += 16)
      (s[0] = t[r + 4] | (t[r + 5] << 8) | (t[r + 6] << 16) | (t[r + 7] << 24)),
        (s[1] = t[r] | (t[r + 1] << 8) | (t[r + 2] << 16) | (t[r + 3] << 24)),
        (l[0] =
          t[r + 12] | (t[r + 13] << 8) | (t[r + 14] << 16) | (t[r + 15] << 24)),
        (l[1] =
          t[r + 8] | (t[r + 9] << 8) | (t[r + 10] << 16) | (t[r + 11] << 24)),
        b(s, S),
        y(s, 31),
        b(s, W),
        w(c, s),
        y(c, 27),
        p(c, u),
        b(c, x),
        p(c, Z),
        b(l, W),
        y(l, 33),
        b(l, S),
        w(u, l),
        y(u, 31),
        p(u, c),
        b(u, x),
        p(u, M);
    (s[0] = 0), (s[1] = 0), (l[0] = 0), (l[1] = 0);
    var d = [0, 0];
    switch (i) {
      case 15:
        (d[1] = t[r + 14]), g(d, 48), w(l, d);
      case 14:
        (d[1] = t[r + 13]), g(d, 40), w(l, d);
      case 13:
        (d[1] = t[r + 12]), g(d, 32), w(l, d);
      case 12:
        (d[1] = t[r + 11]), g(d, 24), w(l, d);
      case 11:
        (d[1] = t[r + 10]), g(d, 16), w(l, d);
      case 10:
        (d[1] = t[r + 9]), g(d, 8), w(l, d);
      case 9:
        (d[1] = t[r + 8]), w(l, d), b(l, W), y(l, 33), b(l, S), w(u, l);
      case 8:
        (d[1] = t[r + 7]), g(d, 56), w(s, d);
      case 7:
        (d[1] = t[r + 6]), g(d, 48), w(s, d);
      case 6:
        (d[1] = t[r + 5]), g(d, 40), w(s, d);
      case 5:
        (d[1] = t[r + 4]), g(d, 32), w(s, d);
      case 4:
        (d[1] = t[r + 3]), g(d, 24), w(s, d);
      case 3:
        (d[1] = t[r + 2]), g(d, 16), w(s, d);
      case 2:
        (d[1] = t[r + 1]), g(d, 8), w(s, d);
      case 1:
        (d[1] = t[r]), w(s, d), b(s, S), y(s, 31), b(s, W), w(c, s);
    }
    return (
      w(c, o),
      w(u, o),
      p(c, u),
      p(u, c),
      V(c),
      V(u),
      p(c, u),
      p(u, c),
      ("00000000" + (c[0] >>> 0).toString(16)).slice(-8) +
        ("00000000" + (c[1] >>> 0).toString(16)).slice(-8) +
        ("00000000" + (u[0] >>> 0).toString(16)).slice(-8) +
        ("00000000" + (u[1] >>> 0).toString(16)).slice(-8)
    );
  }
  function G(n) {
    return "function" != typeof n;
  }
  function F(n, e, o, i) {
    var a = Object.keys(n).filter(function (n) {
        return !(function (n, e) {
          for (var t = 0, r = n.length; t < r; ++t) if (n[t] === e) return !0;
          return !1;
        })(o, n);
      }),
      c = l(
        s(
          a,
          function (t) {
            return (function (n, e) {
              var t = l(
                new Promise(function (t) {
                  var r = Date.now();
                  u(n.bind(null, e), function () {
                    for (var n = [], e = 0; e < arguments.length; e++)
                      n[e] = arguments[e];
                    var o = Date.now() - r;
                    if (!n[0])
                      return t(function () {
                        return { error: n[1], duration: o };
                      });
                    var i = n[1];
                    if (G(i))
                      return t(function () {
                        return { value: i, duration: o };
                      });
                    t(function () {
                      return new Promise(function (n) {
                        var e = Date.now();
                        u(i, function () {
                          for (var t = [], r = 0; r < arguments.length; r++)
                            t[r] = arguments[r];
                          var i = o + Date.now() - e;
                          if (!t[0]) return n({ error: t[1], duration: i });
                          n({ value: t[1], duration: i });
                        });
                      });
                    });
                  });
                })
              );
              return function () {
                return t.then(function (n) {
                  return n();
                });
              };
            })(n[t], e);
          },
          i
        )
      );
    return function () {
      return t(this, void 0, void 0, function () {
        var n, e, t, o;
        return r(this, function (r) {
          switch (r.label) {
            case 0:
              return [4, c];
            case 1:
              return [
                4,
                s(
                  r.sent(),
                  function (n) {
                    return l(n());
                  },
                  i
                ),
              ];
            case 2:
              return (n = r.sent()), [4, Promise.all(n)];
            case 3:
              for (e = r.sent(), t = {}, o = 0; o < a.length; ++o)
                t[a[o]] = e[o];
              return [2, t];
          }
        });
      });
    };
  }
  function I() {
    var n = window,
      e = navigator;
    return (
      v([
        "MSCSSMatrix" in n,
        "msSetImmediate" in n,
        "msIndexedDB" in n,
        "msMaxTouchPoints" in e,
        "msPointerEnabled" in e,
      ]) >= 4
    );
  }
  function Y() {
    var n = window,
      e = navigator;
    return (
      v([
        "msWriteProfilerMark" in n,
        "MSStream" in n,
        "msLaunchUri" in e,
        "msSaveBlob" in e,
      ]) >= 3 && !I()
    );
  }
  function j() {
    var n = window,
      e = navigator;
    return (
      v([
        "webkitPersistentStorage" in e,
        "webkitTemporaryStorage" in e,
        0 === e.vendor.indexOf("Google"),
        "webkitResolveLocalFileSystemURL" in n,
        "BatteryManager" in n,
        "webkitMediaStream" in n,
        "webkitSpeechGrammar" in n,
      ]) >= 5
    );
  }
  function C() {
    var n = window;
    return (
      v([
        "ApplePayError" in n,
        "CSSPrimitiveValue" in n,
        "Counter" in n,
        0 === navigator.vendor.indexOf("Apple"),
        "RGBColor" in n,
        "WebKitMediaKeys" in n,
      ]) >= 4
    );
  }
  function X() {
    var n = window,
      e = n.HTMLElement,
      t = n.Document;
    return (
      v([
        "safari" in n,
        !("ongestureend" in n),
        !("TouchEvent" in n),
        !("orientation" in n),
        e && !("autocapitalize" in e.prototype),
        t && "pointerLockElement" in t.prototype,
      ]) >= 4
    );
  }
  function P() {
    var n,
      e = window;
    return (
      (n = e.print),
      /^function\s.*?\{\s*\[native code]\s*}$/.test(String(n)) &&
        "[object WebPageNamespace]" === String(e.browser)
    );
  }
  function E() {
    var n,
      e,
      t = window;
    return (
      v([
        "buildID" in navigator,
        "MozAppearance" in
          (null !==
            (e =
              null === (n = document.documentElement) || void 0 === n
                ? void 0
                : n.style) && void 0 !== e
            ? e
            : {}),
        "onmozfullscreenchange" in t,
        "mozInnerScreenX" in t,
        "CSSMozDocumentRule" in t,
        "CanvasCaptureMediaStream" in t,
      ]) >= 4
    );
  }
  function H() {
    var n = window,
      e = navigator,
      t = n.CSS,
      r = n.HTMLButtonElement;
    return (
      v([
        !("getStorageUpdates" in e),
        r && "popover" in r.prototype,
        "CSSCounterStyleRule" in n,
        t.supports("font-size-adjust: ex-height 0.5"),
        t.supports("text-transform: full-width"),
      ]) >= 4
    );
  }
  function A() {
    var n = document;
    return (
      n.fullscreenElement ||
      n.msFullscreenElement ||
      n.mozFullScreenElement ||
      n.webkitFullscreenElement ||
      null
    );
  }
  function N() {
    var n = j(),
      e = E(),
      t = window,
      r = navigator,
      o = "connection";
    return n
      ? v([
          !("SharedWorker" in t),
          r[o] && "ontypechange" in r[o],
          !("sinkId" in new Audio()),
        ]) >= 2
      : !!e &&
          v([
            "onorientationchange" in t,
            "orientation" in t,
            /android/i.test(r.appVersion),
          ]) >= 2;
  }
  function J() {
    var n = navigator,
      e = window,
      t = Audio.prototype,
      r = e.visualViewport;
    return (
      v([
        "srLatency" in t,
        "srChannelCount" in t,
        "devicePosture" in n,
        r && "segments" in r,
        "getTextInformation" in Image.prototype,
      ]) >= 3
    );
  }
  function T() {
    var n = window,
      e = n.OfflineAudioContext || n.webkitOfflineAudioContext;
    if (!e) return -2;
    if (
      C() &&
      !X() &&
      !(function () {
        var n = window;
        return (
          v([
            "DOMRectList" in n,
            "RTCPeerConnectionIceEvent" in n,
            "SVGGeometryElement" in n,
            "ontransitioncancel" in n,
          ]) >= 3
        );
      })()
    )
      return -1;
    var t = new e(1, 5e3, 44100),
      r = t.createOscillator();
    (r.type = "triangle"), (r.frequency.value = 1e4);
    var o = t.createDynamicsCompressor();
    (o.threshold.value = -50),
      (o.knee.value = 40),
      (o.ratio.value = 12),
      (o.attack.value = 0),
      (o.release.value = 0.25),
      r.connect(o),
      o.connect(t.destination),
      r.start(0);
    var i = (function (n) {
        var e = 3,
          t = 500,
          r = 500,
          o = 5e3,
          i = function () {},
          a = new Promise(function (a, u) {
            var s = !1,
              d = 0,
              f = 0;
            n.oncomplete = function (n) {
              return a(n.renderedBuffer);
            };
            var m = function () {
                setTimeout(function () {
                  return u(_("timeout"));
                }, Math.min(r, f + o - Date.now()));
              },
              v = function () {
                try {
                  var r = n.startRendering();
                  switch ((c(r) && l(r), n.state)) {
                    case "running":
                      (f = Date.now()), s && m();
                      break;
                    case "suspended":
                      document.hidden || d++,
                        s && d >= e ? u(_("suspended")) : setTimeout(v, t);
                  }
                } catch (o) {
                  u(o);
                }
              };
            v(),
              (i = function () {
                s || ((s = !0), f > 0 && m());
              });
          });
        return [a, i];
      })(t),
      a = i[0],
      u = i[1],
      s = l(
        a.then(
          function (n) {
            return (function (n) {
              for (var e = 0, t = 0; t < n.length; ++t) e += Math.abs(n[t]);
              return e;
            })(n.getChannelData(0).subarray(4500));
          },
          function (n) {
            if ("timeout" === n.name || "suspended" === n.name) return -3;
            throw n;
          }
        )
      );
    return function () {
      return u(), s;
    };
  }
  function _(n) {
    var e = new Error(n);
    return (e.name = n), e;
  }
  function D(n, e, o) {
    var i, c, u;
    return (
      void 0 === o && (o = 50),
      t(this, void 0, void 0, function () {
        var t, s;
        return r(this, function (r) {
          switch (r.label) {
            case 0:
              (t = document), (r.label = 1);
            case 1:
              return t.body ? [3, 3] : [4, a(o)];
            case 2:
              return r.sent(), [3, 1];
            case 3:
              (s = t.createElement("iframe")), (r.label = 4);
            case 4:
              return (
                r.trys.push([4, , 10, 11]),
                [
                  4,
                  new Promise(function (n, r) {
                    var o = !1,
                      i = function () {
                        (o = !0), n();
                      };
                    (s.onload = i),
                      (s.onerror = function (n) {
                        (o = !0), r(n);
                      });
                    var a = s.style;
                    a.setProperty("display", "block", "important"),
                      (a.position = "absolute"),
                      (a.top = "0"),
                      (a.left = "0"),
                      (a.visibility = "hidden"),
                      e && "srcdoc" in s
                        ? (s.srcdoc = e)
                        : (s.src = "about:blank"),
                      t.body.appendChild(s);
                    var c = function () {
                      var n, e;
                      o ||
                        ("complete" ===
                        (null ===
                          (e =
                            null === (n = s.contentWindow) || void 0 === n
                              ? void 0
                              : n.document) || void 0 === e
                          ? void 0
                          : e.readyState)
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
                  (c =
                    null === (i = s.contentWindow) || void 0 === i
                      ? void 0
                      : i.document) || void 0 === c
                  ? void 0
                  : c.body
              )
                ? [3, 8]
                : [4, a(o)];
            case 7:
              return r.sent(), [3, 6];
            case 8:
              return [4, n(s, s.contentWindow)];
            case 9:
              return [2, r.sent()];
            case 10:
              return (
                null === (u = s.parentNode) || void 0 === u || u.removeChild(s),
                [7]
              );
            case 11:
              return [2];
          }
        });
      })
    );
  }
  function z(n) {
    for (
      var e = (function (n) {
          for (
            var e,
              t,
              r = "Unexpected syntax '".concat(n, "'"),
              o = /^\s*([a-z-]*)(.*)$/i.exec(n),
              i = o[1] || void 0,
              a = {},
              c = /([.:#][\w-]+|\[.+?\])/gi,
              u = function (n, e) {
                (a[n] = a[n] || []), a[n].push(e);
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
                    (t = null !== (e = d[4]) && void 0 !== e ? e : d[5]) &&
                    void 0 !== t
                    ? t
                    : ""
                );
                break;
              default:
                throw new Error(r);
            }
          }
          return [i, a];
        })(n),
        t = e[0],
        r = e[1],
        o = document.createElement(null != t ? t : "div"),
        i = 0,
        a = Object.keys(r);
      i < a.length;
      i++
    ) {
      var c = a[i],
        u = r[c].join(" ");
      "style" === c ? B(o.style, u) : o.setAttribute(c, u);
    }
    return o;
  }
  function B(n, e) {
    for (var t = 0, r = e.split(";"); t < r.length; t++) {
      var o = r[t],
        i = /^\s*([\w-]+)\s*:\s*(.+?)(\s*!([\w-]+))?\s*$/.exec(o);
      if (i) {
        var a = i[1],
          c = i[2],
          u = i[4];
        n.setProperty(a, c, u || "");
      }
    }
  }
  var O = ["monospace", "sans-serif", "serif"],
    U = [
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
  function Q(n) {
    var e,
      t,
      r,
      o = !1,
      i = (function () {
        var n = document.createElement("canvas");
        return (n.width = 1), (n.height = 1), [n, n.getContext("2d")];
      })(),
      a = i[0],
      c = i[1];
    return (
      !(function (n, e) {
        return !(!e || !n.toDataURL);
      })(a, c)
        ? (t = r = "unsupported")
        : ((o = (function (n) {
            return (
              n.rect(0, 0, 10, 10),
              n.rect(2, 2, 6, 6),
              !n.isPointInPath(5, 5, "evenodd")
            );
          })(c)),
          n
            ? (t = r = "skipped")
            : ((e = (function (n, e) {
                !(function (n, e) {
                  (n.width = 240),
                    (n.height = 60),
                    (e.textBaseline = "alphabetic"),
                    (e.fillStyle = "#f60"),
                    e.fillRect(100, 1, 62, 20),
                    (e.fillStyle = "#069"),
                    (e.font = '11pt "Times New Roman"');
                  var t = "Cwm fjordbank gly ".concat(
                    String.fromCharCode(55357, 56835)
                  );
                  e.fillText(t, 2, 15),
                    (e.fillStyle = "rgba(102, 204, 0, 0.2)"),
                    (e.font = "18pt Arial"),
                    e.fillText(t, 4, 45);
                })(n, e);
                var t = K(n),
                  r = K(n);
                if (t !== r) return ["unstable", "unstable"];
                !(function (n, e) {
                  (n.width = 122),
                    (n.height = 110),
                    (e.globalCompositeOperation = "multiply");
                  for (
                    var t = 0,
                      r = [
                        ["#f2f", 40, 40],
                        ["#2ff", 80, 40],
                        ["#ff2", 60, 80],
                      ];
                    t < r.length;
                    t++
                  ) {
                    var o = r[t],
                      i = o[0],
                      a = o[1],
                      c = o[2];
                    (e.fillStyle = i),
                      e.beginPath(),
                      e.arc(a, c, 40, 0, 2 * Math.PI, !0),
                      e.closePath(),
                      e.fill();
                  }
                  (e.fillStyle = "#f9c"),
                    e.arc(60, 60, 60, 0, 2 * Math.PI, !0),
                    e.arc(60, 60, 20, 0, 2 * Math.PI, !0),
                    e.fill("evenodd");
                })(n, e);
                var o = K(n);
                return [o, t];
              })(a, c)),
              (t = e[0]),
              (r = e[1]))),
      { winding: o, geometry: t, text: r }
    );
  }
  function K(n) {
    return n.toDataURL();
  }
  function q() {
    var n = screen,
      e = function (n) {
        return m(d(n), null);
      },
      t = [e(n.width), e(n.height)];
    return t.sort().reverse(), t;
  }
  var $,
    nn,
    en = 2500;
  function tn() {
    var n = this;
    return (
      (function () {
        if (void 0 === nn) {
          var n = function () {
            var e = rn();
            on(e) ? (nn = setTimeout(n, en)) : (($ = e), (nn = void 0));
          };
          n();
        }
      })(),
      function () {
        return t(n, void 0, void 0, function () {
          var n;
          return r(this, function (e) {
            switch (e.label) {
              case 0:
                return on((n = rn()))
                  ? $
                    ? [2, o([], $, !0)]
                    : A()
                    ? [
                        4,
                        ((t = document),
                        (
                          t.exitFullscreen ||
                          t.msExitFullscreen ||
                          t.mozCancelFullScreen ||
                          t.webkitExitFullscreen
                        ).call(t)),
                      ]
                    : [3, 2]
                  : [3, 2];
              case 1:
                e.sent(), (n = rn()), (e.label = 2);
              case 2:
                return on(n) || ($ = n), [2, n];
            }
            var t;
          });
        });
      }
    );
  }
  function rn() {
    var n = screen;
    return [
      m(f(n.availTop), null),
      m(f(n.width) - f(n.availWidth) - m(f(n.availLeft), 0), null),
      m(f(n.height) - f(n.availHeight) - m(f(n.availTop), 0), null),
      m(f(n.availLeft), null),
    ];
  }
  function on(n) {
    for (var e = 0; e < 4; ++e) if (n[e]) return !1;
    return !0;
  }
  function an(n) {
    var e;
    return t(this, void 0, void 0, function () {
      var t, o, i, c, u, s, l;
      return r(this, function (r) {
        switch (r.label) {
          case 0:
            for (
              t = document,
                o = t.createElement("div"),
                i = new Array(n.length),
                c = {},
                cn(o),
                l = 0;
              l < n.length;
              ++l
            )
              "DIALOG" === (u = z(n[l])).tagName && u.show(),
                cn((s = t.createElement("div"))),
                s.appendChild(u),
                o.appendChild(s),
                (i[l] = u);
            r.label = 1;
          case 1:
            return t.body ? [3, 3] : [4, a(50)];
          case 2:
            return r.sent(), [3, 1];
          case 3:
            t.body.appendChild(o);
            try {
              for (l = 0; l < n.length; ++l)
                i[l].offsetParent || (c[n[l]] = !0);
            } finally {
              null === (e = o.parentNode) || void 0 === e || e.removeChild(o);
            }
            return [2, c];
        }
      });
    });
  }
  function cn(n) {
    n.style.setProperty("visibility", "hidden", "important"),
      n.style.setProperty("display", "block", "important");
  }
  function un(n) {
    return matchMedia("(inverted-colors: ".concat(n, ")")).matches;
  }
  function sn(n) {
    return matchMedia("(forced-colors: ".concat(n, ")")).matches;
  }
  function ln(n) {
    return matchMedia("(prefers-contrast: ".concat(n, ")")).matches;
  }
  function dn(n) {
    return matchMedia("(prefers-reduced-motion: ".concat(n, ")")).matches;
  }
  function fn(n) {
    return matchMedia("(prefers-reduced-transparency: ".concat(n, ")")).matches;
  }
  function mn(n) {
    return matchMedia("(dynamic-range: ".concat(n, ")")).matches;
  }
  var vn = Math,
    hn = function () {
      return 0;
    };
  var pn = {
    default: [],
    apple: [{ font: "-apple-system-body" }],
    serif: [{ fontFamily: "serif" }],
    sans: [{ fontFamily: "sans-serif" }],
    mono: [{ fontFamily: "monospace" }],
    min: [{ fontSize: "1px" }],
    system: [{ fontFamily: "system-ui" }],
  };
  var bn = function () {
    for (var n = window; ; ) {
      var e = n.parent;
      if (!e || e === n) return !1;
      try {
        if (e.location.origin !== n.location.origin) return !0;
      } catch (t) {
        if (t instanceof Error && "SecurityError" === t.name) return !0;
        throw t;
      }
      n = e;
    }
  };
  var yn = new Set([
      10752, 2849, 2884, 2885, 2886, 2928, 2929, 2930, 2931, 2932, 2960, 2961,
      2962, 2963, 2964, 2965, 2966, 2967, 2968, 2978, 3024, 3042, 3088, 3089,
      3106, 3107, 32773, 32777, 32777, 32823, 32824, 32936, 32937, 32938, 32939,
      32968, 32969, 32970, 32971, 3317, 33170, 3333, 3379, 3386, 33901, 33902,
      34016, 34024, 34076, 3408, 3410, 3411, 3412, 3413, 3414, 3415, 34467,
      34816, 34817, 34818, 34819, 34877, 34921, 34930, 35660, 35661, 35724,
      35738, 35739, 36003, 36004, 36005, 36347, 36348, 36349, 37440, 37441,
      37443, 7936, 7937, 7938,
    ]),
    gn = new Set([
      34047, 35723, 36063, 34852, 34853, 34854, 34229, 36392, 36795, 38449,
    ]),
    wn = ["FRAGMENT_SHADER", "VERTEX_SHADER"],
    Ln = [
      "LOW_FLOAT",
      "MEDIUM_FLOAT",
      "HIGH_FLOAT",
      "LOW_INT",
      "MEDIUM_INT",
      "HIGH_INT",
    ],
    kn = "WEBGL_debug_renderer_info";
  function Vn(n) {
    if (n.webgl) return n.webgl.context;
    var e,
      t = document.createElement("canvas");
    t.addEventListener("webglCreateContextError", function () {
      return (e = void 0);
    });
    for (var r = 0, o = ["webgl", "experimental-webgl"]; r < o.length; r++) {
      var i = o[r];
      try {
        e = t.getContext(i);
      } catch (a) {}
      if (e) break;
    }
    return (n.webgl = { context: e }), e;
  }
  function Sn(n, e, t) {
    var r = n.getShaderPrecisionFormat(n[e], n[t]);
    return r ? [r.rangeMin, r.rangeMax, r.precision] : [];
  }
  function Wn(n) {
    return Object.keys(n.__proto__).filter(xn);
  }
  function xn(n) {
    return "string" == typeof n && !n.match(/[^A-Z0-9_x]/);
  }
  function Zn() {
    return E();
  }
  function Mn(n) {
    return "function" == typeof n.getParameter;
  }
  var Rn = {
    fonts: function () {
      var n = this;
      return D(function (e, o) {
        var i = o.document;
        return t(n, void 0, void 0, function () {
          var n, e, t, o, a, c, u, s, l, d, f;
          return r(this, function (r) {
            for (
              (n = i.body).style.fontSize = "48px",
                (e = i.createElement("div")).style.setProperty(
                  "visibility",
                  "hidden",
                  "important"
                ),
                t = {},
                o = {},
                a = function (n) {
                  var t = i.createElement("span"),
                    r = t.style;
                  return (
                    (r.position = "absolute"),
                    (r.top = "0"),
                    (r.left = "0"),
                    (r.fontFamily = n),
                    (t.textContent = "mmMwWLliI0O&1"),
                    e.appendChild(t),
                    t
                  );
                },
                c = function (n, e) {
                  return a("'".concat(n, "',").concat(e));
                },
                u = function () {
                  for (
                    var n = {},
                      e = function (e) {
                        n[e] = O.map(function (n) {
                          return c(e, n);
                        });
                      },
                      t = 0,
                      r = U;
                    t < r.length;
                    t++
                  ) {
                    e(r[t]);
                  }
                  return n;
                },
                s = function (n) {
                  return O.some(function (e, r) {
                    return (
                      n[r].offsetWidth !== t[e] || n[r].offsetHeight !== o[e]
                    );
                  });
                },
                l = (function () {
                  return O.map(a);
                })(),
                d = u(),
                n.appendChild(e),
                f = 0;
              f < O.length;
              f++
            )
              (t[O[f]] = l[f].offsetWidth), (o[O[f]] = l[f].offsetHeight);
            return [
              2,
              U.filter(function (n) {
                return s(d[n]);
              }),
            ];
          });
        });
      });
    },
    domBlockers: function (n) {
      var e = (void 0 === n ? {} : n).debug;
      return t(this, void 0, void 0, function () {
        var n, t, o, i, a;
        return r(this, function (r) {
          switch (r.label) {
            case 0:
              return C() || N()
                ? ((c = atob),
                  (n = {
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
                      c("YVtocmVmXj0iaHR0cHM6Ly9hcHAucmVhZHBlYWsuY29tL2FkcyJd"),
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
                      c("YVtocmVmXj0iaHR0cDovL2FkMi50cmFmZmljZ2F0ZS5uZXQvIl0="),
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
                      c("YVtocmVmXj0iaHR0cDovL2Fkc2Vydi5vbnRlay5jb20udHIvIl0="),
                      c("YVtocmVmXj0iaHR0cDovL2l6bGVuemkuY29tL2NhbXBhaWduLyJd"),
                      c("YVtocmVmXj0iaHR0cDovL3d3dy5pbnN0YWxsYWRzLm5ldC8iXQ=="),
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
                      c("LmFwcGd1aWRlLXdyYXBbb25jbGljayo9ImJjZWJvcy5jb20iXQ=="),
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
                      c("YVtocmVmKj0iZHViaXp6bGUuY29tL2FyLz91dG1fc291cmNlPSJd"),
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
                  (t = Object.keys(n)),
                  [
                    4,
                    an(
                      (a = []).concat.apply(
                        a,
                        t.map(function (e) {
                          return n[e];
                        })
                      )
                    ),
                  ])
                : [2, void 0];
            case 1:
              return (
                (o = r.sent()),
                e &&
                  (function (n, e) {
                    for (
                      var t = "DOM blockers debug:\n```",
                        r = 0,
                        o = Object.keys(n);
                      r < o.length;
                      r++
                    ) {
                      var i = o[r];
                      t += "\n".concat(i, ":");
                      for (var a = 0, c = n[i]; a < c.length; a++) {
                        var u = c[a];
                        t += "\n  ".concat(e[u] ? "🚫" : "➡️", " ").concat(u);
                      }
                    }
                    console.log("".concat(t, "\n```"));
                  })(n, o),
                (i = t.filter(function (e) {
                  var t = n[e];
                  return (
                    v(
                      t.map(function (n) {
                        return o[n];
                      })
                    ) >
                    0.6 * t.length
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
      return (function (n, e) {
        void 0 === e && (e = 4e3);
        return D(function (t, r) {
          var i = r.document,
            a = i.body,
            c = a.style;
          (c.width = "".concat(e, "px")),
            (c.webkitTextSizeAdjust = c.textSizeAdjust = "none"),
            j()
              ? (a.style.zoom = "".concat(1 / r.devicePixelRatio))
              : C() && (a.style.zoom = "reset");
          var u = i.createElement("div");
          return (
            (u.textContent = o([], Array((e / 20) | 0), !0)
              .map(function () {
                return "word";
              })
              .join(" ")),
            a.appendChild(u),
            n(i, a)
          );
        }, '<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1">');
      })(function (n, e) {
        for (
          var t = {}, r = {}, o = 0, i = Object.keys(pn);
          o < i.length;
          o++
        ) {
          var a = i[o],
            c = pn[a],
            u = c[0],
            s = void 0 === u ? {} : u,
            l = c[1],
            d = void 0 === l ? "mmMwWLliI0fiflO&1" : l,
            f = n.createElement("span");
          (f.textContent = d), (f.style.whiteSpace = "nowrap");
          for (var m = 0, v = Object.keys(s); m < v.length; m++) {
            var h = v[m],
              p = s[h];
            void 0 !== p && (f.style[h] = p);
          }
          (t[a] = f), e.append(n.createElement("br"), f);
        }
        for (var b = 0, y = Object.keys(pn); b < y.length; b++) {
          r[(a = y[b])] = t[a].getBoundingClientRect().width;
        }
        return r;
      });
    },
    audio: function () {
      return (C() && H() && P()) ||
        (j() &&
          J() &&
          ((n = window),
          (e = n.URLPattern),
          v([
            "union" in Set.prototype,
            "Iterator" in n,
            e && "hasRegExpGroups" in e.prototype,
            "RGB8" in WebGLRenderingContext.prototype,
          ]) >= 3))
        ? -4
        : T();
      var n, e;
    },
    screenFrame: function () {
      var n = this;
      if (C() && H() && P())
        return function () {
          return Promise.resolve(void 0);
        };
      var e = tn();
      return function () {
        return t(n, void 0, void 0, function () {
          var n, t;
          return r(this, function (r) {
            switch (r.label) {
              case 0:
                return [4, e()];
              case 1:
                return (
                  (n = r.sent()),
                  [
                    2,
                    [
                      (t = function (n) {
                        return null === n ? null : h(n, 10);
                      })(n[0]),
                      t(n[1]),
                      t(n[2]),
                      t(n[3]),
                    ],
                  ]
                );
            }
          });
        });
      };
    },
    canvas: function () {
      return Q(C() && H() && P());
    },
    osCpu: function () {
      return navigator.oscpu;
    },
    languages: function () {
      var n,
        e = navigator,
        t = [],
        r =
          e.language || e.userLanguage || e.browserLanguage || e.systemLanguage;
      if ((void 0 !== r && t.push([r]), Array.isArray(e.languages)))
        (j() &&
          v([
            !("MediaSettingsRange" in (n = window)),
            "RTCEncodedAudioFrame" in n,
            "" + n.Intl == "[object Intl]",
            "" + n.Reflect == "[object Reflect]",
          ]) >= 3) ||
          t.push(e.languages);
      else if ("string" == typeof e.languages) {
        var o = e.languages;
        o && t.push(o.split(","));
      }
      return t;
    },
    colorDepth: function () {
      return window.screen.colorDepth;
    },
    deviceMemory: function () {
      return m(f(navigator.deviceMemory), void 0);
    },
    screenResolution: function () {
      if (!(C() && H() && P())) return q();
    },
    hardwareConcurrency: function () {
      return m(d(navigator.hardwareConcurrency), void 0);
    },
    timezone: function () {
      var n,
        e =
          null === (n = window.Intl) || void 0 === n
            ? void 0
            : n.DateTimeFormat;
      if (e) {
        var t = new e().resolvedOptions().timeZone;
        if (t) return t;
      }
      var r,
        o =
          ((r = new Date().getFullYear()),
          -Math.max(
            f(new Date(r, 0, 1).getTimezoneOffset()),
            f(new Date(r, 6, 1).getTimezoneOffset())
          ));
      return "UTC".concat(o >= 0 ? "+" : "").concat(o);
    },
    sessionStorage: function () {
      try {
        return !!window.sessionStorage;
      } catch (n) {
        return !0;
      }
    },
    localStorage: function () {
      try {
        return !!window.localStorage;
      } catch (n) {
        return !0;
      }
    },
    indexedDB: function () {
      if (!I() && !Y())
        try {
          return !!window.indexedDB;
        } catch (n) {
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
      var n = navigator.platform;
      return "MacIntel" === n && C() && !X()
        ? (function () {
            if ("iPad" === navigator.platform) return !0;
            var n = screen,
              e = n.width / n.height;
            return (
              v([
                "MediaSource" in window,
                !!Element.prototype.webkitRequestFullscreen,
                e > 0.65 && e < 1.53,
              ]) >= 2
            );
          })()
          ? "iPad"
          : "iPhone"
        : n;
    },
    plugins: function () {
      var n = navigator.plugins;
      if (n) {
        for (var e = [], t = 0; t < n.length; ++t) {
          var r = n[t];
          if (r) {
            for (var o = [], i = 0; i < r.length; ++i) {
              var a = r[i];
              o.push({ type: a.type, suffixes: a.suffixes });
            }
            e.push({
              name: r.name,
              description: r.description,
              mimeTypes: o,
            });
          }
        }
        return e;
      }
    },
    touchSupport: function () {
      var n,
        e = navigator,
        t = 0;
      void 0 !== e.maxTouchPoints
        ? (t = d(e.maxTouchPoints))
        : void 0 !== e.msMaxTouchPoints && (t = e.msMaxTouchPoints);
      try {
        document.createEvent("TouchEvent"), (n = !0);
      } catch (r) {
        n = !1;
      }
      return {
        maxTouchPoints: t,
        touchEvent: n,
        touchStart: "ontouchstart" in window,
      };
    },
    vendor: function () {
      return navigator.vendor || "";
    },
    vendorFlavors: function () {
      for (
        var n = [],
          e = 0,
          t = [
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
        e < t.length;
        e++
      ) {
        var r = t[e],
          o = window[r];
        o && "object" == typeof o && n.push(r);
      }
      return n.sort();
    },
    cookiesEnabled: function () {
      var n = document;
      try {
        n.cookie = "cookietest=1; SameSite=Strict;";
        var e = -1 !== n.cookie.indexOf("cookietest=");
        return (
          (n.cookie =
            "cookietest=1; SameSite=Strict; expires=Thu, 01-Jan-1970 00:00:01 GMT"),
          e
        );
      } catch (t) {
        return !1;
      }
    },
    colorGamut: function () {
      for (var n = 0, e = ["rec2020", "p3", "srgb"]; n < e.length; n++) {
        var t = e[n];
        if (matchMedia("(color-gamut: ".concat(t, ")")).matches) return t;
      }
    },
    invertedColors: function () {
      return !!un("inverted") || (!un("none") && void 0);
    },
    forcedColors: function () {
      return !!sn("active") || (!sn("none") && void 0);
    },
    monochrome: function () {
      if (matchMedia("(min-monochrome: 0)").matches) {
        for (var n = 0; n <= 100; ++n)
          if (matchMedia("(max-monochrome: ".concat(n, ")")).matches) return n;
        throw new Error("Too high value");
      }
    },
    contrast: function () {
      return ln("no-preference")
        ? 0
        : ln("high") || ln("more")
        ? 1
        : ln("low") || ln("less")
        ? -1
        : ln("forced")
        ? 10
        : void 0;
    },
    reducedMotion: function () {
      return !!dn("reduce") || (!dn("no-preference") && void 0);
    },
    reducedTransparency: function () {
      return !!fn("reduce") || (!fn("no-preference") && void 0);
    },
    hdr: function () {
      return !!mn("high") || (!mn("standard") && void 0);
    },
    math: function () {
      var n,
        e = vn.acos || hn,
        t = vn.acosh || hn,
        r = vn.asin || hn,
        o = vn.asinh || hn,
        i = vn.atanh || hn,
        a = vn.atan || hn,
        c = vn.sin || hn,
        u = vn.sinh || hn,
        s = vn.cos || hn,
        l = vn.cosh || hn,
        d = vn.tan || hn,
        f = vn.tanh || hn,
        m = vn.exp || hn,
        v = vn.expm1 || hn,
        h = vn.log1p || hn;
      return {
        acos: e(0.12312423423423424),
        acosh: t(1e308),
        acoshPf: ((n = 1e154), vn.log(n + vn.sqrt(n * n - 1))),
        asin: r(0.12312423423423424),
        asinh: o(1),
        asinhPf: (function (n) {
          return vn.log(n + vn.sqrt(n * n + 1));
        })(1),
        atanh: i(0.5),
        atanhPf: (function (n) {
          return vn.log((1 + n) / (1 - n)) / 2;
        })(0.5),
        atan: a(0.5),
        sin: c(-1e300),
        sinh: u(1),
        sinhPf: (function (n) {
          return vn.exp(n) - 1 / vn.exp(n) / 2;
        })(1),
        cos: s(10.000000000123),
        cosh: l(1),
        coshPf: (function (n) {
          return (vn.exp(n) + 1 / vn.exp(n)) / 2;
        })(1),
        tan: d(-1e300),
        tanh: f(1),
        tanhPf: (function (n) {
          return (vn.exp(2 * n) - 1) / (vn.exp(2 * n) + 1);
        })(1),
        exp: m(1),
        expm1: v(1),
        expm1Pf: (function (n) {
          return vn.exp(n) - 1;
        })(1),
        log1p: h(10),
        log1pPf: (function (n) {
          return vn.log(1 + n);
        })(10),
        powPI: (function (n) {
          return vn.pow(vn.PI, n);
        })(-100),
      };
    },
    pdfViewerEnabled: function () {
      return navigator.pdfViewerEnabled;
    },
    architecture: function () {
      var n = new Float32Array(1),
        e = new Uint8Array(n.buffer);
      return (n[0] = 1 / 0), (n[0] = n[0] - n[0]), e[3];
    },
    applePay: function () {
      var n = window.ApplePaySession;
      if ("function" != typeof (null == n ? void 0 : n.canMakePayments))
        return -1;
      if (bn()) return -3;
      try {
        return n.canMakePayments() ? 1 : 0;
      } catch (e) {
        return (function (n) {
          if (
            n instanceof Error &&
            "InvalidAccessError" === n.name &&
            /\bfrom\b.*\binsecure\b/i.test(n.message)
          )
            return -2;
          throw n;
        })(e);
      }
    },
    privateClickMeasurement: function () {
      var n,
        e = document.createElement("a"),
        t =
          null !== (n = e.attributionSourceId) && void 0 !== n
            ? n
            : e.attributionsourceid;
      return void 0 === t ? void 0 : String(t);
    },
    audioBaseLatency: function () {
      var n;
      return N() || C()
        ? window.AudioContext &&
          null !== (n = new AudioContext().baseLatency) &&
          void 0 !== n
          ? n
          : -1
        : -2;
    },
    webGlBasics: function (n) {
      var e,
        t,
        r,
        o,
        i,
        a,
        c = Vn(n.cache);
      if (!c) return -1;
      if (!Mn(c)) return -2;
      var u = Zn() ? null : c.getExtension(kn);
      return {
        version:
          (null === (e = c.getParameter(c.VERSION)) || void 0 === e
            ? void 0
            : e.toString()) || "",
        vendor:
          (null === (t = c.getParameter(c.VENDOR)) || void 0 === t
            ? void 0
            : t.toString()) || "",
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
    webGlExtensions: function (n) {
      var e = Vn(n.cache);
      if (!e) return -1;
      if (!Mn(e)) return -2;
      var t = e.getSupportedExtensions(),
        r = e.getContextAttributes(),
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
      for (var f = 0, m = Wn(e); f < m.length; f++) {
        var v = e[(L = m[f])];
        a.push(
          ""
            .concat(L, "=")
            .concat(v)
            .concat(yn.has(v) ? "=".concat(e.getParameter(v)) : "")
        );
      }
      if (t)
        for (var h = 0, p = t; h < p.length; h++) {
          var b = p[h];
          if (
            !(
              (b === kn && Zn()) ||
              ("WEBGL_polygon_mode" === b && (j() || C()))
            )
          ) {
            var y = e.getExtension(b);
            if (y)
              for (var g = 0, w = Wn(y); g < w.length; g++) {
                var L;
                v = y[(L = w[g])];
                c.push(
                  ""
                    .concat(L, "=")
                    .concat(v)
                    .concat(gn.has(v) ? "=".concat(e.getParameter(v)) : "")
                );
              }
            else o.push(b);
          }
        }
      for (var k = 0, V = wn; k < V.length; k++)
        for (var S = V[k], W = 0, x = Ln; W < x.length; W++) {
          var Z = x[W],
            M = Sn(e, S, Z);
          u.push("".concat(S, ".").concat(Z, "=").concat(M.join(",")));
        }
      return (
        c.sort(),
        a.sort(),
        {
          contextAttributes: i,
          parameters: a,
          shaderPrecisions: u,
          extensions: t,
          extensionParameters: c,
          unsupportedExtensions: o,
        }
      );
    },
  };
  var Gn = "$ if upgrade to Pro: https://fpjs.dev/pro";
  function Fn(n) {
    var e = (function (n) {
        if (N()) return 0.4;
        if (C()) return !X() || (H() && P()) ? 0.3 : 0.5;
        var e = "value" in n.platform ? n.platform.value : "";
        if (/^Win/.test(e)) return 0.6;
        if (/^Mac/.test(e)) return 0.5;
        return 0.7;
      })(n),
      t = (function (n) {
        return h(0.99 + 0.01 * n, 1e-4);
      })(e);
    return { score: e, comment: Gn.replace(/\$/g, "".concat(t)) };
  }
  function In(n) {
    return JSON.stringify(
      n,
      function (n, t) {
        return t instanceof Error
          ? e(
              {
                name: (r = t).name,
                message: r.message,
                stack:
                  null === (o = r.stack) || void 0 === o
                    ? void 0
                    : o.split("\n"),
              },
              r
            )
          : t;
        var r, o;
      },
      2
    );
  }
  function Yn(n) {
    return R(
      (function (n) {
        for (var e = "", t = 0, r = Object.keys(n).sort(); t < r.length; t++) {
          var o = r[t],
            i = n[o],
            a = "error" in i ? "error" : JSON.stringify(i.value);
          e += ""
            .concat(e ? "|" : "")
            .concat(o.replace(/([:|\\])/g, "\\$1"), ":")
            .concat(a);
        }
        return e;
      })(n)
    );
  }
  function jn(n) {
    return (
      void 0 === n && (n = 50),
      (function (n, e) {
        void 0 === e && (e = 1 / 0);
        var t = window.requestIdleCallback;
        return t
          ? new Promise(function (n) {
              return t.call(
                window,
                function () {
                  return n();
                },
                { timeout: e }
              );
            })
          : a(Math.min(n, e));
      })(n, 2 * n)
    );
  }
  function Cn(n, e) {
    var o = Date.now();
    return {
      get: function (a) {
        return t(this, void 0, void 0, function () {
          var t, c, u;
          return r(this, function (r) {
            switch (r.label) {
              case 0:
                return (t = Date.now()), [4, n()];
              case 1:
                return (
                  (c = r.sent()),
                  (u = (function (n) {
                    var e,
                      t = Fn(n);
                    return {
                      get visitorId() {
                        return void 0 === e && (e = Yn(this.components)), e;
                      },
                      set visitorId(n) {
                        e = n;
                      },
                      confidence: t,
                      components: n,
                      version: i,
                    };
                  })(c)),
                  (e || (null == a ? void 0 : a.debug)) &&
                    console.log(
                      "Copy the text below to get the debug data:\n\n```\nversion: "
                        .concat(u.version, "\nuserAgent: ")
                        .concat(
                          navigator.userAgent,
                          "\ntimeBetweenLoadAndGet: "
                        )
                        .concat(t - o, "\nvisitorId: ")
                        .concat(u.visitorId, "\ncomponents: ")
                        .concat(In(c), "\n```")
                    ),
                  [2, u]
                );
            }
          });
        });
      },
    };
  }
  function Xn(n) {
    var e;
    return (
      void 0 === n && (n = {}),
      t(this, void 0, void 0, function () {
        var t, o, a;
        return r(this, function (r) {
          switch (r.label) {
            case 0:
              return (
                (null === (e = n.monitoring) || void 0 === e || e) &&
                  (function () {
                    if (!(window.__fpjs_d_m || Math.random() >= 0.001))
                      try {
                        var n = new XMLHttpRequest();
                        n.open(
                          "get",
                          "https://m1.openfpcdn.io/fingerprintjs/v".concat(
                            i,
                            "/npm-monitoring"
                          ),
                          !0
                        ),
                          n.send();
                      } catch (e) {
                        console.error(e);
                      }
                  })(),
                (t = n.delayFallback),
                (o = n.debug),
                [4, jn(t)]
              );
            case 1:
              return (
                r.sent(),
                (a = (function (n) {
                  return F(Rn, n, []);
                })({ cache: {}, debug: o })),
                [2, Cn(a, o)]
              );
          }
        });
      })
    );
  }
  var Pn = {
      load: Xn,
      hashComponents: Yn,
      componentsToDebugString: In,
    },
    En = R;
  return (
    (n.componentsToDebugString = In),
    (n.default = Pn),
    (n.getFullscreenElement = A),
    (n.getUnstableAudioFingerprint = T),
    (n.getUnstableCanvasFingerprint = Q),
    (n.getUnstableScreenFrame = tn),
    (n.getUnstableScreenResolution = q),
    (n.getWebGLContext = Vn),
    (n.hashComponents = Yn),
    (n.isAndroid = N),
    (n.isChromium = j),
    (n.isDesktopWebKit = X),
    (n.isEdgeHTML = Y),
    (n.isGecko = E),
    (n.isSamsungInternet = J),
    (n.isTrident = I),
    (n.isWebKit = C),
    (n.load = Xn),
    (n.loadSources = F),
    (n.murmurX64Hash128 = En),
    (n.prepareForSources = jn),
    (n.sources = Rn),
    (n.transformSource = function (n, e) {
      var t = function (n) {
        return G(n)
          ? e(n)
          : function () {
              var t = n();
              return c(t) ? t.then(e) : e(t);
            };
      };
      return function (e) {
        var r = n(e);
        return c(r) ? r.then(t) : t(r);
      };
    }),
    (n.withIframe = D),
    Object.defineProperty(n, "__esModule", { value: !0 }),
    n
  );
})({});
(function () {
  // First, get current script tag to extract parameters
  const currentScript = document.currentScript;
  if (!currentScript) return;

  // Parse URL parameters from script src
  const scriptUrl = new URL(currentScript.src);
  const apiKey = scriptUrl.searchParams.get("key");
  const tenantId = scriptUrl.searchParams.get("tid");

  // Validate required parameters
  if (!apiKey || !tenantId) {
    console.error("Visitor Tracker: API key and tenant ID are required");
    return;
  }

  // Configuration
  const CONFIG = {
    apiEndpoint: "http://localhost:3000/api",
  };

  class ValidatedVisitorTracker {
    constructor() {
      const scriptUrl = new URL(currentScript.src);
      this.storageKey = "anonymous_visitor_id";
      this.storage_visitor_data = "storage_visitor_data";
      this.apiKey = scriptUrl.searchParams.get("key");
      this.tenantId = scriptUrl.searchParams.get("tid");
      this.isValidated = false;
      this.visitorData = null;
      this.anonymousId = null;

      // Validate parameters before initialization
      if (!this.apiKey || !this.tenantId) {
        console.error("Visitor Tracker: API key and tenant ID are required");
        return;
      }

      this.validateAndInit();
    }

    async validateAndInit() {
      try {
        // Validate API key and tenant ID
        const isValid = await this.validateApiKey();
        if (!isValid) {
          return;
        }

        this.isValidated = true;
        await this.init();
      } catch (error) {
        console.error("Visitor Tracker: Validation failed", error);
      }
    }
    async validateApiKey() {
      try {
        const response = await fetch(`${CONFIG.apiEndpoint}/verify-api-key`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": this.apiKey,
          },
          body: JSON.stringify({
            apiKey: this.apiKey,
            tenant_id: this.tenantId,
          }),
        });
        console.log(
          "🚀 ~ ValidatedVisitorTracker ~ validateApiKey ~ response:",
          response
        );

        if (!response.ok) {
          return false;
        }

        const result = await response.json();
        return result.data.valid === true;
      } catch (error) {
        console.error("API key validation failed:", error);
        return false;
      }
    }

    async generateDeviceInfo() {
      const screen = {
        width: window.screen.width,
        height: window.screen.height,
      };

      // Determine device type based on user agent
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /mobile|android|iphone|ipad|ipod/i.test(userAgent);

      return {
        type: isMobile ? "mobile" : "desktop",
        model: this.parseDeviceModel(userAgent),
        screen,
      };
    }

    getBrowserInfo() {
      const ua = navigator.userAgent;
      const browserInfo = {
        name: this.getBrowserName(ua),
        version: this.getBrowserVersion(ua),
        language: navigator.language,
        userAgent: ua,
      };
      return browserInfo;
    }

    getBrowserName(ua) {
      if (ua.includes("Chrome")) return "Chrome";
      if (ua.includes("Firefox")) return "Firefox";
      if (ua.includes("Safari")) return "Safari";
      if (ua.includes("Edge")) return "Edge";
      return "Unknown";
    }

    getBrowserVersion(ua) {
      const match = ua.match(/(chrome|firefox|safari|edge)\/(\d+(\.\d+)*)/i);
      return match ? match[2] : "Unknown";
    }

    parseDeviceModel(ua) {
      // Basic device model detection - expand as needed
      if (ua.includes("iphone")) {
        const match = ua.match(/iphone\s*(?:OS\s*)?(\d+)/i);
        return `iPhone ${match ? match[1] : ""}`;
      }
      if (ua.includes("android")) {
        return "Android Device";
      }
      return "Desktop";
    }

    getStoredId() {
      // Check localStorage first
      const localId = localStorage.getItem(this.storageKey);
      if (localId) return localId;

      // Fallback to sessionStorage
      const sessionId = sessionStorage.getItem(this.storageKey);
      if (sessionId) {
        // If found in session storage, also save to localStorage for persistence
        localStorage.setItem(this.storageKey, sessionId);
        return sessionId;
      }

      return null;
    }

    async generateNewId() {
      try {
        // Generate fingerprint-based ID
        const fpPromise = Fingerprint2.load({
          components: {
            screen: {
              width: window.screen.width,
              height: window.screen.height,
              depth: window.screen.colorDepth,
              devicePixelRatio: window.devicePixelRatio,
            },
          },
        });
        const fp = await fpPromise;
        const result = await fp.get();

        if (result?.visitorId) {
          return result.visitorId;
        }
      } catch (error) {
        console.warn(
          "Fingerprinting failed, using fallback ID generation",
          error
        );
        return this.generateFallbackId();
      }
    }

    storeId(id) {
      try {
        localStorage.setItem(this.storageKey, id);
        sessionStorage.setItem(this.storageKey, id);
      } catch (error) {
        console.warn("Failed to store anonymous ID", error);
      }
    }

    removeId() {
      try {
        localStorage.removeItem(this.storageKey);
        sessionStorage.removeItem(this.storageKey);
      } catch (error) {
        console.warn("Failed to store anonymous ID", error);
      }
    }

    async registerVisitor(anonymousId) {
      if (JSON.parse(localStorage.getItem(this.storage_visitor_data))?.id) {
        return JSON.parse(localStorage.getItem(this.storage_visitor_data));
      }
      const payload = {
        anonymous_id: anonymousId,
        user_id: null, // Can be updated later if user logs in
        device_info: await this.generateDeviceInfo(),
        browser_info: this.getBrowserInfo(),
      };

      try {
        const response = await fetch(`${CONFIG.apiEndpoint}/visitors`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": this.apiKey,
          },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          this.removeId();
          throw new Error(`API call failed: ${response.status}`);
        }
        const result = await response.json();
        localStorage.setItem(this.storage_visitor_data, JSON.stringify(result));
        sessionStorage.setItem(
          this.storage_visitor_data,
          JSON.stringify(result)
        );
        this.visitorData = result;
        return result;
      } catch (error) {
        this.removeId();
        console.error("Failed to register visitor:", error);
        throw error;
      }
    }

    async init() {
      if (!this.isValidated) return;

      try {
        let anonymousId = this.getStoredId();
        console.log(
          "🚀 ~ ValidatedVisitorTracker ~ init ~ anonymousId:",
          anonymousId
        );
        if (!anonymousId) {
          anonymousId = await this.generateNewId();
          this.storeId(anonymousId);
          await this.registerVisitor(anonymousId);
        }
        this.anonymousId = anonymousId;
        this.isInitialized = true;
        if (!this.anonymousId) {
          return;
        }
      } catch (error) {
        console.error("Tracking initialization failed:", error);
      }
    }
  }

  // Create global tracker instance
  window._visitorTracker = new ValidatedVisitorTracker();

  // Expose update user ID method globally
  window.updateVisitorUserId = function (userId) {
    if (window._visitorTracker) {
      window._visitorTracker.updateUserId(userId);
    }
  };
})();
