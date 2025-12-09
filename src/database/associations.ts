import { User } from "./../models/user.model";
import { Post } from "../models/post.model";

// 1 usuário → muitos posts
User.hasMany(Post, {
  foreignKey: "userId",
  as: "posts",
});

// cada post pertence a 1 usuário
Post.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});
