using DayPilot.Web.Mvc;
using DayPilot.Web.Mvc.Data;
using DayPilot.Web.Mvc.Enums;
using DayPilot.Web.Mvc.Events;
using DayPilot.Web.Mvc.Events.Common;
using DayPilot.Web.Mvc.Events.Scheduler;
using DayPilot.Web.Mvc.Recurrence;
using DayPilot.Web.Mvc.Utils;
using System;
using System.Data;
using System.Drawing;
using System.Web.Mvc;

namespace DayPilotRepro.Controllers
{
    public class HomeController : Controller
    {
        private readonly DayPilotScheduler _scheduler;
        public HomeController()
        {
            _scheduler = new Dps();
        }
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public virtual ActionResult Backend()
        {
            return _scheduler.CallBack(this);
        }
    }

    public class Dps : DayPilotScheduler
    {
        //private bool useViewPort;
        Random random = new Random();

        protected override void OnInit(InitArgs ea)
        {

            //StartDate = new DateTime(DateTime.Today.Year, DateTime.Today.Month, 1);
            //Days = DateTime.DaysInMonth(DateTime.Today.Year, DateTime.Today.Month);

            if (Id == "dps_rowheadercolumns") // Scheduler/RowHeaderColumns
            {
                foreach (Resource r in Resources)
                {
                    foreach (Resource c in r.Children)
                    {
                        c.Columns.Add(new ResourceColumn("Col A"));
                        c.Columns.Add(new ResourceColumn("Col B"));
                    }
                }
            }
            if (Id == "dps_jquery") // Scheduler/JQuery
            {
                for (var i = 'A'; i < 'Z'; i++)
                {
                    Resources.Add("" + i, i.ToString());
                }
            }
            if (Id == "dps_progressive")
            {
                for (var i = 0; i < 10000; i++)
                {
                    Resources.Add("Resource " + i, i.ToString());
                }
            }
            if (Id == "dps_scrolling" || Id == "dps_dynamic")
            {
                int year = Calendar.GetYear(DateTime.Today);
                StartDate = new DateTime(year, 1, 1, Calendar);
                Days = Calendar.GetDaysInYear(year);
            }

            if (Id == "dps_timeline")
            {
                DateTime start = new DateTime(2015, 1, 1, 12, 0, 0);
                DateTime end = new DateTime(2016, 1, 1, 12, 0, 0);

                Timeline = new TimeCellCollection();
                for (DateTime cell = start; cell < end; cell = cell.AddDays(1))
                {
                    Timeline.Add(cell, cell.AddDays(1));
                }

            }

            ScrollTo(DateTime.Today);

            UpdateWithMessage("Welcome!", CallBackUpdateType.Full);
        }

        //protected override void OnEventSelect(EventSelectArgs e)
        //{
        //    if (e.Event.Id == "1" && e.Change == EventSelectChange.Selected)
        //    {
        //        SelectedEvents.Add(EventInfo.Create("13"));
        //    }
        //    Update();
        //}

        //protected override void OnEventDelete(EventDeleteArgs e)
        //{
        //    //new EventManager(Controller, Id).EventDelete(e.Id);
        //    UpdateWithMessage("Event deleted.");
        //}

        //protected override void OnEventEdit(EventEditArgs e)
        //{
        //    if (e.Id == "NEW")
        //    {
        //        //new EventManager(Controller, Id).EventCreate(e.Start, e.End, e.NewText, e.Resource);
        //    }
        //    else
        //    {
        //        new EventManager(Controller, Id).EventEdit(e.Id, e.NewText);
        //    }
        //    Update();
        //}

        protected override void OnLoadNode(LoadNodeArgs e)
        {
            Resource child = new Resource("Test", Guid.NewGuid().ToString());
            child.DynamicChildren = true;

            e.Resource.Children.Add(child);
            e.Resource.Expanded = true;

            Update(CallBackUpdateType.Full);
        }

        //protected override void OnRowEdit(RowEditArgs e)
        //{
        //    e.Resource.Name = e.NewText;
        //    Update(CallBackUpdateType.Full);
        //}

