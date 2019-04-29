import superAgent from 'superagent';
import {URLS} from '../constants/config';

class Service {
  /**
   * Running request
   *
   * @param method {String} - post, get, put, etc
   * @param urlName {String} - url name from 'config.src'
   * @param urlParams {Object} - map of params that will be used to build url (path params)
   * @param requestData {Object} - query (get) or body (post) request params
   * @param headers {Object} - Object of header name/value pairs to send with request
   * @param type {String} - request data type (json, form). Optional, form by default
   * @returns {*}
   */
  request(
    method,
    urlName,
    urlParams,
    requestData,
    headers = {},
    type = 'form'
  ) {
    const fullUrl = _makeUrl(urlName, urlParams);

    const request = superAgent[method](fullUrl)
      .type(type)
      .set('Accept', 'application/json');

    if (Object.keys(headers).length) {
      request.set(headers);
    }
    request.send(requestData);

    return request.then(
      response => response.body,
      error => {
        if (!error.status) {
          // this is likely network error, but still need to check this
          // eslint-disable-next-line
          throw {
            message: 'Network error. Make sure your device is connected to the internet.'
          };
        } else if (error.response) {
          throw error.response.body;
        } else {
          // make sure we throw passed json error object and fallback to default message
          // eslint-disable-next-line
          throw { message: error.toString() };
        }
      }
    );
  }

  get(url, queryParams, getData, headers, type) {
    return this.request('get', ...arguments);
  }

  post(url, queryParams, postData, headers, type) {
    return this.request('post', ...arguments);
  }

  put(url, queryParams, putData, headers, type) {
    return this.request('put', ...arguments);
  }

  delete(url, queryParams, deleteData, headers, type) {
    return this.request('delete', ...arguments);
  }

  upload(urlName, urlParams, data, headers, type) {
    const formData = new FormData();
    for (const name in data) {
      if (data.hasOwnProperty(name)) {
        formData.append(name, data[name]);
      }
    }

    return this.request('post', urlName, urlParams, formData, type);
  }
}

function _makeUrl(urlName, urlTokens) {
  // All unused tokens are added as query string
  const tokens = {...urlTokens};

  let url = URLS[urlName].replace(/\{\{([^{}]+)\}\}/g, (match, name) => {
    const token = tokens[name];
    delete tokens[name];
    if (token === undefined) {
      throw new Error(`URL Builder can't find value for ${name} token`);
    }
    return token;
  });

  if (Object.keys(tokens).length) {
    let queryString = Object.keys(tokens).map(key => key + '=' + tokens[key]).join('&');
    url += (url.indexOf('?') > -1 ? '&' : '?') + queryString;
  }

  return url;
}

export default Service;
