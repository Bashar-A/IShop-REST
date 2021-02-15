const Attribute = require('./model')


async function findAll(req, res)  {
    try{
        const {
            filter = null,
            skip = null,
            limit = null
        } = req.body?.attributes?.options || {}

        if(filter)Object.keys(filter).forEach(filterKey => {
            Object.keys(filter[filterKey]).forEach(key => {
                filter[filterKey][`$${key}`] = filter[filterKey][key]
                delete filter[filterKey][key]
            })
        })

        const attributes = await Attribute.find(
            filter,
            null,
            {skip,limit,}
            )

        const totalAttributes = Object.keys(attributes).length

        res.status(200).json({
            attributes,
            totalAttributes
        })
    }catch(e){
        res.status(401).json({
            error: e.message
        })
    }
}

async function create(req, res)  {
    try{
        const input = req.body?.attribute
        const attribute = await Attribute.create(input)
        await attribute.save()

        res.status(200).json({
            attribute
        })
    }catch(e){
        res.status(401).json({
            error: e.message
        })
    }
}

async function find(req, res)  {
    try{
        const id = req.params.id
        const attribute = await Attribute.findById(id)
        res.status(200).json({
            attribute
        })
    }catch(e){
        res.status(401).json({
            error: e.message
        })
    }
}

async function update(req, res)  {
    try{
        const id = req.params.id
        const input = req.body?.attribute
        const attribute = await Attribute.findById(id)
        attribute.set(input)
        await attribute.save()
        res.status(200).json({
            attribute
        })
    }catch(e){
        res.status(401).json({
            error: e.message
        })
    }
}

async function remove(req, res)  {
    try{
        const id = req.params.id
        const attribute = await Attribute.findByIdAndDelete(id)

        res.status(200).json({
            attribute
        })
    }catch(e){
        res.status(401).json({
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