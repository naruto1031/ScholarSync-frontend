'use client'
import { IssueCoverSearchCondition } from '@/types/apiResponseTypes'
import CircularProgress from '@mui/material/CircularProgress'
import Info from '@mui/icons-material/Info'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

interface Props {
	issueCoverData: IssueCoverSearchCondition[]
	isLoading: boolean
}

export const ResultTable = ({ isLoading, issueCoverData }: Props) => {
	return (
		<TableContainer component={Paper}>
			<Table aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell>Assignment</TableCell>
						<TableCell align='right'>Result</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{isLoading ? (
						<TableRow>
							<TableCell
								colSpan={5}
								align='center'
								sx={{
									fontSize: '20px',
									fontWeight: 'bold',
									color: '#929292',
									alignItems: 'center',
								}}
							>
								<span>
									<CircularProgress
										sx={{
											verticalAlign: 'middle',
											color: '#929292',
											mr: '5px',
											mb: '5px',
										}}
										size={20}
									/>
								</span>
								課題を検索中です
							</TableCell>
						</TableRow>
					) : issueCoverData.length === 0 ? (
						<TableRow>
							<TableCell
								colSpan={5}
								align='center'
								sx={{
									fontSize: '20px',
									fontWeight: 'bold',
									color: '#929292',
									alignItems: 'center',
								}}
							>
								<span>
									<Info
										sx={{
											verticalAlign: 'middle',
											color: '#929292',
											mr: '5px',
											mb: '5px',
										}}
									/>
								</span>
								表示可能な課題はありません
							</TableCell>
						</TableRow>
					) : (
						issueCoverData.map((issueCover) => (
							<TableRow key={issueCover.issue_id}>
								<TableCell>{issueCover.attendance_number}</TableCell>
								<TableCell>{issueCover.student_name}</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
