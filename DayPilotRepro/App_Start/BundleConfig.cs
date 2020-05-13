using System.Web;
using System.Web.Optimization;

namespace DayPilotRepro
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            //bundles.Add(
            //     new Bundle("~/bundles/script/daypilot").Include(
            //         "~/Scripts/DayPilot/daypilot-common.src.js",
            //         "~/Scripts/DayPilot/daypilot-bubble.src.js",
            //         "~/Scripts/DayPilot/daypilot-calendar.src.js",
            //         "~/Scripts/DayPilot/daypilot-datepicker.src.js",
            //         "~/Scripts/DayPilot/daypilot-menu.src.js",
            //         "~/Scripts/DayPilot/daypilot-modal.src.js",
            //         "~/Scripts/DayPilot/daypilot-month.src.js",
            //         "~/Scripts/DayPilot/daypilot-navigator.src.js",
            //         "~/Scripts/DayPilot/daypilot-scheduler.src.js"));



            //bundles.Add(new StyleBundle("~/Content/css/daypilotcss").Include(
            //        BundlifyT4(Links.Scripts.vendor.DayPilot.areas_css),
            //        BundlifyT4(Links.Scripts.vendor.DayPilot.scheduler_transparent_css),
            //    ));


        }
    }
}
