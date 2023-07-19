import top from './top.module.scss'

const TopPage = () => {
	return (
		<>
			<main className={top.main}>
				<div className={top.wraper}>
					<div className={top.menu}>
						{["教科一覧", "課題表紙提出", "提出状況"].map((item) => (
							<div className={top.box} key={item}>{item}</div>
						))}
					</div>
					<div className={top.status}>
						<div className={top.box}>
							<div className={top.title}>課題提出ステータス</div>
						</div>
						<div className={top.detail}>
							<div className={top.article}>
								<div className={top.title}>
									課題承認率
								</div>
								<div className={top.value}>
									81%
								</div>
							</div>
							<div className={top.article}>
								<div className={top.title}>
									承認数/課題数
								</div>
								<div className={top.value}>
									9/11
								</div>
							</div>
							<div className={top.article}>
								<div className={top.title}>
									承認待ち
								</div>
								<div className={top.value}>
									1
								</div>
							</div>
							<div className={top.article}>
								<div className={top.title}>
									再提出数
								</div>
								<div className={top.value}>
									0
								</div>
							</div>
							<div className={top.article}>
								<div className={top.title}>
									未提出数
								</div>
								<div className={top.value}>
									1
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	)
}
export default TopPage
