export default function getDateInStringFormat(d: Date, inc_day = 0) {
  d.setDate(d.getDate() + inc_day);
  const month = d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (1 + d.getMonth());
  const day = d.getDate() > 9 ? d.getDate() : '0' + d.getDate();
  return month + '/' + day + '/' + d.getFullYear();
}
