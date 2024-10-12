import bcrypt, { hash } from "bcrypt";

// Hassing password during Registration
export const hashPassword = (password) => {
  return new Promise((res, rej) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        rej(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          rej(err);
        }
        res(hash)
      });
    });
  });
};

// Hassing password during Login and comparing it
export const comparePassword = (password, hash) => {
  return new Promise((res, rej) => {
    bcrypt.compare(password, hash, (err, same)=>{
        if(err){
            rej(err);
        }
        res(same);
    });
  });
};
