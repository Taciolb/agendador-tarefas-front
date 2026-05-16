import { Routes } from "@angular/router";
import { RegisterComponent } from './pages/register/register.component';
import { Login } from "./pages/login/login";


// ajuste o caminho conforme sua pasta
export const routes: Routes = [
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: Login}
];