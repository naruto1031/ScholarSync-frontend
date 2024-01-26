'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import {
	Box,
	Checkbox,
	Container,
	FormControlLabel,
	FormGroup,
	Pagination,
	Paper,
} from '@mui/material'
import { SubmissionStatusSchemaType, submissionStatusSchema } from '@/types/form/schema'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import { useRef, useState } from 'react'
import { DetailModal } from './DetailModal'
import { IssueCover, IssueCoverResponse } from '@/types/apiResponseTypes'
import { ResultTable } from './ResultTable'

export interface SubmissionStatusLabel {
	value: string
	label: string
	step: number
}

export const submissionStatuses: SubmissionStatusLabel[] = [
	{ value: 'pending', label: '承認待ち', step: 1 },
	{ value: 'not_submitted', label: '未提出', step: 0 },
	{ value: 'approved', label: '承認済み', step: 3 },
	{ value: 'overdue', label: '期限超過', step: 1 },
	{ value: 'resubmission', label: '再提出', step: 0 },
	{ value: 'rejected', label: '提出不可', step: 0 },
	{ value: 'absence', label: '公欠申請', step: 1 },
	{ value: 'exemption', label: '免除申請', step: 1 },
]

export const SubmissionStatusContents = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [submissionData, setSubmissionData] = useState<IssueCover[]>([])
	const [currentSubmissionData, setCurrentSubmissionData] = useState<IssueCover | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [page, setPage] = useState(1)
	const currentRequestIdRef = useRef(0)

	const { control, setValue, getValues } = useForm<SubmissionStatusSchemaType>({
		resolver: zodResolver(submissionStatusSchema),
		defaultValues: {
			statuses: [],
		},
	})

	const handleSubmit = async (data: (string | undefined)[]) => {
		const requestId = ++currentRequestIdRef.current
		setIsLoading(true)
		const controller = new AbortController()

		try {
			const submitData = data.filter((d) => d !== undefined)
			if (submitData.length === 0) {
				setSubmissionData([])
				return
			}

			const res = await fetch('/api/submission_status/search', {
				method: 'POST',
				body: JSON.stringify({ statuses: submitData }),
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
				<FormGroup sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
					{submissionStatuses.map((status, i) => (
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
												handleSubmit(getValues('statuses'))
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
						display: 'flex',
						alignItems: 'center',
						gap: '10px',
						cursor: 'pointer',
					}}
				>
					<FilterAltIcon />
					<Box sx={{ fontWeight: 'bold', fontSize: '20px' }}>絞り込み</Box>
				</Box>

				<Box
					sx={{
						fontWeight: 'bold',
						fontSize: '20px',
					}}
				>
					検索結果{submissionData.length}件
				</Box>
				<Pagination
					page={page}
					count={Math.ceil(submissionData.length / 10)}
					onChange={(_, page) => setPage(page)}
					sx={{
						ml: 'auto',
					}}
				/>
			</Box>
			<ResultTable
				submissionData={submissionData}
				isLoading={isLoading}
				setIsOpen={setIsOpen}
				setCurrentSubmissionData={setCurrentSubmissionData}
			/>
			<DetailModal
				isOpen={isOpen}
				handleClose={() => setIsOpen(false)}
				currentSubmissionData={currentSubmissionData}
			/>
		</Container>
	)
}
