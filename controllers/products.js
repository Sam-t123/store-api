const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: { $gt: 40 } })
    .select('name price')
    .sort('price');
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  // console.log(req.query);
  const { featured, company, name, sort, fields, numericFilters } = req.query;
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

  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };

    // regular expression
    const regEx = /\b(<|<=|>|>=|=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    // options to make sure this filter only applies to field with numbers
    const options = ['price', 'rating'];

    filters = filters.split(',').forEach((element) => {
      const [field, operator, value] = element.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
    console.log(queryObject);
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

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
