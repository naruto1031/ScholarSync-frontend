import { options } from '@/app/options'
import { UpdateCorrectiveIssueCovers } from '@/types/api-response-types'
import { toMySQLFormat } from '@/utils/toMySQLDateTimeFormatUtil'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	const updateCondition: UpdateCorrectiveIssueCovers = await request.json()
	const session = await getServerSession(options)
	console.log(updateCondition)
	if (!session) return new NextResponse('Unauthorized', { status: 401 })
	const res = await fetch(`${process.env.API_URL}/api/teacher/issue/cover/collective`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session.user.accessToken}`,
		},
		body: JSON.stringify({
			issue_cover_ids: updateCondition.issue_cover_ids,
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
		}),
	})
	if (!res.ok) return new NextResponse(res.statusText, { status: res.status })
	const data = await res.json()
	return NextResponse.json(data)
}
