import { options } from '@/app/options'
import { TeacherSubjectAssign } from '@/types/apiResponseTypes'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { AssignmentListContents } from './AssignmentListContents'

export default async function AssignmentList() {
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

	return <AssignmentListContents subjects={teacherSubjectAssignData} />
}
