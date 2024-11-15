export function getCurrentTime() {
	const now = new Date();
	let hours = now.getHours();
	const minutes = now.getMinutes();
	const amPm = hours >= 12 ? "PM" : "AM";
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	const minutesFormatted = minutes < 10 ? "0" + minutes : minutes;
	const timeFormatted = hours + ":" + minutesFormatted + " " + amPm;
	return timeFormatted;
}
