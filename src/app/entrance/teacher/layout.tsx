import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { options } from '@/app/options'
import { Header, SignOutButton } from '@/app/components'
import { Box } from '@mui/material'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(options)
	const teacherGroupID = process.env.TEACHER
	if (!teacherGroupID) {
		throw new Error('TEACHER environment variable is not set.')
	}
	if (!session?.user) redirect('/login')
	return (
		<>
			{session?.user.groups?.includes(teacherGroupID) ? (
				<>
					<Box>{children}</Box>
				</>
			) : (
				<>
					<Box>表示権限がありません</Box>
					<SignOutButton />
				</>
			)}
		</>
	)
}
