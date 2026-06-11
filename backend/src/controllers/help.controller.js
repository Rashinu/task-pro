import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { sendHelpEmail } from "../utils/sendEmail.js";

const sendHelp = async (req, res) => {
  const { email, comment } = req.body;

  await sendHelpEmail({ email, comment });

  res.status(200).json({ message: "Your message has been sent" });
};

export default {
  sendHelp: ctrlWrapper(sendHelp),
};
