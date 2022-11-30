const dotenv = require('dotenv')

class EnvironmentShared {
    constructor() {
        if(!EnvironmentShared._instance) EnvironmentShared._instance = this;

        this.setEnvs()
    }

    getInstance() {
        return EnvironmentShared._instance;
    }

    setEnvs(){
    if (!this.getInstance().envs) {
      const { parsed } = dotenv.config({
        path: `env-files/.config.${process.env.NODE_ENV || "dev"}.env`,
      });

      this.getInstance().envs = { ...(parsed || {}), ...process.env };
    }
    }

    getEnv(envName) {
        if(!this.getInstance().envs[envName])
            throw new Error(`'${envName}' not found`);
        return this.getInstance().envs[envName];
    }
}

module.exports = { EnvironmentShared }