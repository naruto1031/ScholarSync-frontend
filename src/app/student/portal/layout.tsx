import { getServerSession } from 'next-auth'
import { options } from '@/app/options'
import { SignOutButton, Header } from '@/app/components'
import { StudentExists } from '@/types/api-response-types'
import { redirect } from 'next/navigation'
import Box from '@mui/material/Box/Box'

export default async function portalLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(options)
	if (!session?.user) {
		redirect('/login')
	}

	const studentGroupID = process.env.STUDENT
	if (!studentGroupID) {
		throw new Error('STUDENT environment variable is not set.')
	}
	const isExistsStudentGroup = session?.user.groups?.includes(studentGroupID)

	if (!isExistsStudentGroup) {
		return (
			<div>
				<div>表示権限がありません</div>
				<SignOutButton />
			</div>
		)
	}

	const res = await fetch(`${process.env.API_URL}/api/student/exists`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session?.user.accessToken}`,
		},
	})

	const data: StudentExists = await res.json()

	if (!data.exists) {
		redirect('/student/signup')
	}

	if (typeof session?.user.isStudent === 'undefined') {
		const res = await fetch(`${process.env.API_URL}/api/student/exists`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session?.user.accessToken}`,
			},
		})

		const data: StudentExists = await res.json()
		session.user.isStudent = data.exists
	}

	if (!session.user.isStudent) {
		redirect('/student/signup')
	}

	const drawerWidth = 250
	return (
		<>
			<Header drawerWidth={drawerWidth} />
			<Box
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
				}}
			>
				{children}
			</Box>
		</>
	)
}
