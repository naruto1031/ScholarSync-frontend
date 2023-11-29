// 課題に関する情報
export interface Issue {
	issueID: number
	issueName: string
	subjectName: string
	dueDate: string
	challengeProblemFlag: boolean
	challengeProblemFullMark: number
}

export interface TotalPageCount {
	totalPageCount: number
}

// APIレスポンスの型
export interface PendingIssuesResponse {
	issues: Issue[]
}
