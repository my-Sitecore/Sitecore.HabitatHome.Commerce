﻿/*
Details Element Polyfill 1.1.0
Copyright © 2017 Javan Makhmali
 */
(function() {}).call(this),
    function() {
        if (document.querySelector('body').getAttribute('class').indexOf('on-page-editor') > -1) {
            return;
        }

        var t, e, n, r, o, u, i, a, l, c;
        a = {
                element: function() {
                    var t, e, n, r, o;
                    return e = document.createElement("details"), "open" in e ? (e.innerHTML = "<summary>a</summary>b", e.setAttribute("style", "position: absolute; left: -9999px"), r = null != (o = document.body) ? o : document.documentElement, r.appendChild(e), t = e.offsetHeight, e.open = !0, n = e.offsetHeight, r.removeChild(e), t !== n) : !1
                }(),
                toggleEvent: function() {
                    var t;
                    return t = document.createElement("details"), "ontoggle" in t
                }()
            },
            a.element && a.toggleEvent || (o = function() {
                    return document.head.insertAdjacentHTML("afterbegin", '<style>@charset"UTF-8";details:not([open])>*:not(summary){display:none;}details>summary{display:block;}details>summary::before{content:"\u25ba";padding-right:0.3rem;font-size:0.6rem;cursor:default;}details[open]>summary::before{content:"\u25bc";}</style>')
                },
                r = function() {
                    var t, e, n, r, o;
                    return t = document.createElement("details").constructor.prototype, r = t.setAttribute, n = t.removeAttribute, o = null != (e = Object.getOwnPropertyDescriptor(t, "open")) ? e.set : void 0, Object.defineProperties(t, {
                        open: {
                            set: function(t) {
                                return "DETAILS" === this.tagName ? (t ? this.setAttribute("open", "") : this.removeAttribute("open"), t) : null != o ? o.call(this, t) : void 0
                            }
                        },
                        setAttribute: {
                            value: function(t, e) {
                                return c(this, function(n) {
                                    return function() {
                                        return r.call(n, t, e)
                                    }
                                }(this))
                            }
                        },
                        removeAttribute: {
                            value: function(t) {
                                return c(this, function(e) {
                                    return function() {
                                        return n.call(e, t)
                                    }
                                }(this))
                            }
                        }
                    })
                }, u = function() {
                    return n(function(t) {
                        return t.hasAttribute("open") ? t.removeAttribute("open") : t.setAttribute("open", "")
                    })
                }, i = function() {
                    var t;
                    return "undefined" != typeof MutationObserver && null !== MutationObserver ? (t = new MutationObserver(function(t) {
                        var e, n, r, o, u, i;
                        for (u = [], n = 0, r = t.length; r > n; n++) o = t[n], i = o.target, e = o.attributeName, "DETAILS" === i.tagName && "open" === e ? u.push(l(i)) : u.push(void 0);
                        return u
                    }), t.observe(document.documentElement, {
                        attributes: !0,
                        subtree: !0
                    })) : n(function(t) {
                        var e;
                        return e = t.getAttribute("open"), setTimeout(function() {
                            return t.getAttribute("open") !== e ? l(t) : void 0
                        }, 1)
                    })
                }, t = function(t) {
                    return !(t.defaultPrevented || t.which > 1 || t.altKey || t.ctrlKey || t.metaKey || t.shiftKey || t.target.isContentEditable)
                }, n = function(n) {
                    return addEventListener("click", function(r) {
                        var o, u;
                        return t(r) && (o = e(r.target, "SUMMARY")) && "DETAILS" === (null != (u = o.parentElement) ? u.tagName : void 0) ? n(o.parentElement) : void 0
                    }, !1)
                }, e = function() {
                    return "function" == typeof Element.prototype.closest ? function(t, e) {
                        return t.closest(e)
                    } : function(t, e) {
                        for (; t;) {
                            if (t.tagName === e) return t;
                            t = t.parentElement
                        }
                    }
                }(), l = function(t) {
                    var e;
                    return e = document.createEvent("Events"), e.initEvent("toggle", !0, !1), t.dispatchEvent(e)
                }, c = function(t, e) {
                    var n, r;
                    return n = t.getAttribute("open"), r = e(), t.getAttribute("open") !== n && l(t), r
                }, a.element || (o(), r(), u()), a.element && !a.toggleEvent && i())
    }.call(this),
    function() {}.call(this);