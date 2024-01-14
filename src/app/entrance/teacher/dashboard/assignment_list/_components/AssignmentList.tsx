import { AssignmentListContents } from './AssignmentListContents'

export default async function AssignmentList() {
	// 処理に遅延を持たせる
	await new Promise((resolve) => setTimeout(resolve, 1000))
	return <AssignmentListContents />
}
