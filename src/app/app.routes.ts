import { Routes } from "@angular/router";
import { RegisterComponent } from './pages/register/register.component';
import { Login } from "./pages/login/login";
import { HomeComponent } from "./pages/home/home.component";
import { Tasks } from "./pages/tasks/tasks";
import { authGuard } from "./guards/auth-guard";


// ajuste o caminho conforme sua pasta
export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: Login},
    { path: 'tasks', component: Tasks, canActivate: [authGuard] },
];