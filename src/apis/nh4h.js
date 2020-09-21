import axios from 'axios';

export default axios.create({
    baseURL: 'https://nursehackapi20200906232054.azurewebsites.net/api',
    headers: {
      common:{
        'content-type':'application/json',
      },
      'ClientTeamEmbed':'caWU JvVGqXaH n9m7by',
    }
  });
