import style from './layout.module.scss'
import { getServerSession } from 'next-auth'
import { options } from '@/app/options'
import { Header, SideMenu, SignOutButton } from '@/app/components'
import { Box } from '@mui/material'
import { StudentExists } from '@/app/types/apiResponseTypes'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(options)
	const studentGroupID = process.env.STUDENT
	if (!studentGroupID) {
		throw new Error('STUDENT environment variable is not set.')
	}
	const isExistsStudentGroup = session?.user.groups?.includes(studentGroupID)
	const res = await fetch(`${process.env.API_URL}/api/student/exists`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session?.user.accessToken}`,
		},
	})
	const data: StudentExists = await res.json()
	if (!data.exists) {
		redirect('/entrance/student/signup')
	}
	const isStudent = data.exists && isExistsStudentGroup
	return (
		<>
			{isStudent ? (
				<>
					<Header />
					<SideMenu />
					<Box className={style.main}>{children}</Box>
				</>
			) : (
				<>
					<div>表示権限がありません</div>
					<SignOutButton />
				</>
			)}
		</>
	)
}
