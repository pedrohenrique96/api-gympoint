import Student from '../models/Student';

class SessionStudentController {
  async store(req, res) {
    const { studentId } = req.params;

    const student_id = await Student.findOne({ where: { id: studentId } });

    if (!student_id) {
      return res.status(400).json({ error: 'Student not found.' });
    }

    return res.json(student_id);
  }
}

export default new SessionStudentController();
