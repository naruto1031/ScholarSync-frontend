import { Dispatch, SetStateAction, useState } from 'react'

interface IUseChangeStatus {
	status: string | undefined
	issueCoverIds: number[]
	evaluation: string
	setEvaluation: Dispatch<SetStateAction<string>>
	setStatus: Dispatch<SetStateAction<string | undefined>>
	setIssueCoverIds: Dispatch<SetStateAction<number[]>>
}

export const useChangeStatus = (): IUseChangeStatus => {
	const [status, setStatus] = useState<string | undefined>()
	const [issueCoverIds, setIssueCoverIds] = useState<number[]>([])
	const [evaluation, setEvaluation] = useState<string>('')

	return { status, setIssueCoverIds, setStatus, issueCoverIds, evaluation, setEvaluation }
}
