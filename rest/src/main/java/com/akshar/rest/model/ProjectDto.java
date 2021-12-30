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
        project.setProjectName(this.projectName);
        project.setProjectStatus(this.projectStatus);
        project.setOwner(this.owner);
        project.setDescription(this.description);

        if(this.imageGroup != null){
            ImageGroup ig = new ImageGroup();
            ig.setName(this.imageGroup.getName());
            for(ImageDto imageDto: this.imageGroup.getImages()){
                Image image = new Image();
                image.setName(imageDto.getName());
                image.setAddress(imageDto.getAddress());
                image.setDescription(imageDto.getDescription());
                ig.addImages(image);
            }
            project.setImageGroup(ig);
        }

        if(this.informationBlocks != null)
            project.setInformationBlocks(createInformationBlock());
        return project;
    }

    private List<InformationBlock> createInformationBlock(){
        List<InformationBlock> informationBlocks = new ArrayList<>();
        for(InformationBlockDto informationBlockDto: this.informationBlocks){
            InformationBlock informationBlock = new InformationBlock();
            informationBlock.setTitle(informationBlockDto.getTitle());

            for(SubInformationBlockDto subInfoBlockDto : informationBlockDto.getSubInformationBlocks()){
                SubInformationBlock subInfoBlock = new SubInformationBlock();
                subInfoBlock.setTitle(subInfoBlockDto.getTitle());
                subInfoBlock.setSubTitle(subInfoBlockDto.getSubTitle());

                for(InformationDto infoDto: subInfoBlockDto.getInformations()){
                    Information info = new Information();
                    info.setDescription(infoDto.getDescription());
                    subInfoBlock.addInformations(info);
                }
                informationBlock.addSubInformationBlocks(subInfoBlock);
            }
            informationBlocks.add(informationBlock);
        }
        return informationBlocks;
    }
}
