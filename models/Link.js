const {Schema,model} = require('mongoose');

const schema = new Schema({
externalUrl:{type:String, required:true},
shortUrl:{type:String, required:true,unique:true},
code:{type:String, required:true, unique:true},
clicks:{type:Number, default:0},
owner:{type: Schema.Types.Object, ref:'Users'},
created_at:{type:Date, default:Date.now}
});
module.exports = model('Links',schema);