const CardModel = require('../models/card');
const {
  ValidationError,
  ForbiddenError,
  NotFoundError,
} = require('../utils/errors');

const getCards = (req, res, next) => {
  CardModel.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  CardModel.create({ name, link, owner })
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Переданы некорректные данные'));
      }
      return next(err);
    });
};
const deleteCardById = (req, res, next) => {
  CardModel.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Пользователь не найден');
      } else if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Вы не можете удалить чужую карточку');
      }
      return CardModel.findByIdAndDelete(req.params.cardId).then((deletedCard) => {
        res.send(deletedCard);
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError('Переданы некорректные данные'));
      }
      return next(err);
    });
};
const addCardLike = (req, res, next) => {
  CardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.send(card);
    })
    .catch(next);
};

const deleteCardLike = (req, res, next) => {
  CardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.send(card);
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  addCardLike,
  deleteCardLike,
};
