'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import {
	Box,
	Checkbox,
	Container,
	FormControl,
	FormControlLabel,
	FormGroup,
	InputLabel,
	MenuItem,
	Paper,
	Select,
} from '@mui/material'
import { SubmissionStatusSchemaType, submissionStatusSchema } from '@/types/form/schema'
import { FC, useEffect, useRef, useState } from 'react'
import { DetailModal } from './DetailModal'
import { IssueCover, IssueCoverResponse, StudentSubject } from '@/types/api-response-types'
import { ResultTable } from './ResultTable'
import { Toast } from '@/app/components'
export interface SubmissionStatusLabel {
	value: string
	label: string
	step: number
}

export const submissionStatuses: SubmissionStatusLabel[] = [
	{ value: 'pending', label: '承認待ち', step: 1 },
	{ value: 'late_pending', label: '遅れ承認待ち', step: 1 },
	{ value: 'not_submitted', label: '未提出', step: 0 },
	{ value: 'approved', label: '承認済み', step: 3 },
	{ value: 'resubmission', label: '再提出', step: 0 },
	{ value: 'rejected', label: '提出不可', step: 0 },
	{ value: 'pending_exemption_approval', label: '免除申請許可待ち', step: 1 },
	{ value: 'pending_exemption', label: '免除申請中', step: 2 },
	{ value: 'exemption', label: '免除', step: 4 },
]

interface Props {
	studentSubjects: StudentSubject[]
}

export const SubmissionStatusContents: FC<Props> = ({ studentSubjects }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [submissionData, setSubmissionData] = useState<IssueCover[]>([])
	const [currentSubmissionData, setCurrentSubmissionData] = useState<IssueCover | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isResubmissionLoading, setIsResubmissionLoading] = useState<boolean>(false)
	const [isError, setIsError] = useState<boolean>(false)
	const [isSuccess, setIsSuccess] = useState<boolean>(false)
	const currentRequestIdRef = useRef(0)

	const { control, setValue, getValues, register, watch } = useForm<SubmissionStatusSchemaType>({
		resolver: zodResolver(submissionStatusSchema),
		defaultValues: {
			statuses: [],
			subject_id: 'all',
		},
	})

	useEffect(() => {
		// 教科が選択されており、
		handleSubmit(getValues('statuses'), getValues('subject_id'))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch('subject_id')])

	const handleSubmit = async (data: (string | undefined)[], subject_id?: string | undefined) => {
		const requestId = ++currentRequestIdRef.current
		setIsLoading(true)
		const controller = new AbortController()

		try {
			const submitData = data.filter((d) => d !== undefined)

			if (submitData.length === 0 && subject_id === 'all') {
				setSubmissionData([])
				return
			}

			if (submitData.includes('exemption')) {
				submitData.push('pending_exemption_approval')
				submitData.push('pending_exemption')
			}

			const res = await fetch('/api/submission_status/search', {
				method: 'POST',
				body: JSON.stringify({
					statuses: submitData,
					subject_id: subject_id,
				}),
				signal: controller.signal,
			})

			if (currentRequestIdRef.current === requestId) {
				const submissionData: IssueCoverResponse = await res.json()
				setSubmissionData(submissionData.issue_covers)
			}
		} catch (error) {
			if (error instanceof Error && error.name !== 'AbortError') {
				console.error('Fetch failed:', error)
			}
		} finally {
			if (currentRequestIdRef.current === requestId) {
				setIsLoading(false)
			}
		}
	}

	const updateSubmissionAssignment = async () => {
		setIsResubmissionLoading(true)
		const submitData = getValues('statuses').filter((d) => d !== undefined)
		try {
			const res = await fetch('/api/submission_status/update', {
				method: 'POST',
				body: JSON.stringify({
					issue_cover_id: currentSubmissionData?.issue_cover_id,
					status: 'pending',
				}),
			})

			if (!res.ok) {
				setIsError(true)
				const error = await res.text()
				console.error(`Error updating issue cover: ${error}`)
				return
			}

			setIsSuccess(true)
			setIsResubmissionLoading(false)
			setIsOpen(false)
			setIsLoading(true)

			const searchResponse = await fetch('/api/submission_status/search', {
				method: 'POST',
				body: JSON.stringify({ statuses: submitData, subject_id: getValues('subject_id') }),
			})

			if (!searchResponse.ok) {
				const error = await searchResponse.text()
				console.error(`Error updating issue cover: ${error}`)
				return
			}

			const submissionData: IssueCoverResponse = await searchResponse.json()
			setSubmissionData(submissionData.issue_covers)
		} catch (error) {
			if (error instanceof Error) {
				console.error('Fetch failed:', error)
			}
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Container
			maxWidth='lg'
			sx={{
				pt: '20px',
			}}
		>
			<Paper
				sx={{
					p: '10px',
				}}
			>
				<Box
					sx={{
						fontWeight: 'bold',
						fontSize: '20px',
						mb: '10px',
						borderBottom: '1px solid #000',
					}}
				>
					課題表紙検索
				</Box>
				<Box>
					<Box>
						<FormControl sx={{ width: '150px', my: '10px' }}>
							<InputLabel id='teacher-subjects' size='small'>
								教科
							</InputLabel>
							<Select
								labelId='teacher-subjects'
								label='教科'
								size='small'
								{...register('subject_id')}
								defaultValue={'all'}
							>
								<MenuItem value='all'>全て</MenuItem>
								{studentSubjects.map((subject) => (
									<MenuItem key={subject.name} value={`${subject.subject_id}`}>
										{subject.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
				</Box>
				<FormGroup sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
					{submissionStatuses
						.filter(
							(status) =>
								status.value !== 'pending_exemption_approval' &&
								status.value !== 'pending_exemption',
						)
						.map((status, i) => (
							<Controller
								key={status.value}
								name={`statuses.${i}`}
								control={control}
								render={({ field }) => (
									<FormControlLabel
										control={
											<Checkbox
												checked={!!field.value}
												onChange={(e) => {
													if (e.target.checked) {
														setValue(`statuses.${i}`, e.target.value)
													} else {
														setValue(`statuses.${i}`, undefined)
													}
													handleSubmit(getValues('statuses'), getValues('subject_id'))
												}}
											/>
										}
										value={status.value}
										label={status.label}
									/>
								)}
							/>
						))}
				</FormGroup>
			</Paper>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: '10px',
					mt: '20px',
					width: '100%',
				}}
			>
				<Box
					sx={{
						fontWeight: 'bold',
						fontSize: '20px',
					}}
				>
					検索結果{submissionData.length}件
				</Box>
			</Box>
			<ResultTable
				submissionData={submissionData}
				isLoading={isLoading}
				setIsOpen={setIsOpen}
				setCurrentSubmissionData={setCurrentSubmissionData}
			/>
			<DetailModal
				isOpen={isOpen}
				isResubmissionLoading={isResubmissionLoading}
				handleClose={() => setIsOpen(false)}
				currentSubmissionData={currentSubmissionData}
				updateSubmissionAssignment={updateSubmissionAssignment}
			/>
			<Toast
				open={isError}
				handleClose={() => setIsError(false)}
				severity='error'
				message='エラーが発生しました'
			/>
			<Toast
				open={isSuccess}
				handleClose={() => setIsSuccess(false)}
				severity='success'
				message='生徒情報を登録しました'
			/>
		</Container>
	)
}
