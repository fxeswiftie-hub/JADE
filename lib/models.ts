import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  bio: { type: String },
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const inspirationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  source: { type: String },
  category: { type: String, enum: ['book', 'website', 'design', 'copywriting', 'visual', 'other'] },
  tags: [String],
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const workshopSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  inspirationIds: [String],
  conversations: [{
    provider: String,
    messages: [{
      role: String,
      content: String,
      timestamp: Date,
    }],
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const portfolioSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: ['photography', 'copywriting', 'music', 'handicraft'], required: true },
  imageUrl: { type: String },
  contentUrl: { type: String },
  inspirationId: { type: String },
  isPublished: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const commentSchema = new mongoose.Schema({
  portfolioId: { type: String, required: true },
  author: { type: String },
  content: { type: String, required: true },
  isApproved: { type: Boolean, default: false },
  isSpam: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Inspiration = mongoose.models.Inspiration || mongoose.model('Inspiration', inspirationSchema);
export const Workshop = mongoose.models.Workshop || mongoose.model('Workshop', workshopSchema);
export const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', portfolioSchema);
export const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);
