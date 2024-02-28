import { options } from '@/app/options'
import { AssignmentRegisterContents } from './AssignmentRegisterContents'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { TeacherSubjectAssign } from '@/types/api-response-types'

export default async function AssignmentRegister() {
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

	return <AssignmentRegisterContents teacherSubjects={teacherSubjectAssignData} />
}
