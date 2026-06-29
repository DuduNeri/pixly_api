import User from "./user.model";
import Post from "./post.model";
import Comment from "./comments.model";
import Like from "./like.model";

// ====================
// POST RELATIONS
// ====================

Post.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

Post.hasMany(Comment, {
  foreignKey: "postId",
  as: "comments",
  onDelete: "CASCADE",
});

Post.hasMany(Like, {
  foreignKey: "postId",
  as: "likes",
  onDelete: "CASCADE",
});

// ====================
// USER RELATIONS
// ====================

User.hasMany(Post, {
  foreignKey: "userId",
  as: "posts",
});

User.hasMany(Comment, {
  foreignKey: "userId",
  as: "comments",
});

User.hasMany(Like, {
  foreignKey: "userId",
  as: "likes",
});

// ====================
// COMMENT RELATIONS
// ====================

Comment.belongsTo(Post, {
  foreignKey: "postId",
  as: "post",
});

Comment.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// ====================
// LIKE RELATIONS
// ====================

Like.belongsTo(Post, {
  foreignKey: "postId",
  as: "post",
});

Like.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});