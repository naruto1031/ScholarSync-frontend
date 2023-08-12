import { redirect } from 'next/navigation'
import Header from '../../components/header/Header'
import SlideMenu from '../../components/slide_menu/SlideMenu'
import style from './layout.module.scss'
import { getServerSession } from 'next-auth'
import { options } from '@/app/options'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(options)
	if (!session?.user) {
		redirect('/student/login')
	}
	return (
		<>
			<Header />
			<SlideMenu />
			<main className={style.main}>{children}</main>
		</>
	)
}
