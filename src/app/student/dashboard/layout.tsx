import Header from '../../components/header/Header'
import SlideMenu from '../../components/slide_menu/SlideMenu'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<SlideMenu />
			{children}
		</>
	)
}
