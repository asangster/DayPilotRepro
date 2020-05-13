/* Copyright 2005 - 2020 Annpoint, s.r.o.
   Use of this software is subject to license terms.
   https://www.daypilot.org/
*/

if (typeof DayPilot === 'undefined') {
    var DayPilot = {};
}

if (typeof DayPilot.Global === 'undefined') {
    DayPilot.Global = {};
}

(function(DayPilot) {
    

    if (typeof DayPilot.Bubble !== 'undefined') {
        return;
    }

    var DayPilotBubble = {};

    DayPilotBubble.mouseMove = function(ev) {
        if (typeof(DayPilotBubble) === 'undefined') {
            return;
        }
        DayPilotBubble.mouse = DayPilotBubble.mousePosition(ev);

        var b = DayPilotBubble.active;
        if (b && b._state.showPosition) {
            var pos1 = b._state.showPosition;
            var pos2 = DayPilotBubble.mouse;
            if (pos1.clientX !== pos2.clientX || pos1.clientY !== pos2.clientY) {
                // b.delayedHide();
            }
        }
    };

    DayPilotBubble.touchPosition = function(ev) {
        if (!ev || !ev.touches) {
            return null;
        }
        var touch = ev.touches[0];
        var mouse = {};
        mouse.x = touch.pageX;
        mouse.y = touch.pageY;
        mouse.clientX = touch.clientX;
        mouse.clientY = touch.clientY;
        return mouse;

    };

    DayPilotBubble.mousePosition = function(e) {
        // var result = DayPilot.mo3(document.body, e);
        var result = DayPilot.mo3(null, e);
        if (e) {
            result.clientY = e.clientY;
            result.clientX = e.clientX;
        }
        return result;
    };

    DayPilot.Bubble = function(options) {
        this.v = '2020.2.6016';

        var bubble = this;
        var elements = {};

        // default property values
        this.hideAfter = 500;
        this.loadingText = "Loading...";
        this.animated = true;
        this.animation = "fast";
        this.position = "Above";
        this.hideOnClick = true;
        this.showAfter = 500;
        this.showLoadingLabel = true;
        this.zIndex = 10;
        this.theme = "bubble_default";

        this.onLoad = null;
        this.onBeforeDomAdd = null;
        this.onBeforeDomRemove = null;

        // hiding for angular
        this._state = function() {};

        this.callBack = function(args) {
            if (this.aspnet()) {
                WebForm_DoCallback(this.uniqueID, JSON.stringify(args), this.updateView, this, this.callbackError, true);
            }
            else {
                if (args.calendar.internal.bubbleCallBack) {
                    args.calendar.internal.bubbleCallBack(args, this);
                }
                else {
                    args.calendar.bubbleCallBack(args, this);
                }
            }
        };

        this.callbackError = function (result, context) {
            alert(result);
        };

        this.updateView = function(result, context) {

            // context should equal to bubble
            if (bubble !== context) {
                throw "Callback object mismatch (internal error)";
            }
            if (!result) {
                bubble._removeDiv();
                // bubble.removeShadow();
                return;
            }

            var domArgs = null;
            var html = null;
            var element = null;
            if (typeof result === "string") {
                html = result;
            }
            else if (typeof result === "object") {
                domArgs = result;
                html = result.html;
                element = result.element;
            }

            DayPilotBubble.active = bubble;
            if (bubble) {
                var doUpdate = false;
                if (elements.div) {
                    if (element) {
                        elements.div.firstChild.innerHTML = '';

                        var isReactComponent = DayPilot.Util.isReactComponent(element);
                        if (isReactComponent) {
                            var reactDom = bubble._ref.calendar && bubble._ref.calendar.internal.reactRefs().reactDOM;
                            if (!reactDom) {
                                throw new DayPilot.Exception("Can't reach ReactDOM");
                            }
                            reactDom.render(element, elements.div.firstChild);
                        }
                        else {
                            elements.div.firstChild.appendChild(element);
                        }
                        doUpdate = true;
                    }
                    else if (html) {
                        elements.div.firstChild.innerHTML = html;
                        doUpdate = true;
                    }
                    elements.div.domArgs = domArgs;
                }
                if (doUpdate) {
                    bubble._adjustPosition();
                }
            }
        };

        this.init = function() {
            // moved to global init code
            //DayPilot.re(document.body, 'mousemove', DayPilotBubble.mouseMove);
        };

        this.aspnet = function() {
            return (typeof WebForm_DoCallback !== 'undefined');
        };

        this.showEvent = function(e, now) {
            var a = new DayPilotBubble.CallBackArgs(e.calendar || e.root, 'Event', e, e.bubbleHtml ? e.bubbleHtml() : null);
            if (now) {
                this.show(a);
            }
            else {
                this.showOnMouseOver(a);
            }
        };

        this.showCell = function(cell) {
            DayPilotBubble.cancelShowing();
            var a = new DayPilotBubble.CallBackArgs(cell.calendar || cell.root, 'Cell', cell, cell.staticBubbleHTML ? cell.staticBubbleHTML() : null);
            this.showOnMouseOver(a);
        };

        this.showLink = function(link) {
            DayPilotBubble.cancelShowing();
            var a = new DayPilotBubble.CallBackArgs(link.calendar || link.root, 'Cell', link, link.data && link.data.bubbleHtml);
            this.showOnMouseOver(a);
        };

        this.showTime = function(time) {
            var a = new DayPilotBubble.CallBackArgs(time.calendar || time.root, 'Time', time, time.staticBubbleHTML ? time.staticBubbleHTML() : null);
            this.showOnMouseOver(a);
        };

        this.showResource = function(row, now) {
           /* var isRow = DayPilot.Row && row instanceof DayPilot.Row;
            var isColumn = DayPilot.Column && row instanceof DayPilot.Column;
            var rowOrCol = isRow || isColumn;

            if (!rowOrCol) {
                throw new DayPilot.Exception("DayPilot.Row or DayPilot.Column object expected");
            }*/

            var res = {};
            res.calendar = row.calendar;
            res.id = row.id;
            res.name = row.name;
            res.start = row.start;
            if (row.bubbleHtml) {
                res.bubbleHtml = function() {
                    return row.bubbleHtml;
                };
            }
            else if (row.data && row.data.bubbleHtml) {
                res.bubbleHtml = function() {
                    return row.data.bubbleHtml;
                };
            }
            res.toJSON = function() {
                var json = {};
                json.id = this.id;
                return json;
            };

            var a = new DayPilotBubble.CallBackArgs(res.calendar || res.root, 'Resource', res, res.bubbleHtml ? res.bubbleHtml() : null);
            a.div = row.div;

            if (now) {
                this.show(a);
            }
            else {
                this.showOnMouseOver(a);
            }
        };

        this.showHtml = function(html, div) {
            var a = new DayPilotBubble.CallBackArgs(null, 'Html', null, html);
            a.div = div;
            this.show(a);
        };

        this.show = function(callbackArgument) {

            if (!bubble._anythingToDisplay(callbackArgument)) {
                return;
            }

            var pop = this.animated;

            this._state.showPosition = DayPilotBubble.mouse;

            DayPilotBubble.showing = null;

            if (!DayPilotBubble.mouse) {
                // wait a bit
                setTimeout(function() {
                    bubble.show(callbackArgument);
                }, 100);
                return;
            }

            var ref = this.getDiv(callbackArgument);
            if (bubble._resolvedPosition() === "Above" && ref) {
                var margin = 2;
                var abs = DayPilot.abs(ref, true);
                if (!abs) {
                    return;
                }

                this._state.mouse = DayPilotBubble.mouse;
                this._state.mouse.x = abs.x;
                this._state.mouse.y = abs.y;
                this._state.mouse.h = abs.h + margin;
                this._state.mouse.w = abs.w;
            }
            else {
                // fix the position to the original location (don't move it in adjustPosition after callback)
                this._state.mouse = DayPilotBubble.mouse;
            }

            var id;
            try {
                id = JSON.stringify(callbackArgument.object);
            }
            catch (e) {
                return; // unable to serialize, it's an invalid event (might have been cleared already)
            }

            if (DayPilotBubble.active === this && this._state.sourceId === id) { // don't show, it's already visible
                return;
            }
            if (typeof DayPilot.Menu !== 'undefined' && DayPilot.Menu.active) { // don't show the bubble if a menu is active
                return;
            }

            // hide whatever might be visible (we are going to show another one)
            DayPilotBubble.hideActive();

            DayPilotBubble.active = this;
            this._state.sourceId = id;

            var div = document.createElement("div");
            div.setAttribute("unselectable", "on");
            div.style.position = 'absolute';

            //if (!this.showLoadingLabel && !pop) {
            if (!this.showLoadingLabel) {
                div.style.display = 'none';
            }

            div.className = this._prefixCssClass("_main");

            div.style.top = '0px';
            div.style.left = '0px';
            div.style.zIndex = this.zIndex + 1;

            if (pop) {
                div.style.visibility = 'hidden';
            }

            if (this.hideOnClick) {
                div.onclick = function() {
                    DayPilotBubble.hideActive();
                };
            }

            div.onmousemove = function(e) {
                // prevent other bubbles to become active (may cause just hiding the current one if no html is specified)
                DayPilotBubble.cancelShowing();

                DayPilotBubble.cancelHiding();
                var e = e || window.event;
                e.cancelBubble = true;
            };
            div.oncontextmenu = function() { return false; };
            div.onmouseout = function() { bubble.delayedHide(); };

            var inner = document.createElement("div");
            div.appendChild(inner);

            inner.className = this._prefixCssClass("_main_inner");
            inner.innerHTML = this.loadingText;

            document.body.appendChild(div);

            elements.div = div;

            // bubble._calendar = callbackArgument.calendar;

            bubble._ref = function() {};
            bubble._ref.calendar = callbackArgument.calendar;

            var args = {};
            args.source = callbackArgument.object;
            args.async = false;
            args.html = callbackArgument.staticHTML;
            args.loaded = function() {
                // make sure it's marked as async
                if (this.async) {
                    // bubble.updateView(args.html, bubble);
                    bubble._domAdd(args);
                }
            };

            if (this.showLoadingLabel && !pop) {
                this._adjustPosition();
                // this.addShadow();
            }

            if (callbackArgument.staticHTML  && typeof this.onLoad !== 'function') {
                // this.updateView(callbackArgument.staticHTML, this);
                bubble._domAdd(args);
            }
            else if (typeof this.onLoad === 'function') {
                this.onLoad(args);

                // not async, show now
                if (!args.async) {
                    // bubble.updateView(args.html, bubble);
                    bubble._domAdd(args);
                }
            }
            else if (typeof bubble.onDomAdd === "function" || typeof bubble.onBeforeDomAdd === "function") {
                bubble._domAdd(args);
            }
            else if (this._serverBased(callbackArgument)) {
                this.callBack(callbackArgument);
            }
        };

        this._anythingToDisplay = function(callbackArgument) {
            if (callbackArgument.staticHTML) {
                return true;
            }
            if (typeof this.onLoad === 'function') {
                return true;
            }
            if (typeof bubble.onDomAdd === "function" || typeof bubble.onBeforeDomAdd === "function") {
                return true;
            }
            if (this._serverBased(callbackArgument)) {
                return true;
            }
            return false;
        };

        this._domAdd = function(loadArgs) {
            var args = {};
            args.source = loadArgs.source;
            args.html = loadArgs.html;
            args.element = null;

            // legacy, to be removed
            if (typeof bubble.onDomAdd === "function") {
                bubble.onDomAdd(args);
            }

            if (typeof bubble.onBeforeDomAdd === "function") {
                bubble.onBeforeDomAdd(args);
            }

            bubble.updateView(args, bubble);

        };

        this.getDiv = function(callbackArgument) {
            if (callbackArgument.div) {
                return callbackArgument.div;
            }
            if (callbackArgument.type === 'Event' && callbackArgument.calendar && callbackArgument.calendar.internal.findEventDiv) {
                return callbackArgument.calendar.internal.findEventDiv(callbackArgument.object);
            }

        };

        this._prefixCssClass = function(part) {
            var prefix = this.theme || this.cssClassPrefix;
            if (prefix) {
                return prefix + part;
            }
            else {
                return "";
            }
        };


        this._resolvedPosition = function() {
            var pos = bubble.position;
            if (!pos) {
                return "Above";
            }
            if (pos.toLowerCase() === "eventtop") {
                return "Above";
            }
            if (pos.toLowerCase() === "above") {
                return "Above";
            }
            if (pos.toLowerCase() === "mouse") {
                return "Mouse";
            }
            throw new DayPilot.Error("Unrecognized DayPilot.Bubble.position value: " + pos);
        };

        this._adjustPosition = function() {

            var pop = this.animated;

            var position = bubble._resolvedPosition();

            var windowPadding = 10; // used for both horizontal and vertical padding if the bubble

            if (!elements.div) {
                return;
            }

            /*
            if (!this.elements.div) {
                return;
            }
            */

            if (!this._state.mouse) {  // don't ajdust the position
                return;
            }

            // invalid coordinates
            if (!this._state.mouse.x || !this._state.mouse.y) {
                DayPilotBubble.hideActive();
                return;
            }

            var div = elements.div;

            div.style.display = '';
            var height = div.offsetHeight;
            var width = div.offsetWidth;
            div.style.display = 'none';

            var wd = DayPilot.wd();

            var windowWidth = wd.width;
            var windowHeight = wd.height;

            var verticalref = "bottom";
            var horizontalref = "left";

            if (position === 'Mouse') {
                var pixelsBelowCursor = 22;
                var pixelsAboveCursor = 10;

                var top = 0;
                if (this._state.mouse.clientY > windowHeight - height + windowPadding) {
                    var offsetY = this._state.mouse.clientY - (windowHeight - height) + windowPadding;
                    top = (this._state.mouse.y - height - pixelsAboveCursor);
                }
                else {
                    top = this._state.mouse.y + pixelsBelowCursor;
                }

                if (typeof top === 'number') {
                    div.style.top = Math.max(top, 0) + "px";
                }

                if (this._state.mouse.clientX > windowWidth - width + windowPadding) {
                    var offsetX = this._state.mouse.clientX - (windowWidth - width) + windowPadding;
                    div.style.left = (this._state.mouse.x - offsetX) + 'px';
                }
                else {
                    div.style.left = this._state.mouse.x + 'px';
                }
            }
            else if (position === 'Above') {
                var space = 2;

                // 1 try to show it above the event
                var top = this._state.mouse.y - height - space;
                var scrollTop = wd.scrollTop;

                // 2 doesn't fit there, try to show it below the event
                if (top < scrollTop) {
                    top = this._state.mouse.y + this._state.mouse.h + space;
                    verticalref = "top";
                }

                if (typeof top === 'number') {
                    div.style.top = Math.max(top, 0) + 'px';
                }

                var left = this._state.mouse.x;

                // does it have any effect here? gets updated later
                if (this._state.mouse.x + width + windowPadding > windowWidth) {
                    //var offsetX = this.mouse.x - (windowWidth - width) + windowPadding;
                    //left = this.mouse.x - offsetX;
                    left = windowWidth - width - windowPadding;
                    horizontalref = "right";
                }

                div.style.left = left + 'px';

            }

            div.style.display = '';

            if (pop) {
                div.style.display = '';

                var original = {};
                original.color = div.firstChild.style.color;
                original.overflow = div.style.overflow;

                div.firstChild.style.color = "transparent";
                div.style.overflow = 'hidden';

                // this.removeShadow();

                DayPilot.pop(div, {
                    "finished": function() {
                        div.firstChild.style.color = original.color;
                        div.style.overflow = original.overflow;
                        // bubble.addShadow();
                    },
                    // "vertical": "bottom",
                    "vertical": verticalref,
                    // "horizontal": "left",
                    "horizontal": horizontalref,
                    "animation" : bubble.animation
                });
            }

        };

        this.delayedHide = function() {
            // turned off, might not be desired
            // DayPilotBubble.cancelHiding();

            if (DayPilotBubble.showing === this) {
                DayPilotBubble.cancelShowing();
                // this.delayedHide();
                // return;
            }

            var active = DayPilotBubble.active;
            if (active === this) {
                DayPilotBubble.cancelHiding();
                if (active.hideAfter > 0) {
                    var hideAfter = active.hideAfter;
                    DayPilotBubble.timeoutHide = window.setTimeout(DayPilotBubble.hideActive, hideAfter);
                }
            }
        };

        this.showOnMouseOver = function (callbackArgument) {
            // DayPilotBubble.cancelTimeout();

            if (DayPilotBubble.active === this) {
                DayPilotBubble.cancelHiding();
            }

            var delayedShow = function(arg) {
                return function() {
                    bubble.show(arg);
                };
            };

            clearTimeout(DayPilotBubble.timeoutShow);
            DayPilotBubble.timeoutShow = window.setTimeout(delayedShow(callbackArgument), this.showAfter);

            DayPilotBubble.showing = this;
            //DayPilotBubble.timeout = window.setTimeout(this.clientObjectName + ".show('" + callbackArgument + "')", this.showAfter);
        };

        this.hideOnMouseOut = function() {
            this.delayedHide();
        };

        this._serverBased = function(args) {
            if (args.calendar.backendUrl) {  // ASP.NET MVC, Java
                return true;
            }
            if (typeof WebForm_DoCallback === 'function' && this.uniqueID) {  // ASP.NET WebForms
                return true;
            }
            return false;
        };

        this._removeDiv = function() {
            if (!elements.div) {
                return;
            }

            var domArgs = elements.div.domArgs;
            elements.div.domArgs = null;

            if (domArgs) {
                if (typeof bubble.onDomRemove === "function") {
                    bubble.onDomRemove(domArgs);
                }
                if (typeof bubble.onBeforeDomRemove === "function") {
                    bubble.onBeforeDomRemove(domArgs);
                }

                if (typeof bubble.onDomAdd === "function" || typeof bubble.onBeforeDomAdd === "function") {
                    var target = elements.div.firstChild;
                    if (target) {
                        var isReact = DayPilot.Util.isReactComponent(domArgs.element);
                        if (isReact) {
                            var reactDom = bubble._ref.calendar && bubble._ref.calendar.internal.reactRefs().reactDOM;
                            if (!reactDom) {
                                throw new DayPilot.Exception("Can't reach ReactDOM");
                            }
                            reactDom.unmountComponentAtNode(target);
                        }
                    }
                }
            }

            document.body.removeChild(elements.div);
            elements.div = null;
        };

        if (options) {
            for (var name in options) {
                this[name] = options[name];
            }
        }

        this.init();

    };

    DayPilot.Bubble.touchPosition = function(ev) {
        if (ev.touches) {
            DayPilotBubble.mouse = DayPilotBubble.touchPosition(ev);
        }
    };

    DayPilotBubble.cancelShowing = function() {
        DayPilotBubble.showing = null;
        if (DayPilotBubble.timeoutShow) {
            window.clearTimeout(DayPilotBubble.timeoutShow);
            DayPilotBubble.timeoutShow = null;

        }
    };

    DayPilotBubble.cancelHiding = function() {
        if (DayPilotBubble.timeoutHide) {
            window.clearTimeout(DayPilotBubble.timeoutHide);
        }
    };

    DayPilotBubble.hideActive = function() {
        DayPilotBubble.cancelHiding();

        // don't cancel showing here (it prevents showing bubble of another type right away)
        // DayPilotBubble.cancelShowing();
        var bubble = DayPilotBubble.active;
        if (bubble) {
            bubble._removeDiv();
            // bubble.removeShadow();
        }
        DayPilotBubble.active = null;
    };

    DayPilotBubble.CallBackArgs = function(calendar, type, object, staticHTML) {
        this.calendar = calendar;
        this.type = type;
        this.object = object;
        this.staticHTML = staticHTML;

        this.toJSON = function() {
            var json = {};
            json.uid = this.calendar.uniqueID;
            //json.v = this.calendar.v;
            json.type = this.type;
            json.object = object;
            //json.staticHTML = staticHTML;
            return json;
        };
    };

    // register global events
    DayPilot.re(document, 'mousemove', DayPilotBubble.mouseMove);

    // publish the API

    // (backwards compatibility)
    /*
    DayPilot.BubbleVisible.Bubble = DayPilotBubble.Bubble;
    DayPilot.BubbleVisible.hideActive = DayPilotBubble.hideActive;
    DayPilot.BubbleVisible.cancelTimeout = DayPilotBubble.cancelTimeout;
    */

    // current
    DayPilot.Bubble.hideActive = DayPilotBubble.hideActive;
    DayPilot.Bubble.cancelShowing = DayPilotBubble.cancelShowing;
    DayPilot.Bubble.hide = function() {
        DayPilotBubble.hideActive();
    };

    if (typeof Sys !== 'undefined' && Sys.Application && Sys.Application.notifyScriptLoaded){
       Sys.Application.notifyScriptLoaded();
    }

})(DayPilot);
