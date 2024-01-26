export function toMySQLFormat(date: Date | undefined) {
	if (!date) return null
	const dt = new Date(date)
	return dt.toISOString().slice(0, 19).replace('T', ' ')
}
