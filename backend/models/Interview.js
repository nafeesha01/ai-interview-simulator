const mongoose=require("mongoose")

const interviewSchema=

new mongoose.Schema({

userId:{

type:String,
required:true

},

role:{

type:String,
required:true

},

answers:[String],

communicationScore:{

type:Number,
default:0

},

technicalScore:{

type:Number,
default:0

},

confidenceScore:{

type:Number,
default:0

},

overallScore:{

type:Number,
default:0

},

feedback:{

type:String,
default:""

},

createdAt:{

type:Date,
default:Date.now

}

})

module.exports=

mongoose.model(
"Interview",
interviewSchema
)