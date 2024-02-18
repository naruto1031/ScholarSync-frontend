import Container from '@mui/material/Container'
import dynamic from 'next/dynamic'
import Loading from '../loading'
const ClassManagement = dynamic(() => import('./_components/ClassManagement'), {
	loading: () => <Loading />,
})

export default async function Page() {
	return (
		<Container>
			<ClassManagement />
		</Container>
	)
}
