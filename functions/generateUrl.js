"use strict";
const mongoose = require("mongoose");
const { MONGO_USER, MONGO_PASSWD } = process.env;

exports.handler = async event => {
  mongoose.connect(
    `mongodb+srv://${MONGO_USER}:${MONGO_PASSWD}@cluster0-lphjz.mongodb.net/test?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

  const Schema = mongoose.Schema;

  const LinkSchema = new Schema({
    hashid: String,
    longUrl: String
  });

  mongoose.model("Link", LinkSchema);
  const Link = mongoose.model("Link");

  try {
    const { longUrl } = event;

    if (longUrl === undefined) {
      throw new Error("You must specify longUrl");
    }

    const url = new URL(longUrl);
    const hashid = await generateUniqueURL(Link);
    await Link.create({ hashid, longUrl: url.href });

    return {
      statusCode: 200,
      body: JSON.stringify({
        hashid,
        longUrl
      })
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `${e.message}`
      })
    };
  }
};

async function generateUniqueURL(Link) {
  return new Promise((resolve, reject) => {
    const hashid = Math.random()
      .toString(36)
      .slice(-6);

    Link.count({ hashid }, function(err, count) {
      if (err) reject(err);
      if (count > 0) {
        return generateUniqueURL();
      } else {
        resolve(hashid);
      }
    });
  });
}
