exports.allAccess = (req:any, res:any) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req:any, res:any) => {
    res.status(200).send("User Content.");
  };
  