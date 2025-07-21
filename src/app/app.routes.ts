import { Component } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { DetailComponent } from './pages/detail/detail.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import myAppConfig from './config/my-app-config';



import {
    OKTA_CONFIG,
    OktaAuthGuard,
    OktaAuthModule,
    OktaCallbackComponent
} from "@okta/okta-angular";
import { LoginComponent } from './components/login/login.component';
import { MembersPageComponent } from './components/members-page/members-page.component';
import OktaAuth from '@okta/okta-auth-js';
import { HomePageComponent } from './components/home-page/home-page.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';


export const oktaConfig = Object.assign({
    onAuthRequired: (oktaAuth: OktaAuth, injector: any) => {
        const router = injector.get(Router)

        router.navigate(['/login'])
    }
}, myAppConfig.oidc) 

export const routes: Routes = [
    {
        path:'user-profile', component: UserProfileComponent, canActivate: [OktaAuthGuard]
    },
    {
        path:'members', component: MembersPageComponent, canActivate: [OktaAuthGuard]
    },
    {
        path:'login/callback', component: OktaCallbackComponent
    },
    {
        path:'login', component: LoginComponent
    },
    {
        path:'checkout', component: CheckoutComponent
    },
    {
        path:'search/:keyword', component: ProductListComponent
    },
    {
        path:'home', component: HomePageComponent
    },
    {
        path: 'products/:id', component: DetailComponent
    },
    {
        path: 'category/:id', component: ProductListComponent
    },
    {
        path: 'category', component: ProductListComponent
    },
    {
        path: 'products', component: ProductListComponent
    },
    {
        path: '', redirectTo:'/home', pathMatch: 'full'
    },
    {
        path:'**',redirectTo:'/products', pathMatch: 'full'
    },
];
