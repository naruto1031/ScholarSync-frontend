import { options } from '@/app/options'
import { TeacherSubjectAssign } from '@/types/apiResponseTypes'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { ApproveAssignmentContents } from './ApproveAssignmentContents'

export default async function ApproveAssignment() {
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
	return <ApproveAssignmentContents teacherSubjects={teacherSubjectAssignData} />
}
