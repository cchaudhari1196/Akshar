package com.akshar.rest.service;

import com.akshar.rest.model.ProjectDto;
import com.akshar.rest.model.ProjectSummaryDto;

import java.util.List;

public interface ProjectService {
    void createProject(ProjectDto projectDto);

    void deleteProject(Long id);

    void updateProject(ProjectDto project);

    ProjectDto getProject(Long id);

    List<ProjectSummaryDto> getAllProjectSummary();

    void ensureHightlightImage(Long id);
}

