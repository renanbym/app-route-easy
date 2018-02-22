const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const SchemaTypes = mongoose.Schema.Types;

module.exports = () => {

    const schema = mongoose.Schema(
        {
            name: { type: String, required: true }
            ,address: {
                 street: { type: String, default: ''}
                , latitude:  {type: SchemaTypes.Double, min: -180, max: 180,  required: true}
                , longitude: {type: SchemaTypes.Double, min: -180, max: 180,  required: true}
            }
        }
    );

    return mongoose.model('Delivery', schema);
}
