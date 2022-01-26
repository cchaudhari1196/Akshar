package com.akshar.rest.service;

import com.akshar.rest.entities.Image;
import com.akshar.rest.entities.ImageGroup;
import com.akshar.rest.entities.InformationBlock;
import com.akshar.rest.entities.Project;
import com.akshar.rest.mapper.ProjectMapper;
import com.akshar.rest.model.InformationBlockDto;
import com.akshar.rest.model.ProjectDto;
import com.akshar.rest.model.ProjectSummaryDto;
import com.akshar.rest.persistence.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ProjectServiceImpl implements ProjectService{

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectMapper mapper;

    @Autowired
    EntityManager em;

    @Override
    public void createProject(final ProjectDto projectDto){
        Project project = projectDto.createEntity();
        ImageGroup ig = projectDto.getImageGroup().createImageGroup();
        List<InformationBlock> informationBlocks = projectDto.createInformationBlock();
        project.setInformationBlocks(informationBlocks);
        project.setImageGroup(ig);
        projectRepository.save(project);
    }

    @Override
    public void deleteProject(final Long id){
        projectRepository.deleteById(id);
    }

    @Override
    public void updateProject(ProjectDto projectDto) {
        /*This is one way to map using pre existing library. With Bidirectional it doent work*/
//        Project project = projectRepository.findById(projectDto.getId()).get();
//        mapper.updateProjectFromDto(projectDto,project);

        /*This method gives more control to us*/
        Project project = projectDto.createEntity();

        ImageGroup ig = projectDto.getImageGroup().createImageGroup();
        populateHighlightImage(project, ig);
        project.setImageGroup(ig);

        List<InformationBlock> informationBlocks = projectDto.createInformationBlock();
        project.setInformationBlocks(informationBlocks);

        projectRepository.save(project);
    }

    @Override
    public ProjectDto getProject(Long id) {
        Project project = projectRepository.findById(id).get();
        return ProjectDto.createModel(project);
    }

    @Override
    public List<ProjectSummaryDto> getAllProjectSummary() {
        return projectRepository.getAllProjectSummary();
    }

    @Override
    public void ensureHightlightImage(Long id){
        Project project = projectRepository.getById(id);
        populateHighlightImage(project, project.getImageGroup());
    }

    private void populateHighlightImage(Project project, ImageGroup ig){
        if(ig != null && ig.getImages() != null && ig.getImages().size() > 0)
            project.setHighlightImage(ig.getImages().get(0).getAddress());
    }
}
