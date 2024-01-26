import { Issue, IssueCover, TransformedIssue } from '@/types/apiResponseTypes'
import {
	Paper,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	CircularProgress,
	Box,
} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import { Dispatch, SetStateAction } from 'react'

interface Props {
	issues: TransformedIssue[]
	isLoading: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
	setCurrentIssue: Dispatch<SetStateAction<TransformedIssue | null>>
	setEditCurrentIssueData: Dispatch<SetStateAction<TransformedIssue | null>>
}
export const ResultTable = ({
	issues,
	setCurrentIssue,
	setEditCurrentIssueData,
	isLoading,
	setIsOpen,
}: Props) => {
	return (
		<Paper
			sx={{
				maxHeight: '450px',
				overflow: 'hidden auto',
				mt: '20px',
			}}
		>
			<TableContainer>
				<Table aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell align='left'>課題No</TableCell>
							<TableCell align='right'>課題主題</TableCell>
							<TableCell align='right'>納期設定</TableCell>
							<TableCell align='right'>公開設定</TableCell>
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
						) : issues.length === 0 ? (
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
									表示可能な課題はありません
								</TableCell>
							</TableRow>
						) : (
							issues.map((row: TransformedIssue) => (
								<TableRow
									key={row.issue_id}
									sx={{
										'&:last-child td, &:last-child th': { border: 0 },
										cursor: 'pointer',
										'&:hover': { backgroundColor: '#F5F5F5' },
									}}
									onClick={() => {
										setCurrentIssue(row)
										setEditCurrentIssueData(row)
										setIsOpen(true)
									}}
								>
									<TableCell component='th' scope='row'>
										{row.task_number}
									</TableCell>
									<TableCell align='right'>{row.name}</TableCell>
									<TableCell align='right'>
										{row.issue_classes.filter((issueClass) => issueClass.due_date === null).length >
										0
											? '納期未設定あり'
											: '納期設定済み'}
									</TableCell>
									<TableCell align='right'>{row.private_flag ? '非公開' : '公開'}</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	)
}
