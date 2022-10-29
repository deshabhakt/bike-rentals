const express = require("express");

const bikeRouter = express.Router();

const Bike = require("../../database/models/bike-model");
const adminAuthenticator = require("../../middlewares/adminAuthMiddleware");

bikeRouter.post("/bike", adminAuthenticator, async (req, res) => {
  try {
    console.log(req.body);
    const bike = Bike({ ...req.body });
    await bike.save();
    res.send({
      success: {
        message: "Bike data added successfully",
        data: bike,
      },
    });
  } catch (e) {
    res.send({
      error: {
        message: "Something went wrong",
        e,
      },
    });
  }
});

// this call needs to be modified with query strings
// bike?count=10&skip=10
bikeRouter.get("/bike", async (req, res) => {
  try {
    const count = parseInt(req.query.count);
    let start = parseInt(req.query.skip);
    if (start === 0) {
      start = 0;
    } else {
		start += 1;
    }

    var bikes = await Bike.find({});
	  if (start > bikes.length) {
      return res.send({
        success: {
          message: "No bikes data found",
          data: [],
        },
      });
    }
	  if (start + count > bikes.length) {
      bikes = bikes.slice(start, bikes.length);
    } else {
      bikes = bikes.slice(start, start + count);
    }

    console.log(bikes, "bikes", bikes.length);
    console.log(req.query,count,start);
    if (!bikes) {
      throw "No bikes data found";
    }
    if (bikes.length == 0) {
      return res.send({
        success: {
          message: "No bikes data found",
          data: [],
        },
      });
    }
    res.send({
      success: {
        message: "Bikes data fetched successfully",
        data: bikes,
      },
    });
  } catch (e) {
    res.send({
      error: {
        message: "Something went wrong",
        e,
      },
    });
  }
});

// this call needs to be modified with query strings
bikeRouter.get("/bike/all", async (req, res) => {
  try {
    const bikes = await Bike.find({});
    if (!bikes || bikes.length == 0) {
      throw "No bikes data found";
    }
    res.send({
      success: {
        message: "Bikes data fetched successfully",
        data: bikes,
      },
    });
  } catch (e) {
    res.send({
      error: {
        message: "Something went wrong",
        e,
      },
    });
  }
});

// will be removed
bikeRouter.delete("/bike/all", adminAuthenticator, async (req, res) => {
  try {
    const data = await Bike.deleteMany({});
    if (!data || data.length == 0) {
      throw "Bike data not found";
    }
    res.send({
      success: {
        message: "All bike data deleted successfully",
        data,
      },
    });
  } catch (e) {
    console.log(e);
    res.send({
      error: {
        message: "Something went wrong",
        e,
      },
    });
  }
});

bikeRouter.get("/bike/:id", async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);
    res.send({
      success: {
        message: "Bike data fetched successfully",
        data: bike,
      },
    });
  } catch (e) {
    res.send({
      error: {
        message: "Something went wrong",
        e,
      },
    });
  }
});

bikeRouter.patch("/bike/:id", adminAuthenticator, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      "name",
      "manufacturer",
      "registration_date",
      "liecense_plate_number",
    ];

    const isValid = updates.every((update) => allowedUpdates.includes(update));
    if (!isValid) {
      throw "Invalid Update";
    }
    const bike = await Bike.findById({ _id: req.params.id });
    if (!bike) {
      throw "Bike not found";
    }
    updates.forEach((update) => {
      bike[update] = req.body[update];
    });
    await bike.save();
    res.send({
      success: {
        message: "Bike data updated successfully",
        data: bike,
      },
    });
  } catch (e) {
    res.send({
      error: {
        message: "Something went wrong",
        e,
      },
    });
  }
});

bikeRouter.delete("/bike/:id", adminAuthenticator, async (req, res) => {
  try {
    const bike = await Bike.findById({ _id: req.params.id });
    if (!bike) {
      throw "Bike data not found";
    }
    bike.remove();
    res.send({
      success: {
        message: "Bike data deleted successfully",
        data: bike,
      },
    });
  } catch (e) {
    res.send({
      error: {
        message: "Something went wrong",
        e,
      },
    });
  }
});

module.exports = bikeRouter;
