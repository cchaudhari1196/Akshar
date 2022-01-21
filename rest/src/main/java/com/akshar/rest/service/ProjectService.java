package com.akshar.rest.service;

import com.akshar.rest.model.ProjectDto;

public interface ProjectService {
    void createProject(ProjectDto projectDto);

    void deleteProject(Long id);

    void updateProject(ProjectDto project);

    ProjectDto getProject(Long id);
}

