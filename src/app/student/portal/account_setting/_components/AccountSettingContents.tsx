'use client'
import { StudentInfo } from '@/types/api-response-types'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { signOut } from 'next-auth/react'

interface Props {
	studentInfo: StudentInfo
	name: string | undefined | null
}
export const AccountSettingContents = ({ studentInfo, name }: Props) => {
	return (
		<Box>
			<Box
				sx={{
					my: '20px',
					fontSize: '20px',
					fontWeight: 'bold',
				}}
			>
				生徒情報
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
					<Box>{name}</Box>
				</Box>
				<Box
					sx={{
						mb: '20px',
						width: '100%',
						borderBottom: '1px solid #E0E0E0',
						paddingBottom: '10px',
					}}
				>
					<Box>学籍番号</Box>
					<Box>{studentInfo.registration_number}</Box>
				</Box>
				<Box
					sx={{
						mb: '20px',
						width: '100%',
						borderBottom: '1px solid #E0E0E0',
						paddingBottom: '10px',
					}}
				>
					<Box>クラス</Box>
					<Box>{studentInfo.class_name}</Box>
				</Box>
				<Box
					sx={{
						mb: '20px',
						width: '100%',
						borderBottom: '1px solid #E0E0E0',
						paddingBottom: '10px',
					}}
				>
					<Box>出席番号</Box>
					<Box>{studentInfo.attendance_number}</Box>
				</Box>
			</Paper>
			<Box
				sx={{
					mt: '20px',
				}}
			>
				<Button variant='contained' color='error' onClick={() => signOut()}>
					サインアウト
				</Button>
			</Box>
		</Box>
	)
}
