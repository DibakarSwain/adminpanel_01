// await schema.parseAsync(req.body) is the line where we use the req body data against the defined schema

const validate = (schema) => {
  return async (req, res, next) => {
    try {
      const parseBody = await schema.parseAsync(req.body);
      req.body = parseBody;
      next();
    } catch (err) {
      // imp for showing error so log is imp here--
      //   console.log(err);
      const status = 422;
      const message = "Fill the input properly";
      const extraDetails = err.issues[0].message;

      const error = {
        status,
        message,
        extraDetails,
      };
      // res.status(400).json({ msg: message });
      console.log(message);
      console.log(extraDetails);

      next(error);
    }
  };
};

module.exports = validate;
