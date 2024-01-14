import dynamic from 'next/dynamic'
import Loading from '../loading'
import { Container } from '@mui/material'
const AssignmentRegister = dynamic(() => import('./_components/AssignmentRegister'), {
	loading: () => <Loading />,
})

export default async function Page() {
	return (
		<Container>
			<AssignmentRegister />
		</Container>
	)
}
