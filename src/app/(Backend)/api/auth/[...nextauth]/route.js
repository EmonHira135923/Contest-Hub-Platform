import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { getUsers } from "../../../lib/dbConnect";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET_KEY,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google" || account.provider === "github") {
        const { name, email, image } = user;
        try {
          const userCollection = await getUsers();
          const userExist = await userCollection.findOne({ email });

          if (!userExist) {
            await userCollection.insertOne({
              name,
              email,
              image,
              phone: "", // সোশ্যাল লগইনে শুরুতে ফোন থাকে না, খালি রাখলাম
              role: "user",
              provider: account.provider,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          } else {
            await userCollection.updateOne(
              { email },
              {
                $set: {
                  provider: account.provider,
                  updatedAt: new Date(),
                },
              },
            );
          }
          return true;
        } catch (error) {
          console.log("Database error:", error);
          return false;
        }
      }
      return true;
    },

    // ১. JWT কলব্যাক: ডাটাবেজ থেকে ডাটা এনে টোকেনে রাখা
    async jwt({ token, user, account }) {
      if (user) {
        // প্রথমবার লগইনের সময় ডাটাবেজ থেকে ইউজার ডাটা আনা
        const userCollection = await getUsers();
        const dbUser = await userCollection.findOne({ email: user.email });

        console.log("user", dbUser);

        if (dbUser) {
          token.id = dbUser._id.toString();
          token.role = dbUser.role;
          token.phone = dbUser.phone;
          token.image = dbUser.image;
          token.provider = dbUser.provider;
          token.createdAt = dbUser.createdAt;
        }
      }
      return token;
    },

    // ২. Session কলব্যাক: টোকেন থেকে ডাটা সেশনে পাঠানো
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.phone = token.phone;
        session.user.image = token.image; // আপনার ডাটাবেজের ইমেজটি সেশনে যাবে
        session.user.provider = token.provider;
        session.user.createdAt = token.createdAt;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
