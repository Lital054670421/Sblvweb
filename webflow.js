/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline scripts may access the api using an async handler:
 *   var Webflow = Webflow || [];
 *   Webflow.push(readyFunction);
 */

(() => {
  var B_ = Object.create;
  var Jr = Object.defineProperty;
  var k_ = Object.getOwnPropertyDescriptor;
  var X_ = Object.getOwnPropertyNames;
  var H_ = Object.getPrototypeOf,
    W_ = Object.prototype.hasOwnProperty;
  var le = (e, t) => () => (e && (t = e((e = 0))), t);
  var c = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
    Re = (e, t) => {
      for (var r in t) Jr(e, r, { get: t[r], enumerable: !0 });
    },
    ws = (e, t, r, n) => {
      if ((t && typeof t == "object") || typeof t == "function")
        for (let i of X_(t))
          !W_.call(e, i) &&
            i !== r &&
            Jr(e, i, {
              get: () => t[i],
              enumerable: !(n = k_(t, i)) || n.enumerable,
            });
      return e;
    };
  var oe = (e, t, r) => (
      (r = e != null ? B_(H_(e)) : {}),
      ws(
        t || !e || !e.__esModule
          ? Jr(r, "default", { value: e, enumerable: !0 })
          : r,
        e
      )
    ),
    Ke = (e) => ws(Jr({}, "__esModule", { value: !0 }), e);
  var xs = c(() => {
    "use strict";
    (function () {
      if (typeof window > "u") return;
      let e = window.navigator.userAgent.match(/Edge\/(\d{2})\./),
        t = e ? parseInt(e[1], 10) >= 16 : !1;
      if ("objectFit" in document.documentElement.style && !t) {
        window.objectFitPolyfill = function () {
          return !1;
        };
        return;
      }
      let n = function (a) {
          let u = window.getComputedStyle(a, null),
            f = u.getPropertyValue("position"),
            p = u.getPropertyValue("overflow"),
            g = u.getPropertyValue("display");
          (!f || f === "static") && (a.style.position = "relative"),
            p !== "hidden" && (a.style.overflow = "hidden"),
            (!g || g === "inline") && (a.style.display = "block"),
            a.clientHeight === 0 && (a.style.height = "100%"),
            a.className.indexOf("object-fit-polyfill") === -1 &&
              (a.className += " object-fit-polyfill");
        },
        i = function (a) {
          let u = window.getComputedStyle(a, null),
            f = {
              "max-width": "none",
              "max-height": "none",
              "min-width": "0px",
              "min-height": "0px",
              top: "auto",
              right: "auto",
              bottom: "auto",
              left: "auto",
              "margin-top": "0px",
              "margin-right": "0px",
              "margin-bottom": "0px",
              "margin-left": "0px",
            };
          for (let p in f)
            u.getPropertyValue(p) !== f[p] && (a.style[p] = f[p]);
        },
        o = function (a) {
          let u = a.parentNode;
          n(u),
            i(a),
            (a.style.position = "absolute"),
            (a.style.height = "100%"),
            (a.style.width = "auto"),
            a.clientWidth > u.clientWidth
              ? ((a.style.top = "0"),
                (a.style.marginTop = "0"),
                (a.style.left = "50%"),
                (a.style.marginLeft = a.clientWidth / -2 + "px"))
              : ((a.style.width = "100%"),
                (a.style.height = "auto"),
                (a.style.left = "0"),
                (a.style.marginLeft = "0"),
                (a.style.top = "50%"),
                (a.style.marginTop = a.clientHeight / -2 + "px"));
        },
        s = function (a) {
          if (typeof a > "u" || a instanceof Event)
            a = document.querySelectorAll("[data-object-fit]");
          else if (a && a.nodeName) a = [a];
          else if (typeof a == "object" && a.length && a[0].nodeName) a = a;
          else return !1;
          for (let u = 0; u < a.length; u++) {
            if (!a[u].nodeName) continue;
            let f = a[u].nodeName.toLowerCase();
            if (f === "img") {
              if (t) continue;
              a[u].complete
                ? o(a[u])
                : a[u].addEventListener("load", function () {
                    o(this);
                  });
            } else
              f === "video"
                ? a[u].readyState > 0
                  ? o(a[u])
                  : a[u].addEventListener("loadedmetadata", function () {
                      o(this);
                    })
                : o(a[u]);
          }
          return !0;
        };
      document.readyState === "loading"
        ? document.addEventListener("DOMContentLoaded", s)
        : s(),
        window.addEventListener("resize", s),
        (window.objectFitPolyfill = s);
    })();
  });
  var Cs = c(() => {
    "use strict";
    (function () {
      if (typeof window > "u") return;
      function e(n) {
        Webflow.env("design") ||
          ($("video").each(function () {
            n && $(this).prop("autoplay") ? this.play() : this.pause();
          }),
          $(".w-background-video--control").each(function () {
            n ? r($(this)) : t($(this));
          }));
      }
      function t(n) {
        n.find("> span").each(function (i) {
          $(this).prop("hidden", () => i === 0);
        });
      }
      function r(n) {
        n.find("> span").each(function (i) {
          $(this).prop("hidden", () => i === 1);
        });
      }
      $(document).ready(() => {
        let n = window.matchMedia("(prefers-reduced-motion: reduce)");
        n.addEventListener("change", (i) => {
          e(!i.matches);
        }),
          n.matches && e(!1),
          $("video:not([autoplay])").each(function () {
            $(this)
              .parent()
              .find(".w-background-video--control")
              .each(function () {
                t($(this));
              });
          }),
          $(document).on("click", ".w-background-video--control", function (i) {
            if (Webflow.env("design")) return;
            let o = $(i.currentTarget),
              s = $(`video#${o.attr("aria-controls")}`).get(0);
            if (s)
              if (s.paused) {
                let a = s.play();
                r(o),
                  a &&
                    typeof a.catch == "function" &&
                    a.catch(() => {
                      t(o);
                    });
              } else s.pause(), t(o);
          });
      });
    })();
  });
  var wi = c(() => {
    "use strict";
    window.tram = (function (e) {
      function t(l, h) {
        var _ = new F.Bare();
        return _.init(l, h);
      }
      function r(l) {
        return l.replace(/[A-Z]/g, function (h) {
          return "-" + h.toLowerCase();
        });
      }
      function n(l) {
        var h = parseInt(l.slice(1), 16),
          _ = (h >> 16) & 255,
          I = (h >> 8) & 255,
          E = 255 & h;
        return [_, I, E];
      }
      function i(l, h, _) {
        return (
          "#" + ((1 << 24) | (l << 16) | (h << 8) | _).toString(16).slice(1)
        );
      }
      function o() {}
      function s(l, h) {
        f("Type warning: Expected: [" + l + "] Got: [" + typeof h + "] " + h);
      }
      function a(l, h, _) {
        f("Units do not match [" + l + "]: " + h + ", " + _);
      }
      function u(l, h, _) {
        if ((h !== void 0 && (_ = h), l === void 0)) return _;
        var I = _;
        return (
          Si.test(l) || !Qr.test(l)
            ? (I = parseInt(l, 10))
            : Qr.test(l) && (I = 1e3 * parseFloat(l)),
          0 > I && (I = 0),
          I === I ? I : _
        );
      }
      function f(l) {
        he.debug && window && window.console.warn(l);
      }
      function p(l) {
        for (var h = -1, _ = l ? l.length : 0, I = []; ++h < _; ) {
          var E = l[h];
          E && I.push(E);
        }
        return I;
      }
      var g = (function (l, h, _) {
          function I(Y) {
            return typeof Y == "object";
          }
          function E(Y) {
            return typeof Y == "function";
          }
          function O() {}
          function X(Y, ue) {
            function M() {
              var Oe = new ee();
              return E(Oe.init) && Oe.init.apply(Oe, arguments), Oe;
            }
            function ee() {}
            ue === _ && ((ue = Y), (Y = Object)), (M.Bare = ee);
            var re,
              ve = (O[l] = Y[l]),
              ze = (ee[l] = M[l] = new O());
            return (
              (ze.constructor = M),
              (M.mixin = function (Oe) {
                return (ee[l] = M[l] = X(M, Oe)[l]), M;
              }),
              (M.open = function (Oe) {
                if (
                  ((re = {}),
                  E(Oe) ? (re = Oe.call(M, ze, ve, M, Y)) : I(Oe) && (re = Oe),
                  I(re))
                )
                  for (var pr in re) h.call(re, pr) && (ze[pr] = re[pr]);
                return E(ze.init) || (ze.init = Y), M;
              }),
              M.open(ue)
            );
          }
          return X;
        })("prototype", {}.hasOwnProperty),
        d = {
          ease: [
            "ease",
            function (l, h, _, I) {
              var E = (l /= I) * l,
                O = E * l;
              return (
                h +
                _ * (-2.75 * O * E + 11 * E * E + -15.5 * O + 8 * E + 0.25 * l)
              );
            },
          ],
          "ease-in": [
            "ease-in",
            function (l, h, _, I) {
              var E = (l /= I) * l,
                O = E * l;
              return h + _ * (-1 * O * E + 3 * E * E + -3 * O + 2 * E);
            },
          ],
          "ease-out": [
            "ease-out",
            function (l, h, _, I) {
              var E = (l /= I) * l,
                O = E * l;
              return (
                h +
                _ * (0.3 * O * E + -1.6 * E * E + 2.2 * O + -1.8 * E + 1.9 * l)
              );
            },
          ],
          "ease-in-out": [
            "ease-in-out",
            function (l, h, _, I) {
              var E = (l /= I) * l,
                O = E * l;
              return h + _ * (2 * O * E + -5 * E * E + 2 * O + 2 * E);
            },
          ],
          linear: [
            "linear",
            function (l, h, _, I) {
              return (_ * l) / I + h;
            },
          ],
          "ease-in-quad": [
            "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
            function (l, h, _, I) {
              return _ * (l /= I) * l + h;
            },
          ],
          "ease-out-quad": [
            "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
            function (l, h, _, I) {
              return -_ * (l /= I) * (l - 2) + h;
            },
          ],
          "ease-in-out-quad": [
            "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
            function (l, h, _, I) {
              return (l /= I / 2) < 1
                ? (_ / 2) * l * l + h
                : (-_ / 2) * (--l * (l - 2) - 1) + h;
            },
          ],
          "ease-in-cubic": [
            "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
            function (l, h, _, I) {
              return _ * (l /= I) * l * l + h;
            },
          ],
          "ease-out-cubic": [
            "cubic-bezier(0.215, 0.610, 0.355, 1)",
            function (l, h, _, I) {
              return _ * ((l = l / I - 1) * l * l + 1) + h;
            },
          ],
          "ease-in-out-cubic": [
            "cubic-bezier(0.645, 0.045, 0.355, 1)",
            function (l, h, _, I) {
              return (l /= I / 2) < 1
                ? (_ / 2) * l * l * l + h
                : (_ / 2) * ((l -= 2) * l * l + 2) + h;
            },
          ],
          "ease-in-quart": [
            "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
            function (l, h, _, I) {
              return _ * (l /= I) * l * l * l + h;
            },
          ],
          "ease-out-quart": [
            "cubic-bezier(0.165, 0.840, 0.440, 1)",
            function (l, h, _, I) {
              return -_ * ((l = l / I - 1) * l * l * l - 1) + h;
            },
          ],
          "ease-in-out-quart": [
            "cubic-bezier(0.770, 0, 0.175, 1)",
            function (l, h, _, I) {
              return (l /= I / 2) < 1
                ? (_ / 2) * l * l * l * l + h
                : (-_ / 2) * ((l -= 2) * l * l * l - 2) + h;
            },
          ],
          "ease-in-quint": [
            "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
            function (l, h, _, I) {
              return _ * (l /= I) * l * l * l * l + h;
            },
          ],
          "ease-out-quint": [
            "cubic-bezier(0.230, 1, 0.320, 1)",
            function (l, h, _, I) {
              return _ * ((l = l / I - 1) * l * l * l * l + 1) + h;
            },
          ],
          "ease-in-out-quint": [
            "cubic-bezier(0.860, 0, 0.070, 1)",
            function (l, h, _, I) {
              return (l /= I / 2) < 1
                ? (_ / 2) * l * l * l * l * l + h
                : (_ / 2) * ((l -= 2) * l * l * l * l + 2) + h;
            },
          ],
          "ease-in-sine": [
            "cubic-bezier(0.470, 0, 0.745, 0.715)",
            function (l, h, _, I) {
              return -_ * Math.cos((l / I) * (Math.PI / 2)) + _ + h;
            },
          ],
          "ease-out-sine": [
            "cubic-bezier(0.390, 0.575, 0.565, 1)",
            function (l, h, _, I) {
              return _ * Math.sin((l / I) * (Math.PI / 2)) + h;
            },
          ],
          "ease-in-out-sine": [
            "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
            function (l, h, _, I) {
              return (-_ / 2) * (Math.cos((Math.PI * l) / I) - 1) + h;
            },
          ],
          "ease-in-expo": [
            "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
            function (l, h, _, I) {
              return l === 0 ? h : _ * Math.pow(2, 10 * (l / I - 1)) + h;
            },
          ],
          "ease-out-expo": [
            "cubic-bezier(0.190, 1, 0.220, 1)",
            function (l, h, _, I) {
              return l === I
                ? h + _
                : _ * (-Math.pow(2, (-10 * l) / I) + 1) + h;
            },
          ],
          "ease-in-out-expo": [
            "cubic-bezier(1, 0, 0, 1)",
            function (l, h, _, I) {
              return l === 0
                ? h
                : l === I
                ? h + _
                : (l /= I / 2) < 1
                ? (_ / 2) * Math.pow(2, 10 * (l - 1)) + h
                : (_ / 2) * (-Math.pow(2, -10 * --l) + 2) + h;
            },
          ],
          "ease-in-circ": [
            "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
            function (l, h, _, I) {
              return -_ * (Math.sqrt(1 - (l /= I) * l) - 1) + h;
            },
          ],
          "ease-out-circ": [
            "cubic-bezier(0.075, 0.820, 0.165, 1)",
            function (l, h, _, I) {
              return _ * Math.sqrt(1 - (l = l / I - 1) * l) + h;
            },
          ],
          "ease-in-out-circ": [
            "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
            function (l, h, _, I) {
              return (l /= I / 2) < 1
                ? (-_ / 2) * (Math.sqrt(1 - l * l) - 1) + h
                : (_ / 2) * (Math.sqrt(1 - (l -= 2) * l) + 1) + h;
            },
          ],
          "ease-in-back": [
            "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
            function (l, h, _, I, E) {
              return (
                E === void 0 && (E = 1.70158),
                _ * (l /= I) * l * ((E + 1) * l - E) + h
              );
            },
          ],
          "ease-out-back": [
            "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
            function (l, h, _, I, E) {
              return (
                E === void 0 && (E = 1.70158),
                _ * ((l = l / I - 1) * l * ((E + 1) * l + E) + 1) + h
              );
            },
          ],
          "ease-in-out-back": [
            "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
            function (l, h, _, I, E) {
              return (
                E === void 0 && (E = 1.70158),
                (l /= I / 2) < 1
                  ? (_ / 2) * l * l * (((E *= 1.525) + 1) * l - E) + h
                  : (_ / 2) *
                      ((l -= 2) * l * (((E *= 1.525) + 1) * l + E) + 2) +
                    h
              );
            },
          ],
        },
        v = {
          "ease-in-back": "cubic-bezier(0.600, 0, 0.735, 0.045)",
          "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1)",
          "ease-in-out-back": "cubic-bezier(0.680, 0, 0.265, 1)",
        },
        b = document,
        m = window,
        A = "bkwld-tram",
        y = /[\-\.0-9]/g,
        w = /[A-Z]/,
        S = "number",
        C = /^(rgb|#)/,
        R = /(em|cm|mm|in|pt|pc|px)$/,
        x = /(em|cm|mm|in|pt|pc|px|%)$/,
        G = /(deg|rad|turn)$/,
        B = "unitless",
        k = /(all|none) 0s ease 0s/,
        W = /^(width|height)$/,
        Z = " ",
        P = b.createElement("a"),
        T = ["Webkit", "Moz", "O", "ms"],
        L = ["-webkit-", "-moz-", "-o-", "-ms-"],
        U = function (l) {
          if (l in P.style) return { dom: l, css: l };
          var h,
            _,
            I = "",
            E = l.split("-");
          for (h = 0; h < E.length; h++)
            I += E[h].charAt(0).toUpperCase() + E[h].slice(1);
          for (h = 0; h < T.length; h++)
            if (((_ = T[h] + I), _ in P.style))
              return { dom: _, css: L[h] + l };
        },
        D = (t.support = {
          bind: Function.prototype.bind,
          transform: U("transform"),
          transition: U("transition"),
          backface: U("backface-visibility"),
          timing: U("transition-timing-function"),
        });
      if (D.transition) {
        var J = D.timing.dom;
        if (((P.style[J] = d["ease-in-back"][0]), !P.style[J]))
          for (var Q in v) d[Q][0] = v[Q];
      }
      var N = (t.frame = (function () {
          var l =
            m.requestAnimationFrame ||
            m.webkitRequestAnimationFrame ||
            m.mozRequestAnimationFrame ||
            m.oRequestAnimationFrame ||
            m.msRequestAnimationFrame;
          return l && D.bind
            ? l.bind(m)
            : function (h) {
                m.setTimeout(h, 16);
              };
        })()),
        V = (t.now = (function () {
          var l = m.performance,
            h = l && (l.now || l.webkitNow || l.msNow || l.mozNow);
          return h && D.bind
            ? h.bind(l)
            : Date.now ||
                function () {
                  return +new Date();
                };
        })()),
        H = g(function (l) {
          function h(j, ie) {
            var pe = p(("" + j).split(Z)),
              ae = pe[0];
            ie = ie || {};
            var Ae = dr[ae];
            if (!Ae) return f("Unsupported property: " + ae);
            if (!ie.weak || !this.props[ae]) {
              var De = Ae[0],
                Ce = this.props[ae];
              return (
                Ce || (Ce = this.props[ae] = new De.Bare()),
                Ce.init(this.$el, pe, Ae, ie),
                Ce
              );
            }
          }
          function _(j, ie, pe) {
            if (j) {
              var ae = typeof j;
              if (
                (ie ||
                  (this.timer && this.timer.destroy(),
                  (this.queue = []),
                  (this.active = !1)),
                ae == "number" && ie)
              )
                return (
                  (this.timer = new fe({
                    duration: j,
                    context: this,
                    complete: O,
                  })),
                  void (this.active = !0)
                );
              if (ae == "string" && ie) {
                switch (j) {
                  case "hide":
                    M.call(this);
                    break;
                  case "stop":
                    X.call(this);
                    break;
                  case "redraw":
                    ee.call(this);
                    break;
                  default:
                    h.call(this, j, pe && pe[1]);
                }
                return O.call(this);
              }
              if (ae == "function") return void j.call(this, this);
              if (ae == "object") {
                var Ae = 0;
                ze.call(
                  this,
                  j,
                  function (ye, U_) {
                    ye.span > Ae && (Ae = ye.span), ye.stop(), ye.animate(U_);
                  },
                  function (ye) {
                    "wait" in ye && (Ae = u(ye.wait, 0));
                  }
                ),
                  ve.call(this),
                  Ae > 0 &&
                    ((this.timer = new fe({ duration: Ae, context: this })),
                    (this.active = !0),
                    ie && (this.timer.complete = O));
                var De = this,
                  Ce = !1,
                  Zr = {};
                N(function () {
                  ze.call(De, j, function (ye) {
                    ye.active && ((Ce = !0), (Zr[ye.name] = ye.nextStyle));
                  }),
                    Ce && De.$el.css(Zr);
                });
              }
            }
          }
          function I(j) {
            (j = u(j, 0)),
              this.active
                ? this.queue.push({ options: j })
                : ((this.timer = new fe({
                    duration: j,
                    context: this,
                    complete: O,
                  })),
                  (this.active = !0));
          }
          function E(j) {
            return this.active
              ? (this.queue.push({ options: j, args: arguments }),
                void (this.timer.complete = O))
              : f(
                  "No active transition timer. Use start() or wait() before then()."
                );
          }
          function O() {
            if (
              (this.timer && this.timer.destroy(),
              (this.active = !1),
              this.queue.length)
            ) {
              var j = this.queue.shift();
              _.call(this, j.options, !0, j.args);
            }
          }
          function X(j) {
            this.timer && this.timer.destroy(),
              (this.queue = []),
              (this.active = !1);
            var ie;
            typeof j == "string"
              ? ((ie = {}), (ie[j] = 1))
              : (ie = typeof j == "object" && j != null ? j : this.props),
              ze.call(this, ie, Oe),
              ve.call(this);
          }
          function Y(j) {
            X.call(this, j), ze.call(this, j, pr, G_);
          }
          function ue(j) {
            typeof j != "string" && (j = "block"), (this.el.style.display = j);
          }
          function M() {
            X.call(this), (this.el.style.display = "none");
          }
          function ee() {
            this.el.offsetHeight;
          }
          function re() {
            X.call(this), e.removeData(this.el, A), (this.$el = this.el = null);
          }
          function ve() {
            var j,
              ie,
              pe = [];
            this.upstream && pe.push(this.upstream);
            for (j in this.props)
              (ie = this.props[j]), ie.active && pe.push(ie.string);
            (pe = pe.join(",")),
              this.style !== pe &&
                ((this.style = pe), (this.el.style[D.transition.dom] = pe));
          }
          function ze(j, ie, pe) {
            var ae,
              Ae,
              De,
              Ce,
              Zr = ie !== Oe,
              ye = {};
            for (ae in j)
              (De = j[ae]),
                ae in je
                  ? (ye.transform || (ye.transform = {}),
                    (ye.transform[ae] = De))
                  : (w.test(ae) && (ae = r(ae)),
                    ae in dr
                      ? (ye[ae] = De)
                      : (Ce || (Ce = {}), (Ce[ae] = De)));
            for (ae in ye) {
              if (((De = ye[ae]), (Ae = this.props[ae]), !Ae)) {
                if (!Zr) continue;
                Ae = h.call(this, ae);
              }
              ie.call(this, Ae, De);
            }
            pe && Ce && pe.call(this, Ce);
          }
          function Oe(j) {
            j.stop();
          }
          function pr(j, ie) {
            j.set(ie);
          }
          function G_(j) {
            this.$el.css(j);
          }
          function Me(j, ie) {
            l[j] = function () {
              return this.children
                ? V_.call(this, ie, arguments)
                : (this.el && ie.apply(this, arguments), this);
            };
          }
          function V_(j, ie) {
            var pe,
              ae = this.children.length;
            for (pe = 0; ae > pe; pe++) j.apply(this.children[pe], ie);
            return this;
          }
          (l.init = function (j) {
            if (
              ((this.$el = e(j)),
              (this.el = this.$el[0]),
              (this.props = {}),
              (this.queue = []),
              (this.style = ""),
              (this.active = !1),
              he.keepInherited && !he.fallback)
            ) {
              var ie = lr(this.el, "transition");
              ie && !k.test(ie) && (this.upstream = ie);
            }
            D.backface &&
              he.hideBackface &&
              ft(this.el, D.backface.css, "hidden");
          }),
            Me("add", h),
            Me("start", _),
            Me("wait", I),
            Me("then", E),
            Me("next", O),
            Me("stop", X),
            Me("set", Y),
            Me("show", ue),
            Me("hide", M),
            Me("redraw", ee),
            Me("destroy", re);
        }),
        F = g(H, function (l) {
          function h(_, I) {
            var E = e.data(_, A) || e.data(_, A, new H.Bare());
            return E.el || E.init(_), I ? E.start(I) : E;
          }
          l.init = function (_, I) {
            var E = e(_);
            if (!E.length) return this;
            if (E.length === 1) return h(E[0], I);
            var O = [];
            return (
              E.each(function (X, Y) {
                O.push(h(Y, I));
              }),
              (this.children = O),
              this
            );
          };
        }),
        q = g(function (l) {
          function h() {
            var O = this.get();
            this.update("auto");
            var X = this.get();
            return this.update(O), X;
          }
          function _(O, X, Y) {
            return X !== void 0 && (Y = X), O in d ? O : Y;
          }
          function I(O) {
            var X = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(O);
            return (X ? i(X[1], X[2], X[3]) : O).replace(
              /#(\w)(\w)(\w)$/,
              "#$1$1$2$2$3$3"
            );
          }
          var E = { duration: 500, ease: "ease", delay: 0 };
          (l.init = function (O, X, Y, ue) {
            (this.$el = O), (this.el = O[0]);
            var M = X[0];
            Y[2] && (M = Y[2]),
              fr[M] && (M = fr[M]),
              (this.name = M),
              (this.type = Y[1]),
              (this.duration = u(X[1], this.duration, E.duration)),
              (this.ease = _(X[2], this.ease, E.ease)),
              (this.delay = u(X[3], this.delay, E.delay)),
              (this.span = this.duration + this.delay),
              (this.active = !1),
              (this.nextStyle = null),
              (this.auto = W.test(this.name)),
              (this.unit = ue.unit || this.unit || he.defaultUnit),
              (this.angle = ue.angle || this.angle || he.defaultAngle),
              he.fallback || ue.fallback
                ? (this.animate = this.fallback)
                : ((this.animate = this.transition),
                  (this.string =
                    this.name +
                    Z +
                    this.duration +
                    "ms" +
                    (this.ease != "ease" ? Z + d[this.ease][0] : "") +
                    (this.delay ? Z + this.delay + "ms" : "")));
          }),
            (l.set = function (O) {
              (O = this.convert(O, this.type)), this.update(O), this.redraw();
            }),
            (l.transition = function (O) {
              (this.active = !0),
                (O = this.convert(O, this.type)),
                this.auto &&
                  (this.el.style[this.name] == "auto" &&
                    (this.update(this.get()), this.redraw()),
                  O == "auto" && (O = h.call(this))),
                (this.nextStyle = O);
            }),
            (l.fallback = function (O) {
              var X =
                this.el.style[this.name] || this.convert(this.get(), this.type);
              (O = this.convert(O, this.type)),
                this.auto &&
                  (X == "auto" && (X = this.convert(this.get(), this.type)),
                  O == "auto" && (O = h.call(this))),
                (this.tween = new z({
                  from: X,
                  to: O,
                  duration: this.duration,
                  delay: this.delay,
                  ease: this.ease,
                  update: this.update,
                  context: this,
                }));
            }),
            (l.get = function () {
              return lr(this.el, this.name);
            }),
            (l.update = function (O) {
              ft(this.el, this.name, O);
            }),
            (l.stop = function () {
              (this.active || this.nextStyle) &&
                ((this.active = !1),
                (this.nextStyle = null),
                ft(this.el, this.name, this.get()));
              var O = this.tween;
              O && O.context && O.destroy();
            }),
            (l.convert = function (O, X) {
              if (O == "auto" && this.auto) return O;
              var Y,
                ue = typeof O == "number",
                M = typeof O == "string";
              switch (X) {
                case S:
                  if (ue) return O;
                  if (M && O.replace(y, "") === "") return +O;
                  Y = "number(unitless)";
                  break;
                case C:
                  if (M) {
                    if (O === "" && this.original) return this.original;
                    if (X.test(O))
                      return O.charAt(0) == "#" && O.length == 7 ? O : I(O);
                  }
                  Y = "hex or rgb string";
                  break;
                case R:
                  if (ue) return O + this.unit;
                  if (M && X.test(O)) return O;
                  Y = "number(px) or string(unit)";
                  break;
                case x:
                  if (ue) return O + this.unit;
                  if (M && X.test(O)) return O;
                  Y = "number(px) or string(unit or %)";
                  break;
                case G:
                  if (ue) return O + this.angle;
                  if (M && X.test(O)) return O;
                  Y = "number(deg) or string(angle)";
                  break;
                case B:
                  if (ue || (M && x.test(O))) return O;
                  Y = "number(unitless) or string(unit or %)";
              }
              return s(Y, O), O;
            }),
            (l.redraw = function () {
              this.el.offsetHeight;
            });
        }),
        K = g(q, function (l, h) {
          l.init = function () {
            h.init.apply(this, arguments),
              this.original || (this.original = this.convert(this.get(), C));
          };
        }),
        ne = g(q, function (l, h) {
          (l.init = function () {
            h.init.apply(this, arguments), (this.animate = this.fallback);
          }),
            (l.get = function () {
              return this.$el[this.name]();
            }),
            (l.update = function (_) {
              this.$el[this.name](_);
            });
        }),
        te = g(q, function (l, h) {
          function _(I, E) {
            var O, X, Y, ue, M;
            for (O in I)
              (ue = je[O]),
                (Y = ue[0]),
                (X = ue[1] || O),
                (M = this.convert(I[O], Y)),
                E.call(this, X, M, Y);
          }
          (l.init = function () {
            h.init.apply(this, arguments),
              this.current ||
                ((this.current = {}),
                je.perspective &&
                  he.perspective &&
                  ((this.current.perspective = he.perspective),
                  ft(this.el, this.name, this.style(this.current)),
                  this.redraw()));
          }),
            (l.set = function (I) {
              _.call(this, I, function (E, O) {
                this.current[E] = O;
              }),
                ft(this.el, this.name, this.style(this.current)),
                this.redraw();
            }),
            (l.transition = function (I) {
              var E = this.values(I);
              this.tween = new Lt({
                current: this.current,
                values: E,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
              });
              var O,
                X = {};
              for (O in this.current) X[O] = O in E ? E[O] : this.current[O];
              (this.active = !0), (this.nextStyle = this.style(X));
            }),
            (l.fallback = function (I) {
              var E = this.values(I);
              this.tween = new Lt({
                current: this.current,
                values: E,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
                update: this.update,
                context: this,
              });
            }),
            (l.update = function () {
              ft(this.el, this.name, this.style(this.current));
            }),
            (l.style = function (I) {
              var E,
                O = "";
              for (E in I) O += E + "(" + I[E] + ") ";
              return O;
            }),
            (l.values = function (I) {
              var E,
                O = {};
              return (
                _.call(this, I, function (X, Y, ue) {
                  (O[X] = Y),
                    this.current[X] === void 0 &&
                      ((E = 0),
                      ~X.indexOf("scale") && (E = 1),
                      (this.current[X] = this.convert(E, ue)));
                }),
                O
              );
            });
        }),
        z = g(function (l) {
          function h(M) {
            Y.push(M) === 1 && N(_);
          }
          function _() {
            var M,
              ee,
              re,
              ve = Y.length;
            if (ve)
              for (N(_), ee = V(), M = ve; M--; )
                (re = Y[M]), re && re.render(ee);
          }
          function I(M) {
            var ee,
              re = e.inArray(M, Y);
            re >= 0 &&
              ((ee = Y.slice(re + 1)),
              (Y.length = re),
              ee.length && (Y = Y.concat(ee)));
          }
          function E(M) {
            return Math.round(M * ue) / ue;
          }
          function O(M, ee, re) {
            return i(
              M[0] + re * (ee[0] - M[0]),
              M[1] + re * (ee[1] - M[1]),
              M[2] + re * (ee[2] - M[2])
            );
          }
          var X = { ease: d.ease[1], from: 0, to: 1 };
          (l.init = function (M) {
            (this.duration = M.duration || 0), (this.delay = M.delay || 0);
            var ee = M.ease || X.ease;
            d[ee] && (ee = d[ee][1]),
              typeof ee != "function" && (ee = X.ease),
              (this.ease = ee),
              (this.update = M.update || o),
              (this.complete = M.complete || o),
              (this.context = M.context || this),
              (this.name = M.name);
            var re = M.from,
              ve = M.to;
            re === void 0 && (re = X.from),
              ve === void 0 && (ve = X.to),
              (this.unit = M.unit || ""),
              typeof re == "number" && typeof ve == "number"
                ? ((this.begin = re), (this.change = ve - re))
                : this.format(ve, re),
              (this.value = this.begin + this.unit),
              (this.start = V()),
              M.autoplay !== !1 && this.play();
          }),
            (l.play = function () {
              this.active ||
                (this.start || (this.start = V()), (this.active = !0), h(this));
            }),
            (l.stop = function () {
              this.active && ((this.active = !1), I(this));
            }),
            (l.render = function (M) {
              var ee,
                re = M - this.start;
              if (this.delay) {
                if (re <= this.delay) return;
                re -= this.delay;
              }
              if (re < this.duration) {
                var ve = this.ease(re, 0, 1, this.duration);
                return (
                  (ee = this.startRGB
                    ? O(this.startRGB, this.endRGB, ve)
                    : E(this.begin + ve * this.change)),
                  (this.value = ee + this.unit),
                  void this.update.call(this.context, this.value)
                );
              }
              (ee = this.endHex || this.begin + this.change),
                (this.value = ee + this.unit),
                this.update.call(this.context, this.value),
                this.complete.call(this.context),
                this.destroy();
            }),
            (l.format = function (M, ee) {
              if (((ee += ""), (M += ""), M.charAt(0) == "#"))
                return (
                  (this.startRGB = n(ee)),
                  (this.endRGB = n(M)),
                  (this.endHex = M),
                  (this.begin = 0),
                  void (this.change = 1)
                );
              if (!this.unit) {
                var re = ee.replace(y, ""),
                  ve = M.replace(y, "");
                re !== ve && a("tween", ee, M), (this.unit = re);
              }
              (ee = parseFloat(ee)),
                (M = parseFloat(M)),
                (this.begin = this.value = ee),
                (this.change = M - ee);
            }),
            (l.destroy = function () {
              this.stop(),
                (this.context = null),
                (this.ease = this.update = this.complete = o);
            });
          var Y = [],
            ue = 1e3;
        }),
        fe = g(z, function (l) {
          (l.init = function (h) {
            (this.duration = h.duration || 0),
              (this.complete = h.complete || o),
              (this.context = h.context),
              this.play();
          }),
            (l.render = function (h) {
              var _ = h - this.start;
              _ < this.duration ||
                (this.complete.call(this.context), this.destroy());
            });
        }),
        Lt = g(z, function (l, h) {
          (l.init = function (_) {
            (this.context = _.context),
              (this.update = _.update),
              (this.tweens = []),
              (this.current = _.current);
            var I, E;
            for (I in _.values)
              (E = _.values[I]),
                this.current[I] !== E &&
                  this.tweens.push(
                    new z({
                      name: I,
                      from: this.current[I],
                      to: E,
                      duration: _.duration,
                      delay: _.delay,
                      ease: _.ease,
                      autoplay: !1,
                    })
                  );
            this.play();
          }),
            (l.render = function (_) {
              var I,
                E,
                O = this.tweens.length,
                X = !1;
              for (I = O; I--; )
                (E = this.tweens[I]),
                  E.context &&
                    (E.render(_), (this.current[E.name] = E.value), (X = !0));
              return X
                ? void (this.update && this.update.call(this.context))
                : this.destroy();
            }),
            (l.destroy = function () {
              if ((h.destroy.call(this), this.tweens)) {
                var _,
                  I = this.tweens.length;
                for (_ = I; _--; ) this.tweens[_].destroy();
                (this.tweens = null), (this.current = null);
              }
            });
        }),
        he = (t.config = {
          debug: !1,
          defaultUnit: "px",
          defaultAngle: "deg",
          keepInherited: !1,
          hideBackface: !1,
          perspective: "",
          fallback: !D.transition,
          agentTests: [],
        });
      (t.fallback = function (l) {
        if (!D.transition) return (he.fallback = !0);
        he.agentTests.push("(" + l + ")");
        var h = new RegExp(he.agentTests.join("|"), "i");
        he.fallback = h.test(navigator.userAgent);
      }),
        t.fallback("6.0.[2-5] Safari"),
        (t.tween = function (l) {
          return new z(l);
        }),
        (t.delay = function (l, h, _) {
          return new fe({ complete: h, duration: l, context: _ });
        }),
        (e.fn.tram = function (l) {
          return t.call(null, this, l);
        });
      var ft = e.style,
        lr = e.css,
        fr = { transform: D.transform && D.transform.css },
        dr = {
          color: [K, C],
          background: [K, C, "background-color"],
          "outline-color": [K, C],
          "border-color": [K, C],
          "border-top-color": [K, C],
          "border-right-color": [K, C],
          "border-bottom-color": [K, C],
          "border-left-color": [K, C],
          "border-width": [q, R],
          "border-top-width": [q, R],
          "border-right-width": [q, R],
          "border-bottom-width": [q, R],
          "border-left-width": [q, R],
          "border-spacing": [q, R],
          "letter-spacing": [q, R],
          margin: [q, R],
          "margin-top": [q, R],
          "margin-right": [q, R],
          "margin-bottom": [q, R],
          "margin-left": [q, R],
          padding: [q, R],
          "padding-top": [q, R],
          "padding-right": [q, R],
          "padding-bottom": [q, R],
          "padding-left": [q, R],
          "outline-width": [q, R],
          opacity: [q, S],
          top: [q, x],
          right: [q, x],
          bottom: [q, x],
          left: [q, x],
          "font-size": [q, x],
          "text-indent": [q, x],
          "word-spacing": [q, x],
          width: [q, x],
          "min-width": [q, x],
          "max-width": [q, x],
          height: [q, x],
          "min-height": [q, x],
          "max-height": [q, x],
          "line-height": [q, B],
          "scroll-top": [ne, S, "scrollTop"],
          "scroll-left": [ne, S, "scrollLeft"],
        },
        je = {};
      D.transform &&
        ((dr.transform = [te]),
        (je = {
          x: [x, "translateX"],
          y: [x, "translateY"],
          rotate: [G],
          rotateX: [G],
          rotateY: [G],
          scale: [S],
          scaleX: [S],
          scaleY: [S],
          skew: [G],
          skewX: [G],
          skewY: [G],
        })),
        D.transform &&
          D.backface &&
          ((je.z = [x, "translateZ"]),
          (je.rotateZ = [G]),
          (je.scaleZ = [S]),
          (je.perspective = [R]));
      var Si = /ms/,
        Qr = /s|\./;
      return (e.tram = t);
    })(window.jQuery);
  });
  var Ls = c((qB, Rs) => {
    "use strict";
    var j_ = window.$,
      z_ = wi() && j_.tram;
    Rs.exports = (function () {
      var e = {};
      e.VERSION = "1.6.0-Webflow";
      var t = {},
        r = Array.prototype,
        n = Object.prototype,
        i = Function.prototype,
        o = r.push,
        s = r.slice,
        a = r.concat,
        u = n.toString,
        f = n.hasOwnProperty,
        p = r.forEach,
        g = r.map,
        d = r.reduce,
        v = r.reduceRight,
        b = r.filter,
        m = r.every,
        A = r.some,
        y = r.indexOf,
        w = r.lastIndexOf,
        S = Array.isArray,
        C = Object.keys,
        R = i.bind,
        x =
          (e.each =
          e.forEach =
            function (T, L, U) {
              if (T == null) return T;
              if (p && T.forEach === p) T.forEach(L, U);
              else if (T.length === +T.length) {
                for (var D = 0, J = T.length; D < J; D++)
                  if (L.call(U, T[D], D, T) === t) return;
              } else
                for (var Q = e.keys(T), D = 0, J = Q.length; D < J; D++)
                  if (L.call(U, T[Q[D]], Q[D], T) === t) return;
              return T;
            });
      (e.map = e.collect =
        function (T, L, U) {
          var D = [];
          return T == null
            ? D
            : g && T.map === g
            ? T.map(L, U)
            : (x(T, function (J, Q, N) {
                D.push(L.call(U, J, Q, N));
              }),
              D);
        }),
        (e.find = e.detect =
          function (T, L, U) {
            var D;
            return (
              G(T, function (J, Q, N) {
                if (L.call(U, J, Q, N)) return (D = J), !0;
              }),
              D
            );
          }),
        (e.filter = e.select =
          function (T, L, U) {
            var D = [];
            return T == null
              ? D
              : b && T.filter === b
              ? T.filter(L, U)
              : (x(T, function (J, Q, N) {
                  L.call(U, J, Q, N) && D.push(J);
                }),
                D);
          });
      var G =
        (e.some =
        e.any =
          function (T, L, U) {
            L || (L = e.identity);
            var D = !1;
            return T == null
              ? D
              : A && T.some === A
              ? T.some(L, U)
              : (x(T, function (J, Q, N) {
                  if (D || (D = L.call(U, J, Q, N))) return t;
                }),
                !!D);
          });
      (e.contains = e.include =
        function (T, L) {
          return T == null
            ? !1
            : y && T.indexOf === y
            ? T.indexOf(L) != -1
            : G(T, function (U) {
                return U === L;
              });
        }),
        (e.delay = function (T, L) {
          var U = s.call(arguments, 2);
          return setTimeout(function () {
            return T.apply(null, U);
          }, L);
        }),
        (e.defer = function (T) {
          return e.delay.apply(e, [T, 1].concat(s.call(arguments, 1)));
        }),
        (e.throttle = function (T) {
          var L, U, D;
          return function () {
            L ||
              ((L = !0),
              (U = arguments),
              (D = this),
              z_.frame(function () {
                (L = !1), T.apply(D, U);
              }));
          };
        }),
        (e.debounce = function (T, L, U) {
          var D,
            J,
            Q,
            N,
            V,
            H = function () {
              var F = e.now() - N;
              F < L
                ? (D = setTimeout(H, L - F))
                : ((D = null), U || ((V = T.apply(Q, J)), (Q = J = null)));
            };
          return function () {
            (Q = this), (J = arguments), (N = e.now());
            var F = U && !D;
            return (
              D || (D = setTimeout(H, L)),
              F && ((V = T.apply(Q, J)), (Q = J = null)),
              V
            );
          };
        }),
        (e.defaults = function (T) {
          if (!e.isObject(T)) return T;
          for (var L = 1, U = arguments.length; L < U; L++) {
            var D = arguments[L];
            for (var J in D) T[J] === void 0 && (T[J] = D[J]);
          }
          return T;
        }),
        (e.keys = function (T) {
          if (!e.isObject(T)) return [];
          if (C) return C(T);
          var L = [];
          for (var U in T) e.has(T, U) && L.push(U);
          return L;
        }),
        (e.has = function (T, L) {
          return f.call(T, L);
        }),
        (e.isObject = function (T) {
          return T === Object(T);
        }),
        (e.now =
          Date.now ||
          function () {
            return new Date().getTime();
          }),
        (e.templateSettings = {
          evaluate: /<%([\s\S]+?)%>/g,
          interpolate: /<%=([\s\S]+?)%>/g,
          escape: /<%-([\s\S]+?)%>/g,
        });
      var B = /(.)^/,
        k = {
          "'": "'",
          "\\": "\\",
          "\r": "r",
          "\n": "n",
          "\u2028": "u2028",
          "\u2029": "u2029",
        },
        W = /\\|'|\r|\n|\u2028|\u2029/g,
        Z = function (T) {
          return "\\" + k[T];
        },
        P = /^\s*(\w|\$)+\s*$/;
      return (
        (e.template = function (T, L, U) {
          !L && U && (L = U), (L = e.defaults({}, L, e.templateSettings));
          var D = RegExp(
              [
                (L.escape || B).source,
                (L.interpolate || B).source,
                (L.evaluate || B).source,
              ].join("|") + "|$",
              "g"
            ),
            J = 0,
            Q = "__p+='";
          T.replace(D, function (F, q, K, ne, te) {
            return (
              (Q += T.slice(J, te).replace(W, Z)),
              (J = te + F.length),
              q
                ? (Q +=
                    `'+
  ((__t=(` +
                    q +
                    `))==null?'':_.escape(__t))+
  '`)
                : K
                ? (Q +=
                    `'+
  ((__t=(` +
                    K +
                    `))==null?'':__t)+
  '`)
                : ne &&
                  (Q +=
                    `';
  ` +
                    ne +
                    `
  __p+='`),
              F
            );
          }),
            (Q += `';
  `);
          var N = L.variable;
          if (N) {
            if (!P.test(N))
              throw new Error("variable is not a bare identifier: " + N);
          } else
            (Q =
              `with(obj||{}){
  ` +
              Q +
              `}
  `),
              (N = "obj");
          Q =
            `var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
  ` +
            Q +
            `return __p;
  `;
          var V;
          try {
            V = new Function(L.variable || "obj", "_", Q);
          } catch (F) {
            throw ((F.source = Q), F);
          }
          var H = function (F) {
            return V.call(this, F, e);
          };
          return (
            (H.source =
              "function(" +
              N +
              `){
  ` +
              Q +
              "}"),
            H
          );
        }),
        e
      );
    })();
  });
  var $e = c((FB, Vs) => {
    "use strict";
    var se = {},
      Nt = {},
      Pt = [],
      Ci = window.Webflow || [],
      dt = window.jQuery,
      Ve = dt(window),
      K_ = dt(document),
      Ye = dt.isFunction,
      Ge = (se._ = Ls()),
      Ps = (se.tram = wi() && dt.tram),
      tn = !1,
      Ri = !1;
    Ps.config.hideBackface = !1;
    Ps.config.keepInherited = !0;
    se.define = function (e, t, r) {
      Nt[e] && Fs(Nt[e]);
      var n = (Nt[e] = t(dt, Ge, r) || {});
      return qs(n), n;
    };
    se.require = function (e) {
      return Nt[e];
    };
    function qs(e) {
      se.env() &&
        (Ye(e.design) && Ve.on("__wf_design", e.design),
        Ye(e.preview) && Ve.on("__wf_preview", e.preview)),
        Ye(e.destroy) && Ve.on("__wf_destroy", e.destroy),
        e.ready && Ye(e.ready) && Y_(e);
    }
    function Y_(e) {
      if (tn) {
        e.ready();
        return;
      }
      Ge.contains(Pt, e.ready) || Pt.push(e.ready);
    }
    function Fs(e) {
      Ye(e.design) && Ve.off("__wf_design", e.design),
        Ye(e.preview) && Ve.off("__wf_preview", e.preview),
        Ye(e.destroy) && Ve.off("__wf_destroy", e.destroy),
        e.ready && Ye(e.ready) && $_(e);
    }
    function $_(e) {
      Pt = Ge.filter(Pt, function (t) {
        return t !== e.ready;
      });
    }
    se.push = function (e) {
      if (tn) {
        Ye(e) && e();
        return;
      }
      Ci.push(e);
    };
    se.env = function (e) {
      var t = window.__wf_design,
        r = typeof t < "u";
      if (!e) return r;
      if (e === "design") return r && t;
      if (e === "preview") return r && !t;
      if (e === "slug") return r && window.__wf_slug;
      if (e === "editor") return window.WebflowEditor;
      if (e === "test") return window.__wf_test;
      if (e === "frame") return window !== window.top;
    };
    var en = navigator.userAgent.toLowerCase(),
      Ms = (se.env.touch =
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch)),
      Q_ = (se.env.chrome =
        /chrome/.test(en) &&
        /Google/.test(navigator.vendor) &&
        parseInt(en.match(/chrome\/(\d+)\./)[1], 10)),
      Z_ = (se.env.ios = /(ipod|iphone|ipad)/.test(en));
    se.env.safari = /safari/.test(en) && !Q_ && !Z_;
    var xi;
    Ms &&
      K_.on("touchstart mousedown", function (e) {
        xi = e.target;
      });
    se.validClick = Ms
      ? function (e) {
          return e === xi || dt.contains(e, xi);
        }
      : function () {
          return !0;
        };
    var Ds = "resize.webflow orientationchange.webflow load.webflow",
      J_ = "scroll.webflow " + Ds;
    se.resize = Li(Ve, Ds);
    se.scroll = Li(Ve, J_);
    se.redraw = Li();
    function Li(e, t) {
      var r = [],
        n = {};
      return (
        (n.up = Ge.throttle(function (i) {
          Ge.each(r, function (o) {
            o(i);
          });
        })),
        e && t && e.on(t, n.up),
        (n.on = function (i) {
          typeof i == "function" && (Ge.contains(r, i) || r.push(i));
        }),
        (n.off = function (i) {
          if (!arguments.length) {
            r = [];
            return;
          }
          r = Ge.filter(r, function (o) {
            return o !== i;
          });
        }),
        n
      );
    }
    se.location = function (e) {
      window.location = e;
    };
    se.env() && (se.location = function () {});
    se.ready = function () {
      (tn = !0), Ri ? eb() : Ge.each(Pt, Ns), Ge.each(Ci, Ns), se.resize.up();
    };
    function Ns(e) {
      Ye(e) && e();
    }
    function eb() {
      (Ri = !1), Ge.each(Nt, qs);
    }
    var _t;
    se.load = function (e) {
      _t.then(e);
    };
    function Gs() {
      _t && (_t.reject(), Ve.off("load", _t.resolve)),
        (_t = new dt.Deferred()),
        Ve.on("load", _t.resolve);
    }
    se.destroy = function (e) {
      (e = e || {}),
        (Ri = !0),
        Ve.triggerHandler("__wf_destroy"),
        e.domready != null && (tn = e.domready),
        Ge.each(Nt, Fs),
        se.resize.off(),
        se.scroll.off(),
        se.redraw.off(),
        (Pt = []),
        (Ci = []),
        _t.state() === "pending" && Gs();
    };
    dt(se.ready);
    Gs();
    Vs.exports = window.Webflow = se;
  });
  var ks = c((MB, Bs) => {
    "use strict";
    var Us = $e();
    Us.define(
      "brand",
      (Bs.exports = function (e) {
        var t = {},
          r = document,
          n = e("html"),
          i = e("body"),
          o = ".w-webflow-badge",
          s = window.location,
          a = /PhantomJS/i.test(navigator.userAgent),
          u =
            "fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange",
          f;
        t.ready = function () {
          var v = n.attr("data-wf-status"),
            b = n.attr("data-wf-domain") || "";
          /\.webflow\.io$/i.test(b) && s.hostname !== b && (v = !0),
            v &&
              !a &&
              ((f = f || g()),
              d(),
              setTimeout(d, 500),
              e(r).off(u, p).on(u, p));
        };
        function p() {
          var v =
            r.fullScreen ||
            r.mozFullScreen ||
            r.webkitIsFullScreen ||
            r.msFullscreenElement ||
            !!r.webkitFullscreenElement;
          e(f).attr("style", v ? "display: none !important;" : "");
        }
        function g() {
          var v = e('<a class="w-webflow-badge"></a>').attr(
              "href",
              "https://webflow.com?utm_campaign=brandjs"
            ),
            b = e("<img>")
              .attr(
                "src",
                "https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-icon-d2.89e12c322e.svg"
              )
              .attr("alt", "")
              .css({ marginRight: "4px", width: "26px" }),
            m = e("<img>")
              .attr(
                "src",
                "https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-text-d2.c82cec3b78.svg"
              )
              .attr("alt", "Made in Webflow");
          return v.append(b, m), v[0];
        }
        function d() {
          var v = i.children(o),
            b = v.length && v.get(0) === f,
            m = Us.env("editor");
          if (b) {
            m && v.remove();
            return;
          }
          v.length && v.remove(), m || i.append(f);
        }
        return t;
      })
    );
  });
  var Hs = c((DB, Xs) => {
    "use strict";
    var Ni = $e();
    Ni.define(
      "edit",
      (Xs.exports = function (e, t, r) {
        if (
          ((r = r || {}),
          (Ni.env("test") || Ni.env("frame")) && !r.fixture && !tb())
        )
          return { exit: 1 };
        var n = {},
          i = e(window),
          o = e(document.documentElement),
          s = document.location,
          a = "hashchange",
          u,
          f = r.load || d,
          p = !1;
        try {
          p =
            localStorage &&
            localStorage.getItem &&
            localStorage.getItem("WebflowEditor");
        } catch {}
        p
          ? f()
          : s.search
          ? (/[?&](edit)(?:[=&?]|$)/.test(s.search) ||
              /\?edit$/.test(s.href)) &&
            f()
          : i.on(a, g).triggerHandler(a);
        function g() {
          u || (/\?edit/.test(s.hash) && f());
        }
        function d() {
          (u = !0),
            (window.WebflowEditor = !0),
            i.off(a, g),
            w(function (C) {
              e.ajax({
                url: y("https://editor-api.webflow.com/api/editor/view"),
                data: { siteId: o.attr("data-wf-site") },
                xhrFields: { withCredentials: !0 },
                dataType: "json",
                crossDomain: !0,
                success: v(C),
              });
            });
        }
        function v(C) {
          return function (R) {
            if (!R) {
              console.error("Could not load editor data");
              return;
            }
            (R.thirdPartyCookiesSupported = C),
              b(A(R.scriptPath), function () {
                window.WebflowEditor(R);
              });
          };
        }
        function b(C, R) {
          e.ajax({ type: "GET", url: C, dataType: "script", cache: !0 }).then(
            R,
            m
          );
        }
        function m(C, R, x) {
          throw (console.error("Could not load editor script: " + R), x);
        }
        function A(C) {
          return C.indexOf("//") >= 0
            ? C
            : y("https://editor-api.webflow.com" + C);
        }
        function y(C) {
          return C.replace(/([^:])\/\//g, "$1/");
        }
        function w(C) {
          var R = window.document.createElement("iframe");
          (R.src = "https://webflow.com/site/third-party-cookie-check.html"),
            (R.style.display = "none"),
            (R.sandbox = "allow-scripts allow-same-origin");
          var x = function (G) {
            G.data === "WF_third_party_cookies_unsupported"
              ? (S(R, x), C(!1))
              : G.data === "WF_third_party_cookies_supported" &&
                (S(R, x), C(!0));
          };
          (R.onerror = function () {
            S(R, x), C(!1);
          }),
            window.addEventListener("message", x, !1),
            window.document.body.appendChild(R);
        }
        function S(C, R) {
          window.removeEventListener("message", R, !1), C.remove();
        }
        return n;
      })
    );
    function tb() {
      try {
        return window.top.__Cypress__;
      } catch {
        return !1;
      }
    }
  });
  var js = c((GB, Ws) => {
    "use strict";
    var rb = $e();
    rb.define(
      "focus-visible",
      (Ws.exports = function () {
        function e(r) {
          var n = !0,
            i = !1,
            o = null,
            s = {
              text: !0,
              search: !0,
              url: !0,
              tel: !0,
              email: !0,
              password: !0,
              number: !0,
              date: !0,
              month: !0,
              week: !0,
              time: !0,
              datetime: !0,
              "datetime-local": !0,
            };
          function a(S) {
            return !!(
              S &&
              S !== document &&
              S.nodeName !== "HTML" &&
              S.nodeName !== "BODY" &&
              "classList" in S &&
              "contains" in S.classList
            );
          }
          function u(S) {
            var C = S.type,
              R = S.tagName;
            return !!(
              (R === "INPUT" && s[C] && !S.readOnly) ||
              (R === "TEXTAREA" && !S.readOnly) ||
              S.isContentEditable
            );
          }
          function f(S) {
            S.getAttribute("data-wf-focus-visible") ||
              S.setAttribute("data-wf-focus-visible", "true");
          }
          function p(S) {
            S.getAttribute("data-wf-focus-visible") &&
              S.removeAttribute("data-wf-focus-visible");
          }
          function g(S) {
            S.metaKey ||
              S.altKey ||
              S.ctrlKey ||
              (a(r.activeElement) && f(r.activeElement), (n = !0));
          }
          function d() {
            n = !1;
          }
          function v(S) {
            a(S.target) && (n || u(S.target)) && f(S.target);
          }
          function b(S) {
            a(S.target) &&
              S.target.hasAttribute("data-wf-focus-visible") &&
              ((i = !0),
              window.clearTimeout(o),
              (o = window.setTimeout(function () {
                i = !1;
              }, 100)),
              p(S.target));
          }
          function m() {
            document.visibilityState === "hidden" && (i && (n = !0), A());
          }
          function A() {
            document.addEventListener("mousemove", w),
              document.addEventListener("mousedown", w),
              document.addEventListener("mouseup", w),
              document.addEventListener("pointermove", w),
              document.addEventListener("pointerdown", w),
              document.addEventListener("pointerup", w),
              document.addEventListener("touchmove", w),
              document.addEventListener("touchstart", w),
              document.addEventListener("touchend", w);
          }
          function y() {
            document.removeEventListener("mousemove", w),
              document.removeEventListener("mousedown", w),
              document.removeEventListener("mouseup", w),
              document.removeEventListener("pointermove", w),
              document.removeEventListener("pointerdown", w),
              document.removeEventListener("pointerup", w),
              document.removeEventListener("touchmove", w),
              document.removeEventListener("touchstart", w),
              document.removeEventListener("touchend", w);
          }
          function w(S) {
            (S.target.nodeName && S.target.nodeName.toLowerCase() === "html") ||
              ((n = !1), y());
          }
          document.addEventListener("keydown", g, !0),
            document.addEventListener("mousedown", d, !0),
            document.addEventListener("pointerdown", d, !0),
            document.addEventListener("touchstart", d, !0),
            document.addEventListener("visibilitychange", m, !0),
            A(),
            r.addEventListener("focus", v, !0),
            r.addEventListener("blur", b, !0);
        }
        function t() {
          if (typeof document < "u")
            try {
              document.querySelector(":focus-visible");
            } catch {
              e(document);
            }
        }
        return { ready: t };
      })
    );
  });
  var Ys = c((VB, Ks) => {
    "use strict";
    var zs = $e();
    zs.define(
      "focus",
      (Ks.exports = function () {
        var e = [],
          t = !1;
        function r(s) {
          t &&
            (s.preventDefault(),
            s.stopPropagation(),
            s.stopImmediatePropagation(),
            e.unshift(s));
        }
        function n(s) {
          var a = s.target,
            u = a.tagName;
          return (
            (/^a$/i.test(u) && a.href != null) ||
            (/^(button|textarea)$/i.test(u) && a.disabled !== !0) ||
            (/^input$/i.test(u) &&
              /^(button|reset|submit|radio|checkbox)$/i.test(a.type) &&
              !a.disabled) ||
            (!/^(button|input|textarea|select|a)$/i.test(u) &&
              !Number.isNaN(Number.parseFloat(a.tabIndex))) ||
            /^audio$/i.test(u) ||
            (/^video$/i.test(u) && a.controls === !0)
          );
        }
        function i(s) {
          n(s) &&
            ((t = !0),
            setTimeout(() => {
              for (t = !1, s.target.focus(); e.length > 0; ) {
                var a = e.pop();
                a.target.dispatchEvent(new MouseEvent(a.type, a));
              }
            }, 0));
        }
        function o() {
          typeof document < "u" &&
            document.body.hasAttribute("data-wf-focus-within") &&
            zs.env.safari &&
            (document.addEventListener("mousedown", i, !0),
            document.addEventListener("mouseup", r, !0),
            document.addEventListener("click", r, !0));
        }
        return { ready: o };
      })
    );
  });
  var Zs = c((UB, Qs) => {
    "use strict";
    var Pi = window.jQuery,
      Qe = {},
      rn = [],
      $s = ".w-ix",
      nn = {
        reset: function (e, t) {
          t.__wf_intro = null;
        },
        intro: function (e, t) {
          t.__wf_intro ||
            ((t.__wf_intro = !0), Pi(t).triggerHandler(Qe.types.INTRO));
        },
        outro: function (e, t) {
          t.__wf_intro &&
            ((t.__wf_intro = null), Pi(t).triggerHandler(Qe.types.OUTRO));
        },
      };
    Qe.triggers = {};
    Qe.types = { INTRO: "w-ix-intro" + $s, OUTRO: "w-ix-outro" + $s };
    Qe.init = function () {
      for (var e = rn.length, t = 0; t < e; t++) {
        var r = rn[t];
        r[0](0, r[1]);
      }
      (rn = []), Pi.extend(Qe.triggers, nn);
    };
    Qe.async = function () {
      for (var e in nn) {
        var t = nn[e];
        nn.hasOwnProperty(e) &&
          (Qe.triggers[e] = function (r, n) {
            rn.push([t, n]);
          });
      }
    };
    Qe.async();
    Qs.exports = Qe;
  });
  var ru = c((BB, tu) => {
    "use strict";
    var qi = Zs();
    function Js(e, t) {
      var r = document.createEvent("CustomEvent");
      r.initCustomEvent(t, !0, !0, null), e.dispatchEvent(r);
    }
    var nb = window.jQuery,
      on = {},
      eu = ".w-ix",
      ib = {
        reset: function (e, t) {
          qi.triggers.reset(e, t);
        },
        intro: function (e, t) {
          qi.triggers.intro(e, t), Js(t, "COMPONENT_ACTIVE");
        },
        outro: function (e, t) {
          qi.triggers.outro(e, t), Js(t, "COMPONENT_INACTIVE");
        },
      };
    on.triggers = {};
    on.types = { INTRO: "w-ix-intro" + eu, OUTRO: "w-ix-outro" + eu };
    nb.extend(on.triggers, ib);
    tu.exports = on;
  });
  var nu = c((kB, it) => {
    function Fi(e) {
      return (
        (it.exports = Fi =
          typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  typeof Symbol == "function" &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              }),
        (it.exports.__esModule = !0),
        (it.exports.default = it.exports),
        Fi(e)
      );
    }
    (it.exports = Fi),
      (it.exports.__esModule = !0),
      (it.exports.default = it.exports);
  });
  var an = c((XB, gr) => {
    var ob = nu().default;
    function iu(e) {
      if (typeof WeakMap != "function") return null;
      var t = new WeakMap(),
        r = new WeakMap();
      return (iu = function (i) {
        return i ? r : t;
      })(e);
    }
    function ab(e, t) {
      if (!t && e && e.__esModule) return e;
      if (e === null || (ob(e) != "object" && typeof e != "function"))
        return { default: e };
      var r = iu(t);
      if (r && r.has(e)) return r.get(e);
      var n = { __proto__: null },
        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var o in e)
        if (o !== "default" && {}.hasOwnProperty.call(e, o)) {
          var s = i ? Object.getOwnPropertyDescriptor(e, o) : null;
          s && (s.get || s.set)
            ? Object.defineProperty(n, o, s)
            : (n[o] = e[o]);
        }
      return (n.default = e), r && r.set(e, n), n;
    }
    (gr.exports = ab),
      (gr.exports.__esModule = !0),
      (gr.exports.default = gr.exports);
  });
  var ou = c((HB, hr) => {
    function sb(e) {
      return e && e.__esModule ? e : { default: e };
    }
    (hr.exports = sb),
      (hr.exports.__esModule = !0),
      (hr.exports.default = hr.exports);
  });
  var de = c((WB, au) => {
    var sn = function (e) {
      return e && e.Math == Math && e;
    };
    au.exports =
      sn(typeof globalThis == "object" && globalThis) ||
      sn(typeof window == "object" && window) ||
      sn(typeof self == "object" && self) ||
      sn(typeof global == "object" && global) ||
      (function () {
        return this;
      })() ||
      Function("return this")();
  });
  var qt = c((jB, su) => {
    su.exports = function (e) {
      try {
        return !!e();
      } catch {
        return !0;
      }
    };
  });
  var bt = c((zB, uu) => {
    var ub = qt();
    uu.exports = !ub(function () {
      return (
        Object.defineProperty({}, 1, {
          get: function () {
            return 7;
          },
        })[1] != 7
      );
    });
  });
  var un = c((KB, cu) => {
    var vr = Function.prototype.call;
    cu.exports = vr.bind
      ? vr.bind(vr)
      : function () {
          return vr.apply(vr, arguments);
        };
  });
  var pu = c((du) => {
    "use strict";
    var lu = {}.propertyIsEnumerable,
      fu = Object.getOwnPropertyDescriptor,
      cb = fu && !lu.call({ 1: 2 }, 1);
    du.f = cb
      ? function (t) {
          var r = fu(this, t);
          return !!r && r.enumerable;
        }
      : lu;
  });
  var Mi = c(($B, gu) => {
    gu.exports = function (e, t) {
      return {
        enumerable: !(e & 1),
        configurable: !(e & 2),
        writable: !(e & 4),
        value: t,
      };
    };
  });
  var Ue = c((QB, vu) => {
    var hu = Function.prototype,
      Di = hu.bind,
      Gi = hu.call,
      lb = Di && Di.bind(Gi);
    vu.exports = Di
      ? function (e) {
          return e && lb(Gi, e);
        }
      : function (e) {
          return (
            e &&
            function () {
              return Gi.apply(e, arguments);
            }
          );
        };
  });
  var mu = c((ZB, Eu) => {
    var yu = Ue(),
      fb = yu({}.toString),
      db = yu("".slice);
    Eu.exports = function (e) {
      return db(fb(e), 8, -1);
    };
  });
  var bu = c((JB, _u) => {
    var pb = de(),
      gb = Ue(),
      hb = qt(),
      vb = mu(),
      Vi = pb.Object,
      yb = gb("".split);
    _u.exports = hb(function () {
      return !Vi("z").propertyIsEnumerable(0);
    })
      ? function (e) {
          return vb(e) == "String" ? yb(e, "") : Vi(e);
        }
      : Vi;
  });
  var Ui = c((e5, Tu) => {
    var Eb = de(),
      mb = Eb.TypeError;
    Tu.exports = function (e) {
      if (e == null) throw mb("Can't call method on " + e);
      return e;
    };
  });
  var yr = c((t5, Iu) => {
    var _b = bu(),
      bb = Ui();
    Iu.exports = function (e) {
      return _b(bb(e));
    };
  });
  var Ze = c((r5, Ou) => {
    Ou.exports = function (e) {
      return typeof e == "function";
    };
  });
  var Ft = c((n5, Au) => {
    var Tb = Ze();
    Au.exports = function (e) {
      return typeof e == "object" ? e !== null : Tb(e);
    };
  });
  var Er = c((i5, Su) => {
    var Bi = de(),
      Ib = Ze(),
      Ob = function (e) {
        return Ib(e) ? e : void 0;
      };
    Su.exports = function (e, t) {
      return arguments.length < 2 ? Ob(Bi[e]) : Bi[e] && Bi[e][t];
    };
  });
  var xu = c((o5, wu) => {
    var Ab = Ue();
    wu.exports = Ab({}.isPrototypeOf);
  });
  var Ru = c((a5, Cu) => {
    var Sb = Er();
    Cu.exports = Sb("navigator", "userAgent") || "";
  });
  var Du = c((s5, Mu) => {
    var Fu = de(),
      ki = Ru(),
      Lu = Fu.process,
      Nu = Fu.Deno,
      Pu = (Lu && Lu.versions) || (Nu && Nu.version),
      qu = Pu && Pu.v8,
      Be,
      cn;
    qu &&
      ((Be = qu.split(".")),
      (cn = Be[0] > 0 && Be[0] < 4 ? 1 : +(Be[0] + Be[1])));
    !cn &&
      ki &&
      ((Be = ki.match(/Edge\/(\d+)/)),
      (!Be || Be[1] >= 74) &&
        ((Be = ki.match(/Chrome\/(\d+)/)), Be && (cn = +Be[1])));
    Mu.exports = cn;
  });
  var Xi = c((u5, Vu) => {
    var Gu = Du(),
      wb = qt();
    Vu.exports =
      !!Object.getOwnPropertySymbols &&
      !wb(function () {
        var e = Symbol();
        return (
          !String(e) ||
          !(Object(e) instanceof Symbol) ||
          (!Symbol.sham && Gu && Gu < 41)
        );
      });
  });
  var Hi = c((c5, Uu) => {
    var xb = Xi();
    Uu.exports = xb && !Symbol.sham && typeof Symbol.iterator == "symbol";
  });
  var Wi = c((l5, Bu) => {
    var Cb = de(),
      Rb = Er(),
      Lb = Ze(),
      Nb = xu(),
      Pb = Hi(),
      qb = Cb.Object;
    Bu.exports = Pb
      ? function (e) {
          return typeof e == "symbol";
        }
      : function (e) {
          var t = Rb("Symbol");
          return Lb(t) && Nb(t.prototype, qb(e));
        };
  });
  var Xu = c((f5, ku) => {
    var Fb = de(),
      Mb = Fb.String;
    ku.exports = function (e) {
      try {
        return Mb(e);
      } catch {
        return "Object";
      }
    };
  });
  var Wu = c((d5, Hu) => {
    var Db = de(),
      Gb = Ze(),
      Vb = Xu(),
      Ub = Db.TypeError;
    Hu.exports = function (e) {
      if (Gb(e)) return e;
      throw Ub(Vb(e) + " is not a function");
    };
  });
  var zu = c((p5, ju) => {
    var Bb = Wu();
    ju.exports = function (e, t) {
      var r = e[t];
      return r == null ? void 0 : Bb(r);
    };
  });
  var Yu = c((g5, Ku) => {
    var kb = de(),
      ji = un(),
      zi = Ze(),
      Ki = Ft(),
      Xb = kb.TypeError;
    Ku.exports = function (e, t) {
      var r, n;
      if (
        (t === "string" && zi((r = e.toString)) && !Ki((n = ji(r, e)))) ||
        (zi((r = e.valueOf)) && !Ki((n = ji(r, e)))) ||
        (t !== "string" && zi((r = e.toString)) && !Ki((n = ji(r, e))))
      )
        return n;
      throw Xb("Can't convert object to primitive value");
    };
  });
  var Qu = c((h5, $u) => {
    $u.exports = !1;
  });
  var ln = c((v5, Ju) => {
    var Zu = de(),
      Hb = Object.defineProperty;
    Ju.exports = function (e, t) {
      try {
        Hb(Zu, e, { value: t, configurable: !0, writable: !0 });
      } catch {
        Zu[e] = t;
      }
      return t;
    };
  });
  var fn = c((y5, tc) => {
    var Wb = de(),
      jb = ln(),
      ec = "__core-js_shared__",
      zb = Wb[ec] || jb(ec, {});
    tc.exports = zb;
  });
  var Yi = c((E5, nc) => {
    var Kb = Qu(),
      rc = fn();
    (nc.exports = function (e, t) {
      return rc[e] || (rc[e] = t !== void 0 ? t : {});
    })("versions", []).push({
      version: "3.19.0",
      mode: Kb ? "pure" : "global",
      copyright: "\xA9 2021 Denis Pushkarev (zloirock.ru)",
    });
  });
  var oc = c((m5, ic) => {
    var Yb = de(),
      $b = Ui(),
      Qb = Yb.Object;
    ic.exports = function (e) {
      return Qb($b(e));
    };
  });
  var pt = c((_5, ac) => {
    var Zb = Ue(),
      Jb = oc(),
      eT = Zb({}.hasOwnProperty);
    ac.exports =
      Object.hasOwn ||
      function (t, r) {
        return eT(Jb(t), r);
      };
  });
  var $i = c((b5, sc) => {
    var tT = Ue(),
      rT = 0,
      nT = Math.random(),
      iT = tT((1).toString);
    sc.exports = function (e) {
      return "Symbol(" + (e === void 0 ? "" : e) + ")_" + iT(++rT + nT, 36);
    };
  });
  var Qi = c((T5, dc) => {
    var oT = de(),
      aT = Yi(),
      uc = pt(),
      sT = $i(),
      cc = Xi(),
      fc = Hi(),
      Mt = aT("wks"),
      Tt = oT.Symbol,
      lc = Tt && Tt.for,
      uT = fc ? Tt : (Tt && Tt.withoutSetter) || sT;
    dc.exports = function (e) {
      if (!uc(Mt, e) || !(cc || typeof Mt[e] == "string")) {
        var t = "Symbol." + e;
        cc && uc(Tt, e)
          ? (Mt[e] = Tt[e])
          : fc && lc
          ? (Mt[e] = lc(t))
          : (Mt[e] = uT(t));
      }
      return Mt[e];
    };
  });
  var vc = c((I5, hc) => {
    var cT = de(),
      lT = un(),
      pc = Ft(),
      gc = Wi(),
      fT = zu(),
      dT = Yu(),
      pT = Qi(),
      gT = cT.TypeError,
      hT = pT("toPrimitive");
    hc.exports = function (e, t) {
      if (!pc(e) || gc(e)) return e;
      var r = fT(e, hT),
        n;
      if (r) {
        if (
          (t === void 0 && (t = "default"), (n = lT(r, e, t)), !pc(n) || gc(n))
        )
          return n;
        throw gT("Can't convert object to primitive value");
      }
      return t === void 0 && (t = "number"), dT(e, t);
    };
  });
  var Zi = c((O5, yc) => {
    var vT = vc(),
      yT = Wi();
    yc.exports = function (e) {
      var t = vT(e, "string");
      return yT(t) ? t : t + "";
    };
  });
  var eo = c((A5, mc) => {
    var ET = de(),
      Ec = Ft(),
      Ji = ET.document,
      mT = Ec(Ji) && Ec(Ji.createElement);
    mc.exports = function (e) {
      return mT ? Ji.createElement(e) : {};
    };
  });
  var to = c((S5, _c) => {
    var _T = bt(),
      bT = qt(),
      TT = eo();
    _c.exports =
      !_T &&
      !bT(function () {
        return (
          Object.defineProperty(TT("div"), "a", {
            get: function () {
              return 7;
            },
          }).a != 7
        );
      });
  });
  var ro = c((Tc) => {
    var IT = bt(),
      OT = un(),
      AT = pu(),
      ST = Mi(),
      wT = yr(),
      xT = Zi(),
      CT = pt(),
      RT = to(),
      bc = Object.getOwnPropertyDescriptor;
    Tc.f = IT
      ? bc
      : function (t, r) {
          if (((t = wT(t)), (r = xT(r)), RT))
            try {
              return bc(t, r);
            } catch {}
          if (CT(t, r)) return ST(!OT(AT.f, t, r), t[r]);
        };
  });
  var mr = c((x5, Oc) => {
    var Ic = de(),
      LT = Ft(),
      NT = Ic.String,
      PT = Ic.TypeError;
    Oc.exports = function (e) {
      if (LT(e)) return e;
      throw PT(NT(e) + " is not an object");
    };
  });
  var _r = c((wc) => {
    var qT = de(),
      FT = bt(),
      MT = to(),
      Ac = mr(),
      DT = Zi(),
      GT = qT.TypeError,
      Sc = Object.defineProperty;
    wc.f = FT
      ? Sc
      : function (t, r, n) {
          if ((Ac(t), (r = DT(r)), Ac(n), MT))
            try {
              return Sc(t, r, n);
            } catch {}
          if ("get" in n || "set" in n) throw GT("Accessors not supported");
          return "value" in n && (t[r] = n.value), t;
        };
  });
  var dn = c((R5, xc) => {
    var VT = bt(),
      UT = _r(),
      BT = Mi();
    xc.exports = VT
      ? function (e, t, r) {
          return UT.f(e, t, BT(1, r));
        }
      : function (e, t, r) {
          return (e[t] = r), e;
        };
  });
  var io = c((L5, Cc) => {
    var kT = Ue(),
      XT = Ze(),
      no = fn(),
      HT = kT(Function.toString);
    XT(no.inspectSource) ||
      (no.inspectSource = function (e) {
        return HT(e);
      });
    Cc.exports = no.inspectSource;
  });
  var Nc = c((N5, Lc) => {
    var WT = de(),
      jT = Ze(),
      zT = io(),
      Rc = WT.WeakMap;
    Lc.exports = jT(Rc) && /native code/.test(zT(Rc));
  });
  var oo = c((P5, qc) => {
    var KT = Yi(),
      YT = $i(),
      Pc = KT("keys");
    qc.exports = function (e) {
      return Pc[e] || (Pc[e] = YT(e));
    };
  });
  var pn = c((q5, Fc) => {
    Fc.exports = {};
  });
  var Bc = c((F5, Uc) => {
    var $T = Nc(),
      Vc = de(),
      ao = Ue(),
      QT = Ft(),
      ZT = dn(),
      so = pt(),
      uo = fn(),
      JT = oo(),
      eI = pn(),
      Mc = "Object already initialized",
      lo = Vc.TypeError,
      tI = Vc.WeakMap,
      gn,
      br,
      hn,
      rI = function (e) {
        return hn(e) ? br(e) : gn(e, {});
      },
      nI = function (e) {
        return function (t) {
          var r;
          if (!QT(t) || (r = br(t)).type !== e)
            throw lo("Incompatible receiver, " + e + " required");
          return r;
        };
      };
    $T || uo.state
      ? ((gt = uo.state || (uo.state = new tI())),
        (Dc = ao(gt.get)),
        (co = ao(gt.has)),
        (Gc = ao(gt.set)),
        (gn = function (e, t) {
          if (co(gt, e)) throw new lo(Mc);
          return (t.facade = e), Gc(gt, e, t), t;
        }),
        (br = function (e) {
          return Dc(gt, e) || {};
        }),
        (hn = function (e) {
          return co(gt, e);
        }))
      : ((It = JT("state")),
        (eI[It] = !0),
        (gn = function (e, t) {
          if (so(e, It)) throw new lo(Mc);
          return (t.facade = e), ZT(e, It, t), t;
        }),
        (br = function (e) {
          return so(e, It) ? e[It] : {};
        }),
        (hn = function (e) {
          return so(e, It);
        }));
    var gt, Dc, co, Gc, It;
    Uc.exports = { set: gn, get: br, has: hn, enforce: rI, getterFor: nI };
  });
  var Hc = c((M5, Xc) => {
    var fo = bt(),
      iI = pt(),
      kc = Function.prototype,
      oI = fo && Object.getOwnPropertyDescriptor,
      po = iI(kc, "name"),
      aI = po && function () {}.name === "something",
      sI = po && (!fo || (fo && oI(kc, "name").configurable));
    Xc.exports = { EXISTS: po, PROPER: aI, CONFIGURABLE: sI };
  });
  var Yc = c((D5, Kc) => {
    var uI = de(),
      Wc = Ze(),
      cI = pt(),
      jc = dn(),
      lI = ln(),
      fI = io(),
      zc = Bc(),
      dI = Hc().CONFIGURABLE,
      pI = zc.get,
      gI = zc.enforce,
      hI = String(String).split("String");
    (Kc.exports = function (e, t, r, n) {
      var i = n ? !!n.unsafe : !1,
        o = n ? !!n.enumerable : !1,
        s = n ? !!n.noTargetGet : !1,
        a = n && n.name !== void 0 ? n.name : t,
        u;
      if (
        (Wc(r) &&
          (String(a).slice(0, 7) === "Symbol(" &&
            (a = "[" + String(a).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"),
          (!cI(r, "name") || (dI && r.name !== a)) && jc(r, "name", a),
          (u = gI(r)),
          u.source || (u.source = hI.join(typeof a == "string" ? a : ""))),
        e === uI)
      ) {
        o ? (e[t] = r) : lI(t, r);
        return;
      } else i ? !s && e[t] && (o = !0) : delete e[t];
      o ? (e[t] = r) : jc(e, t, r);
    })(Function.prototype, "toString", function () {
      return (Wc(this) && pI(this).source) || fI(this);
    });
  });
  var go = c((G5, $c) => {
    var vI = Math.ceil,
      yI = Math.floor;
    $c.exports = function (e) {
      var t = +e;
      return t !== t || t === 0 ? 0 : (t > 0 ? yI : vI)(t);
    };
  });
  var Zc = c((V5, Qc) => {
    var EI = go(),
      mI = Math.max,
      _I = Math.min;
    Qc.exports = function (e, t) {
      var r = EI(e);
      return r < 0 ? mI(r + t, 0) : _I(r, t);
    };
  });
  var el = c((U5, Jc) => {
    var bI = go(),
      TI = Math.min;
    Jc.exports = function (e) {
      return e > 0 ? TI(bI(e), 9007199254740991) : 0;
    };
  });
  var rl = c((B5, tl) => {
    var II = el();
    tl.exports = function (e) {
      return II(e.length);
    };
  });
  var ho = c((k5, il) => {
    var OI = yr(),
      AI = Zc(),
      SI = rl(),
      nl = function (e) {
        return function (t, r, n) {
          var i = OI(t),
            o = SI(i),
            s = AI(n, o),
            a;
          if (e && r != r) {
            for (; o > s; ) if (((a = i[s++]), a != a)) return !0;
          } else
            for (; o > s; s++)
              if ((e || s in i) && i[s] === r) return e || s || 0;
          return !e && -1;
        };
      };
    il.exports = { includes: nl(!0), indexOf: nl(!1) };
  });
  var yo = c((X5, al) => {
    var wI = Ue(),
      vo = pt(),
      xI = yr(),
      CI = ho().indexOf,
      RI = pn(),
      ol = wI([].push);
    al.exports = function (e, t) {
      var r = xI(e),
        n = 0,
        i = [],
        o;
      for (o in r) !vo(RI, o) && vo(r, o) && ol(i, o);
      for (; t.length > n; ) vo(r, (o = t[n++])) && (~CI(i, o) || ol(i, o));
      return i;
    };
  });
  var vn = c((H5, sl) => {
    sl.exports = [
      "constructor",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "toLocaleString",
      "toString",
      "valueOf",
    ];
  });
  var cl = c((ul) => {
    var LI = yo(),
      NI = vn(),
      PI = NI.concat("length", "prototype");
    ul.f =
      Object.getOwnPropertyNames ||
      function (t) {
        return LI(t, PI);
      };
  });
  var fl = c((ll) => {
    ll.f = Object.getOwnPropertySymbols;
  });
  var pl = c((z5, dl) => {
    var qI = Er(),
      FI = Ue(),
      MI = cl(),
      DI = fl(),
      GI = mr(),
      VI = FI([].concat);
    dl.exports =
      qI("Reflect", "ownKeys") ||
      function (t) {
        var r = MI.f(GI(t)),
          n = DI.f;
        return n ? VI(r, n(t)) : r;
      };
  });
  var hl = c((K5, gl) => {
    var UI = pt(),
      BI = pl(),
      kI = ro(),
      XI = _r();
    gl.exports = function (e, t) {
      for (var r = BI(t), n = XI.f, i = kI.f, o = 0; o < r.length; o++) {
        var s = r[o];
        UI(e, s) || n(e, s, i(t, s));
      }
    };
  });
  var yl = c((Y5, vl) => {
    var HI = qt(),
      WI = Ze(),
      jI = /#|\.prototype\./,
      Tr = function (e, t) {
        var r = KI[zI(e)];
        return r == $I ? !0 : r == YI ? !1 : WI(t) ? HI(t) : !!t;
      },
      zI = (Tr.normalize = function (e) {
        return String(e).replace(jI, ".").toLowerCase();
      }),
      KI = (Tr.data = {}),
      YI = (Tr.NATIVE = "N"),
      $I = (Tr.POLYFILL = "P");
    vl.exports = Tr;
  });
  var ml = c(($5, El) => {
    var Eo = de(),
      QI = ro().f,
      ZI = dn(),
      JI = Yc(),
      e0 = ln(),
      t0 = hl(),
      r0 = yl();
    El.exports = function (e, t) {
      var r = e.target,
        n = e.global,
        i = e.stat,
        o,
        s,
        a,
        u,
        f,
        p;
      if (
        (n
          ? (s = Eo)
          : i
          ? (s = Eo[r] || e0(r, {}))
          : (s = (Eo[r] || {}).prototype),
        s)
      )
        for (a in t) {
          if (
            ((f = t[a]),
            e.noTargetGet ? ((p = QI(s, a)), (u = p && p.value)) : (u = s[a]),
            (o = r0(n ? a : r + (i ? "." : "#") + a, e.forced)),
            !o && u !== void 0)
          ) {
            if (typeof f == typeof u) continue;
            t0(f, u);
          }
          (e.sham || (u && u.sham)) && ZI(f, "sham", !0), JI(s, a, f, e);
        }
    };
  });
  var bl = c((Q5, _l) => {
    var n0 = yo(),
      i0 = vn();
    _l.exports =
      Object.keys ||
      function (t) {
        return n0(t, i0);
      };
  });
  var Il = c((Z5, Tl) => {
    var o0 = bt(),
      a0 = _r(),
      s0 = mr(),
      u0 = yr(),
      c0 = bl();
    Tl.exports = o0
      ? Object.defineProperties
      : function (t, r) {
          s0(t);
          for (var n = u0(r), i = c0(r), o = i.length, s = 0, a; o > s; )
            a0.f(t, (a = i[s++]), n[a]);
          return t;
        };
  });
  var Al = c((J5, Ol) => {
    var l0 = Er();
    Ol.exports = l0("document", "documentElement");
  });
  var Pl = c((ek, Nl) => {
    var f0 = mr(),
      d0 = Il(),
      Sl = vn(),
      p0 = pn(),
      g0 = Al(),
      h0 = eo(),
      v0 = oo(),
      wl = ">",
      xl = "<",
      _o = "prototype",
      bo = "script",
      Rl = v0("IE_PROTO"),
      mo = function () {},
      Ll = function (e) {
        return xl + bo + wl + e + xl + "/" + bo + wl;
      },
      Cl = function (e) {
        e.write(Ll("")), e.close();
        var t = e.parentWindow.Object;
        return (e = null), t;
      },
      y0 = function () {
        var e = h0("iframe"),
          t = "java" + bo + ":",
          r;
        return (
          (e.style.display = "none"),
          g0.appendChild(e),
          (e.src = String(t)),
          (r = e.contentWindow.document),
          r.open(),
          r.write(Ll("document.F=Object")),
          r.close(),
          r.F
        );
      },
      yn,
      En = function () {
        try {
          yn = new ActiveXObject("htmlfile");
        } catch {}
        En =
          typeof document < "u"
            ? document.domain && yn
              ? Cl(yn)
              : y0()
            : Cl(yn);
        for (var e = Sl.length; e--; ) delete En[_o][Sl[e]];
        return En();
      };
    p0[Rl] = !0;
    Nl.exports =
      Object.create ||
      function (t, r) {
        var n;
        return (
          t !== null
            ? ((mo[_o] = f0(t)), (n = new mo()), (mo[_o] = null), (n[Rl] = t))
            : (n = En()),
          r === void 0 ? n : d0(n, r)
        );
      };
  });
  var Fl = c((tk, ql) => {
    var E0 = Qi(),
      m0 = Pl(),
      _0 = _r(),
      To = E0("unscopables"),
      Io = Array.prototype;
    Io[To] == null && _0.f(Io, To, { configurable: !0, value: m0(null) });
    ql.exports = function (e) {
      Io[To][e] = !0;
    };
  });
  var Ml = c(() => {
    "use strict";
    var b0 = ml(),
      T0 = ho().includes,
      I0 = Fl();
    b0(
      { target: "Array", proto: !0 },
      {
        includes: function (t) {
          return T0(this, t, arguments.length > 1 ? arguments[1] : void 0);
        },
      }
    );
    I0("includes");
  });
  var Gl = c((ik, Dl) => {
    var O0 = de(),
      A0 = Ue();
    Dl.exports = function (e, t) {
      return A0(O0[e].prototype[t]);
    };
  });
  var Ul = c((ok, Vl) => {
    Ml();
    var S0 = Gl();
    Vl.exports = S0("Array", "includes");
  });
  var kl = c((ak, Bl) => {
    var w0 = Ul();
    Bl.exports = w0;
  });
  var Hl = c((sk, Xl) => {
    var x0 = kl();
    Xl.exports = x0;
  });
  var Oo = c((uk, Wl) => {
    var C0 =
      typeof global == "object" && global && global.Object === Object && global;
    Wl.exports = C0;
  });
  var ke = c((ck, jl) => {
    var R0 = Oo(),
      L0 = typeof self == "object" && self && self.Object === Object && self,
      N0 = R0 || L0 || Function("return this")();
    jl.exports = N0;
  });
  var Dt = c((lk, zl) => {
    var P0 = ke(),
      q0 = P0.Symbol;
    zl.exports = q0;
  });
  var Ql = c((fk, $l) => {
    var Kl = Dt(),
      Yl = Object.prototype,
      F0 = Yl.hasOwnProperty,
      M0 = Yl.toString,
      Ir = Kl ? Kl.toStringTag : void 0;
    function D0(e) {
      var t = F0.call(e, Ir),
        r = e[Ir];
      try {
        e[Ir] = void 0;
        var n = !0;
      } catch {}
      var i = M0.call(e);
      return n && (t ? (e[Ir] = r) : delete e[Ir]), i;
    }
    $l.exports = D0;
  });
  var Jl = c((dk, Zl) => {
    var G0 = Object.prototype,
      V0 = G0.toString;
    function U0(e) {
      return V0.call(e);
    }
    Zl.exports = U0;
  });
  var ht = c((pk, rf) => {
    var ef = Dt(),
      B0 = Ql(),
      k0 = Jl(),
      X0 = "[object Null]",
      H0 = "[object Undefined]",
      tf = ef ? ef.toStringTag : void 0;
    function W0(e) {
      return e == null
        ? e === void 0
          ? H0
          : X0
        : tf && tf in Object(e)
        ? B0(e)
        : k0(e);
    }
    rf.exports = W0;
  });
  var Ao = c((gk, nf) => {
    function j0(e, t) {
      return function (r) {
        return e(t(r));
      };
    }
    nf.exports = j0;
  });
  var So = c((hk, of) => {
    var z0 = Ao(),
      K0 = z0(Object.getPrototypeOf, Object);
    of.exports = K0;
  });
  var ot = c((vk, af) => {
    function Y0(e) {
      return e != null && typeof e == "object";
    }
    af.exports = Y0;
  });
  var wo = c((yk, uf) => {
    var $0 = ht(),
      Q0 = So(),
      Z0 = ot(),
      J0 = "[object Object]",
      eO = Function.prototype,
      tO = Object.prototype,
      sf = eO.toString,
      rO = tO.hasOwnProperty,
      nO = sf.call(Object);
    function iO(e) {
      if (!Z0(e) || $0(e) != J0) return !1;
      var t = Q0(e);
      if (t === null) return !0;
      var r = rO.call(t, "constructor") && t.constructor;
      return typeof r == "function" && r instanceof r && sf.call(r) == nO;
    }
    uf.exports = iO;
  });
  var cf = c((xo) => {
    "use strict";
    Object.defineProperty(xo, "__esModule", { value: !0 });
    xo.default = oO;
    function oO(e) {
      var t,
        r = e.Symbol;
      return (
        typeof r == "function"
          ? r.observable
            ? (t = r.observable)
            : ((t = r("observable")), (r.observable = t))
          : (t = "@@observable"),
        t
      );
    }
  });
  var lf = c((Ro, Co) => {
    "use strict";
    Object.defineProperty(Ro, "__esModule", { value: !0 });
    var aO = cf(),
      sO = uO(aO);
    function uO(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var Gt;
    typeof self < "u"
      ? (Gt = self)
      : typeof window < "u"
      ? (Gt = window)
      : typeof global < "u"
      ? (Gt = global)
      : typeof Co < "u"
      ? (Gt = Co)
      : (Gt = Function("return this")());
    var cO = (0, sO.default)(Gt);
    Ro.default = cO;
  });
  var Lo = c((Or) => {
    "use strict";
    Or.__esModule = !0;
    Or.ActionTypes = void 0;
    Or.default = gf;
    var lO = wo(),
      fO = pf(lO),
      dO = lf(),
      ff = pf(dO);
    function pf(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var df = (Or.ActionTypes = { INIT: "@@redux/INIT" });
    function gf(e, t, r) {
      var n;
      if (
        (typeof t == "function" && typeof r > "u" && ((r = t), (t = void 0)),
        typeof r < "u")
      ) {
        if (typeof r != "function")
          throw new Error("Expected the enhancer to be a function.");
        return r(gf)(e, t);
      }
      if (typeof e != "function")
        throw new Error("Expected the reducer to be a function.");
      var i = e,
        o = t,
        s = [],
        a = s,
        u = !1;
      function f() {
        a === s && (a = s.slice());
      }
      function p() {
        return o;
      }
      function g(m) {
        if (typeof m != "function")
          throw new Error("Expected listener to be a function.");
        var A = !0;
        return (
          f(),
          a.push(m),
          function () {
            if (A) {
              (A = !1), f();
              var w = a.indexOf(m);
              a.splice(w, 1);
            }
          }
        );
      }
      function d(m) {
        if (!(0, fO.default)(m))
          throw new Error(
            "Actions must be plain objects. Use custom middleware for async actions."
          );
        if (typeof m.type > "u")
          throw new Error(
            'Actions may not have an undefined "type" property. Have you misspelled a constant?'
          );
        if (u) throw new Error("Reducers may not dispatch actions.");
        try {
          (u = !0), (o = i(o, m));
        } finally {
          u = !1;
        }
        for (var A = (s = a), y = 0; y < A.length; y++) A[y]();
        return m;
      }
      function v(m) {
        if (typeof m != "function")
          throw new Error("Expected the nextReducer to be a function.");
        (i = m), d({ type: df.INIT });
      }
      function b() {
        var m,
          A = g;
        return (
          (m = {
            subscribe: function (w) {
              if (typeof w != "object")
                throw new TypeError("Expected the observer to be an object.");
              function S() {
                w.next && w.next(p());
              }
              S();
              var C = A(S);
              return { unsubscribe: C };
            },
          }),
          (m[ff.default] = function () {
            return this;
          }),
          m
        );
      }
      return (
        d({ type: df.INIT }),
        (n = { dispatch: d, subscribe: g, getState: p, replaceReducer: v }),
        (n[ff.default] = b),
        n
      );
    }
  });
  var Po = c((No) => {
    "use strict";
    No.__esModule = !0;
    No.default = pO;
    function pO(e) {
      typeof console < "u" &&
        typeof console.error == "function" &&
        console.error(e);
      try {
        throw new Error(e);
      } catch {}
    }
  });
  var yf = c((qo) => {
    "use strict";
    qo.__esModule = !0;
    qo.default = EO;
    var hf = Lo(),
      gO = wo(),
      bk = vf(gO),
      hO = Po(),
      Tk = vf(hO);
    function vf(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function vO(e, t) {
      var r = t && t.type,
        n = (r && '"' + r.toString() + '"') || "an action";
      return (
        "Given action " +
        n +
        ', reducer "' +
        e +
        '" returned undefined. To ignore an action, you must explicitly return the previous state.'
      );
    }
    function yO(e) {
      Object.keys(e).forEach(function (t) {
        var r = e[t],
          n = r(void 0, { type: hf.ActionTypes.INIT });
        if (typeof n > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.'
          );
        var i =
          "@@redux/PROBE_UNKNOWN_ACTION_" +
          Math.random().toString(36).substring(7).split("").join(".");
        if (typeof r(void 0, { type: i }) > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined when probed with a random type. ' +
              ("Don't try to handle " +
                hf.ActionTypes.INIT +
                ' or other actions in "redux/*" ') +
              "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined."
          );
      });
    }
    function EO(e) {
      for (var t = Object.keys(e), r = {}, n = 0; n < t.length; n++) {
        var i = t[n];
        typeof e[i] == "function" && (r[i] = e[i]);
      }
      var o = Object.keys(r);
      if (!1) var s;
      var a;
      try {
        yO(r);
      } catch (u) {
        a = u;
      }
      return function () {
        var f =
            arguments.length <= 0 || arguments[0] === void 0
              ? {}
              : arguments[0],
          p = arguments[1];
        if (a) throw a;
        if (!1) var g;
        for (var d = !1, v = {}, b = 0; b < o.length; b++) {
          var m = o[b],
            A = r[m],
            y = f[m],
            w = A(y, p);
          if (typeof w > "u") {
            var S = vO(m, p);
            throw new Error(S);
          }
          (v[m] = w), (d = d || w !== y);
        }
        return d ? v : f;
      };
    }
  });
  var mf = c((Fo) => {
    "use strict";
    Fo.__esModule = !0;
    Fo.default = mO;
    function Ef(e, t) {
      return function () {
        return t(e.apply(void 0, arguments));
      };
    }
    function mO(e, t) {
      if (typeof e == "function") return Ef(e, t);
      if (typeof e != "object" || e === null)
        throw new Error(
          "bindActionCreators expected an object or a function, instead received " +
            (e === null ? "null" : typeof e) +
            '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
        );
      for (var r = Object.keys(e), n = {}, i = 0; i < r.length; i++) {
        var o = r[i],
          s = e[o];
        typeof s == "function" && (n[o] = Ef(s, t));
      }
      return n;
    }
  });
  var Do = c((Mo) => {
    "use strict";
    Mo.__esModule = !0;
    Mo.default = _O;
    function _O() {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      if (t.length === 0)
        return function (o) {
          return o;
        };
      if (t.length === 1) return t[0];
      var n = t[t.length - 1],
        i = t.slice(0, -1);
      return function () {
        return i.reduceRight(function (o, s) {
          return s(o);
        }, n.apply(void 0, arguments));
      };
    }
  });
  var _f = c((Go) => {
    "use strict";
    Go.__esModule = !0;
    var bO =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      };
    Go.default = AO;
    var TO = Do(),
      IO = OO(TO);
    function OO(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function AO() {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      return function (n) {
        return function (i, o, s) {
          var a = n(i, o, s),
            u = a.dispatch,
            f = [],
            p = {
              getState: a.getState,
              dispatch: function (d) {
                return u(d);
              },
            };
          return (
            (f = t.map(function (g) {
              return g(p);
            })),
            (u = IO.default.apply(void 0, f)(a.dispatch)),
            bO({}, a, { dispatch: u })
          );
        };
      };
    }
  });
  var Vo = c((Fe) => {
    "use strict";
    Fe.__esModule = !0;
    Fe.compose =
      Fe.applyMiddleware =
      Fe.bindActionCreators =
      Fe.combineReducers =
      Fe.createStore =
        void 0;
    var SO = Lo(),
      wO = Vt(SO),
      xO = yf(),
      CO = Vt(xO),
      RO = mf(),
      LO = Vt(RO),
      NO = _f(),
      PO = Vt(NO),
      qO = Do(),
      FO = Vt(qO),
      MO = Po(),
      wk = Vt(MO);
    function Vt(e) {
      return e && e.__esModule ? e : { default: e };
    }
    Fe.createStore = wO.default;
    Fe.combineReducers = CO.default;
    Fe.bindActionCreators = LO.default;
    Fe.applyMiddleware = PO.default;
    Fe.compose = FO.default;
  });
  var Xe,
    Uo,
    Je,
    DO,
    GO,
    mn,
    VO,
    Bo = le(() => {
      "use strict";
      (Xe = {
        NAVBAR_OPEN: "NAVBAR_OPEN",
        NAVBAR_CLOSE: "NAVBAR_CLOSE",
        TAB_ACTIVE: "TAB_ACTIVE",
        TAB_INACTIVE: "TAB_INACTIVE",
        SLIDER_ACTIVE: "SLIDER_ACTIVE",
        SLIDER_INACTIVE: "SLIDER_INACTIVE",
        DROPDOWN_OPEN: "DROPDOWN_OPEN",
        DROPDOWN_CLOSE: "DROPDOWN_CLOSE",
        MOUSE_CLICK: "MOUSE_CLICK",
        MOUSE_SECOND_CLICK: "MOUSE_SECOND_CLICK",
        MOUSE_DOWN: "MOUSE_DOWN",
        MOUSE_UP: "MOUSE_UP",
        MOUSE_OVER: "MOUSE_OVER",
        MOUSE_OUT: "MOUSE_OUT",
        MOUSE_MOVE: "MOUSE_MOVE",
        MOUSE_MOVE_IN_VIEWPORT: "MOUSE_MOVE_IN_VIEWPORT",
        SCROLL_INTO_VIEW: "SCROLL_INTO_VIEW",
        SCROLL_OUT_OF_VIEW: "SCROLL_OUT_OF_VIEW",
        SCROLLING_IN_VIEW: "SCROLLING_IN_VIEW",
        ECOMMERCE_CART_OPEN: "ECOMMERCE_CART_OPEN",
        ECOMMERCE_CART_CLOSE: "ECOMMERCE_CART_CLOSE",
        PAGE_START: "PAGE_START",
        PAGE_FINISH: "PAGE_FINISH",
        PAGE_SCROLL_UP: "PAGE_SCROLL_UP",
        PAGE_SCROLL_DOWN: "PAGE_SCROLL_DOWN",
        PAGE_SCROLL: "PAGE_SCROLL",
      }),
        (Uo = { ELEMENT: "ELEMENT", CLASS: "CLASS", PAGE: "PAGE" }),
        (Je = { ELEMENT: "ELEMENT", VIEWPORT: "VIEWPORT" }),
        (DO = { X_AXIS: "X_AXIS", Y_AXIS: "Y_AXIS" }),
        (GO = {
          CHILDREN: "CHILDREN",
          SIBLINGS: "SIBLINGS",
          IMMEDIATE_CHILDREN: "IMMEDIATE_CHILDREN",
        }),
        (mn = {
          FADE_EFFECT: "FADE_EFFECT",
          SLIDE_EFFECT: "SLIDE_EFFECT",
          GROW_EFFECT: "GROW_EFFECT",
          SHRINK_EFFECT: "SHRINK_EFFECT",
          SPIN_EFFECT: "SPIN_EFFECT",
          FLY_EFFECT: "FLY_EFFECT",
          POP_EFFECT: "POP_EFFECT",
          FLIP_EFFECT: "FLIP_EFFECT",
          JIGGLE_EFFECT: "JIGGLE_EFFECT",
          PULSE_EFFECT: "PULSE_EFFECT",
          DROP_EFFECT: "DROP_EFFECT",
          BLINK_EFFECT: "BLINK_EFFECT",
          BOUNCE_EFFECT: "BOUNCE_EFFECT",
          FLIP_LEFT_TO_RIGHT_EFFECT: "FLIP_LEFT_TO_RIGHT_EFFECT",
          FLIP_RIGHT_TO_LEFT_EFFECT: "FLIP_RIGHT_TO_LEFT_EFFECT",
          RUBBER_BAND_EFFECT: "RUBBER_BAND_EFFECT",
          JELLO_EFFECT: "JELLO_EFFECT",
          GROW_BIG_EFFECT: "GROW_BIG_EFFECT",
          SHRINK_BIG_EFFECT: "SHRINK_BIG_EFFECT",
          PLUGIN_LOTTIE_EFFECT: "PLUGIN_LOTTIE_EFFECT",
        }),
        (VO = {
          LEFT: "LEFT",
          RIGHT: "RIGHT",
          BOTTOM: "BOTTOM",
          TOP: "TOP",
          BOTTOM_LEFT: "BOTTOM_LEFT",
          BOTTOM_RIGHT: "BOTTOM_RIGHT",
          TOP_RIGHT: "TOP_RIGHT",
          TOP_LEFT: "TOP_LEFT",
          CLOCKWISE: "CLOCKWISE",
          COUNTER_CLOCKWISE: "COUNTER_CLOCKWISE",
        });
    });
  var Le,
    UO,
    _n = le(() => {
      "use strict";
      (Le = {
        TRANSFORM_MOVE: "TRANSFORM_MOVE",
        TRANSFORM_SCALE: "TRANSFORM_SCALE",
        TRANSFORM_ROTATE: "TRANSFORM_ROTATE",
        TRANSFORM_SKEW: "TRANSFORM_SKEW",
        STYLE_OPACITY: "STYLE_OPACITY",
        STYLE_SIZE: "STYLE_SIZE",
        STYLE_FILTER: "STYLE_FILTER",
        STYLE_FONT_VARIATION: "STYLE_FONT_VARIATION",
        STYLE_BACKGROUND_COLOR: "STYLE_BACKGROUND_COLOR",
        STYLE_BORDER: "STYLE_BORDER",
        STYLE_TEXT_COLOR: "STYLE_TEXT_COLOR",
        OBJECT_VALUE: "OBJECT_VALUE",
        PLUGIN_LOTTIE: "PLUGIN_LOTTIE",
        PLUGIN_SPLINE: "PLUGIN_SPLINE",
        PLUGIN_VARIABLE: "PLUGIN_VARIABLE",
        GENERAL_DISPLAY: "GENERAL_DISPLAY",
        GENERAL_START_ACTION: "GENERAL_START_ACTION",
        GENERAL_CONTINUOUS_ACTION: "GENERAL_CONTINUOUS_ACTION",
        GENERAL_COMBO_CLASS: "GENERAL_COMBO_CLASS",
        GENERAL_STOP_ACTION: "GENERAL_STOP_ACTION",
        GENERAL_LOOP: "GENERAL_LOOP",
        STYLE_BOX_SHADOW: "STYLE_BOX_SHADOW",
      }),
        (UO = {
          ELEMENT: "ELEMENT",
          ELEMENT_CLASS: "ELEMENT_CLASS",
          TRIGGER_ELEMENT: "TRIGGER_ELEMENT",
        });
    });
  var BO,
    bf = le(() => {
      "use strict";
      BO = {
        MOUSE_CLICK_INTERACTION: "MOUSE_CLICK_INTERACTION",
        MOUSE_HOVER_INTERACTION: "MOUSE_HOVER_INTERACTION",
        MOUSE_MOVE_INTERACTION: "MOUSE_MOVE_INTERACTION",
        SCROLL_INTO_VIEW_INTERACTION: "SCROLL_INTO_VIEW_INTERACTION",
        SCROLLING_IN_VIEW_INTERACTION: "SCROLLING_IN_VIEW_INTERACTION",
        MOUSE_MOVE_IN_VIEWPORT_INTERACTION:
          "MOUSE_MOVE_IN_VIEWPORT_INTERACTION",
        PAGE_IS_SCROLLING_INTERACTION: "PAGE_IS_SCROLLING_INTERACTION",
        PAGE_LOAD_INTERACTION: "PAGE_LOAD_INTERACTION",
        PAGE_SCROLLED_INTERACTION: "PAGE_SCROLLED_INTERACTION",
        NAVBAR_INTERACTION: "NAVBAR_INTERACTION",
        DROPDOWN_INTERACTION: "DROPDOWN_INTERACTION",
        ECOMMERCE_CART_INTERACTION: "ECOMMERCE_CART_INTERACTION",
        TAB_INTERACTION: "TAB_INTERACTION",
        SLIDER_INTERACTION: "SLIDER_INTERACTION",
      };
    });
  var kO,
    XO,
    HO,
    WO,
    jO,
    zO,
    KO,
    ko,
    Tf = le(() => {
      "use strict";
      _n();
      ({
        TRANSFORM_MOVE: kO,
        TRANSFORM_SCALE: XO,
        TRANSFORM_ROTATE: HO,
        TRANSFORM_SKEW: WO,
        STYLE_SIZE: jO,
        STYLE_FILTER: zO,
        STYLE_FONT_VARIATION: KO,
      } = Le),
        (ko = {
          [kO]: !0,
          [XO]: !0,
          [HO]: !0,
          [WO]: !0,
          [jO]: !0,
          [zO]: !0,
          [KO]: !0,
        });
    });
  var Ee = {};
  Re(Ee, {
    IX2_ACTION_LIST_PLAYBACK_CHANGED: () => fA,
    IX2_ANIMATION_FRAME_CHANGED: () => oA,
    IX2_CLEAR_REQUESTED: () => rA,
    IX2_ELEMENT_STATE_CHANGED: () => lA,
    IX2_EVENT_LISTENER_ADDED: () => nA,
    IX2_EVENT_STATE_CHANGED: () => iA,
    IX2_INSTANCE_ADDED: () => sA,
    IX2_INSTANCE_REMOVED: () => cA,
    IX2_INSTANCE_STARTED: () => uA,
    IX2_MEDIA_QUERIES_DEFINED: () => pA,
    IX2_PARAMETER_CHANGED: () => aA,
    IX2_PLAYBACK_REQUESTED: () => eA,
    IX2_PREVIEW_REQUESTED: () => JO,
    IX2_RAW_DATA_IMPORTED: () => YO,
    IX2_SESSION_INITIALIZED: () => $O,
    IX2_SESSION_STARTED: () => QO,
    IX2_SESSION_STOPPED: () => ZO,
    IX2_STOP_REQUESTED: () => tA,
    IX2_TEST_FRAME_RENDERED: () => gA,
    IX2_VIEWPORT_WIDTH_CHANGED: () => dA,
  });
  var YO,
    $O,
    QO,
    ZO,
    JO,
    eA,
    tA,
    rA,
    nA,
    iA,
    oA,
    aA,
    sA,
    uA,
    cA,
    lA,
    fA,
    dA,
    pA,
    gA,
    If = le(() => {
      "use strict";
      (YO = "IX2_RAW_DATA_IMPORTED"),
        ($O = "IX2_SESSION_INITIALIZED"),
        (QO = "IX2_SESSION_STARTED"),
        (ZO = "IX2_SESSION_STOPPED"),
        (JO = "IX2_PREVIEW_REQUESTED"),
        (eA = "IX2_PLAYBACK_REQUESTED"),
        (tA = "IX2_STOP_REQUESTED"),
        (rA = "IX2_CLEAR_REQUESTED"),
        (nA = "IX2_EVENT_LISTENER_ADDED"),
        (iA = "IX2_EVENT_STATE_CHANGED"),
        (oA = "IX2_ANIMATION_FRAME_CHANGED"),
        (aA = "IX2_PARAMETER_CHANGED"),
        (sA = "IX2_INSTANCE_ADDED"),
        (uA = "IX2_INSTANCE_STARTED"),
        (cA = "IX2_INSTANCE_REMOVED"),
        (lA = "IX2_ELEMENT_STATE_CHANGED"),
        (fA = "IX2_ACTION_LIST_PLAYBACK_CHANGED"),
        (dA = "IX2_VIEWPORT_WIDTH_CHANGED"),
        (pA = "IX2_MEDIA_QUERIES_DEFINED"),
        (gA = "IX2_TEST_FRAME_RENDERED");
    });
  var Ie = {};
  Re(Ie, {
    ABSTRACT_NODE: () => dS,
    AUTO: () => tS,
    BACKGROUND: () => YA,
    BACKGROUND_COLOR: () => KA,
    BAR_DELIMITER: () => iS,
    BORDER_COLOR: () => $A,
    BOUNDARY_SELECTOR: () => mA,
    CHILDREN: () => oS,
    COLON_DELIMITER: () => nS,
    COLOR: () => QA,
    COMMA_DELIMITER: () => rS,
    CONFIG_UNIT: () => wA,
    CONFIG_VALUE: () => IA,
    CONFIG_X_UNIT: () => OA,
    CONFIG_X_VALUE: () => _A,
    CONFIG_Y_UNIT: () => AA,
    CONFIG_Y_VALUE: () => bA,
    CONFIG_Z_UNIT: () => SA,
    CONFIG_Z_VALUE: () => TA,
    DISPLAY: () => ZA,
    FILTER: () => HA,
    FLEX: () => JA,
    FONT_VARIATION_SETTINGS: () => WA,
    HEIGHT: () => zA,
    HTML_ELEMENT: () => lS,
    IMMEDIATE_CHILDREN: () => aS,
    IX2_ID_DELIMITER: () => hA,
    OPACITY: () => XA,
    PARENT: () => uS,
    PLAIN_OBJECT: () => fS,
    PRESERVE_3D: () => cS,
    RENDER_GENERAL: () => gS,
    RENDER_PLUGIN: () => vS,
    RENDER_STYLE: () => hS,
    RENDER_TRANSFORM: () => pS,
    ROTATE_X: () => DA,
    ROTATE_Y: () => GA,
    ROTATE_Z: () => VA,
    SCALE_3D: () => MA,
    SCALE_X: () => PA,
    SCALE_Y: () => qA,
    SCALE_Z: () => FA,
    SIBLINGS: () => sS,
    SKEW: () => UA,
    SKEW_X: () => BA,
    SKEW_Y: () => kA,
    TRANSFORM: () => xA,
    TRANSLATE_3D: () => NA,
    TRANSLATE_X: () => CA,
    TRANSLATE_Y: () => RA,
    TRANSLATE_Z: () => LA,
    WF_PAGE: () => vA,
    WIDTH: () => jA,
    WILL_CHANGE: () => eS,
    W_MOD_IX: () => EA,
    W_MOD_JS: () => yA,
  });
  var hA,
    vA,
    yA,
    EA,
    mA,
    _A,
    bA,
    TA,
    IA,
    OA,
    AA,
    SA,
    wA,
    xA,
    CA,
    RA,
    LA,
    NA,
    PA,
    qA,
    FA,
    MA,
    DA,
    GA,
    VA,
    UA,
    BA,
    kA,
    XA,
    HA,
    WA,
    jA,
    zA,
    KA,
    YA,
    $A,
    QA,
    ZA,
    JA,
    eS,
    tS,
    rS,
    nS,
    iS,
    oS,
    aS,
    sS,
    uS,
    cS,
    lS,
    fS,
    dS,
    pS,
    gS,
    hS,
    vS,
    Of = le(() => {
      "use strict";
      (hA = "|"),
        (vA = "data-wf-page"),
        (yA = "w-mod-js"),
        (EA = "w-mod-ix"),
        (mA = ".w-dyn-item"),
        (_A = "xValue"),
        (bA = "yValue"),
        (TA = "zValue"),
        (IA = "value"),
        (OA = "xUnit"),
        (AA = "yUnit"),
        (SA = "zUnit"),
        (wA = "unit"),
        (xA = "transform"),
        (CA = "translateX"),
        (RA = "translateY"),
        (LA = "translateZ"),
        (NA = "translate3d"),
        (PA = "scaleX"),
        (qA = "scaleY"),
        (FA = "scaleZ"),
        (MA = "scale3d"),
        (DA = "rotateX"),
        (GA = "rotateY"),
        (VA = "rotateZ"),
        (UA = "skew"),
        (BA = "skewX"),
        (kA = "skewY"),
        (XA = "opacity"),
        (HA = "filter"),
        (WA = "font-variation-settings"),
        (jA = "width"),
        (zA = "height"),
        (KA = "backgroundColor"),
        (YA = "background"),
        ($A = "borderColor"),
        (QA = "color"),
        (ZA = "display"),
        (JA = "flex"),
        (eS = "willChange"),
        (tS = "AUTO"),
        (rS = ","),
        (nS = ":"),
        (iS = "|"),
        (oS = "CHILDREN"),
        (aS = "IMMEDIATE_CHILDREN"),
        (sS = "SIBLINGS"),
        (uS = "PARENT"),
        (cS = "preserve-3d"),
        (lS = "HTML_ELEMENT"),
        (fS = "PLAIN_OBJECT"),
        (dS = "ABSTRACT_NODE"),
        (pS = "RENDER_TRANSFORM"),
        (gS = "RENDER_GENERAL"),
        (hS = "RENDER_STYLE"),
        (vS = "RENDER_PLUGIN");
    });
  var Af = {};
  Re(Af, {
    ActionAppliesTo: () => UO,
    ActionTypeConsts: () => Le,
    EventAppliesTo: () => Uo,
    EventBasedOn: () => Je,
    EventContinuousMouseAxes: () => DO,
    EventLimitAffectedElements: () => GO,
    EventTypeConsts: () => Xe,
    IX2EngineActionTypes: () => Ee,
    IX2EngineConstants: () => Ie,
    InteractionTypeConsts: () => BO,
    QuickEffectDirectionConsts: () => VO,
    QuickEffectIds: () => mn,
    ReducedMotionTypes: () => ko,
  });
  var Ne = le(() => {
    "use strict";
    Bo();
    _n();
    bf();
    Tf();
    If();
    Of();
    _n();
    Bo();
  });
  var yS,
    Sf,
    wf = le(() => {
      "use strict";
      Ne();
      ({ IX2_RAW_DATA_IMPORTED: yS } = Ee),
        (Sf = (e = Object.freeze({}), t) => {
          switch (t.type) {
            case yS:
              return t.payload.ixData || Object.freeze({});
            default:
              return e;
          }
        });
    });
  var Ut = c((ge) => {
    "use strict";
    Object.defineProperty(ge, "__esModule", { value: !0 });
    var ES =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              typeof Symbol == "function" &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          };
    ge.clone = Tn;
    ge.addLast = Rf;
    ge.addFirst = Lf;
    ge.removeLast = Nf;
    ge.removeFirst = Pf;
    ge.insert = qf;
    ge.removeAt = Ff;
    ge.replaceAt = Mf;
    ge.getIn = In;
    ge.set = On;
    ge.setIn = An;
    ge.update = Gf;
    ge.updateIn = Vf;
    ge.merge = Uf;
    ge.mergeDeep = Bf;
    ge.mergeIn = kf;
    ge.omit = Xf;
    ge.addDefaults = Hf;
    var xf = "INVALID_ARGS";
    function Cf(e) {
      throw new Error(e);
    }
    function Xo(e) {
      var t = Object.keys(e);
      return Object.getOwnPropertySymbols
        ? t.concat(Object.getOwnPropertySymbols(e))
        : t;
    }
    var mS = {}.hasOwnProperty;
    function Tn(e) {
      if (Array.isArray(e)) return e.slice();
      for (var t = Xo(e), r = {}, n = 0; n < t.length; n++) {
        var i = t[n];
        r[i] = e[i];
      }
      return r;
    }
    function Pe(e, t, r) {
      var n = r;
      n == null && Cf(xf);
      for (
        var i = !1, o = arguments.length, s = Array(o > 3 ? o - 3 : 0), a = 3;
        a < o;
        a++
      )
        s[a - 3] = arguments[a];
      for (var u = 0; u < s.length; u++) {
        var f = s[u];
        if (f != null) {
          var p = Xo(f);
          if (p.length)
            for (var g = 0; g <= p.length; g++) {
              var d = p[g];
              if (!(e && n[d] !== void 0)) {
                var v = f[d];
                t && bn(n[d]) && bn(v) && (v = Pe(e, t, n[d], v)),
                  !(v === void 0 || v === n[d]) &&
                    (i || ((i = !0), (n = Tn(n))), (n[d] = v));
              }
            }
        }
      }
      return n;
    }
    function bn(e) {
      var t = typeof e > "u" ? "undefined" : ES(e);
      return e != null && (t === "object" || t === "function");
    }
    function Rf(e, t) {
      return Array.isArray(t) ? e.concat(t) : e.concat([t]);
    }
    function Lf(e, t) {
      return Array.isArray(t) ? t.concat(e) : [t].concat(e);
    }
    function Nf(e) {
      return e.length ? e.slice(0, e.length - 1) : e;
    }
    function Pf(e) {
      return e.length ? e.slice(1) : e;
    }
    function qf(e, t, r) {
      return e
        .slice(0, t)
        .concat(Array.isArray(r) ? r : [r])
        .concat(e.slice(t));
    }
    function Ff(e, t) {
      return t >= e.length || t < 0 ? e : e.slice(0, t).concat(e.slice(t + 1));
    }
    function Mf(e, t, r) {
      if (e[t] === r) return e;
      for (var n = e.length, i = Array(n), o = 0; o < n; o++) i[o] = e[o];
      return (i[t] = r), i;
    }
    function In(e, t) {
      if ((!Array.isArray(t) && Cf(xf), e != null)) {
        for (var r = e, n = 0; n < t.length; n++) {
          var i = t[n];
          if (((r = r?.[i]), r === void 0)) return r;
        }
        return r;
      }
    }
    function On(e, t, r) {
      var n = typeof t == "number" ? [] : {},
        i = e ?? n;
      if (i[t] === r) return i;
      var o = Tn(i);
      return (o[t] = r), o;
    }
    function Df(e, t, r, n) {
      var i = void 0,
        o = t[n];
      if (n === t.length - 1) i = r;
      else {
        var s =
          bn(e) && bn(e[o]) ? e[o] : typeof t[n + 1] == "number" ? [] : {};
        i = Df(s, t, r, n + 1);
      }
      return On(e, o, i);
    }
    function An(e, t, r) {
      return t.length ? Df(e, t, r, 0) : r;
    }
    function Gf(e, t, r) {
      var n = e?.[t],
        i = r(n);
      return On(e, t, i);
    }
    function Vf(e, t, r) {
      var n = In(e, t),
        i = r(n);
      return An(e, t, i);
    }
    function Uf(e, t, r, n, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
        u < s;
        u++
      )
        a[u - 6] = arguments[u];
      return a.length
        ? Pe.call.apply(Pe, [null, !1, !1, e, t, r, n, i, o].concat(a))
        : Pe(!1, !1, e, t, r, n, i, o);
    }
    function Bf(e, t, r, n, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
        u < s;
        u++
      )
        a[u - 6] = arguments[u];
      return a.length
        ? Pe.call.apply(Pe, [null, !1, !0, e, t, r, n, i, o].concat(a))
        : Pe(!1, !0, e, t, r, n, i, o);
    }
    function kf(e, t, r, n, i, o, s) {
      var a = In(e, t);
      a == null && (a = {});
      for (
        var u = void 0,
          f = arguments.length,
          p = Array(f > 7 ? f - 7 : 0),
          g = 7;
        g < f;
        g++
      )
        p[g - 7] = arguments[g];
      return (
        p.length
          ? (u = Pe.call.apply(Pe, [null, !1, !1, a, r, n, i, o, s].concat(p)))
          : (u = Pe(!1, !1, a, r, n, i, o, s)),
        An(e, t, u)
      );
    }
    function Xf(e, t) {
      for (var r = Array.isArray(t) ? t : [t], n = !1, i = 0; i < r.length; i++)
        if (mS.call(e, r[i])) {
          n = !0;
          break;
        }
      if (!n) return e;
      for (var o = {}, s = Xo(e), a = 0; a < s.length; a++) {
        var u = s[a];
        r.indexOf(u) >= 0 || (o[u] = e[u]);
      }
      return o;
    }
    function Hf(e, t, r, n, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
        u < s;
        u++
      )
        a[u - 6] = arguments[u];
      return a.length
        ? Pe.call.apply(Pe, [null, !0, !1, e, t, r, n, i, o].concat(a))
        : Pe(!0, !1, e, t, r, n, i, o);
    }
    var _S = {
      clone: Tn,
      addLast: Rf,
      addFirst: Lf,
      removeLast: Nf,
      removeFirst: Pf,
      insert: qf,
      removeAt: Ff,
      replaceAt: Mf,
      getIn: In,
      set: On,
      setIn: An,
      update: Gf,
      updateIn: Vf,
      merge: Uf,
      mergeDeep: Bf,
      mergeIn: kf,
      omit: Xf,
      addDefaults: Hf,
    };
    ge.default = _S;
  });
  var jf,
    bS,
    TS,
    IS,
    OS,
    AS,
    Wf,
    zf,
    Kf = le(() => {
      "use strict";
      Ne();
      (jf = oe(Ut())),
        ({
          IX2_PREVIEW_REQUESTED: bS,
          IX2_PLAYBACK_REQUESTED: TS,
          IX2_STOP_REQUESTED: IS,
          IX2_CLEAR_REQUESTED: OS,
        } = Ee),
        (AS = { preview: {}, playback: {}, stop: {}, clear: {} }),
        (Wf = Object.create(null, {
          [bS]: { value: "preview" },
          [TS]: { value: "playback" },
          [IS]: { value: "stop" },
          [OS]: { value: "clear" },
        })),
        (zf = (e = AS, t) => {
          if (t.type in Wf) {
            let r = [Wf[t.type]];
            return (0, jf.setIn)(e, [r], { ...t.payload });
          }
          return e;
        });
    });
  var Se,
    SS,
    wS,
    xS,
    CS,
    RS,
    LS,
    NS,
    PS,
    qS,
    FS,
    Yf,
    MS,
    $f,
    Qf = le(() => {
      "use strict";
      Ne();
      (Se = oe(Ut())),
        ({
          IX2_SESSION_INITIALIZED: SS,
          IX2_SESSION_STARTED: wS,
          IX2_TEST_FRAME_RENDERED: xS,
          IX2_SESSION_STOPPED: CS,
          IX2_EVENT_LISTENER_ADDED: RS,
          IX2_EVENT_STATE_CHANGED: LS,
          IX2_ANIMATION_FRAME_CHANGED: NS,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: PS,
          IX2_VIEWPORT_WIDTH_CHANGED: qS,
          IX2_MEDIA_QUERIES_DEFINED: FS,
        } = Ee),
        (Yf = {
          active: !1,
          tick: 0,
          eventListeners: [],
          eventState: {},
          playbackState: {},
          viewportWidth: 0,
          mediaQueryKey: null,
          hasBoundaryNodes: !1,
          hasDefinedMediaQueries: !1,
          reducedMotion: !1,
        }),
        (MS = 20),
        ($f = (e = Yf, t) => {
          switch (t.type) {
            case SS: {
              let { hasBoundaryNodes: r, reducedMotion: n } = t.payload;
              return (0, Se.merge)(e, {
                hasBoundaryNodes: r,
                reducedMotion: n,
              });
            }
            case wS:
              return (0, Se.set)(e, "active", !0);
            case xS: {
              let {
                payload: { step: r = MS },
              } = t;
              return (0, Se.set)(e, "tick", e.tick + r);
            }
            case CS:
              return Yf;
            case NS: {
              let {
                payload: { now: r },
              } = t;
              return (0, Se.set)(e, "tick", r);
            }
            case RS: {
              let r = (0, Se.addLast)(e.eventListeners, t.payload);
              return (0, Se.set)(e, "eventListeners", r);
            }
            case LS: {
              let { stateKey: r, newState: n } = t.payload;
              return (0, Se.setIn)(e, ["eventState", r], n);
            }
            case PS: {
              let { actionListId: r, isPlaying: n } = t.payload;
              return (0, Se.setIn)(e, ["playbackState", r], n);
            }
            case qS: {
              let { width: r, mediaQueries: n } = t.payload,
                i = n.length,
                o = null;
              for (let s = 0; s < i; s++) {
                let { key: a, min: u, max: f } = n[s];
                if (r >= u && r <= f) {
                  o = a;
                  break;
                }
              }
              return (0, Se.merge)(e, { viewportWidth: r, mediaQueryKey: o });
            }
            case FS:
              return (0, Se.set)(e, "hasDefinedMediaQueries", !0);
            default:
              return e;
          }
        });
    });
  var Jf = c((zk, Zf) => {
    function DS() {
      (this.__data__ = []), (this.size = 0);
    }
    Zf.exports = DS;
  });
  var Sn = c((Kk, ed) => {
    function GS(e, t) {
      return e === t || (e !== e && t !== t);
    }
    ed.exports = GS;
  });
  var Ar = c((Yk, td) => {
    var VS = Sn();
    function US(e, t) {
      for (var r = e.length; r--; ) if (VS(e[r][0], t)) return r;
      return -1;
    }
    td.exports = US;
  });
  var nd = c(($k, rd) => {
    var BS = Ar(),
      kS = Array.prototype,
      XS = kS.splice;
    function HS(e) {
      var t = this.__data__,
        r = BS(t, e);
      if (r < 0) return !1;
      var n = t.length - 1;
      return r == n ? t.pop() : XS.call(t, r, 1), --this.size, !0;
    }
    rd.exports = HS;
  });
  var od = c((Qk, id) => {
    var WS = Ar();
    function jS(e) {
      var t = this.__data__,
        r = WS(t, e);
      return r < 0 ? void 0 : t[r][1];
    }
    id.exports = jS;
  });
  var sd = c((Zk, ad) => {
    var zS = Ar();
    function KS(e) {
      return zS(this.__data__, e) > -1;
    }
    ad.exports = KS;
  });
  var cd = c((Jk, ud) => {
    var YS = Ar();
    function $S(e, t) {
      var r = this.__data__,
        n = YS(r, e);
      return n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this;
    }
    ud.exports = $S;
  });
  var Sr = c((eX, ld) => {
    var QS = Jf(),
      ZS = nd(),
      JS = od(),
      ew = sd(),
      tw = cd();
    function Bt(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    Bt.prototype.clear = QS;
    Bt.prototype.delete = ZS;
    Bt.prototype.get = JS;
    Bt.prototype.has = ew;
    Bt.prototype.set = tw;
    ld.exports = Bt;
  });
  var dd = c((tX, fd) => {
    var rw = Sr();
    function nw() {
      (this.__data__ = new rw()), (this.size = 0);
    }
    fd.exports = nw;
  });
  var gd = c((rX, pd) => {
    function iw(e) {
      var t = this.__data__,
        r = t.delete(e);
      return (this.size = t.size), r;
    }
    pd.exports = iw;
  });
  var vd = c((nX, hd) => {
    function ow(e) {
      return this.__data__.get(e);
    }
    hd.exports = ow;
  });
  var Ed = c((iX, yd) => {
    function aw(e) {
      return this.__data__.has(e);
    }
    yd.exports = aw;
  });
  var et = c((oX, md) => {
    function sw(e) {
      var t = typeof e;
      return e != null && (t == "object" || t == "function");
    }
    md.exports = sw;
  });
  var Ho = c((aX, _d) => {
    var uw = ht(),
      cw = et(),
      lw = "[object AsyncFunction]",
      fw = "[object Function]",
      dw = "[object GeneratorFunction]",
      pw = "[object Proxy]";
    function gw(e) {
      if (!cw(e)) return !1;
      var t = uw(e);
      return t == fw || t == dw || t == lw || t == pw;
    }
    _d.exports = gw;
  });
  var Td = c((sX, bd) => {
    var hw = ke(),
      vw = hw["__core-js_shared__"];
    bd.exports = vw;
  });
  var Ad = c((uX, Od) => {
    var Wo = Td(),
      Id = (function () {
        var e = /[^.]+$/.exec((Wo && Wo.keys && Wo.keys.IE_PROTO) || "");
        return e ? "Symbol(src)_1." + e : "";
      })();
    function yw(e) {
      return !!Id && Id in e;
    }
    Od.exports = yw;
  });
  var jo = c((cX, Sd) => {
    var Ew = Function.prototype,
      mw = Ew.toString;
    function _w(e) {
      if (e != null) {
        try {
          return mw.call(e);
        } catch {}
        try {
          return e + "";
        } catch {}
      }
      return "";
    }
    Sd.exports = _w;
  });
  var xd = c((lX, wd) => {
    var bw = Ho(),
      Tw = Ad(),
      Iw = et(),
      Ow = jo(),
      Aw = /[\\^$.*+?()[\]{}|]/g,
      Sw = /^\[object .+?Constructor\]$/,
      ww = Function.prototype,
      xw = Object.prototype,
      Cw = ww.toString,
      Rw = xw.hasOwnProperty,
      Lw = RegExp(
        "^" +
          Cw.call(Rw)
            .replace(Aw, "\\$&")
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              "$1.*?"
            ) +
          "$"
      );
    function Nw(e) {
      if (!Iw(e) || Tw(e)) return !1;
      var t = bw(e) ? Lw : Sw;
      return t.test(Ow(e));
    }
    wd.exports = Nw;
  });
  var Rd = c((fX, Cd) => {
    function Pw(e, t) {
      return e?.[t];
    }
    Cd.exports = Pw;
  });
  var vt = c((dX, Ld) => {
    var qw = xd(),
      Fw = Rd();
    function Mw(e, t) {
      var r = Fw(e, t);
      return qw(r) ? r : void 0;
    }
    Ld.exports = Mw;
  });
  var wn = c((pX, Nd) => {
    var Dw = vt(),
      Gw = ke(),
      Vw = Dw(Gw, "Map");
    Nd.exports = Vw;
  });
  var wr = c((gX, Pd) => {
    var Uw = vt(),
      Bw = Uw(Object, "create");
    Pd.exports = Bw;
  });
  var Md = c((hX, Fd) => {
    var qd = wr();
    function kw() {
      (this.__data__ = qd ? qd(null) : {}), (this.size = 0);
    }
    Fd.exports = kw;
  });
  var Gd = c((vX, Dd) => {
    function Xw(e) {
      var t = this.has(e) && delete this.__data__[e];
      return (this.size -= t ? 1 : 0), t;
    }
    Dd.exports = Xw;
  });
  var Ud = c((yX, Vd) => {
    var Hw = wr(),
      Ww = "__lodash_hash_undefined__",
      jw = Object.prototype,
      zw = jw.hasOwnProperty;
    function Kw(e) {
      var t = this.__data__;
      if (Hw) {
        var r = t[e];
        return r === Ww ? void 0 : r;
      }
      return zw.call(t, e) ? t[e] : void 0;
    }
    Vd.exports = Kw;
  });
  var kd = c((EX, Bd) => {
    var Yw = wr(),
      $w = Object.prototype,
      Qw = $w.hasOwnProperty;
    function Zw(e) {
      var t = this.__data__;
      return Yw ? t[e] !== void 0 : Qw.call(t, e);
    }
    Bd.exports = Zw;
  });
  var Hd = c((mX, Xd) => {
    var Jw = wr(),
      ex = "__lodash_hash_undefined__";
    function tx(e, t) {
      var r = this.__data__;
      return (
        (this.size += this.has(e) ? 0 : 1),
        (r[e] = Jw && t === void 0 ? ex : t),
        this
      );
    }
    Xd.exports = tx;
  });
  var jd = c((_X, Wd) => {
    var rx = Md(),
      nx = Gd(),
      ix = Ud(),
      ox = kd(),
      ax = Hd();
    function kt(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    kt.prototype.clear = rx;
    kt.prototype.delete = nx;
    kt.prototype.get = ix;
    kt.prototype.has = ox;
    kt.prototype.set = ax;
    Wd.exports = kt;
  });
  var Yd = c((bX, Kd) => {
    var zd = jd(),
      sx = Sr(),
      ux = wn();
    function cx() {
      (this.size = 0),
        (this.__data__ = {
          hash: new zd(),
          map: new (ux || sx)(),
          string: new zd(),
        });
    }
    Kd.exports = cx;
  });
  var Qd = c((TX, $d) => {
    function lx(e) {
      var t = typeof e;
      return t == "string" || t == "number" || t == "symbol" || t == "boolean"
        ? e !== "__proto__"
        : e === null;
    }
    $d.exports = lx;
  });
  var xr = c((IX, Zd) => {
    var fx = Qd();
    function dx(e, t) {
      var r = e.__data__;
      return fx(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
    }
    Zd.exports = dx;
  });
  var ep = c((OX, Jd) => {
    var px = xr();
    function gx(e) {
      var t = px(this, e).delete(e);
      return (this.size -= t ? 1 : 0), t;
    }
    Jd.exports = gx;
  });
  var rp = c((AX, tp) => {
    var hx = xr();
    function vx(e) {
      return hx(this, e).get(e);
    }
    tp.exports = vx;
  });
  var ip = c((SX, np) => {
    var yx = xr();
    function Ex(e) {
      return yx(this, e).has(e);
    }
    np.exports = Ex;
  });
  var ap = c((wX, op) => {
    var mx = xr();
    function _x(e, t) {
      var r = mx(this, e),
        n = r.size;
      return r.set(e, t), (this.size += r.size == n ? 0 : 1), this;
    }
    op.exports = _x;
  });
  var xn = c((xX, sp) => {
    var bx = Yd(),
      Tx = ep(),
      Ix = rp(),
      Ox = ip(),
      Ax = ap();
    function Xt(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    Xt.prototype.clear = bx;
    Xt.prototype.delete = Tx;
    Xt.prototype.get = Ix;
    Xt.prototype.has = Ox;
    Xt.prototype.set = Ax;
    sp.exports = Xt;
  });
  var cp = c((CX, up) => {
    var Sx = Sr(),
      wx = wn(),
      xx = xn(),
      Cx = 200;
    function Rx(e, t) {
      var r = this.__data__;
      if (r instanceof Sx) {
        var n = r.__data__;
        if (!wx || n.length < Cx - 1)
          return n.push([e, t]), (this.size = ++r.size), this;
        r = this.__data__ = new xx(n);
      }
      return r.set(e, t), (this.size = r.size), this;
    }
    up.exports = Rx;
  });
  var zo = c((RX, lp) => {
    var Lx = Sr(),
      Nx = dd(),
      Px = gd(),
      qx = vd(),
      Fx = Ed(),
      Mx = cp();
    function Ht(e) {
      var t = (this.__data__ = new Lx(e));
      this.size = t.size;
    }
    Ht.prototype.clear = Nx;
    Ht.prototype.delete = Px;
    Ht.prototype.get = qx;
    Ht.prototype.has = Fx;
    Ht.prototype.set = Mx;
    lp.exports = Ht;
  });
  var dp = c((LX, fp) => {
    var Dx = "__lodash_hash_undefined__";
    function Gx(e) {
      return this.__data__.set(e, Dx), this;
    }
    fp.exports = Gx;
  });
  var gp = c((NX, pp) => {
    function Vx(e) {
      return this.__data__.has(e);
    }
    pp.exports = Vx;
  });
  var vp = c((PX, hp) => {
    var Ux = xn(),
      Bx = dp(),
      kx = gp();
    function Cn(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.__data__ = new Ux(); ++t < r; ) this.add(e[t]);
    }
    Cn.prototype.add = Cn.prototype.push = Bx;
    Cn.prototype.has = kx;
    hp.exports = Cn;
  });
  var Ep = c((qX, yp) => {
    function Xx(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
        if (t(e[r], r, e)) return !0;
      return !1;
    }
    yp.exports = Xx;
  });
  var _p = c((FX, mp) => {
    function Hx(e, t) {
      return e.has(t);
    }
    mp.exports = Hx;
  });
  var Ko = c((MX, bp) => {
    var Wx = vp(),
      jx = Ep(),
      zx = _p(),
      Kx = 1,
      Yx = 2;
    function $x(e, t, r, n, i, o) {
      var s = r & Kx,
        a = e.length,
        u = t.length;
      if (a != u && !(s && u > a)) return !1;
      var f = o.get(e),
        p = o.get(t);
      if (f && p) return f == t && p == e;
      var g = -1,
        d = !0,
        v = r & Yx ? new Wx() : void 0;
      for (o.set(e, t), o.set(t, e); ++g < a; ) {
        var b = e[g],
          m = t[g];
        if (n) var A = s ? n(m, b, g, t, e, o) : n(b, m, g, e, t, o);
        if (A !== void 0) {
          if (A) continue;
          d = !1;
          break;
        }
        if (v) {
          if (
            !jx(t, function (y, w) {
              if (!zx(v, w) && (b === y || i(b, y, r, n, o))) return v.push(w);
            })
          ) {
            d = !1;
            break;
          }
        } else if (!(b === m || i(b, m, r, n, o))) {
          d = !1;
          break;
        }
      }
      return o.delete(e), o.delete(t), d;
    }
    bp.exports = $x;
  });
  var Ip = c((DX, Tp) => {
    var Qx = ke(),
      Zx = Qx.Uint8Array;
    Tp.exports = Zx;
  });
  var Ap = c((GX, Op) => {
    function Jx(e) {
      var t = -1,
        r = Array(e.size);
      return (
        e.forEach(function (n, i) {
          r[++t] = [i, n];
        }),
        r
      );
    }
    Op.exports = Jx;
  });
  var wp = c((VX, Sp) => {
    function eC(e) {
      var t = -1,
        r = Array(e.size);
      return (
        e.forEach(function (n) {
          r[++t] = n;
        }),
        r
      );
    }
    Sp.exports = eC;
  });
  var Np = c((UX, Lp) => {
    var xp = Dt(),
      Cp = Ip(),
      tC = Sn(),
      rC = Ko(),
      nC = Ap(),
      iC = wp(),
      oC = 1,
      aC = 2,
      sC = "[object Boolean]",
      uC = "[object Date]",
      cC = "[object Error]",
      lC = "[object Map]",
      fC = "[object Number]",
      dC = "[object RegExp]",
      pC = "[object Set]",
      gC = "[object String]",
      hC = "[object Symbol]",
      vC = "[object ArrayBuffer]",
      yC = "[object DataView]",
      Rp = xp ? xp.prototype : void 0,
      Yo = Rp ? Rp.valueOf : void 0;
    function EC(e, t, r, n, i, o, s) {
      switch (r) {
        case yC:
          if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
            return !1;
          (e = e.buffer), (t = t.buffer);
        case vC:
          return !(e.byteLength != t.byteLength || !o(new Cp(e), new Cp(t)));
        case sC:
        case uC:
        case fC:
          return tC(+e, +t);
        case cC:
          return e.name == t.name && e.message == t.message;
        case dC:
        case gC:
          return e == t + "";
        case lC:
          var a = nC;
        case pC:
          var u = n & oC;
          if ((a || (a = iC), e.size != t.size && !u)) return !1;
          var f = s.get(e);
          if (f) return f == t;
          (n |= aC), s.set(e, t);
          var p = rC(a(e), a(t), n, i, o, s);
          return s.delete(e), p;
        case hC:
          if (Yo) return Yo.call(e) == Yo.call(t);
      }
      return !1;
    }
    Lp.exports = EC;
  });
  var Rn = c((BX, Pp) => {
    function mC(e, t) {
      for (var r = -1, n = t.length, i = e.length; ++r < n; ) e[i + r] = t[r];
      return e;
    }
    Pp.exports = mC;
  });
  var me = c((kX, qp) => {
    var _C = Array.isArray;
    qp.exports = _C;
  });
  var $o = c((XX, Fp) => {
    var bC = Rn(),
      TC = me();
    function IC(e, t, r) {
      var n = t(e);
      return TC(e) ? n : bC(n, r(e));
    }
    Fp.exports = IC;
  });
  var Dp = c((HX, Mp) => {
    function OC(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length, i = 0, o = []; ++r < n; ) {
        var s = e[r];
        t(s, r, e) && (o[i++] = s);
      }
      return o;
    }
    Mp.exports = OC;
  });
  var Qo = c((WX, Gp) => {
    function AC() {
      return [];
    }
    Gp.exports = AC;
  });
  var Zo = c((jX, Up) => {
    var SC = Dp(),
      wC = Qo(),
      xC = Object.prototype,
      CC = xC.propertyIsEnumerable,
      Vp = Object.getOwnPropertySymbols,
      RC = Vp
        ? function (e) {
            return e == null
              ? []
              : ((e = Object(e)),
                SC(Vp(e), function (t) {
                  return CC.call(e, t);
                }));
          }
        : wC;
    Up.exports = RC;
  });
  var kp = c((zX, Bp) => {
    function LC(e, t) {
      for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
      return n;
    }
    Bp.exports = LC;
  });
  var Hp = c((KX, Xp) => {
    var NC = ht(),
      PC = ot(),
      qC = "[object Arguments]";
    function FC(e) {
      return PC(e) && NC(e) == qC;
    }
    Xp.exports = FC;
  });
  var Cr = c((YX, zp) => {
    var Wp = Hp(),
      MC = ot(),
      jp = Object.prototype,
      DC = jp.hasOwnProperty,
      GC = jp.propertyIsEnumerable,
      VC = Wp(
        (function () {
          return arguments;
        })()
      )
        ? Wp
        : function (e) {
            return MC(e) && DC.call(e, "callee") && !GC.call(e, "callee");
          };
    zp.exports = VC;
  });
  var Yp = c(($X, Kp) => {
    function UC() {
      return !1;
    }
    Kp.exports = UC;
  });
  var Ln = c((Rr, Wt) => {
    var BC = ke(),
      kC = Yp(),
      Zp = typeof Rr == "object" && Rr && !Rr.nodeType && Rr,
      $p = Zp && typeof Wt == "object" && Wt && !Wt.nodeType && Wt,
      XC = $p && $p.exports === Zp,
      Qp = XC ? BC.Buffer : void 0,
      HC = Qp ? Qp.isBuffer : void 0,
      WC = HC || kC;
    Wt.exports = WC;
  });
  var Nn = c((QX, Jp) => {
    var jC = 9007199254740991,
      zC = /^(?:0|[1-9]\d*)$/;
    function KC(e, t) {
      var r = typeof e;
      return (
        (t = t ?? jC),
        !!t &&
          (r == "number" || (r != "symbol" && zC.test(e))) &&
          e > -1 &&
          e % 1 == 0 &&
          e < t
      );
    }
    Jp.exports = KC;
  });
  var Pn = c((ZX, eg) => {
    var YC = 9007199254740991;
    function $C(e) {
      return typeof e == "number" && e > -1 && e % 1 == 0 && e <= YC;
    }
    eg.exports = $C;
  });
  var rg = c((JX, tg) => {
    var QC = ht(),
      ZC = Pn(),
      JC = ot(),
      eR = "[object Arguments]",
      tR = "[object Array]",
      rR = "[object Boolean]",
      nR = "[object Date]",
      iR = "[object Error]",
      oR = "[object Function]",
      aR = "[object Map]",
      sR = "[object Number]",
      uR = "[object Object]",
      cR = "[object RegExp]",
      lR = "[object Set]",
      fR = "[object String]",
      dR = "[object WeakMap]",
      pR = "[object ArrayBuffer]",
      gR = "[object DataView]",
      hR = "[object Float32Array]",
      vR = "[object Float64Array]",
      yR = "[object Int8Array]",
      ER = "[object Int16Array]",
      mR = "[object Int32Array]",
      _R = "[object Uint8Array]",
      bR = "[object Uint8ClampedArray]",
      TR = "[object Uint16Array]",
      IR = "[object Uint32Array]",
      ce = {};
    ce[hR] =
      ce[vR] =
      ce[yR] =
      ce[ER] =
      ce[mR] =
      ce[_R] =
      ce[bR] =
      ce[TR] =
      ce[IR] =
        !0;
    ce[eR] =
      ce[tR] =
      ce[pR] =
      ce[rR] =
      ce[gR] =
      ce[nR] =
      ce[iR] =
      ce[oR] =
      ce[aR] =
      ce[sR] =
      ce[uR] =
      ce[cR] =
      ce[lR] =
      ce[fR] =
      ce[dR] =
        !1;
    function OR(e) {
      return JC(e) && ZC(e.length) && !!ce[QC(e)];
    }
    tg.exports = OR;
  });
  var ig = c((eH, ng) => {
    function AR(e) {
      return function (t) {
        return e(t);
      };
    }
    ng.exports = AR;
  });
  var ag = c((Lr, jt) => {
    var SR = Oo(),
      og = typeof Lr == "object" && Lr && !Lr.nodeType && Lr,
      Nr = og && typeof jt == "object" && jt && !jt.nodeType && jt,
      wR = Nr && Nr.exports === og,
      Jo = wR && SR.process,
      xR = (function () {
        try {
          var e = Nr && Nr.require && Nr.require("util").types;
          return e || (Jo && Jo.binding && Jo.binding("util"));
        } catch {}
      })();
    jt.exports = xR;
  });
  var qn = c((tH, cg) => {
    var CR = rg(),
      RR = ig(),
      sg = ag(),
      ug = sg && sg.isTypedArray,
      LR = ug ? RR(ug) : CR;
    cg.exports = LR;
  });
  var ea = c((rH, lg) => {
    var NR = kp(),
      PR = Cr(),
      qR = me(),
      FR = Ln(),
      MR = Nn(),
      DR = qn(),
      GR = Object.prototype,
      VR = GR.hasOwnProperty;
    function UR(e, t) {
      var r = qR(e),
        n = !r && PR(e),
        i = !r && !n && FR(e),
        o = !r && !n && !i && DR(e),
        s = r || n || i || o,
        a = s ? NR(e.length, String) : [],
        u = a.length;
      for (var f in e)
        (t || VR.call(e, f)) &&
          !(
            s &&
            (f == "length" ||
              (i && (f == "offset" || f == "parent")) ||
              (o &&
                (f == "buffer" || f == "byteLength" || f == "byteOffset")) ||
              MR(f, u))
          ) &&
          a.push(f);
      return a;
    }
    lg.exports = UR;
  });
  var Fn = c((nH, fg) => {
    var BR = Object.prototype;
    function kR(e) {
      var t = e && e.constructor,
        r = (typeof t == "function" && t.prototype) || BR;
      return e === r;
    }
    fg.exports = kR;
  });
  var pg = c((iH, dg) => {
    var XR = Ao(),
      HR = XR(Object.keys, Object);
    dg.exports = HR;
  });
  var Mn = c((oH, gg) => {
    var WR = Fn(),
      jR = pg(),
      zR = Object.prototype,
      KR = zR.hasOwnProperty;
    function YR(e) {
      if (!WR(e)) return jR(e);
      var t = [];
      for (var r in Object(e)) KR.call(e, r) && r != "constructor" && t.push(r);
      return t;
    }
    gg.exports = YR;
  });
  var Ot = c((aH, hg) => {
    var $R = Ho(),
      QR = Pn();
    function ZR(e) {
      return e != null && QR(e.length) && !$R(e);
    }
    hg.exports = ZR;
  });
  var Pr = c((sH, vg) => {
    var JR = ea(),
      eL = Mn(),
      tL = Ot();
    function rL(e) {
      return tL(e) ? JR(e) : eL(e);
    }
    vg.exports = rL;
  });
  var Eg = c((uH, yg) => {
    var nL = $o(),
      iL = Zo(),
      oL = Pr();
    function aL(e) {
      return nL(e, oL, iL);
    }
    yg.exports = aL;
  });
  var bg = c((cH, _g) => {
    var mg = Eg(),
      sL = 1,
      uL = Object.prototype,
      cL = uL.hasOwnProperty;
    function lL(e, t, r, n, i, o) {
      var s = r & sL,
        a = mg(e),
        u = a.length,
        f = mg(t),
        p = f.length;
      if (u != p && !s) return !1;
      for (var g = u; g--; ) {
        var d = a[g];
        if (!(s ? d in t : cL.call(t, d))) return !1;
      }
      var v = o.get(e),
        b = o.get(t);
      if (v && b) return v == t && b == e;
      var m = !0;
      o.set(e, t), o.set(t, e);
      for (var A = s; ++g < u; ) {
        d = a[g];
        var y = e[d],
          w = t[d];
        if (n) var S = s ? n(w, y, d, t, e, o) : n(y, w, d, e, t, o);
        if (!(S === void 0 ? y === w || i(y, w, r, n, o) : S)) {
          m = !1;
          break;
        }
        A || (A = d == "constructor");
      }
      if (m && !A) {
        var C = e.constructor,
          R = t.constructor;
        C != R &&
          "constructor" in e &&
          "constructor" in t &&
          !(
            typeof C == "function" &&
            C instanceof C &&
            typeof R == "function" &&
            R instanceof R
          ) &&
          (m = !1);
      }
      return o.delete(e), o.delete(t), m;
    }
    _g.exports = lL;
  });
  var Ig = c((lH, Tg) => {
    var fL = vt(),
      dL = ke(),
      pL = fL(dL, "DataView");
    Tg.exports = pL;
  });
  var Ag = c((fH, Og) => {
    var gL = vt(),
      hL = ke(),
      vL = gL(hL, "Promise");
    Og.exports = vL;
  });
  var wg = c((dH, Sg) => {
    var yL = vt(),
      EL = ke(),
      mL = yL(EL, "Set");
    Sg.exports = mL;
  });
  var ta = c((pH, xg) => {
    var _L = vt(),
      bL = ke(),
      TL = _L(bL, "WeakMap");
    xg.exports = TL;
  });
  var Dn = c((gH, Fg) => {
    var ra = Ig(),
      na = wn(),
      ia = Ag(),
      oa = wg(),
      aa = ta(),
      qg = ht(),
      zt = jo(),
      Cg = "[object Map]",
      IL = "[object Object]",
      Rg = "[object Promise]",
      Lg = "[object Set]",
      Ng = "[object WeakMap]",
      Pg = "[object DataView]",
      OL = zt(ra),
      AL = zt(na),
      SL = zt(ia),
      wL = zt(oa),
      xL = zt(aa),
      At = qg;
    ((ra && At(new ra(new ArrayBuffer(1))) != Pg) ||
      (na && At(new na()) != Cg) ||
      (ia && At(ia.resolve()) != Rg) ||
      (oa && At(new oa()) != Lg) ||
      (aa && At(new aa()) != Ng)) &&
      (At = function (e) {
        var t = qg(e),
          r = t == IL ? e.constructor : void 0,
          n = r ? zt(r) : "";
        if (n)
          switch (n) {
            case OL:
              return Pg;
            case AL:
              return Cg;
            case SL:
              return Rg;
            case wL:
              return Lg;
            case xL:
              return Ng;
          }
        return t;
      });
    Fg.exports = At;
  });
  var Xg = c((hH, kg) => {
    var sa = zo(),
      CL = Ko(),
      RL = Np(),
      LL = bg(),
      Mg = Dn(),
      Dg = me(),
      Gg = Ln(),
      NL = qn(),
      PL = 1,
      Vg = "[object Arguments]",
      Ug = "[object Array]",
      Gn = "[object Object]",
      qL = Object.prototype,
      Bg = qL.hasOwnProperty;
    function FL(e, t, r, n, i, o) {
      var s = Dg(e),
        a = Dg(t),
        u = s ? Ug : Mg(e),
        f = a ? Ug : Mg(t);
      (u = u == Vg ? Gn : u), (f = f == Vg ? Gn : f);
      var p = u == Gn,
        g = f == Gn,
        d = u == f;
      if (d && Gg(e)) {
        if (!Gg(t)) return !1;
        (s = !0), (p = !1);
      }
      if (d && !p)
        return (
          o || (o = new sa()),
          s || NL(e) ? CL(e, t, r, n, i, o) : RL(e, t, u, r, n, i, o)
        );
      if (!(r & PL)) {
        var v = p && Bg.call(e, "__wrapped__"),
          b = g && Bg.call(t, "__wrapped__");
        if (v || b) {
          var m = v ? e.value() : e,
            A = b ? t.value() : t;
          return o || (o = new sa()), i(m, A, r, n, o);
        }
      }
      return d ? (o || (o = new sa()), LL(e, t, r, n, i, o)) : !1;
    }
    kg.exports = FL;
  });
  var ua = c((vH, jg) => {
    var ML = Xg(),
      Hg = ot();
    function Wg(e, t, r, n, i) {
      return e === t
        ? !0
        : e == null || t == null || (!Hg(e) && !Hg(t))
        ? e !== e && t !== t
        : ML(e, t, r, n, Wg, i);
    }
    jg.exports = Wg;
  });
  var Kg = c((yH, zg) => {
    var DL = zo(),
      GL = ua(),
      VL = 1,
      UL = 2;
    function BL(e, t, r, n) {
      var i = r.length,
        o = i,
        s = !n;
      if (e == null) return !o;
      for (e = Object(e); i--; ) {
        var a = r[i];
        if (s && a[2] ? a[1] !== e[a[0]] : !(a[0] in e)) return !1;
      }
      for (; ++i < o; ) {
        a = r[i];
        var u = a[0],
          f = e[u],
          p = a[1];
        if (s && a[2]) {
          if (f === void 0 && !(u in e)) return !1;
        } else {
          var g = new DL();
          if (n) var d = n(f, p, u, e, t, g);
          if (!(d === void 0 ? GL(p, f, VL | UL, n, g) : d)) return !1;
        }
      }
      return !0;
    }
    zg.exports = BL;
  });
  var ca = c((EH, Yg) => {
    var kL = et();
    function XL(e) {
      return e === e && !kL(e);
    }
    Yg.exports = XL;
  });
  var Qg = c((mH, $g) => {
    var HL = ca(),
      WL = Pr();
    function jL(e) {
      for (var t = WL(e), r = t.length; r--; ) {
        var n = t[r],
          i = e[n];
        t[r] = [n, i, HL(i)];
      }
      return t;
    }
    $g.exports = jL;
  });
  var la = c((_H, Zg) => {
    function zL(e, t) {
      return function (r) {
        return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
      };
    }
    Zg.exports = zL;
  });
  var eh = c((bH, Jg) => {
    var KL = Kg(),
      YL = Qg(),
      $L = la();
    function QL(e) {
      var t = YL(e);
      return t.length == 1 && t[0][2]
        ? $L(t[0][0], t[0][1])
        : function (r) {
            return r === e || KL(r, e, t);
          };
    }
    Jg.exports = QL;
  });
  var qr = c((TH, th) => {
    var ZL = ht(),
      JL = ot(),
      eN = "[object Symbol]";
    function tN(e) {
      return typeof e == "symbol" || (JL(e) && ZL(e) == eN);
    }
    th.exports = tN;
  });
  var Vn = c((IH, rh) => {
    var rN = me(),
      nN = qr(),
      iN = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      oN = /^\w*$/;
    function aN(e, t) {
      if (rN(e)) return !1;
      var r = typeof e;
      return r == "number" ||
        r == "symbol" ||
        r == "boolean" ||
        e == null ||
        nN(e)
        ? !0
        : oN.test(e) || !iN.test(e) || (t != null && e in Object(t));
    }
    rh.exports = aN;
  });
  var oh = c((OH, ih) => {
    var nh = xn(),
      sN = "Expected a function";
    function fa(e, t) {
      if (typeof e != "function" || (t != null && typeof t != "function"))
        throw new TypeError(sN);
      var r = function () {
        var n = arguments,
          i = t ? t.apply(this, n) : n[0],
          o = r.cache;
        if (o.has(i)) return o.get(i);
        var s = e.apply(this, n);
        return (r.cache = o.set(i, s) || o), s;
      };
      return (r.cache = new (fa.Cache || nh)()), r;
    }
    fa.Cache = nh;
    ih.exports = fa;
  });
  var sh = c((AH, ah) => {
    var uN = oh(),
      cN = 500;
    function lN(e) {
      var t = uN(e, function (n) {
          return r.size === cN && r.clear(), n;
        }),
        r = t.cache;
      return t;
    }
    ah.exports = lN;
  });
  var ch = c((SH, uh) => {
    var fN = sh(),
      dN =
        /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      pN = /\\(\\)?/g,
      gN = fN(function (e) {
        var t = [];
        return (
          e.charCodeAt(0) === 46 && t.push(""),
          e.replace(dN, function (r, n, i, o) {
            t.push(i ? o.replace(pN, "$1") : n || r);
          }),
          t
        );
      });
    uh.exports = gN;
  });
  var da = c((wH, lh) => {
    function hN(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length, i = Array(n); ++r < n; )
        i[r] = t(e[r], r, e);
      return i;
    }
    lh.exports = hN;
  });
  var vh = c((xH, hh) => {
    var fh = Dt(),
      vN = da(),
      yN = me(),
      EN = qr(),
      mN = 1 / 0,
      dh = fh ? fh.prototype : void 0,
      ph = dh ? dh.toString : void 0;
    function gh(e) {
      if (typeof e == "string") return e;
      if (yN(e)) return vN(e, gh) + "";
      if (EN(e)) return ph ? ph.call(e) : "";
      var t = e + "";
      return t == "0" && 1 / e == -mN ? "-0" : t;
    }
    hh.exports = gh;
  });
  var Eh = c((CH, yh) => {
    var _N = vh();
    function bN(e) {
      return e == null ? "" : _N(e);
    }
    yh.exports = bN;
  });
  var Fr = c((RH, mh) => {
    var TN = me(),
      IN = Vn(),
      ON = ch(),
      AN = Eh();
    function SN(e, t) {
      return TN(e) ? e : IN(e, t) ? [e] : ON(AN(e));
    }
    mh.exports = SN;
  });
  var Kt = c((LH, _h) => {
    var wN = qr(),
      xN = 1 / 0;
    function CN(e) {
      if (typeof e == "string" || wN(e)) return e;
      var t = e + "";
      return t == "0" && 1 / e == -xN ? "-0" : t;
    }
    _h.exports = CN;
  });
  var Un = c((NH, bh) => {
    var RN = Fr(),
      LN = Kt();
    function NN(e, t) {
      t = RN(t, e);
      for (var r = 0, n = t.length; e != null && r < n; ) e = e[LN(t[r++])];
      return r && r == n ? e : void 0;
    }
    bh.exports = NN;
  });
  var Bn = c((PH, Th) => {
    var PN = Un();
    function qN(e, t, r) {
      var n = e == null ? void 0 : PN(e, t);
      return n === void 0 ? r : n;
    }
    Th.exports = qN;
  });
  var Oh = c((qH, Ih) => {
    function FN(e, t) {
      return e != null && t in Object(e);
    }
    Ih.exports = FN;
  });
  var Sh = c((FH, Ah) => {
    var MN = Fr(),
      DN = Cr(),
      GN = me(),
      VN = Nn(),
      UN = Pn(),
      BN = Kt();
    function kN(e, t, r) {
      t = MN(t, e);
      for (var n = -1, i = t.length, o = !1; ++n < i; ) {
        var s = BN(t[n]);
        if (!(o = e != null && r(e, s))) break;
        e = e[s];
      }
      return o || ++n != i
        ? o
        : ((i = e == null ? 0 : e.length),
          !!i && UN(i) && VN(s, i) && (GN(e) || DN(e)));
    }
    Ah.exports = kN;
  });
  var xh = c((MH, wh) => {
    var XN = Oh(),
      HN = Sh();
    function WN(e, t) {
      return e != null && HN(e, t, XN);
    }
    wh.exports = WN;
  });
  var Rh = c((DH, Ch) => {
    var jN = ua(),
      zN = Bn(),
      KN = xh(),
      YN = Vn(),
      $N = ca(),
      QN = la(),
      ZN = Kt(),
      JN = 1,
      eP = 2;
    function tP(e, t) {
      return YN(e) && $N(t)
        ? QN(ZN(e), t)
        : function (r) {
            var n = zN(r, e);
            return n === void 0 && n === t ? KN(r, e) : jN(t, n, JN | eP);
          };
    }
    Ch.exports = tP;
  });
  var kn = c((GH, Lh) => {
    function rP(e) {
      return e;
    }
    Lh.exports = rP;
  });
  var pa = c((VH, Nh) => {
    function nP(e) {
      return function (t) {
        return t?.[e];
      };
    }
    Nh.exports = nP;
  });
  var qh = c((UH, Ph) => {
    var iP = Un();
    function oP(e) {
      return function (t) {
        return iP(t, e);
      };
    }
    Ph.exports = oP;
  });
  var Mh = c((BH, Fh) => {
    var aP = pa(),
      sP = qh(),
      uP = Vn(),
      cP = Kt();
    function lP(e) {
      return uP(e) ? aP(cP(e)) : sP(e);
    }
    Fh.exports = lP;
  });
  var yt = c((kH, Dh) => {
    var fP = eh(),
      dP = Rh(),
      pP = kn(),
      gP = me(),
      hP = Mh();
    function vP(e) {
      return typeof e == "function"
        ? e
        : e == null
        ? pP
        : typeof e == "object"
        ? gP(e)
          ? dP(e[0], e[1])
          : fP(e)
        : hP(e);
    }
    Dh.exports = vP;
  });
  var ga = c((XH, Gh) => {
    var yP = yt(),
      EP = Ot(),
      mP = Pr();
    function _P(e) {
      return function (t, r, n) {
        var i = Object(t);
        if (!EP(t)) {
          var o = yP(r, 3);
          (t = mP(t)),
            (r = function (a) {
              return o(i[a], a, i);
            });
        }
        var s = e(t, r, n);
        return s > -1 ? i[o ? t[s] : s] : void 0;
      };
    }
    Gh.exports = _P;
  });
  var ha = c((HH, Vh) => {
    function bP(e, t, r, n) {
      for (var i = e.length, o = r + (n ? 1 : -1); n ? o-- : ++o < i; )
        if (t(e[o], o, e)) return o;
      return -1;
    }
    Vh.exports = bP;
  });
  var Bh = c((WH, Uh) => {
    var TP = /\s/;
    function IP(e) {
      for (var t = e.length; t-- && TP.test(e.charAt(t)); );
      return t;
    }
    Uh.exports = IP;
  });
  var Xh = c((jH, kh) => {
    var OP = Bh(),
      AP = /^\s+/;
    function SP(e) {
      return e && e.slice(0, OP(e) + 1).replace(AP, "");
    }
    kh.exports = SP;
  });
  var Xn = c((zH, jh) => {
    var wP = Xh(),
      Hh = et(),
      xP = qr(),
      Wh = 0 / 0,
      CP = /^[-+]0x[0-9a-f]+$/i,
      RP = /^0b[01]+$/i,
      LP = /^0o[0-7]+$/i,
      NP = parseInt;
    function PP(e) {
      if (typeof e == "number") return e;
      if (xP(e)) return Wh;
      if (Hh(e)) {
        var t = typeof e.valueOf == "function" ? e.valueOf() : e;
        e = Hh(t) ? t + "" : t;
      }
      if (typeof e != "string") return e === 0 ? e : +e;
      e = wP(e);
      var r = RP.test(e);
      return r || LP.test(e) ? NP(e.slice(2), r ? 2 : 8) : CP.test(e) ? Wh : +e;
    }
    jh.exports = PP;
  });
  var Yh = c((KH, Kh) => {
    var qP = Xn(),
      zh = 1 / 0,
      FP = 17976931348623157e292;
    function MP(e) {
      if (!e) return e === 0 ? e : 0;
      if (((e = qP(e)), e === zh || e === -zh)) {
        var t = e < 0 ? -1 : 1;
        return t * FP;
      }
      return e === e ? e : 0;
    }
    Kh.exports = MP;
  });
  var va = c((YH, $h) => {
    var DP = Yh();
    function GP(e) {
      var t = DP(e),
        r = t % 1;
      return t === t ? (r ? t - r : t) : 0;
    }
    $h.exports = GP;
  });
  var Zh = c(($H, Qh) => {
    var VP = ha(),
      UP = yt(),
      BP = va(),
      kP = Math.max;
    function XP(e, t, r) {
      var n = e == null ? 0 : e.length;
      if (!n) return -1;
      var i = r == null ? 0 : BP(r);
      return i < 0 && (i = kP(n + i, 0)), VP(e, UP(t, 3), i);
    }
    Qh.exports = XP;
  });
  var ya = c((QH, Jh) => {
    var HP = ga(),
      WP = Zh(),
      jP = HP(WP);
    Jh.exports = jP;
  });
  var rv = {};
  Re(rv, {
    ELEMENT_MATCHES: () => zP,
    FLEX_PREFIXED: () => Ea,
    IS_BROWSER_ENV: () => He,
    TRANSFORM_PREFIXED: () => Et,
    TRANSFORM_STYLE_PREFIXED: () => Wn,
    withBrowser: () => Hn,
  });
  var tv,
    He,
    Hn,
    zP,
    Ea,
    Et,
    ev,
    Wn,
    jn = le(() => {
      "use strict";
      (tv = oe(ya())),
        (He = typeof window < "u"),
        (Hn = (e, t) => (He ? e() : t)),
        (zP = Hn(() =>
          (0, tv.default)(
            [
              "matches",
              "matchesSelector",
              "mozMatchesSelector",
              "msMatchesSelector",
              "oMatchesSelector",
              "webkitMatchesSelector",
            ],
            (e) => e in Element.prototype
          )
        )),
        (Ea = Hn(() => {
          let e = document.createElement("i"),
            t = [
              "flex",
              "-webkit-flex",
              "-ms-flexbox",
              "-moz-box",
              "-webkit-box",
            ],
            r = "";
          try {
            let { length: n } = t;
            for (let i = 0; i < n; i++) {
              let o = t[i];
              if (((e.style.display = o), e.style.display === o)) return o;
            }
            return r;
          } catch {
            return r;
          }
        }, "flex")),
        (Et = Hn(() => {
          let e = document.createElement("i");
          if (e.style.transform == null) {
            let t = ["Webkit", "Moz", "ms"],
              r = "Transform",
              { length: n } = t;
            for (let i = 0; i < n; i++) {
              let o = t[i] + r;
              if (e.style[o] !== void 0) return o;
            }
          }
          return "transform";
        }, "transform")),
        (ev = Et.split("transform")[0]),
        (Wn = ev ? ev + "TransformStyle" : "transformStyle");
    });
  var ma = c((ZH, sv) => {
    var KP = 4,
      YP = 0.001,
      $P = 1e-7,
      QP = 10,
      Mr = 11,
      zn = 1 / (Mr - 1),
      ZP = typeof Float32Array == "function";
    function nv(e, t) {
      return 1 - 3 * t + 3 * e;
    }
    function iv(e, t) {
      return 3 * t - 6 * e;
    }
    function ov(e) {
      return 3 * e;
    }
    function Kn(e, t, r) {
      return ((nv(t, r) * e + iv(t, r)) * e + ov(t)) * e;
    }
    function av(e, t, r) {
      return 3 * nv(t, r) * e * e + 2 * iv(t, r) * e + ov(t);
    }
    function JP(e, t, r, n, i) {
      var o,
        s,
        a = 0;
      do
        (s = t + (r - t) / 2), (o = Kn(s, n, i) - e), o > 0 ? (r = s) : (t = s);
      while (Math.abs(o) > $P && ++a < QP);
      return s;
    }
    function eq(e, t, r, n) {
      for (var i = 0; i < KP; ++i) {
        var o = av(t, r, n);
        if (o === 0) return t;
        var s = Kn(t, r, n) - e;
        t -= s / o;
      }
      return t;
    }
    sv.exports = function (t, r, n, i) {
      if (!(0 <= t && t <= 1 && 0 <= n && n <= 1))
        throw new Error("bezier x values must be in [0, 1] range");
      var o = ZP ? new Float32Array(Mr) : new Array(Mr);
      if (t !== r || n !== i)
        for (var s = 0; s < Mr; ++s) o[s] = Kn(s * zn, t, n);
      function a(u) {
        for (var f = 0, p = 1, g = Mr - 1; p !== g && o[p] <= u; ++p) f += zn;
        --p;
        var d = (u - o[p]) / (o[p + 1] - o[p]),
          v = f + d * zn,
          b = av(v, t, n);
        return b >= YP ? eq(u, v, t, n) : b === 0 ? v : JP(u, f, f + zn, t, n);
      }
      return function (f) {
        return t === r && n === i
          ? f
          : f === 0
          ? 0
          : f === 1
          ? 1
          : Kn(a(f), r, i);
      };
    };
  });
  var Gr = {};
  Re(Gr, {
    bounce: () => Mq,
    bouncePast: () => Dq,
    ease: () => tq,
    easeIn: () => rq,
    easeInOut: () => iq,
    easeOut: () => nq,
    inBack: () => wq,
    inCirc: () => Iq,
    inCubic: () => uq,
    inElastic: () => Rq,
    inExpo: () => _q,
    inOutBack: () => Cq,
    inOutCirc: () => Aq,
    inOutCubic: () => lq,
    inOutElastic: () => Nq,
    inOutExpo: () => Tq,
    inOutQuad: () => sq,
    inOutQuart: () => pq,
    inOutQuint: () => vq,
    inOutSine: () => mq,
    inQuad: () => oq,
    inQuart: () => fq,
    inQuint: () => gq,
    inSine: () => yq,
    outBack: () => xq,
    outBounce: () => Sq,
    outCirc: () => Oq,
    outCubic: () => cq,
    outElastic: () => Lq,
    outExpo: () => bq,
    outQuad: () => aq,
    outQuart: () => dq,
    outQuint: () => hq,
    outSine: () => Eq,
    swingFrom: () => qq,
    swingFromTo: () => Pq,
    swingTo: () => Fq,
  });
  function oq(e) {
    return Math.pow(e, 2);
  }
  function aq(e) {
    return -(Math.pow(e - 1, 2) - 1);
  }
  function sq(e) {
    return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 2) : -0.5 * ((e -= 2) * e - 2);
  }
  function uq(e) {
    return Math.pow(e, 3);
  }
  function cq(e) {
    return Math.pow(e - 1, 3) + 1;
  }
  function lq(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 3)
      : 0.5 * (Math.pow(e - 2, 3) + 2);
  }
  function fq(e) {
    return Math.pow(e, 4);
  }
  function dq(e) {
    return -(Math.pow(e - 1, 4) - 1);
  }
  function pq(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 4)
      : -0.5 * ((e -= 2) * Math.pow(e, 3) - 2);
  }
  function gq(e) {
    return Math.pow(e, 5);
  }
  function hq(e) {
    return Math.pow(e - 1, 5) + 1;
  }
  function vq(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 5)
      : 0.5 * (Math.pow(e - 2, 5) + 2);
  }
  function yq(e) {
    return -Math.cos(e * (Math.PI / 2)) + 1;
  }
  function Eq(e) {
    return Math.sin(e * (Math.PI / 2));
  }
  function mq(e) {
    return -0.5 * (Math.cos(Math.PI * e) - 1);
  }
  function _q(e) {
    return e === 0 ? 0 : Math.pow(2, 10 * (e - 1));
  }
  function bq(e) {
    return e === 1 ? 1 : -Math.pow(2, -10 * e) + 1;
  }
  function Tq(e) {
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (e /= 0.5) < 1
      ? 0.5 * Math.pow(2, 10 * (e - 1))
      : 0.5 * (-Math.pow(2, -10 * --e) + 2);
  }
  function Iq(e) {
    return -(Math.sqrt(1 - e * e) - 1);
  }
  function Oq(e) {
    return Math.sqrt(1 - Math.pow(e - 1, 2));
  }
  function Aq(e) {
    return (e /= 0.5) < 1
      ? -0.5 * (Math.sqrt(1 - e * e) - 1)
      : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
  }
  function Sq(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
      : e < 2.5 / 2.75
      ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
      : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  }
  function wq(e) {
    let t = at;
    return e * e * ((t + 1) * e - t);
  }
  function xq(e) {
    let t = at;
    return (e -= 1) * e * ((t + 1) * e + t) + 1;
  }
  function Cq(e) {
    let t = at;
    return (e /= 0.5) < 1
      ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
      : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  }
  function Rq(e) {
    let t = at,
      r = 0,
      n = 1;
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (r || (r = 0.3),
        n < 1
          ? ((n = 1), (t = r / 4))
          : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
        -(
          n *
          Math.pow(2, 10 * (e -= 1)) *
          Math.sin(((e - t) * (2 * Math.PI)) / r)
        ));
  }
  function Lq(e) {
    let t = at,
      r = 0,
      n = 1;
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (r || (r = 0.3),
        n < 1
          ? ((n = 1), (t = r / 4))
          : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
        n * Math.pow(2, -10 * e) * Math.sin(((e - t) * (2 * Math.PI)) / r) + 1);
  }
  function Nq(e) {
    let t = at,
      r = 0,
      n = 1;
    return e === 0
      ? 0
      : (e /= 1 / 2) === 2
      ? 1
      : (r || (r = 0.3 * 1.5),
        n < 1
          ? ((n = 1), (t = r / 4))
          : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
        e < 1
          ? -0.5 *
            (n *
              Math.pow(2, 10 * (e -= 1)) *
              Math.sin(((e - t) * (2 * Math.PI)) / r))
          : n *
              Math.pow(2, -10 * (e -= 1)) *
              Math.sin(((e - t) * (2 * Math.PI)) / r) *
              0.5 +
            1);
  }
  function Pq(e) {
    let t = at;
    return (e /= 0.5) < 1
      ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
      : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  }
  function qq(e) {
    let t = at;
    return e * e * ((t + 1) * e - t);
  }
  function Fq(e) {
    let t = at;
    return (e -= 1) * e * ((t + 1) * e + t) + 1;
  }
  function Mq(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
      : e < 2.5 / 2.75
      ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
      : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  }
  function Dq(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 2 - (7.5625 * (e -= 1.5 / 2.75) * e + 0.75)
      : e < 2.5 / 2.75
      ? 2 - (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375)
      : 2 - (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375);
  }
  var Dr,
    at,
    tq,
    rq,
    nq,
    iq,
    _a = le(() => {
      "use strict";
      (Dr = oe(ma())),
        (at = 1.70158),
        (tq = (0, Dr.default)(0.25, 0.1, 0.25, 1)),
        (rq = (0, Dr.default)(0.42, 0, 1, 1)),
        (nq = (0, Dr.default)(0, 0, 0.58, 1)),
        (iq = (0, Dr.default)(0.42, 0, 0.58, 1));
    });
  var cv = {};
  Re(cv, {
    applyEasing: () => Vq,
    createBezierEasing: () => Gq,
    optimizeFloat: () => Vr,
  });
  function Vr(e, t = 5, r = 10) {
    let n = Math.pow(r, t),
      i = Number(Math.round(e * n) / n);
    return Math.abs(i) > 1e-4 ? i : 0;
  }
  function Gq(e) {
    return (0, uv.default)(...e);
  }
  function Vq(e, t, r) {
    return t === 0
      ? 0
      : t === 1
      ? 1
      : Vr(r ? (t > 0 ? r(t) : t) : t > 0 && e && Gr[e] ? Gr[e](t) : t);
  }
  var uv,
    ba = le(() => {
      "use strict";
      _a();
      uv = oe(ma());
    });
  var dv = {};
  Re(dv, {
    createElementState: () => fv,
    ixElements: () => Jq,
    mergeActionState: () => Ta,
  });
  function fv(e, t, r, n, i) {
    let o =
      r === Uq ? (0, Yt.getIn)(i, ["config", "target", "objectId"]) : null;
    return (0, Yt.mergeIn)(e, [n], { id: n, ref: t, refId: o, refType: r });
  }
  function Ta(e, t, r, n, i) {
    let o = tF(i);
    return (0, Yt.mergeIn)(e, [t, Zq, r], n, o);
  }
  function tF(e) {
    let { config: t } = e;
    return eF.reduce((r, n) => {
      let i = n[0],
        o = n[1],
        s = t[i],
        a = t[o];
      return s != null && a != null && (r[o] = a), r;
    }, {});
  }
  var Yt,
    eW,
    Uq,
    tW,
    Bq,
    kq,
    Xq,
    Hq,
    Wq,
    jq,
    zq,
    Kq,
    Yq,
    $q,
    Qq,
    lv,
    Zq,
    Jq,
    eF,
    pv = le(() => {
      "use strict";
      Yt = oe(Ut());
      Ne();
      ({
        HTML_ELEMENT: eW,
        PLAIN_OBJECT: Uq,
        ABSTRACT_NODE: tW,
        CONFIG_X_VALUE: Bq,
        CONFIG_Y_VALUE: kq,
        CONFIG_Z_VALUE: Xq,
        CONFIG_VALUE: Hq,
        CONFIG_X_UNIT: Wq,
        CONFIG_Y_UNIT: jq,
        CONFIG_Z_UNIT: zq,
        CONFIG_UNIT: Kq,
      } = Ie),
        ({
          IX2_SESSION_STOPPED: Yq,
          IX2_INSTANCE_ADDED: $q,
          IX2_ELEMENT_STATE_CHANGED: Qq,
        } = Ee),
        (lv = {}),
        (Zq = "refState"),
        (Jq = (e = lv, t = {}) => {
          switch (t.type) {
            case Yq:
              return lv;
            case $q: {
              let {
                  elementId: r,
                  element: n,
                  origin: i,
                  actionItem: o,
                  refType: s,
                } = t.payload,
                { actionTypeId: a } = o,
                u = e;
              return (
                (0, Yt.getIn)(u, [r, n]) !== n && (u = fv(u, n, s, r, o)),
                Ta(u, r, a, i, o)
              );
            }
            case Qq: {
              let {
                elementId: r,
                actionTypeId: n,
                current: i,
                actionItem: o,
              } = t.payload;
              return Ta(e, r, n, i, o);
            }
            default:
              return e;
          }
        });
      eF = [
        [Bq, Wq],
        [kq, jq],
        [Xq, zq],
        [Hq, Kq],
      ];
    });
  var gv = c((_e) => {
    "use strict";
    Object.defineProperty(_e, "__esModule", { value: !0 });
    _e.renderPlugin =
      _e.getPluginOrigin =
      _e.getPluginDuration =
      _e.getPluginDestination =
      _e.getPluginConfig =
      _e.createPluginInstance =
      _e.clearPlugin =
        void 0;
    var rF = (e) => e.value;
    _e.getPluginConfig = rF;
    var nF = (e, t) => {
      if (t.config.duration !== "auto") return null;
      let r = parseFloat(e.getAttribute("data-duration"));
      return r > 0
        ? r * 1e3
        : parseFloat(e.getAttribute("data-default-duration")) * 1e3;
    };
    _e.getPluginDuration = nF;
    var iF = (e) => e || { value: 0 };
    _e.getPluginOrigin = iF;
    var oF = (e) => ({ value: e.value });
    _e.getPluginDestination = oF;
    var aF = (e) => {
      let t = window.Webflow.require("lottie").createInstance(e);
      return t.stop(), t.setSubframe(!0), t;
    };
    _e.createPluginInstance = aF;
    var sF = (e, t, r) => {
      if (!e) return;
      let n = t[r.actionTypeId].value / 100;
      e.goToFrame(e.frames * n);
    };
    _e.renderPlugin = sF;
    var uF = (e) => {
      window.Webflow.require("lottie").createInstance(e).stop();
    };
    _e.clearPlugin = uF;
  });
  var vv = c((be) => {
    "use strict";
    Object.defineProperty(be, "__esModule", { value: !0 });
    be.renderPlugin =
      be.getPluginOrigin =
      be.getPluginDuration =
      be.getPluginDestination =
      be.getPluginConfig =
      be.createPluginInstance =
      be.clearPlugin =
        void 0;
    var cF = (e) => document.querySelector(`[data-w-id="${e}"]`),
      lF = () => window.Webflow.require("spline"),
      fF = (e, t) => e.filter((r) => !t.includes(r)),
      dF = (e, t) => e.value[t];
    be.getPluginConfig = dF;
    var pF = () => null;
    be.getPluginDuration = pF;
    var hv = Object.freeze({
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
      }),
      gF = (e, t) => {
        let r = t.config.value,
          n = Object.keys(r);
        if (e) {
          let o = Object.keys(e),
            s = fF(n, o);
          return s.length ? s.reduce((u, f) => ((u[f] = hv[f]), u), e) : e;
        }
        return n.reduce((o, s) => ((o[s] = hv[s]), o), {});
      };
    be.getPluginOrigin = gF;
    var hF = (e) => e.value;
    be.getPluginDestination = hF;
    var vF = (e, t) => {
      var r;
      let n =
        t == null ||
        (r = t.config) === null ||
        r === void 0 ||
        (r = r.target) === null ||
        r === void 0
          ? void 0
          : r.pluginElement;
      return n ? cF(n) : null;
    };
    be.createPluginInstance = vF;
    var yF = (e, t, r) => {
      let n = lF(),
        i = n.getInstance(e),
        o = r.config.target.objectId,
        s = (a) => {
          if (!a) throw new Error("Invalid spline app passed to renderSpline");
          let u = o && a.findObjectById(o);
          if (!u) return;
          let { PLUGIN_SPLINE: f } = t;
          f.positionX != null && (u.position.x = f.positionX),
            f.positionY != null && (u.position.y = f.positionY),
            f.positionZ != null && (u.position.z = f.positionZ),
            f.rotationX != null && (u.rotation.x = f.rotationX),
            f.rotationY != null && (u.rotation.y = f.rotationY),
            f.rotationZ != null && (u.rotation.z = f.rotationZ),
            f.scaleX != null && (u.scale.x = f.scaleX),
            f.scaleY != null && (u.scale.y = f.scaleY),
            f.scaleZ != null && (u.scale.z = f.scaleZ);
        };
      i ? s(i.spline) : n.setLoadHandler(e, s);
    };
    be.renderPlugin = yF;
    var EF = () => null;
    be.clearPlugin = EF;
  });
  var Oa = c((Ia) => {
    "use strict";
    Object.defineProperty(Ia, "__esModule", { value: !0 });
    Ia.normalizeColor = mF;
    var yv = {
      aliceblue: "#F0F8FF",
      antiquewhite: "#FAEBD7",
      aqua: "#00FFFF",
      aquamarine: "#7FFFD4",
      azure: "#F0FFFF",
      beige: "#F5F5DC",
      bisque: "#FFE4C4",
      black: "#000000",
      blanchedalmond: "#FFEBCD",
      blue: "#0000FF",
      blueviolet: "#8A2BE2",
      brown: "#A52A2A",
      burlywood: "#DEB887",
      cadetblue: "#5F9EA0",
      chartreuse: "#7FFF00",
      chocolate: "#D2691E",
      coral: "#FF7F50",
      cornflowerblue: "#6495ED",
      cornsilk: "#FFF8DC",
      crimson: "#DC143C",
      cyan: "#00FFFF",
      darkblue: "#00008B",
      darkcyan: "#008B8B",
      darkgoldenrod: "#B8860B",
      darkgray: "#A9A9A9",
      darkgreen: "#006400",
      darkgrey: "#A9A9A9",
      darkkhaki: "#BDB76B",
      darkmagenta: "#8B008B",
      darkolivegreen: "#556B2F",
      darkorange: "#FF8C00",
      darkorchid: "#9932CC",
      darkred: "#8B0000",
      darksalmon: "#E9967A",
      darkseagreen: "#8FBC8F",
      darkslateblue: "#483D8B",
      darkslategray: "#2F4F4F",
      darkslategrey: "#2F4F4F",
      darkturquoise: "#00CED1",
      darkviolet: "#9400D3",
      deeppink: "#FF1493",
      deepskyblue: "#00BFFF",
      dimgray: "#696969",
      dimgrey: "#696969",
      dodgerblue: "#1E90FF",
      firebrick: "#B22222",
      floralwhite: "#FFFAF0",
      forestgreen: "#228B22",
      fuchsia: "#FF00FF",
      gainsboro: "#DCDCDC",
      ghostwhite: "#F8F8FF",
      gold: "#FFD700",
      goldenrod: "#DAA520",
      gray: "#808080",
      green: "#008000",
      greenyellow: "#ADFF2F",
      grey: "#808080",
      honeydew: "#F0FFF0",
      hotpink: "#FF69B4",
      indianred: "#CD5C5C",
      indigo: "#4B0082",
      ivory: "#FFFFF0",
      khaki: "#F0E68C",
      lavender: "#E6E6FA",
      lavenderblush: "#FFF0F5",
      lawngreen: "#7CFC00",
      lemonchiffon: "#FFFACD",
      lightblue: "#ADD8E6",
      lightcoral: "#F08080",
      lightcyan: "#E0FFFF",
      lightgoldenrodyellow: "#FAFAD2",
      lightgray: "#D3D3D3",
      lightgreen: "#90EE90",
      lightgrey: "#D3D3D3",
      lightpink: "#FFB6C1",
      lightsalmon: "#FFA07A",
      lightseagreen: "#20B2AA",
      lightskyblue: "#87CEFA",
      lightslategray: "#778899",
      lightslategrey: "#778899",
      lightsteelblue: "#B0C4DE",
      lightyellow: "#FFFFE0",
      lime: "#00FF00",
      limegreen: "#32CD32",
      linen: "#FAF0E6",
      magenta: "#FF00FF",
      maroon: "#800000",
      mediumaquamarine: "#66CDAA",
      mediumblue: "#0000CD",
      mediumorchid: "#BA55D3",
      mediumpurple: "#9370DB",
      mediumseagreen: "#3CB371",
      mediumslateblue: "#7B68EE",
      mediumspringgreen: "#00FA9A",
      mediumturquoise: "#48D1CC",
      mediumvioletred: "#C71585",
      midnightblue: "#191970",
      mintcream: "#F5FFFA",
      mistyrose: "#FFE4E1",
      moccasin: "#FFE4B5",
      navajowhite: "#FFDEAD",
      navy: "#000080",
      oldlace: "#FDF5E6",
      olive: "#808000",
      olivedrab: "#6B8E23",
      orange: "#FFA500",
      orangered: "#FF4500",
      orchid: "#DA70D6",
      palegoldenrod: "#EEE8AA",
      palegreen: "#98FB98",
      paleturquoise: "#AFEEEE",
      palevioletred: "#DB7093",
      papayawhip: "#FFEFD5",
      peachpuff: "#FFDAB9",
      peru: "#CD853F",
      pink: "#FFC0CB",
      plum: "#DDA0DD",
      powderblue: "#B0E0E6",
      purple: "#800080",
      rebeccapurple: "#663399",
      red: "#FF0000",
      rosybrown: "#BC8F8F",
      royalblue: "#4169E1",
      saddlebrown: "#8B4513",
      salmon: "#FA8072",
      sandybrown: "#F4A460",
      seagreen: "#2E8B57",
      seashell: "#FFF5EE",
      sienna: "#A0522D",
      silver: "#C0C0C0",
      skyblue: "#87CEEB",
      slateblue: "#6A5ACD",
      slategray: "#708090",
      slategrey: "#708090",
      snow: "#FFFAFA",
      springgreen: "#00FF7F",
      steelblue: "#4682B4",
      tan: "#D2B48C",
      teal: "#008080",
      thistle: "#D8BFD8",
      tomato: "#FF6347",
      turquoise: "#40E0D0",
      violet: "#EE82EE",
      wheat: "#F5DEB3",
      white: "#FFFFFF",
      whitesmoke: "#F5F5F5",
      yellow: "#FFFF00",
      yellowgreen: "#9ACD32",
    };
    function mF(e) {
      let t,
        r,
        n,
        i = 1,
        o = e.replace(/\s/g, "").toLowerCase(),
        a = (typeof yv[o] == "string" ? yv[o].toLowerCase() : null) || o;
      if (a.startsWith("#")) {
        let u = a.substring(1);
        u.length === 3
          ? ((t = parseInt(u[0] + u[0], 16)),
            (r = parseInt(u[1] + u[1], 16)),
            (n = parseInt(u[2] + u[2], 16)))
          : u.length === 6 &&
            ((t = parseInt(u.substring(0, 2), 16)),
            (r = parseInt(u.substring(2, 4), 16)),
            (n = parseInt(u.substring(4, 6), 16)));
      } else if (a.startsWith("rgba")) {
        let u = a.match(/rgba\(([^)]+)\)/)[1].split(",");
        (t = parseInt(u[0], 10)),
          (r = parseInt(u[1], 10)),
          (n = parseInt(u[2], 10)),
          (i = parseFloat(u[3]));
      } else if (a.startsWith("rgb")) {
        let u = a.match(/rgb\(([^)]+)\)/)[1].split(",");
        (t = parseInt(u[0], 10)),
          (r = parseInt(u[1], 10)),
          (n = parseInt(u[2], 10));
      } else if (a.startsWith("hsla")) {
        let u = a.match(/hsla\(([^)]+)\)/)[1].split(","),
          f = parseFloat(u[0]),
          p = parseFloat(u[1].replace("%", "")) / 100,
          g = parseFloat(u[2].replace("%", "")) / 100;
        i = parseFloat(u[3]);
        let d = (1 - Math.abs(2 * g - 1)) * p,
          v = d * (1 - Math.abs(((f / 60) % 2) - 1)),
          b = g - d / 2,
          m,
          A,
          y;
        f >= 0 && f < 60
          ? ((m = d), (A = v), (y = 0))
          : f >= 60 && f < 120
          ? ((m = v), (A = d), (y = 0))
          : f >= 120 && f < 180
          ? ((m = 0), (A = d), (y = v))
          : f >= 180 && f < 240
          ? ((m = 0), (A = v), (y = d))
          : f >= 240 && f < 300
          ? ((m = v), (A = 0), (y = d))
          : ((m = d), (A = 0), (y = v)),
          (t = Math.round((m + b) * 255)),
          (r = Math.round((A + b) * 255)),
          (n = Math.round((y + b) * 255));
      } else if (a.startsWith("hsl")) {
        let u = a.match(/hsl\(([^)]+)\)/)[1].split(","),
          f = parseFloat(u[0]),
          p = parseFloat(u[1].replace("%", "")) / 100,
          g = parseFloat(u[2].replace("%", "")) / 100,
          d = (1 - Math.abs(2 * g - 1)) * p,
          v = d * (1 - Math.abs(((f / 60) % 2) - 1)),
          b = g - d / 2,
          m,
          A,
          y;
        f >= 0 && f < 60
          ? ((m = d), (A = v), (y = 0))
          : f >= 60 && f < 120
          ? ((m = v), (A = d), (y = 0))
          : f >= 120 && f < 180
          ? ((m = 0), (A = d), (y = v))
          : f >= 180 && f < 240
          ? ((m = 0), (A = v), (y = d))
          : f >= 240 && f < 300
          ? ((m = v), (A = 0), (y = d))
          : ((m = d), (A = 0), (y = v)),
          (t = Math.round((m + b) * 255)),
          (r = Math.round((A + b) * 255)),
          (n = Math.round((y + b) * 255));
      }
      if (Number.isNaN(t) || Number.isNaN(r) || Number.isNaN(n))
        throw new Error(
          `Invalid color in [ix2/shared/utils/normalizeColor.js] '${e}'`
        );
      return { red: t, green: r, blue: n, alpha: i };
    }
  });
  var Ev = c((Te) => {
    "use strict";
    Object.defineProperty(Te, "__esModule", { value: !0 });
    Te.renderPlugin =
      Te.getPluginOrigin =
      Te.getPluginDuration =
      Te.getPluginDestination =
      Te.getPluginConfig =
      Te.createPluginInstance =
      Te.clearPlugin =
        void 0;
    var _F = Oa(),
      bF = (e, t) => e.value[t];
    Te.getPluginConfig = bF;
    var TF = () => null;
    Te.getPluginDuration = TF;
    var IF = (e, t) => {
      if (e) return e;
      let r = t.config.value,
        n = t.config.target.objectId,
        i = getComputedStyle(document.documentElement).getPropertyValue(n);
      if (r.size != null) return { size: parseInt(i, 10) };
      if (r.red != null && r.green != null && r.blue != null)
        return (0, _F.normalizeColor)(i);
    };
    Te.getPluginOrigin = IF;
    var OF = (e) => e.value;
    Te.getPluginDestination = OF;
    var AF = () => null;
    Te.createPluginInstance = AF;
    var SF = (e, t, r) => {
      let n = r.config.target.objectId,
        i = r.config.value.unit,
        { PLUGIN_VARIABLE: o } = t,
        { size: s, red: a, green: u, blue: f, alpha: p } = o,
        g;
      s != null && (g = s + i),
        a != null &&
          f != null &&
          u != null &&
          p != null &&
          (g = `rgba(${a}, ${u}, ${f}, ${p})`),
        g != null && document.documentElement.style.setProperty(n, g);
    };
    Te.renderPlugin = SF;
    var wF = (e, t) => {
      let r = t.config.target.objectId;
      document.documentElement.style.removeProperty(r);
    };
    Te.clearPlugin = wF;
  });
  var mv = c((Yn) => {
    "use strict";
    var Sa = an().default;
    Object.defineProperty(Yn, "__esModule", { value: !0 });
    Yn.pluginMethodMap = void 0;
    var Aa = (Ne(), Ke(Af)),
      xF = Sa(gv()),
      CF = Sa(vv()),
      RF = Sa(Ev()),
      aW = (Yn.pluginMethodMap = new Map([
        [Aa.ActionTypeConsts.PLUGIN_LOTTIE, { ...xF }],
        [Aa.ActionTypeConsts.PLUGIN_SPLINE, { ...CF }],
        [Aa.ActionTypeConsts.PLUGIN_VARIABLE, { ...RF }],
      ]));
  });
  var _v = {};
  Re(_v, {
    clearPlugin: () => Na,
    createPluginInstance: () => NF,
    getPluginConfig: () => xa,
    getPluginDestination: () => Ra,
    getPluginDuration: () => LF,
    getPluginOrigin: () => Ca,
    isPluginType: () => St,
    renderPlugin: () => La,
  });
  function St(e) {
    return wa.pluginMethodMap.has(e);
  }
  var wa,
    wt,
    xa,
    Ca,
    LF,
    Ra,
    NF,
    La,
    Na,
    Pa = le(() => {
      "use strict";
      jn();
      wa = oe(mv());
      (wt = (e) => (t) => {
        if (!He) return () => null;
        let r = wa.pluginMethodMap.get(t);
        if (!r) throw new Error(`IX2 no plugin configured for: ${t}`);
        let n = r[e];
        if (!n) throw new Error(`IX2 invalid plugin method: ${e}`);
        return n;
      }),
        (xa = wt("getPluginConfig")),
        (Ca = wt("getPluginOrigin")),
        (LF = wt("getPluginDuration")),
        (Ra = wt("getPluginDestination")),
        (NF = wt("createPluginInstance")),
        (La = wt("renderPlugin")),
        (Na = wt("clearPlugin"));
    });
  var Tv = c((cW, bv) => {
    function PF(e, t) {
      return e == null || e !== e ? t : e;
    }
    bv.exports = PF;
  });
  var Ov = c((lW, Iv) => {
    function qF(e, t, r, n) {
      var i = -1,
        o = e == null ? 0 : e.length;
      for (n && o && (r = e[++i]); ++i < o; ) r = t(r, e[i], i, e);
      return r;
    }
    Iv.exports = qF;
  });
  var Sv = c((fW, Av) => {
    function FF(e) {
      return function (t, r, n) {
        for (var i = -1, o = Object(t), s = n(t), a = s.length; a--; ) {
          var u = s[e ? a : ++i];
          if (r(o[u], u, o) === !1) break;
        }
        return t;
      };
    }
    Av.exports = FF;
  });
  var xv = c((dW, wv) => {
    var MF = Sv(),
      DF = MF();
    wv.exports = DF;
  });
  var qa = c((pW, Cv) => {
    var GF = xv(),
      VF = Pr();
    function UF(e, t) {
      return e && GF(e, t, VF);
    }
    Cv.exports = UF;
  });
  var Lv = c((gW, Rv) => {
    var BF = Ot();
    function kF(e, t) {
      return function (r, n) {
        if (r == null) return r;
        if (!BF(r)) return e(r, n);
        for (
          var i = r.length, o = t ? i : -1, s = Object(r);
          (t ? o-- : ++o < i) && n(s[o], o, s) !== !1;

        );
        return r;
      };
    }
    Rv.exports = kF;
  });
  var Fa = c((hW, Nv) => {
    var XF = qa(),
      HF = Lv(),
      WF = HF(XF);
    Nv.exports = WF;
  });
  var qv = c((vW, Pv) => {
    function jF(e, t, r, n, i) {
      return (
        i(e, function (o, s, a) {
          r = n ? ((n = !1), o) : t(r, o, s, a);
        }),
        r
      );
    }
    Pv.exports = jF;
  });
  var Mv = c((yW, Fv) => {
    var zF = Ov(),
      KF = Fa(),
      YF = yt(),
      $F = qv(),
      QF = me();
    function ZF(e, t, r) {
      var n = QF(e) ? zF : $F,
        i = arguments.length < 3;
      return n(e, YF(t, 4), r, i, KF);
    }
    Fv.exports = ZF;
  });
  var Gv = c((EW, Dv) => {
    var JF = ha(),
      eM = yt(),
      tM = va(),
      rM = Math.max,
      nM = Math.min;
    function iM(e, t, r) {
      var n = e == null ? 0 : e.length;
      if (!n) return -1;
      var i = n - 1;
      return (
        r !== void 0 &&
          ((i = tM(r)), (i = r < 0 ? rM(n + i, 0) : nM(i, n - 1))),
        JF(e, eM(t, 3), i, !0)
      );
    }
    Dv.exports = iM;
  });
  var Uv = c((mW, Vv) => {
    var oM = ga(),
      aM = Gv(),
      sM = oM(aM);
    Vv.exports = sM;
  });
  function Bv(e, t) {
    return e === t ? e !== 0 || t !== 0 || 1 / e === 1 / t : e !== e && t !== t;
  }
  function uM(e, t) {
    if (Bv(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    let r = Object.keys(e),
      n = Object.keys(t);
    if (r.length !== n.length) return !1;
    for (let i = 0; i < r.length; i++)
      if (!Object.hasOwn(t, r[i]) || !Bv(e[r[i]], t[r[i]])) return !1;
    return !0;
  }
  var Ma,
    kv = le(() => {
      "use strict";
      Ma = uM;
    });
  var ay = {};
  Re(ay, {
    cleanupHTMLElement: () => oD,
    clearAllStyles: () => iD,
    clearObjectCache: () => AM,
    getActionListProgress: () => sD,
    getAffectedElements: () => Ba,
    getComputedStyle: () => PM,
    getDestinationValues: () => UM,
    getElementId: () => CM,
    getInstanceId: () => wM,
    getInstanceOrigin: () => MM,
    getItemConfigByKey: () => VM,
    getMaxDurationItemIndex: () => oy,
    getNamespacedParameterId: () => lD,
    getRenderType: () => ry,
    getStyleProp: () => BM,
    mediaQueriesEqual: () => dD,
    observeStore: () => NM,
    reduceListToGroup: () => uD,
    reifyState: () => RM,
    renderHTMLElement: () => kM,
    shallowEqual: () => Ma,
    shouldAllowMediaQuery: () => fD,
    shouldNamespaceEventParameter: () => cD,
    stringifyTarget: () => pD,
  });
  function AM() {
    $n.clear();
  }
  function wM() {
    return "i" + SM++;
  }
  function CM(e, t) {
    for (let r in e) {
      let n = e[r];
      if (n && n.ref === t) return n.id;
    }
    return "e" + xM++;
  }
  function RM({ events: e, actionLists: t, site: r } = {}) {
    let n = (0, ei.default)(
        e,
        (s, a) => {
          let { eventTypeId: u } = a;
          return s[u] || (s[u] = {}), (s[u][a.id] = a), s;
        },
        {}
      ),
      i = r && r.mediaQueries,
      o = [];
    return (
      i
        ? (o = i.map((s) => s.key))
        : ((i = []), console.warn("IX2 missing mediaQueries in site data")),
      {
        ixData: {
          events: e,
          actionLists: t,
          eventTypeMap: n,
          mediaQueries: i,
          mediaQueryKeys: o,
        },
      }
    );
  }
  function NM({ store: e, select: t, onChange: r, comparator: n = LM }) {
    let { getState: i, subscribe: o } = e,
      s = o(u),
      a = t(i());
    function u() {
      let f = t(i());
      if (f == null) {
        s();
        return;
      }
      n(f, a) || ((a = f), r(a, e));
    }
    return s;
  }
  function Wv(e) {
    let t = typeof e;
    if (t === "string") return { id: e };
    if (e != null && t === "object") {
      let {
        id: r,
        objectId: n,
        selector: i,
        selectorGuids: o,
        appliesTo: s,
        useEventTarget: a,
      } = e;
      return {
        id: r,
        objectId: n,
        selector: i,
        selectorGuids: o,
        appliesTo: s,
        useEventTarget: a,
      };
    }
    return {};
  }
  function Ba({
    config: e,
    event: t,
    eventTarget: r,
    elementRoot: n,
    elementApi: i,
  }) {
    if (!i) throw new Error("IX2 missing elementApi");
    let { targets: o } = e;
    if (Array.isArray(o) && o.length > 0)
      return o.reduce(
        (P, T) =>
          P.concat(
            Ba({
              config: { target: T },
              event: t,
              eventTarget: r,
              elementRoot: n,
              elementApi: i,
            })
          ),
        []
      );
    let {
        getValidDocument: s,
        getQuerySelector: a,
        queryDocument: u,
        getChildElements: f,
        getSiblingElements: p,
        matchSelector: g,
        elementContains: d,
        isSiblingNode: v,
      } = i,
      { target: b } = e;
    if (!b) return [];
    let {
      id: m,
      objectId: A,
      selector: y,
      selectorGuids: w,
      appliesTo: S,
      useEventTarget: C,
    } = Wv(b);
    if (A) return [$n.has(A) ? $n.get(A) : $n.set(A, {}).get(A)];
    if (S === Uo.PAGE) {
      let P = s(m);
      return P ? [P] : [];
    }
    let x = (t?.action?.config?.affectedElements ?? {})[m || y] || {},
      G = !!(x.id || x.selector),
      B,
      k,
      W,
      Z = t && a(Wv(t.target));
    if (
      (G
        ? ((B = x.limitAffectedElements), (k = Z), (W = a(x)))
        : (k = W = a({ id: m, selector: y, selectorGuids: w })),
      t && C)
    ) {
      let P = r && (W || C === !0) ? [r] : u(Z);
      if (W) {
        if (C === TM) return u(W).filter((T) => P.some((L) => d(T, L)));
        if (C === Xv) return u(W).filter((T) => P.some((L) => d(L, T)));
        if (C === Hv) return u(W).filter((T) => P.some((L) => v(L, T)));
      }
      return P;
    }
    return k == null || W == null
      ? []
      : He && n
      ? u(W).filter((P) => n.contains(P))
      : B === Xv
      ? u(k, W)
      : B === bM
      ? f(u(k)).filter(g(W))
      : B === Hv
      ? p(u(k)).filter(g(W))
      : u(W);
  }
  function PM({ element: e, actionItem: t }) {
    if (!He) return {};
    let { actionTypeId: r } = t;
    switch (r) {
      case er:
      case tr:
      case rr:
      case nr:
      case ri:
        return window.getComputedStyle(e);
      default:
        return {};
    }
  }
  function MM(e, t = {}, r = {}, n, i) {
    let { getStyle: o } = i,
      { actionTypeId: s } = n;
    if (St(s)) return Ca(s)(t[s], n);
    switch (n.actionTypeId) {
      case Qt:
      case Zt:
      case Jt:
      case Xr:
        return t[n.actionTypeId] || ka[n.actionTypeId];
      case Hr:
        return qM(t[n.actionTypeId], n.config.filters);
      case Wr:
        return FM(t[n.actionTypeId], n.config.fontVariations);
      case Jv:
        return { value: (0, st.default)(parseFloat(o(e, Zn)), 1) };
      case er: {
        let a = o(e, tt),
          u = o(e, rt),
          f,
          p;
        return (
          n.config.widthUnit === mt
            ? (f = jv.test(a) ? parseFloat(a) : parseFloat(r.width))
            : (f = (0, st.default)(parseFloat(a), parseFloat(r.width))),
          n.config.heightUnit === mt
            ? (p = jv.test(u) ? parseFloat(u) : parseFloat(r.height))
            : (p = (0, st.default)(parseFloat(u), parseFloat(r.height))),
          { widthValue: f, heightValue: p }
        );
      }
      case tr:
      case rr:
      case nr:
        return tD({
          element: e,
          actionTypeId: n.actionTypeId,
          computedStyle: r,
          getStyle: o,
        });
      case ri:
        return { value: (0, st.default)(o(e, Jn), r.display) };
      case OM:
        return t[n.actionTypeId] || { value: 0 };
      default:
        return;
    }
  }
  function UM({ element: e, actionItem: t, elementApi: r }) {
    if (St(t.actionTypeId)) return Ra(t.actionTypeId)(t.config);
    switch (t.actionTypeId) {
      case Qt:
      case Zt:
      case Jt:
      case Xr: {
        let { xValue: n, yValue: i, zValue: o } = t.config;
        return { xValue: n, yValue: i, zValue: o };
      }
      case er: {
        let { getStyle: n, setStyle: i, getProperty: o } = r,
          { widthUnit: s, heightUnit: a } = t.config,
          { widthValue: u, heightValue: f } = t.config;
        if (!He) return { widthValue: u, heightValue: f };
        if (s === mt) {
          let p = n(e, tt);
          i(e, tt, ""), (u = o(e, "offsetWidth")), i(e, tt, p);
        }
        if (a === mt) {
          let p = n(e, rt);
          i(e, rt, ""), (f = o(e, "offsetHeight")), i(e, rt, p);
        }
        return { widthValue: u, heightValue: f };
      }
      case tr:
      case rr:
      case nr: {
        let {
          rValue: n,
          gValue: i,
          bValue: o,
          aValue: s,
          globalSwatchId: a,
        } = t.config;
        if (a && a.startsWith("--")) {
          let { getStyle: u } = r,
            f = u(e, a),
            p = (0, Yv.normalizeColor)(f);
          return {
            rValue: p.red,
            gValue: p.green,
            bValue: p.blue,
            aValue: p.alpha,
          };
        }
        return { rValue: n, gValue: i, bValue: o, aValue: s };
      }
      case Hr:
        return t.config.filters.reduce(DM, {});
      case Wr:
        return t.config.fontVariations.reduce(GM, {});
      default: {
        let { value: n } = t.config;
        return { value: n };
      }
    }
  }
  function ry(e) {
    if (/^TRANSFORM_/.test(e)) return Qv;
    if (/^STYLE_/.test(e)) return Va;
    if (/^GENERAL_/.test(e)) return Ga;
    if (/^PLUGIN_/.test(e)) return Zv;
  }
  function BM(e, t) {
    return e === Va ? t.replace("STYLE_", "").toLowerCase() : null;
  }
  function kM(e, t, r, n, i, o, s, a, u) {
    switch (a) {
      case Qv:
        return zM(e, t, r, i, s);
      case Va:
        return rD(e, t, r, i, o, s);
      case Ga:
        return nD(e, i, s);
      case Zv: {
        let { actionTypeId: f } = i;
        if (St(f)) return La(f)(u, t, i);
      }
    }
  }
  function zM(e, t, r, n, i) {
    let o = jM
        .map((a) => {
          let u = ka[a],
            {
              xValue: f = u.xValue,
              yValue: p = u.yValue,
              zValue: g = u.zValue,
              xUnit: d = "",
              yUnit: v = "",
              zUnit: b = "",
            } = t[a] || {};
          switch (a) {
            case Qt:
              return `${fM}(${f}${d}, ${p}${v}, ${g}${b})`;
            case Zt:
              return `${dM}(${f}${d}, ${p}${v}, ${g}${b})`;
            case Jt:
              return `${pM}(${f}${d}) ${gM}(${p}${v}) ${hM}(${g}${b})`;
            case Xr:
              return `${vM}(${f}${d}, ${p}${v})`;
            default:
              return "";
          }
        })
        .join(" "),
      { setStyle: s } = i;
    xt(e, Et, i), s(e, Et, o), $M(n, r) && s(e, Wn, yM);
  }
  function KM(e, t, r, n) {
    let i = (0, ei.default)(t, (s, a, u) => `${s} ${u}(${a}${WM(u, r)})`, ""),
      { setStyle: o } = n;
    xt(e, Ur, n), o(e, Ur, i);
  }
  function YM(e, t, r, n) {
    let i = (0, ei.default)(
        t,
        (s, a, u) => (s.push(`"${u}" ${a}`), s),
        []
      ).join(", "),
      { setStyle: o } = n;
    xt(e, Br, n), o(e, Br, i);
  }
  function $M({ actionTypeId: e }, { xValue: t, yValue: r, zValue: n }) {
    return (
      (e === Qt && n !== void 0) ||
      (e === Zt && n !== void 0) ||
      (e === Jt && (t !== void 0 || r !== void 0))
    );
  }
  function eD(e, t) {
    let r = e.exec(t);
    return r ? r[1] : "";
  }
  function tD({ element: e, actionTypeId: t, computedStyle: r, getStyle: n }) {
    let i = Ua[t],
      o = n(e, i),
      s = ZM.test(o) ? o : r[i],
      a = eD(JM, s).split(kr);
    return {
      rValue: (0, st.default)(parseInt(a[0], 10), 255),
      gValue: (0, st.default)(parseInt(a[1], 10), 255),
      bValue: (0, st.default)(parseInt(a[2], 10), 255),
      aValue: (0, st.default)(parseFloat(a[3]), 1),
    };
  }
  function rD(e, t, r, n, i, o) {
    let { setStyle: s } = o;
    switch (n.actionTypeId) {
      case er: {
        let { widthUnit: a = "", heightUnit: u = "" } = n.config,
          { widthValue: f, heightValue: p } = r;
        f !== void 0 && (a === mt && (a = "px"), xt(e, tt, o), s(e, tt, f + a)),
          p !== void 0 &&
            (u === mt && (u = "px"), xt(e, rt, o), s(e, rt, p + u));
        break;
      }
      case Hr: {
        KM(e, r, n.config, o);
        break;
      }
      case Wr: {
        YM(e, r, n.config, o);
        break;
      }
      case tr:
      case rr:
      case nr: {
        let a = Ua[n.actionTypeId],
          u = Math.round(r.rValue),
          f = Math.round(r.gValue),
          p = Math.round(r.bValue),
          g = r.aValue;
        xt(e, a, o),
          s(e, a, g >= 1 ? `rgb(${u},${f},${p})` : `rgba(${u},${f},${p},${g})`);
        break;
      }
      default: {
        let { unit: a = "" } = n.config;
        xt(e, i, o), s(e, i, r.value + a);
        break;
      }
    }
  }
  function nD(e, t, r) {
    let { setStyle: n } = r;
    switch (t.actionTypeId) {
      case ri: {
        let { value: i } = t.config;
        i === EM && He ? n(e, Jn, Ea) : n(e, Jn, i);
        return;
      }
    }
  }
  function xt(e, t, r) {
    if (!He) return;
    let n = ty[t];
    if (!n) return;
    let { getStyle: i, setStyle: o } = r,
      s = i(e, $t);
    if (!s) {
      o(e, $t, n);
      return;
    }
    let a = s.split(kr).map(ey);
    a.indexOf(n) === -1 && o(e, $t, a.concat(n).join(kr));
  }
  function ny(e, t, r) {
    if (!He) return;
    let n = ty[t];
    if (!n) return;
    let { getStyle: i, setStyle: o } = r,
      s = i(e, $t);
    !s ||
      s.indexOf(n) === -1 ||
      o(
        e,
        $t,
        s
          .split(kr)
          .map(ey)
          .filter((a) => a !== n)
          .join(kr)
      );
  }
  function iD({ store: e, elementApi: t }) {
    let { ixData: r } = e.getState(),
      { events: n = {}, actionLists: i = {} } = r;
    Object.keys(n).forEach((o) => {
      let s = n[o],
        { config: a } = s.action,
        { actionListId: u } = a,
        f = i[u];
      f && zv({ actionList: f, event: s, elementApi: t });
    }),
      Object.keys(i).forEach((o) => {
        zv({ actionList: i[o], elementApi: t });
      });
  }
  function zv({ actionList: e = {}, event: t, elementApi: r }) {
    let { actionItemGroups: n, continuousParameterGroups: i } = e;
    n &&
      n.forEach((o) => {
        Kv({ actionGroup: o, event: t, elementApi: r });
      }),
      i &&
        i.forEach((o) => {
          let { continuousActionGroups: s } = o;
          s.forEach((a) => {
            Kv({ actionGroup: a, event: t, elementApi: r });
          });
        });
  }
  function Kv({ actionGroup: e, event: t, elementApi: r }) {
    let { actionItems: n } = e;
    n.forEach((i) => {
      let { actionTypeId: o, config: s } = i,
        a;
      St(o)
        ? (a = (u) => Na(o)(u, i))
        : (a = iy({ effect: aD, actionTypeId: o, elementApi: r })),
        Ba({ config: s, event: t, elementApi: r }).forEach(a);
    });
  }
  function oD(e, t, r) {
    let { setStyle: n, getStyle: i } = r,
      { actionTypeId: o } = t;
    if (o === er) {
      let { config: s } = t;
      s.widthUnit === mt && n(e, tt, ""), s.heightUnit === mt && n(e, rt, "");
    }
    i(e, $t) && iy({ effect: ny, actionTypeId: o, elementApi: r })(e);
  }
  function aD(e, t, r) {
    let { setStyle: n } = r;
    ny(e, t, r), n(e, t, ""), t === Et && n(e, Wn, "");
  }
  function oy(e) {
    let t = 0,
      r = 0;
    return (
      e.forEach((n, i) => {
        let { config: o } = n,
          s = o.delay + o.duration;
        s >= t && ((t = s), (r = i));
      }),
      r
    );
  }
  function sD(e, t) {
    let { actionItemGroups: r, useFirstGroupAsInitialState: n } = e,
      { actionItem: i, verboseTimeElapsed: o = 0 } = t,
      s = 0,
      a = 0;
    return (
      r.forEach((u, f) => {
        if (n && f === 0) return;
        let { actionItems: p } = u,
          g = p[oy(p)],
          { config: d, actionTypeId: v } = g;
        i.id === g.id && (a = s + o);
        let b = ry(v) === Ga ? 0 : d.duration;
        s += d.delay + b;
      }),
      s > 0 ? Vr(a / s) : 0
    );
  }
  function uD({ actionList: e, actionItemId: t, rawData: r }) {
    let { actionItemGroups: n, continuousParameterGroups: i } = e,
      o = [],
      s = (a) => (
        o.push((0, ti.mergeIn)(a, ["config"], { delay: 0, duration: 0 })),
        a.id === t
      );
    return (
      n && n.some(({ actionItems: a }) => a.some(s)),
      i &&
        i.some((a) => {
          let { continuousActionGroups: u } = a;
          return u.some(({ actionItems: f }) => f.some(s));
        }),
      (0, ti.setIn)(r, ["actionLists"], {
        [e.id]: { id: e.id, actionItemGroups: [{ actionItems: o }] },
      })
    );
  }
  function cD(e, { basedOn: t }) {
    return (
      (e === Xe.SCROLLING_IN_VIEW && (t === Je.ELEMENT || t == null)) ||
      (e === Xe.MOUSE_MOVE && t === Je.ELEMENT)
    );
  }
  function lD(e, t) {
    return e + IM + t;
  }
  function fD(e, t) {
    return t == null ? !0 : e.indexOf(t) !== -1;
  }
  function dD(e, t) {
    return Ma(e && e.sort(), t && t.sort());
  }
  function pD(e) {
    if (typeof e == "string") return e;
    if (e.pluginElement && e.objectId) return e.pluginElement + Da + e.objectId;
    if (e.objectId) return e.objectId;
    let { id: t = "", selector: r = "", useEventTarget: n = "" } = e;
    return t + Da + r + Da + n;
  }
  var st,
    ei,
    Qn,
    ti,
    Yv,
    cM,
    lM,
    fM,
    dM,
    pM,
    gM,
    hM,
    vM,
    yM,
    EM,
    Zn,
    Ur,
    Br,
    tt,
    rt,
    $v,
    mM,
    _M,
    Xv,
    bM,
    Hv,
    TM,
    Jn,
    $t,
    mt,
    kr,
    IM,
    Da,
    Qv,
    Ga,
    Va,
    Zv,
    Qt,
    Zt,
    Jt,
    Xr,
    Jv,
    Hr,
    Wr,
    er,
    tr,
    rr,
    nr,
    ri,
    OM,
    ey,
    Ua,
    ty,
    $n,
    SM,
    xM,
    LM,
    jv,
    qM,
    FM,
    DM,
    GM,
    VM,
    ka,
    XM,
    HM,
    WM,
    jM,
    QM,
    ZM,
    JM,
    iy,
    sy = le(() => {
      "use strict";
      (st = oe(Tv())), (ei = oe(Mv())), (Qn = oe(Uv())), (ti = oe(Ut()));
      Ne();
      kv();
      ba();
      Yv = oe(Oa());
      Pa();
      jn();
      ({
        BACKGROUND: cM,
        TRANSFORM: lM,
        TRANSLATE_3D: fM,
        SCALE_3D: dM,
        ROTATE_X: pM,
        ROTATE_Y: gM,
        ROTATE_Z: hM,
        SKEW: vM,
        PRESERVE_3D: yM,
        FLEX: EM,
        OPACITY: Zn,
        FILTER: Ur,
        FONT_VARIATION_SETTINGS: Br,
        WIDTH: tt,
        HEIGHT: rt,
        BACKGROUND_COLOR: $v,
        BORDER_COLOR: mM,
        COLOR: _M,
        CHILDREN: Xv,
        IMMEDIATE_CHILDREN: bM,
        SIBLINGS: Hv,
        PARENT: TM,
        DISPLAY: Jn,
        WILL_CHANGE: $t,
        AUTO: mt,
        COMMA_DELIMITER: kr,
        COLON_DELIMITER: IM,
        BAR_DELIMITER: Da,
        RENDER_TRANSFORM: Qv,
        RENDER_GENERAL: Ga,
        RENDER_STYLE: Va,
        RENDER_PLUGIN: Zv,
      } = Ie),
        ({
          TRANSFORM_MOVE: Qt,
          TRANSFORM_SCALE: Zt,
          TRANSFORM_ROTATE: Jt,
          TRANSFORM_SKEW: Xr,
          STYLE_OPACITY: Jv,
          STYLE_FILTER: Hr,
          STYLE_FONT_VARIATION: Wr,
          STYLE_SIZE: er,
          STYLE_BACKGROUND_COLOR: tr,
          STYLE_BORDER: rr,
          STYLE_TEXT_COLOR: nr,
          GENERAL_DISPLAY: ri,
          OBJECT_VALUE: OM,
        } = Le),
        (ey = (e) => e.trim()),
        (Ua = Object.freeze({ [tr]: $v, [rr]: mM, [nr]: _M })),
        (ty = Object.freeze({
          [Et]: lM,
          [$v]: cM,
          [Zn]: Zn,
          [Ur]: Ur,
          [tt]: tt,
          [rt]: rt,
          [Br]: Br,
        })),
        ($n = new Map());
      SM = 1;
      xM = 1;
      LM = (e, t) => e === t;
      (jv = /px/),
        (qM = (e, t) =>
          t.reduce(
            (r, n) => (r[n.type] == null && (r[n.type] = XM[n.type]), r),
            e || {}
          )),
        (FM = (e, t) =>
          t.reduce(
            (r, n) => (
              r[n.type] == null &&
                (r[n.type] = HM[n.type] || n.defaultValue || 0),
              r
            ),
            e || {}
          ));
      (DM = (e, t) => (t && (e[t.type] = t.value || 0), e)),
        (GM = (e, t) => (t && (e[t.type] = t.value || 0), e)),
        (VM = (e, t, r) => {
          if (St(e)) return xa(e)(r, t);
          switch (e) {
            case Hr: {
              let n = (0, Qn.default)(r.filters, ({ type: i }) => i === t);
              return n ? n.value : 0;
            }
            case Wr: {
              let n = (0, Qn.default)(
                r.fontVariations,
                ({ type: i }) => i === t
              );
              return n ? n.value : 0;
            }
            default:
              return r[t];
          }
        });
      (ka = {
        [Qt]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [Zt]: Object.freeze({ xValue: 1, yValue: 1, zValue: 1 }),
        [Jt]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [Xr]: Object.freeze({ xValue: 0, yValue: 0 }),
      }),
        (XM = Object.freeze({
          blur: 0,
          "hue-rotate": 0,
          invert: 0,
          grayscale: 0,
          saturate: 100,
          sepia: 0,
          contrast: 100,
          brightness: 100,
        })),
        (HM = Object.freeze({ wght: 0, opsz: 0, wdth: 0, slnt: 0 })),
        (WM = (e, t) => {
          let r = (0, Qn.default)(t.filters, ({ type: n }) => n === e);
          if (r && r.unit) return r.unit;
          switch (e) {
            case "blur":
              return "px";
            case "hue-rotate":
              return "deg";
            default:
              return "%";
          }
        }),
        (jM = Object.keys(ka));
      (QM = "\\(([^)]+)\\)"), (ZM = /^rgb/), (JM = RegExp(`rgba?${QM}`));
      iy =
        ({ effect: e, actionTypeId: t, elementApi: r }) =>
        (n) => {
          switch (t) {
            case Qt:
            case Zt:
            case Jt:
            case Xr:
              e(n, Et, r);
              break;
            case Hr:
              e(n, Ur, r);
              break;
            case Wr:
              e(n, Br, r);
              break;
            case Jv:
              e(n, Zn, r);
              break;
            case er:
              e(n, tt, r), e(n, rt, r);
              break;
            case tr:
            case rr:
            case nr:
              e(n, Ua[t], r);
              break;
            case ri:
              e(n, Jn, r);
              break;
          }
        };
    });
  var Ct = c((we) => {
    "use strict";
    var ir = an().default;
    Object.defineProperty(we, "__esModule", { value: !0 });
    we.IX2VanillaUtils =
      we.IX2VanillaPlugins =
      we.IX2ElementsReducer =
      we.IX2Easings =
      we.IX2EasingUtils =
      we.IX2BrowserSupport =
        void 0;
    var gD = ir((jn(), Ke(rv)));
    we.IX2BrowserSupport = gD;
    var hD = ir((_a(), Ke(Gr)));
    we.IX2Easings = hD;
    var vD = ir((ba(), Ke(cv)));
    we.IX2EasingUtils = vD;
    var yD = ir((pv(), Ke(dv)));
    we.IX2ElementsReducer = yD;
    var ED = ir((Pa(), Ke(_v)));
    we.IX2VanillaPlugins = ED;
    var mD = ir((sy(), Ke(ay)));
    we.IX2VanillaUtils = mD;
  });
  var ii,
    ut,
    _D,
    bD,
    TD,
    ID,
    OD,
    AD,
    ni,
    uy,
    SD,
    wD,
    Xa,
    xD,
    CD,
    RD,
    LD,
    cy,
    ly = le(() => {
      "use strict";
      Ne();
      (ii = oe(Ct())),
        (ut = oe(Ut())),
        ({
          IX2_RAW_DATA_IMPORTED: _D,
          IX2_SESSION_STOPPED: bD,
          IX2_INSTANCE_ADDED: TD,
          IX2_INSTANCE_STARTED: ID,
          IX2_INSTANCE_REMOVED: OD,
          IX2_ANIMATION_FRAME_CHANGED: AD,
        } = Ee),
        ({
          optimizeFloat: ni,
          applyEasing: uy,
          createBezierEasing: SD,
        } = ii.IX2EasingUtils),
        ({ RENDER_GENERAL: wD } = Ie),
        ({
          getItemConfigByKey: Xa,
          getRenderType: xD,
          getStyleProp: CD,
        } = ii.IX2VanillaUtils),
        (RD = (e, t) => {
          let {
              position: r,
              parameterId: n,
              actionGroups: i,
              destinationKeys: o,
              smoothing: s,
              restingValue: a,
              actionTypeId: u,
              customEasingFn: f,
              skipMotion: p,
              skipToValue: g,
            } = e,
            { parameters: d } = t.payload,
            v = Math.max(1 - s, 0.01),
            b = d[n];
          b == null && ((v = 1), (b = a));
          let m = Math.max(b, 0) || 0,
            A = ni(m - r),
            y = p ? g : ni(r + A * v),
            w = y * 100;
          if (y === r && e.current) return e;
          let S, C, R, x;
          for (let B = 0, { length: k } = i; B < k; B++) {
            let { keyframe: W, actionItems: Z } = i[B];
            if ((B === 0 && (S = Z[0]), w >= W)) {
              S = Z[0];
              let P = i[B + 1],
                T = P && w !== W;
              (C = T ? P.actionItems[0] : null),
                T && ((R = W / 100), (x = (P.keyframe - W) / 100));
            }
          }
          let G = {};
          if (S && !C)
            for (let B = 0, { length: k } = o; B < k; B++) {
              let W = o[B];
              G[W] = Xa(u, W, S.config);
            }
          else if (S && C && R !== void 0 && x !== void 0) {
            let B = (y - R) / x,
              k = S.config.easing,
              W = uy(k, B, f);
            for (let Z = 0, { length: P } = o; Z < P; Z++) {
              let T = o[Z],
                L = Xa(u, T, S.config),
                J = (Xa(u, T, C.config) - L) * W + L;
              G[T] = J;
            }
          }
          return (0, ut.merge)(e, { position: y, current: G });
        }),
        (LD = (e, t) => {
          let {
              active: r,
              origin: n,
              start: i,
              immediate: o,
              renderType: s,
              verbose: a,
              actionItem: u,
              destination: f,
              destinationKeys: p,
              pluginDuration: g,
              instanceDelay: d,
              customEasingFn: v,
              skipMotion: b,
            } = e,
            m = u.config.easing,
            { duration: A, delay: y } = u.config;
          g != null && (A = g),
            (y = d ?? y),
            s === wD ? (A = 0) : (o || b) && (A = y = 0);
          let { now: w } = t.payload;
          if (r && n) {
            let S = w - (i + y);
            if (a) {
              let B = w - i,
                k = A + y,
                W = ni(Math.min(Math.max(0, B / k), 1));
              e = (0, ut.set)(e, "verboseTimeElapsed", k * W);
            }
            if (S < 0) return e;
            let C = ni(Math.min(Math.max(0, S / A), 1)),
              R = uy(m, C, v),
              x = {},
              G = null;
            return (
              p.length &&
                (G = p.reduce((B, k) => {
                  let W = f[k],
                    Z = parseFloat(n[k]) || 0,
                    T = (parseFloat(W) - Z) * R + Z;
                  return (B[k] = T), B;
                }, {})),
              (x.current = G),
              (x.position = C),
              C === 1 && ((x.active = !1), (x.complete = !0)),
              (0, ut.merge)(e, x)
            );
          }
          return e;
        }),
        (cy = (e = Object.freeze({}), t) => {
          switch (t.type) {
            case _D:
              return t.payload.ixInstances || Object.freeze({});
            case bD:
              return Object.freeze({});
            case TD: {
              let {
                  instanceId: r,
                  elementId: n,
                  actionItem: i,
                  eventId: o,
                  eventTarget: s,
                  eventStateKey: a,
                  actionListId: u,
                  groupIndex: f,
                  isCarrier: p,
                  origin: g,
                  destination: d,
                  immediate: v,
                  verbose: b,
                  continuous: m,
                  parameterId: A,
                  actionGroups: y,
                  smoothing: w,
                  restingValue: S,
                  pluginInstance: C,
                  pluginDuration: R,
                  instanceDelay: x,
                  skipMotion: G,
                  skipToValue: B,
                } = t.payload,
                { actionTypeId: k } = i,
                W = xD(k),
                Z = CD(W, k),
                P = Object.keys(d).filter(
                  (L) => d[L] != null && typeof d[L] != "string"
                ),
                { easing: T } = i.config;
              return (0, ut.set)(e, r, {
                id: r,
                elementId: n,
                active: !1,
                position: 0,
                start: 0,
                origin: g,
                destination: d,
                destinationKeys: P,
                immediate: v,
                verbose: b,
                current: null,
                actionItem: i,
                actionTypeId: k,
                eventId: o,
                eventTarget: s,
                eventStateKey: a,
                actionListId: u,
                groupIndex: f,
                renderType: W,
                isCarrier: p,
                styleProp: Z,
                continuous: m,
                parameterId: A,
                actionGroups: y,
                smoothing: w,
                restingValue: S,
                pluginInstance: C,
                pluginDuration: R,
                instanceDelay: x,
                skipMotion: G,
                skipToValue: B,
                customEasingFn:
                  Array.isArray(T) && T.length === 4 ? SD(T) : void 0,
              });
            }
            case ID: {
              let { instanceId: r, time: n } = t.payload;
              return (0, ut.mergeIn)(e, [r], {
                active: !0,
                complete: !1,
                start: n,
              });
            }
            case OD: {
              let { instanceId: r } = t.payload;
              if (!e[r]) return e;
              let n = {},
                i = Object.keys(e),
                { length: o } = i;
              for (let s = 0; s < o; s++) {
                let a = i[s];
                a !== r && (n[a] = e[a]);
              }
              return n;
            }
            case AD: {
              let r = e,
                n = Object.keys(e),
                { length: i } = n;
              for (let o = 0; o < i; o++) {
                let s = n[o],
                  a = e[s],
                  u = a.continuous ? RD : LD;
                r = (0, ut.set)(r, s, u(a, t));
              }
              return r;
            }
            default:
              return e;
          }
        });
    });
  var ND,
    PD,
    qD,
    fy,
    dy = le(() => {
      "use strict";
      Ne();
      ({
        IX2_RAW_DATA_IMPORTED: ND,
        IX2_SESSION_STOPPED: PD,
        IX2_PARAMETER_CHANGED: qD,
      } = Ee),
        (fy = (e = {}, t) => {
          switch (t.type) {
            case ND:
              return t.payload.ixParameters || {};
            case PD:
              return {};
            case qD: {
              let { key: r, value: n } = t.payload;
              return (e[r] = n), e;
            }
            default:
              return e;
          }
        });
    });
  var hy = {};
  Re(hy, { default: () => MD });
  var py,
    gy,
    FD,
    MD,
    vy = le(() => {
      "use strict";
      py = oe(Vo());
      wf();
      Kf();
      Qf();
      gy = oe(Ct());
      ly();
      dy();
      ({ ixElements: FD } = gy.IX2ElementsReducer),
        (MD = (0, py.combineReducers)({
          ixData: Sf,
          ixRequest: zf,
          ixSession: $f,
          ixElements: FD,
          ixInstances: cy,
          ixParameters: fy,
        }));
    });
  var Ey = c((MW, yy) => {
    var DD = ht(),
      GD = me(),
      VD = ot(),
      UD = "[object String]";
    function BD(e) {
      return typeof e == "string" || (!GD(e) && VD(e) && DD(e) == UD);
    }
    yy.exports = BD;
  });
  var _y = c((DW, my) => {
    var kD = pa(),
      XD = kD("length");
    my.exports = XD;
  });
  var Ty = c((GW, by) => {
    var HD = "\\ud800-\\udfff",
      WD = "\\u0300-\\u036f",
      jD = "\\ufe20-\\ufe2f",
      zD = "\\u20d0-\\u20ff",
      KD = WD + jD + zD,
      YD = "\\ufe0e\\ufe0f",
      $D = "\\u200d",
      QD = RegExp("[" + $D + HD + KD + YD + "]");
    function ZD(e) {
      return QD.test(e);
    }
    by.exports = ZD;
  });
  var Ly = c((VW, Ry) => {
    var Oy = "\\ud800-\\udfff",
      JD = "\\u0300-\\u036f",
      e1 = "\\ufe20-\\ufe2f",
      t1 = "\\u20d0-\\u20ff",
      r1 = JD + e1 + t1,
      n1 = "\\ufe0e\\ufe0f",
      i1 = "[" + Oy + "]",
      Ha = "[" + r1 + "]",
      Wa = "\\ud83c[\\udffb-\\udfff]",
      o1 = "(?:" + Ha + "|" + Wa + ")",
      Ay = "[^" + Oy + "]",
      Sy = "(?:\\ud83c[\\udde6-\\uddff]){2}",
      wy = "[\\ud800-\\udbff][\\udc00-\\udfff]",
      a1 = "\\u200d",
      xy = o1 + "?",
      Cy = "[" + n1 + "]?",
      s1 = "(?:" + a1 + "(?:" + [Ay, Sy, wy].join("|") + ")" + Cy + xy + ")*",
      u1 = Cy + xy + s1,
      c1 = "(?:" + [Ay + Ha + "?", Ha, Sy, wy, i1].join("|") + ")",
      Iy = RegExp(Wa + "(?=" + Wa + ")|" + c1 + u1, "g");
    function l1(e) {
      for (var t = (Iy.lastIndex = 0); Iy.test(e); ) ++t;
      return t;
    }
    Ry.exports = l1;
  });
  var Py = c((UW, Ny) => {
    var f1 = _y(),
      d1 = Ty(),
      p1 = Ly();
    function g1(e) {
      return d1(e) ? p1(e) : f1(e);
    }
    Ny.exports = g1;
  });
  var Fy = c((BW, qy) => {
    var h1 = Mn(),
      v1 = Dn(),
      y1 = Ot(),
      E1 = Ey(),
      m1 = Py(),
      _1 = "[object Map]",
      b1 = "[object Set]";
    function T1(e) {
      if (e == null) return 0;
      if (y1(e)) return E1(e) ? m1(e) : e.length;
      var t = v1(e);
      return t == _1 || t == b1 ? e.size : h1(e).length;
    }
    qy.exports = T1;
  });
  var Dy = c((kW, My) => {
    var I1 = "Expected a function";
    function O1(e) {
      if (typeof e != "function") throw new TypeError(I1);
      return function () {
        var t = arguments;
        switch (t.length) {
          case 0:
            return !e.call(this);
          case 1:
            return !e.call(this, t[0]);
          case 2:
            return !e.call(this, t[0], t[1]);
          case 3:
            return !e.call(this, t[0], t[1], t[2]);
        }
        return !e.apply(this, t);
      };
    }
    My.exports = O1;
  });
  var ja = c((XW, Gy) => {
    var A1 = vt(),
      S1 = (function () {
        try {
          var e = A1(Object, "defineProperty");
          return e({}, "", {}), e;
        } catch {}
      })();
    Gy.exports = S1;
  });
  var za = c((HW, Uy) => {
    var Vy = ja();
    function w1(e, t, r) {
      t == "__proto__" && Vy
        ? Vy(e, t, { configurable: !0, enumerable: !0, value: r, writable: !0 })
        : (e[t] = r);
    }
    Uy.exports = w1;
  });
  var ky = c((WW, By) => {
    var x1 = za(),
      C1 = Sn(),
      R1 = Object.prototype,
      L1 = R1.hasOwnProperty;
    function N1(e, t, r) {
      var n = e[t];
      (!(L1.call(e, t) && C1(n, r)) || (r === void 0 && !(t in e))) &&
        x1(e, t, r);
    }
    By.exports = N1;
  });
  var Wy = c((jW, Hy) => {
    var P1 = ky(),
      q1 = Fr(),
      F1 = Nn(),
      Xy = et(),
      M1 = Kt();
    function D1(e, t, r, n) {
      if (!Xy(e)) return e;
      t = q1(t, e);
      for (var i = -1, o = t.length, s = o - 1, a = e; a != null && ++i < o; ) {
        var u = M1(t[i]),
          f = r;
        if (u === "__proto__" || u === "constructor" || u === "prototype")
          return e;
        if (i != s) {
          var p = a[u];
          (f = n ? n(p, u, a) : void 0),
            f === void 0 && (f = Xy(p) ? p : F1(t[i + 1]) ? [] : {});
        }
        P1(a, u, f), (a = a[u]);
      }
      return e;
    }
    Hy.exports = D1;
  });
  var zy = c((zW, jy) => {
    var G1 = Un(),
      V1 = Wy(),
      U1 = Fr();
    function B1(e, t, r) {
      for (var n = -1, i = t.length, o = {}; ++n < i; ) {
        var s = t[n],
          a = G1(e, s);
        r(a, s) && V1(o, U1(s, e), a);
      }
      return o;
    }
    jy.exports = B1;
  });
  var Yy = c((KW, Ky) => {
    var k1 = Rn(),
      X1 = So(),
      H1 = Zo(),
      W1 = Qo(),
      j1 = Object.getOwnPropertySymbols,
      z1 = j1
        ? function (e) {
            for (var t = []; e; ) k1(t, H1(e)), (e = X1(e));
            return t;
          }
        : W1;
    Ky.exports = z1;
  });
  var Qy = c((YW, $y) => {
    function K1(e) {
      var t = [];
      if (e != null) for (var r in Object(e)) t.push(r);
      return t;
    }
    $y.exports = K1;
  });
  var Jy = c(($W, Zy) => {
    var Y1 = et(),
      $1 = Fn(),
      Q1 = Qy(),
      Z1 = Object.prototype,
      J1 = Z1.hasOwnProperty;
    function e2(e) {
      if (!Y1(e)) return Q1(e);
      var t = $1(e),
        r = [];
      for (var n in e)
        (n == "constructor" && (t || !J1.call(e, n))) || r.push(n);
      return r;
    }
    Zy.exports = e2;
  });
  var tE = c((QW, eE) => {
    var t2 = ea(),
      r2 = Jy(),
      n2 = Ot();
    function i2(e) {
      return n2(e) ? t2(e, !0) : r2(e);
    }
    eE.exports = i2;
  });
  var nE = c((ZW, rE) => {
    var o2 = $o(),
      a2 = Yy(),
      s2 = tE();
    function u2(e) {
      return o2(e, s2, a2);
    }
    rE.exports = u2;
  });
  var oE = c((JW, iE) => {
    var c2 = da(),
      l2 = yt(),
      f2 = zy(),
      d2 = nE();
    function p2(e, t) {
      if (e == null) return {};
      var r = c2(d2(e), function (n) {
        return [n];
      });
      return (
        (t = l2(t)),
        f2(e, r, function (n, i) {
          return t(n, i[0]);
        })
      );
    }
    iE.exports = p2;
  });
  var sE = c((ej, aE) => {
    var g2 = yt(),
      h2 = Dy(),
      v2 = oE();
    function y2(e, t) {
      return v2(e, h2(g2(t)));
    }
    aE.exports = y2;
  });
  var cE = c((tj, uE) => {
    var E2 = Mn(),
      m2 = Dn(),
      _2 = Cr(),
      b2 = me(),
      T2 = Ot(),
      I2 = Ln(),
      O2 = Fn(),
      A2 = qn(),
      S2 = "[object Map]",
      w2 = "[object Set]",
      x2 = Object.prototype,
      C2 = x2.hasOwnProperty;
    function R2(e) {
      if (e == null) return !0;
      if (
        T2(e) &&
        (b2(e) ||
          typeof e == "string" ||
          typeof e.splice == "function" ||
          I2(e) ||
          A2(e) ||
          _2(e))
      )
        return !e.length;
      var t = m2(e);
      if (t == S2 || t == w2) return !e.size;
      if (O2(e)) return !E2(e).length;
      for (var r in e) if (C2.call(e, r)) return !1;
      return !0;
    }
    uE.exports = R2;
  });
  var fE = c((rj, lE) => {
    var L2 = za(),
      N2 = qa(),
      P2 = yt();
    function q2(e, t) {
      var r = {};
      return (
        (t = P2(t, 3)),
        N2(e, function (n, i, o) {
          L2(r, i, t(n, i, o));
        }),
        r
      );
    }
    lE.exports = q2;
  });
  var pE = c((nj, dE) => {
    function F2(e, t) {
      for (
        var r = -1, n = e == null ? 0 : e.length;
        ++r < n && t(e[r], r, e) !== !1;

      );
      return e;
    }
    dE.exports = F2;
  });
  var hE = c((ij, gE) => {
    var M2 = kn();
    function D2(e) {
      return typeof e == "function" ? e : M2;
    }
    gE.exports = D2;
  });
  var yE = c((oj, vE) => {
    var G2 = pE(),
      V2 = Fa(),
      U2 = hE(),
      B2 = me();
    function k2(e, t) {
      var r = B2(e) ? G2 : V2;
      return r(e, U2(t));
    }
    vE.exports = k2;
  });
  var mE = c((aj, EE) => {
    var X2 = ke(),
      H2 = function () {
        return X2.Date.now();
      };
    EE.exports = H2;
  });
  var TE = c((sj, bE) => {
    var W2 = et(),
      Ka = mE(),
      _E = Xn(),
      j2 = "Expected a function",
      z2 = Math.max,
      K2 = Math.min;
    function Y2(e, t, r) {
      var n,
        i,
        o,
        s,
        a,
        u,
        f = 0,
        p = !1,
        g = !1,
        d = !0;
      if (typeof e != "function") throw new TypeError(j2);
      (t = _E(t) || 0),
        W2(r) &&
          ((p = !!r.leading),
          (g = "maxWait" in r),
          (o = g ? z2(_E(r.maxWait) || 0, t) : o),
          (d = "trailing" in r ? !!r.trailing : d));
      function v(x) {
        var G = n,
          B = i;
        return (n = i = void 0), (f = x), (s = e.apply(B, G)), s;
      }
      function b(x) {
        return (f = x), (a = setTimeout(y, t)), p ? v(x) : s;
      }
      function m(x) {
        var G = x - u,
          B = x - f,
          k = t - G;
        return g ? K2(k, o - B) : k;
      }
      function A(x) {
        var G = x - u,
          B = x - f;
        return u === void 0 || G >= t || G < 0 || (g && B >= o);
      }
      function y() {
        var x = Ka();
        if (A(x)) return w(x);
        a = setTimeout(y, m(x));
      }
      function w(x) {
        return (a = void 0), d && n ? v(x) : ((n = i = void 0), s);
      }
      function S() {
        a !== void 0 && clearTimeout(a), (f = 0), (n = u = i = a = void 0);
      }
      function C() {
        return a === void 0 ? s : w(Ka());
      }
      function R() {
        var x = Ka(),
          G = A(x);
        if (((n = arguments), (i = this), (u = x), G)) {
          if (a === void 0) return b(u);
          if (g) return clearTimeout(a), (a = setTimeout(y, t)), v(u);
        }
        return a === void 0 && (a = setTimeout(y, t)), s;
      }
      return (R.cancel = S), (R.flush = C), R;
    }
    bE.exports = Y2;
  });
  var OE = c((uj, IE) => {
    var $2 = TE(),
      Q2 = et(),
      Z2 = "Expected a function";
    function J2(e, t, r) {
      var n = !0,
        i = !0;
      if (typeof e != "function") throw new TypeError(Z2);
      return (
        Q2(r) &&
          ((n = "leading" in r ? !!r.leading : n),
          (i = "trailing" in r ? !!r.trailing : i)),
        $2(e, t, { leading: n, maxWait: t, trailing: i })
      );
    }
    IE.exports = J2;
  });
  var SE = {};
  Re(SE, {
    actionListPlaybackChanged: () => ar,
    animationFrameChanged: () => ai,
    clearRequested: () => OG,
    elementStateChanged: () => rs,
    eventListenerAdded: () => oi,
    eventStateChanged: () => Ja,
    instanceAdded: () => es,
    instanceRemoved: () => ts,
    instanceStarted: () => si,
    mediaQueriesDefined: () => is,
    parameterChanged: () => or,
    playbackRequested: () => TG,
    previewRequested: () => bG,
    rawDataImported: () => Ya,
    sessionInitialized: () => $a,
    sessionStarted: () => Qa,
    sessionStopped: () => Za,
    stopRequested: () => IG,
    testFrameRendered: () => AG,
    viewportWidthChanged: () => ns,
  });
  var AE,
    eG,
    tG,
    rG,
    nG,
    iG,
    oG,
    aG,
    sG,
    uG,
    cG,
    lG,
    fG,
    dG,
    pG,
    gG,
    hG,
    vG,
    yG,
    EG,
    mG,
    _G,
    Ya,
    $a,
    Qa,
    Za,
    bG,
    TG,
    IG,
    OG,
    oi,
    AG,
    Ja,
    ai,
    or,
    es,
    si,
    ts,
    rs,
    ar,
    ns,
    is,
    ui = le(() => {
      "use strict";
      Ne();
      (AE = oe(Ct())),
        ({
          IX2_RAW_DATA_IMPORTED: eG,
          IX2_SESSION_INITIALIZED: tG,
          IX2_SESSION_STARTED: rG,
          IX2_SESSION_STOPPED: nG,
          IX2_PREVIEW_REQUESTED: iG,
          IX2_PLAYBACK_REQUESTED: oG,
          IX2_STOP_REQUESTED: aG,
          IX2_CLEAR_REQUESTED: sG,
          IX2_EVENT_LISTENER_ADDED: uG,
          IX2_TEST_FRAME_RENDERED: cG,
          IX2_EVENT_STATE_CHANGED: lG,
          IX2_ANIMATION_FRAME_CHANGED: fG,
          IX2_PARAMETER_CHANGED: dG,
          IX2_INSTANCE_ADDED: pG,
          IX2_INSTANCE_STARTED: gG,
          IX2_INSTANCE_REMOVED: hG,
          IX2_ELEMENT_STATE_CHANGED: vG,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: yG,
          IX2_VIEWPORT_WIDTH_CHANGED: EG,
          IX2_MEDIA_QUERIES_DEFINED: mG,
        } = Ee),
        ({ reifyState: _G } = AE.IX2VanillaUtils),
        (Ya = (e) => ({ type: eG, payload: { ..._G(e) } })),
        ($a = ({ hasBoundaryNodes: e, reducedMotion: t }) => ({
          type: tG,
          payload: { hasBoundaryNodes: e, reducedMotion: t },
        })),
        (Qa = () => ({ type: rG })),
        (Za = () => ({ type: nG })),
        (bG = ({ rawData: e, defer: t }) => ({
          type: iG,
          payload: { defer: t, rawData: e },
        })),
        (TG = ({
          actionTypeId: e = Le.GENERAL_START_ACTION,
          actionListId: t,
          actionItemId: r,
          eventId: n,
          allowEvents: i,
          immediate: o,
          testManual: s,
          verbose: a,
          rawData: u,
        }) => ({
          type: oG,
          payload: {
            actionTypeId: e,
            actionListId: t,
            actionItemId: r,
            testManual: s,
            eventId: n,
            allowEvents: i,
            immediate: o,
            verbose: a,
            rawData: u,
          },
        })),
        (IG = (e) => ({ type: aG, payload: { actionListId: e } })),
        (OG = () => ({ type: sG })),
        (oi = (e, t) => ({
          type: uG,
          payload: { target: e, listenerParams: t },
        })),
        (AG = (e = 1) => ({ type: cG, payload: { step: e } })),
        (Ja = (e, t) => ({ type: lG, payload: { stateKey: e, newState: t } })),
        (ai = (e, t) => ({ type: fG, payload: { now: e, parameters: t } })),
        (or = (e, t) => ({ type: dG, payload: { key: e, value: t } })),
        (es = (e) => ({ type: pG, payload: { ...e } })),
        (si = (e, t) => ({ type: gG, payload: { instanceId: e, time: t } })),
        (ts = (e) => ({ type: hG, payload: { instanceId: e } })),
        (rs = (e, t, r, n) => ({
          type: vG,
          payload: { elementId: e, actionTypeId: t, current: r, actionItem: n },
        })),
        (ar = ({ actionListId: e, isPlaying: t }) => ({
          type: yG,
          payload: { actionListId: e, isPlaying: t },
        })),
        (ns = ({ width: e, mediaQueries: t }) => ({
          type: EG,
          payload: { width: e, mediaQueries: t },
        })),
        (is = () => ({ type: mG }));
    });
  var xe = {};
  Re(xe, {
    elementContains: () => ss,
    getChildElements: () => FG,
    getClosestElement: () => jr,
    getProperty: () => RG,
    getQuerySelector: () => as,
    getRefType: () => us,
    getSiblingElements: () => MG,
    getStyle: () => CG,
    getValidDocument: () => NG,
    isSiblingNode: () => qG,
    matchSelector: () => LG,
    queryDocument: () => PG,
    setStyle: () => xG,
  });
  function xG(e, t, r) {
    e.style[t] = r;
  }
  function CG(e, t) {
    return t.startsWith("--")
      ? window.getComputedStyle(document.documentElement).getPropertyValue(t)
      : e.style[t];
  }
  function RG(e, t) {
    return e[t];
  }
  function LG(e) {
    return (t) => t[os](e);
  }
  function as({ id: e, selector: t }) {
    if (e) {
      let r = e;
      if (e.indexOf(wE) !== -1) {
        let n = e.split(wE),
          i = n[0];
        if (((r = n[1]), i !== document.documentElement.getAttribute(CE)))
          return null;
      }
      return `[data-w-id="${r}"], [data-w-id^="${r}_instance"]`;
    }
    return t;
  }
  function NG(e) {
    return e == null || e === document.documentElement.getAttribute(CE)
      ? document
      : null;
  }
  function PG(e, t) {
    return Array.prototype.slice.call(
      document.querySelectorAll(t ? e + " " + t : e)
    );
  }
  function ss(e, t) {
    return e.contains(t);
  }
  function qG(e, t) {
    return e !== t && e.parentNode === t.parentNode;
  }
  function FG(e) {
    let t = [];
    for (let r = 0, { length: n } = e || []; r < n; r++) {
      let { children: i } = e[r],
        { length: o } = i;
      if (o) for (let s = 0; s < o; s++) t.push(i[s]);
    }
    return t;
  }
  function MG(e = []) {
    let t = [],
      r = [];
    for (let n = 0, { length: i } = e; n < i; n++) {
      let { parentNode: o } = e[n];
      if (!o || !o.children || !o.children.length || r.indexOf(o) !== -1)
        continue;
      r.push(o);
      let s = o.firstElementChild;
      for (; s != null; )
        e.indexOf(s) === -1 && t.push(s), (s = s.nextElementSibling);
    }
    return t;
  }
  function us(e) {
    return e != null && typeof e == "object"
      ? e instanceof Element
        ? SG
        : wG
      : null;
  }
  var xE,
    os,
    wE,
    SG,
    wG,
    CE,
    jr,
    RE = le(() => {
      "use strict";
      xE = oe(Ct());
      Ne();
      ({ ELEMENT_MATCHES: os } = xE.IX2BrowserSupport),
        ({
          IX2_ID_DELIMITER: wE,
          HTML_ELEMENT: SG,
          PLAIN_OBJECT: wG,
          WF_PAGE: CE,
        } = Ie);
      jr = Element.prototype.closest
        ? (e, t) => (document.documentElement.contains(e) ? e.closest(t) : null)
        : (e, t) => {
            if (!document.documentElement.contains(e)) return null;
            let r = e;
            do {
              if (r[os] && r[os](t)) return r;
              r = r.parentNode;
            } while (r != null);
            return null;
          };
    });
  var cs = c((fj, NE) => {
    var DG = et(),
      LE = Object.create,
      GG = (function () {
        function e() {}
        return function (t) {
          if (!DG(t)) return {};
          if (LE) return LE(t);
          e.prototype = t;
          var r = new e();
          return (e.prototype = void 0), r;
        };
      })();
    NE.exports = GG;
  });
  var ci = c((dj, PE) => {
    function VG() {}
    PE.exports = VG;
  });
  var fi = c((pj, qE) => {
    var UG = cs(),
      BG = ci();
    function li(e, t) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__chain__ = !!t),
        (this.__index__ = 0),
        (this.__values__ = void 0);
    }
    li.prototype = UG(BG.prototype);
    li.prototype.constructor = li;
    qE.exports = li;
  });
  var GE = c((gj, DE) => {
    var FE = Dt(),
      kG = Cr(),
      XG = me(),
      ME = FE ? FE.isConcatSpreadable : void 0;
    function HG(e) {
      return XG(e) || kG(e) || !!(ME && e && e[ME]);
    }
    DE.exports = HG;
  });
  var BE = c((hj, UE) => {
    var WG = Rn(),
      jG = GE();
    function VE(e, t, r, n, i) {
      var o = -1,
        s = e.length;
      for (r || (r = jG), i || (i = []); ++o < s; ) {
        var a = e[o];
        t > 0 && r(a)
          ? t > 1
            ? VE(a, t - 1, r, n, i)
            : WG(i, a)
          : n || (i[i.length] = a);
      }
      return i;
    }
    UE.exports = VE;
  });
  var XE = c((vj, kE) => {
    var zG = BE();
    function KG(e) {
      var t = e == null ? 0 : e.length;
      return t ? zG(e, 1) : [];
    }
    kE.exports = KG;
  });
  var WE = c((yj, HE) => {
    function YG(e, t, r) {
      switch (r.length) {
        case 0:
          return e.call(t);
        case 1:
          return e.call(t, r[0]);
        case 2:
          return e.call(t, r[0], r[1]);
        case 3:
          return e.call(t, r[0], r[1], r[2]);
      }
      return e.apply(t, r);
    }
    HE.exports = YG;
  });
  var KE = c((Ej, zE) => {
    var $G = WE(),
      jE = Math.max;
    function QG(e, t, r) {
      return (
        (t = jE(t === void 0 ? e.length - 1 : t, 0)),
        function () {
          for (
            var n = arguments, i = -1, o = jE(n.length - t, 0), s = Array(o);
            ++i < o;

          )
            s[i] = n[t + i];
          i = -1;
          for (var a = Array(t + 1); ++i < t; ) a[i] = n[i];
          return (a[t] = r(s)), $G(e, this, a);
        }
      );
    }
    zE.exports = QG;
  });
  var $E = c((mj, YE) => {
    function ZG(e) {
      return function () {
        return e;
      };
    }
    YE.exports = ZG;
  });
  var JE = c((_j, ZE) => {
    var JG = $E(),
      QE = ja(),
      eV = kn(),
      tV = QE
        ? function (e, t) {
            return QE(e, "toString", {
              configurable: !0,
              enumerable: !1,
              value: JG(t),
              writable: !0,
            });
          }
        : eV;
    ZE.exports = tV;
  });
  var tm = c((bj, em) => {
    var rV = 800,
      nV = 16,
      iV = Date.now;
    function oV(e) {
      var t = 0,
        r = 0;
      return function () {
        var n = iV(),
          i = nV - (n - r);
        if (((r = n), i > 0)) {
          if (++t >= rV) return arguments[0];
        } else t = 0;
        return e.apply(void 0, arguments);
      };
    }
    em.exports = oV;
  });
  var nm = c((Tj, rm) => {
    var aV = JE(),
      sV = tm(),
      uV = sV(aV);
    rm.exports = uV;
  });
  var om = c((Ij, im) => {
    var cV = XE(),
      lV = KE(),
      fV = nm();
    function dV(e) {
      return fV(lV(e, void 0, cV), e + "");
    }
    im.exports = dV;
  });
  var um = c((Oj, sm) => {
    var am = ta(),
      pV = am && new am();
    sm.exports = pV;
  });
  var lm = c((Aj, cm) => {
    function gV() {}
    cm.exports = gV;
  });
  var ls = c((Sj, dm) => {
    var fm = um(),
      hV = lm(),
      vV = fm
        ? function (e) {
            return fm.get(e);
          }
        : hV;
    dm.exports = vV;
  });
  var gm = c((wj, pm) => {
    var yV = {};
    pm.exports = yV;
  });
  var fs = c((xj, vm) => {
    var hm = gm(),
      EV = Object.prototype,
      mV = EV.hasOwnProperty;
    function _V(e) {
      for (
        var t = e.name + "", r = hm[t], n = mV.call(hm, t) ? r.length : 0;
        n--;

      ) {
        var i = r[n],
          o = i.func;
        if (o == null || o == e) return i.name;
      }
      return t;
    }
    vm.exports = _V;
  });
  var pi = c((Cj, ym) => {
    var bV = cs(),
      TV = ci(),
      IV = 4294967295;
    function di(e) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__dir__ = 1),
        (this.__filtered__ = !1),
        (this.__iteratees__ = []),
        (this.__takeCount__ = IV),
        (this.__views__ = []);
    }
    di.prototype = bV(TV.prototype);
    di.prototype.constructor = di;
    ym.exports = di;
  });
  var mm = c((Rj, Em) => {
    function OV(e, t) {
      var r = -1,
        n = e.length;
      for (t || (t = Array(n)); ++r < n; ) t[r] = e[r];
      return t;
    }
    Em.exports = OV;
  });
  var bm = c((Lj, _m) => {
    var AV = pi(),
      SV = fi(),
      wV = mm();
    function xV(e) {
      if (e instanceof AV) return e.clone();
      var t = new SV(e.__wrapped__, e.__chain__);
      return (
        (t.__actions__ = wV(e.__actions__)),
        (t.__index__ = e.__index__),
        (t.__values__ = e.__values__),
        t
      );
    }
    _m.exports = xV;
  });
  var Om = c((Nj, Im) => {
    var CV = pi(),
      Tm = fi(),
      RV = ci(),
      LV = me(),
      NV = ot(),
      PV = bm(),
      qV = Object.prototype,
      FV = qV.hasOwnProperty;
    function gi(e) {
      if (NV(e) && !LV(e) && !(e instanceof CV)) {
        if (e instanceof Tm) return e;
        if (FV.call(e, "__wrapped__")) return PV(e);
      }
      return new Tm(e);
    }
    gi.prototype = RV.prototype;
    gi.prototype.constructor = gi;
    Im.exports = gi;
  });
  var Sm = c((Pj, Am) => {
    var MV = pi(),
      DV = ls(),
      GV = fs(),
      VV = Om();
    function UV(e) {
      var t = GV(e),
        r = VV[t];
      if (typeof r != "function" || !(t in MV.prototype)) return !1;
      if (e === r) return !0;
      var n = DV(r);
      return !!n && e === n[0];
    }
    Am.exports = UV;
  });
  var Rm = c((qj, Cm) => {
    var wm = fi(),
      BV = om(),
      kV = ls(),
      ds = fs(),
      XV = me(),
      xm = Sm(),
      HV = "Expected a function",
      WV = 8,
      jV = 32,
      zV = 128,
      KV = 256;
    function YV(e) {
      return BV(function (t) {
        var r = t.length,
          n = r,
          i = wm.prototype.thru;
        for (e && t.reverse(); n--; ) {
          var o = t[n];
          if (typeof o != "function") throw new TypeError(HV);
          if (i && !s && ds(o) == "wrapper") var s = new wm([], !0);
        }
        for (n = s ? n : r; ++n < r; ) {
          o = t[n];
          var a = ds(o),
            u = a == "wrapper" ? kV(o) : void 0;
          u &&
          xm(u[0]) &&
          u[1] == (zV | WV | jV | KV) &&
          !u[4].length &&
          u[9] == 1
            ? (s = s[ds(u[0])].apply(s, u[3]))
            : (s = o.length == 1 && xm(o) ? s[a]() : s.thru(o));
        }
        return function () {
          var f = arguments,
            p = f[0];
          if (s && f.length == 1 && XV(p)) return s.plant(p).value();
          for (var g = 0, d = r ? t[g].apply(this, f) : p; ++g < r; )
            d = t[g].call(this, d);
          return d;
        };
      });
    }
    Cm.exports = YV;
  });
  var Nm = c((Fj, Lm) => {
    var $V = Rm(),
      QV = $V();
    Lm.exports = QV;
  });
  var qm = c((Mj, Pm) => {
    function ZV(e, t, r) {
      return (
        e === e &&
          (r !== void 0 && (e = e <= r ? e : r),
          t !== void 0 && (e = e >= t ? e : t)),
        e
      );
    }
    Pm.exports = ZV;
  });
  var Mm = c((Dj, Fm) => {
    var JV = qm(),
      ps = Xn();
    function eU(e, t, r) {
      return (
        r === void 0 && ((r = t), (t = void 0)),
        r !== void 0 && ((r = ps(r)), (r = r === r ? r : 0)),
        t !== void 0 && ((t = ps(t)), (t = t === t ? t : 0)),
        JV(ps(e), t, r)
      );
    }
    Fm.exports = eU;
  });
  var Wm,
    jm,
    zm,
    Km,
    tU,
    rU,
    nU,
    iU,
    oU,
    aU,
    sU,
    uU,
    cU,
    lU,
    fU,
    dU,
    pU,
    gU,
    hU,
    Ym,
    $m,
    vU,
    yU,
    EU,
    Qm,
    mU,
    _U,
    Zm,
    bU,
    gs,
    Jm,
    Dm,
    Gm,
    e_,
    Kr,
    TU,
    nt,
    t_,
    IU,
    qe,
    We,
    Yr,
    r_,
    hs,
    Vm,
    vs,
    OU,
    zr,
    AU,
    SU,
    wU,
    n_,
    Um,
    xU,
    Bm,
    CU,
    RU,
    LU,
    km,
    hi,
    vi,
    Xm,
    Hm,
    i_,
    o_ = le(() => {
      "use strict";
      (Wm = oe(Nm())), (jm = oe(Bn())), (zm = oe(Mm()));
      Ne();
      ys();
      ui();
      (Km = oe(Ct())),
        ({
          MOUSE_CLICK: tU,
          MOUSE_SECOND_CLICK: rU,
          MOUSE_DOWN: nU,
          MOUSE_UP: iU,
          MOUSE_OVER: oU,
          MOUSE_OUT: aU,
          DROPDOWN_CLOSE: sU,
          DROPDOWN_OPEN: uU,
          SLIDER_ACTIVE: cU,
          SLIDER_INACTIVE: lU,
          TAB_ACTIVE: fU,
          TAB_INACTIVE: dU,
          NAVBAR_CLOSE: pU,
          NAVBAR_OPEN: gU,
          MOUSE_MOVE: hU,
          PAGE_SCROLL_DOWN: Ym,
          SCROLL_INTO_VIEW: $m,
          SCROLL_OUT_OF_VIEW: vU,
          PAGE_SCROLL_UP: yU,
          SCROLLING_IN_VIEW: EU,
          PAGE_FINISH: Qm,
          ECOMMERCE_CART_CLOSE: mU,
          ECOMMERCE_CART_OPEN: _U,
          PAGE_START: Zm,
          PAGE_SCROLL: bU,
        } = Xe),
        (gs = "COMPONENT_ACTIVE"),
        (Jm = "COMPONENT_INACTIVE"),
        ({ COLON_DELIMITER: Dm } = Ie),
        ({ getNamespacedParameterId: Gm } = Km.IX2VanillaUtils),
        (e_ = (e) => (t) => typeof t == "object" && e(t) ? !0 : t),
        (Kr = e_(({ element: e, nativeEvent: t }) => e === t.target)),
        (TU = e_(({ element: e, nativeEvent: t }) => e.contains(t.target))),
        (nt = (0, Wm.default)([Kr, TU])),
        (t_ = (e, t) => {
          if (t) {
            let { ixData: r } = e.getState(),
              { events: n } = r,
              i = n[t];
            if (i && !OU[i.eventTypeId]) return i;
          }
          return null;
        }),
        (IU = ({ store: e, event: t }) => {
          let { action: r } = t,
            { autoStopEventId: n } = r.config;
          return !!t_(e, n);
        }),
        (qe = ({ store: e, event: t, element: r, eventStateKey: n }, i) => {
          let { action: o, id: s } = t,
            { actionListId: a, autoStopEventId: u } = o.config,
            f = t_(e, u);
          return (
            f &&
              sr({
                store: e,
                eventId: u,
                eventTarget: r,
                eventStateKey: u + Dm + n.split(Dm)[1],
                actionListId: (0, jm.default)(f, "action.config.actionListId"),
              }),
            sr({
              store: e,
              eventId: s,
              eventTarget: r,
              eventStateKey: n,
              actionListId: a,
            }),
            $r({
              store: e,
              eventId: s,
              eventTarget: r,
              eventStateKey: n,
              actionListId: a,
            }),
            i
          );
        }),
        (We = (e, t) => (r, n) => e(r, n) === !0 ? t(r, n) : n),
        (Yr = { handler: We(nt, qe) }),
        (r_ = { ...Yr, types: [gs, Jm].join(" ") }),
        (hs = [
          { target: window, types: "resize orientationchange", throttle: !0 },
          {
            target: document,
            types: "scroll wheel readystatechange IX2_PAGE_UPDATE",
            throttle: !0,
          },
        ]),
        (Vm = "mouseover mouseout"),
        (vs = { types: hs }),
        (OU = { PAGE_START: Zm, PAGE_FINISH: Qm }),
        (zr = (() => {
          let e = window.pageXOffset !== void 0,
            r =
              document.compatMode === "CSS1Compat"
                ? document.documentElement
                : document.body;
          return () => ({
            scrollLeft: e ? window.pageXOffset : r.scrollLeft,
            scrollTop: e ? window.pageYOffset : r.scrollTop,
            stiffScrollTop: (0, zm.default)(
              e ? window.pageYOffset : r.scrollTop,
              0,
              r.scrollHeight - window.innerHeight
            ),
            scrollWidth: r.scrollWidth,
            scrollHeight: r.scrollHeight,
            clientWidth: r.clientWidth,
            clientHeight: r.clientHeight,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
          });
        })()),
        (AU = (e, t) =>
          !(
            e.left > t.right ||
            e.right < t.left ||
            e.top > t.bottom ||
            e.bottom < t.top
          )),
        (SU = ({ element: e, nativeEvent: t }) => {
          let { type: r, target: n, relatedTarget: i } = t,
            o = e.contains(n);
          if (r === "mouseover" && o) return !0;
          let s = e.contains(i);
          return !!(r === "mouseout" && o && s);
        }),
        (wU = (e) => {
          let {
              element: t,
              event: { config: r },
            } = e,
            { clientWidth: n, clientHeight: i } = zr(),
            o = r.scrollOffsetValue,
            u = r.scrollOffsetUnit === "PX" ? o : (i * (o || 0)) / 100;
          return AU(t.getBoundingClientRect(), {
            left: 0,
            top: u,
            right: n,
            bottom: i - u,
          });
        }),
        (n_ = (e) => (t, r) => {
          let { type: n } = t.nativeEvent,
            i = [gs, Jm].indexOf(n) !== -1 ? n === gs : r.isActive,
            o = { ...r, isActive: i };
          return ((!r || o.isActive !== r.isActive) && e(t, o)) || o;
        }),
        (Um = (e) => (t, r) => {
          let n = { elementHovered: SU(t) };
          return (
            ((r ? n.elementHovered !== r.elementHovered : n.elementHovered) &&
              e(t, n)) ||
            n
          );
        }),
        (xU = (e) => (t, r) => {
          let n = { ...r, elementVisible: wU(t) };
          return (
            ((r ? n.elementVisible !== r.elementVisible : n.elementVisible) &&
              e(t, n)) ||
            n
          );
        }),
        (Bm =
          (e) =>
          (t, r = {}) => {
            let { stiffScrollTop: n, scrollHeight: i, innerHeight: o } = zr(),
              {
                event: { config: s, eventTypeId: a },
              } = t,
              { scrollOffsetValue: u, scrollOffsetUnit: f } = s,
              p = f === "PX",
              g = i - o,
              d = Number((n / g).toFixed(2));
            if (r && r.percentTop === d) return r;
            let v = (p ? u : (o * (u || 0)) / 100) / g,
              b,
              m,
              A = 0;
            r &&
              ((b = d > r.percentTop),
              (m = r.scrollingDown !== b),
              (A = m ? d : r.anchorTop));
            let y = a === Ym ? d >= A + v : d <= A - v,
              w = {
                ...r,
                percentTop: d,
                inBounds: y,
                anchorTop: A,
                scrollingDown: b,
              };
            return (r && y && (m || w.inBounds !== r.inBounds) && e(t, w)) || w;
          }),
        (CU = (e, t) =>
          e.left > t.left &&
          e.left < t.right &&
          e.top > t.top &&
          e.top < t.bottom),
        (RU = (e) => (t, r) => {
          let n = { finished: document.readyState === "complete" };
          return n.finished && !(r && r.finshed) && e(t), n;
        }),
        (LU = (e) => (t, r) => {
          let n = { started: !0 };
          return r || e(t), n;
        }),
        (km =
          (e) =>
          (t, r = { clickCount: 0 }) => {
            let n = { clickCount: (r.clickCount % 2) + 1 };
            return (n.clickCount !== r.clickCount && e(t, n)) || n;
          }),
        (hi = (e = !0) => ({
          ...r_,
          handler: We(
            e ? nt : Kr,
            n_((t, r) => (r.isActive ? Yr.handler(t, r) : r))
          ),
        })),
        (vi = (e = !0) => ({
          ...r_,
          handler: We(
            e ? nt : Kr,
            n_((t, r) => (r.isActive ? r : Yr.handler(t, r)))
          ),
        })),
        (Xm = {
          ...vs,
          handler: xU((e, t) => {
            let { elementVisible: r } = t,
              { event: n, store: i } = e,
              { ixData: o } = i.getState(),
              { events: s } = o;
            return !s[n.action.config.autoStopEventId] && t.triggered
              ? t
              : (n.eventTypeId === $m) === r
              ? (qe(e), { ...t, triggered: !0 })
              : t;
          }),
        }),
        (Hm = 0.05),
        (i_ = {
          [cU]: hi(),
          [lU]: vi(),
          [uU]: hi(),
          [sU]: vi(),
          [gU]: hi(!1),
          [pU]: vi(!1),
          [fU]: hi(),
          [dU]: vi(),
          [_U]: { types: "ecommerce-cart-open", handler: We(nt, qe) },
          [mU]: { types: "ecommerce-cart-close", handler: We(nt, qe) },
          [tU]: {
            types: "click",
            handler: We(
              nt,
              km((e, { clickCount: t }) => {
                IU(e) ? t === 1 && qe(e) : qe(e);
              })
            ),
          },
          [rU]: {
            types: "click",
            handler: We(
              nt,
              km((e, { clickCount: t }) => {
                t === 2 && qe(e);
              })
            ),
          },
          [nU]: { ...Yr, types: "mousedown" },
          [iU]: { ...Yr, types: "mouseup" },
          [oU]: {
            types: Vm,
            handler: We(
              nt,
              Um((e, t) => {
                t.elementHovered && qe(e);
              })
            ),
          },
          [aU]: {
            types: Vm,
            handler: We(
              nt,
              Um((e, t) => {
                t.elementHovered || qe(e);
              })
            ),
          },
          [hU]: {
            types: "mousemove mouseout scroll",
            handler: (
              {
                store: e,
                element: t,
                eventConfig: r,
                nativeEvent: n,
                eventStateKey: i,
              },
              o = { clientX: 0, clientY: 0, pageX: 0, pageY: 0 }
            ) => {
              let {
                  basedOn: s,
                  selectedAxis: a,
                  continuousParameterGroupId: u,
                  reverse: f,
                  restingState: p = 0,
                } = r,
                {
                  clientX: g = o.clientX,
                  clientY: d = o.clientY,
                  pageX: v = o.pageX,
                  pageY: b = o.pageY,
                } = n,
                m = a === "X_AXIS",
                A = n.type === "mouseout",
                y = p / 100,
                w = u,
                S = !1;
              switch (s) {
                case Je.VIEWPORT: {
                  y = m
                    ? Math.min(g, window.innerWidth) / window.innerWidth
                    : Math.min(d, window.innerHeight) / window.innerHeight;
                  break;
                }
                case Je.PAGE: {
                  let {
                    scrollLeft: C,
                    scrollTop: R,
                    scrollWidth: x,
                    scrollHeight: G,
                  } = zr();
                  y = m ? Math.min(C + v, x) / x : Math.min(R + b, G) / G;
                  break;
                }
                case Je.ELEMENT:
                default: {
                  w = Gm(i, u);
                  let C = n.type.indexOf("mouse") === 0;
                  if (C && nt({ element: t, nativeEvent: n }) !== !0) break;
                  let R = t.getBoundingClientRect(),
                    { left: x, top: G, width: B, height: k } = R;
                  if (!C && !CU({ left: g, top: d }, R)) break;
                  (S = !0), (y = m ? (g - x) / B : (d - G) / k);
                  break;
                }
              }
              return (
                A && (y > 1 - Hm || y < Hm) && (y = Math.round(y)),
                (s !== Je.ELEMENT || S || S !== o.elementHovered) &&
                  ((y = f ? 1 - y : y), e.dispatch(or(w, y))),
                {
                  elementHovered: S,
                  clientX: g,
                  clientY: d,
                  pageX: v,
                  pageY: b,
                }
              );
            },
          },
          [bU]: {
            types: hs,
            handler: ({ store: e, eventConfig: t }) => {
              let { continuousParameterGroupId: r, reverse: n } = t,
                { scrollTop: i, scrollHeight: o, clientHeight: s } = zr(),
                a = i / (o - s);
              (a = n ? 1 - a : a), e.dispatch(or(r, a));
            },
          },
          [EU]: {
            types: hs,
            handler: (
              { element: e, store: t, eventConfig: r, eventStateKey: n },
              i = { scrollPercent: 0 }
            ) => {
              let {
                  scrollLeft: o,
                  scrollTop: s,
                  scrollWidth: a,
                  scrollHeight: u,
                  clientHeight: f,
                } = zr(),
                {
                  basedOn: p,
                  selectedAxis: g,
                  continuousParameterGroupId: d,
                  startsEntering: v,
                  startsExiting: b,
                  addEndOffset: m,
                  addStartOffset: A,
                  addOffsetValue: y = 0,
                  endOffsetValue: w = 0,
                } = r,
                S = g === "X_AXIS";
              if (p === Je.VIEWPORT) {
                let C = S ? o / a : s / u;
                return (
                  C !== i.scrollPercent && t.dispatch(or(d, C)),
                  { scrollPercent: C }
                );
              } else {
                let C = Gm(n, d),
                  R = e.getBoundingClientRect(),
                  x = (A ? y : 0) / 100,
                  G = (m ? w : 0) / 100;
                (x = v ? x : 1 - x), (G = b ? G : 1 - G);
                let B = R.top + Math.min(R.height * x, f),
                  W = R.top + R.height * G - B,
                  Z = Math.min(f + W, u),
                  T = Math.min(Math.max(0, f - B), Z) / Z;
                return (
                  T !== i.scrollPercent && t.dispatch(or(C, T)),
                  { scrollPercent: T }
                );
              }
            },
          },
          [$m]: Xm,
          [vU]: Xm,
          [Ym]: {
            ...vs,
            handler: Bm((e, t) => {
              t.scrollingDown && qe(e);
            }),
          },
          [yU]: {
            ...vs,
            handler: Bm((e, t) => {
              t.scrollingDown || qe(e);
            }),
          },
          [Qm]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: We(Kr, RU(qe)),
          },
          [Zm]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: We(Kr, LU(qe)),
          },
        });
    });
  var T_ = {};
  Re(T_, {
    observeRequests: () => QU,
    startActionGroup: () => $r,
    startEngine: () => Ti,
    stopActionGroup: () => sr,
    stopAllActionGroups: () => m_,
    stopEngine: () => Ii,
  });
  function QU(e) {
    Rt({ store: e, select: ({ ixRequest: t }) => t.preview, onChange: eB }),
      Rt({ store: e, select: ({ ixRequest: t }) => t.playback, onChange: tB }),
      Rt({ store: e, select: ({ ixRequest: t }) => t.stop, onChange: rB }),
      Rt({ store: e, select: ({ ixRequest: t }) => t.clear, onChange: nB });
  }
  function ZU(e) {
    Rt({
      store: e,
      select: ({ ixSession: t }) => t.mediaQueryKey,
      onChange: () => {
        Ii(e),
          h_({ store: e, elementApi: xe }),
          Ti({ store: e, allowEvents: !0 }),
          v_();
      },
    });
  }
  function JU(e, t) {
    let r = Rt({
      store: e,
      select: ({ ixSession: n }) => n.tick,
      onChange: (n) => {
        t(n), r();
      },
    });
  }
  function eB({ rawData: e, defer: t }, r) {
    let n = () => {
      Ti({ store: r, rawData: e, allowEvents: !0 }), v_();
    };
    t ? setTimeout(n, 0) : n();
  }
  function v_() {
    document.dispatchEvent(new CustomEvent("IX2_PAGE_UPDATE"));
  }
  function tB(e, t) {
    let {
        actionTypeId: r,
        actionListId: n,
        actionItemId: i,
        eventId: o,
        allowEvents: s,
        immediate: a,
        testManual: u,
        verbose: f = !0,
      } = e,
      { rawData: p } = e;
    if (n && i && p && a) {
      let g = p.actionLists[n];
      g && (p = UU({ actionList: g, actionItemId: i, rawData: p }));
    }
    if (
      (Ti({ store: t, rawData: p, allowEvents: s, testManual: u }),
      (n && r === Le.GENERAL_START_ACTION) || Es(r))
    ) {
      sr({ store: t, actionListId: n }),
        E_({ store: t, actionListId: n, eventId: o });
      let g = $r({
        store: t,
        eventId: o,
        actionListId: n,
        immediate: a,
        verbose: f,
      });
      f && g && t.dispatch(ar({ actionListId: n, isPlaying: !a }));
    }
  }
  function rB({ actionListId: e }, t) {
    e ? sr({ store: t, actionListId: e }) : m_({ store: t }), Ii(t);
  }
  function nB(e, t) {
    Ii(t), h_({ store: t, elementApi: xe });
  }
  function Ti({ store: e, rawData: t, allowEvents: r, testManual: n }) {
    let { ixSession: i } = e.getState();
    t && e.dispatch(Ya(t)),
      i.active ||
        (e.dispatch(
          $a({
            hasBoundaryNodes: !!document.querySelector(Ei),
            reducedMotion:
              document.body.hasAttribute("data-wf-ix-vacation") &&
              window.matchMedia("(prefers-reduced-motion)").matches,
          })
        ),
        r &&
          (cB(e), iB(), e.getState().ixSession.hasDefinedMediaQueries && ZU(e)),
        e.dispatch(Qa()),
        oB(e, n));
  }
  function iB() {
    let { documentElement: e } = document;
    e.className.indexOf(a_) === -1 && (e.className += ` ${a_}`);
  }
  function oB(e, t) {
    let r = (n) => {
      let { ixSession: i, ixParameters: o } = e.getState();
      i.active &&
        (e.dispatch(ai(n, o)), t ? JU(e, r) : requestAnimationFrame(r));
    };
    r(window.performance.now());
  }
  function Ii(e) {
    let { ixSession: t } = e.getState();
    if (t.active) {
      let { eventListeners: r } = t;
      r.forEach(aB), HU(), e.dispatch(Za());
    }
  }
  function aB({ target: e, listenerParams: t }) {
    e.removeEventListener.apply(e, t);
  }
  function sB({
    store: e,
    eventStateKey: t,
    eventTarget: r,
    eventId: n,
    eventConfig: i,
    actionListId: o,
    parameterGroup: s,
    smoothing: a,
    restingValue: u,
  }) {
    let { ixData: f, ixSession: p } = e.getState(),
      { events: g } = f,
      d = g[n],
      { eventTypeId: v } = d,
      b = {},
      m = {},
      A = [],
      { continuousActionGroups: y } = s,
      { id: w } = s;
    BU(v, i) && (w = kU(t, w));
    let S = p.hasBoundaryNodes && r ? jr(r, Ei) : null;
    y.forEach((C) => {
      let { keyframe: R, actionItems: x } = C;
      x.forEach((G) => {
        let { actionTypeId: B } = G,
          { target: k } = G.config;
        if (!k) return;
        let W = k.boundaryMode ? S : null,
          Z = WU(k) + ms + B;
        if (((m[Z] = uB(m[Z], R, G)), !b[Z])) {
          b[Z] = !0;
          let { config: P } = G;
          mi({
            config: P,
            event: d,
            eventTarget: r,
            elementRoot: W,
            elementApi: xe,
          }).forEach((T) => {
            A.push({ element: T, key: Z });
          });
        }
      });
    }),
      A.forEach(({ element: C, key: R }) => {
        let x = m[R],
          G = (0, ct.default)(x, "[0].actionItems[0]", {}),
          { actionTypeId: B } = G,
          k = bi(B) ? bs(B)(C, G) : null,
          W = _s({ element: C, actionItem: G, elementApi: xe }, k);
        Ts({
          store: e,
          element: C,
          eventId: n,
          actionListId: o,
          actionItem: G,
          destination: W,
          continuous: !0,
          parameterId: w,
          actionGroups: x,
          smoothing: a,
          restingValue: u,
          pluginInstance: k,
        });
      });
  }
  function uB(e = [], t, r) {
    let n = [...e],
      i;
    return (
      n.some((o, s) => (o.keyframe === t ? ((i = s), !0) : !1)),
      i == null && ((i = n.length), n.push({ keyframe: t, actionItems: [] })),
      n[i].actionItems.push(r),
      n
    );
  }
  function cB(e) {
    let { ixData: t } = e.getState(),
      { eventTypeMap: r } = t;
    y_(e),
      (0, ur.default)(r, (i, o) => {
        let s = i_[o];
        if (!s) {
          console.warn(`IX2 event type not configured: ${o}`);
          return;
        }
        hB({ logic: s, store: e, events: i });
      });
    let { ixSession: n } = e.getState();
    n.eventListeners.length && fB(e);
  }
  function fB(e) {
    let t = () => {
      y_(e);
    };
    lB.forEach((r) => {
      window.addEventListener(r, t), e.dispatch(oi(window, [r, t]));
    }),
      t();
  }
  function y_(e) {
    let { ixSession: t, ixData: r } = e.getState(),
      n = window.innerWidth;
    if (n !== t.viewportWidth) {
      let { mediaQueries: i } = r;
      e.dispatch(ns({ width: n, mediaQueries: i }));
    }
  }
  function hB({ logic: e, store: t, events: r }) {
    vB(r);
    let { types: n, handler: i } = e,
      { ixData: o } = t.getState(),
      { actionLists: s } = o,
      a = dB(r, gB);
    if (!(0, c_.default)(a)) return;
    (0, ur.default)(a, (g, d) => {
      let v = r[d],
        { action: b, id: m, mediaQueries: A = o.mediaQueryKeys } = v,
        { actionListId: y } = b.config;
      jU(A, o.mediaQueryKeys) || t.dispatch(is()),
        b.actionTypeId === Le.GENERAL_CONTINUOUS_ACTION &&
          (Array.isArray(v.config) ? v.config : [v.config]).forEach((S) => {
            let { continuousParameterGroupId: C } = S,
              R = (0, ct.default)(s, `${y}.continuousParameterGroups`, []),
              x = (0, u_.default)(R, ({ id: k }) => k === C),
              G = (S.smoothing || 0) / 100,
              B = (S.restingState || 0) / 100;
            x &&
              g.forEach((k, W) => {
                let Z = m + ms + W;
                sB({
                  store: t,
                  eventStateKey: Z,
                  eventTarget: k,
                  eventId: m,
                  eventConfig: S,
                  actionListId: y,
                  parameterGroup: x,
                  smoothing: G,
                  restingValue: B,
                });
              });
          }),
        (b.actionTypeId === Le.GENERAL_START_ACTION || Es(b.actionTypeId)) &&
          E_({ store: t, actionListId: y, eventId: m });
    });
    let u = (g) => {
        let { ixSession: d } = t.getState();
        pB(a, (v, b, m) => {
          let A = r[b],
            y = d.eventState[m],
            { action: w, mediaQueries: S = o.mediaQueryKeys } = A;
          if (!_i(S, d.mediaQueryKey)) return;
          let C = (R = {}) => {
            let x = i(
              {
                store: t,
                element: v,
                event: A,
                eventConfig: R,
                nativeEvent: g,
                eventStateKey: m,
              },
              y
            );
            zU(x, y) || t.dispatch(Ja(m, x));
          };
          w.actionTypeId === Le.GENERAL_CONTINUOUS_ACTION
            ? (Array.isArray(A.config) ? A.config : [A.config]).forEach(C)
            : C();
        });
      },
      f = (0, p_.default)(u, $U),
      p = ({ target: g = document, types: d, throttle: v }) => {
        d.split(" ")
          .filter(Boolean)
          .forEach((b) => {
            let m = v ? f : u;
            g.addEventListener(b, m), t.dispatch(oi(g, [b, m]));
          });
      };
    Array.isArray(n) ? n.forEach(p) : typeof n == "string" && p(e);
  }
  function vB(e) {
    if (!YU) return;
    let t = {},
      r = "";
    for (let n in e) {
      let { eventTypeId: i, target: o } = e[n],
        s = as(o);
      t[s] ||
        ((i === Xe.MOUSE_CLICK || i === Xe.MOUSE_SECOND_CLICK) &&
          ((t[s] = !0),
          (r += s + "{cursor: pointer;touch-action: manipulation;}")));
    }
    if (r) {
      let n = document.createElement("style");
      (n.textContent = r), document.body.appendChild(n);
    }
  }
  function E_({ store: e, actionListId: t, eventId: r }) {
    let { ixData: n, ixSession: i } = e.getState(),
      { actionLists: o, events: s } = n,
      a = s[r],
      u = o[t];
    if (u && u.useFirstGroupAsInitialState) {
      let f = (0, ct.default)(u, "actionItemGroups[0].actionItems", []),
        p = (0, ct.default)(a, "mediaQueries", n.mediaQueryKeys);
      if (!_i(p, i.mediaQueryKey)) return;
      f.forEach((g) => {
        let { config: d, actionTypeId: v } = g,
          b =
            d?.target?.useEventTarget === !0 && d?.target?.objectId == null
              ? { target: a.target, targets: a.targets }
              : d,
          m = mi({ config: b, event: a, elementApi: xe }),
          A = bi(v);
        m.forEach((y) => {
          let w = A ? bs(v)(y, g) : null;
          Ts({
            destination: _s({ element: y, actionItem: g, elementApi: xe }, w),
            immediate: !0,
            store: e,
            element: y,
            eventId: r,
            actionItem: g,
            actionListId: t,
            pluginInstance: w,
          });
        });
      });
    }
  }
  function m_({ store: e }) {
    let { ixInstances: t } = e.getState();
    (0, ur.default)(t, (r) => {
      if (!r.continuous) {
        let { actionListId: n, verbose: i } = r;
        Is(r, e), i && e.dispatch(ar({ actionListId: n, isPlaying: !1 }));
      }
    });
  }
  function sr({
    store: e,
    eventId: t,
    eventTarget: r,
    eventStateKey: n,
    actionListId: i,
  }) {
    let { ixInstances: o, ixSession: s } = e.getState(),
      a = s.hasBoundaryNodes && r ? jr(r, Ei) : null;
    (0, ur.default)(o, (u) => {
      let f = (0, ct.default)(u, "actionItem.config.target.boundaryMode"),
        p = n ? u.eventStateKey === n : !0;
      if (u.actionListId === i && u.eventId === t && p) {
        if (a && f && !ss(a, u.element)) return;
        Is(u, e),
          u.verbose && e.dispatch(ar({ actionListId: i, isPlaying: !1 }));
      }
    });
  }
  function $r({
    store: e,
    eventId: t,
    eventTarget: r,
    eventStateKey: n,
    actionListId: i,
    groupIndex: o = 0,
    immediate: s,
    verbose: a,
  }) {
    let { ixData: u, ixSession: f } = e.getState(),
      { events: p } = u,
      g = p[t] || {},
      { mediaQueries: d = u.mediaQueryKeys } = g,
      v = (0, ct.default)(u, `actionLists.${i}`, {}),
      { actionItemGroups: b, useFirstGroupAsInitialState: m } = v;
    if (!b || !b.length) return !1;
    o >= b.length && (0, ct.default)(g, "config.loop") && (o = 0),
      o === 0 && m && o++;
    let y =
        (o === 0 || (o === 1 && m)) && Es(g.action?.actionTypeId)
          ? g.config.delay
          : void 0,
      w = (0, ct.default)(b, [o, "actionItems"], []);
    if (!w.length || !_i(d, f.mediaQueryKey)) return !1;
    let S = f.hasBoundaryNodes && r ? jr(r, Ei) : null,
      C = DU(w),
      R = !1;
    return (
      w.forEach((x, G) => {
        let { config: B, actionTypeId: k } = x,
          W = bi(k),
          { target: Z } = B;
        if (!Z) return;
        let P = Z.boundaryMode ? S : null;
        mi({
          config: B,
          event: g,
          eventTarget: r,
          elementRoot: P,
          elementApi: xe,
        }).forEach((L, U) => {
          let D = W ? bs(k)(L, x) : null,
            J = W ? KU(k)(L, x) : null;
          R = !0;
          let Q = C === G && U === 0,
            N = GU({ element: L, actionItem: x }),
            V = _s({ element: L, actionItem: x, elementApi: xe }, D);
          Ts({
            store: e,
            element: L,
            actionItem: x,
            eventId: t,
            eventTarget: r,
            eventStateKey: n,
            actionListId: i,
            groupIndex: o,
            isCarrier: Q,
            computedStyle: N,
            destination: V,
            immediate: s,
            verbose: a,
            pluginInstance: D,
            pluginDuration: J,
            instanceDelay: y,
          });
        });
      }),
      R
    );
  }
  function Ts(e) {
    let { store: t, computedStyle: r, ...n } = e,
      {
        element: i,
        actionItem: o,
        immediate: s,
        pluginInstance: a,
        continuous: u,
        restingValue: f,
        eventId: p,
      } = n,
      g = !u,
      d = FU(),
      { ixElements: v, ixSession: b, ixData: m } = t.getState(),
      A = qU(v, i),
      { refState: y } = v[A] || {},
      w = us(i),
      S = b.reducedMotion && ko[o.actionTypeId],
      C;
    if (S && u)
      switch (m.events[p]?.eventTypeId) {
        case Xe.MOUSE_MOVE:
        case Xe.MOUSE_MOVE_IN_VIEWPORT:
          C = f;
          break;
        default:
          C = 0.5;
          break;
      }
    let R = VU(i, y, r, o, xe, a);
    if (
      (t.dispatch(
        es({
          instanceId: d,
          elementId: A,
          origin: R,
          refType: w,
          skipMotion: S,
          skipToValue: C,
          ...n,
        })
      ),
      __(document.body, "ix2-animation-started", d),
      s)
    ) {
      yB(t, d);
      return;
    }
    Rt({ store: t, select: ({ ixInstances: x }) => x[d], onChange: b_ }),
      g && t.dispatch(si(d, b.tick));
  }
  function Is(e, t) {
    __(document.body, "ix2-animation-stopping", {
      instanceId: e.id,
      state: t.getState(),
    });
    let { elementId: r, actionItem: n } = e,
      { ixElements: i } = t.getState(),
      { ref: o, refType: s } = i[r] || {};
    s === g_ && XU(o, n, xe), t.dispatch(ts(e.id));
  }
  function __(e, t, r) {
    let n = document.createEvent("CustomEvent");
    n.initCustomEvent(t, !0, !0, r), e.dispatchEvent(n);
  }
  function yB(e, t) {
    let { ixParameters: r } = e.getState();
    e.dispatch(si(t, 0)), e.dispatch(ai(performance.now(), r));
    let { ixInstances: n } = e.getState();
    b_(n[t], e);
  }
  function b_(e, t) {
    let {
        active: r,
        continuous: n,
        complete: i,
        elementId: o,
        actionItem: s,
        actionTypeId: a,
        renderType: u,
        current: f,
        groupIndex: p,
        eventId: g,
        eventTarget: d,
        eventStateKey: v,
        actionListId: b,
        isCarrier: m,
        styleProp: A,
        verbose: y,
        pluginInstance: w,
      } = e,
      { ixData: S, ixSession: C } = t.getState(),
      { events: R } = S,
      x = R[g] || {},
      { mediaQueries: G = S.mediaQueryKeys } = x;
    if (_i(G, C.mediaQueryKey) && (n || r || i)) {
      if (f || (u === PU && i)) {
        t.dispatch(rs(o, a, f, s));
        let { ixElements: B } = t.getState(),
          { ref: k, refType: W, refState: Z } = B[o] || {},
          P = Z && Z[a];
        (W === g_ || bi(a)) && MU(k, Z, P, g, s, A, xe, u, w);
      }
      if (i) {
        if (m) {
          let B = $r({
            store: t,
            eventId: g,
            eventTarget: d,
            eventStateKey: v,
            actionListId: b,
            groupIndex: p + 1,
            verbose: y,
          });
          y && !B && t.dispatch(ar({ actionListId: b, isPlaying: !1 }));
        }
        Is(e, t);
      }
    }
  }
  var u_,
    ct,
    c_,
    l_,
    f_,
    d_,
    ur,
    p_,
    yi,
    NU,
    Es,
    ms,
    Ei,
    g_,
    PU,
    a_,
    mi,
    qU,
    _s,
    Rt,
    FU,
    MU,
    h_,
    DU,
    GU,
    VU,
    UU,
    BU,
    kU,
    _i,
    XU,
    HU,
    WU,
    jU,
    zU,
    bi,
    bs,
    KU,
    s_,
    YU,
    $U,
    lB,
    dB,
    pB,
    gB,
    ys = le(() => {
      "use strict";
      (u_ = oe(ya())),
        (ct = oe(Bn())),
        (c_ = oe(Fy())),
        (l_ = oe(sE())),
        (f_ = oe(cE())),
        (d_ = oe(fE())),
        (ur = oe(yE())),
        (p_ = oe(OE()));
      Ne();
      yi = oe(Ct());
      ui();
      RE();
      o_();
      (NU = Object.keys(mn)),
        (Es = (e) => NU.includes(e)),
        ({
          COLON_DELIMITER: ms,
          BOUNDARY_SELECTOR: Ei,
          HTML_ELEMENT: g_,
          RENDER_GENERAL: PU,
          W_MOD_IX: a_,
        } = Ie),
        ({
          getAffectedElements: mi,
          getElementId: qU,
          getDestinationValues: _s,
          observeStore: Rt,
          getInstanceId: FU,
          renderHTMLElement: MU,
          clearAllStyles: h_,
          getMaxDurationItemIndex: DU,
          getComputedStyle: GU,
          getInstanceOrigin: VU,
          reduceListToGroup: UU,
          shouldNamespaceEventParameter: BU,
          getNamespacedParameterId: kU,
          shouldAllowMediaQuery: _i,
          cleanupHTMLElement: XU,
          clearObjectCache: HU,
          stringifyTarget: WU,
          mediaQueriesEqual: jU,
          shallowEqual: zU,
        } = yi.IX2VanillaUtils),
        ({
          isPluginType: bi,
          createPluginInstance: bs,
          getPluginDuration: KU,
        } = yi.IX2VanillaPlugins),
        (s_ = navigator.userAgent),
        (YU = s_.match(/iPad/i) || s_.match(/iPhone/)),
        ($U = 12);
      lB = ["resize", "orientationchange"];
      (dB = (e, t) => (0, l_.default)((0, d_.default)(e, t), f_.default)),
        (pB = (e, t) => {
          (0, ur.default)(e, (r, n) => {
            r.forEach((i, o) => {
              let s = n + ms + o;
              t(i, n, s);
            });
          });
        }),
        (gB = (e) => {
          let t = { target: e.target, targets: e.targets };
          return mi({ config: t, elementApi: xe });
        });
    });
  var O_ = c((lt) => {
    "use strict";
    var EB = an().default,
      mB = ou().default;
    Object.defineProperty(lt, "__esModule", { value: !0 });
    lt.actions = void 0;
    lt.destroy = I_;
    lt.init = OB;
    lt.setEnv = IB;
    lt.store = void 0;
    Hl();
    var _B = Vo(),
      bB = mB((vy(), Ke(hy))),
      Os = (ys(), Ke(T_)),
      TB = EB((ui(), Ke(SE)));
    lt.actions = TB;
    var As = (lt.store = (0, _B.createStore)(bB.default));
    function IB(e) {
      e() && (0, Os.observeRequests)(As);
    }
    function OB(e) {
      I_(), (0, Os.startEngine)({ store: As, rawData: e, allowEvents: !0 });
    }
    function I_() {
      (0, Os.stopEngine)(As);
    }
  });
  var x_ = c((jj, w_) => {
    "use strict";
    var A_ = $e(),
      S_ = O_();
    S_.setEnv(A_.env);
    A_.define(
      "ix2",
      (w_.exports = function () {
        return S_;
      })
    );
  });
  var R_ = c((zj, C_) => {
    "use strict";
    var cr = $e();
    cr.define(
      "links",
      (C_.exports = function (e, t) {
        var r = {},
          n = e(window),
          i,
          o = cr.env(),
          s = window.location,
          a = document.createElement("a"),
          u = "w--current",
          f = /index\.(html|php)$/,
          p = /\/$/,
          g,
          d;
        r.ready = r.design = r.preview = v;
        function v() {
          (i = o && cr.env("design")),
            (d = cr.env("slug") || s.pathname || ""),
            cr.scroll.off(m),
            (g = []);
          for (var y = document.links, w = 0; w < y.length; ++w) b(y[w]);
          g.length && (cr.scroll.on(m), m());
        }
        function b(y) {
          if (!y.getAttribute("hreflang")) {
            var w =
              (i && y.getAttribute("href-disabled")) || y.getAttribute("href");
            if (((a.href = w), !(w.indexOf(":") >= 0))) {
              var S = e(y);
              if (
                a.hash.length > 1 &&
                a.host + a.pathname === s.host + s.pathname
              ) {
                if (!/^#[a-zA-Z0-9\-\_]+$/.test(a.hash)) return;
                var C = e(a.hash);
                C.length && g.push({ link: S, sec: C, active: !1 });
                return;
              }
              if (!(w === "#" || w === "")) {
                var R =
                  a.href === s.href || w === d || (f.test(w) && p.test(d));
                A(S, u, R);
              }
            }
          }
        }
        function m() {
          var y = n.scrollTop(),
            w = n.height();
          t.each(g, function (S) {
            if (!S.link.attr("hreflang")) {
              var C = S.link,
                R = S.sec,
                x = R.offset().top,
                G = R.outerHeight(),
                B = w * 0.5,
                k = R.is(":visible") && x + G - B >= y && x + B <= y + w;
              S.active !== k && ((S.active = k), A(C, u, k));
            }
          });
        }
        function A(y, w, S) {
          var C = y.hasClass(w);
          (S && C) || (!S && !C) || (S ? y.addClass(w) : y.removeClass(w));
        }
        return r;
      })
    );
  });
  var N_ = c((Kj, L_) => {
    "use strict";
    var Oi = $e();
    Oi.define(
      "scroll",
      (L_.exports = function (e) {
        var t = {
            WF_CLICK_EMPTY: "click.wf-empty-link",
            WF_CLICK_SCROLL: "click.wf-scroll",
          },
          r = window.location,
          n = b() ? null : window.history,
          i = e(window),
          o = e(document),
          s = e(document.body),
          a =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (P) {
              window.setTimeout(P, 15);
            },
          u = Oi.env("editor") ? ".w-editor-body" : "body",
          f =
            "header, " +
            u +
            " > .header, " +
            u +
            " > .w-nav:not([data-no-scroll])",
          p = 'a[href="#"]',
          g = 'a[href*="#"]:not(.w-tab-link):not(' + p + ")",
          d = '.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}',
          v = document.createElement("style");
        v.appendChild(document.createTextNode(d));
        function b() {
          try {
            return !!window.frameElement;
          } catch {
            return !0;
          }
        }
        var m = /^#[a-zA-Z0-9][\w:.-]*$/;
        function A(P) {
          return m.test(P.hash) && P.host + P.pathname === r.host + r.pathname;
        }
        let y =
          typeof window.matchMedia == "function" &&
          window.matchMedia("(prefers-reduced-motion: reduce)");
        function w() {
          return (
            document.body.getAttribute("data-wf-scroll-motion") === "none" ||
            y.matches
          );
        }
        function S(P, T) {
          var L;
          switch (T) {
            case "add":
              (L = P.attr("tabindex")),
                L
                  ? P.attr("data-wf-tabindex-swap", L)
                  : P.attr("tabindex", "-1");
              break;
            case "remove":
              (L = P.attr("data-wf-tabindex-swap")),
                L
                  ? (P.attr("tabindex", L),
                    P.removeAttr("data-wf-tabindex-swap"))
                  : P.removeAttr("tabindex");
              break;
          }
          P.toggleClass("wf-force-outline-none", T === "add");
        }
        function C(P) {
          var T = P.currentTarget;
          if (
            !(
              Oi.env("design") ||
              (window.$.mobile && /(?:^|\s)ui-link(?:$|\s)/.test(T.className))
            )
          ) {
            var L = A(T) ? T.hash : "";
            if (L !== "") {
              var U = e(L);
              U.length &&
                (P && (P.preventDefault(), P.stopPropagation()),
                R(L, P),
                window.setTimeout(
                  function () {
                    x(U, function () {
                      S(U, "add"),
                        U.get(0).focus({ preventScroll: !0 }),
                        S(U, "remove");
                    });
                  },
                  P ? 0 : 300
                ));
            }
          }
        }
        function R(P) {
          if (
            r.hash !== P &&
            n &&
            n.pushState &&
            !(Oi.env.chrome && r.protocol === "file:")
          ) {
            var T = n.state && n.state.hash;
            T !== P && n.pushState({ hash: P }, "", P);
          }
        }
        function x(P, T) {
          var L = i.scrollTop(),
            U = G(P);
          if (L !== U) {
            var D = B(P, L, U),
              J = Date.now(),
              Q = function () {
                var N = Date.now() - J;
                window.scroll(0, k(L, U, N, D)),
                  N <= D ? a(Q) : typeof T == "function" && T();
              };
            a(Q);
          }
        }
        function G(P) {
          var T = e(f),
            L = T.css("position") === "fixed" ? T.outerHeight() : 0,
            U = P.offset().top - L;
          if (P.data("scroll") === "mid") {
            var D = i.height() - L,
              J = P.outerHeight();
            J < D && (U -= Math.round((D - J) / 2));
          }
          return U;
        }
        function B(P, T, L) {
          if (w()) return 0;
          var U = 1;
          return (
            s.add(P).each(function (D, J) {
              var Q = parseFloat(J.getAttribute("data-scroll-time"));
              !isNaN(Q) && Q >= 0 && (U = Q);
            }),
            (472.143 * Math.log(Math.abs(T - L) + 125) - 2e3) * U
          );
        }
        function k(P, T, L, U) {
          return L > U ? T : P + (T - P) * W(L / U);
        }
        function W(P) {
          return P < 0.5
            ? 4 * P * P * P
            : (P - 1) * (2 * P - 2) * (2 * P - 2) + 1;
        }
        function Z() {
          var { WF_CLICK_EMPTY: P, WF_CLICK_SCROLL: T } = t;
          o.on(T, g, C),
            o.on(P, p, function (L) {
              L.preventDefault();
            }),
            document.head.insertBefore(v, document.head.firstChild);
        }
        return { ready: Z };
      })
    );
  });
  var q_ = c((Yj, P_) => {
    "use strict";
    var AB = $e();
    AB.define(
      "touch",
      (P_.exports = function (e) {
        var t = {},
          r = window.getSelection;
        (e.event.special.tap = { bindType: "click", delegateType: "click" }),
          (t.init = function (o) {
            return (
              (o = typeof o == "string" ? e(o).get(0) : o), o ? new n(o) : null
            );
          });
        function n(o) {
          var s = !1,
            a = !1,
            u = Math.min(Math.round(window.innerWidth * 0.04), 40),
            f,
            p;
          o.addEventListener("touchstart", g, !1),
            o.addEventListener("touchmove", d, !1),
            o.addEventListener("touchend", v, !1),
            o.addEventListener("touchcancel", b, !1),
            o.addEventListener("mousedown", g, !1),
            o.addEventListener("mousemove", d, !1),
            o.addEventListener("mouseup", v, !1),
            o.addEventListener("mouseout", b, !1);
          function g(A) {
            var y = A.touches;
            (y && y.length > 1) ||
              ((s = !0),
              y ? ((a = !0), (f = y[0].clientX)) : (f = A.clientX),
              (p = f));
          }
          function d(A) {
            if (s) {
              if (a && A.type === "mousemove") {
                A.preventDefault(), A.stopPropagation();
                return;
              }
              var y = A.touches,
                w = y ? y[0].clientX : A.clientX,
                S = w - p;
              (p = w),
                Math.abs(S) > u &&
                  r &&
                  String(r()) === "" &&
                  (i("swipe", A, { direction: S > 0 ? "right" : "left" }), b());
            }
          }
          function v(A) {
            if (s && ((s = !1), a && A.type === "mouseup")) {
              A.preventDefault(), A.stopPropagation(), (a = !1);
              return;
            }
          }
          function b() {
            s = !1;
          }
          function m() {
            o.removeEventListener("touchstart", g, !1),
              o.removeEventListener("touchmove", d, !1),
              o.removeEventListener("touchend", v, !1),
              o.removeEventListener("touchcancel", b, !1),
              o.removeEventListener("mousedown", g, !1),
              o.removeEventListener("mousemove", d, !1),
              o.removeEventListener("mouseup", v, !1),
              o.removeEventListener("mouseout", b, !1),
              (o = null);
          }
          this.destroy = m;
        }
        function i(o, s, a) {
          var u = e.Event(o, { originalEvent: s });
          e(s.target).trigger(u, a);
        }
        return (t.instance = t.init(document)), t;
      })
    );
  });
  var F_ = c((Ss) => {
    "use strict";
    Object.defineProperty(Ss, "__esModule", { value: !0 });
    Ss.default = SB;
    function SB(e, t, r, n, i, o, s, a, u, f, p, g, d) {
      return function (v) {
        e(v);
        var b = v.form,
          m = {
            name: b.attr("data-name") || b.attr("name") || "Untitled Form",
            pageId: b.attr("data-wf-page-id") || "",
            elementId: b.attr("data-wf-element-id") || "",
            source: t.href,
            test: r.env(),
            fields: {},
            fileUploads: {},
            dolphin: /pass[\s-_]?(word|code)|secret|login|credentials/i.test(
              b.html()
            ),
            trackingCookies: n(),
          };
        let A = b.attr("data-wf-flow");
        A && (m.wfFlow = A), i(v);
        var y = o(b, m.fields);
        if (y) return s(y);
        if (((m.fileUploads = a(b)), u(v), !f)) {
          p(v);
          return;
        }
        g.ajax({
          url: d,
          type: "POST",
          data: m,
          dataType: "json",
          crossDomain: !0,
        })
          .done(function (w) {
            w && w.code === 200 && (v.success = !0), p(v);
          })
          .fail(function () {
            p(v);
          });
      };
    }
  });
  var D_ = c((Qj, M_) => {
    "use strict";
    var Ai = $e();
    Ai.define(
      "forms",
      (M_.exports = function (e, t) {
        var r = {},
          n = e(document),
          i,
          o = window.location,
          s = window.XDomainRequest && !window.atob,
          a = ".w-form",
          u,
          f = /e(-)?mail/i,
          p = /^\S+@\S+$/,
          g = window.alert,
          d = Ai.env(),
          v,
          b,
          m,
          A = /list-manage[1-9]?.com/i,
          y = t.debounce(function () {
            g(
              "Oops! This page has improperly configured forms. Please contact your website administrator to fix this issue."
            );
          }, 100);
        r.ready =
          r.design =
          r.preview =
            function () {
              w(), !d && !v && C();
            };
        function w() {
          (u = e("html").attr("data-wf-site")),
            (b = "https://webflow.com/api/v1/form/" + u),
            s &&
              b.indexOf("https://webflow.com") >= 0 &&
              (b = b.replace(
                "https://webflow.com",
                "https://formdata.webflow.com"
              )),
            (m = `${b}/signFile`),
            (i = e(a + " form")),
            i.length && i.each(S);
        }
        function S(N, V) {
          var H = e(V),
            F = e.data(V, a);
          F || (F = e.data(V, a, { form: H })), R(F);
          var q = H.closest("div.w-form");
          (F.done = q.find("> .w-form-done")),
            (F.fail = q.find("> .w-form-fail")),
            (F.fileUploads = q.find(".w-file-upload")),
            F.fileUploads.each(function (te) {
              D(te, F);
            });
          var K =
            F.form.attr("aria-label") || F.form.attr("data-name") || "Form";
          F.done.attr("aria-label") || F.form.attr("aria-label", K),
            F.done.attr("tabindex", "-1"),
            F.done.attr("role", "region"),
            F.done.attr("aria-label") ||
              F.done.attr("aria-label", K + " success"),
            F.fail.attr("tabindex", "-1"),
            F.fail.attr("role", "region"),
            F.fail.attr("aria-label") ||
              F.fail.attr("aria-label", K + " failure");
          var ne = (F.action = H.attr("action"));
          if (
            ((F.handler = null),
            (F.redirect = H.attr("data-redirect")),
            A.test(ne))
          ) {
            F.handler = T;
            return;
          }
          if (!ne) {
            if (u) {
              F.handler = (() => {
                let te = F_().default;
                return te(R, o, Ai, W, U, G, g, B, x, u, L, e, b);
              })();
              return;
            }
            y();
          }
        }
        function C() {
          (v = !0),
            n.on("submit", a + " form", function (te) {
              var z = e.data(this, a);
              z.handler && ((z.evt = te), z.handler(z));
            });
          let N = ".w-checkbox-input",
            V = ".w-radio-input",
            H = "w--redirected-checked",
            F = "w--redirected-focus",
            q = "w--redirected-focus-visible",
            K = ":focus-visible, [data-wf-focus-visible]",
            ne = [
              ["checkbox", N],
              ["radio", V],
            ];
          n.on(
            "change",
            a + ' form input[type="checkbox"]:not(' + N + ")",
            (te) => {
              e(te.target).siblings(N).toggleClass(H);
            }
          ),
            n.on("change", a + ' form input[type="radio"]', (te) => {
              e(`input[name="${te.target.name}"]:not(${N})`).map((fe, Lt) =>
                e(Lt).siblings(V).removeClass(H)
              );
              let z = e(te.target);
              z.hasClass("w-radio-input") || z.siblings(V).addClass(H);
            }),
            ne.forEach(([te, z]) => {
              n.on(
                "focus",
                a + ` form input[type="${te}"]:not(` + z + ")",
                (fe) => {
                  e(fe.target).siblings(z).addClass(F),
                    e(fe.target).filter(K).siblings(z).addClass(q);
                }
              ),
                n.on(
                  "blur",
                  a + ` form input[type="${te}"]:not(` + z + ")",
                  (fe) => {
                    e(fe.target).siblings(z).removeClass(`${F} ${q}`);
                  }
                );
            });
        }
        function R(N) {
          var V = (N.btn = N.form.find(':input[type="submit"]'));
          (N.wait = N.btn.attr("data-wait") || null),
            (N.success = !1),
            V.prop("disabled", !1),
            N.label && V.val(N.label);
        }
        function x(N) {
          var V = N.btn,
            H = N.wait;
          V.prop("disabled", !0), H && ((N.label = V.val()), V.val(H));
        }
        function G(N, V) {
          var H = null;
          return (
            (V = V || {}),
            N.find(':input:not([type="submit"]):not([type="file"])').each(
              function (F, q) {
                var K = e(q),
                  ne = K.attr("type"),
                  te =
                    K.attr("data-name") || K.attr("name") || "Field " + (F + 1);
                te = encodeURIComponent(te);
                var z = K.val();
                if (ne === "checkbox") z = K.is(":checked");
                else if (ne === "radio") {
                  if (V[te] === null || typeof V[te] == "string") return;
                  z =
                    N.find(
                      'input[name="' + K.attr("name") + '"]:checked'
                    ).val() || null;
                }
                typeof z == "string" && (z = e.trim(z)),
                  (V[te] = z),
                  (H = H || Z(K, ne, te, z));
              }
            ),
            H
          );
        }
        function B(N) {
          var V = {};
          return (
            N.find(':input[type="file"]').each(function (H, F) {
              var q = e(F),
                K = q.attr("data-name") || q.attr("name") || "File " + (H + 1),
                ne = q.attr("data-value");
              typeof ne == "string" && (ne = e.trim(ne)), (V[K] = ne);
            }),
            V
          );
        }
        let k = { _mkto_trk: "marketo" };
        function W() {
          return document.cookie.split("; ").reduce(function (V, H) {
            let F = H.split("="),
              q = F[0];
            if (q in k) {
              let K = k[q],
                ne = F.slice(1).join("=");
              V[K] = ne;
            }
            return V;
          }, {});
        }
        function Z(N, V, H, F) {
          var q = null;
          return (
            V === "password"
              ? (q = "Passwords cannot be submitted.")
              : N.attr("required")
              ? F
                ? f.test(N.attr("type")) &&
                  (p.test(F) ||
                    (q = "Please enter a valid email address for: " + H))
                : (q = "Please fill out the required field: " + H)
              : H === "g-recaptcha-response" &&
                !F &&
                (q = "Please confirm you\u2019re not a robot."),
            q
          );
        }
        function P(N) {
          U(N), L(N);
        }
        function T(N) {
          R(N);
          var V = N.form,
            H = {};
          if (/^https/.test(o.href) && !/^https/.test(N.action)) {
            V.attr("method", "post");
            return;
          }
          U(N);
          var F = G(V, H);
          if (F) return g(F);
          x(N);
          var q;
          t.each(H, function (z, fe) {
            f.test(fe) && (H.EMAIL = z),
              /^((full[ _-]?)?name)$/i.test(fe) && (q = z),
              /^(first[ _-]?name)$/i.test(fe) && (H.FNAME = z),
              /^(last[ _-]?name)$/i.test(fe) && (H.LNAME = z);
          }),
            q &&
              !H.FNAME &&
              ((q = q.split(" ")),
              (H.FNAME = q[0]),
              (H.LNAME = H.LNAME || q[1]));
          var K = N.action.replace("/post?", "/post-json?") + "&c=?",
            ne = K.indexOf("u=") + 2;
          ne = K.substring(ne, K.indexOf("&", ne));
          var te = K.indexOf("id=") + 3;
          (te = K.substring(te, K.indexOf("&", te))),
            (H["b_" + ne + "_" + te] = ""),
            e
              .ajax({ url: K, data: H, dataType: "jsonp" })
              .done(function (z) {
                (N.success = z.result === "success" || /already/.test(z.msg)),
                  N.success || console.info("MailChimp error: " + z.msg),
                  L(N);
              })
              .fail(function () {
                L(N);
              });
        }
        function L(N) {
          var V = N.form,
            H = N.redirect,
            F = N.success;
          if (F && H) {
            Ai.location(H);
            return;
          }
          N.done.toggle(F),
            N.fail.toggle(!F),
            F ? N.done.focus() : N.fail.focus(),
            V.toggle(!F),
            R(N);
        }
        function U(N) {
          N.evt && N.evt.preventDefault(), (N.evt = null);
        }
        function D(N, V) {
          if (!V.fileUploads || !V.fileUploads[N]) return;
          var H,
            F = e(V.fileUploads[N]),
            q = F.find("> .w-file-upload-default"),
            K = F.find("> .w-file-upload-uploading"),
            ne = F.find("> .w-file-upload-success"),
            te = F.find("> .w-file-upload-error"),
            z = q.find(".w-file-upload-input"),
            fe = q.find(".w-file-upload-label"),
            Lt = fe.children(),
            he = te.find(".w-file-upload-error-msg"),
            ft = ne.find(".w-file-upload-file"),
            lr = ne.find(".w-file-remove-link"),
            fr = ft.find(".w-file-upload-file-name"),
            dr = he.attr("data-w-size-error"),
            je = he.attr("data-w-type-error"),
            Si = he.attr("data-w-generic-error");
          if (
            (d ||
              fe.on("click keydown", function (E) {
                (E.type === "keydown" && E.which !== 13 && E.which !== 32) ||
                  (E.preventDefault(), z.click());
              }),
            fe.find(".w-icon-file-upload-icon").attr("aria-hidden", "true"),
            lr.find(".w-icon-file-upload-remove").attr("aria-hidden", "true"),
            d)
          )
            z.on("click", function (E) {
              E.preventDefault();
            }),
              fe.on("click", function (E) {
                E.preventDefault();
              }),
              Lt.on("click", function (E) {
                E.preventDefault();
              });
          else {
            lr.on("click keydown", function (E) {
              if (E.type === "keydown") {
                if (E.which !== 13 && E.which !== 32) return;
                E.preventDefault();
              }
              z.removeAttr("data-value"),
                z.val(""),
                fr.html(""),
                q.toggle(!0),
                ne.toggle(!1),
                fe.focus();
            }),
              z.on("change", function (E) {
                (H = E.target && E.target.files && E.target.files[0]),
                  H &&
                    (q.toggle(!1),
                    te.toggle(!1),
                    K.toggle(!0),
                    K.focus(),
                    fr.text(H.name),
                    I() || x(V),
                    (V.fileUploads[N].uploading = !0),
                    J(H, h));
              });
            var Qr = fe.outerHeight();
            z.height(Qr), z.width(1);
          }
          function l(E) {
            var O = E.responseJSON && E.responseJSON.msg,
              X = Si;
            typeof O == "string" && O.indexOf("InvalidFileTypeError") === 0
              ? (X = je)
              : typeof O == "string" &&
                O.indexOf("MaxFileSizeError") === 0 &&
                (X = dr),
              he.text(X),
              z.removeAttr("data-value"),
              z.val(""),
              K.toggle(!1),
              q.toggle(!0),
              te.toggle(!0),
              te.focus(),
              (V.fileUploads[N].uploading = !1),
              I() || R(V);
          }
          function h(E, O) {
            if (E) return l(E);
            var X = O.fileName,
              Y = O.postData,
              ue = O.fileId,
              M = O.s3Url;
            z.attr("data-value", ue), Q(M, Y, H, X, _);
          }
          function _(E) {
            if (E) return l(E);
            K.toggle(!1),
              ne.css("display", "inline-block"),
              ne.focus(),
              (V.fileUploads[N].uploading = !1),
              I() || R(V);
          }
          function I() {
            var E = (V.fileUploads && V.fileUploads.toArray()) || [];
            return E.some(function (O) {
              return O.uploading;
            });
          }
        }
        function J(N, V) {
          var H = new URLSearchParams({ name: N.name, size: N.size });
          e.ajax({ type: "GET", url: `${m}?${H}`, crossDomain: !0 })
            .done(function (F) {
              V(null, F);
            })
            .fail(function (F) {
              V(F);
            });
        }
        function Q(N, V, H, F, q) {
          var K = new FormData();
          for (var ne in V) K.append(ne, V[ne]);
          K.append("file", H, F),
            e
              .ajax({
                type: "POST",
                url: N,
                data: K,
                processData: !1,
                contentType: !1,
              })
              .done(function () {
                q(null);
              })
              .fail(function (te) {
                q(te);
              });
        }
        return r;
      })
    );
  });
  xs();
  Cs();
  ks();
  Hs();
  js();
  Ys();
  ru();
  x_();
  R_();
  N_();
  q_();
  D_();
})();
/*!
 * tram.js v0.8.2-global
 * Cross-browser CSS3 transitions in JavaScript
 * https://github.com/bkwld/tram
 * MIT License
 */
/*!
 * Webflow._ (aka) Underscore.js 1.6.0 (custom build)
 *
 * http://underscorejs.org
 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Underscore may be freely distributed under the MIT license.
 * @license MIT
 */
/*! Bundled license information:
  
  timm/lib/timm.js:
    (*!
     * Timm
     *
     * Immutability helpers with fast reads and acceptable writes.
     *
     * @copyright Guillermo Grau Panea 2016
     * @license MIT
     *)
  */
/**
 * ----------------------------------------------------------------------
 * Webflow: Interactions 2.0: Init
 */
Webflow.require("ix2").init({
  events: {
    "e-2": {
      id: "e-2",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66225a5ec72e198e72be35c8",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66225a5ec72e198e72be35c8",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: true,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711916472025,
    },
    "e-4": {
      id: "e-4",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-3",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66225a5ec72e198e72be35c8",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66225a5ec72e198e72be35c8",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711917240450,
    },
    "e-5": {
      id: "e-5",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-3", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main"],
      target: {
        selector: ".card",
        originalId:
          "66225a5ec72e198e72be35c8|3f1bec20-1670-de9c-5f66-5b718f9a322b",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".card",
          originalId:
            "66225a5ec72e198e72be35c8|3f1bec20-1670-de9c-5f66-5b718f9a322b",
          appliesTo: "CLASS",
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-3-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 80,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-3-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 80,
          restingState: 50,
        },
      ],
      createdOn: 1711998817963,
    },
    "e-6": {
      id: "e-6",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-7",
        },
      },
      mediaQueries: ["main"],
      target: {
        selector: ".card",
        originalId: "ae2c2283-82b4-ab69-9f34-f23e416417aa",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".card",
          originalId: "ae2c2283-82b4-ab69-9f34-f23e416417aa",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712000621777,
    },
    "e-7": {
      id: "e-7",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-5",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-6",
        },
      },
      mediaQueries: ["main"],
      target: {
        selector: ".card",
        originalId: "ae2c2283-82b4-ab69-9f34-f23e416417aa",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".card",
          originalId: "ae2c2283-82b4-ab69-9f34-f23e416417aa",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712000621777,
    },
    "e-8": {
      id: "e-8",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-6", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66225a5ec72e198e72be35c8|3b88ab91-e67e-a1e0-2929-edb3c581f08e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66225a5ec72e198e72be35c8|3b88ab91-e67e-a1e0-2929-edb3c581f08e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-6-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: true,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1712345681478,
    },
    "e-9": {
      id: "e-9",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-7", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".vision-section",
        originalId:
          "66225a5ec72e198e72be35c8|9a512b83-f07c-4315-17d7-76967fe9a338",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".vision-section",
          originalId:
            "66225a5ec72e198e72be35c8|9a512b83-f07c-4315-17d7-76967fe9a338",
          appliesTo: "CLASS",
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-7-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: true,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: true,
          endOffsetValue: 0,
        },
      ],
      createdOn: 1712346362779,
    },
    "e-10": {
      id: "e-10",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-11",
        },
      },
      mediaQueries: ["main"],
      target: {
        selector: ".brand-wrap-division",
        originalId:
          "66225a5ec72e198e72be35c8|9fce157d-e39a-310c-a2fa-1c7bf152a28a",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".brand-wrap-division",
          originalId:
            "66225a5ec72e198e72be35c8|9fce157d-e39a-310c-a2fa-1c7bf152a28a",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712403186889,
    },
    "e-11": {
      id: "e-11",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-9",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-10",
        },
      },
      mediaQueries: ["main"],
      target: {
        selector: ".brand-wrap-division",
        originalId:
          "66225a5ec72e198e72be35c8|9fce157d-e39a-310c-a2fa-1c7bf152a28a",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".brand-wrap-division",
          originalId:
            "66225a5ec72e198e72be35c8|9fce157d-e39a-310c-a2fa-1c7bf152a28a",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712403186889,
    },
    "e-12": {
      id: "e-12",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-10", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main"],
      target: {
        selector: ".team-list-item",
        originalId:
          "66225a5ec72e198e72be35c8|0a2a5920-5cff-0120-5cfc-1634d1a9cdd1",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".team-list-item",
          originalId:
            "66225a5ec72e198e72be35c8|0a2a5920-5cff-0120-5cfc-1634d1a9cdd1",
          appliesTo: "CLASS",
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-10-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 94,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-10-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 94,
          restingState: 50,
        },
      ],
      createdOn: 1712409191462,
    },
    "e-13": {
      id: "e-13",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-11",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-14",
        },
      },
      mediaQueries: ["main"],
      target: {
        selector: ".team-list-item",
        originalId:
          "66225a5ec72e198e72be35c8|0a2a5920-5cff-0120-5cfc-1634d1a9cdd1",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".team-list-item",
          originalId:
            "66225a5ec72e198e72be35c8|0a2a5920-5cff-0120-5cfc-1634d1a9cdd1",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712409356100,
    },
    "e-14": {
      id: "e-14",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-12",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-13",
        },
      },
      mediaQueries: ["main"],
      target: {
        selector: ".team-list-item",
        originalId:
          "66225a5ec72e198e72be35c8|0a2a5920-5cff-0120-5cfc-1634d1a9cdd1",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".team-list-item",
          originalId:
            "66225a5ec72e198e72be35c8|0a2a5920-5cff-0120-5cfc-1634d1a9cdd1",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712409356101,
    },
    "e-15": {
      id: "e-15",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-13", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        selector: ".brand-wrap-division",
        originalId:
          "66225a5ec72e198e72be35c8|9fce157d-e39a-310c-a2fa-1c7bf152a28a",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".brand-wrap-division",
          originalId:
            "66225a5ec72e198e72be35c8|9fce157d-e39a-310c-a2fa-1c7bf152a28a",
          appliesTo: "CLASS",
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-13-p",
          smoothing: 50,
          startsEntering: false,
          addStartOffset: true,
          addOffsetValue: 0,
          startsExiting: false,
          addEndOffset: true,
          endOffsetValue: 100,
        },
      ],
      createdOn: 1712410184353,
    },
    "e-16": {
      id: "e-16",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-14", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".footer",
        originalId: "bf3d91c7-3221-043c-ab5c-8bd75765334e",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".footer",
          originalId: "bf3d91c7-3221-043c-ab5c-8bd75765334e",
          appliesTo: "CLASS",
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-14-p",
          smoothing: 93,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 100,
          startsExiting: true,
          addEndOffset: true,
          endOffsetValue: 0,
        },
      ],
      createdOn: 1712417772680,
    },
    "e-17": {
      id: "e-17",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-15", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".news-image-wrap",
        originalId:
          "66225a5ec72e198e72be35cf|e9e2299f-a7d7-b981-4c49-e9e51e2cde67",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".news-image-wrap",
          originalId:
            "66225a5ec72e198e72be35cf|e9e2299f-a7d7-b981-4c49-e9e51e2cde67",
          appliesTo: "CLASS",
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-15-p",
          smoothing: 96,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1712859984664,
    },
    "e-19": {
      id: "e-19",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-16",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-18",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66225a5ec72e198e72be35d1",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66225a5ec72e198e72be35d1",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712863227862,
    },
    "e-21": {
      id: "e-21",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-16",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-20",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66225a5ec72e198e72be35d3",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66225a5ec72e198e72be35d3",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712863537217,
    },
    "e-23": {
      id: "e-23",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-16",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-22",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66225a5ec72e198e72be35cf",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66225a5ec72e198e72be35cf",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712863688536,
    },
    "e-24": {
      id: "e-24",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-17",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-25",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "1acce923-e91f-a078-6e9d-9dfca0a984c4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "1acce923-e91f-a078-6e9d-9dfca0a984c4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713118643024,
    },
    "e-25": {
      id: "e-25",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-18",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-24",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "1acce923-e91f-a078-6e9d-9dfca0a984c4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "1acce923-e91f-a078-6e9d-9dfca0a984c4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713118643025,
    },
    "e-26": {
      id: "e-26",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-19",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-27",
        },
      },
      mediaQueries: ["main"],
      target: {
        selector: ".brands-wrap-link.is-second",
        originalId: "1acce923-e91f-a078-6e9d-9dfca0a984c4",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".brands-wrap-link.is-second",
          originalId: "1acce923-e91f-a078-6e9d-9dfca0a984c4",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713119211133,
    },
    "e-27": {
      id: "e-27",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-20",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-26",
        },
      },
      mediaQueries: ["main"],
      target: {
        selector: ".brands-wrap-link.is-second",
        originalId: "1acce923-e91f-a078-6e9d-9dfca0a984c4",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".brands-wrap-link.is-second",
          originalId: "1acce923-e91f-a078-6e9d-9dfca0a984c4",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713119211134,
    },
    "e-28": {
      id: "e-28",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-21",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-29",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "1acce923-e91f-a078-6e9d-9dfca0a984c7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "1acce923-e91f-a078-6e9d-9dfca0a984c7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713119463043,
    },
    "e-29": {
      id: "e-29",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-22",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-28",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "1acce923-e91f-a078-6e9d-9dfca0a984c7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "1acce923-e91f-a078-6e9d-9dfca0a984c7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713119463043,
    },
    "e-30": {
      id: "e-30",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-23",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-31",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "1acce923-e91f-a078-6e9d-9dfca0a984ca",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "1acce923-e91f-a078-6e9d-9dfca0a984ca",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713128080411,
    },
    "e-31": {
      id: "e-31",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-24",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-30",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "1acce923-e91f-a078-6e9d-9dfca0a984ca",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "1acce923-e91f-a078-6e9d-9dfca0a984ca",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713128080411,
    },
    "e-32": {
      id: "e-32",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-33",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "1acce923-e91f-a078-6e9d-9dfca0a984b5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "1acce923-e91f-a078-6e9d-9dfca0a984b5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713128433468,
    },
    "e-33": {
      id: "e-33",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-32",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "1acce923-e91f-a078-6e9d-9dfca0a984b5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "1acce923-e91f-a078-6e9d-9dfca0a984b5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713128433468,
    },
    "e-34": {
      id: "e-34",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-27",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-35",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "74c29e67-e6f7-21d0-6d2d-a8552a113f50",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "74c29e67-e6f7-21d0-6d2d-a8552a113f50",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713290024827,
    },
    "e-35": {
      id: "e-35",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-34",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "74c29e67-e6f7-21d0-6d2d-a8552a113f50",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "74c29e67-e6f7-21d0-6d2d-a8552a113f50",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713290024828,
    },
    "e-37": {
      id: "e-37",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-36",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66225a5ec72e198e72be35c8",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66225a5ec72e198e72be35c8",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713294490456,
    },
  },
  actionLists: {
    a: {
      id: "a",
      title: "Partner -- Loop -- Logos",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".partner-track",
                  selectorGuids: ["87c4f34a-a9ac-3681-23b2-ade789d1c3cb"],
                },
                xValue: 0,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 40000,
                target: {
                  selector: ".partner-track",
                  selectorGuids: ["87c4f34a-a9ac-3681-23b2-ade789d1c3cb"],
                },
                xValue: -100,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1711916479329,
    },
    "a-2": {
      id: "a-2",
      title: "Hero -- Loaded -- Reveal",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-2-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "66225a5ec72e198e72be35c8|c6ba85c0-557d-994f-ad0e-bd1fb8778848",
                },
                xValue: -100,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-2-n-9",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: { id: "1acce923-e91f-a078-6e9d-9dfca0a984b0" },
                yValue: -100,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
            {
              id: "a-2-n-7",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "66225a5ec72e198e72be35c8|90dcced2-ce08-a8ed-0bbf-262c73bbb59b",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-2-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "66225a5ec72e198e72be35c8|1f40b9dd-ab7b-53b6-0114-1df4f5e7e73b",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-2-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "66225a5ec72e198e72be35c8|1f40b9dd-ab7b-53b6-0114-1df4f5e7e73b",
                },
                yValue: 50,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-2-n-11",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: { id: "1acce923-e91f-a078-6e9d-9dfca0a984b0" },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-2-n-10",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 1000,
                easing: "",
                duration: 0,
                target: { id: "1acce923-e91f-a078-6e9d-9dfca0a984b0" },
                value: "flex",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-2-n-8",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outCirc",
                duration: 2500,
                target: {
                  id: "66225a5ec72e198e72be35c8|90dcced2-ce08-a8ed-0bbf-262c73bbb59b",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-2-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 250,
                easing: "outExpo",
                duration: 3000,
                target: {
                  id: "66225a5ec72e198e72be35c8|c6ba85c0-557d-994f-ad0e-bd1fb8778848",
                },
                xValue: -45,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-2-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 750,
                easing: "outCirc",
                duration: 1000,
                target: {
                  id: "66225a5ec72e198e72be35c8|1f40b9dd-ab7b-53b6-0114-1df4f5e7e73b",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-2-n-6",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 750,
                easing: "outCirc",
                duration: 1000,
                target: {
                  id: "66225a5ec72e198e72be35c8|1f40b9dd-ab7b-53b6-0114-1df4f5e7e73b",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-2-n-12",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1000,
                easing: "inOutCirc",
                duration: 750,
                target: { id: "1acce923-e91f-a078-6e9d-9dfca0a984b0" },
                yValue: 0,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1711917250906,
    },
    "a-3": {
      id: "a-3",
      title: "card -- hover -- shinning",
      continuousParameterGroups: [
        {
          id: "a-3-p",
          type: "MOUSE_X",
          parameterLabel: "Mouse X",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-3-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".card-background-blur-purple",
                      selectorGuids: ["a295ed89-2f06-ad27-7e54-e2cd281f702a"],
                    },
                    xValue: -50,
                    xUnit: "%",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-3-n-5",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".card-background-blur-white",
                      selectorGuids: ["c1eee673-b4b3-065d-d2be-219d9b6b10d1"],
                    },
                    xValue: 100,
                    xUnit: "%",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-3-n-9",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: true,
                      id: "66225a5ec72e198e72be35c8|3f1bec20-1670-de9c-5f66-5b718f9a322b",
                    },
                    xValue: null,
                    yValue: -10,
                    xUnit: "deg",
                    yUnit: "deg",
                    zUnit: "DEG",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-3-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".card-background-blur-purple",
                      selectorGuids: ["a295ed89-2f06-ad27-7e54-e2cd281f702a"],
                    },
                    xValue: 50,
                    xUnit: "%",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-3-n-6",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".card-background-blur-white",
                      selectorGuids: ["c1eee673-b4b3-065d-d2be-219d9b6b10d1"],
                    },
                    xValue: -100,
                    xUnit: "%",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-3-n-10",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: true,
                      id: "66225a5ec72e198e72be35c8|3f1bec20-1670-de9c-5f66-5b718f9a322b",
                    },
                    yValue: 10,
                    xUnit: "DEG",
                    yUnit: "deg",
                    zUnit: "DEG",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "a-3-p-2",
          type: "MOUSE_Y",
          parameterLabel: "Mouse Y",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-3-n-3",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".card-background-blur-purple",
                      selectorGuids: ["a295ed89-2f06-ad27-7e54-e2cd281f702a"],
                    },
                    yValue: -25,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-3-n-7",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".card-background-blur-white",
                      selectorGuids: ["c1eee673-b4b3-065d-d2be-219d9b6b10d1"],
                    },
                    xValue: null,
                    yValue: 50,
                    xUnit: "%",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-3-n-11",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: true,
                      id: "66225a5ec72e198e72be35c8|3f1bec20-1670-de9c-5f66-5b718f9a322b",
                    },
                    xValue: 10,
                    xUnit: "deg",
                    yUnit: "DEG",
                    zUnit: "DEG",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-3-n-4",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".card-background-blur-purple",
                      selectorGuids: ["a295ed89-2f06-ad27-7e54-e2cd281f702a"],
                    },
                    yValue: 25,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-3-n-8",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".card-background-blur-white",
                      selectorGuids: ["c1eee673-b4b3-065d-d2be-219d9b6b10d1"],
                    },
                    xValue: null,
                    yValue: -50,
                    xUnit: "%",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-3-n-12",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: true,
                      id: "66225a5ec72e198e72be35c8|3f1bec20-1670-de9c-5f66-5b718f9a322b",
                    },
                    xValue: -10,
                    xUnit: "deg",
                    yUnit: "DEG",
                    zUnit: "DEG",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1711998824415,
    },
    "a-4": {
      id: "a-4",
      title: "Card -- Hover - IN -- Reveal",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-4-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".card-background",
                  selectorGuids: ["8bb58ad7-c9ae-9872-2695-c91add393015"],
                },
                value: "none",
              },
            },
            {
              id: "a-4-n-11",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".card-container-content-wrap",
                  selectorGuids: ["e06015e5-e4c8-13fb-b17d-9247f69a44a2"],
                },
                heightValue: 35,
                widthUnit: "PX",
                heightUnit: "px",
                locked: false,
              },
            },
            {
              id: "a-4-n-5",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".link-button",
                  selectorGuids: ["06d02afd-e09a-e3d3-d8fa-a1b00009ff21"],
                },
                xValue: 0,
                yValue: 0,
                locked: true,
              },
            },
            {
              id: "a-4-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".p2",
                  selectorGuids: ["20a8b48e-352d-9218-ee67-250a82496b81"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-4-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".card-background",
                  selectorGuids: ["8bb58ad7-c9ae-9872-2695-c91add393015"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-4-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".card-background",
                  selectorGuids: ["8bb58ad7-c9ae-9872-2695-c91add393015"],
                },
                value: "flex",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-4-n-10",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outCirc",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".card-background",
                  selectorGuids: ["8bb58ad7-c9ae-9872-2695-c91add393015"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-4-n-12",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".card-container-content-wrap",
                  selectorGuids: ["e06015e5-e4c8-13fb-b17d-9247f69a44a2"],
                },
                widthUnit: "PX",
                heightUnit: "AUTO",
                locked: false,
              },
            },
            {
              id: "a-4-n-8",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outCirc",
                duration: 1000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".p2",
                  selectorGuids: ["20a8b48e-352d-9218-ee67-250a82496b81"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-4-n-7",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "outSine",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".link-button",
                  selectorGuids: ["06d02afd-e09a-e3d3-d8fa-a1b00009ff21"],
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1712000628038,
    },
    "a-5": {
      id: "a-5",
      title: "Card -- Hover - OUT -- Reveal",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-5-n-2",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "inOutCirc",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".card-container-content-wrap",
                  selectorGuids: ["e06015e5-e4c8-13fb-b17d-9247f69a44a2"],
                },
                heightValue: 35,
                widthUnit: "PX",
                heightUnit: "px",
                locked: false,
              },
            },
            {
              id: "a-5-n-3",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "inCirc",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".link-button",
                  selectorGuids: ["06d02afd-e09a-e3d3-d8fa-a1b00009ff21"],
                },
                xValue: 0,
                yValue: 0,
                locked: true,
              },
            },
            {
              id: "a-5-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "inOutCirc",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".p2",
                  selectorGuids: ["20a8b48e-352d-9218-ee67-250a82496b81"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-5-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "inOutCirc",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".card-background",
                  selectorGuids: ["8bb58ad7-c9ae-9872-2695-c91add393015"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-5-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".card-background",
                  selectorGuids: ["8bb58ad7-c9ae-9872-2695-c91add393015"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1712000628038,
    },
    "a-6": {
      id: "a-6",
      title: "vision -- scroll -- web",
      continuousParameterGroups: [
        {
          id: "a-6-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 1,
              actionItems: [
                {
                  id: "a-6-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".vision-hero",
                      selectorGuids: ["59514799-58a1-a5ea-1cba-ba50390bcb47"],
                    },
                    xValue: 0,
                    xUnit: "%",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 20,
              actionItems: [
                {
                  id: "a-6-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".vision-hero",
                      selectorGuids: ["59514799-58a1-a5ea-1cba-ba50390bcb47"],
                    },
                    xValue: -100,
                    xUnit: "%",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 60,
              actionItems: [
                {
                  id: "a-6-n-3",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".vision-circle",
                      selectorGuids: ["33dec181-ef7b-0da9-8483-f25a73556e9a"],
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-6-n-5",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".vision-circle",
                      selectorGuids: ["33dec181-ef7b-0da9-8483-f25a73556e9a"],
                    },
                    xValue: 1.2,
                    yValue: 1.2,
                    locked: true,
                  },
                },
              ],
            },
            {
              keyframe: 80,
              actionItems: [
                {
                  id: "a-6-n-4",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".vision-circle",
                      selectorGuids: ["33dec181-ef7b-0da9-8483-f25a73556e9a"],
                    },
                    yValue: 100,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-6-n-6",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".vision-circle",
                      selectorGuids: ["33dec181-ef7b-0da9-8483-f25a73556e9a"],
                    },
                    xValue: 0.7,
                    yValue: 0.7,
                    locked: true,
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1712345455243,
    },
    "a-7": {
      id: "a-7",
      title: "vision -- slide -- reveal",
      continuousParameterGroups: [
        {
          id: "a-7-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-7-n",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".vision-section-heading-wrap.is-section",
                      selectorGuids: [
                        "eec23193-c096-87a2-d05b-3130a5a90c6e",
                        "8ee84dc3-52e3-ad80-6ed9-cd16181ff7dc",
                      ],
                    },
                    xValue: 0.7,
                    yValue: 0.7,
                    locked: true,
                  },
                },
                {
                  id: "a-7-n-3",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".vision-section-heading-wrap.is-section",
                      selectorGuids: [
                        "eec23193-c096-87a2-d05b-3130a5a90c6e",
                        "8ee84dc3-52e3-ad80-6ed9-cd16181ff7dc",
                      ],
                    },
                    value: 0,
                    unit: "",
                  },
                },
              ],
            },
            {
              keyframe: 25,
              actionItems: [
                {
                  id: "a-7-n-4",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".vision-section-heading-wrap.is-section",
                      selectorGuids: [
                        "eec23193-c096-87a2-d05b-3130a5a90c6e",
                        "8ee84dc3-52e3-ad80-6ed9-cd16181ff7dc",
                      ],
                    },
                    value: 1,
                    unit: "",
                  },
                },
                {
                  id: "a-7-n-2",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".vision-section-heading-wrap.is-section",
                      selectorGuids: [
                        "eec23193-c096-87a2-d05b-3130a5a90c6e",
                        "8ee84dc3-52e3-ad80-6ed9-cd16181ff7dc",
                      ],
                    },
                    xValue: 1,
                    yValue: 1,
                    locked: true,
                  },
                },
              ],
            },
            {
              keyframe: 50,
              actionItems: [
                {
                  id: "a-7-n-6",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".vision-section-heading-wrap.is-section",
                      selectorGuids: [
                        "eec23193-c096-87a2-d05b-3130a5a90c6e",
                        "8ee84dc3-52e3-ad80-6ed9-cd16181ff7dc",
                      ],
                    },
                    value: 1,
                    unit: "",
                  },
                },
                {
                  id: "a-7-n-7",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".vision-section-heading-wrap.is-section",
                      selectorGuids: [
                        "eec23193-c096-87a2-d05b-3130a5a90c6e",
                        "8ee84dc3-52e3-ad80-6ed9-cd16181ff7dc",
                      ],
                    },
                    xValue: 1,
                    yValue: 1,
                    locked: true,
                  },
                },
              ],
            },
            {
              keyframe: 75,
              actionItems: [
                {
                  id: "a-7-n-5",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".vision-section-heading-wrap.is-section",
                      selectorGuids: [
                        "eec23193-c096-87a2-d05b-3130a5a90c6e",
                        "8ee84dc3-52e3-ad80-6ed9-cd16181ff7dc",
                      ],
                    },
                    value: 0.5,
                    unit: "",
                  },
                },
                {
                  id: "a-7-n-8",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".vision-section-heading-wrap.is-section",
                      selectorGuids: [
                        "eec23193-c096-87a2-d05b-3130a5a90c6e",
                        "8ee84dc3-52e3-ad80-6ed9-cd16181ff7dc",
                      ],
                    },
                    xValue: 0.7,
                    yValue: 0.7,
                    locked: true,
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1712346455769,
    },
    "a-8": {
      id: "a-8",
      title: "brand -- HOVER IN -- Open",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-8-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".brand-wrap-division-background",
                  selectorGuids: ["48fe070e-f4c8-d9e2-29ef-9dfe3b7ff8a7"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-8-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".brand-wrap-container-logo",
                  selectorGuids: ["6c22865d-e2d3-8ab7-c85b-48e52b90a7fc"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-8-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".brand-wrap-division-heading-wrap",
                  selectorGuids: ["deed128e-3f8e-0dc9-0e74-218eca04a9d5"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-8-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".p2",
                  selectorGuids: ["20a8b48e-352d-9218-ee67-250a82496b81"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-8-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".p2",
                  selectorGuids: ["20a8b48e-352d-9218-ee67-250a82496b81"],
                },
                yValue: -30,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-8-n-6",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".brand-wrap-division-background",
                  selectorGuids: ["48fe070e-f4c8-d9e2-29ef-9dfe3b7ff8a7"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-8-n-10",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".p2",
                  selectorGuids: ["20a8b48e-352d-9218-ee67-250a82496b81"],
                },
                yValue: -30,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-8-n-8",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".brand-wrap-division-heading-wrap",
                  selectorGuids: ["deed128e-3f8e-0dc9-0e74-218eca04a9d5"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-8-n-7",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outCirc",
                duration: 1000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".brand-wrap-container-logo",
                  selectorGuids: ["6c22865d-e2d3-8ab7-c85b-48e52b90a7fc"],
                },
                yValue: 650,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
            {
              id: "a-8-n-9",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 500,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".p2",
                  selectorGuids: ["20a8b48e-352d-9218-ee67-250a82496b81"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1712403198117,
    },
    "a-9": {
      id: "a-9",
      title: "brand -- HOVER OUT -- Close",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-9-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outCirc",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".brand-wrap-division-background",
                  selectorGuids: ["48fe070e-f4c8-d9e2-29ef-9dfe3b7ff8a7"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-9-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outCirc",
                duration: 1000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".brand-wrap-container-logo",
                  selectorGuids: ["6c22865d-e2d3-8ab7-c85b-48e52b90a7fc"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
            {
              id: "a-9-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outCirc",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".brand-wrap-division-heading-wrap",
                  selectorGuids: ["deed128e-3f8e-0dc9-0e74-218eca04a9d5"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-9-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outCirc",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".p2",
                  selectorGuids: ["20a8b48e-352d-9218-ee67-250a82496b81"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-9-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outCirc",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".p2",
                  selectorGuids: ["20a8b48e-352d-9218-ee67-250a82496b81"],
                },
                yValue: -30,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1712403198117,
    },
    "a-10": {
      id: "a-10",
      title: "List Item -- Hover - Face",
      continuousParameterGroups: [
        {
          id: "a-10-p",
          type: "MOUSE_X",
          parameterLabel: "Mouse X",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-10-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".team-list-image",
                      selectorGuids: ["638111ac-2089-d921-e50c-22c7cc8fab14"],
                    },
                    xValue: -100,
                    yValue: null,
                    xUnit: "%",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-10-n-3",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".team-list-image",
                      selectorGuids: ["638111ac-2089-d921-e50c-22c7cc8fab14"],
                    },
                    xValue: null,
                    zValue: -32,
                    xUnit: "deg",
                    yUnit: "DEG",
                    zUnit: "deg",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-10-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".team-list-image",
                      selectorGuids: ["638111ac-2089-d921-e50c-22c7cc8fab14"],
                    },
                    xValue: 100,
                    yValue: null,
                    xUnit: "%",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-10-n-4",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".team-list-image",
                      selectorGuids: ["638111ac-2089-d921-e50c-22c7cc8fab14"],
                    },
                    xValue: null,
                    zValue: 16,
                    xUnit: "deg",
                    yUnit: "DEG",
                    zUnit: "deg",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "a-10-p-2",
          type: "MOUSE_Y",
          parameterLabel: "Mouse Y",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-10-n-5",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".team-list-image",
                      selectorGuids: ["638111ac-2089-d921-e50c-22c7cc8fab14"],
                    },
                    yValue: -50,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-10-n-6",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".team-list-image",
                      selectorGuids: ["638111ac-2089-d921-e50c-22c7cc8fab14"],
                    },
                    yValue: 50,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1712409200109,
    },
    "a-11": {
      id: "a-11",
      title: "List Team -- HOVER IN -- Reveal",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-11-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".team-list-image",
                  selectorGuids: ["638111ac-2089-d921-e50c-22c7cc8fab14"],
                },
                xValue: 0,
                yValue: 0,
                locked: true,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-11-n-2",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "outCirc",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".team-list-image",
                  selectorGuids: ["638111ac-2089-d921-e50c-22c7cc8fab14"],
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1712409362826,
    },
    "a-12": {
      id: "a-12",
      title: "List Team -- HOVER OUT -- Reveal",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-12-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "inOutCirc",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".team-list-image",
                  selectorGuids: ["638111ac-2089-d921-e50c-22c7cc8fab14"],
                },
                xValue: 0,
                yValue: 0,
                locked: true,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1712409362826,
    },
    "a-13": {
      id: "a-13",
      title: "brand -- scroll -- reveal",
      continuousParameterGroups: [
        {
          id: "a-13-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 10,
              actionItems: [
                {
                  id: "a-13-n",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".brand-wrap-division-background",
                      selectorGuids: ["48fe070e-f4c8-d9e2-29ef-9dfe3b7ff8a7"],
                    },
                    value: 0,
                    unit: "",
                  },
                },
                {
                  id: "a-13-n-5",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".p2",
                      selectorGuids: ["20a8b48e-352d-9218-ee67-250a82496b81"],
                    },
                    value: 0,
                    unit: "",
                  },
                },
                {
                  id: "a-13-n-9",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".brand-wrap-division-heading-wrap",
                      selectorGuids: ["deed128e-3f8e-0dc9-0e74-218eca04a9d5"],
                    },
                    yValue: 40,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 30,
              actionItems: [
                {
                  id: "a-13-n-3",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".brand-wrap-division-background",
                      selectorGuids: ["48fe070e-f4c8-d9e2-29ef-9dfe3b7ff8a7"],
                    },
                    value: 1,
                    unit: "",
                  },
                },
                {
                  id: "a-13-n-6",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".p2",
                      selectorGuids: ["20a8b48e-352d-9218-ee67-250a82496b81"],
                    },
                    value: 1,
                    unit: "",
                  },
                },
                {
                  id: "a-13-n-10",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".brand-wrap-division-heading-wrap",
                      selectorGuids: ["deed128e-3f8e-0dc9-0e74-218eca04a9d5"],
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 70,
              actionItems: [
                {
                  id: "a-13-n-4",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".brand-wrap-division-background",
                      selectorGuids: ["48fe070e-f4c8-d9e2-29ef-9dfe3b7ff8a7"],
                    },
                    value: 1,
                    unit: "",
                  },
                },
                {
                  id: "a-13-n-7",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".p2",
                      selectorGuids: ["20a8b48e-352d-9218-ee67-250a82496b81"],
                    },
                    value: 1,
                    unit: "",
                  },
                },
                {
                  id: "a-13-n-12",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".brand-wrap-division-heading-wrap",
                      selectorGuids: ["deed128e-3f8e-0dc9-0e74-218eca04a9d5"],
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 90,
              actionItems: [
                {
                  id: "a-13-n-2",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".brand-wrap-division-background",
                      selectorGuids: ["48fe070e-f4c8-d9e2-29ef-9dfe3b7ff8a7"],
                    },
                    value: 0,
                    unit: "",
                  },
                },
                {
                  id: "a-13-n-8",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".p2",
                      selectorGuids: ["20a8b48e-352d-9218-ee67-250a82496b81"],
                    },
                    value: 0,
                    unit: "",
                  },
                },
                {
                  id: "a-13-n-11",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".brand-wrap-division-heading-wrap",
                      selectorGuids: ["deed128e-3f8e-0dc9-0e74-218eca04a9d5"],
                    },
                    yValue: 40,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1712410189315,
    },
    "a-14": {
      id: "a-14",
      title: "footer -- scroll -- reveal",
      continuousParameterGroups: [
        {
          id: "a-14-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-14-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".footer-container-division-base",
                      selectorGuids: ["5febb4ed-ea71-06b4-ec63-c142b3869427"],
                    },
                    yValue: -100,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 75,
              actionItems: [
                {
                  id: "a-14-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".footer-container-division-base",
                      selectorGuids: ["5febb4ed-ea71-06b4-ec63-c142b3869427"],
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1712417778837,
    },
    "a-15": {
      id: "a-15",
      title: "news -- scroll -- image",
      continuousParameterGroups: [
        {
          id: "a-15-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-15-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".news-image-item",
                      selectorGuids: ["8b630beb-4b6c-cd80-4a26-335cf635739a"],
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-15-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".news-image-item",
                      selectorGuids: ["8b630beb-4b6c-cd80-4a26-335cf635739a"],
                    },
                    yValue: -100,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1712859993805,
    },
    "a-16": {
      id: "a-16",
      title: "Sub Hero -- Load -- IN",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-16-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".sub-hero-heading",
                  selectorGuids: ["5e6025b9-7e82-9848-b270-026ede0fbd69"],
                },
                yValue: 300,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-16-n-3",
              actionTypeId: "TRANSFORM_SKEW",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".sub-hero-heading",
                  selectorGuids: ["5e6025b9-7e82-9848-b270-026ede0fbd69"],
                },
                yValue: 10,
                xUnit: "DEG",
                yUnit: "deg",
                zUnit: "DEG",
              },
            },
            {
              id: "a-16-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".sub-heading.is-sub-hero",
                  selectorGuids: [
                    "ecf0767b-1892-7134-177b-7756af537b68",
                    "23a34173-1855-527d-2ce7-b7bac7a24d90",
                  ],
                },
                yValue: 300,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-16-n-6",
              actionTypeId: "TRANSFORM_SKEW",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".sub-heading.is-sub-hero",
                  selectorGuids: [
                    "ecf0767b-1892-7134-177b-7756af537b68",
                    "23a34173-1855-527d-2ce7-b7bac7a24d90",
                  ],
                },
                yValue: 10,
                xUnit: "DEG",
                yUnit: "deg",
                zUnit: "DEG",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-16-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outCirc",
                duration: 1500,
                target: {
                  selector: ".sub-hero-heading",
                  selectorGuids: ["5e6025b9-7e82-9848-b270-026ede0fbd69"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-16-n-4",
              actionTypeId: "TRANSFORM_SKEW",
              config: {
                delay: 0,
                easing: "outCirc",
                duration: 1500,
                target: {
                  selector: ".sub-hero-heading",
                  selectorGuids: ["5e6025b9-7e82-9848-b270-026ede0fbd69"],
                },
                yValue: 0,
                xUnit: "DEG",
                yUnit: "deg",
                zUnit: "DEG",
              },
            },
            {
              id: "a-16-n-7",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 200,
                easing: "outCirc",
                duration: 1500,
                target: {
                  selector: ".sub-heading.is-sub-hero",
                  selectorGuids: [
                    "ecf0767b-1892-7134-177b-7756af537b68",
                    "23a34173-1855-527d-2ce7-b7bac7a24d90",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-16-n-8",
              actionTypeId: "TRANSFORM_SKEW",
              config: {
                delay: 200,
                easing: "outCirc",
                duration: 1500,
                target: {
                  selector: ".sub-heading.is-sub-hero",
                  selectorGuids: [
                    "ecf0767b-1892-7134-177b-7756af537b68",
                    "23a34173-1855-527d-2ce7-b7bac7a24d90",
                  ],
                },
                yValue: 0,
                xUnit: "DEG",
                yUnit: "deg",
                zUnit: "DEG",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1712863233331,
    },
    "a-17": {
      id: "a-17",
      title: "Nav Circle -- PAD -- IN",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-17-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: { id: "ff03b839-2652-1a8b-37ab-15d08e488b46" },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-17-n-5",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: { id: "ff03b839-2652-1a8b-37ab-15d08e488b46" },
                zValue: 45,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-17-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outCirc",
                duration: 200,
                target: { id: "ff03b839-2652-1a8b-37ab-15d08e488b46" },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-17-n-6",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "outCirc",
                duration: 500,
                target: { id: "ff03b839-2652-1a8b-37ab-15d08e488b46" },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1713118647687,
    },
    "a-18": {
      id: "a-18",
      title: "Nav Circle -- PAD -- OUT",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-18-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: { id: "ff03b839-2652-1a8b-37ab-15d08e488b46" },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-18-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: { id: "ff03b839-2652-1a8b-37ab-15d08e488b46" },
                zValue: 45,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1713118647687,
    },
    "a-19": {
      id: "a-19",
      title: "Nav Circle -- VEN -- IN",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-19-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: { id: "2bcc33e9-00af-06ba-11af-2f0b98b5accc" },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-19-n-3",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: { id: "2bcc33e9-00af-06ba-11af-2f0b98b5accc" },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-19-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: { id: "2bcc33e9-00af-06ba-11af-2f0b98b5accc" },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-19-n-4",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: { id: "2bcc33e9-00af-06ba-11af-2f0b98b5accc" },
                zValue: 45,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1713118647687,
    },
    "a-20": {
      id: "a-20",
      title: "Nav Circle -- VEN -- OUT",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-20-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outCirc",
                duration: 200,
                target: { id: "2bcc33e9-00af-06ba-11af-2f0b98b5accc" },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-20-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "outCirc",
                duration: 500,
                target: { id: "2bcc33e9-00af-06ba-11af-2f0b98b5accc" },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1713118647687,
    },
    "a-21": {
      id: "a-21",
      title: "Nav Circle -- UNI -- IN",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-21-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: { id: "76a14c6a-1d8a-0118-0b53-af3f046491fe" },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-21-n-3",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: { id: "76a14c6a-1d8a-0118-0b53-af3f046491fe" },
                zValue: -45,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-21-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outCirc",
                duration: 200,
                target: { id: "76a14c6a-1d8a-0118-0b53-af3f046491fe" },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-21-n-4",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "outCirc",
                duration: 500,
                target: { id: "76a14c6a-1d8a-0118-0b53-af3f046491fe" },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1713118647687,
    },
    "a-22": {
      id: "a-22",
      title: "Nav Circle -- UNI -- OUT",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-22-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: { id: "76a14c6a-1d8a-0118-0b53-af3f046491fe" },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-22-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: { id: "76a14c6a-1d8a-0118-0b53-af3f046491fe" },
                zValue: -45,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1713118647687,
    },
    "a-23": {
      id: "a-23",
      title: "Nav Circle -- GRO -- IN",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-23-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: { id: "0b54ce49-eda6-a5a4-9785-f85f07578594" },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-23-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: { id: "0b54ce49-eda6-a5a4-9785-f85f07578594" },
                zValue: 45,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-23-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outCirc",
                duration: 200,
                target: { id: "0b54ce49-eda6-a5a4-9785-f85f07578594" },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-23-n-4",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "outCirc",
                duration: 500,
                target: { id: "0b54ce49-eda6-a5a4-9785-f85f07578594" },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1713118647687,
    },
    "a-24": {
      id: "a-24",
      title: "Nav Circle -- GRO -- OUT",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-24-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: { id: "0b54ce49-eda6-a5a4-9785-f85f07578594" },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-24-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: { id: "0b54ce49-eda6-a5a4-9785-f85f07578594" },
                zValue: 45,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1713118647687,
    },
    "a-25": {
      id: "a-25",
      title: "Nav Modal -- HOVER - IN",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-25-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".brands-wrap",
                  selectorGuids: ["49612cca-0328-4c9c-9353-f4d51654b362"],
                },
                yValue: 50,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-25-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".brands-wrap",
                  selectorGuids: ["49612cca-0328-4c9c-9353-f4d51654b362"],
                },
                value: "none",
              },
            },
            {
              id: "a-25-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".brands-wrap",
                  selectorGuids: ["49612cca-0328-4c9c-9353-f4d51654b362"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-25-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".brands-wrap",
                  selectorGuids: ["49612cca-0328-4c9c-9353-f4d51654b362"],
                },
                value: "flex",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-25-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 500,
                target: {
                  selector: ".brands-wrap",
                  selectorGuids: ["49612cca-0328-4c9c-9353-f4d51654b362"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-25-n-6",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outCirc",
                duration: 500,
                target: {
                  selector: ".brands-wrap",
                  selectorGuids: ["49612cca-0328-4c9c-9353-f4d51654b362"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1713128436438,
    },
    "a-26": {
      id: "a-26",
      title: "Nav Modal -- HOVER - OUT",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-26-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 250,
                easing: "outCirc",
                duration: 200,
                target: {
                  selector: ".brands-wrap",
                  selectorGuids: ["49612cca-0328-4c9c-9353-f4d51654b362"],
                },
                yValue: 50,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-26-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 250,
                easing: "outCirc",
                duration: 200,
                target: {
                  selector: ".brands-wrap",
                  selectorGuids: ["49612cca-0328-4c9c-9353-f4d51654b362"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-26-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "outCirc",
                duration: 0,
                target: {
                  selector: ".brands-wrap",
                  selectorGuids: ["49612cca-0328-4c9c-9353-f4d51654b362"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1713128436438,
    },
    "a-27": {
      id: "a-27",
      title: "Navigation Burger -- CLICK -- OPEN",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-27-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".burger-line.is-second",
                  selectorGuids: [
                    "4ff6ec5e-ad1c-7f4d-bd6c-ec7e5fa44a6c",
                    "b9ac39df-541c-7872-ceb5-939939734489",
                  ],
                },
                widthValue: 15,
                widthUnit: "px",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-27-n-19",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".navigation-menu-item",
                  selectorGuids: ["c9007bb0-8099-ae1b-5025-e7a0fd0326e0"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-27-n-17",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".navigation-menu-item",
                  selectorGuids: ["c9007bb0-8099-ae1b-5025-e7a0fd0326e0"],
                },
                yValue: 50,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-27-n-15",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".navigation",
                  selectorGuids: ["615731d6-3f27-6acc-7e12-80162721b7b4"],
                },
                globalSwatchId: "",
                rValue: 0,
                bValue: 0,
                gValue: 0,
                aValue: 0.1,
              },
            },
            {
              id: "a-27-n-12",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".navigation-menu",
                  selectorGuids: ["9d28584c-0293-de18-3854-747b2162b924"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-27-n-11",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".navigation-menu",
                  selectorGuids: ["9d28584c-0293-de18-3854-747b2162b924"],
                },
                value: "none",
              },
            },
            {
              id: "a-27-n-7",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".burger-line",
                  selectorGuids: ["4ff6ec5e-ad1c-7f4d-bd6c-ec7e5fa44a6c"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-27-n-6",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".burger-line.is-second",
                  selectorGuids: [
                    "4ff6ec5e-ad1c-7f4d-bd6c-ec7e5fa44a6c",
                    "b9ac39df-541c-7872-ceb5-939939734489",
                  ],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-27-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".burger-line",
                  selectorGuids: ["4ff6ec5e-ad1c-7f4d-bd6c-ec7e5fa44a6c"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-27-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".burger-line.is-second",
                  selectorGuids: [
                    "4ff6ec5e-ad1c-7f4d-bd6c-ec7e5fa44a6c",
                    "b9ac39df-541c-7872-ceb5-939939734489",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-27-n-10",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "outCirc",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".burger-line.is-second",
                  selectorGuids: [
                    "4ff6ec5e-ad1c-7f4d-bd6c-ec7e5fa44a6c",
                    "b9ac39df-541c-7872-ceb5-939939734489",
                  ],
                },
                widthValue: 30,
                widthUnit: "px",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-27-n-14",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".navigation-menu",
                  selectorGuids: ["9d28584c-0293-de18-3854-747b2162b924"],
                },
                value: "flex",
              },
            },
            {
              id: "a-27-n-13",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outCirc",
                duration: 500,
                target: {
                  selector: ".navigation-menu",
                  selectorGuids: ["9d28584c-0293-de18-3854-747b2162b924"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-27-n-16",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".navigation",
                  selectorGuids: ["615731d6-3f27-6acc-7e12-80162721b7b4"],
                },
                globalSwatchId: "",
                rValue: 0,
                bValue: 0,
                gValue: 0,
                aValue: 0.75,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-27-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "inOutCirc",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".burger-line",
                  selectorGuids: ["4ff6ec5e-ad1c-7f4d-bd6c-ec7e5fa44a6c"],
                },
                yValue: 4.5,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-27-n-20",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 500,
                target: {
                  selector: ".navigation-menu-item",
                  selectorGuids: ["c9007bb0-8099-ae1b-5025-e7a0fd0326e0"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-27-n-18",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 1000,
                target: {
                  selector: ".navigation-menu-item",
                  selectorGuids: ["c9007bb0-8099-ae1b-5025-e7a0fd0326e0"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-27-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "inOutCirc",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".burger-line.is-second",
                  selectorGuids: [
                    "4ff6ec5e-ad1c-7f4d-bd6c-ec7e5fa44a6c",
                    "b9ac39df-541c-7872-ceb5-939939734489",
                  ],
                },
                yValue: -4.5,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-27-n-8",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "inOutCirc",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".burger-line",
                  selectorGuids: ["4ff6ec5e-ad1c-7f4d-bd6c-ec7e5fa44a6c"],
                },
                zValue: -45,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-27-n-9",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "inOutCirc",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".burger-line.is-second",
                  selectorGuids: [
                    "4ff6ec5e-ad1c-7f4d-bd6c-ec7e5fa44a6c",
                    "b9ac39df-541c-7872-ceb5-939939734489",
                  ],
                },
                zValue: 45,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1713290027602,
    },
    "a-28": {
      id: "a-28",
      title: "Navigation Burger -- CLICK -- CLOSE",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-28-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "outCirc",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".burger-line.is-second",
                  selectorGuids: [
                    "4ff6ec5e-ad1c-7f4d-bd6c-ec7e5fa44a6c",
                    "b9ac39df-541c-7872-ceb5-939939734489",
                  ],
                },
                widthValue: 15,
                widthUnit: "px",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-28-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outCirc",
                duration: 500,
                target: {
                  selector: ".navigation-menu-item",
                  selectorGuids: ["c9007bb0-8099-ae1b-5025-e7a0fd0326e0"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-28-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outCirc",
                duration: 500,
                target: {
                  selector: ".navigation-menu-item",
                  selectorGuids: ["c9007bb0-8099-ae1b-5025-e7a0fd0326e0"],
                },
                yValue: 50,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-28-n-4",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "outCirc",
                duration: 500,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".navigation",
                  selectorGuids: ["615731d6-3f27-6acc-7e12-80162721b7b4"],
                },
                globalSwatchId: "",
                rValue: 0,
                bValue: 0,
                gValue: 0,
                aValue: 0.1,
              },
            },
            {
              id: "a-28-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outCirc",
                duration: 500,
                target: {
                  selector: ".navigation-menu",
                  selectorGuids: ["9d28584c-0293-de18-3854-747b2162b924"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-28-n-7",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "outCirc",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".burger-line",
                  selectorGuids: ["4ff6ec5e-ad1c-7f4d-bd6c-ec7e5fa44a6c"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-28-n-8",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "outCirc",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".burger-line.is-second",
                  selectorGuids: [
                    "4ff6ec5e-ad1c-7f4d-bd6c-ec7e5fa44a6c",
                    "b9ac39df-541c-7872-ceb5-939939734489",
                  ],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-28-n-9",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outCirc",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".burger-line",
                  selectorGuids: ["4ff6ec5e-ad1c-7f4d-bd6c-ec7e5fa44a6c"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-28-n-10",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outCirc",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".burger-line.is-second",
                  selectorGuids: [
                    "4ff6ec5e-ad1c-7f4d-bd6c-ec7e5fa44a6c",
                    "b9ac39df-541c-7872-ceb5-939939734489",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-28-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".navigation-menu",
                  selectorGuids: ["9d28584c-0293-de18-3854-747b2162b924"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1713290027602,
    },
    "a-29": {
      id: "a-29",
      title: "LOAD",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-29-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".loading-wrap",
                  selectorGuids: ["b26bacf2-2c61-4cec-4575-7854e2f606a5"],
                },
                value: "flex",
              },
            },
            {
              id: "a-29-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".loading-wrap",
                  selectorGuids: ["b26bacf2-2c61-4cec-4575-7854e2f606a5"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-29-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 500,
                easing: "outCirc",
                duration: 500,
                target: {
                  selector: ".loading-wrap",
                  selectorGuids: ["b26bacf2-2c61-4cec-4575-7854e2f606a5"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-29-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 500,
                easing: "",
                duration: 0,
                target: {
                  selector: ".loading-wrap",
                  selectorGuids: ["b26bacf2-2c61-4cec-4575-7854e2f606a5"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1713294498219,
    },
  },
  site: {
    mediaQueries: [
      { key: "main", min: 992, max: 10000 },
      { key: "medium", min: 768, max: 991 },
      { key: "small", min: 480, max: 767 },
      { key: "tiny", min: 0, max: 479 },
    ],
  },
});
