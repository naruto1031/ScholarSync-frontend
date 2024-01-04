import { options } from '@/app/options'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	// const { issueId } = await request.json()

	const session = await getServerSession(options)
	if (!session) return new NextResponse('Unauthorized', { status: 401 })

	const res = await fetch(`${process.env.MOCK_API_URL}/api/mock/issue`)
	const data = await res.json()
	return NextResponse.json(data)
}