        //protected override void OnRowSelect(RowSelectArgs e)
        //{
        //    UpdateWithMessage("Number of selected rows: " + SelectedRows.Count);
        //}

        protected override void OnCommand(CommandArgs e)
        {
            switch (e.Command)
            {
                case "filter":
                    Update();
                    break;
                case "refresh":
                    UpdateWithMessage("Refreshed");
                    break;
                case "next":
                    StartDate = StartDate.AddYears(1);
                    Days = Year.Days(StartDate);
                    Update(CallBackUpdateType.Full);
                    break;
                case "previous":
                    StartDate = StartDate.AddYears(-1);
                    Days = Year.Days(StartDate);
                    Update(CallBackUpdateType.Full);
                    break;
                case "this":
                    StartDate = Year.First(DateTime.Today);
                    Days = Year.Days(StartDate);
                    Update(CallBackUpdateType.Full);
                    break;
                case "selected":
                    if (SelectedEvents.Count > 0)
                    {
                        EventInfo ei = SelectedEvents[0];
                        SelectedEvents.RemoveAt(0);
                        UpdateWithMessage("Event removed from selection: " + ei.Text);
                    }

                    break;
                case "delete":
                    string id = (string)e.Data["id"];
                    // new EventManager(Controller, Id).EventDelete(id);
                    Update(CallBackUpdateType.EventsOnly);
                    break;
            }
        }

        protected override void OnRowMove(RowMoveArgs e)
        {
            e.Move();
            Update(CallBackUpdateType.Full);
        }

        protected override void OnBeforeCellRender(BeforeCellRenderArgs e)
        {
            if (Id == "dps_parents")
            {
                if (Resources.FindById(e.ResourceId).Children.Count > 0)
                {
                    e.BackgroundColor = "white";
                }
            }

            if (Id == "dps_areas")
            {
                e.Areas.Add(
                    new Area().Start(e.Start.AddHours(6))
                        .End(e.End.AddHours(-6))
                        .Top(0)
                        .Bottom(0)
                        .Style("background-color: red; opacity: .1;")
                        .Visible());

            }

            if (Id == "dps_cellsdisabled")
            {
                if (e.Start < DateTime.Today)
                {
                    e.Disabled = true;
                    e.BackgroundColor = "#ccc";
                }
            }

        }

        protected override void OnBeforeResHeaderRender(BeforeResHeaderRenderArgs e)
        {
            if (Id == "dps_areas")
            {
                e.Areas.Add(new Area().Width(17).Bottom(1).Right(0).Top(0).CssClass("resource_action_menu").Html("<div><div></div></div>").JavaScript("alert(e.Value);"));
            }

            if (e.Columns.Count > 0)
            {
                e.Columns[0].Html = "10 seats";
            }

            if (e.Id == "C")
            {
                e.MoveEnabled = false;
            }

        }

        //protected override void OnEventBubble(EventBubbleArgs e)
        //{
        //    e.BubbleHtml = "Event details for id: " + e.Id + "<br/>" + e.Start + " " + e.End;
        //}

        protected override void OnTimeRangeSelected(TimeRangeSelectedArgs e)
        {
            if (e.Multirange != null)
            {
                foreach (TimeRangeSelectedArgs item in e.Multirange)
                    new EventManager(Controller, Id).EventCreate(item.Start, item.End, "Default name", item.Resource);
            }
            else
            {
                new EventManager(Controller, Id).EventCreate(e.Start, e.End, "Default name", e.Resource);
            }
            UpdateWithMessage("New event created", CallBackUpdateType.EventsOnly);
        }

        protected override void OnEventMove(EventMoveArgs e)
        {
            if (new EventManager(Controller, Id).Get(e.Id) != null)
            {
                if (e.Multimove != null)
                {
                    e.Multimove.ForEach(ei => new EventManager(Controller, Id).EventMove(ei.Id, ei.NewStart, ei.NewEnd, ei.NewResource));
                }
                else
                {
                    new EventManager(Controller, Id).EventMove(e.Id, e.NewStart, e.NewEnd, e.NewResource);
                }
            }
            else // external drag&drop
            {
                new EventManager(Controller, Id).EventCreate(e.NewStart, e.NewEnd, e.Text, e.NewResource, e.Id);
            }
            if (Id == "dps_position")
            {
                UpdateWithMessage("Moved to position: " + e.Position);
            }
            else
            {
                UpdateWithMessage("Event moved.");
            }

        }

