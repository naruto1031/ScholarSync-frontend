import Container from '@mui/material/Container'
import dynamic from 'next/dynamic'
import Loading from '../loading'
const AccountSetting = dynamic(() => import('./_components/AccountSetting'), {
	loading: () => <Loading />,
})
export default async function Page() {
	return (
		<Container>
			<AccountSetting />
		</Container>
	)
}
