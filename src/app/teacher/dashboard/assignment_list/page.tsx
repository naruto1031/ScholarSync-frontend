import dynamic from 'next/dynamic'
import Loading from '../loading'
import { Container } from '@mui/material'
const AssignmentList = dynamic(() => import('./_components/AssignmentList'), {
	loading: () => <Loading />,
})

export default async function Page() {
	return (
		<Container>
			<AssignmentList />
		</Container>
	)
}
