const {Schema, model} = require('mongoose')
const Product = require('../products')



const Order = new Schema({
    customer: {type: Schema.Types.ObjectId, ref: 'Customer'},
    date: {type: Date, default: Date.now()},
    orderSum: Number,
    paymentType: String,
    status: String,
    address: String,
    comments: String,
    orderItems: [{
        product:{type: Schema.Types.ObjectId, ref: 'Product'},
        quantity: Number
    }]
},{
    timestamps: true
})

Order.methods.calculateOrder = async function(){
    this.orderSum = 0
    this.orderItems.forEach(item => {
        const price = Product.findById(item.product).getCurrentPrice()
        this.orderSum += price * item.quantity
    });
}


//TODO
exports.OrderStatuses = []
exports.PaymentTypes = ['Картой','Наличными']
module.exports = model('Order', Order)