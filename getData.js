const https = require("https");

https
  .get(`https://pokeapi.co/api/v2/pokemon/1`, res => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      body += data;
    });
    res.on("end", () => {
      console.log(body);
      //   console.log(JSON.parse(body));
    });
  })
  .on("error", err => {
    console.log("Error: " + err.message);
  });
