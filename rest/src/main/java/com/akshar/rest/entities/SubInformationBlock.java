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

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "sub_information_block_id", referencedColumnName = "id", nullable = false)
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

    public void addInformations(Information information) {
        if(this.informations == null)
            this.informations = new ArrayList<>();
        this.informations.add(information);
    }
}
