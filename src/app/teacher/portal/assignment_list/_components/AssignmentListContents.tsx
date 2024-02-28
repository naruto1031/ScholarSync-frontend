'use client'
import { Issue, TeacherSubjectAssign, TransformedIssue } from '@/types/api-response-types'
import { Box, FormControl, InputLabel, MenuItem, Paper, Select } from '@mui/material'
import { useState } from 'react'
import { ResultTable } from './ResultTable'
import { DetailModal } from './DetailModal'
import { numberToBoolean } from '@/utils/numberToBoolean'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { Toast } from '@/app/components'

dayjs.extend(utc)
dayjs.extend(timezone)
interface Props {
	subjects: TeacherSubjectAssign[]
}

// TODO: 課題一覧、課題詳細、課題の公開設定、課題の削除、課題の編集、課題学科の割り当て
export const AssignmentListContents = ({ subjects }: Props) => {
	const [teacherSubjectId, setTeacherSubjectId] = useState<string | undefined>()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [isError, setIsError] = useState<boolean>(false)
	const [isSuccess, setIsSuccess] = useState<boolean>(false)
	const [issues, setIssues] = useState<TransformedIssue[]>([])
	const [currentIssue, setCurrentIssue] = useState<TransformedIssue | null>(null)
	const [editCurrentIssueData, setEditCurrentIssueData] = useState<TransformedIssue | null>(null)
	const [isAsc] = useState<boolean>(true)

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

			const transformIssue = (issue: Issue): TransformedIssue => {
				return {
					...issue,
					private_flag: numberToBoolean(issue.private_flag),
					challenge_flag: numberToBoolean(issue.challenge_flag),
					issue_classes: issue.issue_classes.map((issueClass) => {
						return {
							...issueClass,
							due_date: issueClass.due_date ? dayjs.utc(issueClass.due_date).format() : null,
						}
					}),
				}
			}

			// APIからデータを取得して変換する
			const resData: Issue[] = await res.json()
			const transformedData: TransformedIssue[] = resData.map(transformIssue)
			if (isAsc) {
				transformedData.sort((a, b) => (a.task_number > b.task_number ? 1 : -1))
			} else {
				transformedData.sort((a, b) => (a.task_number < b.task_number ? 1 : -1))
			}

			setIssues(transformedData)
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
				setEditCurrentIssueData={setEditCurrentIssueData}
				setCurrentIssue={setCurrentIssue}
				setIsOpen={setIsOpen}
			/>
			<DetailModal
				isOpen={isOpen}
				isAsc={isAsc}
				setIssues={setIssues}
				setIsSuccess={setIsSuccess}
				setIsError={setIsError}
				handleClose={() => setIsOpen(false)}
				editCurrentIssueData={editCurrentIssueData}
				currentIssueData={currentIssue}
				setEditCurrentIssueData={setEditCurrentIssueData}
				setCurrentIssue={setCurrentIssue}
			/>

			<Toast
				open={isSuccess}
				handleClose={() => setIsSuccess(false)}
				severity='success'
				message='保存しました'
			/>

			<Toast
				open={isError}
				handleClose={() => setIsError(false)}
				severity='error'
				message='保存に失敗しました'
			/>
		</Box>
	)
}
