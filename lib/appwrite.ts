import { VideoCreateFormData } from "@/models/videoCreateFormData";
import { appwriteConfig } from "@/secrets";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  ImageGravity,
  Query,
  Storage,
} from "react-native-appwrite";

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export const createUser = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(String(error));
  }
};

// Sign In
export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error as any);
  }
};

// Get Account
export const getAccount = async () => {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    console.log(error);
    throw new Error(error as any);
  }
};

// Get Current User
export const getCurrentUser = async () => {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Sign Out
export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt")]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const searchPosts = async (query: string) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.search("title", query)]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getPostsForUser = async (userId: string) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal("creator", userId)]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const logout = async () => {
  try {
    const session = await account.deleteSession("current");
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};

// Helper to CreateVideo
export const getFilePreview = async (fileId: string, type: string) => {
  let fileUrl;
  if (type === "video") {
    fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
  } else if (type === "image") {
    fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      ImageGravity.Top,
      100
    );
  } else {
    throw new Error("Invalid file type");
  }

  if (!fileUrl) throw Error;

  return fileUrl;
};

// Helper to CreateVideo
export const uploadFile = async (file: any, type: string) => {
  if (!file) return;

  // A bit of renaming for the appwrite file input
  const input = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  };

  const uploadedFile = await storage.createFile(
    appwriteConfig.storageId,
    ID.unique(),
    input
  );

  const fileUrl = await getFilePreview(uploadedFile.$id, type);
  return fileUrl;
};

export const createVideoPost = async (form: VideoCreateFormData) => {
  const [thumbnailUrl, videoUrl] = await Promise.all([
    uploadFile(form.thumbnail, "image"),
    uploadFile(form.video, "video"),
  ]);

  const newPost = await databases.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.videoCollectionId,
    ID.unique(),
    {
      title: form.title,
      thumbnail: thumbnailUrl,
      video: videoUrl,
      prompt: form.prompt,
      creator: form.userId,
    }
  );

  return newPost;
};
