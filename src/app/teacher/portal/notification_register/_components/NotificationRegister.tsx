import { options } from '@/app/options'
import { TeacherSubjectAssign } from '@/types/api-response-types'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { NotificationRegisterContents } from './NotificationRegisterContents'

export default async function NotificationRegister() {
	const session = await getServerSession(options)
	if (!session?.user) {
		redirect('/login')
	}
	const teacherSubjectAssignResponse = await fetch(`${process.env.API_URL}/api/subject/assign`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session?.user.accessToken}`,
		},
	})
	const teacherSubjectAssignData: TeacherSubjectAssign[] = await teacherSubjectAssignResponse.json()

	return <NotificationRegisterContents teacherSubjectAssignData={teacherSubjectAssignData} />
}
