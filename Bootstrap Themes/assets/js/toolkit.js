if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
+function (t) {
    var e = jQuery.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1 || e[0] >= 4) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
}(), function () {
    "use strict";

    function t(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function e(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }

    function i(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t
    } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }, s = function () {
        function t(t, e) {
            for (var i = 0; i < e.length; i++) {
                var n = e[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
            }
        }

        return function (e, i, n) {
            return i && t(e.prototype, i), n && t(e, n), e
        }
    }(), a = function (t) {
        function e(t) {
            return {}.toString.call(t).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
        }

        function i(t) {
            return (t[0] || t).nodeType
        }

        function n() {
            return {
                bindType: o.end, delegateType: o.end, handle: function (e) {
                    if (t(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
                }
            }
        }

        function s() {
            if (window.QUnit) return !1;
            var t = document.createElement("bootstrap");
            for (var e in r) if (void 0 !== t.style[e]) return {end: r[e]};
            return !1
        }

        function a(e) {
            var i = this, n = !1;
            return t(this).one(l.TRANSITION_END, function () {
                n = !0
            }), setTimeout(function () {
                n || l.triggerTransitionEnd(i)
            }, e), this
        }

        var o = !1, r = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        }, l = {
            TRANSITION_END: "bsTransitionEnd", getUID: function (t) {
                do {
                    t += ~~(1e6 * Math.random())
                } while (document.getElementById(t));
                return t
            }, getSelectorFromElement: function (e) {
                var i = e.getAttribute("data-target");
                i && "#" !== i || (i = e.getAttribute("href") || "");
                try {
                    return t(i).length > 0 ? i : null
                } catch (t) {
                    return null
                }
            }, reflow: function (t) {
                return t.offsetHeight
            }, triggerTransitionEnd: function (e) {
                t(e).trigger(o.end)
            }, supportsTransitionEnd: function () {
                return Boolean(o)
            }, typeCheckConfig: function (t, n, s) {
                for (var a in s) if (s.hasOwnProperty(a)) {
                    var o = s[a], r = n[a], l = r && i(r) ? "element" : e(r);
                    if (!new RegExp(o).test(l)) throw new Error(t.toUpperCase() + ': Option "' + a + '" provided type "' + l + '" but expected type "' + o + '".')
                }
            }
        };
        return o = s(), t.fn.emulateTransitionEnd = a, l.supportsTransitionEnd() && (t.event.special[l.TRANSITION_END] = n()), l
    }(jQuery), o = (function (t) {
        var e = "alert", n = t.fn[e], o = {DISMISS: '[data-dismiss="alert"]'},
            r = {CLOSE: "close.bs.alert", CLOSED: "closed.bs.alert", CLICK_DATA_API: "click.bs.alert.data-api"},
            l = {ALERT: "alert", FADE: "fade", SHOW: "show"}, h = function () {
                function e(t) {
                    i(this, e), this._element = t
                }

                return e.prototype.close = function (t) {
                    t = t || this._element;
                    var e = this._getRootElement(t);
                    this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
                }, e.prototype.dispose = function () {
                    t.removeData(this._element, "bs.alert"), this._element = null
                }, e.prototype._getRootElement = function (e) {
                    var i = a.getSelectorFromElement(e), n = !1;
                    return i && (n = t(i)[0]), n || (n = t(e).closest("." + l.ALERT)[0]), n
                }, e.prototype._triggerCloseEvent = function (e) {
                    var i = t.Event(r.CLOSE);
                    return t(e).trigger(i), i
                }, e.prototype._removeElement = function (e) {
                    var i = this;
                    t(e).removeClass(l.SHOW), a.supportsTransitionEnd() && t(e).hasClass(l.FADE) ? t(e).one(a.TRANSITION_END, function (t) {
                        return i._destroyElement(e, t)
                    }).emulateTransitionEnd(150) : this._destroyElement(e)
                }, e.prototype._destroyElement = function (e) {
                    t(e).detach().trigger(r.CLOSED).remove()
                }, e._jQueryInterface = function (i) {
                    return this.each(function () {
                        var n = t(this), s = n.data("bs.alert");
                        s || (s = new e(this), n.data("bs.alert", s)), "close" === i && s[i](this)
                    })
                }, e._handleDismiss = function (t) {
                    return function (e) {
                        e && e.preventDefault(), t.close(this)
                    }
                }, s(e, null, [{
                    key: "VERSION", get: function () {
                        return "4.0.0-beta"
                    }
                }]), e
            }();
        t(document).on(r.CLICK_DATA_API, o.DISMISS, h._handleDismiss(new h)), t.fn[e] = h._jQueryInterface, t.fn[e].Constructor = h, t.fn[e].noConflict = function () {
            return t.fn[e] = n, h._jQueryInterface
        }
    }(jQuery), function (t) {
        var e = "button", n = t.fn[e], a = {ACTIVE: "active", BUTTON: "btn", FOCUS: "focus"}, o = {
            DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
            DATA_TOGGLE: '[data-toggle="buttons"]',
            INPUT: "input",
            ACTIVE: ".active",
            BUTTON: ".btn"
        }, r = {
            CLICK_DATA_API: "click.bs.button.data-api",
            FOCUS_BLUR_DATA_API: "focus.bs.button.data-api blur.bs.button.data-api"
        }, l = function () {
            function e(t) {
                i(this, e), this._element = t
            }

            return e.prototype.toggle = function () {
                var e = !0, i = !0, n = t(this._element).closest(o.DATA_TOGGLE)[0];
                if (n) {
                    var s = t(this._element).find(o.INPUT)[0];
                    if (s) {
                        if ("radio" === s.type) if (s.checked && t(this._element).hasClass(a.ACTIVE)) e = !1; else {
                            var r = t(n).find(o.ACTIVE)[0];
                            r && t(r).removeClass(a.ACTIVE)
                        }
                        if (e) {
                            if (s.hasAttribute("disabled") || n.hasAttribute("disabled") || s.classList.contains("disabled") || n.classList.contains("disabled")) return;
                            s.checked = !t(this._element).hasClass(a.ACTIVE), t(s).trigger("change")
                        }
                        s.focus(), i = !1
                    }
                }
                i && this._element.setAttribute("aria-pressed", !t(this._element).hasClass(a.ACTIVE)), e && t(this._element).toggleClass(a.ACTIVE)
            }, e.prototype.dispose = function () {
                t.removeData(this._element, "bs.button"), this._element = null
            }, e._jQueryInterface = function (i) {
                return this.each(function () {
                    var n = t(this).data("bs.button");
                    n || (n = new e(this), t(this).data("bs.button", n)), "toggle" === i && n[i]()
                })
            }, s(e, null, [{
                key: "VERSION", get: function () {
                    return "4.0.0-beta"
                }
            }]), e
        }();
        t(document).on(r.CLICK_DATA_API, o.DATA_TOGGLE_CARROT, function (e) {
            e.preventDefault();
            var i = e.target;
            t(i).hasClass(a.BUTTON) || (i = t(i).closest(o.BUTTON)), l._jQueryInterface.call(t(i), "toggle")
        }).on(r.FOCUS_BLUR_DATA_API, o.DATA_TOGGLE_CARROT, function (e) {
            var i = t(e.target).closest(o.BUTTON)[0];
            t(i).toggleClass(a.FOCUS, /^focus(in)?$/.test(e.type))
        }), t.fn[e] = l._jQueryInterface, t.fn[e].Constructor = l, t.fn[e].noConflict = function () {
            return t.fn[e] = n, l._jQueryInterface
        }
    }(jQuery), function (t) {
        var e = "carousel", o = "bs.carousel", r = "." + o, l = t.fn[e],
            h = {interval: 5e3, keyboard: !0, slide: !1, pause: "hover", wrap: !0}, c = {
                interval: "(number|boolean)",
                keyboard: "boolean",
                slide: "(boolean|string)",
                pause: "(string|boolean)",
                wrap: "boolean"
            }, d = {NEXT: "next", PREV: "prev", LEFT: "left", RIGHT: "right"}, u = {
                SLIDE: "slide" + r,
                SLID: "slid" + r,
                KEYDOWN: "keydown" + r,
                MOUSEENTER: "mouseenter" + r,
                MOUSELEAVE: "mouseleave" + r,
                TOUCHEND: "touchend" + r,
                LOAD_DATA_API: "load.bs.carousel.data-api",
                CLICK_DATA_API: "click.bs.carousel.data-api"
            }, f = {
                CAROUSEL: "carousel",
                ACTIVE: "active",
                SLIDE: "slide",
                RIGHT: "carousel-item-right",
                LEFT: "carousel-item-left",
                NEXT: "carousel-item-next",
                PREV: "carousel-item-prev",
                ITEM: "carousel-item"
            }, p = {
                ACTIVE: ".active",
                ACTIVE_ITEM: ".active.carousel-item",
                ITEM: ".carousel-item",
                NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
                INDICATORS: ".carousel-indicators",
                DATA_SLIDE: "[data-slide], [data-slide-to]",
                DATA_RIDE: '[data-ride="carousel"]'
            }, g = function () {
                function l(e, n) {
                    i(this, l), this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this._config = this._getConfig(n), this._element = t(e)[0], this._indicatorsElement = t(this._element).find(p.INDICATORS)[0], this._addEventListeners()
                }

                return l.prototype.next = function () {
                    this._isSliding || this._slide(d.NEXT)
                }, l.prototype.nextWhenVisible = function () {
                    document.hidden || this.next()
                }, l.prototype.prev = function () {
                    this._isSliding || this._slide(d.PREV)
                }, l.prototype.pause = function (e) {
                    e || (this._isPaused = !0), t(this._element).find(p.NEXT_PREV)[0] && a.supportsTransitionEnd() && (a.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
                }, l.prototype.cycle = function (t) {
                    t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
                }, l.prototype.to = function (e) {
                    var i = this;
                    this._activeElement = t(this._element).find(p.ACTIVE_ITEM)[0];
                    var n = this._getItemIndex(this._activeElement);
                    if (!(e > this._items.length - 1 || e < 0)) if (this._isSliding) t(this._element).one(u.SLID, function () {
                        return i.to(e)
                    }); else {
                        if (n === e) return this.pause(), void this.cycle();
                        var s = e > n ? d.NEXT : d.PREV;
                        this._slide(s, this._items[e])
                    }
                }, l.prototype.dispose = function () {
                    t(this._element).off(r), t.removeData(this._element, o), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
                }, l.prototype._getConfig = function (i) {
                    return i = t.extend({}, h, i), a.typeCheckConfig(e, i, c), i
                }, l.prototype._addEventListeners = function () {
                    var e = this;
                    this._config.keyboard && t(this._element).on(u.KEYDOWN, function (t) {
                        return e._keydown(t)
                    }), "hover" === this._config.pause && (t(this._element).on(u.MOUSEENTER, function (t) {
                        return e.pause(t)
                    }).on(u.MOUSELEAVE, function (t) {
                        return e.cycle(t)
                    }), "ontouchstart" in document.documentElement && t(this._element).on(u.TOUCHEND, function () {
                        e.pause(), e.touchTimeout && clearTimeout(e.touchTimeout), e.touchTimeout = setTimeout(function (t) {
                            return e.cycle(t)
                        }, 500 + e._config.interval)
                    }))
                }, l.prototype._keydown = function (t) {
                    if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
                        case 37:
                            t.preventDefault(), this.prev();
                            break;
                        case 39:
                            t.preventDefault(), this.next();
                            break;
                        default:
                            return
                    }
                }, l.prototype._getItemIndex = function (e) {
                    return this._items = t.makeArray(t(e).parent().find(p.ITEM)), this._items.indexOf(e)
                }, l.prototype._getItemByDirection = function (t, e) {
                    var i = t === d.NEXT, n = t === d.PREV, s = this._getItemIndex(e), a = this._items.length - 1;
                    if ((n && 0 === s || i && s === a) && !this._config.wrap) return e;
                    var o = (s + (t === d.PREV ? -1 : 1)) % this._items.length;
                    return -1 === o ? this._items[this._items.length - 1] : this._items[o]
                }, l.prototype._triggerSlideEvent = function (e, i) {
                    var n = this._getItemIndex(e), s = this._getItemIndex(t(this._element).find(p.ACTIVE_ITEM)[0]),
                        a = t.Event(u.SLIDE, {relatedTarget: e, direction: i, from: s, to: n});
                    return t(this._element).trigger(a), a
                }, l.prototype._setActiveIndicatorElement = function (e) {
                    if (this._indicatorsElement) {
                        t(this._indicatorsElement).find(p.ACTIVE).removeClass(f.ACTIVE);
                        var i = this._indicatorsElement.children[this._getItemIndex(e)];
                        i && t(i).addClass(f.ACTIVE)
                    }
                }, l.prototype._slide = function (e, i) {
                    var n = this, s = t(this._element).find(p.ACTIVE_ITEM)[0], o = this._getItemIndex(s),
                        r = i || s && this._getItemByDirection(e, s), l = this._getItemIndex(r),
                        h = Boolean(this._interval), c = void 0, g = void 0, _ = void 0;
                    if (e === d.NEXT ? (c = f.LEFT, g = f.NEXT, _ = d.LEFT) : (c = f.RIGHT, g = f.PREV, _ = d.RIGHT), r && t(r).hasClass(f.ACTIVE)) this._isSliding = !1; else if (!this._triggerSlideEvent(r, _).isDefaultPrevented() && s && r) {
                        this._isSliding = !0, h && this.pause(), this._setActiveIndicatorElement(r);
                        var m = t.Event(u.SLID, {relatedTarget: r, direction: _, from: o, to: l});
                        a.supportsTransitionEnd() && t(this._element).hasClass(f.SLIDE) ? (t(r).addClass(g), a.reflow(r), t(s).addClass(c), t(r).addClass(c), t(s).one(a.TRANSITION_END, function () {
                            t(r).removeClass(c + " " + g).addClass(f.ACTIVE), t(s).removeClass(f.ACTIVE + " " + g + " " + c), n._isSliding = !1, setTimeout(function () {
                                return t(n._element).trigger(m)
                            }, 0)
                        }).emulateTransitionEnd(600)) : (t(s).removeClass(f.ACTIVE), t(r).addClass(f.ACTIVE), this._isSliding = !1, t(this._element).trigger(m)), h && this.cycle()
                    }
                }, l._jQueryInterface = function (e) {
                    return this.each(function () {
                        var i = t(this).data(o), s = t.extend({}, h, t(this).data());
                        "object" === (void 0 === e ? "undefined" : n(e)) && t.extend(s, e);
                        var a = "string" == typeof e ? e : s.slide;
                        if (i || (i = new l(this, s), t(this).data(o, i)), "number" == typeof e) i.to(e); else if ("string" == typeof a) {
                            if (void 0 === i[a]) throw new Error('No method named "' + a + '"');
                            i[a]()
                        } else s.interval && (i.pause(), i.cycle())
                    })
                }, l._dataApiClickHandler = function (e) {
                    var i = a.getSelectorFromElement(this);
                    if (i) {
                        var n = t(i)[0];
                        if (n && t(n).hasClass(f.CAROUSEL)) {
                            var s = t.extend({}, t(n).data(), t(this).data()), r = this.getAttribute("data-slide-to");
                            r && (s.interval = !1), l._jQueryInterface.call(t(n), s), r && t(n).data(o).to(r), e.preventDefault()
                        }
                    }
                }, s(l, null, [{
                    key: "VERSION", get: function () {
                        return "4.0.0-beta"
                    }
                }, {
                    key: "Default", get: function () {
                        return h
                    }
                }]), l
            }();
        t(document).on(u.CLICK_DATA_API, p.DATA_SLIDE, g._dataApiClickHandler), t(window).on(u.LOAD_DATA_API, function () {
            t(p.DATA_RIDE).each(function () {
                var e = t(this);
                g._jQueryInterface.call(e, e.data())
            })
        }), t.fn[e] = g._jQueryInterface, t.fn[e].Constructor = g, t.fn[e].noConflict = function () {
            return t.fn[e] = l, g._jQueryInterface
        }
    }(jQuery), function (t) {
        var e = "collapse", o = "bs.collapse", r = t.fn[e], l = {toggle: !0, parent: ""},
            h = {toggle: "boolean", parent: "string"}, c = {
                SHOW: "show.bs.collapse",
                SHOWN: "shown.bs.collapse",
                HIDE: "hide.bs.collapse",
                HIDDEN: "hidden.bs.collapse",
                CLICK_DATA_API: "click.bs.collapse.data-api"
            }, d = {SHOW: "show", COLLAPSE: "collapse", COLLAPSING: "collapsing", COLLAPSED: "collapsed"},
            u = {WIDTH: "width", HEIGHT: "height"},
            f = {ACTIVES: ".show, .collapsing", DATA_TOGGLE: '[data-toggle="collapse"]'}, p = function () {
                function r(e, n) {
                    i(this, r), this._isTransitioning = !1, this._element = e, this._config = this._getConfig(n), this._triggerArray = t.makeArray(t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'));
                    for (var s = t(f.DATA_TOGGLE), o = 0; o < s.length; o++) {
                        var l = s[o], h = a.getSelectorFromElement(l);
                        null !== h && t(h).filter(e).length > 0 && this._triggerArray.push(l)
                    }
                    this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
                }

                return r.prototype.toggle = function () {
                    t(this._element).hasClass(d.SHOW) ? this.hide() : this.show()
                }, r.prototype.show = function () {
                    var e = this;
                    if (!this._isTransitioning && !t(this._element).hasClass(d.SHOW)) {
                        var i = void 0, n = void 0;
                        if (this._parent && ((i = t.makeArray(t(this._parent).children().children(f.ACTIVES))).length || (i = null)), !(i && (n = t(i).data(o)) && n._isTransitioning)) {
                            var s = t.Event(c.SHOW);
                            if (t(this._element).trigger(s), !s.isDefaultPrevented()) {
                                i && (r._jQueryInterface.call(t(i), "hide"), n || t(i).data(o, null));
                                var l = this._getDimension();
                                t(this._element).removeClass(d.COLLAPSE).addClass(d.COLLAPSING), this._element.style[l] = 0, this._triggerArray.length && t(this._triggerArray).removeClass(d.COLLAPSED).attr("aria-expanded", !0), this.setTransitioning(!0);
                                var h = function () {
                                    t(e._element).removeClass(d.COLLAPSING).addClass(d.COLLAPSE).addClass(d.SHOW), e._element.style[l] = "", e.setTransitioning(!1), t(e._element).trigger(c.SHOWN)
                                };
                                if (a.supportsTransitionEnd()) {
                                    var u = "scroll" + (l[0].toUpperCase() + l.slice(1));
                                    t(this._element).one(a.TRANSITION_END, h).emulateTransitionEnd(600), this._element.style[l] = this._element[u] + "px"
                                } else h()
                            }
                        }
                    }
                }, r.prototype.hide = function () {
                    var e = this;
                    if (!this._isTransitioning && t(this._element).hasClass(d.SHOW)) {
                        var i = t.Event(c.HIDE);
                        if (t(this._element).trigger(i), !i.isDefaultPrevented()) {
                            var n = this._getDimension();
                            if (this._element.style[n] = this._element.getBoundingClientRect()[n] + "px", a.reflow(this._element), t(this._element).addClass(d.COLLAPSING).removeClass(d.COLLAPSE).removeClass(d.SHOW), this._triggerArray.length) for (var s = 0; s < this._triggerArray.length; s++) {
                                var o = this._triggerArray[s], r = a.getSelectorFromElement(o);
                                null !== r && (t(r).hasClass(d.SHOW) || t(o).addClass(d.COLLAPSED).attr("aria-expanded", !1))
                            }
                            this.setTransitioning(!0);
                            var l = function () {
                                e.setTransitioning(!1), t(e._element).removeClass(d.COLLAPSING).addClass(d.COLLAPSE).trigger(c.HIDDEN)
                            };
                            this._element.style[n] = "", a.supportsTransitionEnd() ? t(this._element).one(a.TRANSITION_END, l).emulateTransitionEnd(600) : l()
                        }
                    }
                }, r.prototype.setTransitioning = function (t) {
                    this._isTransitioning = t
                }, r.prototype.dispose = function () {
                    t.removeData(this._element, o), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
                }, r.prototype._getConfig = function (i) {
                    return i = t.extend({}, l, i), i.toggle = Boolean(i.toggle), a.typeCheckConfig(e, i, h), i
                }, r.prototype._getDimension = function () {
                    return t(this._element).hasClass(u.WIDTH) ? u.WIDTH : u.HEIGHT
                }, r.prototype._getParent = function () {
                    var e = this, i = t(this._config.parent)[0],
                        n = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
                    return t(i).find(n).each(function (t, i) {
                        e._addAriaAndCollapsedClass(r._getTargetFromElement(i), [i])
                    }), i
                }, r.prototype._addAriaAndCollapsedClass = function (e, i) {
                    if (e) {
                        var n = t(e).hasClass(d.SHOW);
                        i.length && t(i).toggleClass(d.COLLAPSED, !n).attr("aria-expanded", n)
                    }
                }, r._getTargetFromElement = function (e) {
                    var i = a.getSelectorFromElement(e);
                    return i ? t(i)[0] : null
                }, r._jQueryInterface = function (e) {
                    return this.each(function () {
                        var i = t(this), s = i.data(o),
                            a = t.extend({}, l, i.data(), "object" === (void 0 === e ? "undefined" : n(e)) && e);
                        if (!s && a.toggle && /show|hide/.test(e) && (a.toggle = !1), s || (s = new r(this, a), i.data(o, s)), "string" == typeof e) {
                            if (void 0 === s[e]) throw new Error('No method named "' + e + '"');
                            s[e]()
                        }
                    })
                }, s(r, null, [{
                    key: "VERSION", get: function () {
                        return "4.0.0-beta"
                    }
                }, {
                    key: "Default", get: function () {
                        return l
                    }
                }]), r
            }();
        t(document).on(c.CLICK_DATA_API, f.DATA_TOGGLE, function (e) {
            /input|textarea/i.test(e.target.tagName) || e.preventDefault();
            var i = t(this), n = a.getSelectorFromElement(this);
            t(n).each(function () {
                var e = t(this), n = e.data(o) ? "toggle" : i.data();
                p._jQueryInterface.call(e, n)
            })
        }), t.fn[e] = p._jQueryInterface, t.fn[e].Constructor = p, t.fn[e].noConflict = function () {
            return t.fn[e] = r, p._jQueryInterface
        }
    }(jQuery), function (t) {
        if ("undefined" == typeof Popper) throw new Error("Bootstrap dropdown require Popper.js (https://popper.js.org)");
        var e = "dropdown", o = "bs.dropdown", r = "." + o, l = t.fn[e], h = new RegExp("38|40|27"), c = {
                HIDE: "hide" + r,
                HIDDEN: "hidden" + r,
                SHOW: "show" + r,
                SHOWN: "shown" + r,
                CLICK: "click" + r,
                CLICK_DATA_API: "click.bs.dropdown.data-api",
                KEYDOWN_DATA_API: "keydown.bs.dropdown.data-api",
                KEYUP_DATA_API: "keyup.bs.dropdown.data-api"
            }, d = {
                DISABLED: "disabled",
                SHOW: "show",
                DROPUP: "dropup",
                MENURIGHT: "dropdown-menu-right",
                MENULEFT: "dropdown-menu-left"
            }, u = {
                DATA_TOGGLE: '[data-toggle="dropdown"]',
                FORM_CHILD: ".dropdown form",
                MENU: ".dropdown-menu",
                NAVBAR_NAV: ".navbar-nav",
                VISIBLE_ITEMS: ".dropdown-menu .dropdown-item:not(.disabled)"
            }, f = {TOP: "top-start", TOPEND: "top-end", BOTTOM: "bottom-start", BOTTOMEND: "bottom-end"},
            p = {placement: f.BOTTOM, offset: 0, flip: !0},
            g = {placement: "string", offset: "(number|string)", flip: "boolean"}, _ = function () {
                function l(t, e) {
                    i(this, l), this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
                }

                return l.prototype.toggle = function () {
                    if (!this._element.disabled && !t(this._element).hasClass(d.DISABLED)) {
                        var e = l._getParentFromElement(this._element), i = t(this._menu).hasClass(d.SHOW);
                        if (l._clearMenus(), !i) {
                            var n = {relatedTarget: this._element}, s = t.Event(c.SHOW, n);
                            if (t(e).trigger(s), !s.isDefaultPrevented()) {
                                var a = this._element;
                                t(e).hasClass(d.DROPUP) && (t(this._menu).hasClass(d.MENULEFT) || t(this._menu).hasClass(d.MENURIGHT)) && (a = e), this._popper = new Popper(a, this._menu, this._getPopperConfig()), "ontouchstart" in document.documentElement && !t(e).closest(u.NAVBAR_NAV).length && t("body").children().on("mouseover", null, t.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), t(this._menu).toggleClass(d.SHOW), t(e).toggleClass(d.SHOW).trigger(t.Event(c.SHOWN, n))
                            }
                        }
                    }
                }, l.prototype.dispose = function () {
                    t.removeData(this._element, o), t(this._element).off(r), this._element = null, this._menu = null, null !== this._popper && this._popper.destroy(), this._popper = null
                }, l.prototype.update = function () {
                    this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
                }, l.prototype._addEventListeners = function () {
                    var e = this;
                    t(this._element).on(c.CLICK, function (t) {
                        t.preventDefault(), t.stopPropagation(), e.toggle()
                    })
                }, l.prototype._getConfig = function (i) {
                    var n = t(this._element).data();
                    return void 0 !== n.placement && (n.placement = f[n.placement.toUpperCase()]), i = t.extend({}, this.constructor.Default, t(this._element).data(), i), a.typeCheckConfig(e, i, this.constructor.DefaultType), i
                }, l.prototype._getMenuElement = function () {
                    if (!this._menu) {
                        var e = l._getParentFromElement(this._element);
                        this._menu = t(e).find(u.MENU)[0]
                    }
                    return this._menu
                }, l.prototype._getPlacement = function () {
                    var e = t(this._element).parent(), i = this._config.placement;
                    return e.hasClass(d.DROPUP) || this._config.placement === f.TOP ? (i = f.TOP, t(this._menu).hasClass(d.MENURIGHT) && (i = f.TOPEND)) : t(this._menu).hasClass(d.MENURIGHT) && (i = f.BOTTOMEND), i
                }, l.prototype._detectNavbar = function () {
                    return t(this._element).closest(".navbar").length > 0
                }, l.prototype._getPopperConfig = function () {
                    var t = {
                        placement: this._getPlacement(),
                        modifiers: {offset: {offset: this._config.offset}, flip: {enabled: this._config.flip}}
                    };
                    return this._inNavbar && (t.modifiers.applyStyle = {enabled: !this._inNavbar}), t
                }, l._jQueryInterface = function (e) {
                    return this.each(function () {
                        var i = t(this).data(o), s = "object" === (void 0 === e ? "undefined" : n(e)) ? e : null;
                        if (i || (i = new l(this, s), t(this).data(o, i)), "string" == typeof e) {
                            if (void 0 === i[e]) throw new Error('No method named "' + e + '"');
                            i[e]()
                        }
                    })
                }, l._clearMenus = function (e) {
                    if (!e || 3 !== e.which && ("keyup" !== e.type || 9 === e.which)) for (var i = t.makeArray(t(u.DATA_TOGGLE)), n = 0; n < i.length; n++) {
                        var s = l._getParentFromElement(i[n]), a = t(i[n]).data(o), r = {relatedTarget: i[n]};
                        if (a) {
                            var h = a._menu;
                            if (t(s).hasClass(d.SHOW) && !(e && ("click" === e.type && /input|textarea/i.test(e.target.tagName) || "keyup" === e.type && 9 === e.which) && t.contains(s, e.target))) {
                                var f = t.Event(c.HIDE, r);
                                t(s).trigger(f), f.isDefaultPrevented() || ("ontouchstart" in document.documentElement && t("body").children().off("mouseover", null, t.noop), i[n].setAttribute("aria-expanded", "false"), t(h).removeClass(d.SHOW), t(s).removeClass(d.SHOW).trigger(t.Event(c.HIDDEN, r)))
                            }
                        }
                    }
                }, l._getParentFromElement = function (e) {
                    var i = void 0, n = a.getSelectorFromElement(e);
                    return n && (i = t(n)[0]), i || e.parentNode
                }, l._dataApiKeydownHandler = function (e) {
                    if (!(!h.test(e.which) || /button/i.test(e.target.tagName) && 32 === e.which || /input|textarea/i.test(e.target.tagName) || (e.preventDefault(), e.stopPropagation(), this.disabled || t(this).hasClass(d.DISABLED)))) {
                        var i = l._getParentFromElement(this), n = t(i).hasClass(d.SHOW);
                        if ((n || 27 === e.which && 32 === e.which) && (!n || 27 !== e.which && 32 !== e.which)) {
                            var s = t(i).find(u.VISIBLE_ITEMS).get();
                            if (s.length) {
                                var a = s.indexOf(e.target);
                                38 === e.which && a > 0 && a--, 40 === e.which && a < s.length - 1 && a++, a < 0 && (a = 0), s[a].focus()
                            }
                        } else {
                            if (27 === e.which) {
                                var o = t(i).find(u.DATA_TOGGLE)[0];
                                t(o).trigger("focus")
                            }
                            t(this).trigger("click")
                        }
                    }
                }, s(l, null, [{
                    key: "VERSION", get: function () {
                        return "4.0.0-beta"
                    }
                }, {
                    key: "Default", get: function () {
                        return p
                    }
                }, {
                    key: "DefaultType", get: function () {
                        return g
                    }
                }]), l
            }();
        t(document).on(c.KEYDOWN_DATA_API, u.DATA_TOGGLE, _._dataApiKeydownHandler).on(c.KEYDOWN_DATA_API, u.MENU, _._dataApiKeydownHandler).on(c.CLICK_DATA_API + " " + c.KEYUP_DATA_API, _._clearMenus).on(c.CLICK_DATA_API, u.DATA_TOGGLE, function (e) {
            e.preventDefault(), e.stopPropagation(), _._jQueryInterface.call(t(this), "toggle")
        }).on(c.CLICK_DATA_API, u.FORM_CHILD, function (t) {
            t.stopPropagation()
        }), t.fn[e] = _._jQueryInterface, t.fn[e].Constructor = _, t.fn[e].noConflict = function () {
            return t.fn[e] = l, _._jQueryInterface
        }
    }(jQuery), function (t) {
        var e = "modal", o = ".bs.modal", r = t.fn[e], l = {backdrop: !0, keyboard: !0, focus: !0, show: !0},
            h = {backdrop: "(boolean|string)", keyboard: "boolean", focus: "boolean", show: "boolean"}, c = {
                HIDE: "hide.bs.modal",
                HIDDEN: "hidden.bs.modal",
                SHOW: "show.bs.modal",
                SHOWN: "shown.bs.modal",
                FOCUSIN: "focusin.bs.modal",
                RESIZE: "resize.bs.modal",
                CLICK_DISMISS: "click.dismiss.bs.modal",
                KEYDOWN_DISMISS: "keydown.dismiss.bs.modal",
                MOUSEUP_DISMISS: "mouseup.dismiss.bs.modal",
                MOUSEDOWN_DISMISS: "mousedown.dismiss.bs.modal",
                CLICK_DATA_API: "click.bs.modal.data-api"
            }, d = {
                SCROLLBAR_MEASURER: "modal-scrollbar-measure",
                BACKDROP: "modal-backdrop",
                OPEN: "modal-open",
                FADE: "fade",
                SHOW: "show"
            }, u = {
                DIALOG: ".modal-dialog",
                DATA_TOGGLE: '[data-toggle="modal"]',
                DATA_DISMISS: '[data-dismiss="modal"]',
                FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
                NAVBAR_TOGGLER: ".navbar-toggler"
            }, f = function () {
                function r(e, n) {
                    i(this, r), this._config = this._getConfig(n), this._element = e, this._dialog = t(e).find(u.DIALOG)[0], this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._originalBodyPadding = 0, this._scrollbarWidth = 0
                }

                return r.prototype.toggle = function (t) {
                    return this._isShown ? this.hide() : this.show(t)
                }, r.prototype.show = function (e) {
                    var i = this;
                    if (!this._isTransitioning) {
                        a.supportsTransitionEnd() && t(this._element).hasClass(d.FADE) && (this._isTransitioning = !0);
                        var n = t.Event(c.SHOW, {relatedTarget: e});
                        t(this._element).trigger(n), this._isShown || n.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), t(document.body).addClass(d.OPEN), this._setEscapeEvent(), this._setResizeEvent(), t(this._element).on(c.CLICK_DISMISS, u.DATA_DISMISS, function (t) {
                            return i.hide(t)
                        }), t(this._dialog).on(c.MOUSEDOWN_DISMISS, function () {
                            t(i._element).one(c.MOUSEUP_DISMISS, function (e) {
                                t(e.target).is(i._element) && (i._ignoreBackdropClick = !0)
                            })
                        }), this._showBackdrop(function () {
                            return i._showElement(e)
                        }))
                    }
                }, r.prototype.hide = function (e) {
                    var i = this;
                    if (e && e.preventDefault(), !this._isTransitioning && this._isShown) {
                        var n = a.supportsTransitionEnd() && t(this._element).hasClass(d.FADE);
                        n && (this._isTransitioning = !0);
                        var s = t.Event(c.HIDE);
                        t(this._element).trigger(s), this._isShown && !s.isDefaultPrevented() && (this._isShown = !1, this._setEscapeEvent(), this._setResizeEvent(), t(document).off(c.FOCUSIN), t(this._element).removeClass(d.SHOW), t(this._element).off(c.CLICK_DISMISS), t(this._dialog).off(c.MOUSEDOWN_DISMISS), n ? t(this._element).one(a.TRANSITION_END, function (t) {
                            return i._hideModal(t)
                        }).emulateTransitionEnd(300) : this._hideModal())
                    }
                }, r.prototype.dispose = function () {
                    t.removeData(this._element, "bs.modal"), t(window, document, this._element, this._backdrop).off(o), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._scrollbarWidth = null
                }, r.prototype.handleUpdate = function () {
                    this._adjustDialog()
                }, r.prototype._getConfig = function (i) {
                    return i = t.extend({}, l, i), a.typeCheckConfig(e, i, h), i
                }, r.prototype._showElement = function (e) {
                    var i = this, n = a.supportsTransitionEnd() && t(this._element).hasClass(d.FADE);
                    this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.scrollTop = 0, n && a.reflow(this._element), t(this._element).addClass(d.SHOW), this._config.focus && this._enforceFocus();
                    var s = t.Event(c.SHOWN, {relatedTarget: e}), o = function () {
                        i._config.focus && i._element.focus(), i._isTransitioning = !1, t(i._element).trigger(s)
                    };
                    n ? t(this._dialog).one(a.TRANSITION_END, o).emulateTransitionEnd(300) : o()
                }, r.prototype._enforceFocus = function () {
                    var e = this;
                    t(document).off(c.FOCUSIN).on(c.FOCUSIN, function (i) {
                        document === i.target || e._element === i.target || t(e._element).has(i.target).length || e._element.focus()
                    })
                }, r.prototype._setEscapeEvent = function () {
                    var e = this;
                    this._isShown && this._config.keyboard ? t(this._element).on(c.KEYDOWN_DISMISS, function (t) {
                        27 === t.which && (t.preventDefault(), e.hide())
                    }) : this._isShown || t(this._element).off(c.KEYDOWN_DISMISS)
                }, r.prototype._setResizeEvent = function () {
                    var e = this;
                    this._isShown ? t(window).on(c.RESIZE, function (t) {
                        return e.handleUpdate(t)
                    }) : t(window).off(c.RESIZE)
                }, r.prototype._hideModal = function () {
                    var e = this;
                    this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._isTransitioning = !1, this._showBackdrop(function () {
                        t(document.body).removeClass(d.OPEN), e._resetAdjustments(), e._resetScrollbar(), t(e._element).trigger(c.HIDDEN)
                    })
                }, r.prototype._removeBackdrop = function () {
                    this._backdrop && (t(this._backdrop).remove(), this._backdrop = null)
                }, r.prototype._showBackdrop = function (e) {
                    var i = this, n = t(this._element).hasClass(d.FADE) ? d.FADE : "";
                    if (this._isShown && this._config.backdrop) {
                        var s = a.supportsTransitionEnd() && n;
                        if (this._backdrop = document.createElement("div"), this._backdrop.className = d.BACKDROP, n && t(this._backdrop).addClass(n), t(this._backdrop).appendTo(document.body), t(this._element).on(c.CLICK_DISMISS, function (t) {
                                i._ignoreBackdropClick ? i._ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" === i._config.backdrop ? i._element.focus() : i.hide())
                            }), s && a.reflow(this._backdrop), t(this._backdrop).addClass(d.SHOW), !e) return;
                        if (!s) return void e();
                        t(this._backdrop).one(a.TRANSITION_END, e).emulateTransitionEnd(150)
                    } else if (!this._isShown && this._backdrop) {
                        t(this._backdrop).removeClass(d.SHOW);
                        var o = function () {
                            i._removeBackdrop(), e && e()
                        };
                        a.supportsTransitionEnd() && t(this._element).hasClass(d.FADE) ? t(this._backdrop).one(a.TRANSITION_END, o).emulateTransitionEnd(150) : o()
                    } else e && e()
                }, r.prototype._adjustDialog = function () {
                    var t = this._element.scrollHeight > document.documentElement.clientHeight;
                    !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
                }, r.prototype._resetAdjustments = function () {
                    this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
                }, r.prototype._checkScrollbar = function () {
                    this._isBodyOverflowing = document.body.clientWidth < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
                }, r.prototype._setScrollbar = function () {
                    var e = this;
                    if (this._isBodyOverflowing) {
                        t(u.FIXED_CONTENT).each(function (i, n) {
                            var s = t(n)[0].style.paddingRight, a = t(n).css("padding-right");
                            t(n).data("padding-right", s).css("padding-right", parseFloat(a) + e._scrollbarWidth + "px")
                        }), t(u.NAVBAR_TOGGLER).each(function (i, n) {
                            var s = t(n)[0].style.marginRight, a = t(n).css("margin-right");
                            t(n).data("margin-right", s).css("margin-right", parseFloat(a) + e._scrollbarWidth + "px")
                        });
                        var i = document.body.style.paddingRight, n = t("body").css("padding-right");
                        t("body").data("padding-right", i).css("padding-right", parseFloat(n) + this._scrollbarWidth + "px")
                    }
                }, r.prototype._resetScrollbar = function () {
                    t(u.FIXED_CONTENT).each(function (e, i) {
                        var n = t(i).data("padding-right");
                        void 0 !== n && t(i).css("padding-right", n).removeData("padding-right")
                    }), t(u.NAVBAR_TOGGLER).each(function (e, i) {
                        var n = t(i).data("margin-right");
                        void 0 !== n && t(i).css("margin-right", n).removeData("margin-right")
                    });
                    var e = t("body").data("padding-right");
                    void 0 !== e && t("body").css("padding-right", e).removeData("padding-right")
                }, r.prototype._getScrollbarWidth = function () {
                    var t = document.createElement("div");
                    t.className = d.SCROLLBAR_MEASURER, document.body.appendChild(t);
                    var e = t.getBoundingClientRect().width - t.clientWidth;
                    return document.body.removeChild(t), e
                }, r._jQueryInterface = function (e, i) {
                    return this.each(function () {
                        var s = t(this).data("bs.modal"),
                            a = t.extend({}, r.Default, t(this).data(), "object" === (void 0 === e ? "undefined" : n(e)) && e);
                        if (s || (s = new r(this, a), t(this).data("bs.modal", s)), "string" == typeof e) {
                            if (void 0 === s[e]) throw new Error('No method named "' + e + '"');
                            s[e](i)
                        } else a.show && s.show(i)
                    })
                }, s(r, null, [{
                    key: "VERSION", get: function () {
                        return "4.0.0-beta"
                    }
                }, {
                    key: "Default", get: function () {
                        return l
                    }
                }]), r
            }();
        t(document).on(c.CLICK_DATA_API, u.DATA_TOGGLE, function (e) {
            var i = this, n = void 0, s = a.getSelectorFromElement(this);
            s && (n = t(s)[0]);
            var o = t(n).data("bs.modal") ? "toggle" : t.extend({}, t(n).data(), t(this).data());
            "A" !== this.tagName && "AREA" !== this.tagName || e.preventDefault();
            var r = t(n).one(c.SHOW, function (e) {
                e.isDefaultPrevented() || r.one(c.HIDDEN, function () {
                    t(i).is(":visible") && i.focus()
                })
            });
            f._jQueryInterface.call(t(n), o, this)
        }), t.fn[e] = f._jQueryInterface, t.fn[e].Constructor = f, t.fn[e].noConflict = function () {
            return t.fn[e] = r, f._jQueryInterface
        }
    }(jQuery), function (t) {
        if ("undefined" == typeof Popper) throw new Error("Bootstrap tooltips require Popper.js (https://popper.js.org)");
        var e = "tooltip", o = ".bs.tooltip", r = t.fn[e], l = new RegExp("(^|\\s)bs-tooltip\\S+", "g"), h = {
                animation: "boolean",
                template: "string",
                title: "(string|element|function)",
                trigger: "string",
                delay: "(number|object)",
                html: "boolean",
                selector: "(string|boolean)",
                placement: "(string|function)",
                offset: "(number|string)",
                container: "(string|element|boolean)",
                fallbackPlacement: "(string|array)"
            }, c = {AUTO: "auto", TOP: "top", RIGHT: "right", BOTTOM: "bottom", LEFT: "left"}, d = {
                animation: !0,
                template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
                trigger: "hover focus",
                title: "",
                delay: 0,
                html: !1,
                selector: !1,
                placement: "top",
                offset: 0,
                container: !1,
                fallbackPlacement: "flip"
            }, u = {SHOW: "show", OUT: "out"}, f = {
                HIDE: "hide" + o,
                HIDDEN: "hidden" + o,
                SHOW: "show" + o,
                SHOWN: "shown" + o,
                INSERTED: "inserted" + o,
                CLICK: "click" + o,
                FOCUSIN: "focusin" + o,
                FOCUSOUT: "focusout" + o,
                MOUSEENTER: "mouseenter" + o,
                MOUSELEAVE: "mouseleave" + o
            }, p = {FADE: "fade", SHOW: "show"},
            g = {TOOLTIP: ".tooltip", TOOLTIP_INNER: ".tooltip-inner", ARROW: ".arrow"},
            _ = {HOVER: "hover", FOCUS: "focus", CLICK: "click", MANUAL: "manual"}, m = function () {
                function r(t, e) {
                    i(this, r), this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners()
                }

                return r.prototype.enable = function () {
                    this._isEnabled = !0
                }, r.prototype.disable = function () {
                    this._isEnabled = !1
                }, r.prototype.toggleEnabled = function () {
                    this._isEnabled = !this._isEnabled
                }, r.prototype.toggle = function (e) {
                    if (e) {
                        var i = this.constructor.DATA_KEY, n = t(e.currentTarget).data(i);
                        n || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(i, n)), n._activeTrigger.click = !n._activeTrigger.click, n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n)
                    } else {
                        if (t(this.getTipElement()).hasClass(p.SHOW)) return void this._leave(null, this);
                        this._enter(null, this)
                    }
                }, r.prototype.dispose = function () {
                    clearTimeout(this._timeout), t.removeData(this.element, this.constructor.DATA_KEY), t(this.element).off(this.constructor.EVENT_KEY), t(this.element).closest(".modal").off("hide.bs.modal"), this.tip && t(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, null !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
                }, r.prototype.show = function () {
                    var e = this;
                    if ("none" === t(this.element).css("display")) throw new Error("Please use show on visible elements");
                    var i = t.Event(this.constructor.Event.SHOW);
                    if (this.isWithContent() && this._isEnabled) {
                        t(this.element).trigger(i);
                        var n = t.contains(this.element.ownerDocument.documentElement, this.element);
                        if (i.isDefaultPrevented() || !n) return;
                        var s = this.getTipElement(), o = a.getUID(this.constructor.NAME);
                        s.setAttribute("id", o), this.element.setAttribute("aria-describedby", o), this.setContent(), this.config.animation && t(s).addClass(p.FADE);
                        var l = "function" == typeof this.config.placement ? this.config.placement.call(this, s, this.element) : this.config.placement,
                            h = this._getAttachment(l);
                        this.addAttachmentClass(h);
                        var c = !1 === this.config.container ? document.body : t(this.config.container);
                        t(s).data(this.constructor.DATA_KEY, this), t.contains(this.element.ownerDocument.documentElement, this.tip) || t(s).appendTo(c), t(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new Popper(this.element, s, {
                            placement: h,
                            modifiers: {
                                offset: {offset: this.config.offset},
                                flip: {behavior: this.config.fallbackPlacement},
                                arrow: {element: g.ARROW}
                            },
                            onCreate: function (t) {
                                t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
                            },
                            onUpdate: function (t) {
                                e._handlePopperPlacementChange(t)
                            }
                        }), t(s).addClass(p.SHOW), "ontouchstart" in document.documentElement && t("body").children().on("mouseover", null, t.noop);
                        var d = function () {
                            e.config.animation && e._fixTransition();
                            var i = e._hoverState;
                            e._hoverState = null, t(e.element).trigger(e.constructor.Event.SHOWN), i === u.OUT && e._leave(null, e)
                        };
                        a.supportsTransitionEnd() && t(this.tip).hasClass(p.FADE) ? t(this.tip).one(a.TRANSITION_END, d).emulateTransitionEnd(r._TRANSITION_DURATION) : d()
                    }
                }, r.prototype.hide = function (e) {
                    var i = this, n = this.getTipElement(), s = t.Event(this.constructor.Event.HIDE), o = function () {
                        i._hoverState !== u.SHOW && n.parentNode && n.parentNode.removeChild(n), i._cleanTipClass(), i.element.removeAttribute("aria-describedby"), t(i.element).trigger(i.constructor.Event.HIDDEN), null !== i._popper && i._popper.destroy(), e && e()
                    };
                    t(this.element).trigger(s), s.isDefaultPrevented() || (t(n).removeClass(p.SHOW), "ontouchstart" in document.documentElement && t("body").children().off("mouseover", null, t.noop), this._activeTrigger[_.CLICK] = !1, this._activeTrigger[_.FOCUS] = !1, this._activeTrigger[_.HOVER] = !1, a.supportsTransitionEnd() && t(this.tip).hasClass(p.FADE) ? t(n).one(a.TRANSITION_END, o).emulateTransitionEnd(150) : o(), this._hoverState = "")
                }, r.prototype.update = function () {
                    null !== this._popper && this._popper.scheduleUpdate()
                }, r.prototype.isWithContent = function () {
                    return Boolean(this.getTitle())
                }, r.prototype.addAttachmentClass = function (e) {
                    t(this.getTipElement()).addClass("bs-tooltip-" + e)
                }, r.prototype.getTipElement = function () {
                    return this.tip = this.tip || t(this.config.template)[0]
                }, r.prototype.setContent = function () {
                    var e = t(this.getTipElement());
                    this.setElementContent(e.find(g.TOOLTIP_INNER), this.getTitle()), e.removeClass(p.FADE + " " + p.SHOW)
                }, r.prototype.setElementContent = function (e, i) {
                    var s = this.config.html;
                    "object" === (void 0 === i ? "undefined" : n(i)) && (i.nodeType || i.jquery) ? s ? t(i).parent().is(e) || e.empty().append(i) : e.text(t(i).text()) : e[s ? "html" : "text"](i)
                }, r.prototype.getTitle = function () {
                    var t = this.element.getAttribute("data-original-title");
                    return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t
                }, r.prototype._getAttachment = function (t) {
                    return c[t.toUpperCase()]
                }, r.prototype._setListeners = function () {
                    var e = this;
                    this.config.trigger.split(" ").forEach(function (i) {
                        if ("click" === i) t(e.element).on(e.constructor.Event.CLICK, e.config.selector, function (t) {
                            return e.toggle(t)
                        }); else if (i !== _.MANUAL) {
                            var n = i === _.HOVER ? e.constructor.Event.MOUSEENTER : e.constructor.Event.FOCUSIN,
                                s = i === _.HOVER ? e.constructor.Event.MOUSELEAVE : e.constructor.Event.FOCUSOUT;
                            t(e.element).on(n, e.config.selector, function (t) {
                                return e._enter(t)
                            }).on(s, e.config.selector, function (t) {
                                return e._leave(t)
                            })
                        }
                        t(e.element).closest(".modal").on("hide.bs.modal", function () {
                            return e.hide()
                        })
                    }), this.config.selector ? this.config = t.extend({}, this.config, {
                        trigger: "manual",
                        selector: ""
                    }) : this._fixTitle()
                }, r.prototype._fixTitle = function () {
                    var t = n(this.element.getAttribute("data-original-title"));
                    (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
                }, r.prototype._enter = function (e, i) {
                    var n = this.constructor.DATA_KEY;
                    (i = i || t(e.currentTarget).data(n)) || (i = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(n, i)), e && (i._activeTrigger["focusin" === e.type ? _.FOCUS : _.HOVER] = !0), t(i.getTipElement()).hasClass(p.SHOW) || i._hoverState === u.SHOW ? i._hoverState = u.SHOW : (clearTimeout(i._timeout), i._hoverState = u.SHOW, i.config.delay && i.config.delay.show ? i._timeout = setTimeout(function () {
                        i._hoverState === u.SHOW && i.show()
                    }, i.config.delay.show) : i.show())
                }, r.prototype._leave = function (e, i) {
                    var n = this.constructor.DATA_KEY;
                    (i = i || t(e.currentTarget).data(n)) || (i = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(n, i)), e && (i._activeTrigger["focusout" === e.type ? _.FOCUS : _.HOVER] = !1), i._isWithActiveTrigger() || (clearTimeout(i._timeout), i._hoverState = u.OUT, i.config.delay && i.config.delay.hide ? i._timeout = setTimeout(function () {
                        i._hoverState === u.OUT && i.hide()
                    }, i.config.delay.hide) : i.hide())
                }, r.prototype._isWithActiveTrigger = function () {
                    for (var t in this._activeTrigger) if (this._activeTrigger[t]) return !0;
                    return !1
                }, r.prototype._getConfig = function (i) {
                    return (i = t.extend({}, this.constructor.Default, t(this.element).data(), i)).delay && "number" == typeof i.delay && (i.delay = {
                        show: i.delay,
                        hide: i.delay
                    }), i.title && "number" == typeof i.title && (i.title = i.title.toString()), i.content && "number" == typeof i.content && (i.content = i.content.toString()), a.typeCheckConfig(e, i, this.constructor.DefaultType), i
                }, r.prototype._getDelegateConfig = function () {
                    var t = {};
                    if (this.config) for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
                    return t
                }, r.prototype._cleanTipClass = function () {
                    var e = t(this.getTipElement()), i = e.attr("class").match(l);
                    null !== i && i.length > 0 && e.removeClass(i.join(""))
                }, r.prototype._handlePopperPlacementChange = function (t) {
                    this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement))
                }, r.prototype._fixTransition = function () {
                    var e = this.getTipElement(), i = this.config.animation;
                    null === e.getAttribute("x-placement") && (t(e).removeClass(p.FADE), this.config.animation = !1, this.hide(), this.show(), this.config.animation = i)
                }, r._jQueryInterface = function (e) {
                    return this.each(function () {
                        var i = t(this).data("bs.tooltip"), s = "object" === (void 0 === e ? "undefined" : n(e)) && e;
                        if ((i || !/dispose|hide/.test(e)) && (i || (i = new r(this, s), t(this).data("bs.tooltip", i)), "string" == typeof e)) {
                            if (void 0 === i[e]) throw new Error('No method named "' + e + '"');
                            i[e]()
                        }
                    })
                }, s(r, null, [{
                    key: "VERSION", get: function () {
                        return "4.0.0-beta"
                    }
                }, {
                    key: "Default", get: function () {
                        return d
                    }
                }, {
                    key: "NAME", get: function () {
                        return e
                    }
                }, {
                    key: "DATA_KEY", get: function () {
                        return "bs.tooltip"
                    }
                }, {
                    key: "Event", get: function () {
                        return f
                    }
                }, {
                    key: "EVENT_KEY", get: function () {
                        return o
                    }
                }, {
                    key: "DefaultType", get: function () {
                        return h
                    }
                }]), r
            }();
        return t.fn[e] = m._jQueryInterface, t.fn[e].Constructor = m, t.fn[e].noConflict = function () {
            return t.fn[e] = r, m._jQueryInterface
        }, m
    }(jQuery));
    (function (a) {
        var r = "popover", l = ".bs.popover", h = a.fn[r], c = new RegExp("(^|\\s)bs-popover\\S+", "g"),
            d = a.extend({}, o.Default, {
                placement: "right",
                trigger: "click",
                content: "",
                template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
            }), u = a.extend({}, o.DefaultType, {content: "(string|element|function)"}),
            f = {FADE: "fade", SHOW: "show"}, p = {TITLE: ".popover-header", CONTENT: ".popover-body"}, g = {
                HIDE: "hide" + l,
                HIDDEN: "hidden" + l,
                SHOW: "show" + l,
                SHOWN: "shown" + l,
                INSERTED: "inserted" + l,
                CLICK: "click" + l,
                FOCUSIN: "focusin" + l,
                FOCUSOUT: "focusout" + l,
                MOUSEENTER: "mouseenter" + l,
                MOUSELEAVE: "mouseleave" + l
            }, _ = function (o) {
                function h() {
                    return i(this, h), t(this, o.apply(this, arguments))
                }

                return e(h, o), h.prototype.isWithContent = function () {
                    return this.getTitle() || this._getContent()
                }, h.prototype.addAttachmentClass = function (t) {
                    a(this.getTipElement()).addClass("bs-popover-" + t)
                }, h.prototype.getTipElement = function () {
                    return this.tip = this.tip || a(this.config.template)[0]
                }, h.prototype.setContent = function () {
                    var t = a(this.getTipElement());
                    this.setElementContent(t.find(p.TITLE), this.getTitle()), this.setElementContent(t.find(p.CONTENT), this._getContent()), t.removeClass(f.FADE + " " + f.SHOW)
                }, h.prototype._getContent = function () {
                    return this.element.getAttribute("data-content") || ("function" == typeof this.config.content ? this.config.content.call(this.element) : this.config.content)
                }, h.prototype._cleanTipClass = function () {
                    var t = a(this.getTipElement()), e = t.attr("class").match(c);
                    null !== e && e.length > 0 && t.removeClass(e.join(""))
                }, h._jQueryInterface = function (t) {
                    return this.each(function () {
                        var e = a(this).data("bs.popover"), i = "object" === (void 0 === t ? "undefined" : n(t)) ? t : null;
                        if ((e || !/destroy|hide/.test(t)) && (e || (e = new h(this, i), a(this).data("bs.popover", e)), "string" == typeof t)) {
                            if (void 0 === e[t]) throw new Error('No method named "' + t + '"');
                            e[t]()
                        }
                    })
                }, s(h, null, [{
                    key: "VERSION", get: function () {
                        return "4.0.0-beta"
                    }
                }, {
                    key: "Default", get: function () {
                        return d
                    }
                }, {
                    key: "NAME", get: function () {
                        return r
                    }
                }, {
                    key: "DATA_KEY", get: function () {
                        return "bs.popover"
                    }
                }, {
                    key: "Event", get: function () {
                        return g
                    }
                }, {
                    key: "EVENT_KEY", get: function () {
                        return l
                    }
                }, {
                    key: "DefaultType", get: function () {
                        return u
                    }
                }]), h
            }(o);
        a.fn[r] = _._jQueryInterface, a.fn[r].Constructor = _, a.fn[r].noConflict = function () {
            return a.fn[r] = h, _._jQueryInterface
        }
    })(jQuery), function (t) {
        var e = "scrollspy", o = t.fn[e], r = {offset: 10, method: "auto", target: ""},
            l = {offset: "number", method: "string", target: "(string|element)"}, h = {
                ACTIVATE: "activate.bs.scrollspy",
                SCROLL: "scroll.bs.scrollspy",
                LOAD_DATA_API: "load.bs.scrollspy.data-api"
            }, c = {DROPDOWN_ITEM: "dropdown-item", DROPDOWN_MENU: "dropdown-menu", ACTIVE: "active"}, d = {
                DATA_SPY: '[data-spy="scroll"]',
                ACTIVE: ".active",
                NAV_LIST_GROUP: ".nav, .list-group",
                NAV_LINKS: ".nav-link",
                LIST_ITEMS: ".list-group-item",
                DROPDOWN: ".dropdown",
                DROPDOWN_ITEMS: ".dropdown-item",
                DROPDOWN_TOGGLE: ".dropdown-toggle"
            }, u = {OFFSET: "offset", POSITION: "position"}, f = function () {
                function o(e, n) {
                    var s = this;
                    i(this, o), this._element = e, this._scrollElement = "BODY" === e.tagName ? window : e, this._config = this._getConfig(n), this._selector = this._config.target + " " + d.NAV_LINKS + "," + this._config.target + " " + d.LIST_ITEMS + "," + this._config.target + " " + d.DROPDOWN_ITEMS, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, t(this._scrollElement).on(h.SCROLL, function (t) {
                        return s._process(t)
                    }), this.refresh(), this._process()
                }

                return o.prototype.refresh = function () {
                    var e = this, i = this._scrollElement !== this._scrollElement.window ? u.POSITION : u.OFFSET,
                        n = "auto" === this._config.method ? i : this._config.method,
                        s = n === u.POSITION ? this._getScrollTop() : 0;
                    this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), t.makeArray(t(this._selector)).map(function (e) {
                        var i = void 0, o = a.getSelectorFromElement(e);
                        if (o && (i = t(o)[0]), i) {
                            var r = i.getBoundingClientRect();
                            if (r.width || r.height) return [t(i)[n]().top + s, o]
                        }
                        return null
                    }).filter(function (t) {
                        return t
                    }).sort(function (t, e) {
                        return t[0] - e[0]
                    }).forEach(function (t) {
                        e._offsets.push(t[0]), e._targets.push(t[1])
                    })
                }, o.prototype.dispose = function () {
                    t.removeData(this._element, "bs.scrollspy"), t(this._scrollElement).off(".bs.scrollspy"), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
                }, o.prototype._getConfig = function (i) {
                    if ("string" != typeof(i = t.extend({}, r, i)).target) {
                        var n = t(i.target).attr("id");
                        n || (n = a.getUID(e), t(i.target).attr("id", n)), i.target = "#" + n
                    }
                    return a.typeCheckConfig(e, i, l), i
                }, o.prototype._getScrollTop = function () {
                    return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
                }, o.prototype._getScrollHeight = function () {
                    return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
                }, o.prototype._getOffsetHeight = function () {
                    return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
                }, o.prototype._process = function () {
                    var t = this._getScrollTop() + this._config.offset, e = this._getScrollHeight(),
                        i = this._config.offset + e - this._getOffsetHeight();
                    if (this._scrollHeight !== e && this.refresh(), t >= i) {
                        var n = this._targets[this._targets.length - 1];
                        this._activeTarget !== n && this._activate(n)
                    } else {
                        if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();
                        for (var s = this._offsets.length; s--;) this._activeTarget !== this._targets[s] && t >= this._offsets[s] && (void 0 === this._offsets[s + 1] || t < this._offsets[s + 1]) && this._activate(this._targets[s])
                    }
                }, o.prototype._activate = function (e) {
                    this._activeTarget = e, this._clear();
                    var i = this._selector.split(",");
                    i = i.map(function (t) {
                        return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
                    });
                    var n = t(i.join(","));
                    n.hasClass(c.DROPDOWN_ITEM) ? (n.closest(d.DROPDOWN).find(d.DROPDOWN_TOGGLE).addClass(c.ACTIVE), n.addClass(c.ACTIVE)) : (n.addClass(c.ACTIVE), n.parents(d.NAV_LIST_GROUP).prev(d.NAV_LINKS + ", " + d.LIST_ITEMS).addClass(c.ACTIVE)), t(this._scrollElement).trigger(h.ACTIVATE, {relatedTarget: e})
                }, o.prototype._clear = function () {
                    t(this._selector).filter(d.ACTIVE).removeClass(c.ACTIVE)
                }, o._jQueryInterface = function (e) {
                    return this.each(function () {
                        var i = t(this).data("bs.scrollspy"), s = "object" === (void 0 === e ? "undefined" : n(e)) && e;
                        if (i || (i = new o(this, s), t(this).data("bs.scrollspy", i)), "string" == typeof e) {
                            if (void 0 === i[e]) throw new Error('No method named "' + e + '"');
                            i[e]()
                        }
                    })
                }, s(o, null, [{
                    key: "VERSION", get: function () {
                        return "4.0.0-beta"
                    }
                }, {
                    key: "Default", get: function () {
                        return r
                    }
                }]), o
            }();
        t(window).on(h.LOAD_DATA_API, function () {
            for (var e = t.makeArray(t(d.DATA_SPY)), i = e.length; i--;) {
                var n = t(e[i]);
                f._jQueryInterface.call(n, n.data())
            }
        }), t.fn[e] = f._jQueryInterface, t.fn[e].Constructor = f, t.fn[e].noConflict = function () {
            return t.fn[e] = o, f._jQueryInterface
        }
    }(jQuery), function (t) {
        var e = t.fn.tab, n = {
                HIDE: "hide.bs.tab",
                HIDDEN: "hidden.bs.tab",
                SHOW: "show.bs.tab",
                SHOWN: "shown.bs.tab",
                CLICK_DATA_API: "click.bs.tab.data-api"
            }, o = {DROPDOWN_MENU: "dropdown-menu", ACTIVE: "active", DISABLED: "disabled", FADE: "fade", SHOW: "show"},
            r = {
                DROPDOWN: ".dropdown",
                NAV_LIST_GROUP: ".nav, .list-group",
                ACTIVE: ".active",
                DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
                DROPDOWN_TOGGLE: ".dropdown-toggle",
                DROPDOWN_ACTIVE_CHILD: "> .dropdown-menu .active"
            }, l = function () {
                function e(t) {
                    i(this, e), this._element = t
                }

                return e.prototype.show = function () {
                    var e = this;
                    if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && t(this._element).hasClass(o.ACTIVE) || t(this._element).hasClass(o.DISABLED))) {
                        var i = void 0, s = void 0, l = t(this._element).closest(r.NAV_LIST_GROUP)[0],
                            h = a.getSelectorFromElement(this._element);
                        l && (s = t.makeArray(t(l).find(r.ACTIVE)), s = s[s.length - 1]);
                        var c = t.Event(n.HIDE, {relatedTarget: this._element}), d = t.Event(n.SHOW, {relatedTarget: s});
                        if (s && t(s).trigger(c), t(this._element).trigger(d), !d.isDefaultPrevented() && !c.isDefaultPrevented()) {
                            h && (i = t(h)[0]), this._activate(this._element, l);
                            var u = function () {
                                var i = t.Event(n.HIDDEN, {relatedTarget: e._element}),
                                    a = t.Event(n.SHOWN, {relatedTarget: s});
                                t(s).trigger(i), t(e._element).trigger(a)
                            };
                            i ? this._activate(i, i.parentNode, u) : u()
                        }
                    }
                }, e.prototype.dispose = function () {
                    t.removeData(this._element, "bs.tab"), this._element = null
                }, e.prototype._activate = function (e, i, n) {
                    var s = this, l = t(i).find(r.ACTIVE)[0],
                        h = n && a.supportsTransitionEnd() && l && t(l).hasClass(o.FADE), c = function () {
                            return s._transitionComplete(e, l, h, n)
                        };
                    l && h ? t(l).one(a.TRANSITION_END, c).emulateTransitionEnd(150) : c(), l && t(l).removeClass(o.SHOW)
                }, e.prototype._transitionComplete = function (e, i, n, s) {
                    if (i) {
                        t(i).removeClass(o.ACTIVE);
                        var l = t(i.parentNode).find(r.DROPDOWN_ACTIVE_CHILD)[0];
                        l && t(l).removeClass(o.ACTIVE), i.setAttribute("aria-expanded", !1)
                    }
                    if (t(e).addClass(o.ACTIVE), e.setAttribute("aria-expanded", !0), n ? (a.reflow(e), t(e).addClass(o.SHOW)) : t(e).removeClass(o.FADE), e.parentNode && t(e.parentNode).hasClass(o.DROPDOWN_MENU)) {
                        var h = t(e).closest(r.DROPDOWN)[0];
                        h && t(h).find(r.DROPDOWN_TOGGLE).addClass(o.ACTIVE), e.setAttribute("aria-expanded", !0)
                    }
                    s && s()
                }, e._jQueryInterface = function (i) {
                    return this.each(function () {
                        var n = t(this), s = n.data("bs.tab");
                        if (s || (s = new e(this), n.data("bs.tab", s)), "string" == typeof i) {
                            if (void 0 === s[i]) throw new Error('No method named "' + i + '"');
                            s[i]()
                        }
                    })
                }, s(e, null, [{
                    key: "VERSION", get: function () {
                        return "4.0.0-beta"
                    }
                }]), e
            }();
        t(document).on(n.CLICK_DATA_API, r.DATA_TOGGLE, function (e) {
            e.preventDefault(), l._jQueryInterface.call(t(this), "show")
        }), t.fn.tab = l._jQueryInterface, t.fn.tab.Constructor = l, t.fn.tab.noConflict = function () {
            return t.fn.tab = e, l._jQueryInterface
        }
    }(jQuery), function (t) {
        function e(e) {
            return this.each(function () {
                var s = t(this), a = s.data("bs.affix"), o = "object" == (void 0 === e ? "undefined" : n(e)) && e;
                a || s.data("bs.affix", a = new i(this, o)), "string" == typeof e && a[e]()
            })
        }

        var i = function e(i, n) {
            this.options = t.extend({}, e.DEFAULTS, n), this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element = t(i), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
        };
        i.VERSION = "3.3.6", i.RESET = "affix affix-top affix-bottom", i.DEFAULTS = {
            offset: 0,
            target: window
        }, i.prototype.getState = function (t, e, i, n) {
            var s = this.$target.scrollTop(), a = this.$element.offset(), o = this.$target.height();
            if (null != i && "top" == this.affixed) return s < i && "top";
            if ("bottom" == this.affixed) return null != i ? !(s + this.unpin <= a.top) && "bottom" : !(s + o <= t - n) && "bottom";
            var r = null == this.affixed, l = r ? s : a.top, h = r ? o : e;
            return null != i && s <= i ? "top" : null != n && l + h >= t - n && "bottom"
        }, i.prototype.getPinnedOffset = function () {
            if (this.pinnedOffset) return this.pinnedOffset;
            this.$element.removeClass(i.RESET).addClass("affix");
            var t = this.$target.scrollTop(), e = this.$element.offset();
            return this.pinnedOffset = e.top - t
        }, i.prototype.checkPositionWithEventLoop = function () {
            setTimeout(t.proxy(this.checkPosition, this), 1)
        }, i.prototype.checkPosition = function () {
            if (this.$element.is(":visible")) {
                var e = this.$element.height(), s = this.options.offset, a = s.top, o = s.bottom,
                    r = Math.max(t(document).height(), t(document.body).height());
                "object" != (void 0 === s ? "undefined" : n(s)) && (o = a = s), "function" == typeof a && (a = s.top(this.$element)), "function" == typeof o && (o = s.bottom(this.$element));
                var l = this.getState(r, e, a, o);
                if (this.affixed != l) {
                    null != this.unpin && this.$element.css("top", "");
                    var h = "affix" + (l ? "-" + l : ""), c = t.Event(h + ".bs.affix");
                    if (this.$element.trigger(c), c.isDefaultPrevented()) return;
                    this.affixed = l, this.unpin = "bottom" == l ? this.getPinnedOffset() : null, this.$element.removeClass(i.RESET).addClass(h).trigger(h.replace("affix", "affixed") + ".bs.affix")
                }
                "bottom" == l && this.$element.offset({top: r - e - o})
            }
        };
        var s = t.fn.affix;
        t.fn.affix = e, t.fn.affix.Constructor = i, t.fn.affix.noConflict = function () {
            return t.fn.affix = s, this
        }, t(window).on("load", function () {
            t('[data-spy="affix"]').each(function () {
                var i = t(this), n = i.data();
                n.offset = n.offset || {}, null != n.offsetBottom && (n.offset.bottom = n.offsetBottom), null != n.offsetTop && (n.offset.top = n.offsetTop), e.call(i, n)
            })
        })
    }(jQuery);
    !function (t, e) {
        function i() {
            return new Date(Date.UTC.apply(Date, arguments))
        }

        function s() {
            var t = new Date;
            return i(t.getFullYear(), t.getMonth(), t.getDate())
        }

        function a(t, e) {
            return t.getUTCFullYear() === e.getUTCFullYear() && t.getUTCMonth() === e.getUTCMonth() && t.getUTCDate() === e.getUTCDate()
        }

        function o(t) {
            return function () {
                return this[t].apply(this, arguments)
            }
        }

        function r(e, i) {
            var n = t(e).data(), s = {}, a = new RegExp("^" + i.toLowerCase() + "([A-Z])");
            i = new RegExp("^" + i.toLowerCase());
            for (var o in n) i.test(o) && (s[o.replace(a, function (t, e) {
                return e.toLowerCase()
            })] = n[o]);
            return s
        }

        function l(e) {
            var i = {};
            if (_[e] || (e = e.split("-")[0], _[e])) {
                var n = _[e];
                return t.each(g, function (t, e) {
                    e in n && (i[e] = n[e])
                }), i
            }
        }

        var h = function () {
            var e = {
                get: function (t) {
                    return this.slice(t)[0]
                }, contains: function (t) {
                    for (var e = t && t.valueOf(), i = 0, n = this.length; i < n; i++) if (this[i].valueOf() === e) return i;
                    return -1
                }, remove: function (t) {
                    this.splice(t, 1)
                }, replace: function (e) {
                    e && (t.isArray(e) || (e = [e]), this.clear(), this.push.apply(this, e))
                }, clear: function () {
                    this.length = 0
                }, copy: function () {
                    var t = new h;
                    return t.replace(this), t
                }
            };
            return function () {
                var i = [];
                return i.push.apply(i, arguments), t.extend(i, e), i
            }
        }(), c = function (e, i) {
            this._process_options(i), this.dates = new h, this.viewDate = this.o.defaultViewDate, this.focusDate = null, this.element = t(e), this.isInline = !1, this.isInput = this.element.is("input"), this.component = !!this.element.hasClass("date") && this.element.find(".add-on, .input-group-addon, .btn"), this.hasInput = this.component && this.element.find("input").length, this.component && 0 === this.component.length && (this.component = !1), this.picker = t(m.template), this._buildEvents(), this._attachEvents(), this.isInline ? this.picker.addClass("datepicker-inline").appendTo(this.element) : this.picker.addClass("datepicker-dropdown dropdown-menu"), this.o.rtl && this.picker.addClass("datepicker-rtl"), this.viewMode = this.o.startView, this.o.calendarWeeks && this.picker.find("tfoot .today, tfoot .clear").attr("colspan", function (t, e) {
                return parseInt(e) + 1
            }), this._allow_update = !1, this.setStartDate(this._o.startDate), this.setEndDate(this._o.endDate), this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled), this.setDatesDisabled(this.o.datesDisabled), this.fillDow(), this.fillMonths(), this._allow_update = !0, this.update(), this.showMode(), this.isInline && this.show()
        };
        c.prototype = {
            constructor: c, _process_options: function (e) {
                this._o = t.extend({}, this._o, e);
                var n = this.o = t.extend({}, this._o), a = n.language;
                switch (_[a] || (a = a.split("-")[0], _[a] || (a = p.language)), n.language = a, n.startView) {
                    case 2:
                    case"decade":
                        n.startView = 2;
                        break;
                    case 1:
                    case"year":
                        n.startView = 1;
                        break;
                    default:
                        n.startView = 0
                }
                switch (n.minViewMode) {
                    case 1:
                    case"months":
                        n.minViewMode = 1;
                        break;
                    case 2:
                    case"years":
                        n.minViewMode = 2;
                        break;
                    default:
                        n.minViewMode = 0
                }
                n.startView = Math.max(n.startView, n.minViewMode), !0 !== n.multidate && (n.multidate = Number(n.multidate) || !1, !1 !== n.multidate && (n.multidate = Math.max(0, n.multidate))), n.multidateSeparator = String(n.multidateSeparator), n.weekStart %= 7, n.weekEnd = (n.weekStart + 6) % 7;
                var o = m.parseFormat(n.format);
                if (n.startDate !== -1 / 0 && (n.startDate ? n.startDate instanceof Date ? n.startDate = this._local_to_utc(this._zero_time(n.startDate)) : n.startDate = m.parseDate(n.startDate, o, n.language) : n.startDate = -1 / 0), n.endDate !== 1 / 0 && (n.endDate ? n.endDate instanceof Date ? n.endDate = this._local_to_utc(this._zero_time(n.endDate)) : n.endDate = m.parseDate(n.endDate, o, n.language) : n.endDate = 1 / 0), n.daysOfWeekDisabled = n.daysOfWeekDisabled || [], t.isArray(n.daysOfWeekDisabled) || (n.daysOfWeekDisabled = n.daysOfWeekDisabled.split(/[,\s]*/)), n.daysOfWeekDisabled = t.map(n.daysOfWeekDisabled, function (t) {
                        return parseInt(t, 10)
                    }), n.datesDisabled = n.datesDisabled || [], !t.isArray(n.datesDisabled)) {
                    var r = [];
                    r.push(m.parseDate(n.datesDisabled, o, n.language)), n.datesDisabled = r
                }
                n.datesDisabled = t.map(n.datesDisabled, function (t) {
                    return m.parseDate(t, o, n.language)
                });
                var l = String(n.orientation).toLowerCase().split(/\s+/g), h = n.orientation.toLowerCase();
                if (l = t.grep(l, function (t) {
                        return /^auto|left|right|top|bottom$/.test(t)
                    }), n.orientation = {x: "auto", y: "auto"}, h && "auto" !== h) if (1 === l.length) switch (l[0]) {
                    case"top":
                    case"bottom":
                        n.orientation.y = l[0];
                        break;
                    case"left":
                    case"right":
                        n.orientation.x = l[0]
                } else h = t.grep(l, function (t) {
                    return /^left|right$/.test(t)
                }), n.orientation.x = h[0] || "auto", h = t.grep(l, function (t) {
                    return /^top|bottom$/.test(t)
                }), n.orientation.y = h[0] || "auto"; else ;
                if (n.defaultViewDate) {
                    var c = n.defaultViewDate.year || (new Date).getFullYear(), d = n.defaultViewDate.month || 0,
                        u = n.defaultViewDate.day || 1;
                    n.defaultViewDate = i(c, d, u)
                } else n.defaultViewDate = s();
                n.showOnFocus = void 0 === n.showOnFocus || n.showOnFocus
            }, _events: [], _secondaryEvents: [], _applyEvents: function (t) {
                for (var e, i, n, s = 0; s < t.length; s++) e = t[s][0], 2 === t[s].length ? (i = void 0, n = t[s][1]) : 3 === t[s].length && (i = t[s][1], n = t[s][2]), e.on(n, i)
            }, _unapplyEvents: function (t) {
                for (var e, i, n, s = 0; s < t.length; s++) e = t[s][0], 2 === t[s].length ? (n = void 0, i = t[s][1]) : 3 === t[s].length && (n = t[s][1], i = t[s][2]), e.off(i, n)
            }, _buildEvents: function () {
                var e = {
                    keyup: t.proxy(function (e) {
                        -1 === t.inArray(e.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) && this.update()
                    }, this), keydown: t.proxy(this.keydown, this)
                };
                !0 === this.o.showOnFocus && (e.focus = t.proxy(this.show, this)), this.isInput ? this._events = [[this.element, e]] : this.component && this.hasInput ? this._events = [[this.element.find("input"), e], [this.component, {click: t.proxy(this.show, this)}]] : this.element.is("div") ? this.isInline = !0 : this._events = [[this.element, {click: t.proxy(this.show, this)}]], this._events.push([this.element, "*", {
                    blur: t.proxy(function (t) {
                        this._focused_from = t.target
                    }, this)
                }], [this.element, {
                    blur: t.proxy(function (t) {
                        this._focused_from = t.target
                    }, this)
                }]), this._secondaryEvents = [[this.picker, {click: t.proxy(this.click, this)}], [t(window), {resize: t.proxy(this.place, this)}], [t(document), {
                    "mousedown touchstart": t.proxy(function (t) {
                        this.element.is(t.target) || this.element.find(t.target).length || this.picker.is(t.target) || this.picker.find(t.target).length || this.hide()
                    }, this)
                }]]
            }, _attachEvents: function () {
                this._detachEvents(), this._applyEvents(this._events)
            }, _detachEvents: function () {
                this._unapplyEvents(this._events)
            }, _attachSecondaryEvents: function () {
                this._detachSecondaryEvents(), this._applyEvents(this._secondaryEvents)
            }, _detachSecondaryEvents: function () {
                this._unapplyEvents(this._secondaryEvents)
            }, _trigger: function (e, i) {
                var n = i || this.dates.get(-1), s = this._utc_to_local(n);
                this.element.trigger({
                    type: e,
                    date: s,
                    dates: t.map(this.dates, this._utc_to_local),
                    format: t.proxy(function (t, e) {
                        0 === arguments.length ? (t = this.dates.length - 1, e = this.o.format) : "string" == typeof t && (e = t, t = this.dates.length - 1), e = e || this.o.format;
                        var i = this.dates.get(t);
                        return m.formatDate(i, e, this.o.language)
                    }, this)
                })
            }, show: function () {
                if (!this.element.attr("readonly")) return this.isInline || this.picker.appendTo(this.o.container), this.place(), this.picker.show(), this._attachSecondaryEvents(), this._trigger("show"), (window.navigator.msMaxTouchPoints || "ontouchstart" in document) && this.o.disableTouchKeyboard && t(this.element).blur(), this
            }, hide: function () {
                return this.isInline ? this : this.picker.is(":visible") ? (this.focusDate = null, this.picker.hide().detach(), this._detachSecondaryEvents(), this.viewMode = this.o.startView, this.showMode(), this.o.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val()) && this.setValue(), this._trigger("hide"), this) : this
            }, remove: function () {
                return this.hide(), this._detachEvents(), this._detachSecondaryEvents(), this.picker.remove(), delete this.element.data().datepicker, this.isInput || delete this.element.data().date, this
            }, _utc_to_local: function (t) {
                return t && new Date(t.getTime() + 6e4 * t.getTimezoneOffset())
            }, _local_to_utc: function (t) {
                return t && new Date(t.getTime() - 6e4 * t.getTimezoneOffset())
            }, _zero_time: function (t) {
                return t && new Date(t.getFullYear(), t.getMonth(), t.getDate())
            }, _zero_utc_time: function (t) {
                return t && new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()))
            }, getDates: function () {
                return t.map(this.dates, this._utc_to_local)
            }, getUTCDates: function () {
                return t.map(this.dates, function (t) {
                    return new Date(t)
                })
            }, getDate: function () {
                return this._utc_to_local(this.getUTCDate())
            }, getUTCDate: function () {
                var t = this.dates.get(-1);
                return void 0 !== t ? new Date(t) : null
            }, clearDates: function () {
                var t;
                this.isInput ? t = this.element : this.component && (t = this.element.find("input")), t && t.val("").change(), this.update(), this._trigger("changeDate"), this.o.autoclose && this.hide()
            }, setDates: function () {
                var e = t.isArray(arguments[0]) ? arguments[0] : arguments;
                return this.update.apply(this, e), this._trigger("changeDate"), this.setValue(), this
            }, setUTCDates: function () {
                var e = t.isArray(arguments[0]) ? arguments[0] : arguments;
                return this.update.apply(this, t.map(e, this._utc_to_local)), this._trigger("changeDate"), this.setValue(), this
            }, setDate: o("setDates"), setUTCDate: o("setUTCDates"), setValue: function () {
                var t = this.getFormattedDate();
                return this.isInput ? this.element.val(t).change() : this.component && this.element.find("input").val(t).change(), this
            }, getFormattedDate: function (e) {
                void 0 === e && (e = this.o.format);
                var i = this.o.language;
                return t.map(this.dates, function (t) {
                    return m.formatDate(t, e, i)
                }).join(this.o.multidateSeparator)
            }, setStartDate: function (t) {
                return this._process_options({startDate: t}), this.update(), this.updateNavArrows(), this
            }, setEndDate: function (t) {
                return this._process_options({endDate: t}), this.update(), this.updateNavArrows(), this
            }, setDaysOfWeekDisabled: function (t) {
                return this._process_options({daysOfWeekDisabled: t}), this.update(), this.updateNavArrows(), this
            }, setDatesDisabled: function (t) {
                this._process_options({datesDisabled: t}), this.update(), this.updateNavArrows()
            }, place: function () {
                if (this.isInline) return this;
                var e = this.picker.outerWidth(), i = this.picker.outerHeight(), n = t(this.o.container).width(),
                    s = t(this.o.container).height(), a = t(this.o.container).scrollTop(),
                    o = t(this.o.container).offset(), r = [];
                this.element.parents().each(function () {
                    var e = t(this).css("z-index");
                    "auto" !== e && 0 !== e && r.push(parseInt(e))
                });
                var l = Math.max.apply(Math, r) + 10,
                    h = this.component ? this.component.parent().offset() : this.element.offset(),
                    c = this.component ? this.component.outerHeight(!0) : this.element.outerHeight(!1),
                    d = this.component ? this.component.outerWidth(!0) : this.element.outerWidth(!1),
                    u = h.left - o.left, f = h.top - o.top;
                this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"), "auto" !== this.o.orientation.x ? (this.picker.addClass("datepicker-orient-" + this.o.orientation.x), "right" === this.o.orientation.x && (u -= e - d)) : h.left < 0 ? (this.picker.addClass("datepicker-orient-left"), u -= h.left - 10) : u + e > n ? (this.picker.addClass("datepicker-orient-right"), u = h.left + d - e) : this.picker.addClass("datepicker-orient-left");
                var p, g, _ = this.o.orientation.y;
                if ("auto" === _ && (p = -a + f - i, g = a + s - (f + c + i), _ = Math.max(p, g) === g ? "top" : "bottom"), this.picker.addClass("datepicker-orient-" + _), "top" === _ ? f += c : f -= i + parseInt(this.picker.css("padding-top")), this.o.rtl) {
                    var m = n - (u + d);
                    this.picker.css({top: f, right: m, zIndex: l})
                } else this.picker.css({top: f, left: u, zIndex: l});
                return this
            }, _allow_update: !0, update: function () {
                if (!this._allow_update) return this;
                var e = this.dates.copy(), i = [], n = !1;
                return arguments.length ? (t.each(arguments, t.proxy(function (t, e) {
                    e instanceof Date && (e = this._local_to_utc(e)), i.push(e)
                }, this)), n = !0) : (i = this.isInput ? this.element.val() : this.element.data("date") || this.element.find("input").val(), i = i && this.o.multidate ? i.split(this.o.multidateSeparator) : [i], delete this.element.data().date), i = t.map(i, t.proxy(function (t) {
                    return m.parseDate(t, this.o.format, this.o.language)
                }, this)), i = t.grep(i, t.proxy(function (t) {
                    return t < this.o.startDate || t > this.o.endDate || !t
                }, this), !0), this.dates.replace(i), this.dates.length ? this.viewDate = new Date(this.dates.get(-1)) : this.viewDate < this.o.startDate ? this.viewDate = new Date(this.o.startDate) : this.viewDate > this.o.endDate && (this.viewDate = new Date(this.o.endDate)), n ? this.setValue() : i.length && String(e) !== String(this.dates) && this._trigger("changeDate"), !this.dates.length && e.length && this._trigger("clearDate"), this.fill(), this
            }, fillDow: function () {
                var t = this.o.weekStart, e = "<tr>";
                if (this.o.calendarWeeks) {
                    this.picker.find(".datepicker-days thead tr:first-child .datepicker-switch").attr("colspan", function (t, e) {
                        return parseInt(e) + 1
                    });
                    e += '<th class="cw">&#160;</th>'
                }
                for (; t < this.o.weekStart + 7;) e += '<th class="dow">' + _[this.o.language].daysMin[t++ % 7] + "</th>";
                e += "</tr>", this.picker.find(".datepicker-days thead").append(e)
            }, fillMonths: function () {
                for (var t = "", e = 0; e < 12;) t += '<span class="month">' + _[this.o.language].monthsShort[e++] + "</span>";
                this.picker.find(".datepicker-months td").html(t)
            }, setRange: function (e) {
                e && e.length ? this.range = t.map(e, function (t) {
                    return t.valueOf()
                }) : delete this.range, this.fill()
            }, getClassNames: function (e) {
                var i = [], n = this.viewDate.getUTCFullYear(), s = this.viewDate.getUTCMonth(), o = new Date;
                return e.getUTCFullYear() < n || e.getUTCFullYear() === n && e.getUTCMonth() < s ? i.push("old") : (e.getUTCFullYear() > n || e.getUTCFullYear() === n && e.getUTCMonth() > s) && i.push("new"), this.focusDate && e.valueOf() === this.focusDate.valueOf() && i.push("focused"), this.o.todayHighlight && e.getUTCFullYear() === o.getFullYear() && e.getUTCMonth() === o.getMonth() && e.getUTCDate() === o.getDate() && i.push("today"), -1 !== this.dates.contains(e) && i.push("active"), (e.valueOf() < this.o.startDate || e.valueOf() > this.o.endDate || -1 !== t.inArray(e.getUTCDay(), this.o.daysOfWeekDisabled)) && i.push("disabled"), this.o.datesDisabled.length > 0 && t.grep(this.o.datesDisabled, function (t) {
                    return a(e, t)
                }).length > 0 && i.push("disabled", "disabled-date"), this.range && (e > this.range[0] && e < this.range[this.range.length - 1] && i.push("range"), -1 !== t.inArray(e.valueOf(), this.range) && i.push("selected")), i
            }, fill: function () {
                var e, n = new Date(this.viewDate), s = n.getUTCFullYear(), a = n.getUTCMonth(),
                    o = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCFullYear() : -1 / 0,
                    r = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCMonth() : -1 / 0,
                    l = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCFullYear() : 1 / 0,
                    h = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCMonth() : 1 / 0,
                    c = _[this.o.language].today || _.en.today || "", d = _[this.o.language].clear || _.en.clear || "";
                if (!isNaN(s) && !isNaN(a)) {
                    this.picker.find(".datepicker-days thead .datepicker-switch").text(_[this.o.language].months[a] + " " + s), this.picker.find("tfoot .today").text(c).toggle(!1 !== this.o.todayBtn), this.picker.find("tfoot .clear").text(d).toggle(!1 !== this.o.clearBtn), this.updateNavArrows(), this.fillMonths();
                    var u = i(s, a - 1, 28), f = m.getDaysInMonth(u.getUTCFullYear(), u.getUTCMonth());
                    u.setUTCDate(f), u.setUTCDate(f - (u.getUTCDay() - this.o.weekStart + 7) % 7);
                    var p = new Date(u);
                    p.setUTCDate(p.getUTCDate() + 42), p = p.valueOf();
                    for (var g, v = []; u.valueOf() < p;) {
                        if (u.getUTCDay() === this.o.weekStart && (v.push("<tr>"), this.o.calendarWeeks)) {
                            var y = new Date(+u + (this.o.weekStart - u.getUTCDay() - 7) % 7 * 864e5),
                                D = new Date(Number(y) + (11 - y.getUTCDay()) % 7 * 864e5),
                                T = new Date(Number(T = i(D.getUTCFullYear(), 0, 1)) + (11 - T.getUTCDay()) % 7 * 864e5),
                                E = (D - T) / 864e5 / 7 + 1;
                            v.push('<td class="cw">' + E + "</td>")
                        }
                        if ((g = this.getClassNames(u)).push("day"), this.o.beforeShowDay !== t.noop) {
                            var C = this.o.beforeShowDay(this._utc_to_local(u));
                            void 0 === C ? C = {} : "boolean" == typeof C ? C = {enabled: C} : "string" == typeof C && (C = {classes: C}), !1 === C.enabled && g.push("disabled"), C.classes && (g = g.concat(C.classes.split(/\s+/))), C.tooltip && (e = C.tooltip)
                        }
                        g = t.unique(g), v.push('<td class="' + g.join(" ") + '"' + (e ? ' title="' + e + '"' : "") + ">" + u.getUTCDate() + "</td>"), e = null, u.getUTCDay() === this.o.weekEnd && v.push("</tr>"), u.setUTCDate(u.getUTCDate() + 1)
                    }
                    this.picker.find(".datepicker-days tbody").empty().append(v.join(""));
                    var b = this.picker.find(".datepicker-months").find("th:eq(1)").text(s).end().find("span").removeClass("active");
                    if (t.each(this.dates, function (t, e) {
                            e.getUTCFullYear() === s && b.eq(e.getUTCMonth()).addClass("active")
                        }), (s < o || s > l) && b.addClass("disabled"), s === o && b.slice(0, r).addClass("disabled"), s === l && b.slice(h + 1).addClass("disabled"), this.o.beforeShowMonth !== t.noop) {
                        var w = this;
                        t.each(b, function (e, i) {
                            if (!t(i).hasClass("disabled")) {
                                var n = new Date(s, e, 1);
                                !1 === w.o.beforeShowMonth(n) && t(i).addClass("disabled")
                            }
                        })
                    }
                    v = "", s = 10 * parseInt(s / 10, 10);
                    var A = this.picker.find(".datepicker-years").find("th:eq(1)").text(s + "-" + (s + 9)).end().find("td");
                    s -= 1;
                    for (var I, S = t.map(this.dates, function (t) {
                        return t.getUTCFullYear()
                    }), O = -1; O < 11; O++) I = ["year"], -1 === O ? I.push("old") : 10 === O && I.push("new"), -1 !== t.inArray(s, S) && I.push("active"), (s < o || s > l) && I.push("disabled"), v += '<span class="' + I.join(" ") + '">' + s + "</span>", s += 1;
                    A.html(v)
                }
            }, updateNavArrows: function () {
                if (this._allow_update) {
                    var t = new Date(this.viewDate), e = t.getUTCFullYear(), i = t.getUTCMonth();
                    switch (this.viewMode) {
                        case 0:
                            this.o.startDate !== -1 / 0 && e <= this.o.startDate.getUTCFullYear() && i <= this.o.startDate.getUTCMonth() ? this.picker.find(".prev").css({visibility: "hidden"}) : this.picker.find(".prev").css({visibility: "visible"}), this.o.endDate !== 1 / 0 && e >= this.o.endDate.getUTCFullYear() && i >= this.o.endDate.getUTCMonth() ? this.picker.find(".next").css({visibility: "hidden"}) : this.picker.find(".next").css({visibility: "visible"});
                            break;
                        case 1:
                        case 2:
                            this.o.startDate !== -1 / 0 && e <= this.o.startDate.getUTCFullYear() ? this.picker.find(".prev").css({visibility: "hidden"}) : this.picker.find(".prev").css({visibility: "visible"}), this.o.endDate !== 1 / 0 && e >= this.o.endDate.getUTCFullYear() ? this.picker.find(".next").css({visibility: "hidden"}) : this.picker.find(".next").css({visibility: "visible"})
                    }
                }
            }, click: function (e) {
                e.preventDefault();
                var n, s, a, o = t(e.target).closest("span, td, th");
                if (1 === o.length) switch (o[0].nodeName.toLowerCase()) {
                    case"th":
                        switch (o[0].className) {
                            case"datepicker-switch":
                                this.showMode(1);
                                break;
                            case"prev":
                            case"next":
                                var r = m.modes[this.viewMode].navStep * ("prev" === o[0].className ? -1 : 1);
                                switch (this.viewMode) {
                                    case 0:
                                        this.viewDate = this.moveMonth(this.viewDate, r), this._trigger("changeMonth", this.viewDate);
                                        break;
                                    case 1:
                                    case 2:
                                        this.viewDate = this.moveYear(this.viewDate, r), 1 === this.viewMode && this._trigger("changeYear", this.viewDate)
                                }
                                this.fill();
                                break;
                            case"today":
                                var l = new Date;
                                l = i(l.getFullYear(), l.getMonth(), l.getDate(), 0, 0, 0), this.showMode(-2);
                                var h = "linked" === this.o.todayBtn ? null : "view";
                                this._setDate(l, h);
                                break;
                            case"clear":
                                this.clearDates()
                        }
                        break;
                    case"span":
                        o.hasClass("disabled") || (this.viewDate.setUTCDate(1), o.hasClass("month") ? (a = 1, s = o.parent().find("span").index(o), n = this.viewDate.getUTCFullYear(), this.viewDate.setUTCMonth(s), this._trigger("changeMonth", this.viewDate), 1 === this.o.minViewMode && this._setDate(i(n, s, a))) : (a = 1, s = 0, n = parseInt(o.text(), 10) || 0, this.viewDate.setUTCFullYear(n), this._trigger("changeYear", this.viewDate), 2 === this.o.minViewMode && this._setDate(i(n, s, a))), this.showMode(-1), this.fill());
                        break;
                    case"td":
                        o.hasClass("day") && !o.hasClass("disabled") && (a = parseInt(o.text(), 10) || 1, n = this.viewDate.getUTCFullYear(), s = this.viewDate.getUTCMonth(), o.hasClass("old") ? 0 === s ? (s = 11, n -= 1) : s -= 1 : o.hasClass("new") && (11 === s ? (s = 0, n += 1) : s += 1), this._setDate(i(n, s, a)))
                }
                this.picker.is(":visible") && this._focused_from && t(this._focused_from).focus(), delete this._focused_from
            }, _toggle_multidate: function (t) {
                var e = this.dates.contains(t);
                if (t || this.dates.clear(), -1 !== e ? (!0 === this.o.multidate || this.o.multidate > 1 || this.o.toggleActive) && this.dates.remove(e) : !1 === this.o.multidate ? (this.dates.clear(), this.dates.push(t)) : this.dates.push(t), "number" == typeof this.o.multidate) for (; this.dates.length > this.o.multidate;) this.dates.remove(0)
            }, _setDate: function (t, e) {
                e && "date" !== e || this._toggle_multidate(t && new Date(t)), e && "view" !== e || (this.viewDate = t && new Date(t)), this.fill(), this.setValue(), e && "view" === e || this._trigger("changeDate");
                var i;
                this.isInput ? i = this.element : this.component && (i = this.element.find("input")), i && i.change(), !this.o.autoclose || e && "date" !== e || this.hide()
            }, moveMonth: function (t, e) {
                if (t) {
                    if (!e) return t;
                    var i, n, s = new Date(t.valueOf()), a = s.getUTCDate(), o = s.getUTCMonth(), r = Math.abs(e);
                    if (e = e > 0 ? 1 : -1, 1 === r) n = -1 === e ? function () {
                        return s.getUTCMonth() === o
                    } : function () {
                        return s.getUTCMonth() !== i
                    }, i = o + e, s.setUTCMonth(i), (i < 0 || i > 11) && (i = (i + 12) % 12); else {
                        for (var l = 0; l < r; l++) s = this.moveMonth(s, e);
                        i = s.getUTCMonth(), s.setUTCDate(a), n = function () {
                            return i !== s.getUTCMonth()
                        }
                    }
                    for (; n();) s.setUTCDate(--a), s.setUTCMonth(i);
                    return s
                }
            }, moveYear: function (t, e) {
                return this.moveMonth(t, 12 * e)
            }, dateWithinRange: function (t) {
                return t >= this.o.startDate && t <= this.o.endDate
            }, keydown: function (t) {
                if (this.picker.is(":visible")) {
                    var e, i, n, a = !1, o = this.focusDate || this.viewDate;
                    switch (t.keyCode) {
                        case 27:
                            this.focusDate ? (this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill()) : this.hide(), t.preventDefault();
                            break;
                        case 37:
                        case 39:
                            if (!this.o.keyboardNavigation) break;
                            e = 37 === t.keyCode ? -1 : 1, t.ctrlKey ? (i = this.moveYear(this.dates.get(-1) || s(), e), n = this.moveYear(o, e), this._trigger("changeYear", this.viewDate)) : t.shiftKey ? (i = this.moveMonth(this.dates.get(-1) || s(), e), n = this.moveMonth(o, e), this._trigger("changeMonth", this.viewDate)) : ((i = new Date(this.dates.get(-1) || s())).setUTCDate(i.getUTCDate() + e), (n = new Date(o)).setUTCDate(o.getUTCDate() + e)), this.dateWithinRange(n) && (this.focusDate = this.viewDate = n, this.setValue(), this.fill(), t.preventDefault());
                            break;
                        case 38:
                        case 40:
                            if (!this.o.keyboardNavigation) break;
                            e = 38 === t.keyCode ? -1 : 1, t.ctrlKey ? (i = this.moveYear(this.dates.get(-1) || s(), e), n = this.moveYear(o, e), this._trigger("changeYear", this.viewDate)) : t.shiftKey ? (i = this.moveMonth(this.dates.get(-1) || s(), e), n = this.moveMonth(o, e), this._trigger("changeMonth", this.viewDate)) : ((i = new Date(this.dates.get(-1) || s())).setUTCDate(i.getUTCDate() + 7 * e), (n = new Date(o)).setUTCDate(o.getUTCDate() + 7 * e)), this.dateWithinRange(n) && (this.focusDate = this.viewDate = n, this.setValue(), this.fill(), t.preventDefault());
                            break;
                        case 32:
                            break;
                        case 13:
                            o = this.focusDate || this.dates.get(-1) || this.viewDate, this.o.keyboardNavigation && (this._toggle_multidate(o), a = !0), this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.setValue(), this.fill(), this.picker.is(":visible") && (t.preventDefault(), "function" == typeof t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0, this.o.autoclose && this.hide());
                            break;
                        case 9:
                            this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill(), this.hide()
                    }
                    if (a) {
                        this.dates.length ? this._trigger("changeDate") : this._trigger("clearDate");
                        var r;
                        this.isInput ? r = this.element : this.component && (r = this.element.find("input")), r && r.change()
                    }
                } else 27 === t.keyCode && this.show()
            }, showMode: function (t) {
                t && (this.viewMode = Math.max(this.o.minViewMode, Math.min(2, this.viewMode + t))), this.picker.children("div").hide().filter(".datepicker-" + m.modes[this.viewMode].clsName).css("display", "block"), this.updateNavArrows()
            }
        };
        var d = function (e, i) {
            this.element = t(e), this.inputs = t.map(i.inputs, function (t) {
                return t.jquery ? t[0] : t
            }), delete i.inputs, f.call(t(this.inputs), i).bind("changeDate", t.proxy(this.dateUpdated, this)), this.pickers = t.map(this.inputs, function (e) {
                return t(e).data("datepicker")
            }), this.updateDates()
        };
        d.prototype = {
            updateDates: function () {
                this.dates = t.map(this.pickers, function (t) {
                    return t.getUTCDate()
                }), this.updateRanges()
            }, updateRanges: function () {
                var e = t.map(this.dates, function (t) {
                    return t.valueOf()
                });
                t.each(this.pickers, function (t, i) {
                    i.setRange(e)
                })
            }, dateUpdated: function (e) {
                if (!this.updating) {
                    this.updating = !0;
                    var i = t(e.target).data("datepicker").getUTCDate(), n = t.inArray(e.target, this.inputs),
                        s = n - 1, a = n + 1, o = this.inputs.length;
                    if (-1 !== n) {
                        if (t.each(this.pickers, function (t, e) {
                                e.getUTCDate() || e.setUTCDate(i)
                            }), i < this.dates[s]) for (; s >= 0 && i < this.dates[s];) this.pickers[s--].setUTCDate(i); else if (i > this.dates[a]) for (; a < o && i > this.dates[a];) this.pickers[a++].setUTCDate(i);
                        this.updateDates(), delete this.updating
                    }
                }
            }, remove: function () {
                t.map(this.pickers, function (t) {
                    t.remove()
                }), delete this.element.data().datepicker
            }
        };
        var u = t.fn.datepicker, f = function (e) {
            var i = Array.apply(null, arguments);
            i.shift();
            var s;
            return this.each(function () {
                var a = t(this), o = a.data("datepicker"), h = "object" === (void 0 === e ? "undefined" : n(e)) && e;
                if (!o) {
                    var u = r(this, "date"), f = l(t.extend({}, p, u, h).language), g = t.extend({}, p, f, u, h);
                    if (a.hasClass("input-daterange") || g.inputs) {
                        var _ = {inputs: g.inputs || a.find("input").toArray()};
                        a.data("datepicker", o = new d(this, t.extend(g, _)))
                    } else a.data("datepicker", o = new c(this, g))
                }
                if ("string" == typeof e && "function" == typeof o[e] && void 0 !== (s = o[e].apply(o, i))) return !1
            }), void 0 !== s ? s : this
        };
        t.fn.datepicker = f;
        var p = t.fn.datepicker.defaults = {
            autoclose: !1,
            beforeShowDay: t.noop,
            beforeShowMonth: t.noop,
            calendarWeeks: !1,
            clearBtn: !1,
            toggleActive: !1,
            daysOfWeekDisabled: [],
            datesDisabled: [],
            endDate: 1 / 0,
            forceParse: !0,
            format: "mm/dd/yyyy",
            keyboardNavigation: !0,
            language: "en",
            minViewMode: 0,
            multidate: !1,
            multidateSeparator: ",",
            orientation: "auto",
            rtl: !1,
            startDate: -1 / 0,
            startView: 0,
            todayBtn: !1,
            todayHighlight: !1,
            weekStart: 0,
            disableTouchKeyboard: !1,
            container: "body"
        }, g = t.fn.datepicker.locale_opts = ["format", "rtl", "weekStart"];
        t.fn.datepicker.Constructor = c;
        var _ = t.fn.datepicker.dates = {
            en: {
                days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                today: "Today",
                clear: "Clear"
            }
        }, m = {
            modes: [{clsName: "days", navFnc: "Month", navStep: 1}, {
                clsName: "months",
                navFnc: "FullYear",
                navStep: 1
            }, {clsName: "years", navFnc: "FullYear", navStep: 10}],
            isLeapYear: function (t) {
                return t % 4 == 0 && t % 100 != 0 || t % 400 == 0
            },
            getDaysInMonth: function (t, e) {
                return [31, m.isLeapYear(t) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e]
            },
            validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
            nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
            parseFormat: function (t) {
                var e = t.replace(this.validParts, "\0").split("\0"), i = t.match(this.validParts);
                if (!e || !e.length || !i || 0 === i.length) throw new Error("Invalid date format.");
                return {separators: e, parts: i}
            },
            parseDate: function (e, n, s) {
                function a() {
                    var t = this.slice(0, d[l].length), e = d[l].slice(0, t.length);
                    return t.toLowerCase() === e.toLowerCase()
                }

                if (e) {
                    if (e instanceof Date) return e;
                    "string" == typeof n && (n = m.parseFormat(n));
                    var o, r, l, h = /([\-+]\d+)([dmwy])/, d = e.match(/([\-+]\d+)([dmwy])/g);
                    if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(e)) {
                        for (e = new Date, l = 0; l < d.length; l++) switch (o = h.exec(d[l]), r = parseInt(o[1]), o[2]) {
                            case"d":
                                e.setUTCDate(e.getUTCDate() + r);
                                break;
                            case"m":
                                e = c.prototype.moveMonth.call(c.prototype, e, r);
                                break;
                            case"w":
                                e.setUTCDate(e.getUTCDate() + 7 * r);
                                break;
                            case"y":
                                e = c.prototype.moveYear.call(c.prototype, e, r)
                        }
                        return i(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate(), 0, 0, 0)
                    }
                    d = e && e.match(this.nonpunctuation) || [], e = new Date;
                    var u, f, p = {}, g = ["yyyy", "yy", "M", "MM", "m", "mm", "d", "dd"], v = {
                        yyyy: function (t, e) {
                            return t.setUTCFullYear(e)
                        }, yy: function (t, e) {
                            return t.setUTCFullYear(2e3 + e)
                        }, m: function (t, e) {
                            if (isNaN(t)) return t;
                            for (e -= 1; e < 0;) e += 12;
                            for (e %= 12, t.setUTCMonth(e); t.getUTCMonth() !== e;) t.setUTCDate(t.getUTCDate() - 1);
                            return t
                        }, d: function (t, e) {
                            return t.setUTCDate(e)
                        }
                    };
                    v.M = v.MM = v.mm = v.m, v.dd = v.d, e = i(e.getFullYear(), e.getMonth(), e.getDate(), 0, 0, 0);
                    var y = n.parts.slice();
                    if (d.length !== y.length && (y = t(y).filter(function (e, i) {
                            return -1 !== t.inArray(i, g)
                        }).toArray()), d.length === y.length) {
                        var D;
                        for (l = 0, D = y.length; l < D; l++) {
                            if (u = parseInt(d[l], 10), o = y[l], isNaN(u)) switch (o) {
                                case"MM":
                                    f = t(_[s].months).filter(a), u = t.inArray(f[0], _[s].months) + 1;
                                    break;
                                case"M":
                                    f = t(_[s].monthsShort).filter(a), u = t.inArray(f[0], _[s].monthsShort) + 1
                            }
                            p[o] = u
                        }
                        var T, E;
                        for (l = 0; l < g.length; l++) (E = g[l]) in p && !isNaN(p[E]) && (T = new Date(e), v[E](T, p[E]), isNaN(T) || (e = T))
                    }
                    return e
                }
            },
            formatDate: function (e, i, n) {
                if (!e) return "";
                "string" == typeof i && (i = m.parseFormat(i));
                var s = {
                    d: e.getUTCDate(),
                    D: _[n].daysShort[e.getUTCDay()],
                    DD: _[n].days[e.getUTCDay()],
                    m: e.getUTCMonth() + 1,
                    M: _[n].monthsShort[e.getUTCMonth()],
                    MM: _[n].months[e.getUTCMonth()],
                    yy: e.getUTCFullYear().toString().substring(2),
                    yyyy: e.getUTCFullYear()
                };
                s.dd = (s.d < 10 ? "0" : "") + s.d, s.mm = (s.m < 10 ? "0" : "") + s.m, e = [];
                for (var a = t.extend([], i.separators), o = 0, r = i.parts.length; o <= r; o++) a.length && e.push(a.shift()), e.push(s[i.parts[o]]);
                return e.join("")
            },
            headTemplate: '<thead><tr><th class="prev">&#171;</th><th colspan="5" class="datepicker-switch"></th><th class="next">&#187;</th></tr></thead>',
            contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
            footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'
        };
        m.template = '<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">' + m.headTemplate + "<tbody></tbody>" + m.footTemplate + '</table></div><div class="datepicker-months"><table class="table-condensed">' + m.headTemplate + m.contTemplate + m.footTemplate + '</table></div><div class="datepicker-years"><table class="table-condensed">' + m.headTemplate + m.contTemplate + m.footTemplate + "</table></div></div>", t.fn.datepicker.DPGlobal = m, t.fn.datepicker.noConflict = function () {
            return t.fn.datepicker = u, this
        }, t(document).on("focus.datepicker.data-api click.datepicker.data-api", '[data-provide="datepicker"]', function (e) {
            var i = t(this);
            i.data("datepicker") || (e.preventDefault(), f.call(i, "show"))
        }), t(function () {
            f.call(t('[data-provide="datepicker-inline"]'))
        })
    }(window.jQuery)
}();