
<!------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
// returns true if the string is empty
function isEmpty(str){
  return (str == null) || (str.length == 0);
}
<!------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
function trim(s) {
return s.replace(/^\s+|\s+$/g, "");
}
<!------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
function isNumeric(str) {
var n = trim(str);
return n.length>0 && !(/[^-0-9.]/).test(n)
}
<!------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
function escapeSQLString(txtString) { 
   var sqlString = String(txtString).replace(/'/g,"''"); 
   return sqlString;
}
<!------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
// returns true if the string contains only whitespace
// cannot check a password type input for whitespace
function isWhitespace(str){ 
  var re = /[\S]/g
  if (re.test(str)) return false;
  return true;
}
<!------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
// removes any whitespace from the string and returns the result
// the value of "replacement" will be used to replace the whitespace (optional)
function stripWhitespace(str, replacement){
  if (replacement == null) replacement = '';
  var result = str;
  var re = /\s/g
  if(str.search(re) != -1){
    result = str.replace(re, replacement);
  }
  return result;
}

<!------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
function validDateTime_YYYY_MM_DD_HH_MM_SS(adate) {
//validate the datetimes of this format : yyyy-mm-dd hh:mm:ss
var valid = true;
var spaceIndex = adate.indexOf(" ");
var onlyDate = adate.substring(0,spaceIndex);
var dateData = onlyDate.split("-");
var onlyTime = adate.substring(spaceIndex);
var timeData = onlyTime.split(":");
var year = parseInt(dateData[0]);
var month = parseInt(dateData[1]);
var day = parseInt(dateData[2]);
var hour = parseInt(timeData[0]);
var min = parseInt(timeData[1]);
var sec = parseInt(timeData[2]);
var reg = new RegExp('[0-9]$');

if(!reg.test(day) || !reg.test(month) || !reg.test(year) || !reg.test(hour) || !reg.test(min) || !reg.test(sec)) valid =false;

else if((month < 1) || (month > 12)) valid = false;

else if((day < 1) || (day > 31)) valid = false;
else if(((month == 4) || (month == 6) || (month == 9) || (month == 11)) && (day > 30)) valid = false;
else if((month == 2) && (((year % 400) == 0) || ((year % 4) == 0)) && ((year % 100) != 0) && (day > 29)) valid = false;
else if((month == 2) && ((year % 100) == 0) && (day > 29)) valid = false;
else if((hour < 0) || (hour > 24)) valid = false;
else if((min < 0) || (min > 59)) valid = false;
else if((sec < 0) || (sec > 59)) valid = false;

return valid;
}

<!------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
function dateFromString(s) {
  var bits = s.split(/[-T: ]/g);
  var d = new Date(bits[0], bits[1]-1, bits[2]);
  d.setHours(bits[3], bits[4], bits[5]);
  return d;
}

<!------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
function formatDate(dt) {
  var d = dt.getDate();
  var m = dt.getMonth() + 1;
  var y = dt.getFullYear();
  var h = dt.getHours();
  var mi = dt.getMinutes();
  var s = dt.getSeconds();
  return y + "-" + (m<=9 ? '0' + m : m) + "-" + (d<=9 ? '0' + d : d) + " " + (h<=9 ? '0' + h : h)+ ":" + (mi<=9 ? '0' + mi : mi) + ":" + (s<=9 ? '0' + s : s);
}

<!------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
function sleep(miliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > miliseconds) {
			break;
		}
	}
}

Date.prototype.yyyymmddhhmiss = function() {
                                
        var yyyy = this.getFullYear().toString();                
        var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
        var dd  = this.getDate().toString();

        var hh  = this.getHours().toString();
        var mi  = this.getMinutes().toString();
        var ss  = this.getSeconds().toString(); 
                            
        return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]) + ' ' + (hh[1]?hh:"0"+hh[0]) + ':' + (mi[1]?mi:"0"+mi[0]) + ':' + (ss[1]?ss:"0"+ss[0]);
   };

Date.prototype.yyyymmdd = function() {
                                
        var yyyy = this.getFullYear().toString();                
        var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
        var dd  = this.getDate().toString();
                            
        return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]);
   };

Date.prototype.yyyymmddWoDash = function() {
                                
        var yyyy = this.getFullYear().toString();                
        var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
        var dd  = this.getDate().toString();
                            
        return yyyy + '' + (mm[1]?mm:"0"+mm[0]) + '' + (dd[1]?dd:"0"+dd[0]);
   };

function parse(str) {
    var y = str.substr(0,4),
        m = str.substr(4,2) - 1,
        d = str.substr(6,2);
    var D = new Date(y,m,d);
    return (D.getFullYear() == y && D.getMonth() == m && D.getDate() == d) ? D : 'invalid date';
}

function loadXML(file)
{
    var xmlDoc = null;
    try //Internet Explorer
    {
        xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async=false;
        xmlDoc.load(file);
    }
    catch(e)
    {
        try //Firefox, Mozilla, Opera, etc.
        {
            xmlDoc=document.implementation.createDocument("","",null);
            xmlDoc.async=false;
            xmlDoc.load(file);
        }
        catch(e)
        {
            try //Google Chrome
            {
                var xmlhttp = new window.XMLHttpRequest();
                xmlhttp.open("GET",file,false);
                xmlhttp.send(null);
                xmlDoc = xmlhttp.responseXML.documentElement;
            }
            catch(e)
            {
            error=e.message;
            }
        }
    }
    return xmlDoc;
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
