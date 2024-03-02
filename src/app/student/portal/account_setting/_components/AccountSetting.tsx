import { getServerSession } from 'next-auth'
import { AccountSettingContents } from './AccountSettingContents'
import { options } from '@/app/options'
import { redirect } from 'next/navigation'
import { StudentInfo } from '@/types/api-response-types'

export default async function AccountSetting() {
	const session = await getServerSession(options)
	if (!session?.user) {
		redirect('/login')
	}
	const studentResponse = await fetch(`${process.env.API_URL}/api/student`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session?.user.accessToken}`,
		},
	})

	const studentInfo: StudentInfo = await studentResponse.json()
	return <AccountSettingContents studentInfo={studentInfo} name={session.user.name} />
}
