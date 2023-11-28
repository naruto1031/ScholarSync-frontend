'use client'
import { TableBody, TableCell, TableRow, Modal, Box } from '@mui/material'
import { css } from '../../../../styled-system/css'
import { useState, useTransition } from 'react'
import { ResponseTaskData, Task } from '@/app/student/dashboard/submit_assignment/page'
import { SubmitModal } from './SubmitModal'

interface Props {
	data: Task[]
	handleSubmit: () => Promise<ResponseTaskData | undefined>
}

export const AssignmentTableBody = ({ data, handleSubmit }: Props) => {
	const [assignmetTaskData, setAssignmentTaskData] = useState<Task[]>(data)

	const [isPending, startTransition] = useTransition()
	const [isOpen, setIsOpen] = useState(false)
	const [currentTask, setCurrentTask] = useState<Task | null>(null)

	const handleSubmission = async () => {
		try {
			let res: ResponseTaskData | undefined
			startTransition(async () => {
				res = await handleSubmit()
				if (!res) {
					alert('提出に失敗しました')
					return
				}
				alert('提出しました')
				console.log(res.data)
				setAssignmentTaskData(res.data)
				handleClose()
			})
			return res
		} catch (error) {
			alert('エラーが発生しました')
			return
		}
	}

	const handleOpen = (row: Task) => {
		setCurrentTask(row)
		setIsOpen(true)
	}

	const handleClose = () => {
		setCurrentTask(null)
		setIsOpen(false)
	}

	return (
		<>
			<TableBody>
				{assignmetTaskData.map((row, i) => (
					<TableRow
						key={i}
						sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						onClick={() => handleOpen(row)}
						className={css({ cursor: 'pointer', _hover: { backgroundColor: '#F5F5F5' } })}
					>
						<TableCell component='th' scope='row'>
							{row.subjectCode}
						</TableCell>
						<TableCell align='right'>{row.taskNumber}</TableCell>
						<TableCell align='right'>{row.taskTopic}</TableCell>
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
		</>
	)
}
