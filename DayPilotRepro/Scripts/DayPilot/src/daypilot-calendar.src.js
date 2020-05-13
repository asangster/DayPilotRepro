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
    

    if (typeof DayPilot.Calendar !== 'undefined') {
        return;
    }

    var shadowZindex = 10;

    DayPilot.Calendar = function(id, options) {
        this.v = '2020.2.6016';

        var isConstructor = false;
        if (this instanceof DayPilot.Calendar && !this.__constructor) {
            isConstructor = true;
            this.__constructor = true;
        }

        if (!isConstructor) {
            throw "DayPilot.Calendar() is a constructor and must be called as 'var c = new DayPilot.Calendar(id);'";
        }

        var calendar = this;

        // asp.net
        this.uniqueID = null;
        this.clientName = id;

        this.id = id;
        this.isCalendar = true;

        this.allDayEnd = "DateTime";
        this.allDayEventHeight = 25;
        this.allowEventOverlap = true;
        this.allowMultiSelect = true;
        this.api = 2;
        this.autoRefreshCommand = 'refresh';
        this.autoRefreshEnabled = false;
        this.autoRefreshInterval = 60;
        this.autoRefreshMaxCount = 20;
        this.backendUrl = null;
        if (typeof DayPilot.Bubble === "function") {
            this.bubble = new DayPilot.Bubble();
            // this.cellBubble = new DayPilot.Bubble();
            // this.columnBubble = new DayPilot.Bubble();
        } else {
            this.bubble = null;
        }
        this.cellBubble = null;
        this.columnBubble = null;
        this.businessBeginsHour = 9;
        this.businessEndsHour = 18;
        this.cellHeight = 30;
        this.cellDuration = 30;
        this.clientState = {};
        this.columnMarginRight = 5;
        this.columnWidth = 200;
        this.columnWidthSpec = "Auto";
        this.columnsLoadMethod = "GET";
        this.contextMenu = null;
        this.contextMenuSelection = null;
        this.cornerHtml = '';
        this.crosshairType = "Header";
        this.cssOnly = true;
        this.dayBeginsHour = 0;
        this.dayEndsHour = 24;
        this.days = 1;
        this.doubleClickTimeout = 300;
        this.durationBarVisible = true;
        this.eventArrangement = "Cascade";  // "Cascade" | "Full" | "SideBySide"
        this.eventsLoadMethod = "GET";
        this.headerHeight = 30;
        this.headerLevels = 1;
        this.height = 300;
        this.heightSpec = 'BusinessHours';
        this.hideFreeCells = false;
        this.hideUntilInit = true;
        this.headerDateFormat = null; // uses locale.dateFormat by default
        this.hourWidth = 60;
        this.initEventEnabled = false;
        this.initScrollPos = null;
        this.loadingLabelText = "Loading...";
        this.loadingLabelVisible = true;
        this.locale = "en-us";
        this.messageHideAfter = 5000;
        this.moveBy = "Full";
        this.notifyCommit = 'Immediate'; // or 'Queue'
        this.rtl = false;
        this.scrollLabelsVisible = false;
        this.showToolTip = true;
        this.showAllDayEvents = false;
        this.showEventStartEnd = false;
        this.showHeader = true;
        this.showHours = true;
        this.showCurrentTime = true;
        this.showCurrentTimeMode = "Day";
        this.showCurrentTimeOffset = 0;
        this.startDate = DayPilot.Date.today();
        this.cssClassPrefix = "calendar_default";
        this.tapAndHoldTimeout = 300;
        this.theme = null;
        this.timeFormat = 'Auto';
        this.timeHeaderCellDuration = 60;
        this.timeRangeSelectingStartEndEnabled = false;
        this.timeRangeSelectingStartEndFormat = "Auto";
        this.eventMovingStartEndEnabled = false;
        this.eventMovingStartEndFormat = "Auto";
        this.eventResizingStartEndEnabled = false;
        this.eventResizingStartEndFormat = "Auto";

        this.useEventBoxes = 'Always';
        this.viewType = 'Days';
        this.visible = true;
        this.weekStarts = "Auto";
        this.width = null;

        this.eventClickHandling = 'Enabled';
        this.eventDoubleClickHandling = 'Disabled';
        this.eventRightClickHandling = 'ContextMenu';
        this.eventDeleteHandling = 'Disabled';
        this.eventEditHandling = 'Update';
        this.eventHoverHandling = 'Bubble';
        this.eventResizeHandling = 'Update';
        this.eventMoveHandling = 'Update';
        this.eventSelectHandling = 'Update';
        this.eventTapAndHoldHandling = 'Move';
        this.headerClickHandling = 'Enabled';
        this.timeRangeTapAndHoldHandling = 'Select';
        this.timeRangeSelectedHandling = 'Enabled';
        this.timeRangeDoubleClickHandling = "Disabled";
        this.timeRangeRightClickHandling = "ContextMenu";  // "ContextMenu", "Enabled", "Disabled"

        this.onAutoRefresh = null;
        this.onColumnFilter = null;
        this.onTimeRangeRightClick = null;
        this.onTimeRangeRightClicked = null;
        this.onTimeRangeDoubleClick = null;
        this.onTimeRangeDoubleClicked = null;
        this.onTimeRangeSelect = null;
        this.onTimeRangeSelected = null;
        this.onTimeRangeSelecting = null;
        this.onEventFilter = null;
        this.onEventMove = null;
        this.onEventMoved = null;
        this.onEventMoving = null;
        this.onEventResize = null;
        this.onEventResized = null;
        this.onEventResizing = null;
        this.onEventSelect = null;
        this.onEventSelected = null;
        this.onEventEdit = null;
        this.onEventEdited = null;
        this.onEventDelete = null;
        this.onEventDeleted = null;
        this.onHeaderClick = null;
        this.onHeaderClicked = null;
        this.onEventRightClick = null;
        this.onEventRightClicked = null;
        this.onEventDoubleClick = null;
        this.onEventDoubleClicked = null;
        this.onEventClick = null;
        this.onEventClicked = null;

        this.onBeforeEventRender = null;
        this.onBeforeEventExport = null;
        this.onBeforeEventDomAdd = null;
        this.onBeforeEventDomRemove = null;
        this.onAfterEventRender = null;
        this.onBeforeCellRender = null;
        this.onBeforeCellExport = null;
        this.onBeforeCornerDomAdd = null;
        this.onBeforeCornerDomRemove = null;
        this.onBeforeCornerRender = null;
        this.onBeforeHeaderRender = null;
        this.onBeforeHeaderExport = null;
        this.onBeforeTimeHeaderRender = null;

        // transitional
        this._separateEventsTable = true;
        this._shadowZindex = shadowZindex;
        this._unifiedScrollable = true;
        this._divBasedGrid = true;
        this._fasterDispose = true;             // potentially leaking a bit but significantly faster in IE, phasing out

        // nav
        this._cache = {};
        this._cache.pixels = {};
        this._cache.events = [];
        this.elements = {};
        this.elements.events = [];
        this.elements.separators = [];
        this.elements.selection = [];
        this.elements.cells = [];
        this.elements.crosshair = [];
        this.elements.timeHeaders = [];
        this.events = {};
        this.nav = {};

        // internal
        this._autoRefreshCount = 0;
        this._initialized = false;

        this.members = {};
        this.members.obsolete = [
            "Init",
            "cleanSelection",
            "cssClassPrefix",
            "cssOnly",
            "clientName",
            "uniqueID"
        ];
        this.members.ignore = [
            "internal",
            "nav",
            "debug",
            "temp",
            "elements",
            "members",
            "onCallbackError"
        ];
        this.members.noCssOnly = [];

        this._productCode = 'netmvc';

        this._browser = {};

        this._browser.ie = (navigator && navigator.userAgent && navigator.userAgent.indexOf("MSIE") !== -1);  // IE
        // this._browser.iie9 = (navigator && navigator.userAgent && navigator.userAgent.indexOf("MSIE 9") !== -1);  // IE
/*
        this._browser.ielt9 = (function() {
            var div = document.createElement("div");
            div.innerHTML = "<!--[if lt IE 9]><i></i><![endif]-->";
            var isIeLessThan9 = (div.getElementsByTagName("i").length === 1);
            return isIeLessThan9;
        })();
*/

        this._browser.ff = (navigator && navigator.userAgent && navigator.userAgent.indexOf("Firefox") !== -1);

        this.clearSelection = function() {
            if (!this.selectedCells) {
                this.selectedCells = [];
                return;
            }
            DayPilotCalendar.topSelectedCell = null;
            DayPilotCalendar.bottomSelectedCell = null;
            DayPilot.Global.selecting = null;
            this._hideSelection();
            this.selectedCells = [];
        };

        this._hideSelection = function() {
            if (!this.selectedCells) {
                return;
            }

            DayPilot.de(calendar.elements.selection);
            calendar.elements.selection = [];
            calendar.nav.activeSelection = null;
        };

        this.cleanSelection = this.clearSelection;

        this._postBack2 = function(action, data, parameters) {
            var envelope = {};
            envelope.action = action;
            envelope.parameters = parameters;
            envelope.data = data;
            envelope.header = this._getCallBackHeader();

            var commandstring = "JSON" + JSON.stringify(envelope);
            __doPostBack(calendar.uniqueID, commandstring);
        };

        this._callBack2 = function(action, parameters, data, type) {

            if (!this._serverBased()) {
                calendar.debug.message("Callback invoked without the server-side backend specified. Callback canceled.", "warning");
                return;
            }

            if (typeof type === 'undefined') {
                type = "CallBack";
            }

            calendar._loadingStart();

            var envelope = {};

            envelope.action = action;
            envelope.type = type;
            envelope.parameters = parameters;
            envelope.data = data;
            envelope.header = this._getCallBackHeader();

            var commandstring = "JSON" + JSON.stringify(envelope);
            if (this.backendUrl) {
                DayPilot.request(this.backendUrl, this._callBackResponse, commandstring, this._ajaxError);
            }
            else if (typeof WebForm_DoCallback === 'function') {
                //var clientName = calendar.id;
                WebForm_DoCallback(this.uniqueID, commandstring, this._updateView, this.clientName, this.onCallbackError, true);
            }
        };

        this._serverBased = function() {
            return (calendar._productCode !== "javasc" && calendar._productCode.indexOf("DCODE") === -1) || calendar.devsb;
        };


        this._isAspnetWebForms = function() {
            if (typeof WebForm_DoCallback === 'function' && this.uniqueID) {
                return true;
            }
            return false;
        };

        this._ajaxError = function(req) {
            if (typeof calendar.onAjaxError === 'function') {
                var args = {};
                args.request = req;
                calendar.onAjaxError(args);
            }
            else if (typeof calendar.ajaxError === 'function') { // backwards compatibility
                calendar.ajaxError(req);
            }
        };

        this.dispose = function() {
            var c = calendar;

            if (!c.nav.top) {
                return;
            }

            c._pauseAutoRefresh();
            c._deleteEvents();

            if (c.nav.messageClose) { c.nav.messageClose.onclick = null; }
            if (c.nav.hourTable) {
                c.nav.hourTable.oncontextmenu = null;
                c.nav.hourTable.onmousemove = null;
            }
            if (c.nav.header) { c.nav.header.oncontextmenu = null; }
            if (c.nav.corner) { c.nav.corner.oncontextmenu = null; }
            if (c.nav.zoom) {
                c.nav.zoom.onmousemove = null;
                c.nav.zoom.oncontextmenu = null;
            }
            if (c.nav.scroll) {
                c.nav.scroll.onscroll = null;
                c.nav.scroll.root = null;
            }

            DayPilot.pu(c.nav.loading);

            c._disposeHourTable();
            c._disposeMain();
            c._disposeHeader();
            c._disposeCorner();

            c.nav.select = null;
            c.nav.cornerRight = null;
            c.nav.scrollable = null;
            c.nav.bottomLeft = null;
            c.nav.bottomRight = null;
            c.nav.allday = null;
            c.nav.zoom = null;
            c.nav.loading = null;
            c.nav.events = null;
            c.nav.header = null;
            c.nav.hourTable = null;
            c.nav.scrolltop = null;
            c.nav.scroll = null;
            c.nav.vsph = null;
            c.nav.main = null;
            c.nav.message = null;
            c.nav.messageClose = null;

            c.nav.top.removeAttribute("style");
            c.nav.top.removeAttribute("class");
            var resetHtml = !(calendar._react.reactDOM && DayPilot.browser.ie);
            if (resetHtml) {
                c.nav.top.innerHTML = "";
            }
            c.nav.top.dp = null;
            c.nav.top = null;

            DayPilot.ue(window, 'resize', c._onResize);

            DayPilotCalendar.unregister(c);
        };

        this._registerDispose = function() {
            this.nav.top.dispose = this.dispose;
        };

        this._callBackResponse = function(response) {
            calendar._updateView(response.responseText);
        };

        this._getCallBackHeader = function() {
            var h = {};

            h.v = this.v;
            h.control = "dpc";
            h.id = this.id;
            h.clientState = calendar.clientState;
            h.columns = this._getTreeState();

            h.days = calendar.days;
            h.startDate = calendar.startDate;
            h.cellDuration = calendar.cellDuration;
            // h.cssOnly = calendar.cssOnly;
            h.cssClassPrefix = calendar.cssClassPrefix;
            h.heightSpec = calendar.heightSpec;
            h.businessBeginsHour = calendar.businessBeginsHour;
            h.businessEndsHour = calendar.businessEndsHour;
            h.viewType = calendar.viewType;

            h.dayBeginsHour = calendar.dayBeginsHour;
            h.dayEndsHour = calendar.dayEndsHour;
            h.headerLevels = calendar.headerLevels;
            // h.backColor = calendar.cellBackColor;
            // h.nonBusinessBackColor = calendar.cellBackColorNonBusiness;
            h.eventHeaderVisible = calendar.eventHeaderVisible;
            h.timeFormat = calendar.timeFormat;
            h.timeHeaderCellDuration = calendar.timeHeaderCellDuration;
            h.locale = calendar.locale;
            h.scrollY = calendar.scrollPos;
            h.showAllDayEvents = calendar.showAllDayEvents;
            h.tagFields = calendar.tagFields;
            h.weekStarts = calendar.weekStarts;

            // required for custom hour header rendering
            // h.hourNameBackColor = calendar.hourNameBackColor;
            // h.hourFontFamily = calendar.hourFontFamily;
            // h.hourFontSize = calendar.hourFontSize;
            // h.hourFontColor = calendar.hourFontColor;

            // export sync
            /*
            h.showHeader = calendar.showHeader;
            h.hourWidth = calendar.hourWidth;
            h.cellHeight = calendar.cellHeight;
            h.headerHeight = calendar.headerHeight;
            h.durationBarVisible = calendar.durationBarVisible;
            h.allDayEventHeight = calendar.allDayEventHeight;
            h.columnMarginRight = calendar.columnMarginRight;
            h.height = calendar.height;
            h.useEventBoxes = calendar.useEventBoxes;
            h.allDayEnd = calendar.allDayEnd;
            h.hideFreeCells = calendar.hideFreeCells;
            */

            h.selected = calendar.multiselect.events();

            // special
            h.hashes = calendar.hashes;

            return h;
        };

        this._out = function() {
            calendar._crosshairHide();

            // clear active areas
            DayPilot.Areas.hideAll();

            //this.stopScroll();
            calendar._lastEventMoving = null;
        };

        this._getTreeState = function() {
            var tree = [];
            tree.ignoreToJSON = true; // preventing Gaia and prototype to mess up with Array serialization

            if (!this._columns) {
                return tree;
            }

            for (var i = 0; i < this._columns.length; i++) {
                var column = this._columns[i];
                var node = this._getNodeState(column);
                tree.push(node);
            }
            return tree;
        };

        this._getNodeState = function(column) {
            //var row = this.rows[i];

            var node = {};
            node.Value = column.id;
            node.Name = column.name;
            node.ToolTip = column.toolTip;
            node.Date = column.start;
            node.Children = this._getNodeChildren(column.children);

            return node;
        };

        this._getNodeChildren = function(array) {
            var children = [];
            children.ignoreToJSON = true; // preventing Gaia to mess up with Array serialization

            if (!array) {
                return children;
            }
            for (var i = 0; i < array.length; i++) {
                children.push(this._getNodeState(array[i]));
            }
            return children;
        };

        this._updateView = function(result, context) {

            //var start = new Date();
            var result = JSON.parse(result);

            if (result.BubbleGuid) {
                var guid = result.BubbleGuid;
                var bubble = this.bubbles[guid];
                delete this.bubbles[guid];

                calendar._loadingStop();
                if (typeof result.Result.BubbleHTML !== 'undefined') {
                    bubble.updateView(result.Result.BubbleHTML, bubble);
                }
                return;
            }

            if (result.CallBackRedirect) {
                document.location.href = result.CallBackRedirect;
                return;
            }

            if (typeof result.ClientState !== 'undefined') {
                calendar.clientState = result.ClientState;
            }

            if (result.UpdateType === "None") {
                calendar._loadingStop();

                calendar._fireAfterRenderDetached(result.CallBackData, true);
                //calendar.afterRender(result.CallBackData, true);

                if (result.Message) {
                    calendar.message(result.Message);
                }

                return;
            }

            // viewstate update
            if (result.VsUpdate) {
                var vsph = document.createElement("input");
                vsph.type = 'hidden';
                vsph.name = calendar.id + "_vsupdate";
                vsph.id = vsph.name;
                vsph.value = result.VsUpdate;
                calendar.nav.vsph.innerHTML = '';
                calendar.nav.vsph.appendChild(vsph);
            }

            calendar._deleteEvents();

            calendar.multiselect.clear(true);
            calendar.multiselect._initList = result.SelectedEvents;

            if (typeof result.TagFields !== 'undefined') {
                calendar.tagFields = result.TagFields;
            }

            if (typeof result.SortDirections !== 'undefined') {
                calendar.sortDirections = result.SortDirections;
            }

            if (result.UpdateType === "Full") {
                // generated
                calendar.colors = result.Colors;
                calendar.palette = result.Palette;
                calendar.dirtyColors = result.DirtyColors;
                calendar.cellProperties = result.CellProperties;
                calendar.cellConfig = result.CellConfig;

                if (calendar._columnsList() === calendar.columns) {
                    calendar.columns = result.Columns;
                }
                else {
                    calendar.columns.list = result.Columns;
                }


                // state
                // selectedeventvalue

                // properties
                calendar.days = result.Days; //
                calendar.startDate = new DayPilot.Date(result.StartDate).getDatePart(); //
                calendar.cellDuration = result.CellDuration; //
                calendar.heightSpec = result.HeightSpec ? result.HeightSpec : calendar.heightSpec;
                calendar.businessBeginsHour = result.BusinessBeginsHour ? result.BusinessBeginsHour : calendar.businessBeginsHour;
                calendar.businessEndsHour = result.BusinessEndsHour ? result.BusinessEndsHour : calendar.businessEndsHour;
                calendar.viewType = result.ViewType; //
                calendar.headerLevels = result.HeaderLevels; //
                calendar.backColor = result.BackColor ? result.BackColor : calendar.backColor;
                calendar.nonBusinessBackColor = result.NonBusinessBackColor ? result.NonBusinessBackColor : calendar.nonBusinessBackColor;
                calendar.eventHeaderVisible = result.EventHeaderVisible ? result.EventHeaderVisible : calendar.eventHeaderVisible;
                calendar.timeFormat = result.TimeFormat ? result.TimeFormat : calendar.timeFormat;
                calendar.timeHeaderCellDuration = typeof result.TimeHeaderCellDuration !== 'undefined' ? result.TimeHeaderCellDuration : calendar.timeHeaderCellDuration;
                calendar.locale = result.Locale ? result.Locale : calendar.locale;

                calendar.dayBeginsHour = typeof result.DayBeginsHour !== 'undefined' ? result.DayBeginsHour : calendar.dayBeginsHour;
                calendar.dayEndsHour = typeof result.DayEndsHour !== 'undefined' ? result.DayEndsHour : calendar.dayEndsHour;

                // corner
                // calendar.cornerBackColor = result.CornerBackColor;
                calendar.cornerHtml = result.CornerHTML;

                // hours
                calendar.hours = result.Hours;

                calendar._prepareColumns();
                calendar._expandCellProperties();
            }

            // hashes
            if (result.Hashes) {
                for (var key in result.Hashes) {
                    calendar.hashes[key] = result.Hashes[key];
                }
                //calendar.hashes = result.Hashes;
            }

            calendar._loadEvents(result.Events);
            calendar._updateHeaderHeight();

            if (result.UpdateType === "Full" || calendar.hideFreeCells) {
                calendar._drawHeader();
                calendar._autoHeaderHeight();
                calendar._deleteScrollLabels();
                calendar._updateMessagePosition();
                calendar._drawMain();
                calendar._drawHourTable();
                calendar._updateHeight();
                calendar._fixScrollHeader();
                calendar.clearSelection();
                calendar._updateColumnWidthSpec();

                if (typeof result.ScrollY !== "undefined") {
                    calendar.scrollToY(result.ScrollY);
                }
                else {
                    calendar.scrollToY(calendar.initScrollPos);
                }
            }

            calendar._showCurrentTime();
            calendar._show();  // if not visible

            calendar._drawEvents();
            calendar._drawEventsAllDay();

            if (calendar.heightSpec === "Parent100Pct") {
                calendar._onResize();
            }

            if (calendar.timeRangeSelectedHandling !== "HoldForever") {
                calendar.clearSelection();
            }

            calendar._updateScrollLabels();

            if (calendar.todo) {
                if (calendar.todo.del) {
                    var del = calendar.todo.del;
                    del.parentNode.removeChild(del);
                    calendar.todo.del = null;
                }
            }

            calendar._fireAfterRenderDetached(result.CallBackData, true);

            calendar._loadingStop();

            calendar._startAutoRefresh();

            if (result.Message) {
                calendar.message(result.Message);
            }

        };

        this._fireAfterRenderDetached = function(data, isCallBack) {
            var afterRenderDelayed = function(data, isc) {
                return function() {
                    if (calendar._api2()) {
                        if (typeof calendar.onAfterRender === 'function') {
                            var args = {};
                            args.isCallBack = isc;
                            args.data = data;

                            calendar.onAfterRender(args);
                        }
                    }
                    else {
                        if (calendar.afterRender) {
                            calendar.afterRender(data, isc);
                        }
                    }
                };
            };

            window.setTimeout(afterRenderDelayed(data, isCallBack), 0);
        };

        this._createShadow = function(object, copyText) {
            var main = calendar.nav.events;

            var colCount = main.rows[0].cells.length;

            var colWidth = main.clientWidth / colCount;
            //var i = Math.floor((calendar.coords.x - 45) / colWidth);
            var i = Math.floor(calendar.coords.x / colWidth);

            if (i < 0) {
                i = 0;
            }

            if (i >= colCount) {
                i = colCount - 1;
            }

            if (calendar.rtl) {
                i = calendar._columnsBottom.length - i - 1;
            }

            var column = main.rows[0].cells[i];

            var _startOffset = 0;
            var height = 0;
            var top = 0;

            if (typeof object.duration !== 'undefined') { // external drag&drop
                var duration = object.duration;
                top = Math.floor(((calendar.coords.y - _startOffset) + calendar.cellHeight / 2) / calendar.cellHeight) * calendar.cellHeight + _startOffset;
                height = duration * calendar.cellHeight / (60 * calendar.cellDuration);
                height = Math.max(height, calendar.cellHeight);
            }
            else {
                var e = object.event;
                //var data = object.data;
                height = e.part.height;
                top = e.part.top;
            }

            var shadow = document.createElement('div');
            shadow.setAttribute('unselectable', 'on');
            shadow.style.position = 'absolute';
            shadow.style.width = '100%';
            shadow.style.height = height + 'px';
            shadow.style.left = '0px';
            shadow.style.top = top + 'px';
            shadow.style.zIndex = calendar._shadowZindex;
            shadow.exclude = true; // trying to fix the IE flickering issue
            //shadow.oncontextmenu = function(ev) { ev.preventDefault(); return false; };

            // DayPilot.re(shadow, DayPilot.touch.end, DayPilotCalendar.gTouchEnd);

            var inner = document.createElement("div");
            shadow.appendChild(inner);

            shadow.className = calendar._prefixCssClass("_shadow");
            inner.className = this._prefixCssClass("_shadow_inner");

            column.events.appendChild(shadow);

            return shadow;
        };

        this._durationHours = function() {
            return this._duration() / (3600 * 1000);
        };

        this._businessHoursSpan = function() {
            if (this.businessBeginsHour > this.businessEndsHour) {
                return 24 - this.businessBeginsHour + this.businessEndsHour;
            }
            else {
                return this.businessEndsHour - this.businessBeginsHour;
            }
        };

        this._dayHoursSpan = function() {
            if (this.dayBeginsHour >= this.dayEndsHour) {
                return 24 - this.dayBeginsHour + this.dayEndsHour;
            }
            else {
                return this.dayEndsHour - this.dayBeginsHour;
            }

        };

        // in ticks
        this._duration = function(max) {
            var dHours = 0;

            if (this.heightSpec === 'BusinessHoursNoScroll') {
                dHours = this._businessHoursSpan();
            }
            else if (this.hideFreeCells && !max) {
                var addMinutes = (this._maxEnd - 1) * this.cellDuration / this.cellHeight;
                var addHours = Math.ceil(addMinutes / 60);
                var businessEnds = this.businessBeginsHour > this.businessEndsHour ? this.businessEndsHour + 24 : this.businessEndsHour;
                dHours = Math.max(this.dayBeginsHour + addHours, businessEnds) - this._visibleStart();
                //dHours = Math.max(this.dayBeginsHour + addHours, this.businessEndsHour) - this._visibleStart();
            }
            else {
                dHours = this._dayHoursSpan();
            }
            return dHours * 60 * 60 * 1000; // return ticks
        };

        this.message = function(html, delay, foreColor, backColor) {
            if (!html) {
                return;
            }

            var delay = delay || this.messageHideAfter || 2000;
            var foreColor = foreColor || "#ffffff";
            var backColor = backColor || "#000000";
            var opacity = 0.8;

            var div;

            var top = this._totalHeaderHeight();
            var left = this.showHours ? this.hourWidth : 0;
            var right = DayPilot.sw(calendar._scrollElement());

            if (calendar.rtl) {
                var temp = left;
                left = right;
                right = temp;
            }

            if (!this.nav.message) {
                div = document.createElement("div");
                div.style.position = "absolute";
                //div.style.width = "100%";
                div.style.left = (left) + "px";
                div.style.top = (top) + "px";
                div.style.right = "0px";
                div.style.display = 'none';
                //div.style.paddingLeft = (left) + "px";

                div.onmousemove = function() {
                    if (div.messageTimeout && !div.status) {
                        clearTimeout(div.messageTimeout);
                    }
                };

                div.onmouseout = function() {
                    if (calendar.nav.message.style.display !== 'none') {
                        div.messageTimeout = setTimeout(calendar._hideMessage, 500);
                    }
                };

                var inner = document.createElement("div");
                inner.onclick = function() { calendar.nav.message.style.display = 'none'; };
                inner.className = this._prefixCssClass("_message");
                div.appendChild(inner);

                var close = document.createElement("div");
                close.style.position = "absolute";
                close.className = this._prefixCssClass("_message_close");
                close.onclick = function() { calendar.nav.message.style.display = 'none'; };
                div.appendChild(close);

                //this.nav.top.appendChild(div);
                this.nav.top.insertBefore(div, this.nav.loading);
                this.nav.message = div;
                this.nav.messageClose = close;

            }
            else {
                div = calendar.nav.message;
                this.nav.message.style.top = top + "px";
            }

            if (this.nav.cornerRight) {
                this.nav.message.style.right = right + "px";
            }
            else {
                this.nav.message.style.right = "0px";
            }

            var showNow = function() {
                //calendar.nav.message.style.opacity = opacity;

                if (!calendar.nav.message) {  // UpdatePanel refresh
                    return;
                }

                var inner = calendar.nav.message.firstChild;
                inner.innerHTML = html;

                var end = function() { div.messageTimeout = setTimeout(calendar._hideMessage, delay); };
                DayPilot.fade(calendar.nav.message, 0.2, end);
            };

            clearTimeout(div.messageTimeout);

            // another message was visible
            if (this.nav.message.style.display !== 'none') {
                DayPilot.fade(calendar.nav.message, -0.2, showNow);
            }
            else {
                showNow();
            }

        };

        this.message.show = function(html) {
            calendar.message(html);
        };

        this.message.hide = function() {
            calendar._hideMessage();
        };

        this._hideMessage = function() {
            var end = function() { calendar.nav.message.style.display = 'none'; };
            DayPilot.fade(calendar.nav.message, -0.2, end);
        };

        /*
        this._hideMessageNow = function() {
            if (this.nav.message) {
                this.nav.message.style.display = 'none';
            }
        };
        */

        this._updateMessagePosition = function() {
            if (this.nav.message) {
                this.nav.message.style.top = (this._totalHeaderHeight()) + "px";
            }
        };

        this._rowCount = function() {
            return this._duration() / (60 * 1000 * this.cellDuration);
        };

        this.eventClickPostBack = function(e, data) {
            this._postBack2('EventClick', data, e);
        };
        this.eventClickCallBack = function(e, data) {
            this._callBack2('EventClick', e, data);
        };

        this._eventClickDispatch = function(e) {
            var div = this;

            var e = e || window.event;
            var ctrlKey = e.ctrlKey;
            var metaKey = e.metaKey;

            if (typeof (DayPilot.Bubble) !== 'undefined') {
                DayPilot.Bubble.hideActive();
            }

            if (calendar.eventDoubleClickHandling === 'Disabled') {
                calendar._eventClickSingle(div, ctrlKey, metaKey, e);
                return;
            }

            if (!calendar.timeouts) {
                calendar.timeouts = [];
            }
            else {
                for (var toid in calendar.timeouts) {
                    window.clearTimeout(calendar.timeouts[toid]);
                }
                calendar.timeouts = [];
            }

            var eventClickDelayed = function(div, ctrlKey, metaKey, e) {
                return function() {
                    calendar._eventClickSingle(div, ctrlKey, metaKey, e);
                };
            };

            calendar.timeouts.push(window.setTimeout(eventClickDelayed(this, ctrlKey, metaKey, e), calendar.doubleClickTimeout));

        };

        this._eventClickSingle = function(thisDiv, ctrlKey, metaKey, originalEvent) {

            //var ev = ev || window.event;

            var e = thisDiv.event;
            if (!e.client.clickEnabled()) {
                return;
            }

            if (calendar._api2()) {

                var args = {};
                args.e = e;
                args.ctrl = ctrlKey;
                args.meta = metaKey;
                args.originalEvent = originalEvent;
                args.preventDefault = function() {
                    this.preventDefault.value = true;
                };

                if (typeof calendar.onEventClick === 'function') {
                    calendar.onEventClick(args);
                    if (args.preventDefault.value) {
                        return;
                    }
                }

                switch (calendar.eventClickHandling) {
                    case 'PostBack':
                        calendar.eventClickPostBack(e);
                        break;
                    case 'CallBack':
                        calendar.eventClickCallBack(e);
                        break;
                    case 'Edit':
                        calendar._divEdit(thisDiv);
                        break;
                    case 'Select':
                        calendar._eventSelect(thisDiv, e, ctrlKey, metaKey);
                        break;
                    case 'Bubble':
                        if (calendar.bubble) {
                            calendar.bubble.showEvent(e);
                        }
                        break;
                    case 'ContextMenu':
                        var menu = e.client.contextMenu();
                        if (menu) {
                            menu.show(e);
                        }
                        else {
                            if (calendar.contextMenu) {
                                calendar.contextMenu.show(e);
                            }
                        }
                        break;
                }

                if (typeof calendar.onEventClicked === 'function') {
                    calendar.onEventClicked(args);
                }


            }
            else {
                switch (calendar.eventClickHandling) {
                    case 'PostBack':
                        calendar.eventClickPostBack(e);
                        break;
                    case 'CallBack':
                        calendar.eventClickCallBack(e);
                        break;
                    case 'JavaScript':
                        calendar.onEventClick(e);
                        break;
                    case 'Edit':
                        calendar._divEdit(thisDiv);
                        break;
                    case 'Select':
                        calendar._eventSelect(thisDiv, e, ctrlKey, metaKey);
                        break;
                    case 'Bubble':
                        if (calendar.bubble) {
                            calendar.bubble.showEvent(e);
                        }
                        break;
                    case 'ContextMenu':
                        var menu = e.client.contextMenu();
                        if (menu) {
                            menu.show(e);
                        }
                        else {
                            if (calendar.contextMenu) {
                                calendar.contextMenu.show(e);
                            }
                        }
                        break;
                }

            }

        };


        this.eventDoubleClickPostBack = function(e, data) {
            this._postBack2('EventDoubleClick', data, e);
        };
        this.eventDoubleClickCallBack = function(e, data) {
            this._callBack2('EventDoubleClick', e, data);
        };

        this._eventDoubleClickDispatch = function(ev) {

            if (typeof (DayPilot.Bubble) !== 'undefined') {
                DayPilot.Bubble.hideActive();
            }

            if (calendar.timeouts) {
                for (var toid in calendar.timeouts) {
                    window.clearTimeout(calendar.timeouts[toid]);
                }
                calendar.timeouts = null;
            }

            // choose the action

            var e = this.event;
            var ev = ev || window.event;

            /*
            if (!e.clickingAllowed()) {
            return;
            }*/


            if (calendar._api2()) {

                var args = {};
                args.e = e;
                args.preventDefault = function() {
                    this.preventDefault.value = true;
                };

                if (typeof calendar.onEventDoubleClick === 'function') {
                    calendar.onEventDoubleClick(args);
                    if (args.preventDefault.value) {
                        return;
                    }
                }

                switch (calendar.eventDoubleClickHandling) {
                    case 'PostBack':
                        calendar.eventDoubleClickPostBack(e);
                        break;
                    case 'CallBack':
                        calendar.eventDoubleClickCallBack(e);
                        break;
                    case 'Edit':
                        if (!e.allday()) {
                            calendar._divEdit(this);
                        }
                        break;
                    case 'Select':
                        if (!e.allday()) {
                            calendar._eventSelect(this, e, ev.ctrlKey);
                        }
                        break;
                    case 'Bubble':
                        if (calendar.bubble) {
                            calendar.bubble.showEvent(e);
                        }
                        break;
                }

                if (typeof calendar.onEventDoubleClicked === 'function') {
                    calendar.onEventDoubleClicked(args);
                }

            }
            else {
                switch (calendar.eventDoubleClickHandling) {
                    case 'PostBack':
                        calendar.eventDoubleClickPostBack(e);
                        break;
                    case 'CallBack':
                        calendar.eventDoubleClickCallBack(e);
                        break;
                    case 'JavaScript':
                        calendar.onEventDoubleClick(e);
                        break;
                    case 'Edit':
                        if (!e.allday()) {
                            calendar._divEdit(this);
                        }
                        break;
                    case 'Select':
                        if (!e.allday()) {
                            calendar._eventSelect(this, e, ev.ctrlKey);
                        }
                        break;
                    case 'Bubble':
                        if (calendar.bubble) {
                            calendar.bubble.showEvent(e);
                        }
                        break;
                }

            }

        };

        this.eventRightClickPostBack = function(e, data) {
            this._postBack2('EventRightClick', data, e);
        };
        this.eventRightClickCallBack = function(e, data) {
            this._callBack2('EventRightClick', e, data);
        };

        this._eventRightClickDispatch = function(ev) {

            var e = this.event;

            if (ev.stopPropagation) {
                ev.stopPropagation();
            }

            if (!e.client.rightClickEnabled()) {
                return false;
            }

            if (calendar._api2()) {

                var args = {};
                args.e = e;
                args.preventDefault = function() {
                    this.preventDefault.value = true;
                };

                if (typeof calendar.onEventRightClick === 'function') {
                    calendar.onEventRightClick(args);
                    if (args.preventDefault.value) {
                        return false;
                    }
                }

                switch (calendar.eventRightClickHandling) {
                    case 'PostBack':
                        calendar.eventRightClickPostBack(e);
                        break;
                    case 'CallBack':
                        calendar.eventRightClickCallBack(e);
                        break;
                    case 'ContextMenu':
                        var menu = e.client.contextMenu();
                        if (menu) {
                            menu.show(e);
                        }
                        else {
                            if (calendar.contextMenu) {
                                calendar.contextMenu.show(this.event);
                            }
                        }
                        break;
                    case 'Bubble':
                        if (calendar.bubble) {
                            calendar.bubble.showEvent(e);
                        }
                        break;
                }

                if (typeof calendar.onEventRightClicked === 'function') {
                    calendar.onEventRightClicked(args);
                }

            }
            else {
                switch (calendar.eventRightClickHandling) {
                    case 'PostBack':
                        calendar.eventRightClickPostBack(e);
                        break;
                    case 'CallBack':
                        calendar.eventRightClickCallBack(e);
                        break;
                    case 'JavaScript':
                        calendar.onEventRightClick(e);
                        break;
                    case 'ContextMenu':
                        var menu = e.client.contextMenu();
                        if (menu) {
                            menu.show(e);
                        }
                        else {
                            if (calendar.contextMenu) {
                                calendar.contextMenu.show(this.event);
                            }
                        }
                        break;
                    case 'Bubble':
                        if (calendar.bubble) {
                            calendar.bubble.showEvent(e);
                        }
                        break;
                }
            }

            if (ev.preventDefault) {
                ev.preventDefault();
            }
            return false;
        };

        this._createColumn = function(data) {
            return new DayPilot.Column(data, calendar);
        };

        this.headerClickPostBack = function(c, data) {
            this._postBack2('HeaderClick', data, c);
        };
        this.headerClickCallBack = function(c, data) {
            this._callBack2('HeaderClick', c, data);
        };

        this._headerClickDispatch = function(object) {

            var data = this.data;
            var c = calendar._createColumn(data);
            // check if allowed

            if (calendar._api2()) {

                var args = {};
                args.header = {};
                args.header.id = data.id;
                args.header.name = data.name;
                args.header.start = data.start;
                args.column = c;

                args.preventDefault = function() {
                    this.preventDefault.value = true;
                };

                if (typeof calendar.onHeaderClick === 'function') {
                    calendar.onHeaderClick(args);
                    if (args.preventDefault.value) {
                        return;
                    }
                }

                switch (calendar.headerClickHandling) {
                    case 'PostBack':
                        calendar.headerClickPostBack(c);
                        break;
                    case 'CallBack':
                        calendar.headerClickCallBack(c);
                        break;
                }

                if (typeof calendar.onHeaderClicked === 'function') {
                    calendar.onHeaderClicked(args);
                }
            }
            else {
                switch (calendar.headerClickHandling) {
                    case 'PostBack':
                        calendar.headerClickPostBack(c);
                        break;
                    case 'CallBack':
                        calendar.headerClickCallBack(c);
                        break;
                    case 'JavaScript':
                        calendar.onHeaderClick(c);
                        break;
                }
            }

/*
            switch (calendar.headerClickHandling) {
                case 'PostBack':
                    calendar.headerClickPostBack(c);
                    break;
                case 'CallBack':
                    calendar.headerClickCallBack(c);
                    break;
                case 'JavaScript':
                    calendar.onHeaderClick(c);
                    break;
            }
            */
        };

        this._headerMouseMove = function() {
            if (typeof (DayPilot.Bubble) !== 'undefined' && calendar.columnBubble) {
                if (calendar.viewType === "Resources") {
                    var res = {};
                    res.calendar = calendar;
                    res.start = this.data.start;
                    res.name = this.data.name;
                    res.id = this.data.id;
                    res.toJSON = function() {
                        var json = {};
                        json.id = this.id;
                        json.start = this.start;
                        json.name = this.name;
                        return json;
                    };
                    calendar.columnBubble.showResource(res);
                }
                else {
                    var start = new DayPilot.Date(this.data.start);
                    var end = start.addDays(1);

                    var time = {};
                    time.calendar = calendar;
                    time.start = start;
                    time.end = end;
                    time.toJSON = function() {
                        var json = {};
                        json.start = this.start;
                        json.end = this.end;
                        return json;
                    };

                    calendar.columnBubble.showTime(time);
                }
            }

            var cell = this;
            var div = cell.firstChild; // rowheader
            if (!div.active) {
                //div.data = calendar.rows[td.index];  // TODO replace with custom object
                var data = cell.data;
                // var c = new DayPilot.Column(data.id, data.name, data.start);
                var c = calendar._createColumn(data);
                c.areas = cell.data.areas;

                DayPilot.Areas.showAreas(div, c);
            }

        };

        this._headerMouseOut = function(ev) {
            if (typeof (DayPilot.Bubble) !== 'undefined' && calendar.columnBubble) {
                calendar.columnBubble.hideOnMouseOut();
            }
            DayPilot.Areas.hideAreas(this.firstChild, ev);
        };

        this.eventDeletePostBack = function(e, data) {
            this._postBack2('EventDelete', data, e);
        };
        this.eventDeleteCallBack = function(e, data) {
            this._callBack2('EventDelete', e, data);
        };

        this._eventDeleteDispatch = function(object) {
            var e;
            if (object && object.isEvent) {
                e = object;
            }
            else {
                e = object.parentNode.parentNode.event;
            }

            if (typeof DayPilot.Bubble !== "undefined") {
                DayPilot.Bubble.hideActive();
                DayPilot.Bubble.cancelShowing();
            }

            if (calendar._api2()) {

                var args = {};
                args.e = e;

                args.preventDefault = function() {
                    this.preventDefault.value = true;
                };

                if (typeof calendar.onEventDelete === 'function') {
                    calendar.onEventDelete(args);
                    if (args.preventDefault.value) {
                        return;
                    }
                }

                switch (calendar.eventDeleteHandling) {
                    case 'PostBack':
                        calendar.eventDeletePostBack(e);
                        break;
                    case 'CallBack':
                        calendar.eventDeleteCallBack(e);
                        break;
                    case 'Update':
                        calendar.events.remove(e);
                        break;
                }

                if (typeof calendar.onEventDeleted === 'function') {
                    calendar.onEventDeleted(args);
                }
            }
            else {
                switch (calendar.eventDeleteHandling) {
                    case 'PostBack':
                        calendar.eventDeletePostBack(e);
                        break;
                    case 'CallBack':
                        calendar.eventDeleteCallBack(e);
                        break;
                    case 'JavaScript':
                        calendar.onEventDelete(e);
                        break;
                }
            }
        };

        this.eventResizePostBack = function(e, newStart, newEnd, data) {
            if (!newStart) {
                throw 'newStart is null';
            }
            if (!newEnd) {
                throw 'newEnd is null';
            }

            var params = {};
            params.e = e;
            params.newStart = newStart;
            params.newEnd = newEnd;

            this._postBack2('EventResize', data, params);
        };

        this.eventResizeCallBack = function(e, newStart, newEnd, data) {
            if (!newStart)
                throw 'newStart is null';
            if (!newEnd)
                throw 'newEnd is null';

            var params = {};
            params.e = e;
            params.newStart = newStart;
            params.newEnd = newEnd;

            this._callBack2('EventResize', params, data);
        };

        this._invokeEvent = function(type, action, params, data) {

            if (type === 'PostBack') {
                calendar.postBack2(action, params, data);
            }
            else if (type === 'CallBack') {
                calendar._callBack2(action, params, data, "CallBack");
            }
            else if (type === 'Immediate') {
                calendar._callBack2(action, params, data, "Notify");
            }
            else if (type === 'Queue') {
                calendar.queue.add(new DayPilot.Action(this, action, params, data));
            }
            else if (type === 'Notify') {
                if (resolved.notifyType() === 'Notify') {
                    calendar._callBack2(action, params, data, "Notify");
                }
                else {
                    calendar.queue.add(new DayPilot.Action(calendar, action, params, data));
                }
            }
            else {
                throw "Invalid event invocation type";
            }
        };

        // just hours (int)
        this._visibleStart = function(max) {

            if (this.heightSpec === 'BusinessHoursNoScroll') {
                return this.businessBeginsHour;
            }
            else if (this.hideFreeCells && !max) {
                var addMinutes = (this._minStart) * this.cellDuration / this.cellHeight;
                var addHours = Math.floor(addMinutes / 60);
                addHours = Math.max(0, addHours);
                return Math.min(this.dayBeginsHour + addHours, this.businessBeginsHour);
            }
            else {
                return this.dayBeginsHour;
            }
        };

        this.visibleStart = function() {
            if (calendar.viewType === "Resources") {
                if (calendar._columnsBottom.isEmpty()) {
                    return DayPilot.Date.today();
                }
                var dates = DayPilot.list(calendar._columnsBottom).map(function(column) {
                    return column.start.getTime();
                });
                var min = Math.min.apply(null, dates);
                return new DayPilot.Date(min);
            }
            return this._columnsBottom[0].start;
        };

        this.visibleEnd = function() {
            if (calendar.viewType === "Resources") {
                if (calendar._columnsBottom.isEmpty()) {
                    return DayPilot.Date.today().addDays(1);
                }
                var dates = DayPilot.list(calendar._columnsBottom).map(function(column) {
                    return column.start.getTime();
                });
                var max = Math.max.apply(null, dates);
                return new DayPilot.Date(max).addDays(1);
            }
            var columns = this._columnsBottom;
            var max = columns.length - 1;
            return columns[max].start.addDays(1);
        };

        this._api2 = function() {
            return calendar.api === 2;
        };

        this._getResizingStartFromTop = function(e, shadowTop) {
            var start = e.start();
            var day = start.getDatePart();
            var step = Math.floor(shadowTop / calendar.cellHeight);
            var minutes = step * calendar.cellDuration;
            var ts = minutes * 60 * 1000;
            var visibleStartOffset = calendar._visibleStart() * 60 * 60 * 1000;
            return day.addTime(ts + visibleStartOffset);
        };

        this._getResizingEndFromBottom = function(e, shadowBottom) {
            var step = Math.floor(shadowBottom / calendar.cellHeight);
            var minutes = step * calendar.cellDuration;
            var ts = minutes * 60 * 1000;
            var visibleStartOffset = calendar._visibleStart() * 60 * 60 * 1000;
            var day = calendar._columnsBottom[e.part.dayIndex].start;
            return day.addTime(ts + visibleStartOffset);
        };

        this._eventResizeDispatch = function(e, shadowHeight, shadowTop, border) {

            if (this.eventResizeHandling === 'Disabled') {
                return;
            }

            var newStart, newEnd;

            if (border === 'top') {
                newStart = calendar._getResizingStartFromTop(e, shadowTop);
                newEnd = e.end();

            }
            else if (border === 'bottom') {
                newStart = e.start();
                newEnd = calendar._getResizingEndFromBottom(e, shadowTop + shadowHeight);
            }


            if (calendar._api2()) {
                // API v2
                var args = {};

                var performResize = function() {
                    // make sure it can't be fired again
                    args.loaded = function () {};

                    calendar._clearResizingShadow();

                    if (args.preventDefault.value) {
                        return;
                    }

                    switch (calendar.eventResizeHandling) {
                        case 'PostBack':
                            calendar.eventResizePostBack(e, newStart, newEnd);
                            break;
                        case 'CallBack':
                            calendar.eventResizeCallBack(e, newStart, newEnd);
                            break;
                        case 'Notify':
                            calendar.eventResizeNotify(e, newStart, newEnd);
                            break;
                        case 'Update':
                            e.start(newStart);
                            e.end(newEnd);
                            calendar.events.update(e);
                            break;
                    }

                    if (typeof calendar.onEventResized === 'function') {
                        calendar.onEventResized(args);
                    }
                };

                args.e = e;
                args.newStart = newStart;
                args.newEnd = newEnd;
                args.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                args.async = false;
                args.hideShadow = function() {
                    calendar._clearResizingShadow();
                };
                args.loaded = function() {
                    performResize();
                };

                if (typeof calendar.onEventResize === 'function') {
                    calendar.onEventResize(args);
                    if (args.preventDefault.value) {
                        calendar._clearResizingShadow();
                        return;
                    }
                }

                if (!args.async) {
                    performResize();
                }

            }
            else {
                calendar._clearResizingShadow();
                switch (calendar.eventResizeHandling) {
                    case 'PostBack':
                        calendar.eventResizePostBack(e, newStart, newEnd);
                        break;
                    case 'CallBack':
                        calendar.eventResizeCallBack(e, newStart, newEnd);
                        break;
                    case 'JavaScript':
                        calendar.onEventResize(e, newStart, newEnd);
                        break;
                    case 'Notify':
                        calendar.eventResizeNotify(e, newStart, newEnd);
                        break;
                }
            }
        };

        this.eventResizeNotify = function(e, newStart, newEnd, data) {

            var old = new DayPilot.Event(e.copy(), this);

            e.start(newStart);
            e.end(newEnd);
            e.commit();

            calendar.update();

            this._invokeEventResize("Notify", old, newStart, newEnd, data);

        };

        this._invokeEventResize = function(type, e, newStart, newEnd, data) {
            var params = {};
            params.e = e;
            params.newStart = newStart;
            params.newEnd = newEnd;

            this._invokeEvent(type, "EventResize", params, data);
        };


        this.eventMovePostBack = function(e, newStart, newEnd, newResource, data) {
            if (!newStart)
                throw 'newStart is null';
            if (!newEnd)
                throw 'newEnd is null';

            var params = {};
            params.e = e;
            params.newStart = newStart;
            params.newEnd = newEnd;
            params.newResource = newResource;

            this._postBack2('EventMove', data, params);
        };

        this.eventMoveCallBack = function(e, newStart, newEnd, newResource, data) {
            if (!newStart)
                throw 'newStart is null';
            if (!newEnd)
                throw 'newEnd is null';

            var params = {};
            params.e = e;
            params.newStart = newStart;
            params.newEnd = newEnd;
            params.newResource = newResource;

            this._callBack2('EventMove', params, data);
        };

        this._calculatePositionFromShadow = function(e, newColumnIndex, shadowTop) {

            var _startOffset = 0;
            var step = Math.floor((shadowTop - _startOffset) / calendar.cellHeight);

            var cellSize = calendar.cellDuration; // should be integer
            var boxStart = step * cellSize * 60 * 1000;
            var start = e.start();
            var end = e.end();
            var day = new Date();

            if (start instanceof DayPilot.Date) {
                start = start.toDate();
            }
            day.setTime(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));

            var startOffset = (calendar.useEventBoxes !== 'Never') ? start.getTime() - (day.getTime() + start.getUTCHours() * 3600 * 1000 + Math.floor(start.getUTCMinutes() / cellSize) * cellSize * 60 * 1000) : 0;
            var length = end.getTime() - start.getTime();
            var visibleStartOffset = calendar._visibleStart() * 3600 * 1000;

            if (typeof newColumnIndex === "undefined") {
                newColumnIndex = e.part.dayIndex;
            }
            var newColumn = this._columnsBottom[newColumnIndex];

            var date = newColumn.start.getTime();
            var newStartUTC = new Date();
            newStartUTC.setTime(date + boxStart + startOffset + visibleStartOffset);

            var newStart = new DayPilot.Date(newStartUTC);

            var newEnd = newStart.addTime(length);

            var newResource = newColumn.id;

            return {
                "start": newStart,
                "end": newEnd,
                "resource": newResource
            };
        };

        this._eventMoveDispatch = function(e, newColumnIndex, shadowTop, ev, drag) {

            if (calendar.eventMoveHandling === 'Disabled') {
                return;
            }

            var newPosition = calendar._calculatePositionFromShadow(e, newColumnIndex, shadowTop);

            var newStart = newPosition.start;
            var newEnd = newPosition.end;
            var newResource = newPosition.resource;

            var external = !!drag;

            if (calendar._api2()) {
                // API v2
                var args = {};

                var performMove = function() {

                    // make sure it can't be fired again
                    args.loaded = function () {};

                    calendar._clearMovingShadow();

                    if (args.preventDefault.value) {
                        return;
                    }

                    switch (calendar.eventMoveHandling) {
                        case 'PostBack':
                            calendar.eventMovePostBack(e, newStart, newEnd, newResource);
                            break;
                        case 'CallBack':
                            calendar.eventMoveCallBack(e, newStart, newEnd, newResource);
                            break;
                        case 'Notify':
                            calendar.eventMoveNotify(e, newStart, newEnd, newResource);
                            break;
                        case 'Update':
                            e.start(newStart);
                            e.end(newEnd);
                            e.resource(newResource);
                            if (external) {
                                e.commit();
                                calendar.events.add(e);
                            }
                            else {
                                calendar.events.update(e);
                            }

                            calendar._deleteDragSource();
                            break;
                    }

                    // calendar._clearMovingShadow();

                    if (typeof calendar.onEventMoved === 'function') {
                        calendar.onEventMoved(args);
                    }

                };

                args.e = e;
                args.newStart = newPosition.start;
                args.newEnd = newPosition.end;
                args.newResource = newPosition.resource;
                args.external = external;
                args.ctrl = false;
                if (ev) {
                    args.ctrl = ev.ctrlKey;
                }
                args.shift = false;
                if (ev) {
                    args.shift = ev.shiftKey;
                }
                args.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                args.async = false;
                args.hideShadow = function() {
                    calendar._clearMovingShadow();
                };
                args.loaded = function() {
                    performMove();
                };

                if (typeof calendar.onEventMove === 'function') {
                    calendar.onEventMove(args);
                    if (args.preventDefault.value) {
                        calendar._clearMovingShadow();
                        return;
                    }
                }

                if (!args.async) {
                    performMove();
                }
            }
            else {
                calendar._clearMovingShadow();
                switch (calendar.eventMoveHandling) {
                    case 'PostBack':
                        calendar.eventMovePostBack(e, newStart, newEnd, newResource);
                        break;
                    case 'CallBack':
                        calendar.eventMoveCallBack(e, newStart, newEnd, newResource);
                        break;
                    case 'JavaScript':
                        calendar.onEventMove(e, newStart, newEnd, newResource, external, ev ? ev.ctrlKey : false, ev ? ev.shiftKey : false);
                        break;
                    case 'Notify':
                        calendar.eventMoveNotify(e, newStart, newEnd, newResource, null);
                        break;

                }
            }

        };

        this.eventMoveNotify = function(e, newStart, newEnd, newResource, data) {

            var old = new DayPilot.Event(e.copy(), this);

            e.start(newStart);
            e.end(newEnd);
            e.resource(newResource);
            e.commit();

            calendar.update();

            this._invokeEventMove("Notify", old, newStart, newEnd, newResource, data);

        };

        this._invokeEventMove = function(type, e, newStart, newEnd, newResource, data) {
            var params = {};
            params.e = e;
            params.newStart = newStart;
            params.newEnd = newEnd;
            params.newResource = newResource;

            this._invokeEvent(type, "EventMove", params, data);
        };

        this._deleteDragSource = function() {
            if (calendar.todo) {
                if (calendar.todo.del) {
                    var del = calendar.todo.del;
                    del.parentNode.removeChild(del);
                    calendar.todo.del = null;
                }
            }
        };

        // called by DayPilot.Bubble
        this._bubbleCallBack = function(args, bubble) {
            var guid = calendar._recordBubbleCall(bubble);

            var params = {};
            params.args = args;
            params.guid = guid;

            calendar._callBack2("Bubble", params);
        };

        this._recordBubbleCall = function(bubble) {
            var guid = DayPilot.guid();
            if (!this.bubbles) {
                this.bubbles = [];
            }

            this.bubbles[guid] = bubble;
            return guid;
        };

        this.eventMenuClickPostBack = function(e, command, data) {
            var params = {};
            params.e = e;
            params.command = command;

            this._postBack2('EventMenuClick', data, params);

        };
        this.eventMenuClickCallBack = function(e, command, data) {
            var params = {};
            params.e = e;
            params.command = command;

            this._callBack2('EventMenuClick', params, data);

        };

        // called by DayPilot.Menu
        this._eventMenuClick = function(command, e, handling) {
            switch (handling) {
                case 'PostBack':
                    calendar.eventMenuClickPostBack(e, command);
                    break;
                case 'CallBack':
                    calendar.eventMenuClickCallBack(e, command);
                    break;
            }
        };

        this.timeRangeMenuClickPostBack = function(e, command, data) {
            //        this.postBack('TRM:', e.start, e.end, e.resource, command);
            var params = {};
            params.selection = e;
            params.command = command;

            this._postBack2("TimeRangeMenuClick", data, params);

        };
        this.timeRangeMenuClickCallBack = function(e, command, data) {
            var params = {};
            params.selection = e;
            params.command = command;

            this._callBack2("TimeRangeMenuClick", params, data);
        };

        // called by DayPilot.Menu
        this._timeRangeMenuClick = function(command, e, handling) {
            switch (handling) {
                case 'PostBack':
                    calendar.timeRangeMenuClickPostBack(e, command);
                    break;
                case 'CallBack':
                    calendar.timeRangeMenuClickCallBack(e, command);
                    break;
            }
        };

        this.timeRangeSelectedPostBack = function(start, end, resource, data) {
            //this.postBack('FRE:', start, end, column);
            var range = {};
            range.start = start;
            range.end = end;
            range.resource = resource;

            this._postBack2('TimeRangeSelected', data, range);
        };
        this.timeRangeSelectedCallBack = function(start, end, resource, data) {

            var range = {};
            range.start = start;
            range.end = end;
            range.resource = resource;

            this._callBack2('TimeRangeSelected', range, data);
        };

        this._timeRangeSelectedDispatch = function(start, end, column) {
            // make sure it's DayPilot.Date
            start = new DayPilot.Date(start);
            end = new DayPilot.Date(end);

            var resource = column;

            if (calendar._api2()) {

                var args = {};
                args.start = start;
                args.end = end;
                args.resource = resource;
                args.control = calendar;
                args.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                args.toJSON = function() {
                    return DayPilot.Util.copyProps(args, {}, ["start", "end", "resource"]);
                };


                if (typeof calendar.onTimeRangeSelect === 'function') {
                    calendar.onTimeRangeSelect(args);
                    if (args.preventDefault.value) {
                        return;
                    }
                }

                // now perform the default builtin action
                switch (calendar.timeRangeSelectedHandling) {
                    case 'PostBack':
                        calendar.timeRangeSelectedPostBack(start, end, resource);
                        break;
                    case 'CallBack':
                        calendar.timeRangeSelectedCallBack(start, end, resource);
                        break;
                }

                if (typeof calendar.onTimeRangeSelected === 'function') {
                    calendar.onTimeRangeSelected(args);
                }

            }
            else {
                switch (calendar.timeRangeSelectedHandling) {
                    case 'PostBack':
                        calendar.timeRangeSelectedPostBack(start, end, column);
                        break;
                    case 'CallBack':
                        calendar.timeRangeSelectedCallBack(start, end, column);
                        break;
                    case 'JavaScript':
                        calendar.onTimeRangeSelected(start, end, column);
                        break;
                }
            }
        };

        this.timeRangeDoubleClickPostBack = function(start, end, column, data) {
            var range = {};
            range.start = start;
            range.end = end;
            range.resource = column;

            this._postBack2('TimeRangeDoubleClick', data, range);
            //        this.postBack('TRD:', start, end, column);
        };
        this.timeRangeDoubleClickCallBack = function(start, end, column, data) {

            var range = {};
            range.start = start;
            range.end = end;
            range.resource = column;

            this._callBack2('TimeRangeDoubleClick', range, data);
        };

        this._timeRangeDoubleClickDispatch = function(start, end, column) {
            if (calendar._api2()) {

                var resource = column;

                var args = {};
                args.start = start;
                args.end = end;
                args.resource = resource;

                args.preventDefault = function() {
                    this.preventDefault.value = true;
                };

                if (typeof calendar.onTimeRangeDoubleClick === 'function') {
                    calendar.onTimeRangeDoubleClick(args);
                    if (args.preventDefault.value) {
                        return;
                    }
                }

                switch (calendar.timeRangeDoubleClickHandling) {
                    case 'PostBack':
                        calendar.timeRangeDoubleClickPostBack(start, end, resource);
                        break;
                    case 'CallBack':
                        calendar.timeRangeDoubleClickCallBack(start, end, resource);
                        break;
                }

                if (typeof calendar.onTimeRangeDoubleClicked === 'function') {
                    calendar.onTimeRangeDoubleClicked(args);
                }
            }
            else {
                switch (calendar.timeRangeDoubleClickHandling) {
                    case 'PostBack':
                        calendar.timeRangeDoubleClickPostBack(start, end, column);
                        break;
                    case 'CallBack':
                        calendar.timeRangeDoubleClickCallBack(start, end, column);
                        break;
                    case 'JavaScript':
                        calendar.onTimeRangeDoubleClick(start, end, column);
                        break;
                }
            }
        };

        this.eventEditPostBack = function(e, newText, data) {
            var params = {};
            params.e = e;
            params.newText = newText;

            this._postBack2("EventEdit", data, params);
        };

        this.eventEditCallBack = function(e, newText, data) {

            var params = {};
            params.e = e;
            params.newText = newText;

            this._callBack2("EventEdit", params, data);
        };

        this._eventEditDispatch = function(e, newText) {
            if (calendar._api2()) {

                var args = {};
                args.e = e;
                args.newText = newText;
                args.preventDefault = function() {
                    this.preventDefault.value = true;
                };

                if (typeof calendar.onEventEdit === 'function') {
                    calendar.onEventEdit(args);
                    if (args.preventDefault.value) {
                        return;
                    }
                }

                switch (calendar.eventEditHandling) {
                    case 'PostBack':
                        calendar.eventEditPostBack(e, newText);
                        break;
                    case 'CallBack':
                        calendar.eventEditCallBack(e, newText);
                        break;
                    case 'Update':
                        e.text(newText);
                        calendar.events.update(e);
                        break;
                }

                if (typeof calendar.onEventEdited === 'function') {
                    calendar.onEventEdited(args);
                    if (args.preventDefault.value) {
                        return;
                    }
                }
            }
            else {
                switch (calendar.eventEditHandling) {
                    case 'PostBack':
                        calendar.eventEditPostBack(e, newText);
                        break;
                    case 'CallBack':
                        calendar.eventEditCallBack(e, newText);
                        break;
                    case 'JavaScript':
                        calendar.onEventEdit(e, newText);
                        break;
                }
            }

        };

        this.eventSelectPostBack = function(e, change, data) {
            var params = {};
            params.e = e;
            params.change = change;
            this._postBack2('EventSelect', data, params);
        };

        this.eventSelectCallBack = function(e, change, data) {
            var params = {};
            params.e = e;
            params.change = change;
            this._callBack2('EventSelect', params, data);
        };

        this._eventSelectDispatch = function(div, e, ctrlKey, metaKey) {

            var m = calendar.multiselect;

            var allowDeselect = false;
            var isSelected = m.isSelected(e);
            var ctrlOrMeta = ctrlKey || metaKey;
            if (!ctrlOrMeta && isSelected && !allowDeselect && m._list.length === 1) {
                return;
            }

            if (calendar._api2()) {

                m.previous = m.events();

                var args = {};
                args.e = e;
                args.selected = m.isSelected(e);
                args.ctrl = ctrlKey;
                args.meta = metaKey;
                args.preventDefault = function() {
                    this.preventDefault.value = true;
                };

                if (typeof calendar.onEventSelect === 'function') {
                    calendar.onEventSelect(args);
                    if (args.preventDefault.value) {
                        return;
                    }
                }

                switch (calendar.eventSelectHandling) {
                    case 'PostBack':
                        calendar.eventSelectPostBack(e, change);
                        break;
                    case 'CallBack':
                        if (typeof WebForm_InitCallback !== 'undefined') {
                            window.__theFormPostData = "";
                            window.__theFormPostCollection = [];
                            WebForm_InitCallback();
                        }
                        calendar.eventSelectCallBack(e, change);
                        break;
                    case 'Update':
                        m._toggleDiv(div, ctrlKey);
                        break;
                }

                if (typeof calendar.onEventSelected === 'function') {
                    args.change = m.isSelected(e) ? "selected" : "deselected";
                    args.selected = m.isSelected(e);
                    calendar.onEventSelected(args);
                }

            }
            else {
                m.previous = m.events();
                m._toggleDiv(div, ctrlKey);
                var change = m.isSelected(e) ? "selected" : "deselected";

                switch (calendar.eventSelectHandling) {
                    case 'PostBack':
                        calendar.eventSelectPostBack(e, change);
                        break;
                    case 'CallBack':
                        if (typeof WebForm_InitCallback !== 'undefined') {
                            window.__theFormPostData = "";
                            window.__theFormPostCollection = [];
                            WebForm_InitCallback();
                        }
                        calendar.eventSelectCallBack(e, change);
                        break;
                    case 'JavaScript':
                        calendar.onEventSelect(e, change);
                        break;
                }
            }

        };

        this.commandCallBack = function(command, data) {
            this._pauseAutoRefresh();

            var params = {};
            params.command = command;

            this._callBack2('Command', params, data);
        };

        this._onCellMouseDown = function(ev) {

            if (touch.active || touch.using) {
                //ev.preventDefault();
                return;
            }

            clearTimeout(DayPilotCalendar.selectedTimeout);

            if (DayPilot.Global.selecting) {
                return;
            }

            if (DayPilotCalendar.editing) {
                DayPilotCalendar.editing.blur();
                return;
            }

            // if double click is active, check if the click was inside
            if (calendar.selectedCells && calendar.timeRangeDoubleClickHandling !== 'Disabled') {
                // only if the click is on an active cell
                for (var i = 0; i < calendar.selectedCells.length; i++) {
                    if (this === calendar.selectedCells[i]) {
                        return;
                    }
                }
            }

            if (calendar.timeRangeSelectedHandling === "Disabled") {
                return;
            }

            //var button = (window.event) ? window.event.button : ev.which;
            var button = DayPilot.Util.mouseButton(ev);
            if (!button.left) {
                return;
            }

            // DayPilotCalendar.firstMousePos = DayPilot.mo3(calendar.nav.events, ev || window.event);
            DayPilotCalendar.firstMousePos = calendar.coords;
            DayPilotCalendar.firstMousePos.calendar = calendar;
            calendar.clearSelection();  // initializes selectedCells if necessary
            DayPilotCalendar.topSelectedCell = this;
            DayPilotCalendar.bottomSelectedCell = this;
            DayPilotCalendar.column = DayPilotCalendar.getColumn(this);
            calendar.selectedCells.push(this);
            DayPilotCalendar.firstSelected = this;

            DayPilot.Global.selecting = {"calendar": calendar};
            calendar._activateSelection();

        };

        this._activateSelection = function() {

            var selection = this.getSelection();

            if (!selection) {
                return;
            }

            if (!calendar.selectedCells) {
                return;
            }

            (function activateSelectionNew() {

                var first = DayPilotCalendar.topSelectedCell;
                var last = DayPilotCalendar.bottomSelectedCell;

                // var columnIndex = first.parentNode.cells.indexOf(first);

                var columnIndex = (function() {
                    // it's the new div cell
                    if (first.data) {
                        return first.data.x;
                    }

                    var cells = first.parentNode.cells;
                    for (var i = 0; i < cells.length; i++) {
                        if (cells[i] === first) {
                            return i;
                        }
                    }
                    return -1;
                })();

                var format = calendar.timeRangeSelectingStartEndFormat;
                if (format === "Auto") {
                    format = resolved.timeFormat() === "Clock24Hours" ? "H:mm" : "h:mm tt";
                }

                var col = calendar._columnsBottom[columnIndex];

                if (!col) {
                    return;
                }

                var args = {};
                args.start = first.start;
                args.end = last.end;
                args.duration = new DayPilot.Duration(args.start, args.end);
                args.resource = col.id;
                args.allowed = true;
                args.html = null;
                args.cssClass = null;

                args.top = {};
                args.top.width = null;
                args.top.space = 5;
                args.top.html = args.start.toString(format, resolved.locale());
                args.top.enabled = calendar.timeRangeSelectingStartEndEnabled;

                args.bottom = {};
                args.bottom.width = null;
                args.bottom.space = 5;
                args.bottom.html = args.end.toString(format, resolved.locale());
                args.bottom.enabled = calendar.timeRangeSelectingStartEndEnabled;

                // calendar._touchMsg("before check");

                // disabled, prevented tap on touch devices
                /*if (!DayPilot.Global.selecting) {
                    return;
                }*/

                // calendar._touchMsg("after check");

                var previous = DayPilot.Global.selecting && DayPilot.Global.selecting.args;
                if (previous && previous.start === args.start && previous.end === args.end && previous.resource == args.resource) {
                    return;
                }

                if (!calendar.allowEventOverlap) {
                    var data = {
                        "id": null,
                        "start": args.start,
                        "end": args.end,
                        "resource": args.resource
                    };
                    if (calendar.events._overlaps(data)) {
                        args.allowed = false;
                    }
                }
                if (calendar._overDisabledCells(args.start, args.end, args.resource)) {
                    // DayPilot.Util.addClass(shadow, calendar._prefixCssClass("_shadow_forbidden"));
                    args.allowed = false;
                }

                if (typeof calendar.onTimeRangeSelecting === "function" && args.allowed) {
                    calendar.onTimeRangeSelecting(args);
                }

                //DayPilot.de(calendar.elements.selection);
                //calendar.elements.selection = [];

                if (DayPilot.Global.selecting) {
                    DayPilot.Global.selecting.args = args;
                }

                var top = calendar._getPixels(first.start, col.start).boxTop - calendar._autoHiddenPixels();
                var bottom = calendar._getPixels(last.end, col.start).boxBottom - calendar._autoHiddenPixels();
                var height = bottom - top;

                var div = (function() {
                    if (calendar.nav.activeSelection) {
                        return calendar.nav.activeSelection;
                    }
                    var div = document.createElement("div");
                    div.setAttribute("unselectable", "on");
                    div.style.zIndex = calendar._shadowZindex;
                    div.style.position = "absolute";
                    div.style.left = "0px";
                    div.style.width = "100%";

                    div.ondblclick = function(e) {
                        if (calendar.timeRangeDoubleClickHandling === "Disabled") {
                            return;
                        }
                        clearTimeout(calendar._timeRangeClickTimeout);
                        var sel = calendar.getSelection();
                        if (!sel) {
                            return;
                        }
                        calendar._timeRangeDoubleClickDispatch(sel.start, sel.end, sel.resource);
                    };

                    var inner = document.createElement("div");
                    inner.setAttribute("unselectable", "on");
                    inner.className = calendar._prefixCssClass("_shadow_inner");

                    div.appendChild(inner);

                    calendar.nav.events.rows[0].cells[columnIndex].selection.appendChild(div);
                    calendar.elements.selection.push(div);
                    calendar.nav.activeSelection = div;

                    return div;
                })();

                // reset
                div.className = calendar._prefixCssClass("_shadow");
                div.firstChild.innerHTML = "";

                // position
                div.style.top = top + "px";
                div.style.height = height + "px";

                var inner = div.firstChild;

                if (args.html) {
                    inner.innerHTML = args.html;
                }
                if (args.cssClass) {
                    DayPilot.Util.addClass(div, args.cssClass);
                }
                if (!args.allowed) {
                    DayPilot.Util.addClass(div, calendar._prefixCssClass("_shadow_forbidden"));
                }

                calendar._drawSelectionIndicators(div, columnIndex, args);
            })();

        };

        this._clearMovingShadow = function() {
            calendar._deleteShadow(DayPilotCalendar.movingShadow);
            DayPilotCalendar.movingShadow = null;
        };

        this._clearResizingShadow = function() {
            // DayPilot.de(DayPilotCalendar.resizingShadow);
            calendar._deleteShadow(DayPilotCalendar.resizingShadow);
            DayPilotCalendar.resizingShadow = null;
        };

        this._deleteShadow = function(shadow) {
            DayPilot.de(shadow);
            DayPilot.de(calendar.nav.indicatorTop);
            DayPilot.de(calendar.nav.indicatorBottom);
        };

        this._drawSelectionIndicators = function(div, columnIndex, args) {
            var cells = calendar.nav.events.rows[0].cells;
            var container = cells[columnIndex].events;
            // var container = div.parentNode;

            var isLastCol = columnIndex === cells.length - 1;

            // clear old divs
            DayPilot.de(calendar.nav.indicatorTop);
            DayPilot.de(calendar.nav.indicatorBottom);

            if (args.top.enabled) {
                var top = document.createElement("div");
                top.style.zIndex = calendar._shadowZindex; // hack
                top.style.position = "absolute";
                top.style.top = div.offsetTop + "px";

                if (!isLastCol) {
                    top.style.left = (div.offsetWidth + args.top.space) + "px";
                }
                else {
                    top.style.right = "0px";
                }

                if (args.top.width) {
                    top.style.width = args.top.width + "px";
                }
                else {
                    top.style.whiteSpace = "nowrap";
                }

                //var top = DayPilot.Util.div(container, div.offsetLeft + div.offsetWidth + args.top.space, div.offsetTop, args.top.width, null);
                if (args.top.html) {
                    top.innerHTML = args.top.html;
                }
                top.className = calendar._prefixCssClass("_shadow_top");
                container.appendChild(top);
                calendar.elements.selection.push(top);
                calendar.nav.indicatorTop = top;
            }

            if (args.bottom.enabled) {
                var bottom = document.createElement("div");
                bottom.style.zIndex = calendar._shadowZindex; // hack
                bottom.style.position = "absolute";
                bottom.style.top = (div.offsetTop + div.offsetHeight) + "px";
                if (!isLastCol) {
                    bottom.style.left = (div.offsetWidth + args.bottom.space) + "px";
                }
                else {
                    bottom.style.right = "0px";
                }

                if (args.bottom.width) {
                    bottom.style.width = args.bottom.width + "px";
                }
                else {
                    bottom.style.whiteSpace = "nowrap";
                }

                if (args.bottom.html) {
                    bottom.innerHTML = args.bottom.html;
                }

                bottom.className = calendar._prefixCssClass("_shadow_bottom");

                container.appendChild(bottom);

                var height = bottom.offsetHeight;

                bottom.style.top = (div.offsetTop + div.offsetHeight - height) + "px";


                calendar.elements.selection.push(bottom);
                calendar.nav.indicatorBottom = bottom;
            }

        };

        this._onCellMouseOut = function(ev) {
            if (typeof (DayPilot.Bubble) !== 'undefined' && calendar.cellBubble) {
                calendar.cellBubble.hideOnMouseOut();
            }

        };

        this._onCellMouseMove = function(ev) {

            if (typeof (DayPilotCalendar) === 'undefined') {
                return;
            }

            if (touch.active || touch.using) {
                return;
            }

            if (typeof (DayPilot.Bubble) !== 'undefined' && calendar.cellBubble) {
                var column = DayPilotCalendar.getColumn(this);
                var res = calendar._columnsBottom[column].id;

                var cell = {};
                cell.calendar = calendar;
                cell.start = this.start;
                cell.end = this.end;
                cell.resource = res;
                cell.toJSON = function() {
                    var json = {};
                    json.start = this.start;
                    json.end = this.end;
                    json.resource = this.resource;
                    return json;
                };

                calendar.cellBubble.showCell(cell);
            }

            // moved to mainmousemove
        };

        this.getSelection = function() {
            if (!DayPilotCalendar.topSelectedCell) {
                return null;
            }
            if (!DayPilotCalendar.bottomSelectedCell) {
                return null;
            }

            var start = DayPilotCalendar.topSelectedCell.start;
            var end = DayPilotCalendar.bottomSelectedCell.end;
            var columnId = DayPilotCalendar.topSelectedCell.resource;

            return new DayPilot.Selection(start, end, columnId, calendar);
        };

        this._onMainMouseUp = function(ev) {
            // moved to gMouseUp
        };

        this._scroll = function(ev) {
            var scrolling = calendar.columnWidthSpec === "Fixed";

            if (scrolling || calendar._unifiedScrollable) {
                if (!calendar.nav.bottomLeft) {
                    return;
                }
                calendar.nav.bottomLeft.scrollTop = calendar.nav.bottomRight.scrollTop;
                if (calendar.nav.upperRight) {
                    calendar.nav.upperRight.scrollLeft = calendar.nav.bottomRight.scrollLeft;
                }

                calendar.nav.scrollLayer.scrollLeft = calendar.nav.bottomRight.scrollLeft;
            }

            var scroll = calendar._scrollDiv();

            calendar.scrollPos = scroll.scrollTop;
            calendar._scrollHeight = scroll.clientHeight;
            calendar.nav.scrollpos.value = calendar.scrollPos;

            calendar._updateScrollLabels();
        };


        this._updateScrollLabels = function() {
            if (!this.scrollLabelsVisible) {
                return;
            }

            if (!this._scrollLabels) {
                return;
            }

            var required = this.nav && this.nav.main && this.nav.main.rows && this.nav.main.rows.length > 0 && this.nav.main.rows[0].cells.length > 0;

            if (!required) {
                return;
            }

            // update horizontal position
            var columns = this._columnsBottom;
            var hoursWidth = (this.showHours ? this.hourWidth : 0);
            //var colWidth = (this.nav.scroll.clientWidth - hoursWidth) / columns.length;
            var colWidth = this.nav.main.rows[0].cells[0].clientWidth;
            var iw = 10;
            var offset = 1;

            for (var i = 0; i < this.nav.scrollUp.length; i++) {
                var scrollUp = this.nav.scrollUp[i];
                var scrollDown = this.nav.scrollDown[i];

                var left = Math.floor(hoursWidth + i * colWidth + colWidth / 2 - (iw / 2) + offset);
                if (left < 0) { // check for invalid value
                    left = 0;
                }

                left -= calendar.nav.bottomRight.scrollLeft;

                if (scrollUp && scrollUp.style) {
                    scrollUp.style.left = left + "px";
                }
                if (scrollDown && scrollDown.style) {
                    scrollDown.style.left = left + "px";
                }
            }

            var hiddenPixels = this._autoHiddenPixels();

            // update vertical position
            for (var i = 0; i < this.nav.scrollUp.length; i++) {
                var up = this.nav.scrollUp[i];
                var down = this.nav.scrollDown[i];
                var minEnd = this._scrollLabels[i].minEnd - hiddenPixels;
                var maxStart = this._scrollLabels[i].maxStart - hiddenPixels;

                if (up && down) {
                    if (minEnd <= calendar.scrollPos && parseInt(up.style.left) >= calendar.hourWidth) {
                        up.style.top = (this._totalHeaderHeight()) + "px";
                        up.style.display = '';
                    }
                    else {
                        up.style.display = 'none';
                    }

                    if (maxStart >= calendar.scrollPos + calendar._scrollHeight && parseInt(down.style.left) >= calendar.hourWidth) {
                        // scrollHeight is updated on scrolling
                        down.style.top = (this._totalHeaderHeight() + this._scrollHeight - 10) + "px";
                        down.style.display = '';
                    }
                    else {
                        down.style.display = 'none';
                    }
                }
            }
        };

        this._createEdit = function(object) {

            var par = object.parentNode;

            var left = 0;
            var top = object.offsetTop;
            var width = object.parentNode.offsetWidth;
            var height = object.offsetHeight;

            if (object.event.allday()) {
                left = object.offsetLeft;
                width = object.offsetWidth;
            }

            var edit = document.createElement('textarea');
            edit.style.boxSizing = "border-box";
            edit.style.position = 'absolute';
            edit.style.width = width + 'px';
            edit.style.height = height + 'px'; //offsetHeight

            var fontFamily = DayPilot.gs(object, 'fontFamily');
            if (!fontFamily) fontFamily = DayPilot.gs(object, 'font-family');
            edit.style.fontFamily = fontFamily;

            var fontSize = DayPilot.gs(object, 'fontSize');
            if (!fontSize) fontSize = DayPilot.gs(object, 'font-size');
            edit.style.fontSize = fontSize;

            edit.style.left = left + 'px';
            edit.style.top = top + 'px';
            edit.style.border = '1px solid black';
            edit.style.padding = '0px';
            edit.style.marginTop = '0px';
            edit.style.backgroundColor = 'white';
            edit.value = (object.event.text() || "").trim();

            edit.event = object.event;
            par.appendChild(edit);
            return edit;
        };

        this._eventSelect = function(div, e, ctrlKey, metaKey) {
            calendar._eventSelectDispatch(div, e, ctrlKey, metaKey);
        };

        // internal methods for handling event selection
        this.multiselect = {};

        this.multiselect._initList = [];
        this.multiselect._list = [];
        this.multiselect._divs = [];
        this.multiselect._previous = []; // not used at the moment

        this.multiselect._serialize = function() {
            var m = calendar.multiselect;
            return JSON.stringify(m.events());
        };

        this.multiselect.events = function() {
            var m = calendar.multiselect;
            var events = [];
            events.ignoreToJSON = true;
            for (var i = 0; i < m._list.length; i++) {
                events.push(m._list[i]);
            }
            return events;
        };

        this.multiselect._updateHidden = function() {
            var h = calendar.nav.select;
            h.value = calendar.multiselect._serialize();
        };

        this.multiselect._toggleDiv = function(div, ctrl) {
            var m = calendar.multiselect;
            if (m.isSelected(div.event)) {
                if (calendar.allowMultiSelect) {
                    if (ctrl) {
                        m.remove(div.event, true);
                    }
                    else {
                        var count = m._list.length;
                        m.clear(true);
                        if (count > 1) {
                            m.add(div.event, true);
                        }

                    }
                }
                else { // clear all
                    m.clear(true);
                }
            }
            else {
                if (calendar.allowMultiSelect) {
                    if (ctrl) {
                        m.add(div.event, true);
                    }
                    else {
                        m.clear(true);
                        m.add(div.event, true);
                    }
                }
                else {
                    m.clear(true);
                    m.add(div.event, true);
                }
            }
            m.redraw();
            m._updateHidden();
        };

        // compare event with the init select list
        this.multiselect._shouldBeSelected = function(ev) {
            var m = calendar.multiselect;
            return m._isInList(ev, m._initList);
        };

        this.multiselect._alert = function() {
            var m = calendar.multiselect;
            var list = [];
            for (var i = 0; i < m._list.length; i++) {
                var event = m._list[i];
                list.push(event.value());
            }
            alert(list.join("\n"));
        };

        this.multiselect.add = function(ev, dontRedraw) {
            var m = calendar.multiselect;
            if (m._indexOf(ev) === -1) {
                m._list.push(ev);
            }
            m._updateHidden();
            if (dontRedraw) {
                return;
            }
            m.redraw();
        };

        this.multiselect.remove = function(ev, dontRedraw) {
            var m = calendar.multiselect;
            var i = m._indexOf(ev);
            if (i !== -1) {
                m._list.splice(i, 1);
            }
            m._updateHidden();

            if (dontRedraw) {
                return;
            }
            m.redraw();
        };

        this.multiselect.clear = function(dontRedraw) {
            var m = calendar.multiselect;
            m._list = [];

            m._updateHidden();

            if (dontRedraw) {
                return;
            }
            m.redraw();
        };

        this.multiselect.redraw = function() {
            var m = calendar.multiselect;
            for (var i = 0; i < calendar.elements.events.length; i++) {
                var div = calendar.elements.events[i];
                if (m.isSelected(div.event)) {
                    m._divSelect(div);
                }
                else {
                    m._divDeselect(div);
                }
            }
        };

        this.multiselect._divSelect = function(div) {
            var m = calendar.multiselect;
            var cn = calendar._prefixCssClass("_selected");
            var c = m._findContentDiv(div);
            DayPilot.Util.addClass(c, cn);
            /*if (calendar.useEventSelectionBars) {
                m._divSelectTraditional(div);
            }*/
            m._divs.push(div);
        };

        this.multiselect._findContentDiv = function(div) {
            return div;
        };

        this.multiselect._divDeselectAll = function() {
            var m = calendar.multiselect;
            for (var i = 0; i < m._divs.length; i++) {
                var div = m._divs[i];
                m._divDeselect(div, true);
            }
            m._divs = [];
        };

        this.multiselect._divDeselect = function(div, dontRemoveFromCache) {
            var m = calendar.multiselect;
            var cn = calendar._prefixCssClass("_selected");
            var c = m._findContentDiv(div);
            DayPilot.Util.removeClass(c, cn);

            /*if (calendar.useEventSelectionBars) {
                m._divDeselectTraditional(div);
            }*/

            if (dontRemoveFromCache) {
                return;
            }
            var i = DayPilot.indexOf(m._divs, div);
            if (i !== -1) {
                m._divs.splice(i, 1);
            }

        };

        this.multiselect.isSelected = function(ev) {
            return calendar.multiselect._isInList(ev, calendar.multiselect._list);
        };

        this.multiselect._indexOf = function(ev) {
            return DayPilot.indexOf(calendar.multiselect._list, ev);
        };

        this.multiselect._isInList = function(e, list) {
            if (!list) {
                return false;
            }
            for (var i = 0; i < list.length; i++) {
                var ei = list[i];
                if (e === ei) {
                    return true;
                }
                if (typeof ei.value === 'function') {
                    if (ei.value() !== null && e.value() !== null && ei.value() === e.value()) {
                        return true;
                    }
                    if (ei.value() === null && e.value() === null && ei.recurrentMasterId() === e.recurrentMasterId() && e.start().toStringSortable() === ei.start()) {
                        return true;
                    }
                }
                else {
                    if (ei.value !== null && e.value() !== null && ei.value === e.value()) {
                        return true;
                    }
                    if (ei.value === null && e.value() === null && ei.recurrentMasterId === e.recurrentMasterId() && e.start().toStringSortable() === ei.start) {
                        return true;
                    }
                }

            }

            return false;
        };

/*
        this.multiselect._divSelectTraditional = function(obj) {
            var w = 5;

            if (!obj.top) {
                var top = document.createElement("div");
                top.setAttribute("unselectable", "on");
                top.style.position = 'absolute';
                top.style.left = obj.offsetLeft + 'px';
                top.style.width = obj.offsetWidth + 'px';
                top.style.top = (obj.offsetTop - w) + 'px';
                top.style.height = w + 'px';
                top.style.backgroundColor = calendar.eventSelectColor;
                top.style.zIndex = 100;
                obj.parentNode.appendChild(top);
                obj.top = top;
            }

            if (!obj.bottom) {
                var bottom = document.createElement("div");
                bottom.setAttribute("unselectable", "on");
                bottom.style.position = 'absolute';
                bottom.style.left = obj.offsetLeft + 'px';
                bottom.style.width = obj.offsetWidth + 'px';
                bottom.style.top = (obj.offsetTop + obj.offsetHeight) + 'px';
                bottom.style.height = w + 'px';
                bottom.style.backgroundColor = calendar.eventSelectColor;
                bottom.style.zIndex = 100;
                obj.parentNode.appendChild(bottom);
                obj.bottom = bottom;
            }

        };
*/

/*
        this.multiselect._divDeselectTraditional = function(obj) {
            if (obj.top) {
                obj.parentNode.removeChild(obj.top);
                obj.top = null;
            }
            if (obj.bottom) {
                obj.parentNode.removeChild(obj.bottom);
                obj.bottom = null;
            }
        };
*/

        this._divEdit = function(object) {
            if (DayPilotCalendar.editing) {
                DayPilotCalendar.editing.blur();
                return;
            }

            var edit = this._createEdit(object);
            DayPilotCalendar.editing = edit;

            DayPilot.re(edit, DayPilot.touch.start, function(ev) {
                ev.stopPropagation();
            });

            edit.onblur = function() {
                if (!object.event) {
                    return;
                }
                var id = object.event.value();
                var tag = object.event.tag();
                var oldText = object.event.text();
                var newText = edit.value;

                DayPilotCalendar.editing = null;

                edit.onblur = null;

                //if (edit.)
                DayPilot.de(edit);
                //edit.parentNode.removeChild(edit);

                if (oldText === newText) {
                    return;
                }

                object.style.display = 'none';
                calendar._eventEditDispatch(object.event, newText);
            };

            edit.onkeypress = function(e) {
                var keynum = (window.event) ? event.keyCode : e.keyCode;
                if (keynum === 13) {
                    this.onblur();
                    e.preventDefault();
                    return false;
                }
            };

            edit.onkeyup = function(e) {
                var keynum = (window.event) ? event.keyCode : e.keyCode;

                if (keynum === 27) {
                    edit.onblur = null;
                    edit.parentNode && edit.parentNode.removeChild(edit);
                    DayPilotCalendar.editing = false;
                }

                return true;
            };

            edit.select();
            edit.focus();
        };

        this._generateColumns = function() {
            if (calendar.viewType === "Resources") {
                return false;
            }
            if (calendar._columnsList() && calendar._serverBased()) {
                return false;
            }
            return true;
        };

        // backwards compatibility
        this._columnsList = function() {
            if (DayPilot.isArray(calendar.columns)) {
                return calendar.columns;
            }
            return calendar.columns.list;
        };

        this.columns = {};
        this.columns.list = [];
        this.columns._loadInProgress = false;

        this.columns.filter = function(param) {
            calendar._columnFilter.params = param;

            if (calendar._initialized) {
                calendar._update();
            }

        };

        this.columns.find = function(date, id) {
            var isResources = calendar.viewType === "Resources";
            date = new DayPilot.Date(date);
            var col = calendar._columnsBottom.find(function(col) {
                var resMatches = !isResources || col.id === id;
                var colEnd = col.start.addDays(1);
                if (resMatches && col.start <= date && date < colEnd) {
                    return true;
                }
                return false;
            });
            if (!col) {
                return null;
            }
            return calendar._createColumn(col, calendar);
        };

        this.columns.load = function(url, success, error) {

            if (!url) {
                throw new DayPilot.Exception("columns.load(): 'url' parameter required");
            }

            var onError = function(args) {
                var largs = {};
                largs.exception = args.exception;
                largs.request = args.request;

                if (typeof error === 'function') {
                    error(largs);
                }
            };

            var onSuccess = function(args) {
                var r = args.request;
                var data;

                // it's supposed to be JSON
                try {
                    data = JSON.parse(r.responseText);
                }
                catch (e) {
                    var fargs = {};
                    fargs.exception = e;
                    onError(fargs);
                    return;
                }

                if (DayPilot.isArray(data)) {
                    var sargs = {};
                    sargs.preventDefault = function() {
                        this.preventDefault.value = true;
                    };
                    sargs.data = data;
                    if (typeof success === "function") {
                        success(sargs);
                    }

                    if (sargs.preventDefault.value) {
                        return;
                    }

                    calendar.columns.list = data;
                    if (calendar._initialized) {
                        calendar.update();
                    }
                }
            };

            var usePost = calendar.columnsLoadMethod && calendar.columnsLoadMethod.toUpperCase() === "POST";

            if (usePost) {
                DayPilot.ajax({
                    "method": "POST",
                    "url": url,
                    "success": onSuccess,
                    "error": onError
                });
            }
            else {
                DayPilot.ajax({
                    "method": "GET",
                    "url": url,
                    "success": onSuccess,
                    "error": onError
                });
            }
        };


        this._prepareColumns = function() {
            var generateColumns = calendar._generateColumns();

            if (generateColumns) {
                var generated = this._createDaysViewColumns();
                this._columnsBottom = this._loadColumnCollection(generated);
            }
            else {
                this._columns = this._loadColumnCollection(this._columnsList() || []);
                this._columnsBottom = this._getColumns(this.headerLevels, true);
            }
        };

        this._getVisibleRange = function() {
            var start = this.startDate.getDatePart();
            var days = this.days;

            switch (this.viewType) {
                case "Day":
                    days = 1;
                    break;
                case "Week":
                    days = 7;
                    // TODO let weekStarts property override it?
                    start = start.firstDayOfWeek(resolved.weekStarts());
                    break;
                case "WorkWeek":
                    days = 5;
                    start = start.firstDayOfWeek(resolved.weekStarts());
                    while (start.dayOfWeek() !== 1) { // look for the next Monday
                        start = start.addDays(1);
                    }
                    break;
                /*case "Resources":
                    start = calendar.visibleStart().getDatePart();
                    end = calendar.visibleEnd().getDatePart();
                    days = DayPilot.DateUtil.daysDiff(start, end);
                    break;*/
            }

            var end = start.addDays(days);

            var result = {};
            result.start = start;
            result.end = end;
            result.days = days;

            return result;
        };


        this._createDaysViewColumns = function() {
            var columns = [];

            var visible = this._getVisibleRange();
            var start = visible.start;
            var days = visible.days;

            /*
            if (this.heightSpec === 'BusinessHoursNoScroll') {
                start = start.addHours(this.businessBeginsHour);
            }
            */

            for (var i = 0; i < days; i++) {

                var column = {};
                column.start = start.addDays(i);

                var pattern = resolved.locale().datePattern;
                if (calendar.headerDateFormat) {
                    pattern = calendar.headerDateFormat;
                }
                column.name = column.start.toString(pattern, resolved.locale());
                column.html = column.name;

                columns.push(column);
            }

            return columns;
        };

        //this._loadColChildren =

        this._columnFilter = {};

        this._loadColumn = function(column, parent) {
            var activated = {};
/*
            if (column.Start) {  // detect the old mode
                column.id = column.Value;
                column.start = column.Start;
                column.name = column.Name;

                column.html = column.InnerHTML;
                column.toolTip = column.ToolTip;
                column.backColor = column.BackColor;

                column.areas = column.Areas;
                column.children = column.Children;

                delete column.Value;
                delete column.Start;
                delete column.Name;
                delete column.InnerHTML;
                delete column.ToolTip;
                delete column.BackColor;
                delete column.Areas;
                delete column.Children;
            }
*/

            activated.id = column.id;
            activated.start = new DayPilot.Date(column.start || calendar.startDate).getDatePart(); // use default value
            activated.name = column.name;

            activated.html = column.html || column.name;
            activated.toolTip = column.toolTip;
            activated.backColor = column.backColor;
            activated.areas = column.areas;

            activated.parent = parent;

            var isBottom = !column.children || column.children.length === 0;

            if (typeof calendar.onColumnFilter === "function" && calendar._columnFilter.params) {
                if (isBottom) {
                    var parent = activated.parent;
                    var args = {};
                    args.visible = true;
                    args.column = {
                        "id": column.id,
                        "name": column.name,
                        "start": column.start,
                        "data": column
                    };
                    args.filter = calendar._columnFilter.params;

                    calendar.onColumnFilter(args);

                    if (args.visible) {
                        parent && parent._makeVisibleOnFilter();
                    }
                    else {
                        activated.hidden = true;
                    }
                }
                else {
                    activated.hidden = true;
                }
            }

            activated._makeVisibleOnFilter = function() {
                activated.hidden = false;
                if (activated.parent) {
                    activated.parent._makeVisibleOnFilter();
                }
            };

            activated.getChildren = function(level, inherit) {
                var list = [];
                if (level <= 1) {
                    if (!this.hidden) {
                        list.push(this);
                    }
                    return list;
                }

                if (!this.children || this.children.length === 0) {
                    if (inherit) {
                        if (!this.hidden) {
                            list.push(this);
                        }
                    }
                    else {
                        list.push("empty");
                    }
                    return list;
                }

                for (var i = 0; i < this.children.length; i++) {
                    var child = this.children[i];
                    var subChildren = child.getChildren(level - 1, inherit);

                    for (var j = 0; j < subChildren.length; j++) {
                        list.push(subChildren[j]);
                    }
                }

                return list;

            };

            activated.getChildrenCount = function(level) {
                var count = 0;

                if (!this.children || this.children.length <= 0 || level <= 1) {
                    var visible = !this.hidden;
                    return visible ? 1 : 0;
                }

                for (var i = 0; i < this.children.length; i++) {
                    count += this.children[i].getChildrenCount(level - 1);
                }

                return count;

            };

            activated.putIntoBlock = function(ep) {

                for (var i = 0; i < this.blocks.length; i++) {
                    var block = this.blocks[i];
                    if (block.overlapsWith(ep.part.top, ep.part.height)) {
                        //block.putIntoLine(ep);
                        block.events.push(ep);
                        block.min = Math.min(block.min, ep.part.top);
                        block.max = Math.max(block.max, ep.part.top + ep.part.height);
                        return i;
                    }
                }

                // no suitable block found, create a new one
                var block = [];
                block.lines = [];
                block.events = [];

                block.overlapsWith = function(start, width) {
                    var end = start + width - 1;

                    if (!(end < this.min || start > this.max - 1)) {
                        return true;
                    }

                    return false;
                };
                block.putIntoLine = function(ep) {
                    var thisCol = this;

                    for (var i = 0; i < this.lines.length; i++) {
                        var line = this.lines[i];
                        if (line.isFree(ep.part.top, ep.part.height)) {
                            line.push(ep);
                            return i;
                        }
                    }

                    var line = [];
                    line.isFree = function(start, width) {
                        //var free = true;
                        var end = start + width - 1;
                        var max = this.length;

                        for (var i = 0; i < max; i++) {
                            var e = this[i];
                            if (!(end < e.part.top || start > e.part.top + e.part.height - 1)) {
                                return false;
                            }
                        }

                        return true;
                    };

                    line.push(ep);

                    this.lines.push(line);

                    return this.lines.length - 1;

                };

                //block.putIntoLine(ep);
                block.events.push(ep);
                block.min = ep.part.top;
                block.max = ep.part.top + ep.part.height;

                this.blocks.push(block);

                return this.blocks.length - 1;

            };

            activated.putIntoLine = function(ep) {
                var thisCol = this;

                for (var i = 0; i < this.lines.length; i++) {
                    var line = this.lines[i];
                    if (line.isFree(ep.part.top, ep.part.height)) {
                        line.push(ep);
                        return i;
                    }
                }

                var line = [];
                line.isFree = function(start, width) {
                    //var free = true;
                    var end = start + width - 1;
                    var max = this.length;

                    for (var i = 0; i < max; i++) {
                        var e = this[i];
                        if (!(end < e.part.top || start > e.part.top + e.part.height - 1)) {
                            return false;
                        }
                    }

                    return true;
                };

                line.push(ep);

                this.lines.push(line);

                return this.lines.length - 1;
            };

            activated.visibleStart = function() {
                return activated.start.addHours(calendar._visibleStart(true));
            };

            activated.visibleEnd = function() {
                var duration = calendar._duration(true);
                return activated.visibleStart().addTime(duration);
            };

            if (column.children) {
                activated.children = this._loadColumnCollection(column.children, activated);
            }

            return activated;
        };

        this._loadColumnCollection = function(cc, parent) {

            var activated = DayPilot.list();

            DayPilot.list(cc).each(function(item) {
                var col = calendar._loadColumn(item, parent);
                activated.push(col);
            });

            return activated;

        };

        this._getColumns = function(level, inherit) {
            var source = this._generateColumns() ? this._columnsBottom : this._columns;
            var list = DayPilot.list();

            for (var i = 0; i < source.length; i++) {
                var children = source[i].getChildren(level, inherit);
                for (var j = 0; j < children.length; j++) {
                    list.push(children[j]);
                }
                //list.concat(children);
            }
            return list;

        };

        this._drawEventsAllDay = function() {
            if (!this.showAllDayEvents) {
                return;
            }

            var header = this.nav.header;

            if (!header) {
                return;
            }

            header.style.display = 'none';

            var columns = this._columnsBottom.length;

            for (var j = 0; j < this._allDay.lines.length; j++) {
                var line = this._allDay.lines[j];

                for (var i = 0; i < line.length; i++) {
                    //var data = this.eventsAllDay[i];
                    var data = line[i];
                    var cache = data.cache || data.data;

                    var div = document.createElement("div");
                    div.event = data;

                    div.setAttribute("unselectable", "on");
                    div.style.position = 'absolute';

                    if (calendar.rtl) {
                        div.style.right = (100.0 * data.part.colStart / columns) + "%";
                    }
                    else {
                        div.style.left = (100.0 * data.part.colStart / columns) + "%";
                    }
                    div.style.width = (100.0 * data.part.colWidth / columns) + "%";
                    div.style.height = resolved.allDayEventHeight() + 'px';
                    div.className = this._prefixCssClass("_alldayevent");
                    div.style.top = (this.headerLevels * resolved.headerHeight() + j * (resolved.allDayEventHeight())) + "px";

                    if (cache.cssClass) {
                        DayPilot.Util.addClass(div, cache.cssClass);
                    }

                    // prevention of global alignment changes
                    div.style.textAlign = 'left';
                    div.style.lineHeight = "1.2";

                    if (data.client.clickEnabled()) {
                        div.onclick = this._eventClickDispatch;
                    }
                    if (data.client.doubleClickEnabled()) {
                        div.ondblclick = this._eventDoubleClickDispatch;
                    }

                    if (data.client.clickEnabled() || data.client.doubleClickEnabled()) {
                        div.style.cursor = "pointer";
                    }
                    else {
                        div.style.cursor = "default";
                    }

                    //div.addEventListener("contextmenu", this._eventRightClickDispatch, false);
                    //div.oncontextmenu = this._eventRightClickDispatch;
                    DayPilot.re(div, "contextmenu", this._eventRightClickDispatch);

                    div.onmousemove = function(ev) {
                        var div = this;
                        if (!div.active) {
                            var areas = [];
                            if (data.client.deleteEnabled()) {
                                areas.push({"action":"JavaScript","v":"Hover","w":17,"h":17,"top":3,"right":3, "css": calendar._prefixCssClass("_event_delete"),"js":function(e) { calendar._eventDeleteDispatch(e); } });
                            }

                            var list = cache.areas;
                            if (list && list.length > 0) {
                                areas = areas.concat(list);
                            }
                            DayPilot.Areas.showAreas(div, div.event, null, areas);

                            DayPilot.Util.addClass(div, calendar._prefixCssClass("_alldayevent_hover"));
                            //DayPilot.Areas.showAreas(div, this.event);
                        }

                        if (typeof (DayPilot.Bubble) !== 'undefined' && calendar.bubble && calendar.eventHoverHandling !== 'Disabled') {
                            calendar.bubble.showEvent(this.event);
                        }
                    };
                    div.onmouseout = function(ev) {
                        var div = this;
                        DayPilot.Util.removeClass(div, calendar._prefixCssClass("_alldayevent_hover"));
                        DayPilot.Areas.hideAreas(this, ev);
                        if (calendar.bubble) {
                            calendar.bubble.hideOnMouseOut();
                        }
                    };


                    if (this.showToolTip && !this.bubble) {
                        div.setAttribute("title", data.client.toolTip());
                    }

                    var startsHere = data.start().getTime() === data.part.start.getTime();
                    var endsHere = data.end().getTime() === data.part.end.getTime();

                    var back = cache.backColor;

                    var inner = document.createElement("div");
                    inner.setAttribute("unselectable", "on");
                    inner.className = this._prefixCssClass("_alldayevent_inner");

                    if (back) {
                        inner.style.background = back;
                    }

                    if (cache.fontColor) {
                        inner.style.color = cache.fontColor;
                    }

                    if (cache.borderColor === "darker" && cache.backColor) {
                        inner.style.borderColor = DayPilot.ColorUtil.darker(cache.backColor, 2);
                    }
                    else {
                        inner.style.borderColor = cache.borderColor;
                    }


                    if (calendar.rtl) {
                        if (!startsHere) {
                            DayPilot.Util.addClass(div, this._prefixCssClass("_alldayevent_continueright"));
                        }
                        if (!endsHere) {
                            DayPilot.Util.addClass(div, this._prefixCssClass("_alldayevent_continueleft"));
                        }
                    }
                    else {
                        if (!startsHere) {
                            DayPilot.Util.addClass(div, this._prefixCssClass("_alldayevent_continueleft"));
                        }
                        if (!endsHere) {
                            DayPilot.Util.addClass(div, this._prefixCssClass("_alldayevent_continueright"));
                        }
                    }

                    // moved to domAdd() below
/*                    if (data.client.innerHTML()) {
                        inner.innerHTML = data.client.innerHTML();
                    }
                    else {
                        inner.innerHTML = data.text();
                    }*/

                    div.appendChild(inner);

                    if (calendar._api2()) {
                        if (typeof calendar.onAfterEventRender === 'function') {
                            var args = {};
                            args.e = div.event;
                            args.div = div;

                            calendar.onAfterEventRender(args);
                        }
                    }
                    else {
                        if (calendar.afterEventRender) {
                            calendar.afterEventRender(div.event, div);
                        }
                    }


                    (function domAdd() {

                        var args = {};
                        args.control = calendar;
                        args.e = data;
                        args.element = null;

                        div.domArgs = args;

                        if (typeof calendar.onBeforeEventDomAdd === "function") {
                            calendar.onBeforeEventDomAdd(args);
                        }

                        if (args.element) {
                            var target = inner;
                            if (target) {
                                args._targetElement = target;

                                var isReactComponent = DayPilot.Util.isReactComponent(args.element);
                                if (isReactComponent) {
                                    if (!calendar._react.reactDOM) {
                                        throw new DayPilot.Exception("Can't reach ReactDOM");
                                    }
                                    calendar._react.reactDOM.render(args.element, target);
                                }
                                else {
                                    target.appendChild(args.element);
                                }
                            }
                        }
                        else {
                            inner.innerHTML = data.client.innerHTML();
                        }
                    })();


                    this.nav.allday.appendChild(div);

                    //new DayPilot.Event(div, calendar);
                    this.elements.events.push(div);
                }
            }

            header.style.display = '';
        };

        this._deleteEvents = function(allDayOnly) {
            calendar.multiselect._divDeselectAll();

            //var start = new Date();
            if (this.elements.events) {
                //DayPilot.pu(maind);

                for (var i = 0; i < this.elements.events.length; i++) {
                    var div = this.elements.events[i];

                    var object = div.event;

                    if (object && allDayOnly && !object.allday()) {
                        continue;
                    }

                    calendar._deleteEvent(div);

/*
                    if (object) {
                        object.div = null;
                        object.root = null;
                    }

                    div.onclick = null;
                    div.onclickSave = null;
                    div.ondblclick = null;
                    div.oncontextmenu = null;
                    div.onmouseover = null;
                    div.onmouseout = null;
                    div.onmousemove = null;
                    div.onmousedown = null;

                    if (div.firstChild && div.firstChild.firstChild && div.firstChild.firstChild.tagName && div.firstChild.firstChild.tagName.toUpperCase() === 'IMG') {
                        var img = div.firstChild.firstChild;
                        img.onmousedown = null;
                        img.onmousemove = null;
                        img.onclick = null;

                    }

                    div.helper = null;
                    div.event = null;

                    DayPilot.de(div);
*/
                }
            }
            //this.events.innerHTML = '';

            this.elements.events = [];

        };

        this._deleteEvent = function(div) {

            var object = div.event;


            var domArgs = div.domArgs;
            div.domArgs = null;

            if (domArgs && typeof calendar.onBeforeEventDomRemove === "function") {
                calendar.onBeforeEventDomRemove(domArgs);
            }

            if (domArgs && typeof calendar.onBeforeEventDomAdd === "function" && calendar._react.reactDOM) {
                var target = domArgs && domArgs._targetElement;
                if (target) {
                    var isReact = DayPilot.Util.isReactComponent(domArgs.element);
                    if (isReact) {
                        if (!calendar._react.reactDOM) {
                            throw new DayPilot.Exception("Can't reach ReactDOM");
                        }
                        calendar._react.reactDOM.unmountComponentAtNode(target);
                    }
                }
            }

            if (object) {
                object.div = null;
                object.root = null;
            }

            div.onclick = null;
            div.onclickSave = null;
            div.ondblclick = null;
            div.oncontextmenu = null;
            div.onmouseover = null;
            div.onmouseout = null;
            div.onmousemove = null;
            div.onmousedown = null;

            if (div.firstChild && div.firstChild.firstChild && div.firstChild.firstChild.tagName && div.firstChild.firstChild.tagName.toUpperCase() === 'IMG') {
                var img = div.firstChild.firstChild;
                img.onmousedown = null;
                img.onmousemove = null;
                img.onclick = null;

            }

            div.helper = null;
            div.event = null;

            DayPilot.de(div);

        };

        this._drawEvent = function(data) {
            var main = this.nav.events;
            var cache = data.cache || data.data;

            // var borderColor = cache.borderColor || this.eventBorderColor;

            var div = document.createElement("div");
            //div.data = data;
            div.setAttribute("unselectable", "on");
            div.style.MozUserSelect = 'none';
            div.style.KhtmlUserSelect = 'none';
            div.style.WebkitUserSelect = 'none';
            div.style.position = 'absolute';
            div.className = this._prefixCssClass("_event");
            div.style.left = data.part.left + '%';
            div.style.top = (data.part.top - this._autoHiddenPixels()) + 'px';
            div.style.width = data.part.width + '%';
            div.style.height = Math.max(data.part.height, 2) + 'px';

            div.style.overflow = 'hidden';

            div.isFirst = data.part.start.getTime() === data.start().getTime();
            div.isLast = data.part.end.getTime() === data.end().getTime();

            if (data.client.clickEnabled()) {
                div.onclick = this._eventClickDispatch;
            }
            if (data.client.doubleClickEnabled()) {
                div.ondblclick = this._eventDoubleClickDispatch;
            }
            //div.addEventListener("contextmenu", this._eventRightClickDispatch, false);
            //div.oncontextmenu = this._eventRightClickDispatch;
            DayPilot.re(div, "contextmenu", this._eventRightClickDispatch);
            div.onmousemove = this._onEventMouseMove;
            div.onmouseout = this._onEventMouseOut;
            div.onmousedown = this._onEventMouseDown;

            //div.addEventListener(DayPilot.touch.start, this._touch.onEventTouchStart, false);
            //div.addEventListener(DayPilot.touch.move, this._touch.onEventTouchMove, false);
            //div.addEventListener(DayPilot.touch.end, this._touch.onEventTouchEnd, false);
            DayPilot.re(div, DayPilot.touch.start, this._touch.onEventTouchStart);
            DayPilot.re(div, DayPilot.touch.move, this._touch.onEventTouchMove);
            DayPilot.re(div, DayPilot.touch.end, this._touch.onEventTouchEnd);

            // inner divs
            // var inside = [];

            if (cache.cssClass) {
                DayPilot.Util.addClass(div, cache.cssClass);
            }

            if (this.showToolTip && !this.bubble) {
                div.setAttribute("title", data.client.toolTip());
            }

            var inner = document.createElement("div");
            inner.setAttribute("unselectable", "on");
            inner.className = calendar._prefixCssClass("_event_inner");

            // moved to domAdd() below
            // inner.innerHTML = data.client.innerHTML();

            if (cache.fontColor) {
                inner.style.color = cache.fontColor;
            }

            if (cache.backColor) {
                inner.style.background = cache.backColor;
            }
            if (cache.borderColor) {
                inner.style.borderColor = cache.borderColor;
            }
            if (cache.backgroundImage) {
                inner.style.backgroundImage = "url(" + cache.backgroundImage + ")";
                if (cache.backgroundRepeat) {
                    inner.style.backgroundRepeat = cache.backgroundRepeat;
                }
            }

            div.appendChild(inner);

            // TODO
            if (data.client.barVisible()) {
                var height = data.part.height - 2;
                //var barLeft = 100 * data.part.barLeft / (width); // %
                //var barWidth = Math.ceil(100 * data.part.barWidth / (width)); // %
                var barTop =  100 * data.part.barTop / height; // %
                var barHeight = Math.ceil(100 * data.part.barHeight / height); // %

                if (this.durationBarMode === "PercentComplete") {
                    barTop = 0;
                    barHeight = cache.complete;
                }

                var bar = document.createElement("div");
                bar.setAttribute("unselectable", "on");
                bar.className = this._prefixCssClass("_event_bar");
                bar.style.position = "absolute";

                if (cache.barBackColor) {
                    bar.style.backgroundColor = cache.barBackColor;
                }
                var barInner = document.createElement("div");
                barInner.setAttribute("unselectable", "on");
                barInner.className = this._prefixCssClass("_event_bar_inner");
                barInner.style.top = barTop + "%";
                //barInner.setAttribute("barWidth", data.part.barWidth);  // debug
                if (0 < barHeight && barHeight <= 1) {
                    barInner.style.height = "1px";
                }
                else {
                    barInner.style.height = barHeight + "%";
                }

                if (cache.barColor) {
                    barInner.style.backgroundColor = cache.barColor;
                }


                bar.appendChild(barInner);
                div.appendChild(bar);
            }


            if (cache.areas) {
                var areas = DayPilot.Areas.copy(cache.areas);

                var col = calendar._columnsBottom[data.part.dayIndex];

                areas.forEach(function(area) {
                    if (area.start) {
                        area.top = calendar._getPixels(new DayPilot.Date(area.start), col.start).top - data.part.top - calendar._autoHiddenPixels();
                    }
                    if (area.end) {
                        area.bottom = data.part.top + data.part.height - calendar._getPixels(new DayPilot.Date(area.end), col.start).top - calendar._autoHiddenPixels();
                    }
                });

                if (data.client.deleteEnabled()) {
                    areas.push({"action":"JavaScript","v":"Hover","w":17,"h":17,"top":2,"right":2, "css": calendar._prefixCssClass("_event_delete"),"js":function(e) { calendar._eventDeleteDispatch(e); } });
                }

                DayPilot.Areas.attach(div, data, {"areas": areas});
            }

            (function domAdd() {

                var args = {};
                args.control = calendar;
                args.e = data;
                args.element = null;

                div.domArgs = args;

                if (typeof calendar.onBeforeEventDomAdd === "function") {
                    calendar.onBeforeEventDomAdd(args);
                }

                if (args.element) {
                    var target = inner;
                    if (target) {
                        args._targetElement = target;

                        var isReactComponent = DayPilot.Util.isReactComponent(args.element);
                        if (isReactComponent) {
                            if (!calendar._react.reactDOM) {
                                throw new DayPilot.Exception("Can't reach ReactDOM");
                            }
                            calendar._react.reactDOM.render(args.element, target);
                        }
                        else {
                            target.appendChild(args.element);
                        }
                    }
                }
                else {
                    inner.innerHTML = data.client.innerHTML();
                }
            })();

            if (main.rows[0].cells[data.part.dayIndex]) { // temporary fix for multirow header, but won't hurt later
                var wrapper = main.rows[0].cells[data.part.dayIndex].events;
                wrapper.appendChild(div);

                calendar._makeChildrenUnselectable(div);
                //var e = new DayPilot.Event(data, calendar);
                div.event = data;

                if (calendar.multiselect._shouldBeSelected(data)) {
                    calendar.multiselect.add(div.event, true);
                }

                if (calendar._api2()) {
                    if (typeof calendar.onAfterEventRender === 'function') {
                        var args = {};
                        args.e = div.event;
                        args.div = div;

                        calendar.onAfterEventRender(args);
                    }
                }
                else {
                    if (calendar.afterEventRender) {
                        calendar.afterEventRender(div.event, div);
                    }
                }
/*
                if (calendar.afterEventRender) {
                    calendar.afterEventRender(data, div);
                }*/
            }

            calendar.elements.events.push(div);
        };

        this._makeChildrenUnselectable = function(el) {
            var c = (el && el.childNodes) ? el.childNodes.length : 0;
            for (var i = 0; i < c; i++) {
                try {
                    var child = el.childNodes[i];
                    if (child.nodeType === 1) {
                        child.setAttribute("unselectable", "on");
                        this._makeChildrenUnselectable(child);
                    }
                }
                catch (e) {
                    //alert(e + " " + child.type);
                }
            }
        };

        this._drawEvents = function() {
            //this.multiselect._list = [];

            var start = new Date();

            for (var i = 0; i < this._columnsBottom.length; i++) {
                var col = this._columnsBottom[i];

                if (!col.blocks) {
                    continue;
                }

                for (var m = 0; m < col.blocks.length; m++) {
                    var block = col.blocks[m];
                    for (var j = 0; j < block.lines.length; j++) {
                        var line = block.lines[j];

                        for (var k = 0; k < line.length; k++) {
                            var e = line[k];

                            e.part.width = 100 / block.lines.length;
                            e.part.left = e.part.width * j;

                            if (this.eventArrangement === 'Cascade') {
                                var isLastBlock = (j === block.lines.length - 1);
                                if (!isLastBlock) {
                                    e.part.width = e.part.width * 1.5;
                                }
                            }
                            if (this.eventArrangement === 'Full') {
                                e.part.left = e.part.left / 2;
                                e.part.width = 100 - e.part.left;
                            }

                            if (!e.allday()) {
                                this._drawEvent(e);
                            }
                        }
                    }
                }
            }

            this.multiselect.redraw();

            var end = new Date();
            var diff = end.getTime() - start.getTime();
        };

        this._drawEventsFromLines = function() {
            //return;
            this.multiselect._list = [];

            for (var i = 0; i < this._columnsBottom.length; i++) {
                var col = this._columnsBottom[i];

                for (var j = 0; j < col.lines.length; j++) {
                    var line = col.lines[j];

                    for (var k = 0; k < line.length; k++) {
                        var e = line[k];

                        e.part.width = 100 / col.lines.length;
                        e.part.left = e.Width * j;

                        if (!e.allday()) {
                            this._drawEvent(e);
                        }
                    }
                }
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

        this._versionCheck = function() {

            // check licensing restrictions

            switch (calendar._productCode) {
                case "aspnet":
                    if (!this._isAspnetWebForms()) {
                        throw new DayPilot.Exception("ASP.NET WebForms environment required. https://doc.daypilot.org/common/asp-net-webforms-required/");
                    }
                    break;
                case "netmvc":
                    if (!this.backendUrl) {
                        throw new DayPilot.Exception("DayPilot.Scheduler.backendUrl required. https://doc.daypilot.org/common/backendurl-required-asp-net-mvc/");
                    }
                    break;
                case "javaxx":
                    if (!this.backendUrl) {
                        throw new DayPilot.Exception("DayPilot.Scheduler.backendUrl required. https://doc.daypilot.org/common/backendurl-required-java/");
                    }
                    break;
            }
        };

        this._show = function() {
            if (this.nav.top.style.visibility === 'hidden') {
                this.nav.top.style.visibility = 'visible';
            }
        };

        this._totalHeight = function() {
            var height = this._totalHeaderHeight() + this._getScrollableHeight();

            calendar.debug.message("Getting totalHeight, headerHeight: " + this._totalHeaderHeight() + " scrollable: " + this._getScrollableHeight());

            if (height < 0) {
                return 0;
            }
            return height;
        };

        this._drawTop = function() {

            //this.nav.top = document.getElementById(this.id);
            this.nav.top.dp = this;
            this.nav.top.innerHTML = '';

            this.nav.top.style.MozUserSelect = 'none';
            this.nav.top.style.KhtmlUserSelect = 'none';
            this.nav.top.style.WebkitUserSelect = 'none';

            this.nav.top.style.WebkitTapHighlightColor = "rgba(0,0,0,0)";
            this.nav.top.style.WebkitTouchCallout = "none";

            this.nav.top.style.position = 'relative';
            if (this.width) {
                this.nav.top.style.width = this.width;
            }
            if (this.rtl) {
                this.nav.top.style.direction = "rtl";
            }
            //this.nav.top.style.width = this.width ? this.width : '100%';
            if (this.heightSpec === "Parent100Pct") {
                this.nav.top.style.height = "100%";
            }
            else {
                this.nav.top.style.height = this._totalHeight() + "px";
            }

            if (this.hideUntilInit) {
                this.nav.top.style.visibility = 'hidden';
            }

            if (!this.visible) {
                this.nav.top.style.display = "none";
            }

            this.nav.scroll = document.createElement("div");
            this.nav.scroll.style.height = this._getScrollableHeight() + "px";

            DayPilot.Util.addClass(this.nav.top, this._prefixCssClass("_main"));

            if (calendar.rtl) {
                DayPilot.Util.addClass(this.nav.top, this._prefixCssClass("_direction_rtl"));
            }

            this.nav.scroll.style.position = "relative";

            // this muse be called after setting overflow on this.nav.scroll because it's used to detect the scrollbar
            if (this.showHeader) {
                var header = this._drawTopHeaderDiv();
                this.nav.top.appendChild(header);
            }

            // fixing the column alignment bug
            // solved thanks to http://stackoverflow.com/questions/139000/div-with-overflowauto-and-a-100-wide-table-problem
            this.nav.scroll.style.zoom = 1;
            this.nav.scroll.style.position = "absolute";
            this.nav.scroll.style.left = "0px";
            this.nav.scroll.style.right = "0px";
            this.nav.scroll.style.top = this._totalHeaderHeight() + "px";
            this.nav.scroll.className = calendar._prefixCssClass("_scroll");

            var wrap = this._drawScrollable();
            this.nav.scrollable = wrap.firstChild;
            this.nav.scroll.appendChild(wrap);
            this.nav.top.appendChild(this.nav.scroll);

            this.nav.vsph = document.createElement("div");
            this.nav.vsph.style.display = "none";

            this.nav.top.appendChild(this.nav.vsph);

            this.nav.scrollpos = document.createElement("input");
            this.nav.scrollpos.type = "hidden";
            this.nav.scrollpos.id = calendar.id + "_scrollpos";
            this.nav.scrollpos.name = this.nav.scrollpos.id;
            this.nav.top.appendChild(this.nav.scrollpos);

            this.nav.select = document.createElement("input");
            this.nav.select.type = "hidden";
            this.nav.select.id = calendar.id + "_select";
            this.nav.select.name = this.nav.select.id;
            this.nav.select.value = null;  // used to be selectedEventValue on the server side
            this.nav.top.appendChild(this.nav.select);

            this.nav.scrollLayer = document.createElement("div");
            this.nav.scrollLayer.style.position = 'absolute';
            this.nav.scrollLayer.style.top = '0px';
            this.nav.scrollLayer.style.left = '0px';
            this.nav.top.appendChild(this.nav.scrollLayer);

            this.nav.scrollUp = [];
            this.nav.scrollDown = [];

            this.nav.loading = document.createElement("div");
            this.nav.loading.style.position = 'absolute';
            this.nav.loading.style.top = '0px';
            this.nav.loading.style.left = (this.hourWidth + 5) + "px";
            this.nav.loading.className = calendar._prefixCssClass("_loading");
            this.nav.loading.innerHTML = this.loadingLabelText;
            this.nav.loading.style.display = 'none';

            this.nav.top.appendChild(this.nav.loading);

        };

        this._updateRowWidths = function() {
            var scrolling = this.columnWidthSpec === 'Fixed';

            var headerRow = this.nav.header && this.nav.header.rows[this.nav.header.rows.length - 1]; // last
            var eventsRow = this.nav.events.rows[0];

            for (var i = 0; i < calendar._columnsBottom.length; i++) {
                var headerCell = headerRow && headerRow.cells[i];
                var eventsCell = eventsRow.cells[i];
                var headerDiv = headerCell && headerCell.firstChild;
                var data = calendar._columnsBottom[i];

                if (scrolling) {
                    var width = data.width ? data.width : calendar.columnWidth;
                    headerDiv && (headerDiv.style.width = width + "px");
                    if (eventsCell) {
                        eventsCell.style.width = width + "px";
                    }
                }
                else {
                    if (!calendar._divBasedGrid) {
                        headerDiv && (headerDiv.style.width = null);
                        if (eventsCell) {
                            eventsCell.style.width = null;
                        }
                    }
                }
            }
        };

        this._scrollElement = function() {
            return this._unifiedScrollable ? calendar.nav.bottomRight : calendar.nav.scroll;
        };

        this._updateColumnWidthSpec = function() {
            var scrolling = this.columnWidthSpec === 'Fixed';

            if (!scrolling) {
                var element = calendar._scrollElement();
                if (this.heightSpec === "Fixed") {
                    element.style.overflowY = "scroll";
                }
                else if (this.heightSpec === 'BusinessHours' && this._durationHours() <= this.businessEndsHour - this.businessBeginsHour) {
                    element.style.overflow = "hidden";
                }
                else if (this.heightSpec !== "Full" && this.heightSpec !== "BusinessHoursNoScroll") {
                    element.style.overflow = "auto";
                }
                else {
                    element.style.overflow = "hidden";
                }
            }

            if (scrolling) {
                var scrollbarSpace = 0;
                var w = this._columnsBottom.length * this.columnWidth;
                var scrollDiv = calendar._scrollDiv();

                if (w > scrollDiv.clientWidth) {
                    scrollbarSpace = DayPilot.sw(calendar.nav.bottomRight);
                }

                calendar.nav.headerParent && (calendar.nav.headerParent.style.width = (w + scrollbarSpace) + "px");
                calendar.nav.main.style.width = w + "px";
                calendar.nav.events.style.width = w + "px";
                calendar.nav.crosshair.style.width = w + "px";
            }
            else {
                calendar.nav.headerParent && (calendar.nav.headerParent.style.width = "100%");
                calendar.nav.main.style.width = "100%";
                calendar.nav.events.style.width = "100%";
                calendar.nav.crosshair.style.width = "100%";
            }

            this._updateRowWidths();

        };

        // used during full update
        this._drawHourTable = function() {
            // clear old hour table
            if (!this._fasterDispose) {
                DayPilot.pu(this.nav.hourTable);
            }
            else {
                this._disposeHourTable();
            }

            if (this.nav.hoursPlaceholder) {
                this.nav.hoursPlaceholder.innerHTML = '';
                this.nav.hourTable = this._createHourTable();
                this.nav.hoursPlaceholder.appendChild(this.nav.hourTable);
            }
        };

        this._disposeHourTable = function() {
            if (!this.nav.hourTable) {
                return;
            }


            calendar.elements.timeHeaders.forEach(function(div) {
                var domArgs = div.domArgs;
                div.domArgs = null;

                if (typeof calendar.onBeforeTimeHeaderDomRemove === "function") {
                    calendar.onBeforeTimeHeaderDomRemove(domArgs);
                }

                if (typeof calendar.onBeforeTimeHeaderDomAdd === "function" && calendar._react.reactDOM) {
                    var target = domArgs && domArgs._targetElement;
                    if (target) {
                        var isReact = DayPilot.Util.isReactComponent(domArgs.element);
                        if (isReact) {
                            if (!calendar._react.reactDOM) {
                                throw new DayPilot.Exception("Can't reach ReactDOM");
                            }
                            calendar._react.reactDOM.unmountComponentAtNode(target);
                        }
                    }
                }
            });

            for (var i = 0; i < this.nav.hourTable.rows.length; i++) {
                var row = this.nav.hourTable.rows[i];
                var div = row.cells[0].firstChild;
                div.data = null;
                div.onmousemove = null;
                div.onmouseout = null;
            }

            calendar.elements.timeHeaders = [];
        };

        // used during initial load only
        this._drawScrollable = function() {
            var zoom = document.createElement("div");
            zoom.style.zoom = 1;
            zoom.style.position = 'relative';
            zoom.onmousemove = this._onMainMouseMove;
            zoom.oncontextmenu = this._onMainRightClick;

            DayPilot.re(zoom, DayPilot.touch.start, this._touch.onMainTouchStart);
            DayPilot.re(zoom, DayPilot.touch.move, this._touch.onMainTouchMove);
            DayPilot.re(zoom, DayPilot.touch.end, this._touch.onMainTouchEnd);
            DayPilot.re(zoom, "contextmenu", function(ev) {
                var ev = ev || window.event;
                ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
            });

            if (navigator.msPointerEnabled) {
                zoom.style.msTouchAction = "none";
                zoom.style.touchAction = "none";
            }

            // required for detection of calendar under touch position
            zoom.daypilotMainD = true;
            zoom.calendar = this;

            var bottomLeft = null;
            var hoursPlaceholder = null;

            if (this.showHours) {
                var left = document.createElement("div");
                left.style.cssFloat = "left";
                if (calendar.rtl) {
                    left.style.cssFloat = "right";
                }
                left.style.width = (this.hourWidth) + "px";
                left.style.height = this._getScrollableHeight() + "px";
                left.style.overflow = "hidden";
                left.style.position = "relative";
                zoom.appendChild(left);
                bottomLeft = left;

                var scrollbarSpace = 30;
                //var height = (this._duration() * this.cellHeight) / (60000 * this.cellDuration) + scrollbarSpace;
                var height = calendar._getInnerHeight() + scrollbarSpace;

                hoursPlaceholder = document.createElement("div");
                hoursPlaceholder.style.height = (height) + "px";

                left.appendChild(hoursPlaceholder);
            }

            var bottomRight = document.createElement("div");
            bottomRight.style.height = this._getScrollableHeight() + "px";
            if (this.showHours) {
                if (calendar.rtl) {
                    bottomRight.style.marginRight = (this.hourWidth) + "px";
                }
                else {
                    bottomRight.style.marginLeft = (this.hourWidth) + "px";
                }
            }
            bottomRight.style.position = "relative";
            bottomRight.style.overflow = "auto";
            zoom.appendChild(bottomRight);

            if (hoursPlaceholder) {
                this.nav.hourTable = this._createHourTable();
                hoursPlaceholder.appendChild(this.nav.hourTable);
            }

            var parent = document.createElement("div");
            parent.style.height = "0px";
            parent.style.position = "relative";

            parent.appendChild(this._createCellsTable());

            var crosshair = document.createElement("div");
            crosshair.style.position = "absolute";
            crosshair.style.top = "0px";
            crosshair.style.left = "0px";
            crosshair.style.width = "100%";
            crosshair.style.height = "0px";
            parent.appendChild(crosshair);
            this.nav.crosshair = crosshair;

            parent.appendChild(this._createEventsTable());

            bottomRight.appendChild(parent);

            this.nav.grid = parent;

            this.nav.zoom = zoom;
            this.nav.bottomLeft = bottomLeft;
            this.nav.bottomRight = bottomRight;
            this.nav.hoursPlaceholder = hoursPlaceholder;
            return zoom;
        };

        this._createCellsTable = function() {
            if (calendar._divBasedGrid) {
                var main = document.createElement("div");
                calendar.nav.main = main;
                return main;
            }
            else {
                var table = document.createElement("table");

                table.cellPadding = "0";
                table.cellSpacing = "0";
                table.border = "0";
                var scrolling = this.columnWidthSpec === 'Fixed';

                if (!scrolling) {
                    table.style.width = "100%";
                }
                table.style.border = "0px none";
                table.style.margin = "0px";
                table.style.tableLayout = 'fixed';

                this.nav.main = table;
                // this.nav.events = table;

                return table;

            }

        };

        this._getTotalScrollableWidth = function() {
            var fixed = this.columnWidthSpec === 'Fixed';
            if (!fixed) {
                return "100%";
            }
            else {
                var total = 0;
                for (var i = 0; i < calendar._columnsBottom.length; i++) {
                    var column = calendar._columnsBottom[i];
                    if (column.width) {
                        total += column.width;
                    }
                    else {
                        total += calendar.columnWidth;
                    }
                }
                return total + "px";
            }
        };

        this._createEventsTable = function() {
            if (calendar._divBasedGrid) {
                var navEvents = document.createElement("div");
                navEvents.style.userSelect = "none";
                navEvents.style.position = "absolute";
                navEvents.style.left = "0px";
                navEvents.style.right = "0px";
                navEvents.style.top = "0px";
                navEvents.style.height = "0px";

                calendar.nav.events = navEvents;
                return navEvents;
            }
            else {
                var table = document.createElement("table");

                table.style.position = "absolute";
                table.style.top = "0px";
                table.cellPadding = "0";
                table.cellSpacing = "0";
                table.border = "0";
                table.style.width = calendar._getTotalScrollableWidth();
                table.style.border = "0px none";
                table.style.margin = "0px";
                table.style.tableLayout = 'fixed';

                this.nav.events = table;
                var create = true;
                var columns = this._columnsBottom;
                var cl = columns.length;

                var r = (create) ? table.insertRow(-1) : table.rows[0];

                for (var j = 0; j < cl; j++) {
                    var c = (create) ? r.insertCell(-1) : r.cells[j];

                    if (create) {

                        c.style.padding = '0px';
                        c.style.border = '0px none';
                        c.style.height = '0px';
                        c.style.overflow = 'visible';
                        if (!calendar.rtl) {
                            c.style.textAlign = 'left';
                        }

                        /*
                        if (calendar.columnWidthSpec === "Fixed") {
                            if (columns[j].width) {
                               c.style.width = columns[j].width + "px";
                            }
                            else {
                                c.style.width = calendar.columnWidth + "px";
                            }
                        }
                        */

                        calendar._initializeEventCell(c);
                    }
                }

                return table;
            }
        };

        this._createHourTable = function() {
            var table = document.createElement("table");
            table.cellSpacing = "0";
            table.cellPadding = "0";
            table.border = "0";
            table.style.margin = "0px";
            table.style.border = '0px none';
            table.style.width = this.hourWidth + "px";
            table.oncontextmenu = function() { return false; };
            table.onmousemove = function() { calendar._crosshairHide(); };

            var hours = calendar._hourRowCount();
            for (var i = 0; i < hours; i++) {
                this._createHourRow(table, i);
            }

            return table;

        };

        this._hourRowCount = function() {
            return this._duration() / (this.timeHeaderCellDuration * 60 * 1000);  // duration in ticks
        };

        this._hourRowHeight = function() {
            return (this.cellHeight * 60 / this.cellDuration) / (60 / this.timeHeaderCellDuration);
        };

        this._autoHiddenRows = function() {
            return (this._visibleStart() - this._visibleStart(true)) * (60 / this.cellDuration);
        };

        this._autoHiddenHours = function() {
            return (this._visibleStart() - this._visibleStart(true));
        };

        this._autoHiddenPixels = function() {
            return this._autoHiddenRows() * this.cellHeight;
        };

        this._createHourRow = function(table, i) {
            var height = calendar._hourRowHeight();

            var r = table.insertRow(-1);
            r.style.height = height + "px";

            var c = r.insertCell(-1);
            c.valign = "bottom";
            c.setAttribute("unselectable", "on");
            c.style.padding = '0px';
            c.style.border = '0px none';

            var div = document.createElement("div");
            div.className = this._prefixCssClass("_rowheader");
            div.style.position = "relative";
            div.style.width = this.hourWidth + "px";
            div.style.height = (height) + "px";
            div.style.overflow = 'hidden';
            div.setAttribute("unselectable", "on");

            var inner = document.createElement("div");
            inner.className = this._prefixCssClass("_rowheader_inner");
            inner.setAttribute("unselectable", "on");

            var props = calendar._hourRowProps(i);

            var html = props.html;
            var data = props.data;


            if (data) {
                div.data = data;
                div.onmousemove = calendar._onTimeHeaderMouseMove;
                div.onmouseout = calendar._onTimeHeaderMouseOut;
            }

            var argsElement = null;

            var args = {};
            args.header = data;

            // onBeforeTimeHeaderDomAdd
            if (typeof calendar.onBeforeTimeHeaderDomAdd === "function") {
                args.element = null;

                calendar.onBeforeTimeHeaderDomAdd(args);

                argsElement = args.element;
            }

            // or c?
            div.domArgs = args;
            if (argsElement) {
                var target = inner;
                // target.domArgs = args;
                args._targetElement = target;
                var isReactComponent = DayPilot.Util.isReactComponent(argsElement);
                if (isReactComponent) {
                    if (!calendar._react.reactDOM) {
                        throw new DayPilot.Exception("Can't reach ReactDOM");
                    }
                    calendar._react.reactDOM.render(argsElement, target);
                }
                else {
                    target.appendChild(argsElement);
                }
            }
            else {
                inner.innerHTML = html;
            }

            // inner.innerHTML = html;

            div.appendChild(inner);

            calendar.elements.timeHeaders.push(div);

            c.appendChild(div);
        };

        this._hourRowProps = function(i) {
            var html, data;

            if (this.hours) {
                var index = i + this._autoHiddenHours();
                data = this.hours[index];
                html = data.html;
            }

            var cellDuration = this.timeHeaderCellDuration;

            var start = this.startDate.addMinutes(cellDuration * i + 60*this._visibleStart());
            var hour = start.getHours();

            var am = hour < 12;
            var sup;
            if (this._resolved.timeFormat() === "Clock12Hours") {
                if (am) {
                    sup = "AM";
                }
                else {
                    sup = "PM";
                }
            }
            else {
                sup = "00";
            }

            if (!html) {
                var text = document.createElement("div");
                text.setAttribute("unselectable", "on");


                if (this._resolved.timeFormat() === "Clock12Hours") {
                    hour = hour % 12;
                    if (hour === 0) {
                        hour = 12;
                    }
                }

                if (this.timeHeaderCellDuration !== 60) {
                    hour += ":" + start.toString("mm");
                }

                text.innerHTML = hour;

                var span = document.createElement("span");
                span.setAttribute("unselectable", "on");
                span.className = this._prefixCssClass("_rowheader_minutes");


                span.innerHTML = sup;

                text.appendChild(span);

                html = text.outerHTML;

            }

            var args = {};
            args.header = {};
            args.header.hours = hour;
            args.header.minutes = start.getMinutes();
            args.header.start = start.toString("HH:mm");
            args.header.html = html;
            args.header.areas = data ? data.areas : null;
            args.header.time = new DayPilot.Duration(start.getTimePart());

            if (typeof calendar.onBeforeTimeHeaderRender === 'function') {
                calendar.onBeforeTimeHeaderRender(args);

                if (args.header.html !== null) {
                    html = args.header.html;
                }
            }

            data = args.header;

            var result = {};
            result.start = start;
            result.hour = hour;
            result.html = html;
            result.data = data;
            result.sup = sup;

            return result;
        };

        this._onTimeHeaderMouseMove = function(ev) {
            calendar._crosshairHide();

            var div = this;
            if (!div.active) {
                DayPilot.Areas.showAreas(div, div.data);
            }

        };

        this._onTimeHeaderMouseOut = function(ev) {
            DayPilot.Areas.hideAreas(this, ev);
        };

        this._getScrollableHeight = function() {
            switch (this.heightSpec) {
                case "Fixed":
                    return this.height;
                case "Parent100Pct":
                    return this.height;
                case "Full":
                    return this._getInnerHeight();
                case "BusinessHours":
                case "BusinessHoursNoScroll":
                    var dHours = this._businessHoursSpan();
                    return dHours * this.cellHeight * 60 / this.cellDuration;
                default:
                    throw "DayPilot.Calendar: Unexpected 'heightSpec' value.";

            }
        };

        this._getInnerHeight = function() {
            return (calendar._duration() * this.cellHeight) / (60000 * calendar.cellDuration);
        };

        this._totalHeaderHeight = function() {
            if (!this.showHeader) {
                return 0;
            }
            //var headerRowsHeight = this.headerLevels * resolved.headerHeight() + this.headerLevels - 1;
            var headerRowsHeight = this.headerLevels * resolved.headerHeight();
            if (this.showAllDayEvents && resolved.allDayHeaderHeight()) {
                return headerRowsHeight + resolved.allDayHeaderHeight();
            }
            else {
                return headerRowsHeight;
            }
        };

        this._autoHeaderHeight = function() {
            if (!this.headerHeightAutoFit) {
                return;
            }

            /*
            if (this.headerLevels > 1) {
                throw "Header height can't be adjusted for HeaderLevels > 1 (not implemented yet).";
                return;
            }
            */

            var max = 0;
            //for (var i = 0; i < this._columnsBottom.length; i++) {
            for (var x = 0; x < this.nav.header.rows.length; x++) {
                var row = this.nav.header.rows[x];
                for (var i = 0; i < row.cells.length; i++) {
                    var cell = row.cells[i];
                    var div = cell.firstChild;
                    var inner = div.firstChild;

                    var oldHeight = div.style.height;
                    div.style.height = "auto";

                    inner.style.position = "static";

                    var h = div.offsetHeight;

                    div.style.height = oldHeight;
                    inner.style.position = '';

                    max = Math.max(max, h);
                }
            }

            if (max > this.headerHeight) {
                this._cache.headerHeight = max;
                this._updateHeaderHeight();
                this._drawHeader();
            }

        };

        this._scrollbarVisible = function() {
            var element = this._unifiedScrollable ? calendar.nav.bottomRight : calendar.nav.scroll;

            return DayPilot.sw(element) > 0;

            /*
            if (this.heightSpec === 'Parent100Pct') {
                var inner = (this._duration() * this.cellHeight) / (60000 * this.cellDuration);
                return inner > this.height;
            }
            return this.nav.scroll.style.overflow !== 'hidden';
            */
        };

        this._drawTopHeaderDiv = function() {
            var header = document.createElement("div");
            //header.setAttribute("data-id", "header-div");
            var scrolling = this.columnWidthSpec === 'Fixed';
            if (!scrolling) {
                header.style.overflow = "auto";
            }

            header.style.position = "absolute";
            header.style.left = "0px";
            header.style.right = "0px";

            // to match main grid structure
            var zoom = document.createElement("div");
            zoom.style.position = "relative";
            zoom.style.zoom = "1";

            var relative = null;
            var scrolling = this.columnWidthSpec === 'Fixed';
            if (scrolling || this._unifiedScrollable) {
                var left = document.createElement("div");
                left.style.cssFloat = "left";
                if (calendar.rtl) {
                    left.style.cssFloat = "right";
                }
                left.style.width = (this.hourWidth) + "px";

                if (this.showHours) {
                    var corner = this._drawCorner();
                    this.nav.corner = corner;
                    left.appendChild(corner);
                    zoom.appendChild(left);

                    this.nav.upperLeft = left;
                }

                var right = document.createElement("div");
                if (this.showHours) {
                    if (calendar.rtl) {
                        right.style.marginRight = (this.hourWidth) + "px";
                    }
                    else {
                        right.style.marginLeft = (this.hourWidth) + "px";
                    }
                }
                right.style.position = "relative";
                right.style.overflow = "hidden";
                right.style.height = this._totalHeaderHeight() + "px";

                zoom.appendChild(right);
                this.nav.upperRight = right;

                relative = document.createElement("div");
                relative.style.position = "relative";
                /*
                moved to updateColumnWidthSpec
                if (scrolling) {
                    relative.style.width = (this._columnsBottom.length * this.columnWidth + scrollbarSpace) + "px";
                }
                else {
                    relative.style.width = "100%";
                }
                */

                right.appendChild(relative);

            }
            else {

                var table = document.createElement("table");
                table.cellPadding = "0";
                table.cellSpacing = "0";
                table.border = "0";
                table.style.margin = "0px";
                table.style.width = "100%";
                table.style.borderCollapse = 'separate';
                //table.style.position = "absolute";
                table.style.border = "0px none";

                var r = table.insertRow(-1);
                this.nav.fullHeader = table;


                if (this.showHours) {
                    // corner
                    var c = r.insertCell(-1);
                    c.style.padding = '0px';
                    c.style.border = '0px none';

                    var corner = this._drawCorner();
                    c.appendChild(corner);
                    this.nav.corner = corner;
                }

                // top header
                c = r.insertCell(-1);
                //var mid = c;

                c.style.width = "100%";
                c.valign = "top";
                c.style.position = 'relative';  // ref point
                c.style.padding = '0px';
                c.style.border = '0px none';

                relative = document.createElement("div");
                //relative.setAttribute("data-id", "nav.mid");
                relative.style.position = "relative";
                relative.style.height = this._totalHeaderHeight() + "px";
                relative.style.overflow = "hidden";
                c.appendChild(relative);
                this.nav.mid = relative;

                zoom.appendChild(table);

            }

            this.nav.headerParent = relative;
            this.nav.headerParent.onmousemove = function(ev) { ev.insideMainD = true; };  // FF
            this._createNavHeader();

            var scrollbar = this._scrollbarVisible();

            // above the vertical scrollbar
            //if (this.heightSpec !== "Full" && this.heightSpec !== "BusinessHoursNoScroll") {
            var scrolling = this.columnWidthSpec === 'Fixed';
            if (scrollbar && !scrolling) {
                this._createCornerRightTd();
            }

            header.appendChild(zoom);

            return header;

        };

        this._createNavHeader = function() {
            this.nav.unifiedCornerRight = null;

            if (calendar._divBasedGrid) {
                this.nav.header = document.createElement("div");
                this.nav.header.style.position = "relative";
            }
            else {
                this.nav.header = document.createElement("table");
                this.nav.header.style.margin = "0px";
                this.nav.header.cellPadding = "0";
                this.nav.header.cellSpacing = "0";
                //this.nav.header.border = "0";
                var scrolling = this.columnWidthSpec === 'Fixed';
                if (!scrolling) {
                    this.nav.header.width = "100%";
                }
                this.nav.header.style.tableLayout = "fixed";
                //this.nav.header.style.borderCollapse = 'separate';
                this.nav.header.oncontextmenu = function() { return false; };
            }

            this.nav.header.setAttribute("dp-id", "header");
            this.nav.headerParent.appendChild(this.nav.header);

            this.nav.header.onmousemove = function() {
                calendar._crosshairHide();
            };

            if (this.nav.allday) {
                DayPilot.de(this.nav.allday);
            }

            var allday = document.createElement("div");
            allday.style.position = 'absolute';
            allday.style.top = "0px";
            allday.style.height = "0px";
            allday.setAttribute("dp-id", "allday");

            var fixed = this.columnWidthSpec === 'Fixed';
            if (!fixed) {
                allday.style.left = "0px";
                allday.style.right = "0px";
                //allday.style.width = "100%";
            }
            else {
                allday.style.width = (this._columnsBottom.length * this.columnWidth) + "px";
            }


            this.nav.allday = allday;
            this.nav.headerParent.appendChild(allday);

        };

        this._createCornerRightTd = function() {
            if (!this.nav.fullHeader) {
                return;
            }

            var r = this.nav.fullHeader.rows[0];
            var c = r.insertCell(-1);

            c.style.padding = '0px';
            c.style.verticalAlign = 'top';
            c.setAttribute("unselectable", "on");
            //c.innerHTML = "&nbsp;";

            var inside = document.createElement("div");
            inside.setAttribute("unselectable", "on");
            inside.className = this._prefixCssClass('_cornerright');
            inside.style.overflow = "hidden";
            inside.style.position = "relative";
            inside.style.width = "16px";
            inside.style.height = this._totalHeaderHeight() + "px";

            var inner = document.createElement("div");
            inner.className = this._prefixCssClass('_cornerright_inner');
            inside.appendChild(inner);

            c.appendChild(inside);

            this.nav.cornerRight = inside;
        };

        this._drawCorner = function() {
            var wrap = document.createElement("div");
            wrap.style.position = 'relative';
            wrap.className = this._prefixCssClass("_corner");
            wrap.style.width = this.hourWidth + "px";
            wrap.style.height = this._totalHeaderHeight() + "px";
            wrap.style.overflow = "hidden";
            wrap.oncontextmenu = function() { return false; };

            var corner = document.createElement("div");
            corner.className = this._prefixCssClass("_corner_inner");
            corner.setAttribute("unselectable", "on");

            // don't draw content here
            // corner.innerHTML = args.html ? args.html : '';

            wrap.appendChild(corner);

            var inner2 = document.createElement("div");
            inner2.style.position = 'absolute';
            inner2.style.padding = '2px';
            inner2.style.top = '0px';
            inner2.style.left = '1px';
            inner2.style.backgroundColor = "#FF6600";
            inner2.style.color = "white";
            inner2.innerHTML = "\u0044\u0045\u004D\u004F";
            inner2.setAttribute("unselectable", "on");

            if (DayPilot.Util.isNullOrUndefined("K5woOes")) wrap.appendChild(inner2);

            return wrap;
        };

        this._disposeCorner = function() {
            if (!calendar.nav.corner) {
                return;
            }
            if (!calendar.nav.corner.firstChild) {
                return;
            }

            var target = calendar.nav.corner.firstChild;

            var domArgs = target.domArgs;
            target.domArgs = null;

            if (!domArgs) {
                return;
            }

            if (typeof calendar.onBeforeCornerDomRemove === "function") {
                calendar.onBeforeCornerDomRemove(domArgs);
            }

            if (typeof calendar.onBeforeCornerDomAdd === "function" && calendar._react.reactDOM) {
                // var target = calendar.divCorner;
                if (target) {
                    var isReact = DayPilot.Util.isReactComponent(domArgs.element);
                    if (isReact) {
                        if (!calendar._react.reactDOM) {
                            throw new DayPilot.Exception("Can't reach ReactDOM");
                        }
                        calendar._react.reactDOM.unmountComponentAtNode(target);
                    }
                }
            }

        };

        this._disposeMain = function() {
            var table = this.nav.main;
            table.root = null;
            table.onmouseup = null;

            for (var y = 0; y < table.rows.length; y++) {
                var r = table.rows[y];
                for (var x = 0; x < r.cells.length; x++) {
                    var c = r.cells[x];
                    c.root = null;

                    c.onmousedown = null;
                    c.onmousemove = null;
                    c.onmouseout = null;
                    c.onmouseup = null;
                    c.onclick = null;
                    c.ondblclick = null;
                    c.oncontextmenu = null;
                }
            }

            if (!this._fasterDispose) DayPilot.pu(table);
        };

        this._deleteScrollLabels = function() {
            for (var i = 0; this.nav.scrollUp && i < this.nav.scrollUp.length; i++) {
                this.nav.scrollLayer.removeChild(this.nav.scrollUp[i]);
            }

            for (var i = 0; this.nav.scrollDown && i < this.nav.scrollDown.length; i++) {
                this.nav.scrollLayer.removeChild(this.nav.scrollDown[i]);
            }

            this.nav.scrollUp = [];
            this.nav.scrollDown = [];

        };

        this._initializeEventCell = function(c) {

            var div = document.createElement("div");
            div.style.marginRight = calendar.columnMarginRight + "px";
            div.style.position = 'relative';
            div.style.height = '1px';
            div.style.marginTop = '-1px';
            c.events = div;

            var sep = document.createElement("div");
            sep.style.position = "relative";
            sep.style.height = "1px";
            sep.style.marginTop = "-1px";
            c.separators = sep;

            var selection = document.createElement("div");
            selection.style.position = 'relative';
            selection.style.height = '1px';
            selection.style.marginTop = '-1px';
            c.selection = selection;

            c.appendChild(sep);
            c.appendChild(selection);
            c.appendChild(div);
        };

        this._drawMain = function() {
            if (calendar._divBasedGrid) {
                calendar._drawMainDivBased();
            }
            else {
                calendar._drawMainTableBased();
            }
        };

        this._drawScrollLabels = function() {
            if (this.scrollLabelsVisible) {
                var columns = this._columnsBottom;
                var hoursWidth = (this.showHours ? this.hourWidth : 0);
                var colWidth = (this.nav.scroll.clientWidth - hoursWidth) / columns.length;
                for (var i = 0; i < columns.length; i++) {
                    var scrollUp = document.createElement("div");
                    scrollUp.style.position = 'absolute';
                    scrollUp.style.top = '0px';
                    scrollUp.style.left = (hoursWidth + 2 + i * colWidth + colWidth / 2) + "px";
                    scrollUp.style.display = 'none';


                    var img = document.createElement("div");
                    img.style.height = '10px';
                    img.style.width = '10px';
                    img.className = this._prefixCssClass("_scroll_up");
                    scrollUp.appendChild(img);

                    this.nav.scrollLayer.appendChild(scrollUp);
                    this.nav.scrollUp.push(scrollUp);

                    var scrollDown = document.createElement("div");
                    scrollDown.style.position = 'absolute';
                    scrollDown.style.top = '0px';
                    scrollDown.style.left = (hoursWidth + 2 + i * colWidth + colWidth / 2) + "px";
                    scrollDown.style.display = 'none';

                    var img = document.createElement("div");
                    img.style.height = '10px';
                    img.style.width = '10px';
                    img.className = this._prefixCssClass("_scroll_down");
                    scrollDown.appendChild(img);

                    this.nav.scrollLayer.appendChild(scrollDown);
                    this.nav.scrollDown.push(scrollDown);
                }
            }
        };


        this._drawEventParents = function() {
            var events = this.nav.events;

            // clear
            events.innerHTML = "";

            events.rows = [{"cells":[]}];

/*
            var columns = calendar._columnsBottom;
            var fixed = this.columnWidthSpec === 'Fixed';
            var start = 0;
*/

            calendar._getColumnDimensions().forEach(function(coldim, x) {
                var cell = document.createElement("div");
                cell.style.height = "1px";
                cell.style.overflow = "visible";
                cell.style.position = "absolute";
                cell.style.left = coldim.left + coldim.unit;
                cell.style.right = coldim.left + coldim.unit;  // rtl
                cell.style.width = coldim.width + coldim.unit;

                calendar._initializeEventCell(cell);
                events.appendChild(cell);

                events.rows[0].cells.push(cell);
            });

        };

        this._getColumnDimensions = function() {
            var columns = calendar._columnsBottom;
            var fixed = this.columnWidthSpec === 'Fixed';
            var start = 0;

            return DayPilot.list.for(columns.length, function(i) {
                var col = {};

                var width = 0;
                var unit = "";
                if (fixed) {
                    unit = "px";
                    width = columns[i].width ? columns[i].width : calendar.columnWidth;
                }
                else {
                    unit = "%";
                    width = floor2(100 / columns.length);
                }

                col.left = start;
                col.width = width;
                col.unit = unit;

                start += width;

                return col;
            });

            function floor2(num) {
                if (DayPilot.browser.ie || DayPilot.browser.edge) {
                    return Math.floor(num * 100) / 100;
                }
                else {
                    return num;
                }

            }
        };

        this._drawMainDivBased = function() {

            //this._updateColumnWidthSpec();

            var table = this.nav.main;
            var step = this.cellDuration * 60 * 1000;
            var rowCount = this._rowCount();
            var autoHiddenCells = this._autoHiddenHours() * (60/this.cellDuration);

            var columns = calendar._columnsBottom;

            (function cleanOld() {
                calendar.elements.cells = [];
                calendar.nav.main.innerHTML = "";
                calendar.nav.main.rows = [];
            })();


            // move away
            this.nav.scrollable.daypilotMainD = true;
            this.nav.scrollable.calendar = this;
            calendar._drawScrollLabels();

            var cl = columns.length;

            calendar._drawEventParents();

            var colDimensions = calendar._getColumnDimensions();

            for (var y = 0; y < rowCount; y++) {

                var top = y * calendar.cellHeight;
                calendar.nav.main.rows.push({
                    "cells": []
                });

                function drawCell(x, y) {
                    var coldim = colDimensions[x];

                    var col = calendar._columnsBottom[x];

                    var c = document.createElement("div");
                    c.style.position = "absolute";
                    c.style.left = coldim.left + coldim.unit;
                    c.style.right = coldim.left + coldim.unit;  // rtl
                    c.style.width = coldim.width + coldim.unit;
                    c.style.top = top + "px";

                    // backwards compatibility, remove
                    c.start = col.start.addTime(y * step).addHours(calendar._visibleStart());
                    c.end = c.start.addTime(step);
                    c.resource = col.id;

                    // data object
                    c.data = {};
                    c.data.x = x;
                    c.data.y = y;
                    c.data.start = c.start;
                    c.data.end = c.end;
                    c.data.resource = c.resource;
                    c.data.calendar = calendar;

                    if (!calendar.cellProperties) {
                        calendar.cellProperties = {};
                    }

                    var cell = {};
                    cell.resource = c.resource;
                    cell.start = c.start;
                    cell.end = c.end;

                    var index = x + "_" + y;

                    cell.cssClass = null;
                    cell.html = null;
                    cell.backImage = null;
                    cell.backRepeat = null;
                    cell.backColor = null;
                    cell.business = calendar._isBusinessCell(c.start, c.end);

                    if (calendar.cellProperties[index]) {
                        DayPilot.Util.copyProps(calendar.cellProperties[index], cell, ['cssClass', 'html', 'backImage', 'backRepeat', 'backColor', 'business', 'areas', 'disabled']);
                    }

                    if (typeof calendar.onBeforeCellRender === 'function') {
                        var args = {};
                        args.cell = cell;

                        calendar.onBeforeCellRender(args);
                    }

                    calendar.cellProperties[index] = cell;

                    var props = calendar._getProperties(x, y);

                    var content;
                    c.root = calendar;
                    c.setAttribute("unselectable", "on");

                    content = document.createElement("div");
                    content.className = calendar._prefixCssClass("_cell");
                    content.style.position = "relative";
                    content.style.height = (calendar.cellHeight) + "px";
                    //content.style.width = '100%';
                    content.style.overflow = 'hidden';
                    content.setAttribute("unselectable", "on");

                    var inner = document.createElement("div");
                    inner.className = calendar._prefixCssClass("_cell_inner");
                    content.appendChild(inner);

                    c.appendChild(content);

                    c.onmousedown = calendar._onCellMouseDown;
                    c.onmousemove = calendar._onCellMouseMove;
                    c.onmouseout = calendar._onCellMouseOut;

                    DayPilot.re(c, DayPilot.touch.end, calendar._touch.onCellTouchEnd);

                    c.oncontextmenu = function() {
                        if (!this.selected) {
                            //if (DayPilotCalendar.selectedCells) {
                            calendar.clearSelection();
                            //    DayPilotCalendar.selectedCells = [];
                            //}
                            DayPilotCalendar.column = DayPilotCalendar.getColumn(this);
                            calendar.selectedCells.push(this);
                            DayPilotCalendar.firstSelected = this;
                            DayPilotCalendar.topSelectedCell = this;
                            DayPilotCalendar.bottomSelectedCell = this;

                            calendar._activateSelection();
                        }

                        if (calendar.timeRangeRightClickHandling === "Disabled") {
                            return false;
                        }

                        return false;
                    };


                    var backColor = calendar._getColor(x, y); // = c.style.backgroundColor
                    content = c.firstChild;

                    var scrolling = calendar.columnWidthSpec === 'Fixed';
                    if (scrolling) {
                        if (col.width) {
                            content.style.width = col.width + "px";
                        }
                        else {
                            content.style.width = calendar.columnWidth + "px";
                        }
                    }

                    if (backColor) {
                        content.firstChild.style.background = backColor;
                    }

                    var business = props ? props.business : calendar._isBusinessCell(c.start, c.end);
                    if (business) {
                        DayPilot.Util.addClass(content, calendar._prefixCssClass("_cell_business"));
                    }

                    var html = content.firstChild;

                    // reset custom properties
                    if (html) {
                        html.innerHTML = ''; // reset
                    }
                    content.style.backgroundImage = "";
                    content.style.backgroundRepeat = "";

                    if (props) {
                        if (props.html) {
                            html.innerHTML = props.html;
                        }
                        if (props.cssClass) {
                            DayPilot.Util.addClass(content, props.cssClass);
                        }
                        if (props.backImage) {
                            content.style.backgroundImage = "url('" + props.backImage + "')";
                        }
                        if (props.backRepeat) {
                            content.style.backgroundRepeat = props.backRepeat;
                        }
                        if (props.areas) {
                            var areaObject = {};
                            areaObject.start = c.start;
                            areaObject.end = c.end;
                            areaObject.resource = c.resource;

                            var areas = DayPilot.list(props.areas).filter(function(a) {
                                if (a.end && new DayPilot.Date(a.end) <= c.start) {
                                    return false;
                                }
                                if (a.start && new DayPilot.Date(a.start) >= c.end) {
                                    return false;
                                }
                                return true;
                            });
                            areas.forEach(function(a) {
                                if (!a.start && !a.end) {
                                    return;
                                }
                                if (a.start) {
                                    var startTicks = new DayPilot.Date(a.start).getTime() - c.start.getTime();
                                    a.top = calendar._ticksToPixels(startTicks);
                                }

                                if (a.end) {
                                    var endTicks = new DayPilot.Date(a.end).getTime() - c.start.getTime();
                                    a.height = calendar._ticksToPixels(endTicks) - a.top;
                                }
                            });

                            DayPilot.Areas.attach(content, areaObject, {"areas": areas});
                        }
                    }

                    calendar.nav.main.appendChild(c);
                    calendar.nav.main.rows[y].cells.push(c);

                }

                if (DayPilot.browser.ie) {
                    // prevent missing vertical lines in IE 11 (overlaps)
                    for (var x = columns.length - 1; x >= 0; x--) {
                        drawCell(x, y);
                    }
                }
                else {
                    for (var x = 0; x < columns.length; x++) {
                        drawCell(x, y);
                    }

                }
            }

            /*table.onmouseup = this._onMainMouseUp;
            table.root = this;

            table.style.height = (rowCount * calendar.cellHeight) + "px";

            calendar.nav.scrollable.style.display = '';

            calendar._scrollDiv().scrollTop = scrollY;*/

        };


        // draw time cells
        this._drawMainTableBased = function() {

            //this._updateColumnWidthSpec();

            var table = this.nav.main;
            var step = this.cellDuration * 60 * 1000;
            var rowCount = this._rowCount();
            var autoHiddenCells = this._autoHiddenHours() * (60/this.cellDuration);

            var columns = calendar._columnsBottom;
            //var create = !this._tableCreated || table.rows.length === 0 || columns.length !== table.rows[0].cells.length || rowCount !== table.rows.length; // redraw only if number of columns changes
            var create = true; // always redraw

            var scrollY = 0;

            if (table) {

                scrollY = calendar._scrollDiv().scrollTop;

                this._disposeMain();
/*
                if (calendar._browser.ielt9 && create) {
                    DayPilot.de(this.nav.scrollable.parentNode);
                    var wrap = this._drawScrollable();
                    this._enableScrolling();
                    this.nav.scrollable = wrap.firstChild;
                    this.nav.scroll.appendChild(wrap);
                    //this._drawScrollable();
                    table = this.nav.main;
                }
*/
            }


            this.nav.scrollable.daypilotMainD = true;
            this.nav.scrollable.calendar = this;

            //var i = 0;
            while (table && table.rows && table.rows.length > 0 && create) {
                if (!this._fasterDispose) DayPilot.pu(table.rows[0]);
                /*
                var row = table.rows[0];
                while (calendar._browser.ie && row.cells && row.cells.length > 0) {
                    row.deleteCell(0);
                }*/
                table.deleteRow(0);
            }

            this._tableCreated = true;

            // scroll labels
            if (this.scrollLabelsVisible) {
                var columns = this._columnsBottom;
                var hoursWidth = (this.showHours ? this.hourWidth : 0);
                var colWidth = (this.nav.scroll.clientWidth - hoursWidth) / columns.length;
                for (var i = 0; i < columns.length; i++) {
                    var scrollUp = document.createElement("div");
                    scrollUp.style.position = 'absolute';
                    scrollUp.style.top = '0px';
                    scrollUp.style.left = (hoursWidth + 2 + i * colWidth + colWidth / 2) + "px";
                    scrollUp.style.display = 'none';


                    var img = document.createElement("div");
                    img.style.height = '10px';
                    img.style.width = '10px';
                    img.className = this._prefixCssClass("_scroll_up");
                    scrollUp.appendChild(img);

                    this.nav.scrollLayer.appendChild(scrollUp);
                    this.nav.scrollUp.push(scrollUp);

                    var scrollDown = document.createElement("div");
                    scrollDown.style.position = 'absolute';
                    scrollDown.style.top = '0px';
                    scrollDown.style.left = (hoursWidth + 2 + i * colWidth + colWidth / 2) + "px";
                    scrollDown.style.display = 'none';

                    var img = document.createElement("div");
                    img.style.height = '10px';
                    img.style.width = '10px';
                    img.className = this._prefixCssClass("_scroll_down");
                    scrollDown.appendChild(img);

                    this.nav.scrollLayer.appendChild(scrollDown);
                    this.nav.scrollDown.push(scrollDown);
                }
            }

            var cl = columns.length;

            // CssOnly mode, event table is separate
            if (this.cssOnly || this._separateEventsTable) {
                var events = this.nav.events;

                while (events && events.rows && events.rows.length > 0 && create) {
                    if (!this._fasterDispose) DayPilot.pu(events.rows[0]);
                    events.deleteRow(0);
                }

                // TODO identical code is in createEventsTable, merge
                var r = (create) ? events.insertRow(-1) : events.rows[0];

                for (var j = 0; j < cl; j++) {
                    var c = (create) ? r.insertCell(-1) : r.cells[j];

                    if (create) {

                        c.style.padding = '0px';
                        c.style.border = '0px none';
                        c.style.height = '1px';
                        c.style.overflow = 'visible';
                        var scrolling = this.columnWidthSpec === 'Fixed';
                        if (scrolling) {
                            if (columns[j].width) {
                                c.style.width = columns[j].width + "px";
                            }
                            else {
                               c.style.width = this.columnWidth + "px";
                            }
                        }
                        if (!calendar.rtl) {
                            c.style.textAlign = 'left';
                        }

                        calendar._initializeEventCell(c);
                    }
                }
            }

            for (var i = 0; i < rowCount; i++) {
                var r = (create) ? table.insertRow(-1) : table.rows[i];
                //var y = i + autoHiddenCells;
                var y = i;

                if (create) {
                    r.style.MozUserSelect = 'none';
                    r.style.KhtmlUserSelect = 'none';
                    r.style.WebkitUserSelect = 'none';
                }

                for (var j = 0; j < cl; j++) {
                    var col = this._columnsBottom[j];

                    var c = (create) ? r.insertCell(-1) : r.cells[j];

                    // always update
                    //c.start = col.start.addTime(i * step).addHours(this._visibleStart()).addHours(-this._autoHiddenHours());
                    c.start = col.start.addTime(y * step).addHours(this._visibleStart());
                    c.end = c.start.addTime(step);
                    c.resource = col.id;

                    if (!this.cellProperties) {
                        this.cellProperties = {};
                    }

                    var cell = {};
                    cell.resource = c.resource;
                    cell.start = c.start;
                    cell.end = c.end;

                    var index = j + "_" + y;

                    cell.cssClass = null;
                    cell.html = null;
                    cell.backImage = null;
                    cell.backRepeat = null;
                    cell.backColor = null;
                    cell.business = this._isBusinessCell(c.start, c.end);

                    if (this.cellProperties[index]) {
                        DayPilot.Util.copyProps(this.cellProperties[index], cell, ['cssClass', 'html', 'backImage', 'backRepeat', 'backColor', 'business', 'areas', 'disabled']);
                    }

                    if (typeof this.onBeforeCellRender === 'function') {
                        var args = {};
                        args.cell = cell;

                        this.onBeforeCellRender(args);
                    }

                    this.cellProperties[index] = cell;

                    var props = calendar._getProperties(j, y);

                    var content;
                    if (create) {
                        c.root = this;

                        // c.style.padding = '0px';
                        // c.style.border = '0px none';
                        // c.style.verticalAlign = 'top';

                        // c.style.height = calendar.cellHeight + 'px';

                        // c.style.overflow = 'hidden';
                        c.setAttribute("unselectable", "on");

                        content = document.createElement("div");
                        content.className = calendar._prefixCssClass("_cell");
                        content.style.position = "relative";
                        content.style.height = (calendar.cellHeight) + "px";
                        //content.style.width = '100%';
                        content.style.overflow = 'hidden';
                        content.setAttribute("unselectable", "on");

                        var inner = document.createElement("div");
                        inner.className = calendar._prefixCssClass("_cell_inner");
                        content.appendChild(inner);

                        c.appendChild(content);

                    }
                    else {
                        content = c.firstChild;
                        content.className = calendar._prefixCssClass("_cell"); // must be reset
                    }

                    c.onmousedown = this._onCellMouseDown;
                    c.onmousemove = this._onCellMouseMove;
                    c.onmouseout = this._onCellMouseOut;

                    DayPilot.re(c, DayPilot.touch.end, this._touch.onCellTouchEnd);

                    c.oncontextmenu = function() {
                        if (!this.selected) {
                            //if (DayPilotCalendar.selectedCells) {
                            calendar.clearSelection();
                            //    DayPilotCalendar.selectedCells = [];
                            //}
                            DayPilotCalendar.column = DayPilotCalendar.getColumn(this);
                            calendar.selectedCells.push(this);
                            DayPilotCalendar.firstSelected = this;
                            DayPilotCalendar.topSelectedCell = this;
                            DayPilotCalendar.bottomSelectedCell = this;

                            calendar._activateSelection();
                        }

                        if (calendar.timeRangeRightClickHandling === "Disabled") {
                            return false;
                        }

                        return false;
                    };


                    var backColor = calendar._getColor(j, y); // = c.style.backgroundColor
                    content = c.firstChild;

                    var scrolling = this.columnWidthSpec === 'Fixed';
                    if (scrolling) {
                        if (col.width) {
                            content.style.width = col.width + "px";
                        }
                        else {
                            content.style.width = this.columnWidth + "px";
                        }
                    }

                    if (backColor) {
                        content.firstChild.style.background = backColor;
                    }

                    var business = props ? props.business : this._isBusinessCell(c.start, c.end);
                    if (business) {
                        DayPilot.Util.addClass(content, calendar._prefixCssClass("_cell_business"));
                    }

                    var html = content.firstChild;

                    // reset custom properties
                    if (html) {
                        html.innerHTML = ''; // reset
                    }
                    content.style.backgroundImage = "";
                    content.style.backgroundRepeat = "";

                    if (props) {
                        if (props.html) {
                            html.innerHTML = props.html;
                        }
                        if (props.cssClass) {
                            DayPilot.Util.addClass(content, props.cssClass);
                        }
                        if (props.backImage) {
                            content.style.backgroundImage = "url('" + props.backImage + "')";
                        }
                        if (props.backRepeat) {
                            content.style.backgroundRepeat = props.backRepeat;
                        }
                        if (props.areas) {
                            var areaObject = {};
                            areaObject.start = c.start;
                            areaObject.end = c.end;
                            areaObject.resource = c.resource;

                            var areas = DayPilot.list(props.areas).filter(function(a) {
                                if (a.end && new DayPilot.Date(a.end) <= c.start) {
                                    return false;
                                }
                                if (a.start && new DayPilot.Date(a.start) >= c.end) {
                                    return false;
                                }
                                return true;
                            });
                            areas.forEach(function(a) {
                                if (!a.start && !a.end) {
                                    return;
                                }
                                if (a.start) {
                                    var startTicks = new DayPilot.Date(a.start).getTime() - c.start.getTime();
                                    a.top = calendar._ticksToPixels(startTicks);
                                }

                                if (a.end) {
                                    var endTicks = new DayPilot.Date(a.end).getTime() - c.start.getTime();
                                    a.height = calendar._ticksToPixels(endTicks) - a.top;
                                }
                            });

                            DayPilot.Areas.attach(content, areaObject, {"areas": areas});
                        }
                    }
                }
            }

            table.onmouseup = this._onMainMouseUp;
            table.root = this;

            table.style.height = (rowCount * calendar.cellHeight) + "px";

            calendar.nav.scrollable.style.display = '';

            calendar._scrollDiv().scrollTop = scrollY;

        };

        this._onMainRightClick = function(ev) {

            if (touch.detected) {
                return;
            }

            var selection = calendar.getSelection();

            if (!selection) {
                return;
            }

            var args = {};
            args.start = selection.start;
            args.end = selection.end;
            args.resource = selection.resource;

            args.preventDefault = function() {
                this.preventDefault.value = true;
            };

            if (typeof calendar.onTimeRangeRightClick === "function") {
                calendar.onTimeRangeRightClick(args);
                if (args.preventDefault.value) {
                    return false;
                }
            }

            if (calendar.timeRangeRightClickHandling === "ContextMenu" && calendar.contextMenuSelection) {
                calendar.contextMenuSelection.show(calendar.getSelection());
            }

            if (typeof calendar.onTimeRangeRightClicked === "function") {
                calendar.onTimeRangeRightClicked(args);
            }
        };

        this._isBusinessCell = function(start, end) {
            if (this.businessBeginsHour < this.businessEndsHour)
            {
                return !(start.getHours() < this.businessBeginsHour || start.getHours() >= this.businessEndsHour || start.getDayOfWeek() === 6 || start.getDayOfWeek() === 0);
            }

            if (start.getHours() >= this.businessBeginsHour)
            {
                return true;
            }

            if (start.getHours() < this.businessEndsHour)
            {
                return true;
            }

            return false;
        };

        this._onMainMouseMove = function(ev) {

            ev = ev || window.event;
            ev.insideMainD = true;
            if (window.event  && window.event.srcElement) {
                window.event.srcElement.inside = true;
            }

            DayPilotCalendar.activeCalendar = this; // required for moving

            var ref = calendar.nav.main; // changed from this.nav.scrollable
            calendar.coords = DayPilot.mo3(ref, ev);

            var mousePos = DayPilot.mc(ev);

            var crosshair = calendar.crosshairType && calendar.crosshairType !== "Disabled";
            // var inTimeHeader = calendar.coords.x < calendar.hourWidth;
            var inTimeHeader = false;
            if (DayPilot.Global.moving || DayPilot.Global.resizing || DayPilot.Global.selecting || inTimeHeader) {
                calendar._crosshairHide();
            }
            else if (crosshair) {
                calendar._crosshair();
            }

            if (DayPilot.Global.resizing) {
                calendar._updateResizingShadow(mousePos);
            }
            else if (DayPilot.Global.moving) {

                if (!DayPilot.Global.moving.helper) {
                    DayPilotCalendar.movingShadow = null;
                    return;
                }

                if (!DayPilotCalendar.movingShadow) {

                    // don't start dragging unless a minimal move has been performed
                    var distance = 3;
                    if (DayPilot.distance(mousePos, DayPilotCalendar.originalMouse) > distance) {

                        // fixes the ie8 bug (incorrect offsetX and offsetY cause flickering during move if there are inline elements in the event
                        DayPilotCalendar.movingShadow = calendar._createShadow(DayPilot.Global.moving, !calendar._browser.ie);
                        DayPilotCalendar.movingShadow.style.width = (DayPilotCalendar.movingShadow.parentNode.offsetWidth + 1) + 'px';
                    }
                    else {
                        return;
                    }
                }

                if (!calendar.coords) {
                    return;
                }

                var _step = calendar.cellHeight;
                var _startOffset = 0;

                var offset = DayPilotCalendar.moveOffsetY;
                if (!offset) {
                    offset = _step / 2; // for external drag
                }
                if (this.moveBy === "Top") {
                    offset = 0;
                }

                var newTop = Math.floor(((calendar.coords.y - offset - _startOffset) + _step / 2) / _step) * _step + _startOffset;

                if (newTop < _startOffset) {
                    newTop = _startOffset;
                }

                var main = calendar.nav.main;
                var max = calendar._divBasedGrid ? calendar._rowCount() * calendar.cellHeight : main.clientHeight;

                var height = parseInt(DayPilotCalendar.movingShadow.style.height);  // DayPilotCalendar.moving.data.height
                if (newTop + height > max) {
                    newTop = max - height;
                }

                var colWidth = main.clientWidth / main.rows[0].cells.length;
                var column = Math.floor((calendar.coords.x) / colWidth);

                if (column < 0) {
                    column = 0;
                }

                if (calendar.rtl) {
                    column = calendar._columnsBottom.length - column - 1;
                }

                var shadow = DayPilotCalendar.movingShadow;
                var e = DayPilot.Global.moving.event;
                var newPosition = calendar._calculatePositionFromShadow(e, column, newTop);
                var format = calendar.eventMovingStartEndFormat;
                if (format === "Auto") {
                    format = resolved.timeFormat() === "Clock24Hours" ? "H:mm" : "h:mm tt";
                }

                var args = {};
                args.e = e;
                args.start = newPosition.start;
                args.end = newPosition.end;
                args.resource = newPosition.resource;
                args.html = null;
                args.cssClass = null;
                args.allowed = true;

                args.top = {};
                args.top.width = null;
                args.top.space = 5;
                args.top.html = args.start.toString(format, resolved.locale());
                args.top.enabled = calendar.eventMovingStartEndEnabled;

                args.bottom = {};
                args.bottom.width = null;
                args.bottom.space = 5;
                args.bottom.html = args.end.toString(format, resolved.locale());
                args.bottom.enabled = calendar.eventMovingStartEndEnabled;

                args.external = !!DayPilotCalendar.drag;

                (function updateShadow() {

                    var last = calendar._lastEventMoving;
                    var changed = !(last && last.start.getTime() === newPosition.start.getTime() && last.end.getTime() === newPosition.end.getTime() && last.resource === newPosition.resource);

                    if (!changed) {
                        return;
                    }

                    // reset
                    shadow.className = calendar._prefixCssClass("_shadow");
                    shadow.firstChild.innerHTML = "";

                    calendar._lastEventMoving = args;
                    shadow.args = args;

                    if (!calendar.allowEventOverlap) {
                        var data = {
                            "id": e.id(),
                            "start": args.start,
                            "end": args.end,
                            "resource": args.resource
                        };
                        if (calendar.events._overlaps(data)) {
                            // update the shadow
                            DayPilot.Util.addClass(shadow, calendar._prefixCssClass("_shadow_forbidden"));
                            args.allowed = false;
                        }
                    }
                    if (calendar._overDisabledCells(args.start, args.end, args.resource)) {
                        DayPilot.Util.addClass(shadow, calendar._prefixCssClass("_shadow_forbidden"));
                        args.allowed = false;
                    }

                    DayPilot.Util.removeClass(shadow, calendar._prefixCssClass("_shadow_forbidden"));

                    if (typeof calendar.onEventMoving === "function" && args.allowed) {
                        calendar.onEventMoving(args);
                    }

                    if (args.html) {
                        shadow.firstChild.innerHTML = args.html;
                    }

                    if (args.cssClass) {
                        DayPilot.Util.addClass(shadow, args.cssClass);
                    }

                    if (!args.allowed) {
                        DayPilot.Util.addClass(shadow, calendar._prefixCssClass("_shadow_forbidden"));
                    }

                    DayPilotCalendar.movingShadow.style.top = newTop + 'px';

                    var events = calendar.nav.events;
                    if (column < events.rows[0].cells.length && column >= 0 && DayPilotCalendar.movingShadow.column !== column) {
                        DayPilotCalendar.movingShadow.column = column;
                        DayPilotCalendar.moveShadow(events.rows[0].cells[column]);
                    }

                    var columnIndex = column;
                    var div = shadow;
                    calendar._drawSelectionIndicators(div, columnIndex, args);

                })();

            }
            else if (DayPilotCalendar.firstMousePos) {

                // var abs = DayPilot.mo3(calendar.nav.events, )
                var x = calendar._getColumnForPixels(calendar.coords.x, true);
                var y = Math.floor(calendar.coords.y / calendar.cellHeight);

                var thisCell = calendar.nav.main.rows[y].cells[x];

                // activate selecting on first move
                if (!DayPilot.Global.selecting) {
                    var first = DayPilotCalendar.firstMousePos;
                    // var now = DayPilot.mo3(calendar.nav.events, ev || window.event);
                    var now = calendar.coords;
                    if (first.x !== now.x || first.y !== now.y) {
                        DayPilot.Global.selecting = {"calendar": calendar};
                    }
                }

                if (!DayPilot.Global.selecting) {
                    return;
                }

                // var mousePos = DayPilot.mo3(calendar.nav.events, ev || window.event);
                var mousePos = calendar.coords;

                var thisColumn = DayPilotCalendar.getColumn(thisCell);
                if (thisColumn !== DayPilotCalendar.column) {
                    thisCell = calendar.nav.main.rows[y].cells[DayPilotCalendar.column];
                }

                var selecting = DayPilot.Global.selecting;
                if (selecting.last && selecting.last.x === x && selecting.last.y === y) {
                    return;
                }
                selecting.last = {"x": x, "y": y};

                // clean
                // calendar.clearSelection();

                // new selected cells
                if (mousePos.y < DayPilotCalendar.firstMousePos.y) {
                    calendar.selectedCells = DayPilotCalendar.getCellsBelow(thisCell);
                    DayPilotCalendar.topSelectedCell = calendar.selectedCells[0];
                    DayPilotCalendar.bottomSelectedCell = DayPilotCalendar.firstSelected;
                }
                else {
                    calendar.selectedCells = DayPilotCalendar.getCellsAbove(thisCell);
                    DayPilotCalendar.topSelectedCell = DayPilotCalendar.firstSelected;
                    DayPilotCalendar.bottomSelectedCell = calendar.selectedCells[0];
                }

                calendar._activateSelection();

            }

            if (DayPilotCalendar.drag) {

                // drag detected
                if (DayPilotCalendar.gShadow) {
                    document.body.removeChild(DayPilotCalendar.gShadow);
                }
                DayPilotCalendar.gShadow = null;

                if (!DayPilotCalendar.movingShadow && calendar.coords) {
                    var shadow = calendar._createShadow(DayPilotCalendar.drag, false);

                    if (shadow) {
                        DayPilotCalendar.movingShadow = shadow;

                        var now = DayPilot.Date.today();

                        var ev = {
                            'id': DayPilotCalendar.drag.id,
                            'start': now,
                            'end': now.addSeconds(DayPilotCalendar.drag.duration),
                            'text': DayPilotCalendar.drag.text
                        };

                        var data = DayPilotCalendar.drag.data;
                        if (data) {
                            var skip = ['duration', 'element', 'remove', 'id', 'text'];
                            for (var name in data) {
                                if (DayPilot.contains(skip, name)) {
                                    continue;
                                }
                                ev[name] = data[name];
                            }
                        }

                        var event = new DayPilot.Event(ev, calendar);
                        //event.calendar = calendar;
                        //event.root = calendar;
                        event.external = true;

                        DayPilot.Global.moving = {};
                        DayPilot.Global.moving.event = event;
                        DayPilot.Global.moving.helper = {};
                    }
                }

                ev.cancelBubble = true;
            }

        };

        this._checkShadowOverlap = function(shadow) {
            var top = DayPilotCalendar.movingShadow.offsetTop;
            var e = DayPilot.Global.moving.event;
            var colindex = DayPilotCalendar.movingShadow.column;
        };


        this._overDisabledCells = function(start, end, resource) {
            var over = calendar._cellsForRange(start, end, resource).some(function(cell) { return cell.disabled; });
            return over;
        };


        this._cellsForRange = function(start, end, resource) {

            // var start = new Date().getTime();
            var cells = [];

            // goes through all cells, ref 2400 cells for 50 columns
            for (var name in calendar.cellProperties) {
                var cell = calendar.cellProperties[name];
                var resmatch = !resource || resource === cell.resource;
                if (resmatch && DayPilot.Util.overlaps(start, end, cell.start, cell.end)) {
                    cells.push(cell);
                }
            }

            // var end = new Date().getTime();

            return cells;
        };


        // mousePos: x,y with global coordinates (pageX, pageY)
        this._updateResizingShadow = function(mousePos) {
            if (!DayPilot.Global.resizing.event) {   // UpdatePanel refresh
                DayPilot.Global.resizing = null;
                DayPilot.de(DayPilotCalendar.resizingShadow);
                DayPilotCalendar.resizingShadow = null;
                return;
            }
            if (!DayPilotCalendar.resizingShadow) {
                //DayPilotCalendar.deleteShadow(DayPilotCalendar.resizingShadow);
                DayPilotCalendar.resizingShadow = calendar._createShadow(DayPilot.Global.resizing, false);
            }
            // make sure the cursor is correct
            //DayPilotCalendar.resizingShadow.style.cursor = 'n-resize';

            //DayPilotCalendar.resizing.dirty = true;
            var _step = DayPilot.Global.resizing.event.calendar.cellHeight;
            var _startOffset = 0;
            var delta = (mousePos.y - DayPilotCalendar.originalMouse.y);

            var e = DayPilot.Global.resizing.event;
            var start = e.start();
            var end = e.end();

            if (DayPilot.Global.resizing.dpBorder === 'bottom') {
                //var newHeight = Math.floor( ((DayPilotCalendar.originalHeight + delta) + _step/2) / _step ) * _step;
                var newHeight = Math.floor(((DayPilotCalendar.originalHeight + DayPilotCalendar.originalTop + delta) + _step / 2) / _step) * _step - DayPilotCalendar.originalTop + _startOffset;

                if (newHeight < _step)
                    newHeight = _step;

                var max = calendar._divBasedGrid ? calendar._rowCount() * calendar.cellHeight : calendar.nav.main.clientHeight;
                if (DayPilotCalendar.originalTop + newHeight > max) {
                    newHeight = max - DayPilotCalendar.originalTop;
                }

                DayPilotCalendar.resizingShadow.style.height = (newHeight) + 'px';

                end = calendar._getResizingEndFromBottom(e, DayPilotCalendar.originalTop + newHeight);

            }
            else if (DayPilot.Global.resizing.dpBorder === 'top') {
                var newTop = Math.floor(((DayPilotCalendar.originalTop + delta - _startOffset) + _step / 2) / _step) * _step + _startOffset;

                if (newTop < _startOffset) {
                    newTop = _startOffset;
                }

                if (newTop > DayPilotCalendar.originalTop + DayPilotCalendar.originalHeight - _step) {
                    newTop = DayPilotCalendar.originalTop + DayPilotCalendar.originalHeight - _step;
                }

                var newHeight = DayPilotCalendar.originalHeight - (newTop - DayPilotCalendar.originalTop);

                if (newHeight < _step) {
                    newHeight = _step;
                }
                else {
                    DayPilotCalendar.resizingShadow.style.top = newTop + 'px';
                }

                DayPilotCalendar.resizingShadow.style.height = (newHeight) + 'px';

                start = calendar._getResizingStartFromTop(e, newTop);

            }

            var shadow = DayPilotCalendar.resizingShadow;
            var format = calendar.eventResizingStartEndFormat;
            if (format === "Auto") {
                format = resolved.timeFormat() === "Clock24Hours" ? "H:mm" : "h:mm tt";
            }

            var args = {};
            args.start = start;
            args.end = end;
            args.resource = e.resource();
            args.allowed = true;
            args.html = null;
            args.cssClass = null;

            args.top = {};
            args.top.width = null;
            args.top.space = 5;
            args.top.html = args.start.toString(format, resolved.locale());
            args.top.enabled = calendar.eventResizingStartEndEnabled;

            args.bottom = {};
            args.bottom.width = null;
            args.bottom.space = 5;
            args.bottom.html = args.end.toString(format, resolved.locale());
            args.bottom.enabled = calendar.eventResizingStartEndEnabled;


            shadow.args = args;

            // reset
            shadow.firstChild.innerHTML = "";
            shadow.className = calendar._prefixCssClass("_shadow");

            if (!calendar.allowEventOverlap) {
                var data = {
                    "id": e.id(),
                    "start": args.start,
                    "end": args.end,
                    "resource": args.resource
                };
                if (calendar.events._overlaps(data)) {
                    DayPilot.Util.addClass(shadow, calendar._prefixCssClass("_shadow_forbidden"));
                    args.allowed = false;
                }
            }
            if (calendar._overDisabledCells(args.start, args.end, args.resource)) {
                DayPilot.Util.addClass(shadow, calendar._prefixCssClass("_shadow_forbidden"));
                args.allowed = false;
            }

            if (typeof calendar.onEventResizing === "function" && args.allowed) {
                calendar.onEventResizing(args);
            }

            if (args.html) {
                shadow.firstChild.innerHTML = args.html;
            }
            if (args.cssClass) {
                DayPilot.Util.addClass(shadow, args.cssClass);
            }

            var columnIndex = e.part.dayIndex;
            var div = shadow;
            calendar._drawSelectionIndicators(div, columnIndex, args);

        };

        this.temp = {};
        this.temp.getPosition = function() {
           var coords = calendar._table.getCellCoords();

           if (!coords) {
               return null;
           }

           //var td = calendar.nav.main.rows[cellCoords.y + extraCells].cells[cellCoords.x];

           var column = calendar._columnsBottom[coords.x];

           var cell = {};
           cell.resource = column.id;
           cell.start = new DayPilot.Date(column.start).addHours(calendar._visibleStart(true)).addMinutes(coords.y*calendar.cellDuration);
           cell.end = cell.start.addMinutes(calendar.cellDuration);

           return cell;
        };

        this._table = {};
        this._table.getCellCoords = function() {
            var result = {};
            result.x = 0;
            result.y = 0;

            if (!calendar.coords) {
                return null;
            }

            result.x = calendar._getColumnForPixels(calendar.coords.x);

            var _startOffset = 0;
            var row = Math.floor((calendar.coords.y - _startOffset) / calendar.cellHeight);
            result.y = row;

            if (result.x < 0) {
                return null;
            }

            return result;
        };

        this._table.col = function(table, x) {
            var result = {};
            result.left = 0;
            result.width = 0;

            if (!table) {
                return null;
            }

            if (!table.rows) {
                return null;
            }

            if (table.rows.length === 0) {
                return null;
            }

            if (table.rows[0].cells.length == 0) {
                return null;
            }

            var cell = table.rows[0].cells[x];

            if (!cell) {
                return null;
            }
            var t = DayPilot.abs(table);
            var c = DayPilot.abs(cell);

            result.left = c.x - t.x;
            result.width = cell.offsetWidth;

            return result;
        };

        this._crosshair = function() {
            this._crosshairHide();

            if (!this.elements.crosshair) {
                this.elements.crosshair = [];
            }

            var cellCoords = this._table.getCellCoords();

            if (!cellCoords) {
                return;
            }

            var column = cellCoords.x;
            var y = Math.floor(cellCoords.y / (60 / calendar.cellDuration) * (60 / calendar.timeHeaderCellDuration));

            if (y < 0) {
                return;
            }

            if (this.nav.hourTable) { // not accessible when ShowHours = true
                if (y >= this.nav.hourTable.rows.length) {
                    return;
                }

                var vertical = document.createElement("div");
                vertical.style.position = "absolute";
                vertical.style.left = "0px";
                vertical.style.right = "0px";
                vertical.style.top = "0px";
                vertical.style.bottom = "0px";
/*                vertical.style.opacity = .5;
                vertical.style.backgroundColor = this.crosshairColor;
                vertical.style.opacity = this.crosshairOpacity / 100;
                vertical.style.filter = "alpha(opacity=" + this.crosshairOpacity + ")";
*/
                vertical.className = calendar._prefixCssClass("_crosshair_left");

                this.nav.hourTable.rows[y].cells[0].firstChild.appendChild(vertical);
                this.elements.crosshair.push(vertical);
            }

            if (this.nav.header) {
                var horizontal = document.createElement("div");
                horizontal.style.position = "absolute";
                horizontal.style.left = "0px";
                horizontal.style.right = "0px";
                horizontal.style.top = "0px";
                horizontal.style.bottom = "0px";
/*                horizontal.style.opacity = .5;
                horizontal.style.backgroundColor = this.crosshairColor;
                horizontal.style.opacity = this.crosshairOpacity / 100;
                horizontal.style.filter = "alpha(opacity=" + this.crosshairOpacity + ")";*/
                horizontal.className = calendar._prefixCssClass("_crosshair_top");

                var row = this.nav.header.rows[this.headerLevels - 1];
                if (row.cells[column]) {
                    row.cells[column].firstChild.appendChild(horizontal);
                    this.elements.crosshair.push(horizontal);
                }
            }

            if (this.crosshairType === "Header") {
                return;
            }

            var layer = this.nav.crosshair;

            var _startOffset = 0;
            var top = Math.floor(((calendar.coords.y - _startOffset)) / calendar.cellHeight) * calendar.cellHeight + _startOffset;
            //var height = duration * calendar.cellHeight / (60 * calendar.cellDuration);
            var height = calendar.cellHeight;

            var fullh = document.createElement("div");
            fullh.style.position = "absolute";
            fullh.style.left = "0px";
            fullh.style.right = "0px";
            fullh.style.top = top + "px";
            fullh.style.height = height + "px";
            /*fullh.style.backgroundColor = this.crosshairColor;
            fullh.style.opacity = this.crosshairOpacity / 100;
            fullh.style.filter = "alpha(opacity=" + this.crosshairOpacity + ")";*/
            fullh.className = calendar._prefixCssClass("_crosshair_horizontal");
            fullh.onmousedown = this._onCrosshairMouseDown;

            layer.appendChild(fullh);
            this.elements.crosshair.push(fullh);

            var col = this._table.col(this.nav.main, column);
            // height = this.nav.main.clientHeight;
            height = calendar._getInnerHeight();

            if (col) {
                var fullv = document.createElement("div");
                fullv.style.position = "absolute";
                fullv.style.left = col.left + "px";
                fullv.style.width = col.width + "px";
                fullv.style.top = "0px";
                fullv.style.height = height + "px";
                /*fullv.style.backgroundColor = this.crosshairColor;
                fullv.style.opacity = this.crosshairOpacity / 100;
                fullv.style.filter = "alpha(opacity=" + this.crosshairOpacity + ")";*/
                fullv.className = calendar._prefixCssClass("_crosshair_vertical");
                fullv.onmousedown = this._onCrosshairMouseDown;

                layer.appendChild(fullv);
                this.elements.crosshair.push(fullv);
            }

        };

        this._onCrosshairMouseDown = function(ev) {
            calendar._crosshairHide();

            var cellCoords = calendar._table.getCellCoords();
            var extraCells = 0; // events
            var cell = calendar.nav.main.rows[cellCoords.y + extraCells].cells[cellCoords.x];


            calendar._onCellMouseDown.apply(cell, [ev]);
        };

        this._crosshairHide = function() {
            if (!this.elements.crosshair || this.elements.crosshair.length === 0) {
                return;
            }

            for (var i = 0; i < this.elements.crosshair.length; i++) {
                var e = this.elements.crosshair[i];
                if (e && e.parentNode) {
                    e.parentNode.removeChild(e);
                }
            }
            this.elements.crosshair = [];
        };

        this._expandCellProperties = function() {
            if (!this.cellConfig) {
                return;
            }

            var config = this.cellConfig;

            if (config.vertical) {
                for (var x = 0; x < config.x; x++) {
                    var def = this.cellProperties[x + "_0"];
                    for (var y = 1; y < config.y; y++) {
                        this.cellProperties[x + "_" + y] = def;
                    }
                }
            }

            if (config.horizontal) {
                for (var y = 0; y < config.y; y++) {
                    var def = this.cellProperties["0_" + y];
                    for (var x = 1; x < config.x; x++) {
                        this.cellProperties[x + "_" + y] = def;
                    }
                }
            }

            if (config["default"]) {
                var def = config["default"];
                for (var y = 0; y < config.y; y++) {
                    for (var x = 0; x < config.x; x++) {
                        if (!this.cellProperties[x + "_" + y]) {
                            this.cellProperties[x + "_" + y] = def;
                        }
                    }
                }
            }
        };

        this._getProperties = function(x, y) {
            if (!this.cellProperties) {
                return null;
            }
            return this.cellProperties[x + "_" + y];

        };

        this._isBusiness = function(x, y) {
            var index = x + '_' + y;
            if (this.cellProperties && this.cellProperties[index]) {
                return this.cellProperties[index].business;
            }
            return false;
        };

        this._getColor = function(x, y) {
            var index = x + '_' + y;
            if (this.cellProperties && this.cellProperties[index]) {
                return this.cellProperties[index].backColor;
            }
            return null;

        };

        this._disposeHeader = function() {
            var table = this.nav.header;
            if (table && table.rows) {
                for (var y = 0; y < table.rows.length; y++) {
                    var r = table.rows[y];
                    for (var x = 0; x < r.cells.length; x++) {

                        var c = r.cells[x];
                        c.onclick = null;
                        c.onmousemove = null;
                        c.onmouseout = null;

                        var div = c;
                        var domArgs = div.domArgs;
                        div.domArgs = null;

                        if (typeof calendar.onBeforeHeaderDomRemove === "function") {
                            calendar.onBeforeHeaderDomRemove(domArgs);
                        }

                        if (typeof calendar.onBeforeHeaderDomAdd === "function" && calendar._react.reactDOM) {
                            var target = domArgs && domArgs._targetElement;
                            if (target) {
                                var isReact = DayPilot.Util.isReactComponent(domArgs.element);
                                if (isReact) {
                                    if (!calendar._react.reactDOM) {
                                        throw new DayPilot.Exception("Can't reach ReactDOM");
                                    }
                                    calendar._react.reactDOM.unmountComponentAtNode(target);
                                }
                            }
                        }

                    }
                }
            }
            if (!this._fasterDispose) DayPilot.pu(table);
            table.innerHTML = "";
            table.rows = [];
        };


        this._getColSpans = function(y) {
            var level = y + 1;
            var lastRow = (level === calendar.headerLevels);
            var columns = this._getColumns(level);
            var x = 0;
            var left = 0;
            var coldims = calendar._getColumnDimensions();
            var parentcoldims = [];

            if (!lastRow) {
                for (var i = 0; i < columns.length; i++) {
                    var data = columns[i];
                    var coldim = coldims[i];
                    var nonEmpty = data.getChildren ? true : false;
                    var colspan = nonEmpty ? data.getChildrenCount(calendar.headerLevels - level + 1) : 1;
                    var width = coldim.width;
                    DayPilot.list.for(colspan - 1, function() {
                        var childCol = coldims[i + x];
                        width += childCol.width;
                        x += 1;
                    });
                    parentcoldims.push({
                        "left": left,
                        "width": width
                    });
                    left += width;
                }

            }
            // except the last row
            /*else {
                parentcoldims.push({
                    "left": left,
                    "width": width
                });
            }*/
            return parentcoldims;
        };

        this._drawHeaderRowDivBased = function(y) {

            var level = y + 1;

            var columns = this._getColumns(level);
            var len = columns.length;
            var lastRow = (level === calendar.headerLevels);


            var coldims = calendar._getColumnDimensions();
            var top = y * calendar.headerHeight;

            var cells = [];
            calendar.nav.header.rows.push({
                "cells": cells
            });

            var parentcoldims = calendar._getColSpans(y);

            function drawHeaderCell(i) {
                var data = columns[i];
                var coldim = coldims[i];

                var args = {};
                args.header = {};
                args.column = calendar._createColumn(data, calendar);
                var argsElement = null;

                if (calendar._api2()) {
                    if (typeof calendar.onBeforeHeaderRender === 'function') {
                        // TODO deep copy of children, areas?
                        DayPilot.Util.copyProps(data, args.header, ['id', 'start', 'name', 'html', 'backColor', 'toolTip', 'areas', 'children']);
                        calendar.onBeforeHeaderRender(args);
                        DayPilot.Util.copyProps(args.header, data, ['html', 'backColor', 'toolTip', 'areas']);
                    }
                }

                var nonEmpty = data.getChildren ? true : false;

                var width = coldim.width;
                var left = coldim.left;
                if (!lastRow) {
                    left = parentcoldims[i].left;
                    width = parentcoldims[i].width;
                }

                var cell = document.createElement("div");
                cell.style.position = "absolute";
                cell.style.top = top + "px";
                cell.style.left = left + coldim.unit;
                cell.style.right = left + coldim.unit;  // priority for rtl
                cell.style.width = width + coldim.unit;
                cell.data = data;

                cells.push(cell);

                if (nonEmpty) {
                    cell.onclick = calendar._headerClickDispatch;
                    cell.onmousemove = calendar._headerMouseMove;
                    cell.onmouseout = calendar._headerMouseOut;
                    if (data.toolTip) {
                        cell.title = data.toolTip;
                    }
                }
                cell.style.overflow = "hidden";
                cell.style.height = (resolved.headerHeight()) + "px";

                var div = document.createElement("div");

                div.setAttribute("unselectable", "on");
                div.style.userSelect = "none";
                div.style.position = "relative";
                div.style.height = resolved.headerHeight() + "px";

                div.className = calendar._prefixCssClass('_colheader');

                var inner = document.createElement("div");
                inner.className = calendar._prefixCssClass('_colheader_inner');
                if (data.backColor) {
                    inner.style.background = data.backColor;
                }
                div.appendChild(inner);

                cell.appendChild(div);

                calendar._updateHeaderActiveAreas(div, data);

                if (typeof calendar.onBeforeHeaderDomAdd === "function") {
                    args.element = null;

                    calendar.onBeforeHeaderDomAdd(args);

                    argsElement = args.element;
                }

                cell.domArgs = args;
                if (argsElement) {
                    var target = inner;
                    // target.domArgs = args;
                    args._targetElement = target;
                    var isReactComponent = DayPilot.Util.isReactComponent(argsElement);
                    if (isReactComponent) {
                        if (!calendar._react.reactDOM) {
                            throw new DayPilot.Exception("Can't reach ReactDOM");
                        }
                        calendar._react.reactDOM.render(argsElement, target);
                    }
                    else {
                        target.appendChild(argsElement);
                    }
                }
                else {
                    if (nonEmpty) {
                        div.firstChild.innerHTML = data.html || "";
                    }
                }

                calendar.nav.header.appendChild(cell);

            }

            if (DayPilot.browser.ie) {
                for (var i = len -1; i >= 0; i--) {
                    drawHeaderCell(i);
                }
            }
            else {
                for (var i = 0; i < len; i++) {
                    drawHeaderCell(i);
                }
            }

        };

        this._drawHeaderRowTableBased = function(level, create) {

            // column headers
            var r = (create) ? this.nav.header.insertRow(-1) : this.nav.header.rows[level - 1];

            var columns = this._getColumns(level);
            var len = columns.length;
            var lastRow = (level === calendar.headerLevels);

            for (var i = 0; i < len; i++) {
                var data = columns[i];

                if (calendar._api2()) {
                    if (typeof calendar.onBeforeHeaderRender === 'function') {
                        var args = {};
                        args.header = {};
                        // TODO deep copy of children, areas?
                        DayPilot.Util.copyProps(data, args.header, ['id', 'start', 'name', 'html', 'backColor', 'toolTip', 'areas', 'children']);
                        this.onBeforeHeaderRender(args);
                        DayPilot.Util.copyProps(args.header, data, ['html', 'backColor', 'toolTip', 'areas']);
                    }
                }

                var nonEmpty = data.getChildren ? true : false;

                var cell = (create) ? r.insertCell(-1) : r.cells[i];
                cell.data = data;

                if (lastRow) { // use the width spec only for the last row, otherwise use colspan
                }
                else {
                    var colspan = 1;
                    if (nonEmpty) {
                        colspan = data.getChildrenCount(calendar.headerLevels - level + 1);
                    }
                    cell.colSpan = colspan;
                }

                if (nonEmpty) {
                    cell.onclick = this._headerClickDispatch;
                    cell.onmousemove = this._headerMouseMove;
                    cell.onmouseout = this._headerMouseOut;
                    if (data.toolTip) {
                        cell.title = data.toolTip;
                    }
                }
                cell.style.overflow = 'hidden';
                cell.style.padding = '0px';
                cell.style.border = '0px none';
                cell.style.height = (resolved.headerHeight()) + "px";

                var div = (create) ? document.createElement("div") : cell.firstChild;

                if (create) {
                    div.setAttribute("unselectable", "on");
                    div.style.MozUserSelect = 'none';
                    div.style.KhtmlUserSelect = 'none';
                    div.style.WebkitUserSelect = 'none';
                    div.style.position = 'relative';
                    div.style.height = resolved.headerHeight() + "px";

                    div.className = calendar._prefixCssClass('_colheader');

                    var inner = document.createElement("div");
                    inner.className = calendar._prefixCssClass('_colheader_inner');
                    if (data.backColor) {
                        inner.style.background = data.backColor;
                    }
                    div.appendChild(inner);

                    cell.appendChild(div);
                }
                else {
                    div.style.height = resolved.headerHeight() + "px";
                }

                this._updateHeaderActiveAreas(div, data);


                if (nonEmpty) {
                    div.firstChild.innerHTML = data.html;
                }
            }

        };


        this._updateHeaderActiveAreas = function(div, data) {

            // delete active areas
            var tobedeleted = [];
            for (var j = 0; j < div.childNodes.length; j++) {
                var node = div.childNodes[j];
                if (node.isActiveArea) {
                    tobedeleted.push(node);
                }
            }

            for (var j = 0; j < tobedeleted.length; j++) {
                var node = tobedeleted[j];
                DayPilot.de(node);
            }

            // areas (permanently visible)
            if (data.areas) {
                var areas = data.areas;
                for (var j = 0; j < areas.length; j++) {
                    var area = areas[j];
                    if (!DayPilot.Areas.isVisible(area)) {
                        continue;
                    }
                    // var o = new DayPilot.Column(data.id, data.name, data.start);
                    var o = calendar._createColumn(data);
                    var a = DayPilot.Areas.createArea(div, o, area);
                    div.appendChild(a);
                }
            }

        };

        this._drawHeader = function() {
            if (calendar._divBasedGrid) {
                calendar._drawHeaderDivBased();
            }
            else {
                calendar._drawHeaderTableBased();
            }
        };

        this._drawHeaderDivBased = function() {
            var header = calendar.nav.header;

            // cleanup
/*
            header.innerHTML = "";
            header.rows = [];
*/
            calendar._disposeHeader();

            if (!this.showHeader) {
                return;
            }

            var columns = this._getColumns(calendar.headerLevels, true);
            var len = columns.length;

            this._headerCreated = true;

            // corner
            var corner = calendar.nav.corner;
            if (corner) {
                if (!this._fasterDispose) DayPilot.pu(corner.firstChild);

                var args = {};
                args.html = calendar.cornerHTML || calendar.cornerHtml;
                var argsElement = null;

                calendar._disposeCorner();

                if (typeof calendar.onBeforeCornerRender === "function") {
                    calendar.onBeforeCornerRender(args);
                }

                if (typeof calendar.onBeforeCornerDomAdd === "function") {
                    args.element = null;

                    calendar.onBeforeCornerDomAdd(args);

                    argsElement = args.element;
                }

                if (argsElement) {
                    var target = corner.firstChild;
                    target.domArgs = args;
                    var isReactComponent = DayPilot.Util.isReactComponent(argsElement);
                    if (isReactComponent) {
                        if (!calendar._react.reactDOM) {
                            throw new DayPilot.Exception("Can't reach ReactDOM");
                        }
                        calendar._react.reactDOM.render(argsElement, target);
                    }
                    else {
                        target.appendChild(argsElement);
                    }
                }
                else {
                    corner.firstChild.innerHTML = args.html || "";
                }

            }

            for (var y = 0; y < calendar.headerLevels; y++) {
                this._drawHeaderRowDivBased(y);
            }

            if (this.showAllDayEvents) {
                var cells = [];
                calendar.nav.header.rows.push({
                    "cells": cells
                });

                var coldims = calendar._getColumnDimensions();
                var top = calendar.headerLevels * calendar.headerHeight;

                for (var i = 0; i < len; i++) {
                    var data = columns[i];
                    var coldim = coldims[i];

                    var cell = document.createElement("div");
                    cell.data = data;
                    cell.style.overflow = 'hidden';
                    cell.style.position = "absolute";
                    cell.style.left = coldim.left + coldim.unit;
                    cell.style.right = coldim.left + coldim.unit;  // rtl
                    cell.style.width = coldim.width + coldim.unit;
                    cell.style.top = top + "px";

                    var div = document.createElement("div");
                    div.setAttribute("unselectable", "on");
                    div.style.userSelect = "none";
                    div.style.overflow = "hidden";
                    div.style.position = "relative";
                    div.style.height = resolved.allDayHeaderHeight() + "px";
                    div.className = this._prefixCssClass("_alldayheader");

                    var inner = document.createElement("div");
                    inner.className = this._prefixCssClass("_alldayheader_inner");
                    div.appendChild(inner);

                    cell.appendChild(div);
                    div.style.height = resolved.allDayHeaderHeight() + "px";

                    cells.push(cell);
                    header.appendChild(cell);
                }
            }

            // calendar.nav.headerParent.appendChild(header);
        };

        this._drawHeaderTableBased = function() {
            if (!this.showHeader) {
                return;
            }

            var header = this.nav.header;
            var create = true;

            var columns = this._getColumns(calendar.headerLevels, true);
            var len = columns.length;

            // 2018-01-23 always re-creating the header (to fix angular 2+ all-day change)
            DayPilot.de(this.nav.header);
            this._createNavHeader();

            while (this._headerCreated && header && header.rows && header.rows.length > 0 && create) {
                if (!this._fasterDispose) DayPilot.pu(header.rows[0]);
                header.deleteRow(0);
            }

            this._headerCreated = true;

            // var html = calendar.cornerHTML || calendar.cornerHtml;

            // corner
            var corner = calendar.nav.corner;
            if (corner) {
                if (!this._fasterDispose) DayPilot.pu(corner.firstChild);

                var args = {};
                args.html = calendar.cornerHTML || calendar.cornerHtml;
                if (typeof calendar.onBeforeCornerRender === "function") {
                    calendar.onBeforeCornerRender(args);
                }

                corner.firstChild.innerHTML = args.html ? args.html : '';
            }

            for (var i = 0; i < calendar.headerLevels; i++) {
                this._drawHeaderRowTableBased(i + 1, create);
            }

            if (!this.showAllDayEvents) {
                return;
            }

            // all day events
            var r = (create) ? this.nav.header.insertRow(-1) : this.nav.header.rows[calendar.headerLevels];

            for (var i = 0; i < len; i++) {
                var data = columns[i];

                var cell = (create) ? r.insertCell(-1) : r.cells[i];
                cell.data = data;
                cell.style.padding = '0px';
                cell.style.border = '0px none';
                cell.style.overflow = 'hidden';

                var div = (create) ? document.createElement("div") : cell.firstChild;

                if (create) {
                    div.setAttribute("unselectable", "on");
                    div.style.MozUserSelect = 'none';
                    div.style.KhtmlUserSelect = 'none';
                    div.style.WebkitUserSelect = 'none';
                    div.style.overflow = 'hidden';
                    div.style.position = "relative";
                    div.style.height = resolved.allDayHeaderHeight() + "px";
                    div.className = this._prefixCssClass("_alldayheader");

                    var inner = document.createElement("div");
                    inner.className = this._prefixCssClass("_alldayheader_inner");
                    div.appendChild(inner);

                    cell.appendChild(div);
                }
                div.style.height = resolved.allDayHeaderHeight() + "px";

            }
        };

        this._loadingStart = function(immediately) {

            var delay = immediately ? 0 : 100;

            if (this.callbackTimeout) {
                window.clearTimeout(this.callbackTimeout);
            }

            this.callbackTimeout = window.setTimeout(function() {
                if (calendar.loadingLabelVisible && calendar.nav.loading) {
                    calendar.nav.loading.innerHTML = calendar.loadingLabelText;
                    calendar.nav.loading.style.top = (calendar._totalHeaderHeight() + 5) + "px";
                    calendar.nav.loading.style.display = '';
                }
            }, delay);

        };

        this._loadingStop = function() {
            if (this.callbackTimeout) {
                window.clearTimeout(this.callbackTimeout);
            }

            if (this.nav.loading) {
                this.nav.loading.style.display = 'none';
            }
        };

        this._hourOffsetInPixels = function(hour) {
            var hoursPlus = calendar._visibleStart(true);
            if (hour < hoursPlus) {
                hour += 24;
            }
            var pixels = (hour - hoursPlus) * (60/calendar.cellDuration) * calendar.cellHeight;
            return pixels;
        };

        this._enableScrolling = function() {

            var scrollDiv = this._scrollDiv();
            var scrollPos = this.initScrollPos;
            if (!scrollPos) {
                var hour = this.businessBeginsHour;
                scrollPos = calendar._hourOffsetInPixels(hour);
            }

            scrollDiv.root = this;
            scrollDiv.onscroll = this._scroll;

            // initial position
            if (scrollDiv.scrollTop === 0) {
                scrollDiv.scrollTop = scrollPos - this._autoHiddenPixels();
            }
            else {
                this._scroll();
            }

        };

        this._visible = function() {
            var el = calendar.nav.top;
            if (!el) {
                return false;
            }
            return el.offsetWidth > 0 && el.offsetHeight > 0;
        };

        this._waitForVisibility = function() {
            var visible = calendar._visible;

            if (!visible() && !calendar._visibilityInterval) {
                calendar._visibilityInterval = setInterval(function() {
                    if (visible()) {
                        clearInterval(calendar._visibilityInterval);
                        calendar._enableScrolling();
                        calendar._fixScrollHeader();
                    }
                }, 100);
            }
        };

        this.scrollToY = function(pixels) {
            var scrollDiv = this._scrollDiv();
            scrollDiv.scrollTop = pixels;
        };

        this.scrollToHour = function(hour) {
            var pixels = calendar._hourOffsetInPixels(hour);
            var scrollDiv = this._scrollDiv();
            scrollDiv.scrollTop = pixels - this._autoHiddenPixels();
        };

        this._scrollDiv = function() {
            var scrolling = this.columnWidthSpec === 'Fixed';
            return scrolling || this._unifiedScrollable ? this.nav.bottomRight : this.nav.scroll;
        };

        this.onCallbackError = function(result, context) {
            alert("Error!\r\nResult: " + result + "\r\nContext:" + context);
        };

        // disabled, don't show in the API
        //this.scrollbarVisible = this._scrollbarVisible;

        this._fixScrollHeader = function() {

            if (!calendar.showHeader) {
                return;
            }

            var show = this._scrollbarVisible();
            var visible = !!this.nav.cornerRight;

            if (this._unifiedScrollable) {
                if (this.nav.unifiedCornerRight) {
                    DayPilot.de(this.nav.unifiedCornerRight);
                }

                var scrollDiv = calendar._scrollDiv();
                // var fraction = scrollDiv.getBoundingClientRect().width - scrollDiv.offsetWidth;
                var clientWidth = calendar.nav.main.getBoundingClientRect().width;

                var fullw = calendar._getTotalScrollableWidth();
                if (fullw != "100%" && parseInt(fullw) < clientWidth) {
                    return;
                }

                var w = DayPilot.sw(this.nav.bottomRight);

                // corner right
                // var lastcoldim = calendar._getColumnDimensions().last();
                // var totalcolw = lastcoldim.left + lastcoldim.width;

                var c;
                if (calendar._divBasedGrid) {
                    c = document.createElement("div");
                    c.style.position = "absolute";
                    c.style.left = clientWidth + "px";
                    c.style.right = clientWidth + "px"; // rtl
                    c.style.height = calendar._totalHeaderHeight() + "px";

                    calendar.nav.headerParent.appendChild(c);
                    calendar.nav.unifiedCornerRight = c;

                    calendar.nav.header.style.width = clientWidth + "px";
                }
                else {
                    this.nav.unifiedCornerRight = this.nav.header.rows[0].insertCell(-1);
                    c = this.nav.unifiedCornerRight;
                    c.rowSpan = this.nav.header.rows.length;
                }


                c.style.width = w + "px";

                var corner = document.createElement("div");
                corner.className = calendar._prefixCssClass("_cornerright");
                corner.setAttribute("unselectable", "on");
                corner.style.overflow = "hidden";
                corner.style.height = this._totalHeaderHeight() + "px";
                corner.style.position = "relative";

                var inner = document.createElement("div");
                inner.className = calendar._prefixCssClass("_cornerright_inner");
                corner.appendChild(inner);

                c.appendChild(corner);

                var scrollable = this.columnWidthSpec === "Fixed";
                // all-day wrapper
                if (!scrollable && this.nav.allday) {
                    if (calendar.rtl) {
                        this.nav.allday.style.left = w + "px";
                    }
                    else {
                        this.nav.allday.style.right = w + "px";
                    }

                }

                return;
            }


            if (show !== visible) {  // change required
                if (show) {  // show it
                    this._createCornerRightTd();
                }
                else {  // hide it
                    if (this.nav.fullHeader && this.nav.fullHeader.rows[0].cells.length === 3) {
                        var c = this.nav.fullHeader.rows[0].cells[2];
                        if (c.parentNode) {
                            c.parentNode.removeChild(c);
                        }
                    }
                    this.nav.cornerRight = null;
                }
            }

            // now fix the width
            var d = this.nav.cornerRight;

            if (!d) {
                return;
            }
            var w = DayPilot.sw(calendar._scrollElement());

            if (d) {
                d.style.width = (w) + 'px';
            }
            return w;
        };

        // interval defined in seconds, minimum 30 seconds
        this._startAutoRefresh = function(forceEnabled) {
            if (forceEnabled) {
                this.autoRefreshEnabled = true;
            }

            if (!this.autoRefreshEnabled) {
                return;
            }

            if (this._autoRefreshCount >= this.autoRefreshMaxCount) {
                return;
            }

            //this.autoRefreshCount = 0; // reset
            this._pauseAutoRefresh();

            var interval = this.autoRefreshInterval;
            if (!interval || interval < 10) {
                throw "The minimum autoRefreshInterval is 10 seconds";
            }
            //this.autoRefresh = interval * 1000;
            this.autoRefreshTimeout = window.setTimeout(function() { calendar._doRefresh(); }, this.autoRefreshInterval * 1000);
        };

        this._pauseAutoRefresh = function() {
            if (this.autoRefreshTimeout) {
                window.clearTimeout(this.autoRefreshTimeout);
            }
        };

        this._doRefresh = function() {
            if (!DayPilot.Global.resizing && !DayPilot.Global.moving && !DayPilotCalendar.drag && !DayPilot.Global.selecting) {
                var skip = false;
                if (typeof this.onAutoRefresh === 'function') {
                    var args = {};
                    args.i = this._autoRefreshCount;
                    args.preventDefault = function() {
                        this.preventDefault.value = true;
                    };

                    calendar.onAutoRefresh(args);
                    if (args.preventDefault.value) {
                        skip = true;
                    }
                }
                if (!skip && this._serverBased()) {
                    this.commandCallBack(this.autoRefreshCommand);
                }
                this._autoRefreshCount++;

            }
            if (this._autoRefreshCount < this.autoRefreshMaxCount) {
                this.autoRefreshTimeout = window.setTimeout(function() { calendar._doRefresh(); }, this.autoRefreshInterval * 1000);
            }
        };

        this._onResize = function() {
            calendar._updateHeight();
            if (calendar.heightSpec === "Parent100Pct") {
                calendar.setHeight(parseInt(calendar.nav.top.clientHeight, 10));
            }

            calendar._fixScrollHeader();
            calendar._updateScrollLabels();
        };

        this._registerGlobalHandlers = function() {
            if (!DayPilotCalendar.globalHandlers) {
                DayPilotCalendar.globalHandlers = true;
                DayPilot.re(document, 'mousemove', DayPilotCalendar.gMouseMove);
                DayPilot.re(document, 'mouseup', DayPilotCalendar.gMouseUp);
                DayPilot.re(document, DayPilot.touch.move, DayPilotCalendar.gTouchMove);
                DayPilot.re(document, DayPilot.touch.end, DayPilotCalendar.gTouchEnd);
                //DayPilot.re(window, 'unload', DayPilotCalendar.gUnload);
            }
            DayPilot.re(window, 'resize', this._onResize);
        };

        this._onEventMouseDown = function(ev) {

            if (touch.active || touch.using) {  // ie
                return;
            }

            ev = ev || window.event;
            var button = DayPilot.Util.mouseButton(ev);

            if (DayPilotCalendar.editing) {
                DayPilotCalendar.editing.blur();
                return;
            }

            if (typeof (DayPilot.Bubble) !== 'undefined') {
                DayPilot.Bubble.hideActive();
                DayPilot.Bubble.cancelShowing();
            }

            if ((this.style.cursor === 'n-resize' || this.style.cursor === 's-resize') && button.left) {
                // set
                DayPilot.Global.resizing = this;
                DayPilotCalendar.originalMouse = DayPilot.mc(ev);
                DayPilotCalendar.originalHeight = this.offsetHeight;
                DayPilotCalendar.originalTop = this.offsetTop;

                // shadow
                // 1 line, moved to scroll.mousemove
                //DayPilotCalendar.resizingShadow = DayPilotCalendar.createShadow(this, false, calendar.shadow);

                // cursor
                //document.body.style.cursor = this.style.cursor;
                calendar.nav.top.style.cursor = this.style.cursor;

                // disabled, causes problems, maybe even leaks
                //this.onclickSave = this.onclick;
                //this.onclick = null;
            }
            else if ((this.style.cursor === 'move' || (calendar.moveBy === 'Full' && this.event.client.moveEnabled())) && button.left) {
                DayPilot.Global.moving = this;
                var helper = DayPilot.Global.moving.helper = {};
                helper.oldColumn = calendar._columnsBottom[this.event.part.dayIndex].id;
                DayPilotCalendar.originalMouse = DayPilot.mc(ev);
                DayPilotCalendar.originalTop = this.offsetTop;

                var offset = DayPilot.mo3(this, ev);
                if (offset) {
                    DayPilotCalendar.moveOffsetY = offset.y;
                }
                else {
                    DayPilotCalendar.moveOffsetY = 0;
                }

                calendar.nav.top.style.cursor = this.style.cursor;
            }

            return false;
        };

        this._doBeforeEventRender = function(i) {
            var cache = this._cache.events;
            var data = this.events.list[i];
            var evc = {};

            // make a copy
            for (var name in data) {
                evc[name] = data[name];
            }

            if (calendar.showEventStartEnd) {
                var sameday = data.start.getDatePart().getTime() === data.end.getDatePart().getTime();
                var pattern = sameday ? resolved.locale().timePattern : resolved.locale().dateTimePattern;

                var startTime = data.start.toString(pattern);
                var endTime = data.end.toString(pattern);
                evc.html = evc.text + " (" + startTime + " - " + endTime + ")";
            }

            if (typeof this.onBeforeEventRender === 'function') {
                var args = {};
                args.e = evc;
                args.data = evc;
                this.onBeforeEventRender(args);
            }

            cache[i] = evc;

        };

        this._touch = {};
        var touch = calendar._touch;

        touch.active = false;
        touch.start = null;
        touch.timeout = null;

        touch.startcell = null;

        this._touch.getCellCoords = function(ev) {
            var x, y;

            if (ev.touches) {
                x = ev.touches[0].pageX;
                y = ev.touches[0].pageY;
            }
            else {
                x = ev.pageX;
                y = ev.pageY;
            }

            var abs = DayPilot.abs(calendar.nav.main);
            var pos = {x: x - abs.x, y: y - abs.y};

            var w = (calendar.nav.main.clientWidth / calendar._columnsBottom.length);

            var coords = {
                "pageX": x,
                "pageY": y,
                //"abs": abs,
                "x": Math.floor(pos.x / w),
                "y": Math.floor(pos.y / calendar.cellHeight),
                "toString" : function() { return "x: " + this.x + " y:" + this.y; }
            };

            return coords;
        };

        this._touch.startSelecting = function(coords) {

            var cell = calendar.nav.main.rows[coords.y].cells[coords.x];
            touch.startcell = coords;

            calendar.clearSelection();

            // don't use this flag, it's for mouse cursor
            // DayPilot.Global.selecting = true;
            DayPilotCalendar.column = DayPilotCalendar.getColumn(cell);
            calendar.selectedCells.push(cell);
            DayPilotCalendar.firstSelected = cell;

            DayPilotCalendar.topSelectedCell = cell;
            DayPilotCalendar.bottomSelectedCell = cell;

            DayPilot.Global.selecting = {"calendar": calendar};

            calendar._activateSelection();

        };


        this._touch.extendSelection = function(coords) {

            var cell = calendar.nav.main.rows[coords.y].cells[coords.x];

            calendar.clearSelection();

            DayPilot.Global.selecting = {"calendar": calendar};

            // new selected cells
            if (coords.y < touch.startcell.y) {
              calendar.selectedCells = DayPilotCalendar.getCellsBelow(cell);
              DayPilotCalendar.topSelectedCell = calendar.selectedCells[0];
              DayPilotCalendar.bottomSelectedCell = DayPilotCalendar.firstSelected;
            }
            else {
              calendar.selectedCells = DayPilotCalendar.getCellsAbove(cell);
              DayPilotCalendar.topSelectedCell = DayPilotCalendar.firstSelected;
              DayPilotCalendar.bottomSelectedCell = calendar.selectedCells[0];
            }

            calendar._activateSelection();
        };

        this._touch.detected = false;

        this._touch.onMainTouchStart = function(ev) {

            // calendar._touchMsg("onMainTouchStart");
            //alert("onMainTouchStart");

            if (DayPilot.Util.isMouseEvent(ev)) {
                return;
            }

            touch.start = true;
            touch.detected = true;

            if (touch.active) {
                return;
            }

            // pinch
            if (ev.touches.length > 1) {
                return;
            }

            touch.using = true;

            var coords = touch.getCellCoords(ev);
            touch.startCoords = coords;

            //ev.preventDefault();

            var holdfor = calendar.tapAndHoldTimeout;
            touch.timeout = window.setTimeout(function() {
                //alert("timeout");
                ev.preventDefault();
                touch.active = true;
                touch.start = false;
                switch (calendar.timeRangeTapAndHoldHandling) {
                    case "Select":
                        // alert(coords.pageX + "/" + coords.pageY);
                        // alert(coords.abs);
                        //alert(coords.x + "/" + coords.y);
                        touch.startSelecting(coords);
                        //alert(coords.pageX + "/" + coords.pageY);
                        //calendar.nav.corner.firstChild.innerHTML = coords.pageX + "/" + coords.pageY;
                        break;
                    case "ContextMenu":
                        // TODO select it
                        touch.startSelecting(coords);
                        touch.active = false; // prevent the default selection action
                        // invoke menu
                        if (calendar.contextMenuSelection) {
                            calendar.contextMenuSelection.show(calendar.getSelection());
                        }
                        break;
                }
            }, holdfor);
        };

        this._touch.onCellTouchMove = function(ev) {
        };

        this._touch.onCellTouchEnd = function(ev) {

            if (!touch.active) {
                window.clearTimeout(touch.timeout);  // not sure

                // if not moved
                if (touch.start) {
                    (function selectCell(cell) {
                        if (calendar.timeRangeSelectedHandling === "Disabled") {
                            return;
                        }


                        calendar.clearSelection();

                        calendar.selectedCells = [cell];
                        DayPilotCalendar.topSelectedCell = cell;
                        DayPilotCalendar.bottomSelectedCell = cell;

                        calendar._activateSelection();

                        var sel = calendar.getSelection();
                        sel.toString = function() {
                            return "start: " + this.start + "\nend: " + this.end;
                        };

                        setTimeout(function() {
                            calendar._timeRangeSelectedDispatch(sel.start, sel.end, sel.resource);
                        }, 10);

                    })(this);
                }

                return;
            }

            ev.preventDefault();
            ev.stopPropagation();

            touch.startcell = null;
            touch.start = false;

            var sel = calendar.getSelection();
            sel.toString = function() {
                return "start: " + this.start + "\nend: " + this.end;
            };
            calendar._timeRangeSelectedDispatch(sel.start, sel.end, sel.resource);

            // prevent alert-initiated touchstart on iOS
            window.setTimeout(function() {
                touch.active = false;
            }, 500);

        };

        this._touch.startMoving = function(div, coords) {
            DayPilot.Global.moving = div;
            var helper = DayPilot.Global.moving.helper = {};
            helper.oldColumn = calendar._columnsBottom[div.event.part.dayIndex].id;
            DayPilotCalendar.originalMouse = coords;
            DayPilotCalendar.originalTop = this.offsetTop;

            var abs = DayPilot.abs(div);
            DayPilotCalendar.moveOffsetY = coords.y - abs.y;

            //document.title = "moveOffsetY:" + DayPilotCalendar.moveOffsetY;

            if (!DayPilotCalendar.movingShadow) {
                DayPilotCalendar.movingShadow = calendar._createShadow(DayPilot.Global.moving, !calendar._browser.ie);
                DayPilotCalendar.movingShadow.style.width = (DayPilotCalendar.movingShadow.parentNode.offsetWidth + 1) + 'px';
            }

        };

        this._touch.startResizing = function(div, border, coords) {
            DayPilot.Global.resizing = div;
            div.dpBorder = border;
            DayPilotCalendar.originalMouse = coords;   // DayPilot.mc()
            DayPilotCalendar.originalHeight = div.offsetHeight;
            DayPilotCalendar.originalTop = div.offsetTop;
        };

        this._touch.updateResizing = function(coords) {
            calendar._updateResizingShadow(coords);
        };

        // coords relative to main
        this._touch.updateMoving = function() {

            var coords = calendar.coords;

            var _step = calendar.cellHeight;
            var _startOffset = 0;

            var offset = DayPilotCalendar.moveOffsetY;
            if (!offset) {
              offset = _step / 2; // for external drag
            }

            var newTop = Math.floor(((coords.y - offset - _startOffset) + _step / 2) / _step) * _step + _startOffset;

            if (newTop < _startOffset) {
              newTop = _startOffset;
            }

            var main = calendar.nav.main;
            // var max = main.clientHeight;
            var max = calendar._getInnerHeight();

            var height = parseInt(DayPilotCalendar.movingShadow.style.height);  // DayPilotCalendar.moving.data.height

            if (newTop + height > max) {
              newTop = max - height;
            }

            DayPilotCalendar.movingShadow.style.top = newTop + 'px';

            DayPilotCalendar.movingShadow.allowed = true;
            // TODO include onEventMoving

            var colWidth = main.clientWidth / main.rows[0].cells.length;
            var column = Math.floor(coords.x / colWidth);

            if (column < 0) {
              column = 0;
            }

            var events = calendar.nav.events;
            if (column < events.rows[0].cells.length && column >= 0 && DayPilotCalendar.movingShadow.column !== column) {
              DayPilotCalendar.movingShadow.column = column;
              DayPilotCalendar.moveShadow(events.rows[0].cells[column]);
            }

        };

        this._touch.onEventTouchStart = function(ev) {
            if (touch.active) {
                return;
            }

            if (DayPilot.Util.isMouseEvent(ev)) {
                return;
            }

            ev.stopPropagation();
            touch.preventEventTap = false;
            touch.using = true;

            // ie
            touch.startCoords = touch.getCellCoords(ev);

            var div = this;
            var x = ev.touches ? ev.touches[0].pageX : ev.pageX;
            var y = ev.touches ? ev.touches[0].pageY : ev.pageY;
            var coords  = { x: x, y: y, div: this};

            // nav.scrollable is a wrong reference
            //var abs = DayPilot.abs(calendar.nav.scrollable);
            calendar.coords = touch.relativeCoords(ev);


            var holdfor = calendar.tapAndHoldTimeout;
            touch.timeout = window.setTimeout(function() {

                var e = div.event;

                touch.active = true;
                switch (calendar.eventTapAndHoldHandling) {
                    case "Move":
                        if (e.client.moveEnabled()) {
                            touch.startMoving(div, coords);
                        }
                        break;
                    case "ContextMenu":
                        var menu = e.client.contextMenu();

                        if (DayPilot.Menu) {
                            DayPilot.Menu.touchPosition(ev);
                        }

                        if (menu) {
                            menu.show(e);
                        }
                        else {
                            if (calendar.contextMenu) {
                                calendar.contextMenu.show(e);
                            }
                        }
                        break;
                }
            }, holdfor);

        };

        this._touch.onMainTouchMove = function(ev) {

            if (DayPilot.Util.isMouseEvent(ev)) {
                return;
            }

            touch.start = false;

            if (touch.timeout) {
                var coords = touch.getCellCoords(ev);
                if (coords && touch.startCoords) {
                    if (coords.pageX !== touch.startCoords.pageX || coords.pageY !== touch.startCoords.pageY) {
                        window.clearTimeout(calendar._touch.timeout);
                    }
                }
            }

            if (DayPilot.Global.moving && DayPilotCalendar.movingShadow) {
                ev.preventDefault();
                calendar.coords = touch.relativeCoords(ev);
                touch.updateMoving();
                return;
            }
            else if (DayPilot.Global.resizing) {
                ev.preventDefault();
                var t = ev.touches ? ev.touches[0] : ev;
                var coords = {x: t.pageX, y: t.pageY };
                touch.updateResizing(coords);
                return;
            }
            else if (touch.startcell) {
                ev.preventDefault();

                if (!touch.active) {
                    window.clearTimeout(touch.timeout);
                    return;
                }

                var coords = touch.getCellCoords(ev);
                //calendar._touchMsg("coords: " + coords.x + "/" + coords.y);
                touch.extendSelection(coords);
            }

            touch.preventEventTap = true;
        };

        this._touch.relativeCoords = function(ev) {
            var ref = calendar.nav.main;

            var x = ev.touches ? ev.touches[0].pageX : ev.pageX;
            var y = ev.touches ? ev.touches[0].pageY : ev.pageY;

            var abs = DayPilot.abs(ref);
            var coords = {x: x - abs.x, y: y - abs.y, "toString": function() { return "x: " + this.x + ", y:" + this.y; } };
            return coords;
        };


        this._touch.onMainTouchEnd = function(ev) {

            if (DayPilot.Util.isMouseEvent(ev)) {
                return;
            }

            if (DayPilot.Global.moving) {
                touch.active = false;

                // testing: disabled
                ev.preventDefault();
                ev.stopPropagation();

                var top = DayPilotCalendar.movingShadow.offsetTop;

                // DayPilotCalendar.deleteShadow(DayPilotCalendar.movingShadow);
                // DayPilot.de(DayPilotCalendar.movingShadow);
                var dpEvent = DayPilot.Global.moving.event;
                var calendar = dpEvent.calendar;
                calendar._deleteShadow(DayPilotCalendar.movingShadow);
                var newColumnIndex = DayPilotCalendar.movingShadow.column;


                var args = DayPilotCalendar.movingShadow;

                // stop moving on the client
                DayPilot.Global.moving = null;
                DayPilotCalendar.movingShadow = null;

                if (!args.allowed) {
                    return;
                }

                dpEvent.calendar._eventMoveDispatch(dpEvent, newColumnIndex, top, ev, DayPilotCalendar.drag);
            }
            else if (touch.startcell) {

                if (!touch.active) {
                    window.clearTimeout(touch.timeout);  // not sure
                    return;
                }

                ev.preventDefault();

                touch.startcell = null;

                var sel = calendar.getSelection();
                sel.toString = function() {
                    return "start: " + this.start + "\nend: " + this.end;
                };
                calendar._timeRangeSelectedDispatch(sel.start, sel.end, sel.resource);

                // prevent alert-initiated touchstart on iOS
                window.setTimeout(function() {
                    touch.active = false;
                }, 500);

            }
        };

        this._touch.onEventTouchMove = function(ev) {
            // don't call ev.stopPropagation() here, it would prevent moving the event shadow
            touch.preventEventTap = true;
        };

        this._touch.onEventTouchEnd = function(ev) {

            if (DayPilot.Util.isMouseEvent(ev)) {
                return;
            }

            // quick tap
            if (!touch.active) {
                if (touch.preventEventTap) {
                    return;
                }
                // disabled to test double click
                // ev.preventDefault();
                window.clearTimeout(touch.timeout);
                calendar._eventClickSingle(this, false, false, ev);
                return;
            }

            touch.active = false;
            if (touch.timeout) {
                window.clearTimeout(touch.timeout);
                return;
            }
            // disabled to test double click
            // ev.preventDefault();
        };

        this._onEventMouseMove = function(ev) {
            // const
            var resizeMargin = 5;
            // var moveMargin = Math.max(calendar.durationBarWidth, 10);
            var moveMargin = 10;
            var w = 5;

            var header = (calendar.moveBy === 'Top');

            if (typeof (DayPilotCalendar) === 'undefined') {
                return;
            }

            // position
            var offset = DayPilot.mo3(this, ev);

            if (!offset) {
                return;
            }

            calendar.eventOffset = offset;

            var div = this;
            if (!div.active) {
/*
                var areas = [];
                if (div.event.client.deleteEnabled()) {
                    areas.push({"action":"JavaScript","v":"Hover","w":17,"h":17,"top":2,"right":2, "css": calendar._prefixCssClass("_event_delete"),"js":function(e) { calendar._eventDeleteDispatch(e); } });
                }

                var dragActive = DayPilot.Global.moving || DayPilot.Global.resizing || DayPilot.Global.selecting;
                if (!dragActive) {
                    DayPilot.Areas.showAreas(div, div.event, null, areas);
                }
*/

                DayPilot.Util.addClass(div, calendar._prefixCssClass("_event_hover"));
                //DayPilot.Areas.showAreas(div, this.event);
            }

            if (DayPilot.Global.resizing || DayPilot.Global.moving) {
                return;
            }

            var isFirstPart = this.isFirst;
            var isLastPart = this.isLast;

            if (calendar.moveBy === "Disabled" || calendar.moveBy === "None") {
                return;
            }

            if (!header && offset.x <= moveMargin && this.event.client.moveEnabled()) {
                if (isFirstPart) {
                    this.style.cursor = 'move';
                }
                else {
                    this.style.cursor = 'not-allowed';
                }
            }
            else if (!header && offset.y <= resizeMargin && this.event.client.resizeEnabled()) {
                if (isFirstPart) {
                    this.style.cursor = "n-resize";
                    this.dpBorder = 'top';
                }
                else {
                    this.style.cursor = 'not-allowed';
                }
            }
            else if (header && offset.y <= moveMargin && this.event.client.moveEnabled()) {
                this.style.cursor = "move";
            }
            else if (this.offsetHeight - offset.y <= resizeMargin && this.event.client.resizeEnabled()) {
                if (isLastPart) {
                    this.style.cursor = "s-resize";
                    this.dpBorder = 'bottom';
                }
                else {
                    this.style.cursor = 'not-allowed';
                }
            }
            else if (!DayPilot.Global.resizing && !DayPilot.Global.moving) {
                if (this.event.client.clickEnabled())
                    this.style.cursor = 'pointer';
                else
                    this.style.cursor = 'default';
            }

            if (typeof (DayPilot.Bubble) !== 'undefined' && calendar.bubble && calendar.eventHoverHandling !== 'Disabled') {
                if (this.style.cursor === 'default' || this.style.cursor === 'pointer') {
                    var notMoved = this._lastOffset && offset.x === this._lastOffset.x && offset.y === this._lastOffset.y;
                    if (!notMoved) {
                        this._lastOffset = offset;
                        calendar.bubble.showEvent(this.event);
                    }
                    //calendar.bubble.showEvent(this.event);
                }
                else {
                    // disabled, hiding on click
                    //DayPilotBubble.hideActive();
                }
            }


        };

        this._onEventMouseOut = function(ev) {
            DayPilot.Util.removeClass(this, calendar._prefixCssClass("_event_hover"));
            if (calendar.bubble) {
                calendar.bubble.hideOnMouseOut();
            }

            DayPilot.Areas.hideAreas(this, ev);

        };

        this._currentTimeTimeout = null;

        this._showCurrentTime = function() {
            if (this.showCurrentTime) {
                this._clearSeparators();
                var time = new DayPilot.Date().addMinutes(calendar.showCurrentTimeOffset);
                if (calendar.showCurrentTimeMode === "Full") {
                    this._drawSeparatorWide(time);
                }
                else if (calendar.showCurrentTimeMode === "Day") {
                    this._drawSeparator(time);
                }
                else {
                    throw "Invalid DayPilot.Calendar.showCurrentTimeMode value: " + calendar.showCurrentTimeMode;
                }

                if (this.nav.events && !this._currentTimeTimeout) {  // not disposed
                    var refreshIntervalSeconds = 30;
                    this._currentTimeTimeout = setTimeout(function() {
                        calendar._currentTimeTimeout = null;
                        calendar._showCurrentTime();
                    }, refreshIntervalSeconds * 1000);
                }
            }
        };

        this._clearSeparators = function() {
            DayPilot.de(calendar.elements.separators);
            calendar.elements.separators = [];
        };

        this._drawSeparator = function(date) {
            var ticks = date.getTime();
            var main = calendar.nav.events;

            if (!main) {
                return;
            }

            for(var i = 0; i < calendar._columnsBottom.length; i++) {
                var col = calendar._columnsBottom[i];

                var duration = calendar._duration(true);
                var colStart = new DayPilot.Date(col.start).addHours(this._visibleStart(true));
                var colStartTicks = colStart.getTime();
                var colEnd = colStart.addTime(duration);
                var colEndTicks = colEnd.getTime();

                if (colStartTicks <= ticks && ticks <= colEndTicks) {
                    var partStartPixels = this._getPixels(date, col.start).top - 1 - calendar._autoHiddenPixels();
                    var cell = main.rows[0].cells[i];
                    var wrap = cell.separators;

                    var div = document.createElement("div");
                    div.style.position = "absolute";
                    div.style.top = partStartPixels + "px";
                    div.style.height = "1px";
                    div.style.left = "0px";
                    div.style.right = "0px";
                    div.className = calendar._prefixCssClass("_now");

                    wrap.insertBefore(div, wrap.firstChild);

                    calendar.elements.separators.push(div);
                }

            }
        };

        this._drawSeparatorWide = function(date) {
            var ticks = date.getTime();
            var main = calendar.nav.events;

            if (!main) {
                return;
            }

            var col = calendar._columnsBottom[0];
            if (!col) {
                return;
            }
            var adjustedDate = col.start.getDatePart().addTime(date.getTimePart());
            var partStartPixels = this._getPixels(adjustedDate, col.start).top - 1;

            for(var i = 0; i < calendar._columnsBottom.length; i++) {
                var col = calendar._columnsBottom[i];

                var duration = calendar._duration(true);
                var colStart = new DayPilot.Date(col.start).addHours(this._visibleStart(true));
                var colStartTicks = colStart.getTime();
                var colEnd = colStart.addTime(duration);
                var colEndTicks = colEnd.getTime();

                if (colStartTicks <= ticks && ticks <= colEndTicks) {
                    var div = document.createElement("div");
                    div.style.position = "absolute";
                    div.style.top = partStartPixels + "px";
                    div.style.height = "1px";
                    div.style.left = "0px";
                    div.style.right = "0px";
                    div.className = calendar._prefixCssClass("_now");

                    calendar.nav.events.appendChild(div);

                    calendar.elements.separators.push(div);

                    return;
                }

            }

        };

        this._loadEvents = function(events) {

            if (!events) {
                events = this.events.list;
            }
            else {
                this.events.list = events;
            }

            if (!events) {
                return;
            }


            this._allDay = {};
            this._allDay.events = [];
            this._allDay.lines = [];

            var length = events.length;
            var duration = this._duration(true);

            this._cache.pixels = {};

            var loadCache = [];

            this._scrollLabels = [];

            this._minStart = 10000;
            this._maxEnd = 0;

            // make sure it's DayPilot.Date
            this.startDate = new DayPilot.Date(this.startDate);

            for (var i = 0; i < length; i++) {
                var e = events[i];


                if (typeof e !== "object") {
                    throw new DayPilot.Exception("Event data item must be an object");
                }
                if (!e.start) {
                    throw new DayPilot.Exception("Event data item must specify 'start' property");
                }

                e.start = new DayPilot.Date(e.start);
                e.end = new DayPilot.Date(e.end);
            }

            if (typeof this.onBeforeEventRender === 'function' || calendar.showEventStartEnd) {  // make sure .html is pregenerated for showEventStartEnd
                for (var i = 0; i < length; i++) {
                    //var e = events[i];
                    this._doBeforeEventRender(i);
                }
            }

            var isResourcesView = this.viewType === 'Resources';

            var visible = this._getVisibleRange();

            var allStart = visible.start;
            var allEnd = visible.end;

            //calendar.debug.message("allStart: " + allStart);

            for (var i = 0; i < this._columnsBottom.length; i++) {
                var scroll = {};
                scroll.minEnd = 1000000;
                scroll.maxStart = -1;
                this._scrollLabels.push(scroll);

                var col = this._columnsBottom[i];
                col.events = [];
                col.lines = [];
                col.blocks = [];

                var colStart = new DayPilot.Date(col.start).addHours(this._visibleStart(true));
                var colStartTicks = colStart.getTime();
                var colEnd = colStart.addTime(duration);
                var colEndTicks = colEnd.getTime();

                if (isResourcesView) {
                    allStart = colStart.getDatePart();
                    allEnd = colStart.addDays(1);
                }

                for (var j = 0; j < length; j++) {
                    if (loadCache[j]) {
                        continue;
                    }

                    var e = events[j];

                    var cache = null;
                    if (typeof calendar.onBeforeEventRender === 'function') {
                        //var index = DayPilot.indexOf(calendar.events.list, e);
                        cache = calendar._cache.events[j];
                    }

                    if (cache) {
                        if (cache.hidden) {
                            continue;
                        }
                    }
                    else if (e.hidden) {
                        continue;
                    }

                    var start = e.start;
                    var end = e.end;

                    var startTicks = start.getTime();
                    var endTicks = end.getTime();

                    if (endTicks < startTicks) {  // skip invalid events
                        continue;
                    }

                    if (e.allday) {
                        var belongsHere = false;

                        if (startTicks === endTicks) {
                            belongsHere = !(endTicks < allStart.getTime() || startTicks >= allEnd.getTime());
                        }
                        else if (calendar.allDayEnd === 'Date') {
                            belongsHere = !(endTicks < allStart.getTime() || startTicks >= allEnd.getTime());
                        }
                        else {
                            belongsHere = !(endTicks <= allStart.getTime() || startTicks >= allEnd.getTime());
                        }

                        if (isResourcesView) {
                            belongsHere = belongsHere && (e.resource === col.id || col.id === "*");
                        }

                        if (belongsHere) {
                            var ep = new DayPilot.Event(e, this);
                            ep.part.start = allStart.getTime() < startTicks ? start : allStart;
                            ep.part.end = allEnd.getTime() > endTicks ? end : allEnd;
                            ep.part.colStart = DayPilot.DateUtil.daysDiff(allStart, ep.part.start);
                            ep.part.colWidth = DayPilot.DateUtil.daysSpan(ep.part.start, ep.part.end) + 1;

                            if (isResourcesView) {
                                ep.part.colStart = i;
                                ep.part.colWidth = 1;
                            }

                            if (typeof calendar.onEventFilter === "function" && calendar.events._filterParams) {
                                var args = {};
                                args.filter = calendar.events._filterParams;
                                args.visible = true;
                                args.e = ep;

                                calendar.onEventFilter(args);

                                if (!args.visible) {
                                    continue;
                                }
                            }

                            this._allDay.events.push(ep);

                            if (typeof this.onBeforeEventRender === 'function' || calendar.showEventStartEnd) {
                                ep.cache = this._cache.events[j];
                            }

                            // always put into cache, it can have just one box
                            loadCache[j] = true;

                            if (isResourcesView && (ep.part.start.getTime() !== startTicks || ep.part.end.getTime() !== endTicks)) {
                                loadCache[j] = false;
                            }

                        }

                        continue;
                    }

                    var cache = null;
                    if (typeof calendar.onBeforeEventRender === 'function') {
                        //var index = DayPilot.indexOf(calendar.events.list, e);
                        cache = calendar._cache.events[j];
                    }

                    if (cache) {
                        if (cache.hidden) {
                            continue;
                        }
                    }
                    else if (e.hidden) {
                        continue;
                    }

                    // belongs here
                    var belongsHere = false;
                    if (isResourcesView) {
                        belongsHere = (col.id === e.resource) && !(endTicks <= colStartTicks || startTicks >= colEndTicks);
                    }
                    else {
                        belongsHere = !(endTicks <= colStartTicks || startTicks >= colEndTicks) || (endTicks === startTicks && startTicks === colStartTicks);
                    }

                    if (belongsHere) {

                        var ep = new DayPilot.Event(e, calendar);
                        ep.part.dayIndex = i;
                        ep.part.start = colStartTicks < startTicks ? start : colStart;
                        ep.part.end = colEndTicks > endTicks ? end : colEnd;

                        var partStartPixels = this._getPixels(ep.part.start, col.start);
                        var partEndPixels = this._getPixels(ep.part.end, col.start);

                        var top = partStartPixels.top;
                        var bottom = partEndPixels.top;

                        // events in the hidden areas
                        if (top === bottom && (partStartPixels.cut || partEndPixels.cut)) {
                            continue;
                        }

                        ep.part.box = resolved.useBox(endTicks - startTicks);

                        var _startOffset = 0;
                        // continue here **************************
                        if (ep.part.box) {
                            var boxBottom = partEndPixels.boxBottom;

                            ep.part.top = Math.floor(top / this.cellHeight) * this.cellHeight + _startOffset;
                            //ep.Height = Math.max(Math.ceil(boxBottom / this.cellHeight) * this.cellHeight - ep.Top, this.cellHeight - 1) + 1;
                            ep.part.height = Math.max(Math.ceil(boxBottom / this.cellHeight) * this.cellHeight - ep.part.top, this.cellHeight - 1);
                            ep.part.barTop = Math.max(top - ep.part.top - 1, 0);  // minimum 0
                            ep.part.barHeight = Math.max(bottom - top - 2, 1);  // minimum 1
                        }
                        else {
                            ep.part.top = top + _startOffset;
                            ep.part.height = Math.max(bottom - top, 0);
                            ep.part.barTop = 0;
                            ep.part.barHeight = Math.max(bottom - top - 2, 1);
                        }

                        if (typeof calendar.onEventFilter === "function" && calendar.events._filterParams) {
                            var args = {};
                            args.filter = calendar.events._filterParams;
                            args.visible = true;
                            args.e = ep;

                            calendar.onEventFilter(args);

                            if (!args.visible) {
                                continue;
                            }
                        }

                        var start = ep.part.top;
                        var end = ep.part.top + ep.part.height;

                        if (start > scroll.maxStart) {
                            scroll.maxStart = start;
                        }
                        if (end < scroll.minEnd) {
                            scroll.minEnd = end;
                        }

                        if (start < this._minStart) {
                            this._minStart = start;
                        }
                        if (end > this._maxEnd) {
                            this._maxEnd = end;
                        }
                        col.events.push(ep);

                        if (typeof this.onBeforeEventRender === 'function' || calendar.showEventStartEnd) {
                            ep.cache = this._cache.events[j];
                        }

                        if (ep.part.start.getTime() === startTicks && ep.part.end.getTime() === endTicks) {
                            loadCache[j] = true;
                        }
                    }
                }
            }

            // sort events inside columns
            for (var i = 0; i < this._columnsBottom.length; i++) {
                var col = this._columnsBottom[i];
                col.events.sort(this._eventComparer);

                // put into lines
                for (var j = 0; j < col.events.length; j++) {
                    var e = col.events[j];
                    col.putIntoBlock(e);
                }

                for (var j = 0; j < col.blocks.length; j++) {
                    var block = col.blocks[j];
                    block.events.sort(this._eventComparerCustom);
                    for (var k = 0; k < block.events.length; k++) {
                        var e = block.events[k];
                        block.putIntoLine(e);
                    }
                }
            }

            // sort allday events
            this._allDay.events.sort(this._eventComparerCustom);

            this._allDay.putIntoLine = function(ep) {
                var thisCol = this;

                for (var i = 0; i < this.lines.length; i++) {
                    var line = this.lines[i];
                    if (line.isFree(ep.part.colStart, ep.part.colWidth)) {
                        line.push(ep);
                        return i;
                    }
                }

                var line = [];
                line.isFree = function(start, width) {
                    //var free = true;
                    var end = start + width - 1;
                    var max = this.length;

                    for (var i = 0; i < max; i++) {
                        var e = this[i];
                        if (!(end < e.part.colStart || start > e.part.colStart + e.part.colWidth - 1)) {
                            return false;
                        }
                    }

                    return true;
                };

                line.push(ep);

                this.lines.push(line);

                return this.lines.length - 1;
            };

            for (var i = 0; i < this._allDay.events.length; i++) {
                var e = this._allDay.events[i];
                this._allDay.putIntoLine(e);
            }

            var lines = Math.max(this._allDay.lines.length, 1);
            this._cache.allDayHeaderHeight = lines * (resolved.allDayEventHeight() + 2) + 2; // overriding
        };

        this._eventComparer = function(a, b) {
            if (!a || !b || !a.start || !b.start) {
                return 0; // no sorting, invalid arguments
            }

            var byStart = a.start().ticks - b.start().ticks;
            if (byStart !== 0) {
                return byStart;
            }

            var byEnd = b.end().ticks - a.end().ticks; // desc
            return byEnd;
        };

        this._eventComparerCustom = function(a, b) {
            if (!a || !b) {
                //calendar.debug("no sorting, invalid arguments");
                return 0; // no sorting, invalid arguments
            }

            if (!a.data || !b.data || !a.data.sort || !b.data.sort || a.data.sort.length === 0 || b.data.sort.length === 0) { // no custom sorting, using default sorting (start asc, end asc);
                //calendar.debug("using default comparer: " + a.Sort + ' ' + b.Sort);
                return calendar._eventComparer(a, b);
            }
            //calendar.debug("using custom comparer");

            var result = 0;
            var i = 0;
            while (result === 0 && typeof a.data.sort[i] !== "undefined" && typeof b.data.sort[i] !== "undefined") {
                if (a.data.sort[i] === b.data.sort[i]) {
                    result = 0;
                }
                else if (typeof a.data.sort[i] === "number" && typeof b.data.sort[i] === "number") {
                    result = a.data.sort[i] - b.data.sort[i];
                }
                else {
                    result = calendar._stringComparer(a.data.sort[i], b.data.sort[i], calendar.sortDirections[i]);
                }
                i++;
            }

            return result;
        };

        this._stringComparer = function(a, b, direction) {
            var asc = (direction !== "desc");
            var aFirst = asc ? -1 : 1;
            var bFirst = -aFirst;

            if (a === null && b === null) {
                return 0;
            }
            // nulls first
            if (b === null) { // b is smaller
                return bFirst;
            }
            if (a === null) {
                return aFirst;
            }

            //return asc ? a.localeCompare(a, b) : -a.localeCompare(a, b);

            var ar = [];
            ar[0] = a;
            ar[1] = b;

            ar.sort();

            return a === ar[0] ? aFirst : bFirst;
        };

        this._findEventDiv = function(e) {
            for (var i = 0; i < calendar.elements.events.length; i++) {
                var div = calendar.elements.events[i];
                if (div.event === e || div.event.data === e.data) {
                    return div;
                }
            }
            return null;
        };

        this.events.find = function(id) {
            if (!calendar.events.list || typeof calendar.events.list.length === 'undefined') {
                return null;
            }

            var len = calendar.events.list.length;
            for (var i = 0; i < len; i++) {
                if (calendar.events.list[i].id === id) {
                    return new DayPilot.Event(calendar.events.list[i], calendar);
                }
            }
            return null;
        };

        this.events.findRecurrent = function(masterId, time) {
            if (!calendar.events.list || typeof calendar.events.list.length === 'undefined') {
                return null;
            }
            var len = calendar.events.list.length;
            for (var i = 0; i < len; i++) {
                if (calendar.events.list[i].recurrentMasterId === masterId && calendar.events.list[i].start.getTime() === time.getTime()) {
                    return new DayPilot.Event(calendar.events.list[i], calendar);
                }
            }
            return null;
        };

        this.events.all = function() {
            var list = [];
            for (var i = 0; i < calendar.events.list.length; i++) {
                var e = new DayPilot.Event(calendar.events.list[i], calendar);
                list.push(e);
            }
            return DayPilot.list(list);
        };

        this.events.edit = function(e) {
            function startEditing() {
                var div = calendar._findEventDiv(e);
                if (!div) {
                    return;
                }
                calendar._divEdit(div);
            }
            startEditing();
            //setTimeout(startEditing);
        };


        this.events.update = function(e, data) {
            var params = {};
            params.oldEvent = new DayPilot.Event(e.copy(), calendar);
            params.newEvent = new DayPilot.Event(e.temp(), calendar);

            var action = new DayPilot.Action(calendar, "EventUpdate", params, data);

            e.commit();

            if (calendar._initialized) {
                calendar._update({"eventsOnly": true});
            }

            calendar._angular.notify();

            return action;
        };


        this.events.remove = function(e, data) {

            var params = {};
            params.e = new DayPilot.Event(e.data, calendar);

            var action = new DayPilot.Action(calendar, "EventRemove", params, data);

            var index = DayPilot.indexOf(calendar.events.list, e.data);
            calendar.events.list.splice(index, 1);

            if (calendar._initialized) {
                calendar._update({"eventsOnly": true});
            }

            calendar._angular.notify();

            return action;
        };

        this.events.add = function(e, data) {

            if (!(e instanceof DayPilot.Event)) {
                e = new DayPilot.Event(e);
            }

            e.calendar = calendar;

            if (!calendar.events.list) {
                calendar.events.list = [];
            }

            calendar.events.list.push(e.data);

            var params = {};
            params.e = e;

            var action = new DayPilot.Action(calendar, "EventAdd", params, data);

            if (calendar._initialized) {
                // calendar.update();
                calendar._update({"eventsOnly": true});
            }

            calendar._angular.notify();

            return action;

        };

        this.events.filter = function(args) {
            calendar.events._filterParams = args;
            // calendar._update();
            calendar._update({"eventsOnly": true});
        };


        this.events.load = function(url, success, error) {
            var onError = function(args) {
                var largs = {};
                largs.exception = args.exception;
                largs.request = args.request;

                if (typeof error === 'function') {
                    error(largs);
                }
            };

            var onSuccess = function(args) {
                var r = args.request;
                var data;

                // it's supposed to be JSON
                try {
                    data = JSON.parse(r.responseText);
                }
                catch (e) {
                    var fargs = {};
                    fargs.exception = e;
                    onError(fargs);
                    return;
                }

                if (DayPilot.isArray(data)) {
                    var sargs = {};
                    sargs.preventDefault = function() {
                        this.preventDefault.value = true;
                    };
                    sargs.data = data;
                    if (typeof success === "function") {
                        success(sargs);
                    }

                    if (sargs.preventDefault.value) {
                        return;
                    }

                    calendar.events.list = data;
                    if (calendar._initialized) {
                        // calendar.update();
                        calendar._update({"eventsOnly": true});
                    }
                }
            };

            var usePost = calendar.eventsLoadMethod && calendar.eventsLoadMethod.toUpperCase() === "POST";

            if (usePost) {
                DayPilot.ajax({
                    "method": "POST",
                    "data": { "start": calendar.visibleStart().toString(), "end": calendar.visibleEnd().toString()},
                    "url": url,
                    "success": onSuccess,
                    "error": onError
                });
            }
            else {
                var fullUrl = url;
                var queryString = "start=" + calendar.visibleStart().toString() + "&end=" + calendar.visibleEnd().toString();
                if (fullUrl.indexOf("?") > -1) {
                    fullUrl += "&" + queryString;
                }
                else {
                    fullUrl += "?" + queryString;
                }

                DayPilot.ajax({
                    "method": "GET",
                    "url": fullUrl,
                    "success": onSuccess,
                    "error": onError
                });
            }

        };


        this.events.forRange = function(start, end) {
            start = new DayPilot.Date(start);
            end = new DayPilot.Date(end);

            return DayPilot.list(calendar.events.list).filter(function(item) {
                var estart = new DayPilot.Date(item.start);
                var eend = new DayPilot.Date(item.end);
                return DayPilot.Util.overlaps(start, end, estart, eend);
            }).map(function(item) {
                return new DayPilot.Event(item, calendar);
            });
        };


        this.events._overlaps = function(e) {
            if (!e) {
                throw new DayPilot.Exception("Error checking overlap for null (internal error)");
            }

            var data = e instanceof DayPilot.Event ? e.data : e;
            var start = new DayPilot.Date(data.start);
            var end = new DayPilot.Date(data.end);

            var overlapping = DayPilot.list(calendar.events.list).find(function(item) {
                if (calendar._isSameEvent(data, item)) {
                    return false;
                }
                if (calendar.viewType == "Resources" && data.resource !== item.resource) {
                    return false;
                }
                if (item.allday) {
                    return false;
                }
                var itemStart = new DayPilot.Date(item.start);
                var itemEnd = new DayPilot.Date(item.end);
                return DayPilot.Util.overlaps(start, end, itemStart, itemEnd);
            });
            return !!overlapping;
        };

        this._isSameEvent = function(data1, data2) {
            return DayPilot.Util.isSameEvent(data1, data2);
        };

        this._react = {};
        this._react.reactDOM = null;
        this._react.react = null;

        this.queue = {};
        this.queue.list = [];
        this.queue.list.ignoreToJSON = true;

        this.queue.add = function(action) {
            if (!action) {
                return;
            }
            if (action.isAction) {
                calendar.queue.list.push(action);
            }
            else {
                throw "DayPilot.Action object required for queue.add()";
            }
        };

        this.queue.notify = function(data) {
            var params = {};
            params.actions = calendar.queue.list;
            calendar._callBack2('Notify', params, data, "Notify");

            calendar.queue.list = [];
        };


        this.queue.clear = function() {
            calendar.queue.list = [];
        };

        this.queue.pop = function() {
            return calendar.queue.list.pop();
        };

        this._update = function(args) {

            if (!this._initialized || !this._columnsBottom) {  // not initialized yet, don't update
                return;
            }

            var args = args || {};
            var full = !args.eventsOnly;

            if (!calendar.cssOnly) {
                calendar.cssOnly = true;
            }


            if (full) {
                if (!this._serverBased()) {
                    calendar.cellProperties = {};
                }

                calendar._resolved.clearCache();

                calendar._deleteEvents();

                calendar._prepareVariables();
                calendar._prepareColumns();
                calendar._loadEvents();

                calendar._drawHeader();
                calendar._autoHeaderHeight();
                calendar._updateHeaderHeight();
                calendar._deleteScrollLabels();
                calendar._updateMessagePosition();
                calendar._hideSelection();
                calendar._drawMain();
                calendar._activateSelection();
                calendar._drawHourTable();

                calendar._updateHeight();
                calendar._fixScrollHeader();

                calendar._updateColumnWidthSpec();
                calendar._updateTheme();

                calendar._drawEvents();
                calendar._drawEventsAllDay();

                calendar._showCurrentTime();

                calendar._updateScrollLabels();
            }
            else {  // events only
                calendar._deleteEvents();
                calendar._loadEvents();
                calendar._updateHeaderHeight();
                calendar._drawEvents();
                calendar._drawEventsAllDay();
                calendar._updateScrollLabels();
            }

            if (this.visible) {
                this.show();
            }
            else {
                this.hide();
            }

        };

        this.update = function(options) {
            if (calendar._disposed) {
                throw new DayPilot.Exception("This DayPilot.Calendar instance has been disposed.");
            }


            // if not initialized yet, load the options but don't update
            if (!calendar._initialized) {
                calendar._loadOptions(options);
                return;
            }

            // selected single-property updates are optimized
            if (DayPilot.Util.isOnlyProperty(options, "events")) {
                calendar.events.list = options.events;
                calendar._update({"eventsOnly": true});
                return;
            }

            // full update
            this._loadOptions(options);
            this._update();

            if (typeof calendar.onAfterRender === 'function') {
                var args = {};
                args.isUpdate = true;
                args.data = null;

                calendar.onAfterRender(args);
            }

        };

        this._updateTheme = function() {
            // manually update theme for elements that are not redrawn during update
            //return;

            var needsUpdate = calendar.nav.top.className !== calendar._prefixCssClass("_main");

            if (!needsUpdate) {
                return;
            }

            calendar.nav.top.className = calendar._prefixCssClass("_main");
            var corner = calendar.nav.corner;
            corner.className = calendar._prefixCssClass("_corner");
            corner.firstChild.className = calendar._prefixCssClass("_corner_inner");
            var cr = calendar.nav.unifiedCornerRight;
            if (cr) {
                cr.firstChild.className = calendar._prefixCssClass("_cornerright");
                cr.firstChild.firstChild.className = calendar._prefixCssClass("_cornerright_inner");
            }
        };


        this.show = function() {
            calendar.visible = true;
            calendar.nav.top.style.display = '';
            calendar._onResize();
            calendar._fixScrollHeader();
            calendar._scroll();
        };

        this.hide = function() {
            calendar.visible = false;
            calendar.nav.top.style.display = 'none';
        };

        this._angular = {};
        this._angular.scope = null;
        this._angular.notify = function() {
            if (calendar._angular.scope) {
                calendar._angular.scope["$apply"]();
            }
        };

        this.debug = new DayPilot.Debug(this);

        this._getColumnForPixels = function(x, dontAdjustHack) {

            if (x < 0) {
                return null;
            }

            if (calendar.rtl) {
                x = calendar.nav.main.offsetWidth - x;
            }

            var i = 0;
            var cells = calendar.nav.events.rows[0].cells;

            if (DayPilot.browser.ie && !dontAdjustHack) {
                for (var j = cells.length - 1; j >= 0; j--) {
                    var cell = cells[j];
                    var width = cell.offsetWidth;
                    i += width;
                    if (x < i) {
                        return j;
                    }
                }
            }
            else {
                for (var j = 0; j < cells.length; j++) {
                    var cell = cells[j];
                    var width = cell.offsetWidth;
                    i += width;
                    if (x < i) {
                        return j;
                    }
                }
            }
            return null;
        };

        this._getPixels = function(date, start) {
            if (!start) {
                start = this.startDate;
            }

            var startTicks = start.getTime();
            var ticks = date.getTime();

            var cache = this._cache.pixels[ticks + "_" + startTicks];
            if (cache) {
                return cache;
            }

            var visibleStart = this._visibleStart(true);

            startTicks = start.addHours(this._visibleStart(true)).getTime();

            var boxTicks = this.cellDuration * 60 * 1000;
            var topTicks = ticks - startTicks;
            var boxOffsetTicks = topTicks % boxTicks;

            var boxStartTicks = topTicks - boxOffsetTicks;
            var boxEndTicks = boxStartTicks + boxTicks;
            if (boxOffsetTicks === 0) {
                boxEndTicks = boxStartTicks;
            }

            // it's linear scale so far
            var result = {};
            result.cut = false;
            result.top = this._ticksToPixels(topTicks);
            result.boxTop = this._ticksToPixels(boxStartTicks);
            result.boxBottom = this._ticksToPixels(boxEndTicks);

            this._cache.pixels[ticks + "_" + startTicks] = result;

            return result;
        };

        this._ticksToPixels = function(ticks) {
            return Math.floor((this.cellHeight * ticks) / (1000 * 60 * this.cellDuration));
        };

        this._prepareVariables = function() {
            this.startDate = new DayPilot.Date(this.startDate).getDatePart();
            this._allDayHeaderHeight = resolved.allDayEventHeight() + 4;
        };

        this._updateHeaderHeight = function() {
            var header = this._totalHeaderHeight();
            var total = this._totalHeight();
            //var scroll = total - header;

            if (this.nav.corner) {
                this.nav.corner.style.height = header + "px";
            }
            if (this.nav.cornerRight) {
                this.nav.cornerRight.style.height = header + "px";
            }
            if (this.nav.mid) {
                this.nav.mid.style.height = header + "px";
            }

            if (this.showAllDayEvents && this.nav.header) {
                var row = this.nav.header.rows[this.nav.header.rows.length - 1];
                for (var i = 0; i < row.cells.length; i++) {
                    var column = row.cells[i];
                    column.firstChild.style.height = resolved.allDayHeaderHeight() + "px";
                }
            }

            if (this.nav.upperRight) {
                this.nav.upperRight.style.height = header + "px";
            }

            this.nav.scroll.style.top = header + "px";
            this.nav.top.style.height = total + "px";
            /*
            if (this.heightSpec === "Parent100Pct") {
                this.nav.scroll.style.height = scroll + "px";
            }*/
        };

        this._updateHeight = function() {
            var sh = this._getScrollableHeight();

            if (this.nav.scroll && sh > 0) {
                this.nav.scroll.style.height = sh + "px";
                this._scrollHeight = calendar.nav.scroll.clientHeight;

                // scrolling
                if (this.nav.bottomLeft) {
                    this.nav.bottomLeft.style.height = sh + "px";
                }
                if (this.nav.bottomRight) {
                    this.nav.bottomRight.style.height = sh + "px";
                }
            }

            if (this.heightSpec === "Parent100Pct") {
                this.nav.top.style.height = "100%";
            }
            else {
                this.nav.top.style.height = this._totalHeight() + "px";
            }

        };

        this.setHeight = function(pixels) {
            if (this.heightSpec !== "Parent100Pct") {
                this.heightSpec = "Fixed";
            }
            this.height = pixels - (this._totalHeaderHeight());
            this._updateHeight();
        };

        this._getDimensionsFromCss = function(className) {
            var div = document.createElement("div");
            div.style.position = "absolute";
            div.style.top = "-2000px";
            div.style.left = "-2000px";
            div.className = this._prefixCssClass(className);

            document.body.appendChild(div);
            var height = div.offsetHeight;
            var width = div.offsetWidth;
            document.body.removeChild(div);

            var result = {};
            result.height = height;
            result.width = width;
            return result;
        };

        this._resolved = {};

        var resolved = this._resolved;

        resolved.locale = function() {
            return DayPilot.Locale.find(calendar.locale);
        };

        resolved.weekStarts = function() {
            if (typeof calendar.weekStarts === 'number') {
                return calendar.weekStarts;
            }
            else {
                return resolved.locale().weekStarts;
            }
        };

        resolved.timeFormat = function() {
            if (calendar.timeFormat !== 'Auto') {
                return calendar.timeFormat;
            }
            return this.locale().timeFormat;
        };

        resolved.useBox = function(durationTicks) {
            if (calendar.useEventBoxes === 'Always') {
                return true;
            }
            if (calendar.useEventBoxes === 'Never') {
                return false;
            }
            return durationTicks < calendar.cellDuration * 60 * 1000;
        };

        resolved.notifyType = function() {
            var type;
            if (calendar.notifyCommit === 'Immediate') {
                type = "Notify";
            }
            else if (calendar.notifyCommit === 'Queue') {
                type = "Queue";
            }
            else {
                throw "Invalid notifyCommit value: " + calendar.notifyCommit;
            }

            return type;
        };

        resolved.clearCache = function() {
            delete calendar._cache.allDayEventHeight;
            delete calendar._cache.allDayHeaderHeight;
            delete calendar._cache.headerHeight;
        };


        resolved.allDayEventHeight = function() {
            if (calendar._cache.allDayEventHeight) {
                return calendar._cache.allDayEventHeight;
            }
            var height = calendar._getDimensionsFromCss("_alldayevent_height").height;
            if (!height) {
                height = calendar.allDayEventHeight;
            }
            calendar._cache.allDayEventHeight = height;
            return height;
        };

        resolved.allDayHeaderHeight = function() {
            if (calendar._cache.allDayHeaderHeight) {
                return calendar._cache.allDayHeaderHeight;
            }
            var height = calendar._allDayHeaderHeight;
            calendar._cache.allDayHeaderHeight = height;
            return height;
        };

        resolved.headerHeight = function() {
            if (calendar._cache.headerHeight) {
                return calendar._cache.headerHeight;
            }
            var height = calendar._getDimensionsFromCss("_header_height").height;
            if (!height) {
                height = calendar.headerHeight;
            }
            calendar._cache.headerHeight = height;
            return height;
        };


        // export
        this.exportAs = function(format, options) {
            if (!calendar._visible()) {
                throw new DayPilot.Exception("DayPilot.Calendar.exportAs(): The instance must be visible during export.");
            }

            var board = img.generate(format, options);
            return new DayPilot.Export(board);
        };

        this._img = {};
        var img = this._img;

        img._options = null;
        img._mode = null;

        // ff, ch, ie 9+
        img.generate = function(format, options) {

            /*
            area: "viewport" | "range" | "full"
            scale: number
            quality: number (JPEG only)
            width: number (full only)


            */

            if (typeof format === "object") {
                options = format;
                format = null;
            }

            var options = options || {};
            var format = format || options.format || "svg";
            var scale = options.scale || 1;

            if (format === "config") {
                return;
            }

            // backwards compatibility
            if (format.toLowerCase() === "jpg") {
                format = "jpeg";
            }

            var mode = options.area || "viewport";
            img._options = options;
            img._mode = mode;

            // make sure event positions are calculated
            /*img.getRows().each(function(row) {
             calendar._updateEventPositionsInRow(row);
             });*/

            var width = img.getWidth();
            var height = img.getHeight();

            var board;
            switch (format.toLowerCase()) {
                case "svg":
                    board = new DayPilot.Svg(width, height);
                    break;
                case "png":
                    board = new DayPilot.Canvas(width, height, "image/png", scale);
                    break;
                case "jpeg":
                    board = new DayPilot.Canvas(width, height, "image/jpeg", scale, options.quality);
                    break;
                default:
                    throw "Export format not supported: " + format;
            }

            var rectangles = img.getRectangles();

            // main
            var backColor = new DayPilot.StyleReader(calendar.nav.top).getBackColor();
            var borderColor = new DayPilot.StyleReader(calendar.nav.top).get("border-top-color");
            var visible = new DayPilot.StyleReader(calendar.nav.top).get("border-top-width") !== "0px";
            if (!visible) {
                borderColor = "white";
            }
            var cornerBackground = new DayPilot.StyleReader(calendar.nav.corner.firstChild).getBackColor(backColor);

            // hours
            var hourHeader = calendar.nav.hourTable.rows[0].cells[0].firstChild.firstChild;
            var dividerColor = new DayPilot.StyleReader(hourHeader).get("border-right-color");
            var hourHeaderBackColor = new DayPilot.StyleReader(hourHeader).getBackColor(backColor);
            var hourHeaderFont = new DayPilot.StyleReader(hourHeader).getFont();
            var hourHeaderSupFont = new DayPilot.StyleReader(hourHeader.firstChild.childNodes[1]).getFont();
            var hourHeaderSupPaddingRight = new DayPilot.StyleReader(hourHeader.firstChild.childNodes[1]).getPx("padding-right");
            var hourHeaderColor = new DayPilot.StyleReader(hourHeader).get("color");

            // columns
            var timeHeader = calendar.nav.header.rows[0].cells[0].firstChild.firstChild;
            var timeHeaderBackground = new DayPilot.StyleReader(timeHeader).getBackColor(backColor);
            var timeHeaderFont = new DayPilot.StyleReader(timeHeader).getFont();
            var timeHeaderColor = new DayPilot.StyleReader(timeHeader).get("color");
            var timeHeaderBorderColor = new DayPilot.StyleReader(timeHeader).get("border-right-color");

            // all-day
            var allDayHeaderParent = calendar.nav.header.rows[calendar.nav.header.rows.length - 1].cells[0].firstChild;
            var allDayHeader = allDayHeaderParent.firstChild;
            var allDayHeaderParentBack = new DayPilot.StyleReader(allDayHeaderParent).getBackColor(backColor);
            var allDayHeaderBackground = new DayPilot.StyleReader(allDayHeader).getBackColor(allDayHeaderParentBack);

            // cells
            var cell = calendar.nav.main.rows[0].cells[0].firstChild.firstChild;
            var cellBorderColor = new DayPilot.StyleReader(cell).get("border-right-color");

            var cell = img.fakeCell();
            var nonBusinessBackColor = new DayPilot.StyleReader(cell.firstChild).getBackColor();
            DayPilot.Util.addClass(cell, calendar._prefixCssClass("_cell_business"));
            var businessBackColor = new DayPilot.StyleReader(cell.firstChild).getBackColor();
            // var cellFont = new DayPilot.StyleReader(cell.firstChild).getFont();
            // var cellColor = new DayPilot.StyleReader(cell.firstChild).get("color");
            DayPilot.de(cell);


            var viewportOffsetTop = img.getViewportOffsetTop();

            var colWidth = 0;
            if (calendar.columnWidthSpec === "Fixed") {
                colWidth = calendar.columnWidth;
            }
            else {
                colWidth = rectangles.gridContent.w / calendar._columnsBottom.length;
            }

            // background
            board.fillRect(rectangles.main, "white");
            board.fillRect(rectangles.main, backColor);

            // hour headers
            var top = rectangles.corner.h - viewportOffsetTop;
            DayPilot.list.for(calendar._hourRowCount(), function(i) { return calendar._hourRowProps(i); }).each(function(row) {
                var height = calendar._hourRowHeight();
                // var text = row.html;
                //var text = row.start.toString("H:mm");
                var hour = row.hour;
                var sup = row.sup;

                var text = hour;

                var supWidth = 20;

                var rect = {"x": 0, "y": top, "w": rectangles.grid.x + 1, "h": height + 1};
                var rectText = {"x": 0, "y": top, "w": rectangles.grid.x + 1 - supWidth, "h": height + 1};
                var rectTextSup = {"x": rectText.w, "y": top, "w": supWidth - hourHeaderSupPaddingRight - 1, "h": height + 1};

                var backColor = hourHeaderBackColor;
                board.fillRect(rect, backColor);
                // board.text(rectText, text, {"size": args.fontSize, "family": args.fontFamily, "style": args.fontStyle}, args.fontColor, args.horizontalAlignment);
                board.text(rectText, text, hourHeaderFont, hourHeaderColor, "right");
                board.text(rectTextSup, sup, hourHeaderSupFont, hourHeaderColor, "right");
                board.rect(rect, dividerColor);

                top += height;

            });

            var step = calendar.cellDuration * 60 * 1000;

            // cells
            var left = rectangles.grid.x;
            DayPilot.list(calendar._columnsBottom).each(function(col, x) {
                var width = colWidth;
                var top = rectangles.grid.y - viewportOffsetTop;
                // not rows
                DayPilot.list.for(calendar._rowCount()).each(function(row, y) {

                    var props = calendar._getProperties(x, y) || {};

                    var backColorDetected = null;
                    if (props.cssClass) {
                        var cell = img.fakeCell();
                        DayPilot.Util.addClass(cell, props.cssClass);
                        backColorDetected = new DayPilot.StyleReader(cell.firstChild).getBackColor();
                        DayPilot.de(cell);
                    }

                    var height = calendar.cellHeight;

                    var rect = {"x": left, "y": top, "w": width + 1, "h": height + 1};


                    var isBusiness = props.business; // this._isBusinessCell(c.start, c.end);

                    var args = {};
                    args.cell = {};
                    args.cell.start = col.start.addTime(y * step).addHours(calendar._visibleStart());
                    args.cell.end = args.cell.start.addTime(step);
                    args.cell.resource = col.id;

                    DayPilot.Util.copyProps(props, args.cell, ['cssClass', 'html', 'backImage', 'backRepeat', 'backColor', 'business']);

                    args.backColor = backColorDetected || (isBusiness ? businessBackColor : nonBusinessBackColor);

                    if (typeof calendar.onBeforeCellExport === "function") {
                        calendar.onBeforeCellExport(args);
                    }

                    board.fillRect(rect, args.backColor);
                    board.rect(rect, cellBorderColor);

                    top += height;
                });
                left += width;
            });

            // events
            var colLeft = rectangles.grid.x;
            DayPilot.list(calendar._columnsBottom).each(function(col) {

                DayPilot.list(col.events).each(function(e) {

                    var cache = e.cache || e.data;

                    // detection
                    var eventDiv = img.fakeEvent();
                    eventDiv.className += " " + cache.cssClass;
                    var barDiv = eventDiv.firstChild;
                    var eventInnerDiv = eventDiv.childNodes[1];
                    var eventBarBackColor = new DayPilot.StyleReader(barDiv).getBackColor();
                    var eventBarColor = new DayPilot.StyleReader(barDiv.firstChild).getBackColor();
                    var eventBarWidth = new DayPilot.StyleReader(barDiv.firstChild).getPx("width");

                    var eventBorderColor = new DayPilot.StyleReader(eventInnerDiv).get("border-right-color");
                    var eventFont = new DayPilot.StyleReader(eventInnerDiv).getFont();
                    var eventColor = new DayPilot.StyleReader(eventInnerDiv).get("color");
                    var eventBackColor = new DayPilot.StyleReader(eventInnerDiv).getBackColor();
                    var eventPadding = {};
                    eventPadding.left = new DayPilot.StyleReader(eventInnerDiv).getPx("padding-left");
                    eventPadding.right = new DayPilot.StyleReader(eventInnerDiv).getPx("padding-right");
                    eventPadding.top = new DayPilot.StyleReader(eventInnerDiv).getPx("padding-top");
                    eventPadding.bottom = new DayPilot.StyleReader(eventInnerDiv).getPx("padding-bottom");

                    DayPilot.de(eventDiv);
                    // END detection

                    var left = colLeft + colWidth*e.part.left/100;
                    var width = (colWidth - calendar.columnMarginRight)*e.part.width/100;
                    var top = e.part.top + rectangles.grid.y - calendar._autoHiddenPixels() - viewportOffsetTop;
                    var height = e.part.height;

                    //var cache = e.cache || e.data;
                    var backColor = cache.backColor || eventBackColor;
                    var barColor  = cache.barColor || eventBarColor;
                    var barBackColor  = cache.barBackColor || eventBarBackColor;

                    var args = {};
                    args.e = e;
                    args.text = e.text ? e.text() : e.client.html();
                    // args.text = e.client.html();
                    args.fontSize = eventFont.size;
                    args.fontFamily = eventFont.family;
                    args.fontStyle = eventFont.style;
                    args.fontColor = eventColor;
                    args.backColor = backColor;
                    args.borderColor = eventBorderColor;
                    args.horizontalAlignment = "left";
                    args.barWidth = eventBarWidth;
                    args.barColor = barColor;
                    args.barBackColor = barBackColor;

                    if (typeof calendar.onBeforeEventExport === "function") {
                        calendar.onBeforeEventExport(args);
                    }

                    var rect = {"x": left, "y": top, "w": width + 1, "h": height + 1};

                    var rectInner = DayPilot.Util.copyProps(rect);

                    if (e.client.barVisible()) {
                        rectInner.x += eventBarWidth;
                        rectInner.w -= eventBarWidth;
                    }

                    var rectText = DayPilot.Util.copyProps(rectInner);
                    rectText.x += eventPadding.left;
                    rectText.w -= eventPadding.left + eventPadding.right;
                    rectText.y += eventPadding.top;
                    rectText.h -= eventPadding.top + eventPadding.bottom;

                    board.fillRect(rect, args.backColor);
                    if (e.client.barVisible()) {
                        var rectBar = {"x": rect.x, "y": rect.y, "w": args.barWidth, "h": rect.h};
                        var rectBarInner = {"x": rect.x, "y": rect.y + 1 + e.part.barTop, "w": args.barWidth, "h": e.part.barHeight + 1};

                        board.fillRect(rectBar, args.barBackColor);
                        board.fillRect(rectBarInner, args.barColor);
                    }

                    board.text(rectText, args.text, {"size": args.fontSize, "family": args.fontFamily, "style": args.fontStyle}, args.fontColor, args.horizontalAlignment);
                    board.rect(rect, args.borderColor);

                    var left = rect.x;
                    var right = rect.x + rect.w - 2;
                    var top = rect.y;

                    DayPilot.list(cache.areas).each(function(area) {

                        if (!DayPilot.Areas.isVisible(area)) {
                            return;
                        }

                        var areaLeft = area.left;
                        if (area.start) {
                            areaLeft = calendar.getPixels(new DayPilot.Date(area.start)).left - e.part.left;
                        }

                        var width = area.width || area.w;
                        var height = area.height || area.h;

                        if (!areaLeft) {
                            areaLeft = right - width - left;
                        }


                        if (area.right) {
                            width = (e.part.width - area.right) - areaLeft;
                        }
                        else if (area.end) {
                            width = calendar.getPixels(new DayPilot.Date(area.end)).left - area.left - e.part.left + 1;
                        }
                        var areaTop = area.top;

                        if (typeof area.bottom === "number") {
                            height = (e.part.height - area.bottom) - areaTop;
                        }

                        var rect = {"x": left + areaLeft, "y": top + areaTop, "w": width, "h": height};

                        if (area.backColor) {
                            board.fillRect(rect, area.backColor);
                        }
                        if (area.image) {
                            var img = new Image();
                            img.src = area.image;
                            board.image(rect, img);
                        }
                        else if (area.html) {
                            board.text(rect, area.html, {"size": args.fontSize, "family": args.fontFamily, "style": args.fontStyle} , area.fontColor || args.fontColor, null, area.padding);
                        }

                    });

                });

                colLeft += colWidth;
            });

            // corner
            board.fillRect(rectangles.corner, cornerBackground);

            // draw column headers
            // var fixed = this.columnWidthSpec === 'Fixed';
            var colwbase = 1;
            if (calendar.columnWidthSpec !== "Fixed") {
                colwbase = rectangles.gridContent.w/100;
            }

            // column headers
            DayPilot.list.for(calendar.headerLevels).each(function(level) {
                var left = rectangles.gridContent.x;
                var top = calendar.headerHeight * level;
                //var columns = calendar._generateColumns() ? calendar._columnsBottom : calendar._columns;
                var columns = calendar._getColumns(level + 1);
                var coldims = calendar._getColSpans(level);

                DayPilot.list(columns).forEach(function(col, i) {

                    // col properties:
                    // DayPilot.Util.copyProps(data, args.header, ['id', 'start', 'name', 'html', 'backColor', 'toolTip', 'areas', 'children']);
                    // this.onBeforeHeaderRender(args);
                    // DayPilot.Util.copyProps(args.header, data, ['html', 'backColor', 'toolTip', 'areas']);

                    var args = {};
                    args.text = DayPilot.Util.stripTags(col.html);
                    args.horizontalAlignment = "center";
                    args.backColor = col.backColor || timeHeaderBackground;
                    args.fontSize = timeHeaderFont.size;
                    args.fontFamily = timeHeaderFont.family;
                    args.fontStyle = timeHeaderFont.style;
                    args.fontColor = timeHeaderColor;
                    args.header = {};
                    args.header.level = level;
                    DayPilot.Util.copyProps(col, args.header, ['id', 'start', 'name', 'html', 'backColor']);

                    if (typeof calendar.onBeforeHeaderExport === "function") {
                        calendar.onBeforeHeaderExport(args);
                    }

                    var lastrow = coldims.length === 0;

                    var width = lastrow  ? colWidth : coldims[i].width * colwbase;
                    var x = lastrow ? left : left + coldims[i].left * colwbase;
                    var height = calendar.headerHeight;

                    var cellRect = {"x": x, "y": top, "w": width + 1, "h": height + 1};

                    board.fillRect(cellRect, args.backColor);
                    board.rect(cellRect, timeHeaderBorderColor);
                    board.text(cellRect, args.text, {"size": args.fontSize, "family": args.fontFamily, "style": args.fontStyle}, args.fontColor, args.horizontalAlignment);

                    if (lastrow) {
                        left += colWidth;
                    }
                });
            });

            // all-day events
            (function() {
                if (!calendar.showAllDayEvents) {
                    return;
                }

                // header
                var top = calendar.headerHeight * calendar.headerLevels;
                var left = rectangles.gridContent.x;
                DayPilot.list(calendar._columnsBottom).each(function(col) {
                    var width = colWidth;
                    var height = resolved.allDayHeaderHeight();

                    var cellRect = {"x": left, "y": top, "w": width + 1, "h": height + 1};

                    // var text = col.html;

                    board.fillRect(cellRect, allDayHeaderBackground);
                    board.rect(cellRect, timeHeaderBorderColor);

                    left += colWidth;

                });

                // all-day events
                DayPilot.list(calendar._allDay.lines).each(function(line, j) {
                    DayPilot.list(line).each(function(e) {

                        // detection
                        var eventDiv = img.fakeEvent("alldayevent");
                        eventDiv.className += " " + e.data.cssClass;
                        // var barDiv = eventDiv.firstChild;
                        var eventInnerDiv = eventDiv.firstChild;
                        // var eventBarBackColor = new DayPilot.StyleReader(barDiv).getBackColor();
                        // var eventBarColor = new DayPilot.StyleReader(barDiv.firstChild).getBackColor();
                        // var eventBarWidth = new DayPilot.StyleReader(barDiv.firstChild).getPx("width");

                        var eventBorderColor = new DayPilot.StyleReader(eventInnerDiv).get("border-right-color");
                        var eventFont = new DayPilot.StyleReader(eventInnerDiv).getFont();
                        var eventColor = new DayPilot.StyleReader(eventInnerDiv).get("color");
                        var eventBackColor = new DayPilot.StyleReader(eventInnerDiv).getBackColor();
                        var eventPadding = {};
                        eventPadding.left = new DayPilot.StyleReader(eventInnerDiv).getPx("padding-left");
                        eventPadding.right = new DayPilot.StyleReader(eventInnerDiv).getPx("padding-right");
                        eventPadding.top = new DayPilot.StyleReader(eventInnerDiv).getPx("padding-top");
                        eventPadding.bottom = new DayPilot.StyleReader(eventInnerDiv).getPx("padding-bottom");

                        DayPilot.de(eventDiv);
                        // END detection

                        var cache = e.cache || e.data;
                        var backColor = cache.backColor || eventBackColor;

                        var args = {};
                        args.e = e;
                        args.text = e.text ? e.text() : e.client.html();
                        args.fontSize = eventFont.size;
                        args.fontFamily = eventFont.family;
                        args.fontStyle = eventFont.style;
                        args.fontColor = eventColor;
                        args.backColor = backColor;
                        args.borderColor = eventBorderColor;
                        args.horizontalAlignment = "left";

                        if (typeof calendar.onBeforeEventExport === "function") {
                            calendar.onBeforeEventExport(args);
                        }

                        // var left = (100.0 * data.part.colStart / columns) + "%";
                        var left = e.part.colStart * colWidth + rectangles.gridContent.x + 2;
                        var width = e.part.colWidth * colWidth - 4;
                        var height = resolved.allDayEventHeight() - 1;
                        var top = (calendar.headerLevels * resolved.headerHeight() + j * (resolved.allDayEventHeight())) + 2;

                        var rect = {"x": left, "y": top, "w": width, "h": height};
                        var rectText = DayPilot.Util.copyProps(rect);
                        rectText.x += eventPadding.left;
                        rectText.w -= eventPadding.left + eventPadding.right;
                        rectText.y += eventPadding.top;
                        rectText.h -= eventPadding.top + eventPadding.bottom;

                        board.fillRect(rect, args.backColor);
                        //var text = e.client.html();

                        board.text(rectText, args.text, {"size": args.fontSize, "family": args.fontFamily, "style": args.fontStyle}, args.fontColor, args.horizontalAlignment);
                        board.rect(rect, args.borderColor);
                    });
                });
            })();


            // frame
            board.rect(rectangles.main, borderColor);
            board.line(rectangles.grid.x, 0, rectangles.grid.x, rectangles.main.h, dividerColor);
            board.line(0, rectangles.grid.y, rectangles.main.w, rectangles.grid.y, dividerColor);

            return board;

        };

        img.fakeCell = function() {
            var div = document.createElement("div");
            div.style.display = "none";
            div.className = calendar._prefixCssClass("_cell");

            div.style.position = "absolute";
            div.style.top = "-2000px";
            div.style.left = "-2000px";

            var inner = document.createElement("div");
            inner.className = calendar._prefixCssClass("_cell_inner");
            div.appendChild(inner);

            // calendar.divCells.appendChild(div);
            //var c = calendar.nav.main.rows[0].insertCell(-1);

            calendar.nav.bottomRight.appendChild(div);

            return div;
        };


        img.fakeEvent = function(type) {
            type = type || "event";   // "event" | "alldayevent"

            var div = document.createElement("div");
            div.style.position = "absolute";
            div.style.top = "-2000px";
            div.style.left = "-2000px";
            div.style.display = "none";
            div.className = calendar._prefixCssClass("_" + type);

            if (type === "event") {
                var bar = document.createElement("div");
                bar.className = calendar._prefixCssClass("_event_bar");
                var barInner = document.createElement("div");
                barInner.className = calendar._prefixCssClass("_event_bar_inner");
                bar.appendChild(barInner);
                div.appendChild(bar);
            }

            var inner = document.createElement("div");
            inner.className = calendar._prefixCssClass("_" + type + "_inner");
            div.appendChild(inner);

            var wrapper = calendar.nav.events.rows[0].cells[0].events;
            if (type === "alldayevent") {
                wrapper = calendar.nav.allday;
            }
            wrapper.appendChild(div);

            return div;
        };

        img.getViewportOffsetTop = function() {
            var mode = img._mode;
            switch (mode) {
                case "full":
                    return 0;
                case "viewport":
                    var scroll = calendar._scrollDiv();
                    return scroll.scrollTop;
                case "range":
                    var scroll = calendar._scrollDiv();
                    return scroll.scrollTop;
            }
        };

        img.getWidth = function() {
            var mode = img._mode;

            var fullw = calendar.nav.top.clientWidth;
            var contentw = fullw - calendar.hourWidth;
            var colCount = calendar._columnsBottom.length;
            var clientWidth = Math.floor(contentw/colCount) * colCount + calendar.hourWidth;

            switch (mode) {
                case "viewport":
                case "full":
                case "range":
                    if (typeof img._options.width === "number") {
                        return img._options.width;
                    }
                    return clientWidth;

                /*
                 case "viewport":
                 return calendar.nav.top.offsetWidth;
                 case "range":
                 return calendar.getPixels(img.getRangeEnd()).boxRight - calendar.getPixels(img.getRangeStart()).boxLeft + img.getRowHeaderWidth();
                 */
                default:
                    throw "Unsupported export mode: " + mode;
            }
        };

        img.getHeight = function() {
            var mode = img._mode;

            switch (mode) {
                case "full":
                    return calendar._getInnerHeight() + calendar._totalHeaderHeight();
                case "viewport":
                    return calendar.nav.top.offsetHeight - DayPilot.sh(calendar.nav.scroll) - 1;
                /*
                 case "viewport":
                 return calendar.nav.top.offsetHeight - DayPilot.sh(calendar.nav.scroll) - 1;
                 case "range":
                 var rows = img.getRows();
                 if (rows.length === 0) {
                 return calendar._getTotalHeaderHeight();
                 }
                 else {
                 var from = rows.first();
                 var to = rows.last();
                 // return to.top - from.top + to.height + calendar._getTotalHeaderHeight();
                 return to.top - from.top + to.height + calendar._getTotalHeaderHeight();
                 }
                 */
                default:
                    throw "Unsupported export mode: " + mode;
            }
        };

        img.getRectangles = function() {
            var rowHeaderWidth = img.getRowHeaderWidth();
            var columnHeaderHeight = calendar._totalHeaderHeight();

            var rectangles = {};
            rectangles.main = {"x": 0, "y": 0, "w": img.getWidth(), "h": img.getHeight()};
            rectangles.corner = {"x": 0, "y": 0, "w": rowHeaderWidth, "h": columnHeaderHeight};
            rectangles.grid = {"x": rowHeaderWidth, "y": columnHeaderHeight, "w": img.getWidth() - rowHeaderWidth, "h": img.getHeight() - columnHeaderHeight};

            var width = img.innerWidth();
            var height = calendar._getInnerHeight();
            rectangles.gridContent = {"x": rowHeaderWidth, "y": columnHeaderHeight, "w": width, "h": height};

            return rectangles;
        };

        img.getRowHeaderWidth = function() {
            return calendar.hourWidth;
        };

        img.innerWidth = function() {
            var w = calendar._scrollDiv().offsetWidth;
            var colc = calendar._columnsBottom.length;
            return Math.floor(w/colc) * colc;
            /*
             if (this.columnWidthSpec === 'Fixed') {
             return calendar.hourWidth + calendar._scrollDiv().clientWidth;
             }
             return calendar.nav.top.clientWidth;
             */
        };

        this._isShortInit = function() {
            return !!this.backendUrl;

            /*
            // make sure it has a place to ask
            if (this.backendUrl) {
                return (typeof calendar.events.list === 'undefined') || (!calendar.events.list);
            }
            else {
                return false;
            }*/
        };

        this._loadTop = function() {
            if (this.id && this.id.tagName) {
                this.nav.top = this.id;
            }
            else if (typeof this.id === "string") {
                this.nav.top = document.getElementById(this.id);
                if (!this.nav.top) {
                    throw "DayPilot.Calendar: The placeholder element not found: '" + id + "'.";
                }
            }
            else {
                throw "DayPilot.Calendar() constructor requires the target element or its ID as a parameter";
            }
            this.nav.limit;
        };


        this._initShort = function() {
            this._loadTop();
            this._prepareVariables();
            this._prepareColumns();
            this._drawTop();
            this._drawHeader();
            this._autoHeaderHeight();
            this._drawMain();
            this._fixScrollHeader();
            this._enableScrolling();
            this._registerGlobalHandlers();
            this._registerDispose();
            this._updateColumnWidthSpec();
            DayPilotCalendar.register(this);

            this._onResize(); // adjust the height if 100%

            this._showCurrentTime();

            this._waitForVisibility();
            this._startAutoRefresh();
            this._callBack2('Init');
        };

        this.init = function() {
            if (this._initialized) {
                throw new DayPilot.Exception("This instance is already initialized. Use update() to change properties.")
            }

            this._versionCheck();
            this._loadTop();

            if (this.nav.top.dp) {
                return;
            }

            var loadFromServer = this._isShortInit();

            if (!calendar.cssOnly) {
                calendar.cssOnly = true;
                DayPilot.Util.log("DayPilot: cssOnly = false mode is not supported since DayPilot Pro 8.0.");
            }

            if (loadFromServer) {
                this._initShort();
                this._initialized = true;
                return;
            }

            this._prepareVariables();
            this._prepareColumns();
            this._expandCellProperties();

            if (!this.events.list) {
                this.events.list = [];
            }

            this._loadEvents();

            this._drawTop();
            this._drawHeader();
            this._autoHeaderHeight();
            this._drawMain();

            this._show();
            this._updateColumnWidthSpec();

            this._fixScrollHeader();
            this._enableScrolling();
            this._registerGlobalHandlers();
            this._registerDispose();
            DayPilotCalendar.register(this);

            this._updateHeaderHeight();
            this._drawEvents();
            this._drawEventsAllDay();

            this._onResize(); // adjust the height if 100%

            if (this.messageHTML) {
                this.message(this.messageHTML);
            }

            this._showCurrentTime();

            this._fireAfterRenderDetached(null, false);

            if (calendar.initEventEnabled) {
                setTimeout(function() {
                    calendar._callBack2("Init");
                });
            }

            this._waitForVisibility();
            this._startAutoRefresh();
            this._initialized = true;
            this._postInit();
            return this;
        };

        this._specialHandling = null;
        this._loadOptions = function(options) {
            if (!options) {
                return;
            }
            var specialHandling = {
                "events": {
                    "preInit": function() {
                        var events = this.data;
                        if (!events) {
                            return;
                        }
                        if (DayPilot.isArray(events.list)) {
                            calendar.events.list = events.list;
                        }
                        else {
                            calendar.events.list = events;
                        }
                    }
                },
                "columns": {
                    "preInit": function() {
                        if (calendar._columnsList() === calendar.columns) {
                            calendar.columns = this.data;
                        }
                        else {
                            calendar.columns.list = this.data;
                        }
                    }
                },
                "scrollToHour": {
                    "postInit": function() {
                        if (typeof this.data !== 'undefined') {
                            calendar.scrollToHour(this.data);
                        }
                    }
                }
            };
            this._specialHandling = specialHandling;

            for (var name in options) {
                if (specialHandling[name]) {
                    var item = specialHandling[name];
                    item.data = options[name];
                    if (item.preInit) {
                        item.preInit();
                    }
                }
                else {
                    calendar[name] = options[name];
                }
            }

        };

        this._postInit = function() {
            var specialHandling = this._specialHandling;
            for (var name in specialHandling) {
                var item = specialHandling[name];
                if (item.postInit) {
                    item.postInit();
                }
            }
        };

        // communication between components
        this.internal = {};
        // ASP.NET
        this.internal.initialized = function() {
            return calendar._initialized;
        };

        // DayPilot.Action
        this.internal.invokeEvent = this._invokeEvent;
        // DayPilot.Menu
        this.internal.eventMenuClick = this._eventMenuClick;
        this.internal.timeRangeMenuClick = this._timeRangeMenuClick;
        // DayPilot.Bubble
        this.internal.bubbleCallBack = this._bubbleCallBack;
        this.internal.findEventDiv = this._findEventDiv;

        this.internal.eventDeleteDispatch = this._eventDeleteDispatch;

        this.internal.touch = this._touch;

        // React
        this.internal.enableReact = function (react, reactDOM) {
            calendar._react.react = react;
            calendar._react.reactDOM = reactDOM;
        };
        this.internal.reactRefs = function() {
            return DayPilot.Util.copyProps(calendar._react, {}, ["react", "reactDOM"]);
        };


        this.Init = this.init;
        this._loadOptions(options);
    };


    var DayPilotCalendar = {};

    // internal selecting
    //DayPilotCalendar.selectedCells = null;
    DayPilotCalendar.topSelectedCell = null;
    DayPilotCalendar.bottomSelectedCell = null;
    DayPilotCalendar.column = null;
    DayPilotCalendar.firstSelected = null;
    DayPilotCalendar.firstMousePos = null;

    // internal resizing
    DayPilotCalendar.originalMouse = null;
    DayPilotCalendar.originalHeight = null;
    DayPilotCalendar.originalTop = null;
    //DayPilotCalendar.resizing = null;
    DayPilotCalendar.globalHandlers = false;

    // internal moving
    //DayPilotCalendar.moving = null;
    //DayPilotCalendar.originalLeft = null;

    // internal editing
    DayPilotCalendar.editing = false;
    DayPilotCalendar.originalText = null;

    // scrollbar width
    //DayPilotCalendar.scrollWidth = null;

    // helpers
    DayPilotCalendar.register = function(calendar) {
        if (!DayPilotCalendar.registered) {
            DayPilotCalendar.registered = [];
        }
        var r = DayPilotCalendar.registered;

        for (var i = 0; i < r.length; i++) {
            if (r[i] === calendar) {
                return;
            }
        }
        r.push(calendar);
    };

    DayPilotCalendar.unregister = function(calendar) {
        var a = DayPilotCalendar.registered;
        if (a) {
            var i = DayPilot.indexOf(a, calendar);
            if (i !== -1) {
                a.splice(i, 1);
            }
            if (a.length === 0) {
                a = null;
            }
        }

        if (!a) {
            DayPilot.ue(document, 'mousemove', DayPilotCalendar.gMouseMove);
            DayPilot.ue(document, 'mouseup', DayPilotCalendar.gMouseUp);
            DayPilot.ue(document, 'touchmove', DayPilotCalendar.gTouchMove);
            DayPilot.ue(document, 'touchend', DayPilotCalendar.gTouchEnd);
            //DayPilot.ue(window, 'unload', DayPilotCalendar.gUnload);
            DayPilotCalendar.globalHandlers = false;
        }
    };


    DayPilotCalendar.getCellsAbove = function(cell) {
        if (cell.data && cell.data.calendar._divBasedGrid) {
            var calendar = cell.data.calendar;
            var array = [];
            var yStart = cell.data.y;
            var x = cell.data.x;
            var yEnd = DayPilotCalendar.firstSelected.data.y;

            for (var y = yStart; y >= yEnd; y--) {
                array.push(calendar.nav.main.rows[y].cells[x]);
            }
            return array;
        }
        else {

            var array = [];
            var c = DayPilotCalendar.getColumn(cell);

            var tr = cell.parentNode;

            var select = null;
            while (tr && select !== DayPilotCalendar.firstSelected) {
                select = tr.getElementsByTagName("td")[c];
                array.push(select);
                tr = tr.previousSibling;
                while (tr && tr.tagName !== "TR") {
                    tr = tr.previousSibling;
                }
            }
            return array;
        }
    };

    DayPilotCalendar.getCellsBelow = function(cell) {

        if (cell.data && cell.data.calendar._divBasedGrid) {
            var calendar = cell.data.calendar;
            var array = [];
            var yStart = cell.data.y;
            var x = cell.data.x;
            var yEnd = DayPilotCalendar.firstSelected.data.y;

            for (var y = yStart; y <= yEnd; y++) {
                array.push(calendar.nav.main.rows[y].cells[x]);
            }
            return array;
        }
        else {
            var array = [];
            var c = DayPilotCalendar.getColumn(cell);
            var tr = cell.parentNode;

            var select = null;
            while (tr && select !== DayPilotCalendar.firstSelected) {
                select = tr.getElementsByTagName("td")[c];
                array.push(select);
                tr = tr.nextSibling;
                while (tr && tr.tagName !== "TR") {
                    tr = tr.nextSibling;
                }
            }
            return array;
        }
    };

    DayPilotCalendar.getColumn = function(cell) {
        var i = 0;
        if (!cell) {
            return null;
        }
        while (cell.previousSibling) {
            cell = cell.previousSibling;
            if (cell.tagName === "TD") {
                i++;
            }
        }
        return i;
    };

    DayPilotCalendar.gTouchMove = function(ev) {

        if (DayPilot.Util.isMouseEvent(ev)) {
            return;
        }

        if (DayPilotCalendar.drag) {
            ev.preventDefault();

            var x = ev.touches ? ev.touches[0].pageX : ev.pageX;
            var y = ev.touches ? ev.touches[0].pageY : ev.pageY;

            var mousePos = {};
            mousePos.x = x;
            mousePos.y = y;

            var calendar = (function() {
                var clientX = ev.touches ? ev.touches[0].clientX : ev.clientX;
                var clientY = ev.touches ? ev.touches[0].clientY : ev.clientY;
                var el = document.elementFromPoint(clientX, clientY);
                while (el && el.parentNode) {
                    el = el.parentNode;
                    if (el.daypilotMainD) {
                        return el.calendar;
                    }
                }
                return false;
            })();

            if (calendar) {

                // hide the global shadow
                if (DayPilotCalendar.gShadow) {
                    document.body.removeChild(DayPilotCalendar.gShadow);
                }
                DayPilotCalendar.gShadow = null;

                calendar.coords = calendar._touch.relativeCoords(ev);

                // copied from onmainmousemove

                if (!DayPilotCalendar.movingShadow && calendar.coords) {

                    var shadow = calendar._createShadow(DayPilotCalendar.drag, false);

                    if (shadow) {
                        DayPilotCalendar.movingShadow = shadow;

                        var now = DayPilot.Date.today();

                        var ev = { 'value': DayPilotCalendar.drag.id, 'start': now, 'end': now.addSeconds(DayPilotCalendar.drag.duration), 'text': DayPilotCalendar.drag.text };
                        var event = new DayPilot.Event(ev, calendar);
                        //event.calendar = calendar;
                        //event.root = calendar;
                        event.external = true;

                        DayPilot.Global.moving = {};
                        DayPilot.Global.moving.event = event;
                        DayPilot.Global.moving.helper = {};
                    }
                }

                if (DayPilot.Global.moving) {
                    calendar._touch.updateMoving();
                }
            }
            else {

                // hide the local shadow
                DayPilot.de(DayPilotCalendar.movingShadow);
                DayPilot.Global.moving = null;
                DayPilotCalendar.movingShadow = null;

                if (!DayPilotCalendar.gShadow) {
                    DayPilotCalendar.gShadow = DayPilotCalendar.createGShadow(DayPilotCalendar.drag.shadowType);
                }

                var shadow = DayPilotCalendar.gShadow;
                shadow.style.left = mousePos.x + 'px';
                shadow.style.top = mousePos.y + 'px';
            }
        }
    };

    DayPilotCalendar.gTouchEnd = function(ev) {
        if (DayPilot.Util.isMouseEvent(ev)) {
            return;
        }

        DayPilotCalendar.gMouseUp(ev);
    };

    DayPilotCalendar.gMouseMove = function(ev) {

        if (typeof (DayPilotCalendar) === 'undefined') {
            return;
        }

        // quick and dirty inside detection
        // hack, but faster then recursing through the parents
        if (ev.insideMainD) {  // FF
            return;
        }
        else if (ev.srcElement) {  // IE
            if (ev.srcElement.inside) {
                return;
            }
        }

        var mousePos = DayPilot.mc(ev);

        if (DayPilotCalendar.drag) {

            var data = DayPilotCalendar.drag.data;

            var cursor = "move";
            if (typeof data.externalCursor === "string") {
                cursor = data.externalCursor;
            }
            document.body.style.cursor = cursor;

            if (!DayPilotCalendar.gShadow) {
                DayPilotCalendar.gShadow = DayPilotCalendar.createGShadow(DayPilotCalendar.drag.shadowType);
            }

            var shadow = DayPilotCalendar.gShadow;
            var offset = 5;
            var x = mousePos.x - offset;
            var y = mousePos.y - offset;
            shadow.style.left = x + 'px';
            shadow.style.top = y + 'px';
            shadow.style.cursor = cursor;

            if (data.externalHtml) {
                shadow.innerHTML = data.externalHtml;
            }
            if (data.externalCssClass) {
                DayPilot.Util.addClass(shadow, data.externalCssClass);
            }

            DayPilot.Global.moving = null;
            DayPilot.de(DayPilotCalendar.movingShadow);
            DayPilotCalendar.movingShadow = null;
        }

        for (var i = 0; i < DayPilotCalendar.registered.length; i++) {
            if (DayPilotCalendar.registered[i]._out) {
                DayPilotCalendar.registered[i]._out();
            }
        }

    };

    DayPilotCalendar.gUnload = function(ev) {

        if (!DayPilotCalendar.registered) {
            return;
        }
        var r = DayPilotCalendar.registered;

        for (var i = 0; i < r.length; i++) {
            var c = r[i];
            //c.dispose();

            DayPilotCalendar.unregister(c);
        }

    };

    DayPilotCalendar.gMouseUp = function(e) {
        var e = e || window.event;

        /*
        if (e.preventDefault) { e.preventDefault(); } else { e.returnValue = false; }
        e.cancelBubble = true;
        if (e.stopPropagation) {
            e.stopPropagation();
        }*/

        if (DayPilot.Global.resizing) {
            if (!DayPilotCalendar.resizingShadow) {
                DayPilot.Global.resizing.style.cursor = 'default';
                //document.body.style.cursor = 'default';
                DayPilot.Global.resizing.event.calendar.nav.top.style.cursor = 'auto';
                DayPilot.Global.resizing = null;
                return;
            }

            var dpEvent = DayPilot.Global.resizing.event;
            var border = DayPilot.Global.resizing.dpBorder;
            var height = DayPilotCalendar.resizingShadow.clientHeight;
            var top = DayPilotCalendar.resizingShadow.offsetTop;

            var args = DayPilotCalendar.resizingShadow.args;
            var calendar = dpEvent.calendar;

            // stop resizing on the client
            // DayPilotCalendar.deleteShadow(DayPilotCalendar.resizingShadow);
            DayPilot.Global.resizing.style.cursor = 'default';
            calendar.nav.top.style.cursor = 'auto';
            //document.body.style.cursor = 'default';

            DayPilot.Global.resizing.onclick = null;  // trying to prevent onclick, the event should be always recreated

            DayPilot.Global.resizing = null;

/*            (function clearResizingShadow() {
                DayPilot.de(DayPilotCalendar.resizingShadow);
                DayPilotCalendar.resizingShadow = null;
            })();*/
            // calendar._clearResizingShadow();

            /*if (dpEvent.calendar.overlap) { // event overlap
                return;
            }*/

            if (!args.allowed) {
                return;
            }

            // action here
            //if (dirty) {
            dpEvent.calendar._eventResizeDispatch(dpEvent, height, top, border);

            //}
        }
        else if (DayPilot.Global.moving) {

            if (!DayPilot.Global.moving.helper) {   // UpdatePanel refreshed during moving
                // DayPilotCalendar.deleteShadow(DayPilotCalendar.movingShadow);
                DayPilot.de(DayPilotCalendar.movingShadow);
                DayPilot.Global.moving = null;
                DayPilotCalendar.movingShadow = null;
                return;
            }
            if (!DayPilotCalendar.movingShadow) {
                DayPilot.Global.moving.event.calendar.nav.top.style.cursor = 'auto';
                DayPilot.Global.moving = null;
                return;
            }


            var oldColumn = DayPilot.Global.moving.helper.oldColumn;
            //var newColumn = DayPilotCalendar.getShadowColumn(DayPilotCalendar.movingShadow).getAttribute("dpColumn");
            //var newColumnDate = DayPilotCalendar.getShadowColumn(DayPilotCalendar.movingShadow).getAttribute("dpColumnDate");
            var top = DayPilotCalendar.movingShadow.offsetTop;

            var dpEvent = DayPilot.Global.moving.event;
            var calendar = dpEvent.calendar;

            calendar._lastEventMoving = args;

            var newColumnIndex = DayPilotCalendar.movingShadow.column;

            var drag = DayPilotCalendar.drag;

            DayPilot.Global.moving.event.calendar.nav.top.style.cursor = 'auto';

            var args = DayPilotCalendar.movingShadow.args;

            // stop moving on the client
            //DayPilotCalendar.drag = null;  // will be reset below
            DayPilot.Global.moving = null;

/*
            (function clearMovingShadow() {
                calendar._deleteShadow(DayPilotCalendar.movingShadow);
                DayPilotCalendar.movingShadow = null;
            })();
*/
            // calendar._clearMovingShadow();


            if (drag) {
                if (!dpEvent.calendar.todo) {
                    dpEvent.calendar.todo = {};
                }
                dpEvent.calendar.todo.del = drag.element;
            }

            if (!args.allowed) {
                return;
            }

            //if (dirty) {
            var ev = e || window.event;

            dpEvent.calendar._eventMoveDispatch(dpEvent, newColumnIndex, top, ev, drag);
            //}
        }
        else if (DayPilot.Global.selecting) {


            var fire = function() {

                var selecting = DayPilot.Global.selecting;
                var calendar = DayPilot.Global.selecting.calendar;

                DayPilotCalendar.firstMousePos = null;
                DayPilot.Global.selecting = null;

                if (!selecting.args.allowed) {
                    calendar.clearSelection();
                    return;
                }

                if (calendar.timeRangeDoubleClickHandling == "Disabled") {
                    var sel = calendar.getSelection();
                    calendar._timeRangeSelectedDispatch(sel.start, sel.end, sel.resource);
                }
                else {
                    calendar._timeRangeClickTimeout = setTimeout(function() {
                        var sel = calendar.getSelection();
                        calendar._timeRangeSelectedDispatch(sel.start, sel.end, sel.resource);
                    }, calendar.doubleClickTimeout);
                }
            };

            if (DayPilot.Global.selecting && DayPilotCalendar.topSelectedCell !== null) {
                fire();
            }
            else {  // delayed
                //DayPilotCalendar.selectedTimeout = setTimeout(fire, calendar.doubleClickTimeout);
                DayPilotCalendar.selectedTimeout = setTimeout(fire, 100);
            }
        }
        else if (DayPilotCalendar.firstMousePos) {
            var calendar = DayPilotCalendar.firstMousePos.calendar;
            DayPilot.Global.selecting = {};
            DayPilot.Global.selecting.calendar = calendar;
            //calendar.clearSelection();
            calendar._activateSelection();

            if (!DayPilot.Global.selecting.args.allowed) {
                return;
            }

            DayPilotCalendar.firstMousePos = null;
            DayPilot.Global.selecting = null;

            if (calendar.timeRangeDoubleClickHandling == "Disabled") {
                var sel = calendar.getSelection();
                calendar._timeRangeSelectedDispatch(sel.start, sel.end, sel.resource);
            }
            else {
                calendar._timeRangeClickTimeout = setTimeout(function() {
                    var sel = calendar.getSelection();
                    calendar._timeRangeSelectedDispatch(sel.start, sel.end, sel.resource);
                }, calendar.doubleClickTimeout);
            }

        }

        // clean up external drag helpers
        if (DayPilotCalendar.drag) {
            DayPilotCalendar.drag = null;

            document.body.style.cursor = '';
        }

        if (DayPilotCalendar.gShadow) {
            document.body.removeChild(DayPilotCalendar.gShadow);
            DayPilotCalendar.gShadow = null;
        }

        DayPilotCalendar.moveOffsetY = null; // clean for next external drag

    };

    DayPilotCalendar.dragStart = function(element, duration, id, text, type) {
        DayPilot.us(element);

        var drag = DayPilotCalendar.drag = {};
        drag.element = element;
        drag.duration = duration;
        drag.text = text;
        drag.id = id;
        drag.shadowType = type ? type : 'Fill';  // default value

        drag.data = { "id":id, "text": text, "duration":duration, "externalHtml": text};

        return false;
    };

    /*
     * options: {
     *      element: dom element,
     *      duration: duration in minutes,
     *      text: event text,
     *      id: id,
     *      keepElement: whether to keep the original element
     * }
     */
    DayPilot.Calendar.makeDraggable = function(options) {
        var element = options.element;
        var removeElement = options.keepElement ? null : element;
        var duration = options.duration || 1;

        if (navigator.msPointerEnabled) {
            element.style.msTouchAction = "none";
            element.style.touchAction = "none";
        }

        var mousedown = function(ev) {

            // DayPilotCalendar.dragStart(removeElement, duration, options.id, options.text);
            startDragging();

            var element = (ev.target || ev.srcElement);
            if(element.tagName) {
                var tagname = element.tagName.toLowerCase();
                if(tagname === "textarea" || tagname === "select" || tagname === "input") {
                    return false;
                }
            }
            ev.preventDefault && ev.preventDefault();
            return false;

            /*
             var ev = ev || window.event;
             ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
             return false;
             */
        };

        var touchstart = function(ev) {

            if (DayPilot.Util.isMouseEvent(ev)) {
                return;
            }

            var holdfor = 0;

            window.setTimeout(function() {
                startDragging();

                DayPilotCalendar.gTouchMove(ev);

                ev.preventDefault();
            }, holdfor);

            ev.preventDefault();
        };

        function startDragging() {
            // TODO create drag.event = new DayPilot.Event() here
            // TODO merge with DayPilot.Scheduler.startDragging()

            var drag = DayPilotCalendar.drag = {};
            drag.element = removeElement;
            drag.id = options.id;
            drag.duration = options.duration || 60;
            drag.text = options.text || "";
            drag.data = options;
            drag.shadowType = "Fill";
        }

        //element.addEventListener(DayPilot.touch.start, touchstart, false);
        DayPilot.us(element);  // make it unselectable
        DayPilot.re(element, "mousedown", mousedown);
        DayPilot.re(element, DayPilot.touch.start, touchstart);

        element.cancelDraggable = function() {
            DayPilot.ue(element, "mousedown", mousedown);
            DayPilot.ue(element, DayPilot.touch.start, touchstart);
            delete element.cancelDraggable;
        };

    };

    DayPilotCalendar.createGShadow = function(type) {

        var shadow = document.createElement('div');
        shadow.setAttribute('unselectable', 'on');
        shadow.style.position = 'absolute';
        shadow.style.width = '100px';
        shadow.style.height = '20px';
        shadow.style.border = '2px dotted #666666';
        shadow.style.zIndex = shadowZindex;
        shadow.style.pointerEvents = "none";

        if (type === 'Fill') {    // transparent
            shadow.style.backgroundColor = "#aaaaaa";
            shadow.style.opacity = 0.5;
            shadow.style.filter = "alpha(opacity=50)";
            shadow.style.border = '2px solid #aaaaaa';
        }

        document.body.appendChild(shadow);

        return shadow;
    };

    DayPilotCalendar.moveShadow = function(column) {
        var shadow = DayPilotCalendar.movingShadow;
        //var parent = shadow.parentNode;

        // debugger;
        //parent.style.display = 'none';

        if (shadow.parentNode) {
            shadow.parentNode.removeChild(shadow);
        }
        column.firstChild.appendChild(shadow);
        shadow.style.left = '0px';

        // shadow.style.width = (DayPilotCalendar.movingShadow.parentNode.offsetWidth) + 'px';
        shadow.style.width = '';
        shadow.style.right = '0px';
    };

    DayPilot.Column = function(col, calendar) {
        var column = this;

        column.id = col.id;
        column.name = col.name;
        column.date = new DayPilot.Date(col.start);
        column.calendar = calendar;

        column.events = {};
        column.events.all = function() {
            var list = DayPilot.list();
            for (var i = 0; i < col.events.length; i++) {
                list.push(col.events[i]);
            }
            return list;
        };

        column.events.isEmpty = function() {
            return col.events.length === 0;
        };

        column.events.forRange = function(start, end) {
            start = new DayPilot.Date(start);
            end = end ? new DayPilot.Date(end) : col.visibleEnd();
            var result = DayPilot.list();
            for (var i = 0; i < column.events.length; i++) {
                var ev = column.events[i];
                if (DayPilot.Util.overlaps(ev.start(), ev.end(), start, end)) {
                    result.push(ev);
                }
            }
            return result;
        };

        column.events.totalDuration = function() {
            var ticks = 0;
            column.events.all().forEach(function(item) {
                ticks += item.part.end.getTime() - item.part.start.getTime();
            });
            return new DayPilot.Duration(ticks);
        };


        // legacy
        column.value = col.id;

        column.toJSON = function() {
            var json = {};
            json.id = this.id;
            if (this.date) {
                json.date = this.date.toString();
            }
            json.name = this.name;
            json.value = this.value;
            return json;
        };

    };

    // experimental jQuery bindings
    if (typeof jQuery !== 'undefined') {
        (function($) {
            $.fn.daypilotCalendar = function(options) {
                var first = null;
                var j = this.each(function() {
                    if (this.daypilot) { // already initialized
                        return;
                    };

                    var daypilot = new DayPilot.Calendar(this.id, options);
                    daypilot.init();
                    this.daypilot = daypilot;
                    /*
                    for (var name in options) {
                        daypilot[name] = options[name];
                    }*/

                    if (!first) {
                        first = daypilot;
                    }
                });
                if (this.length === 1) {
                    return first;
                }
                else {
                    return j;
                }
            };
        })(jQuery);
    }

    (function registerAngularModule() {

        var app = DayPilot.am();

        if (!app) {
            return;
        }

        app.directive("daypilotCalendar", ['$parse', function($parse) {
            return {
                "restrict": "E",
                "template": "<div id='{{id}}'></div>",
                "compile": function compile(element, attrs) {
                    element.replaceWith(this["template"].replace("{{id}}", attrs["id"]));

                    return function link(scope, element, attrs) {
                        var calendar = new DayPilot.Calendar(element[0]);
                        calendar._angular.scope = scope;
                        calendar.init();

                        var oattr = attrs["id"];
                        if (oattr) {
                            scope[oattr] = calendar;
                        }

                        // save DayPilot.Calendar object in the specified variable
                        var pas = attrs["publishAs"];
                        if (pas) {
                            var getter = $parse(pas);
                            var setter = getter.assign;
                            setter(scope, calendar);
                        }

                        // bind event handlers from attributes starting with "on"
                        for (var name in attrs) {
                            if (name.indexOf("on") === 0) {  // event handler
                                var apply = DayPilot.Util.shouldApply(name);

                                if (apply) {
                                    (function(name) {
                                        calendar[name] = function(args) {
                                            var f = $parse(attrs[name]);
                                            scope["$apply"](function() {
                                                f(scope, {"args": args});
                                            });
                                        };
                                    })(name);
                                }
                                else {
                                    (function(name) {
                                        calendar[name] = function(args) {
                                            var f = $parse(attrs[name]);
                                            f(scope, {"args": args});
                                        };
                                    })(name);
                                }

                            }
                        }

                        var watch = scope["$watch"];
                        var config = attrs["config"] || attrs["daypilotConfig"];
                        var events = attrs["events"] || attrs["daypilotEvents"];

                        watch.call(scope, config, function (value, oldVal) {
                            for (var name in value) {
                                calendar[name] = value[name];
                            }
                            calendar.update();
                        }, true);

                        watch.call(scope, events, function(value) {
                            calendar.events.list = value;
                            calendar._update({"eventsOnly": true});
                        }, true);

                    };
                }
            };
        }]);

    })();

    if (typeof Sys !== 'undefined' && Sys.Application && Sys.Application.notifyScriptLoaded) {
        Sys.Application.notifyScriptLoaded();
    }

})(DayPilot);
