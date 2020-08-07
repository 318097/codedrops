const config = {
  SERVER_URL:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_SERVER_URL
      : "http://localhost:7000/api",
  COLLECTION_ID: "omway2fLvhXGnKhwtABwP4",
};

export default config;
