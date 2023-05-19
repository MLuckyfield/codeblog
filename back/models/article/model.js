const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Article = mongoose.model('Article', new Schema({
  en_name: {
    type: String,
    required: true,
  },
  en_content: [],
  jp_content: [],
  identifier: {
    type: String,
    required: true,
  },
  jp_name: {
    type: String,
  },
  tags: [{
    value:{type: String},
    checked:{type: Boolean}
  }],
  //
  status: {
    type: String,
  },
  //performance analytics
  search_count: {
    type: Number,
  },
  read_count: {
    type: Number,
  },
  upvotes: {
    type: Number,
  },
},{
  timestamps: true,
}));

module.exports = Article;
