package com.akshar.rest.model;

import com.akshar.rest.entities.ImageGroup;

import java.util.List;

public class ProjectSummaryDto {
    private Long id;
    private String projectName;
    private String projectDesc;
    private String owner;
    private String ownerDetailsLink;
    private String image;

    public ProjectSummaryDto(Long id, String projectName, String projectDesc, String owner, String ownerDetailsLink, String image) {
        this.id = id;
        this.projectName = projectName;
        this.projectDesc = projectDesc;
        this.owner = owner;
        this.ownerDetailsLink = ownerDetailsLink;
        this.image = image;
    }

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

    public String getProjectDesc() {
        return projectDesc;
    }

    public void setProjectDesc(String projectDesc) {
        this.projectDesc = projectDesc;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getOwnerDetailsLink() {
        return ownerDetailsLink;
    }

    public void setOwnerDetailsLink(String ownerDetailsLink) {
        this.ownerDetailsLink = ownerDetailsLink;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
