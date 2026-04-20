interface NewComment {
    id: number,
    post_id: number,
    user_id: number,
    comment: string,
    created_at: string
}

export type {NewComment}