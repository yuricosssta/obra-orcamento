import 'dotenv/config';

export default {
  expo: {
    name: "Orçamento de Obras - SINAPI",
    slug: "Orçamento de Obras - SINAPI",
    version: "1.0.0",
    extra: {
      API_BASE_URL: process.env.API_BASE_URL,
    },
  },
};
