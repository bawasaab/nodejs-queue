const agendaWrapper = require("./agendaWrapper")
const inData = {
    mongoConnectionString: "mongodb://127.0.0.1/agenda",
    mongoJobsCollection: "agendaJobs",
}
const agendaWrapperObj = new agendaWrapper(inData)

const defineAddUsersJob = async () => {
    console.log('inside defineAddUsersJob');
    let job = await agendaWrapperObj.defineJob('add users')
    console.log('job', job);
    try {
        let newUser = {
            email: 'abc_'+ new Date().valueOf() +'@yopmail.com',
            gender: 'MALE'
        };
        let result = await User.create( newUser );
        await job.save();
        return 'Job defined successfully';
    } catch(ex) {
        job.fail({
            msg: ex.toString(),
            data: ex
        });
        throw ex;
    }
}

const startAddUsersJob = async (req, res, next) => {
console.log('inside startAddUsersJob');
    try {

        let data = await defineAddUsersJob();
        console.log('defineAddUsersJob data', data);
        let start = await agendaWrapperObj.agendaObj.start();
        let every = await agendaWrapperObj.agendaObj.every("1 seconds", "add users");
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

module.exports = {
    startAddUsersJob   
}