import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "src/public/assets/PostExercices";
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });
const fileUploaded = upload.single("files");

const ExercicieUploadMiddleware = (req, res, next) => {
  fileUploaded(req, res, (err) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: "Error uploading ecercicie image" });
    }
    next();
  });
};

export default ExercicieUploadMiddleware;
