import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import LinkedInProvider from "next-auth/providers/linkedin"

export default NextAuth({
  // pages: {
  //   newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  // },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      // else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_ID ?? "",
      clientSecret: process.env.LINKEDIN_SECRET ?? "",
    }),
  ],
})
