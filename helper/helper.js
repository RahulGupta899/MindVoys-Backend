const moment = require('moment')

exports.formattedDateNow = ()=>{
    const date = new Date();
    return dateWithFormat = date.toDateString()+", "+date.toTimeString()
}


exports.convertDate = (rawDate)=>{
    // FROM:  DD/MM/YYYY, 12:00:00 am , TO: MM/DD/YYYY
    const datePart = rawDate.split(",")[0];
    const mydate = moment(datePart, 'DD/MM/YYYY'); 
    let formatted = moment(mydate).format("YYYY/MM/DD");
    formatted = formatted.split("/").join("-")
    return formatted 
}