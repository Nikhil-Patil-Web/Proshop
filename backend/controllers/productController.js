import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc Route to fetch all products
// @route GET api/products
// @acess Public

const getProducts = asyncHandler(async(req, res)=>{
    const products = await Product.find({})
    res.json(products)
})

// @desc Route to fetch a single product
// @route GET api/products/:id
// @acess Public

const getProductById = asyncHandler(async (req, res) =>{

    const product = await Product.findById(req.params.id);
    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }  
})



// @desc Delete a product
// @route DELETE api/products/:id
// @acess Private/Admin

const deleteProduct = asyncHandler(async (req, res) =>{

    const product = await Product.findById(req.params.id);
    if(product){
        await product.remove()
        res.json({message:'Product removed successfully'})
    }else{
        res.status(404)
        throw new Error('Product not found')
    }  
})




// @desc Create a product
// @route POST /api/products
// @acess Private/Admin

const createProduct = asyncHandler(async (req, res) =>{

    const product = new Product ({
        name:'Sample Name',
        price: 0,
        user: req.user._id,
        image: '/images/sample',
        brand:'sample brand',
        category:'sample category',
        countInStock:0,
        numReviews:0,
        description:'Sample Description'
    })
    const createdProduct = await product.save();
    res.status(201).json(createdProduct)
 
})


// @desc Update a product
// @route PUT /api/products/:id
// @acess Private/Admin

const updateProduct = asyncHandler(async (req, res) =>{
    const {name, price, description, image, brand, category, countInStock}=req.body

    const product = await Product.findById(req.params.id)

    if(product){
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;



    const updatedProduct = await product.save();
    res.json(updatedProduct)
    }else{
        res.status(404)
        throw new Error('Product Not Found')
    }
})

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct}