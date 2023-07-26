import NextAuth from "next-auth/next";
import AzureProvider from "next-auth/providers/azure-ad";

const clientId = process.env.AZURE_AD_CLIENT_ID;
const clientSecret = process.env.AZURE_AD_CLIENT_SECRET;
const tenantId = process.env.AZURE_AD_TENANT_ID;

// Check if the environment variables are defined
if (!clientId || !clientSecret || !tenantId) {
	throw new Error('Missing required environment variables');
}

const handler = NextAuth({
	// Configure one or more authentication providers
	providers: [
		AzureProvider({
			clientId,
			clientSecret,
			tenantId,
		}),
	],
	callbacks: {
		jwt: async ({token, user, account, profile }) => {
			if (user) {
				token.user = user;
				const u = user as any
				token.role = u.role;
			}
			if (account) {
				token.accessToken = account.access_token
			}
			return token;
		},
		session: ({session, token}) => {
			token.accessToken
			return {
				...session,
				user: {
					...session.user,
					role: token.role,
				},
			};
		},
	}
})

export { handler as GET, handler as POST }