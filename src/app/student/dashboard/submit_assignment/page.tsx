import dynamic from 'next/dynamic'
import Loading from '../loading'
const SubmitAssignmentPage = dynamic(() => import('./_components/SubmitAssignment'), {
	loading: () => <Loading />,
})

export default async function Page() {
	return <SubmitAssignmentPage />
}