        protected override void OnEventResize(EventResizeArgs e)
        {
            if (e.Multiresize != null)
            {
                e.Multiresize.ForEach(ei => new EventManager(Controller, Id).EventMove(ei.Id, ei.NewStart, ei.NewEnd));
            }
            else
            {
                new EventManager(Controller, Id).EventMove(e.Id, e.NewStart, e.NewEnd);
            }
            Update();
        }

        protected override void OnBeforeEventRender(BeforeEventRenderArgs e)
        {
            if (Id == "dps_limit")
            {
                int id = 0;
                int.TryParse(e.Id, out id);

                if (id % 2 == 0)
                {
                    e.DurationBarColor = "red";
                    e.EventMoveVerticalEnabled = false;
                }
                else
                {
                    e.DurationBarColor = "blue";
                    e.EventMoveHorizontalEnabled = false;
                }
            }
            else if (Id == "dps_areas")
            {
                e.Areas.Add(new Area().Width(17).Height(17).Right(2).Top(4).CssClass("event_action_delete").JavaScript("dps_areas.commandCallBack('delete', {id:e.value() });"));
                e.Areas.Add(new Area().Width(17).Height(17).Right(19).Top(4).CssClass("event_action_menu").ContextMenu("menu"));

                e.Areas.Add(
                    new Area().Start(DateTime.Today)
                        .End(DateTime.Today.AddDays(1))
                        .Top(0)
                        .Bottom(0)
                        .Style("background-color: red; opacity: .5;")
                        .Visible());
            }
            else if (Id == "dps_complete")
            {
                int complete = random.Next(100);
                e.PercentComplete = complete;

                string cs = String.Format("{0}%", complete);
                e.Html = cs;

            }

            if (e.Recurrent)
            {
                e.Html += " (R)";
            }

            if (e.Id == "1")
            {
                e.EventDeleteEnabled = false;
            }

        }

        //protected override void OnEventMenuClick(EventMenuClickArgs e)
        //{
        //    switch (e.Command)
        //    {
        //        case "Delete":
        //            new EventManager(Controller, Id).EventDelete(e.Id);
        //            Update();
        //            break;
        //    }
        //}

        //protected override void OnEventClick(EventClickArgs e)
        //{
        //    if (Id == "dps_message")
        //    {
        //        UpdateWithMessage("Event clicked: " + e.Text);
        //    }
        //}

        //protected override void OnBeforeTimeHeaderRender(BeforeTimeHeaderRenderArgs e)
        //{
        //    if (Id == "dps_timeheaders")
        //    {
        //        if (e.Level == 1)
        //        {
        //            DateTime monday = Week.Monday(e.Start, ResolvedWeekStart);
        //            e.InnerHtml = String.Format("Week {0}", Week.WeekNrISO8601(monday));
        //        }
        //    }

        //    if (Id == "dps_areas")
        //    {
        //        e.Areas.Add(
        //            new Area().Start(e.Start.AddHours(6))
        //                .End(e.End.AddHours(-6))
        //                .Top(0)
        //                .Bottom(0)
        //                .Style("background-color: blue; opacity: .1;")
        //                .Visible());

        //    }


        //}

        protected override void OnBeforeTimeHeaderRender(BeforeTimeHeaderRenderArgs e)
        {
            if (Scale == TimeScale.Week)
            {
                if (e.Level == 2)
                {
                    //var endDate = e.End.Day - 1;
                    var endDate = e.End.AddDays(-1).Day;
                    var start = string.Format("{0}{1}", e.Start.Day, dateSuffix(e.Start.Day));
                    var end = string.Format("{0}{1}", endDate, dateSuffix(endDate));
                    e.InnerHtml = string.Format("{0} - {1}", start, end);
                }
            }
        }

