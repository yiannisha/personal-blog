export function isFeedAdminEnabled() {
  return process.env.ENABLE_FEED_ADMIN === "true";
}
