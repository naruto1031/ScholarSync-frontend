'use client'
import { Issue, TransformedIssue, UpdateIssue } from '@/types/api-response-types'

import {
	Box,
	Button,
	Modal,
	TextField,
	Paper,
	FormControlLabel,
	Radio,
	RadioGroup,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { DateTimePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { Dispatch, SetStateAction, useState } from 'react'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { toMySQLFormat } from '@/utils/toMySQLDateTimeFormatUtil'
import { numberToBoolean } from '@/utils/numberToBoolean'

dayjs.extend(utc)
dayjs.extend(timezone)

interface Props {
	isOpen: boolean
	currentIssueData: TransformedIssue | null
	editCurrentIssueData: TransformedIssue | null
	isAsc: boolean
	setIssues: Dispatch<SetStateAction<TransformedIssue[]>>
	setIsSuccess: Dispatch<SetStateAction<boolean>>
	setIsError: Dispatch<SetStateAction<boolean>>
	handleClose: () => void
	setEditCurrentIssueData: Dispatch<SetStateAction<TransformedIssue | null>>
	setCurrentIssue: Dispatch<SetStateAction<TransformedIssue | null>>
}

export const DetailModal = ({
	isOpen,
	currentIssueData,
	editCurrentIssueData,
	isAsc,
	setIssues,
	setIsSuccess,
	setIsError,
	setEditCurrentIssueData,
	setCurrentIssue,
	handleClose,
}: Props) => {
	const [isEdit, setIsEdit] = useState(false)
	const theme = useTheme()

	const onSubmit = async () => {
		if (!currentIssueData || !editCurrentIssueData) return
		const isChanged = Object.keys(currentIssueData).some((key) => {
			if (key === 'issue_classes') {
				return currentIssueData.issue_classes.some((issueClass, i) => {
					return issueClass.due_date !== editCurrentIssueData.issue_classes[i].due_date
				})
			}
			return (
				currentIssueData[key as keyof TransformedIssue] !==
				editCurrentIssueData[key as keyof TransformedIssue]
			)
		})

		if (!isChanged) return

		const changedDueDates = editCurrentIssueData.issue_classes
			.filter((issueClass, i) => issueClass.due_date !== currentIssueData.issue_classes[i].due_date)
			.map((issueClass) => ({
				issue_class_id: issueClass.issue_class_id,
				due_date: (issueClass.due_date && toMySQLFormat(new Date(issueClass.due_date))) || null,
				class_name: issueClass.class_name,
				class_id: issueClass.class_id,
			}))

		const updateData: UpdateIssue = {
			issue_id: `${editCurrentIssueData.issue_id}`,
			teacher_subject_id: `${editCurrentIssueData.teacher_subject_id}`,
			task_number:
				editCurrentIssueData.task_number === currentIssueData.task_number
					? undefined
					: editCurrentIssueData.task_number,
			name:
				editCurrentIssueData.name === currentIssueData.name ? undefined : editCurrentIssueData.name,
			comment:
				editCurrentIssueData.comment === currentIssueData.comment
					? undefined
					: editCurrentIssueData.comment,
			private_flag:
				editCurrentIssueData.private_flag === currentIssueData.private_flag
					? undefined
					: editCurrentIssueData.private_flag,
			challenge_flag:
				editCurrentIssueData.challenge_flag === currentIssueData.challenge_flag
					? undefined
					: editCurrentIssueData.challenge_flag,
			challenge_max_score:
				editCurrentIssueData.challenge_max_score === currentIssueData.challenge_max_score
					? undefined
					: editCurrentIssueData.challenge_max_score,
			due_dates: changedDueDates.length === 0 ? undefined : changedDueDates,
		}

		try {
			const res = await fetch('/api/assignment/update', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updateData),
			})
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

			const resData: Issue[] = await res.json()
			const transformedData: TransformedIssue[] = resData.map(transformIssue)
			if (isAsc) {
				transformedData.sort((a, b) => (a.task_number > b.task_number ? 1 : -1))
			} else {
				transformedData.sort((a, b) => (a.task_number < b.task_number ? 1 : -1))
			}

			setIssues(transformedData)
			setIsSuccess(true)
			setIsEdit(false)
			transformedData.forEach((issue) => {
				if (issue.issue_id === editCurrentIssueData.issue_id) {
					setCurrentIssue(issue)
				}
			})
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message)
				setIsError(true)
			}
		}
	}

	return (
		<Modal open={isOpen} onClose={() => false}>
			<Paper
				sx={{
					maxWidth: '700px',
					width: '100%',
					height: '80%',
					overflow: 'auto',
					position: 'absolute',
					top: '50%',
					left: '50%',
					boxShadow: '0px 0px 15px -5px #777777',
					borderRadius: '10px',
					transform: 'translate(-50%, -50%)',
					backgroundColor: '#fff',
					border: 'none',
					padding: '30px 60px',
					'&:focus': {
						outline: 'none',
					},
					'&:active': {
						outline: 'none',
					},
					[theme.breakpoints.down('md')]: {
						maxWidth: '70%',
						padding: '20px 30px',
					},
					[theme.breakpoints.down('sm')]: {
						padding: '15px 20px',
					},
				}}
			>
				<Box
					sx={{
						width: '100%',
						fontSize: '20px',
						fontWeight: 'bold',
					}}
				>
					<Box
						sx={{
							mb: '20px',
						}}
					>
						課題No.
					</Box>
					<TextField
						label='課題No.'
						variant='outlined'
						value={editCurrentIssueData?.task_number}
						disabled={!isEdit}
						onChange={(e) => {
							if (!editCurrentIssueData) return
							setEditCurrentIssueData({
								...editCurrentIssueData,
								task_number: e.target.value,
							})
						}}
					/>
				</Box>
				<Box
					sx={{
						fontSize: '20px',
						fontWeight: 'bold',
					}}
				>
					<Box
						sx={{
							mb: '20px',
						}}
					>
						課題名:{' '}
					</Box>
					<TextField
						label='課題名'
						variant='outlined'
						value={editCurrentIssueData?.name}
						sx={{
							mb: '20px',
						}}
						disabled={!isEdit}
						onChange={(e) => {
							if (!editCurrentIssueData) return
							setEditCurrentIssueData({
								...editCurrentIssueData,
								name: e.target.value,
							})
						}}
					/>
				</Box>
				<Box
					sx={{
						mb: '20px',
					}}
				>
					{editCurrentIssueData?.issue_classes?.map((issueClass, i) => (
						<Box
							key={i}
							sx={{
								mt: '10px',
								mb: '10px',
								border: '1px solid #ccc',
								borderRadius: '5px',
								p: '10px',
							}}
						>
							<Box
								sx={{
									mb: '10px',
								}}
							>
								クラス名: {issueClass.department_name + issueClass?.class_name}
							</Box>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									[theme.breakpoints.down('sm')]: {
										flexDirection: 'column',
										textAlign: 'left',
									},
								}}
							>
								<Box
									sx={{
										[theme.breakpoints.down('sm')]: {
											mb: '10px',
										},
									}}
								>
									提出期限:
								</Box>
								<DateTimePicker
									disabled={!isEdit}
									label='提出期限'
									ampm={false}
									timeSteps={{
										minutes: 1,
									}}
									value={
										(issueClass.due_date && dayjs.utc(issueClass.due_date).tz('Asia/Tokyo')) || null
									}
									onChange={(date: Dayjs | null) => {
										if (!editCurrentIssueData) return
										setEditCurrentIssueData({
											...editCurrentIssueData,
											issue_classes: editCurrentIssueData.issue_classes.map((issueClass, index) => {
												if (index !== i) return issueClass
												return {
													...issueClass,
													due_date: date ? date.utc().format() : null,
												}
											}),
										})
									}}
								/>
							</Box>
						</Box>
					))}
				</Box>
				<Box
					sx={{
						fontSize: '20px',
						fontWeight: 'bold',
					}}
				>
					<Box>コメント:</Box>

					<TextField
						label='コメント'
						variant='outlined'
						defaultValue={editCurrentIssueData?.comment}
						sx={{
							mb: '20px',
						}}
						disabled={!isEdit}
						onChange={(e) => {
							if (!editCurrentIssueData) return
							setEditCurrentIssueData({
								...editCurrentIssueData,
								comment: e.target.value,
							})
						}}
						value={editCurrentIssueData?.comment}
					/>
				</Box>
				<Box
					sx={{
						fontSize: '20px',
						fontWeight: 'bold',
					}}
				>
					<Box>公開設定:</Box>
					<RadioGroup
						value={editCurrentIssueData?.private_flag}
						onChange={(e) => {
							if (!editCurrentIssueData) return
							setEditCurrentIssueData({
								...editCurrentIssueData,
								private_flag: e.target.value === 'true',
							})
						}}
					>
						<FormControlLabel disabled={!isEdit} value={'false'} control={<Radio />} label='公開' />
						<FormControlLabel
							disabled={!isEdit}
							value={'true'}
							control={<Radio />}
							label='非公開'
						/>
					</RadioGroup>
				</Box>
				<Box
					sx={{
						fontSize: '20px',
						fontWeight: 'bold',
					}}
				>
					<Box
						sx={{
							mb: '20px',
						}}
					>
						チャレンジ問題
					</Box>
					<RadioGroup
						value={editCurrentIssueData?.challenge_flag}
						onChange={(e) => {
							if (!editCurrentIssueData) return

							setEditCurrentIssueData({
								...editCurrentIssueData,
								challenge_flag: e.target.value === 'true' ? true : false,
							})
						}}
					>
						<FormControlLabel
							disabled={!isEdit}
							value={'false'}
							control={<Radio />}
							label='未実施'
						/>
						<FormControlLabel disabled={!isEdit} value={'true'} control={<Radio />} label='実施' />
					</RadioGroup>
					<Box
						sx={{
							mb: '20px',
						}}
					>
						チャレンジ問題の満点
					</Box>
					<TextField
						label='満点'
						variant='outlined'
						defaultValue={currentIssueData?.challenge_max_score}
						sx={{
							mb: '20px',
						}}
						type='number'
						disabled={!isEdit || !editCurrentIssueData?.challenge_flag}
						onChange={(e) => {
							if (!editCurrentIssueData) return
							setEditCurrentIssueData({
								...editCurrentIssueData,
								challenge_max_score: Number(e.target.value),
							})
						}}
					/>
				</Box>
				<Box
					sx={{
						display: 'flex',
						mt: '20px',
						mb: '20px',
					}}
				>
					<Button
						variant='contained'
						sx={{
							mr: '20px',
						}}
						onClick={() => {
							setIsEdit(!isEdit)
						}}
					>
						{isEdit ? 'キャンセルする' : '編集する'}
					</Button>
					<Button variant='contained' onClick={onSubmit}>
						保存する
					</Button>
				</Box>
				<Button onClick={handleClose}>閉じる</Button>
			</Paper>
		</Modal>
	)
}
