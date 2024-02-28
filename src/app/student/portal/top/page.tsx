import dynamic from 'next/dynamic'
import Loading from '../loading'
import { Container } from '@mui/material'
const Top = dynamic(() => import('./_components/Top'), {
	loading: () => <Loading />,
})

export default async function Page() {
	return (
		<Container>
			<Top />
		</Container>
	)
}
