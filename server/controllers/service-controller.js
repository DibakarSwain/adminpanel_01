const Service = require("../models/service-model");

const services = async (req, res) => {
  try {
    const response = await Service.find();
    if (!response) {
      // Handle the case where no services found

      res.status(404).json({ msg: "No service found" });
      return;
    }
    res.status(200).json({ msg: response });
    console.log(response);
  } catch (error) {
    console.log(`services: ${error}`);
  }
};

module.exports = services;
