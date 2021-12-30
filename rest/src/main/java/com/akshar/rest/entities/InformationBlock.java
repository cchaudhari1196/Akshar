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

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "information_block_id", referencedColumnName = "id", nullable = false)
    private List<SubInformationBlock> subInformationBlocks;

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

    public void addSubInformationBlocks(SubInformationBlock subInformationBlock) {
        if(this.subInformationBlocks == null)
            this.subInformationBlocks = new ArrayList<>();
        this.subInformationBlocks.add(subInformationBlock);
    }
}
