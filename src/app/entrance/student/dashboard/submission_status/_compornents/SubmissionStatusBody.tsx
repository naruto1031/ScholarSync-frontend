'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import {
	Box,
	Checkbox,
	Container,
	FormControlLabel,
	FormGroup,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material'
import { SubmissionStatusSchemaType, submissionStatusSchema } from '@/app/types/form/schema'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import { useState } from 'react'
import { DetailModal } from './DetailModal'

const submissionStatuses = [
	{ value: 'pending', label: '承認待ち' },
	{ value: 'not_submitted', label: '未提出' },
	{ value: 'approved', label: '承認済み' },
	{ value: 'overdue', label: '期限超過' },
	{ value: 'resubmission', label: '再提出' },
	{ value: 'rejected', label: '提出不可' },
	{ value: 'absence', label: '公欠申請' },
	{ value: 'exemption', label: '免除申請' },
]

const mockData = [
	{
		subjectCode: 'A0001',
		taskNo: 1,
		taskTheme: 'テーマ1',
		deadline: '2021/10/10',
		status: '承認待ち',
	},
	{
		subjectCode: 'A0002',
		taskNo: 2,
		taskTheme: 'テーマ2',
		deadline: '2021/10/10',
		status: '未提出',
	},
	{
		subjectCode: 'A0003',
		taskNo: 3,
		taskTheme: 'テーマ3',
		deadline: '2021/10/10',
		status: '承認済み',
	},
	{
		subjectCode: 'A0004',
		taskNo: 4,
		taskTheme: 'テーマ4',
		deadline: '2021/10/10',
		status: '期限超過',
	},
	{
		subjectCode: 'A0005',
		taskNo: 5,
		taskTheme: 'テーマ5',
		deadline: '2021/10/10',
		status: '再提出',
	},
	{
		subjectCode: 'A0006',
		taskNo: 6,
		taskTheme: 'テーマ6',
		deadline: '2021/10/10',
		status: '提出不可',
	},
	{
		subjectCode: 'A0007',
		taskNo: 7,
		taskTheme: 'テーマ7',
		deadline: '2021/10/10',
		status: '公欠申請',
	},
	{
		subjectCode: 'A0008',
		taskNo: 8,
		taskTheme: 'テーマ8',
		deadline: '2021/10/10',
		status: '免除申請',
	},
]

export const SubmissionStatusBody = () => {
	const [isOpen, setIsOpen] = useState(true)
	const { control, setValue, getValues } = useForm<SubmissionStatusSchemaType>({
		resolver: zodResolver(submissionStatusSchema),
		defaultValues: {
			statuses: [],
		},
	})

	const handleSubmit = async (data: (string | undefined)[]) => {
		const submitData = data.filter((d) => d !== undefined)
		console.log(submitData)
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
					cursor: 'pointer',
					width: 'fit-content',
				}}
			>
				<FilterAltIcon />
				<Box sx={{ fontWeight: 'bold', fontSize: '20px' }}>絞り込み</Box>
			</Box>
			<Paper
				sx={{
					maxHeight: '400px',
					overflow: 'hidden auto',
					mt: '20px',
				}}
			>
				<TableContainer>
					<Table aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell align='left'>科目記号</TableCell>
								<TableCell align='right'>課題No</TableCell>
								<TableCell align='right'>課題主題</TableCell>
								<TableCell align='right'>納期</TableCell>
								<TableCell align='right'>提出状況</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{mockData.map((row) => (
								<TableRow
									key={row.taskNo}
									sx={{
										'&:last-child td, &:last-child th': { border: 0 },
										cursor: 'pointer',
										'&:hover': { backgroundColor: '#F5F5F5' },
									}}
									onClick={() => setIsOpen(true)}
								>
									<TableCell component='th' scope='row'>
										{row.subjectCode}
									</TableCell>
									<TableCell align='right'>{row.taskNo}</TableCell>
									<TableCell align='right'>{row.taskTheme}</TableCell>
									<TableCell align='right'>{row.deadline}</TableCell>
									<TableCell align='right'>{row.status}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
			<DetailModal isOpen={isOpen} handleClose={() => setIsOpen(false)} />
		</Container>
	)
}
