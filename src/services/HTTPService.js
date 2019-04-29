import Service from './service';

// @todo: merge Service with HTTPService - no sense to keep separate classes
class HTTPService extends Service {
  authHeader = null;

  get() {
    return this._request('get', arguments);
  }

  post() {
    return this._request('post', arguments);
  }

  put() {
    return this._request('put', arguments);
  }

  upload() {
    return this._request('upload', arguments);
  }

  getJson() {
    return this._request('get', arguments, 'json');
  }

  postJson() {
    return this._request('post', arguments, 'json');
  }

  putJson() {
    return this._request('put', arguments, 'json');
  }

  deleteJson() {
    return this._request('delete', arguments, 'json');
  }

  _request(method, args, type) {
    const params = [...args];

    if (this.authHeader) {
      const headers = params[3] || {};
      params[3] = { ...headers, Authorization: this.authHeader };
    }

    if (type) {
      params[4] = type;
    }

    return this._handleResponse(super[method](...params));
  }

  _handleResponse(request) {
    return new Promise((resolve, reject) => {
      request.then(json => {
        if (json && json.failed) {
          reject(json);
        } else {
          resolve(json);
        }
      }, reject);
    });
  }

  setAuthHeader(value) {
    this.authHeader = value;
  }
}

export default new HTTPService();
