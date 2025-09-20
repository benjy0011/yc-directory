import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries"
import { writeClient } from "./sanity/lib/write-client"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const { handlers, auth, signIn, signOut } = (NextAuth as any)({
  providers: [GitHub],
  callbacks: {
    async signIn({
      user: { name, email, image },
      profile: { id, login, bio },
    }: {
      user: { name?: string | null; email?: string | null; image?: string | null };
      profile: { id?: string; login?: string; bio?: string };
    }) {
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id,
        });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || "",
        });
      }

      return true;
    },
    async jwt({ token, account, profile }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      : { token: any, account: any, profile: any }
    ) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id: profile?.id,
          });

        token.id = user?._id;
      }

      return token;
    },
    async session({ session, token }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      : { session: any, token: any }
    ) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});