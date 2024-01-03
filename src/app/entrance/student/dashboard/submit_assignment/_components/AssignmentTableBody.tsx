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
import { useState } from 'react'
import { SubmitModal } from './SubmitModal'
import { Issue, PendingIssuesResponse } from '@/app/types/apiResponseTypes'
import { css } from '../../../../../../../styled-system/css'
import { useRouter } from 'next/router'

interface Props {
	issueData: Issue[]
	totalIssueCount: number
}

export const AssignmentTableBody = ({ issueData, totalIssueCount }: Props) => {
	const [assignmentIssueData, setAssignmentIssueData] = useState<Issue[]>(issueData)
	const [isOpen, setIsOpen] = useState(false)
	const [currentTask, setCurrentTask] = useState<Issue | null>(null)
	const [page, setPage] = useState(1)
	const [isLoading, setIsLoading] = useState(false)
	const [isAbsenceLoading, setIsAbsenceLoading] = useState(false)
	const [isExemptionLoading, setIsExemptionLoading] = useState(false)

	const handleSubmission = async (id: number | undefined) => {
		try {
			if (!id) return
			setIsLoading(true)
			const res = await fetch('/api/submit_assignment/register', {
				method: 'POST',
				body: JSON.stringify({
					issueId: id,
				}),
			})
			const data: PendingIssuesResponse = await res.json()
			alert('提出しました')
			setAssignmentIssueData(data.issues)
			handleClose()
			setIsLoading(false)
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

	const handleAbsenceApplication = async (id: number | undefined) => {
		try {
			if (!id) return
			setIsAbsenceLoading(true)
			const res = await fetch('/api/submit_assignment/absence', {
				method: 'POST',
				body: JSON.stringify({
					issueId: id,
				}),
			})
			alert('公欠申請が完了しました')
			handleClose()
			setIsAbsenceLoading(false)
		} catch (error) {
			alert('エラーが発生しました')
			return
		}
	}

	const handleExemptionApplication = async (id: number | undefined) => {
		try {
			if (!id) return
			setIsExemptionLoading(true)
			const res = await fetch('/api/submit_assignment/exemption', {
				method: 'POST',
				body: JSON.stringify({
					issueId: id,
				}),
			})
			alert('免除申請が完了しました')
			handleClose()
			setIsExemptionLoading(false)
		} catch (error) {
			alert('エラーが発生しました')
			return
		}
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
							isLoading={isLoading}
							isAbsenceLoading={isAbsenceLoading}
							isExemptionLoading={isExemptionLoading}
							handleClose={handleClose}
							handleSubmit={handleSubmission}
							handleAbsenceApplication={handleAbsenceApplication}
							handleExemptionApplication={handleExemptionApplication}
						/>
					</Table>
				</TableContainer>
			</Box>
		</>
	)
}
