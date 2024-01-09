import { getServerSession } from 'next-auth'
import { options } from '@/app/options'
import { SignOutButton, Header } from '@/app/components'
import { StudentExists } from '@/app/types/apiResponseTypes'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(options)
	if (!session?.user) {
		redirect('/login')
	}

	const studentGroupID = process.env.STUDENT
	if (!studentGroupID) {
		throw new Error('STUDENT environment variable is not set.')
	}
	const isExistsStudentGroup = session?.user.groups?.includes(studentGroupID)

	if (!isExistsStudentGroup) {
		return (
			<div>
				<div>表示権限がありません</div>
				<SignOutButton />
			</div>
		)
	}

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

	return (
		<>
			<Header />
			{children}
		</>
	)
}
