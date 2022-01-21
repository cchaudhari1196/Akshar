package com.akshar.rest.model;

import com.akshar.rest.entities.*;

import java.util.ArrayList;
import java.util.List;

public class ProjectDto {
    private Long id;
    private String projectName;
    private String owner;
    private String description;
    private String projectStatus;
    private ImageGroupDto imageGroup;
    private List<InformationBlockDto> informationBlocks;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getProjectStatus() {
        return projectStatus;
    }

    public void setProjectStatus(String projectStatus) {
        this.projectStatus = projectStatus;
    }

    public ImageGroupDto getImageGroup() {
        return imageGroup;
    }

    public void setImageGroup(ImageGroupDto imageGroup) {
        this.imageGroup = imageGroup;
    }

    public List<InformationBlockDto> getInformationBlocks() {
        return informationBlocks;
    }

    public void setInformationBlocks(List<InformationBlockDto> informationBlocks) {
        this.informationBlocks = informationBlocks;
    }

    public Project createEntity(){
        Project project = new Project();
        project.setId(this.id);
        project.setProjectName(this.projectName);
        project.setProjectStatus(this.projectStatus);
        project.setOwner(this.owner);
        project.setDescription(this.description);

//        if(this.imageGroup != null){
//            project.setImageGroup(createImageGroup());
//        }
//
//        if(this.informationBlocks != null)
//            project.setInformationBlocks(createInformationBlock());
        return project;
    }

    /*This method is added in Project DTO bcz information this is owned by Project*/
    public List<InformationBlock> createInformationBlock(){
        List<InformationBlock> informationBlocks = new ArrayList<>();
        for(InformationBlockDto informationBlockDto: this.informationBlocks){
            InformationBlock informationBlock = new InformationBlock();
            informationBlock.setId(informationBlockDto.getId());
            informationBlock.setTitle(informationBlockDto.getTitle());

            for(SubInformationBlockDto subInfoBlockDto : informationBlockDto.getSubInformationBlocks()){
                SubInformationBlock subInfoBlock = new SubInformationBlock();
                subInfoBlock.setId(subInfoBlockDto.getId());
                subInfoBlock.setTitle(subInfoBlockDto.getTitle());
                subInfoBlock.setSubTitle(subInfoBlockDto.getSubTitle());

                for(InformationDto infoDto: subInfoBlockDto.getInformations()){
                    Information info = new Information();
                    info.setId(infoDto.getId());
                    info.setDescription(infoDto.getDescription());
                    subInfoBlock.addInformations(info);
                }
                informationBlock.addSubInformationBlocks(subInfoBlock);
            }
            informationBlocks.add(informationBlock);
        }
        return informationBlocks;
    }

    public static ProjectDto createModel(Project project){
        ProjectDto dto = new ProjectDto();
        dto.setDescription(project.getDescription());
        dto.setId(project.getId());
        dto.setProjectName(project.getProjectName());
        dto.setOwner(project.getOwner());
        dto.setProjectStatus(project.getProjectStatus());

        if(project.getImageGroup() != null){
            ImageGroupDto imageGroupDto = new ImageGroupDto();
            imageGroupDto.setName(project.getImageGroup().getName());
            imageGroupDto.setId(project.getImageGroup().getId());
            for(Image img: project.getImageGroup().getImages()){
                ImageDto imageDto = new ImageDto();
                imageDto.setId(img.getId());
                imageDto.setName(img.getName());
                imageDto.setAddress(img.getAddress());
                imageDto.setDescription(img.getDescription());
                imageGroupDto.addImages(imageDto);
            }
            dto.setImageGroup(imageGroupDto);
        }

        dto.setInformationBlocks(createInformationBlockDto(project));
        return dto;
    }

    private static List<InformationBlockDto> createInformationBlockDto(Project project){
        List<InformationBlockDto> informationBlocksDto = new ArrayList<>();
        for(InformationBlock informationBlock: project.getInformationBlocks()){
            InformationBlockDto informationBlockDto = new InformationBlockDto();
            informationBlockDto.setTitle(informationBlock.getTitle());
            informationBlockDto.setId(informationBlock.getId());

            for(SubInformationBlock subInfoBlock : informationBlock.getSubInformationBlocks()){
                SubInformationBlockDto subInfoBlockDto = new SubInformationBlockDto();
                subInfoBlockDto.setTitle(subInfoBlock.getTitle());
                subInfoBlockDto.setSubTitle(subInfoBlock.getSubTitle());
                subInfoBlockDto.setId(subInfoBlock.getId());

                for(Information info: subInfoBlock.getInformations()){
                    InformationDto infoDto = new InformationDto();
                    infoDto.setDescription(info.getDescription());
                    infoDto.setId(info.getId());
                    subInfoBlockDto.addInformations(infoDto);
                }
                informationBlockDto.addSubInformationBlocks(subInfoBlockDto);
            }
            informationBlocksDto.add(informationBlockDto);
        }
        return informationBlocksDto;
    }
}