        private string dateSuffix(int day)
        {
            return (day == 11 || day == 12 || day == 13) ? "th"
                        : (day == 1 || day == 21 || day == 31) ? "st"
                        : (day == 2 || day == 22) ? "nd"
                        : (day == 3 || day == 23) ? "rd"
                        : "th";
        }

        protected override void OnIncludeCell(IncludeCellArgs e)
        {
            /*
            if (e.Start.DayOfWeek == DayOfWeek.Saturday || e.Start.DayOfWeek == DayOfWeek.Sunday)
            {
                e.Visible = false;
            }
             * */

        }

        protected override void OnLinkCreate(LinkCreateArgs e)
        {
            UpdateWithMessage("Link created: " + e.FromId + " " + e.ToId);
        }

        protected override void OnResourceExpand(ResourceExpandArgs args)
        {
            UpdateWithMessage("expanded " + args.Resource.Id);
        }

        protected override void OnNotify(NotifyArgs e)
        {
            foreach (DayPilotArgs a in e.Queue)
            {
                if (a is EventUpdateArgs)
                {
                    EventUpdateArgs updateArgs = (EventUpdateArgs)a;
                    string id = updateArgs.Event.Id;
                    string newText = updateArgs.New.Text;
                    // update the db
                }
            }
        }

        protected override void OnRowCreate(RowCreateArgs e)
        {
            Resources.Add(e.Text, Guid.NewGuid().ToString());
            UpdateWithMessage("Row added: " + e.Text, CallBackUpdateType.Full);
        }

        protected override void OnScroll(ScrollArgs e)
        {
            Update(CallBackUpdateType.EventsOnly);
        }

        protected override void OnBeforeEventRecurrence(BeforeEventRecurrenceArgs e)
        {
        }

        protected override void OnFinish()
        {
            // only load the data if an update was requested by an Update() call
            if (UpdateType == CallBackUpdateType.None)
            {
                return;
            }


            DateTime start = DynamicLoading ? ViewPort.Start : StartDate;
            DateTime end = DynamicLoading ? ViewPort.End : EndDate;


            Events = new EventManager(Controller, Id).FilteredData(start, end, (string)ClientState["filter"]).AsEnumerable();
            switch (Id)
            {
                case "dps_recurring":
                    DataRecurrenceField = "recurrence";
                    break;
                case "dps_milestones":
                    DataMilestoneField = "milestone";
                    break;
            }

            Separators.Clear();
            Separators.Add(DateTime.Now, Color.Red);


            DataStartField = "start";
            DataEndField = "end";
            DataTextField = "text";
            DataIdField = "id";
            DataResourceField = "resource";

            DataTagFields = "id, text, resource";

        }

    }



    public class EventManager
    {
        private Controller controller;
        private string key;

        public EventManager(Controller controller, string key)
        {
            this.controller = controller;
            this.key = key;

            if (this.controller.Session[key] == null)
            {
                switch (key)
                {
                    case "dps_recurring":
                        this.controller.Session[key] = generateDataRecurring();
                        break;
                    case "dps_timesheet":
                        this.controller.Session[key] = generateDataTimesheet();
                        break;
                    case "dps_milestones":
                        this.controller.Session[key] = generateDataMilestone();
                        break;
                    default:
                        this.controller.Session[key] = generateData();
                        break;
                }
            }
        }

        public DataTable Data
        {
            get { return (DataTable)controller.Session[key]; }
        }

        public DataTable FilteredData(DateTime start, DateTime end, string keyword)
        {
            string where = String.Format("NOT (([end] <= '{0:s}') OR ([start] >= '{1:s}')) and [text] like '%{2}%'", start, end, keyword);
            DataRow[] rows = Data.Select(where);
            DataTable filtered = Data.Clone();

            foreach (DataRow r in rows)
            {
                filtered.ImportRow(r);
            }

            return filtered;
        }

        public EventManager(Controller controller) : this(controller, "default")
        {
        }

