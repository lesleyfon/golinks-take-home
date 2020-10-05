// Do not change variable name in this file
const { config } = require("dotenv");
config();

export const REPO_URL_STORAGE_KEY = "repo_url";
export const ORGANIZATION_NAME_STORAGE_KEY = "org_name";
export const REACT_APP_AUTH_TOKEN = process.env.REACT_APP_AUTH_TOKEN;
