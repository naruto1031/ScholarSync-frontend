'use client'
import { submissionStatuses } from '@/app/student/portal/submission_status/_components/SubmissionStatusContents'
import { Issue, TeacherSubjectAssign } from '@/types/api-response-types'
import {
	AssignmentSearchConditionSchemaType,
	assignmentSearchConditionSchema,
} from '@/types/form/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

interface Props {
	onSubmit: (data: AssignmentSearchConditionSchemaType) => void
	teacherSubjects: TeacherSubjectAssign[]
	searchLoading: boolean
	issues: Issue[]
	setIssues: Dispatch<SetStateAction<Issue[]>>
}

export const SearchCondition = ({
	onSubmit,
	teacherSubjects,
	searchLoading,
	issues,
	setIssues,
}: Props) => {
	const [issueLoading, setIssueLoading] = useState<boolean>(false)

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<AssignmentSearchConditionSchemaType>({
		mode: 'onSubmit',
		reValidateMode: 'onSubmit',
		resolver: zodResolver(assignmentSearchConditionSchema),
		defaultValues: {
			teacherSubjectId: '',
			classId: '',
			issueId: '',
			attendanceNumbers: [],
			excludeAttendanceNumbers: [],
		},
	})

	const findIssueByTeacherSubjectId = async (teacherSubjectId: string) => {
		setIssueLoading(true)
		const response = await fetch(`/api/assignment/${teacherSubjectId}`)
		const data: Issue[] = await response.json()
		reset({
			...watch(),
			issueId: undefined,
		})
		setIssues(data)
		setIssueLoading(false)
	}

	useEffect(() => {
		if (watch('teacherSubjectId') === undefined || watch('teacherSubjectId').length === 0) {
			setIssues([])
			return
		}
		findIssueByTeacherSubjectId(watch('teacherSubjectId'))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch('teacherSubjectId')])

	const classId = Number(watch('classId'))
	const studentCount = issues.reduce((_, issue) => {
		const classStudentCount = issue.issue_classes
			.filter((issueClass) => issueClass.class_id === classId)
			.reduce((_, issueClass) => {
				return issueClass.student_count
			}, 0)
		return classStudentCount
	}, 0)

	return (
		<Paper
			sx={{
				padding: '20px',
			}}
		>
			<Box
				sx={{
					width: '100%',
					display: 'flex',
					flexWrap: 'wrap',
					gap: '20px',
				}}
			>
				<FormControl sx={{ width: '200px' }} size='small'>
					<InputLabel id='teacher-subjects'>担当教科</InputLabel>
					<Select
						labelId='teacher-subjects'
						label='担当教科'
						error={!!errors.teacherSubjectId}
						{...register('teacherSubjectId')}
						defaultValue={''}
						disabled={teacherSubjects.length === 0 || searchLoading}
					>
						{teacherSubjects.map((subject) => (
							<MenuItem key={subject.teacher_subject_id} value={`${subject.teacher_subject_id}`}>
								{subject.name}
							</MenuItem>
						))}
					</Select>
					{errors.teacherSubjectId?.message && (
						<FormHelperText error>{errors.teacherSubjectId?.message}</FormHelperText>
					)}
				</FormControl>

				<FormControl sx={{ width: '400px' }} size='small'>
					<InputLabel id='assignment'>
						{issueLoading ? (
							<Box
								sx={{
									display: 'flex',
									gap: '4px',
									alignItems: 'center',
								}}
							>
								<CircularProgress color='inherit' size='1em' />
								検索中
							</Box>
						) : (
							'課題'
						)}
					</InputLabel>
					<Select
						labelId='assignment'
						label='課題'
						error={!!errors.issueId}
						{...register('issueId')}
						defaultValue={''}
						disabled={
							watch('teacherSubjectId') === undefined ||
							watch('teacherSubjectId') === '' ||
							issueLoading ||
							issues.length === 0 ||
							searchLoading
						}
					>
						{issues.map((issue) => (
							<MenuItem key={issue.issue_id} value={`${issue.issue_id}`}>
								No.{issue.task_number}: {issue.name}
							</MenuItem>
						))}
					</Select>
					{errors.issueId?.message && (
						<FormHelperText error>{errors.issueId?.message}</FormHelperText>
					)}
				</FormControl>

				<FormControl sx={{ width: '200px' }} size='small'>
					<InputLabel id='school_class'>クラス</InputLabel>
					<Select
						labelId='school_class'
						label='担当教科'
						error={!!errors.classId}
						{...register('classId')}
						defaultValue={''}
						disabled={
							watch('teacherSubjectId') === undefined ||
							watch('teacherSubjectId') === '' ||
							searchLoading
						}
					>
						{watch('teacherSubjectId') &&
							teacherSubjects
								.find((subject) => subject.teacher_subject_id === Number(watch('teacherSubjectId')))
								?.departments.map((department) => {
									return department.classes.map((classData) => (
										<MenuItem key={classData.class_id} value={`${classData.class_id}`}>
											{department.name}
											{classData.name}
										</MenuItem>
									))
								})}
					</Select>
					{errors.classId?.message && (
						<FormHelperText error>{errors.classId?.message}</FormHelperText>
					)}
				</FormControl>

				<FormControl sx={{ width: '200px' }} size='small'>
					<InputLabel id='status'>ステータス</InputLabel>
					<Select
						labelId='status'
						label='ステータス'
						error={!!errors.status}
						{...register('status')}
						defaultValue={''}
						disabled={searchLoading}
					>
						<MenuItem value='all'>全て</MenuItem>
						{submissionStatuses.map((status) => (
							<MenuItem key={status.value} value={`${status.value}`}>
								{status.label}
							</MenuItem>
						))}
					</Select>
					{errors.status?.message && (
						<FormHelperText error>{errors.status?.message}</FormHelperText>
					)}
				</FormControl>

				<FormControl sx={{ width: '200px' }} size='small'>
					<InputLabel id='attendance_number'>出席番号</InputLabel>
					<Select
						labelId='attendance_number'
						label='出席番号'
						error={!!errors.attendanceNumbers}
						{...register('attendanceNumbers')}
						defaultValue={[]}
						disabled={
							searchLoading ||
							(watch('excludeAttendanceNumbers')?.length ?? 0) > 0 ||
							watch('classId') === '' ||
							watch('status') === 'not_submitted'
						}
						multiple
					>
						{Array.from({ length: studentCount }).map((_, index) => (
							<MenuItem key={index} value={`${index + 1}`}>
								{index + 1}
							</MenuItem>
						))}
					</Select>
					{errors.attendanceNumbers?.message && (
						<FormHelperText error>{errors.attendanceNumbers?.message}</FormHelperText>
					)}
				</FormControl>

				<FormControl sx={{ width: '200px' }} size='small'>
					<InputLabel id='exclude_attendance_number'>除外出席番号</InputLabel>
					<Select
						labelId='exclude_attendance_number'
						label='除外出席番号'
						error={!!errors.excludeAttendanceNumbers}
						{...register('excludeAttendanceNumbers')}
						defaultValue={[]}
						disabled={
							searchLoading ||
							(watch('attendanceNumbers')?.length ?? 0) > 0 ||
							watch('classId') === '' ||
							watch('status') === 'not_submitted'
						}
						multiple
					>
						{Array.from({ length: studentCount }).map((_, index) => (
							<MenuItem key={index} value={`${index + 1}`}>
								{index + 1}
							</MenuItem>
						))}
					</Select>
					{errors.excludeAttendanceNumbers?.message && (
						<FormHelperText error>{errors.excludeAttendanceNumbers?.message}</FormHelperText>
					)}
				</FormControl>
				<LoadingButton variant='contained' loading={searchLoading} onClick={handleSubmit(onSubmit)}>
					検索
				</LoadingButton>
			</Box>
		</Paper>
	)
}
