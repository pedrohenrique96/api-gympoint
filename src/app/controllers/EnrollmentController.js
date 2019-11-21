import * as Yup from 'yup';
import { parseISO, isBefore, addMonths } from 'date-fns';

import Enrollment from '../models/Enrollment';
import Plan from '../models/Plan';
import Student from '../models/Student';

import Queue from '../../lib/Queue';
import Welcome from '../jobs/WelcomeMail';

class EnrollmentController {
  async index(req, res) {
    const enrollment = await Enrollment.findAll({
      attributes: ['start_date', 'end_date', 'price', 'active', 'id'],
      include: [
        {
          model: Student,
          as: 'student',
        },
        {
          model: Plan,
          as: 'plan',
        },
      ],
    });
    return res.json(enrollment);
  }

  async store(req, res) {
    const { start_date, student_id, plan_id } = req.body;

    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
      student_id: Yup.number()
        .positive()
        .required(),
      plan_id: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const parsedDate = parseISO(start_date);

    if (isBefore(parsedDate, new Date())) {
      return res.status(400).json({ error: 'You cannot enroll in past dates' });
    }

    const alreadyEnrollment = await Enrollment.findOne({
      where: {
        student_id,
      },
    });

    if (alreadyEnrollment) {
      return res
        .status(400)
        .json({ error: 'This student is already enrollment' });
    }

    const plan = await Plan.findByPk(plan_id);
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    const { price: monthPrice, duration } = plan;
    const price = monthPrice * duration;
    const end_date = addMonths(parsedDate, duration);

    const enrollment = await Enrollment.create({
      start_date,
      student_id,
      plan_id,
      price,
      end_date,
    });

    const { name, email } = await Student.findByPk(student_id);

    await Queue.add(Welcome.key, {
      name,
      email,
      start_date,
      end_date,
      planTitle: plan.title,
      price,
    });

    return res.json(enrollment);
  }

  async update(req, res) {
    const { start_date, plan_id } = req.body;
    const { enrollmentId } = req.params;

    const schema = Yup.object().shape({
      start_date: Yup.date(),
      student_id: Yup.number().positive(),
      plan_id: Yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const enrollment = await Enrollment.findByPk(enrollmentId);

    if (!enrollment) {
      return res.status(404).json({ error: 'This enrollment does not exists' });
    }

    const parsedDate = parseISO(start_date);

    if (isBefore(parsedDate, new Date())) {
      return res.status(400).json({ error: 'You cannot enroll in past dates' });
    }

    const { student_id } = enrollment;

    if (req.body.student_id !== student_id) {
      return res.status(401).json({ error: 'Student cannot be exchanged' });
    }

    const plan = await Plan.findByPk(plan_id);
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    const { price: monthPrice, duration } = plan;
    const price = monthPrice * duration;
    const end_date = addMonths(parsedDate, duration);

    await enrollment.update({
      ...req.body,
      price,
      end_date,
    });

    return res.json({
      ...req.body,
      price,
      end_date,
    });
  }

  async delete(req, res) {
    const { enrollmentId } = req.params;

    const enrollment = await Enrollment.findByPk(enrollmentId);

    if (!enrollment) {
      return res.status(400).json({ error: 'This enrollment does not exists' });
    }
    await enrollment.destroy();

    return res.json({ message: 'Enrollment delected success.' });
  }
}

export default new EnrollmentController();
