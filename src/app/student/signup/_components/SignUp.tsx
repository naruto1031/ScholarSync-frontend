import { options } from '@/app/options'
import { getServerSession } from 'next-auth'
import { Class } from '@/app/types/apiResponseTypes'
import { Box } from '@mui/material'
import { redirect } from 'next/navigation'
import { SignUpContents } from './SignUpContents'

export default async function SignUp() {
	const session = await getServerSession(options)
	const res = await fetch(`${process.env.API_URL}/api/student/exists`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session?.user.accessToken}`,
		},
	})
	const studentExists = await res.json()
	if (studentExists.exists) {
		redirect('/student/dashboard/top')
	}
	const classListResponse = await fetch(`${process.env.API_URL}/api/student/class`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session?.user.accessToken}`,
		},
	})
	const classList: Class[] = await classListResponse.json()
	return (
		<Box
			sx={{
				width: '100%',
				height: '100vh',
				backgroundColor: '#f5f5f5',
				padding: '50px 0px',
			}}
		>
			<SignUpContents classList={classList} />
		</Box>
	)
}
