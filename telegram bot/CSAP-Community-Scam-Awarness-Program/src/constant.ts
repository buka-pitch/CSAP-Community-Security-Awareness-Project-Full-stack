import { Context } from "telegraf";
import { SendMessageFunction } from "./BotFunctions";

export let alertMsg =
  "**Welcome citizens of the world, you have entered the digital domain of the Community Scam Awareness Program!**\n\n```We are an organization dedicated to protecting internet users from deception and harm. The link that led you here seemed suspicious at first, I know. But fear not - it was sent by a fellow traveler who cares about your safety in our online world.\n\nAs social networks have connected us all, so too have they aided those with ill intent to spread malware and fraud. Under CSAP's watchful eye, we strive to:\n\n* **Train you to spot scams hiding in plain sight**\n* **Arm you with strategies to guard your privacy**\n* **Decode the methods of tricksters looking to steal or disrupt**\n* **Keep you current on emerging threats through our weekly digital newspaper**\n\nIn these times, when a single errant click or mistyped password threatens one's well-being, knowledge is power. But by joining together in vigilance and good faith, we can forge a future where all may explore technology's wonders without fear.```";

export const sendTemplate = {
  title:
    "https://bit.ly/safaricom-gift-free-giveaway-get-1gb-internet-and-100-minute-voice-package-now",
  description: "Thank you for choosing us!\nSafaricom Ethiopia",
  button: {
    inline_keyboard: [
      [
        {
          text: "Safaricom GiveAway",
          url: "https://bit.ly/safaricom-gift-free-giveaway-get-1gb-internet-and-100-minute-voice-package-now",
          callback_data: "link",
        },
      ],
    ],
  },
};
