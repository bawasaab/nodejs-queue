const Agenda = require("agenda");
const mongoConnectionString = "mongodb://127.0.0.1/agenda";
const mongoJobsCollection = "agendaJobs";

const User = require('../models/User.model');
const FailedJobs = require('../models/failedJobs.model');

let $this;

module.exports = class agenda {

    constructor() {

        $this = this;
        
        $this.agendaObj = new Agenda();
        $this.agendaObj
        .database(mongoConnectionString, mongoJobsCollection)
        .processEvery('1 seconds');

        // console.log('$this.agendaObj', $this.agendaObj);

        $this.defineAddUsers();
    }

    async defineAddUsers() {
        let newUser;
        $this.agendaObj.define("add users", async (job) => {
            try {

                console.log('job defineAddUsers', job);
    
                newUser = {
                    email: 'abc_'+ new Date().valueOf() +'@yopmail.com',
                    gender: 'MALE'
                };
                let result = await User.create( newUser );
                // console.log('defineDeleteOldUsers result', result);
            } catch(ex) {
                // job.fail({
                //     msg: ex.toString(),
                //     data: ex
                // });

                job.attrs.failedAt = new Date();
                job.attrs.failReason = {
                    msg: ex.toString(),
                    data: ex
                }
                job.fail(new Error(ex.toString()));
                await job.save();

                let inData = {
                    agendaId: job.attrs._id,
                    reff: job.attrs,
                    payload: newUser,
                    failReason: job.attrs.failReason,
                    failedAt: new Date()
                };
                console.log('job.attrs', job.attrs);
                console.log('inData', inData);
                await FailedJobs.create(inData);
            }
        });

        // let result = await $this.agendaObj.define("add users");
        // console.log('result', result)
    }

    async callDeleteOldUsers( req, res, next ) {
                
        try {

            let start = await $this.agendaObj.start();
            let every = await $this.agendaObj.every("1 seconds", "add users");
            res.send({
                start,
                every
            });
            
        } catch (ex) {
            res.send({
                ex: ex.toString()
            });
        }
    }
}