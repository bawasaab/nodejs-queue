const Agenda = require("agenda");
const mongoConnectionString = "mongodb://127.0.0.1/agenda";
const mongoJobsCollection = "agendaJobs";

let $this;

module.exports = class agenda {

    constructor() {

        $this = this;
        
        $this.agendaObj = new Agenda();
        $this.agendaObj
        .database(mongoConnectionString, mongoJobsCollection)
        .processEvery('3 minutes');

        console.log('$this.agendaObj', $this.agendaObj);

        $this.defineDeleteOldUsers();
    }

    defineDeleteOldUsers() {
        console.log('inside defineDeleteOldUsers');
        $this.agendaObj.define("delete old users", async (job) => {
            console.log('job', job);
            await User.remove({ lastLogIn: { $lt: twoDaysAgo } });
        });
    }

    async callDeleteOldUsers( req, res, next ) {

        
        try {

            let start = await $this.agendaObj.start();
            let every = await $this.agendaObj.every("3 minutes", "delete old users");  
            res.send({
                start,
                every
            });
            // res.send({
            //     msg: 'HI'
            // });  
        } catch (ex) {
            res.send({
                ex: ex.toString()
            });
        }
    }

}