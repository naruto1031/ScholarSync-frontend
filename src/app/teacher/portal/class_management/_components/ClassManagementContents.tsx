'use client'
import { ClassIssueCover, TeacherClass, ClassSubject } from '@/types/api-response-types'
import {
	ClassAssignmentSearchConditionSchemaType,
	classAssignmentSearchConditionSchema,
} from '@/types/form/schema'
import { convertStatus, convertStatusColor } from '@/utils/statusUtils'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircularProgress, FormHelperText, InputLabel, Select } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import LoadingButton from '@mui/lab/LoadingButton'

interface Props {
	teacherClasses: TeacherClass[]
}

export const ClassManagementContents = ({ teacherClasses }: Props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [subjectLoading, setSubjectLoading] = useState<boolean>(false)
	const [subjectList, setSubjectList] = useState<ClassSubject[]>([])
	const [issueCover, setIssueCover] = useState<ClassIssueCover>()
	const findSubjectListByClassId = async (classId: string) => {
		setSubjectLoading(true)
		try {
			const res = await fetch(`/api/subject/${classId}`)

			if (!res.ok) {
				throw new Error('Failed to fetch subject list')
			}
			const data = await res.json()
			setSubjectList(data)
			setSubjectLoading(false)
		} catch (error) {
			console.error(error)
			setSubjectLoading(false)
		}
	}
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<ClassAssignmentSearchConditionSchemaType>({
		mode: 'onSubmit',
		reValidateMode: 'onSubmit',
		resolver: zodResolver(classAssignmentSearchConditionSchema),
		defaultValues: {
			classId: '',
			subjectId: '',
		},
	})

	const onSubmit = async (data: ClassAssignmentSearchConditionSchemaType) => {
		setIsLoading(true)
		try {
			const res = await fetch('/api/class_assignment', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					class_id: data.classId,
					subject_id: data.subjectId,
				}),
			})
			if (!res.ok) {
				throw new Error('Failed to fetch class assignment')
			}

			const result: ClassIssueCover = await res.json()
			setIssueCover(result)
		} catch (error) {
			console.error(error)
		}
		setIsLoading(false)
	}

	return (
		<Box>
			<Paper
				sx={{
					maxHeight: '450px',
					overflow: 'hidden auto',
					mt: '20px',
					gap: '20px',
					padding: '20px',
					display: 'flex',
				}}
			>
				<FormControl sx={{ width: '200px' }} size='small'>
					<InputLabel id='teacher-subjects'>担任クラス</InputLabel>
					<Select
						labelId='teacher-subjects'
						label='担当クラス'
						error={!!errors.classId}
						onChange={(e) => {
							setValue('classId', e.target.value)
							findSubjectListByClassId(e.target.value)
						}}
						defaultValue={''}
						disabled={teacherClasses.length === 0 || isLoading}
					>
						{teacherClasses.map((classData) => (
							<MenuItem key={classData.class_teacher_id} value={`${classData.class_id}`}>
								{classData.class_name}
							</MenuItem>
						))}
					</Select>
					{errors.classId?.message && (
						<FormHelperText error>{errors.classId?.message}</FormHelperText>
					)}
				</FormControl>
				<FormControl sx={{ width: '200px' }} size='small'>
					<InputLabel id='assignment'>
						{subjectLoading ? (
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
							'教科'
						)}
					</InputLabel>
					<Select
						labelId='assignment'
						label='教科'
						error={!!errors.subjectId}
						{...register('subjectId')}
						defaultValue={''}
						disabled={
							watch('classId') === undefined ||
							watch('classId') === '' ||
							subjectLoading ||
							isLoading
						}
					>
						{subjectList.map((subject) => (
							<MenuItem key={subject.subject_id} value={`${subject.subject_id}`}>
								{subject.name}
							</MenuItem>
						))}
					</Select>
					{errors.subjectId?.message && (
						<FormHelperText error>{errors.subjectId?.message}</FormHelperText>
					)}
				</FormControl>
				<LoadingButton variant='contained' loading={isLoading} onClick={handleSubmit(onSubmit)}>
					検索
				</LoadingButton>
			</Paper>
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
								<TableCell
									align='left'
									sx={{
										border: '1px solid #e0e0e0',
										fontSize: '12px',
										fontWeight: 'bold',
									}}
								>
									No
								</TableCell>
								<TableCell
									align='left'
									sx={{
										border: '1px solid #e0e0e0',
										fontSize: '12px',
										fontWeight: 'bold',
									}}
								>
									学生
								</TableCell>
								{issueCover?.issues
									.sort((a, b) => Number(a.task_number) - Number(b.task_number))
									.map((issue) => {
										return (
											<TableCell
												key={issue.issue_id}
												align='right'
												sx={{
													border: '1px solid #e0e0e0',
													fontSize: '12px',
													fontWeight: 'bold',
												}}
											>
												{issue.task_number}
											</TableCell>
										)
									})}
							</TableRow>
						</TableHead>
						<TableBody
							sx={{
								fontSize: '10px',
							}}
						>
							{issueCover?.students
								.sort((a, b) => Number(a.attendance_number) - Number(b.attendance_number))
								.map((student) => {
									return (
										<TableRow key={student.student_id}>
											<TableCell
												align='left'
												sx={{
													border: '1px solid #e0e0e0',
													fontSize: '12px',
													fontWeight: 'bold',
												}}
											>
												{student.attendance_number}
											</TableCell>
											<TableCell
												align='left'
												sx={{
													border: '1px solid #e0e0e0',
													fontSize: '12px',
													fontWeight: 'bold',
												}}
											>
												{student.name}
											</TableCell>
											{issueCover.issues.map((issue) => {
												const issueCoverData = issueCover.issue_covers.find((issueCover) => {
													return issueCover
														.map((cover) => cover.student_id)
														.includes(student.student_id)
												})
												const issueData = issueCoverData?.find(
													(issueCover) => issueCover.issue_id === issue.issue_id,
												)
												return (
													<TableCell
														key={issue.issue_id}
														align='right'
														sx={{
															border: '1px solid #e0e0e0',
															backgroundColor: convertStatusColor(issueData?.status),
															fontWeight: 'bold',
															fontSize: '12px',
														}}
													>
														{convertStatus(issueData?.status)}
													</TableCell>
												)
											})}
										</TableRow>
									)
								})}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</Box>
	)
}
