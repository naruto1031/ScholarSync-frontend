export const convertStatus = (status: string | undefined): string => {
	switch (status) {
		case 'pending':
			return '承認待ち'
		case 'approved':
			return '承認済み'
		case 'not_submitted':
			return '未提出'
		case 'resubmission':
			return '再提出'
		case 'overdue':
			return '期限超過'
		case 'rejected':
			return '提出不可'
		case 'absence':
			return '欠席'
		case 'exemption':
			return '免除'
		default:
			return '未提出'
	}
}
