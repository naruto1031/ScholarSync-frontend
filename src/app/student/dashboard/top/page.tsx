import dynamic from 'next/dynamic'
import Loading from '../loading'
const Top = dynamic(() => import('./_components/Top'), {
	loading: () => <Loading />,
})

export default async function Page() {
	return <Top />
}
