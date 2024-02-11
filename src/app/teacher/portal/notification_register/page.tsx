import Container from '@mui/material/Container'
import dynamic from 'next/dynamic'
import Loading from '../loading'
const NotificationRegister = dynamic(() => import('./_components/NotificationRegister'), {
	loading: () => <Loading />,
})
export default async function Page() {
	return (
		<Container>
			<NotificationRegister />
		</Container>
	)
}
