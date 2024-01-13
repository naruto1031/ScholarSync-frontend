import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { Box, Typography, Button } from '@mui/material'
import { options } from '@/app/options'
import { SignInButton } from '../components'

export default async function Login() {
	const session = await getServerSession(options)
	const studentGroupID = process.env.STUDENT
	const teacherGroupID = process.env.TEACHER

	if (!studentGroupID) {
		throw new Error('STUDENT environment variable is not set.')
	}
	if (!teacherGroupID) {
		throw new Error('TEACHER environment variable is not set.')
	}

	const isStudent = session?.user.groups?.includes(studentGroupID)
	const isTeacher = session?.user.groups?.includes(teacherGroupID)
	const isAdministrator = isTeacher && isStudent

	if (isAdministrator) redirect('/entrance')
	if (isStudent) redirect('/entrance/student/dashboard/top')
	if (isTeacher) redirect('/entrance/teacher/dashboard/top')

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
				backgroundColor: '#f4f4f4',
			}}
		>
			<Box
				sx={{
					maxWidth: 400,
					textAlign: 'center',
					padding: '40px',
					borderRadius: '8px',
					backgroundColor: '#fff',
					boxShadow: '0 6px 20px 0 rgba(0,0,0,0.1)',
				}}
			>
				<Typography variant='h4' component='h1' sx={{ fontWeight: 'bold', marginBottom: '30px' }}>
					ようこそ
				</Typography>
				<Typography variant='body1' sx={{ color: '#4a4a4a', marginBottom: '40px' }}>
					Microsoftアカウントが必要です
				</Typography>
				<SignInButton />
			</Box>
		</Box>
	)
}
