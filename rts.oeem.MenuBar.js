function MenuBar(f) {

    var oMenuBar = new sap.ui.commons.MenuBar("menuBar", {
        // enabled : true,
        // width : "100%",
        // design : sap.ui.commons.MenuBarDesign.Header,
        items: [
            new sap.ui.commons.MenuItem({
                text: "Home",
                enabled: true,
                submenu: new sap.ui.commons.Menu({
                    items: new sap.ui.commons.MenuItem("Home", {
                        text: "Home",
                        enabled: true,
                        select: MenuSelect
                    })
                })
            }),
            new sap.ui.commons.MenuItem({
                text: "Settings",
                enabled: true,
                submenu: new sap.ui.commons.Menu({
                    items: [new sap.ui.commons.MenuItem({
                        text: "Enterprise Hierarchy",
                        enabled: true,
                        submenu: new sap.ui.commons.Menu({
                            items: [new sap.ui.commons.MenuItem("HierarchyManagement", {
                                text: "Hierarchy Management",
                                enabled: true,
                                select: MenuSelect
                            }), new sap.ui.commons.MenuItem("HierarchyLevelsSetup", {
                                text: "Hierarchy Levels Setup",
                                enabled: true,
                                select: MenuSelect
                            }), new sap.ui.commons.MenuItem("EquipmentManagement", {
                                text: "Equipment Management",
                                enabled: true,
                                select: MenuSelect
                            }), new sap.ui.commons.MenuItem("PlantWorkForce", {
                                text: "Plant Work Force",
                                enabled: true,
                                select: MenuSelect
                            }), new sap.ui.commons.MenuItem("PlantShiftsAndBreaks", {
                                text: "Plant Shifts And Breaks",
                                enabled: true,
                                select: MenuSelect
                            })]
                        })
                    }), new sap.ui.commons.MenuItem({
                        text: "Memory Maps",
                        enabled: true,
                        submenu: new sap.ui.commons.Menu({
                            items: [new sap.ui.commons.MenuItem("MemoryMapTags", {
                                text: "Memory Map Tags",
                                enabled: true,
                                select: MenuSelect
                            }), new sap.ui.commons.MenuItem("MemoryMapTransactions", {
                                text: "Memory Map Transactions",
                                enabled: true,
                                select: MenuSelect
                            }), new sap.ui.commons.MenuItem("PLCTagGroups", {
                                text: "PLC Tag Groups",
                                enabled: true,
                                select: MenuSelect
                            }), new sap.ui.commons.MenuItem("PLCTagTypes", {
                                text: "PLC Tag Types",
                                enabled: true,
                                select: MenuSelect
                            }), new sap.ui.commons.MenuItem("PLCTagFunctions", {
                                text: "PLC Tag Functions",
                                enabled: true,
                                select: MenuSelect
                            })]
                        })
                    }), new sap.ui.commons.MenuItem({
                        text: "Plant Connectivity",
                        enabled: true,
                        submenu: new sap.ui.commons.Menu({
                            items: [new sap.ui.commons.MenuItem("ShopFloorOperators", {
                                text: "Shop Floor Operators",
                                enabled: true,
                                select: MenuSelect
                            }), new sap.ui.commons.MenuItem("ShopFloorComputers", {
                                text: "Shop Floor Computers",
                                enabled: true,
                                select: MenuSelect
                            }), new sap.ui.commons.MenuItem("ShopFloorPrinters", {
                                text: "Shop Floor Printers",
                                enabled: true,
                                select: MenuSelect
                            }), new sap.ui.commons.MenuItem("PlantConnectivityServers", {
                                text: "Plant Connectivity Servers",
                                enabled: true,
                                select: MenuSelect
                            }), new sap.ui.commons.MenuItem("PlantConnectivityAgents", {
                                text: "Plant Connectivity Agents",
                                enabled: true,
                                select: MenuSelect
                            }), new sap.ui.commons.MenuItem("LineSideSQLServers", {
                                text: "Line Side SQL Servers",
                                enabled: true,
                                select: MenuSelect
                            })]
                        })
                    }), new sap.ui.commons.MenuItem({
                        text: "Master Data Setup",
                        enabled: true,
                        submenu: new sap.ui.commons.Menu({
                            items: [new sap.ui.commons.MenuItem("UnitsOfMeasure", {
                                text: "Units Of Measure",
                                enabled: true,
                                select: MenuSelect
                            }), new sap.ui.commons.MenuItem("ProductsManagement", {
                                text: "Products Management",
                                enabled: true,
                                select: MenuSelect
                            }), new sap.ui.commons.MenuItem("BillsofMaterials", {
                                text: "Bills of Materials",
                                enabled: true,
                                select: MenuSelect
                            }), new sap.ui.commons.MenuItem("ProductsRouting", {
                                text: "Products Routing",
                                enabled: true,
                                select: MenuSelect
                            })]
                        })
                    })]
                })
            }),
            new sap.ui.commons.MenuItem({
                text: "Dashboards",
                enabled: true,
                submenu: new sap.ui.commons.Menu({
                    items: [new sap.ui.commons.MenuItem("OEEDashboard", {
                        text: "OEE Dashboard",
                        enabled: true,
                        select: MenuSelect
                    }), new sap.ui.commons.MenuItem("AvailabilityDashboard", {
                        text: "Availability Dashboard",
                        enabled: true,
                        select: MenuSelect
                    }), new sap.ui.commons.MenuItem("PerformanceDashboard", {
                        text: "Performance Dashboard",
                        enabled: true,
                        select: MenuSelect
                    }), new sap.ui.commons.MenuItem("QualityDashboard", {
                        text: "Quality Dashboard",
                        enabled: true,
                        select: MenuSelect
                    }), new sap.ui.commons.MenuItem("AlertsDashboard", {
                        text: "Alerts Dashboard",
                        enabled: true,
                        select: MenuSelect
                    })]
                })
            }),
            new sap.ui.commons.MenuItem({
                text: "Reports",
                enabled: true,
                submenu: new sap.ui.commons.Menu({
                    items: [new sap.ui.commons.MenuItem("OEEReport", {
                        text: "OEE Report",
                        enabled: true,
                        select: MenuSelect
                    }), new sap.ui.commons.MenuItem("AvailabilityReport", {
                        text: "Availability Report",
                        enabled: true,
                        select: MenuSelect
                    }), new sap.ui.commons.MenuItem("PerformanceReport", {
                        text: "Performance Report",
                        enabled: true,
                        select: MenuSelect
                    }), new sap.ui.commons.MenuItem("QualityReport", {
                        text: "Quality Report",
                        enabled: true,
                        select: MenuSelect
                    }), new sap.ui.commons.MenuItem("AlertsReport", {
                        text: "Alerts Report",
                        enabled: true,
                        select: MenuSelect
                    })]
                })
            })
        ]
    });


    oMenuBar.placeAt(f.elm);

}
var _MenuSelect = function (oEvent) {
    cc(oEvent.getParameter("item").getId());
    cc(oEvent.getParameter("item").getText());

};

