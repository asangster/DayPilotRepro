/* Copyright � 2005 - 2020 Annpoint, s.r.o.
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
    

    if (typeof DayPilot.DatePicker !== 'undefined') {
        return;
    }

    DayPilot.DatePicker = function(properties) {
        this.v = '2020.2.6016';
        var navigatorId = "navigator_" + new Date().getTime();
        var This = this;

        this.onShow = null;
        this.onTimeRangeSelect = null;
        this.onTimeRangeSelected = null;

        this.prepare = function() {
            this.locale = "en-us";
            this.target = null;
            this.resetTarget = true;
            this.pattern = this._resolved.locale().datePattern;    // "M/d/yyyy"
            //this.cssClassPrefix = null;
            this.theme = "navigator_default";
            this.patterns = [];
            this.zIndex = null;

            // load settings
            if (properties) {
                for (var name in properties) {
                    this[name] = properties[name];
                }
            }
            this.init();
        };

        this.init = function() {
            this.date = new DayPilot.Date(this.date);

            var value = this._readFromTarget();

            if (this.resetTarget && !value) {
                this._writeToTarget(this.date);
            }

            var target = this._element();
            if (target) {
                DayPilot.re(target, "input", function() {
                    This.date = This._readFromTarget();
                    if (This.date) {
                        This.navigator.select(This.date, {dontNotify: true});
                    }
                });
            }


            DayPilot.re(document, "mousedown", function() {
                This.close();
            });

            return this;

        };

        this.close = function() {
            if (!this._visible) {
                return;
            }

            if (this.navigator) {
                this.navigator.dispose();
            }
            this.div.innerHTML = '';
            if (this.div && this.div.parentNode === document.body) {
                document.body.removeChild(this.div);
            }

            this._visible = false;
        };

        this.setDate = function(date) {
            this.date = new DayPilot.Date(date);
            this._writeToTarget(this.date);
        };

        this._readFromTarget = function() {
            // recognized targets: input (value), other DOM elements (innerHTML)
            var element = this._element();

            if (!element) {
                return this.date;
            }

            var value = null;
            if (element.tagName === "INPUT") {
                value = element.value;
            }
            else {
                value = element.innerText;
            }

            if (!value) {
                return null;
            }

            var date = DayPilot.Date.parse(value, This.pattern);
            for (var i = 0; i < This.patterns.length; i++) {
                if (date) {
                    return date;
                }
                date = DayPilot.Date.parse(value, This.patterns[i]);
            }

            return date;
        };

        this._writeToTarget = function(date) {
            var element = this._element();

            if (!element) {
                return;
            }

            var value = date.toString(This.pattern, This.locale);
            if (element.tagName === "INPUT") {
                element.value = value;
            }
            else {
                element.innerHTML = value;
            }

        };

        this._resolved = {};
        this._resolved.locale = function() {
            return DayPilot.Locale.find(This.locale);
        };

        this._element = function() {
            var id = this.target;
            // accept DOM element or id (string)
            var element = (id && id.nodeType && id.nodeType === 1 ) ? id : document.getElementById(id);
            return element;
        };

        this.show = function() {

            if (this._visible) {
                return;
            }

            var element = this._element();
            var navigator = this.navigator;

            var navigator = new DayPilot.Navigator(navigatorId);
            navigator.api = 2;
            navigator.cssOnly = true;
            navigator.theme = This.theme;
            navigator.weekStarts = "Auto";
            navigator.locale = This.locale;
            navigator.onTimeRangeSelected = function(args) {
                This.date = args.start;

                var start = args.start.addTime(navigator._pickerTimePart);
                var value = start.toString(This.pattern, This.locale);

                var args = {};
                args.start = start;
                args.date = start;
                args.preventDefault = function() {
                    this.preventDefault.value = true;
                };

                if (typeof This.onTimeRangeSelect ===  'function') {
                    This.onTimeRangeSelect(args);
                    if (args.preventDefault.value) {
                        return;
                    }
                }

                This._writeToTarget(value);
                This.close();

                if (typeof This.onTimeRangeSelected === 'function') {
                    This.onTimeRangeSelected(args);
                }
            };

            this.navigator = navigator;

            var position = DayPilot.abs(element);
            var height = element.offsetHeight;

            var div = document.createElement("div");
            div.style.position = "absolute";
            div.style.left = position.x + "px";
            div.style.top = (position.y + height) + "px";

            if (This.zIndex) {
                div.style.zIndex = This.zIndex;
            }

            var nav = document.createElement("div");
            nav.id = navigatorId;
            div.appendChild(nav);

            DayPilot.re(div, "mousedown", function(ev) {
                var ev = ev || window.event;
                ev.cancelBubble = true;
                ev.stopPropagation && ev.stopPropagation();
            });

            document.body.appendChild(div);

            this.div = div;

            var selected = This._readFromTarget() || new DayPilot.Date().getDatePart();

            navigator.startDate = selected;
            navigator._pickerTimePart = selected.getTimePart();
            navigator.selectionStart = selected.getDatePart();
            navigator.init();

            this._visible = true;
            if (this.onShow) {
                this.onShow();
            }
        };

        this.prepare();
    };


})(DayPilot);
