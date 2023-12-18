import { Box } from '@mui/material'

import { getServerSession } from 'next-auth'
import { options } from '@/app/options'
import { PendingIssuesResponse, TotalIssueCount } from '@/app/types/apiResponseTypes'
import { AssignmentTableBody } from './_components/AssignmentTableBody'

export default async function SubmitAssignment() {
	const session = await getServerSession(options)
	const res = await fetch(`${process.env.MOCK_API_URL}/api/mock/issue`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${session?.user.accessToken}`,
		},
	})
	const resData: PendingIssuesResponse = await res.json()

	const pageCountRes = await fetch(`${process.env.MOCK_API_URL}/api/mock/totalCount`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${session?.user.accessToken}`,
		},
	})

	const totalIssueCount: TotalIssueCount = await pageCountRes.json()

	const submitAssignment = async (): Promise<PendingIssuesResponse | undefined> => {
		'use server'
		const res = await fetch(`${process.env.MOCK_API_URL}/api/mock/issue`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${session?.user.accessToken}`,
			},
		})
		if (!res.ok) {
			throw new Error('Failed to fetch API')
		}
		const json = await res.json()
		return json
	}

	return (
		<Box pt={'50px'} maxWidth={'1059px'} margin={'0 auto'}>
			<AssignmentTableBody
				issueData={resData.issues}
				handleSubmit={submitAssignment}
				totalIssueCount={totalIssueCount.count}
			/>
		</Box>
	)
}
