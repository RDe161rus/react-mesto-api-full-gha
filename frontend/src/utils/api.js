class Api {
  constructor(config) {
    this._url = config.url;
  }

  _handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(this._handleResponse);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(this._handleResponse);
  }

  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then(this._handleResponse);
  }

  addCards(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(this._handleResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(this._handleResponse);
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(this._handleResponse);
  }

  editAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then(this._handleResponse);
  }
}
export const api = new Api({url: 'https://api.mestofront.nomoredomainsmonster.ru'});
