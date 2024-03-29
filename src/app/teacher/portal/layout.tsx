import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { options } from '@/app/options'
import { Box } from '@mui/material'
import { TeacherExists } from '@/types/api-response-types'
import { TeacherHeader, SignOutButton } from '@/app/components'

export default async function portalLayout({ children }: { children: React.ReactNode }) {
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

	if (typeof session?.user.isTeacher === 'undefined') {
		const res = await fetch(`${process.env.API_URL}/api/teacher/exists`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session?.user.accessToken}`,
			},
		})

		const data: TeacherExists = await res.json()
		session.user.isTeacher = data.exists
	}

	if (!session.user.isTeacher) {
		redirect('/teacher/signup')
	}

	const drawerWidth = 250

	return (
		<>
			<TeacherHeader drawerWidth={drawerWidth} />
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
