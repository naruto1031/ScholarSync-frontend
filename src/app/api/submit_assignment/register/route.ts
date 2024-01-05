import { options } from '@/app/options'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	const { issueId } = await request.json()

	const session = await getServerSession(options)
	console.log(issueId)

	if (!session) return new NextResponse('Unauthorized', { status: 401 })
	const res = await fetch(`${process.env.API_URL}/api/issue/cover/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session.user.accessToken}`,
		},
		body: JSON.stringify({
			issue_id: `${issueId}`,
			status: 'pending',
		}),
	})
	const data = await res.json()
	console.log(data)
	return NextResponse.json(data)
}