        private DataTable generateData()
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("id", typeof(string));
            dt.Columns.Add("text", typeof(string));
            dt.Columns.Add("start", typeof(DateTime));
            dt.Columns.Add("end", typeof(DateTime));
            dt.Columns.Add("resource", typeof(string));
            dt.Columns.Add("color", typeof(string));
            dt.Columns.Add("allday", typeof(bool));

            dt.PrimaryKey = new DataColumn[] { dt.Columns["id"] };

            DataRow dr;

            dr = dt.NewRow();
            dr["id"] = 1;
            dr["start"] = Convert.ToDateTime("00:01").AddDays(1);
            dr["end"] = Convert.ToDateTime("00:01").AddDays(1);
            dr["text"] = "Event 1";
            dr["resource"] = "A";
            dt.Rows.Add(dr);

            dr = dt.NewRow();
            dr["id"] = 2;
            dr["start"] = Convert.ToDateTime("16:00").AddDays(1);
            dr["end"] = Convert.ToDateTime("17:00").AddDays(1);
            dr["text"] = "Event 2";
            dr["resource"] = "A";
            dr["color"] = "green";
            dt.Rows.Add(dr);

            dr = dt.NewRow();
            dr["id"] = 3;
            dr["start"] = Convert.ToDateTime("14:15").AddDays(2);
            dr["end"] = Convert.ToDateTime("18:45").AddDays(2);
            dr["text"] = "Event 3";
            dr["resource"] = "A";
            dt.Rows.Add(dr);

            dr = dt.NewRow();
            dr["id"] = 4;
            dr["start"] = Convert.ToDateTime("16:30").AddDays(1);
            dr["end"] = Convert.ToDateTime("17:30").AddDays(1);
            dr["text"] = "Sales Dept. Meeting Once Again";
            dr["resource"] = "B";
            dt.Rows.Add(dr);

            dr = dt.NewRow();
            dr["id"] = 5;
            dr["start"] = Convert.ToDateTime("8:00").AddDays(1);
            dr["end"] = Convert.ToDateTime("9:00").AddDays(1);
            dr["text"] = "Event 4";
            dr["resource"] = "B";
            dt.Rows.Add(dr);

            dr = dt.NewRow();
            dr["id"] = 6;
            dr["start"] = Convert.ToDateTime("14:00").AddDays(1);
            dr["end"] = Convert.ToDateTime("20:00").AddDays(1);
            dr["text"] = "Event 6";
            dr["resource"] = "C";
            dt.Rows.Add(dr);


            dr = dt.NewRow();
            dr["id"] = 7;
            dr["start"] = Convert.ToDateTime("11:00").AddDays(1);
            dr["end"] = Convert.ToDateTime("13:14").AddDays(1);
            dr["text"] = "Unicode test: 公曆 (requires Unicode fonts on the client side)";
            dr["color"] = "red";
            dt.Rows.Add(dr);

            dr = dt.NewRow();
            dr["id"] = 8;
            dr["start"] = Convert.ToDateTime("13:14").AddDays(-1);
            dr["end"] = Convert.ToDateTime("14:05").AddDays(-1);
            dr["text"] = "Event 8";
            dr["resource"] = "C";
            dt.Rows.Add(dr);


            dr = dt.NewRow();
            dr["id"] = 9;
            dr["start"] = Convert.ToDateTime("13:14").AddDays(7);
            dr["end"] = Convert.ToDateTime("14:05").AddDays(7);
            dr["text"] = "Event 9";
            dr["resource"] = "C";
            dt.Rows.Add(dr);

            dr = dt.NewRow();
            dr["id"] = 10;
            dr["start"] = Convert.ToDateTime("13:14").AddDays(-7);
            dr["end"] = Convert.ToDateTime("14:05").AddDays(-7);
            dr["text"] = "Event 10";
            dt.Rows.Add(dr);

            dr = dt.NewRow();
            dr["id"] = 11;
            dr["start"] = Convert.ToDateTime("00:00").AddDays(8);
            dr["end"] = Convert.ToDateTime("00:00").AddDays(15);
            dr["text"] = "Event 11";
            dr["resource"] = "D";
            dr["allday"] = true;
            dt.Rows.Add(dr);

