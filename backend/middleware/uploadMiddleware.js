const multer = require('multer');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/webp'   // 🔥 added for modern images
  ];

  console.log("Uploaded type:", file.mimetype); // debug

  if (allowedTypes.includes(file.mimetype)) {   // ✅ fixed mimetype
    cb(null, true);
  } else {
    cb(new Error('Only image files (.jpeg, .jpg, .png, .webp) are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;