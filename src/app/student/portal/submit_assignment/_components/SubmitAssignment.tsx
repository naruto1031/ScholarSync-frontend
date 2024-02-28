import { PendingIssuesResponse } from '@/types/api-response-types'
import { SubmitAssignmentContents } from './SubmitAssignmentContents'
import { options } from '@/app/options'
import { getServerSession } from 'next-auth'

interface Props {
	issue_id?: string
}
export default async function SubmitAssignment({ issue_id }: Props) {
	const session = await getServerSession(options)

	const issuesResponse = await fetch(`${process.env.API_URL}/api/issue/cover/not_submitted`, {
		headers: { authorization: `Bearer ${session?.user.accessToken}` },
	})
	const issues: PendingIssuesResponse = await issuesResponse.json()

	return <SubmitAssignmentContents issueData={issues.issues} issue_id={issue_id} />
}
