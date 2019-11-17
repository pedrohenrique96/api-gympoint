import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import Queue from '../../lib/Queue';
import QuestionAnsweredMail from '../jobs/QuestionAnsweredMail';

class HelpRespondController {
  async index(req, res) {
    const helpOrders = await HelpOrder.findAll({
      where: { answer: null },
      order: ['created_at'],
      attributes: ['id', 'question'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const { helpId } = req.params;
    const { answer } = req.body;

    const schema = Yup.object().shape({
      answer: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const helpOrder = await HelpOrder.findByPk(helpId, {
      attributes: ['id', 'question', 'answer'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    await helpOrder.update({
      answer,
      answer_at: new Date(),
    });

    await Queue.add(QuestionAnsweredMail.key, { helpOrder });

    return res.json(helpOrder);
  }
}
export default new HelpRespondController();