            dr = dt.NewRow();
            dr["id"] = 12;
            dr["start"] = Convert.ToDateTime("00:00").AddDays(-2);
            dr["end"] = Convert.ToDateTime("00:00").AddDays(-1);
            dr["text"] = "Event 12";
            dr["resource"] = "D";
            dr["allday"] = true;
            dt.Rows.Add(dr);

            dr = dt.NewRow();
            dr["id"] = 13;
            dr["start"] = DateTime.Now.AddDays(-7);
            dr["end"] = DateTime.Now.AddDays(14);
            dr["text"] = "Event 13";
            dr["resource"] = "B";
            dr["allday"] = true;
            dt.Rows.Add(dr);

            dr = dt.NewRow();
            dr["id"] = 14;
            dr["start"] = Convert.ToDateTime("7:45:00").AddDays(1);
            dr["end"] = Convert.ToDateTime("8:30:00").AddDays(1);
            dr["text"] = "Event 14";
            dr["resource"] = "D";
            dt.Rows.Add(dr);

            dr = dt.NewRow();
            dr["id"] = 16;
            dr["start"] = Convert.ToDateTime("8:30:00").AddDays(3);
            dr["end"] = Convert.ToDateTime("9:00:00").AddDays(3);
            dr["text"] = "Event 16";
            dr["resource"] = "D";
            dt.Rows.Add(dr);


            dr = dt.NewRow();
            dr["id"] = 17;
            dr["start"] = Convert.ToDateTime("8:00:00").AddDays(1);
            dr["end"] = Convert.ToDateTime("8:00:01").AddDays(1);
            dr["text"] = "Event 17";
            dr["resource"] = "D";
            dt.Rows.Add(dr);

            return dt;
        }

        private DataTable generateDataRecurring()
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("id", typeof(string));
            dt.Columns.Add("text", typeof(string));
            dt.Columns.Add("start", typeof(DateTime));
            dt.Columns.Add("end", typeof(DateTime));
            dt.Columns.Add("resource", typeof(string));
            dt.Columns.Add("color", typeof(string));
            dt.Columns.Add("allday", typeof(bool));
            dt.Columns.Add("recurrence", typeof(string));

            dt.PrimaryKey = new DataColumn[] { dt.Columns["id"] };

            DataRow dr;

            dr = dt.NewRow();
            dr["id"] = 1;
            dr["start"] = Convert.ToDateTime("10:00");
            dr["end"] = Convert.ToDateTime("11:30");
            dr["text"] = "Daily";
            dr["resource"] = "A";
            dr["recurrence"] = RecurrenceRule.FromDateTime(Convert.ToString(dr["id"]), Convert.ToDateTime(dr["start"])).Daily().Times(15).Encode();
            dt.Rows.Add(dr);

            dr = dt.NewRow();
            dr["id"] = 2;
            dr["start"] = Convert.ToDateTime("13:00");
            dr["end"] = Convert.ToDateTime("18:00");
            dr["text"] = "Weekly";
            dr["resource"] = "B";
            dr["color"] = "green";
            dr["recurrence"] = RecurrenceRule.FromDateTime(Convert.ToString(dr["id"]), Convert.ToDateTime(dr["start"])).Weekly().Times(5).Encode();
            dt.Rows.Add(dr);


