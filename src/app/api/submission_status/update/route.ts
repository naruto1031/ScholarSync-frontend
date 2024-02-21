import { options } from '@/app/options'
import { UpdateIssueCover } from '@/types/api-response-types'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	const updateCondition: UpdateIssueCover = await request.json()
	const session = await getServerSession(options)
	if (!session) return new NextResponse('Unauthorized', { status: 401 })
	const res = await fetch(`${process.env.API_URL}/api/student/issue/cover`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session.user.accessToken}`,
		},
		body: JSON.stringify({
			issue_cover_id: `${updateCondition.issue_cover_id}`,
			status: updateCondition.status,
		}),
	})
	if (!res.ok) {
		const error = await res.text()
		console.error(`Error updating issue cover: ${error}`)
		return new NextResponse('Error updating issue cover', { status: res.status })
	}
	const data = await res.json()
	return NextResponse.json(data)
}
