import type { NextAuthOptions } from 'next-auth'
import AzureProvider from 'next-auth/providers/azure-ad'
import { JwtToken } from './types/next-auth'

const clientId = process.env.AZURE_AD_CLIENT_ID
const clientSecret = process.env.AZURE_AD_CLIENT_SECRET
const tenantId = process.env.AZURE_AD_TENANT_ID

// Check if the environment variables are defined
if (!clientId || !clientSecret || !tenantId) {
	throw new Error('Missing required environment variables')
}

async function refreshAccessToken(token: JwtToken) {
	try {
		if (!clientId || !clientSecret || !token.refreshToken) {
			throw new Error('Required values are missing.')
		}

		const params = new URLSearchParams({
			client_id: clientId,
			client_secret: clientSecret,
			grant_type: 'refresh_token',
			refresh_token: token.refreshToken,
			scope: `openid profile email api://${clientId}/auth offline_access`,
		})

		const response = await fetch(
			`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				method: 'POST',
				body: params.toString(),
			},
		)

		const refreshedTokens = await response.json()

		if (!response.ok) {
			throw refreshedTokens
		}

		return {
			...token,
			accessToken: refreshedTokens.access_token,
			accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
			refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
			idToken: refreshedTokens.id_token,
		}
	} catch (error) {
		return {
			...token,
			error: error,
		}
	}
}

export const options: NextAuthOptions = {
	session: { strategy: 'jwt' },
	providers: [
		AzureProvider({
			clientId,
			clientSecret,
			tenantId,
			authorization: {
				params: {
					scope: `openid profile email api://${clientId}/auth offline_access`,
				},
			},
		}),
	],
	callbacks: {
		async jwt({ token, account }) {
			if (account) {
				token.accessToken = account.access_token
				token.idToken = account.id_token
				token.accessTokenExpires = account.expires_at
				token.refreshToken = account.refresh_token
			}
			return refreshAccessToken(token)
		},

		async session({ session, token }) {
			const groups = getGroups(token.idToken)
			session.user = token
			session.user.groups = groups
			return session
		},
	},
}

const getGroups = (token: string | undefined): string[] | null => {
	if (!token) return null
	const base64Url = token.split('.')[1]
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
	const jsonPayload = decodeURIComponent(
		atob(base64)
			.split('')
			.map(function (c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
			})
			.join(''),
	)
	return JSON.parse(jsonPayload).groups
}
