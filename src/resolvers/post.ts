import { Resolver, Query, Ctx, Arg, Int, Mutation } from "type-graphql";
import { Post } from "../entities/Post";
import { MyContext } from "../types";
import { idText } from "typescript";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() { em }: MyContext): Promise<Post[]> {
    return em.find(Post, {});
  }
}
