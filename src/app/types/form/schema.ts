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

export type StudentSchemaType = z.infer<typeof studentSchema>
export type SubmissionStatusSchemaType = z.infer<typeof submissionStatusSchema>

// 教員情報

export const teacherSchema = z.object({
	classId: z.string().optional(),
	teacherSubjects: z.array(z.string().nonempty()),
})

export type TeacherSchemaType = z.infer<typeof teacherSchema>
