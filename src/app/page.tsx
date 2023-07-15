import styles from './page.module.scss'
import MainCompoent from './components/MainComponent'
import ServerComponent from './components/ServerComponent'

const Home = () => {
	return (
		<>
			<MainCompoent>
				<ServerComponent />
			</MainCompoent>
			<div className={styles.page}>
				<h1>aaaaaa</h1>
			</div>
		</>
	)
}

export default Home
