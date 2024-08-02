const testUserController = (req,res)=>{
    try {
        res.status(200).send("<h1>test user dta</h1>");
    } catch (error) {
        console.log('error in tst api',error)
    }
};

module.exports = {testUserController}