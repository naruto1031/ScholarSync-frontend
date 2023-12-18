import style from './layout.module.scss'
import { getServerSession } from 'next-auth'
import { options } from '@/app/options'
import { Header, SideMenu, SignOutButton } from '@/app/components'
import { Box } from '@mui/material'
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(options)
	const studentGroupID = process.env.STUDENT
	if (!studentGroupID) {
		throw new Error('STUDENT environment variable is not set.')
	}
	return (
		<>
			{session?.user.groups?.includes(studentGroupID) ? (
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
