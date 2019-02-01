var dates = new Array();

function addDate(date) {
    if (jQuery.inArray(date, dates) < 0) dates.push(date);
}

function removeDate(index) {
    dates.splice(index, 1);
}

function printArray() {
    var printArr = new String;
    dates.forEach(function (val) {
        printArr += '<h4>' + val + '</h4>';
    });
    $('#print-array').html(printArr);
}
// Adds a date if we don't have it yet, else remove it
function addOrRemoveDate(date) {
    var index = jQuery.inArray(date, dates);
    if (index >= 0) 
        removeDate(index);
    else 
        addDate(date);

    printArray();
}

// Takes a 1-digit number and inserts a zero before it
function padNumber(number) {
    var ret = new String(number);
    if (ret.length == 1) ret = "0" + ret;
    return ret;
}

$("#datepicker").datepicker({
    minDate: 0, // today
    maxDate: 30 ,
    onSelect: function (dateText, inst) {
        addOrRemoveDate(dateText);
    },
    beforeShowDay: function (date) {
        var year = date.getFullYear();
        // months and days are inserted into the array in the form, e.g "01/01/2009", but here the format is "1/1/2009"
        var month = padNumber(date.getMonth() + 1);
        var day = padNumber(date.getDate());
        // This depends on the datepicker's date format
        var dateString = month + "/" + day + "/" + year;

        var gotDate = jQuery.inArray(dateString, dates);
        if (gotDate >= 0) {
            // Enable date so it can be deselected. Set style to be highlighted
            return [true, "ui-state-highlight"];
        }
        // Dates not in the array are left enabled, but with no extra style
        return [true, ""];
    }
});