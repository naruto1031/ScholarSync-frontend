import PendingIcon from '@mui/icons-material/Pending'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
interface Props {
	status: string
}
export const ConvertStatusIcon = ({ status }: Props) => {
	switch (status) {
		case 'pending':
			return <PendingIcon sx={{ color: '#1976d2', mt: '3px' }} />
		case 'approved':
			return <CheckCircleIcon sx={{ color: '#4caf50', mt: '3px' }} />
		case 'not_submitted':
			return <ReportGmailerrorredIcon sx={{ color: '#FFC107', mt: '3px' }} />
		case 'resubmission':
			return <ReportProblemIcon sx={{ color: '#FFC107', mt: '3px' }} />
		case 'overdue':
			return <ReportProblemIcon sx={{ color: '#FF1744', mt: '3px' }} />
		case 'rejected':
			return <ReportProblemIcon sx={{ color: '#FF1744', mt: '3px' }} />
		case 'absence':
			return <CheckCircleIcon sx={{ color: '#FF1744', mt: '3px' }} />
		case 'exemption':
			return <CheckCircleIcon sx={{ color: '#FF1744', mt: '3px' }} />
		case 'pending_exemption_approval':
			return <PendingIcon sx={{ color: '#1976d2', mt: '3px' }} />
		case 'pending_exemption':
			return <PendingIcon sx={{ color: '#1976d2', mt: '3px' }} />
		default:
			return <PendingIcon sx={{ color: '#FF1744', mt: '3px' }} />
	}
}
