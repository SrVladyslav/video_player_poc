export type User = {
    id: string,
    username: string,
    email: string,
    videos: Video[] | null,
    liked: VideoLikes[] | null,
}

export type Video = {
    id: string,
    title: string,
    url: string,
    uri: string,
    thumbnailURI: string,
    createdBy: User,
    created: Date,
    likes: VideoLikes[] | null,
}

export interface CreateVideoInput {
    title: string;
    url: string;
    uri: string;
    thumbnailURI: string;
    userToken: string;
}

export type VideoLikes = {
    id: string,
    videoId: string,
    userId: string,
    video: Video,
    user: User,
    created: Date,
}

interface CreatedBy {
    id: string;
}
export interface VideoListItem {
  id: string;
  title: string;
  url: string;
  thumbnailURI: string;
  created: string;
  watchCount: number;
  createdBy: CreatedBy;
  likesCount: number;
}
