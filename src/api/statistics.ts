import { useRequest } from 'cosey';

const Api = {
  StatisticsResource: '/statistics',
};

export const useStatisticsApi = () =>
  useRequest().map({
    getStatOverview: (http) => (params?: any) => {
      return http.get(`${Api.StatisticsResource}/overview`, {
        params,
      });
    },

    getStatTrend: (http) => (params?: any) => {
      return http.get(`${Api.StatisticsResource}/trend`, {
        params,
      });
    },

    getStatEducation: (http) => (params?: any) => {
      return http.get(`${Api.StatisticsResource}/education`, {
        params,
      });
    },

    getStatStature: (http) => (params?: any) => {
      return http.get(`${Api.StatisticsResource}/stature`, {
        params,
      });
    },

    getStatHobby: (http) => (params?: any) => {
      return http.get(`${Api.StatisticsResource}/hobby`, {
        params,
      });
    },

    getStatConstellation: (http) => (params?: any) => {
      return http.get(`${Api.StatisticsResource}/constellation`, {
        params,
      });
    },
  });
