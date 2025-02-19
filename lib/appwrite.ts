import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
} from "react-native-appwrite";
import { appwriteConfig } from "@/secrets";

const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw new Error("Failed to create account");

    const userId = newAccount.$id;
    const avatar = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      { userId, username, email, avatar: avatar }
    );

    return newUser;
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    if (!session) throw new Error("Failed to create session");
    return session;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to sign in");
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error("Failed to get user");

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw new Error("Failed to get user");

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};
