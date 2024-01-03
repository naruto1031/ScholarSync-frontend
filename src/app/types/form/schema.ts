import { z } from 'zod'
const numericRegex = /^[0-9]+$/

export const studentSchema = z.object({
	classId: z.string().min(1),
	studentId: z.string().min(1).max(10).regex(numericRegex, '学籍番号は半角数字のみです'),
	studentNumber: z.string().min(1).max(10).regex(numericRegex, '出席番号は半角数字のみです'),
})

export type StudentSchemaType = z.infer<typeof studentSchema>
