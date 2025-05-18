import {
  authState,
  idToken,
  user
} from "./chunk-LXYQPQZ7.js";
import {
  AppCheckInstances
} from "./chunk-7XWQ4TXU.js";
import {
  applyActionCode,
  beforeAuthStateChanged,
  checkActionCode,
  confirmPasswordReset,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  deleteUser,
  fetchSignInMethodsForEmail,
  getAdditionalUserInfo,
  getAuth,
  getIdToken,
  getIdTokenResult,
  getMultiFactorResolver,
  getRedirectResult,
  initializeAuth,
  initializeRecaptchaConfig,
  isSignInWithEmailLink,
  linkWithCredential,
  linkWithPhoneNumber,
  linkWithPopup,
  linkWithRedirect,
  onAuthStateChanged,
  onIdTokenChanged,
  parseActionCodeURL,
  reauthenticateWithCredential,
  reauthenticateWithPhoneNumber,
  reauthenticateWithPopup,
  reauthenticateWithRedirect,
  reload,
  revokeAccessToken,
  sendEmailVerification,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
  setPersistence,
  signInAnonymously,
  signInWithCredential,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signInWithEmailLink,
  signInWithPhoneNumber,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  unlink,
  updateCurrentUser,
  updateEmail,
  updatePassword,
  updatePhoneNumber,
  updateProfile,
  useDeviceLanguage,
  validatePassword,
  verifyBeforeUpdateEmail,
  verifyPasswordResetCode
} from "./chunk-5D7M7OFP.js";
import {
  FirebaseApp,
  FirebaseApps,
  VERSION,
  ɵAngularFireSchedulers,
  ɵgetAllInstancesOf,
  ɵgetDefaultInstanceOf,
  ɵzoneWrap
} from "./chunk-M7STAZRM.js";
import {
  registerVersion
} from "./chunk-DA4C6Y77.js";
import {
  InjectionToken,
  Injector,
  NgModule,
  NgZone,
  Optional,
  makeEnvironmentProviders,
  setClassMetadata,
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-S3HSHQ7F.js";
import {
  concatMap,
  distinct,
  from,
  timer
} from "./chunk-BJIUIRBV.js";

// node_modules/@angular/fire/fesm2022/angular-fire-auth.mjs
var AUTH_PROVIDER_NAME = "auth";
var Auth = class {
  constructor(auth) {
    return auth;
  }
};
var AuthInstances = class {
  constructor() {
    return ɵgetAllInstancesOf(AUTH_PROVIDER_NAME);
  }
};
var authInstance$ = timer(0, 300).pipe(concatMap(() => from(ɵgetAllInstancesOf(AUTH_PROVIDER_NAME))), distinct());
var PROVIDED_AUTH_INSTANCES = new InjectionToken("angularfire2.auth-instances");
function defaultAuthInstanceFactory(provided, defaultApp) {
  const defaultAuth = ɵgetDefaultInstanceOf(AUTH_PROVIDER_NAME, provided, defaultApp);
  return defaultAuth && new Auth(defaultAuth);
}
function authInstanceFactory(fn) {
  return (zone, injector) => {
    const auth = zone.runOutsideAngular(() => fn(injector));
    return new Auth(auth);
  };
}
var AUTH_INSTANCES_PROVIDER = {
  provide: AuthInstances,
  deps: [[new Optional(), PROVIDED_AUTH_INSTANCES]]
};
var DEFAULT_AUTH_INSTANCE_PROVIDER = {
  provide: Auth,
  useFactory: defaultAuthInstanceFactory,
  deps: [[new Optional(), PROVIDED_AUTH_INSTANCES], FirebaseApp]
};
var AuthModule = class _AuthModule {
  constructor() {
    registerVersion("angularfire", VERSION.full, "auth");
  }
  static ɵfac = function AuthModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _AuthModule
  });
  static ɵinj = ɵɵdefineInjector({
    providers: [DEFAULT_AUTH_INSTANCE_PROVIDER, AUTH_INSTANCES_PROVIDER]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthModule, [{
    type: NgModule,
    args: [{
      providers: [DEFAULT_AUTH_INSTANCE_PROVIDER, AUTH_INSTANCES_PROVIDER]
    }]
  }], () => [], null);
})();
function provideAuth(fn, ...deps) {
  registerVersion("angularfire", VERSION.full, "auth");
  return makeEnvironmentProviders([DEFAULT_AUTH_INSTANCE_PROVIDER, AUTH_INSTANCES_PROVIDER, {
    provide: PROVIDED_AUTH_INSTANCES,
    useFactory: authInstanceFactory(fn),
    multi: true,
    deps: [NgZone, Injector, ɵAngularFireSchedulers, FirebaseApps, [new Optional(), AppCheckInstances], ...deps]
  }]);
}
var authState2 = ɵzoneWrap(authState, true);
var idToken2 = ɵzoneWrap(idToken, true);
var user2 = ɵzoneWrap(user, true);
var applyActionCode2 = ɵzoneWrap(applyActionCode, true);
var beforeAuthStateChanged2 = ɵzoneWrap(beforeAuthStateChanged, true);
var checkActionCode2 = ɵzoneWrap(checkActionCode, true);
var confirmPasswordReset2 = ɵzoneWrap(confirmPasswordReset, true, 2);
var connectAuthEmulator2 = ɵzoneWrap(connectAuthEmulator, true);
var createUserWithEmailAndPassword2 = ɵzoneWrap(createUserWithEmailAndPassword, true, 2);
var deleteUser2 = ɵzoneWrap(deleteUser, true, 2);
var fetchSignInMethodsForEmail2 = ɵzoneWrap(fetchSignInMethodsForEmail, true, 2);
var getAdditionalUserInfo2 = ɵzoneWrap(getAdditionalUserInfo, true, 2);
var getAuth2 = ɵzoneWrap(getAuth, true);
var getIdToken2 = ɵzoneWrap(getIdToken, true);
var getIdTokenResult2 = ɵzoneWrap(getIdTokenResult, true);
var getMultiFactorResolver2 = ɵzoneWrap(getMultiFactorResolver, true);
var getRedirectResult2 = ɵzoneWrap(getRedirectResult, true);
var initializeAuth2 = ɵzoneWrap(initializeAuth, true);
var initializeRecaptchaConfig2 = ɵzoneWrap(initializeRecaptchaConfig, true);
var isSignInWithEmailLink2 = ɵzoneWrap(isSignInWithEmailLink, true);
var linkWithCredential2 = ɵzoneWrap(linkWithCredential, true, 2);
var linkWithPhoneNumber2 = ɵzoneWrap(linkWithPhoneNumber, true, 2);
var linkWithPopup2 = ɵzoneWrap(linkWithPopup, true, 2);
var linkWithRedirect2 = ɵzoneWrap(linkWithRedirect, true, 2);
var onAuthStateChanged2 = ɵzoneWrap(onAuthStateChanged, true);
var onIdTokenChanged2 = ɵzoneWrap(onIdTokenChanged, true);
var parseActionCodeURL2 = ɵzoneWrap(parseActionCodeURL, true);
var reauthenticateWithCredential2 = ɵzoneWrap(reauthenticateWithCredential, true, 2);
var reauthenticateWithPhoneNumber2 = ɵzoneWrap(reauthenticateWithPhoneNumber, true, 2);
var reauthenticateWithPopup2 = ɵzoneWrap(reauthenticateWithPopup, true, 2);
var reauthenticateWithRedirect2 = ɵzoneWrap(reauthenticateWithRedirect, true, 2);
var reload2 = ɵzoneWrap(reload, true, 2);
var revokeAccessToken2 = ɵzoneWrap(revokeAccessToken, true, 2);
var sendEmailVerification2 = ɵzoneWrap(sendEmailVerification, true, 2);
var sendPasswordResetEmail2 = ɵzoneWrap(sendPasswordResetEmail, true, 2);
var sendSignInLinkToEmail2 = ɵzoneWrap(sendSignInLinkToEmail, true, 2);
var setPersistence2 = ɵzoneWrap(setPersistence, true);
var signInAnonymously2 = ɵzoneWrap(signInAnonymously, true, 2);
var signInWithCredential2 = ɵzoneWrap(signInWithCredential, true, 2);
var signInWithCustomToken2 = ɵzoneWrap(signInWithCustomToken, true, 2);
var signInWithEmailAndPassword2 = ɵzoneWrap(signInWithEmailAndPassword, true, 2);
var signInWithEmailLink2 = ɵzoneWrap(signInWithEmailLink, true, 2);
var signInWithPhoneNumber2 = ɵzoneWrap(signInWithPhoneNumber, true, 2);
var signInWithPopup2 = ɵzoneWrap(signInWithPopup, true, 2);
var signInWithRedirect2 = ɵzoneWrap(signInWithRedirect, true, 2);
var signOut2 = ɵzoneWrap(signOut, true, 2);
var unlink2 = ɵzoneWrap(unlink, true, 2);
var updateCurrentUser2 = ɵzoneWrap(updateCurrentUser, true, 2);
var updateEmail2 = ɵzoneWrap(updateEmail, true, 2);
var updatePassword2 = ɵzoneWrap(updatePassword, true, 2);
var updatePhoneNumber2 = ɵzoneWrap(updatePhoneNumber, true, 2);
var updateProfile2 = ɵzoneWrap(updateProfile, true, 2);
var useDeviceLanguage2 = ɵzoneWrap(useDeviceLanguage, true, 2);
var validatePassword2 = ɵzoneWrap(validatePassword, true, 2);
var verifyBeforeUpdateEmail2 = ɵzoneWrap(verifyBeforeUpdateEmail, true, 2);
var verifyPasswordResetCode2 = ɵzoneWrap(verifyPasswordResetCode, true, 2);

