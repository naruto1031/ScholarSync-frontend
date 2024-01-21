import Loading from '@/app/loading'
import dynamic from 'next/dynamic'
const SubmitAssignmentPage = dynamic(() => import('./_components/SubmitAssignment'), {
	loading: () => <Loading />,
})

export default async function Page() {
	return <SubmitAssignmentPage />
}
