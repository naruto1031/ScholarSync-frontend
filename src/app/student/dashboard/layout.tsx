import { redirect } from 'next/navigation'
import Header from '../../components/header/Header'
import SlideMenu from '../../components/slide_menu/SlideMenu'
import style from './layout.module.scss'
import { getServerSession } from 'next-auth'
import { options } from '@/app/options'
import SignOutButton from '@/app/components/button/SignOutButton'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(options)
	// 仮置き
	const studentGroupID = process.env.STUDENT;
	if (!studentGroupID) {
		throw new Error('STUDENT environment variable is not set.')
	}
	if (!session?.user) redirect('/student/login')
	return (
		<>
			{session?.user.groups?.includes(studentGroupID) ? (				
				<>
					<Header />
					<SlideMenu />
					<main className={style.main}>{children}</main>
				</>) : (
					<>
						<div>表示権限がありません</div>
						<SignOutButton />
					</>
				)
			}
		</>
	)
}
