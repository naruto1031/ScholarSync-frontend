import { Box } from '@mui/material'
import { PendingIssuesResponse, TotalIssueCount } from '@/types/api-response-types'
import { SubmitAssignmentContents } from './SubmitAssignmentContents'
import { options } from '@/app/options'
import { getServerSession } from 'next-auth'

export default async function SubmitAssignment() {
	const session = await getServerSession(options)

	const issuesResponse = await fetch(`${process.env.API_URL}/api/issue/cover/not_submitted`, {
		headers: { authorization: `Bearer ${session?.user.accessToken}` },
	})
	const issues: PendingIssuesResponse = await issuesResponse.json()

	const totalCountResponse = await fetch(`${process.env.MOCK_API_URL}/api/mock/totalCount`, {
		headers: { authorization: `Bearer ${session?.user.accessToken}` },
	})
	const totalCount: TotalIssueCount = await totalCountResponse.json()

	return <SubmitAssignmentContents issueData={issues.issues} totalIssueCount={totalCount.count} />
}
