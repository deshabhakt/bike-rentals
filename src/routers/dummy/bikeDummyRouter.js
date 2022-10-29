const express = require("express");

const bikeDummyRouter = express.Router();
const BikeDocument = require("../../database/models/bike-document-model");
const Bike = require("../../database/models/bike-model");

const {
  DOC_TYPE_BIKE_IMAGE,
} = require("../../utils/macros/bikeDocumentMacros");
var counter = 0;
bikeDummyRouter.post("/dummy/addBike", async (req, res) => {
  // console.log(req.body)
  try {
    const {
      name,
      color,
      images,
      condition,
      manufacturer,
      engineSize: engine_size,
      perDayCharge: per_day_charge,
      registrationDate: registration_date,
      licencePlateNumber: licence_plate_number,
      totalDistanceTravelled: total_distance_travelled,
    } = req.body;

    const newBike = Bike({
      name,
      color,
      condition,
      engine_size,
      manufacturer,
      per_day_charge,
      registration_date,
      licence_plate_number,
      total_distance_travelled,
    });

    const savedBikeData = await newBike.save();
    // console.log("bike data", savedBikeData);
    for (let i = 0; i < images.length; i++) {
      const mimetype = images[i].data.split("data:")[1].split(";base64")[0];
      const bikeDoc = new BikeDocument({
        name: images[i].name,
        data: images[i].data,
        doctype: images[i].doctype,
        type: DOC_TYPE_BIKE_IMAGE,
        size: 4 * Math.ceil(images[i].data.length / 3) * 0.5624896334383812, // getting image size in bytes from base64 string
        productId: savedBikeData._id,
        mimetype: "image/png",
        owner: undefined,
        encoding: undefined,
      });
      await bikeDoc.save();
    }
    console.log("counter", counter++);
    return res.send(savedBikeData);
  } catch (e) {
    console.log("error in posting data", e);
  }
});

bikeDummyRouter.get("/allbikes", async (req, res) => {
  try {
    var bikes = await Bike.find().limit(4);
    const retArr = [];
    for (let i = 0; i < bikes.length; i++) {
      const bikeDocs = await BikeDocument.find({
        productId: bikes[i]._id,
      });
      const bikeData = bikes[i].toJSON();
      bikeData["documents"] = bikeDocs;

      retArr.push(bikeData);
    }

    res.send(retArr);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

bikeDummyRouter.post("/dummy/banners", async (req, res) => {
  try {
    const bannerImages = req.body;
    for (let i = 0; i < bannerImages.length; i++) {
      const newBanner = {
        name: bannerImages[i].name,
        data: bannerImages[i].data,
        doctype: bannerImages[i].doctype,
        mimetype: bannerImages[i].mimetype,
        type: DOC_TYPE_BIKE_IMAGE,
        size:
          4 * Math.ceil(bannerImages[i].data.length / 3) * 0.5624896334383812, // getting image size in bytes from base64 string
        owner: undefined,
        encoding: undefined,
      };
    }
    const data = await BikeDocument.insertMany(bannerImages);

    console.log(data, "this is data");
    res.send({
      data,
      message: "banner images posted and stored in database successfully",
    });
  } catch (e) {
    res.send({
      e,
      message:
        "something went wrong while posting or storing banner images data to database",
    });
  }
});

module.exports = bikeDummyRouter;
