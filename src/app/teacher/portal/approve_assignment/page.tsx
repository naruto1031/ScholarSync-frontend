import dynamic from 'next/dynamic'
import Loading from '../loading'
import { Container } from '@mui/material'
const ApproveAssignment = dynamic(() => import('./_components/ApproveAssignment'), {
	loading: () => <Loading />,
})

// 提出状況を見たい課題
// クラスを選択
// 提出状況or出席番号(複数)で検索(二つとも指定された場合はAND検索)
// クラス: ドロップダウン, 提出状況: ドロップダウン, 出席番号: テキストボックス, 学籍番号: テキストボックス
// 検索
// 一覧で表示
// 一括で承認と点数付けを行うようにし、一括で差し戻しが行えるようにする
// 一人一人に対して点数付けを行える

export default async function Page() {
	return (
		<Container>
			<ApproveAssignment />
		</Container>
	)
}
