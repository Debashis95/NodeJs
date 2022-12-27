const Student = require('../model/student.model')

class appController {
  constructor() {
    console.log("I'm from controller")
  }

  /**
   * @Methode:index
   * @Description:To show the index page
   */

  async index(req, res) {
    try {
      res.render('index', {
        page_title: 'index || page',
      })
    } catch (err) {
      throw err
    }
  }

  /**
   * @Method:insert
   * @Description:To insert user data
   */
  async insert(req, res) {
    try {
      // console.log(req.body)
      req.body.firstName = req.body.firstName.trim()
      req.body.lastName = req.body.lastName.trim()
      if (!req.body.firstName && !req.body.lastName) {
        console.log('Field Should not be empty ')
      } else {
        let isEmailExists = await Student.find({
          email: req.body.email,
          isDeleted: false,
        })
        console.log(isEmailExists)
        if (!isEmailExists.length) {
          //H.W checking duplicate contact
          let isContactExists = await Student.find({
            contactNumber: req.body.contactNumber,
            isDeleted: false,
          })
          if (!isContactExists.length) {
            req.body.fullName = `${req.body.firstName} ${req.body.lastName}`
            console.log(req.body)
            let saveStudent = await Student.create(req.body)
            console.log(saveStudent)
            if (saveStudent && saveStudent._id) {
              console.log('Data Added Successfully')
              res.redirect('/')
            } else {
              console.log('Data Not Added Successfully')
              res.redirect('/')
            }
          } else {
            console.log('Contact Number Already Exists')
            res.redirect('/')
          }
        } else {
          console.log('Email Already Exists')
          res.redirect('/')
        }
      }
    } catch (err) {
      throw err
    }
  }

  /**
   * @Method:studentView
   * @Description:To view Student Data
   */

  async studentView(req, res) {
    try {
      let studentData = await Student.find({ isDeleted: false })
      console.log(studentData)
      res.render('studentView', {
        page_title: 'Student || View',
        studentData,
      })
    } catch (err) {
      throw err
    }
  }

  /**
   * @Method:Hard delete,
   * @Description:To delete student data
   */

  /*   async delete(req, res) {
    try {
      let deleteData = await Student.findByIdAndRemove(req.params.id)
      if (deleteData) {
        console.log('Data Deleted Successfully')
        res.redirect('/student-view')
      } else {
        console.log('Something went wrong')
      }
    } catch (err) {
      throw err
    }
  } */

  /**
   * @Method:Soft delete,
   * @Description:To delete student data
   */

  async delete(req, res) {
    try {
      let dataUpdate = await Student.findByIdAndUpdate(req.params.id, {
        isDeleted: true,
      })
      if (dataUpdate && dataUpdate._id) {
        console.log('Data Deleted Successfully')
        res.redirect('/student-view')
      } else {
        console.log('Something went wrong')
      }
    } catch (err) {
      throw err
    }
  }

  /**
   * @Method:edit,
   * @Description:To edit student data
   */

  async edit(req, res) {
    try {
      let studentData = await Student.find({ _id: req.params.id })
      console.log(studentData)
      res.render('edit', {
        page_title: 'edit || page',
        response: studentData[0],
      })
    } catch (err) {
      throw err
    }
  }

  /**
   * @Method:update,
   * @Description:To Update Student Data
   */

  async update(req, res) {
    try {
      let isEmailExists = await Student.find({
        email: req.body.email,
        _id: { $ne: req.body.id },
      })
      // console.log(isEmailExists)
      if (!isEmailExists.length) {
        let isContactExists = await Student.find({
          contactNumber: req.body.contactNumber,
          _id: { $ne: req.body.id },
        })
        console.log(isContactExists)
        if (!isContactExists.length) {
          let studentUpdate = await Student.findByIdAndUpdate(
            req.body.id,
            req.body
          )
          console.log(studentUpdate)
          if (studentUpdate && studentUpdate._id) {
            console.log('Student Update')
            res.redirect('/student-view')
          } else {
            console.log('Something went wrong')
            res.redirect('/student-view')
          }
        } else {
          console.log('Contact Number Already Exists!')
          res.redirect('/student-view')
        }
      } else {
        console.log('Email Already exists')
        res.redirect('/student-view')
      }
    } catch (err) {
      throw err
    }
  }
}

module.exports = new appController()
