import { options } from '@/app/options'
import {
	UpdateCorrectiveIssueCovers,
	UpdateIndividualIssueCovers,
} from '@/types/api-response-types'
import { toMySQLFormat } from '@/utils/toMySQLDateTimeFormatUtil'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	const updateCondition: UpdateIndividualIssueCovers = await request.json()
	console.log(updateCondition)
	const session = await getServerSession(options)
	if (!session) return new NextResponse('Unauthorized', { status: 401 })
	const res = await fetch(`${process.env.API_URL}/api/teacher/issue/cover/individual`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session.user.accessToken}`,
		},
		body: JSON.stringify({
			issue_cover_id: `${updateCondition.issue_cover_id}`,
			status: updateCondition.status,
			evaluation: updateCondition.evaluation || undefined,
			resubmission_deadline:
				updateCondition.status === 'resubmission'
					? updateCondition.resubmission_deadline &&
					  toMySQLFormat(new Date(updateCondition.resubmission_deadline))
					: undefined,
			resubmission_comment:
				updateCondition.status === 'resubmission'
					? updateCondition.resubmission_comment
					: undefined,
			current_score: updateCondition.current_score || undefined,
		}),
	})
	if (!res.ok) return new NextResponse(res.statusText, { status: res.status })
	const data = await res.json()
	return NextResponse.json(data)
}
