
import { Request,Response } from "express";
import { container } from "tsyringe";
import PostService from "../services/postService";
export default class PostController{
    static async getPost(_:Request, res:Response):Promise<void>{
        try{
            const postService = container.resolve(PostService);
            const getPosts = await postService.getPost();
            res.status(200).json({message: "Posts found", posts: getPosts});
        }catch(error){
            res.status(404).json({message: "Posts not found"})
        }
    }

    static async getPostById(req:Request, res:Response):Promise<void>{
        try{
            const {id} = req.params;
            if(!id)res.status(500).json({message: "Is necesary params id"});

            const postService = container.resolve(PostService);
            const getPost = await postService.getPostById(parseInt(req.params.id));
            res.status(200).json({message: "Post found", post: getPost})
        }catch(error){
            res.status(404).json({message: "Post not found"})
        }
    }
}