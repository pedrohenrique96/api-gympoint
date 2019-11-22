import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plan = await Plan.findAll({
      attributes: ['id', 'title', 'duration', 'price'],
    });
    return res.json(plan);
  }

  async show(req, res) {
    const { planId } = req.params;

    const plan = await Plan.findOne({
      where: { id: planId },
      attributes: ['id', 'title', 'duration', 'price'],
    });

    return res.json(plan);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const plan = await Plan.create(req.body);
    return res.json(plan);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number().positive(),
      price: Yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { planId } = req.params;

    const plan = await Plan.findByPk(planId);

    if (!plan) {
      return res.status(404).json({ error: 'This plan does not exists' });
    }

    await plan.update(req.body);

    return res.json(plan);
  }

  async delete(req, res) {
    const { planId } = req.params;

    const plan = await Plan.findByPk(planId);

    if (!plan) {
      return res.status(404).json({ error: 'This plan does not exists' });
    }

    await plan.destroy();
    return res.json({ message: 'Plan delected success.' });
  }
}

export default new PlanController();
