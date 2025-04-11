import { Component } from '@angular/core';
import { Project } from '../../../models/project';
import { ProjectService } from '../../../services/projects.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, NgClass, NgStyle, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-single-project',
  standalone: true,
  imports: [
    TitleCasePipe,
    NgClass,
    NgStyle,
    RouterLink,
    CommonModule
  ],
  templateUrl: './single-project.component.html',
  styleUrl: './single-project.component.css'
})
export class SingleProjectComponent {

  project!: Project;
  snapButtonText: string = 'like';
  userHasLiked: boolean = false;

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
      
      this.getProject();
  }

  
 onLike(): void{
    if(this.userHasLiked){
      this.unLike();
    }
    else{
      this.like();
    }
    
  }
  
  like(): void {
    this.projectService
      .likeProjectById(this.project.id, 'like')
      .subscribe((updatedProject) => {
        this.project = updatedProject;
        this.snapButtonText = 'unLike';
        this.userHasLiked = true;
      });
  }
  
  unLike(): void {
    this.projectService
      .likeProjectById(this.project.id, 'unLike')
      .subscribe((updatedProject) => {
        this.project = updatedProject;
        this.snapButtonText = 'like';
        this.userHasLiked = false;
      });
  }
  
 
  private getProject(): void {
    const projectId = this.route.snapshot.params['id'];
    this.projectService.getProjectById(projectId).subscribe({
      next: (project) => {
        this.project = project;
      },
      error: () => {
        console.error('Project not found');
        this.router.navigateByUrl('/projects');
      },
    });
  }
}
