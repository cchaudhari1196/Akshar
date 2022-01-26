package com.akshar.rest.persistence;

import com.akshar.rest.entities.Project;
import com.akshar.rest.model.ProjectSummaryDto;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    @Query("select new com.akshar.rest.model.ProjectSummaryDto(p.id, p.projectName, p.description, p.owner, 'ownerDetailsLink' , p.highlightImage) from Project p")
    List<ProjectSummaryDto> getAllProjectSummary();
}

