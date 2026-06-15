import User from "./user.model";
import Post from "./post.model";
import Comment from "./commetns.model";

User.hasMany(Post, { foreignKey: "userId", as: "posts" });
Post.belongsTo(User, { foreignKey: "userId", as: "user" });
Post.hasMany(Comment, { foreignKey: "postId", as: "comments" });
Comment.belongsTo(Post, { foreignKey: "postId", as: "post" })

export { User, Post };
