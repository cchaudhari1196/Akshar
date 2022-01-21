package com.akshar.rest.entities;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
public class InformationBlock {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "informationBlock", orphanRemoval = true)
    private List<SubInformationBlock> subInformationBlocks;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    public List<SubInformationBlock> getSubInformationBlocks() {
        return subInformationBlocks;
    }

    public void setSubInformationBlocks(List<SubInformationBlock> subInformationBlocks) {
        this.subInformationBlocks = subInformationBlocks;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public void addSubInformationBlocks(SubInformationBlock subInformationBlock) {
        if(this.subInformationBlocks == null)
            this.subInformationBlocks = new ArrayList<>();
        this.subInformationBlocks.add(subInformationBlock);

        if(subInformationBlock.getInformationBlock() != this)
            subInformationBlock.setInformationBlock(this);
    }

    public void removeSubInformationBlocks(SubInformationBlock subInformationBlock) {
        if(subInformationBlock == null)
            return;
        this.subInformationBlocks.remove(subInformationBlock);
        subInformationBlock.setInformationBlock(null);
    }

}
