import { IssueCover } from '@/app/types/apiResponseTypes'
import {
	Paper,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	CircularProgress,
} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import { Dispatch, SetStateAction } from 'react'

interface Props {
	submissionData: IssueCover[]
	isLoading: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
}
export const ResultTable = ({ submissionData, isLoading, setIsOpen }: Props) => {
	return (
		<Paper
			sx={{
				maxHeight: '400px',
				overflow: 'hidden auto',
				mt: '20px',
			}}
		>
			<TableContainer>
				<Table aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell align='left'>科目記号</TableCell>
							<TableCell align='right'>課題No</TableCell>
							<TableCell align='right'>課題主題</TableCell>
							<TableCell align='right'>納期</TableCell>
							<TableCell align='right'>提出状況</TableCell>
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
									課題表紙を検索中です
								</TableCell>
							</TableRow>
						) : submissionData.length === 0 ? (
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
										<InfoIcon
											sx={{
												verticalAlign: 'middle',
												color: '#929292',
												mr: '5px',
												mb: '5px',
											}}
										/>
									</span>
									表示可能な課題表紙はありません
								</TableCell>
							</TableRow>
						) : (
							submissionData.map((row: IssueCover) => (
								<TableRow
									key={row.issue_cover_id}
									sx={{
										'&:last-child td, &:last-child th': { border: 0 },
										cursor: 'pointer',
										'&:hover': { backgroundColor: '#F5F5F5' },
									}}
									onClick={() => setIsOpen(true)}
								>
									<TableCell component='th' scope='row'>
										{row.subject}
									</TableCell>
									<TableCell align='right'>{row.task_number}</TableCell>
									<TableCell align='right'>{row.name}</TableCell>
									<TableCell align='right'>{row.due_date}</TableCell>
									<TableCell align='right'>{row.status}</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	)
}
