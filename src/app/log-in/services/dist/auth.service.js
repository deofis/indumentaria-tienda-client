"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var config_1 = require("src/app/config/config");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var AuthService = /** @class */ (function () {
    function AuthService(http) {
        this.http = http;
        /**
         * Estos event emmiters nos serviran para notificar a todos los subscriptores que se realizaron cambios
         * cada vez que alguien se loguee, o desloguee.
         */
        this.loggedIn = new core_1.EventEmitter();
        this.useremail = new core_1.EventEmitter();
        this.urlEndpoint = config_1.API_BASE_URL + "/api/auth";
    }
    /**
     * Este servicio nos provee la petición a la API para registrar un nuevo usuario.
     * @param signupRequest SignupRequest con los datos para el registro de usuario: email y password.
     */
    AuthService.prototype.signup = function (signupRequest) {
        return this.http.post(this.urlEndpoint + "/signup", signupRequest);
    };
    /**
     * Servicio que se encarga de iniciar sesión en la App, y guardar los datos de autenticacion
     * que recibe del backend de sesión en local storage.
     * @param usuario IniciarSesionRequest con los datos credenciales del usuario para iniciar sesión.
     */
    AuthService.prototype.login = function (usuario) {
        var _this = this;
        return this.http.post(this.urlEndpoint + "/login", usuario).pipe(operators_1.map(function (response) {
            localStorage.setItem('authToken', response.authToken);
            localStorage.setItem('userEmail', response.userEmail);
            localStorage.setItem("refreshToken", response.refreshToken);
            localStorage.setItem("rol", response.rol);
            localStorage.setItem("expiraEn", response.expiraEn);
            _this.loggedIn.emit(true);
            _this.useremail.emit(response.userEmail);
            return response;
        }));
    };
    /**
     * Servicio que cierra sesión. Elimina los datos del local storage del navegador, y llama a la API que completa el
     * cierre de sesión (elimina el refresh token).
     */
    AuthService.prototype.logout = function () {
        var _this = this;
        var refreshTokenPayload = {
            refreshToken: this.getRefreshToken(),
            userEmail: this.getEmailUser()
        };
        return this.http.post(this.urlEndpoint + "/logout", refreshTokenPayload, { responseType: 'text' }).pipe(operators_1.tap(function (response) {
            _this.loggedIn.emit(false);
            _this.useremail.emit('');
            localStorage.clear();
            return response;
        }));
    };
    /**
     * Servicio que, en caso de que la sesión de un usuario haya expirado y realice otra
     * petición al servidor, genere un nuevo JWT para continuar y extender su sesión.
     * @return Observable<AuthResponse> retorna un flujo de datos con el nuevo objeto Auth Response,
     * con los datos: nuevo JWT, nuevo tiempo de expiración.
     * NOTA: Al refrescar el token, el resto de datos cargados en local storage (rol, userEmail...)
     * quedan exactamente igual, por ende, no es necesario actualizar estos datos.
     */
    AuthService.prototype.refreshToken = function () {
        var refreshTokenPayload = {
            refreshToken: this.getRefreshToken(),
            userEmail: this.getEmailUser()
        };
        return this.http.post(this.urlEndpoint + "/refresh/token", refreshTokenPayload).pipe(operators_1.tap(function (response) {
            localStorage.setItem('authToken', response.authToken);
            localStorage.setItem('expiraEn', response.expiraEn);
        }));
    };
    /**
     * Servicio que se encarga de hacer una petición al servidor para recuperar la contraseña en caso
     * de haberla olvidado.
     * <br>
     * Inicia el flujo de recuperación de contraseña, para el email requerido.
     * @param email string email requerido a recuperar contraseña.
     */
    AuthService.prototype.recuperarContraseña = function (email) {
        var params = new http_1.HttpParams();
        params = params.append("email", email);
        return this.http.get(this.urlEndpoint + "/recuperar-password", { params: params, responseType: 'text' });
    };
    /**
     * Servicio que se encarga de enviar petición al servidor con la nueva contraseña del usuario, y el token
     * para validar que es el mismo usuario quien hace la petición (token generado y enviado al mail).
     * <br>
     * Completa el flujo de recuperación de contraseña.
     * @param password string nueva contraseña.
     * @param token string token de validación.
     */
    AuthService.prototype.cambiarContraseña = function (password, token) {
        var cambiarPassRequest = {
            password: password
        };
        return this.http.post(this.urlEndpoint + "/cambiar-password/" + token, cambiarPassRequest, { responseType: 'text' });
    };
    /**
     * Devuelve el JsonWebToken guardado en local storage. Si no existe, devuelve null.
     * @return string con el JWT.
     */
    AuthService.prototype.getJwt = function () {
        return localStorage.getItem('authToken');
    };
    /**
     * Devuelve el refresh token en local storage que sirve para extender la sesión del usuario actual.
     * @return string con refresh token.
     */
    AuthService.prototype.getRefreshToken = function () {
        return localStorage.getItem('refreshToken');
    };
    /**
     * Devuelve el email del usuario actual guardado en local storage.
     * @return string user email.
     */
    AuthService.prototype.getEmailUser = function () {
        return localStorage.getItem('userEmail');
    };
    /**
     * Verifica que exista un JWT guardado, y por ende, que exista una sesión actual.
     * @return boolean true --> logueado, false --> no logueado.
     */
    AuthService.prototype.isLoggedIn = function () {
        return this.getJwt() != null;
    };
    /**
     * Valida que el rol pasado por parámetro sea el mismo que posee el usuario con
     * sesión actual.
     * @param role string con el rol a verificar.
     * @return boolean true --> el rol es el mismo, false --> no es el mismo.
     */
    AuthService.prototype.hasRole = function (role) {
        return localStorage.getItem('rol') == role;
    };
    __decorate([
        core_1.Output()
    ], AuthService.prototype, "loggedIn");
    __decorate([
        core_1.Output()
    ], AuthService.prototype, "useremail");
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
