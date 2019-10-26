import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpRespondController {
  async index(req, res) {
    const helpOrders = await HelpOrder.findAll({
      where: { answer: null },
      order: ['created_at'],
      attributes: ['id', 'question'],
      include: [{
        model: Student,
        as: 'student',
        attributes: ['name', 'email']
      }]
    });

    return res.json(helpOrders)
  }
}

export default new HelpRespondController
