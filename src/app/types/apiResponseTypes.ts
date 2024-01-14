// 課題に関する情報
export interface Issue {
	issue_id: number
	teacherSubjectId: number
	name: string
	due_date: string
	comment: string
	task_number: string
	private_flag: number
	challenge_flag: number
	challenge_max_score: null | number
	subject_name: string
}

export interface IssueCover {
	issue_cover_id: number
	issue_id: number
	subject: string
	task_number: string
	name: string
	due_date: string
	comment: string
	status: string
	evaluation: number | null
	challenge_flag: boolean
	challenge_max_score: number | null
	current_score: number | null
	teacher_name: string
	resubmission_deadline: string | null
	resubmission_comment: string | null
}

export interface IssueCoverResponse {
	issue_covers: IssueCover[]
}

export interface TotalIssueCount {
	count: number
}

// APIレスポンスの型
export interface PendingIssuesResponse {
	issues: Issue[]
}

export interface IssuesData {
	issues: Issue[]
	totalCount: number
}

export interface StudentExists {
	exists: boolean
}

export interface Class {
	class_id: number
	name: string
}

export interface Subject {
	id: number
	name: string
}

export interface TeacherExists {
	exists: boolean
}

export interface TeacherSubjectAssign {
	teacher_subject_id: number
	name: string
}

export interface Department {
	department_id: number
	name: string
}
