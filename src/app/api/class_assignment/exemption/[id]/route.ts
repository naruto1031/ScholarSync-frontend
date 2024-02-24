import { options } from '@/app/options'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { id: number } }) {
	const id = params.id
	const session = await getServerSession(options)
	if (!session) return new NextResponse('Unauthorized', { status: 401 })
	console.log(id)
	const res = await fetch(`${process.env.API_URL}/api/teacher/class/exemption/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session.user.accessToken}`,
		},
	})
	if (!res.ok) return new NextResponse(res.statusText, { status: res.status })
	const data = await res.json()
	return NextResponse.json(data)
}
