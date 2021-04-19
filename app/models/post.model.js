export default mongoose => {
    let schema = mongoose.Schema(
        {
            title: String,
            description: String,
            text: String,
            comments: []
        },
        { timestamps: true }
      );
    
      schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    
      const Post = mongoose.model("post", schema);
      return Post;
  };