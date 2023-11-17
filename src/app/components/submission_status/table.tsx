import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'

type Task = {
	subjectCode: string
	taskNumber: number
	taskTopic: string
	progress: string
	dueDate: string
}

const mockData: Task[] = [
	{
		subjectCode: 'A001',
		taskNumber: 1,
		taskTopic: 'Basic Mathematics',
		progress: '承認待ち',
		dueDate: '2023-10-01',
	},
	{
		subjectCode: 'A002',
		taskNumber: 2,
		taskTopic: 'Principles of Physics',
		progress: '承認済み',
		dueDate: '2023-10-05',
	},
	{
		subjectCode: 'A003',
		taskNumber: 3,
		taskTopic: 'Chemical Reactions',
		progress: '未提出',
		dueDate: '2023-10-10',
	},
	{
		subjectCode: 'A004',
		taskNumber: 4,
		taskTopic: 'Evolution of Biology',
		progress: 'チャレンジ中',
		dueDate: '2023-10-15',
	},
	{
		subjectCode: 'A005',
		taskNumber: 5,
		taskTopic: 'Advanced Algebra',
		progress: '再提出',
		dueDate: '2023-10-20',
	},
	{
		subjectCode: 'A006',
		taskNumber: 6,
		taskTopic: 'Quantum Mechanics',
		progress: '承認済み',
		dueDate: '2023-10-25',
	},
	{
		subjectCode: 'A007',
		taskNumber: 7,
		taskTopic: 'Organic Chemistry',
		progress: '承認待ち',
		dueDate: '2023-10-30',
	},
	{
		subjectCode: 'A008',
		taskNumber: 8,
		taskTopic: 'Cell Biology',
		progress: '承認済み',
		dueDate: '2023-11-01',
	},
	{
		subjectCode: 'A009',
		taskNumber: 9,
		taskTopic: 'Calculus Fundamentals',
		progress: '提出期限超過',
		dueDate: '2023-11-05',
	},
	{
		subjectCode: 'A010',
		taskNumber: 10,
		taskTopic: 'Space & Time in Physics',
		progress: '未提出',
		dueDate: '2023-11-10',
	},
]

export const StatusTable = () => {
	return (
		<TableContainer>
			<Table sx={{ minWidth: 650 }} aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell>科目記号</TableCell>
						<TableCell align='right'>課題No</TableCell>
						<TableCell align='right'>課題主題</TableCell>
						<TableCell align='right'>進捗</TableCell>
						<TableCell align='right'>納期</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{mockData.map((row) => (
						<TableRow
							key={row.subjectCode}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component='th' scope='row'>
								{row.subjectCode}
							</TableCell>
							<TableCell align='right'>{row.taskNumber}</TableCell>
							<TableCell align='right'>{row.taskTopic}</TableCell>
							<TableCell align='right'>{row.progress}</TableCell>
							<TableCell align='right'>{row.dueDate}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