export {
  Auth,
  AuthInstances,
  authInstance$,
  AuthModule,
  provideAuth,
  authState2 as authState,
  idToken2 as idToken,
  user2 as user,
  applyActionCode2 as applyActionCode,
  beforeAuthStateChanged2 as beforeAuthStateChanged,
  checkActionCode2 as checkActionCode,
  confirmPasswordReset2 as confirmPasswordReset,
  connectAuthEmulator2 as connectAuthEmulator,
  createUserWithEmailAndPassword2 as createUserWithEmailAndPassword,
  deleteUser2 as deleteUser,
  fetchSignInMethodsForEmail2 as fetchSignInMethodsForEmail,
  getAdditionalUserInfo2 as getAdditionalUserInfo,
  getAuth2 as getAuth,
  getIdToken2 as getIdToken,
  getIdTokenResult2 as getIdTokenResult,
  getMultiFactorResolver2 as getMultiFactorResolver,
  getRedirectResult2 as getRedirectResult,
  initializeAuth2 as initializeAuth,
  initializeRecaptchaConfig2 as initializeRecaptchaConfig,
  isSignInWithEmailLink2 as isSignInWithEmailLink,
  linkWithCredential2 as linkWithCredential,
  linkWithPhoneNumber2 as linkWithPhoneNumber,
  linkWithPopup2 as linkWithPopup,
  linkWithRedirect2 as linkWithRedirect,
  onAuthStateChanged2 as onAuthStateChanged,
  onIdTokenChanged2 as onIdTokenChanged,
  parseActionCodeURL2 as parseActionCodeURL,
  reauthenticateWithCredential2 as reauthenticateWithCredential,
  reauthenticateWithPhoneNumber2 as reauthenticateWithPhoneNumber,
  reauthenticateWithPopup2 as reauthenticateWithPopup,
  reauthenticateWithRedirect2 as reauthenticateWithRedirect,
  reload2 as reload,
  revokeAccessToken2 as revokeAccessToken,
  sendEmailVerification2 as sendEmailVerification,
  sendPasswordResetEmail2 as sendPasswordResetEmail,
  sendSignInLinkToEmail2 as sendSignInLinkToEmail,
  setPersistence2 as setPersistence,
  signInAnonymously2 as signInAnonymously,
  signInWithCredential2 as signInWithCredential,
  signInWithCustomToken2 as signInWithCustomToken,
  signInWithEmailAndPassword2 as signInWithEmailAndPassword,
  signInWithEmailLink2 as signInWithEmailLink,
  signInWithPhoneNumber2 as signInWithPhoneNumber,
  signInWithPopup2 as signInWithPopup,
  signInWithRedirect2 as signInWithRedirect,
  signOut2 as signOut,
  unlink2 as unlink,
  updateCurrentUser2 as updateCurrentUser,
  updateEmail2 as updateEmail,
  updatePassword2 as updatePassword,
  updatePhoneNumber2 as updatePhoneNumber,
  updateProfile2 as updateProfile,
  useDeviceLanguage2 as useDeviceLanguage,
  validatePassword2 as validatePassword,
  verifyBeforeUpdateEmail2 as verifyBeforeUpdateEmail,
  verifyPasswordResetCode2 as verifyPasswordResetCode
};
//# sourceMappingURL=chunk-RCRCR7FO.js.map
