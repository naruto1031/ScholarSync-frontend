import { z } from 'zod'
const numericRegex = /^[0-9]+$/

// 生徒情報
export const studentSchema = z.object({
	classId: z.string().min(1),
	studentId: z.string().min(1).max(10).regex(numericRegex, '学籍番号は半角数字のみです'),
	studentNumber: z.string().min(1).max(10).regex(numericRegex, '出席番号は半角数字のみです'),
})
export const submissionStatusSchema = z.object({
	statuses: z.array(z.string().optional()),
})

// 教員情報
export const teacherSchema = z.object({
	classId: z.string().optional(),
	teacherSubjects: z.array(z.string().nonempty()),
})

// 課題情報
export const assignmentRegisterSchema = z.object({
	teacherSubjectId: z.string().nonempty(),
	name: z.string().nonempty(),
	dueDates: z
		.array(
			z
				.object({
					dueDate: z.date().optional(),
					classId: z.number(),
					className: z.string(),
				})
				.optional(),
		)
		.optional(),
	comment: z.string().optional(),
	taskNumber: z.string().nonempty().regex(numericRegex, '課題番号は半角数字のみです'),
	privateFlag: z.boolean(),
	challengeFlag: z.boolean(),
	challengeMaxScore: z.number().int().optional(),
})

export const updateAssignmentSchema = z.object({
	name: z.string().nonempty(),
	dueDates: z.array(
		z
			.object({
				dueDate: z.date().optional(),
				classId: z.number(),
				className: z.string(),
			})
			.optional(),
	),
	comment: z.string().optional(),
	taskNumber: z.string().nonempty().regex(numericRegex, '課題番号は半角数字のみです'),
	privateFlag: z.boolean(),
	challengeFlag: z.boolean(),
	challengeMaxScore: z.number().int().optional(),
})

// 課題検索条件
export const assignmentSearchConditionSchema = z.object({
	teacherSubjectId: z.string().nonempty(),
	classId: z.string().nonempty(),
	issueId: z.string().nonempty(),
	status: z.string().nonempty(),
	attendanceNumbers: z.array(z.string().optional()).optional(),
	excludeAttendanceNumbers: z.array(z.string().optional()).optional(),
})

export const notificationRegisterSchema = z.object({
	subject: z.string().nonempty(),
	classId: z.string().nonempty(),
	title: z.string().nonempty(),
	memo: z.string().nonempty(),
})

export type StudentSchemaType = z.infer<typeof studentSchema>
export type SubmissionStatusSchemaType = z.infer<typeof submissionStatusSchema>

export type TeacherSchemaType = z.infer<typeof teacherSchema>

export type AssignmentRegisterSchemaType = z.infer<typeof assignmentRegisterSchema>
export type UpdateAssignmentSchemaType = z.infer<typeof updateAssignmentSchema>

export type AssignmentSearchConditionSchemaType = z.infer<typeof assignmentSearchConditionSchema>
export type NotificationRegisterSchemaType = z.infer<typeof notificationRegisterSchema>
