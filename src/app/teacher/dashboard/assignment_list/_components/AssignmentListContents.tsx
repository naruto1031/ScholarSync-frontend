'use client'
import { Issue, TeacherSubjectAssign } from '@/app/types/apiResponseTypes'
import { Box, FormControl, InputLabel, MenuItem, Paper, Select } from '@mui/material'
import { useState } from 'react'
import { ResultTable } from './ResultTable'
import { DetailModal } from './DetailModal'
interface Props {
	subjects: TeacherSubjectAssign[]
}

// TODO: 課題一覧、課題詳細、課題の公開設定、課題の削除、課題の編集、課題学科の割り当て
export const AssignmentListContents = ({ subjects }: Props) => {
	const [teacherSubjectId, setTeacherSubjectId] = useState<string | undefined>()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [issues, setIssues] = useState<Issue[]>([])
	const [currentIssue, setCurrentIssue] = useState<Issue | null>(null)
	const [isAsc, setIsAsc] = useState<boolean>(true)

	const handleSubmit = async (teacherSubjectId: string | undefined) => {
		try {
			setIsLoading(true)
			if (teacherSubjectId === undefined) {
				setIssues([])
				return
			}
			const res = await fetch(`/api/assignment/${teacherSubjectId}`)
			if (!res.ok) {
				throw new Error(res.statusText)
			}
			const data: Issue[] = await res.json()
			if (isAsc) {
				data.sort((a, b) => (a.task_number > b.task_number ? 1 : -1))
			} else {
				data.sort((a, b) => (a.task_number < b.task_number ? 1 : -1))
			}
			setIssues(data)
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Box>
			<Paper
				sx={{
					py: '10px',
					px: '40px',
					my: '10px',
				}}
			>
				<Box
					sx={{
						fontSize: '20px',
						fontWeight: 'bold',
						mb: '10px',
					}}
				>
					課題検索
				</Box>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					<FormControl sx={{ width: '300px', mb: '10px' }}>
						<InputLabel id='teacher-subjects' size='small'>
							担当教科
						</InputLabel>
						<Select
							labelId='teacher-subjects'
							label='担当教科'
							size='small'
							value={teacherSubjectId}
							onChange={(e) => {
								const value = e.target.value
								setTeacherSubjectId(value)
								handleSubmit(value)
							}}
						>
							<MenuItem value={undefined}>選択してください</MenuItem>
							{subjects.map((subject) => (
								<MenuItem key={subject.teacher_subject_id} value={`${subject.teacher_subject_id}`}>
									{subject.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
			</Paper>
			<ResultTable
				isLoading={isLoading}
				issues={issues}
				setCurrentIssue={setCurrentIssue}
				setIsOpen={setIsOpen}
			/>
			<DetailModal
				isOpen={isOpen}
				handleClose={() => setIsOpen(false)}
				currentIssueData={currentIssue}
			/>
		</Box>
	)
}
