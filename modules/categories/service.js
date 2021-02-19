const Category = require('./model')


async function findAll(req, res)  {
    try{
        const {
            filter = null,
            skip = null,
            limit = null
        } = req.body?.categories?.options || {}

        if(filter)Object.keys(filter).forEach(filterKey => {
            Object.keys(filter[filterKey]).forEach(key => {
                filter[filterKey][`$${key}`] = filter[filterKey][key]
                delete filter[filterKey][key]
            })
        })

        const categories = await Category.find(
            filter,
            null,
            {skip,limit,}
            )

        const totalCategories = Object.keys(categories).length

        res.status(200).json({
            categories,
            totalcategories
        })
    }catch(e){
        res.status(400).json({
            error: e.message
        })
    }
}

async function create(req, res)  {
    try{
        const input = req.body?.category
        const category = await Category.create(input)
        await category.save()

        res.status(200).json({
            category
        })
    }catch(e){
        res.status(400).json({
            error: e.message
        })
    }
}

async function find(req, res)  {
    try{
        const id = req.query.id
        const category = await Category.findById(id)
        res.status(200).json({
            category
        })
    }catch(e){
        res.status(400).json({
            error: e.message
        })
    }
}

async function update(req, res)  {
    try{
        const id = req.query.id
        const input = req.body?.category
        const category = await Category.findById(id)
        category.set(input)
        await category.save()
        res.status(200).json({
            category
        })
    }catch(e){
        res.status(400).json({
            error: e.message
        })
    }
}

async function remove(req, res)  {
    try{
        const id = req.query.id
        const category = await Category.findByIdAndDelete(id)

        res.status(200).json({
            category
        })
    }catch(e){
        res.status(400).json({
            error: e.message
        })
    }
}



  
module.exports = {
    findAll,
    create,
    find,
    update,
    remove
}