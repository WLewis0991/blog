interface NewPost{
    id: number,
    user_id: number,
    post: string,
    post_title: string,
    created_at: string,
    updated_at: string,
}

export type { NewPost }
export type Post = NewPost