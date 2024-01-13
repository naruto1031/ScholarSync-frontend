import { options } from '@/app/options'
import { getServerSession } from 'next-auth'
import { Class, Subject, TeacherExists } from '@/app/types/apiResponseTypes'
import { Box } from '@mui/material'
import { redirect } from 'next/navigation'
import { SignUpContents } from './SignUpContents'

export default async function SignUp() {
	const session = await getServerSession(options)
	if (!session) {
		redirect('/login')
	}
	const res = await fetch(`${process.env.API_URL}/api/teacher/exists`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session?.user.accessToken}`,
		},
	})

	const studentExists: TeacherExists = await res.json()

	if (studentExists.exists) {
		redirect('/entrance/teacher/dashboard')
	}

	const classListResponse = await fetch(`${process.env.API_URL}/api/teacher/class`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session?.user.accessToken}`,
		},
	})
	const classList: Class[] = await classListResponse.json()

	const subjectResponse = await fetch(`${process.env.API_URL}/api/teacher/subject`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session?.user.accessToken}`,
		},
	})

	const subjects: Subject[] = await subjectResponse.json()

	return (
		<Box
			sx={{
				width: '100%',
				height: '100vh',
				backgroundColor: '#f5f5f5',
				padding: '50px 0px',
			}}
		>
			<SignUpContents classList={classList} subjects={subjects} />
		</Box>
	)
}
