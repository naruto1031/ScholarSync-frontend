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

export type ResponseTaskData = {
	data: Task[]
}

export default async function SubmitAssignment() {
  const session = await getServerSession(options);
  const res = await fetch(`${process.env.MOCK_API_URL}/api/mock`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  })
  const resData: ResponseTaskData = await res.json()
  
  const submitAssignment = async (): Promise<ResponseTaskData | undefined> => {
		'use server'
		const res = await fetch(`${process.env.MOCK_API_URL}/api/mock`, {
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
						<AssignmentTableBody data={resData.data} handleSubmit={submitAssignment} />
					</Table>
				</TableContainer>
			</Box>
		</Box>
	)
}
