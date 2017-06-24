const mongoCollections = require("../config/mongoCollections");
const depts = mongoCollections.departments;


let exportedMethods = {
    getAllDepartments(){
        return depts.then((deptCollection)=>{
            return deptCollection.find({}).toArray();
        });
    }
}