const mongoCollections = require("../config/mongoCollections");
const courses = mongoCollections.courses;


let exportedMethods = {
    getAllCourses(){
        return courses().then((courseCollection)=>{
            return courseCollection.find({}).toArray();
        });
    },

    getCourseById(id){

    },

    getCourseByDeptId(deptId){
        
    },

    addCourse(course){

    },

    deleteCourseById(id){

    }
}