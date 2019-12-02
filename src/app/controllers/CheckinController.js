import { subDays } from 'date-fns';
import Checkin from '../Schemas/Checkin';
import Student from '../models/Student';

class CheckinController {
  async show(req, res) {
    const { studentId } = req.params;

    const student = await Student.findOne({
      where: { id: studentId },
    });

    if (!student) {
      return res.status(400).json({ error: 'This student is not exists' });
    }

    const checkins = await Checkin.find({
      student_id: studentId,
    });
    return res.json(checkins);
  }

  async store(req, res) {
    const { studentId } = req.params;

    const student = await Student.findOne({
      where: { id: studentId },
    });

    if (!student) {
      return res.status(400).json({ error: 'This student is not exists' });
    }

    const checkins = await Checkin.find({
      student_id: studentId,
      createdAt: { $gte: [subDays(new Date(), 7)], $lt: new Date() },
    });

    if (checkins.length >= 5) {
      return res.status(401).json({ error: 'Check-ins number exceeded' });
    }

    const checkin = await Checkin.create({ student_id: studentId });

    return res.json(checkin);
  }
}

export default new CheckinController();
