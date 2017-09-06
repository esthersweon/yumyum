function index(req, res) {
  res.json({
    message: "Welcome our FoodTruck Project! Here's what you need to know!",
    documentation_url: "https://github.com/jkwr/yumyum/blob/master/README.md",
    base_url: "localhost:3000",
    endpoints: [
      {
        method: "GET", path: "/api", description: "Describes available endpoints"
      }
    ]
  });
}

module.exports = {
  index: index
}
