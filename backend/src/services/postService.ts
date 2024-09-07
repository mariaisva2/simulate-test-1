import { inject, injectable } from "tsyringe";
import Post from "../models/postModel";
import PostRepository from "../repositories/postRepository";

@injectable()
export default class PostService{
    constructor(@inject(PostRepository) private postRepository: PostRepository){}
    async getPost():Promise<Post[]>{
        return await this.postRepository.getPosts();
    }

    async getPostById(post_id:number):Promise<Post | null> {
        return await this.postRepository.getPostById(post_id);
    }
}
