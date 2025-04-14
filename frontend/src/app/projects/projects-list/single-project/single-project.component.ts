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
  projectInitialLikes!: number;
  snapButtonText: string = 'like';
  userHasLiked: boolean = false;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProject();
  }

  private getProject(): void {
    const projectId = this.route.snapshot.params['id'];
    this.projectService.getProjectById(projectId).subscribe({
      next: (project) => {
        this.project = project;
        this.projectInitialLikes = project.likes;

        const likedProjects = JSON.parse(localStorage.getItem('likedProjects') || '[]');
        if (likedProjects.includes(project.id)) {
          this.userHasLiked = true;
          this.snapButtonText = 'unLike';
          this.project.likes += 1;
        }
      },
      error: () => {
        console.error('Project not found');
        this.router.navigateByUrl('/projects');
      },
    });
  }

  onLike(): void {
    if (this.userHasLiked) {
      this.unLike();
    } else {
      this.like();
    }
  }

  like(): void {
    if (this.userHasLiked) return;

    this.userHasLiked = true;
    this.snapButtonText = 'unLike';

    const likedProjects = JSON.parse(localStorage.getItem('likedProjects') || '[]');
    likedProjects.push(this.project.id);
    localStorage.setItem('likedProjects', JSON.stringify(likedProjects));

    this.project.likes += 1;
  }

  unLike(): void {
    if (!this.userHasLiked) return;

    this.userHasLiked = false;
    this.snapButtonText = 'like';

    const likedProjects = JSON.parse(localStorage.getItem('likedProjects') || '[]');
    const updatedLikes = likedProjects.filter((id: string) => id !== this.project.id);
    localStorage.setItem('likedProjects', JSON.stringify(updatedLikes));

    this.project.likes = Math.max(this.project.likes - 1, this.projectInitialLikes);
  }
}
