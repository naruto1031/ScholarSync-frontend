import dynamic from 'next/dynamic'
import Loading from '@/app/loading'
const SignUp = dynamic(() => import('./_components/SignUp'), {
	loading: () => <Loading />,
})

export default async function Page() {
	return <SignUp />
}
