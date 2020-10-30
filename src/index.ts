import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";

const main = async () => {
  const orm = await MikroORM.init({
    entities: [Post],
    dbName: "reddit-clone",
    user: "",
    password: "",
    type: "postgresql",
    debug: !__prod__,
  });
};

main();

console.log("hello world");
