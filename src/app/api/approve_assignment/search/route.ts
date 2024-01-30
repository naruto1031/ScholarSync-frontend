import { options } from '@/app/options'
import { AssignmentSearchConditionSchemaType } from '@/types/form/schema'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	const searchCondition: AssignmentSearchConditionSchemaType = await request.json()

	const session = await getServerSession(options)

	if (!session) return new NextResponse('Unauthorized', { status: 401 })
	const res = await fetch(`${process.env.API_URL}/api/teacher/issue/cover`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session.user.accessToken}`,
		},
		body: JSON.stringify({
			issue_id: searchCondition.issueId,
			class_id: searchCondition.classId,
			status: searchCondition.status,
		}),
	})
	const data = await res.json()
	return NextResponse.json(data)
}
