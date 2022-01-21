package com.akshar.rest.entities;

import javax.persistence.*;

@Entity
@Table
public class Information {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sub_information_block_id")
    private SubInformationBlock subInformationBlock;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public SubInformationBlock getSubInformationBlock() {
        return subInformationBlock;
    }

    public void setSubInformationBlock(SubInformationBlock subInformationBlock) {
        this.subInformationBlock = subInformationBlock;
    }
}
