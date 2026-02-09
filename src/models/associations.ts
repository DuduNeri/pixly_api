import Post from "./post.model";
import User from "./user.model";

Post.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

User.hasMany(Post, {
  foreignKey: "userId",
  as: "posts",
});
