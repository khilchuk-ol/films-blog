import bcrypt from "bcrypt-node";

const SALT_FACTOR = 10;

const noop = () => {};

export default (mongoose, mongoosePaginate) => {
  let schema = mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
        minLength: [3, "Too short username, it must be at least 3 characters"],
        maxLength: [20, "Too long username, it must be maximum 20 characters"],
        unique: true,
      },
      password: {
        type: String,
        required: true,
        unique: true,
        minLength: [8, "Too short password, it must be at least 8 characters"],
        validate: {
          validator: function (v) {
            return v.search(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) > -1;
          },
          message: (props) =>
            `${props.value} is not a valid password!\nIt must contain at least one letter and one number`,
        },
      },
      email: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: function (v) {
            return (
              v.search(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              ) > -1
            );
          },
          message: (props) => `${props.value} is not a valid email address!`,
        },
      },
      picture: {
        type: String,
        default: "default.png",
        required: true,
      },
      roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "role",
        },
      ],
    },
    {
      optimisticConcurrency: true,
      timestamp: true,
    }
  );

  schema.plugin(mongoosePaginate);

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const encrypt = function (done) {
    let user = this;

    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
      if (err) {
        return done(err);
      }

      bcrypt.hash(user.password, salt, noop, function (err, hashedPass) {
        if (err) {
          return done(err);
        }

        user.password = hashedPass;
        done();
      });
    });
  };

  schema.pre("save", encrypt);
  schema.pre("findOneAndUpdate", encrypt);

  schema.methods.checkPassword = function (guess, done) {
    bcrypt.compare(guess, this.password, function (err, isMatch) {
      done(err, isMatch);
    });
  };

  const User = mongoose.model("user", schema);
  return User;
};
