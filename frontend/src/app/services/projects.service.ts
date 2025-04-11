import { Injectable } from "@angular/core";
import { Project } from "../models/project";
import { ProjectType } from "../models/project-type.type";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environnement } from "../../environnements/environnement";
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProjectService{
  

      constructor(private http: HttpClient){}

      getProjects(): Observable <Project[]> {

        return this.http.get<Project[]>(environnement.backendProject).pipe(
          map(projects => projects.map(Project.fromJSON))
        );

      }

      getProjectById(projectId: string): Observable<Project> {
        return this.getProjects().pipe(
          map(projects => {
            const foundProject = projects.find(project => project.id === projectId);
            if (!foundProject) {
              throw new Error('Project not found!');
            }
            return foundProject;
          })
        );
      }

      likeProjectById(projectId: string, projectType: ProjectType): Observable<Project> {
        return this.getProjectById(projectId).pipe(
          map(project => {
            project.like(projectType); // garde ta logique
            return project;
          })
        );
      }
}

      
      
  
