export const convertStatus = (status: string | undefined): string => {
	switch (status) {
		case 'pending':
			return '承認待ち'
		case 'late_pending':
			return '遅れ承認待ち'
		case 'approved':
			return '承認'
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
		case 'pending_exemption_approval':
			return '免除申請許可待ち'
		case 'pending_exemption':
			return '免除申請中'
		default:
			return '未提出'
	}
}

export const convertStatusColor = (status: string | undefined): string => {
	switch (status) {
		case 'pending':
			return '#87cefa'
		case 'late_pending':
			return '#87cefa'
		case 'approved':
			return '#98fb98'
		case 'not_submitted':
			return '#EA9999'
		case 'resubmission':
			return '#EA9999'
		case 'overdue':
			return '#FF0000'
		case 'rejected':
			return '#EA9999'
		case 'absence':
			return '#FF0000'
		case 'exemption':
			return '#FFD700'
		case 'pending_exemption_approval':
			return '#87cefa'
		case 'pending_exemption':
			return '#87cefa'
		default:
			return '#EA9999'
	}
}
