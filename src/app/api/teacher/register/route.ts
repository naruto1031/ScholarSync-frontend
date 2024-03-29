import { options } from '@/app/options'
import { TeacherSchemaType } from '@/types/form/schema'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	const teacherData: TeacherSchemaType = await request.json()
	const session = await getServerSession(options)

	if (!session) return new NextResponse('Unauthorized', { status: 401 })

	try {
		const teacherRegisterResponse = await fetch(`${process.env.API_URL}/api/teacher/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session.user.accessToken}`,
			},
			body: JSON.stringify({
				name: session.user.name,
				email: session.user.email,
			}),
		})

		if (!teacherRegisterResponse.ok) {
			return new NextResponse('Failed to register teacher', { status: 500 })
		}

		const subjectAssignResponse = await fetch(`${process.env.API_URL}/api/subject/assign`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session.user.accessToken}`,
			},
			body: JSON.stringify({
				subject_id: teacherData.teacherSubjects,
			}),
		})

		if (!subjectAssignResponse.ok) {
			return new NextResponse('Failed to assign subjects', { status: 500 })
		}

		if (teacherData.classId) {
			const classAssignResponse = await fetch(`${process.env.API_URL}/api/class/assign`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${session.user.accessToken}`,
				},
				body: JSON.stringify({
					class_id: teacherData.classId,
				}),
			})

			if (!classAssignResponse.ok) {
				return new NextResponse('Failed to assign class', { status: 500 })
			}
		}

		return new NextResponse('ok', { status: 200 })
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(error.message)
			return new NextResponse(error.message, { status: 500 })
		}
	}
}
