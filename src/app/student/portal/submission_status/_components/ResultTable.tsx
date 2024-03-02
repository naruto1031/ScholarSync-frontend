import { IssueCover } from '@/types/api-response-types'
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
	useTheme,
} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import { Dispatch, FC, SetStateAction } from 'react'
import { convertStatus } from '@/utils/statusUtils'
import { ConvertStatusIcon } from '@/app/components'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

interface Props {
	submissionData: IssueCover[]
	isLoading: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
	setCurrentSubmissionData: Dispatch<SetStateAction<IssueCover | null>>
}
export const ResultTable: FC<Props> = ({
	submissionData,
	setCurrentSubmissionData,
	isLoading,
	setIsOpen,
}) => {
	const theme = useTheme()
	return (
		<>
			<Box
				sx={{
					gap: '20px',
					mt: '20px',
					mb: '70px',
					fontSize: '20px',
					[theme.breakpoints.up('sm')]: {
						display: 'none',
					},
				}}
			>
				{isLoading ? (
					<Paper
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: '10px',
							textAlign: 'center',
							padding: '20px',
							justifyContent: 'center',
						}}
					>
						<CircularProgress
							sx={{
								verticalAlign: 'middle',
								color: '#929292',
								mr: '5px',
								mb: '5px',
							}}
							size={20}
						/>
						<span>課題表紙を検索中です</span>
					</Paper>
				) : submissionData.length === 0 ? (
					<Paper
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: '10px',
							textAlign: 'center',
							padding: '20px',
							justifyContent: 'center',
						}}
					>
						<InfoIcon
							sx={{
								color: '#929292',
							}}
						/>
						<span>提出可能な課題はありません</span>
					</Paper>
				) : (
					<Box>
						{submissionData.map((row) => (
							<Paper
								key={row.issue_id}
								sx={{
									padding: '20px',
									mb: '20px',
								}}
								onClick={() => {
									setCurrentSubmissionData(row)
									setIsOpen(true)
								}}
							>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									<Box>
										<Box
											sx={{
												fontSize: '16px',
												fontWeight: 'bold',
											}}
										>
											{row.subject}
										</Box>
										<Box
											sx={{
												fontSize: '14px',
												color: '#929292',
											}}
										>
											課題No: {row.task_number}
										</Box>
									</Box>
									<Box
										sx={{
											fontSize: '14px',
											color: '#929292',
										}}
									>
										<span>
											{row.due_date
												? dayjs.utc(row.due_date).tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm')
												: '未設定'}
										</span>
									</Box>
								</Box>
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										mt: '10px',
									}}
								>
									<Box
										sx={{
											fontSize: '16px',
											fontWeight: 'bold',
										}}
									>
										{row.name}
									</Box>
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
											gap: '5px',
											ml: 'auto',
										}}
									>
										<Box>{convertStatus(row.status)}</Box>
										<span>
											<ConvertStatusIcon status={row.status} />
										</span>
									</Box>
								</Box>
							</Paper>
						))}
					</Box>
				)}
			</Box>
			<Paper
				sx={{
					maxHeight: '400px',
					overflow: 'hidden auto',
					mt: '20px',
					[theme.breakpoints.down('sm')]: {
						display: 'none',
					},
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
										key={row.issue_id}
										sx={{
											'&:last-child td, &:last-child th': { border: 0 },
											cursor: 'pointer',
											'&:hover': { backgroundColor: '#F5F5F5' },
										}}
										onClick={() => {
											setCurrentSubmissionData(row)
											setIsOpen(true)
										}}
									>
										<TableCell component='th' scope='row'>
											{row.subject}
										</TableCell>
										<TableCell align='right'>{row.task_number}</TableCell>
										<TableCell align='right'>{row.name}</TableCell>
										<TableCell align='right'>
											{dayjs.utc(row.due_date).tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm')}
										</TableCell>
										<TableCell
											align='right'
											sx={{
												display: 'flex',
												alignItems: 'center',
												gap: '5px',
											}}
										>
											<Box>{convertStatus(row.status)}</Box>
											<span>
												<ConvertStatusIcon status={row.status} />
											</span>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</>
	)
}
