package com.akshar.rest.model;

import com.akshar.rest.entities.Information;

import java.util.ArrayList;
import java.util.List;

public class SubInformationBlockDto {
    private Long id;
    private String title;
    private String subTitle;
    private List<InformationDto> informations;

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

    public List<InformationDto> getInformations() {
        return informations;
    }

    public void setInformations(List<InformationDto> informations) {
        this.informations = informations;
    }

    public void addInformations(InformationDto info) {
        if(informations == null)
            informations = new ArrayList<>();
        informations.add(info);
    }
}
