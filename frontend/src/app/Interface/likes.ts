
export interface LikeRequest {
    id: string,
    quantity: number,
    post_id:number
}
  
export interface LikeResponse {
    message: string,
    likes: [
        {
            id: string,
            quantity: number,
            post_id: number
        }
    ]
}