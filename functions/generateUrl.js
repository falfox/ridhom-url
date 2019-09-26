"use strict";
const mongoose = require("mongoose");
const { MONGO_USER, MONGO_PASSWD } = process.env;
const querystring = require("querystring");
const url = require("url");

let conn = null;

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  context.callbackWaitsForEmptyEventLoop = false;
  // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
  if (conn == null) {
    conn = await mongoose.createConnection(
      `mongodb+srv://${MONGO_USER}:${MONGO_PASSWD}@cluster0-lphjz.mongodb.net/test?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        bufferCommands: false,
        bufferMaxEntries: 0
      }
    );
    conn.model(
      "Link",
      new mongoose.Schema({ hashid: String, longUrl: String })
    );
  }

  const Link = conn.model("Link");

  try {
    const params = JSON.parse(event.body);
    console.log(params);
    const { longUrl } = params;

    if (longUrl === undefined) {
      throw new Error("You must specify longUrl");
    }

    const validUrl = url.parse(longUrl);
    const hashid = await generateUniqueURL(Link);
    await Link.create({ hashid, longUrl: validUrl.href });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hashid,
        longUrl
      })
    };
  } catch (e) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
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
