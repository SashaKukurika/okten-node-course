import https from "https";

https.request("https://google.com", (res) => {
  res.on("data", () => {
    console.log("data");
  });
});
