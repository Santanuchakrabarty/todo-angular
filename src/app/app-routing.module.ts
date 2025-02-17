// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent, // Use LayoutComponent as the parent
    children: [
      { path: '', component: HomeComponent }, // Home page
      { path: 'about', component: AboutComponent }, // About page
      { path: 'contact', component: ContactComponent }, // Contact page
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}