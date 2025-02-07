export interface IPost {
    xid: string;
    post: string;
    createdBy: string;
    likeCount: number;
    createdAt: string;
    updatedAt: string;
    isLikedByUser: boolean;
    deletedAt: string | null;
}
