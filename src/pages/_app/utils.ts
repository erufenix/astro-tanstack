export function formatDateFromTimestamp(timestamp: number) {
	return new Date(timestamp).toLocaleString(undefined, {
		timeZone: 'UTC',
	})
}
