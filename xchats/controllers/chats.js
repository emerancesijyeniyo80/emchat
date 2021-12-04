const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");

const User = require("../models/users");
const Chat = require("../models/chats");
const TextChat = require("../models/text-chats");

class chatsController {
  createChat = async (req, res, next) => {
    const errors = validationResult(req);
    // check is there is errors & return them
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
      });
    }
    try {
      // Base statement (Direct insert message)

      const isExistChat = await Chat.find(req.body.chat_id);

      if (isExistChat.length > 0) {
        const textChat = await TextChat.insert(req.body);

        return res.status(200).json({
          msg: "Message sent",
          data: textChat,
        });
      }
      // Initiate message

      const chat = await Chat.insert(req.body);
      if (chat.affectedRows === 1) {
        await TextChat.insert(req.body);
      }

      return res.status(200).json({
        msg: "Message sent",
        data: chat,
      });
    } catch (error) {
      return next(error);
    }
  };

  getChats = async (req, res) => {
    try {
      const chatRlt = await User.findAll();

      return res.status(200).send(chatRlt);
    } catch (error) {
      return res.status(500).json({
        error: error,
      });
    }
  };
  getByChatId = async (req, res) => {
    try {
      const userChats = await TextChat.findByChatId(req.params.chat_id);

      return res.status(200).send(userChats);
    } catch (error) {
      return res.status(500).json({
        error: error,
      });
    }
  };
  getByChatUserId = async (req, res) => {
    try {
      let userChatsTexts = [];
      const userChats = await Chat.findByUserId(req.params.user_id);

      for (const key in userChats) {
        let userChatElement = userChats[key];

        const receiver = await User.find(userChatElement.receiver_id);
        const sender = await User.find(userChatElement.sender_id);
        const userChatText = await TextChat.findByChatId(
          userChatElement.chat_id
        );
        delete receiver[0].password;
        delete sender[0].password;

        userChatElement.sender_id = sender[0];
        userChatElement.receiver_id = receiver[0];

        userChatsTexts.push({ ...userChatElement, userChatText });
      }
      return res.status(200).send(userChatsTexts);
    } catch (error) {
      return res.status(500).json({
        error: error,
      });
    }
  };
  getChatSender = async (req, res) => {
    try {
      const chatRlt = await Chat.find(req.params.send_id);

      return res.status(200).send(chatRlt);
    } catch (error) {
      return res.status(500).json({
        error: error,
      });
    }
  };
  getChatSenderReciever = async (req, res) => {
    try {
      console.log(req.params);
      const chatRlt = await Chat.find(
        req.params.sender_id,
        req.params.receiver_id
      );

      return res.status(200).send(chatRlt);
    } catch (error) {
      return res.status(500).json({
        error: error,
      });
    }
  };

  deleteAll = async (req, res) => {
    try {
      // Check if user is registered
      const isChatExist = await Chat.find(req.params.chat_id);

      if (isChatExist.length == 0) {
        return res.status(404).json({
          msg: "Not found",
        });
      }
      const result = await Chat.delete(req.params.chat_id);
      return res.status(200).json({
        msg: "Deleted",
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
      });
    }
  };
}

module.exports = chatsController;
