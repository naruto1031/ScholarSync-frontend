// 課題に関する情報
export interface Issue {
	issueID: number
	issueName: string
	subjectName: string
	dueDate: string
	challengeProblemFlag: boolean
	challengeProblemFullMark: number
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
