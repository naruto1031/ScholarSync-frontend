import { options } from '@/app/options'
import { StudentSchemaType } from '@/types/form/schema'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	const studentData: StudentSchemaType = await request.json()
	const session = await getServerSession(options)
	if (!session) return new NextResponse('Unauthorized', { status: 401 })
	const res = await fetch(`${process.env.API_URL}/api/student/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session?.user.accessToken}`,
		},
		body: JSON.stringify({
			class_id: studentData.classId,
			email: session?.user.email,
			name: session?.user.name,
			registration_number: studentData.studentId,
			attendance_number: studentData.studentNumber,
		}),
	})
	if (res.status === 200) {
		return NextResponse.redirect('/student/dashboard/top')
	} else {
		return new NextResponse(res.statusText, { status: res.status })
	}
}
