import type { NextAuthOptions } from 'next-auth'
import AzureProvider from 'next-auth/providers/azure-ad'

const clientId = process.env.AZURE_AD_CLIENT_ID
const clientSecret = process.env.AZURE_AD_CLIENT_SECRET
const tenantId = process.env.AZURE_AD_TENANT_ID

// Check if the environment variables are defined
if (!clientId || !clientSecret || !tenantId) {
	throw new Error('Missing required environment variables')
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
					scope: `openid profile email api://${clientId}/auth`,
				},
			},
		}),
	],
	callbacks: {
		async jwt({ token, user, account }) {
			if (account) {
				token.accessToken = account.access_token
			}
			return { ...token, ...user }
		},
		async session({ session, token }) {
			session.user = token
			return session
		},
	},
}
