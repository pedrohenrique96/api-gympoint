import Student from '../models/Student';

class SessionStudentController {
  async store(req, res) {
    const { id } = req.body;

    const studentId = await Student.findOne({ where: id });

    if (!studentId) {
      return res.status(400).json({ error: 'Student not found.' });
    }

    return res.json(studentId);
  }
}

export default new SessionStudentController();
