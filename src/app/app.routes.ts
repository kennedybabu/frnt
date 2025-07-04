import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { DetailComponent } from './pages/detail/detail.component';

export const routes: Routes = [
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
