export default function () {
  let baseURL;
  process.env.BASE_URL ? baseURL = process.env.BASE_URL : baseURL = "https://ubpilots.fltprep.com/api";
  return {
    "baseURL": baseURL
  };
}
