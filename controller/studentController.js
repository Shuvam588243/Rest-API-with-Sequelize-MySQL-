const db = require('../connection');

const GetAllStudents = async(req,res) =>
{
    const Data = await db.students.findAll({});

    res.json({ 
        data : Data
    })
}

const AddNewStudent = async(req,res) =>
{
      const {name,email,gender} = req.body;
      const Data = await db.students.create({
          name,
          email,
          gender
      });

      res.json({ msg : "Students Added Successfully"})
}

const UpdateStudentByID = async(req,res) =>
{
    const {id} = req.params
    const {name,email} = req.body
    const data = await db.students.update({
        name,email
    },{
        where : {
            id
        }
    })
    res.json({ page : `Student with id ${id} is updated`})
}

const DeleteAllStudents = (req,res) =>
{
    const data = db.students.destroy({
        truncate : true
    })
    res.json({ page : 'All Students Deleted'})
}

const DeleteAllStudentByID = (req,res) => {

    const {id} = req.params
    const data = db.students.destroy({
        where : {
            id 
        }
    })

    res.json({ msg : `Student with id ${id} deleted`})

}

const AddBulkStudents = (req,res) =>
{

    const {student} = req.body

    const BulkData = db.students.bulkCreate(student);

    res.json({ msg : 'Bulk Data Added'})
}

const GetStudentByID = async(req,res) =>
{
    const {id} = req.params
    const Student = await db.students.findOne({
        where : {
            id 
        }
    })

    res.json(
        {
            student : Student
        }
    )
}


const getAllStudentName = async(req,res) =>
{
    const Student = await db.students.findAll({
        attributes : [
            'id',
            ['name','Student Name']
        ],
        order : [
        ['name','DESC']
        ]
    })

    res.json({ 
        Student
    })
}

module.exports = { 
    AddBulkStudents, 
    DeleteAllStudents, 
    UpdateStudentByID,
    AddNewStudent, 
    GetAllStudents,
    DeleteAllStudentByID,
    GetStudentByID,
    getAllStudentName
}