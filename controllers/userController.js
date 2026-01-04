const userModel = require("../models/userModel");
const imageKit = require("../utils/imagekit");

exports.userDetails = async (req, res) => {
  try {
    let email = req.user;
    let userDetails = await userModel.findOne({ email: email });
    res.status(200).json(userDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Somthing went wrong in server" });
  }
};

exports.editProfile = async (req, res) => {
  try {
    let { id } = req.params;
    let { name, profession } = req.body;
    let userDetails = await userModel.findByIdAndUpdate(
      { _id: id },
      { name, profession },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "User details updated successfully", userDetails });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Somthing went wrong in server" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    let { id } = req.params;
    let { password } = req.body;
    let userDetails = await userModel.findByIdAndUpdate(
      { _id: id },
      { password },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "User details updated successfully", userDetails });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Somthing went wrong in server" });
  }
};

exports.removeProfilePhoto = async (req, res) => {
  try {
    let { id } = req.params;
    let userDetails = await userModel.findByIdAndUpdate(
      { _id: id },
      {
        profilePhoto:
          "https://ik.imagekit.io/shahansv/Kodecq/assets/NoProfilePicture.png",
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Profile photo removed successfully", userDetails });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Somthing went wrong in server" });
  }
};

exports.changeProfilePhoto = async (req, res) => {
  try {
    let { id } = req.params;
    const imageKitResponse = await imageKit.upload({
      file: req.file.buffer,
      fileName: `profile_${id}.jpg`,
      folder: "/kodecq/profile-photos",
      overwriteFile: true,
      useUniqueFileName: true,
    });

    const userDetails = await userModel.findOneAndUpdate(
      { email },
      { profilePhoto: imageKitResponse.url },
      { new: true }
    );

    res.status(200).json({
      message: "Profile photo updated successfully",
      userDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in server" });
  }
};
