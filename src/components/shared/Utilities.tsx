/**
 * Gets the current time formatted as HH:MM:SS
 */
export function formatCurrentTime() : string {
  const currentTime = new Date();
  const displayTime = currentTime.getHours() + ":" 
    + currentTime.getMinutes() + ":" 
    + currentTime.getSeconds();
  return displayTime;
}

export const enum HttpMethodType {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}