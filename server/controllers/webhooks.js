import { Webhook } from "svix";
import User from "../modules/User.js";

// Api Controller Function to Manage Clerk User with database

export const clerkWebhooks = async (req, res) => {
  try {
    //   if (!process.env.CLERK_WEBHOOK_SECRET) {
    //     console.error("❌ Missing CLERK_WEBHOOK_SECRET in environment variables");
    //     return res
    //       .status(500)
    //       .json({ success: false, message: "Server configuration error" });
    //   }

    //   const payload = req.body.toString("utf8");

    //   const headers = {
    //     "svix-id": req.headers["svix-id"],
    //     "svix-timestamp": req.headers["svix-timestamp"],
    //     "svix-signature": req.headers["svix-signature"],
    //   };

    //   const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    //   const evt = wh.verify(payload, headers);

    //   const { type, data } = evt;

    await User.create({
      _id: "50",
      name: "tonis",
      email: "tonis@gami.com",
      imageUrl: "tonis and tonis",
    });

    console.log("Received webhook:", req.body);
    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + "" + data.last_name,
          imageUrl: data.image_url,
        };
        await User.create(userData);
        res.json({ success: true, message: "User created" });
        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + "" + data.last_name,
          imageUrl: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        res.json({ success: true, message: "User updated" });
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({ success: true, message: "User deleted" });
        break;
      }

      default:
        break;
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.error("Webhook error:", error);
  }
};