            return dt;
        }

        private DataTable generateDataTimesheet()
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("id", typeof(string));
            dt.Columns.Add("text", typeof(string));
            dt.Columns.Add("start", typeof(DateTime));
            dt.Columns.Add("end", typeof(DateTime));

            dt.PrimaryKey = new DataColumn[] { dt.Columns["id"] };

            DataRow dr;

            dr = dt.NewRow();
            dr["id"] = 1;
            dr["start"] = Convert.ToDateTime("09:00");
            dr["end"] = Convert.ToDateTime("12:00");
            dr["text"] = "Event 1";
            dt.Rows.Add(dr);

            dr = dt.NewRow();
            dr["id"] = 2;
            dr["start"] = Convert.ToDateTime("10:00").AddDays(2);
            dr["end"] = Convert.ToDateTime("14:00").AddDays(2);
            dr["text"] = "Event 2";
            dt.Rows.Add(dr);


            return dt;
        }

        private DataTable generateDataMilestone()
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("id", typeof(string));
            dt.Columns.Add("text", typeof(string));
            dt.Columns.Add("start", typeof(DateTime));
            dt.Columns.Add("end", typeof(DateTime));
            dt.Columns.Add("resource", typeof(string));
            dt.Columns.Add("color", typeof(string));
            dt.Columns.Add("milestone", typeof(bool));

            dt.PrimaryKey = new DataColumn[] { dt.Columns["id"] };

            DataRow dr;

            dr = dt.NewRow();
            dr["id"] = 1;
            dr["start"] = Convert.ToDateTime("00:00").AddDays(1);
            dr["end"] = Convert.ToDateTime("00:00").AddDays(3);
            dr["text"] = "Event 1";
            dr["resource"] = "A";
            dt.Rows.Add(dr);

            dr = dt.NewRow();
            dr["id"] = 3;
            dr["start"] = Convert.ToDateTime("00:00").AddDays(2);
            dr["end"] = Convert.ToDateTime("00:00").AddDays(4);
            dr["text"] = "Event 2";
            dr["resource"] = "B";
            dt.Rows.Add(dr);

            dr = dt.NewRow();
            dr["id"] = 5;
            dr["start"] = Convert.ToDateTime("00:00").AddDays(1);
            dr["end"] = Convert.ToDateTime("00:00").AddDays(5);
            dr["text"] = "Event 3";
            dr["resource"] = "C";
            dt.Rows.Add(dr);

            dr = dt.NewRow();
            dr["id"] = 11;
            dr["start"] = Convert.ToDateTime("00:00").AddDays(8);
            dr["text"] = "Milestone 1";
            dr["resource"] = "D";
            dr["milestone"] = true;
            dt.Rows.Add(dr);

            return dt;
        }

        public void EventEdit(string id, string name)
        {
            DataRow dr = Data.Rows.Find(id);
            if (dr != null)
            {
                dr["text"] = name;
                Data.AcceptChanges();
            }
        }

        public void EventMove(string id, DateTime start, DateTime end, string resource)
        {
            DataRow dr = Data.Rows.Find(id);
            if (dr != null)
            {
                dr["start"] = start;
                dr["end"] = end;
                dr["resource"] = resource;
                Data.AcceptChanges();
            }
        }

        public void EventMove(string id, DateTime start, DateTime end)
        {
            DataRow dr = Data.Rows.Find(id);
            if (dr != null)
            {
                dr["start"] = start;
                dr["end"] = end;
                Data.AcceptChanges();
            }
            else // external drag&drop
            {

            }
        }

        public Event Get(string id)
        {
            DataRow dr = Data.Rows.Find(id);
            if (dr == null)
            {
                //return new Event();
                return null;
            }
            return new Event()
            {
                Id = (string)dr["id"],
                Text = (string)dr["text"]
            };
        }
        internal void EventCreate(DateTime start, DateTime end, string text, string resource, string id)
        {
            DataRow dr = Data.NewRow();

            dr["id"] = id;
            dr["start"] = start;
            dr["end"] = end;
            dr["text"] = text;
            dr["resource"] = resource;

            Data.Rows.Add(dr);
            Data.AcceptChanges();
        }

        internal void EventCreate(DateTime start, DateTime end, string text, string resource)
        {
            EventCreate(start, end, text, resource, Guid.NewGuid().ToString());
        }

        public class Event
        {
            public string Id { get; set; }
            public string Text { get; set; }
            public DateTime Start { get; set; }
            public DateTime End { get; set; }
        }

        public void EventDelete(string id)
        {
            DataRow dr = Data.Rows.Find(id);
            if (dr != null)
            {
                Data.Rows.Remove(dr);
                Data.AcceptChanges();
            }
        }
    }
}