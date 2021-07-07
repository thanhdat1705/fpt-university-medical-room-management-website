import { Account } from '../../models/account';
// import { GeneralStorage } from './../storages/storages';
// import { LoginSocialRequest } from './../../sharings/models/loginSocialRequest';

// import { GeneralHelperService } from '../general-helper.service';
// import { SummaryService } from '../summary.service';
import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginSocialRequest } from '../../requests/login/login-social-request';
import { GeneralHelperService } from '../general-helper.service';
import { SummaryService } from '../summary.service';
import { GeneralStorage } from '../storages/storages';
import { LinkToSocialAccountRequest } from '../../requests/link-to-social-account/link-to-social-account-request';
import { HeaderService } from '../header.service';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    account!: Account;
    userData: any;
    user!: any;
    token!: any;
    isLoginUser: boolean = false;

    loginSocialRequest: LoginSocialRequest = {
        AccessToken: null,
        Provider: 1,
        FromAppLogin: 0,
    };

    linkToSocialAccounRequest: LinkToSocialAccountRequest = {
        accessToken: null,
        provider: 0
    }

    constructor(
        private router: Router,
        public firebaseAuth: AngularFireAuth,
        public ngZone: NgZone,
        private generalService: GeneralHelperService,
        private summaryService: SummaryService,
        public storage: GeneralStorage,
        public headerService: HeaderService
    ) {
        this.firebaseAuth.authState.subscribe(user => {
            if (user) {
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user'));
            } else {
                localStorage.setItem('user', null);
                JSON.parse(localStorage.getItem('user'));
            }
        })
    }

    public setAccount(account: Account) {
        this.account = account;
    }

    public isLogin(): boolean {
        return this.isLoginUser;
    }

    public getAccount() {
        return this.account;
    }

    get isAuthenticated(): boolean {
        return this.user !== null;
    }
    get isEmailVerified(): boolean {
        return this.isAuthenticated ? this.user.emailVerified : false;
    }
    get currentUserId(): string {
        return this.isAuthenticated ? this.user.uid : null;
    }

    SignOut() {
        return this.firebaseAuth.signOut().then(() => {
            let roleId = localStorage.getItem('roleId');
            localStorage.clear();
            localStorage.setItem('roleId', roleId);
            this.router.navigate(['authentication/login']);
        })
    }

    setUserInforToLocalStorage(avatarUrl: string, name: string, role: string, roleId: number) {
        localStorage.setItem('photoUrl', avatarUrl);
        localStorage.setItem('displayName', name);
        localStorage.setItem('roleName', role);
        localStorage.setItem('roleId', roleId.toString());
        console.log(avatarUrl, name, role)
    }

    login() {
        this.isLoginUser = true;
        this.generalService.openWaitingPopupNz();
        if (!this.isAuthenticated) {
            this.account = null as any;
        } else {
            console.log(this.user);
            // this.account = {
            //     id: this.user.uid,
            //     email: this.user.email,
            //     displayName: this.user.displayName,
            //     phoneNumber: '',
            //     photoUrl: this.user.photoURL,
            //     token: this.token,
            //     role: ''
            // };
        }

        console.log(this.account);
        this.storage.storage.set("UserAccount", this.account);

        this.loginSocialRequest.AccessToken = this.token;
        console.log("loginSocialRequest -- " + this.loginSocialRequest);
        // //login to system

        this.summaryService.loginSocial(this.loginSocialRequest).subscribe(
            (response) => {
                console.log(response);
                this.setAccount(response.data);
                this.account = response.data;
                console.log('accountServer: ', this.account);
                localStorage.setItem("accountId", response.data.accountId);
                this.setUserInforToLocalStorage(this.account.photoUrl, this.account.displayName, this.account.role.roleName, this.account.role.id)
                localStorage.setItem("token", response.data.token);
                this.summaryService.setTokenHeader();
                console.log(localStorage.getItem("token"));
                this.summaryService.setTokenHeader();
                this.generalService.closeWaitingPopupNz();
                this.ngZone.run(() => {
                    // this.router.navigate(['account/profile']);
                    this.router.navigate(['medicine-management/medicine-list']);
                })

            },
            (error) => {
                this.generalService.closeWaitingPopupNz();
                console.log("login error");
                this.generalService.createErrorNotification(error);
            }
        );
    }

    loginWithUsernameAccount(data: any) {
        this.summaryService.usernameAuthenticate(data).subscribe(
            (response) => {
                this.account = response.data;


                localStorage.setItem("token", response.data.token);
                this.setUserInforToLocalStorage(this.account.photoUrl, this.account.displayName, this.account.role.roleName, this.account.role.id)

                this.summaryService.setTokenHeader();
                this.generalService.closeWaitingPopupNz();

                this.router.navigate(['/account/profile']);
            },
            (error) => {
                this.generalService.closeWaitingPopupNz();
                console.log(error);
                this.generalService.createErrorNotification(error);
            }
        );
    }

    GoogleAuth() {
        return this.AuthLogin(1, new firebase.auth.GoogleAuthProvider());
    }

    FacebookAuth() {
        return this.AuthLogin(0, new firebase.auth.FacebookAuthProvider());
    }

    AuthLogin(cateProvider: number, provider) {
        return this.firebaseAuth.signInWithPopup(provider)
            .then((response) => {
                this.user = response.user;
                console.log(this.user);
                this.loginSocialRequest.Provider = cateProvider;
                let token: any;
                token = response.credential;
                this.token = token.accessToken;
                console.log("this is token " + this.token);
                this.login();
            }).catch((error) => {
                this.generalService.createErrorNotification(error);
            })
    }

    loginWithGmail() {
        this.firebaseAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
            (response) => {
                this.user = response.user;
                console.log(response);
                // this.loginSocialRequest.provider = 1;
                let token: any;
                token = response.credential;
                this.token = token.accessToken;
                console.log("this.token " + this.token);
                // this.login();
            }
        ).catch(
            (error) => {
                // this.generalService.createErrorNotification(error);
            }
        );
    }

    linkToSocialAccount() {
        console.log(this.linkToSocialAccounRequest);

        this.summaryService.linkToSocialAccount(this.linkToSocialAccounRequest).subscribe(
            (response) => {
                console.log(response);
                this.generalService.closeWaitingPopupNz();
            }
        ), (error) => {
            console.log(error);

            this.generalService.closeWaitingPopupNz();
            this.generalService.createErrorNotification(error);

        };
        this.generalService.closeWaitingPopupNz();
    }

    loginWithFacebook() {
        this.firebaseAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(
            (response) => {
                this.user = response.user;
                console.log(response);
                this.loginSocialRequest.Provider = 0;
                let token: any;
                token = response.credential;
                this.token = token.accessToken;
                console.log("this.token " + this.token);
                this.login();
            }
        ).catch(
            (error) => {
                this.generalService.createErrorNotification(error);
            }
        );
    }

    linkToFacebookAccount() {
        this.firebaseAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(
            (response) => {
                this.user = response.user;
                console.log(response);
                this.linkToSocialAccounRequest.provider = 0;
                let token: any;
                token = response.credential;
                console.log(response);
                this.linkToSocialAccounRequest.accessToken = token.accessToken;
                console.log("credential " + JSON.stringify(token));
                console.log("credential.access " + token.accessToken);

                console.log(this.linkToSocialAccounRequest);

                this.linkToSocialAccount();
            }
        ).catch(
            (error) => {
                this.generalService.createErrorNotification(error);
            }
        );
    }

    linkToGmailAccount() {
        this.firebaseAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
            (response) => {
                this.user = response.user;
                console.log(response);
                this.linkToSocialAccounRequest.provider = 1;
                let token: any;
                token = response.credential;
                this.linkToSocialAccounRequest.accessToken = token.accessToken;
                this.linkToSocialAccount();
            }
        ).catch(
            (error) => {
                this.generalService.createErrorNotification(error);

                // this.generalService.createErrorNotification(error);
            }
        );
    }
}
