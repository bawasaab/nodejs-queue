const Agenda = require("agenda");

let $this;

const defineJobs = (jobName) => {
    return new Promise( (resolve, reject) => {
        $this.agendaObj.define(jobName, async ( job) => {
            try {
                console.log('inside resolve job', job);
                resolve(job);
            } catch(ex) {
                console.log('inside reject job', job);
                reject(job);
            }
        }); 
    } );
}

module.exports = class AgendaWrapper {

    mongoConnectionString = '';
    mongoJobsCollection = '';
    processEvery = '';

    constructor( inData ) {
        $this = this;

        $this.mongoConnectionString = inData.mongoConnectionString;
        $this.mongoJobsCollection = inData.mongoJobsCollection;
        // $this.processEvery = inData.processEvery;

        $this.agendaObj = new Agenda();
        $this
        .agendaObj
        .database($this.mongoConnectionString, $this.mongoJobsCollection)
        // .processEvery(processEvery); // '1 seconds'
    }

    async start() {
        return await $this.agendaObj.start();
    }

    async every( interval, jobName ) {
        return await $this.agendaObj.every(interval, jobName);
    }

    async defineJob( jobName ) {
        return await defineJobs(jobName)
    }
}