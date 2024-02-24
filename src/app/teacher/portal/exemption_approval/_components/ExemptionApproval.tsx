import { redirect } from 'next/navigation'
// import { ClassManagementContents } from './ClassManagementContents'
import { getServerSession } from 'next-auth/next'
import { options } from '@/app/options'
import { TeacherClass } from '@/types/api-response-types'
import { ExemptionApprovalContents } from './ExemptionApprovalContents'

export default async function ExemptionApproval() {
	// TODO: 担任クラスの情報を取得してくる
	const session = await getServerSession(options)
	if (!session?.user) {
		redirect('/login')
	}

	const teacherClassAssignResponse = await fetch(`${process.env.API_URL}/api/class/assign`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session?.user.accessToken}`,
		},
	})
	const teacherClassAssignData: TeacherClass[] = await teacherClassAssignResponse.json()
	return <ExemptionApprovalContents teacherClasses={teacherClassAssignData} />
}
