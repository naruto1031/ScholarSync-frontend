import styled from 'styled-components'

const Header = () => {
	return (
		<HeaderElamene>
			<h1>Header</h1>
		</HeaderElamene>
	)
}

export default Header

const HeaderElamene = styled.div`
	width: 100%;
	background-color: #7474ff;
	height: 20vh;
	h1 {
		margin: 0;
		color: #fff;
	}
`
