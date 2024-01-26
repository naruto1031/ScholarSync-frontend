import { options } from '@/app/options'
import { UpdateIssue } from '@/types/apiResponseTypes'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	const session = await getServerSession(options)
	if (!session) return new NextResponse('Unauthorized', { status: 401 })

	const issueData: UpdateIssue = await request.json()
	const res = await fetch(`${process.env.API_URL}/api/issue/${issueData.issue_id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session.user.accessToken}`,
		},
		body: JSON.stringify(issueData),
	})
	if (!res.ok) return new NextResponse(res.statusText, { status: res.status })
	const data = await res.json()
	return NextResponse.json(data)
}
