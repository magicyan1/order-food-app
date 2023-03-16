function toDub(n) {
	return n < 10 ? '0' + n : '' + n;
}

function date(date) {
	const oDate = new Date(date);
	return `${oDate.getFullYear()}-${toDub(oDate.getMonth()+1)}-${oDate.getDate()} ${toDub(oDate.getHours())}:${toDub(oDate.getMinutes())}:${toDub(oDate.getSeconds())}`;
}
export default date
