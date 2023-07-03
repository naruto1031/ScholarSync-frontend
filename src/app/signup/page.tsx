'use client'

import React, { ChangeEvent, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const Signup = () => {
	const [userInformation, setUserInformation] = useState({
		name: '',
		email: '',
		password: '',
	})

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault()

		const response = await axios.post('http://localhost:8000/api/register', userInformation)

		localStorage.setItem('auth_token', response.data.access_token)

		console.log(response)
	}

	const changeInformation = (e: ChangeEvent) => {
		let { target } = e
		if (!(target instanceof HTMLInputElement)) return

		setUserInformation({ ...userInformation, [target.name]: target.value })

		console.log(userInformation)
	}

	return (
		<>
			<SignUpForm>
				<form onSubmit={handleSubmit}>
					<div className='title'>
						<h2>会員登録画面</h2>
					</div>
					<div className='name'>
						<label>
							Name:
							<input type='text' name='name' onChange={(e) => changeInformation(e)} />
						</label>
					</div>
					<div className='email'>
						<label>
							Email:
							<input
								type='email'
								name='email'
								onChange={(e) => changeInformation(e)}
							/>
						</label>
					</div>
					<div className='password'>
						<label>
							Password:
							<input
								type='password'
								name='password'
								onChange={(e) => changeInformation(e)}
							/>
						</label>
					</div>
					<div className='submit'>
						<input type='submit' value='Submit' />
					</div>
				</form>
			</SignUpForm>
		</>
	)
}

export default Signup

const SignUpForm = styled.div`
	max-width: 500px;
	margin: 0 auto;
	height: 60vh;
	display: flex;
	align-items: center;
	form {
		border: 1px solid #000;
		border-radius: 10px;
		width: 70%;
		text-align: center;
		margin: 0 auto;
		.submit {
			margin: 20px;
		}
	}
`
