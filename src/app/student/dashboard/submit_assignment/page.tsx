import { Box, Button, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { css } from '../../../../../styled-system/css'
import { AssignmentTableBody } from '@/app/components'
import { getServerSession } from 'next-auth'
import { options } from '@/app/options'

export type Task = {
	subjectCode: string
	taskNumber: number
	taskTopic: string
	dueDate: string
}

export interface Greeting {
	greeting: string
}
export default function SubmitAssignment() {
	async function getGreeting(): Promise<Greeting | undefined> {
		'use server'
		const session = await getServerSession(options)
		const res = await fetch(`${process.env.API_URL}/api/greeting`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${session?.user.accessToken}`,
			},
		})
		if (res.ok) {
			const json = await res.json()
			return json
		} else {
			throw new Error('Failed to fetch API')
		}
	}

	const mockData: Task[] = [
		{ subjectCode: 'A001', taskNumber: 1, taskTopic: 'Basic Mathematics', dueDate: '2023-10-01' },
		{
			subjectCode: 'A002',
			taskNumber: 2,
			taskTopic: 'Principles of Physics',
			dueDate: '2023-10-05',
		},
		{ subjectCode: 'A003', taskNumber: 3, taskTopic: 'Chemical Reactions', dueDate: '2023-10-10' },
		{
			subjectCode: 'A004',
			taskNumber: 4,
			taskTopic: 'Evolution of Biology',
			dueDate: '2023-10-15',
		},
		{ subjectCode: 'A005', taskNumber: 5, taskTopic: 'Advanced Algebra', dueDate: '2023-10-20' },
		{ subjectCode: 'A006', taskNumber: 6, taskTopic: 'Quantum Mechanics', dueDate: '2023-10-25' },
		{ subjectCode: 'A007', taskNumber: 7, taskTopic: 'Organic Chemistry', dueDate: '2023-10-30' },
		{ subjectCode: 'A008', taskNumber: 8, taskTopic: 'Cell Biology', dueDate: '2023-11-01' },
		{
			subjectCode: 'A009',
			taskNumber: 9,
			taskTopic: 'Calculus Fundamentals',
			dueDate: '2023-11-05',
		},
		{
			subjectCode: 'A010',
			taskNumber: 10,
			taskTopic: 'Space & Time in Physics',
			dueDate: '2023-11-10',
		},
	]

	return (
		<Box pt={'50px'} maxWidth={'1059px'} margin={'0 auto'}>
			<Box width={'150px'} m={'0 0 20px auto'}>
				<Button
					variant={'contained'}
					className={css({
						width: '150px',
						height: '50px',
					})}
				>
					基本情報設定
				</Button>
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
						<AssignmentTableBody data={mockData} handleSubmit={getGreeting} />
					</Table>
				</TableContainer>
			</Box>
		</Box>
	)
}
