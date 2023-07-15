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
						<div className="">
							<div className="">
								<div className="">
									課題承認率
								</div>
								<div className="">
									81%
								</div>
							</div>
							<div className="">
								<div className="">
									承認数/課題数
								</div>
								<div className="">
									9/11
								</div>
							</div>
							<div className="">
								<div className="">
									承認待ち
								</div>
								<div className="">
									1
								</div>
							</div>
							<div className="">
								<div className="">
									再提出数
								</div>
								<div className="">
									0
								</div>
							</div>
							<div className="">
								<div className="">
									未提出数
								</div>
								<div className="">
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
