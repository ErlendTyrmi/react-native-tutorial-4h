export interface Creator {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: any[]; // Adjust type if needed
  $updatedAt: string;
  accountId: string;
  avatar: string;
  email: string;
  username: string;
}

export interface VideoItem {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: any[]; // Adjust type if needed
  $updatedAt: string;
  creator: Creator;
  prompt: string;
  thumbnail: string;
  title: string;
  video: string;
}

export type VideoCollection = VideoItem[];
