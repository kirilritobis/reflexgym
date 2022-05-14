import multer from 'multer';
import path from 'path';

const storage = (dest: any) => {
  return multer.diskStorage({
    destination(req: any, file: any, cb: (arg0: null, arg1: string) => void) {
      cb(null, `uploads/${dest}`);
    },
    filename(req: any, file: { originalname: string; }, cb: (arg0: null, arg1: string) => void) {
      const filename = Date.now() + path.extname(file.originalname);

      cb(null, filename);
    },
  });
};

export const upload = (destin: any) => {
  return multer({ storage: storage(destin) });
};
