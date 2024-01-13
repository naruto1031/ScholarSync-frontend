import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { options } from '@/app/options'
import { Header, SignOutButton } from '@/app/components'
import { Box } from '@mui/material'
import { TeacherExists } from '@/app/types/apiResponseTypes'
import { TeacherHeader } from '@/app/components'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(options)
	if (!session?.user) {
		redirect('/login')
	}

	const teacherGroupID = process.env.TEACHER
	if (!teacherGroupID) {
		throw new Error('STUDENT environment variable is not set.')
	}
	const isExistsTeacherGroup = session?.user.groups?.includes(teacherGroupID)

	if (!isExistsTeacherGroup) {
		return (
			<div>
				<div>表示権限がありません</div>
				<SignOutButton />
			</div>
		)
	}

	const res = await fetch(`${process.env.API_URL}/api/teacher/exists`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session?.user.accessToken}`,
		},
	})

	const data: TeacherExists = await res.json()

	if (!data.exists) {
		redirect('/entrance/teacher/signup')
	}
	return (
		<>
			<TeacherHeader />
			<Box>{children}</Box>
		</>
	)
}
