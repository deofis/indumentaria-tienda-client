"use strict";
exports.__esModule = true;
exports.FACEBOOK_AUTH_URL = exports.GOOGLE_AUTH_URL = exports.OAUTH2_REDIRECT_URI = exports.API_BASE_URL = void 0;
//export const API_BASE_URL        = 'http://localhost:8080';
exports.API_BASE_URL = 'https://deofis-tienda-apirest.herokuapp.com';
exports.OAUTH2_REDIRECT_URI = 'http://localhost:4200/oauth2/redirect';
exports.GOOGLE_AUTH_URL = exports.API_BASE_URL + "/oauth2/authorize/google?redirect_uri=" + exports.OAUTH2_REDIRECT_URI;
exports.FACEBOOK_AUTH_URL = exports.API_BASE_URL + "/oauth2/authorize/facebook?redirect_uri=" + exports.OAUTH2_REDIRECT_URI;
