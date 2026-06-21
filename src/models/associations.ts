import Post from "./post.model";
import User from "./user.model";
import Like from "./like.model";

Post.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(Post, { foreignKey: "userId", as: "posts" });

Like.belongsTo(User, { foreignKey: "userId", as: "user" });

Like.belongsTo(Post, { foreignKey: "postId", as: "post" });
Post.hasMany(Like, { foreignKey: "postId", as: "likes" });