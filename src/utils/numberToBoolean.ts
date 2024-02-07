export function numberToBoolean(num: number | undefined): boolean {
	if (num === undefined) {
		return false
	}
	return num !== 0
}
