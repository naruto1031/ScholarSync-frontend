import dynamic from 'next/dynamic'
import Loading from '../loading'
const SubmitAssignmentPage = dynamic(() => import('./_components/SubmitAssignment'), {
	loading: () => <Loading />,
})

interface Params {
	issue_id?: string
}

export default async function Page({ searchParams }: { searchParams: Params }) {
	return <SubmitAssignmentPage issue_id={searchParams.issue_id} />
}
