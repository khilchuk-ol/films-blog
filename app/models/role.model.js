export default mongoose => {
    let schema = mongoose.Schema(
        {
            name: 
            {
                type: String,
                required: true,
                enum: ['user', 'administrator', 'moderator']
            }
        },
        {
            optimisticConcurrency: true,
            timestamp: true
        }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    }); 

    const Role = mongoose.model('role', schema);
    return Role;
}