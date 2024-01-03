import { options } from '@/app/options'
import { StudentSchemaType } from '@/app/types/form/schema'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	const studentData: StudentSchemaType = await request.json()
	const session = await getServerSession(options)

	if (!session) return new NextResponse('Unauthorized', { status: 401 })
	return NextResponse.json({})
}
