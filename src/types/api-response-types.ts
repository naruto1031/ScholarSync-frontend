// 課題に関する情報
export interface Issue {
	issue_id: number
	teacher_subject_id: number
	name: string
	due_date: string
	issue_classes: IssueClass[]
	comment: string
	task_number: string
	private_flag: number
	challenge_flag: number
	challenge_max_score: null | number
	subject_name?: string
	created_at?: string
	updated_at?: string
}

export interface TransformedIssue {
	issue_id: number
	teacher_subject_id: number
	name: string
	due_date: string
	issue_classes: IssueClass[]
	comment: string
	task_number: string
	private_flag: boolean
	challenge_flag: boolean
	challenge_max_score: null | number
	subject_name?: string
	created_at?: string
	updated_at?: string
}

export interface IssueClass {
	issue_class_id: number
	issue_id: number
	class_id: number
	due_date: string | null
	department_name: string
	class_name: string
	student_count: number
}

export interface UpdateIssue {
	issue_id: string | undefined
	teacher_subject_id?: string | undefined
	name?: string | undefined
	comment?: string | undefined
	task_number?: string | undefined
	private_flag?: boolean | undefined
	challenge_flag?: boolean | undefined
	challenge_max_score?: number | undefined | null
	due_dates?:
		| {
				issue_class_id: number
				due_date: string | null
				class_id: number
				class_name: string
		  }[]
		| undefined
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
	challenge_flag: number
	challenge_max_score: number | null
	current_score: number | null
	teacher_name: string
	resubmission_deadline: string | null
	resubmission_comment: string | null
}

export interface ExemptionIssueCover {
	issue_cover_id: number
	issue_id: number
	subject: string
	task_number: string
	name: string
	due_date: string
	comment: string
	status: string
	attendance_number: string
	registration_number: string
	student_name: string
	teacher_name: string
}

export interface IssueCoverSearchCondition {
	issue_cover_id: number
	issue_id: number
	comment: string
	student_name: string
	registration_number: number
	attendance_number: number
	issue_cover_status_id: number
	status: string
	evaluation: string | null
	current_score: number | null
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
export interface IssueCoverSearchConditionResponse {
	issue_covers: IssueCoverSearchCondition[]
}
export interface IssueCoverIndividualResponse {
	issue_covers: IssueCoverSearchCondition[]
}
export interface ExemptionIssueCoverResponse {
	issue_covers: ExemptionIssueCover[]
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
	subject_id: number
	name: string
	departments: DepartmentClass[]
}

export interface DepartmentClass {
	department_id: number
	name: string
	classes: Class[]
}

export interface Department {
	department_id: number
	name: string
}

export interface UpdateCorrectiveIssueCovers {
	issue_cover_ids: string[]
	status: string
	evaluation?: string
	resubmission_deadline?: string
	resubmission_comment?: string
}
export interface UpdateIndividualIssueCovers {
	issue_cover_id: number
	status: string
	evaluation?: string
	resubmission_deadline?: string
	resubmission_comment?: string
	current_score?: number
}

export interface UpdateIssueCover {
	issue_cover_id: string
	status: string
}

export interface TeacherClass {
	class_teacher_id: number
	class_id: number
	department_id: number
	class_name: string
}

export interface ClassSubject {
	subject_id: number
	name: string
	created_at: string
	updated_at: string
}

export interface ClassIssueCover {
	issues: Issue[]
	students: Student[]
	issue_covers: ClassIssueStatus[][]
}

export interface ClassIssueStatus {
	issue_cover_id: number
	issue_id: number
	student_id: string
	status: string
	evaluation: number | null
	current_score: number | null
	resubmission_deadline: string | null
	resubmission_comment: string | null
	challenge_flag: number
	challenge_max_score: number | null
	name: string
	task_number: string
}

export interface Teacher {
	name: string
	email: string
	teacher_subjects: TeacherSubject[]
	class_teacher: Class[]
}

export interface Student {
	student_id: string
	registration_number: string
	attendance_number: string
	name: string
	class_id: number
}

export interface TeacherSubject {
	subject_id: number
	subject_name: string
}

export interface IssueCoverStatusCount {
	issue_cover_status_count: {
		total: number
		pending?: number
		rejected?: number
		resubmission?: number
		approved?: number
		pending_absence?: number
		absence?: number
		pending_exemption_approval?: number
		pending_exemption?: number
		exemption?: number
		late_pending?: number
	}
}
