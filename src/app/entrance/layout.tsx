import { getServerSession } from 'next-auth'
import { options } from '../options'
import { redirect } from 'next/navigation'

export default async function MainLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(options)
	if (!session?.user) {
		redirect('/login')
	}
	return (
		<>
			<main>{children}</main>
		</>
	)
}
