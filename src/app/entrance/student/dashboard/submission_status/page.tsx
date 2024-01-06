import dynamic from 'next/dynamic'
import Loading from '@/app/loading'
const SubmissionStatus = dynamic(() => import('./_components/SubmissionStatus'), {
	loading: () => <Loading />,
})

export default async function Page() {
	return <SubmissionStatus />
}
