import axios from 'axios';

export default class Api {
  constructor() {
    axios.defaults.params = {};
    axios.interceptors.request.use(
      function (config) {

        config.params['developer'] = 'dima-stakhov';

        if (config.method === 'post') {
          config.headers = {
            'content-type': 'multipart/form-data',
          };
        }

        return config;
      },
      error => Promise.reject(error),
    );
  }

  async getTasks(data) {
    return await axios
      .get('/api/', {
        params: {
          sort_field: 'id',
          sort_direction: 'asc',
          page: 1,
          ...data,
        },
      })
      .then(data => data.data.message);
  }

  async createTask(data) {
    const form = new FormData();
    form.append('username', data.username);
    form.append('email', data.email);
    form.append('text', data.text);

    return await axios
      .post('api/create', form)
      .then(({ data }) => {
        if (data.status === 'error') {
          return Promise.reject(this._toPlainText(data.message));
        }

        return data.message;
      })
      .catch(data => Promise.reject(data));
  }

  async editTask(task) {
    const form = new FormData();
    form.append('text', task.text);
    form.append('status', task.status);
    form.append('token', task.token);

    return await axios
      .post(`api/edit/${task.id}`, form)
      .then(({ data }) => {
        if (data.status === 'error') {
          return Promise.reject(this._toPlainText(data.message));
        }

        return task;
      })
      .catch(data => Promise.reject(data));
  }

  async login(data) {
    const form = new FormData();
    form.append('username', data.username);
    form.append('password', data.password);

    return await axios
      .post('api/login', form)
      .then(({ data }) => {
        if (data.status === 'error') {
          return Promise.reject(this._toPlainText(data.message));
        }

        return data.message;
      })
      .catch(data => Promise.reject(data));
  }

  _toPlainText(arg) {
    if (arg && typeof arg === 'object') {
      return Object.keys(arg)
        .map(k => `${k}: ${arg[k]}`)
        .join(', ');
    }

    return arg;
  }
}
