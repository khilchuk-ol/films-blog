export default mongoose => {
    let schema = mongoose.Schema(
        {
            title: { type: String, required: true },
            description: String,
            text: String,
            comments: [{
              date: Date,
              username: String,
              text: String,
              rating : {type: Number, min: 0, max: 10, require: true}
            }]
        },
        { timestamps: true }
      );
    
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    }); 

    schema.virtual('rating').get(function() {
      return this.comments ? this.comments.map(c => c.rating).reduce((a, b) => a + b, 0) / this.comments.length : 0;
    });  
    
    const Post = mongoose.model("post", schema);
    return Post;
  };