const acccountServices = require("../../services/accountServices");


exports.checkExistEmail  = async (req,res,next) => 
{
    var result = 0;
    res.status(202).send(result);
}