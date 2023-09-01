import ServerComponent from '@/app/components/ServerComponent'
import { Suspense } from 'react'
import  Loading from "../../../loading"

const SubmittionStatus = () => {
	return (
		<>
			<div className='status'>status</div>
			<Suspense fallback={<Loading />}>
				<ServerComponent />
			</Suspense>
		</>
	)
}

export default SubmittionStatus
