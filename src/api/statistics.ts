import { http } from 'cosey';

const Api = {
  StatisticsResource: '/statistics',
};

export default {
  getStatOverview: (params?: any) => {
    return http.get(`${Api.StatisticsResource}/overview`, {
      params,
    });
  },

  getStatTrend: (params?: any) => {
    return http.get(`${Api.StatisticsResource}/trend`, {
      params,
    });
  },

  getStatEducation: (params?: any) => {
    return http.get(`${Api.StatisticsResource}/education`, {
      params,
    });
  },

  getStatStature: (params?: any) => {
    return http.get(`${Api.StatisticsResource}/stature`, {
      params,
    });
  },

  getStatHobby: (params?: any) => {
    return http.get(`${Api.StatisticsResource}/hobby`, {
      params,
    });
  },

  getStatConstellation: (params?: any) => {
    return http.get(`${Api.StatisticsResource}/constellation`, {
      params,
    });
  },
};
