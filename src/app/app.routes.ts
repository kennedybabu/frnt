import { Component } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { DetailComponent } from './pages/detail/detail.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import myAppConfig from './config/my-app-config';



import {
    OKTA_CONFIG,
    OktaAuthModule,
    OktaCallbackComponent
} from "@okta/okta-angular";
import { LoginComponent } from './components/login/login.component';


export const oktaConfig = Object.assign({
    onAuthRequired: (injector: any) => {
        const router = injector.get(Router)

        router.navigate(['/login'])
    }
}, myAppConfig.oidc) 

export const routes: Routes = [
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
        path: '', redirectTo:'/products', pathMatch: 'full'
    },
    {
        path:'**',redirectTo:'/products', pathMatch: 'full'
    },
];
