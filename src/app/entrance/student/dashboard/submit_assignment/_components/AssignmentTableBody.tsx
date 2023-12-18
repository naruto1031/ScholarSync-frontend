'use client'
import {
	Box,
	Pagination,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material'
import { useState, useTransition } from 'react'
import { SubmitModal } from './SubmitModal'
import { Issue, PendingIssuesResponse } from '@/app/types/apiResponseTypes'
import { css } from '../../../../../../../styled-system/css'

interface Props {
	issueData: Issue[]
	totalIssueCount: number
	handleSubmit: () => Promise<PendingIssuesResponse | undefined>
}

export const AssignmentTableBody = ({ issueData, totalIssueCount, handleSubmit }: Props) => {
	const [assignmentIssueData, setAssignmentIssueData] = useState<Issue[]>(issueData)
	const [isPending, startTransition] = useTransition()
	const [isOpen, setIsOpen] = useState(false)
	const [currentTask, setCurrentTask] = useState<Issue | null>(null)
	const [page, setPage] = useState(1)

	const handleSubmission = async () => {
		try {
			let res: PendingIssuesResponse | undefined
			startTransition(async () => {
				res = await handleSubmit()
				if (!res) {
					alert('提出に失敗しました')
					return
				}
				alert('提出しました')
				setAssignmentIssueData(res.issues)
				handleClose()
			})
			return res
		} catch (error) {
			alert('エラーが発生しました')
			return
		}
	}

	const handleOpen = (row: Issue) => {
		setCurrentTask(row)
		setIsOpen(true)
	}

	const handleClose = () => {
		setCurrentTask(null)
		setIsOpen(false)
	}

	return (
		<>
			<Box display={'flex'} width={'100%'} alignItems={'center'}>
				<Box>課題総数: {totalIssueCount}件</Box>
				<Box width={'fit-content'} m={'0 0 20px auto'}>
					<Pagination
						count={Math.ceil(totalIssueCount / 10)}
						color='primary'
						page={page}
						onChange={(_, page) => setPage(page)}
					/>
				</Box>
			</Box>
			<Box
				maxHeight={'500px'}
				overflow={'hidden auto'}
				boxShadow={'0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}
			>
				<TableContainer>
					<Table sx={{ minWidth: 650 }} aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell>科目記号</TableCell>
								<TableCell align='right'>課題No</TableCell>
								<TableCell align='right'>課題主題</TableCell>
								<TableCell align='right'>納期</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{assignmentIssueData.map((row) => (
								<TableRow
									key={row.issueID}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									onClick={() => handleOpen(row)}
									className={css({ cursor: 'pointer', _hover: { backgroundColor: '#F5F5F5' } })}
								>
									<TableCell component='th' scope='row'>
										{row.subjectName}
									</TableCell>
									<TableCell align='right'>{row.issueID}</TableCell>
									<TableCell align='right'>{row.issueName}</TableCell>
									<TableCell align='right'>{row.dueDate}</TableCell>
								</TableRow>
							))}
						</TableBody>
						<SubmitModal
							data={currentTask}
							isOpen={isOpen}
							handleClose={handleClose}
							handleSubmit={handleSubmission}
							isLoading={isPending}
						/>
					</Table>
				</TableContainer>
			</Box>
		</>
	)
}
