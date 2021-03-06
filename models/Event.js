const db = require('../db')

class Event {
  static getAllByCategory(categoryId, userId) {
    const queryText =
      'SELECT events.*, categories.name FROM events JOIN categories ON events.category_id = categories.id WHERE category_id=$1 AND user_id!=$2;'
    return db
      .query(queryText, [categoryId, userId])
      .then((response) => response.rows)
  }

  static getAllByUser(userId) {
    const queryText =
      'SELECT events.*, users.username FROM events JOIN users ON events.user_id = users.id WHERE user_id=$1;'
    return db.query(queryText, [userId]).then((response) => response.rows)
  }

  static getById(eventId) {
    const queryText = 'SELECT * FROM events WHERE id=$1;'
    return db.query(queryText, [eventId]).then((response) => response.rows[0])
  }

  static add(userId, categoryId, title, description, date) {
    const queryText =
      'INSERT INTO events (user_id, category_id, title, description, date) VALUES ($1, $2, $3, $4, $5);'
    return db.query(queryText, [userId, categoryId, title, description, date])
  }

  static update(eventId, userId, categoryId, title, description, date) {
    const queryText =
      'UPDATE events SET title=$3, description=$4, category_id=$5, date=$6 WHERE id=$1 AND user_id=$2;'
    return db.query(queryText, [
      eventId,
      userId,
      title,
      description,
      categoryId,
      date,
    ])
  }

  static show(eventId) {
    const queryText = 'SELECT * FROM events WHERE id=$1;'
    return db.query(queryText, [eventId]).then((response) => response.rows[0])
  }

  static remove(eventId, userId) {
    const queryText = 'DELETE FROM events WHERE id=$1 AND user_id=$2;'
    return db.query(queryText, [eventId, userId])
  }
}

module.exports = Event
