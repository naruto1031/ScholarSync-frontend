'use client'
import { Teacher } from '@/types/api-response-types'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

interface Props {
	teacher: Teacher
}
export const AccountSettingContents = ({ teacher }: Props) => {
	return (
		<Box>
			<Box
				sx={{
					my: '20px',
					fontSize: '20px',
					fontWeight: 'bold',
				}}
			>
				教師情報
			</Box>
			<Paper
				sx={{
					p: '20px',
				}}
			>
				<Box
					sx={{
						mb: '20px',
						width: '100%',
						borderBottom: '1px solid #E0E0E0',
						paddingBottom: '10px',
					}}
				>
					<Box>氏名</Box>
					<Box>{teacher.name}</Box>
				</Box>
				<Box
					sx={{
						mb: '20px',
						width: '100%',
						borderBottom: '1px solid #E0E0E0',
						paddingBottom: '10px',
					}}
				>
					<Box>担当教科</Box>
					{teacher.teacher_subjects.map((subject) => (
						<Box key={subject.subject_id}>
							<Box>{subject.subject_name}</Box>
						</Box>
					))}
				</Box>
				<Box>
					<Box>担任クラス</Box>
					{teacher.class_teacher.map((classTeacher) => (
						<Box key={classTeacher.class_id}>
							<Box>{classTeacher.name}</Box>
						</Box>
					))}
				</Box>
			</Paper>
			<Box
				sx={{
					mt: '20px',
				}}
			>
				<Button variant='contained' color='error'>
					サインアウト
				</Button>
			</Box>
		</Box>
	)
}
