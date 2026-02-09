import User from "./user.model";
import Post from "./post.model";

User.hasMany(Post, { foreignKey: "userId", as: "posts" });
Post.belongsTo(User, { foreignKey: "userId", as: "user" });

export { User, Post };
