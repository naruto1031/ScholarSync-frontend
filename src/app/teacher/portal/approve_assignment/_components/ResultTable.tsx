'use client'
import CircularProgress from '@mui/material/CircularProgress'
import Info from '@mui/icons-material/Info'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Box from '@mui/material/Box'
import { convertStatus } from '@/utils/statusUtils'
import { ConvertStatusIcon } from '@/app/components'
import { IssueCoverSearchCondition } from '@/types/api-response-types'
import { Dispatch, SetStateAction } from 'react'

interface Props {
	issueCoverData: IssueCoverSearchCondition[]
	isLoading: boolean
	onOpenIndividualModal: (issueCover: IssueCoverSearchCondition) => void
}

export const ResultTable = ({ isLoading, issueCoverData, onOpenIndividualModal }: Props) => {
	return (
		<TableContainer component={Paper}>
			<Table aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell>出席番号</TableCell>
						<TableCell align='right'>学籍番号</TableCell>
						<TableCell align='right'>名前</TableCell>
						<TableCell align='right'>チャレンジスコア</TableCell>
						<TableCell align='right'>評価</TableCell>
						<TableCell align='right'>提出状況</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{isLoading ? (
						<TableRow>
							<TableCell
								colSpan={6}
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
								生徒を検索中です
							</TableCell>
						</TableRow>
					) : issueCoverData.length === 0 ? (
						<TableRow>
							<TableCell
								colSpan={6}
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
								表示可能な生徒情報がありません
							</TableCell>
						</TableRow>
					) : (
						issueCoverData.map((issueCover) => (
							<TableRow
								key={issueCover.issue_id}
								sx={{
									'&:last-child td, &:last-child th': { border: 0 },
									cursor: issueCover.status === 'not_submitted' ? 'auto' : 'pointer',
									'&:hover': {
										backgroundColor: issueCover.status === 'not_submitted' ? undefined : '#F5F5F5',
									},
								}}
								onClick={() => {
									if (issueCover.status === 'not_submitted') return
									onOpenIndividualModal(issueCover)
								}}
							>
								<TableCell>{issueCover.attendance_number}</TableCell>
								<TableCell align='right'>{issueCover.registration_number}</TableCell>
								<TableCell align='right'>{issueCover.student_name}</TableCell>
								<TableCell align='right'>{issueCover.current_score || 'ー'}</TableCell>
								<TableCell align='right'>{issueCover.evaluation || 'ー'}</TableCell>
								<TableCell
									align='right'
									sx={{
										display: 'flex',
										alignItems: 'center',
										gap: '5px',
									}}
								>
									<Box>{convertStatus(issueCover.status)}</Box>
									<span>
										<ConvertStatusIcon status={issueCover.status} />
									</span>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
