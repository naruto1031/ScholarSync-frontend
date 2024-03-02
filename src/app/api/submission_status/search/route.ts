import { options } from '@/app/options'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	const { statuses, subject_id } = await request.json()
	const session = await getServerSession(options)

	if (!session) return new NextResponse('Unauthorized', { status: 401 })
	const res = await fetch(`${process.env.API_URL}/api/issue/cover`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session.user.accessToken}`,
		},
		body: JSON.stringify({
			statuses: statuses,
			subject_id: !subject_id || subject_id === 'all' ? undefined : subject_id,
		}),
	})
	const data = await res.json()
	return NextResponse.json(data)
}
