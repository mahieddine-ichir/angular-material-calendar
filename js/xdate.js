Date.prototype.getMonthAsString = function() {
  return this.toLocaleString("en-us", { month: "long" });
};
Date.prototype.getDayAsString = function() {
  return this.toLocaleString("en-us", { weekday: "long" });
};
Date.prototype.add = function(field, value) {
  var date = new Date(this.getTime());
  if (field == 'month') {
    date.setMonth(date.getMonth() + value);
  } else if (field == 'year') {
    date.setFullYear(date.getFullYear() + value);
  } else if (field == 'day') {
    date.setUTCDate(date.getUTCDate() + value);
  }
  return date;
};