function ss(_string) {
    alert(_string);
}

function cc(_object) {
    console.log(_object);
}
var MenuSelect = function (oEvent) {
    // cc(oEvent);
    // ss(oEvent);
    // reurn;
    var itemid = oEvent.getParameter("item").getId();
    cc(itemid);
    // alert(itemid);
    var appID = "";
    switch (itemid) {
        // Menu home
        case "Home":
            setTimeout("location.href = '" + "OEEM.irpt?ROLE=" + document.getElementById("user_role").value + "'", 0);
            // Menu Settings 1
            break;
        case "OEEDashboard":
            setTimeout("location.href = '" + "DashBoard.irpt?ROLE=" + document.getElementById("user_role").value + "'", 0);
            break;
        case "OEEReport":
            setTimeout("location.href = '" + "Reports.irpt?ROLE=" + document.getElementById("user_role").value + "'", 0);
            break;
        case "Equipment_Management":
            appID = "MgtHierarchy.irpt?ROLE=" + document.getElementById("user_role").value;
            // setTimeout("location.href = '" + "MgtHierarchy.irpt?ROLE=" +
            // document.getElementById("user_role").value + "'", 0);
            break;
        case "Hierarchy_Levels_Setup":
            appID = "LvlHierarchy.irpt?ROLE=" + document.getElementById("user_role").value;
            // setTimeout("location.href = '" + "LvlHierarchy.irpt?ROLE=" +
            // document.getElementById("user_role").value + "'", 0);
            break;

        // Menu Settings 2
        case "item1-4-1":
            appID = "MemMapTags.irpt?ROLE=" + document.getElementById("user_role").value;
            // setTimeout("location.href = '" + "MemMapTags.irpt?ROLE=" +
            // document.getElementById("user_role").value + "'", 0);
            break;
        case "item1-4-5":
            appID = "MemMapTrxs.irpt?ROLE=" + document.getElementById("user_role").value;
            // setTimeout("location.href = '" + "MemMapTrxs.irpt?ROLE=" +
            // document.getElementById("user_role").value + "'", 0);
            break;
        case "item1-4-4":
            appID = "TagCommGroups.irpt?ROLE=" + document.getElementById("user_role").value;
            // setTimeout("location.href = '" + "TagCommGroups.irpt?ROLE=" +
            // document.getElementById("user_role").value + "'", 0);
            break;
        case "item1-4-2":
            appID = "TagTypes.irpt?ROLE=" + document.getElementById("user_role").value;
            // setTimeout("location.href = '" + "TagTypes.irpt?ROLE=" +
            // document.getElementById("user_role").value + "'", 0);
            break;
        case "item1-4-3":
            appID = "TagFunctions.irpt?ROLE=" + document.getElementById("user_role").value;
            // setTimeout("location.href = '" + "TagFunctions.irpt?ROLE=" +
            // document.getElementById("user_role").value + "'", 0);
            break;

        // Menu Settings 3
        case "item1-5-6":
            appID = "Operators.irpt?ROLE=" + document.getElementById("user_role").value;
            // setTimeout("location.href = '" + "Operators.irpt?ROLE=" +
            // document.getElementById("user_role").value + "'", 0);
            break;
        case "item1-5-1":
            appID = "Stations.irpt?ROLE=" + document.getElementById("user_role").value;
            // setTimeout("location.href = '" + "Stations.irpt?ROLE=" +
            // document.getElementById("user_role").value + "'", 0);
            break;
        case "item1-5-2":
            appID = "Printers.irpt?ROLE=" + document.getElementById("user_role").value;
            // setTimeout("location.href = '" + "Printers.irpt?ROLE=" +
            // document.getElementById("user_role").value + "'", 0);
            break;
        case "item1-5-3":
            appID = "PCoServers.irpt?ROLE=" + document.getElementById("user_role").value;
            // setTimeout("location.href = '" + "PCoServers.irpt?ROLE=" +
            // document.getElementById("user_role").value + "'", 0);
            break;
        case "item1-5-4":
            appID = "PCoAgents.irpt?ROLE=" + document.getElementById("user_role").value;
            // setTimeout("location.href = '" + "PCoAgents.irpt?ROLE=" +
            // document.getElementById("user_role").value + "'", 0);
            break;
        case "item1-5-5":
            appID = "SqlServers.irpt?ROLE=" + document.getElementById("user_role").value;
            // setTimeout("location.href = '" + "SqlServers.irpt?ROLE=" +
            // document.getElementById("user_role").value + "'", 0);
            break;

        // Menu Settings 4
        case "item1-7-1":
            appID = "UnitsOfMeasure.irpt?ROLE=" + document.getElementById("user_role").value;
            // setTimeout("location.href = '" + "UnitsOfMeasure.irpt?ROLE=" +
            // document.getElementById("user_role").value + "'", 0);
            break;
        case "item1-7-2":
            appID = "ProductsMgmt.irpt?ROLE=" + document.getElementById("user_role").value;
            // setTimeout("location.href = '" + "ProductsMgmt.irpt?ROLE=" +
            // document.getElementById("user_role").value + "'", 0);
            break;
        case "item1-7-3":
            appID = "BomMgmt.irpt?ROLE=" + document.getElementById("user_role").value;
            // setTimeout("location.href = '" + "BomMgmt.irpt?ROLE=" +
            // document.getElementById("user_role").value + "'", 0);
            break;
        case "item1-7-4":
            appID = "RoutingMgmt.irpt?ROLE=" + document.getElementById("user_role").value;
            // setTimeout("location.href = '" + "RoutingMgmt.irpt?ROLE=" +
            // document.getElementById("user_role").value + "'", 0);
            break;

        // Menu Default
        default:
            // alert("Items \"" + oEvent.getParameter("itemId") + "\" was
            // selected.");
            break;
    }
    if (appID == "") {
        return false;
    }
    if (!locked) {
        locked = true;
        xPage.setContent("<iframe src=\"" + appID + "\" style=\"border:none;\" height=\"1000px\" width=\"100%\"></iframe>");
        xPage.placeAt("p1");
    }

};

