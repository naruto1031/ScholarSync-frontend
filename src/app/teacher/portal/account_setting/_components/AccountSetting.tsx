import { getServerSession } from 'next-auth'
import { AccountSettingContents } from './AccountSettingContents'
import { options } from '@/app/options'
import { redirect } from 'next/navigation'
import { Teacher } from '@/types/api-response-types'

export default async function AccountSetting() {
	const session = await getServerSession(options)
	if (!session?.user) {
		redirect('/login')
	}
	const teacherInfoResponse = await fetch(`${process.env.API_URL}/api/teacher/info`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session?.user.accessToken}`,
		},
	})

	const teacherInfoData: Teacher[] = await teacherInfoResponse.json()
	return <AccountSettingContents teacher={teacherInfoData[0]} />
}
