const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).select('name price');
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  // console.log(req.query);
  const { featured, company, name, sort, fields } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.company = { $regex: name, $options: 'i' };
  }

  let result = Product.find(queryObject);
  if (sort) {
    const temp = sort.replace(',', ' ');
    result.sort(temp);
  } else {
    result.sort('createdAt');
  }

  if (fields) {
    const temp = fields.replace(',', ' ');
    result.select(temp);
  }

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
