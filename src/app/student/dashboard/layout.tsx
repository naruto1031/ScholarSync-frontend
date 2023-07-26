import Header from '../../components/header/Header'
import SlideMenu from '../../components/slide_menu/SlideMenu'
import style from './layout.module.scss';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<SlideMenu />
			<main className={style.main}>
				{children}
			</main>
		</>
	)
}
