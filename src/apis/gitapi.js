import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.github.com',
    headers: {
      common:{
        'content-type':'application/vnd.github.v3+json',
        'Authorization': "token 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"
      }
    }
  });
