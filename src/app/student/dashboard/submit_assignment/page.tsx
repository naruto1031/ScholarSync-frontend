import { Box } from '@mui/material'
import { AssignmentTableBody } from '@/app/components'
import { getServerSession } from 'next-auth'
import { options } from '@/app/options'
import { PendingIssuesResponse, TotalPageCount } from '@/app/types/apiResponseTypes'

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

	const totalPageCount: TotalPageCount = await pageCountRes.json()

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
				totalPageCount={totalPageCount.totalPageCount}
			/>
		</Box>
	)
}
