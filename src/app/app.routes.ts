import { ApplicationConfig } from '@angular/core';
import { provideRouter, RouterModule, Routes } from '@angular/router';  // وارد کردن RouterModule

import { TexteditorComponent } from '../texteditor/texteditor.component'; 
import { DrawComponent } from '../draw/draw.component';

export const routes: Routes = [
 
  { path: 'texteditor', component: TexteditorComponent },
   { path: '', component: DrawComponent }, // مسیر پیش‌فرض برای صفحه drawing
  
];
