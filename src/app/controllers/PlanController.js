import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plan = await Plan.findAll({
      attributes: ['id', 'duration', 'price'],
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
    // const plan = await Plan.update({
    //   where: { id: req.params.id },

    // })
    return res.json();
  }

  async delete(req, res) {
    // const plan = await Plan.create(req.body);
    return res.json();
  }
}

export default new PlanController();
