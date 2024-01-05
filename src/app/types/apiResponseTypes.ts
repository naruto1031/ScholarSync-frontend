// 課題に関する情報
export interface Issue {
	issue_id: number
	teacher_subject_id: number
	name: string
	due_date: string
	comment: string
	task_number: string
	private_flag: number
	challenge_flag: number
	challenge_max_score: null | number
	subject_name: string
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
