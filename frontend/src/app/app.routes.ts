import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SingleProjectComponent } from './projects/projects-list/single-project/single-project.component';
import { ProjectsListComponent } from './projects/projects-list/projects-list.component';

export const routes: Routes = [
    {path:'projects/:id', component: SingleProjectComponent},
    {path:'projects',component:ProjectsListComponent},
    {path:'', component:HomeComponent},

];
