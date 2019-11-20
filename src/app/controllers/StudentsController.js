import * as Yup from 'yup';
import Student from '../models/Student';

class StudentsController {
  async index(req, res) {
    const { q, page = 1 } = req.query;

    if (q) {
      const student = await Student.findAll({
        where: { name: q },
      });

      return res.json(student);
    }

    const students = await Student.findAll();

    return res.json(students);
  }

  async show(req, res) {
    const { studentId } = req.params;

    const students = await Student.findAll({
      where: { id: studentId }
    });

    return res.json(students);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const students = await Student.create(req.body);

    return res.json(students);
  }
}

export default new StudentsController();
