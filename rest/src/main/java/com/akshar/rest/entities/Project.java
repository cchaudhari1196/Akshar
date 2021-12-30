package com.akshar.rest.entities;

import javax.persistence.*;
import java.util.List;

@Entity
@Table
public class Project {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String projectName;

    @Column
    private String owner;

    @Column
    private String description;

    @Column
    private String projectStatus;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "image_group_id")
    private ImageGroup imageGroup;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "project_id", referencedColumnName = "id", nullable = false)
    private List<InformationBlock> informationBlocks;

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

    public List<InformationBlock> getInformationBlocks() {
        return informationBlocks;
    }

    public void setInformationBlocks(List<InformationBlock> informationBlocks) {
        this.informationBlocks = informationBlocks;
    }

    public ImageGroup getImageGroup() {
        return imageGroup;
    }

    public void setImageGroup(ImageGroup imageGroup) {
        this.imageGroup = imageGroup;
    }
}
