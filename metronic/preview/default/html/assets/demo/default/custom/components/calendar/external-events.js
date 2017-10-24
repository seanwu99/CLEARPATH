var CalendarExternalEvents = function () {
    var t = function () {
        $("#m_calendar_external_events .fc-event").each(function () {
            $(this).data("event", {
                title: $.trim($(this).text()),
                stick: !0,
                className: $(this).data("color"),
                description: "Lorem ipsum dolor eius mod tempor labore"
            }), $(this).draggable({zIndex: 999, revert: !0, revertDuration: 0})
        })
    }, e = function () {
        var t = moment().startOf("day"), e = t.format("YYYY-MM"), i = t.clone().subtract(1, "day").format("YYYY-MM-DD"),
            r = t.format("YYYY-MM-DD"), n = t.clone().add(1, "day").format("YYYY-MM-DD");
        $("#m_calendar").fullCalendar({
            header: {
                left: "prev,next today",
                center: "title",
                right: "month,agendaWeek,agendaDay,listWeek"
            },
            eventLimit: !0,
            navLinks: !0,
            events: [{
                title: "All Day Event",
                start: e + "-01",
                description: "Lorem ipsum dolor sit incid idunt utLorem ipsum dolor sit incid idunt utLorem ipsum dolor sit incid idunt utLorem ipsum dolor sit incid idunt utLorem ipsum dolor sit incid idunt ut",
                className: "m-fc-event--success",
                item2: "item2",
            }, {
                title: "Reporting",
                start: e + "-14T13:30:00",
                description: "Lorem ipsum dolor incid idunt ut labore",
                end: e + "-14",
                className: "m-fc-event--accent"
            }, {
                title: "Company Trip",
                start: e + "-02",
                description: "Lorem ipsum dolor sit tempor incid",
                end: e + "-03",
                className: "m-fc-event--primary"
            }, {
                title: "Expo",
                start: e + "-03",
                description: "Lorem ipsum dolor sit tempor inci",
                end: e + "-05",
                className: "m-fc-event--primary"
            }, {
                title: "Dinner",
                start: e + "-12",
                description: "Lorem ipsum dolor sit amet, conse ctetur",
                end: e + "-10"
            }, {
                id: 999,
                title: "Repeating Event",
                start: e + "-09T16:00:00",
                description: "Lorem ipsum dolor sit ncididunt ut labore",
                className: "m-fc-event--danger"
            }, {
                id: 1e3,
                title: "Repeating Event",
                description: "Lorem ipsum dolor sit amet, labore",
                start: e + "-16T16:00:00"
            }, {
                title: "Conference",
                start: i,
                end: n,
                description: "Lorem ipsum dolor eius mod tempor labore",
                className: "m-fc-event--accent"
            }, {
                title: "Meeting",
                start: r + "T10:30:00",
                end: r + "T12:30:00",
                description: "Lorem ipsum dolor eiu idunt ut labore"
            }, {
                title: "Lunch",
                start: r + "T12:00:00",
                className: "m-fc-event--info",
                description: "Lorem ipsum dolor sit amet, ut labore"
            }, {
                title: "Meeting",
                start: r + "T14:30:00",
                className: "m-fc-event--warning",
                description: "Lorem ipsum conse ctetur adipi scing"
            }, {
                title: "Happy Hour",
                start: r + "T17:30:00",
                className: "m-fc-event--metal",
                description: "Lorem ipsum dolor sit amet, conse ctetur"
            }, {
                title: "Dinner",
                start: r + "T20:00:00",
                description: "Lorem ipsum dolor sit ctetur adipi scing"
            }, {
                title: "Birthday Party",
                start: n + "T07:00:00",
                className: "m-fc-event--primary",
                description: "Lorem ipsum dolor sit amet, scing"
            }, {
                title: "Click for Google",
                url: "http://google.com/",
                start: e + "-28",
                description: "Lorem ipsum dolor sit amet, labore"
            }],
            editable: !0,
            droppable: !0,
            drop: function (t, e, i, r) {
                var n = $.fullCalendar.moment(t.format());
                n.stripTime(), n.time("08:00:00");
                var a = $.fullCalendar.moment(t.format());
                a.stripTime(), a.time("12:00:00"), $(this).data("event").start = n, $(this).data("event").end = a, $("#m_calendar_external_events_remove").is(":checked") && $(this).remove()
            },
            eventRender: function (t, e) {
                e.hasClass("fc-day-grid-event") ? (e.data("content", t.description), e.data("placement", "top"), mApp.initPopover(e)) : e.hasClass("fc-time-grid-event") ? e.find(".fc-title").append('<div class="fc-description">' + t.description + "</div>") : 0 !== e.find(".fc-list-item-title").lenght && e.find(".fc-list-item-title").append('<div class="fc-description">' + t.description + "</div>")
            }
        })
    };
    return {
        init: function () {
            t(), e()
        }
    }
}();
jQuery(document).ready(function () {
    CalendarExternalEvents.init()
});