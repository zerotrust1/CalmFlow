import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { getUserPreferences, saveUserPreferences } from "../../lib/preferences";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = session.user.id as string;

  if (req.method === "GET") {
    const preferences = getUserPreferences(userId);
    return res.status(200).json({ preferences });
  }

  if (req.method === "POST") {
    const preferences = saveUserPreferences(userId, req.body);
    return res.status(200).json({ preferences });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
