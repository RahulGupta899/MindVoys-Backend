exports.formattedDateNow = ()=>{
    const date = new Date();
    return dateWithFormat = date.toDateString()+", "+date.toTimeString()
}