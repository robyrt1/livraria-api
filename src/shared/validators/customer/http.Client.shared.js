const { INTERNAL_SERVER_ERROR } = require("../../constants/http.codes");
const { HttMethod } = require("../../constants/http.method");
const { EnvironmentShared } = require("../../environment.shared");
const request = require("async-request");

const environmentShared = new EnvironmentShared();

const options = {
  method: HttMethod.GET,
  url: environmentShared.getEnv("URL_REQUEST_CEP"),
  headers: {},
};

class HttpClientShared {
  async request(cepBody) {
    try {
      const response = await request(
        options.url.replace("cepRequest", cepBody)
      );
      return JSON.parse(response.body);
    } catch (err) {
      throw { statusCode: INTERNAL_SERVER_ERROR, error: err };
    }
  }
}

module.exports = { HttpClientShared };


