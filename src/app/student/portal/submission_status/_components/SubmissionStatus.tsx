import { getServerSession } from 'next-auth'
import { SubmissionStatusContents } from './SubmissionStatusContents'
import { options } from '@/app/options'
import { StudentSubject } from '@/types/api-response-types'

export default async function SubmissionStatus() {
	const session = await getServerSession(options)
	const issuesResponse = await fetch(`${process.env.API_URL}/api/student/subject`, {
		headers: { authorization: `Bearer ${session?.user.accessToken}` },
	})
	const subjects: StudentSubject[] = await issuesResponse.json()
	return <SubmissionStatusContents studentSubjects={subjects} />
}
