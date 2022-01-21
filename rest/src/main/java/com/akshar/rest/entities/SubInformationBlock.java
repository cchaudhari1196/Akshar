package com.akshar.rest.entities;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
public class SubInformationBlock {
    @Id
    @Column
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;

    @Column
    private String subTitle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "information_block_id")
    private InformationBlock informationBlock;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "subInformationBlock",fetch = FetchType.EAGER)
    private List<Information> informations;

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

    public String getSubTitle() {
        return subTitle;
    }

    public void setSubTitle(String subTitle) {
        this.subTitle = subTitle;
    }

    public List<Information> getInformations() {
        return informations;
    }

    public void setInformations(List<Information> informations) {
        this.informations = informations;
    }

    public InformationBlock getInformationBlock() {
        return informationBlock;
    }

    public void setInformationBlock(InformationBlock informationBlock) {
        this.informationBlock = informationBlock;
    }

    public void addInformations(Information information) {
        if(this.informations == null)
            this.informations = new ArrayList<>();
        this.informations.add(information);
        if(information.getSubInformationBlock() != this)
            information.setSubInformationBlock(this);
    }

    public Information removeInformations(Information information) {
        if(informations == null)
            return null;
        this.informations.remove(information);
        information.setSubInformationBlock(null);
        return information;
    }
}
