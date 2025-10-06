import { Controller } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}
}
