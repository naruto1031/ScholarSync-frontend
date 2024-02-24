import Container from '@mui/material/Container'
import dynamic from 'next/dynamic'
import Loading from '../loading'
const ExemptionApproval = dynamic(() => import('./_components/ExemptionApproval'), {
	loading: () => <Loading />,
})

export default async function Page() {
	return (
		<Container>
			<ExemptionApproval />
		</Container>
	)
}
