const fs = require('fs')
const multer = require('multer')

const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can only upload image files!'), false);
    }
    cb(null, true);
};

// Multer configuration (for ItemModel)

const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/images' );
  },
  filename: (req, file, cb) => {
      // console.log("File name : " + Date.now() + file.originalname);
      cb(null,  Date.now() + '-' + file.originalname)
  }
});

const upload1 = multer({ 
  storage: storage1,
  limits: {fileSize: 1024 * 1024 * 5},  // maximum file size allowed is 5 MB
  fileFilter: imageFileFilter
});

module.exports.ItemImage = upload1;


// Multer configuration (for CartModel)

const storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images' );
    },
    filename: (req, file, cb) => {
        // console.log("File name : " + Date.now() + file.originalname);
        cb(null,  Date.now() + '-' + file.originalname)
    }
  });
  
  const upload2 = multer({ 
    storage: storage2,
    limits: {fileSize: 1024 * 1024 * 5},  // maximum file size allowed is 5 MB
    fileFilter: imageFileFilter
  });
module.exports.CartImage = upload2;

//For deleting files
async function DeleteFile(_path)
{
  // console.log("_path : " + _path);
  
  fs.unlink(_path, (err) =>{
    console.log(err);
  });
}
module.exports.DeleteFile = DeleteFile;







