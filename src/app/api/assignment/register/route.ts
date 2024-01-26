import { options } from '@/app/options'
import { AssignmentRegisterSchemaType } from '@/types/form/schema'
import { toMySQLFormat } from '@/utils/toMySQLDateTimeFormatUtil'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

interface RequestBody {
	teacher_subject_id: string
	name: string
	due_dates: {
		class_id: number
		due_date: string
	}[]
	comment?: string
	task_number: string
	private_flag: boolean
	challenge_flag: boolean
	challenge_max_score: number | undefined
}
export async function POST(request: NextRequest) {
	const assignmentData: AssignmentRegisterSchemaType = await request.json()
	const session = await getServerSession(options)
	if (!session) return new NextResponse('Unauthorized', { status: 401 })

	const dueDates =
		assignmentData.dueDates
			?.map((dueDate) => {
				if (!dueDate || !dueDate.classId) return
				return {
					class_id: dueDate.classId,
					due_date: toMySQLFormat(dueDate.dueDate),
				}
			})
			.filter((date): date is { class_id: number; due_date: string } => date !== undefined) || []

	const requestBody: RequestBody = {
		teacher_subject_id: assignmentData.teacherSubjectId,
		name: assignmentData.name,
		due_dates: dueDates,
		task_number: assignmentData.taskNumber,
		private_flag: assignmentData.privateFlag,
		challenge_flag: assignmentData.challengeFlag,
		challenge_max_score: assignmentData.challengeFlag ? assignmentData.challengeMaxScore : 0,
	}

	if (assignmentData.comment && assignmentData.comment.length > 0) {
		requestBody.comment = assignmentData.comment
	}
	const res = await fetch(`${process.env.API_URL}/api/issue/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session?.user.accessToken}`,
		},
		body: JSON.stringify(requestBody),
	})
	return new NextResponse(res.statusText, { status: res.status })
}
