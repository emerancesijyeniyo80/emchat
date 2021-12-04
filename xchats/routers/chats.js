const express = require("express");
const { check } = require("express-validator");

const checkAuth = require("../middleware/checkAuth");

const chatsController = require("../controllers/chats");

const router = express.Router();

const Chats = new chatsController();
// Login part

// @route Post api/users/login
// @desc login as users
// @public
router.post(
  "/",
  [
    check("chat_id", "Chat is required").not().isEmpty(),
    check("sender_id", "Send is required").not().isEmpty(),
    check("receiver_id", "Receiver is required").not().isEmpty(),
    check("message", "Receiver is required").not().isEmpty(),
  ],
  checkAuth,
  Chats.createChat
);
// @route GET xcapi/chats
// @desc View all chats
// @private
router.get("/", checkAuth, Chats.getChats);
// @route GET xcapi/chats/:chat_id
// @desc View users chat by chat id
// @private
router.get("/:chat_id", checkAuth, Chats.getByChatId);

// @route GET xcapi/chats/userchats/:chat_id
// @desc View users chat by chat id
// @private
router.get("/userchats/:user_id", checkAuth, Chats.getByChatUserId);
module.exports = router;
