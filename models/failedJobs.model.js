const mongoose = require('mongoose')
const { ObjectId } = mongoose

const failedJobSchema = mongoose.Schema({
    agendaId: {
        type: ObjectId,
        required: true
    },
    payload: { 
        type: Object, 
        required: true
    },
    reff: { 
        type: Object, 
        required: true
    },
    failReason: {
        type: String, 
        required: true
    },
    failedAt: {
        type: Date,
        default: Date.now
    }
},
{
    timestamps: true
})

const FailedJobs = mongoose.model('failedJobs', failedJobSchema)

module.exports = FailedJobs