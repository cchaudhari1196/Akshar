package com.akshar.rest.service;

import com.akshar.rest.entities.InformationBlock;
import com.akshar.rest.entities.Project;
import com.akshar.rest.mapper.ProjectMapper;
import com.akshar.rest.model.InformationBlockDto;
import com.akshar.rest.model.ProjectDto;
import com.akshar.rest.persistence.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ProjectServiceImpl implements ProjectService{

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectMapper mapper;

    @Override
    public void createProject(final ProjectDto projectDto){
        Project project = projectDto.createEntity();
        projectRepository.save(project);
    }

    @Override
    public void deleteProject(final Long id){
        projectRepository.deleteById(id);
    }

    @Override
    public void updateProject(ProjectDto projectDto) {
        Project project = projectRepository.findById(projectDto.getId()).get();
        mapper.updateProjectFromDto(projectDto,project);
        projectRepository.save(project);
    }
}
