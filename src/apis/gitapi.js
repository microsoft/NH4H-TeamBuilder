import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.github.com/users',
    headers: {
      common:{
        'content-type':'application/vnd.github.v3+json',
      }
    }
  });
