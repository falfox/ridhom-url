"use strict";
const mongoose = require("mongoose");
const { MONGO_USER, MONGO_PASSWD } = process.env;

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
      new mongoose.Schema({ hashid: String, longURL: String })
    );
  }

  const Link = conn.model("Link");

  try {
    const params = JSON.parse(event.body);
    console.log(params);
    const { hashid } = params;

    if (!hashid) {
      throw new Error("You must specify longURL");
    }

    const link = await Link.findOne({ hashid });

    if (link) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(link)
      };
    }
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "URL Destination not found"
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
