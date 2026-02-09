import { post } from "./api";

export async function getSession(channel: string) {
  let sessionId = localStorage.getItem("sessionId");
  if (!sessionId) {
    const session = await post("/session/create", { channel });
    sessionId = session.id;
    localStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
}
