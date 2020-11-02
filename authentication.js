var JWT= require('jsonwebtoken');

module.exports.ensuretoken = function(req,res,next)
{
    //token founding
  const bearerHeader=req.headers["authorization"];
  if(typeof bearerHeader !== 'undefined')
  {
    const bearer= bearerHeader.split(" ");
    const bearertoken=bearer[1];
    req.token=bearertoken;
    //token verify
    JWT.verify(req.token,'my_secret_key',function(err,data)
    {

        if(err)
        {
            res.sendStatus(403);
        }
        next();
    })
    
  }
  else
  {
    res.sendStatus(403);
  }
  
}